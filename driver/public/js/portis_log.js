

document.getElementById('text').innerText = "Initialisation";

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const software_contract = (urlParams.get('contract') || "").trim();
const signing_required = (urlParams.get('sign_required') || 'false').trim().toLowerCase() === 'true';
const network = (urlParams.get('network') || 'ropsten').trim();

document.getElementById('network').innerText = "Using Ropsten Ethereum test-network";
document.getElementById('text').innerText = "Loading your account...";

/*Authentification*/
var NodeUsed = 'ropsten'

if (network.startsWith('binance')) {

	// binance test network
	NodeUsed = {
		nodeUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
		chainId: 97,
	};

	document.getElementById('network').innerText = "Using Binance test-network";
}
const portis = new Portis('1a5e4c06-3d4a-4369-b406-d937cdb090b6', NodeUsed, {scope: ['email'] });
function showPortisTimer() {
	portis.isLoggedIn()
		.then(res => {
			if (res.result === false) {
				portis.showPortis()
				setTimeout(showPortisTimer, 1000);
			}
		})
		.catch(err=>{
			console.error("An error occured:\n", error)
		})
}
showPortisTimer();

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

	message = "";
	document.getElementById('text').innerText = "Logged in!";
	contract.methods.check_license(walletAddress).call()
		.then(isAdrValid => {
			if (isAdrValid) {
				document.getElementById('text').innerText = "Your key is valid !";

				if (signing_required) { 
				// if "sign_required is to true (default value: false)"
					message = JSON.stringify({type:"data_to_sign", timestamp: new Date().getTime(), rand: Math.random()});
	  				return signedMessage = web3.eth.sign(message, walletAddress);
  				}
  				else {
        			post('/check_owner', {contr_adr: software_contract, is_valid: true});
  				}
      		}
			else {
				document.getElementById('text').innerText = "Your key is not valid...";
        		post('/check_owner', {contr_adr: software_contract, is_valid: false});
      		}
		})
		.then(signedMessage => {
			if (signing_required) {
				post('/check_owner', {contr_adr: software_contract, is_valid: true, proof: { wallet: walletAddress, message: message, signature: signedMessage}});
			}
		})
		.catch(error => {
      		document.getElementById('text').innerText = "Error while validating contract";
			console.error("An error occured:\n", error)
		})
	
});
