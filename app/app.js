var appName         = 'Default-app'
var express 		= require('express'),
	app 			= express(),
	http 			= require('http'),
	server 			= http.createServer(app),
	path			= require('path'),
	morgan			= require('morgan'),
	fs 				= require('fs'),
	rfs 			= require('rotating-file-stream'),
	bodyParser		= require('body-parser'),
	dbconn	 		= require('./conf/sys.connection'),
	dbconfig		= {
		connector: 'MongoDB', // use 'MongoDB' or 'MySQL'
		username: 'test',
		password: 'test',
		host: '',
		port: '',
		database: 'dib'
	};

var bundles			= require('./conf/sys.bundles');
var routes 			= require('./conf/route')(express.Router(), bundles.models('MongoDB'), bundles.controllers())
var logDirectory 	= path.join(__dirname, 'log'),
	publicDirectory = path.join(__dirname, 'public');


/*
*	1. Setting up logging feature. 
*/
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
var accessLogStream = rfs('access.log', { // create a rotating write stream
  	path: logDirectory,
  	size:     '10M', // rotate every 10 MegaBytes written
    interval: '1d',  // rotate daily
    compress: 'gzip' // compress rotated files
})

/*
	1. Preparing the middleware.
*/
app.use(morgan('dev', {stream: accessLogStream}))
app.use(bodyParser.json({limit: '2mb'}));                           // 2mb file upload limit
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));     // 2mb file upload limit
app.use(express.static(publicDirectory))
app.use('/', routes);
app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

/*
	1. Firing up the server
	2. Handling error and notifying the event
*/ 
let p1 = new Promise((resolve, reject) => {
	console.log('\n'+'\x1b[33m%s\x1b[0m: ','Firing up the server..')
	var port = parseInt(process.env.PORT || '1337')
	app.set('port', port);
	server.listen(port);

	server.on('listening', resolve());
	server.on('error', reject());
});
 
p1.then(()=>{
	var addr = server.address();
	var bind = typeof addr === 'string'
		? 'pipe-' + addr
		: addr.port;
	console.log('\n'+'\x1b[33m%s\x1b[0m: ', ' App ', "\x1b[36m", appName,"\x1b[31m");
	console.log( '\x1b[33m%s\x1b[0m: ', '\n PORT' ,"\x1b[36m", bind);
	console.log("\n","\x1b[31m", "\n Press \'<Ctrl> + c\' to exit \n", "\x1b[35m");
	// Server is started
	
	// Now initializing the database
	console.log('\n'+'\x1b[33m%s\x1b[0m: ','Checking for database connectivity..')
	switch(dbconfig.connector){
		case 'MongoDB':
			dbconn.mongoConnection(dbconfig);
			break;
		case 'MySQL':
			dbconn.mysqlConnection(dbconfig);	
			break;
		default:
			console.log("No database selected! Please add correct connector.")
	}
	console.log("\x1b[0m"); 
})
.catch(()=>{
	if (error.syscall !== 'listen'){throw error;}
	var bind = typeof port === 'string'
	? 'Pipe ' + port
	: 'Port ' + port;
	switch (error.code) {
		case 'EACCES':
			  console.error(bind + ' requires elevated privileges.');
			  process.exit(1);
			  break;
		case 'EADDRINUSE':
			  console.error(bind + ' is already in use.');
			  process.exit(1);
			  break;
		default:
			  throw error;
	}
});