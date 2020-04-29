import { Test, TestingModule } from '@nestjs/testing';
import { MediaRemoteService } from './media-remote.service';
import { proxyMock } from '../../test/proxy.mock';
import { GeneratorGraphqlService } from '../../seed/generator-graphql/generator-graphql.service';
import { BadRequestException } from '@nestjs/common';
import { MediaRemoteResolver } from './media-remote.resolver';
import { SeedModule } from '../../seed/seed.module';
import { MediaFilter, SourceType } from '../../graphql/ts/types';

describe('MediaRemoteResolver', () => {
  let resolver: MediaRemoteResolver;
  let remoteService: MediaRemoteService;
  let gqlGenerator: GeneratorGraphqlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [SeedModule],
      providers: [
        MediaRemoteResolver,
        {
          provide: MediaRemoteService,
          useValue: proxyMock({
            search: jest.fn(async (f) => [[], 0]),
            parseFromUrl: jest.fn(async () => undefined),
          }),
        },
      ],
    }).compile();

    resolver = module.get<MediaRemoteResolver>(MediaRemoteResolver);
    remoteService = module.get<MediaRemoteService>(MediaRemoteService);
    gqlGenerator = module.get<GeneratorGraphqlService>(GeneratorGraphqlService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
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
});
