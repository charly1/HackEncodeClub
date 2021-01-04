// to test: 
// open a console
// type `npm install`
// run `node`
// type `require('./client.js')`
// you are now able to use all the function you wish, have fun !

Web3 = require('web3');

// env = 'prod'     // for mainnet ethereum blockchain, not working for now
env = 'test'        // for testing on ropsten blockchain
// env = 'debug'     // for debug on ganache local blockchain

// using ws or wss to be compatible with event emit
eth_node_link_infura = "wss://ropsten.infura.io/ws/v3/709fd1df01b54f5ab3b9f696894dfb10"
eth_node_link_ganache = "ws://127.0.0.1:7545"
w = new Web3(eth_node_link_infura);

contract_software_handler_abi = require('../SoftwareHandler_abi.json');
contract_software_abi = require('../Software_abi.json');
contract_license_abi = require('../license_abi.json');

SH_main_contract_address = '0x9DB36A43Ee098Db5547EdDd54c4f64Dc8F4FeaFf';

//keys for ropsten:
address_account_1 = '0xFe5a44605eEd83DAe7e2CA1A83F84Ed61Ce38DCD';
private_account_1 = '0xe5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9';
account_1 = w.eth.accounts.privateKeyToAccount(private_account_1);

address_account_2 = '0xdead29e9dd478451c6852f4278cA07DEED98F706';
private_account_2 = '0xf24826dd47d25a84e2d0e30cdda6f431d0ef9dc8be36cf42719860d09fce21a3';
account_2 = w.eth.accounts.privateKeyToAccount(private_account_2);

address_account_3 = '0xcAfe849aE18c3F2Eb28c7f9cA0A6373fBF754249';
private_account_3 = '0x012ea711ed51ce8ac81810b65ee083b541a20f4284fd309321581a30709f0aa4';
account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

address_account_4 = '0xbAbe15C7c5D88bD040D079473B98FD1B0AFa1188';
private_account_4 = '0xda8a3d5045c1ce6799e35c329ef12d82a93ee4132963527631c5cc0f2141f68a';
account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);

gasUseEveryWhere = 5000000;
waiting_robot = 5000; // in milliseconds
SHOW_TX = true
SEND_CONTRACT_ONE_BY_ONE = true;

if (env === 'debug') {
    // ganache mnemonic: verb outside toast guess version common fox again army excite purse doll
    w = new Web3(eth_node_link_ganache);

    SH_main_contract_address = '0x10EE5bCdfB3cAff3937985ebBd55A214F520d334';

    // keys for ganache:
    address_account_1 = '0x22D127bFef61bE547F26Cb95Fb4c7C099e3F34Cd';
    private_account_1 = '0x8f83886120e6aed60619b3ff665c18dbfb5741675c1934b5ef33d3f875d629de';
    account_1 = w.eth.accounts.privateKeyToAccount(private_account_1);

    address_account_2 = '0x385DC7781F4B36EeCB126B7f13779b547c127e5D';
    private_account_2 = '0xc9dff619b4f71be813ab94412ebc7406807bf2b3e7a8a5a6b9d148c6eb1a43cf';
    account_2 = w.eth.accounts.privateKeyToAccount(private_account_2);

    address_account_3 = '0x3E257d3C8AC19e4F9f513705C4Eb928A821Bb7cA';
    private_account_3 = '0x34a5b0158b0eca6a3e8f44daf55901853f10f0e72b7d4efa7612534a5d9ab793';
    account_3 = w.eth.accounts.privateKeyToAccount(private_account_3);

    address_account_4 = '0xdf6d5CcCF4C773b6c920A018c766c06C7C98b349';
    private_account_4 = '0xf1d29c4935fc9ffa4c8de9c69acd356b6053e37f369c244800d34f2982b53188';
    account_4 = w.eth.accounts.privateKeyToAccount(private_account_4);

    waiting_robot = 1500; // in milliseconds
}

get_dict = (dict, key, def) => {
    return dict[key] || def;
}

UPLOADED = {
    TO_BE_UPLOADED: 0,
    BEING_UPLOADED: 1,
    DONE: 2,
}

