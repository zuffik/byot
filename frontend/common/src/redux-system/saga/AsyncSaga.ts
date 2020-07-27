import {put, select, takeEvery} from 'redux-saga/effects';
import {Saga} from 'redux-saga';
import {Action} from 'typescript-fsa';
import {ProcessActionExtractor} from '../process/ProcessActionExtractor';
import {DataResponse} from '../data-structures/responses/DataResponse';

export const makeSaga = (pattern: string, group: string = 'default'): Saga =>
  function* <S, QP, RP>() {
    yield takeEvery(pattern, saga(group));
  };

const saga = (group: string = 'default') =>
  function* <S, QP, RP>(action: Action<QP>) {
    let result: DataResponse<RP>;
    try {
      const state: S = yield select(state => state);
      const reducer = ProcessActionExtractor.reducer(action, {group});
      result = yield reducer.saga(action, state);
    } catch (e) {
      result = {
        data: undefined,
        success: false,
        errors: [e],
      };
      console.error(e);
    }
    const response = ProcessActionExtractor.response(action, result, {group});
    yield put(response);
  };
