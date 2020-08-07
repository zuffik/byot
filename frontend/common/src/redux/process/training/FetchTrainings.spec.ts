import {FetchTrainings, Request, Response} from './FetchTrainings';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {DataResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/DataResponse';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ITraining} from '@byot-frontend/common/src/types/interfaces/ITraining';
import {FrontendCommonState} from '../../FrontendCommonState';

describe('FetchTrainings process', () => {
  let process: FetchTrainings;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, DataResponse<Response>>>;

  beforeEach(() => {
    process = new FetchTrainings();
    request = ProcessActionExtractor.dispatch(FetchTrainings, {});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should save filter', () => {
    request.payload = {filter: {reset: true, pagination: {limit: 10, offset: 20}, query: 'Query'}};
    const state = process.handleRequest(
      request,
      ({
        trainingListItems: new IterableResource<ITraining>(),
      } as unknown) as FrontendCommonState,
      {} as FrontendCommonState
    );
    expect(state).toEqual(
      expect.objectContaining({
        trainingListItems: expect.any(IterableResource),
        trainingListFilter: {
          ...request.payload.filter,
          reset: false,
        },
      })
    );
  });

  it('should run valid query', () => {
    const generator = process.saga(request, {} as FrontendCommonState);
    generator.next();
  });

  afterEach(() => jest.clearAllMocks());
});
