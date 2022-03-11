// src/preload.js
import { contextBridge, ipcRenderer, clipboard, shell} from 'electron'
import os from 'os'
import { join } from 'path'
import path from 'path';
const moment = require('moment');
const base32 = require('rfc-3548-b32');

const crypto = require('crypto-browserify');
import * as secp256k1 from "@noble/secp256k1";


const sha3_256 = require('js-sha3').sha3_256;
const ps = require('ps-node');
const util = require('util');
const log = require('electron-log');
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
const fork = require('child_process').fork;
const exec = require('child_process').exec;
const execFile = require('child_process').execFile;
const validChannels = ['scan-stdout', 'scan-finish', 'walletExisted', 'walletCreated', 'walletCreateFailed'];
contextBridge.exposeInMainWorld('nodeChildProcess', {

    async kill(pid){
      return new Promise(function(resolve, reject) {
        let iskilled;
        if (process.platform === 'win32') {
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

    async execNew(cmd, args, platform){
      console.log('execNew cmd:', cmd);
      console.log('execNew args:', args);
      return new Promise(function(resolve, reject) {

          const createProcess = spawn(cmd, args, {shell: platform == 'win'});
          let newSeedData = '';
          let errorData = '';
          let recordData = false;

          createProcess.stdout.setEncoding('utf8');
          createProcess.stderr.setEncoding('utf8');

          createProcess.stdout.on('data', (data) => {
            console.log('stdout', data);
            //start recording data
            if(data.includes('Please back-up these words in a non-digital format.') || recordData){
              recordData = true;
              newSeedData += data;
            }


          });

          createProcess.stderr.on('data', (data) => {
            errorData += data;

            if(data.includes('Recovery word phrase is invalid.')){
              recover.stdin.pause();
              recover.kill();
              resolve({success: false, msg: errorData});
            }

          });

          createProcess.stdout.on('end', function () {

            if(errorData != ''){

              resolve({success: false, msg: errorData});

            }else if(newSeedData != ''){
              let wordSeed = newSeedData;

              //TODO replace with a preg match replace
              wordSeed = wordSeed.replace("Your recovery phrase is:", "");
              wordSeed = wordSeed.replace("Please back-up these words in a non-digital format.", "");
              wordSeed = wordSeed.replace("Command 'init' completed successfully", "");
              wordSeed = wordSeed.replace(/(\r\n|\n|\r)/gm, "");
              wordSeed = wordSeed.replace("wallet.seed", "wallet.seed ==   ");
              let wordSeedWithLog = wordSeed;
              let wordSeedWithoutLog = wordSeedWithLog.substring(wordSeedWithLog.indexOf("==") +1);
              wordSeedWithoutLog = wordSeedWithoutLog.trim();
              wordSeedWithoutLog = wordSeedWithoutLog.replace("= ", "").trim();
              resolve({success: true, msg: wordSeedWithoutLog});
            }else{
              resolve({success: false, msg: 'unknow error'})
            }

          });

      });
    },
    async execScan(cmd){

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



    /* start wallet api */
    async execStart(cmd, args, platform){

      return new Promise(function(resolve, reject) {
          //console.log('start wallet cmd:', cmd);
          //console.log('start wallet args', args);
          const ownerAPI = spawn(cmd, args, {shell: platform == 'win'});
          ownerAPI.stdout.setEncoding('utf8');
          ownerAPI.stderr.setEncoding('utf8');

          ownerAPI.stdout.on('data', (data) => {
            console.log(data);

            if(data.includes('HTTP Owner listener started')){

              resolve(ownerAPI.pid);
            }

          });

          ownerAPI.stderr.on('data', (data) => {
            console.log('ownerAPI.stderr', data);
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
    /* start wallet listen */
    async execListen(cmd, args, platform){

      return new Promise(function(resolve, reject) {
          const listenProcess = spawn(cmd, args, {shell: platform == 'win'});
          listenProcess.stdout.setEncoding('utf8');
          listenProcess.stderr.setEncoding('utf8');
          listenProcess.stdout.on('data', (data) => {
              console.log(data);
              if(data.includes('HTTP Foreign listener started.')){

                resolve({success: true, msg: listenProcess.pid});
              }

          })
          listenProcess.stderr.on('data', (data) => {
              log.error('start wallet listen got stderr: ' + data)
              resolve({success: false, msg: data});
          })

      });
    },

    async execRecover(cmd, args, platform, seeds, password){

      return new Promise(function(resolve, reject) {

          const recover = spawn(cmd, args, {shell: platform == 'win'});
          let newSeedData = '';
          let errorData = '';
          let recordData = false;
          recover.stdout.setEncoding('utf8');
          recover.stdin.setEncoding('utf8');
          recover.stderr.setEncoding('utf8');
          recover.stdout.on('data', (data) => {

            if(data.includes('Please enter your recovery phrase')){
              recover.stdin.write(seeds+"\n");
            }else{

              //start recording data
              if(data.includes('Your recovery phrase is:') || recordData){
                recordData = true;
                newSeedData += data;
              }


            }

          });

          recover.stderr.on('data', (data) => {

            errorData += data;

            if(data.includes('Recovery word phrase is invalid.')){
              recover.stdin.pause();
              recover.kill();
              resolve({success: false, msg: errorData});
            }

          });

          recover.stdout.on('end', function () {

            if(errorData != ''){

              resolve({success: false, msg: errorData});

            }else if(newSeedData != ''){
              let wordSeed = newSeedData;

              //TODO replace with a preg match replace
              wordSeed = wordSeed.replace("Your recovery phrase is:", "");
              wordSeed = wordSeed.replace("Please back-up these words in a non-digital format.", "");
              wordSeed = wordSeed.replace("Command 'init' completed successfully", "");
              wordSeed = wordSeed.replace(/(\r\n|\n|\r)/gm, "");
              wordSeed = wordSeed.replace("wallet.seed", "wallet.seed ==   ");
              let wordSeedWithLog = wordSeed;
              let wordSeedWithoutLog = wordSeedWithLog.substring(wordSeedWithLog.indexOf("==") +1);
              wordSeedWithoutLog = wordSeedWithoutLog.trim();
              wordSeedWithoutLog = wordSeedWithoutLog.replace("= ", "").trim();
              resolve({success: true, msg: wordSeedWithoutLog});
            }else{
              resolve({success: false, msg: 'unknow error'})
            }

          });

      });
    },

});

const aes256gcm = (shared_secret) => {
  const ALGO = 'aes-256-gcm';

  // encrypt returns base64-encoded ciphertext
  const encrypt = (str, nonce) => {
    let key = Buffer.from(shared_secret, 'hex')
    const cipher = crypto.createCipheriv(ALGO, key, nonce)
    const enc = Buffer.concat([cipher.update(str, 'utf8'), cipher.final()])
    const tag = cipher.getAuthTag()
    return Buffer.concat([enc, tag]).toString('base64')
  };

  // decrypt decodes base64-encoded ciphertext into a utf8-encoded string
  const decrypt = (enc, nonce) => {
    //key,nonce is all buffer type; data is base64-encoded string
    let key = Buffer.from(shared_secret, 'hex')
    const data_ = Buffer.from(enc, 'base64')
    const decipher = crypto.createDecipheriv(ALGO, key, nonce)
    const len = data_.length
    const tag = data_.slice(len-16, len)
    const text = data_.slice(0, len-16)
    decipher.setAuthTag(tag)
    const dec = decipher.update(text, 'binary', 'utf8') + decipher.final('utf8');
    return dec
  };

  return {
    encrypt,
    decrypt,
  };
};

contextBridge.exposeInMainWorld('nodeFindProcess', require('find-process'));
contextBridge.exposeInMainWorld('nodeCrypto', require('crypto'));
contextBridge.exposeInMainWorld('nodeSecp256k1', secp256k1);
contextBridge.exposeInMainWorld('nodeAes256gcm', aes256gcm);
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
  getOnionV3(address){

    const chekcsumstr = Buffer.from(".onion checksum","utf8");
    const onion_version = Buffer.from("03","hex");

    let pubKey = Buffer.from(address, 'hex');

    let checksum = Buffer.from(sha3_256.create().update(Buffer.concat([chekcsumstr, pubKey, onion_version])).digest()).slice(0,2);
    return base32.encode(Buffer.concat([pubKey, checksum, onion_version])).toLowerCase();

  }



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
    showOpenDialog: async () => {
        return await ipcRenderer.invoke('show-open-dialog');
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
