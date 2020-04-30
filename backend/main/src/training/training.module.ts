import { Module } from '@nestjs/common';
import { TrainingService } from './training/training.service';
import { TrainingSetService } from './training-set/training-set.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Training } from './training/training.entity';
import { TrainingSet } from './training-set/training-set.entity';
import { MediaModule } from '../media/media.module';
import { UserModule } from '../user/user.module';
import { TrainingResolver } from './training/training.resolver';

@Module({
  imports: [
    TypeOrmModule.forFeature([Training, TrainingSet]),
    MediaModule,
    UserModule,
  ],
  providers: [TrainingService, TrainingSetService, TrainingResolver],
})
export class TrainingModule {}
