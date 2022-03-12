const messages = {
  msg: {
    title: '',
    password: 'Password',
    account: 'Account',
    passwordAgain: 'Enter password again',
    wrongPassword: 'Wrong password',
    login_: 'Login',
    logout: 'Logout',
    search: 'Search',
    clearup: 'Clear',
    jump: 'Jump',

    confirmed: 'Confirmed',
    unconfirmed: 'Unconfirmed',
    locked: 'Locked',

    send: 'Send',
    receive: 'Receive',

    cancel:'Cancel',
    save: 'Save',

    welcome: 'Welcome to Epic wallet',
    back: 'Back',
    reset: 'Reset',
    addall: 'Add all from above',
    msg: 'Message',
    more: 'More',
    wrongAddressFormat: 'wrong address format',
    remove: {
      warning: 'Warning',
      info: 'Info',
      help: 'Help',
      remove: 'Remove',
      success: 'Success'
    },
    login: {
      walletExist: 'Epic wallet data exists; login with original password :)',
      errorPasswdEmpty: 'No password.',
    },
    seed:{
      errorGetMnemonic: 'Error getting Mnemonic. Is password correct?',
      mnemonic: 'Mnemonic Words'
    },
    create:{
      seedPhrase: 'Seed Phrase',
      toNewMsg: 'Create a New Wallet.',
      newWallet: 'Create new wallet',
      backupNote: 'Import！Please backup your seed phrase to restore your wallet',
      backupFinish: 'Ok, I backed up my seed phrase. Login my wallet',
      errorPasswdEmpty: 'Password cannot be empty',
      errorPasswdConsistency: 'Please enter the same password',
      errorCreateFailed: 'Error when try to create new wallet.',
      errorAccountEmpty: 'Account cannot be empty',
      errorAccountExist: 'Account already exist'
    },

    new:{
      create: 'Create new wallet',
      restore: 'Restore wallet',
      select: 'Select existing wallet location',
      selectErr: 'selected folder has no "wallet_data" dir and wallet config.',
      networkErr: 'Network type can not be determined.<br/>Please select one.',
      selectNetwork: 'continue',
    },

    restore:{
      seedPhrase: 'Seed Phrase',
      title: 'Restore wallet via seed phrase',
      addSeedsInfo: 'Add seed phrase one by one please',
      add: 'Add',
      invalid: 'Invalid Seed Phrase',
      delete: 'Delete',
      added: 'Finish enter seed phrase',
      newPassword: 'Set a new password',
      recover: 'Recover',
      reAdd: 'Re-enter seed phrase ',
      recovered: 'Wallet recovered, it is time to check balance from Epic blockchain',
      restoring: 'It will take 10-30 minites to finish check. Be patient ......',
      restored: 'Wallet successfully recovered.',
      login: 'Login to Wallet',
    },

    app:{
      create: 'Create transaction (File)',
      finalize: 'Finalize transaction (File)',
      httpSend: 'Send via HTTP/HTTPS',
      createRespFile: 'Import transaction (File)',
      httpReceive: 'Receive via HTTP/HTTPS',
      height:'Block Height',
      updateTitle: 'Found new version',
      updateMsg: 'Found new version of Epic wallet. Please update Right NOW.',
      yes: 'yes',
      no: 'no',
      hedwig: 'Receive via Hedwig'
    },

    info: {
      spendable: 'Spendable',
      total: 'Total Balance',
      unfinalization: 'Unfinalized',
      immature: 'Immature'
    },

    txs:{
      tx: 'Transactions',
      canceled:'Canceled',
      noTxFound: 'No transactions Found',
      noTx:'No transactions',
      cancelSuccess:'This transaction canceled',
    },

    commit:{
      unspentCmt: 'Unspent outputs',
      heightCreated: 'Block height when Created',
      unspent: 'Unspent',
      spent: 'Spent',
      noCmtFound: 'No Unspent output commit found',
      noCmt:'No unspent output commit',
      copied: 'Copied'
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
      address:'Address',
      WrongAmount: 'Wrong amount',
      NotEnough: 'Not enough balance.',
      WrongAddress: 'Wrong address',
      WrongTxData: 'Failed to build transaction',
      success: 'Transaction success',
      TxFailed: 'Send transaction failed',
      TxResponseFailed: 'Failed to get right respose from receiver',
      TxCreateFailed: 'Create transaction failed',
      salteVersion: 'Slate file version',
      salteVersionHelp: 'If you failed to send epic, try change the Slate file version then resend'
    },

    fileReceive: {
      dropMsg: 'Drop transaction file received',
      WrongFileType: 'Wrong transaction file type',
      saveMsg: 'Save response transaction file created',
      CreateFailed: 'Failed to create new response transaction file',
      NoSavePlace: 'Please choose the location to save',
    },

    finalize: {
      finalize: 'Finalize',
      success: 'Transaction success',
      ok:'OK',
      sending: 'Sending',
      dropMsg: 'Drop response transaction file to finalize',
      WrongFileType: 'Wrong transaction file type',
      TxFailed: 'transaction failed',
    },

    httpReceive: {
      launchSucess: 'Started successfully',
      listening: "Wallet's HTTP listen is running",
      address: 'Wallet Address',
      reachableMsg2: 'Ensure your IP Address is public and reachable by the internet.',
      close: 'Stop listener',
      attention: 'Attention',
      reachableMsg: 'To start HTTP listen, you should have public ip, which is reachable by internet user.',
      password: 'Wallet Password (used to start HTTP listen)',
      start: 'Start',
      error: 'No password.',
      failed: 'Start Failed, Maybe wrong password',
      failed2: 'HTTP listen failed, your public ip is not reachable by the internet user. Try transaction file',
      failed3: 'Failed to get your public ip; try it later',
      failed4: 'Listener is now running on localhost:3415. However your ip is not reachable by the internet user. Try transaction file',
      ip: 'your public ip'
    },

    hedwig: {
      title: 'Receive via Hedwig(v1)',
      launchSucess: 'Started successful',
      reachable: 'Hedwig address is available',
      address: 'Address to receive',
      tip:'Please keep wallet online.',
      close: 'Stop Hedwig',
      introTitle: 'Introduction',
      intro1: 'Hedwig(v1) is a relay service for users without a public ip. It provides a temporary address to receive epic.',
      intro2: 'When someone send epic to the address, Hedwig(v1) will forward the send request to your wallet. So you will get your epic.',
      start: 'Start',
      failed: 'Error when try to connect Hedwig server, try it latter maybe',
      failed2: 'Error when test Hedwig address, try it later maybe or restart wallet.',
      failed3: 'Failed to start local epic receive service, try it later maybe or restart wallet.',
      copy: 'copy address',
      copied: 'address was copied in clipboard'
    },

    check: {
      title: 'Recheck balance',
      checking: 'Re-checking, be patient ...',
      stop: 'Stop Check',

      tip:'... continue?',
      introTitle: 'Info',

      intro1: 'This will scan the entire Blockchain for the unspent outputs that belongs to your wallet.',
      intro2: "",

      start: 'Start',
      stopCheckMsg: 'Check was cancelled',
      checkedMsg: 'Check balance finished'
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
      network: 'Network'
    }

  }
}
export default messages
