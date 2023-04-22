const messages = [
  {
    title: 'Poslat mince',
    text: `Příkaz Poslat je prvním krokem při vytváření interaktivní transakce.<br/>
    <br/>
    Transakci lze provést buď okamžitě pomocí sítě Tor nebo http(s) adresy, nebo ručně prostřednictvím výměny souborů.<br/>
    <br/>
    Chcete-li zahájit novou transakci, ujistěte se, že je Váš node server plně synchronizován 
    do sítě Epic Cash.<br/></br>
    Stav vašeho node serveru by měl být „synchronizován“.<br/>
    <br/>
    Adresa příjemce může být buď adresa Tor onion, nebo jakákoli externí adresa http(s).<br/>
    <br/>
    Chcete-li mít proof o provedení transakce, zadejte proof adresu poskytnutou příjemcem.<br/>`,
  },
  {
    title: 'Obdržet mince',
    text: `Chcete-li přijímat mince, vaše peněženka musí být v listen mode.<br/><br/>
    Pokaždé, když spustíte/restartujete listener, vaše adresa ngrok se změní, takže pokaždé ji zkopírujte.<br/><br/>
    Výchozí nastavení peněženky ve výchozím nastavení aktivuje režim listen/obdržet.<br/><br/>
    Tuto funkci lze změnit v Nastavení.<br/>
    <br/>
    Na stránce Obdržet bude seznam adres, které lze použít k přijímání mincí.<br/>
    <br/>
    Na této stránce je také zobrazena Vaše proof adresa.<br/>
    <br/>
    Pokud se něco pokazí a Vaše peněženka neobdržela mince, restartujte lestener na stránce Obdržet.<br/>`
  },
  {
    title: 'Dokončete offline transakci',
    text: `Chcete-li dokončit offline transakci, použijte tuto stránku k importu dokončené transakce<br/>
    transakční soubor poskytnutý příjemcem.<br/>`
  },
  {
    title: 'Import offline transakce',
    text: `Tuto stránku použijte k importu transakčního souboru poskytnutého příjemcem.<br/>
    <br/>
    Po importu transakčního souboru uložte hotový transakční soubor a doručte jej odesílateli.<br/>`
  },
  {
    title: 'Adresář',
    text: `Uložte své kontakty a jejich adresy do adresáře.<br/>
    <br/>
    Pokud se později rozhodnete provést další transakci, můžete vyhledat adresu kontaktu v poli adresy příjemce.<br/>`
  },
  {
    title: 'ID transakce',
    text: `ID transakce je jedinečný identifikátor pro každou transakci sdílenou příjemcem a odesílatelem.<br/>`
  },
  {
    title: 'Coin ID',
    text: `Coin ID je jedinečný identifikátor Vašich coinů na blockchainu.<br/>
    Pouze Vy vidíte hodnotu Coin ID.<br/>`
  },
  {
    title: 'Wallet Listener',
    text: `The wallet listener musí být spuštěn, aby mohl přijímat mince z jiných peněženek.<br/>
    <br/>
    The listener lze spustit nebo zastavit na stránce obdržet.<br/><br/>
     Vaše adresa ngrok se změní při každém spuštění the listener.`
  },
  {
    title: 'Účet',
    text: `Nastavte své uživatelské jméno a účet keybase v na stránce Účet.<br/>
    <br/>
    Uživatelské jméno se zobrazuje v horní části aplikace.<br/>`
  },
  {
    title: 'Nastavení',
    text: `Zde můžete změnit nastavení provedená během procesu průvodce nastavením.<br/>`
  },
  {
    title: 'Node Server',
    text: `Toto je umístění Vašeho node server.<br/>
    <br/>
    Aby peněženka mohla odesílat a přijímat mince, je vyžadován Node Server.<br/>
    <br/>
    Můžete si vybrat mezi vestavěným node serverem a externím node serverem.<br/><br/>
    Pokud tuto hodnotu změníte, restartujte peněženku.<br/>`
  },
  {
    title: 'Váš Ngrok Authtoken',
    text: `Ověřovací ngrok Authoken je vyžadován, aby služba ngrok našla Váš počítač s peněženkou.<br/><br/>
    Pokud nechcete používat službu ngrok, nechte pole "Ngrok Authtoken" prázdné.<br/>`
  },
  {
    title: 'Import offline transakce',
    text: `Pokud Vám někdo pošle offline transakci, můžete ji importovat na stránce „Importovat offline transakci".<br/>
    <br/>Po importu musíte uložit soubor finalizační transakce a odeslat jej zpět odesílateli.<br/>`
  },
  {
    title: 'Mnemonická slova',
    text: `Mnemonická slova jsou slova, která potřebujete, abyste obnovili zpět svou peněženku. Vytvořte zálohu těchto slov ve stejném pořadí,
    v jakém jsou zobrazena. Zapište si na papír, pořiďte snímek obrazovky a uložte soubor obrázku atd.<br/>
    <br/>
    Pokud později ztratíte data z peněženky, můžete peněženku obnovit<br/>
    s těmito slovy.<br/>`
  },
  {
    title: 'Odeslat proof o platbě a proof adresu',
    text: `V Epicu můžete provádět transakce s dodatečným proof.<br/>
    <br/>
    Pomocí proof je možné, aby ostatní ověřili, že transakce byla provedena mezi odesílatelem a příjemcem.<br/>
    <br/>
    K ověření proof potřebuje uživatel proof data a částku.<br/>`
  },
  {
    title: 'Tor',
    text: `Ve výchozím nastavení můžete odesílat a přijímat transakce prostřednictvím adresy tor.<br/><br/>
    Svou adresu tor najdete na "Obdržet" page.<br/>`
  },
  {
    title: 'Ngrok',
    text: `ngrok je služba, která poskytuje veřejnou adresu, která je propojena se soukromou IP adresou Vaší peněženky
           za vaším routerem.<br/><br/> Adresu ngrok sdílíte s odesílateli peněženky nebo ji používáte v adrese příjemce na burzách.<br/>`
  },
  {
    title: 'Network node',
    text: `Network node je server, který ukládá data blockchainu.<br/><br/>
           Vaše peněženka má built-in node, který můžete použít nebo vybrat external node, který provozujete na jiném počítači
           nebo external public node.<br/><br/>
           Při prvním spuštění built-in node bude trvat cca. 2 hodiny na synchronizaci blockchainových dat.`
  },
  {
    title: 'Peers',
    text: `Peers jsou další network node, které jsou připojeny k Vašemu network node<br/>`
  },
  {
    title: 'Blockchain Height',
    text: `The blockchain height je poslední číslo bloku v řetězci. Každých 60 sekund blockchain vytvoří nový blok a změní se hodnota Height.<br/>`
  },
  /* použijte to pro nové téma
  {
    title: 'Téma',
    text: `může být i html`
  },
  */
];

export default messages
