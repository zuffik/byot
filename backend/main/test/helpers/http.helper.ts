import { Interaction } from '../../../../common/graphql/ts/interaction';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { Auth } from '../../src/graphql/ts/types';
import { graphQLInteraction } from '../../src/graphql/ts/interaction';

export interface IResponse<T> extends Omit<Request, 'body'> {
  body: {
    data: T;
    errors: Error[];
  };
}

export const makeGraphQLRequest = async <T>(app: INestApplication, interaction: Interaction): Promise<IResponse<T>> =>
  (
    await request(app.getHttpServer())
      .post('/graphql')
      .send({
        query: interaction.query,
        variables: interaction.variables,
      })
  ) as unknown as IResponse<T>;

/*
export const login = async (app: INestApplication, { userNameOrEmail, password }: { userNameOrEmail: string, password: string }) =>
  (await makeGraphQLRequest<Auth>(app, graphQLInteraction.userRegister())).body.data.token;
*/
