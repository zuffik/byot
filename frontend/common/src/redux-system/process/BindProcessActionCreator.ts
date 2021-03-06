import {Resource} from '../data-structures/resources/Resource';
import {AsynchronousAction} from './ProcessActions';
import {Actions} from '../store/Actions';

export interface BindProcessActionCreatorOptions {
  group?: string;
}

export const BindProcessActionCreator = <S, T, K extends keyof S>(
  Process: {new (): AsynchronousAction<S, any, T>},
  {group = 'default'}: BindProcessActionCreatorOptions = {}
) => (state: S, prop: K) => {
  const pack = Actions.reduxPack[group][Process.prototype.__uniqueIdentifier];
  if (!Actions.reduxBinds[group]) {
    Actions.reduxBinds[group] = {};
  }
  if (!Actions.reduxBinds[group][Process.prototype.__uniqueIdentifier]) {
    Actions.reduxBinds[group][Process.prototype.__uniqueIdentifier] = [];
  }
  Actions.reduxBinds[group][Process.prototype.__uniqueIdentifier].push({
    prop: prop.toString(),
    reducer: pack.reducer,
    entryAction: pack.entryAction,
    secondaryAction: pack.secondaryAction,
  });
};
