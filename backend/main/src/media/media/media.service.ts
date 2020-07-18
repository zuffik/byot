import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Media } from './media.entity';
import {
  Media as IMedia,
  MediaFilter,
  TrainingMediaInput,
} from '../../graphql/ts/types';
import { FindManyOptions, Like, Repository } from 'typeorm';
import { Source } from '../source/source.entity';
import { MediaRemoteService } from '../media-remote/media-remote.service';
import * as _ from 'lodash';

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

  public async findLocalOrCreateFromRemote(
    media: Omit<TrainingMediaInput, 'label'>,
  ): Promise<Media | undefined> {
    const local = await this.sourceRepository.findOne({
      relations: ['media'],
      where: {
        resourceId: media.id,
        sourceType: media.sourceType,
      },
    });
    if (local) {
      const m = await local.media;
      m.source = Promise.resolve(local);
      return m;
    }
    return this.storeMedia(
      await this.remoteMedia.findById(media.id, media.sourceType),
    );
  }

  public async storeMedia(media: IMedia): Promise<Media> {
    if (!media) {
      return undefined;
    }
    const source = this.sourceRepository.create(media.source);
    const created = this.mediaRepository.create(_.omit(media, 'source'));
    source.media = Promise.resolve(await this.mediaRepository.save(created));
    await this.sourceRepository.save(source);
    return created;
  }

  public async findAndCount(filter?: MediaFilter): Promise<[Media[], number]> {
    let query: FindManyOptions<Media> = {
      relations: [],
    };
    if (filter?.query) {
      query = _.set(query, ['where', 'label'], Like(`%${filter.query}%`));
    }
    if (filter?.owner) {
      query.relations.push(
        'trainings',
        'trainings.trainingSet',
        'trainings.trainingSet.owner',
      );
      query = _.set(
        query,
        ['where', 'trainings', 'trainingSet', 'owner', 'id'],
        filter.owner,
      );
    }
    if (filter?.source) {
      query.relations.push('source');
      query = _.set(query, ['where', 'source', 'mediaType'], filter.source);
    }
    if (filter?.pagination) {
      query.take = filter.pagination.limit;
      query.skip = filter.pagination.offset;
    }
    if (query.relations.length === 0) {
      delete query.relations;
    }
    return await this.mediaRepository.findAndCount(query);
  }

  public async findById(id: string): Promise<Media | undefined> {
    return await this.mediaRepository.findOne({
      relations: ['source'],
      where: { id },
    });
  }
}
