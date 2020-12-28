import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:web_3_tool/data_object.dart';
import 'package:web_3_tool/data_object_manager.dart';
import 'package:web_3_tool/smart_contract.dart';
import 'package:web_3_tool/util.dart';

class MultiProviderMe extends StatefulWidget {
  final Widget child;
  MultiProviderMe({this.child});

  @override
  _MultiProviderMeState createState() => _MultiProviderMeState();
}

class _MultiProviderMeState extends State<MultiProviderMe> {
  var smartContract = SmartContract();
  DataObjectNotifier dataObjectNotifier;

  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<DataObjectNotifier>(
            create: (context) => dataObjectNotifier),
      ],
      child: FutureBuilder<dynamic>(
        future: smartContract.init(),
        builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
          if (snapshot.hasData) {
            List<String> listNameFctAbi = smartContract.getListFunctionsView();
            List<DataObject> listDataObjectFromAbi = [];
            for (var nameFctAbi in listNameFctAbi) {
              listDataObjectFromAbi.add(DataObject(
                  nameFctAbi, [], smartContract.getFunctionData(nameFctAbi)));
            }
            DataObject license0 = DataObject("license0", listDataObjectFromAbi);
            DataObject license1 = DataObject("license1", listDataObjectFromAbi);
            DataObject license2 = DataObject("license2", listDataObjectFromAbi);
            DataObject license3 = DataObject("license3", listDataObjectFromAbi);

            dataObjectNotifier =
                DataObjectNotifier(DataObject("List Software", [
              DataObject("SolidWorks", [license0, license1]),
              DataObject("Matlab", [license2, license3])
            ]));
            return widget.child;
          } else if (snapshot.hasError) {
            return Text("Error: ${snapshot.error}", style: textTheme.headline5);
          } else {
            return SizedBox(
              child: CircularProgressIndicator(),
              width: 30,
              height: 30,
            );
          }
        },
      ),
    );
  }
}
