const fs = require('fs'); 
const Web3 = require('web3');
const Provider = require('@truffle/hdwallet-provider');
const { ethers } = require('ethers');

address_account_1 = '0xFe5a44605eEd83DAe7e2CA1A83F84Ed61Ce38DCD';
private_account_1 = '0xe5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9';

address_account_2 = '0xdead29e9dd478451c6852f4278cA07DEED98F706';
private_account_2 = '0xf24826dd47d25a84e2d0e30cdda6f431d0ef9dc8be36cf42719860d09fce21a3';

address_account_3 = '0xcAfe849aE18c3F2Eb28c7f9cA0A6373fBF754249';
private_account_3 = '0x012ea711ed51ce8ac81810b65ee083b541a20f4284fd309321581a30709f0aa4';

address_account_4 = '0xbAbe15C7c5D88bD040D079473B98FD1B0AFa1188';
private_account_4 = '0xda8a3d5045c1ce6799e35c329ef12d82a93ee4132963527631c5cc0f2141f68a';


// ------------------- TO MODIFY ---------------------------

// select the account to use:
const privateKey = private_account_1;

// contract file
const file_solidity = '../contract.sol';

// node link
const eth_node_link = "wss://ropsten.infura.io/ws/v3/709fd1df01b54f5ab3b9f696894dfb10"

// compiler version
const solidity_compiler_version = 'v0.7.6+commit.7338295f';

// ------------------- END OF TO MODIFY ---------------------------

var provider = new Provider(privateKey, eth_node_link);
var web3 = new Web3(provider);

account = web3.eth.accounts.privateKeyToAccount(privateKey)

function compile_contracts(optimize=true) {
	return new Promise( (resolve, reject) => {
		console.log("Loading compiler...")
		require('solc').loadRemoteVersion(solidity_compiler_version, (err, solc) => {
			if (err) {
				console.error("ERROR", err); 
				reject(err);
			}
			else {
				console.log("Successfully imported solidity compiler: " + solidity_compiler_version)

				var input = {
					language: 'Solidity',
					sources: { 
						contract_file: { content: fs.readFileSync(file_solidity).toString() }
					},
					settings: { 
						optimizer: { enabled: optimize},
						outputSelection: {'*': {'*': ['*'] }}
					}
				};

				var output = JSON.parse(solc.compile(JSON.stringify(input)));
				console.log("Successfully compiled contract")

				for (let contractName in output.contracts.contract_file) {
					console.log("exporting contract", contractName)
					fs.writeFileSync('./' + contractName + '_bytecode.json', JSON.stringify(output.contracts.contract_file[contractName].evm.bytecode, 0, 2));
					// fs.writeFileSync('./' + contractName + '_bytecode.json', output.contracts.contract_file[contractName].evm.bytecode);
					fs.writeFileSync('./' + contractName + '_abi.json', JSON.stringify(output.contracts.contract_file[contractName].abi, 0, 2));
				}

				resolve();
			} 
		});
	});
}

function deploy_contract(contractName='SoftwareHandler') {

	return new Promise( (resolve, reject) => {

		network = 'ropsten';
		provider = new ethers.providers.InfuraProvider(network, '709fd1df01b54f5ab3b9f696894dfb10');
		// Creating a signing account from a private key
		signer = new ethers.Wallet(account.privateKey, provider);
		// Using the signing account to deploy the contract
		factory = new ethers.ContractFactory(
					JSON.parse(fs.readFileSync('./' + contractName + '_abi.json').toString()),
					JSON.parse(fs.readFileSync('./' + contractName + '_bytecode.json').toString()), 
					signer);
		contract = null 
		factory.deploy()
			.then(res => {
				contract = res;
				console.log('Mining transaction...');
				console.log(`https://${network}.etherscan.io/tx/${contract.deployTransaction.hash}`);

				// Waiting for the transaction to be mined
				return contract.deployTransaction.wait();
			})
			.then(() => {
				// The contract is now deployed on chain!
				console.log(`Contract deployed at ${contract.address}`);
				resolve(contract.address)
			})
			.catch( err => {
				reject(err);
			})
	});
}

function _signTransaction(_contract, _encodedABI, _account, _gas) {
    return web3.eth.signTransaction({
        data: _encodedABI,
        from: _account,
        gas: _gas,
        to: _contract.options.address,
    })
      .then(signedTx => {
          return web3.eth.sendSignedTransaction(signedTx.raw);
      })
      .then(res => {
          return res;
      })
      .catch(err => {
          console.error("An error occured while calling a payable func:", err);
          return false;
      });
}

function create_software(software_handler_adr, name, version, license_time_default=0, software_admin=account.address) {

	var contract_sh = new web3.eth.Contract(JSON.parse(fs.readFileSync('./SoftwareHandler_abi.json').toString()), software_handler_adr);

	const tx_call = contract_sh.methods.addSoftware(name, version, license_time_default, software_admin);

	return tx_call.estimateGas({from:account.address})
		.then(gas => {
			return _signTransaction(contract_sh, tx_call.encodeABI(), account.address, gas);
		})
		.then(res => {
			return contract_sh.methods.getNbOfSoftware().call();
		})
		.then(nb => {
			return contract_sh.methods.softwares(nb-1).call()
		})
		.catch(err => {
			console.error(err);
			return false;
		})
}

function create_license(software_adr, admin=account.address, owner=account.address, expiration_timestamp=0) {

	var contract_s = new web3.eth.Contract(JSON.parse(fs.readFileSync('./Software_abi.json').toString()), software_adr);

	const tx_call = contract_s.methods.add_license(admin, owner, expiration_timestamp);

	return tx_call.estimateGas({from:account.address})
		.then(gas => {
			return _signTransaction(contract_s, tx_call.encodeABI(), account.address, gas);
		})
		.then(res => {
			return contract_s.methods.get_nb_license().call();
		})
		.then(nb => {
			return contract_s.methods.licenses(nb-1).call()
		})
		.catch(err => {
			console.error(err);
			return false;
		})
}

function set_license_for_sale(license_adr, price=5000000000000000) {

	var contract_l = new web3.eth.Contract(JSON.parse(fs.readFileSync('./License_abi.json').toString()), license_adr);
	const tx_call = contract_l.methods.set_for_sale(price);

	return tx_call.estimateGas({from:account.address})
		.then(gas => {
			return _signTransaction(contract_l, tx_call.encodeABI(), account.address, gas);
		})
		.catch(err => {
			console.error(err);
			return false;
		})
}

(async function main() {
	
	try {
		console.log("## compiling contract...");
		await compile_contracts();
		console.log("Successfully compiled contract(s)\n")

		console.log("## creating SoftwareHandler...");
		var software_handler_adr = await deploy_contract();
		console.log("successfully created: " + software_handler_adr + "\n");

		console.log("## creating Software...");
		var software_adr = await create_software(software_handler_adr, "SoftwareName", "1.0.0", 0, account.address);
		console.log("successfully created: " + software_adr + "\n");

		console.log("## creating License 1...");
		var license_1_adr = await create_license(software_adr, account.address, account.address, 0);
		console.log("successfully created: " + license_1_adr + "\n");

		console.log("## creating License 2...");
		var license_2_adr = await create_license(software_adr, account.address, account.address, 0);
		console.log("successfully created: " + license_2_adr + "\n");

		console.log("## setting License 2 for sale");
		await set_license_for_sale(license_2_adr, price=5000000000000000);
		console.log("successfully set for sale !")

		console.log ("all done...")
	}
	catch (err) {
		console.error(err);
	}

	process.exit()	
})()