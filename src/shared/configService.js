/* check required files and folder on on app start */
const defaultAppConfigDir = window.config.getUserHomedir();
const defaultUserdir = 'epicguiwallet';
const path = window.nodePath;
const nodeChildProcess = window.nodeChildProcess;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleepTime = 50;


class ConfigService {

  constructor(emitter) {
      this.emitter = emitter;
      this.configAccount = '';
      this.configVersion = "4.0.1";
      this.debug = window.debug;

      //where to find accounts and wallet data
      this.userhomedir = '';
      this.langs = {'en': 'English', 'ru': 'Russian', 'zh': 'Chinese'};
      this.locale = 'en';
      //the default wallet dir from current selected account
      //TODO: make it selectable in app, so user can
      //start wallet from last used account
      this.defaultAccountWalletdir = path.join(defaultAppConfigDir, '.epic');
      this.appConfigFile = path.join(defaultAppConfigDir, '.epic', 'epic_3-0-0_config.json');

      this.defaultAccountNetwork = 'mainnet';
      this.platform = window.config.getPlatform();
      this.binariesPath = path.join(window.config.getResourcePath(), 'bin', window.config.getPlatform());
      this.epicWalletBinary = window.config.getPlatform() === 'win' ? 'epic-wallet.exe' : 'epic-wallet';
      this.epicNodeBinary = window.config.getPlatform() === 'win' ? 'epic.exe' : 'epic';
      this.ngrokBinary = window.config.getPlatform() === 'win' ? 'ngrok.exe' : 'ngrok';
      this.epicBinPath = path.join(this.binariesPath, this.epicWalletBinary);
      this.epicNodeBinPath = path.join(this.binariesPath, this.epicNodeBinary);
      this.ngrokBinPath = path.join(this.binariesPath, this.ngrokBinary);

      if(window.config.getPlatform() == 'win'){
        this.epicBinPath = '"' + path.resolve(this.epicBinPath) + '"';
        this.epicNodeBinPath = '"' + path.resolve(this.epicNodeBinPath) + '"';
      }

      this.epicPath = this.epicBinPath;
      this.epicNodePath = this.epicNodeBinPath;
      this.config = {};
      this.configFile = '';
      this.apiSecretPath = '';
      this.defaultEpicNode = '';
      this.apisecret = '';
      this.ownerApiSecretPath = '';
      this.ownerApisecret = '';

      this.walletTOMLPath = '';
      this.walletTOMLName = 'epic-wallet.toml';

      this.nodeTOMLPath = '';
      this.nodeTOMLName = 'epic-server.toml';
      this.nodeFoundationName = 'foundation.json';
      this.tomlNetworkname = '';

      this.ngrokApiAddress = 'http://127.0.0.1:4040';
      this.nodeFallBack = 'https://fastepic.eu:3413';

      //this should never fail or app is not working
      let epicDir = path.join(defaultAppConfigDir, '.epic');
      if (!window.nodeFs.existsSync(epicDir)){
        window.nodeFs.mkdirSync(epicDir, { recursive: true });
      }


  }

  resetConfig(){
    this.configAccount = '';
    this.userhomedir = '';
    this.defaultAccountNetwork = 'mainnet';
    this.config = {};
    this.configFile = '';
    this.apiSecretPath = '';
    this.ownerApisecret = '';
  }