/*
DATA EXEMPLE:
data_upload = [
    {
        "type" : "s",                           //can be s, l, software, license
        "id" : "1st soft",                      // here for verbose purpose and linked to other struct
        "uploaded" : UPLOADED.TO_BE_UPLOADED,   // 0: to be uploaded, 1: being uploaded, 2: uploaded
        "id_root" : "main_sh",                  // id of roots, sh for s and s for l
        "upload_from": account_1,               // account that will upload the element

        // custom for this type:
        "params" : {
            "admin": account_1,
            "company_name": "test",
        },
    },
    {
        "type" : "l",
        "id" : "1st soft - L1",
        "uploaded" : UPLOADED.TO_BE_UPLOADED,
        "id_root" : "1st soft",
        "upload_from": account_1,

        "params" : {
            "owner": account_1,
            "admin": account_1,
            "expiration_timestamp": "0",
        },
    },
]
*/
// data_upload = require('./massive_upload_contract_data_small_test.json');
data_upload = require('./massive_upload_contract_data_test.json');
for (i in data_upload) {
    data_upload[i].uploaded = get_dict(data_upload[i], 'uploaded', 'TO_BE_UPLOADED');
    switch (data_upload[i].uploaded) {
        case 'UPLOADED.TO_BE_UPLOADED':
        case 'TO_BE_UPLOADED':
        case 'TO BE UPLOADED':
            data_upload[i].uploaded = UPLOADED.TO_BE_UPLOADED;
        break;

        case 'UPLOADED.BEING_UPLOADED':
        case 'BEING_UPLOADED':
        case 'BEING UPLOADED':
            data_upload[i].uploaded = UPLOADED.BEING_UPLOADED;
        break;

        case 'UPLOADED.DONE':
        case 'DONE':
            data_upload[i].uploaded = UPLOADED.DONE;
        break;
    }
}

// map the contract adr, you can add here a first sh contract here
id_contract_adr = {
    "main_sh" : new w.eth.Contract(contract_software_handler_abi, SH_main_contract_address),
}

events = []
currently_sending_contract = false;

is_software_type = (data) => {
    return data[0].toLowerCase() === 's';
}

is_license_type = (data) => {
    return data[0].toLowerCase() === 'l';
}

stats = {
    software_added: 0,
    software_total: data_upload.filter(x => is_software_type(x.type)).length,

    license_added: 0,
    license_total: data_upload.filter(x => is_license_type(x.type)).length,

    total: data_upload.length,
};

wei2eth = (amount) => {
    return parseFloat(amount) / 1000000000000000000
}

eth2wei = (amount) => {
    return parseInt(w.utils.toWei(String(amount), 'ether'))
}

get_account_as = (data, output='address') => {
    account = null;

    if (typeof(data) === 'string') {
        if (data.startsWith('0x')) {
            if (output === 'account')
                throw ("Error, cannot convert address to account");
            else
                return data;
        }
        else {
            switch (data) {
                case 'account_1':
                    account = account_1;
                break;

                case 'account_2':
                    account = account_2;
                break;

                case 'account_3':
                    account = account_3;
                break;

                case 'account_4':
                    account = account_4;
                break;

                default:
                    throw "Unknown string: " + data
                break;
            }
        }
    }
    else 
        account = data;

    if (output === 'account') {
        return account;
    }
    else {
        return account.address;
    }
}

SH_add_software = (contract, account, params) => {
    return new Promise((resolve, reject) => {

        params.admin = get_account_as(params.admin, 'address');
        account = get_account_as(account, 'account');

        var query = contract.methods.addSoftware(params.company_name, params.admin);
        var encodedABI = query.encodeABI();

        account.signTransaction({
            data: encodedABI,
            from: account.address,
            gas: gasUseEveryWhere,
            to: contract.options.address,
        })
        .then(signedTx => {
            return w.eth.sendSignedTransaction(signedTx.rawTransaction);
        })
        .then(tx => {
            resolve(tx);
            // console.log("successfully sent signed transaction\n", tx);
        })
        .catch(err => {
            reject(err);
            // console.error("An error occured while calling a payable func:", err);
        });
    });
}

S_get_company_name_and_admin = (contract) => {
    return new Promise((resolve, reject) => {
        admin = "";
        company_name = "";

        contract.methods.admin().call()
            .then(adr => {
                admin = adr;
                return contract.methods.company_name().call()
            })
            .then(name => {
                company_name = name;
                resolve({admin: admin, company_name: company_name});
            })
            .catch(err => {
                reject("An error occured while calling the func:", err);
            });
    });
}

