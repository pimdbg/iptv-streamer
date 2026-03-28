import { FetchService } from "./FetchService.ts";
import { type Channel } from "../shared/types.ts";

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

    const playlistUrl = "https://iptv-org.github.io/iptv/countries/us.m3u";
    const fetchService = new FetchService();
    const res = await fetchService.get<string>(playlistUrl);
    
    return parseM3U(res);
}