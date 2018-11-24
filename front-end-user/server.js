var express = require('express');
var app = express();
app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/node_modules'));
var server = require('http').createServer(app);
var io = require('socket.io')(server);

io.on('connection', function(socket){
    console.log('a user connected');
});

server.listen(3000);

/*app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}); */
