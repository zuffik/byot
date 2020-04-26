import { DateTime } from '../graphql/ts/types';

export function testDateTime(dateTime: DateTime | any) {
  if (dateTime) {
    expect(dateTime).toEqual(
      expect.objectContaining({
        iso: expect.any(String),
        humanReadable: expect.any(String),
      }),
    );
  }
}
