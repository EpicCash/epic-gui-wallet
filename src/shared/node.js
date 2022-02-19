

import axios from 'axios'
import {epicPath, seedPath, defaultEpicNode, epicNode2, apiSecretPath, walletTOMLPath, getConfig} from './config.js'
let client


class NodeService {

  constructor() {
      this.client;
      this.config = getConfig();
      this.epicNode = this.config['check_node_api_http_addr'] ? this.config['check_node_api_http_addr'] : defaultEpicNode;
  }

  initClient() {

    return new Promise(function(resolve) {
      window.nodeFs.stat(apiSecretPath, function(err) {

            if(err == null) {

              client = axios.create({
                  baseURL: this.epicNode,
              })

              console.log('init node client');
              resolve(client);

            } else {
                console.log('Some other error: ', err.code);
                resolve(false);
            }
        });
    });
  }

  async nodeOnline(){

    if(this.client == undefined){
      this.client = await this.initClient();
    }


    return this.client.get(this.epicNode + '/v1/status').then((response) => {
        return response
    }, (error) => {
        console.log(error);
        return false
    });


  }






}


export default NodeService
