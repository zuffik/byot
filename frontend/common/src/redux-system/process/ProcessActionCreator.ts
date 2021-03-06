import actionCreatorFactory, {ActionCreator, ActionCreatorFactory} from 'typescript-fsa';
import {Actions} from '../store/Actions';
import {AsynchronousActionResponse, isAsynchronousAction, ProcessAction} from './ProcessActions';
import {SagaQueue} from '../saga/SagaQueue';
import {Saga} from 'redux-saga';
import {makeSaga} from '../saga/AsyncSaga';

const actionCreators: {[G: string]: ActionCreatorFactory} = {};

export interface ProcessActionCreatorOptions {
  group?: string;
  requestSuffix?: string;
  responseSuffix?: string;
}

let id = 0;

export const ProcessActionCreator = <
  S,
  QP,
  RP = any,
  P extends AsynchronousActionResponse<QP, RP> = AsynchronousActionResponse<QP, RP>
>({
  group = 'default',
  requestSuffix = 'Request',
  responseSuffix = 'Response',
}: ProcessActionCreatorOptions = {}) => (Target: {new (...args: any[]): ProcessAction<S, QP, RP, P>}) => {
  if (!Actions.reduxPack[group]) {
    Actions.reduxPack[group] = {};
    actionCreators[group] = actionCreatorFactory(group);
  }
  const actionCreator = actionCreators[group];
  const reducer = new Target();
  const actionName = process.env.NODE_ENV === 'production' ? (++id).toString() : Target.name;
  Target.prototype.__uniqueIdentifier = actionName;
  let entryAction: ActionCreator<QP>,
    secondaryAction: ActionCreator<P> | undefined = undefined;
  if (isAsynchronousAction(reducer)) {
    entryAction = actionCreator(actionName + requestSuffix);
    secondaryAction = actionCreator(actionName + responseSuffix);
    SagaQueue.addSagaToQueue(makeSaga(entryAction.type, group));
  } else {
    entryAction = actionCreator(actionName);
  }
  Actions.reduxPack[group][actionName] = {
    entryAction,
    secondaryAction: (secondaryAction as any) as ActionCreator<AsynchronousActionResponse<any, any>>,
    reducer,
  };
};
