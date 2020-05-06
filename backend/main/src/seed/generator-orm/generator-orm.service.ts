import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../user/user.entity';
import { GeneratorGraphqlService } from '../generator-graphql/generator-graphql.service';
import { Training } from '../../training/training/training.entity';
import { TrainingSet } from '../../training/training-set/training-set.entity';
import * as _ from 'lodash';
import { Media } from '../../media/media/media.entity';
import { Source } from '../../media/source/source.entity';
import { Token } from '../../user/token/token.entity';
import { chance } from '../chance';
import { TokenType } from '../../graphql/ts/types';

@Injectable()
export class GeneratorOrmService {
  constructor(
    @Inject(GeneratorGraphqlService)
    private gqlGenerator: GeneratorGraphqlService,
  ) {}

  public token(generateUser: boolean = true): Token {
    const token = new Token();
    token.id = chance.guid();
    token.createdAt = this.gqlGenerator.dateTime();
    token.updatedAt = this.gqlGenerator.dateTime();
    token.validUntil = chance.bool() && this.gqlGenerator.dateTime();
    token.token = chance.guid();
    token.tokenType = chance.pickone([
      TokenType.EMAIL_CONFIRMATION,
      TokenType.PASSWORD_RESET,
    ]);
    token.user = generateUser && this.user(false);
    token.valid = chance.bool();
    return token;
  }

  public user(generateTokens: boolean = true): User {
    const gql = this.gqlGenerator.user();
    const user = new User();
    user.id = gql.id;
    user.email = gql.email;
    user.userName = gql.userName;
    user.firstName = gql.firstName;
    user.lastName = gql.lastName;
    user.role = gql.role;
    user.createdAt = gql.createdAt;
    user.updatedAt = gql.updatedAt;
    user.lastLogin = gql.lastLogin;
    user.password = '';
    user.tokens =
      generateTokens && Promise.resolve(_.times(10, () => this.token(false)));
    return user;
  }

  public source(): Source {
    const gql = this.gqlGenerator.source();
    const source = new Source();
    source.resourceId = gql.resourceId;
    source.url = gql.url;
    source.thumbnail = gql.thumbnail;
    source.mediaType = gql.mediaType;
    source.sourceType = gql.sourceType;
    return source;
  }

  public media(): Media {
    const gql = this.gqlGenerator.media();
    const media = new Media();
    media.id = gql.id;
    media.createdAt = gql.createdAt;
    media.updatedAt = gql.updatedAt;
    media.source = Promise.resolve(this.source());
    return media;
  }

  public training(trainingSet?: TrainingSet): Training {
    const gql = this.gqlGenerator.training();
    const training = new Training();
    training.id = gql.id;
    training.label = gql.label;
    training.createdAt = gql.createdAt;
    training.updatedAt = gql.updatedAt;
    training.trainingSet = Promise.resolve(
      (!trainingSet ? this.trainingSet(false) : trainingSet) as TrainingSet,
    );
    training.medias = Promise.resolve(_.times(10, () => this.media()));
    return training;
  }

  public trainingSet(generateTrainings: boolean = true): TrainingSet {
    const gql = this.gqlGenerator.trainingSet();
    const trainingSet = new TrainingSet();
    trainingSet.id = gql.id;
    trainingSet.trainings = Promise.resolve(
      generateTrainings ? _.times(10, () => this.training(trainingSet)) : [],
    );
    trainingSet.owner = Promise.resolve(this.user());
    trainingSet.label = gql.label;
    trainingSet.createdAt = gql.createdAt;
    trainingSet.updatedAt = gql.updatedAt;
    return trainingSet;
  }
}