S_add_license = (contract, account, params) => {
    return new Promise((resolve, reject) => {

        params.admin = get_account_as(params.admin, 'address');
        params.owner = get_account_as(params.owner, 'address');
        account = get_account_as(account, 'account');

        params.expiration_timestamp = String(params.expiration_timestamp);

        var query = contract.methods.add_license(params.admin, params.owner, params.expiration_timestamp);
        var encodedABI = query.encodeABI();

        account.signTransaction({
            data: encodedABI,
            from: account.address,
            gas: gasUseEveryWhere,
            to: contract.options.address,
        })
        .then(signedTx => {
            return w.eth.sendSignedTransaction(signedTx.rawTransaction);
        })
        .then(tx => {
            resolve(tx);
            // console.log("successfully sent signed transaction\n", tx);
        })
        .catch(err => {
            reject(err);
            // console.error("An error occured while calling a payable func:", err);
        });
    });
}

L_get_admin_owner_and_exp_date = (contract) => {
    return new Promise((resolve, reject) => {
        admin = "";
        owner = "";
        expiration_timestamp = "";

        contract.methods.admin().call()
            .then(adr => {
                admin = adr;
                return contract.methods.owner().call()
            })
            .then(adr => {
                owner = adr;
                return contract.methods.expiration_timestamp().call()
            })
            .then(timestamp => {
                expiration_timestamp = String(timestamp);
                resolve({admin: admin, owner: owner, expiration_timestamp: expiration_timestamp});
            })
            .catch(err => {
                reject("An error occured while calling the func:", err);
            });
    });
}

set_uploaded = async (type, adr) => {
    index = [];
    found_index = -1;
    contract = null;
    
    if (is_software_type(type))
        contract = new w.eth.Contract(contract_software_abi, adr);
    else
        contract = new w.eth.Contract(contract_license_abi, adr);

    // search index of element being upload, and of same type
    for (i in data_upload) {
        if (data_upload[i].type === type && data_upload[i].uploaded === UPLOADED.BEING_UPLOADED) {
            index.push(i);
        }
    }

    // check index returned
    if (index.length === 0) {
        throw `no ${type} currently uploading contract were found`;
    }
    else if (index.length === 1) {
        found_index = index[0];
    }
    else if (is_software_type(type)) {
        params = await S_get_company_name_and_admin(contract);

        for (i of index) {
            let j = index[i];
            if (get_account_as(params.admin, 'address')        === get_account_as(data_upload[j].params.admin, 'address') && 
                get_account_as(params.company_name, 'address') === get_account_as(data_upload[j].params.company_name, 'address'))
            {
                found_index = j;
                break;
            }
        }

        if (found_index === -1) {
            throw `Error, couldn't figure out which Software the adr: ${adr} was.`;
        }
    }
    else {
        params = await L_get_admin_owner_and_exp_date(contract);

        for (i of index) {
            let j = index[i];
            if (get_account_as(params.admin, 'address')                === get_account_as(data_upload[j].params.admin, 'address') && 
                get_account_as(params.owner, 'address')                === get_account_as(data_upload[j].params.owner, 'address') &&
                get_account_as(params.expiration_timestamp, 'address') === get_account_as(data_upload[j].params.expiration_timestamp, 'address'))
            {
                found_index = j;
                break;
            }
        }

        if (found_index === -1) {
            throw `Error, couldn't figure out which License the adr: ${adr} was.`;
        }
    }

    let id = data_upload[found_index].id;

    data_upload[found_index].address = adr;
    data_upload[found_index].uploaded = UPLOADED.DONE;
    id_contract_adr[id] = contract;
    currently_sending_contract = false;

    if (is_software_type(type)) {
        events.push(contract.events.licenseAdded({}, async (error, res) => {
                console.log(`a new license was added with adr: ${res.returnValues['0']}. Now calling func "set_uploaded" func...`);
                await set_uploaded('l', res.returnValues['0']);
            }
        ));

        stats.software_added +=1 ;
        console.log(`a new software was successfully added.`);
    }
    else {
        stats.license_added +=1 ;
        console.log(`a new license was successfully added.`);
    }

    console.log("\n------------------------------------------- ")
    console.log(`Softwares : ${stats.software_added}/${stats.software_total}`);
    console.log(`Licenses  : ${stats.license_added}/${stats.license_total}`);
    console.log(`Total     : ${stats.software_added + stats.license_added}/${stats.total}`);
    console.log("-------------------------------------------\n\n")
}

