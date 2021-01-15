import React from "react"
import Web3 from "web3";
import { showLogs, typeCheckAddress } from './utils';
import PortisDisplay from './display/portis';
import Loader from './display/loader';

function portisWrapper(WrappedComponent) {
  class Portis extends React.Component {
    constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.onError = this.onError.bind(this);
      this.onLogin = this.onLogin.bind(this);
      this.onLogout = this.onLogout.bind(this);
      this.onActiveWalletChanged = this.onActiveWalletChanged.bind(this);
      this.handleLogout = this.handleLogout.bind(this);

      this.state = {
        portis: null,
        web3: null,
        logged: false,
        email: '',
        network: '',
        address: '',
        tosign: '',
        signed: '',
        reputation: '',
      };
    }

    componentDidMount() {
      if (typeof window !== 'undefined') {
        const { networkConfig } = this.props;
        const Portis = require('@portis/web3');
        const dappId = process.env.DAPP_ID || '';
        const network = networkConfig || 'ropsten';
        const portis = new Portis(dappId, network, { scope: ['email'], gasRelay: networkConfig && networkConfig.gasRelayHubAddress }); // 'reputation' off
        const web3 = new Web3(portis.provider);
        this.setState({ portis, web3, network });

        // Event handlers
        portis.onError(error => this.onError(error));
        portis.onLogin((address, email, reputation) => this.onLogin({ address, email, reputation }));
        portis.onLogout(() => this.onLogout())
        portis.onActiveWalletChanged(address => this.onActiveWalletChanged(address));
      }
    }

    onError(error) {
      console.error('[PORTIS] ERROR:', error);
    }

    onLogin({ address, email, reputation, show }) {
      const { portis } = this.state;
      showLogs({ type: '[PORTIS] LOGGED IN:', msg: `email ${email}, address ${address}, reputation ${reputation}` });
      if (show) portis.showPortis();
      this.setState({
          logged: true,
          email: email || '',
          address: address || '',
          reputation: reputation && Object.keys(reputation).length ? String(reputation.reputation) + '%' : '',
        });
      this.getBalance();
    }

    onLogout() {
      showLogs({ type: '[PORTIS] LOGGED OUT' });
      this.setState({ logged: false });
    }

    onActiveWalletChanged(address) {
      showLogs({ type: '[PORTIS] WALLET CHANGED:', msg: address });
      this.setState({ address });
      this.getBalance();
    }

    getBalance() {
      const { web3, address } = this.state;
      if (!web3 || !address) return;
      if (!typeCheckAddress(address)) return;
      web3.eth.getBalance(address)
        .then((balance) => {
          showLogs({ type: '[WEB3] WALLET BALANCE: ', msg: balance })
          this.setState({ balance: Number(web3.utils.fromWei(balance)) })
        });
    }

    handleChange(event) {
      // event.persist() // uncomment to log event object
      if (event.target.name) {
        this.setState({ [`${event.target.name.split('_')[1]}`]: event.target.value });
      }
    }

    handleSubmit(event, action, value) {
      event.preventDefault(); // avoid page reloading
      // event.persist() // uncomment to log event object
      const { portis, web3, address } = this.state;
      let option = '';
      switch (action) {
        case 'email':
          // check email validity
          portis.setDefaultEmail(value);
          break;
        case 'network':
          if (value === 'binance-test') {
            option = { name: 'binance testnet', nodeUrl: process.env.BINANCE_NODE, chainId: 97 };
          } else if (value === 'binance-main') {
            option = { name: 'binance mainnet', nodeUrl: process.env.BINANCE_NODE, chainId: 97 };
          }
          portis.changeNetwork(option || value);
          break;
        case 'address':
          // check address validity
          if (!typeCheckAddress(value)) {
            alert('WARNING: invalid characters !');
            break;
          }
          portis.importWallet(value);
          this.setState({ address: value })
          break;
        case 'tosign':
          // check address validity
          if (!typeCheckAddress(value)) {
            alert('WARNING: invalid characters !');
            break;
          }
          web3.eth.sign(value, address, (signed) => {
            if (typeof signed !== 'string') console.error(signed);
            else this.setState({ signed })
          });
          break;
        default:
          break;
      }
      this.getBalance();
    }

    handleLogout() {
      const { portis } = this.state;
      portis.logout();
      this.setState({ logged: false });
    }

    isLoggedIn() {
      const { portis } = this.state;
      portis.isLoggedIn().then(({ error, result }) => {
        if (error) console.error('[LOGIN] ', error)
        this.setState({ logged: !!result });
      })
    }

    render() {
      const { portis, web3, logged, email, address, network, tosign, signed, reputation, balance } = this.state;
      const { title, mainBgColor, bgColor } = this.props;
      if (!portis) return <h1>Portis module not loaded...</h1>
      return (
        <>
          <PortisDisplay
            email={email}
            network={network}
            address={address}
            logged={logged}
            balance={balance}
            reputation={reputation}
            getBalance={this.getBalance}
            handleSubmit={this.handleSubmit}
            handleLogout={this.handleLogout}
            isLoggedIn={this.isLoggedIn}
            showPortis={() => portis.showPortis()}
            title={title}
            mainBgColor={mainBgColor}
            bgColor={bgColor}
          />
          {logged ? (
            <WrappedComponent
              portis={portis}
              web3={web3}
              email={email}
              network={network}
              address={address}
              logged={logged}
              showPortis={() => portis.showPortis()}
              {...this.props}
            />
          ) : (
            <Loader />
          )}
        </>
      );
    }
  }

  portisWrapper.displayName = `portisWrapper(${getDisplayName(WrappedComponent)})`;

  return Portis;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
}

export default portisWrapper;