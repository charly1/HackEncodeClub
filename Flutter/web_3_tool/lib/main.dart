import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/rendering.dart';
import 'package:provider/provider.dart';
import 'package:web_3_tool/data_object_manager.dart';
import 'package:web_3_tool/multi_provider_me.dart';
import 'package:web_3_tool/smart_contract.dart';
import 'package:web_3_tool/data_object.dart';

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
      home: MultiProviderMe(child: MyHomePage(title: 'My Ethereum Account')),
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
  @override
  Widget build(BuildContext context) {
    var dataObjectNotifier =
        Provider.of<DataObjectNotifier>(context, listen: true);
    dataObjectNotifier.init();
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Row(
        mainAxisSize: MainAxisSize.max,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Flexible(
            flex: 1,
            child:
                ColumnData("Handler", [dataObjectNotifier.dataObjectHandler]),
          ),
          Flexible(
            flex: 1,
            child:
                ColumnData("Software", [dataObjectNotifier.dataObjectSoftware]),
          ),
          Flexible(
            flex: 1,
            child: ColumnData(
                "License", [dataObjectNotifier.dataObjectLicense], 10),
          ),
        ],
      ),
      // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

class ColumnTitle extends StatelessWidget {
  final String title;
  ColumnTitle(this.title);
  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    return Container(
      decoration: BoxDecoration(
        color: Colors.blueGrey,
        border: Border.all(
          color: Colors.white,
          width: 2,
        ),
      ),
      child: Padding(
          padding: EdgeInsets.all(10),
          child: Center(child: Text(title, style: textTheme.headline5))),
    );
  }
}

class ColumnData extends StatelessWidget {
  final String title;
  final int depthMax;
  final List<DataObject> listDataObject;
  ColumnData(this.title, [this.listDataObject = const [], this.depthMax = 1]);
  @override
  Widget build(BuildContext context) {
    List<Widget> listWidget = [];
    for (var dataObject in listDataObject) {
      listWidget.add(dataObject.widget(depthMax: depthMax));
    }
    return Column(
      children: <Widget>[
            ColumnTitle(title),
          ] +
          listWidget,
    );
  }
}
