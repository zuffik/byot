// tslint:disable-next-line:no-namespace
declare namespace jest {
  export interface Matchers<R> {
    toBeStringOrNull: () => void;
    toBeOptionalString: () => void;
  }

  export interface Expect {
    toBeStringOrNull: () => void;
    toBeOptionalString: () => void;
  }
}
