import { addFavouriteChannel, getFavouriteChannels, removeFavouriteChannel } from "./favouriteChannels.js";
import { getAllChannels } from "./playlists.js";

export const events = {
  'playlist:index': getAllChannels,
  'favourite:add': addFavouriteChannel,
  'favourite:remove': removeFavouriteChannel,
  'favourite:index': getFavouriteChannels
}
