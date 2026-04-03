
import { fileURLToPath } from "node:url";
import { app, BrowserWindow, ipcMain } from "electron";
import path from "node:path"
import { getAllChannels } from "./playlistController.js";
import { addFavouriteChannel, getFavouriteChannels, removeFavouriteChannel } from "./favouriteChannelController.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function createWindow () {
  const win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })
  
  win.loadURL("http://localhost:5173");
}

app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })

  ipcMain.handle('playlist:index', getAllChannels)
  ipcMain.handle('favourite:add', addFavouriteChannel)
  ipcMain.handle('favourite:remove', removeFavouriteChannel)
  ipcMain.handle('favourite:index', getFavouriteChannels)
})


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})