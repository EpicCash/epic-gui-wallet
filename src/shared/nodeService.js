require('promise.prototype.finally').shim();

class NodeService {

  constructor(emitter, configService) {
      this.emitter = emitter;
      this.configService = configService;
      this.internalNodeProcess = false;
      this.syncStatusLastHeight = 0;
      this.syncStatusCheckedTime = Math.floor(Date.now() / 1000);
      this.sysnStatusStalltime = (60*3); //3 minutes
      this.restartSuccess = true;
      this.debug = false;
      //do not restart on this node states
      this.safeSyncStates = [
        'txhashset_download',
        'syncing',
        'txhashset_rangeproofs_validation',
        'txhashset_kernels_validation',
      ]
  }

  async restartNode(){

    //if restart failed at some point we stop restarting the node
    if(this.restartSuccess){
      this.debug ? console.log('restartNode') : null;
      this.restartSuccess = false;
      let killPromise = [];
      let killProcess = false;
      let killPids = [];

      let pEpicnodeList = await window.nodeFindProcess('name', /.*?epic.*server.*run/);
      for(let process of pEpicnodeList) {
        if(process.cmd.includes('server')){
          killPids.push(process);
        }
      }

      if(killPids.length){

        for(let process of killPids) {
          this.debug ? console.log('nodeService kill', process) : null;
          killPromise.push(window.nodeChildProcess.kill(process.pid))
        }
        await Promise.all(killPromise);

      }
      this.restartSuccess = await this.internalNodeStart();

    }

  }
  async stopNode(){

      let killPromise = [];
      let killProcess = false;
      let killPids = [];
      let pEpicnodeList = await window.nodeFindProcess('name', /.*?epic.*server.*run/);
      for(let process of pEpicnodeList) {
        if(process.cmd.includes('server')){
          killPids.push(process);
        }
      }
      if(killPids.length){

        for(let process of killPids) {
          this.debug ? console.log('nodeService kill', process) : null;
          killPromise.push(window.nodeChildProcess.kill(process.pid))
        }
        await Promise.all(killPromise);

      }

  }


  async internalNodeStart(){

    let internalNodeProcess = [];
    let pEpicnodeList = await window.nodeFindProcess('name', /.*?epic.*server.*run/);
    for(let process of pEpicnodeList) {
      if(process.cmd.includes('server')){
        internalNodeProcess.push(process);
      }
    }

    if(!internalNodeProcess.length){
      let args = [
        ...(this.configService.defaultAccountNetwork != 'mainnet' ? ['--' + this.configService.defaultAccountNetwork] : []),
        ...(this.configService.nodeTOMLPath != '' ? ['server', '--config_file', this.configService.nodeTOMLPath, 'run'] : ['server', 'run']),

      ];

      let nodeOpenId = await window.nodeChildProcess.execNode(this.configService.epicNodePath, args, this.configService.platform);
      if(nodeOpenId > 0){
        this.internalNodeProcess = true;
      }else{
        return false;
      }

    }
    return true;

  }

  async getNodeStatus(internal){


    let baseURL = this.configService.config['check_node_api_http_addr'] ? this.configService.config['check_node_api_http_addr'] : this.configService.defaultEpicNode;
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
      console.log('Error fetch node status', error);
      return false;
    });

    /* check if node status is ok or need a restart because is stalled */
    if(internal){
      if(!response){
        this.syncStatusCheckedTime = Math.floor(Date.now() / 1000);
        await this.restartNode();
      }else{
        //check some other indicators that node is not stalled
        if((this.syncStatusCheckedTime+this.sysnStatusStalltime) < Math.floor(Date.now() / 1000)){
          this.syncStatusCheckedTime = Math.floor(Date.now() / 1000);

          //never restart at this stages
          if(!this.safeSyncStates.includes(response.sync_status)){
            let restart = false;


            //no peers
            if(response.connections == 0 && response.sync_status !== 'awaiting_peers'){
              this.debug ? console.log('node has no peers', response.connections) : null;
              restart = true;
            }
            //if node is synced but has no tip height
            if(response.tip && response.tip.height == 0 && response.sync_status === 'no_sync'){
              this.debug ? console.log('node has no tip height', response.sync_status) : null;
              restart = true;
            }

            if(response.sync_info && response.sync_info.highest_height == 0 && response.sync_status !== 'awaiting_peers'){
              this.debug ? console.log('node has no highest_height', response.sync_info.highest_height) : null;
              restart = true;
            }
            // body_sync has latest block height but do not switch to no_sync
            if(response.sync_status === 'body_sync' && response.tip.height == response.sync_info.current_height && response.sync_info.highest_height == response.sync_info.current_height){
              this.debug ? console.log('node does not switch to no_sync', response) : null;
              restart = true;
            }

            if(restart){
              await this.restartNode();
            }

          }
        }
      }
    }

    this.debug ? console.log('getNodeStatus', response) : null;
    return response;

  }

}

export default NodeService
