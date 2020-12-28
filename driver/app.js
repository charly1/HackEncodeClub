const open = require('open');

const index_file = "index.html";
const index_port = 3000;
const local_path = 'http://localhost';

const express = require("express");
const app = express();

var log_url = local_path+':'+index_port;

(async () => {
    await open(log_url);
})();

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/" + index_file);
});
app.get("/src/portis_log.js", function (req, res) {
    res.sendFile(__dirname + "/src/" + "portis_log.js");
});
app.listen(index_port, function () {
    console.log("Server is running on "+local_path+":"+index_port);
});
