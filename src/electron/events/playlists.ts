import { FetchService } from "../services/fetchService.js";
import { type ParsedChannel, type Channel } from "../../shared/types.js";
import { parseM3UToChannels } from "../utils/parsers.js";
import { env } from "../../shared/utils/env.js";
import { PersistentCache } from "../services/persistenCache.js";

const cacheService = new PersistentCache();
const fetchService = new FetchService();

export async function getAllChannels(): Promise<Channel[]> {
    const playlistUrl = env('IPTV_PLAYLIST_URL', "https://iptv-org.github.io/iptv/countries/us.m3u")!;
    await fetchService.get<string>(playlistUrl);
    
    // Skip fetching and parsing the playlist if it's already cached
    if(cacheService.has(playlistUrl)) {
        return cacheService.get<ParsedChannel[]>(playlistUrl)!;
    }

    
    const resData = await fetchService.get<string>(playlistUrl);
    const parsedData = parseM3UToChannels(resData);
    cacheService.set(playlistUrl, parsedData, 1000 * 20 * 60); // Cache for 20 minutes

    return parsedData;
}
