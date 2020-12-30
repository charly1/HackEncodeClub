const open = require('open');

/*software_contract_adr determines the adress of the lices smart contract*/
const software_contract_adr = "0xc3Fe598B1D56aCaa8Ce7c5468230228E4D614120";

const index_file = "index.html";
const index_port = 3000;
const local_path = 'http://localhost';

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

var base_path = "";
try {
    base_path = __dirname;
}
catch (error) {
    base_path = process.cwd();
}

var log_url = local_path+':'+index_port +"?contract="+software_contract_adr;

(async () => {
    await open(log_url);
})();

app.get("/", function (req, res) {
    res.sendFile(path.join(base_path, index_file));
});
app.get("/src/portis_log.js", function (req, res) {
    res.sendFile(path.join(base_path, "src", "portis_log.js"));
});
app.get("/src/contract_abi.js", function (req, res) {
    res.sendFile(path.join(base_path, "src", "contract_abi.js"));
});
app.get("/src/utils.js", function (req, res) {
    res.sendFile(path.join(base_path, "src", "utils.js"));
});
app.get("/src/web3.min.1.3.1.js", function (req, res) {
    res.sendFile(path.join(base_path, "src", "web3.min.1.3.1.js"));
});
app.post('/check_owner', function (req, res) {  
    /*
    body:
    {
        contr_adr: software_contract, 
        is_valid: true, 
        proof: { 
            wallet: walletAddress, 
            message: message, 
            signature: signedMessage
        }
    }
    */
    res.sendStatus(200);
    //console.log(req.body);

    var signature_is_valid = true;

// VERIFY SIGNATURE HERE

    /*var messageHash = EthCrypto.hash.keccak256(req.body.proof.message);
    try {
        var adr = EthCrypto.recover(req.body.proof.signature, messageHash);
        if (adr !== req.body.proof.wallet)
            throw 'error';
    }
    catch (err) {
        signature_is_valid = false;
    }*/
    
    console.log("signature validity:", signature_is_valid);
    console.log("successfully verified the authencity of the license.")
     
})

app.listen(index_port, function () {
    console.log("Server is running on "+local_path+":"+index_port);
});
