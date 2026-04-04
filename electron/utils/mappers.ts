import { Channel } from "../../shared/types.js";
import { ParsedChannel } from "../../shared/types.js";
import { Cache } from "../services/cache.js";

export function mapParsedChannelsToChannels(channels: ParsedChannel[]): Channel[] {
    const favouriteChannels = new Cache().get<Channel[]>("favouriteChannels") || [];

    return channels.map(channel => ({
        ...channel,
        name: channel.name.trim(),
        url: channel.url.trim(),
        logo: channel.logo?.trim(),
        group: channel.group?.trim(),
        isFavourite: favouriteChannels.some(fav => fav.url === channel.url)
    }));
}