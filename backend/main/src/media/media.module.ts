import { Module } from '@nestjs/common';
import { MediaRemoteService } from './media-remote/media-remote.service';
import { ConfigModule } from '@nestjs/config';
import { YoutubeProvider } from './providers/youtube.provider';
import { MediaRemoteResolver } from './media-remote/media-remote.resolver';

@Module({
  imports: [ConfigModule],
  providers: [MediaRemoteService, YoutubeProvider, MediaRemoteResolver],
})
export class MediaModule {}
