import {Request, Response, TrainingSetFetch} from './TrainingSetFetch';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {WebAppState} from '../../WebAppState';
import {trainingSet} from '@byot-frontend/common/test/fixtures/dto/TrainingSet';
import {GraphQLError} from 'graphql';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';

describe('TrainingSetFetch process', () => {
  let process: TrainingSetFetch;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, Response>>;

  beforeEach(() => {
    process = new TrainingSetFetch();
    request = ProcessActionExtractor.dispatch(TrainingSetFetch, {id: 'id'});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should run valid query', () => {
    const generator = process.saga(request, {} as WebAppState);
    generator.next();
  });

  it('should redirect if empty result', () => {
    response = ProcessActionExtractor.response(
      request,
      new GraphQLResponse<ITrainingSet>(undefined, [new GraphQLError('')])
    );
    const state = process.handleResponse(response, {} as WebAppState, {} as WebAppState);
    expect(state).toEqual(
      expect.objectContaining({
        redirect: expect.any(String),
      })
    );
  });

  it('should not redirect if result is not empty', () => {
    response = ProcessActionExtractor.response(request, new GraphQLResponse(trainingSet()));
    const state = process.handleResponse(response, {} as WebAppState, {} as WebAppState);
    expect(state).toEqual(
      expect.objectContaining({
        redirect: undefined,
      })
    );
  });

  afterEach(() => jest.clearAllMocks());
});
