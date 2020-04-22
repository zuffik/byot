import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../src/app.module';
import { Connection, EntityManager, QueryRunner } from 'typeorm';
import { INestApplication } from '@nestjs/common';

export interface Dependencies {
  app: INestApplication;
  queryRunner: QueryRunner;
}

export const createApp = async (): Promise<Dependencies>  => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  const moduleFixture: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixture.createNestApplication();
  await app.init();
  const dbConnection = moduleFixture.get<Connection>(Connection);
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
