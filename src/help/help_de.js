const messages = [
  {
    title: 'Coins versenden',
    text: `Der Sendebefehl ist der erste Schritt beim Aufbau einer interaktiven Transaktion.<br/>
    <br/>
    Eine Transaktion kann entweder sofort über das Tor-Netzwerk oder die http(s)-Adresse oder manuell durch den Austausch von Dateien erfolgen.<br/>
    <br/>
    Um eine neue Transaktion zu starten, stellen Sie sicher, dass Ihr Netzwerkknoten vollständig mit dem Epic Cash-Netzwerk synchronisiert ist..<br/></br>
    Der Status Ihres Netzwerkknotens sollte 'synced' lauten. <br/>
    <br/>
    Die Empfängeradresse kann entweder eine Tor-Onion-Adresse oder eine beliebige externe http(s)-Adresse sein.<br/>
    <br/>
    Um einen Nachweis für die Durchführung der Transaktion zu erhalten, geben Sie die vom Empfänger angegebene Zahlungsnachweis Adresse ein.<br/>`,
  },
  {
    title: 'Coins empfangen',
    text: `Um Coins zu erhalten, muss Ihre Wallet empfangsbereit sein.<br/><br/>
    Jedes Mal, wenn Sie den Wallet-Empfänger starten/neustarten, ändert sich Ihre ngrok-Adresse. Kopieren Sie sie also jedes Mal neu.<br/><br/>
    Die Standardeinstellungen der Wallet aktivieren standardmäßig den Empfangsmodus.<br/><br/>
    Diese Funktion kann in den Einstellungen geändert werden.<br/>
    <br/>
    Auf der Seite Empfangen wird eine Liste von Adressen angezeigt, die für den Empfang von Coins verwendet werden können.<br/>
    <br/>
    Ihre Zahlungsnachweis Adresse wird ebenfalls auf dieser Seite angezeigt.<br/>
    <br/>
    Wenn etwas schief läuft und Ihre Wallet keine Coins empfängt, starten Sie den Wallet-Empfänger auf der Empfangsseite neu.<br/>`
  },
  {
    title: 'Offline-Transaktion abschließen',
    text: `Um eine Offline-Transaktion abzuschließen, verwenden Sie diese Seite, um die vom Empfänger<br/>
     bereitgestellte Datei der abgeschlossenen Transaktion (Antwort-Transaktionsdatei) zu importieren.<br/>`
  },
  {
    title: 'Offline-Transaktion importieren',
    text: `Auf dieser Seite können Sie die vom Empfänger bereitgestellte Transaktionsdatei importieren.<br/>
    <br/>
    Nach dem Importieren der Transaktionsdatei speichern Sie eine Antwort-Transaktionsdatei und übermitteln diese an den Absender.
<br/>`
  },
  {
    title: 'Adressbuch',
    text: `Speichern Sie Ihre Kontakte und deren Adressen im Adressbuch.<br/>
    <br/>
    Wenn Sie sich später für eine weitere Transaktion entscheiden, können Sie im Empfängeradressfeld nach der Adresse des Kontakts suchen.<br/>`
  },
  {
    title: 'Transaktions ID',
    text: `Die Transaktions-ID ist die eindeutige Kennung für jede Transaktion, die von Empfänger und Sender gemeinsam verwendet wird.<br/>`
  },
  {
    title: 'Coin ID',
    text: `Die Coin-ID ist die eindeutige Kennung für Ihre Coins auf der Blockchain.<br/>
    Nur Sie können den Wert der Coin-ID sehen.
<br/>`
  },
  {
    title: 'Wallet-Empfänger',
    text: `Der Wallet-Empfänger muss in Betrieb sein, um Coins von anderen Wallets zu empfangen.<br/>
    <br/>
    Der Wallet-Empfänger kann auf der Empfangsseite gestartet oder gestoppt werden.<br/><br/>
     Ihre ngrok-Adresse ändert sich jedes Mal, wenn Sie den Wallet-Empfänger starten.`
  },
  {
    title: 'Konto',
    text: `Legen Sie Ihren Benutzernamen und Ihr Keybase-Konto unter Konto fest.<br/>
    <br/>
    Der Benutzername wird im oberen Bereich der App angezeigt.<br/>`
  },
  {
    title: 'Einstellungen',
    text: `Hier können Sie die Einstellungen ändern, die Sie während des Einrichtungsassistenten vorgenommen haben.<br/>`
  },
  {
    title: 'Netzwerkknoten',
    text: `Dies ist der Ort, an dem sich Ihr Netzwerkknoten befindet.<br/>
    <br/>
    Ein Netzwerkknoten ist erforderlich, damit die Wallet Coins senden und empfangen kann.<br/>
    <br/>
    Sie können zwischen dem eingebauten Netzwerkknoten und einem externen Netzwerkknoten wählen.<br/><br/>
    Wenn Sie diesen Wert ändern, starten Sie bitte Ihre Wallet neu.
<br/>`
  },
  {
    title: 'Ihr Ngrok Authtoken',
    text: `Der ngrok-Authentifizierungs-Token wird benötigt, damit der ngrok-Dienst Ihren Wallet-PC finden kann.<br/><br/>
    Wenn Sie den ngrok-Dienst nicht verwenden möchten, lassen Sie das Feld "Ngrok Authtoken" leer.<br/>`
  },
  {
    title: 'Offline-Transaktion importieren',
    text: `Wenn Ihnen jemand eine Offline-Transaktion schickt, können Sie diese auf der Seite "Offline-Transaktion importieren" importieren.<br/>
    <br/>Nach dem Import müssen Sie eine Antwort-Transaktionsdatei speichern und an den Absender zurückschicken.<br/>`
  },
  {
    title: 'Mnemonik Wortliste',
    text: `Die Mnemonik Wortliste sind die Wörter, die Sie brauchen, um Ihre Wallet wiederherzustellen. Erstellen Sie eine Sicherungskopie dieser Wörter
    in derselben Reihenfolge, in der sie angezeigt werden. Notieren Sie sie auf Papier, machen Sie einen Screenshot und speichern Sie die Bilddatei, usw.
<br/>
    <br/>
    Wenn Sie später Ihre Walletdaten verlieren, können Sie die Wallet mit diesen Worten wiederherstellen<br/>
   .
<br/>`
  },
  {
    title: 'Zahlungsnachweis und Nachweisadresse senden',
    text: `In epic können Sie Transaktionen mit einem zusätzlichen Nachweis durchführen.<br/>
    <br/>
   Mit einem Nachweis ist es für andere möglich
    zu überprüfen, ob die Transaktion zwischen dem Sender und dem Empfänger stattgefunden hat.
<br/>
    <br/>
    Zur Verifizierung eines Nachweises benötigt der Nutzer die Zahlungsnachweis Daten und den Betrag.<br/>`
  },
  {
    title: 'Tor',
    text: `Sie können Transaktionen standardmäßig über eine Tor-Adresse senden und empfangen.<br/><br/>
    Sie finden Ihre Tor-Adresse auf der Seite "Empfangen".<br/>`
  },
  {
    title: 'Ngrok',
    text: `Ngrok ist ein Dienst, der eine öffentliche Adresse bereitstellt, die mit der privaten IP-Adresse Ihrer Geldbörse hinter Ihrem Router verbunden ist.
<br/><br/> Sie teilen die ngrok-Adresse mit Sendern
           oder verwenden sie in der Empfangsadresse auf Börsen.
<br/>`
  },
  {
    title: 'Netzwerkknoten',
    text: `Ein Netzwerkknoten ist ein Server, der die Daten der Blockchain speichert.<br/><br/>
           Ihre Wallet hat einen eingebauten Netzwerkknoten, den Sie verwenden können, oder Sie wählen einen externen Netzwerkknoten auf einem anderen
           Computer oder einen externen öffentlichen Netzwerkknoten.
           <br/><br/>
           Wenn Sie den eingebauten Netzwerkknoten zum ersten Mal starten, dauert es ca. 2 Stunden, um die Blockchain-Daten zu synchronisieren.`
  },
  {
    title: 'Peers',
    text: `Peers sind andere Netzwerkknoten, die mit Ihrem Netzwerkknoten verbunden sind<br/>`
  },
  {
    title: 'Blockchain-Höhe',
    text: `Die Blockchain-Höhe ist die letzte Blocknummer in der Kette. Alle 60 Sekunden erstellt die Blockchain einen neuen Block und der Höhenwert ändert sich.<br/>`
  },
  /* use this for new topic
  {
    title: 'topic',
    text: `can be html too`
  },
  */
];

export default messages
