import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {
  AsynchronousAction,
  AsynchronousActionResponse,
} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {WebAppState} from '../../WebAppState';
import {Action} from 'typescript-fsa';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';
import {call} from 'redux-saga/effects';
import {gql} from 'apollo-boost';
import {Filter} from '@byot-frontend/common/src/types/app/filter/Filter';

export type Request = {filter?: Filter};
export type Response = {};

@ProcessActionCreator()
export class FetchTrainingSets implements AsynchronousAction<WebAppState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<WebAppState>) {
    const {reset, ...filter} = action.payload.filter!;
    return (yield call(ApolloContext.apolloClient.query, {
      query: gql`
        query fetchTrainingSets($filter: FulltextFilterForUser) {
          allTrainingSets(filter: $filter) {
            meta {
              totalCount
            }
            entries {
              id
              label
              createdAt {
                iso
              }
              # todo make training set thumbnail
              trainings {
                meta {
                  totalCount
                }
                entries {
                  id
                  media {
                    entries {
                      id
                      source {
                        thumbnail
                      }
                    }
                  }
                }
              }
            }
          }
        }
      `,
      variables: {filter},
    })).data.allTrainingSets;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<WebAppState>,
    prevState: Readonly<WebAppState>
  ): Readonly<WebAppState> {
    return {
      ...nextState,
      trainingSetListFilter: {
        ...nextState.trainingSetListFilter,
        reset: false,
      },
    };
  }
}
