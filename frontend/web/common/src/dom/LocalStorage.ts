export class LocalStorage<T extends object> {
  getItem<K extends keyof T, D = T[K] | undefined>(key: K, def?: D): T[K] {
    let item: T[K] = JSON.parse(localStorage.getItem(key.toString()) || 'null') as T[K];
    if (item === null) {
      item = (def as unknown) as T[K];
    }
    return item;
  }

  setItem<K extends keyof T>(key: K, value: T[K]): void {
    localStorage.setItem(key.toString(), JSON.stringify(value));
  }

  removeItem<K extends keyof T>(key: K): void {
    localStorage.removeItem(key.toString());
  }
}
