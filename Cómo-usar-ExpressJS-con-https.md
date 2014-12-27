#Cómo usar ExpressJS con https#

![HHTPS Node ExpressJS](http://fotos.subefotos.com/6529a9aca846a939dac313a0b1a2dbc4o.jpg)


Es importante haber leído antes ["Instalación en local del ejemplo de chat]( https://github.com/iblancasa/BackendSI2-IV/wiki/Instalaci%C3%B3n-en-local-del-ejemplo-de-chat) y la forma en la que se inicia el servidor en ["Introducción al desarrollo con socket.io"](https://github.com/iblancasa/BackendSI2-IV/wiki/Introducci%C3%B3n-al-desarrollo-con-socket.io) para comprender cómo se lanza un servidor con ExpressJS.

##Generando los certificados##

Primero será necesario generar los certificados del servidor. Cuando un usuario acceda a nuestro sitio web, obtendrá un aviso indicando que la conexión no es segura, debido a que el certificado no estará firmado por una entidad de certificación. Puedes adquirir certificados a través de Internet (siendo éstos de pago).

En caso que no deseemos realizar el pago, podremos generar nuestros propios certificados. La conexión seguriá estando cifrada, aunque los navegadores no podrán certificar que el servidor sea el correcto.


```bash
openssl genrsa -out chat-key.pem 1024
openssl req -new -key chat-key.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey chat-key.pem -out chat-cert.pem
```


##Editando el código##

Simplemente, colocaremos los ficheros generados anteriormente dentro de nuestra aplicación y los referenciaremos desde el fichero donde se lance el servidor. La ruta será relativa al "package.json". Las claves las introduciremos en un diccionario y las pasaremos como parámetro a la hora de crear el servidor.

```javascript
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
```

Como podemos apreciar, el resto del código cambia poco.

Es importante comentar que, debido a que Heroku ya sirve las aplicaciones con HTTPS (certificando que la conexión es segura), no es necesario realizar estos pasos, pero conviene tenerlo en nuestro código por si, por ejemplo, desplegamos sobre un IaaS.