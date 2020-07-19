import {FetchTrainingSets} from './FetchTrainingSets';

describe('FetchTrainingSets process', () => {
  let process: FetchTrainingSets;

  beforeEach(() => (process = new FetchTrainingSets()));

  it('should run valid query', () => {
    //const generator = process.saga({payload: {}});
  });

  afterEach(() => jest.clearAllMocks());
});
