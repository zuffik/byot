import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSetService } from './training-set.service';
import { FulltextFilterForUser } from '../../graphql/ts/types';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TrainingSet } from './training-set.entity';
import { mockRepository, proxyMock } from '../../test/proxy.mock';
import { Repository } from 'typeorm';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';
import { GeneratorOrmService } from '../../seed/generator-orm/generator-orm.service';
import { SeedModule } from '../../seed/seed.module';
import { UserService } from '../../user/user.service';
import * as _ from 'lodash';

describe('TrainingSetService', () => {
  let service: TrainingSetService;
  let userService: UserService;
  let repository: Repository<TrainingSet>;
  let gqlGenerator: GeneratorGraphqlService;
  let ormGenerator: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        TrainingSetService,
        {
          provide: getRepositoryToken(TrainingSet),
          useValue: mockRepository(),
        },
        {
          provide: UserService,
          useValue: proxyMock(),
        },
      ],
    }).compile();

    service = module.get<TrainingSetService>(TrainingSetService);
    userService = module.get<UserService>(UserService);
    repository = module.get<Repository<TrainingSet>>(
      getRepositoryToken(TrainingSet),
    );
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
  });

  it('should fetch all training sets', async () => {
    const filter: FulltextFilterForUser = {};
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({});
  });

  it('should fetch all training sets with pagination', async () => {
    const filter: FulltextFilterForUser = {
      pagination: { limit: 10, offset: 0 },
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      skip: filter.pagination.offset,
      take: filter.pagination.limit,
    });
  });

  it('should fetch all training sets with owner', async () => {
    const filter: FulltextFilterForUser = {
      idUser: 'id',
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      relations: ['owner'],
      where: {
        owner: { id: filter.idUser },
      },
    });
  });

  it('should fetch all training sets with search', async () => {
    const filter: FulltextFilterForUser = {
      query: 'query',
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      where: {
        label: expect.anything(),
      },
    });
  });

  it('should fetch training set by ID', async () => {
    const id = 'id';
    const spy = jest.spyOn(repository, 'findOne');
    await service.findById(id);
    expect(spy).toBeCalledWith({
      where: { id },
    });
  });

  it('should create training set', async () => {
    const ownerId = 'id';
    const owner = ormGenerator.user();
    const trainingSet = ormGenerator.trainingSet();
    const trainingSetInput = gqlGenerator.trainingSetInput();
    const spyFetchUser = jest
      .spyOn(userService, 'findById')
      .mockImplementation(async () => _.clone(owner));
    const spyCreate = jest
      .spyOn(repository, 'create')
      .mockImplementation(() => trainingSet);
    const spySave = jest.spyOn(repository, 'save');
    await service.create(trainingSetInput, ownerId);
    expect(spyCreate).toBeCalledWith(trainingSetInput);
    trainingSet.owner = Promise.resolve(owner);
    expect(spySave).toBeCalledWith(trainingSet);
    expect(spyFetchUser).toBeCalledWith(ownerId);
  });

  it('should update training set', async () => {
    const id = 'id';
    const trainingSetInput = gqlGenerator.trainingSetInput();
    const trainingSet = ormGenerator.trainingSet();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => trainingSet);
    const spySave = jest.spyOn(repository, 'save');
    await service.update(id, trainingSetInput);
    expect(spyFind).toBeCalledWith(id);
    trainingSet.label = trainingSetInput.label;
    expect(spySave).toBeCalledWith(trainingSet);
  });

  it('should fail updating training set', async () => {
    const id = 'id';
    const trainingSetInput = gqlGenerator.trainingSetInput();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => undefined);
    const spySave = jest.spyOn(repository, 'save');
    await service.update(id, trainingSetInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).not.toBeCalled();
  });
});
