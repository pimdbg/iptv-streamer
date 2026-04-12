import { type Channel } from "../../shared/types";
import { PersistentCache } from "../services/persistentCache";

const cacheService = new PersistentCache();

/**
 * Adds a channel to the list of favourite channels.
 *
 * Checks if the given channel is already present in the favourites cache.
 * If it is, returns an error result. Otherwise, adds the channel to the
 * favourites and updates the cache.
 *
 * @param event - The Electron IPC event that triggered this action.
 * @param channel - The channel to add to favourites.
 * @returns A `Result<void>` indicating success or an error if the channel is already a favourite.
 */
export function addFavouriteChannel(event: Electron.IpcMainInvokeEvent, channel: Channel) {
    const favouriteChannels = cacheService.get<Channel[]>("favouriteChannels") || [];

    // Check if the channel is already in favourites
    if (favouriteChannels.some(({ url }) => url === channel.url)) {
        return;
    }

    favouriteChannels.push({ ...channel, isFavourite: true });
    cacheService.set("favouriteChannels", favouriteChannels);
}

/**
 * Removes a channel from the list of favourite channels based on its URL.
 *
 * @param event - The Electron IPC event that triggered this action.
 * @param channel - The channel to be removed from favourites.
 * @returns A `Result<void>` indicating the outcome of the operation.
 */
export function removeFavouriteChannel(event: Electron.IpcMainInvokeEvent, channel: Channel) {
    const favouriteChannels = cacheService.get<Channel[]>("favouriteChannels") || [];

    const updatedFavourites = favouriteChannels.filter(({ url }) => url !== channel.url);
    cacheService.set("favouriteChannels", updatedFavourites);
}

/**
 * Retrieves the list of favourite channels from the cache.
 *
 * @returns {Channel[]} An array of favourite channels.
 * If no favourite channels are found in the cache, returns an empty array.
 *
 * @remarks
 * This function uses the `cacheService` to fetch the stored favourite channels.
 */
export function getFavouriteChannels(): Channel[] {
    const favouriteChannels = cacheService.get<Channel[]>("favouriteChannels") || [];

    return favouriteChannels;
}