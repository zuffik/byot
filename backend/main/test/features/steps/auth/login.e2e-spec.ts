import { defineFeature, loadFeature } from 'jest-cucumber';
import { INestApplication } from '@nestjs/common';
import { QueryRunner } from 'typeorm';
import { createApp, destroyApp } from '../../../helpers/module.helper';
import { IResponse, makeGraphQLRequest } from '../../../helpers/http.helper';
import { graphQLInteraction, Interaction } from '../../../helpers/interaction';
import { Auth, Role } from '../../../../src/graphql/ts/types';
import { envString } from '../../../shared/EnvString';

const feature = loadFeature('./test/features/scenarios/auth/Login.feature');

defineFeature(feature, (test) => {
  let app: INestApplication;
  let queryRunner: QueryRunner;
  beforeEach(async () => {
    const deps = await createApp();
    app = deps.app;
    queryRunner = deps.queryRunner;
  });
  test('logging in', ({ when, and, then }) => {
    let interaction: (
      username: string,
      password: string,
    ) => Interaction<{ userLogin: Auth }>;
    const credentials: { username: string; password: string } = {} as {
      username: string;
      password: string;
    };
    let result: IResponse<{ userLogin: Auth }>;
    when(`user visits login form`, async () => {
      interaction = graphQLInteraction.userLogin;
    });
    and(/user enters username (.*)/, (username) => {
      credentials.username = username;
    });
    and(/user enters password (.*)/, (password) => {
      credentials.password = envString(password);
    });
    and(`user tries to login`, async () => {
      result = await makeGraphQLRequest(
        app,
        interaction(credentials.username, credentials.password),
      );
    });
    then(/login should be (.*)/, (state: 'successful' | 'unsuccessful') => {
      if (state === 'successful') {
        expect(result.body.errors).toBeUndefined();
        expect(result.body.data.userLogin.token).toEqual(expect.any(String));
      } else {
        expect(result.body.errors).not.toBeUndefined();
      }
    });
  });
  afterEach(() => destroyApp({ app, queryRunner }));
});
