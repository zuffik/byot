import { Role, User as IUser, UserRegister } from '../graphql/ts/types';
import { testDateTime } from './datetime.tester';
import { User } from '../user/user.entity';

export function testUser(user: User | IUser | any) {
  expect(user).toHaveProperty('id');
  expect(typeof user.id).toEqual('string');
  expect(user).toHaveProperty('createdAt');
  testDateTime(user.createdAt);
  expect(user).toHaveProperty('updatedAt');
  expect(['undefined', 'object'].includes(typeof user.updatedAt)).toBeTruthy();
  if (user.updatedAt) {
    testDateTime(user.updatedAt);
  }
  expect(['undefined', 'object'].includes(typeof user.lastLogin)).toBeTruthy();
  if (user.lastLogin) {
    testDateTime(user.lastLogin);
  }
  expect(user).toHaveProperty('role');
  expect([Role.USER, Role.ADMIN].includes(user.role)).toBeTruthy();
  expect(user).toHaveProperty('firstName');
  expect(typeof user.firstName).toEqual('string');
  expect(user).toHaveProperty('lastName');
  expect(typeof user.lastName).toEqual('string');
  expect(user).toHaveProperty('fullName');
  expect(typeof user.fullName).toEqual('string');
  expect(user).toHaveProperty('userName');
  expect(typeof user.userName).toEqual('string');
  expect(user).toHaveProperty('email');
  expect(typeof user.email).toEqual('string');
}

export function testUserRegister(userRegister: UserRegister | any) {
  expect(userRegister).toHaveProperty('role');
  expect([Role.USER, Role.ADMIN].includes(userRegister.role)).toBeTruthy();
  expect(userRegister).toHaveProperty('firstName');
  expect(['string', 'undefined'].includes(typeof userRegister.firstName)).toBeTruthy();
  expect(userRegister).toHaveProperty('lastName');
  expect(['string', 'undefined'].includes(typeof userRegister.lastName)).toBeTruthy();
  expect(userRegister).toHaveProperty('email');
  expect(['string'].includes(typeof userRegister.email)).toBeTruthy();
  expect(userRegister).toHaveProperty('password');
  expect(['string'].includes(typeof userRegister.password)).toBeTruthy();
  expect(userRegister).toHaveProperty('userName');
  expect(['string'].includes(typeof userRegister.userName)).toBeTruthy();
}
