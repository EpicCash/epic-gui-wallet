const messages = {
  msg: {

    title: 'Epic Cash',
    password: 'Парола',
    passwordAgain: 'Въведете паролата отново',
    wrongPassword: 'Грешна парола',
    login_: 'Вход',
    continue: 'Продължете офлайн',
    logout: 'Изход',
    search: 'Търсене',
    clearup: 'Изчисти',
    close: 'Затвори',
    jump: 'Скок',
    error: 'Моля поправете следните грешки:',
    confirmed: 'Потвърдено',
    unconfirmed: 'Изчаква потвърждение',
    locked: 'Заключено',
    send: 'Изпрати ',
    cancel:'Отмяна',
    ok: 'Ok',
    confirm: 'Confirm',
    confirm_action: 'Confirm action',
    save: 'Запази',
    delete: 'Изтрий',
    edit: 'Промени',
    welcome: 'Добре дошли в портфейла на EPIC',
    back: 'Назад',
    reset: 'Нулиране',
    addall: 'Добавяне на всички думи',
    msg: 'Съобщение',
    more: 'Още',
    wrongAddressFormat: 'грешен формат на адреса',
    node_server: 'Възлов Сървър',
    node_server_builtin: 'Вграден Възлов Сървър',
    node_server_external: 'Външен Възлов Сървър',
    node_server_address: 'Адрес на Сървъра',
    recipient_proof_address: 'Доказателствен адрес на получателя',
    copy_to_clipboard: 'Копирано!',
    placeholder_search: 'Търси...',
    refresh: 'Обнови',
    page_of: 'Страница {0} от {1}',
    only_letter: 'Само малки букви от a-z,',
    custom_settings: 'Персонални настройки',
    advanced_settings: 'Advanced Settings',
    step_of: 'Стъпка {0}/{1}',
    close_all_process: 'Terminate all processes',
    menu:{
      general: 'Общо',
      dashboard: 'Табло',
      address_book: 'Адресна книга',
      send: 'Изпрати',
      finalize: 'Завърши офлайн транзакция',
      receive: 'Получи',
      import: 'Импортиране на офлайн транзакция',
      misc: 'Друго',
      about: 'Относно',
      help: 'Помощ',
      logout: 'Изход',
      account: 'Акаунт',
      settings: 'Настройки',
      recheck: 'Проверка на баланса',
      mnemonic: 'Мнемонични думи',
      run_setup: 'Пускане на асистента за настройка',
      updates: 'Обновления',
      openepichidden: 'Epic wallet location',
    },

    headerbar: {
      howdy: 'Здравейте,',
      version: 'Версия',
      peers: 'Peers',
      status: 'Статус',
      node: 'Възел',
      sync_height: 'Синхронизирана височина',
      block_height: 'Блокчейн височина',
      node_sync_status: 'Internal node sync status',
    },
    dashboard:{
      transactions: 'Транзакции',
      coins: 'Монети'
    },
    create:{
      select: 'Изберете директория за вашите портфейлни данни',
      seedPhrase: 'Мнемонични думи',
      toNewMsg: 'Създайте нов портфейл.',
      newWallet: 'Създайте нов портфейл',
      backupNote: 'Важно ! Моля запазете вашите мнемонични думи на сигурно място, за да можете да възстановявате вашият портфейл!',
      fatal_create: 'Fatal: created fail on action "{0}"',
      fatal_update: 'Fatal: App config not updated.'
    },

    setupwizard:{
      setup_assistant: 'Асистент за Настройка',
      account_information: 'Информация за Акаунта',
      your_name:'Вашето Име',
      name_only_internal: 'Името се използва само вътрешно',
      keybase: 'Keybase',
      enter_keybase: 'Ако имате Keybase акаунт, можете да го въведете тук.',
      next_step: 'Следваща стъпка',
      network_node: 'Мрежов възел',
      network_node_txt: `Портфейлът се нуждае от мрежов възел (сървър), за да изпраща и получава транзакции.<br/>
      Можете да изберете между вграден сървър или външен такъв.<br/>
      <br/>
      Ако не сте сигурни кой да използвате, оставете настройките по подразбиране.<br/>`,
      previous_step: 'Предишна стъпка',
      receive_transactions: 'Получаване на транзакции',
      receive_transactions_txt: `За да получите транзакции от други портфейли, трябва да сте достъпни през интернет.<br/>
      <br/>
      Ако не сте запознати с настройките на рутера и отваряне на портове, препоръчваме да използвате услугата Ngrok.<br/>
      След като Ngrok се активира, портфейлът ви ше е достъпен през временен адрес.<br/>
      <br/>
      <br/>
      Оставете тези полета празни, ако не искате да използвате услугата Ngrok.`,
      authtoken: 'Вашият ngrok Authtoken',
      howto: 'Как да си набавите Authtoken от ngrok',
      values_correct: 'Верни ли са тези стойности?',
      save_and_finish: 'Запазване и завършване',
      name: 'Име',
      keybase_account: 'Keybase Акаунт',
      language: 'Език',
      ngrok_authtoken: 'ngrok Auth-Token',
      db_fatal: 'DB Fatal: can not insert DB',
      errors_save: 'Грешка при запазване на настройките: {0}',
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

      received: 'Получено',
      send: 'Изпрати',
      transaction_id: 'Номер на Транзакция',
      creation_date: 'Дата на създаване',
      receiver: 'Получател',
      payment_proof: 'Доказателство за плащане',
      amount: 'Стойонст (такса)',
      status: 'Статус',
      transfer_type: 'Тип Трансфер',
      id: 'Номер',
      slate_id: 'Slate Номер',
      confirmation_date: 'Дата на потвърждаване',
      amount_credited: 'Кредитирана сума',
      amount_debited: 'Дебитирана сума',
      fee: 'Такса',
      message: 'Съобщение',
      type: 'Тип',
      receiver_address: 'Адрес на получател',
      receiver_signature: 'Подпис на получател',
      sender_address: 'Адрес на подател',
      sender_signature: 'Подпис на подател',
      sender_address_path: 'Път към адреса на подателя'

    },

    commit:{
      unspentCmt: 'Непохарчена сума',
      heightCreated: 'Височина на блокчейна при създаване',
      unspent: 'Непохарчени',
      spent: 'Похарчени',
      noCmtFound: 'Не са открити непохарчени суми',
      noCmt:'Няма непохарчени суми',
      copied: 'Копирано',
      unconfirmed: 'Непотвърдено',
      coins: 'Монети',
      coin_id: 'Номер на Монети',
      value: 'Стойност',
      status: 'Статус',
      copy: 'Копирано'


    },
    account: {
      account: 'Акаунт',
      keybase: 'Keybase',
      your_name: 'Вашето Име',
      settings_saved: 'Настройки на акаунта запазени',
      error_save: 'Грешка при запазване на акаунта'
    },
    addressbook:{
      name: 'Име',
      country: 'Държава',
      city: 'Град',
      tor_onion_address: 'Tor-Onion Адрес',
      keybase_account: 'Keybase Акаунт',
      external_one: 'Външен Адрес 1',
      external_two: 'Външен Адрес 2',
      proof_address: 'Доказателствен Адрес',
      notice: 'Бележка',
      send_always: 'Винаги изпращай доказателство',
      deleted: 'Адреса е изтрит!',
      error_delete: 'Грешка при изтриване!',
    },
    remove: {
      warning: 'Внимание',
      info: 'Информация',
      help: 'Помощ',
      remove: 'Премахване',
      success: 'Успех'
    },
    login: {
      listener_started: 'Портфейлния слушател е стартиран',
      error_listener_started: 'Грешка при стартиране на портфейлния слушател',
      tor_started: 'Tor е стартиран',
      error_tor_started: 'Tor не е стартиран'
    },
    seed:{
      errorGetMnemonic: 'Грешка при показване на мнемоничните думи. Вярна ли е паролата?',
      mnemonic: 'Мнемонични Думи'
    },


    new:{
      create: 'Създаване на нов портфейл',
      restore: 'Възстановяване на портфейл',
      select: 'Избиране на локация за вече съществуващ портфейл.',
      selectErr: 'Избраната папка не съдърща "wallet_data" и wallet config.',
      networkErr: 'Вида на мрежата не е определен.<br/>Моля изберете един.',
      selectNetwork: 'продължаване',
    },

    restore:{

      title: 'Възстановяване на портфейл чрез мнемонични думи',
      addSeedsInfo: 'Добавете дума като кликнете върху нея',
      yourSeedsInfo: 'Вашите мнемонични думи са',
      added: 'Възстановяване на портфейл',
      newPassword: 'Настройка на нова парола',
      recover: 'Възстановяване',
      walletLocation: 'Локация на портфейлни данни',
      search_placeholder: 'Пишете за да търсите думи или ги поставете',
      create_new: 'Създаване на нов акаунт',
      change_seed: 'Промяна на мнемоничните думи',
      wallet_recovered: 'Портфейлът Ви е възстановен. Моля логнете се и завършете настройката.',
      recover_fail: 'Fatal: recover failed on action "{0}"',
      fatal_app: 'Fatal: App config not updated.'

    },

    app:{
      create: 'Създаване на транзакция (Файл)',
      finalize: 'Финализиране на транзакция (Файл)',
      httpSend: 'Изпращане чрез HTTP/HTTPS',
      createRespFile: 'Импортиране на транзакция (Файл)',
      httpReceive: 'Получване чрез HTTP/HTTPS',
      height:'Височина на блокчейна',
      updateTitle: 'Открита нова версия',
      updateMsg: 'Открита е нова версия на EPIC портфейла. Моля обновете!',
      yes: 'да',
      no: 'не',

      ngrok_service_started: 'Ngrok услугата е стартирана',
      ngrok_address_changed: 'Вашият ngrok адрес е променен',
      ngrok_service_stopped: 'Ngrok услугата е спряна',
      ngrok_service_error: 'Грешка при стартиране на Ngrok',
      error_setup_internal_node: 'Неуспешна настройка на вграденият сървър',
      node_started: 'Сървърът е стартиран',
      node_not_started: 'Сървърът не е стартиран',
      node_offline: 'Сървърът е офлайн',
      external_node_online: 'Външният Сървър е онлайн',
      external_node_offline: 'Външният Сървър е офлайн',
      background_process: 'Открихме работещ портфейл или сървър на заден план. Моля затворете ги преди да пуснете портфейла.',

    },

    info: {
      spendable: 'Готови за харчене',
      total: 'Баланс',
      unfinalization: 'Непотвърдени',
      immature: 'Неотлежали'
    },

    txs:{
      tx: 'Транзакции',
      canceled:'Прекъснати',
      noTxFound: 'Няма открити транзакции',
      noTx:'Няма транзакции',
      cancelSuccess:'Транзакцията е отменена',
    },



    fileSend:{
      sendAmount: 'Сума за изпращане',
      createTxFile: 'Създаване на транзакция',
      WrongAmount: 'Грешна стойност',
      NotEnough: 'Недостатъчна наличност',
      saveMsg: 'Запазване на създаденият файл за транзакция',
      CreateFailed: 'Неуспешно създаване на файл за транзакция',
      proof_address_recipient: 'Грешна дължина на доказателствен адрес',
    },

    httpSend:{
      sendAmount: 'Сума за изпращане',
      address:'Адрес на получателя',
      WrongAmount: 'Грешна стойност',
      NotEnough: 'Недостатъчна наличност.',
      WrongAddress: 'Грешен адрес',
      WrongTxData: 'Неуспешно построяване на транзакцията',
      success: 'Успешна транзакция',
      TxFailed: 'Изпращането е неуспешно',
      TxResponseFailed: 'Неуспешна връзка с получателя',
      TxCreateFailed: 'Неуспешно създаване на транзакция',
      salteVersion: 'Slate файл версия',
      salteVersionHelp: 'Ако не успявате да изпратите EPIC, опитайте да промените Slate файл версията и опитайте пак'
    },

    receive: {
      dropMsg: 'Поставете файл за транзакция или кликнете за ъплоуд.',
      WrongFileType: 'Грешен вид на файла за транзакция',
      saveMsg: 'Запазване на създаденият файл за транзакция',
      CreateFailed: 'Неуспешно създаване на файл за транзакция.',
      NoSavePlace: 'Изберете локация за запазване',
      dragdrop: 'Издърпайте и поставете файл',
      error_read: 'Грешка при прочитане на файла',
      success: 'Успешна транзакция',
    },

    finalize: {
      finalize: 'Завършване',
      success: 'Успешна транзакция',
      ok:'OK',
      sending: 'Изпращане',
      dropMsg: 'Поставете файла за финализиране или кликнете за ъплоуд',
      WrongFileType: 'Грешен вид на файла за транзакция',
      TxFailed: 'Неуспешна транзакция',
      dragdrop: 'Издърпайте и поставете файл.',
      error_read: 'Грешка при прочитане на файла'
    },

    httpReceive: {
      launchSucess: 'Успешно стартиране на слушателя',
      listening: "Вашият портфейл може да получи транзакции по тези адреси.",
      address: 'Адрес на Портфейла',
      reachableMsg2: 'Уверете се, че вашето IP е публично и достъпно през интернет.',
      close: 'Спиране на слушателя',
      attention: 'Внимание',
      reachableMsg: 'За получаване на онлайн транзакции, портфейлът трябва да бъде в режим на слушане.',
      password: 'Парола на портфейла (използва се за пускане на HTTP слушателя)',
      start: 'Пускане',
      error: 'Няма парола.',
      failed: 'Неуспешно стартиране, може би паролата е грешна',
      failed2: 'HTTP слушането е неуспешно, вашето IP не е достъпно за интернет потребители. Опитайте чрез файл за транзакция',
      failed3: 'Неуспешно вземане на вашето публично IP; опитайте пак по-късно',
      failed4: 'Слушателят е пуснат на localhost:3415. Обаче вашето IP не е достъпно за интернет потребители. Опитайте чрез файл за транзакция',
      ip: 'вашето публично IP',
      current_ngrok_address: 'текущ Ngrok адрес',
      local_address: 'Локален адрес',
      session_end: 'Използвате Ngrok без акаунт. Сесията Ви ще приключи след {0} hour, {1} minutes',
      tor_onion_address: 'Tor onion адрес',
      proof_address: 'Доказателствен адрес',
      epicbox_address: 'Your public Epic address',
      your_qrcode: 'QR код за вашият "{0}" адрес',
      click_qrcode_icon: 'Кликнете иконката на QR кода',
      tor_not_available: 'Tor не е достъпен. Опитайте да рестартирате слушателя на портфейла',
      epicbox_not_available: 'Epicbox not available. Try to restart the wallet listener',
      epicbox_off: 'Your epicbox is not configured. Update your settings and define a epicbox domain',
      check_port_open_done: 'Recheck done!',
      listener_stopped: 'Wallet listener stopped',
    },

    check: {
      checking: 'Проверяване, имайте търпение ...',
      stop: 'Спиране на проверката',
      introTitle: 'Информация',
      intro1: 'Тази функция ще сканира целия блокчейн за неизразходени монети, които Ви принадлежат.',
      start: 'Старт',
      delete_unconfirmed: 'Изтриване на непотвърдени монети',
      scan_finished: 'Сканирането на портфейла е завършено.',
      error_scan: 'Грешка при стартиране. Вярна ли е паролата?',
      scan_stop: 'Скенерът е спрян.'

    },
    firstruncheck: {
      title: 'Сканиране на блокчейна за вашите монети, имайте търпение ...',
    },

    lang: {
      title: 'Избиране на език',
      lang: 'Език',
      select: 'Избиране'
    },

    settings: {
      title: 'Настройки',
      check_node_api_http_addr: 'Възлов api адрес',
      node_api_addr_hint: 'Къде портфейлът ще намери работещ възлов сървър',
      network: 'Мрежа',
      wallet_listener: 'Портфейлен слушател',
      auto_start: 'автоматично включи слушателя след логин',
      authtoken: 'Вашият ngrok Authtoken',
      ngrok_force_start: 'използвайте ngrok без Authtoken',
      ngrok_hint: 'Ngrok адреса е активен за 2 часа и после се променя.',
      ngrok_account_hint: 'Зада получите ngrok authentication token, моля направете си акаунт на https://ngrok.com',
      authtoken_hint: 'С ngrok Authtoken, вашият адрес не се променя докато сте в режим на слушане',
      howto: 'Как да получите Authtoken from ngrok',
      settings_saved: 'Настройките са запазени',
      error_save: 'Грешка при запазване на настройките',
      epicbox_domain: 'Epicbox Domain',
      epicbox_domain_hint: `The domain of the relay server, where your epicbox is connected to. Leave field blank if you don't want to use this service. Default: epicbox.epic.tech`,

      node_background: 'sync in background',
      node_background_hint: 'the built-in node server continues to sync in the background even when the app is closed. The next time you run the wallet, you do not have to wait for the synchronization with the blockchain.'

    },

    validators:{
      empty: '{0} полето е задължително',
      equal: '{0} трябва да е равно',
      http_address: 'Няма валиден HTTP(S) адрес',
      min_length: '{0} полето трябва да бъде {1} брой символи',
      only_letters: '{0} може да има само малки букви от a-z без празни места',
      number: '{0} полето трябва да бъде с цифри',
      spendable: 'Недостатъчна наличност',
      exist: 'Акаунтът "{0}" вече съществува',
      notexist: 'Акаунтът "{0}" не съществува'
    }

  }
}
export default messages
