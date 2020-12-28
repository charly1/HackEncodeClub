document.getElementById('text').innerText = "Initialisation";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const software_contract = urlParams.get('contract')


document.getElementById('text').innerText = "Loading your account...";

/*Authentification*/
const portis = new Portis('ae06b1b0-908f-4f16-859c-fb70fd869ec8', 'ropsten',  {scope: ['email'] });
const web3 = new Web3(portis.provider);

/*Perform licence verification*/
var contract = null;
try {
	contract = new web3.eth.Contract(contract_software_abi, software_contract);
}
catch (error) {
	document.getElementById('text').innerText = "Invalid contract address";
	contract = null;
}


portis.onLogin((walletAddress, email, reputation) => {
	if (contract === null) {
		return;
	}

	document.getElementById('text').innerText = "Logged in!";
	contract.methods.check_license(walletAddress).call()
		.then(isAdrValid => {
			if (isAdrValid) {
				document.getElementById('text').innerText = "Your key is valid !";
        /*post('/check_owner', {contr_adr: software_contract, is_valid: true});*/
      }
			else {
				document.getElementById('text').innerText = "Your key is not valid...";
        /*post('/check_owner', {contr_adr: software_contract, is_valid: false});*/
      }
		})
		.catch(error => {
      		document.getElementById('text').innerText = "Error while validating contract";
			console.error("An error occured:\n", error)
		})
	
});
