import { Test, TestingModule } from '@nestjs/testing';
import { MediaResolver } from './media.resolver';
import { BadRequestException } from '@nestjs/common';
import {
  FulltextFilter,
  MediaFilter,
  SourceType,
} from '../../graphql/ts/types';
import { MediaRemoteService } from '../media-remote/media-remote.service';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';
import { proxyMock } from '../../test/proxy.mock';
import { SeedModule } from '../../seed/seed.module';
import { MediaService } from './media.service';

describe('MediaResolver', () => {
  let resolver: MediaResolver;
  let remoteService: MediaRemoteService;
  let localService: MediaService;
  let gqlGenerator: GeneratorGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        MediaResolver,
        {
          provide: MediaRemoteService,
          useValue: proxyMock({
            search: jest.fn(async (f) => [[], 0]),
            parseFromUrl: jest.fn(async () => undefined),
          }),
        },
        {
          provide: MediaService,
          useValue: proxyMock(),
        },
      ],
    }).compile();

    resolver = module.get<MediaResolver>(MediaResolver);
    remoteService = module.get<MediaRemoteService>(MediaRemoteService);
    localService = module.get<MediaService>(MediaService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
    expect(remoteService).toBeDefined();
    expect(gqlGenerator).toBeDefined();
  });

  it('should make exception about empty filter', async () => {
    await expect(resolver.findMedia({})).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should call only parseUrl', async () => {
    const filter: MediaFilter = {
      query: 'something',
    };
    const spyParse = jest
      .spyOn(remoteService, 'parseFromUrl')
      .mockImplementation(async () => gqlGenerator.media());
    const spySearch = jest.spyOn(remoteService, 'search');
    await resolver.findMedia(filter);
    expect(spySearch).not.toBeCalled();
    expect(spyParse).toBeCalledWith(filter.query);
  });

  it('should call parseUrl and search', async () => {
    const filter: MediaFilter = {
      query: 'something',
    };
    const spyParse = jest.spyOn(remoteService, 'parseFromUrl');
    const spySearch = jest.spyOn(remoteService, 'search');
    await resolver.findMedia(filter);
    expect(spyParse).toBeCalledWith(filter.query);
    expect(spySearch).toBeCalledWith(filter, [SourceType.YOUTUBE]);
  });

  it('should find local media', async () => {
    const filter: MediaFilter = {
      local: true,
    };
    const spy = jest
      .spyOn(localService, 'findAndCount')
      .mockImplementation(async () => [[], 0]);
    await resolver.findMedia(filter);
    expect(spy).toBeCalledWith(filter);
  });

  it('should find only local media as admin', async () => {
    const filter: FulltextFilter = {
      query: 'query',
      pagination: { limit: 10, offset: 0 },
    };
    const spy = jest
      .spyOn(localService, 'findAndCount')
      .mockImplementation(async () => [[], 0]);
    await resolver.allMedia(filter);
    expect(spy).toBeCalledWith(filter);
  });

  it('should find only local media by id as admin', async () => {
    const id = 'id';
    const spy = jest.spyOn(localService, 'findById');
    await resolver.media(id);
    expect(spy).toBeCalledWith(id);
  });
});
