import { Reducer as ReduxReducer } from 'redux';
import { AnyAction, isType } from 'typescript-fsa';
import * as _ from 'lodash';
import { Actions } from './Actions';
import { isAsynchronousAction } from '../process/ProcessActions';
import { Resource, ResourceState } from '../data-structures/resources/Resource';

export class Reducer<S> {
  constructor(private group: string = 'default') {
    if (!Actions.reduxPack[this.group]) {
      throw new Error(`Group '${this.group}' does not exists.`);
    }
  }

  private resourceReducer: ReduxReducer<S, AnyAction> = (
    clonedState: S | undefined,
    action: AnyAction,
    state?: S
  ): S =>
    _.values(Actions.reduxBinds[this.group] || {}).reduce(
      (nextState: Readonly<S>, binds) =>
        binds.reduce((s, bind) => {
          if (isAsynchronousAction(bind.reducer)) {
            const resource: Resource<any> = _.clone(_.get(s, bind.prop));
            if (isType(action, bind.entryAction)) {
              resource.state = ResourceState.LOADING;
            }
            if (isType(action, bind.secondaryAction!)) {
              resource.state = ResourceState.IDLE;
            }
            return _.set(s, bind.prop, resource);
          }
          return s;
        }, nextState),
      clonedState!
    );

  private processReducer: ReduxReducer<S, AnyAction> = (
    clonedState: S | undefined,
    action: AnyAction,
    state?: S
  ): S =>
    _.values(Actions.reduxPack[this.group]).reduce(
      (nextState: Readonly<S>, pack) =>
        (() => {
          if (isType(action, pack.entryAction)) {
            return isAsynchronousAction(pack.reducer)
              ? pack.reducer.handleRequest?.(action, nextState, state!)
              : pack.reducer.handle(action, nextState, state!);
          }
          if (
            pack.secondaryAction &&
            isType(action, pack.secondaryAction) &&
            isAsynchronousAction(pack.reducer)
          ) {
            return pack.reducer.handleResponse?.(action, nextState, state!);
          }
        })() || nextState,
      clonedState!
    );

  public main: (createState: () => S) => ReduxReducer<S, AnyAction> = (
    createState: () => S
  ) => (state: S = createState(), action: AnyAction): S => {
    return this.resourceReducer(this.processReducer(state, action), action);
  };
}
