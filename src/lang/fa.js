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
    confirm_action: 'Confirm action',
    unconfirmed: 'در انتظار تائیدیه',
    sent_confirmed: 'Sent',
    received_confirmed: 'Received',
    sent_unconfirmed: '... waiting for receiver to sign',
    received_unconfirmed: '... waiting for sender to finalize',
    locked: 'قفل شده',
    send: 'فرستادن',
    send_proof: 'send proof',
    dandelion: 'Dandelion++',
    dandelion_hint: 'Broadcasting transactions via Dandelion++',
    createofflinetx: 'Create offline transaction',
    cancel:'لغو کردن',
    save: 'ذخیره',
    delete: 'پاک کردن',
    edit: 'ادیت',
    welcome: 'به کیف اپیک خوش آمدید',
    back: 'برگشتن',
    reset: 'شروع مجدد',
    addall: 'همه را از بالا اضافه کن Add all from above',
    msg: 'پیغام',
    more: 'بیشتر',
    wrongAddressFormat: 'فرم آدرس اشتباه',
    node_server: 'سرور گِره یا نود Node Server',
    node_server_builtin: 'سرور نود داخلیِ کیف Built-in node server',
    node_server_external: 'سرور نود خارجی External node server',
    node_server_address: 'آدرس سرور گِره یا نود Node Server Address',
    recipient_proof_address: 'آدرس گواهی دریافت کننده Recipient proof address',
    copy_to_clipboard: 'در کلیپ بورد کپی شد',
    placeholder_search: 'جستجو...',
    refresh: 'تازه کردن',
    page_of: 'Page {0} of {1}',
    only_letter: ' a-z فقط حروف کوچک از,',
    custom_settings: 'تنظیمات سفارشی',
    step_of: 'مرحله {0}/{1}',
    close_all_process: 'Terminate all processes',
    advanced_settings: 'Advanced Settings',
    waiting_for_nodesync: '... waiting for node to be synced.',

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
      updates: 'به روز رسانی ها',
      openepichidden: 'Epic wallet location',
    },

    headerbar: {
      howdy: ' درود,',
      version: 'نسخه',
      peers: 'همتایان یا جفت ها',
      status: 'وضعیت',
      node: 'گِره Node',
      sync_height: 'همگام سازی ارتفاع',
      progress: 'Progress',
      block_height: 'ارتفاع بلاک چین',
      node_sync_status: 'Internal node sync status',
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
      setup_assistant: 'دستیار_تنظیم',
      account_information: 'اطلاعات حساب',
      your_name:'نام شما',
      name_only_internal: 'نام فقط در داخل کیف شما استفاده می شود',
      keybase: 'Keybase',
      enter_keybase: 'اگر یک حساب اپلیکیشنِ چتِ کیبیس دارید، می توانید آن را در اینجا وارد کنید.',
      next_step: 'مرحله بعد',
      network_node: 'نودِ شبکه',
      network_node_txt: `کیف پول شما به یک نودِ شبکه برای ارسال و دریافت تراکنش ها نیاز دارد<br/>
      می توانید بین سرورِ نودِ داخلی و سرور نودِ خارجی یکی را انتخاب کنید<br/>
      <br/>
      اگر مطمئن نیستید که از کدام یک استفاده کنید، تنظیمات را همانطور که هستند رها کنید<br/>`,
      previous_step: 'مرحله قبلی',
      receive_transactions: 'در حال دریافت تراکنش',
      receive_transactions_txt: `برای دریافت تراکنش از کیف پول های دیگر، کیف پول شما باید از طریق اینترنت قابل دسترسی باشد<br/>
      <br/>
      اگر با تنظیمات روتر مودم و ارسال پورت آشنایی ندارید، استفاده از سرویس
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
      authtoken: 'Your ngrok Authtoken آت توکنِ مربوط به اِنگِروک شما',
      howto: 'ngrok Authtoken چگونه آت توکنِ اِنگروکِ خود را دریافت کنید',
      values_correct: 'آیا این مقادیر صحیح است؟',
      save_and_finish: 'ذخیره و پایان',
      name: 'نام',
      keybase_account: 'Keybase Account',
      language: 'زبان',
      ngrok_authtoken: '  اِنگِروک آت توکنِ ngrok Auth-Token',
      db_fatal: ' مهلک: دی بی را نمی توان وارد کرد DB ',
      errors_save: 'خطا در ذخیره تنظیمات کاربر: {0}',
      epicbox_domain: 'Epicbox Web Address',
      epicbox_off: 'turned off',
      epicbox_domain_hint: `Leave field blank if you don't want to use this service.`,
      noninteractive_transactions: `Intro to EPIC Addresses<br/>
      <br/>
      EPIC addresses provide an easy way to send EPIC when the receiving wallet is offline.<br/>
      <br/>
      This is accomplished securely and privately by using an external relay server called "Epicbox"<br/>
      Relay servers such as epicbox.epiccash.com and others to come later are provided by our community.<br/>
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

      received: 'دریافت شده',
      send: 'فرستادن',
      transaction_id: 'شناسه تراکنش',
      creation_date: 'تاریخ ایجاد',
      receiver: 'From/To',
      payment_proof: 'سند پرداخت',
      amount: 'مبلغ (کارمزد)',
      status: 'وضعیت',
      transfer_type: 'نوع انتقال',
      id: 'آی دی یا شناسه',
      slate_id: ' آی دی ثبت یا حک شده Slate ID',
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
      sender_address_path: 'مسیر آدرس فرستنده',
      sendall: 'All'

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
      name: 'نام',
      country: 'کشور',
      city: 'شهر',
      tor_onion_address: ' Tor آدرس شبکه پیازی',
      keybase_account: 'Keybase جساب',
      external_one: 'آدرس خارجی 1',
      external_two: 'آدرس خارجی 2',
      proof_address: 'آدرس اثبات یا گواهی',
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
      error_tor_started: 'تور شروع نشده است',
      epicbox_started: 'Epicbox started',
      error_epicbox_started: 'Error starting Epicbox',
    },
    seed:{
      errorGetMnemonic: 'آیا رمز عبور صحیح است؟ خطا در دریافت کلمات یادگاریMnemonic Words',
      mnemonic: 'کلمات یادگاری Mnemonic Words'
    },


    new:{
      create: 'ساخت کیف پول جدید',
      restore: 'بازیابی کیف پول',
      select: 'مکان داده کیف پول موجود را انتخاب کنید wallet_data ',
      selectErr: 'پوشه انتخاب شده فاقد راهنمای "داده کیف" و پیکربندی کیف پول است wallet_data',
      networkErr: 'نوع شبکه نمی تواند تشخیص داده شود<br/>لطفا یکی را انتخاب کنید',
      selectNetwork: 'ادامه',
    },

    restore:{

      title: 'بازیابی کیف پول از طریق عبارت یادآوری ',
      addSeedsInfo: 'لطفاً با کلیک کردن روی کلمه یا کلمه ها عبارت یادآوری را اضافه کنید ',
      yourSeedsInfo: 'عبارات یادآوری شما این است',
      added: 'بازیابی کیف پول',
      newPassword: 'تنظیم یک رمز عبور جدید',
      recover: 'بازیابی',
      walletLocation: 'موقعیت مکانی داده کیف پول',
      search_placeholder: 'برای جستجوی کلمات، تایپ کنیدو یا عبارات یادآوری را وارد کنید ',
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

      ngrok_service_started: 'خدمات اِنگِروک شروع شد Ngrok',
      ngrok_address_changed: 'آدرس اِنگِروک شما تغییر کرده است',
      ngrok_service_stopped: 'سرویس اِنگروک متوقف شد',
      ngrok_service_error: 'Ngrok خطا در راه اندازی سرویس اِنگِروک',
      error_setup_internal_node: 'نمی توان سرور نود داخلی را راه اندازی کرد',
      node_started: 'نود شبکه شروع شد',
      node_restarting: 'Node is restarting',
      node_not_started: 'نود یا گِره شبکه شروع نشده است',
      node_offline: 'نود آفلاین است',
      external_node_online: 'نود خارجی آنلاین است',
      external_node_offline: 'نود خارجی آفلاین است',
      background_process: 'ما برخی از پردازش های کیف پول و نودِ در حال اجرا را در پس زمینه پیدا کردیم. لطفاً قبل از اجرای این برنامه ابتدا آنها را ببندید',
    },
    info: {
      spendable: 'قابل مصرف',
      total: 'موجودی',
      unfinalization: 'تایید نشده',
      immature: 'نابالغ'
    },

    txs:{
      tx: 'تراکنش ها',
      canceled:'لغو شده',
      noTxFound: 'هیچ تراکنشی یافت نشد',
      noTx:'هیچ تراکنشی وجود ندارد',
      cancelSuccess:'این تراکنش لغو شد',
    },



    fileSend:{
      sendAmount: 'مقدار برای ارسال',
      createTxFile: 'ایجاد تراکنش',
      WrongAmount: 'مقدار اشتباه',
      NotEnough: 'موجودی کافی نیست',
      saveMsg: 'ذخیره فایلِ تراکنشِ ایجاد شده',
      CreateFailed: 'عدم موفقیت در ایجاد فایلِ تراکنش جدید',
      proof_address_recipient: 'طول آدرس گواهی اشتباه است',
    },

    httpSend:{
      sendAmount: 'مبلغ برای ارسال',
      address:'آدرس گیرنده',
      WrongAmount: 'مقدارِ اشتباه',
      NotEnough: 'موجودیِ ناکافی .',
      WrongAddress: 'آدرسِ اشتباه',
      WrongTxData: 'عدم موفقیت در ایجاد تراکنش',
      success: 'موفقیت در تراکنش',
      TxFailed: 'ارسال تراکنش ناموفق بود',
      TxResponseFailed: 'دریافت پاسخ صحیح از گیرنده ناموفق بود',
      TxCreateFailed: 'ایجاد تراکنش ناموفق بود',
      salteVersion: 'نسخه فایل برنامه ریزی شده',
      salteVersionHelp: 'اگر نتوانستید اپیک را ارسال کنید، نسخه فایل برنامه ریزی را تغییر دهید و سپس دوباره ارسال کنید'
    },

    receive: {
      dropMsg: 'فایل تراکنش را برای دریافت اینجا رها کنید یا برای آپلود کلیک کنید',
      WrongFileType: 'نوع فایل تراکنش اشتباه است',
      saveMsg: 'ذخیره فایلِ پاسخِ تراکنشِ ایجاد شده است',
      CreateFailed: 'فایل تراکنشِ پاسخِ جدید ایجاد نشد',
      NoSavePlace: 'لطفاً مکان ذخیره را انتخاب کنید',
      dragdrop: 'فایل را بِکشید و رها کنید',
      error_read: 'خطا در خواندن محتوای فایل',
      success: 'موفقیت در تراکنش',
    },

    finalize: {
      finalize: 'نهایی کردن',
      success: 'موفقیت در تراکنش',
      ok:'OK',
      sending: 'در حال ارسال',
      dropMsg: 'فایلِ تراکنشِ پاسخ را برای نهایی کردن اینجا رها کنید یا برای آپلود کلیک کنید',
      WrongFileType: 'نوع فایلِ تراکنش اشتباه است',
      TxFailed: 'تراکنش ناموفق بود',
      dragdrop: 'فایل را بِکشید و رها کنید',
      error_read: 'خطا در خواندن محتوای فایل'
    },

    httpReceive: {
      launchSucess: 'با موفقیت شروع شد',
      listening: "کیف پول شما می تواند تراکنش ها را از طریق این آدرس ها دریافت کند",
      address: 'آدرس کیف پول',
      reachableMsg2: 'اطمینان حاصل کنید که آدرس آی پی شما عمومی است و قابل دسترسی از طریق اینترنت باشد.',
      close: 'شنونده را متوقف کنید',
      attention: 'توجه',
      reachableMsg: 'برای دریافت تراکنش های آنلاین، کیف پول شما باید در حالت گوش دادن راه اندازی شود',
      password: ' HTTP رمز عبور کیف پول (برای شروع گوش دادن اِج تی تی پی استفاده میشود)  ',
      start: 'شروع',
      error: 'بدون رمز عبور',
      failed: 'شروعِ ناموفق، شاید رمزِ عبور اشتباه باشد',
      failed2: 'گوش دادن به اچ تی تی پی ناموفق بود، آی پی عمومی شما توسط کاربر اینترنت قابل دسترسی و مشاهده نیست. فایل تراکنش را امتحان کنید ',
      failed3: 'دریافت آی پی عمومی شما ناموفق بود. بعدا دوباره تلاش کنید',
      failed4: ' گوش دهنده اکنون در لوکال‌هاست 3415 در حال اجرا است.  با این حال آی پی شما توسط کاربر اینترنت قابل دسترسی نیست. فایل تراکنش را امتحان کنید',
      ip: 'آی پی عمومی شما',
      current_ngrok_address: 'آدرس اِنگِروک در حال حاضر شما',
      local_address: 'آدرس محلی',
      session_end: 'شما از انگروکِ بدون حساب کاربری استفاده می کنید. مهلت استفاده شما در {0} ساعت و {1} دقیقه به پایان می رسد',
      tor_onion_address: 'آدرس پیازی شبکه تور',
      proof_address: 'آدرس گواهی اثبات proof_address',
      your_qrcode: 'کد کیوآر شما برای آدرس "{0}" شما ',
      click_qrcode_icon: 'روی نماد کد کیوآر کلیک کنید',
      tor_not_available: 'تور در دسترس نیست. سعی کنید شنونده کیف پول را مجددا راه اندازی کنید',
      epicbox_address: 'Your public Epic address',
      epicbox_not_available: 'Epicbox not available. Wait for the Node to be synced or try to restart the wallet listener',
      epicbox_off: 'Your epicbox is not configured. Update your settings and define a epicbox domain',
    },

    check: {
      checking: 'بررسی مجدد، لطفا صبور باشید...',
      stop: 'توقف بررسی',
      introTitle: 'اطلاعات',
      intro1: 'این کار تمام بلاک چِین را برای یافتن خروجی سکه های خرج نشده که به کیف پول شما تعلق دارد اسکن می کند',
      start: 'شروع',
      delete_unconfirmed: 'خروجی های سکه تایید نشده را حذف کنید',
      scan_finished: 'اسکن کیف پول تمام شد',
      error_scan: 'خطای شروع اسکن. آیا رمز عبور صحیح است؟',
      scan_stop: 'اسکن کیف پول متوقف شد'

    },
    firstruncheck: {
      title: 'بلاک چین را برای خروجی های کیف پول خود اسکن کنید، لطفا صبور باشید...',
    },

    lang: {
      title: 'زبان را انتخاب کنید',
      lang: 'زبان',
      select: 'انتخاب'
    },

    settings: {
      title: 'تنظیمات',
      check_node_api_http_addr: 'آدرس اِی پی آیِ نود یا گِره',
      node_api_addr_hint: 'جایی که کیف پول باید یک نود در حال اجرا پیدا کند',
      network: 'شبکه',
      wallet_listener: 'شنونده کیف پول',
      auto_start: 'پس از ورود به سیستم، شنونده کیف پول را به طور خودکار راه اندازی کنید',
      authtoken: 'اِنگروک آت توکِن شما ngrok Authtoken',
      ngrok_force_start: 'از اِنگروه بدون آت توکن استفاده کنید ',
      ngrok_hint: 'آدرس انگروک به مدت 2 ساعت فعال است و سپس تمدید می شود.',
      ngrok_account_hint: 'https://ngrok.com برای دریافت رمز احراز هویت انگروک خود، لطفاً یک حساب کاربری جدید در این آدرس ایجاد کنید',
      authtoken_hint: 'با داشتن یک آت توکن اِنگروک، آدرس شما تا زمانی که کیف پول در حالت گوش دادن است فعال است ،ngrok Authtoken',
      howto: ' How to get your Authtoken from ngrok چگونه از اِنگروک، آت توکن بگیریم ',
      settings_saved: 'تنظیمات ذخیره شدند',
      error_save: 'خطا در ذخیره کردن تنظیمات',
      epicbox_domain: 'Epicbox Domain',
      epicbox_domain_hint: `The domain of the relay server, where your epicbox is connected to. Leave field blank if you don't want to use this service. Default: epicbox.epiccash.com`,

      node_background: 'sync in background',
      node_background_hint: 'the built-in node server continues to sync in the background even when the app is closed. The next time you run the wallet, you do not have to wait for the synchronization with the blockchain.',
      epicbox_background: 'Run Epicbox listener in background',
      epicbox_background_hint: 'the Epicbox listener continues to listen for incoming transactions in background even when the app is closed.'

    },

    validators:{
      empty: 'فیلد {0} الزامی است',
      equal: '{0} باید برابر باشد',
      http_address: 'آدرس اچ تی تی پی (اس) معتبری وجود ندارد HTTP(S)',
      min_length: 'فیلد {0} باید حداقل {1} کاراکتر داشته باشد',
      only_letters: '{0} فقط می تواند حروف کوچک انگلیسی اِی تا زی را بدون فاصله داشته باشد',
      number: 'فیلد {0} باید یک عدد باشد',
      spendable: 'موجودی کافی وجود ندارد',
      exist: 'حساب "{0}" از قبل وجود دارد',
      notexist: 'حساب "{0}" وجود ندارد'
    }

  }
}
export default messages
