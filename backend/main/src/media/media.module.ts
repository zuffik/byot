import { Module } from '@nestjs/common';
import { MediaRemoteService } from './media-remote/media-remote.service';
import { ConfigModule } from '@nestjs/config';
import { YoutubeProvider } from './providers/youtube.provider';
import { MediaRemoteResolver } from './media-remote/media-remote.resolver';
import { MediaService } from './media/media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media/media.entity';
import { Source } from './source/source.entity';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([Media, Source])],
  providers: [
    MediaRemoteService,
    YoutubeProvider,
    MediaRemoteResolver,
    MediaService,
  ],
  exports: [MediaService, MediaRemoteService],
})
export class MediaModule {}
