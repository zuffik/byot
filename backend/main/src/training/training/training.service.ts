import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { FindManyOptions, Like, Repository } from 'typeorm';
import {
  FulltextFilter,
  TrainingDraftInput,
  TrainingUpdateInput,
} from '../../graphql/ts/types';
import { MediaService } from '../../media/media/media.service';

@Injectable()
export class TrainingService {
  constructor(
    @InjectRepository(Training)
    private readonly trainingRepository: Repository<Training>,
    @Inject(MediaService) private readonly mediaService: MediaService,
  ) {}

  public async findAndCount(
    filter: FulltextFilter,
  ): Promise<[Training[], number]> {
    const query: FindManyOptions<Training> = {};
    if (filter.query) {
      query.relations = ['medias'];
      const like = `%${filter.query}%`;
      query.where = {
        label: Like(like),
        medias: {
          label: Like(like),
        },
      };
    }
    if (filter.pagination) {
      query.skip = filter.pagination.offset;
      query.take = filter.pagination.limit;
    }
    return await this.trainingRepository.findAndCount(query);
  }

  public async findById(id: string): Promise<Training | undefined> {
    return await this.trainingRepository.findOne({ where: { id } });
  }

  public async create(
    draft: TrainingDraftInput,
  ): Promise<Training | undefined> {
    const training = await this.trainingRepository.create(draft);
    training.medias = Promise.all(
      draft.media.map((media) => this.mediaService.createOrFetch(media)),
    );
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
    training.label = input.label || training.label;
    if (input.media) {
      training.medias = Promise.all(
        input.media.map((media) => this.mediaService.createOrFetch(media)),
      );
    }
    return await this.trainingRepository.save(training);
  }
}
