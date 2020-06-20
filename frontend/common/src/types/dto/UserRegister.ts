import {IUserRegister} from '../interfaces/IUserRegister';

export class UserRegister implements IUserRegister {
  public email: string;
  public firstName: string;
  public lastName: string;
  public password: string;
  public userName: string;

  constructor(
    {email, firstName = '', lastName = '', password, userName = ''}: IUserRegister = {
      email: '',
      password: '',
      userName: '',
    }
  ) {
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.password = password;
    this.userName = userName;
  }
}
