import {applyMiddleware, createStore, Middleware, Store} from 'redux';
import {AnyAction} from 'typescript-fsa';
import {Reducer} from './Reducer';
import {createLogger} from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from '../saga/AsyncSaga';

export const storeFactory = <S>(
  createState: () => S,
  group: string = 'default',
  {
    useLogger = false,
  }: {
    useLogger?: boolean;
  } = {}
): Store<S, AnyAction> => {
  const reducer = new Reducer<S>(group);
  const sagaMiddleware = createSagaMiddleware();

  const middlewares: Middleware<any, any, any>[] = [sagaMiddleware];

  const logger = createLogger({
    collapsed: (getState, action, logEntry) => !logEntry!.error,
  });

  if (useLogger) {
    middlewares.push(logger);
  }

  const store = createStore(reducer.main(createState), applyMiddleware(...middlewares));

  sagaMiddleware.run(rootSaga(group));
  return store;
};
