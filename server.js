/**
 * front end user server
 */

// import https from 'https'
import http from 'http'
import express from 'express'
import io from 'socket.io'
import fs from 'fs'

/**
 * CONFIGURATIONS
 */
const httpsOptions = {
	key: fs.readFileSync('./docker/nginx/key.pem'),
	cert: fs.readFileSync('./docker/nginx/cert.pem')
}
const serverport = 3000

/**
 * SERVER MODULES
 */

let app = express();
let wss_server;
let web_server = http.createServer(app);

/**
 * HANDHELD BATTLE KNIFE  CORS
 */
app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
});

/**
 * STATIC FILES - FRONT END
 */
app.use(express.static(__dirname + '/templates'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use('/static', express.static(__dirname + '/static'))

/*****************************************************
 * 											ROUTES
 *****************************************************/

app.get('/', (req, res) => {
	res.send('Monit-ON v1')
})

/**
 * @description :: SEND HR VALUE
 */
app.get('/update_hr/:value', function (req, res) {
	console.log(req.params.value);
	wss_server.emit('update:hr', req.params.value);
	return res.status(200).json(req.params.value)
});
/**
 * @description :: SEND CAL VALUE
 */
app.get('/update_cal/:value', function (req, res) {
	console.log(req.params.value);
	wss_server.emit('update:cal', req.params.value);
	return res.status(200).json(req.params.value)
});

/**
 * @description :: SEND MOV VALUE
 */
app.get('/update_mov/:value', function (req, res) {
	console.log(req.params.value);
	wss_server.emit('update:mov', req.params.value);
	return res.status(200).json(req.params.value)
});


/**
 * SERVER LIFT
 */
web_server.listen(serverport, function () {
	console.log(`[SUCCESS] API RUNNING AT PORT ${serverport}
	`);
});

wss_server = io.listen(web_server, {
	origins: '*:*'
})

/**
 * SOCKETS ROUTING
 */

wss_server.on('connection', function (socket) {
	console.log('---> Cliente conectado');
});