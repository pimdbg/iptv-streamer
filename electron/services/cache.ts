import CacheItem from '../models/cacheItem.js';
import Store from 'electron-store';

export class Cache {
    private store: Store;

    constructor() {
        this.store = new Store()
    }

    /**
     * Returns the cached value for the given key, or undefined if the key does not exist or the cache item has expired.
     * 
     * @param key The key of the cache item to retrieve.
     * @returns The cached value associated with the key, or undefined if the key does not exist or the cache item has expired.
     */
    public get<T>(key: string): T | undefined {
        const storedValue = this.store.get(key);
        const cacheItem = CacheItem.fromStoredValue<T>(storedValue);

        if (cacheItem === undefined || cacheItem.isExpired()) {
            return undefined;
        }

        return cacheItem.value as T;
    }

    /**
     * Sets a value in the cache with an optional time-to-live (TTL) in minutes. If TTL is provided, the cache item will expire after the specified number of minutes.
     * 
     * @param key The key of the cache item to set.
     * @param value The value to be cached.
     * @param ttl Optional time-to-live in minutes. If provided, the cache item will expire after the specified number of minutes.
     */
    public set<T>(key: string, value: T, ttl?: number) {
      const cacheItem = new CacheItem<T>(value, ttl);

      this.store.set(key, cacheItem);
    }

    /**
     * Checks if the cache contains a non-expired value for the given key. Returns true if the key exists and the cache item has not expired, otherwise returns false.
     * 
     * @param key The key of the cache item to check for existence.
     * @returns True if the cache contains a non-expired value for the key, false otherwise.
     */
    public has(key: string): boolean {
        const storedValue = this.store.get(key);
        const cacheItem = CacheItem.fromStoredValue(storedValue);

        return cacheItem !== undefined && !cacheItem.isExpired();
    }

    /**
     * Deletes the cache item associated with the given key. If the key does not exist, this method does nothing.
     */
    public delete(key: string) {
        this.store.delete(key);
    }

    /**
     * Clears all items from the cache. After calling this method, the cache will be empty and all previously stored values will be removed.
     */
    public clear() {
        this.store.clear();
    }
}