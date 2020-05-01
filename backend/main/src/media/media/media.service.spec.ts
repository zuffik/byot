import { Test, TestingModule } from '@nestjs/testing';
import { MediaService } from './media.service';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';
import { SeedModule } from '../../seed/seed.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Source } from '../source/source.entity';
import { mockRepository, proxyMock } from '../../test/proxy.mock';
import { Media } from './media.entity';
import { MediaRemoteService } from '../media-remote/media-remote.service';
import { GeneratorOrmService } from '../../seed/generator-orm/generator-orm.service';
import { Repository } from 'typeorm';
import { MediaFilter, MediaType, SourceType } from '../../graphql/ts/types';

describe('MediaService', () => {
  let service: MediaService;
  let gqlGenerator: GeneratorGraphqlService;
  let ormGenerator: GeneratorOrmService;
  let sourceRepository: Repository<Source>;
  let mediaRepository: Repository<Media>;
  let remoteMediaSerivce: MediaRemoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        MediaService,
        {
          provide: getRepositoryToken(Source),
          useValue: mockRepository(),
        },
        {
          provide: getRepositoryToken(Media),
          useValue: mockRepository(),
        },
        {
          provide: MediaRemoteService,
          useValue: proxyMock({
            findById: jest.fn(async () => undefined),
          }),
        },
      ],
    }).compile();

    service = module.get<MediaService>(MediaService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
    ormGenerator = module.get<GeneratorOrmService>(GeneratorOrmService);
    remoteMediaSerivce = module.get<MediaRemoteService>(MediaRemoteService);
    sourceRepository = module.get<Repository<Source>>(
      getRepositoryToken(Source),
    );
    mediaRepository = module.get<Repository<Media>>(getRepositoryToken(Media));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(gqlGenerator).toBeDefined();
    expect(ormGenerator).toBeDefined();
    expect(sourceRepository).toBeDefined();
    expect(mediaRepository).toBeDefined();
    expect(remoteMediaSerivce).toBeDefined();
  });

  it('should create non-existing media', async () => {
    const id = 'w3m4N0UVt0M';
    const sourceType = SourceType.YOUTUBE;
    const remoteMedia = gqlGenerator.media();
    const source = ormGenerator.source();
    const media = ormGenerator.media();
    remoteMedia.id = id;
    remoteMedia.source.id = id;
    const spyFindLocal = jest
      .spyOn(mediaRepository, 'findOne')
      .mockImplementation(async () => undefined);
    const spyFindRemote = jest
      .spyOn(remoteMediaSerivce, 'findById')
      .mockImplementation(async () => remoteMedia);
    const spySaveSource = jest
      .spyOn(sourceRepository, 'save')
      .mockImplementation(async () => source);
    const spyCreateMedia = jest
      .spyOn(mediaRepository, 'create')
      .mockImplementation(() => media);
    const spySaveMedia = jest
      .spyOn(mediaRepository, 'save')
      .mockImplementation(async () => media);
    await service.createOrFetchRemote({ sourceType, id });
    expect(spyFindLocal).toBeCalledWith({
      where: { id, sourceType },
    });
    expect(spyFindRemote).toBeCalledWith(id, sourceType);
    expect(spySaveSource).toBeCalledWith(remoteMedia.source);
    expect(spyCreateMedia).toBeCalledWith(remoteMedia);
    media.source = source;
    expect(spySaveMedia).toBeCalledWith(media);
  });

  it('should create existing media', async () => {
    const id = 'w3m4N0UVt0M';
    const sourceType = SourceType.YOUTUBE;
    const remoteMedia = gqlGenerator.media();
    const media = ormGenerator.media();
    remoteMedia.id = id;
    remoteMedia.source.id = id;
    const spyFindLocal = jest
      .spyOn(mediaRepository, 'findOne')
      .mockImplementation(async () => media);
    const spyFindRemote = jest.spyOn(remoteMediaSerivce, 'findById');
    const spySaveSource = jest.spyOn(sourceRepository, 'save');
    const spyCreateMedia = jest.spyOn(mediaRepository, 'create');
    const spySaveMedia = jest.spyOn(mediaRepository, 'save');
    await service.createOrFetchRemote({ sourceType, id });
    expect(spyFindLocal).toBeCalledWith({
      where: { id, sourceType },
    });
    expect(spyFindRemote).not.toBeCalled();
    expect(spySaveSource).not.toBeCalled();
    expect(spyCreateMedia).not.toBeCalled();
    expect(spySaveMedia).not.toBeCalled();
  });

  it('should fail due to non-existing remote media', async () => {
    const id = 'w3m4N0UVt0M';
    const sourceType = SourceType.YOUTUBE;
    const remoteMedia = gqlGenerator.media();
    remoteMedia.id = id;
    remoteMedia.source.id = id;
    const spyFindLocal = jest
      .spyOn(mediaRepository, 'findOne')
      .mockImplementation(async () => undefined);
    const spyFindRemote = jest
      .spyOn(remoteMediaSerivce, 'findById')
      .mockImplementation(async () => undefined);
    const spySaveSource = jest.spyOn(sourceRepository, 'save');
    const spyCreateMedia = jest.spyOn(mediaRepository, 'create');
    const spySaveMedia = jest.spyOn(mediaRepository, 'save');
    expect(
      await service.createOrFetchRemote({ sourceType, id }),
    ).toBeUndefined();
    expect(spyFindLocal).toBeCalledWith({
      where: { id, sourceType },
    });
    expect(spyFindRemote).toBeCalledWith(id, sourceType);
    expect(spySaveSource).not.toBeCalled();
    expect(spyCreateMedia).not.toBeCalled();
    expect(spySaveMedia).not.toBeCalled();
  });

  it('should find all local medias without filter', async () => {
    const spyFindAll = jest.spyOn(mediaRepository, 'findAndCount');
    await service.findAndCount();
    expect(spyFindAll).toBeCalledWith({});
  });

  it('should find all local medias with pagination', async () => {
    const filter: MediaFilter = {
      pagination: {
        limit: 10,
        offset: 0,
      },
    };
    const spyFindAll = jest.spyOn(mediaRepository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spyFindAll).toBeCalledWith({
      skip: filter.pagination.offset,
      take: filter.pagination.limit,
    });
  });

  it('should find all local medias with owner', async () => {
    const filter: MediaFilter = {
      owner: 'id',
    };
    const spyFindAll = jest.spyOn(mediaRepository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spyFindAll).toBeCalledWith({
      relations: [
        'trainings',
        'trainings.trainingSet',
        'trainings.trainingSet.owner',
      ],
      where: {
        trainings: {
          trainingSet: {
            owner: {
              id: filter.owner,
            },
          },
        },
      },
    });
  });

  it('should find all local medias with query', async () => {
    const filter: MediaFilter = {
      query: 'query',
    };
    const spyFindAll = jest.spyOn(mediaRepository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spyFindAll).toBeCalledWith({
      where: {
        label: expect.anything(),
      },
    });
  });

  it('should find all local medias with source', async () => {
    const filter: MediaFilter = {
      source: MediaType.VIDEO,
    };
    const spyFindAll = jest.spyOn(mediaRepository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spyFindAll).toBeCalledWith({
      relations: ['source'],
      where: {
        source: {
          mediaType: filter.source,
        },
      },
    });
  });

  it('should find all local medias full filter', async () => {
    const filter: MediaFilter = {
      source: MediaType.VIDEO,
      query: 'query',
      owner: 'owner',
      pagination: {
        limit: 10,
        offset: 0,
      },
    };
    const spyFindAll = jest.spyOn(mediaRepository, 'findAndCount');
    await service.findAndCount(filter);
    expect(spyFindAll).toBeCalledWith({
      relations: expect.arrayContaining([
        'source',
        'trainings',
        'trainings.trainingSet',
        'trainings.trainingSet.owner',
      ]),
      where: {
        trainings: {
          trainingSet: {
            owner: {
              id: filter.owner,
            },
          },
        },
        source: {
          mediaType: filter.source,
        },
        label: expect.anything(),
      },
      skip: filter.pagination.offset,
      take: filter.pagination.limit,
    });
  });
});
