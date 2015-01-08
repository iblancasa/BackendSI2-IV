
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


  Este proyecto está pensado para Heroku. Como no vamos a firmar nuestros certificados y es necesario usar un addon de Heroku,
  dejamos la conexión segura que Heroku brinda por defecto. En
*/


var express = require('express')
  , routes = require('./routes')
  , cookies = require('./avisos/cookies')
  , google = require('./routes/google')
  , http = require('http')
  , path = require('path');

var app = express();


app.configure(function(){
  app.set('clientId', process.env.CLIENT_ID);
  app.set('clientSecret', process.env.CLIENT_SECRET);
  app.set('port', process.env.PORT || 3001);
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
app.get('/', routes.index);
app.post('/google/auth', google.auth);

google.CLIENT_ID = app.get('clientId');
google.CLIENT_SECRET = app.get('clientSecret');
if( !google.isInitialized() ){
  console.log("Debes introducir las claves como variables de entorno");
  process.exit(1);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Ejecutando en el puerto " + app.get('port'));
});
