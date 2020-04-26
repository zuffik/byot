expect.extend({
  toBeStringOrNull: (received) => ({
    message: () =>
      `received value must be string or null (${typeof received} given)`,
    pass: received === null || typeof received === 'string',
  }),
  toBeOptionalString: (received) => ({
    message: () =>
      `received value must be string or undefined (${typeof received} given)`,
    pass: !received || typeof received === 'string',
  }),
});

jest.setTimeout(10000);
