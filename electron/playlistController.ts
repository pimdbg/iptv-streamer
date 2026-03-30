import { FetchService } from "./fetchService.js";
import { CacheService } from "./cacheService.js";
import { type Channel } from "@shared/types.js";
import 'dotenv/config';

const cacheService = new CacheService();
const fetchService = new FetchService();

const env = (key: string, defaultValue?: string) => {
    const value = process.env[key];
    return value !== undefined ? value : defaultValue;
}

export async function getAllChannels() {
    function parseM3U(data: string): Channel[] {
        const lines = data.split("\n");
        const channels = [];

        for (let i = 0; i < lines.length; i++) {
            if (lines[i].startsWith("#EXTINF")) {
                const info = lines[i];

                const name = info.split(",")[1];
                const logo = info.match(/tvg-logo="(.*?)"/)?.[1];
                const group = info.match(/group-title="(.*?)"/)?.[1];
                const url = lines[i + 1];

                channels.push({ name, logo, group, url });
            }
        }

        return channels;
    }

    const playlistUrl = env('IPTV_PLAYLIST_URL', "https://iptv-org.github.io/iptv/countries/us.m3u")!;
    
    // Skip fetching and parsing the playlist if it's already cached
    if(cacheService.has(playlistUrl)) {
        return cacheService.get(playlistUrl);
    }

    const resData = await fetchService.get<string>(playlistUrl);
    const parsedM3uData = parseM3U(resData);
    cacheService.set(playlistUrl, parsedM3uData, 1000 * 20 * 60); // Cache for 20 minutes

    return parsedM3uData;
}