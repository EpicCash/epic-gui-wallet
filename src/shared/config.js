// Main process

const userHomedir = window.config.getUserHomedir();
const path = window.nodePath;


export const platform = window.config.getPlatform()

export const chainType = 'main'
export const epicNode = "http://127.0.0.1:3413"
export const epicNode2 = "http://ip:3413"
export const epicDIR = path.join(userHomedir, '.epic')
export const seedPath = path.join(userHomedir, '.epic', chainType, 'wallet_data/wallet.seed')
export const walletTOMLPath = path.join(userHomedir, '.epic', chainType, 'epic-wallet.toml')
export const walletPath = path.join(userHomedir, '.epic', chainType)
export const apiSecretPath = path.join(userHomedir, '.epic', chainType, '.api_secret')
export const ewalletPath = path.join(userHomedir, '.epic')
export const logDir = path.join(ewalletPath, 'log')
export const tempTxDir = path.join(ewalletPath, 'temp_tx')
export const configPath = path.join(ewalletPath, 'config.json')


const binariesPath = path.join(window.config.getResourcePath(), 'bin', platform)
const epicBinaries = platform ==='win' ? 'epic-wallet.exe' : 'epic-wallet';

export let epicBinPath = path.join(binariesPath, epicBinaries);
if(platform=='win'){
  epicBinPath = '"' + path.resolve(epicBinPath) + '"'
}

export const epicPath = epicBinPath;




/*export const chainType = 'main'
export const epicNode = "http://ip:3413"
export const epicNode2 = "http://ip:3413"
export const epicDIR = path.join(app.getPath('home'), '.epic')
export const seedPath = path.join(app.getPath('home'), '.epic', chainType, 'wallet_data/wallet.seed')
export const walletTOMLPath = path.join(app.getPath('home'), '.epic', chainType, 'epic-wallet.toml')
export const walletPath = path.join(app.getPath('home'), '.epic', chainType)
export const apiSecretPath = path.join(app.getPath('home'), '.epic', chainType, '.api_secret')
export const ewalletPath = path.join(app.getPath('home'), '.epic')
export const logDir = path.join(ewalletPath, 'log')
export const tempTxDir = path.join(ewalletPath, 'temp_tx')

export const configPath = path.join(ewalletPath, 'config.json')
*/

//export const logLevel = getConfig()['debug']?'debug':'info'
export const logLevel = 'debug'

/*export const hedwigServer = 'https://v1.hedwig.im'
export const hedwigClient =
  IS_PROD || app.isPackaged
    ? path.resolve(path.join(process.resourcesPath, 'bin', 'hedwig', 'client.js'))
    : path.resolve(path.join(root, 'hedwig', 'client.js'))

export const hedwigApp = 'Epic Cash Wallet'
*/
//export const epicRsWallet =
  //IS_PROD || APP.isPackaged
    //? path.resolve(path.join(process.resourcesPath, 'bin', 'epicRs', 'wallet.js'))
    //: path.resolve(path.join(root, 'epicRs', 'wallet.js'))

//export const nodeExecutable =
  //  IS_PROD || APP.isPackaged
    //  ? path.resolve(path.join(process.resourcesPath, 'bin', 'epicRs', 'node.exe'))
    //  : path.resolve(path.join(root, 'epicRs', 'node.exe'))


/*function getLocale(){
  let locale = getConfig()['locale']
  if(locale)return locale
  locale = APP.getLocale().toLowerCase()
  if(locale.startsWith('zh'))return 'zh'
  if(locale.startsWith('ru'))return 'ru'
  return 'en'
}*/
/*export function setLocale(locale){
  updateConfig({'locale':locale})
}
export const locale = getLocale()

*/
export function getConfig(){

  try{

    //console.log(window.nodeFs.readFileSync(configPath, {encoding:'utf8', flag:'r'}));
    return JSON.parse(window.nodeFs.readFileSync(configPath, {encoding:'utf8', flag:'r'}))

  }catch (e) {
    console.log('getConfig',e);
    return {}

  }
}
export function setConfig(data){
  return window.nodeFs.writeFileSync(configPath, JSON.stringify(data), {
      encoding: "utf8",
      flag: "w",
      mode: 0o666
    })
}
export function updateConfig(data){
  let data_ = getConfig()
  for(var key in data){
    data_[key] = data[key]
  }
  setConfig(data_)
}
export function setLocale(locale){
  updateConfig({'locale':locale})
}
export const locale = "en";
export const langs = {'en':'English'}
