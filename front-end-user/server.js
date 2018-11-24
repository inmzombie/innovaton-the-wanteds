var express = require('express');
var cors = require('express-cors')

var app = express();
app.use(express.static(__dirname + '/www'));
app.use(express.static(__dirname + '/node_modules'));

var server = require('http').createServer(app);
var io = require('socket.io')(server, { origins: '*:*'});

io.on('connection', function (socket) {
    console.log('a user connected');
});

app.get('/setvalue/:value', function(req, res) { 
    console.log(req.params.value);
    io.emit('update', req.params.value);
    return res.status(200).json(req.params.value) 
});

server.listen(3000);

/*app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
}); */