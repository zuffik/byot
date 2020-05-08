import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { ConfigService } from '@nestjs/config';
import * as _ from 'lodash';
import { Role, SourceType } from '../graphql/ts/types';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import { GeneratorGraphqlService } from '../seed/generator-graphql/generator-graphql.service';
import { Media } from '../media/media/media.entity';
import { MediaRemoteService } from '../media/media-remote/media-remote.service';
import { MediaService } from '../media/media/media.service';
import { TrainingSet } from '../training/training-set/training-set.entity';
import { TrainingSetService } from '../training/training-set/training-set.service';
import { Training } from '../training/training/training.entity';
import { TrainingService } from '../training/training/training.service';

@Injectable()
export class MigrationsService implements OnModuleInit {
  private readonly demoUser = {
    prefix: 'demo-',
    pass: 'D3m0P4$$',
    count: 10,
  };

  private readonly medias = {
    prefix: 'TESTING MEDIA',
    remoteQuery: 'training',
    count: 50, // 50 is Youtube max per page
  };

  private readonly trainings = {
    trainingSetLabel: (i: number, user: string) =>
      `Training set ID:${i} USER:${user}: ${
        this.gqlGenerator.trainingSet(false).label
      }`,
    trainingLabel: (i: number, set: string) =>
      `Training ID:${i} TRAINING SET:${set}: ${
        this.gqlGenerator.training(false).label
      }`,
    trainingSetsPerUser: 10,
    trainingsPerSet: { min: 2, max: 10 },
    mediasPerTraining: { min: 2, max: 10 },
  };

  constructor(
    @Inject(UserService) private readonly userService: UserService,
    @Inject(TrainingSetService)
    private readonly trainingSetService: TrainingSetService,
    @Inject(TrainingService) private readonly trainingService: TrainingService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @Inject(ConfigService) private readonly cfgService: ConfigService,
    @Inject(AuthService) private readonly authService: AuthService,
    @Inject(GeneratorGraphqlService)
    private readonly gqlGenerator: GeneratorGraphqlService,
    @Inject(MediaRemoteService)
    private readonly mediaRemoteService: MediaRemoteService,
    @Inject(MediaService) private readonly mediaService: MediaService,
    @Inject(ConfigService) private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    if (this.configService.get<string>('node.env') === 'test') return;
    // create leaves first
    const [superAdmin, demoUsers, medias] = await Promise.all([
      this.createOrFetchSuperAdmin(),
      this.createOrFetchDemoUsers(),
      this.createOrFetchMedias(),
    ]);

    const allUsers: User[] = [superAdmin, ...demoUsers];

    // create entities dependent on leaves
    const trainingSets = await this.createOrFetchTrainingSets(allUsers);
    const trainings = await this.createOrFetchTrainings(trainingSets, medias);
  }

  private async createOrFetchSuperAdmin(): Promise<User> {
    let superAdmin = await this.userService.findByUsernameOrEmail(
      this.cfgService.get<string>('app.superAdmin.userName'),
    );
    if (!superAdmin) {
      superAdmin = await this.userService.findByUsernameOrEmail(
        this.cfgService.get<string>('app.superAdmin.email'),
      );
      if (!superAdmin) {
        superAdmin = await this.userRepository.save({
          firstName: 'Super',
          lastName: 'Admin',
          role: Role.ADMIN,
          email: this.cfgService.get<string>('app.superAdmin.email'),
          userName: this.cfgService.get<string>('app.superAdmin.userName'),
          password: this.authService.createPasswordHash(
            this.cfgService.get<string>('app.superAdmin.password'),
          ),
        });
      }
    }
    return superAdmin;
  }

  private async createOrFetchDemoUsers() {
    const demoUser = await this.userService.findByUsernameOrEmail(
      this.demoUser.prefix + '0',
    );
    if (!demoUser) {
      return await Promise.all(
        _.times(this.demoUser.count, (i) =>
          this.userService.create({
            ...this.gqlGenerator.userRegister(),
            userName: this.demoUser.prefix + i,
            email: this.demoUser.prefix + i + '@example.com',
            password: this.authService.createPasswordHash(this.demoUser.pass),
          }),
        ),
      );
    }
    return await Promise.all(
      _.times(this.demoUser.count, (i) =>
        this.userService.findByUsernameOrEmail(this.demoUser.prefix + i),
      ),
    );
  }

  private async createOrFetchMedias(): Promise<Media[]> {
    const [localMedias, localCount] = await this.mediaService.findAndCount({
      query: this.medias.prefix,
      pagination: {
        limit: this.medias.count,
        offset: 0,
      },
    });
    const remaining = Math.max(this.medias.count - localCount, 0);
    if (remaining === 0) {
      return localMedias;
    }
    const [remoteMedias] = await this.mediaRemoteService.search(
      {
        pagination: {
          limit: remaining,
          offset: 0,
        },
        query: this.medias.remoteQuery,
      },
      [SourceType.YOUTUBE],
    );
    return await Promise.all(
      remoteMedias.map((media) =>
        this.mediaService.storeMedia({
          ...media,
          label: `${this.medias.prefix} ${media.label}`,
        }),
      ),
    );
  }

  private async createOrFetchTrainingSets(
    users: User[],
  ): Promise<TrainingSet[]> {
    const ids = users.map((u) => u.id);
    const sets = await Promise.all(
      ids.map((id) =>
        this.trainingSetService.findAndCount({
          idUser: id,
        }),
      ),
    );
    if (_.every(sets, ([, count]) => count > 0)) {
      return _.flatten(sets.map(([trainingSets]) => trainingSets));
    }
    return await Promise.all(
      _.flatten(
        ids.map((id) =>
          _.times(this.getNumber(this.trainings.trainingSetsPerUser), (i) =>
            this.trainingSetService.create(
              {
                ...this.gqlGenerator.trainingSetInput(),
                label: this.trainings.trainingSetLabel(i, id),
              },
              id,
            ),
          ),
        ),
      ),
    );
  }

  private getNumber(value: number | { min: number; max: number }): number {
    if (typeof value === 'number') {
      return value;
    }
    return _.random(value.min, value.max, false);
  }

  private async createOrFetchTrainings(
    trainingSets: TrainingSet[],
    medias: Media[],
  ): Promise<Training[]> {
    const trainingsFromSets: Training[][] = await Promise.all(
      trainingSets.map((ts) => ts.trainings),
    );
    if (_.every(trainingsFromSets, (trainings) => trainings.length > 0)) {
      return _.flatten(trainingsFromSets);
    }
    return _.flatten(
      await Promise.all(
        trainingSets.map(
          async (set) =>
            await Promise.all(
              _.times(
                this.getNumber(this.trainings.trainingsPerSet),
                async (i) =>
                  this.trainingService.create(
                    {
                      ...this.gqlGenerator.trainingDraftInput(),
                      label: this.trainings.trainingLabel(i, set.id),
                      idTrainingSet: set.id,
                      media: _.uniqBy(
                        await Promise.all(
                          _.times(
                            this.getNumber(this.trainings.mediasPerTraining),
                            async () => {
                              const media = _.sample(medias);
                              const source = await media.source;
                              return {
                                id: source.resourceId,
                                sourceType: source.sourceType,
                              };
                            },
                          ),
                        ),
                        'id',
                      ),
                    },
                    set,
                  ),
              ),
            ),
        ),
      ),
    );
  }
}
