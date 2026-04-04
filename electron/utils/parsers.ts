import { ParsedChannel } from "../../shared/types.js";

export function parseM3UToChannels(data: string): ParsedChannel[] {
    const lines = data.split("\n");
    const channels = [];

    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith("#EXTINF")) {
            const info = lines[i];

            console.log(info);

            const name = info.split(",")[1];
            const logo = info.match(/tvg-logo="(.*?)"/)?.[1];
            const group = info.match(/group-title="(.*?)"/)?.[1];
            const url = lines[i + 1];

            channels.push({ name, logo, group, url });
        }
    }

    return channels;
}