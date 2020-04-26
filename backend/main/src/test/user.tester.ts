import { User as IUser, UserRegister, UserUpdateInput } from '../graphql/ts/types';
import { testDateTime } from './datetime.tester';
import { User } from '../user/user.entity';

export function testUser(user: User | IUser | any) {
  expect(user).toEqual(expect.objectContaining({
    id: expect.any(String),
    role: expect.stringMatching(/(USER|ADMIN)/),
    fullName: expect.any(String),
    userName: expect.any(String),
    email: expect.stringContaining('@'),
  }));
  expect(user.firstName).toBeStringOrNull();
  expect(user.lastName).toBeStringOrNull();
  testDateTime(user.createdAt);
  testDateTime(user.updatedAt);
  testDateTime(user.lastLogin);
}

export function testUserRegister(userRegister: UserRegister | any) {
  expect(userRegister).toEqual(expect.objectContaining({
    role: expect.stringMatching(/(USER|ADMIN)/),
    email: expect.stringContaining('@'),
    password: expect.any(String),
    userName: expect.any(String),
  }));
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
