import {EntityResource} from './EntityResource';
import {ResourceState} from './Resource';

export class IterableResource<T> extends EntityResource<T[]> {
  constructor(defaultData: T[] = [], state: ResourceState = ResourceState.IDLE) {
    super(defaultData, state);
  }

  get hasData(): boolean {
    return this.data!.length > 0;
  }

  set data(value: T[]) {
    this._data = value || [];
  }

  get data(): T[] {
    return this._data || [];
  }
}
