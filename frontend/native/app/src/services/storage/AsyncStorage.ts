import Storage from '@react-native-community/async-storage';

export class AsyncStorage<T extends object> {
  getItem = async <K extends keyof T, D = T[K] | undefined>(key: K, def?: D): Promise<T[K]> => {
    let item: T[K] = JSON.parse((await Storage.getItem(key.toString())) || 'null') as T[K];
    if (item === null) {
      item = (def as unknown) as T[K];
    }
    return item;
  };

  setItem = async <K extends keyof T>(key: K, value: T[K]): Promise<void> => {
    await Storage.setItem(key.toString(), JSON.stringify(value));
  };

  removeItem = async <K extends keyof T>(key: K): Promise<void> => {
    await Storage.removeItem(key.toString());
  };

  clear = async (callback?: (error?: Error) => void): Promise<void> => {
    await Storage.clear(callback);
  };
}
