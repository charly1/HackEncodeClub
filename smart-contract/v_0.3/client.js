var Web3 = require('web3');

var eth_node_link = "https://ropsten.infura.io/v3/709fd1df01b54f5ab3b9f696894dfb10"
w = new Web3(eth_node_link);


var contract_software_handler_abi = [{"inputs": [{"internalType": "string","name": "company_name","type": "string"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "company_name","type": "string"},{"internalType": "address","name": "software_admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getNbOfSoftware","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "index","type": "uint256"}],"name": "getSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
var contract_software_abi = [{"inputs": [{"internalType": "string","name": "company","type": "string"},{"internalType": "address","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "get_admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_company_name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "index","type": "uint256"}],"name": "get_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_company_name","type": "string"}],"name": "set_company_name","outputs": [],"stateMutability": "nonpayable","type": "function"}]
var contract_license_abi = [{"inputs": [{"internalType": "address","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "get_admin","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_expiration_timestamp","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_is_for_sell","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_owner","outputs": [{"internalType": "address","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_selling_price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "remove_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "remove_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "new_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_timestamp","type": "uint256"}],"name": "set_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_minimum_price_for_sell","type": "uint256"}],"name": "set_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_owner","type": "address"}],"name": "set_owner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}]

var software_handler_contract_adr = "0x977Bc6DcbE6Dd351661bA91EbD155cC08E98164a"
var software_contract_adr = ""
var license_contract_adr = ""

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

var wei2eth = (amount) => {
    return parseFloat(amount) / 1000000000000000000
}

var eth2wei = (amount) => {
    return parseInt(w.utils.toWei(String(amount), 'ether'))
}

var balance = (adr=address_account_1) => { 
    w.eth.getBalance(adr)
    .then(res => {
        console.log(`balance:  ${wei2eth(parseInt(res))} ETH   =   ${res} wei`)
    })
}

var send_monney = (from=account_1, to=account_2, amount=10, unit='wei') => {

    if (typeof(to) !== 'string')
        to = to.address;

    w.eth.accounts.signTransaction({
        to: to,
        value: w.utils.toWei(String(amount), String(unit)),
        gas: 2000000,
    }, from.privateKey) 
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("Successfully sent monney ", res);
    })
    .catch(err => {
        console.error("An error occured while sending monney: ", err);
    })
}


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

var L_send_payment_to_contract = (account=account_1, amount=10) => {

}

var L_get_is_for_sale = () => {
    contract_l.methods.get_is_for_sell().call()
    .then(res => {
        console.log("is for sale:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var L_get_selling_price = () => {
    contract_l.methods.get_selling_price().call()
    .then(res => {
        console.log(`selling price:  ${wei2eth(parseInt(res))} ETH   =   ${res} wei`)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

var L_set_for_sale = (account=account_1, price=10) => {
    var query = contract_l.methods.set_for_sale(price);
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

var L_remove_for_sale = (account=account_1) => {
    var query = contract_l.methods.remove_for_sale();
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


