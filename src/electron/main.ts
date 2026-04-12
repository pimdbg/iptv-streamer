
import { app, BrowserWindow, ipcMain } from "electron";
import { events } from "./events/index";
import path from "node:path"

function createWindow () {
  const win = new BrowserWindow({
    fullscreen: true,
    webPreferences: {
      preload: path.join(__dirname, '../preload/preload.js')
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

  ipcMain.handle('playlist:index', events['playlist:index'])
  ipcMain.handle('favourite:add', events['favourite:add'])
  ipcMain.handle('favourite:remove', events['favourite:remove'])
  ipcMain.handle('favourite:index', events['favourite:index'])
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})