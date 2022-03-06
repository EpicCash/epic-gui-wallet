
import axios from 'axios'

class NodeService {

  constructor(emitter, configService) {
      this.emitter = emitter;
      this.client;
      this.configService = configService;
  }

  initClient() {


    let baseURL = this.configService.config['check_node_api_http_addr'] ? this.configService.config['check_node_api_http_addr'] : this.configService.defaultEpicNode;
    let password = this.configService.apisecret;

    return new Promise(function(resolve) {
              let client = axios.create({
                  baseURL: baseURL,
                  auth: {
                      username: 'epic',
                      password: password
                  },

              })

              resolve(client);
    });
  }

  async reconnectNode(){
    delete this.client;
    return await this.nodeOnline();
  }

  async nodeOnline(){

    let emitter = this.emitter;

    if(this.client == undefined){
      this.client = await this.initClient();
    }
    if(!this.client){
      return false;
    }


    return this.client.get('/v1/status').then((response) => {

        return response.data
    }, (error) => {
        emitter.emit('wallet_error', {msg: error, code: '0x1645779384'})
        return false
    });


  }

}


export default NodeService
