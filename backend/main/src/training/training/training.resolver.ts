import { Resolver } from '@nestjs/graphql';
import {
  FulltextFilter,
  FulltextFilterForUser,
  Role,
  TrainingDraftInput,
  TrainingList,
  TrainingUpdateInput,
} from '../../graphql/ts/types';
import { BaseResolver } from '../../helpers/BaseResolver';
import { ForbiddenException, Inject } from '@nestjs/common';
import { TrainingService } from './training.service';
import { TrainingSetService } from '../training-set/training-set.service';
import { JwtUserType } from '../../auth/decorators/jwt-user.decorator';
import { Training } from './training.entity';

@Resolver('Training')
export class TrainingResolver extends BaseResolver {
  constructor(
    @Inject(TrainingService) private readonly trainingService: TrainingService,
    @Inject(TrainingSetService)
    private readonly trainingSetService: TrainingSetService,
  ) {
    super();
  }

  public async allTrainings(
    f?: FulltextFilter,
    user?: JwtUserType,
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

  public async training(id: string, user: JwtUserType): Promise<Training> {
    const training = this.returnOrBail(await this.trainingService.findById(id));
    if (user.role !== Role.ADMIN && (await training.owner).id !== user.id) {
      throw new ForbiddenException();
    }
    return training;
  }

  public async createTraining(
    input: TrainingDraftInput,
    user: JwtUserType,
  ): Promise<Training> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(input.idTrainingSet),
    );
    if (user.role !== Role.ADMIN && (await trainingSet.owner).id !== user.id) {
      throw new ForbiddenException();
    }
    return await this.trainingService.create(input, trainingSet);
  }

  public async updateTraining(
    id: string,
    input: TrainingUpdateInput,
    user: JwtUserType,
  ): Promise<Training> {
    const training = this.returnOrBail(await this.trainingService.findById(id));
    if (user.role !== Role.ADMIN && (await training.owner).id !== user.id) {
      throw new ForbiddenException();
    }
    return await this.trainingService.update(id, input);
  }
}
