function set_status(text=null, icon="loading", text_debug=null) {
    if (text !== null) {
        document.getElementById('text').innerText = text;
    }

    switch (icon) {
        case 'loading':
            document.getElementById('loading_gif').style.display = "";
            document.getElementById('valid_img').style.display = "none";
            document.getElementById('invalid_img').style.display = "none";
        break;

        case 'valid':
            document.getElementById('loading_gif').style.display = "none";
            document.getElementById('valid_img').style.display = "";
            document.getElementById('invalid_img').style.display = "none";
        break;

        case 'invalid':
            document.getElementById('loading_gif').style.display = "none";
            document.getElementById('valid_img').style.display = "none";
            document.getElementById('invalid_img').style.display = "";
        break;
    }

    if (text_debug !== null) {
        document.getElementById('debug').innerText = text_debug;
    }
}

set_status("Initialisation", "loading");

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const software_contract = (urlParams.get('contract') || "").trim();
const signing_required = (urlParams.get('sign_required') || 'false').trim().toLowerCase() === 'true';
const network = (urlParams.get('network') || 'ropsten').trim();

set_status("Loading your account...", "loading");

/*Authentification*/
var NodeUsed = 'ropsten'

if (network.startsWith('binance')) {

    // binance test network
    NodeUsed = {
        nodeUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545',
        chainId: 97,
    };

    console.log("Using Binance test-network");
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
    set_status("Invalid contract address", "invalid");
    contract = null;
    console.error(error)
}

portis.onLogin((walletAddress, email, reputation) => {
    if (contract === null) {
        return;
    }

    message = "";
    console.log("Logged in!");
    contract.methods.check_license(walletAddress).call()
        .then(isAdrValid => {
            if (isAdrValid) {
                set_status("Key successfully validated", "valid", "You can close this window.");

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
                set_status("Invalid key. You have no right to use this license.", "invalid", "You can close this window.");
                post('/check_owner', {contr_adr: software_contract, is_valid: false});
            }
        })
        .then(signedMessage => {
            if (signing_required) {
                post('/check_owner', {contr_adr: software_contract, is_valid: true, proof: { wallet: walletAddress, message: message, signature: signedMessage}});
            }
        })
        .catch(error => {
            set_status("Error while validating contract", "invalid");
            console.error("An error occured:\n", error)
        })
    
});
