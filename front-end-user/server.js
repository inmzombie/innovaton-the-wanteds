/**
 * front end user server
 */

var express = require('express');

var cors = require('express-cors')

var app = express();

var server = require('http').createServer(app);

var io = require('socket.io')(server, { origins: '*:*'});

app.use(express.static(__dirname + '/www'));

app.use('/scripts', express.static(__dirname + '/node_modules'));

io.on('connection', function (socket) {
    console.log('a user connected');
});

/**
 * ruta para setear valores de pulso cardíaco
 */
app.get('/setvalue/:value', function(req, res) { 
    console.log(req.params.value);
    io.emit('update', req.params.value);
    return res.status(200).json(req.params.value) 
});


let serverport = 3000
server.listen(serverport, function () {
    console.log(`
    ###########################################
    #        API RUNNING AT ${serverport}     #
    ###########################################
    `);
});