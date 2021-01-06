const open = require('open');

/*software_contract_adr determines the adress of the lices smart contract*/
const software_contract_adr = "0xc3Fe598B1D56aCaa8Ce7c5468230228E4D614120";
const software_contract_adr_binance = "0x0440829FeDcf48f26F77c2C2dBb49a14fa286111";

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

// var without signing required
var log_url = `${local_path}:${index_port}?contract=${software_contract_adr}`;

// use binance ? comment next line to use ropsten, uncomment to use binance
log_url = `${local_path}:${index_port}?contract=${software_contract_adr_binance}&network=binance`;

// var with signing required ? uncomment nect line to require signature
// log_url += "&sign_required=true";

(async () => {
    await open(log_url);
})();

// main html file
app.get("/", function (req, res) {
    res.sendFile(path.join(base_path, 'public', 'html', index_file));
});

// any files in the public folder
app.use('/public', express.static('public'));

// post api return data
app.post('/check_owner', function (req, res) {  

    res.sendStatus(200);
    // console.log(req.body);

    if ('proof' in req.body) {

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
        if (signature_is_valid) {
            console.log("successfully verified the authencity of the license with a signature proof.");
        }
        else {
            console.log("failed to verify the authencity of the license with a signature proof: INVALID SIGNATURE");
        }
    }
    else {
        console.log("successfully verified the authencity of the license but without any signature proof.");
    }
     
})

// start the code !
app.listen(index_port, function () {
    console.log("Server is running on "+local_path+":"+index_port);
});
