import { FetchService } from "../services/fetchService";
import { type ParsedChannel, type Channel } from "../../shared/types";
import { parseM3UToChannels } from "../utils/parsers";
import { env } from "../../shared/utils/env";
import { PersistentCache } from "../services/persistentCache";

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

    return parsedData;
}
