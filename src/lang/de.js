const messages = {
  msg: {

    title: '',
    password: 'Passwort',

    passwordAgain: 'Passwort erneut eingeben',
    wrongPassword: 'Falsches Passwort',
    login_: 'Anmelden',
    continue: 'Offline fortfahren',
    logout: 'Abmelden',
    search: 'Suchen',
    clearup: 'Löschen',
    close: 'Schließen',
    jump: 'jump',
    error: 'Bitte korrigieren Sie den (die) folgenden Fehler:',
    confirmed: 'Bestätigt',
    unconfirmed: 'Warten auf Bestätigung',
    locked: 'Gesperrt',

    send: 'Senden',


    cancel:'Abbrechen',
    save: 'Speichern',
    delete: 'Löschen',
    edit: 'Bearbeiten',

    welcome: 'Willkommen bei EPIC Wallet',
    back: 'Zurück',
    reset: 'Zurücksetzen',
    addall: 'Alles von oben hinzufügen',
    msg: 'Nachricht',
    more: 'Mehr',
    wrongAddressFormat: 'falsches Adressformat',

    node_server: 'Netzwerkknoten',
    node_server_builtin: 'Eingebauter Netzwerkknoten',
    node_server_external: 'Externer Netzwerkknoten',
    node_server_address: 'Netzwerkknoten Adresse',
    recipient_proof_address: 'Empfängeradresse für Zahlungsnachweis',

    copy_to_clipboard: 'In Zwischenablage kopiert!',
    placeholder_search: 'Suche...',
    refresh: 'Aktualisieren',
    page_of: 'Seite {0} von {1}',
    only_letter: 'Nur Kleinbuchstaben von a-z,',
    custom_settings: 'Benutzerdefinierte Einstellungen',
    step_of: 'Schritt {0}/{1}',

    menu:{
      general: 'Allgemein',
      dashboard: 'Dashboard',
      address_book: 'Adressbuch',
      send: 'Senden',
      finalize: 'Offline-Transaktion abschließen',
      receive: 'Empfangen',
      import: 'Offline-Transaktion importieren',
      misc: 'Verschiedenes',
      about: 'Über',
      help: 'Hilfe',
      logout: 'Abmelden',
      account: 'Konto',
      settings: 'Einstellungen',
      recheck: 'Saldo erneut prüfen',
      mnemonic: 'Mnemonik Wortliste',
      run_setup: 'Einrichtungsassistent ausführen',
      updates: 'Updates'
    },

    headerbar: {
      howdy: 'Guten Tag,',
      version: 'Version',
      peers: 'Peers',
      status: 'Status',
      node: 'Netzwerkknoten',
      sync_height: 'Sync-Höhe',
      block_height: 'Blockchain-Höhe'
    },
    dashboard:{
      transactions: 'Transaktionen',
      coins: 'Coins'
    },
    create:{
      select: 'Wählen Sie ein Verzeichnis für Ihre Wallet-Daten',
      seedPhrase: 'Mnemonik Wortliste zum Wiederherstellen',
      toNewMsg: 'Erstellen Sie eine neue Wallet.',
      newWallet: 'Neue Wallet erstellen',
      backupNote: 'WICHTIG!Bitte sichern Sie die Mnemonik Wortliste um Ihre Wallet wiederherstellen zu können',
      fatal_create: 'Schwerwiegender Fehler: Erstellungsfehler bei Aktion "{0}"',
      fatal_update: 'Schwerwiegender Fehler: App-Konfiguration nicht aktualisiert.'
    },

    setupwizard:{
      setup_assistant: 'Einrichtungsassistent',
      account_information: 'Kontoinformationen',
      your_name: 'Ihr Name',
      name_only_internal: 'Name wird nur intern verwendet',
      keybase: 'Keybase',
      enter_keybase: 'Wenn Sie ein Keybase-Konto haben, können Sie es hier eingeben.',
      next_step: 'Nächster Schritt',
      network_node: 'Netzwerkknoten',
      network_node_txt: `Ihre Wallet benötigt einen Netzwerkknoten, um Transaktionen zu senden und zu empfangen.<br/>
      Sie können zwischen dem integrierten Netzwerkknoten und einem externen Netzwerkknoten wählen.<br/>
      <br/>
      Wenn Sie sich nicht sicher sind, welche Sie verwenden sollen, lassen Sie die Einstellungen so, wie sie sind.<br/>`,
      previous_step: 'Vorheriger Schritt',
      receive_transactions: 'Empfangen von Transaktionen',
      receive_transactions_txt: `Um Transaktionen von anderen Wallets zu empfangen, muss Ihre Wallet über das Internet zugänglich sein.<br/>
      <br/>
      Wenn Sie mit Router-Einstellungen und Port-Weiterleitung nicht vertraut sind, empfehlen wir die Verwendung des ngrok-Dienstes.<br/>
      Sobald ngrok aktiviert ist, wird Ihre Wallet über eine temporäre ngrok-Adresse zugänglich sein.<br/>
      <br/>
      <br/>
      Lassen Sie die Felder unten leer, wenn Sie den ngrok-Dienst nicht nutzen möchten.`,
      authtoken: 'Ihr ngrok Authtoken',
      howto: 'Wie Sie Ihren Authtoken von ngrok erhalten',
      values_correct: 'Sind diese Werte korrekt?',
      save_and_finish: 'Speichern und beenden',
      name: 'Name',
      keybase_account: 'Keybase Konto',
      language: 'Sprache',
      ngrok_authtoken: 'ngrok Authtoken',
      db_fatal: 'Schwerwiegender Fehler: DB kann nicht eingefügt werden',
      errors_save: 'Fehler beim Speichern von Benutzereinstellungen: {0}'
    },
    transaction:{

      received: 'Empfangen',
      send: 'Senden',
      transaction_id: 'Transaktions ID',
      creation_date: 'Erstellungsdatum',
      receiver: 'Empfänger',
      payment_proof: 'Zahlungsnachweis',
      amount: 'Betrag (Gebühr)',
      status: 'Status',
      transfer_type: 'Art der Übertragung',
      id: 'ID',
      slate_id: 'Slate ID',
      confirmation_date: 'Bestätigungsdatum',
      amount_credited: 'Gutgeschriebener Betrag',
      amount_debited: 'Belasteter Betrag',
      fee: 'Gebühr',
      message: 'Nachricht',
      type: 'Art',
      receiver_address: 'Adresse des Empfängers',
      receiver_signature: 'Signatur des Empfangers',
      sender_address: 'Adresse des Absenders',
      sender_signature: 'Signatur des Absenders',
      sender_address_path: 'Pfad der Absenderadresse'

    },

    commit:{
      unspentCmt: 'Nicht ausgegebene Coins',
      heightCreated: 'Blockhöhe bei Erstellung',
      unspent: 'Nicht ausgegeben',
      spent: 'Ausgegeben',
      noCmtFound: 'Keine nicht ausgegebenen Coins gefunden',
      noCmt: 'Keine nicht ausgegebenen Coins',
      copied: 'Kopiert',
      unconfirmed: 'Unbestätigt',
      coins: 'Coins',
      coin_id: 'Coin ID',
      value: 'Wert',
      status: 'Status',
      copy: 'Coin ID kopiert'


    },
    account: {
      account: 'Konto',
      keybase: 'Keybase',
      your_name: 'Ihr Name',
      settings_saved: 'Kontoeinstellungen gespeichert',
      error_save: 'Fehler beim Speichern des Kontos'
    },
    addressbook:{
      naem: 'Name',
      country: 'Land',
      city: 'Stadt',
      tor_onion_address: 'Tor-Onion Adresse',
      keybase_account: 'Keybase Konto',
      external_one: 'Externe Adresse 1',
      external_two: 'Externe Adresse 2',
      proof_address: 'Adresse für Zahlungsnachweis',
      notice: 'Hinweis',
      send_always: 'immer Zahlungsnachweis senden',
      deleted: 'Adresse gelöscht!',
      error_delete: 'Fehler beim Löschen der Adresse!',
    },
    remove: {
      warning: 'Warnung',
      info: 'Info',
      help: 'Hilfe',
      remove: 'Entfernen',
      success: 'Erfolg'
    },
    login: {
      listener_started: 'Wallet-Empfänger gestartet',
      error_listener_started: 'Fehler beim Starten des Wallet-Empfängers',
      tor_started: 'Tor gestartet',
      error_tor_started: 'Tor nicht gestartet'
    },
    seed:{
      errorGetMnemonic: 'Fehler beim Anzeigen der Mnemonik Wortliste. Ist Passwort richtig?',
      mnemonic: 'Mnemonik Wortliste'
    },


    new:{
      create: 'Neue Wallet erstellen',
      restore: 'Wallet wiederherstellen',
      select: 'Vorhandenen Speicherort der Wallet-Daten auswählen',
      selectErr: 'Ausgewählter Ordner hat kein Wallet-Datenverzeichnis und keine Wallet-Konfiguration.',
      networkErr: 'Netzwerktyp kann nicht bestimmt werden.<br/>Bitte wählen Sie eines aus.',
      selectNetwork: 'Weiter',
    },

    restore:{

      title: 'Wallet über Mnemonik Wortliste wiederherstellen',
      addSeedsInfo: 'Fügen Sie bitte die Mnemonik Wortliste durch Anklicken der Wörter hinzu',
      yourSeedsInfo: 'Ihre Mnemonik Wortliste lautet',
      added: 'Wallet wiederherstellen',
      newPassword: 'Neues Passwort festlegen',
      recover: 'Wiederherstellen',
      walletLocation: 'Speicherort der Wallet-Daten',
      search_placeholder: 'Tippen um nach Wörtern zu suchen / oder Mnemonik Wortliste einfügen.',
      create_new: 'Neues Konto erstellen',
      change_seed: 'Passwort ändern',
      wallet_recovered: 'Ihre Wallet ist wiederhergestellt. Bitte melden Sie sich an und schließen Sie die Einrichtung ab.',
      recover_fail: 'Schwerwiegender Fehler: Wiederherstellung fehlgeschlagen bei Aktion "{0}"',
      fatal_app: 'Schwerwiegender Fehler: App-Konfiguration nicht aktualisiert.'

    },

    app:{
      create: 'Transaktion erstellen (Datei)',
      finalize: 'Transaktion abschließen (Datei)',
      httpSend: 'Senden über HTTP/HTTPS',
      createRespFile: 'Transaktion importieren (Datei)',
      httpReceive: 'Empfangen über HTTP/HTTPS',
      height:'Blockhöhe',
      updateTitle: 'Neue Version gefunden',
      updateMsg: 'Neue Version von EPIC wallet gefunden. Bitte aktualisieren Sie JETZT.',
      yes: 'Ja',
      no: 'Nein',

      ngrok_service_started: 'Ngrok-Dienst gestartet',
      ngrok_address_changed: 'Ihre ngrok-Adresse hat sich geändert',
      ngrok_service_stopped: 'Ngrok-Dienst angehalten',
      ngrok_service_error: 'Fehler beim Starten des ngrok-Dienstes',
      error_setup_internal_node: 'Interner Netzwerkknoten kann nicht eingerichtet werden',
      node_started: 'Netzwerkknoten gestartet',
      node_not_started: 'Netzwerkknoten nicht gestartet',
      node_offline: 'Netzwerkknoten ist offline',
      external_node_online: 'Externer Netzwerkknoten ist online',
      external_node_offline: 'Externer Netzwerkknoten ist offline',
      background_process: 'Wir haben einige laufende Wallet- und Netzwerkknoten-Prozesse im Hintergrund gefunden. Bitte schließen Sie diese zuerst, bevor Sie diese App ausführen.',

    },

    info: {
      spendable: 'Verwendbar',
      total: 'Saldo',
      unfinalization: 'Unbestätigt',
      immature: 'Unvollständig'
    },

    txs:{
      tx: 'Transaktionen',
      canceled: 'Abgebrochen',
      noTxFound: 'Keine Transaktionen gefunden',
      noTx: 'Keine Transaktionen',
      cancelSuccess: 'Diese Transaktion wurde storniert',
    },



    fileSend:{
      sendAmount: 'Zu sendender Betrag',
      createTxFile: 'Transaktion erstellen',
      WrongAmount: 'Falscher Betrag',
      NotEnough: 'Nicht genug Guthaben',
      saveMsg: 'Erstellte Transaktionsdatei speichern',
      CreateFailed: 'Neue Transaktionsdatei konnte nicht erstellt werden',
      proof_address_recipient: 'Falsche Länge der Zahlungsnachweis-Adresse',
    },

    httpSend:{
      sendAmount: 'Zu sendender Betrag',
      address: 'Adresse des Empfängers',
      WrongAmount: 'Falscher Betrag',
      NotEnough: 'Nicht genug Guthaben.',
      WrongAddress: 'Falsche Adresse',
      WrongTxData: 'Transaktion konnte nicht erstellt werden',
      success: 'Erfolgreiche Transaktion',
      TxFailed: 'Senden der Transaktion fehlgeschlagen',
      TxResponseFailed: 'Keine korrekte Antwort vom Empfänger erhalten',
      TxCreateFailed: 'Transaktion erstellen fehlgeschlagen',
      salteVersion: 'Slate-Datei Version',
      salteVersionHelp: 'Wenn Sie EPIC nicht senden konnten, versuchen Sie, die Version der Slate-Datei zu ändern und senden Sie sie erneut.'
    },

    receive: {
      dropMsg: 'Transaktionsdatei zum Empfangen hier ablegen oder zum Hochladen hier anklicken',
      WrongFileType: 'Falscher Transaktionsdateityp',
      saveMsg: 'Speichern der erstellten Antwort-Transaktionsdatei',
      CreateFailed: 'Neue Antwort-Transaktionsdatei konnte nicht erstellt werden',
      NoSavePlace: 'Bitte wählen Sie den Speicherort',
      dragdrop: 'Drag & drop Datei',
      error_read: 'Fehler beim Lesen des Dateiinhalts',
      success: 'Erfolgreiche Transaktion',
    },

    finalize: {
      finalize: 'Fertigstellen',
      success: 'Erfolgreiche Transaktion',
      ok:'OK',
      sending: 'Senden',
      dropMsg: 'Antwort-Transaktionsdatei zum Abschließen hier ablegen oder zum Hochladen hier anklicken',
      WrongFileType: 'Falscher Transaktionsdateityp',
      TxFailed: 'Transaktion fehlgeschlagen',
      dragdrop: 'Drag & drop Datei',
      error_read: 'Fehler beim Lesen des Dateiinhalts'
    },

    httpReceive: {
      launchSucess: 'Erfolgreich gestartet',
      listening: "Ihre Wallet kann Transaktionen über diese Adressen empfangen.",
      address: 'Wallet Adresse',
      reachableMsg2: 'Stellen Sie sicher, dass Ihre IP-Adresse öffentlich und über das Internet erreichbar ist.',
      close: 'Wallet-Empfänger anhalten',
      attention: 'Achtung',
      reachableMsg: 'Um Online-Transaktionen zu empfangen, muss Ihr Wallet-Empfänger eingeschaltet sein.',
      password: 'Wallet-Passwort (wird zum Starten des HTTP-Wallet-Empfängers verwendet)',
      start: 'Start',
      error: 'Kein Passwort.',
      failed: 'Start fehlgeschlagen, vielleicht falsches Passwort',
      failed2: 'HTTP-Wallet-Empfänger Start fehlgeschlagen, Ihre öffentliche IP ist für den Internetbenutzer nicht erreichbar. Versuchen Sie die Transaktionsdatei.',
      failed3: 'Ihre öffentliche IP konnte nicht abgerufen werden; versuchen Sie es später noch einmal',
      failed4: 'Der Wallet-Empfänger läuft jetzt auf localhost:3415. Ihre IP ist jedoch für den Internetbenutzer nicht erreichbar. Versuchen Sie die Transaktionsdatei',
      ip: 'Ihre öffentliche IP',
      current_ngrok_address: 'Aktuelle ngrok-Adresse',
      local_address: 'Lokale Adresse',
      session_end: 'Sie benutzen ngrok ohne ein Konto. Ihre Sitzung endet in {0} h, {1} min',
      tor_onion_address: 'Tor-Onion Adresse',
      proof_address: 'Zahlungsnachweis Adresse',
      your_qrcode: 'Ihr QRcode für Ihre "{0}" Adresse',
      click_qrcode_icon: 'Klicken Sie auf das qr-Code-Symbol',
      tor_not_available: 'Tor nicht verfügbar. Versuchen Sie, den Wallet-Empfänger neu zu starten'
    },

    check: {
      checking: 'Nochmals prüfen, geduldig bleiben...',
      stop: 'Stop Check',
      introTitle: 'Info',
      intro1: 'Dies scannt die gesamte Blockchain nach unverbrauchten Coins, die zu Ihrer Wallet gehören.',
      start: 'Start',
      delete_unconfirmed: 'Unbestätigte Coin Ausgänge löschen',
      scan_finished: 'Wallet Scan beendet.',
      error_scan: 'Fehler beim Starten des Scans. Ist das Passwort korrekt?',
      scan_stop: 'Wallet Scan gestoppt.'

    },
    firstruncheck: {
      title: 'Scannen der Blockchain nach Wallet-Ausgaben, geduldig bleiben.',
    },

    lang: {
      title: 'Sprache auswählen',
      lang: 'Sprache',
      select: 'Auswählen'
    },

    settings: {
      title: 'Einstellungen',
      check_node_api_http_addr: 'Netzwerkknoten api Adresse',
      node_api_addr_hint: 'wo die Wallet einen laufenden Netzwerkknoten finden soll',
      network: 'Netzwerk',
      wallet_listener: 'Wallet-Empfänger',
      auto_start: 'Wallet-Empfänger nach Anmeldung automatisch starten',
      authtoken: 'Ihr ngrok Authtoken',
      ngrok_force_start: 'ngrok ohne Authtoken verwenden',
      ngrok_hint: 'Die ngrok-Adresse ist für 2 Stunden aktiv und wird dann erneuert.',
      ngrok_account_hint: 'Um Ihren ngrok-Authentifizierungs Token zu erhalten, erstellen Sie bitte ein neues Konto unter https://ngrok.com.',
      authtoken_hint: 'Mit einem ngrok Authtoken ist Ihre Adresse so lange aktiv, wie die Wallet auf Empfang gestellt ist',
      howto: 'Wie Sie Ihren Authtoken von ngrok erhalten',
      settings_saved: 'Einstellungen gespeichert',
      error_save: 'Fehler beim Speichern der Einstellungen'
    },

    validators:{
      empty: 'Das Feld {0} ist erforderlich',
      equal: 'Die {0} müssen gleich sein',
      http_address: 'Keine gültige HTTP(S)-Adresse',
      min_length: 'Das Feld {0} muss mindestens {1} Zeichen lang sein',
      only_letters: '{0} kann nur Kleinbuchstaben von a-z ohne Leerzeichen enthalten',
      number: 'Das Feld {0} muss eine Zahl sein',
      spendable: 'Nicht ausreichend Guthaben',
      exist: 'Das Konto "{0}" existiert bereits',
      notexist: 'Das Konto "{0}" existiert nicht'
    }

  }
}
export default messages
