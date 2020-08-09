import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { SeedModule } from '../seed/seed.module';
import { MigrationsService } from './migrations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { TrainingModule } from '../training/training.module';
import { AuthModule } from '../auth/auth.module';
import { MediaModule } from '../media/media.module';
import { Media } from '../media/media/media.entity';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    AuthModule,
    MediaModule,
    SeedModule,
    TrainingModule,
    TypeOrmModule.forFeature([User, Media]),
  ],
  providers: [MigrationsService],
})
export class MigrationsModule {}
