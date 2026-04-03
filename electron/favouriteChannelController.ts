import { Channel } from "@shared/types";
import { CacheService } from "./cacheService.js";

type Ok<T = void> = {
    success: true;
    message: string;
    data?: T;
}

type Err = {
    success: false;
    message: string;
}

type Result<T> = Ok<T> | Err;

class ResultFactory {
    static ok<T>(message: string, data?: T): Ok<T> {
        return { success: true, message, data };
    }

    static err(message: string): Err {
        return { success: false, message };
    }
}

const cacheService = new CacheService();

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
export function addFavouriteChannel(event: Electron.IpcMainInvokeEvent, channel: Channel): Result<void> {
    const favouriteChannels = cacheService.get<Channel[]>("favouriteChannels") || [];

    // Check if the channel is already in favourites
    if (favouriteChannels.some(fav => fav.url === channel.url)) {
        return ResultFactory.ok("Channel is already in favourites");
    }

    favouriteChannels.push(channel);
    cacheService.set("favouriteChannels", favouriteChannels);

    return ResultFactory.ok("Channel added to favourites");
}

/**
 * Removes a channel from the list of favourite channels based on its URL.
 *
 * @param event - The Electron IPC event that triggered this action.
 * @param channelUrl - The URL of the channel to be removed from favourites.
 * @returns A `Result<void>` indicating the outcome of the operation.
 */
export function removeFavouriteChannel(event: Electron.IpcMainInvokeEvent, channelUrl: string): Result<void> {
    const favouriteChannels = cacheService.get<Channel[]>("favouriteChannels") || [];

    const updatedFavourites = favouriteChannels.filter(fav => fav.url !== channelUrl);
    cacheService.set("favouriteChannels", updatedFavourites);

    return ResultFactory.ok("Channel removed from favourites");
}

/**
 * Retrieves the list of favourite channels from the cache.
 *
 * @returns {Result<Channel[]>} A Result object containing an array of favourite channels.
 * If no favourite channels are found in the cache, returns an empty array.
 *
 * @remarks
 * This function uses the `cacheService` to fetch the stored favourite channels.
 * The result is wrapped in a `Result` object with a success message.
 */
export function getFavouriteChannels(): Result<Channel[]> {
    const favouriteChannels = cacheService.get<Channel[]>("favouriteChannels") || [];
    return ResultFactory.ok("Favourite channels retrieved", favouriteChannels);
}