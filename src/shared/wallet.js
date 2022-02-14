
//const fse = require('fs-extra')


import axios from 'axios'
require('promise.prototype.finally').shim();
const log = window.log;


import {epicPath, seedPath, epicNode, epicNode2, apiSecretPath, walletTOMLPath, walletPath,  nodeExecutable, tempTxDir} from './config.js'

const platform = window.config.getPlatform();



const epicRsWallet = "";


//let listenProcess
//let checkProcess
//let initRProcess
let restoreProcess
let processes = {}
let client
let password_
const wallet_host = 'http://localhost:3420'
const jsonRPCUrl = 'http://localhost:3420/v2/owner'
const jsonRPCForeignUrl = 'http://localhost:3420/v2/foreign'

function enableForeignApi(){
    const re = /owner_api_include_foreign(\s)*=(\s)*false/
    if(window.nodeFs.existsSync(walletTOMLPath)){
        let c = window.nodeFs.readFileSync(walletTOMLPath).toString()
        if(c.search(re) != -1){
            log.debug('Enable ForeignApi to true')
            c = c.replace(re, 'owner_api_include_foreign = true')
            window.nodeFs.writeFileSync(walletTOMLPath, c)
        }
    }
}

function execPromise(command) {
    return new Promise(function(resolve, reject) {
        window.nodeExec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout.trim());
        });
    });
}

function addQuotations(s){
    return '"' + s +'"'
}

class WalletService {

    constructor() {
        this.client;
        this.password = '';
        this.walletIsOpen = false;
    }


    initClient() {

      return new Promise(function(resolve, reject) {
          window.nodeFs.stat(apiSecretPath, function(err) {

              if(err == null) {

                client = axios.create({
                    baseURL: wallet_host,
                    auth: {
                        username: 'epic',
                        password: window.nodeFs.readFileSync(apiSecretPath, {encoding:'utf8', flag:'r'}).toString()
                    },
                })

                console.log('initClient');
                resolve(client);

              } else {
                  console.log('Some other error: ', err.code);
                  reject();
              }
          });
      });
    }

    async jsonRPC(method, params, isForeign){
        const headers = {
            'Content-Type': 'application/json'
        }
        const body = {
            jsonrpc: "2.0",
            id: +new Date(),
            method: method,
            params: params,
        }
        const url = isForeign ? jsonRPCForeignUrl : jsonRPCUrl;


        if(this.client == undefined){
          this.client = await this.initClient();
        }

        return this.client.post(url, body, headers).catch(function (error) {
            if (error.response) {
              //console.log(error.response.data);
              //console.log(error.response.status);
              //console.log(error.response.headers);
              return false;
            }
        });

    }

    setPassword(password){
        this.password = password;
    }

    passwordUndefined(){
        if(!this.password)return true
        return false
    }

    async getNodeHeight(){
        return await this.jsonRPC('node_height', [], false)
    }

    getSummaryInfo(minimum_confirmations){
        return this.jsonRPC('retrieve_summary_info', [true, minimum_confirmations], false)
    }

    getTransactions(toRefresh, tx_id, tx_salte_id){
        return this.jsonRPC('retrieve_txs', [toRefresh, tx_id, tx_salte_id], false)
    }

    getCommits(include_spent, toRefresh, tx_id){
        return this.jsonRPC('retrieve_outputs', [include_spent, toRefresh, tx_id], false)
    }

    cancelTransactions(tx_id, tx_salte_id){
        return this.jsonRPC('cancel_tx', [tx_id, tx_salte_id])
    }

    receiveTransaction(slate, account, message){
        return this.jsonRPC('receive_tx', [slate, account, message], true)
    }

    async issueSendTransaction(tx_data){
        return this.jsonRPC('init_send_tx',  {'args': tx_data})
    }

    async lock_outputs(params){
        return this.jsonRPC('tx_lock_outputs', params)
    }

    finalizeTransaction(slate){
        return this.jsonRPC('finalize_tx',  [slate])
    }

    postTransaction(tx, isFluff){
        return this.jsonRPC('post_tx',  [tx, isFluff])
    }

