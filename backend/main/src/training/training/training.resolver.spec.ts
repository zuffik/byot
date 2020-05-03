import { Test, TestingModule } from '@nestjs/testing';
import { TrainingResolver } from './training.resolver';
import { TrainingService } from './training.service';
import { proxyMock } from '../../test/proxy.mock';
import {
  FulltextFilter,
  Role,
  TrainingMediaInput,
} from '../../graphql/ts/types';
import { SeedModule } from '../../seed/seed.module';
import { GeneratorOtherService } from '../../seed/generator-other/generator-other.service';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';
import { testList } from '../../test/list.tester';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { GeneratorOrmService } from '../../seed/generator-orm/generator-orm.service';
import { TrainingSetService } from '../training-set/training-set.service';
import * as _ from 'lodash';

describe('TrainingResolver', () => {
  let resolver: TrainingResolver;
  let trainingService: TrainingService;
  let trainingSetService: TrainingSetService;
  let otherGenerator: GeneratorOtherService;
  let gqlGenerator: GeneratorGraphqlService;
  let ormGenerator: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        TrainingResolver,
        {
          provide: TrainingService,
          useValue: proxyMock({
            findAndCount: jest.fn(async () => [[], 0]),
          }),
        },
        {
          provide: TrainingSetService,
          useValue: proxyMock({
            findAndCount: jest.fn(async () => [[], 0]),
          }),
        },
      ],
    }).compile();

    resolver = module.get<TrainingResolver>(TrainingResolver);
    trainingService = module.get<TrainingService>(TrainingService);
    trainingSetService = module.get<TrainingSetService>(TrainingSetService);
    otherGenerator = module.get<GeneratorOtherService>(GeneratorOtherService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(trainingService).toBeDefined();
    expect(trainingSetService).toBeDefined();
    expect(otherGenerator).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
  });

  it('should fetch completely all trainings', async () => {
    const filter: FulltextFilter = {
      pagination: {
        limit: 10,
        offset: 0,
      },
      query: 'query',
    };
    const user = otherGenerator.jwtUser();
    user.role = Role.ADMIN;
    const spyFindAndCount = jest.spyOn(trainingService, 'findAndCount');
    const result = await resolver.allTrainings(filter, user);
    testList(result);
    expect(spyFindAndCount).toBeCalledWith(filter);
  });

  it('should fetch all trainings for user', async () => {
    const filter: FulltextFilter = {
      pagination: {
        limit: 10,
        offset: 0,
      },
      query: 'query',
    };
    const user = otherGenerator.jwtUser();
    user.role = Role.USER;
    const spyFindAndCount = jest.spyOn(trainingService, 'findAndCount');
    const result = await resolver.allTrainings(filter, user);
    testList(result);
    expect(spyFindAndCount).toBeCalledWith({
      ...filter,
      idUser: user.id,
    });
  });

  it('should fetch single training as admin', async () => {
    const id = 'id';
    const user = otherGenerator.jwtUser();
    user.role = Role.ADMIN;
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => ormGenerator.training());
    await resolver.training(id, user);
    expect(spyFind).toBeCalledWith(id);
  });

  it('should fail fetching due to non-existing training', async () => {
    const id = 'id';
    const user = otherGenerator.jwtUser();
    user.role = Role.ADMIN;
    jest.spyOn(trainingService, 'findById');
    await expect(resolver.training(id, user)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });

  it('should fetch own training', async () => {
    const id = 'id';
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet(false);
    const user = ormGenerator.user();
    user.id = jwtUser.id;
    trainingSet.owner = Promise.resolve(user);
    training.trainingSet = Promise.resolve(trainingSet);
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => training);
    await expect(resolver.training(id, jwtUser)).resolves.toEqual(training);
    expect(spyFind).toBeCalledWith(id);
  });

  it('should fail fetching not owned training', async () => {
    const id = 'id';
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet(false);
    const user = ormGenerator.user();
    trainingSet.owner = Promise.resolve(user);
    training.trainingSet = Promise.resolve(trainingSet);
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => training);
    await expect(resolver.training(id, jwtUser)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(spyFind).toBeCalledWith(id);
  });

  it('should create training as admin', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const trainingDraftInput = gqlGenerator.trainingDraftInput();
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet();
    const spyFindSet = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const spyCreate = jest
      .spyOn(trainingService, 'create')
      .mockImplementation(async () => training);
    await resolver.createTraining(trainingDraftInput, jwtUser);
    expect(spyFindSet).toBeCalledWith(trainingDraftInput.idTrainingSet);
    expect(spyCreate).toBeCalledWith(trainingDraftInput, trainingSet);
  });

  it('should fail create training as admin due to non-existing training set', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const trainingDraftInput = gqlGenerator.trainingDraftInput();
    const training = ormGenerator.training();
    const spyFindSet = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => undefined);
    const spyCreate = jest
      .spyOn(trainingService, 'create')
      .mockImplementation(async () => training);
    await expect(
      resolver.createTraining(trainingDraftInput, jwtUser),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(spyFindSet).toBeCalledWith(trainingDraftInput.idTrainingSet);
    expect(spyCreate).not.toBeCalled();
  });

  it('should create training as user', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const trainingDraftInput = gqlGenerator.trainingDraftInput();
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet();
    const user = ormGenerator.user();
    user.id = jwtUser.id;
    trainingSet.owner = Promise.resolve(user);
    const spyFindSet = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const spyCreate = jest
      .spyOn(trainingService, 'create')
      .mockImplementation(async () => training);
    await resolver.createTraining(trainingDraftInput, jwtUser);
    expect(spyFindSet).toBeCalledWith(trainingDraftInput.idTrainingSet);
    expect(spyCreate).toBeCalledWith(trainingDraftInput, trainingSet);
  });

  it('should fail create training as user because training set is not owned by the user', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const trainingDraftInput = gqlGenerator.trainingDraftInput();
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet();
    const spyFindSet = jest
      .spyOn(trainingSetService, 'findById')
      .mockImplementation(async () => trainingSet);
    const spyCreate = jest
      .spyOn(trainingService, 'create')
      .mockImplementation(async () => training);
    await expect(
      resolver.createTraining(trainingDraftInput, jwtUser),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(spyFindSet).toBeCalledWith(trainingDraftInput.idTrainingSet);
    expect(spyCreate).not.toBeCalled();
  });

  it('should update training as admin', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    const trainingUpdateInput = gqlGenerator.trainingUpdateInput();
    const training = ormGenerator.training();
    const spyFindById = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => training);
    const spyUpdate = jest
      .spyOn(trainingService, 'update')
      .mockImplementation(async () => training);
    const id = 'id';
    await resolver.updateTraining(id, trainingUpdateInput, jwtUser);
    expect(spyUpdate).toBeCalledWith(id, trainingUpdateInput);
    expect(spyFindById).toBeCalledWith(id);
  });

  it('should update training as user', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const trainingUpdateInput = gqlGenerator.trainingUpdateInput();
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet();
    const user = ormGenerator.user();
    user.id = jwtUser.id;
    trainingSet.owner = Promise.resolve(user);
    training.trainingSet = Promise.resolve(trainingSet);
    const spyFindById = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => training);
    const spyUpdate = jest
      .spyOn(trainingService, 'update')
      .mockImplementation(async () => training);
    const id = 'id';
    await resolver.updateTraining(id, trainingUpdateInput, jwtUser);
    expect(spyUpdate).toBeCalledWith(id, trainingUpdateInput);
    expect(spyFindById).toBeCalledWith(id);
  });

  it('should fail update training as user due to non-owning training set', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const trainingUpdateInput = gqlGenerator.trainingUpdateInput();
    const training = ormGenerator.training();
    const spyFindById = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => training);
    const spyUpdate = jest.spyOn(trainingService, 'update');
    const id = 'id';
    await expect(
      resolver.updateTraining(id, trainingUpdateInput, jwtUser),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(spyFindById).toBeCalledWith(id);
    expect(spyUpdate).not.toBeCalled();
  });

  it('should fail update training as user due to non-found training', async () => {
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const trainingUpdateInput = gqlGenerator.trainingUpdateInput();
    const spyFindById = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => undefined);
    const spyUpdate = jest.spyOn(trainingService, 'update');
    const id = 'id';
    await expect(
      resolver.updateTraining(id, trainingUpdateInput, jwtUser),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(spyFindById).toBeCalledWith(id);
    expect(spyUpdate).not.toBeCalled();
  });

  it('should resolve media field', async () => {
    const training = ormGenerator.training();
    testList(await resolver.resolveMedia(training));
  });

  it('should remove media from training as admin', async () => {
    const training = ormGenerator.training();
    const idTraining = 'idTraining';
    const idMedia = (await training.medias)[0].id;
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spyUpdate = jest.spyOn(trainingService, 'update');
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    await resolver.removeMediaFromTraining(idTraining, idMedia, jwtUser);
    expect(spyFind).toBeCalledWith(idTraining);
    training.medias = Promise.resolve(
      (await training.medias).filter((media) => media.id !== idMedia),
    );
    expect(spyUpdate).toBeCalledWith(idTraining, {
      label: training.label,
      media: expect.arrayContaining(
        await Promise.all(
          (await training.medias).map(
            async (m): Promise<TrainingMediaInput> => {
              const source = await m.source;
              return {
                id: source.resourceId,
                sourceType: source.sourceType,
              };
            },
          ),
        ),
      ),
    });
  });

  it('should remove media from training as owner', async () => {
    const training = ormGenerator.training();
    const trainingSet = ormGenerator.trainingSet();
    const user = ormGenerator.user();
    const jwtUser = otherGenerator.jwtUser();
    user.id = jwtUser.id;
    jwtUser.role = Role.USER;
    trainingSet.owner = Promise.resolve(user);
    training.trainingSet = Promise.resolve(trainingSet);
    const idTraining = 'idTraining';
    const idMedia = (await training.medias)[0].id;
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spyUpdate = jest.spyOn(trainingService, 'update');
    await resolver.removeMediaFromTraining(idTraining, idMedia, jwtUser);
    expect(spyFind).toBeCalledWith(idTraining);
    training.medias = Promise.resolve(
      (await training.medias).filter((media) => media.id !== idMedia),
    );
    expect(spyUpdate).toBeCalledWith(idTraining, {
      label: training.label,
      media: expect.arrayContaining(
        await Promise.all(
          (await training.medias).map(
            async (m): Promise<TrainingMediaInput> => {
              const source = await m.source;
              return {
                id: source.resourceId,
                sourceType: source.sourceType,
              };
            },
          ),
        ),
      ),
    });
  });

  it('should fail removing media from training as non-owner', async () => {
    const training = ormGenerator.training();
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.USER;
    const idTraining = 'idTraining';
    const idMedia = (await training.medias)[0].id;
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spyUpdate = jest.spyOn(trainingService, 'update');
    await expect(
      resolver.removeMediaFromTraining(idTraining, idMedia, jwtUser),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(spyFind).toBeCalledWith(idTraining);
    expect(spyUpdate).not.toBeCalled();
  });

  it('should fail removing media from non-existing training as admin', async () => {
    const training = ormGenerator.training();
    const idTraining = 'idTraining';
    const idMedia = (await training.medias)[0].id;
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => undefined);
    const spyUpdate = jest.spyOn(trainingService, 'update');
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    await expect(
      resolver.removeMediaFromTraining(idTraining, idMedia, jwtUser),
    ).rejects.toBeInstanceOf(NotFoundException);
    expect(spyFind).toBeCalledWith(idTraining);
    expect(spyUpdate).not.toBeCalled();
  });

  it('should fail removing non-existing media from training as admin', async () => {
    const training = ormGenerator.training();
    const idTraining = 'idTraining';
    const idMedia = 'idMedia';
    const spyFind = jest
      .spyOn(trainingService, 'findById')
      .mockImplementation(async () => training);
    const spyUpdate = jest.spyOn(trainingService, 'update');
    const jwtUser = otherGenerator.jwtUser();
    jwtUser.role = Role.ADMIN;
    await expect(
      resolver.removeMediaFromTraining(idTraining, idMedia, jwtUser),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(spyFind).toBeCalledWith(idTraining);
    expect(spyUpdate).not.toBeCalled();
  });
});
