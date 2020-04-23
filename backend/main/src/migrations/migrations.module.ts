import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { SeedModule } from '../seed/seed.module';
import { MigrationsService } from './migrations.service';

@Module({
  imports: [ConfigModule, UserModule, SeedModule],
  providers: [MigrationsService],
})
export class MigrationsModule {}
