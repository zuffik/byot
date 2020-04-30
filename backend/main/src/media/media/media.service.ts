import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import { Repository } from 'typeorm';
import { Source } from '../source/source.entity';
import { MediaType, TrainingMediaInput } from '../../graphql/ts/types';
import { MediaRemoteService } from '../media-remote/media-remote.service';

@Injectable()
export class MediaService {
  constructor(
    @InjectRepository(Media)
    private readonly mediaRepository: Repository<Media>,
    @InjectRepository(Source)
    private readonly sourceRepository: Repository<Source>,
    @Inject(MediaRemoteService)
    private readonly remoteMedia: MediaRemoteService,
  ) {}

  public async createOrFetch(
    media: TrainingMediaInput,
  ): Promise<Media | undefined> {
    const local = await this.mediaRepository.findOne({
      where: {
        id: media.id,
        sourceType: media.sourceType,
      },
    });
    if (local) return local;
    const remote = await this.remoteMedia.findById(media.id, media.sourceType);
    if (!remote) return undefined;
    const source = await this.sourceRepository.save(remote.source);
    const created = this.mediaRepository.create(remote);
    created.source = source;
    return await this.mediaRepository.save(created);
  }
}
