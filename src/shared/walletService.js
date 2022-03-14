
import axios from 'axios';
const Buffer = require('buffer').Buffer;
const crypto = window.nodeCrypto;

require('promise.prototype.finally').shim();

const log = window.log;
const jsonRPCUrl = 'http://127.0.0.1:3420/v3/owner'
const jsonRPCForeignUrl = 'http://127.0.0.1:3420/v2/foreign'

function addQuotations(s){
    return '"' + s +'"'
}

class WalletService {

    constructor(emitter, configService) {

        this.emitter = emitter;
        this.client;
        this.configService = configService;
        this.walletIsOpen = false;
        this.walletIsListen = false;
        this.processes = {};
        this.shared_key;
        this.token;
        this.account;
    }

    logoutClient(){
      this.client = undefined;
      this.shared_key = undefined;
      this.token = undefined;
      this.walletIsOpen = false;
      this.walletIsListen = false;
    }
    async initSecure(url) {

      let emitter = this.emitter;
      let secp256k1 = window.nodeSecp256k1;


      let privateKey = secp256k1.utils.randomPrivateKey();
      let publicKey = secp256k1.getPublicKey(privateKey);


      const params = {
          'ecdh_pubkey': Buffer.from(publicKey).toString('hex')
      }

      const headers = {
          'Content-Type': 'application/json'
      }

      const body = {
          jsonrpc: "2.0",
          id: +new Date(),
          method: 'init_secure_api',
          params: params,
      }

      let response = await this.client.post(url, body, headers).catch(function (error) {
            emitter.emit('wallet_error', {msg: error, code: '0x1645779384'})
            return false;

      });

      let key = secp256k1.getSharedSecret(privateKey, response.data.result.Ok);
      return Buffer.from(key).toString('hex').substr(2, 64);
    }

    initClient() {

      let baseURL = this.configService.defaultEpicNode;
      let password = this.configService.ownerApisecret;



      console.log('wallet init client password', password);
      return new Promise(function(resolve, reject) {
                console.log('initClient', password);
                let client = axios.create({
                    baseURL: baseURL,
                    auth: {
                        username: 'epic',
                        password: password
                    },
                    withCredentials:true

                })

                console.log('init wallet client');
                resolve(client);
      });
    }

    async jsonRPC(method, params, isForeign){
        const headers = {
            'Content-Type': 'application/json',
            'withCredentials': true,
            'credentials': 'same-origin'
        }

        const body = {
            jsonrpc: "2.0",
            id: +new Date(),
            method: method,
            params: params,
        }

        const url = isForeign ? jsonRPCForeignUrl : jsonRPCUrl


        if(this.client == undefined){
          this.client = await this.initClient();
        }

        if(this.shared_key == undefined){
           this.shared_key = await this.initSecure(url);

        }

        //do not enrypt receive_tx
        if(!isForeign){
          //console.log('jsonRPC body', body);
          const aesCipher = window.nodeAes256gcm(this.shared_key);
          const nonce = new Buffer.from(crypto.randomBytes(12));
          let enc = aesCipher.encrypt(JSON.stringify(body), nonce);

          let encParams = {
            'nonce': nonce.toString('hex'),
            'body_enc': enc,
          }
          const encBody = {
            jsonrpc: "2.0",
            id: + new Date(),
            method: 'encrypted_request_v3',
            params: encParams,
          }


          let response = await this.client.post(url, encBody, headers,{withCredentials:true})
          .catch(error => {
                console.log('error', error);
                return false;
          });
          let nonce2;
          let data;
          if(response.data && response.data.result){
            nonce2 = Buffer.from(response.data.result.Ok.nonce, 'hex');
            data = Buffer.from(response.data.result.Ok.body_enc, 'base64');
          }else{
            console.log('jsonRPC error', response);
            return false;
          }

          let dec = aesCipher.decrypt(data, nonce2)
          //console.log('decrypt', dec, typeof dec);
          if(dec != ''){
            let response = JSON.parse(dec);
            console.log('return decoded responce', method, response);
            return response;
          }
      }else{

        let response = await this.client.post(url, body, headers, {withCredentials:true})
        .catch(error => {
              console.log('jsonRPC error', error);
              return false;
        });


        if(response){
          return response;
        }else{
          console.log('return responce', method, response);
        }

      }

      return false;

    }

