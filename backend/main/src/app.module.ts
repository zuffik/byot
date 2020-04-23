import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { databaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';
import { nodeConfig } from './config/node.config';
import { GraphQLModule } from '@nestjs/graphql';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SeedModule } from './seed/seed.module';
import * as path from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MigrationsModule } from './migrations/migrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`, '.env.local', `.env.local.${process.env.NODE_ENV}`].reverse(),
      isGlobal: true,
      validationSchema,
      load: [databaseConfig, appConfig, nodeConfig],
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        debug: cfg.get('node.env') === 'development',
        playground: cfg.get('node.env') === 'development',
        typePaths: ['./**/graphql/schema/*.graphql'],
        context: ({ req }) => ({ req }),
        definitions: ['test', 'development'].includes(cfg.get('node.env')) && {
          path: path.join(process.cwd(), '../../common/graphql/ts/types.ts'),
        },
      }),
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        type: cfg.get<'mysql'>('db.scheme'),
        host: cfg.get<string>('db.host'),
        port: cfg.get<number>('db.port'),
        username: cfg.get<string>('db.user'),
        password: cfg.get<string>('db.pass'),
        database: cfg.get<string>('db.name'),
        entities: process.env.NODE_ENV !== 'test' ? ['./**/*.entity.js'] : ['./**/*.entity.ts'],
        synchronize: true,
        keepConnectionAlive: true,
      }),
    }),
    UserModule,
    AuthModule,
    SeedModule,
    MigrationsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
