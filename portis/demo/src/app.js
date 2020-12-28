const Web3 = require('web3');
const { hello, PortisWRP } = require('portiswrp');

// Print test message
hello();

const DAPP_ID = '1a5e4c06-3d4a-4369-b406-d937cdb090b6';
const NETWORK = 'ropsten';
const OPTS = { scope: ['email', 'reputation'] };

const portis = new PortisWRP(DAPP_ID, NETWORK, OPTS, debug = true)
const web3 = new Web3(portis.provider);

injectHTML('isLogged', 'No');

// Link functions to DOM
window.showPortis = portis.showPortis;
window.setDefaultEmail = portis.setDefaultEmail;
window.changeNetwork = changeNetwork;
window.importWallet = portis.importWallet;
window.isLoggedIn = portis.isLoggedIn;
window.getExtendedPublicKey = portis.getExtendedPublicKey;
window.showBitcoinWallet = portis.showBitcoinWallet;
window.logout = portis.logout;
window.getEthAccounts = getEthAccounts;
window.signMessage = signMessage;

// Event handlers
function onError(error) {
  console.log('[PORTIS] Error:', error);
};

function onLogin(address, email, reputation) {
  console.log('[PORTIS] LOGGED IN:', email, address, reputation);
  // showPortis();
  if (email) document.getElementById('email').value = email;
  if (address) document.getElementById('address').value = address;
  if (reputation && Object.keys(reputation).length) document.getElementById('reputation').innerHTML = String(reputation.reputation) + '%';
  web3.eth.getBalance(address)
    .then((balance) => {
      injectHTML('balance', Number(web3.utils.fromWei(balance)));
  });
  injectHTML('isLogged', 'Yes');
};

function onLogout() {
  console.log('[PORTIS] LOGGED OUT:');
  injectHTML('isLogged', 'No');
};

function onActiveWalletChanged(wallet) {
    console.log('[PORTIS] WALLET CHANGED:', wallet);
    injectHTML('wallet', wallet);
};

// Functions

function changeNetwork() {
  const value = document.getElementById('network').value;
  if (value) portis.changeNetwork(value);
}
function getEthAccounts() {
  web3.eth.getAccounts((error, accounts) => {
    console.log('[PORTIS] ETH account: error: ', error, 'accounts', accounts);
    if (!error) {
      injectHTML('address', accounts[0]);
    }
  });
}

function signMessage() {
  web3.eth.getAccounts((error, accounts) => {
      console.log('[PORTIS] ETH account: error: ', error, 'accounts', accounts);
      if (!error) {
        const msg = document.getElementById('message').value;
        web3.eth.sign(msg || '', accounts[0])
            .then((signed) => {
              console.log('SIGNED', signed)
              injectHTML('signed', signed);
            })
            .catch((err) => console.log('ERR', err))
      }
  });
}

// Event subscriptions
portis.errorHandler(onError);
portis.loginHandler(onLogin);
portis.logoutHandler(onLogout);
portis.walletChangeHandler(onActiveWalletChanged);


// Utils
function injectHTML(id, message) {
  document.getElementById(id).innerHTML = message;
}