    async start(password){

        //do not start listener 2 times if wallet is open
        if(this.walletIsOpen){
          return this.walletIsOpen;
        }

        let walletOpen = false;
        this.stopProcess('ownerAPI')
        enableForeignApi()


        if(platform === 'linux'){
          //  ownerAPI = window.nodeExecFile(epicPath, ['-r', epicNode, 'owner_api'])
        }else{

            const cmd = platform==='win'? `${epicPath} -r ${epicNode} --pass ${addQuotations(password)} owner_api`: `${epicPath} -r ${epicNode} owner_api`
            //console.log(cmd,'cmd');
            log.debug(`platform: ${platform}; start owner api cmd: ${cmd}`)
            //let data = await window.nodeChildProcess.spawn(epicPath, ['-r', epicNode, 'owner_api']);
            //console.log('wallet', data);

            walletOpen = await window.nodeChildProcess.execStart(cmd, password, platform);
            if(walletOpen){
              this.walletIsOpen = true;
            }
            console.log('wallet open', walletOpen);


        }
        return walletOpen;

    }

    async startListen(password=password_){
        this.stopProcess('listen')
        if(platform==='linux'){
            //listenProcess =  window.nodeExecFile(epicPath, ['-e', 'listen'])
        }else{
            const cmd = platform==='win'? `${epicPath} -e --pass ${addQuotations(password)} listen`: `${epicPath} -e listen`
            let walletListen = await window.nodeChildProcess.execListen(cmd, password, platform);
            console.log('wallet listen', walletListen);
        }

    }

    stopAll(){
        for(var ps in processes){
            log.debug('stopall ps: '+ ps)
            if(processes[ps]){
                log.debug('stopall try to kill '+ ps)
                this.stopProcess(ps)
            }
        }
    }
    isExist(){
      return new Promise((resolve) => {
        window.nodeFs.stat(seedPath, function(err) {
            if(err == null) {
              resolve(true);
            }
            resolve(false);
        });
      });

      //  return window.nodeFs.existsSync(seedPath)?true:false
    }

    async new(password){
        const cmd = platform==='win'? `${epicPath} -r ${epicNode} --pass ${addQuotations(password)} init`:
                                      `${epicPath} -r ${epicNode} init`
        log.debug(`function new: platform: ${platform}; epic bin: ${epicPath}; epic node: ${epicNode}`);
        let walletNew = await window.nodeChildProcess.execNew(cmd, password, platform);
        console.log('wallet.js', walletNew);

    }

    send(amount, method, dest, version){
        let dest_ = '"' + window.nodePath.resolve(dest) + '"'
        const cmd = `${epicPath} -r ${epicNode} -p ${addQuotations(password_)} send -m ${method} -d ${dest_} -v ${version} ${amount}`
        //log.debug(cmd)
        return execPromise(cmd)
    }

    createSlate(amount, version){
        //fse.ensureDirSync(tempTxDir)

        return new Promise(function(resolve, reject) {
            let fn = window.nodePath.join(tempTxDir, String(Math.random()).slice(2) + '.temp.tx')
            this.send(amount, 'file', fn, version).then(()=>{
                window.nodeFs.readFile(fn, function(err, buffer) {
                    if (err) return reject(err)
                    //fse.remove(fn)
                    return resolve(JSON.parse(buffer.toString()))
                });
            }).catch((err)=>{
                return reject(err)
            })
        })
    }

    finalize(fn){
        let fn_ = '"' + window.nodePath.resolve(fn) + '"'
        const cmd = `${epicPath} -r ${epicNode} -p ${addQuotations(password_)} finalize -i ${fn_}`
        //log.debug(cmd)
        return execPromise(cmd)
    }

    finalizeSlate(slate){
        let fn = window.nodePath.join(tempTxDir, String(Math.random()).slice(2) + '.temp.tx.resp')
        window.nodeFs.writeFileSync(fn, JSON.stringify(slate))
        return this.finalize(fn)
    }

    recover(seeds, password){
        if(platform==='win'){
            return  this.recoverOnWindows(seeds, password)
        }
        let rcProcess
        let args = ['--node_api_http_addr', epicNode, 'node_api_secret_path', window.nodePath.resolve(apiSecretPath),
            '--wallet_dir', window.nodePath.resolve(walletPath), '--seeds', seeds,
            '--password', password]
        try{
            rcProcess = window.nodeFork(epicRsWallet, args)
        }catch(e){
            return log.error('Error during fork to recover: ' + e )
        }
        rcProcess.on('message', (data) => {
            let ret = data['ret']
            log.debug('Recover message: ' + ret)
            this.emitter.$emit('walletRecoverReturn', ret)
        });

        rcProcess.on('error', (err) => {
            log.error(`Recover stderr: ${err}`);
          });

        rcProcess.on('exit', (code) => {
            log.debug(`Recover exit: ${code}`);
        });
    }

