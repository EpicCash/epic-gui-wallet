const messages = {
  msg: {

    title: '',
    password: 'رمز Password',

    passwordAgain: 'رمز را دوباره تکرار کنید',
    wrongPassword: 'رمز اشتباه است',
    login_: 'ورود',
    continue: 'ادامه دادن بصورت آفلاین',
    logout: 'خروج',
    search: 'جستجو',
    clearup: 'پاک کردن',
    close: 'بستن',
    jump: 'پریدن',
    error: 'لطفا ایراد یا ایرادات زیر را اصلاح کنید:',
    confirmed: 'تائید شد',
    unconfirmed: 'در انتظار تائیدیه',
    locked: 'قفل شده',

    send: 'فرستادن',


    cancel:'لغو کردن',
    save: 'ذخیره',
    delete: 'پاک کردن',
    edit: 'ادیت',

    welcome: 'به کیف اپیک حوش آمدید',
    back: 'برگشتن',
    reset: 'شروع مجدد',
    addall: 'همه را از بالا اضافه کن Add all from above',
    msg: 'پیغام',
    more: 'بیشتر',
    wrongAddressFormat: 'فرم آدرس اشتباه',

    node_server: 'سرور گره Node Server',
    node_server_builtin: 'سرور نود داخلی کیف Built-in node server',
    node_server_external: 'سرور نود خارجی External node server',
    node_server_address: 'آدرس سرور گره یا نود Node Server Address',
    recipient_proof_address: 'آدرس گواهی دریافت کننده Recipient proof address',

    copy_to_clipboard: 'در کلیپ بورد کپی شد',
    placeholder_search: 'جستجو...',
    refresh: 'تازه کردن',
    page_of: 'Page {0} of {1}',
    only_letter: 'فقط حروف کوچک از a-z,',
    custom_settings: 'تنظیمات سفارشی',
    step_of: 'مرحله {0}/{1}',

    menu:{
      general: 'عمومی',
      dashboard: 'داشبورد',
      address_book: 'دفترچه آدرس',
      send: 'ارسال',
      finalize: 'تراکنش آفلاین را نهایی کنید',
      receive: 'دريافت كردن',
      import: 'واردات فایل تراکنش آفلاین',
      misc: 'متفرقه',
      about: 'درباره',
      help: 'کمک',
      logout: 'خروج',
      account: 'حساب',
      settings: 'تنظیمات',
      recheck: 'موجودی را دوباره بررسی کنید',
      mnemonic: 'کلمات یادآوری Mnemonic Words',
      run_setup: 'Run Setup Assistant',
      updates: 'به روز رسانی ها'
    },

    headerbar: {
      howdy: ' سلام,',
      version: 'نسخه',
      peers: 'همتایان سا جفت ها',
      status: 'وضعیت',
      node: 'گره Node',
      sync_height: 'همگام سازی ارتفاع',
      block_height: 'ارتفاع بلاک چین'
    },
    dashboard:{
      transactions: 'تراکنشها یا معاملات',
      coins: 'سکه ها'
    },
    create:{
      select: 'یک پوشه برای داده های کیف پول خود انتخاب کنید',
      seedPhrase: 'عبارات بازیابی Seed Phrase',
      toNewMsg: 'یک کیف پول جدید ایجاد کنید.',
      newWallet: 'کیف پول جدید ایجاد کنید',
      backupNote: 'مهم! لطفاً از عبارت بازیابی خود برای بازیابی کیف پول خود نسخه پشتیبان تهیه کنید',
      fatal_create: 'حیاتی: شکست در عمل ایجاد شده است Fatal: created fail on action "{0}"',
      fatal_update: 'حیاتی: پیکربندی برنامه به‌روزرسانی نشد '
    },

    setupwizard:{
      setup_assistant: 'دستیار تنظیم',
      account_information: 'اطلاعات حساب',
      your_name:'نام شما',
      name_only_internal: 'نام فقط در داخل کیف شمااستفاده می شود',
      keybase: 'Keybase',
      enter_keybase: 'اگر یک حساب اپلیکیشن چت کیبیس دارید، می توانید آن را در اینجا وارد کنید.',
      next_step: 'مرجله بعد',
      network_node: 'نود شبکه',
      network_node_txt: `کیف پول شما به یک نود شبکه برای ارسال و دریافت تراکنش ها نیاز دارد<br/>
      می توانید بین سرور نود داخلی و سرور نود خارجی یکی را انتخاب کنید<br/>
      <br/>
      اگر مطمئن نیستید که از کدام یک استفاده کنید، تنظیمات را همانطور که هستند رها کنید<br/>`,
      previous_step: 'مرحله قبلی',
      receive_transactions: 'درحال دریافت تراکنش',
      receive_transactions_txt: `برای دریافت تراکنش از کیف پول های دیگر، کیف پول شما باید از طریق اینترنت قابل دسترسی باشد<br/>
      <br/>
      اگر با تنظیمات روتر و ارسال پورت آشنایی ندارید، استفاده از سرویس ngrok را به شما توصیه می کنیم<br/>
      Once ngrok has been activated, your wallet will be accessible via a temporary ngrok address.<br/>
      <br/>
      <br/>
      Leave the fields below blank if you don’t want to use the ngrok service.`,
      authtoken: 'Your ngrok Authtoken',
      howto: 'How to get your Authtoken from ngrok',
      values_correct: 'Are these values correct?',
      save_and_finish: 'Save and finish',
      name: 'Name',
      keybase_account: 'Keybase Account',
      language: 'Language',
      ngrok_authtoken: 'ngrok Auth-Token',
      db_fatal: 'DB Fatal: can not insert DB',
      errors_save: 'Error saving user settings: {0}'
    },
    transaction:{

      received: 'Received',
      send: 'Send',
      transaction_id: 'Transaction ID',
      creation_date: 'Creation date',
      receiver: 'Receiver',
      payment_proof: 'Payment proof',
      amount: 'Amount (fee)',
      status: 'Status',
      transfer_type: 'Transfer Type',
      id: 'ID',
      slate_id: 'Slate ID',
      confirmation_date: 'Confirmation date',
      amount_credited: 'Amount credited',
      amount_debited: 'Amount debited',
      fee: 'Fee',
      message: 'Message',
      type: 'Type',
      receiver_address: 'Receiver address',
      receiver_signature: 'Receiver signature',
      sender_address: 'Sender address',
      sender_signature: 'Sender signature',
      sender_address_path: 'Sender address path'

    },

    commit:{
      unspentCmt: 'Unspent outputs',
      heightCreated: 'Block height when Created',
      unspent: 'Unspent',
      spent: 'Spent',
      noCmtFound: 'No Unspent output commit found',
      noCmt:'No unspent output commit',
      copied: 'Copied',
      unconfirmed: 'Unconfirmed',
      coins: 'Coins',
      coin_id: 'Coin ID',
      value: 'Value',
      status: 'Status',
      copy: 'Commit copied'


    },
    account: {
      account: 'Account',
      keybase: 'Keybase',
      your_name: 'Your name',
      settings_saved: 'Account settings saved',
      error_save: 'Error saving account'
    },
    addressbook:{
      naem: 'Name',
      country: 'Country',
      city: 'City',
      tor_onion_address: 'Tor-Onion Address',
      keybase_account: 'Keybase Account',
      external_one: 'External Address 1',
      external_two: 'External Address 2',
      proof_address: 'Proof Address',
      notice: 'Notice',
      send_always: 'send always proof',
      deleted: 'Address deleted!',
      error_delete: 'Error delete address!',
    },
    remove: {
      warning: 'Warning',
      info: 'Info',
      help: 'Help',
      remove: 'Remove',
      success: 'Success'
    },
    login: {
      listener_started: 'Wallet listener started',
      error_listener_started: 'Error starting wallet listener',
      tor_started: 'Tor started',
      error_tor_started: 'Tor not started'
    },
    seed:{
      errorGetMnemonic: 'Error getting Mnemonic. Is password correct?',
      mnemonic: 'Mnemonic Words'
    },


    new:{
      create: 'Create new wallet',
      restore: 'Restore wallet',
      select: 'Select existing wallet data location',
      selectErr: 'selected folder has no "wallet_data" dir and wallet config.',
      networkErr: 'Network type can not be determined.<br/>Please select one.',
      selectNetwork: 'continue',
    },

    restore:{

      title: 'Restore wallet via seed phrase',
      addSeedsInfo: 'Add seed phrase by clicking the word(s) please',
      yourSeedsInfo: 'Your seed phrase is',
      added: 'Recover wallet',
      newPassword: 'Set a new password',
      recover: 'Recover',
      walletLocation: 'Wallet data location',
      search_placeholder: 'type to search words / or paste seed phrase',
      create_new: 'Create new account',
      change_seed: 'Change seed words',
      wallet_recovered: 'Your wallet is recoverd. Please login and finish the setup.',
      recover_fail: 'Fatal: recover failed on action "{0}"',
      fatal_app: 'Fatal: App config not updated.'

    },

    app:{
      create: 'Create transaction (File)',
      finalize: 'Finalize transaction (File)',
      httpSend: 'Send via HTTP/HTTPS',
      createRespFile: 'Import transaction (File)',
      httpReceive: 'Receive via HTTP/HTTPS',
      height:'Block Height',
      updateTitle: 'Found new version',
      updateMsg: 'Found new version of EPIC wallet. Please update Right NOW.',
      yes: 'yes',
      no: 'no',

      ngrok_service_started: 'Ngrok service started',
      ngrok_address_changed: 'Your ngrok address has changed',
      ngrok_service_stopped: 'Ngrok service stopped',
      ngrok_service_error: 'Error starting Ngrok service',
      error_setup_internal_node: 'Can not setup internal node server',
      node_started: 'Node started',
      node_not_started: 'Node not started',
      node_offline: 'Node is offline',
      external_node_online: 'External Node is online',
      external_node_offline: 'External Node is offline',
      background_process: 'We found some running wallet and node processes in the background. Please close them first before you run this App.',

    },

    info: {
      spendable: 'Spendable',
      total: 'Balance',
      unfinalization: 'Unconfirmed',
      immature: 'Immature'
    },

    txs:{
      tx: 'Transactions',
      canceled:'Canceled',
      noTxFound: 'No transactions Found',
      noTx:'No transactions',
      cancelSuccess:'This transaction canceled',
    },



    fileSend:{
      sendAmount: 'Amount to send',
      createTxFile: 'Create transaction',
      WrongAmount: 'Wrong amount',
      NotEnough: 'Not enough balance',
      saveMsg: 'Save transaction file created',
      CreateFailed: 'Failed to create new transaction file',
      proof_address_recipient: 'Wrong proof address length',
    },

    httpSend:{
      sendAmount: 'Amount to send',
      address:'Recipient Address',
      WrongAmount: 'Wrong amount',
      NotEnough: 'Not enough balance.',
      WrongAddress: 'Wrong address',
      WrongTxData: 'Failed to build transaction',
      success: 'Transaction success',
      TxFailed: 'Send transaction failed',
      TxResponseFailed: 'Failed to get right respose from receiver',
      TxCreateFailed: 'Create transaction failed',
      salteVersion: 'Slate file version',
      salteVersionHelp: 'If you failed to send EPIC, try changing the Slate file version then resend'
    },

    receive: {
      dropMsg: 'Drop transaction file to receive or click to upload',
      WrongFileType: 'Wrong transaction file type',
      saveMsg: 'Save response transaction file created',
      CreateFailed: 'Failed to create new response transaction file',
      NoSavePlace: 'Please choose the location to save',
      dragdrop: 'Drag & drop file',
      error_read: 'Error reading file content',
      success: 'Transaction success',
    },

    finalize: {
      finalize: 'Finalize',
      success: 'Transaction success',
      ok:'OK',
      sending: 'Sending',
      dropMsg: 'Drop response transaction file to finalize or click to upload',
      WrongFileType: 'Wrong transaction file type',
      TxFailed: 'transaction failed',
      dragdrop: 'Drag & drop file',
      error_read: 'Error reading file content'
    },

    httpReceive: {
      launchSucess: 'Started successfully',
      listening: "Your wallet can receive transactions through these addresses.",
      address: 'Wallet Address',
      reachableMsg2: 'Ensure your IP Address is public and reachable by the internet.',
      close: 'Stop listener',
      attention: 'Attention',
      reachableMsg: 'To receive online transactions, your wallet must be started in listen mode.',
      password: 'Wallet Password (used to start HTTP listen)',
      start: 'Start',
      error: 'No password.',
      failed: 'Start Failed, Maybe wrong password',
      failed2: 'HTTP listen failed, your public ip is not reachable by the internet user. Try transaction file',
      failed3: 'Failed to get your public ip; try again later',
      failed4: 'Listener is now running on localhost:3415. However your ip is not reachable by the internet user. Try transaction file',
      ip: 'your public ip',
      current_ngrok_address: 'Current Ngrok Address',
      local_address: 'Local address',
      session_end: 'You are using ngrok without an account. Your session will end in {0} hour, {1} minutes',
      tor_onion_address: 'Tor onion Address',
      proof_address: 'Proof Address',
      your_qrcode: 'Your QRcode for your "{0}" address',
      click_qrcode_icon: 'Click the qr code icon',
      tor_not_available: 'Tor not available. Try to restart the wallet listener'
    },

    check: {
      checking: 'Re-checking, be patient ...',
      stop: 'Stop Check',
      introTitle: 'Info',
      intro1: 'This will scan the entire Blockchain for the unspent coin outputs that belong to your wallet.',
      start: 'Start',
      delete_unconfirmed: 'Delete unconfirmed coin outputs',
      scan_finished: 'Wallet scan finished.',
      error_scan: 'Error start scan. Is password correct?',
      scan_stop: 'Wallet scan stopped.'

    },
    firstruncheck: {
      title: 'Scan blockchain for your wallet outputs, be patient ...',
    },

    lang: {
      title: 'Select language',
      lang: 'Language',
      select: 'Select'
    },

    settings: {
      title: 'Settings',
      check_node_api_http_addr: 'Node api address',
      node_api_addr_hint: 'where the wallet should find a running node',
      network: 'Network',
      wallet_listener: 'Wallet listener',
      auto_start: 'automatically start wallet listener after login',
      authtoken: 'Your ngrok Authtoken',
      ngrok_force_start: 'use ngrok without Authtoken',
      ngrok_hint: 'The ngrok address is active for 2 hours then gets renewed.',
      ngrok_account_hint: 'To receive your ngrok authentication token, please create a new account at https://ngrok.com',
      authtoken_hint: 'With a ngrok Authtoken, your address is active as long as the wallet is in listening mode',
      howto: 'How to get your Authtoken from ngrok',
      settings_saved: 'Settings saved',
      error_save: 'Error saving settings'
    },

    validators:{
      empty: 'The {0} field is required',
      equal: 'The {0} must be equal',
      http_address: 'No valid HTTP(S) Address',
      min_length: 'The {0} field must be at least {1} characters long',
      only_letters: 'The {0} can have only lower letters from a-z with no spaces',
      number: 'The {0} field must be a number',
      spendable: 'Not enough balance',
      exist: 'The account "{0}" already exists',
      notexist: 'The account "{0}" does not exist'
    }

  }
}
export default messages
