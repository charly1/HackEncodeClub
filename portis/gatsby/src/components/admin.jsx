import React from "react"
import CONTRACT_ABI from '../config/contract_abi';
import HANDLER_ABI from '../config/handler_abi';
import LICENSE_ABI from '../config/license_abi';
import * as func from '../utils';


// {
//   contract: swContract,
//   addr: license,
//   admin,
//   owner,
//   expiry: '2021-04-25',
//   forSale: false,
// }

function loadAll(contract_sh, web3) {
  return func.SH_list_softwares(contract_sh)
    .then(sofwares => {
      if (sofwares) {
        const promises = [];
        sofwares.forEach(software => {
          const swContract = web3 ? new web3.eth.Contract(CONTRACT_ABI, software) : null;
          if (swContract) {
            promises.push(func.S_list_licenses(swContract)
              .then(licenses => ({ licenses, swContract }))
              .then(({ licenses, swContract }) => {
                return func.S_get_admin(swContract)
                  .then((admin) => ({ admin, swContract, licenses }));
              })
              .then(({ admin, swContract, licenses }) => {
                if (!admin) return Promise.resolve(false);
                const licensePromise = [];
                licenses.forEach(license => {
                  const liContract = web3 ? new web3.eth.Contract(LICENSE_ABI, license) : null;
                  if (liContract) {
                    licensePromise.push(
                      func.L_get_owner(liContract)
                        .then((owner) => ({ owner, admin, swContract, liContract }))
                        .then(({ owner, admin, swContract, liContract }) => {
                          return Promise.resolve({
                            swContract: swContract,
                            liContract: liContract,
                            addr: license,
                            admin,
                            owner,
                            expiry: '2021-04-25',
                            forSale: false,
                          });
                        }))
                    }
                  });
                return Promise.all(licensePromise);
              }))
          }
        });
        return Promise.all(promises);
      }
      return false;
    })
      .catch(err => {
        console.log('ERROR: load all: ', err);
        return false;
      });
}
class AdminUI extends React.Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleLicenseaddr = this.handleLicenseaddr.bind(this);
    this.loadLicenses = this.loadLicenses.bind(this);
    this.changeAdmin = this.changeAdmin.bind(this);
    this.changeOwner = this.changeOwner.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeForSale = this.changeForSale.bind(this);

    this.state = {
      contractAddress: process.env.CONTRACT_ADDR_HANDLER || '',
      licenses: [],
      currLicenseaddr: '',
      currAdmin: '',
      currOwner: '',
      currExpiry: '',
      currForSale: false,
      handlerContract: null,
      swContract: null,
    };
  }

  loadLicenses(event) {
    event.preventDefault(); // avoid page reloading
    const { web3 } = this.props;
    const { contractAddress } = this.state;
    const handlerContract = web3 ? new web3.eth.Contract(HANDLER_ABI, contractAddress) : null;

    loadAll(handlerContract, web3)
      .then((result) => {
        console.log('ALL RESULTS', result);
        if (result && result.length && result[0].length) {
          const all = result[0];
          this.setState({
            licenses: all,
            currAdmin: all[0].admin,
            currOwner: all[0].owner,
            currExpiry: all[0].expiry,
            currForSale: !!all[0].forSale,
            handlerContract,
          })
        }
      })
        .catch(err => console.log('ERROR', err));

    // const licenses = [
    //   { addr: '31msd930290adn90ind', admin: 'adobe', owner: 'yolo98', expiry: '2021-04-25', forSale: false },
    //   { addr: 'cdopwad9ud90wasnd90', admin: 'adobe', owner: 'gugus', expiry: '2021-01-24', forSale: true},
    //   { addr: 'mmdmewoasdpj9097asd', admin: 'office', owner: 'superman', expiry: '2021-11-18'},
    // ]
    // this.setState({
    //   licenses: allLicenses,
    //   currAdmin: licenses[0].admin,
    //   currOwner: licenses[0].owner,
    //   currExpiry: licenses[0].expiry,
    //   currForSale: !!licenses[0].forSale,
    //   handlerContract,
    //   // swContract,
    // })
  }

  changeAdmin(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    const { currAdmin, swContract } = this.state;
    swContract.methods.adminChanged(currAdmin).send();
    console.log("sync currAdmin", currAdmin)
  }

  changeOwner(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    const { currOwner, swContract } = this.state;
    swContract.methods.adminChanged(currOwner).call();
    console.log("sync currOwner", currOwner)
  }

  changeDate(event) {
    // event.persist() // uncomment to log event object
    event.preventDefault(); // avoid page reloading
    // const { portis, web3, email, network } = this.props;
    const { currExpiry } = this.state;
    console.log("sync currExpiry", currExpiry)
  }

  changeForSale(forSale) {
    // event.persist() // uncomment to log event object
    //   L_set_for_sale = (account=account_1, price=10) => {
    //     var query = contract_l.methods.set_for_sale(String(price));
    //     var encodedABI = query.encodeABI();
    
    //     account.signTransaction({
    //         data: encodedABI,
    //         from: account.address,
    //         gas: gasUseEveryWhere,
    //         to: contract_l.options.address,
    //     })
    //     .then(signedTx => {
    //         return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    //     })
    //     .then(res => {
    //         console.log("successfully sent signed transaction\n", res);
    //     })
    //     .catch(err => {
    //         console.error("An error occured while calling a payable func:", err);
    //     });
    // }
    this.setState({ currForSale: !forSale });
  }

  handleInputChange(event) {
    // event.persist() // uncomment to log event object
    if (event.target.name) {
      this.setState({ [event.target.name]: event.target.value });
    }
  }

  handleLicenseaddr(event) {
    // event.persist() // uncomment to log event object
    const { licenses } = this.state;
    const selection = licenses.find(item => item.addr === event.target.value)
    if (!selection) return;
    this.setState({
      currLicenseaddr: event.target.value,
      currAdmin: selection.admin,
      currOwner: selection.owner,
      currExpiry: selection.expiry,
      currForSale: selection.forSale,
    });
  }

  render() {
    const {
      contractAddress,
      licenses,
      currLicenseaddr,
      currOwner,
      currAdmin,
      currExpiry,
      currForSale,
    } = this.state;
    const bgcolor = '#9ab394';
    return (
      <div className="block-main" style={{ backgroundColor: '#267469' }}>
        <div className="block-sub" style={{ bgcolor }}>
          <form name="s_address" onSubmit={this.loadLicenses}>
            <label>
              <span className="description">Software contract address:</span>
              <input type="text" value={contractAddress} name="contractAddress" onChange={this.handleInputChange} size="50" />
            </label>
            <input type="submit" value="Load" />
          </form>
        </div>
        {licenses.length ? (
          <>
            <form name="f_license">
              <label>
                <span className="description">Licence addr:
                <select name={`license_${currLicenseaddr}`} onChange={this.handleLicenseaddr}>
                  {licenses.map(item => (
                    <option key={item.addr} value={item.addr}>{item.addr}</option>
                  ))}
                </select>
                </span>
              </label>
              {/* <input type="submit" value="Load details" /> */}
            </form>
            <div className="block-sub" style={{ bgcolor }}>
              <form name="s_admin" onSubmit={this.changeAdmin}>
                <label>
                  <span className="description">Admin:</span>
                  <input type="text" value={currAdmin} disabled={!currForSale} name="currAdmin" onChange={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new admin" disabled={!currForSale} />
              </form>
            </div>
            <div className="block-sub" style={{ bgcolor }}>
              <form name="s_owner" onSubmit={this.changeOwner}>
                <label>
                  <span className="description">Owner:</span>
                  <input type="text" value={currOwner} disabled={!currForSale} name="currOwner" onChange={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new owner" disabled={!currForSale} />
              </form>
            </div>
            <div className="block-sub" style={{ bgcolor }}>
              <form name="s_expiry" onSubmit={this.changeDate}>
                <label>
                  <span className="description">Expiry date:</span>
                  <input type="text" value={currExpiry} disabled={!currForSale} name="currExpiry" onChange={this.handleInputChange} size="50" />
                </label>
                <input type="submit" value="Set new date" disabled={!currForSale} />
              </form>
            </div>
            <div className="block-sub" style={{ bgcolor, alignItems: 'center'}}>
              <button onClick={() => this.changeForSale(currForSale)} style={{ width: '200px'  }}>
                For sale ?: {currForSale ? 'yes 🔵' : 'no 🔴'}
              </button>
            </div>
          </>
        ) : null}
      </div>
    );
  }
}

export default AdminUI;
