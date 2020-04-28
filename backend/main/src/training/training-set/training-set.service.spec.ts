import { Test, TestingModule } from '@nestjs/testing';
import { TrainingSetService } from './training-set.service';

describe('TrainingSetService', () => {
  let service: TrainingSetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingSetService],
    }).compile();

    service = module.get<TrainingSetService>(TrainingSetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
