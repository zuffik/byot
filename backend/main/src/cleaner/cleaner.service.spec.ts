import { Test, TestingModule } from '@nestjs/testing';
import { CleanerService } from './cleaner.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { mockRepository } from '../test/proxy.mock';
import { Repository } from 'typeorm';
import { Token } from '../user/token/token.entity';
import { GeneratorOrmService } from '../seed/generator-orm/generator-orm.service';
import { SeedModule } from '../seed/seed.module';
import { TrainingSet } from '../training/training-set/training-set.entity';

describe('CleanerService', () => {
  let service: CleanerService;
  let userRepo: Repository<User>;
  let tokenRepo: Repository<Token>;
  let trainingSetRepo: Repository<TrainingSet>;
  let ormGenerator: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        CleanerService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Token),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(TrainingSet),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<CleanerService>(CleanerService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
    userRepo = module.get<Repository<User>>(getRepositoryToken(User));
    tokenRepo = module.get<Repository<Token>>(getRepositoryToken(Token));
    trainingSetRepo = module.get<Repository<TrainingSet>>(
      getRepositoryToken(TrainingSet),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(ormGenerator).toBeDefined();
    expect(userRepo).toBeDefined();
    expect(tokenRepo).toBeDefined();
    expect(trainingSetRepo).toBeDefined();
  });

  it('should remove existing user by email', async () => {
    const user = ormGenerator.user();
    const spyFind = jest
      .spyOn(userRepo, 'findOne')
      .mockImplementation(jest.fn(async () => user));
    const email = 'test@example.com';
    const spyDeleteToken = jest
      .spyOn(tokenRepo, 'delete')
      .mockImplementation(jest.fn());
    const spyDeleteUser = jest
      .spyOn(userRepo, 'remove')
      .mockImplementation(jest.fn());
    await service.removeUserByEmail(email);
    expect(spyFind).toBeCalledWith({ where: { email } });
    expect(spyDeleteToken).toBeCalledWith({ user: { id: user.id } });
    expect(spyDeleteUser).toBeCalledWith(user);
  });

  it('should not remove non-existing user by email', async () => {
    const spyFind = jest
      .spyOn(userRepo, 'findOne')
      .mockImplementation(jest.fn(async () => undefined));
    const email = 'test@example.com';
    const spyDeleteToken = jest
      .spyOn(tokenRepo, 'delete')
      .mockImplementation(jest.fn());
    const spyDeleteUser = jest
      .spyOn(userRepo, 'remove')
      .mockImplementation(jest.fn());
    await service.removeUserByEmail(email);
    expect(spyFind).toBeCalledWith({ where: { email } });
    expect(spyDeleteToken).not.toBeCalled();
    expect(spyDeleteUser).not.toBeCalled();
  });

  it('should cleanup after training set create', async () => {
    const user = ormGenerator.user();
    const trainingSets = [
      ormGenerator.trainingSet(),
      ormGenerator.trainingSet(),
    ];
    const spyFind = jest
      .spyOn(userRepo, 'findOne')
      .mockImplementation(jest.fn(async () => user));
    const spyFindSets = jest
      .spyOn(trainingSetRepo, 'find')
      .mockImplementation(jest.fn(async () => trainingSets));
    const spyRemove = jest
      .spyOn(trainingSetRepo, 'remove')
      .mockImplementation(jest.fn());
    const email = 'test@example.com';
    const count = 2;
    await service.removeLatestTrainingSetByCreator(email, count);
    expect(spyFind).toBeCalledWith({ where: { email } });
    expect(spyFindSets).toBeCalledWith({
      where: { owner: Promise.resolve({ id: user.id }) },
      take: count,
      order: { createdAt: 'DESC' },
    });
    expect(spyRemove).toBeCalledWith(trainingSets);
  });

  it('should cleanup after training set create', async () => {
    const spyFind = jest
      .spyOn(userRepo, 'findOne')
      .mockImplementation(jest.fn(async () => undefined));
    const spyFindSets = jest
      .spyOn(trainingSetRepo, 'find')
      .mockImplementation(jest.fn());
    const spyRemove = jest
      .spyOn(trainingSetRepo, 'remove')
      .mockImplementation(jest.fn());
    const email = 'test@example.com';
    const count = 2;
    await service.removeLatestTrainingSetByCreator(email, count);
    expect(spyFind).toBeCalledWith({ where: { email } });
    expect(spyFindSets).not.toBeCalled();
    expect(spyRemove).not.toBeCalled();
  });
});
