// functions to talk with smart contracts

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
          console.log("nb of software found = 0")
          return [];
      }
      else {
          for (let i = 0 ; i < res.length ; i++) {
              console.log(`[${i}] ${res[i]}`);
          }
          console.log(`Total nb of softwares: ${res.length}`)
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
          console.log("nb of license found = 0")
          return [];
      }
      else {
          for (let i = 0 ; i < res.length ; i++) {
              console.log(`[${i}] ${res[i]}`);
          }
          console.log(`Total nb of licenses: ${res.length}`)
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
      console.log("Admin address:", adr)
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
//       console.log("successfully sent signed transaction\n", res);
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
      console.log("current owner:", res);
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
//       console.log("successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

// L_get_admin = () => {
//   contract_l.methods.admin().call()
//   .then(res => {
//       console.log("current admin:", res)
//   })
//   .catch(err => {
//       console.error("An error occured while calling the func:", err);
//   });
// }

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
//       console.log("successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

// L_get_expiration_timestamp = () => {
//   contract_l.methods.expiration_timestamp().call()
//   .then(res => {
//       console.log("current expiration timestamp:", res)
//   })
//   .catch(err => {
//       console.error("An error occured while calling the func:", err);
//   });
// }

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
//       console.log("successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

// L_remove_expiration_timestamp = (account=account_1) => {
//   var query = contract_l.methods.remove_expiration_timestamp();
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
//       console.log("successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

// L_get_is_for_sale = () => {
//   contract_l.methods.license_for_sale().call()
//   .then(res => {
//       console.log("is for sale:", res)
//   })
//   .catch(err => {
//       console.error("An error occured while calling the func:", err);
//   });
// }

// L_get_selling_price = () => {
//   contract_l.methods.selling_price().call()
//   .then(res => {
//       console.log(`selling price:  ${wei2eth(parseInt(res))} ETH   =   ${res} wei`)
//   })
//   .catch(err => {
//       console.error("An error occured while calling the func:", err);
//   });
// }

// L_set_for_sale = (account=account_1, price=10) => {
//   var query = contract_l.methods.set_for_sale(String(price));
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
//       console.log("successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }

// L_remove_for_sale = (account=account_1) => {
//   var query = contract_l.methods.remove_for_sale();
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
//       console.log("successfully sent signed transaction\n", res);
//   })
//   .catch(err => {
//       console.error("An error occured while calling a payable func:", err);
//   });
// }
