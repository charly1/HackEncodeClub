import 'package:flutter/material.dart';

class FutureBuilderCircularProgress extends StatelessWidget {
  final Future<String> future;
  FutureBuilderCircularProgress(this.future);
  @override
  Widget build(BuildContext context) {
    TextTheme textTheme = Theme.of(context).textTheme;
    return FutureBuilder<String>(
      future: future,
      builder: (BuildContext context, AsyncSnapshot<String> snapshot) {
        if (snapshot.hasData) {
          return Column(
            children: <Widget>[
              // Text(title, style: textTheme.headline5),
              // SizedBox(height: 20),
              Text(snapshot.data, style: textTheme.headline5),
              // SizedBox(height: 30),
            ],
          );
        } else if (snapshot.hasError) {
          return Text("Error: ${snapshot.error}", style: textTheme.headline4);
        } else {
          return SizedBox(
            child: CircularProgressIndicator(),
            width: 30,
            height: 30,
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
