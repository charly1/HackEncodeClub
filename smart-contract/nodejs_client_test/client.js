// to test: 
// open a console
// type `npm install`
// run `node`
// type `require('./client.js')`
// you are now able to use all the function you wish, have fun !

Web3 = require('web3');

// env = 'prod'     // for mainnet ethereum blockchain, not working for now
env = 'test'        // for testing on ropsten blockchain
// env = 'debug'     // for debug on ganache local blockchain

// using ws or wss to be compatible with event emit
eth_node_link_infura = "wss://ropsten.infura.io/ws/v3/709fd1df01b54f5ab3b9f696894dfb10"
eth_node_link_ganache = "ws://127.0.0.1:7545"
w = new Web3(eth_node_link_infura);

contract_software_handler_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "softwareAdded","type": "event"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "address payable","name": "admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "uint256","name": "license_time_default","type": "uint256"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "uint256","name": "license_time_default","type": "uint256"},{"internalType": "address payable","name": "admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "get_softwares_with_admin","outputs": [{"internalType": "contract Software[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getNbOfSoftware","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "softwares","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
contract_software_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "defaultLicenseTimeChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseAdded","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "nameChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "versionChanged","type": "event"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "oldOwner","type": "address"},{"internalType": "address","name": "newOwner","type": "address"}],"name": "licenseHasChangedOwner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_license_time_default","type": "uint256"}],"name": "set_license_time_default","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_name","type": "string"}],"name": "set_name","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_version","type": "string"}],"name": "set_version","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"},{"inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_version","type": "string"},{"internalType": "uint256","name": "_license_time_default","type": "uint256"},{"internalType": "address payable","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "adr","type": "address"}],"name": "check_license","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "get_licenses_with_admin","outputs": [{"internalType": "contract License[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "get_licenses_with_owner","outputs": [{"internalType": "contract License[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "license_time_default","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "licenses","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "ownerLicense","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "version","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}]
contract_license_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "expirationTimestampChanged","type": "event"},{"anonymous": false,"inputs": [],"name": "licenseRemovedFromSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "licenseSetForSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"},{"indexed": false,"internalType": "address","name": "","type": "address"},{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseSold","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "ownerChanged","type": "event"},{"inputs": [],"name": "remove_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "remove_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_timestamp","type": "uint256"}],"name": "set_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_selling_price","type": "uint256"}],"name": "set_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_owner","type": "address"}],"name": "set_owner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"stateMutability": "payable","type": "receive"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "expiration_timestamp","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "license_for_sale","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "selling_price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "software","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

software_handler_contract_adr = "0x0F398EdDcB4FF9d6e20B0388E0fdCEDBa55117CE"
software_contract_adr = "0xAD186262602936193FABd5d2Cca2160C5fE1c2A1"
license_contract_adr = "0xcAB72379D87124dc9Ba6Aa218f00E789a76e5A55"

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

address_account_3 = '0xcAfe849aE18c3F2Eb28c7f9cA0A6373fBF754249';
private_account_3 = '0x012ea711ed51ce8ac81810b65ee083b541a20f4284fd309321581a30709f0aa4';
account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

address_account_4 = '0xbAbe15C7c5D88bD040D079473B98FD1B0AFa1188';
private_account_4 = '0xda8a3d5045c1ce6799e35c329ef12d82a93ee4132963527631c5cc0f2141f68a';
account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);

gasUseEveryWhere = 4000000;


