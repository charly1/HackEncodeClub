document.getElementById('text').innerText = "Loading your account...";

/*Authentification*/
const portis = new Portis('ae06b1b0-908f-4f16-859c-fb70fd869ec8', 'ropsten',  {scope: ['email'] });
const web3 = new Web3(portis.provider);

/*Perform licence verification*/
/*STEPH HERE*/
const contract_software_abi = [{"inputs": [{"internalType": "string","name": "company","type": "string"},{"internalType": "address payable","name": "_admin","type": "address"}],"stateMutability": "nonpayable","type": "constructor"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "adminChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "string","name": "","type": "string"}],"name": "companyNameChanged","type": "event"},{"anonymous": false,"inputs": [{"indexed": false,"internalType": "address","name": "","type": "address"}],"name": "licenseAdded","type": "event"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"},{"internalType": "address payable","name": "_owner","type": "address"},{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "_expiration_timestamp","type": "uint256"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "address payable","name": "_owner","type": "address"}],"name": "add_license","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "nonpayable","type": "function"},{"inputs": [],"name": "admin","outputs": [{"internalType": "address payable","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "adr","type": "address"}],"name": "check_license","outputs": [{"internalType": "bool","name": "","type": "bool"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "company_name","outputs": [{"internalType": "string","name": "","type": "string"}],"stateMutability": "view","type": "function"},{"inputs": [],"name": "get_nb_license","outputs": [{"internalType": "uint256","name": "","type": "uint256"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "oldOwner","type": "address"},{"internalType": "address","name": "newOwner","type": "address"}],"name": "licenseHasChangedOwner","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "uint256","name": "","type": "uint256"}],"name": "licenses","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address","name": "","type": "address"}],"name": "ownerLicense","outputs": [{"internalType": "contract License","name": "","type": "address"}],"stateMutability": "view","type": "function"},{"inputs": [{"internalType": "address payable","name": "_admin","type": "address"}],"name": "set_admin","outputs": [],"stateMutability": "nonpayable","type": "function"},{"inputs": [{"internalType": "string","name": "_company_name","type": "string"}],"name": "set_company_name","outputs": [],"stateMutability": "nonpayable","type": "function"},{"stateMutability": "payable","type": "receive"}]
const software_contract = "0xfd217c7d08e1b3477b4a95e6f9d9d149d8e74621";
const contract = new web3.eth.Contract(contract_software_abi, software_contract_adr);
const accounts = await web3.eth.getAccounts();
const isAdrValid = await contract.methods.check_license(accounts[0].address).call();

if (isAdrValid)
	document.getElementById('text').innerText = "Your key is valid !";
else
	document.getElementById('text').innerText = "Your key is not valid...";

/*tests*/
web3.eth.getAccounts((error, accounts) => {
  console.log(accounts);
  console.log(accounts);
});

portis.onLogin((walletAddress, email, reputation) => {
  console.log("LOGGED IN",walletAddress, email, reputation);
});

(async () => {
  const accounts = await web3.eth.getAccounts();
  console.log(`Wallet address: ${accounts[0].toLowerCase()}`);
  console.log(`accounts address: ${accounts}`);
  var balance = await web3.eth.getBalance(accounts[0]);
  console.log("balance",balance);
})();