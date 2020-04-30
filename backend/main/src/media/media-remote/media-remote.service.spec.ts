import { Test, TestingModule } from '@nestjs/testing';
import { MediaRemoteService } from './media-remote.service';
import { YoutubeProvider } from '../providers/youtube.provider';
import { mockMediaProvider } from '../../test/proxy.mock';
import { MediaFilter, SourceType } from '../../graphql/ts/types';

describe('MediaRemoteService', () => {
  let service: MediaRemoteService;
  let ytProvider: YoutubeProvider;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MediaRemoteService,
        {
          provide: YoutubeProvider,
          useValue: mockMediaProvider(),
        },
      ],
    }).compile();

    service = module.get<MediaRemoteService>(MediaRemoteService);
    ytProvider = module.get<YoutubeProvider>(YoutubeProvider);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should search using youtube provider', async () => {
    const spy = jest.spyOn(ytProvider, 'findAll');
    const filter: MediaFilter = {
      query: 'google',
    };
    await service.search(filter, [SourceType.YOUTUBE]);
    expect(spy).toBeCalledWith(filter);
  });

  it('should search using no provider', async () => {
    const spy = jest.spyOn(ytProvider, 'findAll');
    const filter: MediaFilter = {
      query: 'google',
    };
    await service.search(filter, []);
    expect(spy).not.toBeCalled();
  });

  it('should parse youtube URL', async () => {
    const url = 'https://www.youtube.com/watch?v=w3m4N0UVt0M';
    const spy = jest.spyOn(ytProvider, 'parseFromUrl');
    await service.parseFromUrl(url);
    expect(spy).toBeCalledWith(url);
  });

  it('should fetch by ID', async () => {
    const id = 'w3m4N0UVt0M';
    const sourceType = SourceType.YOUTUBE;
    const spy = jest.spyOn(ytProvider, 'findById');
    await service.findById(id, sourceType);
    expect(spy).toBeCalledWith(id);
  });
});
