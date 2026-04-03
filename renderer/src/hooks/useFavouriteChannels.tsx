import type { Channel } from "@shared/types";

export const useFavouriteChannels = () => {
  const addToFavourites = (channel: Channel) => {
    window.electronAPI.addToFavourites(channel);
  }

  const removeFromFavourites = (channel: Channel) => {
    window.electronAPI.removeFromFavourites(channel);
  }

  return {
    addToFavourites,
    removeFromFavourites,
  }
}