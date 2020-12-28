import 'package:flutter/material.dart';

import 'package:web_3_tool/data_object.dart';

class DataObjectNotifier extends ChangeNotifier {
  DataObject dataObjectHandler;
  DataObject dataObjectSoftware;
  DataObject dataObjectLicense;
  DataObjectNotifier(this.dataObjectHandler) {
    dataObjectHandler.initDataObjectNotifierRec(this);
    dataObjectHandler.initIsSelected();
  }

  void init() {
    dataObjectSoftware = dataObjectHandler.getDataObjectFromLevelRec(1);
    dataObjectLicense = dataObjectHandler.getDataObjectFromLevelRec(2);
  }

  void notifyListenersMe() {
    notifyListeners();
  }
}
