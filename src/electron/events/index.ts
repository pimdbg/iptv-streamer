import { addFavouriteChannel, getFavouriteChannels, removeFavouriteChannel } from "./favouriteChannels";
import { getAllChannels } from "./playlists";

export const events = {
  'playlist:index': getAllChannels,
  'favourite:add': addFavouriteChannel,
  'favourite:remove': removeFavouriteChannel,
  'favourite:index': getFavouriteChannels
}
