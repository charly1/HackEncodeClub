/*Authentification*/
const portis = new Portis('ae06b1b0-908f-4f16-859c-fb70fd869ec8', 'ropsten',  {scope: ['email'] });
const web3 = new Web3(portis.provider);

/*Perform licence verification*/
/*STEPH HERE*/


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