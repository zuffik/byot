import {FetchTrainingSets, Request, Response} from './FetchTrainingSets';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {DataResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/DataResponse';
import {WebAppState} from '../../WebAppState';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';

describe('FetchTrainingSets process', () => {
  let process: FetchTrainingSets;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, DataResponse<Response>>>;

  beforeEach(() => {
    process = new FetchTrainingSets();
    request = ProcessActionExtractor.dispatch(FetchTrainingSets, {});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should not reset data', () => {
    const state = process.handleRequest(request, {} as WebAppState, {} as WebAppState);
    expect(state).toEqual({});
  });

  it('should reset data', () => {
    request.payload = {filter: {reset: true}};
    const state = process.handleRequest(request, {} as WebAppState, {} as WebAppState);
    expect(state).toEqual({trainingSetListItems: expect.any(IterableResource)});
  });

  it('should run valid query', () => {
    const generator = process.saga(request, {} as WebAppState);
    generator.next();
  });

  afterEach(() => jest.clearAllMocks());
});
