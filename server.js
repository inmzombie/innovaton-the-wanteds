/**
 * front end user server
 */

import https from 'https'
import express from 'express'
import io from 'socket.io'
import fs from 'fs'

let app = express();

/**
 * HANDHELD KNIFE BATTLE CORS
 */
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

// Loads certificate
const httpsOptions = {
	key: fs.readFileSync('./docker/nginx/key.pem'),
	cert: fs.readFileSync('./docker/nginx/cert.pem')
}

// Server instance
let server = https.createServer(httpsOptions, app);

/**
 * SOCKETS.IO INTEGRATION
 */

let socketServer = io(server, {
	origins: '*:*'
});

/**
 * STATIC FILES - FRONT END
 */
app.use(express.static(__dirname + '/templates'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/static', express.static(__dirname + '/static'))

/**
 * SOCKETS CONFIGURATION
 */

io().on('connection', function (socket) {
	console.log('---> Cliente conectado');
});

/**
 * ROUTES
 */
app.get('/', (req, res) => {
	res.send('Monit-ON v1')
})

/**
 * @description :: SEND HR VALUE
 */
app.get('/update_hr/:value', function (req, res) {
	console.log(req.params.value);
	io.emit('update:hr', req.params.value);
	return res.status(200).json(req.params.value)
});
/**
 * @description :: SEND CAL VALUE
 */
app.get('/update_cal/:value', function (req, res) {
	console.log(req.params.value);
	io.emit('update:cal', req.params.value);
	return res.status(200).json(req.params.value)
});

/**
 * @description :: SEND MOV VALUE
 */
app.get('/update_mov/:value', function (req, res) {
	console.log(req.params.value);
	io.emit('update:mov', req.params.value);
	return res.status(200).json(req.params.value)
});

/**
 * SERVER PORT
 */
let serverport = 3000

/**
 * SERVER LIFT
 */
server.listen(serverport, function () {
	console.log(`[SUCCESS] API RUNNING AT PORT ${serverport}
	`);
});