import { List } from '../graphql/ts/types';

export function testList(list: List | any, iteratee?: (item: any) => void) {
  expect(list).toHaveProperty('entries');
  expect(Array.isArray(list.entries)).toBeTruthy();
  expect(list).toHaveProperty('meta');
  expect(list.meta).toHaveProperty('totalCount');
  expect(typeof list.meta.totalCount).toEqual('number');
  if (iteratee) {
    list.entries.forEach(iteratee);
  }
}
