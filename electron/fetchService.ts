import { net } from "electron";

export class FetchService {
    /** 
     * Fetches data from the given URL.
     * @param url The URL to fetch data from.
     * @typeParam T The expected type of the fetched data.
     * @returns A promise that resolves with the fetched data.
     */
    get<T>(url: string): Promise<T> {
        return new Promise((resolve, reject) => {
            net.request(url).on("response", (response) => {
                let data = "";
                    response.on("data", (chunk) => {
                    data += chunk;
                });
                response.on("end", () => {
                    resolve(data as unknown as T);
                });
            }).on("error", (error) => {
                reject(error);
            }).end()
        })
    }
}