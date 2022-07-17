
import { ewalletPath, logDir, getConfig, setConfig, updateConfig, tempTxDir} from './config';

export function checkFirstTime(){
   const isFirstTime = window.nodeFs.existsSync(ewalletPath) ? false:true

   if(isFirstTime){
        window.debug ? console.log('isFirstTime', isFirstTime) : null;
        window.nodeFs.mkdirSync(ewalletPath)
        window.nodeFs.mkdirSync(logDir)
        window.nodeFs.mkdirSync(tempTxDir)
        setConfig({
          'firstTime':true,
          'check_node_api_http_addr': 'http://116.203.211.229:3413'
        })
    }
    else{
        updateConfig({'firstTime':false})
    }
}

export function isFirstTime(){
    let config = getConfig()['firstTime'];
    return config;
}
