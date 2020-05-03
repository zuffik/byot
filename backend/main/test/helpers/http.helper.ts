import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Auth, Role } from '../../src/graphql/ts/types';
import { ConfigService } from '@nestjs/config';
import { graphQLInteraction, Interaction } from './interaction';

export interface IResponse<T> extends Omit<Request, 'body'> {
  body: {
    data: T;
    errors: Error[];
  };
}

export const makeGraphQLRequest = async <T>(
  app: INestApplication,
  interaction: Interaction<T>,
  {
    userRole,
    token,
    demoAccount,
  }: {
    userRole?: Role;
    demoAccount?: number;
    token?: string;
  } = {},
): Promise<IResponse<T>> => {
  const headers =
    userRole || token
      ? {
          Authorization: `Bearer ${
            token ||
            (await loginTestUser(app, userRole, demoAccount || 1)).token
          }`,
        }
      : {};
  return ((await request(app.getHttpServer())
    .post('/graphql')
    .set(headers)
    .send({
      query: interaction.query,
      variables: interaction.variables,
    })) as unknown) as IResponse<T>;
};

export const loginTestUser = async (
  app: INestApplication,
  role: Role = Role.ADMIN,
  demoUser: number = 1,
): Promise<Auth> => {
  const userNameOrEmail =
    role === Role.ADMIN
      ? app
          .get<ConfigService>(ConfigService)
          .get<string>('app.superAdmin.userName')
      : `demo-${demoUser}`;
  const password =
    role === Role.ADMIN
      ? app
          .get<ConfigService>(ConfigService)
          .get<string>('app.superAdmin.password')
      : 'D3m0P4$$';
  const response = await makeGraphQLRequest(
    app,
    graphQLInteraction.userLogin(userNameOrEmail, password),
  );
  return response.body.data.userLogin;
};
