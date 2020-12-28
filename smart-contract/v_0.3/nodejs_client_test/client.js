// to test: 
// open a console
// type `npm install`
// run `node`
// type `require('./client.js')`
// you are now able to use all the function you wish, have fun !

Web3 = require('web3');

// env = 'prod'     // for mainnet ethereum blockchain, not working for now
env = 'test'        // for testing on ropsten blockchain
//env = 'debug'     // for debug on ganache local blockchain

// using ws or wss to be compatible with event emit
eth_node_link_infura = "wss://ropsten.infura.io/ws/v3/709fd1df01b54f5ab3b9f696894dfb10"
eth_node_link_ganache = "ws://127.0.0.1:7545"
w = new Web3(eth_node_link_infura);

contract_software_handler_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "softwareAdded","type": "event"},{"inputs": [{"internalType": "string","name": "company_name","type": "string"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "company_name","type": "string"},{"internalType": "address payable","name": "software_admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getNbOfSoftware","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "softwares","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"stateMutability": "payable","type": "receive"}]
contract_software_abi = [{"inputs": [{"internalType": "string","name": "company","type": "string"},{"internalType": "address payable","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "companyNameChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseAdded","type": "event"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "adr","type": "address"}],"name": "check_license","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "company_name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "oldOwner","type": "address"},{"internalType": "address","name": "newOwner","type": "address"}],"name": "licenseHasChangedOwner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "licenses","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "ownerLicense","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_company_name","type": "string"}],"name": "set_company_name","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}]
contract_license_abi = [{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "expirationTimestampChanged","type": "event"},{"anonymous": false,"inputs": [],"name": "licenseRemovedFromSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "licenseSetForSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"},{"indexed": false,"internalType": "address","name": "","type": "address"},{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseSold","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "ownerChanged","type": "event"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "expiration_timestamp","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "license_for_sale","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "remove_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "remove_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "selling_price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_timestamp","type": "uint256"}],"name": "set_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_selling_price","type": "uint256"}],"name": "set_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_owner","type": "address"}],"name": "set_owner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "software","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"stateMutability": "payable","type": "receive"}]

software_handler_contract_adr = "0xfd217c7d08e1b3477b4a95e6f9d9d149d8e74621"
software_contract_adr = "0xc3Fe598B1D56aCaa8Ce7c5468230228E4D614120"
license_contract_adr = "0xa59ddA2b29E099f172FE12e0454eBC2193C5e93E"

contract_sh = new w.eth.Contract(contract_software_handler_abi, software_handler_contract_adr);
contract_s = new w.eth.Contract(contract_software_abi, software_contract_adr);
contract_l = new w.eth.Contract(contract_license_abi, license_contract_adr);

//keys for ropsten:
address_account_1 = '0xFe5a44605eEd83DAe7e2CA1A83F84Ed61Ce38DCD';
private_account_1 = '0xe5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9';
account_1 = w.eth.accounts.privateKeyToAccount(private_account_1);

address_account_2 = '0xdead29e9dd478451c6852f4278cA07DEED98F706';
private_account_2 = '0xf24826dd47d25a84e2d0e30cdda6f431d0ef9dc8be36cf42719860d09fce21a3';
account_2 = w.eth.accounts.privateKeyToAccount(private_account_2);

//same as account_1
address_account_3 = '0xFe5a44605eEd83DAe7e2CA1A83F84Ed61Ce38DCD';
private_account_3 = '0xe5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9';
account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

//same as account_2
address_account_4 = '0xdead29e9dd478451c6852f4278cA07DEED98F706';
private_account_4 = '0xf24826dd47d25a84e2d0e30cdda6f431d0ef9dc8be36cf42719860d09fce21a3';
account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);

gasUseEveryWhere = 2000000;


if (env === 'debug') {
    // ganache mnemonic: verb outside toast guess version common fox again army excite purse doll
    w = new Web3(eth_node_link_ganache);

    contract_software_handler_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "softwareAdded","type": "event"},{"inputs": [{"internalType": "string","name": "company_name","type": "string"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "company_name","type": "string"},{"internalType": "address payable","name": "software_admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "getNbOfSoftware","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "softwares","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"stateMutability": "payable","type": "receive"}]
    contract_software_abi = [{"inputs": [{"internalType": "string","name": "company","type": "string"},{"internalType": "address payable","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "companyNameChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseAdded","type": "event"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "adr","type": "address"}],"name": "check_license","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "company_name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "oldOwner","type": "address"},{"internalType": "address","name": "newOwner","type": "address"}],"name": "licenseHasChangedOwner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "licenses","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "ownerLicense","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_company_name","type": "string"}],"name": "set_company_name","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}]
    contract_license_abi = [{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "expirationTimestampChanged","type": "event"},{"anonymous": false,"inputs": [],"name": "licenseRemovedFromSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "licenseSetForSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"},{"indexed": false,"internalType": "address","name": "","type": "address"},{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseSold","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "ownerChanged","type": "event"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "expiration_timestamp","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "license_for_sale","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "remove_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "remove_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "selling_price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_timestamp","type": "uint256"}],"name": "set_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_selling_price","type": "uint256"}],"name": "set_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_owner","type": "address"}],"name": "set_owner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "software","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"stateMutability": "payable","type": "receive"}]

    software_handler_contract_adr = "0x83CF1f445cc4350Ce37C763d6e4498e244fc0d72"
    software_contract_adr = "0xD2fB4832435E2ff6D854d8670EbBfCA10d14D01e"
    license_contract_adr = "0x8881Ea810fC1F2E0b7b432aFfbe67799283b8e2D"

    contract_sh = new w.eth.Contract(contract_software_handler_abi, software_handler_contract_adr);
    contract_s = new w.eth.Contract(contract_software_abi, software_contract_adr);
    contract_l = new w.eth.Contract(contract_license_abi, license_contract_adr);

    // keys for ganache:
    address_account_1 = '0x4B11aCbBB4AA56D32314cb406F0F4175d7f19604';
    private_account_1 = '0xab1e63f0eeec071e7525ab3ea2f69df4d0bf6aebd595cf00812652f80190720d';
    account_1 = w.eth.accounts.privateKeyToAccount(private_account_1);

    address_account_2 = '0x1bB0eF37667A713E9Be2ed6E0d5248Cf6E4eaff3';
    private_account_2 = '0x135f945c16d0dadacc7142f2a8a55abcc411319077aa6a72680fcf0c6f767f1a';
    account_2 = w.eth.accounts.privateKeyToAccount(private_account_2);

    address_account_3 = '0xED96E5B9e0ca53b3ad9c3CD2e9E83C2Dba3ce67a';
    private_account_3 = '0xc22865e4d0802326d7583ede5b56770a942ef5e9574c93681c1c9eb01634a84c';
    account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

    address_account_4 = '0xbC06D7dc4d8D49CbaB03516a52B7953885b91717';
    private_account_4 = '0xeab60409eee9423a2f240ba934a52e5e7a90148ff70e1e06a8aa1a9cb8ff6a49';
    account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);
}

// events listener
event_sh_listener_softwareAdded = contract_sh.events.softwareAdded({}, (error, res) => {console.log(`a new software was added: ${res.returnValues['0']}`);});

event_s_listener_adminChanged = contract_s.events.adminChanged({}, (error, res) => {console.log(`the admin has changed: ${res.returnValues['0']}`);});
event_s_listener_companyNameChanged = contract_s.events.companyNameChanged({}, (error, res) => {console.log(`the company name has changed: ${res.returnValues['0']}`);});
event_s_listener_licenseAdded = contract_s.events.licenseAdded({}, (error, res) => {console.log(`a new license was added: ${res.returnValues['0']}`);});

event_l_adminChanged = contract_l.events.adminChanged({}, (error, res) => {console.log(`the admin  has changed: ${res.returnValues['0']}`);}); 
event_l_ownerChanged = contract_l.events.ownerChanged({}, (error, res) => {console.log(`the owner has changed: ${res.returnValues['0']}`);});
event_l_expirationTimestampChanged = contract_l.events.expirationTimestampChanged({}, (error, res) => {console.log(`the expiration timestamp has changed: ${res.returnValues['0']} `);});
event_l_licenseSetForSale = contract_l.events.licenseSetForSale({}, (error, res) => {console.log(`the license is now for sale at a price of ${res.returnValues['0']} wei  =  ${wei2eth(res.returnValues['0'])} ETH`);});
event_l_licenseRemovedFromSale = contract_l.events.licenseRemovedFromSale({}, (error, res) => {console.log(`the license was removed from sale`);});
event_l_licenseSold = contract_l.events.licenseSold({}, (error, res) => {console.log(`the license has been sold at a price of ${res.returnValues['0']} wei  =  ${wei2eth(res.returnValues['0'])} ETH. Old owner: ${res.returnValues['1']}, new owner: ${res.returnValues['2']} `);});


wei2eth = (amount) => {
    return parseFloat(amount) / 1000000000000000000
}

eth2wei = (amount) => {
    return parseInt(w.utils.toWei(String(amount), 'ether'))
}

balance = (adr=address_account_1) => { 
    w.eth.getBalance(adr)
    .then(res => {
        console.log(`balance:  ${wei2eth(parseInt(res))} ETH   =   ${res} wei`)
    })
}

send_monney = (from=account_1, to=account_2, amount=10, unit='wei') => {

    if (typeof(to) !== 'string')
        to = to.address;

    w.eth.accounts.signTransaction({
        to: to,
        value: w.utils.toWei(String(amount), String(unit)),
        gas: gasUseEveryWhere,
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

SH_add_software = (account=account_1, company_name="company") => {
    var query = contract_sh.methods.addSoftware(company_name);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

SH_get_nb_software = () => {
    contract_sh.methods.getNbOfSoftware().call()
    .then(res => {
        console.log("Number of software present in the contract:", res);
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

SH_get_software_from_index = (index=0) => {
    contract_sh.methods.softwares(index).call()
    .then(adr => {
        console.log("Software address:", adr);
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

SH_list_softwares = () => {
    contract_sh.methods.getNbOfSoftware().call()
    .then(size => {
        promises = [];

        for (let i = 0 ; i < size ; i++) 
            promises.push(contract_sh.methods.softwares(i).call());

        return Promise.all(promises);
    })
    .then(res => {
        if (res.length === 0) {
            console.log("nb of software found = 0")
        }
        else {
            for (let i = 0 ; i < res.length ; i++) {
                console.log(`[${i}] ${res[i]}`);
            }
            console.log(`Total nb of softwares: ${res.length}`)
        }
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}


/* ---------------------  S FUNC*/

S_get_admin = () => {
    contract_s.methods.admin().call()
    .then(adr => {
        console.log("Admin address:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_set_admin = (account=account_1, new_admin=address_account_1) => {
    var query = contract_s.methods.set_admin(new_admin);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

S_get_company_name = () => {
    contract_s.methods.company_name().call()
    .then(adr => {
        console.log("Company name:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_set_company_name = (account=account_1, new_company_name=address_account_1) => {
    var query = contract_s.methods.set_company_name(new_company_name);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

S_add_license = (account=account_1, owner=address_account_1, admin=address_account_1, expiration_timestamp=0) => {
    var query = contract_s.methods.add_license(admin, owner, expiration_timestamp);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

S_get_license = (index=0) => {
    contract_s.methods.licenses(index).call()
    .then(adr => {
        console.log("License adr:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_get_nb_license = () => {
    contract_s.methods.get_nb_license().call()
    .then(nb => {
        console.log("nb of licenses stored in the smart contract:", nb)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_list_licenses = () => {
    contract_s.methods.get_nb_license().call()
    .then(size => {

        promises = [];

        for (let i = 0 ; i < size ; i++) {
            promises.push(contract_s.methods.licenses(i).call());
        }

        return Promise.all(promises);
    })
    .then(res => {
        if (res.length === 0) {
            console.log("nb of license found = 0")
        }
        else {
            for (let i = 0 ; i < res.length ; i++) {
                console.log(`[${i}] ${res[i]}`);
            }
            console.log(`Total nb of licenses: ${res.length}`)
        }
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_check_license = (account=account_1) => {

    contract_s.methods.check_license(account.address).call()
        .then(res => {
            console.log("result: ", res)
        })
        .catch(err => {
            console.error("An error occured while calling the func:", err);
        });
}


/* --------------- License funcs */

L_get_owner = () => {
    contract_l.methods.owner().call()
    .then(res => {
        console.log("current owner:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

L_set_owner = (account=account_1, owner=address_account_1) => {
    var query = contract_l.methods.set_owner(owner);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

L_get_admin = () => {
    contract_l.methods.admin().call()
    .then(res => {
        console.log("current admin:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

L_set_admin = (account=account_1, admin=address_account_1) => {
    var query = contract_l.methods.set_admin(admin);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

L_get_expiration_timestamp = () => {
    contract_l.methods.expiration_timestamp().call()
    .then(res => {
        console.log("current expiration timestamp:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

L_set_expiration_timestamp = (account=account_1, timestamp=0) => {
    var query = contract_l.methods.set_expiration_timestamp(timestamp);
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

L_remove_expiration_timestamp = (account=account_1) => {
    var query = contract_l.methods.remove_expiration_timestamp();
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

L_get_is_for_sale = () => {
    contract_l.methods.license_for_sale().call()
    .then(res => {
        console.log("is for sale:", res)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

L_get_selling_price = () => {
    contract_l.methods.selling_price().call()
    .then(res => {
        console.log(`selling price:  ${wei2eth(parseInt(res))} ETH   =   ${res} wei`)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

L_set_for_sale = (account=account_1, price=10) => {
    var query = contract_l.methods.set_for_sale(String(price));
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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

L_remove_for_sale = (account=account_1) => {
    var query = contract_l.methods.remove_for_sale();
    var encodedABI = query.encodeABI();

    account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: gasUseEveryWhere,
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
