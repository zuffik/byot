import { DateTime } from '../graphql/ts/types';

export function testDateTime(dateTime: DateTime | any) {
  expect(dateTime).toHaveProperty('timestamp');
  expect(typeof dateTime.timestamp).toEqual('number');
  expect(dateTime).toHaveProperty('iso');
  expect(typeof dateTime.iso).toEqual('string');
  expect(dateTime).toHaveProperty('humanReadable');
  expect(typeof dateTime.humanReadable).toEqual('string');
}
