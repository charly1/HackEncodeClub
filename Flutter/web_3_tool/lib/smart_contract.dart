import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart';
import 'package:web_3_tool/abi.dart';

String privateKey =
    "E5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9";
String apiUrl = "https://ropsten.infura.io/v3/60a9daab63f04214af9941e3839d91ac";
String contractKey = "e86824CC2CD8076513Ec834C5b39aD468831E675";
Client httpClient = new Client();
String newLicenceOwner = "";

class SmartContract {
  Credentials credentials;
  EthereumAddress contractAddress;
  Web3Client ethClient;
  EthereumAddress accountAddress;
  DeployedContract deployedContract;
  List<String> listFunctionsName = [];
  bool isInitializing = false;

  Future init() async {
    if (!isInitializing) {
      isInitializing = true;
      credentials = EthPrivateKey.fromHex(privateKey);
      contractAddress = EthereumAddress.fromHex(contractKey);
      ethClient = new Web3Client(apiUrl, httpClient);
      accountAddress = await credentials.extractAddress();
      deployedContract = DeployedContract(
          ContractAbi.fromJson(abiFile, 'MetaCoin'), contractAddress);
    }

    return true;
  }

  Future<String> getBalance() async {
    EtherAmount balance = await ethClient.getBalance(accountAddress);
    return balance.getValueInUnit(EtherUnit.ether).toStringAsFixed(3);
  }

  List<String> getListFunctionsView() {
    if (listFunctionsName.isEmpty) {
      listFunctionsName = [];
      print("heelo");
      for (var function in deployedContract.abi.functions) {
        if (function.mutability == StateMutability.view)
          listFunctionsName.add(function.name);
      }
    }
    return listFunctionsName;
  }

  Future<String> getOwnerAddress() async {
    return await getFunctionData("get_prorio");
  }

  Future changeOwnerLicence() async {
    ContractFunction setOwner = deployedContract.function("new_proprio");
    await ethClient.sendTransaction(
      credentials,
      Transaction.callContract(
        contract: deployedContract,
        function: setOwner,
        parameters: [newLicenceOwner],
      ),
    );
    return true;
  }

  Future<String> getFunctionData(String functionName) async {
    print(functionName);
    print(deployedContract);
    if (deployedContract == null) throw ("has not been init yet");
    ContractFunction getOwner = deployedContract.function(functionName);
    List<dynamic> balance = await ethClient
        .call(contract: deployedContract, function: getOwner, params: []);
    return balance.first.toString();
  }

  // void dispose() {
  //   ethClient.dispose();
  // }
}
