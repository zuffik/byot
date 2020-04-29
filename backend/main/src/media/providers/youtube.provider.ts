import { MediaProvider } from './media.provider';
import { Inject, Injectable } from '@nestjs/common';
import {
  Media,
  MediaFilter,
  MediaType,
  SourceType,
} from '../../graphql/ts/types';
import { google, youtube_v3 } from 'googleapis';
import { ConfigService } from '@nestjs/config';
import { timestampToDateTime } from '../../helpers/TimestampToDateTime';
import * as moment from 'moment';

@Injectable()
export class YoutubeProvider implements MediaProvider {
  private readonly searchResource: youtube_v3.Resource$Search;
  private readonly videosResource: youtube_v3.Resource$Videos;

  private readonly urlRegexIdIndex: number = 4;
  private readonly urlRegex: RegExp = /(https?:\/\/)?(www\.)?(youtu\.be\/|youtube.com\/watch\?v=)([A-Za-z0-9\-_]+)($|&|#)/;

  public readonly type: SourceType = SourceType.YOUTUBE;

  constructor(@Inject(ConfigService) private readonly cfg: ConfigService) {
    const service = google.youtube('v3');
    this.searchResource = service.search;
    this.videosResource = service.videos;
  }

  async findAll(filter: MediaFilter): Promise<[Media[], number]> {
    const response = await this.searchResource.list({
      part: 'snippet',
      q: filter.query,
      maxResults: filter.pagination?.limit
        ? filter.pagination?.limit
        : undefined,
      type: 'video',
      auth: this.cfg.get<string>('apis.credentials.apiKey.google.youtube'),
    });
    return [
      response.data.items.map((item) => ({
        id: item.id.videoId,
        createdAt: timestampToDateTime(moment(item.snippet.publishedAt)),
        label: item.snippet.title,
        source: {
          mediaType: MediaType.VIDEO,
          sourceType: SourceType.YOUTUBE,
          id: item.id.videoId,
          thumbnail: item.snippet.thumbnails.default.url,
        },
      })),
      response.data.pageInfo.totalResults,
    ];
  }

  async parseFromUrl(url: string): Promise<Media | undefined> {
    const match = this.urlRegex.exec(url);
    if (!match) {
      return undefined;
    }
    const videoId = match[this.urlRegexIdIndex];
    const response = await this.videosResource.list({
      part: 'snippet',
      auth: this.cfg.get<string>('apis.credentials.apiKey.google.youtube'),
      id: videoId,
    });
    if (response.data.items.length === 0) {
      return undefined;
    }
    const item = response.data.items[0];
    return {
      id: videoId,
      createdAt: timestampToDateTime(moment(item.snippet.publishedAt)),
      label: item.snippet.title,
      source: {
        mediaType: MediaType.VIDEO,
        sourceType: SourceType.YOUTUBE,
        id: videoId,
        thumbnail: item.snippet.thumbnails.default.url,
      },
    };
  }
}