// set event of sh
events.push(id_contract_adr['main_sh'].events.softwareAdded({}, async (error, res) => {
        console.log(`a new software was added with adr: ${res.returnValues['0']}. Now calling func "set_uploaded" func...`);
        await set_uploaded('s', res.returnValues['0'])
    }
));

show_final_tree = () => {
    softwares = data_upload.filter(x => is_software_type(x.type));
    licenses = data_upload.filter(x => is_license_type(x.type));

    console.log("\n---------------- GENERAL OUTPUT TREE ----------------")

    for (i in softwares) {
        console.log(`\nSoftware ${i}: ${get_dict(softwares[i], 'address', 'ERROR NO ADR FOUND')}`);
        console.log(`  id: "${softwares[i].id}"`);
        console.log(`  admin: ${get_account_as(softwares[i].params.admin, 'address')}`);
        console.log(`  company name: ${softwares[i].params.company_name}`);

        licenses_linked = licenses.filter(x => x.id_root === softwares[i].id);
        for (j in licenses_linked) {
            console.log(`  - License ${j}: ${get_dict(licenses_linked[j], 'address', 'ERROR NO ADR FOUND')}`);
            console.log(`    id: "${licenses_linked[j].id}"`);
            console.log(`    admin: ${get_account_as(licenses_linked[j].params.admin, 'address')}`);
            console.log(`    owner: ${get_account_as(licenses_linked[j].params.owner, 'address')}`);
            console.log(`    expiration_timestamp: ${licenses_linked[j].params.expiration_timestamp}`);
        }
    }

    console.log("\n---------------- GENERAL OUTPUT TREE END ---------------- \n")
}

main = () => {

    if (SEND_CONTRACT_ONE_BY_ONE && currently_sending_contract) {
        console.log("ROBOT: currently sending a contract, waiting for it to be uploaded.")

        setTimeout(main, waiting_robot);
        return;
    }

    index_upload = -1;

    if (data_upload.filter(x => is_software_type(x.type) && x.uploaded === UPLOADED.TO_BE_UPLOADED).length > 0) {
        index_upload = data_upload.findIndex(x => is_software_type(x.type) && x.uploaded === UPLOADED.TO_BE_UPLOADED && x.id_root in id_contract_adr);
        
        if (index_upload !== -1)
            console.log("ROBOT: uploading a software");
    }
    
    if (index_upload === -1 && data_upload.filter(x => is_license_type(x.type) && x.uploaded === UPLOADED.TO_BE_UPLOADED).length > 0) {
        index_upload = data_upload.findIndex(x => is_license_type(x.type) && x.uploaded === UPLOADED.TO_BE_UPLOADED && x.id_root in id_contract_adr);
        
        if (index_upload !== -1)
            console.log("ROBOT: uploading a license");
    }
    
    if (index_upload === -1 && (stats.software_added+stats.license_added) < stats.total) {
        console.log(`ROBOT: all contract sent to upload and waiting for validation OR waiting for Software contract to continue with License ones. Total: ${stats.software_added+stats.license_added}/${stats.total}`);

        setTimeout(main, waiting_robot);
        return;
    }

    if (index_upload === -1) {
        console.log("ROBOT: all contract uploaded. All done. exiting.");
        show_final_tree();
        process.exit();
        return;
    }

    // upload it
    data_upload[index_upload].uploaded = UPLOADED.BEING_UPLOADED;
    currently_sending_contract = true;

    if (is_software_type(data_upload[index_upload].type))
    {
        SH_add_software(id_contract_adr['main_sh'], 
                        get_account_as(data_upload[index_upload].upload_from, 'account'), 
                        data_upload[index_upload].params)
            .then(res => {
                console.log("successfully sent Software. tx:", SHOW_TX ? res : "");
            })
            .catch(err => {
                console.error("Error while sending Software: ", err);
            });
    }
    else 
    {
        S_add_license(  id_contract_adr[data_upload[index_upload].id_root], 
                        get_account_as(data_upload[index_upload].upload_from, 'account'), 
                        data_upload[index_upload].params)
            .then(res => {
                console.log("successfully sent License. tx:", SHOW_TX ? res : "");
            })
            .catch(err => {
                console.error("Error while sending License: ", err);
            });
    }

    // start again func in a few sec
    setTimeout(main, waiting_robot);
}

main();