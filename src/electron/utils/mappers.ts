import { PersistentCache } from "../services/persistentCache.js";
import { type ParsedChannel, type Channel } from "../../shared/types";

export function mapParsedChannelsToChannels(channels: ParsedChannel[]): Channel[] {
    const favouriteChannels = new PersistentCache().get<Channel[]>("favouriteChannels") || [];

    return channels.map(channel => ({
        ...channel,
        name: channel.name.trim(),
        url: channel.url.trim(),
        logo: channel.logo?.trim(),
        group: channel.group?.trim(),
        isFavourite: favouriteChannels.some(fav => fav.url === channel.url)
    }));
}