import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {FrontendCommonState} from '../../FrontendCommonState';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '../../../graphql/context/ApolloContext';
import {gql} from 'apollo-boost';

export type Request = {id: string};
export type Response = {};

@ProcessActionCreator()
export class TrainingSetBaseFetch implements AsynchronousAction<FrontendCommonState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<FrontendCommonState>) {
    return (yield call(ApolloContext.apolloClient.query, {
      query: gql`
        query fetchTrainingSet($id: ID!) {
          trainingSet(id: $id) {
            id
            createdAt {
              iso
            }
            label
            trainings {
              entries {
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
                    source {
                      id
                      thumbnail
                    }
                  }
                }
              }
              meta {
                totalCount
              }
            }
          }
        }
      `,
      variables: {id: action.payload.id},
    })).data.trainingSet;
  }
}
