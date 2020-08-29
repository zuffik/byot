import {Framework} from '../framework/Types';
import {Env} from './Env';
import fetch, {RequestInit} from 'node-fetch';

export type Commands = 'clearStorage' | 'request' | 'tearDown';

export const createCommands = (fw: Framework<Commands, Env>) => {
  fw.Commands.createCommand('request', ({url, init}: {url: string; init?: RequestInit}) => {
    fw.browser.call(async () => {
      try {
        const response = await fetch(fw.env('PUBLIC_API_URL') + url, {
          ...init,
        });
        if (response.headers.get('Content-Type') === 'application/json') {
          return await response.json();
        }
        return await response.text();
      } catch (e) {
        console.error(e);
      }
    });
  });

  fw.Commands.createCommand('tearDown', (url: string) => {
    return fw.request({url, init: {method: 'DELETE'} as RequestInit});
  });
};
