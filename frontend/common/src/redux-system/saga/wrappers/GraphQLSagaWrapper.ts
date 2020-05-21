import {SagaWrapper} from './SagaWrapper';
import {GraphQLResponse} from '../../data-structures/responses/GraphQLResponse';

export const graphQLSagaWrapper: SagaWrapper = <S, QP>(action, state) =>
  function* (generator) {
    try {
      const result = yield* generator;
      return new GraphQLResponse(result);
    } catch (e) {
      return new GraphQLResponse(undefined, e.message);
    }
  };
