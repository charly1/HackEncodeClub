import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:web3dart/web3dart.dart';
import 'package:http/http.dart';
import 'abi.dart';

String privateKey =
    "E5944af0847c204cee609f7112c07a1a9331533507dab4128405d271ee11c9f9";
String apiUrl = "https://ropsten.infura.io/v3/60a9daab63f04214af9941e3839d91ac";
String contractKey = "e86824CC2CD8076513Ec834C5b39aD468831E675";
Client httpClient = new Client();
String newLicenceOwner = "";

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData.dark(),
      home: MyHomePage(title: 'My Ethereum Account'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Credentials credentials;
  EthereumAddress contractAddress;
  Web3Client ethClient;
  EthereumAddress accountAddress;
  DeployedContract deployedContract;

  Future init() async {
    credentials = EthPrivateKey.fromHex(privateKey);
    contractAddress = EthereumAddress.fromHex(contractKey);
    ethClient = new Web3Client(apiUrl, httpClient);
    accountAddress = await credentials.extractAddress();
    deployedContract = DeployedContract(
        ContractAbi.fromJson(abiFile, 'MetaCoin'), contractAddress);
  }

  Future<String> getBalance() async {
    EtherAmount balance = await ethClient.getBalance(accountAddress);
    return balance.getValueInUnit(EtherUnit.ether).toStringAsFixed(3);
  }

  List<String> getListFunctions() {
    List<String> listFunctions = [];
    deployedContract.abi.functions.forEach((element) {
      listFunctions.add(element.toString());
    });
    return listFunctions;
  }

  Future<String> getOwnerAddress() {
    return getFunctionData("get_prorio");
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
  }

  Future<String> getFunctionData(String functionName) async {
    ContractFunction getOwner = deployedContract.function(functionName);
    List<dynamic> balance = await ethClient
        .call(contract: deployedContract, function: getOwner, params: []);
    return balance.first.toString();
  }

  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    init();
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: ListView(
          shrinkWrap: false,
          padding: EdgeInsets.all(15),
          children: [
            Text("Inputs:", style: textTheme.headline3),
            SizedBox(height: 20),
            InputFieldParameters(
              title: "Private Key:",
              defaultParam: privateKey,
            ),
            InputFieldParameters(
                title: "Infura API Url:", defaultParam: apiUrl),
            InputFieldParameters(
                title: "Contract Address:", defaultParam: contractKey),
            InputFieldParameters(
                title: "New licence owner:", defaultParam: newLicenceOwner),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                RaisedButton(
                  child: Text("Send new license owner",
                      style: textTheme.headline4),
                  onPressed: () {
                    changeOwnerLicence();
                  },
                ),
                SizedBox(width: 20),
                RaisedButton(
                  child: Text("Refresh", style: textTheme.headline4),
                  onPressed: () {
                    setState(() {});
                  },
                ),
              ],
            ),
            SizedBox(height: 20),
            SizedBox(
                width: 500,
                child: Divider(
                  thickness: 5,
                )),
            SizedBox(height: 20),
            Text("Outputs:", style: textTheme.headline3),
            FutureBuilderCircularProgress(getBalance, "Amount of ETH:"),
            FutureBuilderCircularProgress(getOwnerAddress, "Owner address:"),
          ],
        ),
      ),
      // This trailing comma makes auto-formatting nicer for build methods.
    );
  }

  @override
  void dispose() async {
    await ethClient.dispose();
    super.dispose();
  }
}

class FutureBuilderCircularProgress extends StatelessWidget {
  final Function future;
  final String title;
  FutureBuilderCircularProgress(this.future, this.title);
  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    return FutureBuilder<String>(
      future: future(),
      builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
        if (snapshot.hasData) {
          return Column(
            children: <Widget>[
              Text(title, style: textTheme.headline4),
              SizedBox(height: 20),
              Text(snapshot.data, style: textTheme.headline4),
              SizedBox(height: 30),
            ],
          );
        } else if (snapshot.hasError) {
          return Text("Error: ${snapshot.error}", style: textTheme.headline4);
        } else {
          return SizedBox(
            child: CircularProgressIndicator(),
            width: 60,
            height: 60,
          );
        }
      },
    );
  }
}

class InputFieldParameters extends StatelessWidget {
  final String title;
  final String defaultParam;
  final Function valueModifier;
  InputFieldParameters({this.title, this.defaultParam, this.valueModifier});
  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    return ConstrainedBox(
      constraints: BoxConstraints(maxWidth: 1300),
      child: Column(
        children: [
          Text(title, style: textTheme.headline4),
          SizedBox(height: 20),
          TextFormField(
            initialValue: defaultParam,
            style: textTheme.headline4,
            decoration: InputDecoration(border: const OutlineInputBorder()),
          ),
          SizedBox(height: 20),
        ],
      ),
    );
  }
}

/// This is the stateful widget that the main application instantiates.
class MyStatefulWidget extends StatefulWidget {
  MyStatefulWidget({Key key}) : super(key: key);

  @override
  _MyStatefulWidgetState createState() => _MyStatefulWidgetState();
}

/// This is the private State class that goes with MyStatefulWidget.
class _MyStatefulWidgetState extends State<MyStatefulWidget> {
  String dropdownValue = 'One';

  @override
  Widget build(BuildContext context) {
    return DropdownButton<String>(
      value: dropdownValue,
      icon: Icon(Icons.arrow_downward),
      iconSize: 24,
      elevation: 16,
      style: TextStyle(color: Colors.deepPurple),
      underline: Container(
        height: 2,
        color: Colors.deepPurpleAccent,
      ),
      onChanged: (String newValue) {
        setState(() {
          dropdownValue = newValue;
        });
      },
      items: <String>['One', 'Two', 'Free', 'Four']
          .map<DropdownMenuItem<String>>((String value) {
        return DropdownMenuItem<String>(
          value: value,
          child: Text(value),
        );
      }).toList(),
    );
  }
}
