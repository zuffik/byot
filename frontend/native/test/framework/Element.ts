interface ElementExtension {
  type: (value: string) => Element;
  press: () => Element;
  waitUntilDisappears: () => Element;
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
    waitUntilDisappears() {
      element.waitUntil(() => !element.isDisplayed());
      return this;
    },
  };
  return new Proxy(element as Element, {
    get(target, p) {
      if (p in ext) {
        return ext[p];
      }
      return target[p];
    },
  });
};
