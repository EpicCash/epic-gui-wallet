// src/preload.js
import { contextBridge, ipcRenderer, clipboard, shell} from 'electron'
import os from 'os'
import { join } from 'path'
import path from 'path';


const ps = require('ps-node');
const util = require('util');
const log = require('electron-log');
const moment = require('moment');
const homedir = os.homedir();
const rootdir = require('app-root-dir');
export const ewalletPath = path.join(homedir, '.epic')
export const logDir = path.join(ewalletPath, 'log')


const resourcePath =
  !process.env.NODE_ENV || process.env.NODE_ENV === "production"
    ? process.resourcesPath // Live Mode
    : path.join(__dirname, '../resources/'); // Dev Mode


let logFile = `${moment(new Date()).format('YYYY_MM_D')}.log`
let logPath = join(logDir, logFile);
let processes = {};
log.transports.file.file = logPath
log.transports.file.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [{level}] {text}';
log.transports.file.maxSize = 5 * 1024 * 1024
log.transports.file.level = 'debug';
log.transports.file.streamConfig = {flags: 'w'};
log.transports.console.format = '{y}-{m}-{d} {h}:{i}:{s}:{ms} [{level}] {text}'
log.transports.console.level = process.env.NODE_ENV === 'production' ? 'info' : 'debug'

