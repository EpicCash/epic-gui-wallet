const messages = {
  msg: {

    title: '',
    password: 'Password',
    passwordAgain: 'Enter password again',
    wrongPassword: 'Wrong password',
    login_: 'Login',
    continue: 'Continue offline',
    logout: 'Logout',
    search: 'Search',
    clearup: 'Clear',
    close: 'Close',
    jump: 'Jump',
    error: 'Please correct the following error(s):',
    confirmed: 'Confirmed',
    unconfirmed: 'Awaiting confirmation',
    locked: 'Locked',
    send: 'Send',
    send_proof: 'send proof',
    dandelion: 'Dandelion++',
    dandelion_hint: 'Broadcasting transactions via Dandelion++',
    createofflinetx: 'Create offline transaction',
    cancel: 'Cancel',
    ok: 'Ok',
    confirm: 'Confirm',
    confirm_action: 'Confirm action',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    welcome: 'Welcome to EPIC wallet',
    back: 'Back',
    reset: 'Reset',
    addall: 'Add all from above',
    msg: 'Message',
    more: 'More',
    wrongAddressFormat: 'wrong address format',
    node_server: 'Node Server',
    node_server_builtin: 'Built-in node server',
    node_server_external: 'External node server',
    node_server_address: 'Node Server Address',
    recipient_proof_address: 'Recipient proof address',
    copy_to_clipboard: 'Copied to clipboard!',
    placeholder_search: 'Search...',
    refresh: 'Refresh',
    page_of: 'Page {0} of {1}',
    only_letter: 'Only lower case letters from a-z,',
    custom_settings: 'Custom settings',
    advanced_settings: 'Advanced Settings',
    step_of: 'Step {0}/{1}',
    close_all_process: 'Terminate all processes',

    waiting_for_nodesync: '... waiting for node to be synced.',
    menu:{
      general: 'General',
      dashboard: 'Dashboard',
      address_book: 'Address Book',
      send: 'Send',
      finalize: 'Finalize offline transaction',
      receive: 'Receive',
      import: 'Import offline transaction',
      misc: 'Misc',
      about: 'About',
      help: 'Help',
      logout: 'Log out',
      account: 'Profile',
      settings: 'Settings',
      recheck: 'Recheck Balance',
      mnemonic: 'Mnemonic Words',
      run_setup: 'Run Setup Assistant',
      updates: 'Updates',
      openepichidden: 'Epic wallet location',
    },
    headerbar: {
      howdy: 'Howdy,',
      version: 'Version',
      peers: 'Peers',
      status: 'Status',
      node: 'Node',
      sync_height: 'Sync Height',
      progress: 'Progress',
      block_height: 'Blockchain Height',
      node_sync_status: 'Internal node sync status',
    },
    dashboard:{
      transactions: 'Transactions',
      coins: 'Coins'
    },
    create:{
      select: 'Select a directory for your wallet data',
      seedPhrase: 'Seed Phrase',
      toNewMsg: 'Create a New Wallet.',
      newWallet: 'Create new wallet',
      backupNote: 'Important！Please backup your seed phrase to restore your wallet',
      fatal_create: 'Fatal: created fail on action "{0}"',
      fatal_update: 'Fatal: App config not updated.'
    },
    setupwizard:{
      setup_assistant: 'Setup Assistant',
      account_information: 'Account information',
      your_name:'Your name',
      name_only_internal: 'Name is only internally used',
      keybase: 'Keybase',
      enter_keybase: 'If you have a Keybase Account, you can enter it here.',
      next_step: 'Next step',
      network_node: 'Network node',
      network_node_txt: `Your wallet requires a network node to send and receive transactions.<br/>
      You can choose between the built-in node server and an external node server.<br/>
      <br/>
      If you are not sure which one to use, then leave the settings as they are.<br/>`,
      previous_step: 'Previous step',
      receive_transactions: 'NEW Feature* Epic Address',
      receive_transactions_txt: `To receive transactions from other wallets, your wallet must be accessible over the Internet.<br/>
      <br/>
      If you are not familiar with router settings and port forwarding, we recommend using the ngrok service.<br/>
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
      errors_save: 'Error saving user settings: {0}',
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
      transaction_fee: 'Transaction fee',
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
      account: 'Profile',
      keybase: 'Keybase',
      your_name: 'Your name',
      settings_saved: 'Profile settings saved',
      error_save: 'Error saving profile settings'
    },
    addressbook:{
      name: 'Name',
      country: 'Country',
      city: 'City',
      tor_onion_address: 'Tor-Onion Address',
      keybase_account: 'Keybase Account',
      external_one: 'Epicbox Address',
      external_two: 'External Address',
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
      error_tor_started: 'Tor not started',
      epicbox_started: 'Epicbox started',
      error_epicbox_started: 'Error starting Epicbox',
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
      wallet_recovered: 'Your wallet is recovered. Please login and finish the setup.',
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
      node_restarting: 'Node is restarting',
      node_not_started: 'Node not started',
      node_offline: 'Node is offline',
      external_node_online: 'External Node is online',
      external_node_offline: 'External Node is offline',
      background_process: 'Please close all processes before continuing.',

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
      listening: "Your wallet can receive transactions through these addresses.",
      address: 'Wallet Address',
      close: 'Stop listener',
      attention: 'Attention',
      reachableMsg: 'To receive online transactions, your wallet must be started in listen mode.',
      start: 'Start',
      error: 'No password.',
      ip: 'your public ip',
      current_ngrok_address: 'Current Ngrok Address',
      local_address: 'Local address',
      session_end: 'You are using ngrok without an account. Your session will end in {0} hour, {1} minutes',
      tor_onion_address: 'Tor onion Address',
      proof_address: 'Proof Address',
      epicbox_address: 'Your public Epic address',
      your_qrcode: 'Your QRcode for your "{0}" address',
      click_qrcode_icon: 'Click the qr code icon',
      tor_not_available: 'Tor not available. Try to restart the wallet listener',
      epicbox_not_available: 'Epicbox not available. Try to restart the wallet listener',
      epicbox_off: 'Your epicbox is not configured. Update your settings and define a epicbox domain',
      check_port_open_done: 'Recheck done!',
      listener_stopped: 'Wallet listener stopped',
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
      auto_start: 'automatically start wallet listener and Epicbox after login',
      authtoken: 'Your ngrok Authtoken',
      ngrok_force_start: 'use ngrok without Authtoken',
      ngrok_hint: 'The ngrok address is active for 2 hours then gets renewed.',
      ngrok_account_hint: 'To receive your ngrok authentication token, please create a new account at https://ngrok.com',
      authtoken_hint: 'With a ngrok Authtoken, your address is active as long as the wallet is in listening mode',
      howto: 'How to get your Authtoken from ngrok',
      settings_saved: 'Settings saved',
      error_save: 'Error saving settings',
      epicbox_domain: 'Epicbox Domain',
      epicbox_domain_hint: `The domain of the relay server, where your epicbox is connected to. Leave field blank if you don't want to use this service. Default: epicbox.epic.tech`,

      node_background: 'sync in background',
      node_background_hint: 'the built-in node server continues to sync in the background even when the app is closed. The next time you run the wallet, you do not have to wait for the synchronization with the blockchain.',
      epicbox_background: 'Run Epicbox listener in background',
      epicbox_background_hint: 'the Epicbox listener continues to listen for incoming transactions in background even when the app is closed.'
    },
    validators:{
      empty: 'The {0} field is required',
      equal: 'The {0} must be equal',
      http_address: 'No valid HTTP(S) Address',
      epicbox_address: 'No valid Epicbox Address',
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
