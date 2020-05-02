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

  public async createOrFetchRemote(
    media: TrainingMediaInput,
  ): Promise<Media | undefined> {
    const local = await this.mediaRepository.findOne({
      where: {
        id: media.id,
        sourceType: media.sourceType,
      },
    });
    if (local) {
      return local;
    }
    return this.storeMedia(
      await this.remoteMedia.findById(media.id, media.sourceType),
    );
  }

  public async storeMedia(media: IMedia): Promise<Media> {
    if (!media) {
      return undefined;
    }
    const source = await this.sourceRepository.save(
      this.sourceRepository.create(media.source),
    );
    const created = this.mediaRepository.create(_.omit(media, 'source'));
    created.source = Promise.resolve(source);
    await this.mediaRepository.insert(created);
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
}
