import { Test, TestingModule } from '@nestjs/testing';
import { TrainingDraftService } from './training-draft.service';

describe('TrainingDraftService', () => {
  let service: TrainingDraftService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TrainingDraftService],
    }).compile();

    service = module.get<TrainingDraftService>(TrainingDraftService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
