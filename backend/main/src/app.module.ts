import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { validationSchema } from './config/validation.schema';
import { databaseConfig } from './config/database.config';
import { appConfig } from './config/app.config';
import { nodeConfig } from './config/node.config';
import { GraphQLModule } from '@nestjs/graphql';
import * as path from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', `.env.${process.env.NODE_ENV}`],
      isGlobal: true,
      validationSchema,
      load: [databaseConfig, appConfig, nodeConfig],
    }),
    GraphQLModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (cfg: ConfigService) => ({
        debug: cfg.get('node.env') === 'development',
        playground: cfg.get('node.env') === 'development',
        typePaths: [path.join(process.cwd(), 'src/graphql/schema/*.graphql')],
        definitions: {
          path: path.join(process.cwd(), '../../common/graphql.d.ts'),
        },
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}
