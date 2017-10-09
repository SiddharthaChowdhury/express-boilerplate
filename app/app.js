var appName         = 'Default-app'
var express 		= require('express'),
	app 			= express(),
	http 			= require('http'),
	server 			= http.createServer(app),
	path			= require('path'),
	morgan			= require('morgan'),
	fs 				= require('fs'),
	rfs 			= require('rotating-file-stream'),
	// cookieParser	= require('cookie-parser'),
	bodyParser		= require('body-parser'),
	routes 			= require('./conf/route')(express.Router());

var logDirectory 	= path.join(__dirname, 'log'),
	publicDirectory = path.join(__dirname, 'public');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory)
 
// create a rotating write stream
var accessLogStream = rfs('access.log', {
  	path: logDirectory,
  	size:     '10M', // rotate every 10 MegaBytes written
    interval: '1d',  // rotate daily
    compress: 'gzip' // compress rotated files
})

app.use(morgan('dev', {stream: accessLogStream}))
app.use(bodyParser.json({limit: '2mb'}));                           // 2mb file upload limit
app.use(bodyParser.urlencoded({limit: '2mb', extended: true}));     // 2mb file upload limit
// app.use(cookieParser());
app.use(express.static(publicDirectory))

app.use('/', routes);

app.use(function(req, res, next) {
  	var err = new Error('Not Found');
  	err.status = 404;
  	next(err);
});

var port = parseInt(process.env.PORT || '1337')
app.set('port', port);

server.listen(port);
server.on('error', ()=>{
	if (error.syscall !== 'listen'){throw error;}

  	var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  	switch (error.code) {
    	case 'EACCES':
      		console.error(bind + ' requires elevated privileges');
      		process.exit(1);
      		break;
    	case 'EADDRINUSE':
      		console.error(bind + ' is already in use');
      		process.exit(1);
      		break;
    	default:
      		throw error;
  	}
});
server.on('listening', ()=>{
	var addr = server.address();
  	var bind = typeof addr === 'string'
    	? 'pipe-' + addr
    	: addr.port;
  	console.log('\n'+'\x1b[33m%s\x1b[0m: ', ' App ', "\x1b[36m", appName,"\x1b[31m");
	console.log( '\x1b[33m%s\x1b[0m: ', '\n PORT' ,"\x1b[36m", bind);
    console.log("\n","\x1b[31m", "\n Press \'<Ctrl> + c\' to exit \n", "\x1b[35m");
    console.log("\x1b[0m");
});