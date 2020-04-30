import { Module } from '@nestjs/common';
import { TrainingService } from './training/training.service';
import { TrainingSetService } from './training-set/training-set.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './training/training.entity';
import { TrainingSet } from './training-set/training-set.entity';
import { MediaModule } from '../media/media.module';

@Module({
  imports: [TypeOrmModule.forFeature([Training, TrainingSet]), MediaModule],
  providers: [TrainingService, TrainingSetService],
})
export class TrainingModule {}
