// in order to run this code, go on 
//      https://blockchain.ballmer.co/
// open the console and you can type the code.
// why ? simple because you gonna need the web3 lib, and it is automatically present on this website.


// constants definition
const infura_link = 'https://ropsten.infura.io/v3/709fd1df01b54f5ab3b9f696894dfb10';
const contract_adr = '0xe86824cc2cd8076513ec834c5b39ad468831e675';
const contract_abi = [{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[],"name":"get_prorio","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"new_proprio","type":"address"}],"name":"set_proprio","outputs":[],"stateMutability":"nonpayable","type":"function"}];

// object creation
w = new Web3(infura_link);
contract = new w.eth.Contract(contract_abi, contract_adr);

// calling the view only function
contract.methods.get_prorio().call()
    .then(res => {
        console.log("method get_proprio result:", res);
    })
    .catch(err => {
        console.error("An error occured while calling a view func:", err);
    });
// or more simple: 
// await contract.methods.get_prorio().call()



// constants definition (required to signed a transaction, to be added to the constant of above)
const new_proprio_adr = '0xFe5a44605eEd83DAe7e2CA1A83F84Ed61Ce38DCD';
const private_key = '0xe5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9' 
/*** !!! NEVER LET PRIVATE KEY STAND IN CODE LIKE IN THE PREVIOUS LINE ! THIS IS OK SINCE IT ONLY CONTAINS ROPSTEN FAKE ETHER ! ***/

// object creation (required to signed a transaction, to be added to the constant of above)
const account = w.eth.accounts.privateKeyToAccount(private_key);
var query = contract.methods.set_proprio(new_proprio_adr);
var encodedABI = query.encodeABI();

// method calling
// todo: estimate gas price before sending the func
account.signTransaction({
        data: encodedABI,
        from: account.address,
        gas: 2000000,
        to: contract.options.address,
    })
    .then(signedTx => {
        return w.eth.sendSignedTransaction(signedTx.rawTransaction);
    })
    .then(res => {
        console.log("successfully sent signed transaction\n", res)
    })
    .catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });

