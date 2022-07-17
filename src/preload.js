// src/preload.js
import { contextBridge, ipcRenderer, clipboard, shell} from 'electron'
import os from 'os'
import { join } from 'path'
import path from 'path';
const moment = require('moment');
const base32 = require('rfc-3548-b32');
const crypto = require('crypto-browserify');
import * as secp256k1 from "@noble/secp256k1";


const debug = process.env.NODE_ENV !== 'production';

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
const validChannels = ['firstscan-stdout', 'scan-stdout', 'scan-finish', 'scan-error', 'walletExisted', 'walletCreated', 'walletCreateFailed'];
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
          //check if 3 seconds for node server is to short and makes problems
          ps.kill(pid, {timeout: 3},function( err ) {
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
        debug ? console.log('spawn.stdout', data) : null;
      });

      return child;

    },

    async execNew(cmd, args, platform, password){

      return new Promise(function(resolve, reject) {

          let createProcess = spawn(cmd, args, {shell: platform == 'win' ? true : false});



          let newSeedData = '';
          let errorData = '';
          let recordData = false;

          createProcess.stdout.setEncoding('utf8');
          createProcess.stdout.on('data', (data) => {

            debug ? console.log('execNew.stdout', data) : null;

            if(data.includes('Password:')){
              createProcess.stdin.write( password+"\n");
            }
            //start recording data
            if(data.includes('Please back-up these words in a non-digital format.') || recordData){
              recordData = true;
              newSeedData += data;
            }


          });

          createProcess.stderr.setEncoding('utf8');
          createProcess.stderr.on('data', (data) => {
            debug ? console.log('execNew.stderr', data) : null;
            errorData += data;
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
    async execScan(cmd, args, platform, password){

      return new Promise(function(resolve, reject) {


          let scanProcess = spawn(cmd, args, {shell: platform == 'win' ? true : false});

          //scan process is self closing
          scanProcess.stdout.setEncoding('utf8');
          scanProcess.stdout.on('data', function(data){
            debug ? console.log('execScan.stdout', data) : null;

            if(data.includes('Password:')){
              scanProcess.stdin.write(password+"\n");
            }

            ipcRenderer.send('scan-stdout', data);
          })

          scanProcess.stderr.setEncoding('utf8');
          scanProcess.stderr.on('data', function(data){
            debug ? console.log('execScan.stderr', data) : null;
            ipcRenderer.send('scan-stdout', data);
          })
          scanProcess.on('close', function(code){
            debug ? console.log('execScan.close', code) : null;


            if(code==0){ipcRenderer.send('scan-finish')}
            if(code==1){ipcRenderer.send('scan-error')}
          });

      });

    },

    on:(channel, func) => {
      if (validChannels.includes(channel)) {
        ipcRenderer.on(channel, (event, data) => func(data));
      }
    },

    /* start wallet api */
    async execNode(cmd, args, platform){

      return new Promise(function(resolve, reject) {


          let node_server = spawn(cmd, args, {shell: platform == 'win' ? true : false});

          node_server.stdout.setEncoding('utf8');
          node_server.stdout.on('data', (data) => {
              debug ? console.log('execNode.stdout', data) : null;

            //Epic server started.
            if(data.includes('Epic server started')){
              resolve(node_server.pid);
            }

          });


          node_server.stderr.setEncoding('utf8');
          node_server.stderr.on('data', (data) => {
            debug ? console.log('execNode.stderr', data) : null;

            resolve(false);

          });

      });
    },
    /* start ngrok */
    async execNgrok(cmd, args, platform){

      return new Promise(function(resolve, reject) {

          let ngrok = spawn(cmd, args, {shell: platform == 'win' ? true : false});

          ngrok.stdout.setEncoding('utf8');
          ngrok.stdout.on('data', (data) => {

            debug ? console.log('execNgrok.stdout', data) : null;

            if(data.includes('client session established')){
              resolve({success: true, msg: ngrok.pid});
            }

            if(data.includes('ERR_NGROK_107')){
              resolve({success: false, msg: 'The authtoken you specified is properly formed, but it is invalid.'});
            }


          });

          ngrok.stderr.setEncoding('utf8');
          ngrok.stderr.on('data', (data) => {

            debug ? console.log('execNgrok.stderr', data) : null;
            resolve({success: false, msg: data});

          });
      });
    },

    /* start wallet api */
    async execStart(cmd, args, platform, emitOutput){

      return new Promise(function(resolve, reject) {

          let ownerAPI = spawn(cmd, args, {shell: platform == 'win' ? true : false});


          ownerAPI.stdout.setEncoding('utf8');
          ownerAPI.stdout.on('data', (data) => {
            debug ? console.log('execStart.stdout', data) : null;

            if(emitOutput){
              ipcRenderer.send('firstscan-stdout', data);
            }
            if(data.includes('HTTP Owner listener started')){

              resolve(ownerAPI.pid);
            }

          });

          ownerAPI.stderr.setEncoding('utf8');
          ownerAPI.stderr.on('data', (data) => {
            debug ? console.log('execStart.stderr', data) : null;


            if(emitOutput){
              ipcRenderer.send('firstscan-stdout', data);
            }
            if(data.includes('Address already in use')){
              //we have unknow process id
              resolve(0);
            }else{

              resolve(false);

            }

          });
      });
    },
    /* start wallet listen */
    async execListen(cmd, args, platform, password){

      return new Promise(function(resolve, reject) {

          let listenProcess = spawn(cmd, args, {shell: platform == 'win' ? true : false});
          let isTorBooted = false;
          listenProcess.stdout.setEncoding('utf8');
          listenProcess.stdout.on('data', (data) => {

              debug ? console.log('execListen.stdout', data) : null;
              if(data.includes('Password:')){
                listenProcess.stdin.write(password+"\n");
              }

              /* todo check why tor is not Bootstrapped on Linux */
              if(data.includes('[notice] Bootstrapped 100% (done): Done')){
                isTorBooted = true;
              }
              if(data.includes('Unable to start TOR listener') || data.includes('Tor Error: Tor Process Error: Timeout')){
                isTorBooted = false;
              }
              if(data.includes('HTTP Foreign listener started.')){

                resolve({success: true, msg: listenProcess.pid, tor: isTorBooted});
              }

          });

          listenProcess.stderr.setEncoding('utf8');
          listenProcess.stderr.on('data', (data) => {
              debug ? console.log('execListen.stderr', data) : null;

              resolve({success: false, msg: data, tor: isTorBooted});
          })

      });
    },

    async execRecover(cmd, args, platform, seeds, password){

      return new Promise(function(resolve, reject) {

          let recover = spawn(cmd, args, {shell: platform == 'win' ? true : false});


          let newSeedData = '';
          let errorData = '';
          let recordData = false;

          recover.stdout.setEncoding('utf8');
          recover.stdout.on('data', (data) => {
            debug ? console.log('execRecover.stdout', data) : null;

            if(data.includes('Password:')){
              recover.stdin.write(password+"\n");
            }

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


          recover.stderr.setEncoding('utf8');
          recover.stderr.on('data', (data) => {

            debug ? console.log('execRecover.stderr', data) : null;

            errorData += data;

            if(data.includes('Recovery word phrase is invalid.')){
              recover.stdin.pause();
              recover.kill();
              resolve({success: false, msg: errorData});
            }

          });

          recover.stdout.on('end', function () {

            debug ? console.log('execRecover.stdout.end', data) : null;

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

//contextBridge.exposeInMainWorld('nodeFetch', useFetch);
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

  async getPrice(){

    let response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=epic-cash', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(function(res){

      if (!res.ok) { throw Error(res) }
      return res.json();
    }).catch(function(error){

      let msg = 'Error connecting coingecko ';
      return false;
    });
    return response;
  },
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
    showOpenDialog: async () => {
        return await ipcRenderer.invoke('show-open-dialog');
    },
    quit: () => {
      ipcRenderer.invoke('quit');
    },
    resize: (width, height) => {
      ipcRenderer.invoke('resize', width, height);
    },
    locale: async () => {
      return await ipcRenderer.invoke('locale');
    },

});
