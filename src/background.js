'use strict'

import { app, protocol, BrowserWindow, ipcMain, dialog, Menu, shell } from 'electron'
import { exec } from 'child_process'

import { createProtocol } from 'vue-cli-plugin-electron-builder/lib'
import installExtension, { VUEJS3_DEVTOOLS } from 'electron-devtools-installer'

const isDevelopment = process.env.NODE_ENV !== 'production'
const path = require('path')
const ps = require('ps-node');
const findProcess = require('find-process');
let win;


//[13088:0215/073859.040:ERROR:gpu_init.cc(454)] Passthrough is not supported, GL is disabled, ANGLE is
app.disableHardwareAcceleration();

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
])


async function createWindow() {
  // Create the browser window.

  const win = new BrowserWindow({
    width: 800,
    height: 600,
    title: "Epiccash Wallet 3.0",
    webPreferences: {
      icon: path.join(__dirname, '../public/favicon.ico'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      nodeIntegration: false,
      contextIsolation: true,
      //enableRemoteModule: true,
      preload: path.join(__dirname, 'preload.js'),
      webSecurity: false
    }
  })


  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL)
    if (!process.env.IS_TEST) win.webContents.openDevTools()
  } else {
    createProtocol('app')
    // Load the index.html when not in development
    win.loadURL('app://./index.html')
  }
  if (!isDevelopment) {
    var menu = Menu.buildFromTemplate([
        {
            label: 'Menu',
            submenu: [
                process.platform == 'darwin' ? { label: "About Application", selector: "orderFrontStandardAboutPanel:" }:null,
                { label: "Source on GitHub", click ()
                  {
                    shell.openExternal('https://github.com/EpicCash/epic-gui-wallet');
                  }
                 },
                { type: "separator" },
                {
                    label:'Quit',
                    accelerator: "CmdOrCtrl+Q",
                    async click() {
                        let plist = await findProcess('name', /.*?epic-wallet.*(owner_api|listen)/);

                         for(var pItem in plist){
                           if (process.platform === 'win32') {

                               try{
                                 exec(`taskkill /pid ${plist[pItem].pid} /f /t`);
                               }catch(e){
                                 console.log('taskkill failed', e);
                               }
                           }else{
                             try{
                                ps.kill(plist[pItem].pid);
                              }catch(e){
                                console.log('taskkill failed', e);
                              }
                           }
                         };
                         app.quit()
                    }
                },

            ],

        },
        {
          label: "Application",
          submenu: [

            {
              label: "Edit",
              submenu: [
                  { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                  { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                  { type: "separator" },
                  { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                  { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                  { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                  { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
              ]
            }
          ]


        }

    ])
    Menu.setApplicationMenu(menu);
  }
}



// Quit when all windows are closed.
app.on('window-all-closed', () => {

  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }

});




app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    try {
      await installExtension(VUEJS3_DEVTOOLS)
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString())
    }
  }
  createWindow()
})


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', (data) => {
      if (data === 'graceful-exit') {
        app.quit()
      }
    })
  } else {
    process.on('SIGTERM', () => {

      app.quit()
    })
  }
}


ipcMain.handle('show-save-dialog', async (event, title, message, defaultPath) => {
    // do stuff
    let responce = await dialog.showSaveDialog({
      title: title,
      message: message,
      defaultPath: defaultPath
    });
    return responce;
});

ipcMain.handle('show-open-dialog', async (event, title, message, defaultPath) => {
    // do stuff
    let responce = await dialog.showOpenDialog({
      properties:["openDirectory", "showHiddenFiles", "createDirectory"]
    });
    return responce;
});

ipcMain.handle('quit', () => {
  app.quit()
});

ipcMain.handle('resize', (event, width, height) => {
  let browserWindow = BrowserWindow.fromWebContents(event.sender)
  browserWindow.setSize(width,height);
});

ipcMain.on('scan-stdout', (event, data) => {
  event.reply('scan-stdout', { data });
});

ipcMain.on('scan-finish', (event, data) => {
  event.reply('scan-finish', { data });
});

ipcMain.on('walletCreated', (event, data) => {
  event.reply('walletCreated', { data });
});

ipcMain.on('walletExisted', (event, data) => {
  event.reply('walletExisted', {  });
});

ipcMain.on('walletCreateFailed', (event, data) => {
  event.reply('walletCreateFailed', {  });
});