  checkServerTomlFile(defaultAccountWalletdir){


    let walletDir = defaultAccountWalletdir ? defaultAccountWalletdir : this.defaultAccountWalletdir;
    let chainDir = path.join(walletDir, 'chain_data');
    let tomlFile = path.join(walletDir, this.nodeTOMLName);
    let foundationFile = path.join(walletDir, this.nodeFoundationName);

    //check if toml file exist
    if (window.nodeFs.existsSync(tomlFile) ) {
        this.emitter.emit('checkSuccess', 'node toml "' + tomlFile.replace(walletDir, '~') + '" file exist');

    } else {

      //copy default epic-server.toml to new wallet dir
      let defaultNodeTomlFile = path.join(window.config.getResourcePath(), "epic-server.toml");
      window.nodeFs.copyFileSync(defaultNodeTomlFile, tomlFile);
    }


    //check if foundation file exist
    if (window.nodeFs.existsSync(foundationFile) ) {
        this.emitter.emit('checkSuccess', 'foundation "' + foundationFile.replace(walletDir, '~') + '" file exist');

    } else {

      //copy foundation
      let defaultFoundationFile = path.join(window.config.getResourcePath(), "foundation.json");
      window.nodeFs.copyFileSync(defaultFoundationFile, foundationFile);

    }

    if(window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'})){

        //rewrite some toml properties to work with gui wallet

        let tomlContent = window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'});

        const re = /db_root(\s)*=(\s).*/;
        if(tomlContent.search(re) != -1){
          if(this.platform == 'win'){
                  //double escaped path
            tomlContent = tomlContent.replace(re, 'db_root = "' + chainDir.replace(/\\/g, '\\\\') + '"');
          }else{
            tomlContent = tomlContent.replace(re, 'db_root = "' + chainDir + '"');
          }
        }

        const re2 = /chain_type(\s)*=(\s).*/;
        if(tomlContent.search(re2) != -1){
          tomlContent = tomlContent.replace(re2, 'chain_type = "' + this.tomlNetworkname + '"');
        }

        const re3 = /foundation_path(\s)*=(\s).*/;
        if(tomlContent.search(re3) != -1){
          if(this.platform == 'win'){
                  //double escaped path
            tomlContent = tomlContent.replace(re3, 'foundation_path = "' + foundationFile.replace(/\\/g, '\\\\') + '"');
          }else{
            tomlContent = tomlContent.replace(re3, 'foundation_path = "' + foundationFile + '"');
          }
        }

        const re4 = /stdout_log_level(\s)*=(\s).*/;
        if(tomlContent.search(re4) != -1){
            tomlContent = tomlContent.replace(re4, 'stdout_log_level = "Debug"');
        }

        const re5 = /run_tui(\s)*=(\s).*/;
        if(tomlContent.search(re5) != -1){
            tomlContent = tomlContent.replace(re5, 'run_tui = false');
        }


        window.nodeFs.writeFileSync(tomlFile, tomlContent, {
          encoding: "utf8",
          flag: "w"
        })

    }else{
      return false;
    }

    return tomlFile;

  }


  /* checks the globa app config for accounts by name */
  accountExist(account){
    let accountExist = false;
    this.appConfig['account_dirs'].forEach(function(existingAccount){
        if(existingAccount['account'] == account ){
          accountExist = true;

          return;
        }
    });

    if(accountExist){
      this.configAccount = account;
    }

    return accountExist;
  }

  loadConfig(configPath){

    let config;
    if(window.nodeFs.readFileSync(configPath, {encoding:'utf8', flag:'r'})){

      let configContent = window.nodeFs.readFileSync(configPath, {encoding:'utf8', flag:'r'});

      try {
        config = JSON.parse(configContent);
        this.emitter.emit('checkSuccess', 'wallet config readable');

      } catch (e) {
        this.emitter.emit('checkFail', 'Wallet config ' + e);
      }

    } else {
      this.emitter.emit('checkFail', 'wallet config is empty');
    }
    return config;

  }

  saveConfig(){

    try{
      window.nodeFs.writeFileSync(this.configFile, JSON.stringify(this.config), {encoding: "utf8",flag: "w"});
      return true;
    }catch(e){

      return false;
    }

  }

  updateConfig(data){
    for(var key in data){
      this.config[key] = data[key]
    }
    return this.saveConfig();
  }

  saveAppConfig(){

    try{
      window.nodeFs.writeFileSync(this.appConfigFile, JSON.stringify(this.appConfig), {encoding: "utf8", flag: "w"});
      return true;
    }catch(e){

      return false;
    }

  }

