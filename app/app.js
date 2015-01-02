
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
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
  app.use(express.favicon());
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

app.get('/', routes.index);
app.post('/google/auth', google.auth);

google.CLIENT_ID = app.get('clientId');
google.CLIENT_SECRET = app.get('clientSecret');
if( !google.isInitialized() ){
  console.log("You must set the CLIENT_ID and CLIENT_SECRET environment variables.");
  process.exit(1);
}

http.createServer(app).listen(app.get('port'), function(){
  console.log("Express server listening on port " + app.get('port'));
});
