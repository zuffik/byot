import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSetResolver } from './training-set.resolver';
import { SeedModule } from '../../seed/seed.module';
import { GeneratorOtherService } from '../../seed/generator-other/generator-other.service';
import { TrainingSetService } from './training-set.service';
import { proxyMock } from '../../test/proxy.mock';
import { FulltextFilterForUser, Role } from '../../graphql/ts/types';
import { testList } from '../../test/list.tester';
import { GeneratorOrmService } from '../../seed/generator-orm/generator-orm.service';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';

describe('TrainingSetResolver', () => {
  let resolver: TrainingSetResolver;
  let otherGenerator: GeneratorOtherService;
  let ormGenerator: GeneratorOrmService;
  let gqlGenerator: GeneratorGraphqlService;
  let trainingSetService: TrainingSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        TrainingSetResolver,
        {
          provide: TrainingSetService,
          useValue: proxyMock({
            findAndCount: jest.fn(async () => [[], 0]),
          }),
        },
      ],
    }).compile();

    resolver = module.get<TrainingSetResolver>(TrainingSetResolver);
    otherGenerator = module.get<GeneratorOtherService>(GeneratorOtherService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    trainingSetService = module.get<TrainingSetService>(TrainingSetService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(otherGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(trainingSetService).toBeDefined();
  });

  it('should fetch all training sets as admin', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const spyFindAndCount = jest.spyOn(trainingSetService, 'findAndCount');
    const filter: FulltextFilterForUser = {};
    const result = await resolver.allTrainingSets(filter, jwtUser);
    testList(result);
    expect(spyFindAndCount).toBeCalledWith(filter);
  });

  it('should fetch all training sets as user', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const spyFindAndCount = jest.spyOn(trainingSetService, 'findAndCount');
    const filter: FulltextFilterForUser = {
      idUser: 'any',
    };
    const result = await resolver.allTrainingSets(filter, jwtUser);
    testList(result);
    expect(spyFindAndCount).toBeCalledWith({
      ...filter,
      idUser: jwtUser.id,
    });
  });

  it('should fetch single training set as admin', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const id = 'id';
    const trainingSet = ormGenerator.trainingSet();
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const result = await resolver.trainingSet(id, jwtUser);
    expect(result).toEqual(trainingSet);
    expect(spyFindById).toBeCalledWith(id);
  });

  it('should fetch single training set as its owner', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const id = 'id';
    const trainingSet = ormGenerator.trainingSet();
    const user = ormGenerator.user();
    user.id = jwtUser.id;
    trainingSet.owner = Promise.resolve(user);
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const result = await resolver.trainingSet(id, jwtUser);
    expect(result).toEqual(trainingSet);
    expect(spyFindById).toBeCalledWith(id);
  });

  it('should fail fetching single training set as its non-owner', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const id = 'id';
    const trainingSet = ormGenerator.trainingSet();
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    await expect(resolver.trainingSet(id, jwtUser)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(spyFindById).toBeCalledWith(id);
  });

  it('should fail fetching non-existing training set', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const id = 'id';
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => undefined);
    await expect(resolver.trainingSet(id, jwtUser)).rejects.toBeInstanceOf(
      NotFoundException,
    );
    expect(spyFindById).toBeCalledWith(id);
  });

  it('should create training set', async () => {
    const jwtUser = otherGenerator.jwtUser();
    const input = gqlGenerator.trainingSetInput();
    const spyCreate = jest
      .spyOn(trainingSetService, 'create')
      .mockImplementation(async () => ormGenerator.trainingSet(false));
    await expect(resolver.createTrainingSet(input, jwtUser)).resolves;
    expect(spyCreate).toBeCalledWith(input, jwtUser.id);
  });

  it('should fail creating training set due to non-existing user (edge case)', async () => {
    const jwtUser = otherGenerator.jwtUser();
    const input = gqlGenerator.trainingSetInput();
    const spyCreate = jest
      .spyOn(trainingSetService, 'create')
      .mockImplementation(async () => undefined);
    await expect(
      resolver.createTrainingSet(input, jwtUser),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(spyCreate).toBeCalledWith(input, jwtUser.id);
  });

  it('should update training set as admin', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const id = 'id';
    const input = gqlGenerator.trainingSetInput();
    const trainingSet = ormGenerator.trainingSet(false);
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const spyUpdate = jest
      .spyOn(trainingSetService, 'update')
      .mockImplementation(async () => trainingSet);
    await resolver.updateTrainingSet(id, input, jwtUser);
    expect(spyFindById).toBeCalledWith(id);
    expect(spyUpdate).toBeCalledWith(id, input);
  });

  it('should fail updating non-existing training set as admin', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const id = 'id';
    const input = gqlGenerator.trainingSetInput();
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => undefined);
    const spyUpdate = jest.spyOn(trainingSetService, 'update');
    await expect(
      resolver.updateTrainingSet(id, input, jwtUser),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(spyFindById).toBeCalledWith(id);
    expect(spyUpdate).not.toBeCalled();
  });

  it('should update training set as owner', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const id = 'id';
    const input = gqlGenerator.trainingSetInput();
    const trainingSet = ormGenerator.trainingSet(false);
    const user = ormGenerator.user();
    user.id = jwtUser.id;
    trainingSet.owner = Promise.resolve(user);
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const spyUpdate = jest
      .spyOn(trainingSetService, 'update')
      .mockImplementation(async () => trainingSet);
    await resolver.updateTrainingSet(id, input, jwtUser);
    expect(spyFindById).toBeCalledWith(id);
    expect(spyUpdate).toBeCalledWith(id, input);
  });

  it('should fail updating training set as non-owner', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const id = 'id';
    const input = gqlGenerator.trainingSetInput();
    const trainingSet = ormGenerator.trainingSet(false);
    const spyFindById = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const spyUpdate = jest.spyOn(trainingSetService, 'update');
    await expect(
      resolver.updateTrainingSet(id, input, jwtUser),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(spyFindById).toBeCalledWith(id);
    expect(spyUpdate).not.toBeCalled();
  });
});
