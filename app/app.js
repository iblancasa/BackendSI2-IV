
/**
 * Dependencias
 */

/**
  Para usar HTTPS:

  En consola
        openssl genrsa -out chat-key.pem 1024
        openssl req -new -key chat-key.pem -out certrequest.csr
        openssl x509 -req -in certrequest.csr -signkey chat-key.pem -out chat-cert.pem


  En este mismo archivo:
        var fs = require('fs');
        var hskey = fs.readFileSync('chat-key.pem');
        var hscert = fs.readFileSync('chat-cert.pem')
        var options = {
        key: hskey,
        cert: hscert
        };

        var express = require('express');
        var app = express();

        var https = require('https');

        var server = https.createServer(options, app);


  Este proyecto está pensado para OpenShift y no es necesario hacer todo esto
*/


var express = require('express')
  , routes = require('./routes')
  , cookies = require('./avisos/cookies')
  , google = require('./routes/google')
  , http = require('http')
  , keys = require('./keys')
  , dashboard = require('./routes/dashboard')
  , path = require('path');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);

global.ip=keys.ip;
global.port=keys.port;



app.configure(function(){
  app.set('clientId', keys.CLIENT_ID);
  app.set('clientSecret', keys.CLIENT_SECRET);
  app.set('port', global.port);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'ejs');
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(express.cookieParser('google-node'));
  app.use(express.session());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});


app.get('/cookies', cookies.cookies);


app.post('/dashboard', dashboard.index);//Cargar dashboard
app.post('/menu', dashboard.menu);//Cargar menu

app.get('/contacto', dashboard.contacto);     //Cargar contacto

app.get('/', routes.index);//Inicio
app.post('/google/auth', google.auth);//Autentificación de Google


google.CLIENT_ID = app.get('clientId');
google.CLIENT_SECRET = app.get('clientSecret');
if( !google.isInitialized() ){
  console.log("Debes introducir las claves como variables de entorno");
  process.exit(1);
}

server.listen(app.get('port'),global.ip, function(){
  console.log("Ejecutando en el puerto " + app.get('port'));
});


/*Socket.io*/
io.on('connection', function (socket) {
  socket.on('disconnect', function () {});
});
