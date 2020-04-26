import { Module } from '@nestjs/common';
import { MediaRemoteService } from './media-remote.service';
import { ConfigModule } from '@nestjs/config';
import { YoutubeProvider } from './providers/youtube.provider';

@Module({
  imports: [ConfigModule],
  providers: [MediaRemoteService, YoutubeProvider],
})
export class MediaModule {}
