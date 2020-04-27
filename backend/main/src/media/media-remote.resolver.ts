import { Args, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {
  IMutation,
  IQuery,
  MediaFilter,
  MediaList,
  SourceType,
} from '../graphql/ts/types';
import * as _ from 'lodash';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { MediaRemoteService } from './media-remote.service';
import { AuthGuard } from '../auth/jwt/auth.guard';

@Resolver('Media')
export class MediaRemoteResolver implements Partial<IQuery & IMutation> {
  // todo in user profile
  private readonly sources: SourceType[] = [SourceType.YOUTUBE];

  constructor(
    @Inject(MediaRemoteService)
    private readonly mediaRemoteService: MediaRemoteService,
  ) {}

  @Query('findMedia')
  @UseGuards(AuthGuard)
  async findMedia(@Args('filter') filter?: MediaFilter): Promise<MediaList> {
    if (_.isEmpty(filter)) {
      throw new BadRequestException('Filter must not be empty');
    }
    const parsedMedia = await this.mediaRemoteService.parseFromUrl(
      filter.query,
    );
    if (parsedMedia) {
      return {
        meta: {
          totalCount: 1,
        },
        entries: [parsedMedia],
      };
    }
    const [entries, totalCount] = await this.mediaRemoteService.search(
      filter,
      this.sources,
    );
    return {
      meta: { totalCount },
      entries,
    };
  }
}
