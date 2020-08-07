import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {
  AsynchronousAction,
  AsynchronousActionResponse,
} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';
import {call} from 'redux-saga/effects';
import {gql} from 'apollo-boost';
import {Filter} from '@byot-frontend/common/src/types/app/filter/Filter';
import {ITrainingSet} from '@byot-frontend/common/src/types/interfaces/ITrainingSet';
import {FrontendCommonState} from '../../FrontendCommonState';
import {IterableResource} from '../../../redux-system/data-structures/resources/IterableResource';

export type Request = {filter?: Filter<{idUser?: string}>};
export type Response = {};

@ProcessActionCreator()
export class FetchTrainingSets implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      trainingSetListItems: action.payload.filter?.reset
        ? nextState.trainingSetListItems.reset()
        : nextState.trainingSetListItems,
      trainingSetListFilter: {
        ...nextState.trainingSetListFilter,
        ...action.payload.filter,
        reset: false,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    const {reset, ...filter} = action.payload?.filter || {};
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
                    meta {
                      totalCount
                    }
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
}
