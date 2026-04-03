import { PreloadAPI } from "../types/preload";

declare global {
  interface Window {
    electronAPI: {
      getPlaylists: () => Promise<Channel[]>;
      addToFavourites: (channel: Channel) => Promise<void>;
      removeFromFavourites: (channel: Channel) => Promise<void>;
      getFavourites: () => Promise<Channel[]>;
    };
  }
}