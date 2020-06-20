import {AsynchronousActionResponse, ProcessAction} from '../process/ProcessActions';
import {ActionCreator} from 'typescript-fsa';

type AnyAAR = AsynchronousActionResponse<any, any>;
type Pack = {
  reducer: ProcessAction<any, any, any, AnyAAR>;
  entryAction: ActionCreator<any>;
  secondaryAction?: ActionCreator<AnyAAR>;
};
type ReduxBind = {
  prop: string;
  reducer: ProcessAction<any, any, any, AnyAAR>;
  entryAction: ActionCreator<any>;
  secondaryAction?: ActionCreator<AnyAAR>;
};

export class Actions {
  public static reduxPack: {[G: string]: {[A: string]: Pack}} = {};
  public static reduxBinds: {
    [G in keyof typeof Actions.reduxPack]: {
      [A in keyof typeof Actions.reduxPack[G]]: ReduxBind[];
    };
  } = {};
}
