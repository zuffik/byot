import { Action } from 'typescript-fsa';

export type SagaWrapper = <QP, S>(
  action: Action<QP>,
  state: Readonly<S>
) => (generator: Generator<any, any, any>[]) => Generator<any, any, any>;