    recoverOnWindows(seeds, password){
        let args = [epicRsWallet, '--node_api_http_addr', epicNode2,
            '--node_api_secret_path', window.nodePath.resolve(apiSecretPath),
            '--wallet_dir', window.nodePath.resolve(walletPath),
            '--seeds', seeds, '--password', password]
        let rcProcess = window.nodeSpawnSync(nodeExecutable, args)
        rcProcess.stdout.on('data', function(data){
            let output = data.toString().trim()
            log.debug('rcProcess stdout:', output)
            let msg
            if(output ==='success'){
                msg = 'ok'
            }else if(output ==='"BIP39 Mnemonic (word list) Error"'){
                msg = 'invalidSeeds'
            }else{
                msg = data
            }
            log.debug('msg', msg)
            this.emitter.$emit('walletRecoverReturn', msg)
        })
        rcProcess.stderr.on('data', function(data){
            let output = data.toString()
            log.debug('rcProcess stderr:', output)
        })
    }

    async check(){
        const cmd = `${epicPath} -r ${epicNode} -p ${addQuotations(this.password)} scan`;
        await window.nodeChildProcess.execScan(cmd, platform);
    }

    restore(password, cb){
        let epic = epicPath
        if(platform==='win'){
            epic = epicPath.slice(1,-1)
        }
        restoreProcess = window.nodeSpawnSync(epic, ['-r', epicNode2, '-p', password, 'restore']);
        let rs = restoreProcess
        processes['restore'] = restoreProcess
        localStorage.setItem('restoreProcessPID', restoreProcess.pid)

        log.debug('epic wallet restore process running with pid: ' + restoreProcess.pid);

        rs.stdout.on('data', function(data){
            let output = data.toString()
            cb(output)
        })
        rs.stderr.on('data', function(data){
            let output = data.toString()
            cb(output)
        })
        rs.on('close', function(code){
            log.debug('epic wallet restore exists with code: ' + code);
            if(code==0){return this.emitter.$emit('walletRestored')}
        });
    }

    //https://github.com/mimblewimble/epic-wallet/issues/110
    //static initR(seeds, newPassword){
    //    log.debug(epicPath)
    //    initRProcess = window.nodeSpawnSync(epicPath, ['init', '-r']);
    //    localStorage.setItem('initRProcessPID', initRProcess.pid)
    //    initRProcess.stdout.on('data', (data) => {
    //        let output = data.toString()
    //        log.debug('Wallet initR process return: ' + output)
    //        if (output.includes("Please enter your recovery phrase:")){
    //            log.debug('function initR: time to entry seeds.')
    //            initRProcess.stdin.write(seeds + "\n");
    //        }
    //        if (output.includes("Recovery word phrase is invalid")){
    //            log.debug('function initR: invalid seeds.')
    //            stopProcess('initR')
    //            return this.emitter.$emit('invalidSeeds')
    //        }
    //        if (output.startsWith("Password:")){
    //            log.debug('function initR: time to entry password.')
    //            initRProcess.stdin.write(newPassword + "\n");
    //            initRProcess.stdin.write(newPassword + "\n");
    //        }
    //        if(output.includes("Command 'init' completed successfully")){
    //            log.debug('function initR: wallet initRed.')
    //            return this.emitter.$emit('walletInitRed')
    //        }
    //    })
    //}

    stopProcess(processName){
        let pidName = `${processName}ProcessPID`
        const pid = localStorage.getItem(pidName)
        log.debug(`try to kill ${processName} with pid (get from ${pidName}) : ${pid}`)
        localStorage.removeItem(pidName)

        if(platform==='win'&&pid){
            return window.nodeExec(`taskkill /pid ${pid} /f /t`)
        }

        if(processes[processName]){
            processes[processName].kill('SIGKILL')
            log.debug(`kill ${processName}`)
        }
        if(pid) {
            try{
                process.kill(pid, 'SIGKILL')
            }catch(e){
                log.error(`error when kill ${processName} ${pid}: ${e}` )
            }
        }
    }
}

export default WalletService
