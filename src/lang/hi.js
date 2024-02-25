const messages = {
  msg: {

    title: '',
    password: 'पासवर्ड',
    passwordAgain: 'पासवर्ड फिर से दर्ज करें',
    wrongPassword: 'गलत पासवर्ड',
    login_: 'लॉग इन करें',
    continue: 'ऑफ़लाइन जारी रखें',
    logout: 'लॉग आउट करें',
    search: 'खोजें',
    clearup: 'साफ़ करें',
    close: 'बंद करें',
    jump: 'कूदें',
    error: 'कृपया करके इन गलतियों को सही करें):',
    confirmed: 'पुष्टि करें',
    ok: 'Ok',
    confirm: 'Confirm',
    confirm_action: 'Confirm action',
    unconfirmed: 'पुष्टिकरण की प्रतीक्षा',
    locked: 'बंद',
    send: 'भेजें',
    send_proof: 'send proof',
    dandelion: 'Dandelion++',
    dandelion_hint: 'Broadcasting transactions via Dandelion++',
    createofflinetx: 'Create offline transaction',
    cancel:'रद्द करें',
    save: 'सहेजें',
    delete: 'डिलीट',
    edit: 'संपादन करना',
    welcome: 'Epic वॉलेट में आपका स्वागत है',
    back: 'पीछे करें',
    reset: 'रीसेट करें',
    addall: 'सब ऊपर से जोड़ें',
    msg: 'संदेश',
    more: 'अधिक',
    wrongAddressFormat: 'गलत एड्रेस प्रारूप',
    node_server: 'नोड सर्वर',
    node_server_builtin: 'अंतर्निहित नोड सर्वर',
    node_server_external: 'बाहरी नोड सर्वर',
    node_server_address: 'नोड सर्वर एड्रेस',
    recipient_proof_address: 'प्राप्तकर्ता प्रमाण एड्रेस',
    copy_to_clipboard: 'क्लिपबोर्ड पर कॉपी!',
    placeholder_search: 'खोज...',
    refresh: 'ताज़ा करें',
    page_of: '{1} का पृष्ठ {0}',
    only_letter: 'a-z से केवल लोअर केस अक्षर,',
    custom_settings: 'कस्टम सेटिंग्स',
    advanced_settings: 'Advanced Settings',
    step_of: 'कदम {0}/{1}',
    close_all_process: 'Terminate all processes',
    waiting_for_nodesync: '... waiting for node to be synced.',

    menu:{
      general: 'सामान्य',
      dashboard: 'डैशबोर्ड',
      address_book: 'एड्रेस बुक',
      send: 'भेजें',
      finalize: 'ऑफ़लाइन लेन-देन को अंतिम रूप दें',
      receive: 'पाना',
      import: 'ऑफ़लाइन लेन-देन आयात करें',
      misc: 'विविध',
      about: 'हमारे बारे में',
      help: 'मदद करना',
      logout: 'लॉग आउट',
      account: 'खाता',
      settings: 'समायोजन',
      recheck: 'बैलेंस रीचेक करें',
      mnemonic: 'Mnemonic शब्द',
      run_setup: 'रन सेटअप सहायक',
      updates: 'अपडेट',
      openepichidden: 'Epic wallet location',
    },

    headerbar: {
      howdy: 'हाउडी,',
      version: 'संस्करण',
      peers: 'समकक्ष लोग',
      status: 'दर्जा',
      node: 'नोड',
      sync_height: 'सिंक ऊंचाई',
      progress: 'Progress',
      block_height: 'ब्लॉकचेन हाइट',
      node_sync_status: 'Internal node sync status',
    },
    dashboard:{
      transactions: 'लेनदेन',
      coins: 'सिक्के'
    },
    create:{
      select: 'अपने वॉलेट के लिए निर्देशिका का चयन करें',
      seedPhrase: 'सीड वाक्यांश',
      toNewMsg: 'एक नया वॉलेट बनाएँ.',
      newWallet: 'नया वॉलेट बनाएं',
      backupNote: 'महत्वपूर्ण! अपने वॉलेट को पुनर्स्थापित करने के लिए कृपया अपने बीज वाक्यांश का बैकअप लें',
      fatal_create: 'घातक: क्रिया "{0}" पर निर्मित विफल',
      fatal_update: 'घातक: ऐप कॉन्फ़िगरेशन अपडेट नहीं किया गया।'
    },

    setupwizard:{
      setup_assistant: 'सेटअप सहायक',
      account_information: 'खाते की जानकारी',
      your_name: 'आपका नाम',
      name_only_internal: 'नाम केवल आंतरिक उपयोग किया गया है',
      keybase: 'कीबेस',
      enter_keybase: 'यदि आपके पास कीबेस खाता है, तो आप यहां प्रवेश कर सकते हैं।',
      next_step: 'अगला कदम',
      network_node: 'नेटवर्क नोड',
      network_node_txt: `आपके वॉलेट को लेन-देन भेजने और प्राप्त करने के लिए एक नेटवर्क नोड की आवश्यकता होती है।<br/>
      आप अंतर्निर्मित नोड सर्वर और बाहरी नोड सर्वर के बीच चयन कर सकते हैं।<br/>
      <br/>
      यदि आप सुनिश्चित नहीं हैं कि किसका उपयोग करना है, तो सेटिंग को वैसे ही रहने दें जैसे वे हैं।<br/>`,
      previous_step: 'पिछला कदम',
      receive_transactions: 'लेन-देन प्राप्त करना',
      receive_transactions_txt: `अन्य वॉलेट्स से लेन-देन प्राप्त करने के लिए, आपका वॉलेट इंटरनेट पर सुलभ होना चाहिए।<br/>
      <br/>
      इस प्रक्रिया को आसान बनाने के लिए, हमने ngrok टूल को वॉलेट में एकीकृत किया है।<br/>
      एक बार ngrok सक्रिय हो जाने के बाद, आपका वॉलेट एक अस्थायी ngrok पते के माध्यम से पहुँचा जा सकेगा।<br/>
      यदि आप राउटर सेटिंग्स और पोर्ट फ़ॉरवर्डिंग से परिचित नहीं हैं, तो हम ngrok सेवा का उपयोग करने की सलाह देते हैं।<br/>
      <br/>
      अपना ngrok प्रमाणीकरण टोकन प्राप्त करने के लिए, कृपया ngrok.com पर एक नया खाता बनाएँ।<br/>
      <br/>
      <br/>
      यदि आप ngrok सेवा का उपयोग नहीं करना चाहते हैं, तो नीचे के खाने को खाली छोड़ दें।<br/>`,
      authtoken: 'आपका ngrok Authtoken',
      howto: 'ngrok से अपना Authtoken कैसे प्राप्त करें',
      values_correct: 'क्या ये मान सही हैं?',
      save_and_finish: 'सहेजें और समाप्त करें',
      name: 'नाम',
      keybase_account: 'कीबेस खाता',
      language: 'भाषा',
      ngrok_authtoken: 'Ngrok Auth-Token',
      db_fatal: 'DB घातक: DB सम्मिलित नहीं कर सकता',
      errors_save: 'उपयोगकर्ता सेटिंग सहेजने में त्रुटि: {0}',
      epicbox_domain: 'Epicbox Web Address',
      epicbox_off: 'turned off',
      epicbox_domain_hint: `Leave field blank if you don't want to use this service.`,
      noninteractive_transactions: `Intro to EPIC Addresses<br/>
      <br/>
      EPIC addresses provide an easy way to send EPIC when the receiving wallet is offline.<br/>
      <br/>
      This is accomplished securely and privately by using an external relay server called "Epicbox"<br/>
      Relay servers such as epicbox.epic.tech and others to come later are provided by our community.<br/>
      <br/>
      How it works:<br/>
      Transactions are sent to the Epicbox server and delivered to the recipient as soon as the receiver's wallet is online.<br/>
      <br/>The receiver signs the transaction and responds with a confirmation back to the sender which 'finalizes' the transaction if the sender is online.<br/>
      <br/>If both wallets are online when a transaction is created, the process takes place immediately.<br/>
      <br/>
      This system does not anonymize your IP and a VPN is recommended for IP address privacy.<br/>
      <br/>Transactions are fully encrypted which assures a private transaction exchanged between the sender and receiver.<br/>
      <br/>
      `,
    },
    transaction:{

      received: 'प्राप्त करें',
      send: 'भेजें',
      transaction_id: 'लेनदेन ID',
      creation_date: 'निर्माण तिथि',
      receiver: 'From/To',
      payment_proof: 'भुगतान का प्रमाण',
      amount: 'राशि (शुल्क)',
      status: 'Status',
      transfer_type: 'ट्रांसफर टाइप',
      id: 'ID',
      slate_id: 'स्लेट ID',
      confirmation_date: 'पुष्टि तिथि',
      amount_credited: 'जमा की गई राशि',
      amount_debited: 'काटी गई राशि',
      fee: 'शुल्क',
      message: 'संदेश',
      type: 'टाइप',
      receiver_address: 'प्राप्तकर्ता का एड्रेस',
      receiver_signature: 'प्राप्तकर्ता हस्ताक्षर',
      sender_address: 'भेजने वाले का एड्रेस',
      sender_signature: 'प्रेषक हस्ताक्षर',
      sender_address_path: 'प्रेषक एड्रेस पथ'

    },

    commit:{
      unspentCmt: 'अव्ययित आउटपुट',
      heightCreated: 'बनाए जाने पर ब्लॉक ऊंचाई',
      unspent: 'बिना खर्च',
      spent: 'खर्च किया गया',
      noCmtFound: 'कोई खर्च न हुआ आउटपुट कमिटमेंट नहीं मिला',
      noCmt:'बिना खर्च के आउटपुट कमिटमेंट नहीं',
      copied: 'कॉपी किया',
      unconfirmed: 'अपुष्ट',
      coins: 'सिक्के',
      coin_id: 'सिक्का ID',
      value: 'कीमत',
      status: 'स्टेट्स',
      copy: 'कमिट कॉपी'


    },
    account: {
      account: 'खाता',
      keybase: 'कीबेस',
      your_name: 'तुम्हारा  नाम',
      settings_saved: 'खाता सेटिंग सहेजी गई',
      error_save: 'त्रुटि बचत खाता'
    },
    addressbook:{
      name: 'नाम',
      country: 'देश',
      city: 'शहर',
      tor_onion_address: 'Tor-Onion एड्रेस',
      keybase_account: 'कीबेस खाता',
      external_one: 'बाहरी एड्रेस 1',
      external_two: 'बाहरी एड्रेस 2',
      proof_address: 'सबूत एड्रेस',
      notice: 'सूचना',
      send_always: 'हमेशा प्रमाण भेजें',
      deleted: 'एड्रेस हटा दिया गया!',
      error_delete: 'एड्रेस हटाने में त्रुटि!',
    },
    remove: {
      warning: 'चेतावनी',
      info: 'जानकारी',
      help: 'मदद करना',
      remove: 'हटाना',
      success: 'सफलता'
    },
    login: {
      listener_started: 'वॉलेट लीस्टेनर शुरू हो गया',
      error_listener_started: 'वॉलेट लीस्टेनर प्रारंभ करने में त्रुटि',
      tor_started: 'Tor शुरू कर दिया',
      error_tor_started: 'Tor शुरू नहीं हुआ'
    },
    seed:{
      errorGetMnemonic: 'Mnemonic प्राप्त करने में त्रुटि। क्या पासवर्ड सही है?',
      mnemonic: 'Mnemonic शब्द'
    },


    new:{
      create: 'नया वॉलेट बनाएं',
      restore: 'वॉलेट को पुनर्स्थापित करें',
      select: 'मौजूदा वॉलेट स्थान चुनें',
      selectErr: 'चयनित फ़ोल्डर में कोई "wallet_data" dir और वॉलेट कॉन्फ़िगरेशन नहीं है।',
      networkErr: 'नेटवर्क प्रकार निर्धारित नहीं किया जा सकता।<br/>कृपया एक चुनें।',
      selectNetwork: 'जारी रखें',
    },

    restore:{

      title: 'सीड वाक्यांश के माध्यम से वॉलेट को पुनर्स्थापित करें',
      addSeedsInfo: 'कृपया शब्द(शब्दों) पर क्लिक करके सीड वाक्यांश जोड़ें',
      yourSeedsInfo: 'आपका सीड वाक्यांश है',
      added: 'वॉलेट पुनर्प्राप्त करें',
      newPassword: 'एक नया पासवर्ड सेट करें',
      recover: 'वापस पाना',
      walletLocation: 'वॉलेट स्थान',
      search_placeholder: 'शब्दों को खोजने के लिए टाइप करें / या सीड वाक्यांश पेस्ट करें',
      create_new: 'नया खाता बनाएँ',
      change_seed: 'सीड शब्द बदलें',
      wallet_recovered: 'आपका वॉलेट बरामद हो गया है। कृपया लॉगिन करें और सेटअप पूरा करें।',
      recover_fail: 'फटल: कार्रवाई "{0}" पर पुनर्प्राप्ति विफल',
      fatal_app: 'फटल: ऐप कॉन्फ़िगरेशन अपडेट नहीं किया गया।'

    },

    app:{
      create: 'लेन-देन बनाएँ (फ़ाइल)',
      finalize: 'लेनदेन को अंतिम रूप दें (फ़ाइल)',
      httpSend: 'HTTP/HTTPS के ज़रिए भेजें',
      createRespFile: 'आयात लेनदेन (फ़ाइल)',
      httpReceive: 'HTTP/HTTPS के माध्यम से प्राप्त करें',
      height:'ब्लॉक ऊंचाई',
      updateTitle: 'नया संस्करण मिला',
      updateMsg: 'EPIC वॉलेट का नया संस्करण मिला। कृपया अभी अद्यतन करें।',
      yes: 'हां',
      no: 'नहीं',
      ngrok_service_started: 'Ngrok service started',
      ngrok_address_changed: 'Your ngrok address has changed',
      ngrok_service_stopped: 'Ngrok service stopped',
      ngrok_service_error: 'Error starting Ngrok service',
      error_setup_internal_node: 'Can not setup internal node server',
      node_started: 'Node started',
      node_restarting: 'Node is restarting',
      node_not_started: 'Node not started',
      node_offline: 'Node is offline',
      external_node_online: 'External Node is online',
      external_node_offline: 'External Node is offline',
      background_process: 'Please close all processes before continuing.',


    },

    info: {
      spendable: 'खर्च करने योग्य',
      total: 'बेलेंस',
      unfinalization: 'अपुष्ट',
      immature: 'अपरिपक्व'
    },

    txs:{
      tx: 'लेनदेन',
      canceled:'रद्द',
      noTxFound: 'कोई लेन-देन नहीं मिले',
      noTx:'कोई लेन-देन नहीं',
      cancelSuccess: 'यह लेन-देन रद्द',
    },



    fileSend:{
      sendAmount: 'भेजी जाने वाली राशि',
      createTxFile: 'लेन-देन बनाएँ',
      WrongAmount: 'ग़लत राशि',
      NotEnough: 'पर्याप्त बैलेंस नहीं',
      saveMsg: 'लेन-देन फ़ाइल सहेजें बनाया गया',
      CreateFailed: 'नई लेन-देन फ़ाइल बनाने में विफल',
      proof_address_recipient: 'गलत प्रमाण एड्रेस लंबाई',
    },

    httpSend:{
      sendAmount: 'भेजी जाने वाली राशि',
      address: 'प्राप्तकर्ता का एड्रेस',
      WrongAmount: 'ग़लत राशि',
      NotEnough: 'पर्याप्त बैलेंस नहीं।',
      WrongAddress: 'गलत एड्रेस',
      WrongTxData: 'लेनदेन बनाने में विफल',
      success: 'लेन-देन की सफलता',
      TxFailed: 'भेजें लेन-देन विफल',
      TxResponseFailed: 'प्राप्तकर्ता से सही प्रतिक्रिया प्राप्त करने में विफल',
      TxCreateFailed: 'लेनदेन बनाना विफल',
      salteVersion: 'स्लेट फ़ाइल संस्करण',
      salteVersionHelp: 'यदि आप epic भेजने में विफल रहे, तो स्लेट फ़ाइल संस्करण को बदलने का प्रयास करें और फिर से भेजें'
    },

    receive: {
      dropMsg: 'प्राप्त करने के लिए लेन-देन फ़ाइल छोड़ें या अपलोड करने के लिए क्लिक करें',
      WrongFileType: 'गलत लेन-देन फ़ाइल प्रकार',
      saveMsg: 'प्रतिक्रिया लेनदेन फ़ाइल सहेजें',
      CreateFailed: 'नई प्रतिक्रिया लेनदेन फ़ाइल बनाने में विफल',
      NoSavePlace: 'कृपया सहेजने के लिए स्थान चुनें',
      dragdrop: 'फ़ाइल को खींचें और छोड़ें',
      error_read: 'फ़ाइल सामग्री पढ़ने में त्रुटि',
      success: 'लेन-देन की सफलता',
    },

    finalize: {
      finalize: 'अंतिम रूप दें',
      success: 'लेन-देन की सफलता',
      ok: 'ठीक है',
      sending: 'भेजना',
      dropMsg: 'प्रतिक्रिया लेनदेन फ़ाइल को अंतिम रूप देने के लिए ड्रॉप करें या अपलोड करने के लिए क्लिक करें',
      WrongFileType: 'गलत लेन-देन फ़ाइल प्रकार',
      TxFailed: 'लेन - देन विफल',
      dragdrop: 'फ़ाइल को खींचें और छोड़ें',
      error_read: 'फ़ाइल सामग्री पढ़ने में त्रुटि'
    },

    httpReceive: {
      launchSucess: 'सफलतापूर्वक प्रारंभ',
      listening: "आपका वॉलेट इस पते के माध्यम से लेन-देन प्राप्त कर सकता है।",
      address: 'वॉलेट एड्रेस',
      reachableMsg2: 'सुनिश्चित करें कि आपका ip एड्रेस सार्वजनिक है और इंटरनेट द्वारा पहुंच योग्य है।',
      close: 'स्टॉप लीस्टेनर',
      attention: 'ध्यान',
      reachableMsg: 'ऑनलाइन लेन-देन प्राप्त करने के लिए, आपका वॉलेट लिस्टन मोड में शुरू होना चाहिए।',
      password: 'वॉलेट पासवर्ड (HTTP लिस्टन प्रारंभ करने के लिए प्रयुक्त)',
      start: 'शुरू',
      error: 'कोई पासवर्ड नहीं।',
      failed: 'प्रारंभ विफल, शायद गलत पासवर्ड',
      failed2: 'HTTP लिस्टन विफल, आपका सार्वजनिक ip इंटरनेट उपयोगकर्ता द्वारा पहुंच योग्य नहीं है। लेन-देन फ़ाइल का प्रयास करें',
      failed3: 'आपका सार्वजनिक ip प्राप्त करने में विफल; बाद में कोशिश करो',
      failed4: 'लीस्टेनर अब लोकलहोस्ट:3415 पर चल रहा है। हालाँकि आपका ip इंटरनेट उपयोगकर्ता द्वारा उपलब्ध नहीं है। लेन-देन फ़ाइल का प्रयास करें',
      ip: 'आपका सार्वजनिक ip',
      current_ngrok_address: 'Current Ngrok Address',
      local_address: 'Local address',
      session_end: 'You are using ngrok without an account. Your session will end in {0} hour, {1} minutes',
      tor_onion_address: 'Tor onion Address',
      proof_address: 'Proof Address',
      epicbox_address: 'Your public Epic address',
      your_qrcode: 'Your QRcode for your "{0}" address',
      click_qrcode_icon: 'Click the qr code icon',
      tor_not_available: 'Tor not available. Try to restart the wallet listener',
      epicbox_not_available: 'Epicbox not available. Wait for the Node to be synced or try to restart the wallet listener',
      epicbox_off: 'Your epicbox is not configured. Update your settings and define a epicbox domain',
      check_port_open_done: 'Recheck done!',
      listener_stopped: 'Wallet listener stopped',
    },

    check: {
      checking: 'री-चेकिंग, धैर्य रखें…',
      stop: 'स्टॉप चेक',
      introTitle: 'जानकारी',
      intro1: 'यह आपके वॉलेट से संबंधित अप्रयुक्त सिक्का आउटपुट के लिए पूरे ब्लॉकचेन को स्कैन करेगा।',
      start: 'शुरू',
      delete_unconfirmed: 'अपुष्ट सिक्का आउटपुट हटाएं',
      scan_finished: 'वॉलेट स्कैन समाप्त।',
      error_scan: 'त्रुटि प्रारंभ स्कैन। क्या पासवर्ड सही है?',
      scan_stop: 'वॉलेट स्कैन बंद हो गया।'

    },
    firstruncheck: {
      title: 'अपने वॉलेट आउटपुट के लिए ब्लॉकचेन स्कैन करें, धैर्य रखें…',
    },

    lang: {
      title: 'भाषा का चयन करें',
      lang: 'भाषा',
      select: 'चुनना'
    },

    settings: {
      title: 'सेटिंग',
      check_node_api_http_addr: 'नोड api एड्रेस',
      node_api_addr_hint: 'जहां वॉलेट को रनिंग नोड मिलना चाहिए',
      network: 'नेटवर्क',
      wallet_listener: 'वॉलेट लीस्टेनर',
      auto_start: 'लॉगिन के बाद स्वचालित रूप से वॉलेट listener प्रारंभ करें',
      authtoken: 'आपका Ngrok Authtoken',
      howto: 'ngrok से अपना Authtoken कैसे प्राप्त करें',
      settings_saved: 'सेटिंग्स को सहेजा गया',
      error_save: 'सेटिंग सहेजने में त्रुटि',
      ngrok_force_start: 'use ngrok without Authtoken',
      ngrok_hint: 'The ngrok address is active for 2 hours then gets renewed.',
      ngrok_account_hint: 'To receive your ngrok authentication token, please create a new account at https://ngrok.com',
      authtoken_hint: 'With a ngrok Authtoken, your address is active as long as the wallet is in listening mode',
      epicbox_domain: 'Epicbox Domain',
      epicbox_domain_hint: `The domain of the relay server, where your epicbox is connected to. Leave field blank if you don't want to use this service. Default: epicbox.epic.tech`,
      node_background: 'sync in background',
      node_background_hint: 'the built-in node server continues to sync in the background even when the app is closed. The next time you run the wallet, you do not have to wait for the synchronization with the blockchain.',
      epicbox_background: 'Run Epicbox listener in background',
      epicbox_background_hint: 'the Epicbox listener continues to listen for incoming transactions in background even when the app is closed.'

    },

    validators:{
      empty: '{0} फ़ील्ड आवश्यक है',
      equal: '{0} बराबर होना चाहिए',
      http_address: 'कोई मान्य HTTPS(S) एड्रेस नहीं',
      min_length: '{0} फ़ील्ड कम से कम {1} वर्ण लंबा होना चाहिए',
      only_letters: '{0} में a-z के केवल निचले अक्षर हो सकते हैं जिनमें कोई रिक्त स्थान नहीं है',
      number: '{0} फ़ील्ड एक संख्या होनी चाहिए',
      spendable: 'पर्याप्त शेष राशि नहीं',
      exist: 'खाता "{0}" पहले से मौजूद है',
      notexist: 'खाता "{0}" मौजूद नहीं है'
    }

  }
}
export default messages
