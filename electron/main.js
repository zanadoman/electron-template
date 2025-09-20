'use strict';

const { BrowserWindow, Menu, app } = require('electron');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow();

  Menu.setApplicationMenu(null);

  if (app.isPackaged) {
    win.loadFile(path.join(
      __dirname,
      '..',
      'dist',
      'electron-template',
      'browser',
      'index.html'
    ));
  } else {
    win.loadURL('http://localhost:4200');
    win.webContents.openDevTools({
      mode: 'detach'
    });
  }
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
