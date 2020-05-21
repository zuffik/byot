import {Action} from 'typescript-fsa';

export interface AsynchronousActionResponse<QP, RP> {
  request: QP;
  response: RP;
}

type AAR<QP, RP> = AsynchronousActionResponse<QP, RP>;

export interface SynchronousAction<S, P> {
  handle(action: Action<P>, nextState: Readonly<S>, prevState: S): S;
}

export interface AsynchronousAction<S, QP, RP, P extends AAR<QP, RP> = AsynchronousActionResponse<QP, RP>> {
  handleRequest?(action: Action<QP>, nextState: Readonly<S>, prevState: Readonly<S>): Readonly<S>;

  saga(action: Action<QP>, state: Readonly<S>): Generator<any, any, any>;

  handleResponse?(action: Action<P>, nextState: Readonly<S>, prevState: Readonly<S>): Readonly<S>;
}

export type ProcessAction<S, QP, RP = any, P extends AAR<QP, RP> = AAR<QP, RP>> =
  | SynchronousAction<S, QP>
  | AsynchronousAction<S, QP, RP, P>;

export const isSynchronousAction = <S, QP, RP = any, P extends AAR<QP, RP> = AAR<QP, RP>>(
  action: ProcessAction<S, QP, RP, P>
): action is SynchronousAction<S, QP> => action && 'handle' in action;
export const isAsynchronousAction = <S, QP, RP = any, P extends AAR<QP, RP> = AAR<QP, RP>>(
  action: ProcessAction<S, QP, RP, P>
): action is AsynchronousAction<S, QP, RP, P> => action && 'saga' in action;
