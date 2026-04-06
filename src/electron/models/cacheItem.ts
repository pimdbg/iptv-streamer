export default class CacheItem<T> {
    public value: T;
    public expiresAt: Date | null;

    /**
     * Creates a new CacheItem instance.
     * @param value The value to be stored in the cache.
     * @param expiry The expiration time for the cache item. It can be a Date object, a number representing minutes until expiration, or null for no expiration.
     */
    constructor(value: T, expiry: Date)
    constructor(value: T, expiry?: number)
    constructor(value: T, expiry?: null)
    constructor(value: T, expiry: Date | number | null = null) {
        this.value = value;
        this.expiresAt = expiry instanceof Date
            ? expiry 
            : expiry 
                ? new Date(Date.now() + expiry * 60 * 1000) 
                : null;
    }

    /**
     * Checks if the cache item has expired.
     * @return True if the cache item has expired, false otherwise.
     */
    isExpired(): boolean {
        if(this.expiresAt === null) return false;
        return Date.now() > this.expiresAt.getTime();
    }

    /**
     * Creates a CacheItem instance from a stored value.
     * @param storedValue The value retrieved from storage, which should include the value and expiration time.
     * @return A CacheItem instance if the stored value is valid, or undefined if it is not.
     */
    static fromStoredValue<T>(storedValue: any): CacheItem<T> | undefined {
        if (storedValue === undefined) {
            return undefined;
        }

        const { value, expiresAt } = storedValue as { value: T; expiresAt: string | null };
        const cacheItem = new CacheItem<T>(value, null);

        if (expiresAt) {
            cacheItem.expiresAt = new Date(expiresAt);
        }

        return cacheItem;
    }
}