import { net } from "electron";

interface FetchOptions extends Omit<Electron.ClientRequestConstructorOptions, 'url'|'method'> {
    retries?: number; 
}

/**
 * A service for fetching data using Electron's net module, with support for retries and exponential backoff.
 * 
 * This service abstracts the fetching logic and provides a simple interface for making HTTP requests, while also handling potential errors and retrying failed requests with an increasing delay between attempts.
 */
export class FetchService {
    /** 
     * Fetches data from the given URL.
     * @param url The URL to fetch data from.
     * @param options Optional fetch options, including the number of retries in case of failure.
     * @typeParam T The expected type of the fetched data.
     * @returns A promise that resolves with the fetched data.
     */
    public async get<T>(url: string, options?: FetchOptions): Promise<T> {
        const retries = options?.retries ?? 3;
        const backoffMs = 1000; 

        return this.withRetry<T>(
            () => new Promise((resolve, reject) => {
                net.request({ 
                    url, 
                    method: "GET",
                    ...options
                }).on("response", (response) => {
                    // Assures response status code indicates success (2xx)
                    if (response.statusCode < 200 || response.statusCode >= 300) {
                        reject(new Error(`HTTP ${response.statusCode}: ${response.statusMessage}`));
                        return;
                    }

                    let data = '';

                    response.on("data", (chunk) => {
                        data += chunk;
                    });
                    response.on("end", () => {
                        resolve(data as unknown as T);
                    });
                }).on("error", reject).end()
            }
        ), retries, backoffMs);
    }

    /**
     * Attempts to execute the provided asynchronous function, retrying on failure with exponential backoff.
     *
     * @template T The return type of the asynchronous function.
     * @param fn The asynchronous function to execute.
     * @param retries The maximum number of retry attempts.
     * @param backoffMs The initial backoff duration in milliseconds. The delay doubles with each retry.
     * @returns A promise that resolves with the result of the function if successful.
     * @throws The last encountered error if all retry attempts fail.
     */
    private async withRetry<T>(fn: () => Promise<T>, retries: number, backoffMs: number): Promise<T> {
        let lastError: Error | undefined;

        for (let attempt = 0; attempt < retries; attempt++) {
            try {
                return await fn();
            } catch (error) {
                lastError = error as Error;

                if (attempt < retries - 1) {
                    const delay = backoffMs * Math.pow(2, attempt); // Exponential backoff
                    await new Promise(res => setTimeout(res, delay));
                } else {
                    throw error;
                }
            }
        }

        throw lastError;
    }
}
