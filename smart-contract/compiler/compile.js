const fs = require('fs'); 
const Web3 = require('web3');
const Tx = require('ethereumjs-tx');

const eth_node_link = "wss://ropsten.infura.io/ws/v3/709fd1df01b54f5ab3b9f696894dfb10"
const solidity_compiler_version = 'v0.7.6+commit.7338295f';
const file_solidity = 'contract.sol';

var web3 = new Web3(eth_node_link);

var solc = null;
require('solc').loadRemoteVersion(solidity_compiler_version, (err, new_solce) => {
	if (err) 
		console.error("ERROR", err); 
	else {
		console.log("Successfully imported solidity compiler: " + solidity_compiler_version)
		solc = new_solce; 
		main();
	} 
});

function compile() {
	var input = {
		language: 'Solidity',
		sources: { contract_file: { content: fs.readFileSync('./' + file_solidity, 'utf8') }},
		settings: { outputSelection: {'*': {'*': ['*'] }}}
	};

	var output = JSON.parse(solc.compile(JSON.stringify(input)));
	console.log("Successfully compiled contract")

	for (let contractName in output.contracts.contract_file) {
		console.log("exporting contract", contractName)
		fs.writeFileSync('./' + contractName + '_bytecode.json', JSON.stringify(output.contracts.contract_file[contractName].evm.bytecode, 0, 2));
		fs.writeFileSync('./' + contractName + '.hex', output.contracts.contract_file[contractName].evm.deployedBytecode.object);
		fs.writeFileSync('./' + contractName + '_abi.json', JSON.stringify(output.contracts.contract_file[contractName].abi, 0, 2));
		
	}
}

function deploy(contractName) {

	address_account_1 = '0xFe5a44605eEd83DAe7e2CA1A83F84Ed61Ce38DCD';
	private_account_1 = '0xe5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9';
	account_1 = web3.eth.accounts.privateKeyToAccount(private_account_1);

	address_account_2 = '0xdead29e9dd478451c6852f4278cA07DEED98F706';
	private_account_2 = '0xf24826dd47d25a84e2d0e30cdda6f431d0ef9dc8be36cf42719860d09fce21a3';
	account_2 = web3.eth.accounts.privateKeyToAccount(private_account_2);

	address_account_3 = '0xcAfe849aE18c3F2Eb28c7f9cA0A6373fBF754249';
	private_account_3 = '0x012ea711ed51ce8ac81810b65ee083b541a20f4284fd309321581a30709f0aa4';
	account_3 = web3.eth.accounts.privateKeyToAccount(private_account_3);

	address_account_4 = '0xbAbe15C7c5D88bD040D079473B98FD1B0AFa1188';
	private_account_4 = '0xda8a3d5045c1ce6799e35c329ef12d82a93ee4132963527631c5cc0f2141f68a';
	account_4 = web3.eth.accounts.privateKeyToAccount(private_account_4);

	// select the account to use:
	account = account_1;

	// contract object
	var contract = new web3.eth.Contract(JSON.parse(fs.readFileSync('./' + contractName + '_abi.json', 'utf-8')));
    // to estimate gas:
    // contract.deploy({data: '0x' + fs.readFileSync('./' + contractName + '.hex', 'utf-8')}).estimateGas().then(console.log)

    account.signTransaction({
        data: '0x' + fs.readFileSync('./' + contractName + '.hex', 'utf-8'),
        from: account.address,
        gas: 2000000
    }).then(signedTx => {
    	console.log("tx hash:", signedTx.transactionHash);
        return web3.eth.sendSignedTransaction(signedTx.rawTransaction);
    }).then(res => {
        console.log("successfully sent signed transaction\n", res);
    }).catch(err => {
        console.error("An error occured while calling a payable func:", err);
    });

    // gives error but work...
}

function main() {
	
	compile();
	// deploy('SoftwareHandler')

	console.log ("all done...")
	process.exit()
}