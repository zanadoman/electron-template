'use strict';

const { BrowserWindow, Menu, app } = require('electron');
const path = require('path');
const log = require('electron-log');
const { updateElectronApp, UpdateSourceType } = require('update-electron-app');

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

if (require('electron-squirrel-startup')) {
  app.quit();
}

log.initialize();

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  updateElectronApp({
    updateSource: {
      type: UpdateSourceType.ElectronPublicUpdateService,
      repo: 'zanadoman/electron-template'
    },
    logger: log
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
