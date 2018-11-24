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
io(server, {
	origins: '*:*'
});

/**
 * STATIC FILES - FRONT END
 */
app.use(express.static(__dirname + '/www'));


/**
 * ROUTES SCRIPTS CALLS TO node_modules
 */
app.use('/scripts', express.static(__dirname + '/node_modules'));

/**
 * SOCKETS CONFIGURATION
 */

io().on('connection', function (socket) {
	console.log('---> Socket conectado');
});

/**
 * ROUTES
 */
app.get('/', (req, res) => {
	res.send('Monit-ON v1')
})

/**
 * @description :: actualiza el valor de HR en front.
 */
app.get('/setvalue/:value', function (req, res) {
	console.log(req.params.value);
	io.emit('update', req.params.value);
	return res.status(200).json(req.params.value)
});


let serverport = 3000
server.listen(serverport, function () {
	console.log(`[SUCCESS] API RUNNING AT PORT ${serverport}
	`);
});