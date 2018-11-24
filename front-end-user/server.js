var express = require('express');
var app = express();

app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/node_modules'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
