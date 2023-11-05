const messages = {
  msg: {
    title: 'Epic 钱包',
    password: '密码',
    passwordAgain: '再次输入密码',
    wrongPassword: '密码错误',
    login_: '登录',
    logout: '登出',
    search: '搜索',
    clearup: '清除',
    jump: '跳转',
    confirmed: '已确认',
    confirm_action: 'Confirm action',
    unconfirmed: '等待确认',
    locked: '已锁定',
    send: '发送',
    send_proof: 'send proof',
    dandelion: 'Dandelion++',
    dandelion_hint: 'Broadcasting transactions via Dandelion++',
    createofflinetx: 'Create offline transaction',
    receive: '接收',
    cancel:'撤销',
    save: '保存',
    welcome: '欢迎使用Epic钱包',
    msg: '消息',
    more: '更多',
    back: '返回',
    close_all_process: 'Terminate all processes',
    waiting_for_nodesync: '... waiting for node to be synced.',
    login: {
      walletExist: '发现已有Grin钱包存在；请用原有的密码登陆吧 :-)',
    },
    remove:{
      title: '移除当前钱包',
      warning: '警告 !',
      info: '移除钱包前，请确认 当前钱包里已经没有epic 或者 你已经完整记录了当前钱包的助记词 !',
      help: '在下面输入框填入 “移除” 用于确认',
      remove: '移除钱包',
      success: '当前钱包已经移除，请重启Epic'
    },

    new_:{
      create: '新建钱包',
      restore: '通过助记词导入钱包',
      import: '通过钱包备份文件导入'
    },

    create:{
      toNewMsg: '没有发现已经建好的钱包；新建一个吧 :-)',
      seedPhrase: '助记词',
      newWallet: '新建钱包',
      backupNote: '重要！请务必备份助记词，用于恢复钱包',
      backupFinish: '备份完成，登录钱包',
      errorPasswdEmpty: '密码不能为空',
      errorPasswdConsistency: '请输入相同的密码',
      errorCreateFailed: '新建钱包时发生错误，你可以试试重启下钱包，过一会儿再试试',
    },

    restore:{
      seedPhrase: '助记词',
      title: '从助记词中恢复钱包',
      addSeedsInfo: '请一个个地输入助记词',
      add: '添加',
      invalid: '助记词无效',
      delete: '删除',
      added: '助记词输入完成',
      newPassword: '设置新的密码',
      recover: '恢复钱包',
      reAdd: '重新输入',
      recovered: '钱包恢复成功, 开始从Grin区块链同步钱包余额；',
      restoring: '预计需要15-30分钟，不要关闭钱包，请耐心等待 ......',
      restored: '钱包恢复成功并且余额同步完成',
      login: '登陆钱包',
    },

    app:{
      create: '生成交易文件',
      finalize: '确认交易文件并完结交易',
      httpSend: '通过 https/http 发送',
      createRespFile: '生成回应交易文件',
      httpReceive: '开启http端口接收',
      height:'同步高度',
      updateTitle: '发现新版本',
      updateMsg: '发现Niffer钱包的新版本, 请立刻更新! (下载并覆盖原有程序即可).',
      yes: '好的',
      no: '暂时不更新',
      node_restarting: 'Node is restarting',
      hedwig: '用Hedwig收币'
    },

    info:{
      spendable: '可用余额',
      total: '总计',
      unfinalization: '等待对方完成',
      immature: '未成熟'
    },

    txs:{
      tx: '交易',
      canceled:'已取消',
      noTxFound: '没有找到相关交易',
      noTx:'没有交易',
      cancelSuccess:'取消交易成功',
    },

    commit:{
      unspentCmt: '未花费的交易输出',
      heightCreated: '创建时区块高度',
      unspent: '可用',
      spent: '已用掉',
      noCmtFound: '没有找到相关未花费交易输出',
      noCmt:'没有未花费的交易输出',
      copied: '已复制'
    },

    fileSend:{
      sendAmount: '发送数量',
      createTxFile: '生成交易文件',
      WrongAmount: '发送数量错误',
      saveMsg: '保存新生成的交易文件',
      CreateFailed: '生成交易文件错误'
    },

    httpSend:{
      sendAmount: '发送数量',
      address:'发送数量地址',
      WrongAmount: '发送数量错误',
      NotEnough: '没有足够的余额，请至少留下0.01作为手续费',
      WrongAddress: '发送地址错误',
      WrongTxData: '交易数据生成失败',
      success: '交易成功',
      TxFailed: '交易失败',
      TxResponseFailed: '接收者回应失败',
      TxCreateFailed: '发起交易失败',
      salteVersion: '交易文件版本',
      salteVersionHelp: '如果发送交易失败，可以试下改变交易文件版本'
    },

    fileReceive: {
      dropMsg: '拖入收到的交易文件',
      saveMsg: '保存新生成的回应交易文件',
      CreateFailed: '生成回应交易文件错误',
      NoSavePlace: '请选择生成交易文件的位置',
      WrongFileType: '交易文件类型错误',
    },

    finalize: {
      finalize: '完结交易',
      success: '交易成功',
      ok:'确定',
      sending: '发送中',
      dropMsg: '拖入需要确认的交易文件',
      WrongFileType: '交易文件类型错误',
      TxFailed: '交易失败',
    },

    httpReceive: {
      launchSucess: '启动成功',
      listening: '你的钱包正在监听',
      address: '钱包地址',
      reachableMsg2: '请确保你的ip地址外网用户能够访问',
      close: '关闭HTTP监听',
      attention: '注意',
      reachableMsg: '设置HTTP接收Grin: 需要你有对外的公网ip, 并且你的ip能被访问',
      password: '钱包密码 (用于启动http监听)',
      start: '启动',
      error: '没有输入密码.',
      failed: '启动失败，可能是密码错误',
      failed2: '监听失败，你的对外ip无法被访问到; 请使用交易文件的方法 或者 Hedwig 来收发Grin.',
      failed3: '无法获取你的IP地址，请过段时间再试下',
      failed4: '本地HTTP监听(http://127.0.0.1:3415)已经启动。但是你的对外ip无法被访问到; 请使用交易文件的方法 或者 Hedwig 来收发Grin.',
      ip: '你的公网IP'
    },

    hedwig: {
      title: '用Hedwig(v1)收币',
      launchSucess: '启动成功',
      reachable: 'Hedwig临时地址正常可用',
      address: '提币地址',
      tip:'收币时，请保持钱包在线.',
      close: '关闭Hedwig',
      introTitle: '介绍',
      intro1: 'Hedwig(v1) 是一个 为没有公网IP的用户 定制的代理服务，它会提供一个临时的收币地址.',
      intro2: '当有人向这个临时地址发送epic时，它会把这个发币请求转发到你的Epic钱包，完成交易.',
      start: '启动',
      failed: '连接到hedwig服务器时 发生错误，等下再试吧.',
      failed2: '连接到hedwig临时地址时 发生错误， 重启下钱包 or 等下再试吧.',
      failed3: '启动本地epic接收服务失败， 重启下钱包 or 等下再试吧.',
      copy: '复制地址',
      copied: '地址已经复制到剪贴板'
    },

    check: {
      title: '同步余额',
      checking: '正在同步，请耐心等待 ...',
      stop: '停止同步',


      tip:'完成同步余额可能需要10-30分钟.',
      introTitle: '介绍',

      intro1: '当你的本地钱包余额 和 Grin区块链上的余额不一致(可能是由于交易被取消或者发送失败等原因)时，可以使用 "同步余额" 功能.',
      intro2: '同步时，在Grin区块链的所有未花费的输出(uxtos)中，找到你可以使用的未花费的输出，相加就得到你的余额.',

      start: '开始同步',
      stopCheckMsg: '同步已经取消',
      checkedMsg: '同步完成'
    },

    lang: {
      title: '选择语言',
      lang: '语言',
      select: '选择'
    },

    settings: {
      title: 'Settings'
    }

  }
}
export default messages
