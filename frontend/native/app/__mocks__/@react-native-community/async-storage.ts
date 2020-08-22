const storage: any = {};

export default {
  setItem: async (key: string, value: any) => (storage[key] = value),
  getItem: async (key: string) => storage[key],
  removeItem: async (key: string) => {
    delete storage[key];
  },
};
