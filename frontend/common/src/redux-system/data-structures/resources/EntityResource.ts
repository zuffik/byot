import {Resource, ResourceState} from './Resource';
import * as _ from 'lodash';

export class EntityResource<T> implements Resource<T> {
  protected _data?: T;
  protected _isLoaded: boolean = false;

  /**
   * @param defaultData is supposed to be just simple structure or primitive (eg. {}, [], null, 0)
   * @param state
   */
  constructor(protected defaultData?: T, public state: ResourceState = ResourceState.IDLE) {
    this._data = _.cloneDeep(this.defaultData);
  }

  public get hasData(): boolean {
    return !!this._data;
  }

  public get isProcessing(): boolean {
    return [ResourceState.LOADING].includes(this.state);
  }

  get data(): T | undefined {
    return this._data;
  }

  setData<D = T | undefined>(value: D) {
    this._isLoaded = true;
    this._data = (value as unknown) as T | undefined;
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }

  public reset<R extends Resource<T> = EntityResource<T>>(): R {
    return (new EntityResource<T>(this.defaultData) as unknown) as R;
  }
}
