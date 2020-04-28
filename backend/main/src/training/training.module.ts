import { Module } from '@nestjs/common';
import { TrainingService } from './training/training.service';
import { TrainingSetService } from './training-set/training-set.service';
import { TrainingDraftService } from './training-draft/training-draft.service';

@Module({
  providers: [TrainingService, TrainingSetService, TrainingDraftService],
})
export class TrainingModule {}
