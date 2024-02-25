const messages = {
  msg: {

    title: '',
    password: 'Heslo',

    passwordAgain: 'Znovu vložte heslo',
    wrongPassword: 'Špatné heslo',
    login_: 'Přihlásit se',
    continue: 'Pokračovat offline',
    logout: 'Odhlásit se',
    search: 'Hledat',
    clearup: 'Vymazat',
    close: 'Zavřít',
    jump: 'Přeskočit',
    error: 'Prosím opravte následující chybu(y):',
    confirmed: 'Potvrzeno',
    unconfirmed: 'Čekám na potvrzení',
    locked: 'Uzamčeno',
    send: 'Posláno',
    send_proof: 'send proof',
    dandelion: 'Dandelion++',
    dandelion_hint: 'Broadcasting transactions via Dandelion++',
    createofflinetx: 'Create offline transaction',
    cancel:'Zrušit',
    ok: 'Ok',
    confirm: 'Confirm',
    confirm_action: 'Confirm action',
    save: 'Uložit',
    delete: 'Smazat',
    edit: 'Upravit',
    welcome: 'Vítejte v EPIC walletě',
    back: 'Zpět',
    reset: 'Reset',
    addall: 'Přidat vše shora',
    msg: 'Zpráva',
    more: 'Více',
    wrongAddressFormat: 'adresa má špatný formát',
    node_server: 'Node Server',
    node_server_builtin: 'Built-in node server',
    node_server_external: 'External node server',
    node_server_address: 'Adresa pro Node Server',
    recipient_proof_address: 'Proof adresa příjemce',
    copy_to_clipboard: 'Zkopírováno do schránky',
    placeholder_search: 'Vyhledat...',
    refresh: 'Obnovit',
    page_of: 'Strana {0} z {1}',
    only_letter: 'Pouze malá písmena od a-z,',
    custom_settings: 'Vlastní nastavení',
    advanced_settings: 'Advanced Settings',
    step_of: 'Krok {0}/{1}',
    close_all_process: 'Terminate all processes',
    waiting_for_nodesync: '... waiting for node to be synced.',
    menu:{
      general: 'Všeobecné',
      dashboard: 'Menu',
      address_book: 'Adresář',
      send: 'Poslat',
      finalize: 'Dokončit offline transakci',
      receive: 'Obdržet',
      import: 'Import offline transakce',
      misc: 'Různé',
      about: 'About',
      help: 'Pomoc',
      logout: 'Odhlásit se',
      account: 'Účet',
      settings: 'Nastavení',
      recheck: 'Znovu zkontrolovat zůstatek',
      mnemonic: 'Mnemonic slova',
      run_setup: 'Spustit asistenta nastavení',
      updates: 'Aktualizace',
      openepichidden: 'Epic wallet location',
    },

    headerbar: {
      howdy: 'Dobrý den,',
      version: 'Verze',
      peers: 'Peers',
      status: 'Status',
      node: 'Node',
      sync_height: 'Sync Height',
      progress: 'Progress',
      block_height: 'Blockchain Height',
      node_sync_status: 'Internal node sync status',
    },
    dashboard:{
      transactions: 'Transakce',
      coins: 'Coiny'
    },
    create:{
      select: 'Vyberte adresář pro data Vaší peněženky',
      seedPhrase: 'Seed Phrase',
      toNewMsg: 'Vytvořit novou peněženku.',
      newWallet: 'Vytvořit novou peněženku',
      backupNote: 'Důležité！Zálohujte si Seed Phrase, abyste mohli obnovit svou peněženku',
      fatal_create: 'Závažné: Selhání během akce "{0}"',
      fatal_update: 'Závažné: App config nebyl aktualizován.'
    },

    setupwizard:{
      setup_assistant: 'Asistent nastavení',
      account_information: 'Informace o účtu',
      your_name:'Vaše jméno',
      name_only_internal: 'Jméno je použito pouze interně',
      keybase: 'Keybase',
      enter_keybase: 'Pokud máte Keybase účet, můžete jej zadat zde',
      next_step: 'Další krok',
      network_node: 'Network node',
      network_node_txt: `Vaše peněženka vyžaduje network node k odeslání a příjímání transakcí.<br/>
      Můžete si vybrat mezi built-in node serverem a external node serverem .<br/>
      <br/>
      Pokud si nejste jisti, který z nich použít, ponechte nastavení tak, jak je.<br/>`,
      previous_step: 'Předchozí krok',
      receive_transactions: 'Příchozí transakce',
      receive_transactions_txt: `Abyste mohli přijímat transakce z jiných peněženek, musí být Vaše peněženka dostupná přes internet.<br/>
      <br/>
      Pokud nejste neumíte pracovat s nastavením routeru a přesměrováním portů, doporučujeme použít službu ngrok.<br/>
      Jakmile bude ngrok aktivován, Vaše peněženka bude přístupná prostřednictvím dočasné adresy ngrok.<br/>
      <br/>
      <br/>
      Nechte pole níže prázdné, pokud nechcete používat službu ngrok.`,
      authtoken: 'Váš ngrok Authtoken',
      howto: 'Jak získat Váš Authtoken z ngrok',
      values_correct: 'Jsou tyto hodnoty správné?',
      save_and_finish: 'Uložit a ukončit',
      name: 'Název',
      keybase_account: 'Keybase účet',
      language: 'Jazyk',
      ngrok_authtoken: 'ngrok Auth-Token',
      db_fatal: 'DB Fatal: nelze vložit DB',
      errors_save: 'Při ukládání uživatelských nastavení došlo k chybě: {0}',
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

      received: 'Přijato',
      send: 'Posláno',
      transaction_id: 'ID transakce',
      creation_date: 'Datum vzniku',
      receiver: 'From/To',
      payment_proof: 'Doklad o platbě',
      amount: 'Množství (poplatek)',
      status: 'Status',
      transfer_type: 'Typ převodu',
      id: 'ID',
      slate_id: 'Slate ID',
      confirmation_date: 'Datum potvrzení',
      amount_credited: 'Připsaná částka',
      amount_debited: 'Odečtená částka',
      fee: 'Poplatek',
      message: 'Zpráva',
      type: 'Typ',
      receiver_address: 'Adresa příjemce',
      receiver_signature: 'Podpis příjemce',
      sender_address: 'Adresa odesílatele',
      sender_signature: 'Podpis odesílatele',
      sender_address_path: 'Cesta adresy odesílatele'

    },

    commit:{
      unspentCmt: 'Nevyčerpané prostředky',
      heightCreated: 'Block height po vytvoření',
      unspent: 'Nevyčerpané',
      spent: 'Vyčerpáno',
      noCmtFound: 'Nebylo nalezeno žádné nevyčerpané potvrzení výstupu',
      noCmt:'Žádné nevyčerpané výstupní potvrzení',
      copied: 'Zkopírováno',
      unconfirmed: 'Nepotvrzeno',
      coins: 'Coiny',
      coin_id: 'Coin ID',
      value: 'Hodnota',
      status: 'Status',
      copy: 'Závazek zkopírován'


    },
    account: {
      account: 'Účet',
      keybase: 'Keybase účet',
      your_name: 'Vaše jméno',
      settings_saved: 'Nastavení účtu uloženo',
      error_save: 'Při ukládání účtu došlo k chybě'
    },
    addressbook:{
      name: 'Jméno',
      country: 'Země',
      city: 'Město',
      tor_onion_address: 'Tor-Onion adresa',
      keybase_account: 'Keybase účet',
      external_one: 'Externí adresa 1',
      external_two: 'Externí adresa 2',
      proof_address: 'Proof adresa',
      notice: 'Upozornění',
      send_always: 'vždy poslat proof',
      deleted: 'Adresa smazána!',
      error_delete: 'Chyba při mazání adresy!',
    },
    remove: {
      warning: 'Varování',
      info: 'Info',
      help: 'Pomoc',
      remove: 'Odstranit',
      success: 'Úspěch'
    },
    login: {
      listener_started: 'Wallet listener byl spuštěn',
      error_listener_started: 'Chyba při spouštění wallet listener',
      tor_started: 'Tor spuštěn',
      error_tor_started: 'Tor nespuštěn'
    },
    seed:{
      errorGetMnemonic: 'Chyba při získávání Mnemonic slov. Je heslo správné?',
      mnemonic: 'Mnemonic slova'
    },


    new:{
      create: 'Vytvořit novou peněženku',
      restore: 'Obnovit peněženku',
      select: 'Vyberte existující umístění dat peněženky',
      selectErr: 'Zvolená složka nemá žádný adresář "wallet_data" dir a wallet config.',
      networkErr: 'Nelze určit typ sítě.<br/>Vyberte prosím jednu.',
      selectNetwork: 'Pokračovat',
    },

    restore:{

      title: 'Obnovit peněženku skrze seed phrase',
      addSeedsInfo: 'Přidat seed phrase kliknutím na slovo(a)',
      yourSeedsInfo: 'Váš seed phrase je',
      added: 'Obnovit peněženku',
      newPassword: 'Nastavit nové heslo',
      recover: 'Obnovit',
      walletLocation: 'Umístění dat peněženky',
      search_placeholder: 'zadejte nová slova / nebo vložte seed phrase',
      create_new: 'Vytvořit nový účet',
      change_seed: 'Změnit seed slova',
      wallet_recovered: 'Vaše peněženka je obnovena. Přihlaste se a dokončete nastavení.',
      recover_fail: 'Závažné: obnovení se nezdařilo "{0}"',
      fatal_app: 'Závažné: Konfigurace aplikace není aktualizována.'

    },

    app:{
      create: 'Vytvořit transakci (soubor)',
      finalize: 'Dokončit transakci (soubor)',
      httpSend: 'Poslat skrze HTTP/HTTPS',
      createRespFile: 'Importovat transakci (soubor)',
      httpReceive: 'Obdržet skrze HTTP/HTTPS',
      height:'Block Height',
      updateTitle: 'Nalezena nová verze',
      updateMsg: 'Nalezena nová verze EPIC peněženky. Aktualizujte prosím hned TEĎ.',
      yes: 'ano',
      no: 'ne',

      ngrok_service_started: 'Služba Ngrok byla spuštěna',
      ngrok_address_changed: 'Vaše adresa ngrok se změnila',
      ngrok_service_stopped: 'Služba Ngrok zastavena',
      ngrok_service_error: 'Chyba při spouštění služby Ngrok',
      error_setup_internal_node: 'Nelze nastavit internal node server',
      node_started: 'Node spuštěn',
      node_not_started: 'Node nebyl spuštěn',
      node_offline: 'Node je offline',
      external_node_online: 'External node je online',
      external_node_offline: 'External node je offline',
      background_process: 'Našli jsme nějaké běžící procesy peněženky a uzlů na pozadí. Před spuštěním této aplikace je nejprve zavřete.',

    },

    info: {
      spendable: 'Utratitelné',
      total: 'Zůstatek',
      unfinalization: 'Nepotvrzeno',
      immature: 'Immature'
    },

    txs:{
      tx: 'Transakce',
      canceled:'Zrušeno',
      noTxFound: 'Nenalezena žádná transakce',
      noTx:'Žádné transakce',
      cancelSuccess:'Tato transakce byla zrušena',
    },



    fileSend:{
      sendAmount: 'Částka k odeslání',
      createTxFile: 'Vytvořte transakci',
      WrongAmount: 'Špatná částka',
      NotEnough: 'Nedostatečný zůstatek',
      saveMsg: 'Uložení vytvořeného souboru transakce',
      CreateFailed: 'Vytvoření nového transakčního souboru se nezdařilo',
      proof_address_recipient: 'Špatná délka proof adresy',
    },

    httpSend:{
      sendAmount: 'Množství k poslání',
      address:'Adresa příjemce',
      WrongAmount: 'Špatná částka',
      NotEnough: 'Nedostatečný zůstatek.',
      WrongAddress: 'Špatná adresa',
      WrongTxData: 'Transakci se nepodařilo vytvořit',
      success: 'Transakce proběhla v pořádku',
      TxFailed: 'Odeslání transakce se nezdařilo',
      TxResponseFailed: 'Nelze získat správnou odpověď od příjemce',
      TxCreateFailed: 'Vytvoření transakce se nezdařilo',
      salteVersion: 'Verze souboru Slate',
      salteVersionHelp: 'Pokud se vám nepodařilo odeslat EPICky, zkuste změnit verzi souboru Slate a poté jej znovu odešlete'
    },

    receive: {
      dropMsg: 'Přetáhněte transakční soubor do kolonky příjmout nebo kliknutím nahrajte',
      WrongFileType: 'Nesprávný typ souboru transakce',
      saveMsg: 'Uložení vytvořeného souboru transakce',
      CreateFailed: 'Vytvoření nového transakčního souboru se nezdařilo',
      NoSavePlace: 'Prosím vyberte místo uložení',
      dragdrop: 'Drag & drop soubor',
      error_read: 'Chyba při čtení obsahu souboru',
      success: 'Transakce proběhla v pořádku',
    },

    finalize: {
      finalize: 'Dokončit',
      success: 'Transakce proběhla v pořádku',
      ok:'OK',
      sending: 'Odesílání',
      dropMsg: 'Přetáhněte transakční soubor do kolonky příjmout nebo kliknutím nahrajte',
      WrongFileType: 'Nesprávný typ souboru transakce',
      TxFailed: 'Transakce selhala',
      dragdrop: 'Drag & drop soubor',
      error_read: 'Chyba při čtení obsahu souboru'
    },

    httpReceive: {
      launchSucess: 'Úspěšně zahájeno',
      listening: "Vaše peněženka může přijímat transakce prostřednictvím těchto adres.",
      address: 'Adresa peněženky',
      reachableMsg2: 'Ujistěte se, že Vaše IP adresa je veřejná a dostupná přes internet.',
      close: 'Stop listener',
      attention: 'Upozornění',
      reachableMsg: 'Chcete-li přijímat online transakce, musí být Vaše peněženka spuštěna v režimu listen mode.',
      password: 'Heslo peněženky (používá se ke spuštění HTTP listen) (used to start HTTP listen)',
      start: 'Start',
      error: 'Žádné heslo.',
      failed: 'Start se nezdařil, možná špatné heslo',
      failed2: 'HTTP listen selhalo, Vaše veřejná IP není pro uživatele internetu dostupná. Zkuste transakční soubor',
      failed3: 'Nepodařilo se získat Vaši veřejnou IP; Zkuste to později',
      failed4: 'Listener nyní běží na localhost:3415. Vaše ip však není pro uživatele internetu dostupná. Zkuste transakční soubor',
       ip: 'vaše veřejná ip',
      current_ngrok_address: 'Aktuální adresa Ngrok',
      local_address: 'Místní adresa',
      session_end: 'Používáte ngrok bez účtu. Vaše relace skončí za {0} h, {1} min',
      tor_onion_address: 'Tor onion adresa',
      proof_address: 'Proof adresa',
      epicbox_address: 'Your public Epic address',
      your_qrcode: 'Váš QR kód pro Vaši "{0}" adresu',
      click_qrcode_icon: 'Klikněte na ikonu QR kódu',
      tor_not_available: 'Tor není k dispozici. Zkuste restartovat listener peněženky',
      epicbox_not_available: 'Epicbox not available. Wait for the Node to be synced or try to restart the wallet listener',
      epicbox_off: 'Your epicbox is not configured. Update your settings and define a epicbox domain',
      check_port_open_done: 'Recheck done!',
      listener_stopped: 'Wallet listener stopped',
    },

    check: {
      checking: 'Opětovná kontrola, buďte trpěliví ...',
      stop: 'Zastavit kontrolu',
      introTitle: 'Info',
      intro1: 'Prohledá celý Blockchain a najde neutracené výstupy coinů, které patří do Vaší peněženky.',
      start: 'Start',
      delete_unconfirmed: 'Smažte nepotvrzené výstupy coinů',
      scan_finished: 'Skenování peněženky dokončeno.',
      error_scan: 'Chyba při spuštění skenování. Je heslo správné?',
      scan_stop: 'Kontrola peněženky byla zastavena.'

    },
    firstruncheck: {
      title: 'Skenuje blockchain pro výstupy z peněženky, buďte trpěliví ...',
    },

    lang: {
      title: 'Vyberte jazyk',
      lang: 'Jazyk',
      select: 'Vybrat'
    },

    settings: {
      title: 'Nastavení',
      check_node_api_http_addr: 'Node api adresa',
      node_api_addr_hint: 'kde by peněženka měla najít běžící node',
      network: 'Síť',
      wallet_listener: 'Wallet listener',
      auto_start: 'automaticky spustí listener peněženky po přihlášení',
      authtoken: 'Váš ngrok Authtoken',
      ngrok_force_start: 'Použijte ngrok bez Authtokenu',
      ngrok_hint: 'Adresa ngrok je aktivní 2 hodiny a poté se obnoví.',
      ngrok_account_hint: 'Chcete-li získat svůj ngrok Authtoken, vytvořte si nový účet na https://ngrok.com',
      authtoken_hint: 'S ngrok Authtokenem je Vaše adresa aktivní, dokud je peněženka v listening mode',
      howto: 'Jak získat svůj Authtoken od ngrok',
      settings_saved: 'Nastavení uloženo',
      error_save: 'Při ukládání nastavení došlo k chybě',
      epicbox_domain: 'Epicbox Domain',
      epicbox_domain_hint: `The domain of the relay server, where your epicbox is connected to. Leave field blank if you don't want to use this service. Default: epicbox.epic.tech`,

      node_background: 'sync in background',
      node_background_hint: 'the built-in node server continues to sync in the background even when the app is closed. The next time you run the wallet, you do not have to wait for the synchronization with the blockchain.',
      epicbox_background: 'Run Epicbox listener in background',
      epicbox_background_hint: 'the Epicbox listener continues to listen for incoming transactions in background even when the app is closed.'

    },

    validators:{
      empty: 'Pole {0} je povinné',
      equal: 'Hodnota {0} se musí rovnat',
      http_address: 'HTTP(S) adresa není platná',
      min_length: 'Pole {0} musí mít alespoň {1} znaků',
      only_letters: '{0} může mít pouze malá písmena od a-z bez mezer',
      number: 'Pole {0} musí být číslo',
      spendable: 'Nedostatečný zůstatek',
      exist: 'Účet "{0}" již existuje',
      notexist: 'Účet "{0}" neexistuje'
    }

  }
}
export default messages
