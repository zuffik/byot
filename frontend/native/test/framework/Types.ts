import {Element} from './Element';
import {Commands} from './TestUtils';

export type Framework<C extends string, E extends object> = {
  visit: (url: string) => void;
  getAll: (selector: string) => Element[];
  $$: Framework<C, E>['getAll'];
  get: (selector: string) => Element;
  $: Framework<C, E>['get'];
  acceptAlert: Function;
  press: (selector: string) => Element;
  browser: typeof browser;
  driver: typeof driver;
  command: (cmd: C, ...args: any[]) => void;
  Commands: Commands<C>;
  env: <K extends keyof E>(key: K) => E[K];
} & Record<C, (...args: any[]) => void>;
