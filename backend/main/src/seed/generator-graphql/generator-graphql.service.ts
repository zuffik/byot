import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { chance } from '../chance';
import {
  AuthName,
  AuthNameCheck,
  DateTime,
  Media,
  MediaType,
  Role,
  Source,
  SourceType,
  Training,
  TrainingDraftInput,
  TrainingMediaInput,
  TrainingSet,
  TrainingSetInput,
  TrainingUpdateInput,
  User as IUser,
  UserRegister,
  UserUpdateInput,
} from '../../graphql/ts/types';
import * as _ from 'lodash';

@Injectable()
export class GeneratorGraphqlService {
  public dateTime(): DateTime {
    const date = moment(chance.integer({ min: 0, max: +moment() }));
    return {
      iso: date.toISOString(),
      humanReadable: date.format(),
    };
  }

  public user(): IUser {
    const first = chance.first();
    const last = chance.last();
    return {
      id: chance.guid(),
      createdAt: this.dateTime(),
      updatedAt: chance.bool({ likelihood: 20 }) ? this.dateTime() : undefined,
      lastLogin: chance.bool({ likelihood: 90 }) ? this.dateTime() : undefined,
      email: chance.email(),
      firstName: first,
      fullName: last,
      lastName: `${first} ${last}`,
      role: chance.bool({ likelihood: 10 }) ? Role.ADMIN : Role.USER,
      userName: chance.twitter().substr(1),
    };
  }

  public userRegister(): UserRegister {
    const generateName = chance.bool({ likelihood: 60 });
    return {
      email: chance.email(),
      firstName: generateName ? chance.first() : undefined,
      lastName: generateName ? chance.last() : undefined,
      password: chance.guid(),
      userName: chance.twitter().substr(1),
    };
  }

  public userUpdate(matchingPassword: boolean = true): UserUpdateInput {
    const pass =
      chance.bool({ likelihood: 30 }) || matchingPassword
        ? chance.word()
        : undefined;
    const passRep = matchingPassword ? pass : chance.word();
    return {
      role:
        chance.bool({ likelihood: 10 }) &&
        (chance.bool({ likelihood: 10 }) ? Role.ADMIN : Role.USER),
      email: chance.bool({ likelihood: 30 }) && chance.email(),
      firstName: chance.bool({ likelihood: 60 }) && chance.first(),
      lastName: chance.bool({ likelihood: 60 }) && chance.last(),
      userName: chance.bool({ likelihood: 20 }) && chance.twitter(),
      password: pass,
      passwordRepeat: passRep,
    };
  }

  public media(): Media {
    return {
      id: chance.guid(),
      label: chance.sentence(),
      source: this.source(),
      updatedAt: this.dateTime(),
      createdAt: this.dateTime(),
    };
  }

  public source(): Source {
    return {
      sourceType: SourceType.YOUTUBE,
      mediaType: chance.pickone([
        MediaType.VIDEO,
        MediaType.AUDIO,
        MediaType.IMAGE,
      ]),
      thumbnail: 'https://picsum.photos/200',
      id: chance.guid(),
      resourceId: chance.guid(),
      url: chance.url(),
    };
  }

  public trainingMediaInput(): TrainingMediaInput {
    return {
      sourceType: SourceType.YOUTUBE,
      id: chance.guid(),
    };
  }

  public training(generateTrainingSet: boolean = true): Training {
    return {
      id: chance.guid(),
      trainingSet: generateTrainingSet ? this.trainingSet(false) : undefined,
      createdAt: this.dateTime(),
      updatedAt: this.dateTime(),
      label: chance.sentence({ words: 4 }),
      media: {
        meta: {
          totalCount: 10,
        },
        entries: _.times(10, () => this.media()),
      },
      owner: this.user(),
    };
  }

  public trainingSet(generateTrainings: boolean = true): TrainingSet {
    return {
      id: chance.guid(),
      createdAt: this.dateTime(),
      updatedAt: this.dateTime(),
      label: chance.sentence({ words: 4 }),
      owner: this.user(),
      trainings: {
        meta: {
          totalCount: 10,
        },
        entries: generateTrainings
          ? _.times(10, () => this.training(false))
          : [],
      },
    };
  }

  public trainingDraftInput(): TrainingDraftInput {
    return {
      label: chance.sentence({ words: 4 }),
      idTrainingSet: chance.guid(),
      media: _.times(10, () => this.trainingMediaInput()),
    };
  }

  public trainingSetInput(): TrainingSetInput {
    return {
      label: chance.sentence({ words: 4 }),
    };
  }

  public trainingUpdateInput(): TrainingUpdateInput {
    return {
      label: chance.sentence({ words: 4 }),
      media: _.times(10, () => this.trainingMediaInput()),
    };
  }

  public authNameCheck(): AuthNameCheck {
    const email = chance.bool();
    return {
      name: email ? chance.email() : chance.twitter().slice(1),
      type: email ? AuthName.EMAIL : AuthName.USER_NAME,
    };
  }
}
