export type CmdInPack<T, K extends keyof T> = {
  fn: T[K] | ((...args: any[]) => any);
  opts?: Cypress.CommandOptions;
};

export type CmdPack<T> = {
  [K in keyof T]: CmdInPack<T, K>;
};
