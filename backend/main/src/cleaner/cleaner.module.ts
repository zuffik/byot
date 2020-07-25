import { Module } from '@nestjs/common';
import { CleanerService } from './cleaner.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';
import { CleanerController } from './cleaner.controller';
import { ConfigModule } from '@nestjs/config';
import { Token } from '../user/token/token.entity';

@Module({
  providers: [CleanerService],
  imports: [TypeOrmModule.forFeature([User, Token]), ConfigModule],
  controllers: [CleanerController],
})
export class CleanerModule {}
