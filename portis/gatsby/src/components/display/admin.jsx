import React from "react"
import abi from '../../config/abi';
import * as func from '../utils';
import LicenseInfo from './licenceUI';
import portisWrapper from '../wrapper';

function loadAll(contract_sh, web3) {
  return func.SH_list_softwares(contract_sh)
    .then(sofwares => {
      if (sofwares) {
        const promisesSoftware = [];
        sofwares.forEach(software => {
          const swContract = web3 ? new web3.eth.Contract(abi.CONTRACT_ABI, software) : null;
          if (swContract) {
            promisesSoftware.push(
              func.S_list_licenses(swContract)
                .then((licenses) => func.S_get_admin(swContract).then((admin) => ({ admin, licenses })))
                .then(({ admin, licenses }) => func.S_get_company_name(swContract).then((name) => ({ name, admin, licenses })))
                .then(({ name, admin, licenses }) => {
                  if (!admin) return {};
                  // console.log('ALL', swContract, admin, sofwares, licenses)
                  return {
                    type: 'software',
                    admin,
                    addr: software,
                    contract: swContract,
                    licenses,
                    name,
                  };
                })
            )
          }
        });
        return Promise.all(promisesSoftware);
      }
      return false;
    })
      .then((softwareDetails) => {
        if (!softwareDetails) return false;
        return softwareDetails.flat();
      })
      .catch(err => {
        func.showLogs({ type: '[ERROR]:', msg: 'load all: ' + err });
        return false;
      });
}
class AdminUI extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSwSelect = this.handleSwSelect.bind(this);
    this.loadSoftwares = this.loadSoftwares.bind(this);
    this.loadLicense = this.loadLicense.bind(this);
    this.setSWAdmin = this.setSWAdmin.bind(this);
    this.setLAdmin = this.setLAdmin.bind(this);
    this.setLOwner = this.setLOwner.bind(this);
    this.setLDate = this.setLDate.bind(this);
    this.setLForSale = this.setLForSale.bind(this);

    let contractAddress = process.env.ROPSTEN_CONTRACT_HANDLER;
    if (this.props.network && this.props.network.includes('binance')) contractAddress = process.env.BINANCE_CONTRACT_HANDLER;
    this.state = {
      contractAddress,
      softwares: [],
      licenses: {},
      currSw: '',
      currAdmin: '',
      handlerContract: null,
    };
  }

  loadLicense(licenseAddr) {
    const { web3 } = this.props;
    const liContract = web3 ? new web3.eth.Contract(abi.LICENSE_ABI, licenseAddr) : null;
    if (!liContract) return;

    Promise.all([
      func.L_get_admin(liContract),
      func.L_get_owner(liContract),
      func.L_get_expiration_timestamp(liContract),
      func.L_get_is_for_sale(liContract),
    ])
    .then(([admin, owner, expiry, forSale]) => {
      // console.log("🚀 ~ file: admin.jsx", admin, owner, typeof expiry, expiry, forSale)
      this.setState(prevState => ({
        licenses: {
          ...prevState.licenses,
          [licenseAddr]: {
            type: 'license',
            addr: licenseAddr,
            liContract,
            admin,
            owner,
            expiry: expiry ? '' : new Date(expiry).toISOString().split('T')[0],
            forSale,
          },
        },
      }))
    })
    .catch(err => console.error(err));
  }

  loadSoftwares(event) {
    event.preventDefault(); // avoid page reloading
    const { web3 } = this.props;
    const { contractAddress } = this.state;
    if (!func.typeCheckAddress(contractAddress)) {
      alert('WARNING: contract invalid characters !');
      return;
    }
    const handlerContract = web3 ? new web3.eth.Contract(abi.HANDLER_ABI, contractAddress) : null;
    loadAll(handlerContract, web3)
      .then((softwares) => {
        func.showLogs({ type: '[INFO]:', msg: 'ALL RESULTS', softwares });
        if (!softwares || !softwares.length) return;

        this.setState({
          softwares,
          currSw: softwares[0].addr,
          currAdmin: softwares[0].admin,
          handlerContract,
        })

        softwares.forEach(sw => {
          if (sw.licenses && sw.licenses.length) {
            sw.licenses.forEach(license => this.loadLicense(license));
          }
        });
      })
        .catch(err => func.showLogs({ type: '[ERROR]:', msg: err }));
  }

  setSWAdmin(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    if (!func.typeCheckAddress(event.target.value)) {
      alert('WARNING: address invalid characters !');
      return;
    }
    // const { currAdmin, swContract } = this.state;
    // swContract.methods.adminsetd(currAdmin).send();
    // func.showLogs({ type: '[INFO]:', msg: "sync currAdmin " + currAdmin })
  }

  setLAdmin(licenseAddr, admin) {
    if (!func.typeCheckAddress(admin)) {
      alert('WARNING: address invalid characters !');
      return;
    }
    const { web3, address } = this.props;
    const { licenses } = this.state;
    const targetLicense = licenses[licenseAddr];
    if (!targetLicense) return;

    func.L_set_owner(targetLicense.liContract, web3, address, admin)
    .then(res => {
      func.showLogs({ type: '[INFO]', msg: JSON.stringify(res) });
      if (res && res.status) {
        alert('SUCESS setting new admin !');
        this.setState(prevState => ({
          licenses: {
            ...prevState.licenses,
            [licenseAddr]: {
              ...targetLicense,
              admin,
            },
          },
        }));
      } else {
        alert('ERROR setting new admin...');
      }
    });
  }

  setLOwner(licenseAddr, owner) {
    if (!func.typeCheckAddress(owner)) {
      alert('WARNING: address invalid characters !');
      return;
    }
    const { web3, address } = this.props;
    const { licenses } = this.state;
    const targetLicense = licenses[licenseAddr];
    if (!targetLicense) return;

    func.L_set_owner(targetLicense.liContract, web3, address, owner)
      .then(res => {
        func.showLogs({ type: '[INFO]', msg: JSON.stringify(res) });
        if (res && res.status) {
          alert('SUCESS setting new owner !');
          this.setState(prevState => ({
            licenses: {
              ...prevState.licenses,
              [licenseAddr]: {
                ...targetLicense,
                owner,
              },
            },
          }));
        } else {
          alert('ERROR setting new owner...');
        }
      });
  }

  setLDate(licenseAddr, date) {
    const { web3, address } = this.props;
    const { licenses } = this.state;
    const targetLicense = licenses[licenseAddr];
    if (!targetLicense) return;

    let payableFct = null;
    if (date) payableFct = func.L_set_expiration_timestamp;
    else payableFct = func.L_remove_expiration_timestamp;

    const timestamp = date ? new Date(date).getTime() : 0;
    payableFct(targetLicense.liContract, web3, address, timestamp)
      .then(res => {
        func.showLogs({ type: '[INFO]', msg: JSON.stringify(res) });
        if (res && res.status) {
          alert('SUCESS setting expiration date !');
          this.setState(prevState => ({
            licenses: {
              ...prevState.licenses,
              [licenseAddr]: {
                ...targetLicense,
                expiry: date || '',
              },
            },
          }));
        } else {
          alert('ERROR setting expiration date...');
        }
      });
  }

  setLForSale(licenseAddr, state, price) {
    const { web3, address } = this.props;
    const { licenses } = this.state;
    const targetLicense = licenses[licenseAddr];
    if (!targetLicense) return;
    
    let payableFct = null;
    if (state) payableFct = func.L_remove_for_sale;
    else payableFct = func.L_set_for_sale;
  
    payableFct(targetLicense.liContract, web3, address, price || 10)
      .then(res => {
        func.showLogs({ type: '[INFO]', msg: JSON.stringify(res) });
        if (res && res.status) {
          alert('SUCESS setting license for sale !');
          this.setState(prevState => ({
            licenses: {
              ...prevState.licenses,
              [licenseAddr]: {
                ...targetLicense,
                forSale: !state,
              },
            },
          }));
        } else {
          alert('ERROR setting license for sale...');
        }
      });
  }

  handleInputChange(event) {
    // event.persist() // uncomment to log event object
    if (event.target.name) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleSwSelect(event) {
    // event.persist() // uncomment to log event object
    const { softwares } = this.state;
    const selection = softwares.find(item => item.addr === event.target.value)
    if (!selection) return;
    this.setState({
      currSw: selection.addr,
      currAdmin: selection.admin,
    });
  }

  render() {
    const {
      contractAddress,
      licenses,
      softwares,
      currSw,
      currAdmin,
    } = this.state;
    const mainBGColor = 'lightgrey';
    const bgColor = this.props.bgColor || 'lightgrey';
    const currentSoftware = softwares.find(sw => sw.addr === currSw);
    return (
      <div className="block-main" style={{ backgroundColor: mainBGColor }}>
        <div className="block-sub" style={{ bgColor }}>
          <form name="s_address" onSubmit={this.loadSoftwares}>
            <label>
              <span className="description">Handler contract address:</span>
              <input type="text" value={contractAddress} name="contractAddress" onChange={this.handleInputChange} size="50" />
            </label>
            <input type="submit" value="Load" />
          </form>
        </div>
        {softwares.length ? (
          <>
            <form name="f_sw" style={{ marginTop: '10px', marginBottom: '10px' }}>
              <label>
                <span className="description">Software addr: 
                <select name={`sw_${currSw}`} value={currSw} onChange={this.handleSwSelect} onBlur={this.handleSwSelect}>
                  {softwares.map(item => (
                    <option key={item.addr} value={item.addr}>{item.addr}</option>
                  ))}
                </select>
                </span>
              </label>
            </form>
            <div className="block-sub" style={{ bgColor }}>
              <form name="s_admin" onSubmit={this.setSWAdmin}>
                <label>
                  <span className="description">Software admin:</span>
                  <input type="text" value={currAdmin} disabled name="currAdmin" onChange={this.handleInputChange} onBlur={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new admin" disabled />
              </form>
            </div>
            {currentSoftware && currentSoftware.licenses && currentSoftware.licenses.length
              ? currentSoftware.licenses.map((license, i) => (
                <LicenseInfo
                  key={'lc' + i}
                  license={licenses[license] || {}}
                  setForSale={this.setLForSale}
                  setDate={this.setLDate}
                  setOwner={this.setLOwner}
                  setAdmin={this.setLAdmin}
                  bgColor={bgColor}
                />
              ))
              : (<h4>No License for this software</h4>)}
          </>
        ) : null}
      </div>
    );
  }
}

export default portisWrapper(AdminUI);
