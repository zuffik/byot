import * as _ from 'lodash';
import { MediaProvider } from '../media/providers/media.provider';
import { Media } from '../graphql/ts/types';

export const proxyMock = (initialObject: object = {}) =>
  new Proxy(
    {
      proxies: initialObject,
    } as any,
    {
      get(
        target: { proxies: any },
        p: string | number | symbol,
        receiver: any,
      ): any {
        target.proxies = target.proxies || {};
        if (p === 'then' || p === 'catch') {
          return Promise.resolve(jest.fn());
        }
        if (!target.proxies[p]) {
          target.proxies[p] = jest.fn();
        }
        return target.proxies[p];
      },
      set(
        target: any,
        p: string | number | symbol,
        value: any,
        receiver: any,
      ): boolean {
        target.proxies[p] = value;
        return true;
      },
    },
  );

export const mockRepository = (initialObject: object = {}) =>
  proxyMock({
    findAndCount: jest.fn(async () => [[], 0]),
    create: jest.fn((entity) => _.clone(entity)),
    ...initialObject,
  });

export const mockMediaProvider = (initialObject: object = {}) =>
  proxyMock({
    ...({
      findAll: jest.fn(async () => [[], 0] as [Media[], number]),
      parseFromUrl: jest.fn(async () => undefined),
    } as Partial<MediaProvider>),
    ...initialObject,
  });
