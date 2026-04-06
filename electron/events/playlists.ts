import { FetchService } from "../services/fetchService.js";
import { ParsedChannel, type Channel } from "../../shared/types.js";
import { parseM3UToChannels } from "../utils/parsers.js";
import { env } from "../../shared/utils/env.js";
import { mapParsedChannelsToChannels } from "../utils/mappers.js";
import { PersistentCache } from "@electron/services/cache.js";

const cacheService = new PersistentCache();
const fetchService = new FetchService();

export async function getAllChannels(): Promise<Channel[]> {
    const playlistUrl = env('IPTV_PLAYLIST_URL', "https://iptv-org.github.io/iptv/countries/us.m3u")!;
    
    // Skip fetching and parsing the playlist if it's already cached
    if(cacheService.has(playlistUrl)) {
        return cacheService.get<ParsedChannel[]>(playlistUrl)!;
    }

    const resData = await fetchService.get<string>(playlistUrl);
    const parsedData = parseM3UToChannels(resData);
    cacheService.set(playlistUrl, parsedData, 1000 * 20 * 60); // Cache for 20 minutes

    // Do not cache the normalized data because the favourite status can change more frequently. This way the cache does not have to be invalidated every time a channel is added or removed from favourites.
    // const normalizedData = mapParsedChannelsToChannels(parsedData);

    return parsedData;
}