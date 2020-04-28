export type PromiseRecord<O extends object> = Record<
  keyof O,
  O[keyof O] | Promise<O[keyof O]>
>;
