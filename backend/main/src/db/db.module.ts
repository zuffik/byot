import { Module } from '@nestjs/common';
import { DbController } from './db.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [DbController],
  imports: [ConfigModule],
})
export class DbModule {}
