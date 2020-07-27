import {IResetPassword} from '../interfaces/IResetPassword';

export class ResetPassword implements IResetPassword {
  public newPassword: string;
  public passwordRepeat: string;
  public token: string;
  constructor({newPassword = '', passwordRepeat = '', token = ''}: Partial<IResetPassword> = {}) {
    this.newPassword = newPassword;
    this.passwordRepeat = passwordRepeat;
    this.token = token;
  }
}
