import {all, put, select, takeEvery} from 'redux-saga/effects';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '../process/ProcessActionExtractor';
import {Actions} from '../store/Actions';
import * as _ from 'lodash';
import {isAsynchronousAction} from '../process/ProcessActions';
import {DataResponse} from '../data-structures/responses/DataResponse';

export const rootSaga = (group: string = 'default') =>
  function* <S, QP, RP>() {
    yield all(
      _.values(Actions.reduxPack[group]).map(
        pack => isAsynchronousAction(pack.reducer) && takeEveryFunction(pack.entryAction.type, group)
      )
    );
  };

function* takeEveryFunction(pattern: string, group: string = 'default') {
  yield takeEvery(pattern, saga(group));
}

const saga = (group: string = 'default') =>
  function* <S, QP, RP>(action: Action<QP>) {
    const state: S = yield select(state => state);
    const reducer = ProcessActionExtractor.reducer(action, {group});
    let result: DataResponse<RP>;
    try {
      result = yield reducer.saga(action, state);
    } catch (e) {
      result = {
        data: undefined,
        success: false,
        errors: [e],
      };
    }
    const response = ProcessActionExtractor.response(action, result, {group});
    yield put(response);
  };
