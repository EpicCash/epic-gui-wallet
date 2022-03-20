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

      //where to find accounts and wallet data
      this.userhomedir = '';
      this.langs = {'en': 'English', 'ru': 'Russian', 'zh': 'Chinese'};
      this.locale = 'en';
      //the default wallet dir from current selected account
      //TODO: make it selectable in app, so user can
      //start wallet from last used account
      this.defaultAccountWalletdir = '';

      this.platform = window.config.getPlatform();
      this.binariesPath = path.join(window.config.getResourcePath(), 'bin', window.config.getPlatform());
      this.epicWalletBinary = window.config.getPlatform() ==='win' ? 'epic-wallet.exe' : 'epic-wallet';
      this.epicBinPath = path.join(this.binariesPath, this.epicWalletBinary);
      if(window.config.getPlatform() == 'win'){
        this.epicBinPath = '"' + path.resolve(this.epicBinPath) + '"'
      }

      this.epicPath = this.epicBinPath;
      this.config = {};
      this.configFile = '';
      this.apiSecretPath = '';
      this.defaultEpicNode = '';
      this.apisecret = '';
      this.ownerApiSecretPath = '';
      this.ownerApisecret = '';
      this.walletTOMLPath = '';
      this.walletTOMLName = 'epic-wallet.toml';
      this.appConfigAccount;

  }
  accountExist(account){
    let accountExist = false;
    let foundAccount = [];
    this.appConfig['account_dirs'].forEach(function(existingAccount){
        if(existingAccount['account'] == account ){
          accountExist = true;
          foundAccount = existingAccount;
          return;
        }
    });

    if(foundAccount && foundAccount['userhomedir']){

      if(foundAccount['account'] == 'default'){
        this.defaultAccountWalletdir = path.join(foundAccount['userhomedir'], (foundAccount['network'] == 'mainnet' ? 'main' : 'floo'));

      }else{
        this.defaultAccountWalletdir = path.join(foundAccount['userhomedir'], (foundAccount['network'] == 'mainnet' ? 'main' : 'floo'), foundAccount['account']);

      }

      this.appConfigAccount = foundAccount;
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
        const re = /owner_api_include_foreign(\s)*=(\s)*false/;
        const re2 = /data_file_dir(\s)*=(\s).*/;
        const re3 = /check_node_api_http_addr(\s)*=(\s).*/;
        let tomlContent = window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'});
        if(tomlContent.search(re) != -1){

            tomlContent = tomlContent.replace(re, 'owner_api_include_foreign = true')
        }
        if(tomlContent.search(re2) != -1){

            if(this.platform == 'win'){
              //double escaped path
              tomlContent = tomlContent.replace(re2, 'data_file_dir = "' + this.userhomedir.replace(/\\/g, '\\\\') + '"');
            }else{
              tomlContent = tomlContent.replace(re2, 'data_file_dir = "' + this.userhomedir + '"');
            }
        }
        if(tomlContent.search(re3) != -1){

            tomlContent = tomlContent.replace(re3, 'check_node_api_http_addr  = "' + this.config.check_node_api_http_addr + '"');
        }

        window.nodeFs.writeFileSync(tomlFile, tomlContent, {
            encoding: "utf8",
            flag: "w"
        })


    } else {



        this.emitter.emit('checkFail', 'wallet toml "' + tomlFile.replace(walletDir, '~') + '" file does not exist or readable');
        return false;
        //todo create a default new toml file


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

  async killWalletProcess(){

    let plist = await window.nodeFindProcess('name',/.*?epic-wallet.*(owner_api|listen)/);

    for(let walletProcess of plist) {
      let killed = await nodeChildProcess.kill(walletProcess.pid);

    }

    return true;
  }


  /* check if the select dir is a valid epic wallet dir */
  async walletDirExist(selectedDir, network){

      let walletDir = path.join(selectedDir, 'wallet_data');
      let tomlFile = path.join(selectedDir, this.walletTOMLName);
      let configFile = path.join(selectedDir, 'config.json');
      let walletDirSegements = selectedDir.split(path.sep).reverse();
      if(walletDirSegements.length <= 0){

        return false;
      }
      let userdata;

      if(!window.nodeFs.existsSync(walletDir)){
        return false;
      }
      if(!window.nodeFs.existsSync(tomlFile)){
        return false;
      }

      if(window.nodeFs.existsSync(configFile)){

        let config = this.loadConfig(configFile);
        if(config && config.version == '3.0.0'){

            let account = walletDirSegements[0];
            if(account == 'main' || account == 'floo'){
              account = 'default';
            }else{
              walletDirSegements.shift();
            }

            let networkShortname = walletDirSegements[0];
            network = config.network;
            if(networkShortname == 'main'){
              network = 'mainnet';
              walletDirSegements.shift();
            }else if(networkShortname == 'floo'){
              network = 'floonet';
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
          if(account == 'main' || account == 'floo'){
            account = 'default';
          }else{
            walletDirSegements.shift();
          }

          let networkShortname = walletDirSegements[0];
          if(networkShortname == 'main'){
            network = 'mainnet';
            walletDirSegements.shift();
          }else if(networkShortname == 'floo'){
            network = 'floonet';
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
        if(account == 'main' || account == 'floo'){
          account = 'default';
        }else{
          walletDirSegements.shift();
        }

        let networkShortname = walletDirSegements[0];
        if(networkShortname == 'main'){
          network = 'mainnet';
          walletDirSegements.shift();
        }else if(networkShortname == 'floo'){
          network = 'floonet';
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

    let appConfig = true;

    //this should never fail or app is not working
    this.appConfigFile = path.join(defaultAppConfigDir, '.epic', 'epic_3-0-0_config.json');
    if (!window.nodeFs.existsSync(this.appConfigFile)) {
      appConfig = false;
      //copy default config json to new wallet dir
      let defaultAppFile = path.join(window.config.getResourcePath(), "default.app.json");
      window.nodeFs.copyFileSync(defaultAppFile, this.appConfigFile);
      this.appConfig = {'account_dirs':[]}
    }else{

      let appConfigContent = window.nodeFs.readFileSync(this.appConfigFile, {encoding:'utf8', flag:'r'})

      try{
        this.appConfig = JSON.parse(appConfigContent);
        if(this.appConfig['account_dirs'].length <= 0){
          appConfig = false;
        }
      }catch(e){

        return false;
      }

    }

    return appConfig;

  }

  async startCheck(account, skip, selecteHomedir){


      let userHomedir = defaultUserdir;
      let defaultAccountWalletdir = '';
      let initWallet = false;
      /*if(!skip){
        await this.killWalletProcess();
      }*/
      //this fails if user create a wallet without default name
      if(account){
            this.appConfig['account_dirs'].forEach(function(existingAccount){
                if(existingAccount['account'] == account && existingAccount['userhomedir'] != ''){
                  userHomedir = existingAccount['userhomedir'];
                  if(account == 'default'){
                    defaultAccountWalletdir = path.join(userHomedir, (existingAccount['network'] == 'mainnet' ? 'main' : 'floo'));

                  }else{
                    defaultAccountWalletdir = path.join(userHomedir, (existingAccount['network'] == 'mainnet' ? 'main' : 'floo'), existingAccount['account']);

                  }
                }
            });

      }else{
          this.appConfig['account_dirs'].forEach(function(existingAccount){
              if(existingAccount['isdefault'] && existingAccount['userhomedir'] != ''){
                userHomedir = existingAccount['userhomedir'];
                if(existingAccount['account'] == 'default'){
                  defaultAccountWalletdir = path.join(userHomedir, (existingAccount['network'] == 'mainnet' ? 'main' : 'floo'));
                }else{
                  defaultAccountWalletdir = path.join(userHomedir, (existingAccount['network'] == 'mainnet' ? 'main' : 'floo'), existingAccount['account']);

                }
              }
          });
      }


      await delay(sleepTime);

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



      await delay(sleepTime);

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
        await delay(sleepTime);


        this.config = this.loadConfig(this.configFile);


        await delay(sleepTime);

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
            this.apisecret = window.nodeFs.readFileSync(this.apiSecretPath, {encoding:'utf8', flag:'r'}).toString()

            this.emitter.emit('checkSuccess', 'node api secret "' + apiSecretFile.replace(defaultAccountWalletdir, '~') + '" file exist and readable');



        } else {
            this.emitter.emit('checkFail', 'node api secret "' + apiSecretFile.replace(defaultAccountWalletdir, '~') + '" file does not exist or readable');
        }

        await delay(sleepTime);

        //check if owner api secret file exist
        let ownerApiSecretFile = path.join(defaultAccountWalletdir, '.owner_api_secret');
        
        if (window.nodeFs.existsSync(ownerApiSecretFile) && window.nodeFs.readFileSync(ownerApiSecretFile, {encoding:'utf8', flag:'r'})) {

            this.ownerApiSecretPath = ownerApiSecretFile;
            this.ownerApisecret = window.nodeFs.readFileSync(this.ownerApiSecretPath, {encoding:'utf8', flag:'r'}).toString()


            this.emitter.emit('checkSuccess', 'owner api secret "' + ownerApiSecretFile.replace(defaultAccountWalletdir, '~') + '" file exist and readable');

        } else {
            this.emitter.emit('checkFail', 'owner api secret "' + ownerApiSecretFile.replace(defaultAccountWalletdir, '~') + '" file does not exist or readable');
        }
        await delay(sleepTime);


        this.walletTOMLPath = this.checkTomlFile(defaultAccountWalletdir);
        if(!this.walletTOMLPath){
          return 'toml';
        }

        this.defaultEpicNode = this.config['check_node_api_http_addr'] != '' ? this.config['check_node_api_http_addr'] : 'http://127.0.0.1'
        await delay(sleepTime);

        //check if we run the first time
        //make some settings
        if(this.config['firstTime']){
          this.accountExist(account);
          return 'settings'

        }

      }

      return 'login';

  }

}

export default ConfigService
