
require('promise.prototype.finally').shim();
const nodeChildProcess = window.nodeChildProcess;

const log = window.log;
console.log = log.log;

class NgrokService {

  constructor(emitter, configService) {
      this.emitter = emitter;
      this.configService = configService;
      this.internalNgrokProcess = false;
      this.address = '';
      this.tunnels = {};
      this.sharedSecret = '';
      this.restart = false;
      this.debug = window.debug;
      this.tunnelLifetime = 0;
  }
  async ngrokRestart(){

    if(!this.restart){

      this.restart = true;
      let ngrokService = await this.internalStart(this.sharedSecret);

      if(ngrokService){
        this.tunnels = {};
        let respNgrok = await this.openTunnel(true);
        if(respNgrok){
          let ngrokStatus = await this.checkStatus();
          if(ngrokStatus){
            this.restart = false;
            this.debug ? console.log('ngrokService.ngrokRestart') : null;
            return true;
          }
        }

      }
    }
    return false;
  }

  async stopNgrok(){
    //we need to stop ngrok every time after we call the apisecret
    this.tunnels = {};
    let killPromise = [];
    let killProcess = false;
    let killPids = [];

    let pNgrokList = await window.nodeFindProcess('name', /.*?ngrok.*(start)/);
    for(let process of pNgrokList) {
      if(process.cmd.includes('ngrok')){
        killPids.push(process);
      }
    }

    if(killPids.length){

      for(let process of killPids) {
        this.debug ? console.log('ngrokService.kill', process) : null;
        killPromise.push(nodeChildProcess.kill(process.pid))
      }

      await Promise.all(killPromise);
    }
    this.internalNgrokProcess = false;
    this.sharedSecret = '';

    return true;

  }

  async internalStart(sharedSecret){

    this.sharedSecret = sharedSecret;

    //we need to stop ngrok every time after we call the apisecret
    let killPromise = [];
    let killProcess = false;
    let killPids = [];

    let pNgrokList = await window.nodeFindProcess('name', /.*?ngrok.*(start)/);
    for(let process of pNgrokList) {
      if(process.cmd.includes('ngrok')){
        killPids.push(process);
      }
    }

    if(killPids.length){

      for(let process of killPids) {
        this.debug ? console.log('ngrokService.kill', process) : null;
        killPromise.push(nodeChildProcess.kill(process.pid))
      }

      await Promise.all(killPromise);
    }

    let args = [
            'start',
            '--none',
            ...(this.sharedSecret != '' ? ['--authtoken', this.sharedSecret] : []),
            '--log',
            'stdout'
    ];

    this.debug ? console.log('ngrokService.args', args) : null;

    let ngrokMsg = await window.nodeChildProcess.execNgrok(this.configService.ngrokBinPath, args, this.configService.platform);

    if(ngrokMsg.success){

      this.internalNgrokProcess = true;
      return ngrokMsg;
    }else{
      return ngrokMsg;
    }

  }

  async checkStatus(){

    let baseURL = this.configService.ngrokApiAddress+this.tunnels.uri;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    let response;
    try{
      response = await fetch(baseURL, {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal
      }).then(function(res){

        if (res.ok != true) { throw 'ngrok api offline'; }
        return res.json();
      }).catch(function(error){

        this.debug ? console.log('ngrokService.fetch', error) : null;
        return false;

      });
    } catch (error) {
      this.debug ? console.log('ngrokService.checkStatus', 'error fetch') : null;
    }

    if(!response){
      let restart = await this.ngrokRestart();
      this.debug ? console.log('ngrokService.ngrokRestart', restart) : null;
      return restart;

    }
    this.debug ? console.log('ngrokService.checkStatus', response) : null;
    return response;
  }

  /* ngrok quits if tunnels was called once !? */
  async openTunnel(refresh){

    if(this.tunnels.name && !refresh){
      return this.tunnels;
    }

    let baseURL = this.configService.ngrokApiAddress;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    let response = await fetch(baseURL +'/api/tunnels', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "addr": "3415",
        "proto": "http",
        "name": "epic"
      }),
      signal: controller.signal
    }).then(function(res){

      if (res.ok != true) { throw Error(res) }
      return res.json();
    }).catch(function(error){
      this.debug ? console.log('ngrokService.fetch', error) : null;
      return false;

    });
    this.tunnels = response;
    this.tunnelLifetime = Math.floor(Date.now() + (1000*60*60*2));
    return this.tunnels;


  }
  getTunnelLifetime(){
    return this.tunnelLifetime;
  }
  getAddress(){
    return this.tunnels.public_url;
  }

}

export default NgrokService
