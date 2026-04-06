const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getPlaylists: () => ipcRenderer.invoke('playlist:index'),
  addToFavourites: (channel: any) => ipcRenderer.invoke('favourite:add', channel),
  removeFromFavourites: (channel: any) => ipcRenderer.invoke('favourite:remove', channel),
  getFavourites: () => ipcRenderer.invoke('favourite:index'),
})