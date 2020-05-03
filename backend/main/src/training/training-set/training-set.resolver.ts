import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
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
import * as _ from 'lodash';

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

  @Query('trainingSet')
  @UseGuards(AuthGuard)
  public async trainingSet(
    @Args('id') id: string,
    @JwtUser() user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return trainingSet;
  }

  @Mutation('createTrainingSet')
  @UseGuards(AuthGuard)
  public async createTrainingSet(
    @Args('trainingSet') input: TrainingSetInput,
    @JwtUser() user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = await this.trainingSetService.create(input, user.id);
    if (!trainingSet) {
      throw new BadRequestException('User does not exists!');
    }
    return trainingSet;
  }

  @Mutation('updateTrainingSet')
  @UseGuards(AuthGuard)
  public async updateTrainingSet(
    @Args('id') id: string,
    @Args('trainingSet') input: TrainingSetInput,
    @JwtUser() user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    return await this.trainingSetService.update(id, input);
  }

  @Mutation('removeTrainingSet')
  @UseGuards(AuthGuard)
  public async removeTrainingSet(
    @Args('id') id: string,
    @JwtUser() user: JwtUserType,
  ): Promise<TrainingSet> {
    const trainingSet = this.returnOrBail(
      await this.trainingSetService.findById(id),
    );
    await this.checkOwnership(trainingSet.owner, user);
    const result = _.clone(trainingSet);
    await this.trainingSetService.remove(trainingSet);
    return result;
  }
}