    async getNodeHeight(){
        return await this.jsonRPC(
          'node_height',
          {
            token: this.token
          }, false);
    }

    async getSummaryInfo(minimum_confirmations){
        return await this.jsonRPC(
          'retrieve_summary_info',
          {
            token: this.token,
            refresh_from_node: true,
            minimum_confirmations: minimum_confirmations
          }, false);
    }

    async getTransactions(toRefresh, tx_id, tx_salte_id){
        return await this.jsonRPC('retrieve_txs',
          {
            token: this.token,
            refresh_from_node: toRefresh,
            tx_id: tx_id,
            tx_slate_id: tx_salte_id
          }, false);
    }

    async getCommits(include_spent, toRefresh, tx_id){
        return await this.jsonRPC(
          'retrieve_outputs',
          {
            token: this.token,
            include_spent: include_spent,
            refresh_from_node: toRefresh,
            tx_id: tx_id
          }, false);
    }

    async cancelTransactions(tx_id, tx_salte_id){
      return await this.jsonRPC(
          'cancel_tx',
          {
            token: this.token,
            tx_id: tx_id,
            tx_slate_id: tx_salte_id
          }, false);
    }

    async receiveTransaction(slate, account, message){
      return this.jsonRPC('receive_tx', [slate, account, message], true)
    }

    async issueSendTransaction(tx_data){
      return await this.jsonRPC(
        'init_send_tx',
        {
          token: this.token,
          args: tx_data
        }, false);
    }

    async lock_outputs(params){

      return await this.jsonRPC(
        'tx_lock_outputs',
        {
          token: this.token,
          slate: params,
          participant_id: 0
        }, false);
    }

    async finalizeTransaction(slate){
      return await this.jsonRPC(
        'finalize_tx',
        {
          token: this.token,
          slate: slate
        }, false);
    }

    async postTransaction(tx){
      return await this.jsonRPC(
        'post_tx',
        {
          token: this.token,
          tx: tx,
          fluff: true
        }, false);
    }

    async getPubliProofAddress(){
      return this.jsonRPC(
        'get_public_proof_address',
        {
          "token": this.token,
          "derivation_index": 0
        }, false);
    }

    async getProofAddressFromOnionV3(address_v3){
      return this.jsonRPC(
        'proof_address_from_onion_v3',
        {
          "address_v3": address_v3
        }, false);
    }

    async getMnemonic(password){

      return this.jsonRPC(
        'get_mnemonic',
        {
          "name": this.account,
          "password": password
        }, false);
    }


