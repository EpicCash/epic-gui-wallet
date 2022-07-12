
require('promise.prototype.finally').shim();
const nodeChildProcess = window.nodeChildProcess;

class NgrokService {

  constructor(emitter, configService) {
      this.emitter = emitter;
      this.configService = configService;
      this.internalNgrokProcess = false;
      this.address = '';
      this.tunnels = {};
      this.sharedSecret = '';
      this.restart = false;
      this.debug = false;
  }
  async ngrokRestart(){


    if(this.sharedSecret != '' && !this.restart){

      this.restart = true;
      let ngrokService = await this.internalStart(this.sharedSecret);

      if(ngrokService){
        this.tunnels = {};
        let respNgrok = await this.openTunnel();
        if(respNgrok){
          let ngrokStatus = await this.checkStatus();
          if(ngrokStatus){
            this.restart = false;
            this.debug ? console.log('Ngrok restarted') : null;
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

    let pNgrokList = await window.nodeFindProcess('name', /.*?ngrok.*(start)/);

    if(pNgrokList.length){

      for(let process of pNgrokList) {
        killPromise.push(nodeChildProcess.kill(process.pid))
      }

      await Promise.all(killPromise);
    }
    this.internalNgrokProcess = false;
    this.sharedSecret = '';

  }

  async internalStart(sharedSecret){

    if(sharedSecret == undefined || sharedSecret == ''){
      return false;
    }

    this.sharedSecret = sharedSecret;

    //we need to stop ngrok every time after we call the apisecret
    let killPromise = [];
    let killProcess = false;

    let pNgrokList = await window.nodeFindProcess('name', /.*?ngrok.*(start)/);

    if(pNgrokList.length){

      for(let process of pNgrokList) {
        killPromise.push(nodeChildProcess.kill(process.pid))
      }

      await Promise.all(killPromise);
    }

    let args = [
            'start',
            '--none',
            '--authtoken',
            sharedSecret,
            '--log',
            'stdout'
    ];

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
    let response = await fetch(baseURL, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal
    }).then(function(res){

      if (res.ok != true) { throw Error(res) }
      return res.json();
    }).catch(function(error){

      let msg = 'Error connecting ngrok ' + baseURL + (error.status ? ' - '+ error.status : '') +' '+ (error.statusText ? error.statusText :'');
      msg += '\n\n ... make sure ngrok is accessible.';
      console.log('ngrok error', error);
      return false;

    });

    if(!response){
      let restart = await this.ngrokRestart();
      this.debug ? console.log('ngrokRestart', restart) : null;
    }
    this.debug ? console.log('getNgrokStatus', response) : null;
    return response;
  }

  /* ngrok quits if tunnels was called once !? */
  async openTunnel(){

    if(this.tunnels.name){
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

      let msg = 'Error connecting ngrok ' + baseURL + (error.status ? ' - '+ error.status : '') +' '+ (error.statusText ? error.statusText :'');
      msg += '\n\n ... make sure ngrok is accessible.';
      console.log('ngrok error', error);
      return false;

    });
    this.tunnels = response;

    return this.tunnels;


  }

  getAddress(){
    return this.tunnels.public_url;
  }

}

export default NgrokService
