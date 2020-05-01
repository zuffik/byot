import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { TrainingSetService } from './training-set.service';
import {
  FulltextFilterForUser,
  Role,
  TrainingList,
  TrainingSetInput,
  TrainingSetList,
} from '../../graphql/ts/types';
import { JwtUser, JwtUserType } from '../../auth/decorators/jwt-user.decorator';
import { BaseResolver } from '../../helpers/BaseResolver';
import { TrainingSet } from './training-set.entity';
import { AuthGuard } from '../../auth/jwt/auth.guard';

@Resolver('TrainingSet')
export class TrainingSetResolver extends BaseResolver {
  constructor(
    @Inject(TrainingSetService)
    private readonly trainingSetService: TrainingSetService,
  ) {
    super();
  }

  @Query('allTrainingSets')
  @UseGuards(AuthGuard)
  public async allTrainingSets(
    @Args('filter') filter?: FulltextFilterForUser,
    @JwtUser() user?: JwtUserType,
  ): Promise<TrainingSetList> {
    filter = filter || {};
    if (user.role === Role.USER) {
      filter.idUser = user.id;
    }
    return this.createList<TrainingSetList>(
      await this.trainingSetService.findAndCount(filter),
    );
  }

  @ResolveField('trainings')
  public async resolveTrainings(
    @Parent() trainingSet: TrainingSet,
  ): Promise<TrainingList> {
    const trainings = await trainingSet.trainings;
    return this.createList<TrainingList>([trainings, trainings.length]);
  }

  public async trainingSet(
    id: string,
    user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return trainingSet;
  }

  public async createTrainingSet(
    input: TrainingSetInput,
    user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = await this.trainingSetService.create(input, user.id);
    if (!trainingSet) {
      throw new BadRequestException('User does not exists!');
    }
    return trainingSet;
  }

  public async updateTrainingSet(
    id: string,
    input: TrainingSetInput,
    user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return await this.trainingSetService.update(id, input);
  }
}
