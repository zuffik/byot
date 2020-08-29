import {createElement, Element} from './Element';

export const acceptAlert = browser.acceptAlert;

export const press = (selector: string): Element => {
  const el = $(selector);
  el.click();
  return createElement(el);
};
