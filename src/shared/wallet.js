
//const fse = require('fs-extra')


import axios from 'axios'
require('promise.prototype.finally').shim();
import {epicPath, seedPath, defaultEpicNode, epicNode2, apiSecretPath, walletTOMLPath, getConfig} from './config.js'

const platform = window.config.getPlatform();

const log = window.log;
const wallet_host = 'http://localhost:3420'
const jsonRPCUrl = 'http://localhost:3420/v2/owner'
const jsonRPCForeignUrl = 'http://localhost:3420/v2/foreign'

let restoreProcess
let processes = {}
let client





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


function addQuotations(s){
    return '"' + s +'"'
}

class WalletService {

    constructor() {
        this.client;
        this.password = '';
        this.walletIsOpen = false;
        this.walletIsListen = false;
        this.processes = {};
        this.config = getConfig();
        this.epicNode = this.config['check_node_api_http_addr'] ? this.config['check_node_api_http_addr'] : defaultEpicNode;
    }

    updateConfig(){
      this.config = getConfig();
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

                console.log('init wallet client');
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

    async receiveTransaction(slate, account, message){
        return this.jsonRPC('receive_tx', [slate, account, message], true)
    }

    async issueSendTransaction(tx_data){
        return this.jsonRPC('init_send_tx', { args: tx_data})
    }

    async lock_outputs(params){
        return this.jsonRPC('tx_lock_outputs', params)
    }

    async finalizeTransaction(slate){
        return this.jsonRPC('finalize_tx',  [slate])
    }



    /* start a epic wallet in owner_api mode */
    async start(){
        //console.log(this.processes);
        //this.stopProcess('ownerAPI')
        //do not start listener 2 times if wallet is open
        if(this.walletIsOpen){
          return this.walletIsOpen;
        }

        let walletOpenId = 0;

        enableForeignApi()

        log.debug(`platform: ${platform}; start owner api cmd: ${epicPath}`)

        if(platform == 'win'){
          walletOpenId = await window.nodeChildProcess.execStart(epicPath, ['--pass',  addQuotations(this.password), '-r', this.epicNode, 'owner_api'], this.password, platform);

        }else{
          walletOpenId = await window.nodeChildProcess.execStart(epicPath, ['-r', this.epicNode, 'owner_api'], this.password, platform);

        }


        if(walletOpenId > 0){
            this.processes['ownerAPI'] = walletOpenId;
            this.walletIsOpen = true;
            return true;
        }


        return false;

    }
    /* start a epic wallet in listen mode */
    async startListen(){

        console.log('start wallet listener');
        //do not start listener 2 times if wallet is open
        if(this.walletIsListen){
          return this.walletIsListen;
        }

        let walletListenId = 0;

        if(platform == 'win'){
          walletListenId = await window.nodeChildProcess.execListen(epicPath, ['--pass',  addQuotations(this.password), '-e', 'listen'], this.password, platform);

        }else{
          walletListenId = await window.nodeChildProcess.execListen(epicPath, ['-e', 'listen'], this.password, platform);

        }
        if(walletListenId > 0){
            this.walletIsListen = true;
            this.processes['listen'] = walletListenId;
            console.log('wallet listen', walletListenId);
            return true;
        }
        return false;
    }
    
    isListen(){
      return this.walletIsListen;
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
    }

    async new(password){
        const cmd = platform==='win'? `${epicPath} -r ${this.epicNode} --pass ${addQuotations(password)} init`:
                                      `${epicPath} -r ${this.epicNode} init`
        log.debug(`function new: platform: ${platform}; epic bin: ${epicPath}; epic node: ${this.epicNode}`);
        let walletNew = await window.nodeChildProcess.execNew(cmd, password, platform);
        console.log('wallet.js', walletNew);

    }


    /* remove ????*/
    /*send(amount, method, dest, version){
        let dest_ = '"' + window.nodePath.resolve(dest) + '"'
        const cmd = `${epicPath} -r ${epicNode} -p ${addQuotations(password_)} send -m ${method} -d ${dest_} -v ${version} ${amount}`
        //log.debug(cmd)
        return execPromise(cmd)
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
    }*/

    recover(seeds, password){
        console.log(seeds, password);
        /*if(platform==='win'){
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
        });*/
    }

    /*recoverOnWindows(seeds, password){
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
    }*/

    async check(){
        const cmd = `${epicPath} -r ${this.epicNode} -p ${addQuotations(this.password)} scan`;
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


    async stopProcess(processName){
          if(this.processes[processName] > 0){
            let processKilled = await window.nodeChildProcess.kill(this.processes[processName], platform);

            console.log('stop process', this.processes[processName], processKilled);
            if(processKilled && processName === 'listen'){
              this.walletIsListen = false;
              delete this.processes[processName];

            }
            if(processKilled && processName === 'ownerAPI'){
              this.walletIsOpen = false;
              delete this.processes[processName];

            }

            return processKilled;
          }

    }
}

export default WalletService
