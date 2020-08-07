import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {
  AsynchronousAction,
  AsynchronousActionResponse,
} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {FrontendCommonState} from '../../FrontendCommonState';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {gql} from 'apollo-boost';
import {ITraining} from '../../../types/interfaces/ITraining';

export type Request = {id: string};
export type Response = ITraining;

@ProcessActionCreator()
export class TrainingBaseFetch implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return (yield call(ApolloContext.apolloClient.query, {
      query: gql`
        query fetchTraining($id: ID!) {
          training(id: $id) {
            id
            label
            createdAt {
              iso
            }
            media {
              meta {
                totalCount
              }
              entries {
                id
                label
                source {
                  id
                  thumbnail
                  resourceId
                  url
                  sourceType
                }
              }
            }
          }
        }
      `,
      variables: {id: action.payload.id},
    })).data.training;
  }

  handleResponse(
    action: Action<AsynchronousActionResponse<Request, Response>>,
    nextState: Readonly<FrontendCommonState>,
    prevState: Readonly<FrontendCommonState>
  ): Readonly<FrontendCommonState> {
    return {
      ...nextState,
      currentMedia: action.payload.response.data?.media.entries[0],
    };
  }
}
