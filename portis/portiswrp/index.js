// Portis wrapper: portiswrp package

const Portis = require('@portis/web3');

class PortisWRP {
    constructor(dappId, network, options = { scope: ['email', 'reputation'] }, debug = false) {
        this.debug = debug;
        this.dappId = dappId || '0000';
        this.network = network || 'ropsten';

        this.showPortis = this.showPortis.bind(this);
        this.setDefaultEmail = this.setDefaultEmail.bind(this);
        this.logout = this.logout.bind(this);
        this.changeNetwork = this.changeNetwork.bind(this);
        this.importWallet = this.importWallet.bind(this);
        this.isLoggedIn = this.isLoggedIn.bind(this);
        this.getExtendedPublicKey = this.isLoggedIn.bind(this);
        this.showBitcoinWallet = this.showBitcoinWallet.bind(this);

        this.portis = new Portis(
            this.dappId,
            this.network,
            { ...options });
    }

    // Event handlers
    errorHandler(callback) {
        this.portis.onError(error => callback(error));
        const msg = callback ? callback.name : 'callback';
        this._printLogs(msg + ' subscribed on Portis error');
    }

    loginHandler(callback) {
        this.portis.onLogin((address, email, reputation) => callback(address, email, reputation));
        const msg = callback ? callback.name : 'callback';
        this._printLogs(msg + ' subscribed on Portis login');
    }

    logoutHandler(callback) {
        this.portis.onLogout(() => callback());
        this._printLogs(callback ? callback.name : 'callback' + 'subscribed on logout');
        const msg = callback ? callback.name : 'callback';
        this._printLogs(msg + ' subscribed on Portis logout');
    }

    walletChangeHandler(callback) {
        this.portis.onActiveWalletChanged(address => callback(address));
        const msg = callback ? callback.name : 'callback';
        this._printLogs(msg + ' subscribed on Portis wallet change');
    }

    // Methods
    showPortis() {
        this._printLogs('showing portis popup...');
        this.portis.showPortis();
        return true;
    }

    setDefaultEmail(email) {
        this._printLogs('populating email address...');
        this.portis.setDefaultEmail(email);
        return email || '';
    }

    logout() {
        this._printLogs('loging out...');
        this.portis.logout();
        return true;
    }

    changeNetwork(network, gasrelay = false) {
        if (!network) return false;
        this._printLogs('changing network...');
        if (typeof network === 'string') this.portis.changeNetwork(network, gasrelay)
        else this.portis.changeNetwork(network)
        return { network, gasrelay };
    }

    importWallet(privateKey) {
        this._printLogs('importing wallet...');
        this.portis.importWallet(privateKey);
        return true;
    }

    isLoggedIn() {
        this._printLogs('testing if logged in...');
        return this.portis.isLoggedIn()
            .then(({ error, result }) => {
                this._printLogs('Logging in >> error: ', error || null, ', result: ', result);
                return { error, result };
          });
           
    }

    getExtendedPublicKey(path, coin) {
        this._printLogs('get extended public key...');
        return this.portis.getExtendedPublicKey(path, coin)
            .then(({ error, result }) => {
                this._printLogs('Get extended public Key >> error: ', error || null, ', result: ', result);
                return { error, result };
            });
    }

    showBitcoinWallet(path) {
        this._printLogs('showing bitcoin wallet...');
        this.portis.showBitcoinWallet(path)
        return true;
    }

    // Utils
    _printLogs(msg) {
        if (this.debug) {
            let print = '[DEBUG]: ';
            if (typeof msg === 'string') print = print + msg;
            else print = print + JSON.stringify(msg);
            console.log(print);
        }
    }
}

exports.PortisWRP = PortisWRP;

exports.hello = () => {
    console.log('Hello ! Portiswrp is loaded !');
};
