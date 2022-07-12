
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
        this.walletProcess = false;
        this.walletIsListen = false;
        this.shared_key;
        this.token;
    }

    logoutClient(){
      this.client = undefined;
      this.shared_key = undefined;
      this.token = undefined;
    //  this.walletProcess = false;
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

      let baseURL = this.configService.config['check_node_api_http_addr'] ? this.configService.config['check_node_api_http_addr'] : this.configService.defaultEpicNode;
      let password = this.configService.ownerApisecret;
      console.log('###### debug initClient', baseURL);
      return new Promise(function(resolve, reject) {

                let client = axios.create({
                    baseURL: baseURL,
                    auth: {
                        username: 'epic',
                        password: password
                    },
                    withCredentials:true

                })

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

          if(dec != ''){
            let response = JSON.parse(dec);

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
          "name": "",
          "password": password
        }, false);
    }


    /* start a epic wallet in owner_api mode */
    async start(password, emitOutput){

        this.client = undefined;
        this.shared_key = undefined;
        this.walletProcess = await window.nodeFindProcess('name', /.*?epic-wallet.*(owner_api)/);

        if(!this.walletProcess.length){

          let args = [
            ...(this.configService.defaultAccountNetwork != 'mainnet' ? ['--' + this.configService.defaultAccountNetwork] : []),
            '-c',this.configService.platform == "win" ? addQuotations(this.configService.defaultAccountWalletdir) : this.configService.defaultAccountWalletdir,
            'owner_api'
          ];

          let walletOpenId = await window.nodeChildProcess.execStart(this.configService.epicPath, args, this.configService.platform, emitOutput);

          if(walletOpenId > 0){
            this.walletProcess = true;
          }else{
            return {success:false, msg:'cannot start wallet process'};
          }
        }

        let userTopDir = await this.jsonRPC('set_top_level_directory', {dir: this.configService.defaultAccountWalletdir}, false)

        if(userTopDir.result){

            let tokenResponse = await this.jsonRPC('open_wallet', {"name": "", password: password}, false)

            if(tokenResponse.result){
              this.token = tokenResponse.result.Ok;
            }else if(tokenResponse.error){

              return {success:false, msg: tokenResponse.error};
            }

            if(this.token){
              return {success:true, msg:this.token};
            }
        }

        return {success:false, msg:'wallet start unknown error'};
    }

    /* start a epic wallet in listen mode */
    async startListen(password, tor, method){

        let args = [];
        let torBooted = false;
        this.walletIsListen = await window.nodeFindProcess('name', /.*?epic-wallet.*(listen)/);

        if(!this.walletIsListen.length){


          let walletListenId = 0;

          let args = [
            ...(this.configService.defaultAccountNetwork != 'mainnet' ? ['--' + this.configService.defaultAccountNetwork] : []),
            '--pass', password,
            '-t', this.configService.platform == "win" ? addQuotations(this.configService.defaultAccountWalletdir) : this.configService.defaultAccountWalletdir,
            '-c', this.configService.platform == "win" ? addQuotations(this.configService.defaultAccountWalletdir) : this.configService.defaultAccountWalletdir,
            'listen',
            '--method', (method == 'http' ? 'http' : 'keybase')
          ];

          if(tor == false || method == 'keybase'){
            args.push('--no_tor');
          }

          walletListenId = await window.nodeChildProcess.execListen(this.configService.epicPath, args, this.configService.platform);

          if(walletListenId && walletListenId.msg > 0){
              this.walletIsListen = true;
              torBooted = walletListenId.tor;
          }else{
            return {success:false, tor: torBooted};
          }
        }

        return {success:true, tor: torBooted};
    }

    async isListen(){
      this.walletIsListen = await window.nodeFindProcess('name', /.*?epic-wallet.*(listen)/);
      if(!this.walletIsListen.length){
        return false;
      }else{
        return true;
      }
    }

    async stopListen(){

      let killPromise = [];
      let killProcess = false;
      let pWalletList = await window.nodeFindProcess('name', /.*?epic-wallet.*(listen)/);

      if(pWalletList.length){

        for(let process of pWalletList) {
          killPromise.push(window.nodeChildProcess.kill(process.pid))
        }
        await Promise.all(killPromise);
      }

      console.log('wallet listener stopped');
      return true;
    }

    async stopWallet(){

      let killPromise = [];
      let killProcess = false;
      let pWalletList = await window.nodeFindProcess('name', /.*?epic-wallet.*(owner_api)/);

      if(pWalletList.length){

        for(let process of pWalletList) {
          killPromise.push(window.nodeChildProcess.kill(process.pid))
        }
        await Promise.all(killPromise);
      }


      return true;
    }

    async newToml(password){

        let args = [
          ...(this.configService.defaultAccountNetwork != 'mainnet' ? ['--' + this.configService.defaultAccountNetwork] : []),
          '--pass', password,
          '-c', this.configService.platform == "win" ? addQuotations(this.configService.defaultAccountWalletdir) : this.configService.defaultAccountWalletdir,
          'init'
        ];

        return await window.nodeChildProcess.execNew(this.configService.epicPath, args, this.configService.platform);


    }
    async new(password, network, userhomedir){

        let args = [
          ...(network != 'mainnet' ? ['--' + network] : []),
          '--pass', password,
          '-c', this.configService.platform == "win" ? addQuotations(userhomedir) : userhomedir,
          'init'
        ];
        return await window.nodeChildProcess.execNew(this.configService.epicPath, args, this.configService.platform);

    }

    async recover(seeds, password, network, userhomedir){

        let args = [
          ...(network != 'mainnet' ? ['--' + network] : []),
          '--pass', password,
          '-c', this.configService.platform == "win" ? addQuotations(userhomedir) : userhomedir,
          'init', '-r'
        ];

        return await window.nodeChildProcess.execRecover(this.configService.epicPath, args, this.configService.platform, seeds);
    }

    async check(password, delete_unconfirmed){

        let delete_flag = '';
        if(delete_unconfirmed == true){
          delete_flag = '--delete_unconfirmed';
        }

        const cmd = `${this.configService.epicPath} -t ${this.configService.defaultAccountWalletdir} --pass ${addQuotations(password)} scan -h 0 ${delete_flag}`;
        await window.nodeChildProcess.execScan(cmd);

    }

    async stopCheck(){
        let killPromise = [];
        let walletCheckProcessList = await window.nodeFindProcess('name', /.*?epic-wallet.*(scan)/);
        for(let process of walletCheckProcessList) {
          killPromise.push(window.nodeChildProcess.kill(process.pid))
        }

        await Promise.all(killPromise);

    }


}

export default WalletService
