/* check required files and folder on on app start */
const defaultUserdir = 'does not exist';//window.config.getUserHomedir();
const path = window.nodePath;
const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
const sleepTime = 50;


class ConfigService {

  constructor(emitter) {
      this.emitter = emitter;

      //where to find accounts and wallet data
      this.userhomedir = '';

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
      //this should never fail or app is not working
      this.appConfigFile = path.join(window.config.getResourcePath(), 'app.json');
      let appConfigContent = window.nodeFs.readFileSync(this.appConfigFile, {encoding:'utf8', flag:'r'})
      this.appConfig = JSON.parse(appConfigContent);

  }
  async saveConfig(){

    let configSaved = true;
    await window.nodeFs.writeFileSync(this.configFile, JSON.stringify(this.config), {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    }, function(err) {
      if(err) configSaved = false;
    });
    return configSaved;
  }

  async updateConfig(data){
    for(var key in data){
      this.config[key] = data[key]
    }
    return await this.saveConfig();
  }

  async saveAppConfig(){

    let configSaved = true;
    await window.nodeFs.writeFileSync(this.appConfigFile, JSON.stringify(this.appConfig), {
        encoding: "utf8",
        flag: "w",
        mode: 0o666
    }, function(err) {
      if(err) configSaved = false;
    });
    return configSaved;
  }

  /* save only default user paths here */
  async updateAppConfig(configKey, userdata){

      let data = userdata;
      let appConfig = this.appConfig;
      if(appConfig[configKey]){
        appConfig[configKey].forEach(function(element, key){
          if(appConfig[configKey][key].account == data.account){
            appConfig[configKey][key].userhomedir = data.userhomedir;
            appConfig[configKey][key].network = data.network;
            appConfig[configKey][key].isdefault = data.isdefault;
            return false;
          }else{
            appConfig[configKey].push(userdata)
          }
        });
      }

      this.appConfig = appConfig;
      return await this.saveAppConfig();
  }

  async startCheck(account){

      let userHomedir =  defaultUserdir;
      let defaultAccountWalletdir = '';


      if(account){
        this.appConfig['account_dirs'].forEach(function(existingAccount){
            if(existingAccount['account'] == account && existingAccount['userhomedir'] != ''){
              userHomedir = existingAccount['userhomedir'];
              defaultAccountWalletdir = path.join(userHomedir, (existingAccount['network'] == 'mainnet' ? 'main' : 'floo'), existingAccount['account'])
            }
        });
      }else{
        this.appConfig['account_dirs'].forEach(function(existingAccount){
            if(existingAccount['isdefault'] && existingAccount['userhomedir'] != ''){
              userHomedir = existingAccount['userhomedir'];
              defaultAccountWalletdir = path.join(userHomedir, (existingAccount['network'] == 'mainnet' ? 'main' : 'floo'), existingAccount['account'])
            }
        });
      }
      console.log('defaultAccountWalletdir', defaultAccountWalletdir);



      let initWallet = false;
      await delay(sleepTime);


      //check if user home dir exist.
      //if home dir is not found then user have to select one
      if (window.nodeFs.existsSync(userHomedir)) {
          this.emitter.emit('checkSuccess', 'user homedir exist');
      } else {
          initWallet = true;
          this.emitter.emit('checkFail', 'user homedir does not exist');
          let customHomedir = await window.api.showOpenDialog();
          if(customHomedir.canceled == false){

            userHomedir = customHomedir.filePaths[0];
            if(userHomedir){
              this.emitter.emit('checkSuccess', 'user homedir selected');
            }

          }else{
            this.emitter.emit('checkFail', 'please select a folder for your wallet data');
            return false;
          }

      }
      this.userhomedir = userHomedir;
      this.defaultAccountWalletdir = defaultAccountWalletdir;
      console.log('this.defaultAccountWalletdir ', this.defaultAccountWalletdir );
      await delay(sleepTime);

      //check if config file exist
      let configFile = path.join(defaultAccountWalletdir, 'config.json');
      if (window.nodeFs.existsSync(configFile)) {
          this.emitter.emit('checkSuccess', 'wallet config file exist');
      } else {
          initWallet = true;
          this.emitter.emit('checkFail', 'wallet config file does not exist');
          //copy default config json to new wallet dir
          let defaultConfigFile = path.join(window.config.getResourcePath(), "default.config.json");

          window.nodeFs.copyFile(defaultConfigFile, configFile, (err) => {
            if (err){
              this.emitter.emit('checkFail', err);
            }
            this.emitter.emit('checkSuccess', 'default wallet config file created');
          });
      }
      this.configFile = configFile;
      await delay(sleepTime);
      
      //if we dont have any epic wallet data prompt user for init or recover a wallet
      if(initWallet){
          this.emitter.emit('checkSuccess', 'create new or recover wallet');
          return 'init'

      }else{


        let config;
        if(window.nodeFs.readFileSync(configFile, {encoding:'utf8', flag:'r'})){

          let configContent = window.nodeFs.readFileSync(configFile, {encoding:'utf8', flag:'r'});

          try {
            config = JSON.parse(configContent);
            this.emitter.emit('checkSuccess', 'wallet config readable');

          } catch (e) {
            this.emitter.emit('checkFail', 'Wallet config ' + e);
          }

        } else {
          this.emitter.emit('checkFail', 'wallet config is empty');
        }
        this.config = config;
        await delay(sleepTime);

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

        //



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

        //check if toml file exist
        let tomlFile = path.join(defaultAccountWalletdir, 'epic-wallet.toml');
        if (window.nodeFs.existsSync(tomlFile) && window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'})) {
            this.emitter.emit('checkSuccess', 'wallet toml "' + tomlFile.replace(defaultAccountWalletdir, '~') + '" file exist and readable');


            //rewrite some toml properties to work with owner_api lifecycle
          //  const re = /owner_api_include_foreign(\s)*=(\s)*false/
            const re2 = /data_file_dir(\s)*=(\s).*/

            let tomlContent = window.nodeFs.readFileSync(tomlFile, {encoding:'utf8', flag:'r'});
            //console.log('tomlContent', tomlContent);
            /*if(tomlContent.search(re) != -1){
                console.log('Enable ForeignApi to true')
                tomlContent = tomlContent.replace(re, 'owner_api_include_foreign = true')
            }*/

            if(tomlContent.search(re2) != -1){
                console.log('change wallet default path to ', this.userhomedir)
                tomlContent = tomlContent.replace(re2, 'data_file_dir = "' + this.userhomedir + '"')
            }

            window.nodeFs.writeFileSync(tomlFile, tomlContent, {
                encoding: "utf8",
                flag: "w",
                mode: 0o666
            })


        } else {
            this.emitter.emit('checkFail', 'wallet toml "' + tomlFile.replace(defaultAccountWalletdir, '~') + '" file does not exist or readable');
        }
        this.walletTOMLPath = tomlFile;



        this.defaultEpicNode = this.config['check_node_api_http_addr'] != '' ? this.config['check_node_api_http_addr'] : 'http://127.0.0.1'
        console.log('defaultEpicNode', this.defaultEpicNode);



        console.log('this.apisecret', this.apisecret);
        await delay(sleepTime);


        //check if we run the first time
        //make some settings
        if(this.config['firstTime']){

          return 'settings'


        }

      }


      console.log('config', this.config);


      return 'ok';

  }

}

export default ConfigService
