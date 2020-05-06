import { Test, TestingModule } from '@nestjs/testing';
import { GeneratorOrmService } from './generator-orm.service';
import { testToken, testUser } from '../../test/user.tester';
import { GeneratorGraphqlService } from '../generator-graphql/generator-graphql.service';
import { testTraining } from '../../test/training.tester';
import { testTrainingSet } from '../../test/training-set.tester';
import { testMedia, testSource } from '../../test/media.tester';

describe('GeneratorOrmService', () => {
  let service: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GeneratorOrmService, GeneratorGraphqlService],
    }).compile();

    service = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should generate valid user', () => {
    const user = service.user();
    expect(user).toHaveProperty('password');
    return testUser(user);
  });

  it('should generate valid token', () => {
    const token = service.token();
    return testToken(token);
  });

  it('should generate media', () => {
    const media = service.media();
    return testMedia(media);
  });

  it('should generate source', () => {
    const source = service.source();
    testSource(source);
  });

  it('should generate training', () => {
    const training = service.training();
    return testTraining(training);
  });

  it('should generate training set', () => {
    const trainingSet = service.trainingSet();
    return testTrainingSet(trainingSet);
  });
});
