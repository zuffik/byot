import {EntityResource} from './EntityResource';
import {ResourceState} from './Resource';
import {IList} from '../../../types/interfaces/IList';

export class IterableResource<T> extends EntityResource<T[]> {
  public totalCount: number;
  public appendNewData: boolean;

  constructor(
    defaultData: T[] = [],
    {
      state = ResourceState.IDLE,
      totalCount = defaultData.length,
      appendNewData = true,
    }: {
      state?: ResourceState;
      totalCount?: number;
      appendNewData?: boolean;
    } = {}
  ) {
    super(defaultData, state);
    this.totalCount = totalCount;
    this.appendNewData = appendNewData;
  }

  get hasData(): boolean {
    return this.data!.length > 0;
  }

  set data(value: T[] | IList) {
    const data = Array.isArray(value) ? value || [] : value.entries;
    this._data = this.appendNewData ? [...this._data, ...data] : data;
    this.totalCount = Array.isArray(value) ? value.length : value.meta?.totalCount;
  }

  get data(): T[] {
    return this._data || [];
  }

  reset() {
    super.reset();
    this.totalCount = this.data.length;
  }
}
