import {
  Token,
  User as IUser,
  UserRegister,
  UserUpdateInput,
} from '../graphql/ts/types';
import { testDateTime } from './datetime.tester';
import { User } from '../user/user.entity';

export async function testUser(user: User | IUser | any) {
  expect(user).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      role: expect.stringMatching(/(USER|ADMIN)/),
      fullName: expect.any(String),
      userName: expect.any(String),
      email: expect.stringContaining('@'),
    }),
  );
  if (user.tokens) {
    (await user.tokens).forEach(testToken);
  }
  expect(user.firstName).toBeStringOrNull();
  expect(user.lastName).toBeStringOrNull();
  testDateTime(user.createdAt);
  testDateTime(user.updatedAt);
  testDateTime(user.lastLogin);
}

export function testUserRegister(userRegister: UserRegister | any) {
  expect(userRegister).toEqual(
    expect.objectContaining({
      email: expect.stringContaining('@'),
      password: expect.any(String),
      userName: expect.any(String),
    }),
  );
  expect(userRegister.firstName).toBeOptionalString();
  expect(userRegister.lastName).toBeOptionalString();
}

export function testUserUpdate(userUpdate: UserUpdateInput | any) {
  expect(userUpdate.role).toBeOptionalString();
  expect(userUpdate.firstName).toBeOptionalString();
  expect(userUpdate.lastName).toBeOptionalString();
  expect(userUpdate.email).toBeOptionalString();
  if (userUpdate.email) {
    expect(userUpdate.email).toContain('@');
  }
  expect(userUpdate.password).toBeOptionalString();
}

export function testToken(token: Token) {
  expect(token).toEqual(
    expect.objectContaining({
      id: expect.any(String),
      token: expect.any(String),
      valid: expect.any(Boolean),
      tokenType: expect.stringMatching(/EMAIL_CONFIRMATION|PASSWORD_RESET/),
    }),
  );

  testDateTime(token.createdAt);
  testDateTime(token.updatedAt);
  testDateTime(token.validUntil);
}
