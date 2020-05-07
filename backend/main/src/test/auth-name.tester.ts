import { AuthNameCheck } from '../graphql/ts/types';

export function testAuthNameCheck(authName: AuthNameCheck | any) {
  expect(authName).toEqual({
    name: expect.any(String),
    type: expect.stringMatching(/USER_NAME|EMAIL/),
  });
}
