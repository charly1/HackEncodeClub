// general functions

export function showLogs({ msg = '', type = '[ERROR]' }) {
  if (process.env.NODE_ENV === "development" && process.env.DEBUG) console.log(type + msg);
}

// functions to talk with smart contracts

const gasUseEveryWhere = 4000000;

function _signTransaction(contract_l, web3, encodedABI, account) {
    return web3.eth.signTransaction({
        data: encodedABI,
        from: account,
        gas: gasUseEveryWhere,
        to: contract_l.options.address,
    })
      .then(signedTx => {
          showLogs({ type: '[INFO]:', msg: "signed transaction" + signedTx });
          return web3.eth.sendSignedTransaction(signedTx.raw);
      })
      .then(res => {
          showLogs({ type: '[INFO]:', msg: "successfully sent signed transaction\n" + res });
          return res;
      })
      .catch(err => {
          console.error("An error occured while calling a payable func:", err);
          return false;
      });
}

// SH functions
export function SH_list_softwares(contract_sh) {
  return contract_sh.methods.getNbOfSoftware().call()
  .then(size => {
      const promises = [];

      for (let i = 0 ; i < size ; i++) 
          promises.push(contract_sh.methods.softwares(i).call());

      return Promise.all(promises);
  })
  .then(res => {
      if (res.length === 0) {
          showLogs({ type: '[INFO]:', msg: "nb of software found = 0" })
          return [];
      }
      else {
          for (let i = 0 ; i < res.length ; i++) {
              showLogs({ type: '[INFO]:', msg: `[${i}] ${res[i]}` });
          }
          showLogs({ type: '[INFO]:', msg: `Total nb of softwares: ${res.length}` })
          return res;
      }
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

// S functions
export function S_list_licenses(contract_s) {
  return contract_s.methods.get_nb_license().call()
  .then(size => {
      const promises = [];
      for (let i = 0 ; i < size ; i++) {
          promises.push(contract_s.methods.licenses(i).call());
      }
      return Promise.all(promises);
  })
  .then(res => {
      if (res.length === 0) {
          showLogs({ type: '[INFO]:', msg: "nb of license found = 0" })
          return [];
      }
      else {
          for (let i = 0 ; i < res.length ; i++) {
              showLogs({ type: '[INFO]:', msg: `[${i}] ${res[i]}` });
          }
          showLogs({ type: '[INFO]:', msg: `Total nb of licenses: ${res.length}` })
          return res;
      }
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

export function S_get_admin(contract_s) {
  return contract_s.methods.admin().call()
  .then(adr => {
      showLogs({ type: '[INFO]:', msg: "Admin address:", adr })
      return adr;
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

// export function S_set_admin(contract_s, { account, new_admin }) {
//   var query = contract_s.methods.set_admin(new_admin);
//   var encodedABI = query.encodeABI();

//   account.signTransaction({
//       data: encodedABI,
//       from: account.address,
//       gas: gasUseEveryWhere,
//       to: contract_s.options.address,
//   })
//   .then(signedTx => {
//       return w.eth.sendSignedTransaction(signedTx.rawTransaction);
//   })
//   .then(res => {
//       showLogs({ type: '[INFO]:', msg: "successfully sent signed transaction\n", res);
//       return res;
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//       return false;
//   });
// }

// L functions
export function L_get_owner(contract_l) {
  return contract_l.methods.owner().call()
  .then(res => {
      showLogs({ type: '[INFO]:', msg: "current owner:", res });
      return res;
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

// L_set_owner = (account=account_1, owner=address_account_1) => {
//   var query = contract_l.methods.set_owner(owner);
//   var encodedABI = query.encodeABI();

//   account.signTransaction({
//       data: encodedABI,
//       from: account.address,
//       gas: gasUseEveryWhere,
//       to: contract_l.options.address,
//   })
//   .then(signedTx => {
//       return w.eth.sendSignedTransaction(signedTx.rawTransaction);
//   })
//   .then(res => {
//       showLogs({ type: '[INFO]:', msg: "successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

export function L_get_admin(contract_l) {
  return contract_l.methods.admin().call()
  .then(res => {
      showLogs({ type: '[INFO]:', msg: "current admin:" + res })
      return res;
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

// L_set_admin = (account=account_1, admin=address_account_1) => {
//   var query = contract_l.methods.set_admin(admin);
//   var encodedABI = query.encodeABI();

//   account.signTransaction({
//       data: encodedABI,
//       from: account.address,
//       gas: gasUseEveryWhere,
//       to: contract_l.options.address,
//   })
//   .then(signedTx => {
//       return w.eth.sendSignedTransaction(signedTx.rawTransaction);
//   })
//   .then(res => {
//       showLogs({ type: '[INFO]:', msg: "successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

export function L_get_expiration_timestamp(contract_l) {
  return contract_l.methods.expiration_timestamp().call()
  .then(res => {
      showLogs({ type: '[INFO]:', msg: "current expiration timestamp: " + res })
      return res;
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

// L_set_expiration_timestamp = (account=account_1, timestamp=0) => {
//   var query = contract_l.methods.set_expiration_timestamp(timestamp);
//   var encodedABI = query.encodeABI();

//   account.signTransaction({
//       data: encodedABI,
//       from: account.address,
//       gas: gasUseEveryWhere,
//       to: contract_l.options.address,
//   })
//   .then(signedTx => {
//       return w.eth.sendSignedTransaction(signedTx.rawTransaction);
//   })
//   .then(res => {
//       showLogs({ type: '[INFO]:', msg: "successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

export function L_get_is_for_sale(contract_l) {
  return contract_l.methods.license_for_sale().call()
  .then(res => {
      showLogs({ type: '[INFO]:', msg: "is for sale: " + res })
      return res;
  })
  .catch(err => {
      console.error("An error occured while calling the func:", err);
      return false;
  });
}

// L_get_selling_price = () => {
//   contract_l.methods.selling_price().call()
//   .then(res => {
//       showLogs({ type: '[INFO]:', msg: `selling price:  ${wei2eth(parseInt(res))} ETH   =   ${res} wei`)
//   })
//   .catch(err => {
//       console.error("An error occured while calling the func:", err);
//   });
// }

export function L_set_for_sale(contract_l, web3, account, price=10) {
  if (!web3 || !account) return false;

  const query = contract_l.methods.set_for_sale(String(price));
  const encodedABI = query.encodeABI();

  return _signTransaction(contract_l, web3, encodedABI, account);
}

export function L_remove_for_sale(contract_l, web3, account) {
    if (!web3 || !account) return false;
    const query = contract_l.methods.remove_for_sale();
    const encodedABI = query.encodeABI();

    return _signTransaction(contract_l, web3, encodedABI, account);
}
