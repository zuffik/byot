import {EntityResource} from './EntityResource';
import {Resource, ResourceState} from './Resource';
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

  setData<D = T[] | IList<any>>(value: D) {
    const data = Array.isArray(value) ? value || [] : ((value as unknown) as IList<any>).entries;
    this._data = this.appendNewData ? [...(this._data || []), ...data] : data;
    this.totalCount = Array.isArray(value)
      ? value.length
      : ((value as unknown) as IList<any>).meta?.totalCount;
  }

  get data(): T[] {
    return this._data || [];
  }

  public reset<R extends Resource<T[]> = IterableResource<T>>(): R {
    return (new IterableResource<T>(this.defaultData, {
      appendNewData: this.appendNewData,
      totalCount: this.defaultData?.length,
    }) as unknown) as R;
  }
}
