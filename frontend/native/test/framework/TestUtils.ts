import {Framework} from './Types';

export const command = <C extends string = string>(cmd: C) => $(`~testUtils-${cmd}`).click();

export const createCommand = <C extends string = string>(fw: Framework<C, any>) => (
  cmd: C,
  ...args: any[]
) => {
  if (fw.Commands.commandExists(cmd)) {
    return fw.Commands.runCommand(cmd, ...args);
  }
  return command<C>(cmd);
};

export class Commands<C extends string = string> {
  private readonly commands: Record<
    string,
    {
      fn: (...args: any[]) => void;
    }
  > = {};

  createCommand(cmd: C, fn: (...args: any[]) => void) {
    this.commands[cmd] = {fn};
  }

  commandExists(cmd: C): boolean {
    return cmd in this.commands;
  }

  runCommand(cmd: C, ...args: any[]) {
    return this.commands[cmd].fn(...args);
  }

  getCommand(cmd: C): (...args: any[]) => void {
    return this.commands[cmd]?.fn;
  }
}
