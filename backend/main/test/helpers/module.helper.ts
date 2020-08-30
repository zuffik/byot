import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import {
  Connection,
  EntityManager,
  getConnectionManager,
  QueryRunner,
} from 'typeorm';
import { INestApplication } from '@nestjs/common';
import { AlreadyHasActiveConnectionError } from 'typeorm/error/AlreadyHasActiveConnectionError';
import { ModuleMetadata } from '@nestjs/common/interfaces/modules/module-metadata.interface';

export interface Dependencies {
  app: INestApplication;
  queryRunner: QueryRunner;
}

export const createApp = async (
  meta?: ModuleMetadata,
): Promise<Dependencies> => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    ...meta,
    imports: [AppModule, ...(meta?.imports || [])],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  let dbConnection;
  try {
    dbConnection = moduleFixture.get<Connection>(Connection);
  } catch (e) {
    if (e instanceof AlreadyHasActiveConnectionError) {
      dbConnection = getConnectionManager().get('default');
    }
  }
  const manager = moduleFixture.get(EntityManager);
  queryRunner = dbConnection.createQueryRunner('master');
  // !!!!
  // @ts-ignore
  manager.queryRunner = queryRunner;
  await queryRunner.startTransaction();
  return {
    app,
    queryRunner,
  };
};

export const destroyApp = async (deps: Dependencies) => {
  await deps.queryRunner.rollbackTransaction();
  await deps.app.close();
};
