import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { SeedModule } from '../seed/seed.module';
import { MigrationsService } from './migrations.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/user.entity';

@Module({
  imports: [
    ConfigModule,
    UserModule,
    SeedModule,
    TypeOrmModule.forFeature([User]),
  ],
  providers: [MigrationsService],
})
export class MigrationsModule {}