    /* start a epic wallet in owner_api mode */
    async start(password, account){

        this.client = undefined;
        this.shared_key = undefined;
        this.token = undefined;
        this.walletIsOpen = false;
        this.walletIsListen = false;
        if(await this.configService.killWalletProcess()){
          this.account = account ? account : 'default';
          let args = [];

          //this.stopProcess('ownerAPI')
          //do not start listener 2 times if wallet is open

          if(this.walletIsOpen){

            return this.walletIsOpen;
          }

          let walletOpenId = 0;

          if(this.configService.config['network'] == 'floonet'){
            args = [
              '--floonet',
            //  '-r', this.configService.config['check_node_api_http_addr'],
              '-c', this.configService.defaultAccountWalletdir,
              'owner_api'

            ];
          }else{
            args = [
            //  '-r', this.configService.config['check_node_api_http_addr'],
              '-c', this.configService.defaultAccountWalletdir,
              'owner_api'

            ];
          }

          console.log('wallet start', this.configService.epicPath, args, this.configService.platform, this.configService.userhomedir);


          walletOpenId = await window.nodeChildProcess.execStart(this.configService.epicPath, args, this.configService.platform);
          console.log('wallet start walletOpenId', walletOpenId);
          if(walletOpenId === 0 && this.token){
            this.walletIsOpen = true;
            return true;
          }

          let userTopDir = await this.jsonRPC('set_top_level_directory', {dir: this.configService.defaultAccountWalletdir}, false)
          console.log('wallet start  userTopDir', userTopDir);
          if(userTopDir.result){

              let tokenResponse =  await this.jsonRPC('open_wallet', {"name": account, password: password}, false)
              console.log('wallet start  tokenResponse', tokenResponse);
              if(tokenResponse.result){
                this.token = tokenResponse.result.Ok;
              }else if(tokenResponse.error){
                console.log(tokenResponse.error.mesage);
                return false;
              }

              if(walletOpenId > 0 && this.token){
                  this.processes['ownerAPI'] = walletOpenId;
                  this.walletIsOpen = true;
                  return true;
              }

          }

          return false;
        }

    }

    /* start a epic wallet in listen mode */
    async startListen(password, tor, method){

        console.log(tor,method);
        let args = [];
        console.log('start wallet listener');

        //do not start listener 2 times if wallet is already open
        if(this.walletIsListen){
          return { success:true, msg:this.walletIsListen };
        }

        let walletListenId = 0;

        if(this.configService.config['network'] == 'floonet'){
          args = [
            '--floonet',
            '--pass', password,
            '-t', this.configService.defaultAccountWalletdir,
            '-c', this.configService.defaultAccountWalletdir,
            'listen',
            '--method', (method == 'http' ? 'http' : 'keybase')


          ];
        }else{
          args = [
            '--pass', password,
            '-t', this.configService.defaultAccountWalletdir,
            '-c', this.configService.defaultAccountWalletdir,
            'listen',
            '--method', (method == 'http' ? 'http' : 'keybase')

          ];

        }
        if(tor == false || method == 'keybse'){
          args.push('--no_tor');
        }

        walletListenId = await window.nodeChildProcess.execListen(this.configService.epicPath, args, this.configService.platform);

        if(walletListenId && walletListenId.msg > 0){
            this.walletIsListen = true;
            this.processes['listen'] = walletListenId.msg;
        }

        return walletListenId;
    }

    isListen(){
      return this.walletIsListen;
    }

    async new(password, network, userhomedir){


        let args = [];
        if(network == 'floonet'){

          args = [
            '--floonet',
            '--pass', password,
            '-c', userhomedir,
            'init'
          ];

        }else{
          args = [
            '--pass', password,
            '-c', userhomedir,
            'init'
          ];
        }
        return await window.nodeChildProcess.execNew(this.configService.epicPath, args, this.configService.platform);


    }

    async recover(seeds, password, network, userhomedir){

        let args = [];
        if(network == 'floonet'){

          args = [
            '--floonet',
            '--pass', password,
            '-c', userhomedir,
            'init', '-r'
          ];

        }else{
          args = [
            '--pass', password,
            '-c', userhomedir,
            'init', '-r'
          ];
        }

        return await window.nodeChildProcess.execRecover(this.configService.epicPath, args, this.configService.platform, seeds);
    }

    async check(password, delete_unconfirmed){

        let delete_flag = '';
        if(delete_unconfirmed == true){
          delete_flag = '--delete_unconfirmed';
        }

        const cmd = `${this.configService.epicPath} -r ${this.configService.defaultEpicNode} -t ${this.configService.defaultAccountWalletdir} --pass ${addQuotations(password)} scan ${delete_flag}`;
        await window.nodeChildProcess.execScan(cmd);

    }

    async stopProcess(processName){
          if(this.processes[processName] > 0){
            let processKilled = await window.nodeChildProcess.kill(this.processes[processName], this.configService.platform);

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
          return false;

    }
}

export default WalletService
