const messages = [
  {
    title: 'Send coins',
    text: `The send command is the first step in building an interactive transaction.<br/>
    <br/>
    The transaction can either be carried out instantaneously using either the Tor network or http(s) address, or done manually through the exchange of files.<br/>
    <br/>
    To start a new transaction, make sure your node server is fully synced 
    to the Epic Cash network.<br/></br>
    The status of your node server should read, “synced.”<br/>
    <br/>
    The recipient address can either be a Tor onion address or any external http(s) address.<br/>
    <br/>
    To have proof the transaction was carried out, enter the proof address provided by the receiver.<br/>`,
  },
  {
    title: 'Receive coins',
    text: `To receive coins, your wallet must be in listen mode.<br/><br/>
    Every time you start/restart the listener your ngrok address will change so copy each time.<br/><br/>
    The wallet’s default settings activate the listen/receive mode by default.<br/><br/>
    This feature can be changed in Settings.<br/>
    <br/>
    On the Receive Page, there will be a list of addresses that can be used to receive coins.<br/>
    <br/>
    Your proof address is also displayed on this page.<br/>
    <br/>
    If something goes wrong and your wallet is not receiving coins, restart the listener on the Receive Page.<br/>`
  },
  {
    title: 'Finalize offline transaction',
    text: `To finalize an offline transaction, use this page to import the finalized<br/>
    transaction file provided by the receiver.<br/>`
  },
  {
    title: 'Import offline transaction',
    text: `Use this page to import the transaction file provided by the receiver.<br/>
    <br/>
    After importing the transaction file, save a finalized transaction file and deliver it 
    to the sender.<br/>`
  },
  {
    title: 'Address book',
    text: `Save your contacts and their addresses in the address book.<br/>
    <br/>
    If you later decide to make another transaction, you can search for the contact’s address in the recipient’s address field.<br/>`
  },
  {
    title: 'Transaction ID',
    text: `The Transaction ID is the unique identifier for each transaction shared by the receiver and sender.<br/>`
  },
  {
    title: 'Coin ID',
    text: `The Coin ID is the unique identifier for your coins on the blockchain.<br/>
    Only you can see the Coin ID value.<br/>`
  },
  {
    title: 'Wallet listener',
    text: `The wallet listener must be running to receive coins from other wallets.<br/>
    <br/>
    The listener can be started or stopped on the Receive Page.<br/><br/>
     Your ngrok address will change each time you start the listener.`
  },
  {
    title: 'Account',
    text: `Set your username and keybase account in Account.<br/>
    <br/>
    The username is displayed at the top of the app.<br/>`
  },
  {
    title: 'Settings',
    text: `Here you can change the settings made during the setup assistant process.<br/>`
  },
  {
    title: 'Node Server',
    text: `This is the location of your node server.<br/>
    <br/>
    A node server is required for the wallet to send and receive coins.<br/>
    <br/>
    You can choose between the built-in node server and an external node server.<br/><br/>
    If you change this value, please restart your wallet.<br/>`
  },
  {
    title: 'Your Ngrok Authtoken',
    text: `The ngrok auth-token is required for the ngrok service to find your Wallet PC.<br/><br/>
    If you dont want to use the ngrok service, then leave the "Ngrok Authtoken" field empty.<br/>`
  },
  {
    title: 'Import offline transaction',
    text: `If somebody sends you an offline transaction, you can import it on page "Import offline transaction".<br/>
    <br/>After the import you must save a finalization transaction file and send it back to the sender.<br/>`
  },
  {
    title: 'Mnemonic Words',
    text: `The Mnemoonic Words are the words you need to recover your wallet. Make a backup of these words
    in the same order they are displayed. Write down on paper, take a screenshot and save image file, etc.<br/>
    <br/>
    Later if you loose your wallet data, you can recover the wallet<br/>
    with this words.<br/>`
  },
  {
    title: 'Send Payment proof and proof address',
    text: `In epic you can make transactions with an additional proof.<br/>
    <br/>
    With a proof its possible for others
    to verify that the transaction was made between the sender and receiver.<br/>
    <br/>
    To verify a proof the user needs the proof data and amount.<br/>`
  },
  {
    title: 'Tor',
    text: `You can send and receive transactions via a tor address by default.<br/><br/>
    You will find your tor address on the "Receive" page.<br/>`
  },
  {
    title: 'Ngrok',
    text: `ngrok is a service that provides a public address that is linked to your wallet's
           private IP address behind your router.<br/><br/> You share the ngrok address with wallet senders
           or use it in the Receive Address on exchanges.<br/>`
  },
  {
    title: 'Network node',
    text: `A network node is a server which stores the blockchain data.<br/><br/>
           Your wallet has a built-in node you can use or select an external node you are running on another 
           computer or an external public node.<br/><br/>
           The first time you run the built-in node it will take approx. 2 hrs to sync the blockchain data.`
  },
  {
    title: 'Peers',
    text: `Peers are other network nodes that are connected to your network node<br/>`
  },
  {
    title: 'Blockchain Height',
    text: `The blockchain height is the latest block number in the chain. Every 60 seconds the blockchain creates a new block and the height value changes.<br/>`
  },
  /* use this for new topic
  {
    title: 'topic',
    text: `can be html too`
  },
  */
];

export default messages
