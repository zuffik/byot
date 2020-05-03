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

export interface Dependencies {
  app: INestApplication;
  queryRunner: QueryRunner;
}

export const createApp = async (): Promise<Dependencies> => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
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