  checkTomlFile(defaultAccountWalletdir){

    let walletDir = defaultAccountWalletdir ? defaultAccountWalletdir : this.defaultAccountWalletdir;
    //check if toml file exist
    let tomlFile = path.join(walletDir, this.walletTOMLName);
    if (window.nodeFs.existsSync(tomlFile) && window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'})) {
        this.emitter.emit('checkSuccess', 'wallet toml "' + tomlFile.replace(walletDir, '~') + '" file exist and readable');


        //rewrite some toml properties to work with owner_api lifecycle and foreign receive
        let tomlContent = window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'});

        const re = /owner_api_include_foreign(\s)*=(\s)*false/;
        if(tomlContent.search(re) != -1){

            tomlContent = tomlContent.replace(re, 'owner_api_include_foreign = true')
        }

        const re2 = /data_file_dir(\s)*=(\s).*/;
        if(tomlContent.search(re2) != -1){

            if(this.platform == 'win'){
              //double escaped path
              tomlContent = tomlContent.replace(re2, 'data_file_dir = "' + this.userhomedir.replace(/\\/g, '\\\\') + '"');
            }else{
              tomlContent = tomlContent.replace(re2, 'data_file_dir = "' + this.userhomedir + '"');
            }
        }

        const re3 = /check_node_api_http_addr(\s)*=(\s).*/;


        let nodeApiHttp = '';
        if(!this.config.nodesynced){
          nodeApiHttp = this.nodeFallBack;
        }else{
          nodeApiHttp = this.config.check_node_api_http_addr;
        }


        if(tomlContent.search(re3) != -1){
          tomlContent = tomlContent.replace(re3, 'check_node_api_http_addr = "' + nodeApiHttp + '"');
        }

        const re4 = /stdout_log_level(\s)*=(\s).*/;
        if(tomlContent.search(re4) != -1){
            tomlContent = tomlContent.replace(re4, 'stdout_log_level = "Debug"');
        }

        window.nodeFs.writeFileSync(tomlFile, tomlContent, {
            encoding: "utf8",
            flag: "w"
        })


    } else {

        this.emitter.emit('checkFail', 'wallet toml "' + tomlFile.replace(walletDir, '~') + '" file does not exist or readable');
        return false;



    }

    return tomlFile;

  }

  /* save only default user paths here */
  updateAppConfig(configKey, userdata){

      let data = userdata;
      let appConfig = this.appConfig;

      if(appConfig[configKey]){

        if(appConfig[configKey].length >= 1){
          appConfig[configKey].forEach(function(element, key){

            if(appConfig[configKey][key].account == data.account){

              appConfig[configKey][key].userhomedir = data.userhomedir;
              appConfig[configKey][key].network     = data.network;
              appConfig[configKey][key].isdefault   = data.isdefault;
              data = undefined;
              return false;

            }
          });
        }

        if(data != undefined){
          appConfig[configKey].push(data);
        }
      }

      this.appConfig = appConfig;

      return this.saveAppConfig();
  }

  /*
   * find running epic-wallet and epic node
   * process and close them if user confirms via prompt
   */
  async killEpicProcess(){

    let killPromise = [];
    let killProcess = false;
    let killPids = [];

    let pWalletList = await window.nodeFindProcess('name', /.*?epic-wallet.*(owner_api|listen|scan)/);
    let pEpicnodeList = await window.nodeFindProcess('name', /.*?epic.*server.*run/);
    let pWalletTorList = await window.nodeFindProcess('name', /tor/);

    for(let process of pWalletList) {
      if(process.cmd.includes('owner_api') || process.cmd.includes('listen') || process.cmd.includes('scan')){
        killPids.push(process);
      }
    }
    for(let process of pEpicnodeList) {
      if(process.cmd.includes('server')){
        killPids.push(process);
      }
    }
    for(let process of pWalletTorList) {

      if(process.cmd.includes('tor/listener/torrc')){
        killPids.push(process);
      }
    }

    if(killPids.length){
      await this.emitter.emit('killEpicProcess', async function(confirmed){
        if(!confirmed){
          return false;
        }
        killProcess = true;
      })
    }

    if(killProcess){
      for(let process of killPids) {
        this.debug ? console.log('configService.kill', process) : null;
        killPromise.push(nodeChildProcess.kill(process.pid))
      }
      await Promise.all(killPromise);
    }

    this.debug ? console.log('configService.allkilled') : null;

  }