const spawn = require('child_process').spawn;
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
const validChannels = ['scan-stdout', 'scan-finish', 'walletExisted', 'walletCreated', 'walletCreateFailed'];
contextBridge.exposeInMainWorld('nodeChildProcess', {

    async kill(pid, platform){

      return new Promise(function(resolve, reject) {
        let iskilled;
        if (platform === 'win') {
            exec(`taskkill /pid ${pid} /f /t`, function( err ) {
               if (err) {
                 resolve(false);
               }
               else {
                 resolve(true);
               }
           });

        }else{
          ps.kill(pid, function( err ) {
              if (err) {
                resolve(false);
              }
              else {
                resolve(true);
              }
          });
        }

      });
    },
    async spawn(cmd, args){
      const child = await spawn(cmd, args);
      child.stdout.setEncoding('utf8');
      child.stdout.on('data',function(data){
        console.log(data);
      });


      return child;

    },

    async execNew(cmd, password, platform){

      return new Promise(function(resolve, reject) {
          const createProcess = exec(cmd);
          createProcess.stdout.on('data', (data) => {

            let output = data.toString()
            //log.debug('init process return: '+output)
            if (output.includes("Please enter a password for your new wallet")){
                log.debug('function new: time to entry password.')
                createProcess.stdin.write(password + "\n");
                createProcess.stdin.write(password + "\n");
            }
            if(output.includes("Invalid Arguments: Not creating wallet - Wallet seed file exists")){
                log.debug('function new: walletExisted')
                //reject({'walletExisted'})
                ipcRenderer.send('walletExisted');
                resolve(false)
                //return this.emitter.$emit('walletExisted')
            }
            if(output.includes("Please back-up these words in a non-digital format.")){
                var wordSeed = data.toString();

                wordSeed = wordSeed.replace("Your recovery phrase is:","");
                wordSeed = wordSeed.replace("Please back-up these words in a non-digital format.","");

                wordSeed = wordSeed.replace(/(\r\n|\n|\r)/gm, "");
                wordSeed = wordSeed.replace("wallet.seed","wallet.seed ==   ");
                var wordSeedWithLog = wordSeed;
                var wordSeedWithoutLog = wordSeedWithLog.substring(wordSeedWithLog.indexOf("==")+1);
                wordSeedWithoutLog = wordSeedWithoutLog.trim();
                wordSeedWithoutLog = wordSeedWithoutLog.replace("= ","").trim();
                //log.debug(`wordSeed: ${wordSeed}; wordSeedWithoutLog: ${wordSeedWithoutLog}`)
                log.debug(`function new: walletCreated with seed of length ${wordSeedWithoutLog.length}.`)
                //return this.emitter.$emit('walletCreated', wordSeedWithoutLog)
                ipcRenderer.send('walletCreated', wordSeedWithoutLog);
                resolve(true)
            }

          });

          createProcess.stderr.on('data', (data) => {
            log.error('Process:init new wallet got stderr: ' + data)
            ipcRenderer.send('walletCreateFailed');
            resolve(false)

          });

      });
    },
    async execScan(cmd, platform){

      return new Promise(function(resolve, reject) {
          const scanProcess = exec(cmd);
          //scan process is self closing
          scanProcess.stdout.on('data', function(data){
              ipcRenderer.send('scan-stdout', data);
          })
          scanProcess.stderr.on('data', function(data){
              ipcRenderer.send('scan-stdout', data);
          })
          scanProcess.on('close', function(code){
              console.log('scan close', code);
              log.debug('epic wallet check exists with code: ' + code);

              if(code==0){ipcRenderer.send('scan-finish')}
          });

      });

    },

    on:(channel, func) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, data) => func(data));
      }
    },


    /*start the wallet in listen mode */
    /* check if wallet api can be called */
    async execStart(cmd, args, password, platform){

      return new Promise(function(resolve, reject) {

          const ownerAPI = spawn(cmd, args, {shell: platform == 'win'});
          ownerAPI.stdout.setEncoding('utf8');
          ownerAPI.stderr.setEncoding('utf8');
          ownerAPI.stdout.on('data', (data) => {

            //password prompt does not work for windows with epic-wallet.exe
            if(data.includes('Password:') && platform != 'win'){
              ownerAPI.stdin.write(password + "\n");
            }

            if(data.includes('Error opening wallet')){
              resolve(false);
            }

            if(data.includes('listener started')){
              ipcRenderer.send('pid-message', ownerAPI.pid);
              resolve(ownerAPI.pid);
            }

          });

          ownerAPI.stderr.on('data', (data) => {

            if(data.includes('Address already in use')){
              //we have unknow process id
              resolve(0);
            }else{
              log.error('start owner_api got stderr: ' + data)
              resolve(false);

            }

          });
      });
    },
    async execListen(cmd, args, password, platform){

      return new Promise(function(resolve, reject) {
          const listenProcess = spawn(cmd, args, {shell: platform == 'win'});
          listenProcess.stdout.setEncoding('utf8');
          listenProcess.stderr.setEncoding('utf8');
          listenProcess.stdout.on('data', () => {
              ipcRenderer.send('pid-message', listenProcess.pid);
              resolve(listenProcess.pid);
          })
          listenProcess.stderr.on('data', (data) => {
              log.error('start wallet listen got stderr: ' + data)
              resolve(false);
          })

      });
    }



});
contextBridge.exposeInMainWorld('nodeSpawnSync', require('child_process').spawnSync);
contextBridge.exposeInMainWorld('nodeSpawn', require('child_process').spawn);
contextBridge.exposeInMainWorld('nodeExec', require('child_process').exec);
contextBridge.exposeInMainWorld('nodeExecSync', require('child_process').execSync);
contextBridge.exposeInMainWorld('nodeExecFile', require('child_process').execFile);
contextBridge.exposeInMainWorld('clipboard', clipboard);
contextBridge.exposeInMainWorld('log', log);
contextBridge.exposeInMainWorld('nodeFs', require('fs'));
contextBridge.exposeInMainWorld('nodeFsExtra', require('fs-extra'));
contextBridge.exposeInMainWorld('nodePath', require('path'));
contextBridge.exposeInMainWorld('config', {
  getResourcePath(){
    return resourcePath;
  },
  getUserHomedir () {
      return homedir;
  },
  getPlatform(){
      switch (os.platform()) {
          case 'aix':
          case 'freebsd':
          case 'linux':
          case 'openbsd':
          case 'android':
            return 'linux';
          case 'darwin':
          case 'sunos':
            return 'mac';
          case 'win32':
            return 'win';
        }
  },


});
contextBridge.exposeInMainWorld('explorer', {
  //can be block height or commit
  open(data){
      shell.openExternal('https://explorer.epic.tech/blockdetail/' + data);
  }

});
// Adds an object 'api' to the global window object:
contextBridge.exposeInMainWorld('api', {
    showSaveDialog: async (title, message, defaultPath) => {
        return await ipcRenderer.invoke('show-save-dialog', title, message, defaultPath);
    },
    quit: () => {
      ipcRenderer.invoke('quit');
    },

});
/*const validChannels = ['READ_FILE', 'WRITE_FILE'];
contextBridge.exposeInMainWorld(
  'ipc', {
    send: (channel, data) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.send(channel, data);
      }
    },
    on: (channel, func) => {
      if (validChannels.includes(channel)) {
        // Strip event as it includes `sender` and is a security risk
        ipcRenderer.on(channel, (event, ...args) => func(...args));
      }
    },
  },
);*/
