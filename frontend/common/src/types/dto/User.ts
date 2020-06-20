import {IUser} from '../interfaces/IUser';
import {Role} from '../../shared/graphql/ts/types';
import {IDateTime} from '../interfaces/IDateTime';
import {DateTime} from './DateTime';

export class User implements IUser {
  public createdAt: IDateTime;
  public email: string;
  public emailValidated: boolean;
  public firstName: string;
  public fullName: string;
  public id: string;
  public lastLogin: IDateTime;
  public lastName: string;
  public role: Role;
  public updatedAt: IDateTime;
  public userName: string;

  constructor(
    {
      createdAt = new DateTime(),
      email = '',
      emailValidated = false,
      firstName = '',
      fullName = '',
      id = '',
      lastLogin = new DateTime(),
      lastName = '',
      role = Role.USER,
      updatedAt = new DateTime(),
      userName = '',
    }: IUser = {} as IUser
  ) {
    this.createdAt = createdAt;
    this.email = email;
    this.emailValidated = emailValidated;
    this.firstName = firstName;
    this.fullName = fullName;
    this.id = id;
    this.lastLogin = lastLogin;
    this.lastName = lastName;
    this.role = role;
    this.updatedAt = updatedAt;
    this.userName = userName;
  }
}
