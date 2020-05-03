import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import {
  FulltextFilter,
  FulltextFilterForUser,
  MediaList,
  Role,
  TrainingDraftInput,
  TrainingList,
  TrainingMediaInput,
  TrainingUpdateInput,
} from '../../graphql/ts/types';
import { BaseResolver } from '../../helpers/BaseResolver';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingSetService } from '../training-set/training-set.service';
import { JwtUser, JwtUserType } from '../../auth/decorators/jwt-user.decorator';
import { Training } from './training.entity';
import { AuthRoles } from '../../auth/decorators/auth-roles.decorator';
import { AuthGuard } from '../../auth/jwt/auth.guard';
import * as _ from 'lodash';

@Resolver('Training')
export class TrainingResolver extends BaseResolver {
  constructor(
    @Inject(TrainingService) private readonly trainingService: TrainingService,
    @Inject(TrainingSetService)
    private readonly trainingSetService: TrainingSetService,
  ) {
    super();
  }

  @Query('allTrainings')
  @AuthRoles(Role.ADMIN)
  public async allTrainings(
    @Args('filter') f?: FulltextFilter,
    @JwtUser() user?: JwtUserType,
  ): Promise<TrainingList> {
    const filter: FulltextFilterForUser = {
      ...(f || {}),
    };
    if (user.role === Role.USER) {
      filter.idUser = user.id;
    }
    return this.createList<TrainingList>(
      await this.trainingService.findAndCount(filter),
    );
  }

  @Query('training')
  @UseGuards(AuthGuard)
  public async training(
    @Args('id') id: string,
    @JwtUser() user: JwtUserType,
  ): Promise<Training> {
    const training = this.returnOrBail(await this.trainingService.findById(id));
    await this.checkOwnership(training.owner, user);
    return training;
  }

  @Mutation('createTraining')
  @UseGuards(AuthGuard)
  public async createTraining(
    @Args('draft') input: TrainingDraftInput,
    @JwtUser() user: JwtUserType,
  ): Promise<Training> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(input.idTrainingSet),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return await this.trainingService.create(input, trainingSet);
  }

  @Mutation('updateTraining')
  @UseGuards(AuthGuard)
  public async updateTraining(
    @Args('id') id: string,
    @Args('training') input: TrainingUpdateInput,
    @JwtUser() user: JwtUserType,
  ): Promise<Training> {
    const training = this.returnOrBail(await this.trainingService.findById(id));
    await this.checkOwnership(training.owner, user);
    return await this.trainingService.update(id, input);
  }

  @ResolveField('media')
  public async resolveMedia(@Parent() training: Training): Promise<MediaList> {
    const medias = await training.medias;
    return this.createList<MediaList>([medias, medias.length]);
  }

  @Mutation('removeMediaFromTraining')
  @UseGuards(AuthGuard)
  public async removeMediaFromTraining(
    @Args('idTraining') idTraining: string,
    @Args('idMedia') idMedia: string,
    @JwtUser() user: JwtUserType,
  ): Promise<Training> {
    const training = this.returnOrBail(
      await this.trainingService.findById(idTraining),
    );
    await this.checkOwnership(training.owner, user);
    const media = await training.medias;
    if (!_.some(media, (m) => m.id === idMedia)) {
      throw new BadRequestException();
    }
    training.medias = Promise.resolve(media.filter((m) => m.id !== idMedia));
    return await this.trainingService.update(idTraining, {
      label: training.label,
      media: await Promise.all(
        media.map(
          async (m): Promise<TrainingMediaInput> => {
            const source = await m.source;
            return {
              id: source.resourceId,
              sourceType: source.sourceType,
            };
          },
        ),
      ),
    });
  }

  @Mutation('removeTrainingFromTrainingSet')
  @UseGuards(AuthGuard)
  public async removeTrainingFromTrainingSet(
    @Args('id') id: string,
    @JwtUser() user: JwtUserType,
  ): Promise<Training> {
    const training = this.returnOrBail(await this.trainingService.findById(id));
    const result = _.clone(training);
    await this.checkOwnership(training.owner, user);
    await this.trainingService.remove(training);
    return result;
  }
}
