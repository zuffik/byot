import { Test, TestingModule } from '@nestjs/testing';
import { TrainingService } from './training.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Training } from './training.entity';
import { mockRepository } from '../../test/proxy.mock';

describe('TrainingService', () => {
  let service: TrainingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TrainingService,
        {
          provide: getRepositoryToken(Training),
          useValue: mockRepository(),
        },
      ],
    }).compile();

    service = module.get<TrainingService>(TrainingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
