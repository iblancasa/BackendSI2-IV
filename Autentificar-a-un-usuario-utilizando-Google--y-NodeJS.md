#Autentificar a un usuario utilizando Google+ y NodeJS#

![Google+ y NodeJS](http://fotos.subefotos.com/7239fde6a03558307b9bf591999988a1o.jpg)

Esta referencia está basada en [este repositorio](https://github.com/afirstenberg/google-plus-node).

Cuando se escribe este artículo, el repositorio lleva dos años sin actualizar, pero los métodos son igualmente válidos.



Debido a que es complicado explicar cómo es el proceso para el desarrollo de una aplicación de este tipo, nos basaremos en el repositorio antes referenciado para comentar qué es lo que hace cada una de las partes del código.


En primer lugar hay que ver qué es lo que vamos a utilizar. Si miramos el fichero "package.json", las dependencias son:

+ Express (framework web)
+ EJS (gestor de templates)
+ GoogleApis (interfaz con la API de Google)

```javascript
{
  "name": "google-plus-node",
  "version": "0.0.1",
  "private": true,
  "scripts": {
    "start": "node app"
    },
    "dependencies": {
      "express": "3.1.0",
      "ejs": "*",
      "googleapis": "0.2.5-alpha"
    }
  }
```


"app.js", el fichero que se ejecuta al lanzar la aplicación

```javascript

var express = require('express')//Cargamos express
, routes = require('./routes')//Cargamos el directorio routes (más adelante se verá)
, google = require('./routes/google')
, http = require('http')//Cargamos el módulo http
, path = require('path');//Cargamos el módulo path

var app = express();//Se crea la aplicación del servidor


app.configure(function(){//Configuración del servidor
  app.set('clientId', process.env.CLIENT_ID);//Se toma el ID cliente de las variables de entorno
  app.set('clientSecret', process.env.CLIENT_SECRET);//Se toma el secreto de cliente de las variables de entorno
  app.set('port', process.env.PORT || 3001);//Si no se define un puerto en las variables de entorno, se toma el 3001
  app.set('views', __dirname + '/views');//Las vistas van en la carpeta "views"
  app.set('view engine', 'ejs');//Se define el gestor de templates es EJS
  app.use(express.favicon());//Se usa el favicon de Express
  app.use(express.logger('dev'));//Middleware
  app.use(express.bodyParser());//Middleware
  app.use(express.methodOverride());//Sobreescritura
  app.use(express.cookieParser('google-node'));//Parseador de cookies
  app.use(express.session());//Gestor de sesiones
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));//Ruta de ficheros estáticos
  });

  app.configure('development', function(){//Para desarrollo
    app.use(express.errorHandler());
    });



    app.get('/', routes.index);//Gestiona las peticiones a la ruta /
    app.post('/google/auth', google.auth);//Gestiona las peticiones a la ruta /google/auth


    google.CLIENT_ID = app.get('clientId');//Toma el clientID
    google.CLIENT_SECRET = app.get('clientSecret');//Toma el client secret
    if( !google.isInitialized() ){//Comrpueba que esté correctamente
      console.log("You must set the CLIENT_ID and CLIENT_SECRET environment variables.");
      process.exit(1);
    }

    http.createServer(app).listen(app.get('port'), function(){//Se lanza el servidor
      console.log("Express server listening on port " + app.get('port'));
      });
```


Veamos "routes/index.js"

```javascript

var crypto = require('crypto')//Se carga crypto para generar un token
, google = require('./google')//Se cargan las funciones de Google
;

exports.index = function(req, res){

  var stateToken = crypto.randomBytes(48).toString('hex');//Se crea un token
  var now = (new Date()).getTime();//Fecha actual
  var data = {//Datos para la petición
    'clientId': google.CLIENT_ID,//Client ID de nuestra aplicación
    'scope':    google.SCOPE,//Alcance de nuestra aplicación
    'state':    stateToken,//Token generado
    'now':      now//Fecha
  };
  res.render('index', data);//Se renderizan los datos
  req.session['now'] = now;//Fecha de la sesión
  req.session['state'] = stateToken;//Token
};
```

Veamos "routes/google.js"

```javascript

exports.CLIENT_ID = undefined;
exports.CLIENT_SECRET = undefined;


exports.isInitialized = function(){
  return exports.CLIENT_ID && exports.CLIENT_SECRET;//Comprueba si existen el client ID y el client secret
};

var REDIRECT_URL = 'postmessage';

exports.SCOPE = 'https://www.googleapis.com/auth/plus.login';//Todos los permisos

var googleapis = require('googleapis');//Cargamos el módulo Google APIs


var client;

googleapis
.discover( 'plus', 'v1' )//Conectar con Google+ API v1
.execute( function(err,data){
  client = data;
});

var now = function(){
  return (new Date()).toISOString();//Fecha actual
};

exports.auth = function( req, res ){//Autentificación
  var ret = {
    err: null,
    ok: null
  };

  var sessionStateToken = req.session['state'];//Token de sesión
  var clientStateToken  = req.body['state'];//Token de usuario

  console.log( 'csrf', sessionStateToken, clientStateToken );

  if( !sessionStateToken ||
    !clientStateToken ||
    sessionStateToken !== clientStateToken ){//Se comprueba si hay problemas
      ret.err = {
        msg: 'state token does not match'
      };
      res.send(ret);//Envío de respuesta
      return;
    }


    var oauth2 = new googleapis.OAuth2Client( exports.CLIENT_ID,//Iniciamos G+
      exports.CLIENT_SECRET,
      REDIRECT_URL );
      oauth2.getToken( req.body.code, function(err, tokens){//Se piden las credenciales del usuario
        oauth2.credentials = tokens;
        console.log( now(), err, tokens );
        client.plus.people.get({
          userId: 'me'
          })
          .withAuthClient(oauth2)
          .execute(function(err,result){//Se ejecuta la petición y se ejecuta esta función en callback
            ret.err = err;//Se guardan los errores
            ret.ok = result;//Se guarda el resultado
            res.send(ret);//Se envía la respuesta
            if( result ){//Si el resultado no es nulo. En resultado están los datos del usuario. Los
              // datos que se pueden extraer se pueden consultar en https://developers.google.com/+/api/latest/people?hl=es#resource
              var key = result.id;
              var user = {
                auth: oauth2,
                plusInfo: result
              };
            }
            });
            });
          };

```

Como pone en el comentario, en la variable "result" de esta última función, se encuentran los datos del usuario (en caso que la autentificación haya sido existosa). Para ver qué datos hay y a qué parametros hay que acceder para tomar esos datos, podemos [ver el esquema en este enlace](https://developers.google.com/+/api/latest/people?hl=es#resource).

Para autentificar a nuestro usuario, guardaremos su ID, el token de estado y su token de acceso. El usuario los dos últimos.
En el ejemplo propuesto, solo se envía el de estado pero en otros lugares, se envía el token de acceso (Google indica que este es el que hay que enviar)

La página que se muestra al usuario "/views/index.ejs":

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Google+ Sign-In Example</title>
    <link rel='stylesheet' href='/stylesheets/style.css'/><!--Cargamos la hoja de estilos-->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script><!--Cargamos carga de jQuery-->
    <script>
    clientStateToken = '<%= state %>';//Token de estado de usuario
    </script>
    <script src="/javascripts/client.js"></script>
  </head>
  <body>
    <h1>Google+ Sign-In Example</h1>

    <div id="signinButton"><!--Botón de autentificación. Se establece el alcance, el clientID de la aplciación, el tipo de mensaje, cookies-->
    <span class="g-signin"
    data-scope="<%= scope %>"
    data-clientid="<%= clientId %>"
    data-redirecturi="postmessage"
    data-accesstype="offline"
    data-cookiepolicy="single_host_origin"
    data-callback="signInCallback">
    </span>
    </div>
    <script type="text/javascript">
    //Script de Google+
    (function(){
      var po = document.createElement( 'script' );
      po.type = 'text/javascript';
      po.async = true;
      po.src = 'https://plus.google.com/js/client:plusone.js?onload=start';
      var s = document.getElementsByTagName( 'script' )[0];
      s.parentNode.insertBefore( po, s );
    })();
    </script>
  </body>
</html>
```

Finalmente, vamos a ver el "public/javascripts/client.js" (ya que la hoja de estilos no merece atención)

```javascript
(function(global){
  'use strict';

  global.signInCallback = function( auth ){
    console.log( 'signInCallback:', auth );
    if (auth['code']) {//Si está autorizado

      // Se esconde el botón
      $('#signinButton').attr('style', 'display: none');

      //Se guardan los datos
      var data = {
        'code': auth['code'],
        'state': global.clientStateToken
      };
      console.log(auth['code']);//Se imprime el código

      $.ajax({
        type: 'POST',
        url: '/google/auth',
        contentType: 'application/json; charset=utf-8',
        success: function(result) {
          //Se muestra lo que tiene el usuario
          console.log(result);
        },
        processData: false,
        data: JSON.stringify(data)
      });
    } else if (auth['error']) {//Hay un error o no está creado
      console.log('There was an error: ' + auth['error']);
    }
  }

})(this);
```

Referencias:
+ [Documentación Google Developers](https://developers.google.com/accounts/docs/OAuth2WebServer)
