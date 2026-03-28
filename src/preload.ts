const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('electronAPI', {
  getPlaylists: () => ipcRenderer.invoke('playlist:index')
})