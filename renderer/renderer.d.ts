import { PreloadAPI } from "../types/preload";

declare global {
  interface Window {
    electronAPI: {
      getPlaylists: () => Promise<Channel[]>; // Replace 'any' with Channel[] if Channel is globally available
    };
  }
}