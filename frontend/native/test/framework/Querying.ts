import {createElement, Element} from './Element';

export const get = (selector: string): Element => {
  const element = $(selector);
  return createElement(element);
};

export const getAll = (selector: string): Element[] => {
  const elements = $$(selector);
  return elements.map(createElement);
};
