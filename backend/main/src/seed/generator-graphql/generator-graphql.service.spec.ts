import { Test, TestingModule } from '@nestjs/testing';
import { testDateTime } from '../../test/datetime.tester';
import {
  testUser,
  testUserRegister,
  testUserUpdate,
} from '../../test/user.tester';
import { GeneratorGraphqlService } from './generator-graphql.service';
import { testMedia, testSource } from '../../test/media.tester';
import {
  testTraining,
  testTrainingMediaInput,
  testTrainingUpdateInput,
} from '../../test/training.tester';
import {
  testTrainingSet,
  testTrainingSetInput,
} from '../../test/training-set.tester';
import { testTrainingDraftInput } from '../../test/training-draft.tester';

describe('GeneratorGraphqlService', () => {
  let service: GeneratorGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorGraphqlService],
    }).compile();

    service = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate valid DateTime', () => {
    const dateTime = service.dateTime();
    testDateTime(dateTime);
  });

  it('should generate valid User', () => {
    const user = service.user();
    return testUser(user);
  });

  it('should generate valid UserRegister', () => {
    const userRegister = service.userRegister();
    testUserRegister(userRegister);
  });

  it('should generate valid UserUpdate', () => {
    const userUpdate = service.userUpdate(false);
    testUserUpdate(userUpdate);
  });

  it('should generate valid UserUpdate with matching passwords', () => {
    const userUpdate = service.userUpdate();
    expect(userUpdate.passwordRepeat).toEqual(userUpdate.password);
    testUserUpdate(userUpdate);
  });

  it('should generate media with any source', () => {
    const media = service.media();
    testMedia(media);
  });

  it('should generate training', () => {
    const training = service.training();
    return testTraining(training);
  });

  it('should generate source', () => {
    const source = service.source();
    testSource(source);
  });

  it('should generate training draft input', () => {
    const trainingDraft = service.trainingDraftInput();
    testTrainingDraftInput(trainingDraft);
  });

  it('should generate training set', () => {
    const trainingSet = service.trainingSet();
    return testTrainingSet(trainingSet);
  });

  it('should generate training set input', () => {
    const trainingDraft = service.trainingSetInput();
    testTrainingSetInput(trainingDraft);
  });

  it('should generate training media input', () => {
    const trainingMediaInput = service.trainingMediaInput();
    testTrainingMediaInput(trainingMediaInput);
  });

  it('should generate training update input', () => {
    const trainingUpdateInput = service.trainingUpdateInput();
    testTrainingUpdateInput(trainingUpdateInput);
  });
});