if (env === 'debug') {
    // ganache mnemonic: verb outside toast guess version common fox again army excite purse doll
    w = new Web3(eth_node_link_ganache);

    contract_software_handler_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "softwareAdded","type": "event"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "address payable","name": "admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "uint256","name": "license_time_default","type": "uint256"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "name","type": "string"},{"internalType": "string","name": "version","type": "string"},{"internalType": "uint256","name": "license_time_default","type": "uint256"},{"internalType": "address payable","name": "admin","type": "address"}],"name": "addSoftware","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "get_softwares_with_admin","outputs": [{"internalType": "contract Software[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "getNbOfSoftware","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "softwares","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"}]
    contract_software_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "defaultLicenseTimeChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseAdded","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "nameChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "versionChanged","type": "event"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address","name": "oldOwner","type": "address"},{"internalType": "address","name": "newOwner","type": "address"}],"name": "licenseHasChangedOwner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_license_time_default","type": "uint256"}],"name": "set_license_time_default","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_name","type": "string"}],"name": "set_name","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_version","type": "string"}],"name": "set_version","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"},{"inputs": [{"internalType": "string","name": "_name","type": "string"},{"internalType": "string","name": "_version","type": "string"},{"internalType": "uint256","name": "_license_time_default","type": "uint256"},{"internalType": "address payable","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "adr","type": "address"}],"name": "check_license","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_admin","type": "address"}],"name": "get_licenses_with_admin","outputs": [{"internalType": "contract License[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "_owner","type": "address"}],"name": "get_licenses_with_owner","outputs": [{"internalType": "contract License[]","name": "","type": "address[]"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "license_time_default","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "licenses","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "ownerLicense","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "version","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"}]
    contract_license_abi = [{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "expirationTimestampChanged","type": "event"},{"anonymous": false,"inputs": [],"name": "licenseRemovedFromSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"}],"name": "licenseSetForSale","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "uint256","name": "","type": "uint256"},{"indexed": false,"internalType": "address","name": "","type": "address"},{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseSold","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "ownerChanged","type": "event"},{"inputs": [],"name": "remove_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "remove_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "new_timestamp","type": "uint256"}],"name": "set_expiration_timestamp","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_selling_price","type": "uint256"}],"name": "set_for_sale","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "new_owner","type": "address"}],"name": "set_owner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"stateMutability": "nonpayable","type": "constructor"},{"stateMutability": "payable","type": "receive"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "expiration_timestamp","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "license_for_sale","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "owner","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "selling_price","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "software","outputs": [{"internalType": "contract Software","name": "","type": "address"}],"stateMutability": "view","type": "function"}]

    software_handler_contract_adr = "0x24c5aff85bEe2DE4E7e7d7225E4651A5764e043F"
    software_contract_adr = "0xf2d6846B392622D8b2C9037DA4E52E1dD11BC5FF"
    license_contract_adr = "0x525a35a3Cee0C43CDcf454338A05e94FbfF67eE5"

    contract_sh = new w.eth.Contract(contract_software_handler_abi, software_handler_contract_adr);
    contract_s = new w.eth.Contract(contract_software_abi, software_contract_adr);
    contract_l = new w.eth.Contract(contract_license_abi, license_contract_adr);

    // keys for ganache:
    address_account_1 = '0x22D127bFef61bE547F26Cb95Fb4c7C099e3F34Cd';
    private_account_1 = '0x8f83886120e6aed60619b3ff665c18dbfb5741675c1934b5ef33d3f875d629de';
    account_1 = w.eth.accounts.privateKeyToAccount(private_account_1);

    address_account_2 = '0x385DC7781F4B36EeCB126B7f13779b547c127e5D';
    private_account_2 = '0xc9dff619b4f71be813ab94412ebc7406807bf2b3e7a8a5a6b9d148c6eb1a43cf';
    account_2 = w.eth.accounts.privateKeyToAccount(private_account_2);

    address_account_3 = '0x3E257d3C8AC19e4F9f513705C4Eb928A821Bb7cA';
    private_account_3 = '0x34a5b0158b0eca6a3e8f44daf55901853f10f0e72b7d4efa7612534a5d9ab793';
    account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

    address_account_4 = '0xdf6d5CcCF4C773b6c920A018c766c06C7C98b349';
    private_account_4 = '0xf1d29c4935fc9ffa4c8de9c69acd356b6053e37f369c244800d34f2982b53188';
    account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);
}

// events listener
event_sh_listener_softwareAdded = contract_sh.events.softwareAdded({}, (error, res) => {console.log(`a new software was added: ${res.returnValues['0']}`);});

event_s_listener_adminChanged = contract_s.events.adminChanged({}, (error, res) => {console.log(`the admin has changed: ${res.returnValues['0']}`);});
event_s_listener_nameChanged = contract_s.events.nameChanged({}, (error, res) => {console.log(`the name has changed: ${res.returnValues['0']}`);});
event_s_listener_versionChanged = contract_s.events.versionChanged({}, (error, res) => {console.log(`the version has changed: ${res.returnValues['0']}`);});
event_s_listener_defaultLicenseChanged = contract_s.events.defaultLicenseTimeChanged({}, (error, res) => {console.log(`the defaultLicenseTime has changed: ${res.returnValues['0']}`);});
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

SH_add_software = (account=account_1, name="software name", version="1.0.0", license_default=0) => {
    var query = contract_sh.methods.addSoftware(name, version, license_default);
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

SH_get_softwares_with_admin = (admin=account_1) => {

	if (typeof(admin) !== 'string') {
		admin = admin.address;
	}

    contract_sh.methods.get_softwares_with_admin(admin).call()
    .then(res => {
        console.log("Here are all the software address that has as admin the argument required:\n", res);
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

S_get_name = () => {
    contract_s.methods.name().call()
    .then(adr => {
        console.log("Software name:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_set_name = (account=account_1, new_name="new name") => {
    var query = contract_s.methods.set_name(new_name);
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

S_get_version = () => {
    contract_s.methods.version().call()
    .then(adr => {
        console.log("Software version:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_set_version = (account=account_1, new_version="new version") => {
    var query = contract_s.methods.set_version(new_version);
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

S_get_license_default_ttl = () => {
    contract_s.methods.license_time_default().call()
    .then(adr => {
        console.log("Software license_default_ttl:", adr)
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_set_license_default_ttl = (account=account_1, new_license_default_ttl="new license_default_ttl") => {
    var query = contract_s.methods.set_license_time_default(new_license_default_ttl);
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

S_add_n_licenses = (n=10, account=account_1, owner=address_account_1, admin=address_account_1, expiration_timestamp=0) => {
    if (n<=0) {
        return;
    }
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
        console.log(n, "successfully sent signed transaction\n", res);
        S_add_n_licenses(n-1, account, owner, admin, expiration_timestamp);
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

S_get_licenses_with_admin = (admin=account_1) => {

	if (typeof(admin) !== 'string') {
		admin = admin.address;
	}

    contract_s.methods.get_licenses_with_admin(admin).call()
    .then(res => {
        console.log(`Here are all the license addresses that has as admin the argument required: ${res.length}\n`, res);
    })
    .catch(err => {
        console.error("An error occured while calling the func:", err);
    });
}

S_get_licenses_with_owner = (owner=account_1) => {

	if (typeof(owner) !== 'string') {
		owner = owner.address;
	}

    contract_s.methods.get_licenses_with_owner(owner).call()
    .then(res => {
    	console.log(`Here are all the license addresses that has as owner the argument required: ${res.length}\n`, res);
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
