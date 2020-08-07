import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';
import {call} from 'redux-saga/effects';
import {gql} from 'apollo-boost';
import {Filter} from '@byot-frontend/common/src/types/app/filter/Filter';
import {FrontendCommonState} from '../../FrontendCommonState';

export type Request = {filter?: Filter};
export type Response = {};

@ProcessActionCreator()
export class FetchTrainings implements AsynchronousAction<FrontendCommonState, Request, Response> {
  handleRequest(
    action: Action<Request>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      trainingListItems: action.payload.filter?.reset
        ? nextState.trainingListItems.reset()
        : nextState.trainingListItems,
      trainingListFilter: {
        ...nextState.trainingListFilter,
        ...action.payload.filter,
        reset: false,
      },
    };
  }

  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    const {reset, ...filter} = action.payload?.filter || {};
    return (yield call(ApolloContext.apolloClient.query, {
      query: gql`
        query fetchTrainings($filter: FulltextFilterForUser) {
          allTrainings(filter: $filter) {
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
      `,
      variables: {filter},
    })).data.allTrainings;
  }
}
