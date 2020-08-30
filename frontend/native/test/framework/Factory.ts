import {createVisit, CreateVisitOptions} from './Visit';
import {get, getAll} from './Querying';
import {acceptAlert, press} from './Interaction';
import {Commands, createCommand} from './TestUtils';
import {Framework} from './Types';

export type CreateFrameworkOptions = {
  deeplinkPrefix: CreateVisitOptions['prefix'];
};

export const createFramework = <C extends string = string, E extends object = typeof process.env>(
  options: CreateFrameworkOptions
): Framework<C, E> => {
  const fw = ({
    visit: createVisit({prefix: options.deeplinkPrefix}),
    get,
    $: get,
    getAll,
    $$: getAll,

    acceptAlert,

    press,

    browser,
    driver,
    command: () => {},
    Commands: new Commands(),

    env: (key: string) => process.env[key],
  } as unknown) as Framework<C, E>;
  fw.command = createCommand<C>(fw as Framework<C, E>) as Framework<C, E>['command'];

  return new Proxy(fw, {
    get: (target, p: string) => {
      if (target[p]) {
        return target[p];
      }
      return (...args: any[]) => target.command(p as C, ...args);
    },
  }) as Framework<C, E>;
};
