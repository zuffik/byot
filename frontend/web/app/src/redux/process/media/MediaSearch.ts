import {ProcessActionCreator} from '@byot-frontend/common/src/redux-system/process/ProcessActionCreator';
import {AsynchronousAction} from '@byot-frontend/common/src/redux-system/process/ProcessActions';
import {Action} from 'typescript-fsa';
import {WebAppState} from '../../WebAppState';
import {call} from 'redux-saga/effects';
import {ApolloContext} from '@byot-frontend/common/src/graphql/context/ApolloContext';
import {gql} from 'apollo-boost';
import {IMediaFilter} from '@byot-frontend/common/src/types/interfaces/IMediaFilter';
import {GraphQLResponse} from '@byot-frontend/common/src/redux-system/data-structures/responses/GraphQLResponse';

export type Request = {filter?: IMediaFilter};
export type Response = {};

@ProcessActionCreator()
export class MediaSearch implements AsynchronousAction<WebAppState, Request, Response> {
  *saga(action: Action<Request>, state: Readonly<WebAppState>) {
    if ((action.payload.filter?.query || '').trim() === '') {
      return yield new GraphQLResponse([], []);
    }
    return (yield call(ApolloContext.apolloClient.query, {
      query: gql`
        query findMedia($filter: MediaFilter) {
          findMedia(filter: $filter) {
            meta {
              totalCount
            }
            entries {
              label
              source {
                mediaType
                resourceId
                sourceType
                thumbnail
                url
              }
            }
          }
        }
      `,
      variables: {filter: {...action.payload.filter /*, local: true*/, pagination: {offset: 0, limit: 5}}},
    })).data.findMedia;
  }
}
