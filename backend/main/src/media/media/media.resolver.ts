import { Args, Query, Resolver } from '@nestjs/graphql';
import { Media } from './media.entity';
import {
  FulltextFilter,
  MediaFilter,
  MediaList,
  Role,
  SourceType,
} from '../../graphql/ts/types';
import { BadRequestException, Inject, UseGuards } from '@nestjs/common';
import { MediaRemoteService } from '../media-remote/media-remote.service';
import { MediaService } from './media.service';
import { AuthGuard } from '../../auth/jwt/auth.guard';
import * as _ from 'lodash';
import { BaseResolver } from '../../helpers/BaseResolver';
import { AuthRoles } from '../../auth/decorators/auth-roles.decorator';

@Resolver('Media')
export class MediaResolver extends BaseResolver {
  // todo in user profile
  private readonly sources: SourceType[] = [SourceType.YOUTUBE];

  constructor(
    @Inject(MediaRemoteService)
    private readonly mediaRemoteService: MediaRemoteService,
    @Inject(MediaService)
    private readonly mediaService: MediaService,
  ) {
    super();
  }

  @Query('findMedia')
  @UseGuards(AuthGuard)
  public async findMedia(
    @Args('filter') filter?: MediaFilter,
  ): Promise<MediaList> {
    if (filter.local) {
      return this.createList<MediaList>(
        await this.mediaService.findAndCount(filter),
      );
    } else {
      if (_.isEmpty(filter)) {
        throw new BadRequestException('Filter must not be empty');
      }
      const parsedMedia = await this.mediaRemoteService.parseFromUrl(
        filter.query,
      );
      if (parsedMedia) {
        return this.createList<MediaList>([[parsedMedia], 1]);
      }
      return this.createList<MediaList>(
        await this.mediaRemoteService.search(filter, this.sources),
      );
    }
  }

  @Query('allMedia')
  @AuthRoles(Role.ADMIN)
  public async allMedia(
    @Args('filter') filter: FulltextFilter,
  ): Promise<MediaList> {
    return this.createList<MediaList>(
      await this.mediaService.findAndCount(filter),
    );
  }

  @Query('media')
  @AuthRoles(Role.ADMIN)
  public async media(@Args('id') id: string): Promise<Media> {
    return await this.mediaService.findById(id);
  }
}
