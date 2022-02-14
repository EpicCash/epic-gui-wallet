
import { ewalletPath, logDir, getConfig, setConfig, updateConfig, tempTxDir} from './config';

export function checkFirstTime(){
   const isFirstTime = window.nodeFs.existsSync(ewalletPath) ? false:true

   if(isFirstTime){
       console.log('isFirstTime', isFirstTime);
        window.nodeFs.mkdirSync(ewalletPath)
        window.nodeFs.mkdirSync(logDir)
        window.nodeFs.mkdirSync(tempTxDir)
        setConfig({'firstTime':true})
    }
    else{
        updateConfig({'firstTime':false})
    }
}

export function isFirstTime(){
    let config = getConfig()['firstTime'];
    return config;
}
