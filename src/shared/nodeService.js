
require('promise.prototype.finally').shim();

function addQuotations(s){
    return '"' + s +'"'
}

class NodeService {

  constructor(emitter, configService) {
      this.emitter = emitter;
      this.configService = configService;
      this.interalNodeProcess = false;
  }

  async reconnectNode(){
    return await this.nodeOnline();
  }
  async internalNodeStart(emitOutput){

    this.interalNodeProcess = await window.nodeFindProcess('name', /.*?epic$/);
    //// TODO: server tomlFile
    //run_tui = false



    if(!this.interalNodeProcess.length){
      let args = [
        ...(this.configService.config['network'] != 'mainnet' ? '--' + this.configService.config['network'] : []),
      ];
      let nodeOpenId = await window.nodeChildProcess.execNode(this.configService.epicNodePath, args, this.configService.platform, emitOutput);
      if(nodeOpenId > 0){
        this.interalNodeProcess = true;
      }else{
        return false;
      }

    }
    return true;


  }
  async nodeOnline(url){



    let emitter = this.emitter;
    emitter.emit('wallet_error', {msg: '', code: ''});
    emitter.emit('settings_error', {msg: '', code: ''});

    let  baseURL = '';
    if(url == undefined){
      baseURL = this.configService.config['check_node_api_http_addr'] ? this.configService.config['check_node_api_http_addr'] : this.configService.defaultEpicNode;
    }else{
      baseURL = url;
    }

    let password = this.configService.apisecret;

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000);
    let response = await fetch(baseURL +'/v1/status', {
      method:'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa('epic:' + password)
      },
      signal: controller.signal
    }).then(function(res){
      if (!res.ok) { throw Error(res) }
      return res.json();
    }).catch(function(error){

      let msg = 'Error connecting node ' + baseURL + (error.status ? ' - '+ error.status : '') +' '+ (error.statusText ? error.statusText :'');
      msg += '\n\n ... make sure your node is accessible.';
      emitter.emit('wallet_error', {msg: msg, code: '0x1645779384'});
      emitter.emit('settings_error', {msg: msg, code: '0x1645779384'});
      return false;
    });
    return response;

  }

}


export default NodeService
