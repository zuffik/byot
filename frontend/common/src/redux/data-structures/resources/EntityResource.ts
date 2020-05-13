import { Resource, ResourceState } from './Resource';
import * as _ from 'lodash';

export class EntityResource<T> implements Resource<T> {
  protected _data?: T;
  protected _isLoaded: boolean = false;

  constructor(
    private defaultData?: T,
    public state: ResourceState = ResourceState.IDLE
  ) {
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

  set data(value: T | undefined) {
    this._isLoaded = true;
    this._data = value;
  }

  get isLoaded(): boolean {
    return this._isLoaded;
  }
}
