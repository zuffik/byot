import {Actions} from '../store/Actions';
import {AsynchronousActionResponse, ProcessAction} from './ProcessActions';
import {ProcessActionCreatorOptions} from './ProcessActionCreator';

export const ProcessActionCreatorOverride = <
  S,
  QP,
  RP = any,
  P extends AsynchronousActionResponse<QP, RP> = AsynchronousActionResponse<QP, RP>
>(
  Source: {new (...args: any[]): ProcessAction<S, any, any, any>},
  {group = 'default'}: ProcessActionCreatorOptions = {}
) => (Target: {new (...args: any[]): ProcessAction<S, QP, RP, P>}) => {
  const id = Source.prototype.__uniqueIdentifier;
  const reducer = new Target();
  if (Actions.reduxPack[group]) {
    Actions.reduxPack[group][id].reducer = reducer;
  }
  if (Actions.reduxBinds[group]) {
    Actions.reduxBinds[group][id] = Actions.reduxBinds[group][id].map(b => ({...b, reducer}));
  }
};
