import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { YoutubeProvider } from './providers/youtube.provider';
import { MediaService } from './media/media.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Media } from './media/media.entity';
import { Source } from './source/source.entity';
import { MediaResolver } from './media/media.resolver';
import { MediaRemoteService } from './media-remote/media-remote.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    TypeOrmModule.forFeature([Media, Source]),
  ],
  providers: [MediaRemoteService, YoutubeProvider, MediaService, MediaResolver],
  exports: [MediaService, MediaRemoteService],
})
export class MediaModule {}
