import {Saga} from 'redux-saga';
import {sagaMiddleware} from '../store/Store';

export class SagaQueue {
  private static _sagaQueue: Saga[] = [];
  private static _isInitialized: boolean = false;

  public static addSagaToQueue(effect: Saga) {
    this._sagaQueue.push(effect);
    this.processQueue();
  }

  public static initialize() {
    this._isInitialized = true;
    this.processQueue();
  }

  private static processQueue() {
    if (!this._isInitialized) {
      return;
    }
    while (this._sagaQueue.length > 0) {
      sagaMiddleware.run(this._sagaQueue.pop()!);
    }
  }
}