  /* check if the select dir is a valid epic wallet dir */
  async walletDirExist(selectedDir){

      let walletDir = path.join(selectedDir, 'wallet_data');
      let tomlFile = path.join(selectedDir, this.walletTOMLName);
      let configFile = path.join(selectedDir, 'config.json');
      let walletDirSegements = selectedDir.split(path.sep).reverse();
      let network = '';
      if(walletDirSegements.length <= 0){

        return false;
      }
      let userdata;
      if(!window.nodeFs.existsSync(walletDir)){
        return false;
      }
      if(window.nodeFs.existsSync(configFile)){

        let config = this.loadConfig(configFile);
        if(config && config.version == '3.0.0'){

            let account = walletDirSegements[0];
            if(account == 'main' || account == 'floo' || account == 'user'){
              account = 'default';
            }else{
              walletDirSegements.shift();
            }

            let networkShortname = walletDirSegements[0];
            network = config.network;
            if(networkShortname == 'main'){
              network = 'mainnet';
              walletDirSegements.shift();
            } else if(networkShortname == 'floo'){
              network = 'floonet';
              walletDirSegements.shift();
            }else if(networkShortname == 'user'){
              network = 'usernet';
              walletDirSegements.shift();
            }

            userdata = {
              account: account,
              userhomedir: walletDirSegements.reverse().join(path.sep),
              network: network,
              isdefault:false,

            }

        }else{

          let account = walletDirSegements[0];
          if(account == 'main' || account == 'floo' || account == 'user'){
            account = 'default';
          }else{
            walletDirSegements.shift();
          }

          let networkShortname = walletDirSegements[0];
          if(networkShortname == 'main'){
            network = 'mainnet';
            walletDirSegements.shift();
          } else if(networkShortname == 'floo'){
            network = 'floonet';
            walletDirSegements.shift();
          }else if(networkShortname == 'user'){
            network = 'usernet';
            walletDirSegements.shift();
          }

          if(network == undefined){
            let selectedNetwork = await this.emitter.emit('selectNetwork');
          }
          userdata = {
            account: 'default',
            userhomedir: walletDirSegements.reverse().join(path.sep),
            network: network,
            isdefault:false,
          }

        }

      }else{

        let account = walletDirSegements[0];
        if(account == 'main' || account == 'floo' || account == 'user'){
          account = 'default';
        }else{
          walletDirSegements.shift();
        }

        let networkShortname = walletDirSegements[0];
        if(networkShortname == 'main'){
          network = 'mainnet';
          walletDirSegements.shift();
        } else if(networkShortname == 'floo'){
          network = 'floonet';
          walletDirSegements.shift();
        }else if(networkShortname == 'user'){
          network = 'usernet';
          walletDirSegements.shift();
        }

        if(network == undefined){
          let selectedNetwork = await this.emitter.emit('selectNetwork');
        }
        userdata = {
          account: account,
          userhomedir: walletDirSegements.reverse().join(path.sep),
          network: network,
          isdefault:false,
        }

      }

      if(userdata){

        this.updateAppConfig('account_dirs', userdata);
      }

      return true;



  }

  /* check if app has its config file */
  appHasAccounts(){
    if (!window.nodeFs.existsSync(this.appConfigFile)) {
      //copy default config json to new wallet dir
      let defaultAppFile = path.join(window.config.getResourcePath(), "default.app.json");
      window.nodeFs.copyFileSync(defaultAppFile, this.appConfigFile);
      this.appConfig = {'account_dirs':[]};
      return false;
    }else{

      let appConfigContent = window.nodeFs.readFileSync(this.appConfigFile, {encoding:'utf8', flag:'r'})

      try{
        this.appConfig = JSON.parse(appConfigContent);
        if(this.appConfig['account_dirs'].length <= 0){
          return false;
        }

      }catch(e){
        return false;
      }
    }
    return true;
  }
  getNetworkfolderShortname(network){

    let shortName = 'main';
    if(network == 'floonet'){
      shortName = 'floo';
    }else if(network == 'usernet'){
      shortName = 'user';
    }
    return shortName;

  }
  getNetworkTomlName(network){

    let tomlName = 'Mainnet';
    if(network == 'floonet'){
      tomlName = 'Floonet';
    }else if(network == 'usernet'){
      tomlName = 'Usernet';
    }
    return tomlName;

  }
  startCheckNode(){

      this.nodeTOMLPath = this.checkServerTomlFile();
      if(!this.nodeTOMLPath){
        return false;
      }
      return true;

  }

  configVersionOk(){

    if(this.config['version'] != this.configVersion){
      this.emitter.emit('checkFail', 'config version to old');
      return false;
    }

    this.emitter.emit('checkSuccess', 'config version ok');
    return true;

  }

