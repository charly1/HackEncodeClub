import 'package:flutter/material.dart';
import 'package:web_3_tool/data_object_manager.dart';
import 'package:web_3_tool/smart_contract.dart';
import 'package:web_3_tool/util.dart';

class DataObject {
  String name;
  DataObject parent;
  List<DataObject> listDataObject;
  DataObjectNotifier dataObjectManager;
  Future<String> fctData;

  bool isSelected = false;
  DataObject(this.name, [this.listDataObject = const [], this.fctData]) {
    for (var dataObject in listDataObject) {
      dataObject.parent = this;
    }
  }

  void initDataObjectNotifierRec(DataObjectNotifier dataObjectManager) {
    this.dataObjectManager = dataObjectManager;
    for (var dataObject in listDataObject) {
      dataObject.initDataObjectNotifierRec(dataObjectManager);
    }
  }

  void initIsSelected([bool _isSelected = true]) {
    isSelected = _isSelected;
    for (var dataObject in listDataObject) {
      if (dataObject == listDataObject.first)
        dataObject.initIsSelected(true);
      else
        dataObject.initIsSelected(false);
    }
  }

  DataObject getDataObjectFromLevelRec(int level) {
    if (level == 0) {
      return this;
    } else {
      for (var dataObject in listDataObject) {
        if (dataObject.isSelected)
          return dataObject.getDataObjectFromLevelRec(level - 1);
      }
    }
    throw ("Error: No data selected found");
  }

  void setOnFocus() {
    isSelected = true;
    if (parent != null) {
      List<DataObject> listDataObject = parent.listDataObject;
      for (var dataObject in listDataObject) {
        dataObject.isSelected = false;
      }
      isSelected = true;
      dataObjectManager.notifyListenersMe();
    }
  }

  Widget widget({int depth = 0, int depthMax = 1}) {
    return _DataObjectWidget(this, depth,
        listDataObject: listDataObject, depthMax: depthMax);
  }
}

class _DataObjectWidget extends StatefulWidget {
  final DataObject dataObject;
  final int depth, depthMax;
  final List<DataObject> listDataObject;
  final Widget child;
  _DataObjectWidget(this.dataObject, this.depth,
      {this.listDataObject = const [], this.depthMax, this.child});

  @override
  __DataObjectWidgetState createState() => __DataObjectWidgetState();
}

class __DataObjectWidgetState extends State<_DataObjectWidget> {
  @override
  Widget build(BuildContext context) {
    var decoration = BoxDecoration(
      color: widget.dataObject.isSelected && widget.depth == widget.depthMax
          ? Colors.green
          : Colors.black,
      border: Border.all(
        color: Colors.white,
        width: 2,
      ),
    );
    TextTheme textTheme = Theme.of(context).textTheme;
    List<Widget> listWidget = [];
    if (widget.depth < widget.depthMax)
      for (var dataObject in widget.listDataObject) {
        listWidget.add(dataObject.widget(
            depth: widget.depth + 1, depthMax: widget.depthMax));
      }
    if (widget.dataObject.fctData != null) {
      listWidget.add(Container(
          decoration: decoration,
          child: FutureBuilderCircularProgress(widget.dataObject.fctData)));
    }

    return FlatButton(
      padding: EdgeInsets.all(0),
      onPressed: () {
        widget.dataObject.setOnFocus();
        setState(() {});
      },
      child: Container(
        decoration: decoration,
        child: Padding(
          padding: EdgeInsets.all(10),
          child: Center(
            child: Column(
              children: <Widget>[
                    Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(widget.dataObject.name,
                            style: textTheme.headline5),
                        // Icon(Icons.arrow_downward),
                      ],
                    ),
                  ] +
                  listWidget,
            ),
          ),
        ),
      ),
    );
  }
}
