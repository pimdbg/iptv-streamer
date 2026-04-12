import type ICacheService from '../interfaces/ICacheService.js';
import CacheItem from '../models/cacheItem.js';
import Store from 'electron-store';

export class PersistentCache implements ICacheService {
    private store: Store;

    constructor() {
        this.store = new Store()
    }

    public get<T>(key: string): T | undefined {
        const storedValue = this.store.get(key);
        const cacheItem = CacheItem.fromStoredValue<T>(storedValue);

        if (cacheItem === undefined || cacheItem.isExpired()) {
            this.delete(key);
            return undefined;
        }

        return cacheItem.value as T;
    }

    public set<T>(key: string, value: T, ttl?: number) {
      const cacheItem = new CacheItem<T>(value, ttl);

      this.store.set(key, cacheItem);
    }

    public has(key: string): boolean {
        const storedValue = this.get(key);
        return storedValue !== undefined;
    }

    public delete(key: string) {
        this.store.delete(key);
    }

    public clear() {
        this.store.clear();
    }
}