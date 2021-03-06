import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  FulltextFilterForUser,
  TrainingDraftInput,
  TrainingUpdateInput,
} from '../../graphql/ts/types';
import { MediaService } from '../../media/media/media.service';
import { TrainingSet } from '../training-set/training-set.entity';
import * as _ from 'lodash';
import { Media } from '../../media/media/media.entity';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @Inject(MediaService) private readonly mediaService: MediaService,
  ) {}

  public async findAndCount(
    filter?: FulltextFilterForUser,
  ): Promise<[Training[], number]> {
    let query: FindManyOptions<Training> = {
      order: { createdAt: 'DESC' },
      relations: [],
    };
    if (filter?.query) {
      query.relations.push('medias');
      const like = Like(`%${filter.query}%`);
      query = _.set(query, ['where', 'label'], like);
      query = _.set(query, ['where', 'medias', 'label'], like);
    }
    if (filter?.idUser) {
      query.relations.push('trainingSet', 'trainingSet.owner');
      query = _.set(
        query,
        ['where', 'trainingSet', 'owner', 'id'],
        filter.idUser,
      );
    }
    if (filter?.pagination) {
      query.skip = filter.pagination.offset;
      query.take = filter.pagination.limit;
    }
    if (query.relations.length === 0) {
      delete query.relations;
    }
    return await this.trainingRepository.findAndCount(query);
  }

  public async findById(id: string): Promise<Training | undefined> {
    return await this.trainingRepository.findOne({ where: { id } });
  }

  public async create(
    draft: TrainingDraftInput,
    trainingSet: TrainingSet,
  ): Promise<Training | undefined> {
    const training = this.trainingRepository.create(draft);
    const medias = await Promise.all(
      draft.media.map((media) =>
        this.mediaService.findLocalOrCreateFromRemote(media),
      ),
    );
    training.medias = Promise.resolve(_.uniqBy<Media>(medias, (m) => m.id));
    training.trainingSet = Promise.resolve(trainingSet);
    return await this.trainingRepository.save(training);
  }

  public async update(
    id: string,
    input: TrainingUpdateInput,
  ): Promise<Training | undefined> {
    const training = await this.findById(id);
    if (!training) {
      return undefined;
    }
    if (typeof input.media !== 'undefined' && input.media.length === 0) {
      const result = _.clone(training);
      await this.trainingRepository.remove(training);
      return result;
    }
    training.label = input.label || training.label;
    if (input.media) {
      const medias = await Promise.all(
        input.media.map((media) =>
          this.mediaService.findLocalOrCreateFromRemote(media),
        ),
      );
      training.medias = Promise.resolve(_.uniqBy<Media>(medias, (m) => m.id));
    }
    return await this.trainingRepository.save(training);
  }

  public async remove(training: Training): Promise<Training> {
    return await this.trainingRepository.remove(training);
  }
}
