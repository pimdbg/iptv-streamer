import type { Channel } from "@shared/types";

export const useFavouriteChannels = () => {
  const addToFavourites = (channel: Channel) => {
    return window.electronAPI.addToFavourites(channel)
  }

  const removeFromFavourites = (channel: Channel) => {
    return window.electronAPI.removeFromFavourites(channel)
  }

  return {
    addToFavourites,
    removeFromFavourites,
  }
}