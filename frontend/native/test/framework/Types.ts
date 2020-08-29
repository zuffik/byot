import {Element} from './Element';
import {Commands} from './TestUtils';

export type Framework<C extends string, E extends object> = {
  visit: (screen: string) => void;
  getAll: (selector: string) => Element[];
  $$: Framework<C, E>['getAll'];
  get: (selector: string) => Element;
  $: Framework<C, E>['get'];
  acceptAlert: Function;
  press: (selector: string) => Element;
  browser: typeof browser;
  driver: typeof driver;
  command: (cmd: C, opts?: Record<string, any>) => void;
  Commands: Commands<C>;
  env: (key: keyof E) => E[keyof E];
} & Record<C, (args?: any) => void>;
