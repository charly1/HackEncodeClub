const open = require('open');

/*software_contract_adr determines the adress of the lices smart contract*/
const software_contract_adr = "0xc3Fe598B1D56aCaa8Ce7c5468230228E4D614120";

const index_file = "index.html";
const index_port = 3000;
const local_path = 'http://localhost';

const express = require("express");
const app = express();
const path = require('path');

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
app.get('/check_owner', function (req, res) {  
response = {  
       bc_owner:req.query.bc_owner,  
       local_owner:req.query.local_owner  
   };  
   console.log(response);  
   res.end(JSON.stringify(response));  
})

app.listen(index_port, function () {
    console.log("Server is running on "+local_path+":"+index_port);
});
