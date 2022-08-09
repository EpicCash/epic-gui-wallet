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
      fatal_create: 'حیاتی: شکست در عملیات ایجاد شده است Fatal: created fail on action "{0}"',
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
      اگر با تنظیمات روتر و ارسال پورت آشنایی ندارید، استفاده از سرویس 
      ngrok
      را به شما توصیه می کنیم<br/>
     هنگامی که 
     ngrok
     فعال شد، کیف پول شما از طریق یک آدرس موقت 
     ngrok
     قابل دسترسی خواهد بود.<br/>
      <br/>
      <br/>
      اگر نمی خواهید از سرویس 
      ngrok
      استفاده کنید، قسمت های زیر را خالی بگذارید`,
      authtoken: 'Your ngrok Authtoken',
      howto: 'خود را دریافت کنید ngrok ،Auttoken چگونه',
      values_correct: 'آیا این مقادیر صحیح است؟',
      save_and_finish: 'ذخیره و پایان',
      name: 'نام',
      keybase_account: 'Keybase Account',
      language: 'زبان',
      ngrok_authtoken: 'ngrok Auth-Token',
      db_fatal: ' مهلک: دی بی را نمی توان وارد کرد DB ',
      errors_save: 'خطا در ذخیره تنظیمات کاربر: {0}'
    },
    transaction:{

      received: 'دریافت شده',
      send: 'فرستادن',
      transaction_id: 'شناسه تراکنش',
      creation_date: 'تاریخ ایجاد',
      receiver: 'گیرنده',
      payment_proof: 'سند پرداخت',
      amount: 'مبلغ (کارمزد)',
      status: 'وضعیت',
      transfer_type: 'نوع انتقال',
      id: 'آی دی یا شناسه',
      slate_id: ' آی دی حک شده Slate ID',
      confirmation_date: 'تاریخ تایید',
      amount_credited: 'مبلغ اعتبار داده شده',
      amount_debited: 'مبلغ بدهکار شده',
      fee: 'کارمزد',
      message: 'پیفام',
      type: 'نوع',
      receiver_address: 'آدرس گیرنده',
      receiver_signature: 'امضای گیرنده',
      sender_address: 'آدرس فرستنده',
      sender_signature: 'امضای فرستنده',
      sender_address_path: 'مسیر آدرس فرستنده'

    },

    commit:{
      unspentCmt: 'خروجی های مصرف نشده',
      heightCreated: 'ارتفاع بلاک در زمان ایجاد',
      unspent: 'خرج نشده',
      spent: 'خرج کردن',
      noCmtFound: 'هیچ تعهد خروجی خرج نشده ای یافت نشد',
      noCmt:'بدون تعهد خروجی خرج نشده',
      copied: 'کپی شده است',
      unconfirmed: 'تایید نشده',
      coins: 'سکه ها',
      coin_id: 'شناسه سکه',
      value: 'مقدار',
      status: 'وضعیت',
      copy: 'تعهد کپی شد'


    },
    account: {
      account: 'حساب',
      keybase: 'Keybase',
      your_name: 'نام شما',
      settings_saved: 'تنظیمات حساب ذخیره شد',
      error_save: 'خطا در ذخیره حساب'
    },
    addressbook:{
      naem: 'نام',
      country: 'کشور',
      city: 'شهر',
      tor_onion_address: ' Tor آدرس شبکه پیازی',
      keybase_account: 'Keybase جساب',
      external_one: 'آدرس خارجی 1',
      external_two: 'آدرس خارجی 2',
      proof_address: 'آدرس اثباتیا گواهی',
      notice: 'توجه',
      send_always: 'همیشه گواهی ارسال کنید',
      deleted: 'آدرس حذف شد!',
      error_delete: '!خطا در حذف آدرس',
    },
    remove: {
      warning: 'هشدار',
      info: 'اطلاعات',
      help: 'کمک',
      remove: 'زدودن',
      success: 'موفقیت'
    },
    login: {
      listener_started: 'شنونده کیف پول، شروع به کار کرد',
      error_listener_started: 'خطا در راه اندازی شنونده کیف پول',
      tor_started: 'تور شروع شد',
      error_tor_started: 'تور شروع نشده است'
    },
    seed:{
      errorGetMnemonic: 'آیا رمز عبور صحیح است؟ .Mnemonic خطا در دریافت',
      mnemonic: 'کلمات یادگاری Mnemonic Words'
    },


    new:{
      create: 'ساخت کیف پول جدید',
      restore: 'بازیابی کیف پول',
      select: 'مکان داده کیف پول موجود را انتخاب کنید',
      selectErr: 'و پیکربندی کیف پول است "wallet_data" پوشه انتخاب شده فاقد راهنمای',
      networkErr: 'نوع شبکه نمی تواند تشخیص داده شود<br/>لطفا یکی را انتخاب کنید',
      selectNetwork: 'ادامه',
    },

    restore:{

      title: 'بازیابی کیف پول از طریق عبارت یادآوری ',
      addSeedsInfo: 'لطفاً با کلیک کردن روی کلمه (ها) عبارت یادآوری را اضافه کنید ',
      yourSeedsInfo: 'عبارت یادآوری شما این است',
      added: 'بازیابی کیف پول',
      newPassword: 'تنظیم یک رمز عبور جدید',
      recover: 'بازیابی',
      walletLocation: 'موقعیت مکانی داده کیف پول',
      search_placeholder: 'برای جستجوی کلمات تایپ کنیدو یا عبارات یادآوری را وارد کنید ',
      create_new: 'ایجاد حساب کاربری جدید',
      change_seed: 'کلمات یادآوری را تغییر دهید',
      wallet_recovered: 'کیف پول شما بازیابی شد. لطفا وارد شوید و تنظیمات را تمام کنید',
      recover_fail: 'مهلک: بازیابی در عمل ناموفق بود "{0}"',
      fatal_app: 'مهلک: پیکربندی برنامه به روز نشده است'

    },

    app:{
      create: 'ایجاد تراکنش (فایل)',
      finalize: 'نهایی کردن تراکنش (فایل) ',
      httpSend: ' HTTP/HTTPS فرستادن از طریق',
      createRespFile: 'وارد کردن تراکنش (فایل)',
      httpReceive: ' HTTP/HTTPS دریافت از طریق',
      height:'ارتفاع بلاک',
      updateTitle: 'نسخه جدید پیدا شد',
      updateMsg: 'نسخه جدید کیف پول اپیک پیدا شد. لطفا همین الان به روز رسانی کنید.',
      yes: 'بله',
      no: 'خیر',

      ngrok_service_started: 'شروع شد Ngrok خدمات ',
      ngrok_address_changed: 'شما تغییر کرده است ngrok آدرس',
      ngrok_service_stopped: 'متوقف شد Ngrok سرویس',
      ngrok_service_error: 'Ngrok خطا در راه اندازی سرویس',
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
