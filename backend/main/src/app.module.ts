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
import { MediaModule } from './media/media.module';
import { apisConfig } from './config/apis.config';
import { TrainingModule } from './training/training.module';
import { sharedConfig } from './config/shared.config';
import { mailConfig } from './config/mail.config';
import { MailModule } from './mail/mail.module';
import { Verbosity } from './helpers/Verbosity';
import { DbModule } from './db/db.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [
        '.env.common',
        '.env',
        `.env.${process.env.NODE_ENV}`,
        '.env.local',
        `.env.${process.env.NODE_ENV}.local`,
      ]
        .map((r) => `${process.cwd()}/${r}`)
        .reverse(),
      isGlobal: true,
      validationSchema,
      load: [
        databaseConfig,
        appConfig,
        nodeConfig,
        apisConfig,
        sharedConfig,
        mailConfig,
      ],
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
        charset: 'utf8mb4_unicode_ci',
        entities: [path.join(__dirname, './**/*.entity.{ts,js}')],
        synchronize: true,
        logging:
          cfg.get<number>('node.verbosity') >= Verbosity.VERBOSE
            ? 'all'
            : undefined,
      }),
    }),
    UserModule,
    AuthModule,
    SeedModule,
    MigrationsModule,
    MediaModule,
    TrainingModule,
    MailModule,
    DbModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
