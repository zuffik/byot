interface ElementExtension {
  type: (value: string) => Element;
  press: () => Element;
}

export type Element = WebdriverIO.Element & ElementExtension;

export const createElement = (element: WebdriverIO.Element): Element => {
  const ext = {
    type(value: string) {
      element.setValue(value);
      return this;
    },
    press() {
      element.click();
      return this;
    },
  };
  return new Proxy(element, {
    get(target, p) {
      if (p in ext) {
        return ext[p];
      }
      return target[p];
    },
  });
};
