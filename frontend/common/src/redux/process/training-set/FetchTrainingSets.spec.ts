import {FetchTrainingSets, Request, Response} from './FetchTrainingSets';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '@byot-frontend/common/src/redux-system/process/ProcessActionExtractor';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';
import {AsynchronousActionResponse} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {DataResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/DataResponse';
import {IterableResource} from '@byot-frontend/common/src/redux-system/data-structures/resources/IterableResource';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {FrontendCommonState} from '../../FrontendCommonState';

describe('FetchTrainingSets process', () => {
  let process: FetchTrainingSets;
  let request: Action<Request>;
  let response: Action<AsynchronousActionResponse<Request, DataResponse<Response>>>;

  beforeEach(() => {
    process = new FetchTrainingSets();
    request = ProcessActionExtractor.dispatch(FetchTrainingSets, {});
    response = ProcessActionExtractor.response(request, new GraphQLResponse());
  });

  it('should save filter', () => {
    request.payload = {filter: {reset: true, pagination: {limit: 10, offset: 20}, query: 'Query'}};
    const state = process.handleRequest(
      request,
      ({
        trainingSetListItems: new IterableResource<ITrainingSet>(),
      } as unknown) as FrontendCommonState,
      {} as FrontendCommonState
    );
    expect(state).toEqual(
      expect.objectContaining({
        trainingSetListItems: expect.any(IterableResource),
        trainingSetListFilter: {
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
