import { Interaction } from '../src/graphql/ts/interaction';
import * as request from 'supertest';
import { INestApplication } from '@nestjs/common';

export interface IResponse<T> extends Omit<Request, 'body'> {
  body: {
    data: T;
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