  async startCheck(account){

      this.debug ? console.log('configService.startCheck', account) : null;

      let userHomedir = defaultUserdir;
      let defaultAccountWalletdir = '';
      let initWallet = false;
      let parent = this;
      let network = '';
      let networkToml = '';
      //this fails if user create a wallet without default name
      if(account){

            this.appConfig['account_dirs'].forEach(function(existingAccount){
                if(existingAccount['account'] == account && existingAccount['userhomedir'] != ''){
                  userHomedir = existingAccount['userhomedir'];
                  defaultAccountWalletdir = path.join(userHomedir, parent.getNetworkfolderShortname(existingAccount['network']));
                  networkToml = parent.getNetworkTomlName(existingAccount['network']);
                  network = existingAccount['network'];
                }
            });

      }else{

          this.appConfig['account_dirs'].forEach(function(existingAccount){
              if(existingAccount['isdefault'] && existingAccount['userhomedir'] != ''){
                userHomedir = existingAccount['userhomedir'];
                defaultAccountWalletdir = path.join(userHomedir, parent.getNetworkfolderShortname(existingAccount['network']));
                networkToml = parent.getNetworkTomlName(existingAccount['network']);
                network = existingAccount['network'];

              }
          });

      }

      //await delay(sleepTime);

      //check if user home dir exist.
      //if home dir is not found then user have to select one

      if (window.nodeFs.existsSync(userHomedir)) {
          this.emitter.emit('checkSuccess', 'user wallet dir exist');
      } else {
          initWallet = true;
          this.emitter.emit('checkFail', 'user wallet dir does not exist');
          return 'init';
      }
      this.userhomedir = userHomedir;
      this.defaultAccountWalletdir = defaultAccountWalletdir;
      this.tomlNetworkname = networkToml;
      this.defaultAccountNetwork = network;


      //await delay(sleepTime);

      //check if config file exist
      //TODO: this does not work if user never created a wallet
      let configFile = path.join(defaultAccountWalletdir, 'config.json');
      if(this.defaultAccountWalletdir != '' && window.nodeFs.existsSync(this.defaultAccountWalletdir)){

        if (window.nodeFs.existsSync(configFile)) {
            this.emitter.emit('checkSuccess', 'wallet config file exist');
        } else {
            initWallet = true;
            this.emitter.emit('checkFail', 'wallet config file does not exist');
            //copy default config json to new wallet dir
            let defaultConfigFile = path.join(window.config.getResourcePath(), "default.config.json");
            window.nodeFs.copyFileSync(defaultConfigFile, configFile);
        }
        this.configFile = configFile;
        //await delay(sleepTime);




        //await delay(sleepTime);

      }else{
        initWallet = true;
      }

      //if we dont have any epic wallet data prompt user for init or recover a wallet
      if(initWallet && !account){
          this.emitter.emit('checkSuccess', 'create new or recover wallet');
          return 'init'
      }else{

        //check if api secret file exist
        let apiSecretFile = path.join(defaultAccountWalletdir, '.api_secret');
        if (window.nodeFs.existsSync(apiSecretFile) && window.nodeFs.readFileSync(apiSecretFile, {encoding:'utf8', flag:'r'})) {

            this.apiSecretPath = apiSecretFile;
            this.apisecret = window.nodeFs.readFileSync(this.apiSecretPath, {encoding:'utf8', flag:'r'}).toString().trim();
            this.emitter.emit('checkSuccess', 'node api secret "' + apiSecretFile.replace(defaultAccountWalletdir, '~') + '" file exist and readable');

        } else {
            this.emitter.emit('checkFail', 'node api secret "' + apiSecretFile.replace(defaultAccountWalletdir, '~') + '" file does not exist or readable');
        }

        //await delay(sleepTime);

        //check if owner api secret file exist
        let ownerApiSecretFile = path.join(defaultAccountWalletdir, '.owner_api_secret');

        if (window.nodeFs.existsSync(ownerApiSecretFile) && window.nodeFs.readFileSync(ownerApiSecretFile, {encoding:'utf8', flag:'r'})) {

            this.ownerApiSecretPath = ownerApiSecretFile;
            this.ownerApisecret = window.nodeFs.readFileSync(this.ownerApiSecretPath, {encoding:'utf8', flag:'r'}).toString().trim();
            this.emitter.emit('checkSuccess', 'owner api secret "' + ownerApiSecretFile.replace(defaultAccountWalletdir, '~') + '" file exist and readable');

        } else {
            this.emitter.emit('checkFail', 'owner api secret "' + ownerApiSecretFile.replace(defaultAccountWalletdir, '~') + '" file does not exist or readable');
        }
        //await delay(sleepTime);

        this.walletTOMLPath = this.checkTomlFile(defaultAccountWalletdir);
        if(!this.walletTOMLPath){
          return 'toml';
        }

        //make some settings
        this.config = this.loadConfig(this.configFile);
        if(!this.configVersionOk()){
          return 'settings'
        }
        if(this.config['firstTime']){
          this.accountExist(account);
          return 'settings'
        }

      }

      return 'login';

  }

}

export default ConfigService
