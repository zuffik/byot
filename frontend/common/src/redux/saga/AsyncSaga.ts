import { put, select } from 'redux-saga/effects';
import { Action } from 'typescript-fsa';
import { ProcessActionExtractor } from '../process/ProcessActionExtractor';

export const asyncSaga = <S>(group: string = 'default') => () =>
  function* <QP, RP>(action: Action<QP>) {
    const state: S = yield select((state) => state);
    const reducer = ProcessActionExtractor.reducer(action, { group });
    const response = ProcessActionExtractor.response(
      action,
      yield reducer.saga(action, state),
      { group }
    );
    yield put(response);
  };
