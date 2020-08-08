export class InputHacker {
  public static setValue(input: HTMLInputElement, value: string) {
    // this is just gross ugly hack
    setTimeout(() => {
      const valueSetter = Object.getOwnPropertyDescriptor(input, 'value')!.set;
      const prototype = Object.getPrototypeOf(input);
      const prototypeValueSetter = Object.getOwnPropertyDescriptor(prototype, 'value')!.set;

      if (valueSetter && valueSetter !== prototypeValueSetter) {
        prototypeValueSetter!.call(input, value);
      } else {
        valueSetter!.call(input, value);
      }
      input.dispatchEvent(new Event('change', {bubbles: true}));
      input.dispatchEvent(new Event('input', {bubbles: true}));
    });
  }
}
