import {EntityResource} from './EntityResource';
import {ResourceState} from './Resource';

export class IterableResource<T> extends EntityResource<T[]> {
  public totalCount: number;

  constructor(
    defaultData: T[] = [],
    {
      state = ResourceState.IDLE,
      totalCount = defaultData.length,
    }: {
      state?: ResourceState;
      totalCount?: number;
    } = {}
  ) {
    super(defaultData, state);
    this.totalCount = totalCount;
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
