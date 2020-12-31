import React from "react"
import Web3 from "web3";
import AdminUI from '../components/admin';

function showLogs({ msg = '', type = '[ERROR]' }) {
  if (process.env.NODE_ENV === "development") console.log(type + msg);
}

class PortisUI extends React.Component {
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
      const Portis = require('@portis/web3');
      const dappId = '1a5e4c06-3d4a-4369-b406-d937cdb090b6'; // '211b48db-e8cc-4b68-82ad-bf781727ea9e';
      const network = 'ropsten'; // 'rinkeby';
      const portis = new Portis(dappId, network, { scope: ['email', 'reputation'] });
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

  handleSubmit(event) {
    event.preventDefault(); // avoid page reloading
    // event.persist() // uncomment to log event object
    const { portis, web3, address, email, network, tosign } = this.state;
    switch (event.target.name) {
      case 's_email':
        // check email validity
        portis.setDefaultEmail(email);
        break;
      case 's_network':
        // check network validity maybe selector
        portis.changeNetwork(network);
        break;
      case 's_address':
        // check address validity
        portis.importWallet(address);
        break;
      case 's_tosign':
        // check address validity
        web3.eth.sign(tosign, address, (signed) => {
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
    if (!portis) return <h1>Portis module not loaded...</h1>
    return (
      <>
        <div className="block-main">
          <div className="block-sub">
            <button onClick={() => portis.showPortis()}>Show Portis</button>
            <button onClick={() => this.isLoggedIn()}>Logged: {logged ? '🔵' : '🔴'}</button>
            <button onClick={() => this.handleLogout()}>Logout</button>
          </div>
          {logged ? (
            <>
              <div className="block-sub">
                <form name="s_email" onSubmit={this.handleSubmit}>
                  <label>
                    <span className="description">Email:</span>
                    <input type="text" value={email} name="f_email" onChange={this.handleChange} size="40"/>
                  </label>
                  <input type="submit" value="Set email" />
                </form>
              </div>
              <div className="block-sub">
                <form name="s_network" onSubmit={this.handleSubmit}>
                  <label>
                    <span className="description">Network:
                    <select name="f_network" onChange={this.handleChange} >
                      <option value="ropsten">Ropsten</option>
                      <option value="kovan">Kovan</option>
                      <option value="rinkeby">Rinkeby</option>
                      {/* <option value="ethereum">Ethereum</option> */}
                    </select>
                    </span>
                  </label>
                  <input type="submit" value="Switch network" />
                </form>
              </div>
              {/* <div className="block-sub">
                <button onClick={() => portis.showBitcoinWallet()}>Bitcoin Wallet</button>
              </div> */}
              <div className="block-sub">
                <form name="s_address" onSubmit={this.handleSubmit}>
                  <label>
                    <span className="description">Wallet:</span>
                    <input type="text" value={address} name="f_address" onChange={this.handleChange} size="50" />
                  </label>
                  <input type="submit" value="Change wallet" />
                </form>
              </div>
              {/* <div className="block-sub">
                <button onClick={() => portis.getExtendedPublicKey()}>Get PKey</button>
                {pkey ? <span className="description">{pkey}</span> : null}
              </div> */}
              <div className="block-sub">
                <form name="s_tosign" onSubmit={this.handleSubmit}>
                  <label>
                    <span className="description">Message to sign:</span>
                    <input type="text" value={tosign} name="f_tosign" onChange={this.handleChange} size="50" />
                  </label>
                  <input type="submit" value="Sign message" />
                </form>
                {signed
                  ? (
                  <div className="block-sub">
                    <span className="description">Signature: {signed}</span>
                  </div>
                  )
                  : null}
              </div>
              {balance
                ? (
                <div className="block-sub">
                  <span className="description">Balance: {balance}</span>
                </div>
                )
                : null}
              {reputation
                ? (
                <div className="block-sub">
                  <span className="description">Reputation: {reputation}</span>
                </div>
                )
              : null}
            </>
          ) : null}
        </div>
        {logged ? (
          <AdminUI
            portis={portis}
            web3={web3}
            email={email}
            network={network}
            address={address}
          />
        ) : null}
      </>
    );
  }
}

export default PortisUI;