import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Role } from '../../src/graphql/ts/types';
import { graphQLInteraction, Interaction } from '../../src/graphql/ts/interaction';
import { ConfigService } from '@nestjs/config';

export interface IResponse<T> extends Omit<Request, 'body'> {
  body: {
    data: T;
    errors: Error[];
  };
}

export const makeGraphQLRequest = async <T>(app: INestApplication, interaction: Interaction<T>, userRole?: Role): Promise<IResponse<T>> => {
  const headers = userRole ? { Authorization: `Bearer ${await registerTestUser(app, userRole)}` } : {};
  return (
    await request(app.getHttpServer())
      .post('/graphql')
      .set(headers)
      .send({
        query: interaction.query,
        variables: interaction.variables,
      })
  ) as unknown as IResponse<T>;
};

export const registerTestUser = async (app: INestApplication, role: Role = Role.ADMIN): Promise<string> => {
  const userNameOrEmail = role === Role.ADMIN ? app.get<ConfigService>(ConfigService).get<string>('app.superAdmin.userName') : 'demo-1';
  const password = role === Role.ADMIN ? app.get<ConfigService>(ConfigService).get<string>('app.superAdmin.password') : 'D3m0P4$$';
  const response = await makeGraphQLRequest(app, graphQLInteraction.userLogin(userNameOrEmail, password));
  return response.body.data.userLogin.token;
};
