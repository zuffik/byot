import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from './training.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { mockRepository, proxyMock } from '../../test/proxy.mock';
import { Repository } from 'typeorm';
import { FulltextFilterForUser } from '../../graphql/ts/types';
import { SeedModule } from '../../seed/seed.module';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';
import { GeneratorOrmService } from '../../seed/generator-orm/generator-orm.service';
import * as _ from 'lodash';
import { MediaService } from '../../media/media/media.service';

describe('TrainingService', () => {
  let service: TrainingService;
  let mediaService: MediaService;
  let repository: Repository<Training>;
  let gqlGenerator: GeneratorGraphqlService;
  let ormGenerator: GeneratorOrmService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        TrainingService,
        {
          provide: getRepositoryToken(Training),
          useValue: mockRepository(),
        },
        {
          provide: MediaService,
          useValue: proxyMock({
            createOrFetch: jest.fn(async () => undefined),
          }),
        },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
    mediaService = module.get<MediaService>(MediaService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
    repository = module.get<Repository<Training>>(getRepositoryToken(Training));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mediaService).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
    expect(repository).toBeDefined();
  });

  it('should fetch single training', async () => {
    const id = 'id';
    const spy = jest.spyOn(repository, 'findOne');
    await service.findById(id);
    expect(spy).toBeCalledWith({
      where: { id },
    });
  });

  it('should fetch all trainings with no filter', async () => {
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount();
    expect(spy).toBeCalledWith({
      order: { createdAt: 'DESC' },
    });
  });

  it('should fetch all trainings with pagination', async () => {
    const filter: FulltextFilterForUser = {
      pagination: { offset: 0, limit: 10 },
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      order: { createdAt: 'DESC' },
      skip: filter.pagination.offset,
      take: filter.pagination.limit,
    });
  });

  it('should fetch all trainings with fulltext search', async () => {
    const filter: FulltextFilterForUser = {
      query: 'query',
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      order: { createdAt: 'DESC' },
      relations: ['medias'],
      where: {
        label: expect.anything(),
        medias: {
          label: expect.anything(),
        },
      },
    });
  });

  it('should fetch all trainings for user', async () => {
    const filter: FulltextFilterForUser = {
      idUser: 'idUser',
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      order: { createdAt: 'DESC' },
      relations: ['trainingSet', 'trainingSet.owner'],
      where: {
        trainingSet: {
          owner: {
            id: filter.idUser,
          },
        },
      },
    });
  });

  it('should fetch all trainings with full filter', async () => {
    const filter: FulltextFilterForUser = {
      idUser: 'idUser',
      pagination: { limit: 10, offset: 0 },
      query: 'query',
    };
    const spy = jest.spyOn(repository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spy).toBeCalledWith({
      order: { createdAt: 'DESC' },
      relations: expect.arrayContaining([
        'trainingSet',
        'trainingSet.owner',
        'medias',
      ]),
      where: {
        label: expect.anything(),
        medias: {
          label: expect.anything(),
        },
        trainingSet: {
          owner: {
            id: filter.idUser,
          },
        },
      },
      skip: filter.pagination.offset,
      take: filter.pagination.limit,
    });
  });

  it('should create training', async () => {
    const trainingInput = gqlGenerator.trainingDraftInput();
    const trainingSet = ormGenerator.trainingSet();
    const spySave = jest.spyOn(repository, 'save');
    const spyMedia = jest
      .spyOn(mediaService, 'findLocalOrCreateFromRemote')
      .mockImplementation(async () => ormGenerator.media());
    await service.create(trainingInput, trainingSet);
    expect(spySave).toBeCalledWith(
      expect.objectContaining({
        ...trainingInput,
        medias: expect.any(Promise),
        trainingSet: expect.any(Promise),
      }),
    );
    expect(spyMedia).toBeCalledTimes(trainingInput.media.length);
  });

  it('should update training', async () => {
    const id = 'id';
    const trainingInput = gqlGenerator.trainingUpdateInput();
    const training = ormGenerator.training();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spyMedia = jest
      .spyOn(mediaService, 'findLocalOrCreateFromRemote')
      .mockImplementation(async () => ormGenerator.media());
    const spySave = jest.spyOn(repository, 'save');
    training.medias = Promise.resolve(
      expect.arrayContaining(
        trainingInput.media.map((m) =>
          expect.objectContaining({
            source: {
              id: m.id,
              sourceType: m.sourceType,
            },
          }),
        ),
      ),
    );
    training.label = trainingInput.label;
    await service.update(id, trainingInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).toBeCalledWith(training);
    expect(spyMedia).toBeCalledTimes(trainingInput.media.length);
  });

  it('should remove training by removing its media', async () => {
    const id = 'id';
    const trainingInput = gqlGenerator.trainingUpdateInput();
    trainingInput.media = [];
    const training = ormGenerator.training();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spyMedia = jest.spyOn(mediaService, 'findLocalOrCreateFromRemote');
    const spySave = jest.spyOn(repository, 'save');
    const spyRemove = jest.spyOn(repository, 'remove');
    await service.update(id, trainingInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).not.toBeCalled();
    expect(spyMedia).not.toBeCalled();
    expect(spyRemove).toBeCalledWith(training);
  });

  it('should update training medias', async () => {
    const id = 'id';
    const trainingInput = gqlGenerator.trainingUpdateInput();
    trainingInput.label = undefined;
    const training = ormGenerator.training();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spyMedia = jest
      .spyOn(mediaService, 'findLocalOrCreateFromRemote')
      .mockImplementation(async () => ormGenerator.media());
    const spySave = jest.spyOn(repository, 'save');
    training.medias = Promise.resolve(
      expect.arrayContaining(
        trainingInput.media.map((m) =>
          expect.objectContaining({
            source: {
              id: m.id,
              sourceType: m.sourceType,
            },
          }),
        ),
      ),
    );
    await service.update(id, trainingInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).toBeCalledWith(training);
    expect(spyMedia).toBeCalledTimes(trainingInput.media.length);
  });

  it('should update training label', async () => {
    const id = 'id';
    const trainingInput = gqlGenerator.trainingUpdateInput();
    trainingInput.media = undefined;
    const training = ormGenerator.training();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spySave = jest.spyOn(repository, 'save');
    training.label = trainingInput.label;
    await service.update(id, trainingInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).toBeCalledWith(training);
  });

  it('should update training label', async () => {
    const id = 'id';
    const trainingInput = gqlGenerator.trainingUpdateInput();
    trainingInput.media = undefined;
    const training = ormGenerator.training();
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => _.clone(training));
    const spySave = jest.spyOn(repository, 'save');
    training.label = trainingInput.label;
    await service.update(id, trainingInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).toBeCalledWith(training);
  });

  it('should fail updating', async () => {
    const id = 'id';
    const trainingInput = gqlGenerator.trainingUpdateInput();
    trainingInput.media = undefined;
    const spyFind = jest
      .spyOn(service, 'findById')
      .mockImplementation(async () => undefined);
    const spySave = jest.spyOn(repository, 'save');
    await service.update(id, trainingInput);
    expect(spyFind).toBeCalledWith(id);
    expect(spySave).not.toBeCalled();
  });

  it('should remove training', async () => {
    const training = ormGenerator.training();
    const spyRemove = jest.spyOn(repository, 'remove');
    await service.remove(training);
    expect(spyRemove).toBeCalledWith(training);
  });
});
