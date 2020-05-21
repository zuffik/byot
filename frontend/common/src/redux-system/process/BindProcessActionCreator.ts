import {Resource} from '../data-structures/resources/Resource';
import {AsynchronousAction} from './ProcessActions';
import {Actions} from '../store/Actions';

export interface BindProcessActionCreatorOptions {
  group?: string;
}

export const BindProcessActionCreator = <S, T>(
  Process: {new (): AsynchronousAction<S, any, T>},
  {group = 'default'}: BindProcessActionCreatorOptions = {}
) => (state: S, prop: S[keyof S] extends Resource<T> ? keyof S : never) => {
  const pack = Actions.reduxPack[group][Process.prototype.uniqueIdentifier];
  if (!Actions.reduxBinds[group]) {
    Actions.reduxBinds[group] = {};
  }
  if (!Actions.reduxBinds[group][Process.prototype.uniqueIdentifier]) {
    Actions.reduxBinds[group][Process.prototype.uniqueIdentifier] = [];
  }
  Actions.reduxBinds[group][Process.prototype.uniqueIdentifier].push({
    prop: prop.toString(),
    reducer: pack.reducer,
    entryAction: pack.entryAction,
    secondaryAction: pack.secondaryAction,
  });
};
