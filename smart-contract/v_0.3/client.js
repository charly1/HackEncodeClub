var Web3 = require('web3');

var eth_node_link = "http://127.0.0.1:7545"
w = new Web3(eth_node_link);


var contract_software_handler_abi = [{"inputs": [{"internalType": "string","name": "company_name","type": "string"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "company_name","type": "string"},{"internalType": "address","name": "software_admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getNbOfSoftware","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "index","type": "uint256"}],"name": "getSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
var contract_software_abi = [{"inputs": [{"internalType": "string","name": "company","type": "string"},{"internalType": "address","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "get_admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_company_name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "index","type": "uint256"}],"name": "get_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_company_name","type": "string"}],"name": "set_company_name","outputs": [],"stateMutability": "nonpayable","type": "function"}]
var contract_license_abi = [{"inputs": [{"internalType": "address","name": "new_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_timestamp","type": "uint256"}],"name": "set_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "new_owner","type": "address"}],"name": "set_owner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "get_admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_expiration_timestamp","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

var software_handler_contract_adr = "0x902890A54e827cadFb099104ac1C13F56207046B"
var software_contract_adr = "0x662A77c9D2F604Fee68102D3195D76Aac30b0C5a"
var license_contract_adr = "0xf3439D2B26378ab7E1e61ad00C4f193d533202eB"

var contract_sh = new w.eth.Contract(contract_software_handler_abi, software_handler_contract_adr);
var contract_s = new w.eth.Contract(contract_software_abi, software_contract_adr);
var contract_l = new w.eth.Contract(contract_license_abi, license_contract_adr);

var address_account_1 = '0x22D127bFef61bE547F26Cb95Fb4c7C099e3F34Cd';
var private_account_1 = '0x8f83886120e6aed60619b3ff665c18dbfb5741675c1934b5ef33d3f875d629de';
var account_1 = w.eth.accounts.privateKeyToAccount(private_account_1);

var address_account_2 = '0x385DC7781F4B36EeCB126B7f13779b547c127e5D';
var private_account_2 = '0xc9dff619b4f71be813ab94412ebc7406807bf2b3e7a8a5a6b9d148c6eb1a43cf';
var account_2 = w.eth.accounts.privateKeyToAccount(private_account_2);

var address_account_3 = '0x3E257d3C8AC19e4F9f513705C4Eb928A821Bb7cA';
var private_account_3 = '0x34a5b0158b0eca6a3e8f44daf55901853f10f0e72b7d4efa7612534a5d9ab793';
var account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

var address_account_4 = '0xdf6d5CcCF4C773b6c920A018c766c06C7C98b349';
var private_account_4 = '0xf1d29c4935fc9ffa4c8de9c69acd356b6053e37f369c244800d34f2982b53188';
var account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);



/* ---------------------  SH FUNC*/

var SH_add_software = (account=account_1) => {
    var query = contract_sh.methods.addSoftware("company");
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_sh.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var SH_get_nb_software = () => {
    contract_sh.methods.getNbOfSoftware().call()
    .then(res => {
        console.log("Number of software present in the contract:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var SH_get_software_from_index = (index=0) => {
    contract_sh.methods.getSoftware(index).call()
    .then(adr => {
        console.log("Software address:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}



/* ---------------------  S FUNC*/

var S_get_admin = () => {
    contract_s.methods.get_admin().call()
    .then(adr => {
        console.log("Admin address:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var S_set_admin = (account=account_1, new_admin=address_account_1) => {
    var query = contract_s.methods.set_admin(new_admin);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_s.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var S_get_company_name = () => {
    contract_s.methods.get_company_name().call()
    .then(adr => {
        console.log("Company name:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var S_set_company_name = (account=account_1, new_company_name=address_account_1) => {
    var query = contract_s.methods.set_company_name(new_company_name);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_s.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var S_add_license = (account=account_1, owner=address_account_1, admin=address_account_1, expiration_timestamp=0) => {
    var query = contract_s.methods.add_license(admin, owner, expiration_timestamp);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_s.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var S_get_license = (index=0) => {
    contract_s.methods.get_license(index).call()
    .then(adr => {
        console.log("License adr:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var S_get_nb_license = () => {
    contract_s.methods.get_nb_license().call()
    .then(nb => {
        console.log("nb of licenses stored in the smart contract:", nb)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}



/* --------------- License funcs */

var L_get_owner = () => {
    contract_l.methods.get_owner().call()
    .then(res => {
        console.log("current owner:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var L_set_owner = (account=account_1, owner=address_account_1) => {
    var query = contract_l.methods.set_owner(owner);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_l.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var L_get_admin = () => {
    contract_l.methods.get_admin().call()
    .then(res => {
        console.log("current admin:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var L_set_admin = (account=account_1, admin=address_account_1) => {
    var query = contract_l.methods.set_admin(admin);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_l.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var L_get_expiration_timestamp = () => {
    contract_l.methods.get_expiration_timestamp().call()
    .then(res => {
        console.log("current expiration timestamp:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var L_set_expiration_timestamp = (account=account_1, timestamp=0) => {
    var query = contract_l.methods.set_expiration_timestamp(timestamp);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_l.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}

var L_remove_expiration_timestamp = (account=account_1) => {
    var query = contract_l.methods.remove_expiration_timestamp();
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract_l.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res);
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });
}
