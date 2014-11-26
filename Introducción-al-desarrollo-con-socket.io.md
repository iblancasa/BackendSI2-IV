#Introducción al desarrollo con socket.io#
![socket.io](http://fotos.subefotos.com/27a5e3ac0e996fa4f0cd0fa298f55cfco.png)

##[Cosas necesarias](https://github.com/iblancasa/BackendSI2-IV/wiki/Herramientas-interesantes-para-instalar)##
Es necesario disponer, al menos, de un editor de textos y de la instalación de NodeJS.



##El manifiesto##
De similar forma que las aplicaciones desarrolladas para dispositivos Android necesitan de un manifiesto (AndroidManifest.xml) que indique ciertas directrices del software, también es necesario para los programas creados con NodeJS. En este caso, el nombre que recibe el fichero es "package.json".

Un ejemplo de ``package.json`` es el siguiente:
  ```
  {
  "name": "App de ejemplo",
  "version": "0.0.1",
  "description": "App para probar el funcionamiento de socket.io",
  "dependencies": {}
  }
  ```

Donde:
+ `name`: nombre del software que estamos desarrollando
+ `version`: versión del sofware que estamos desarrollando
+ `description`: una breve descripción sobre qué hace nuestro software
+ `dependencies`: dependencias de nuestro software. Estas dependencias se rellenan utiliazndo "npm" (Node Package Manager)


###Instalando dependencias###
Para hacer funcionar nuestra aplicación, será necesario realizar la instalación de algunas dependencias y añadirlas al manifiesto. Aquí se van a utilizar:
+ [Express](http://expressjs.com/): es un framework de desarrollo web que nos facilitará las tareas de servidor
+ [socket.io](http://socket.io/): nos permitirá realizar el envío de mensajes cliente-servidor de forma sencilla

Para instalarlos, será necesario que ejecutemos, desde terminal, las siguientes instrucciones (estando en el mismo directorio en el que se encuentra nuestro manifiesto):
```
  npm install socket.io
  npm install --save express
```


##Iniciando el servidor##
Para iniciar el servidor, crearemos un fichero llamado "index.js" y escribiremos lo siguiente dentro:
```javascript
  var app = require('express')(); // Toma express
  var http = require('http').Server(app); //Toma el servidor http
  var port = process.env.PORT || 3000; //Se toma el puerto. Si no se ha definido ninguno, se usa el 3000

  app.use(express.static(__dirname + '/public')); //Se redirecciona al cliente a los contenidos de la carpeta "public"

  /*
   * Si queremos manejar varias rutas, es mejor hacerlo así:
  app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
    });
   * De esta forma, manejamos la petición HTTP GET, ejecutando la función que se declara a continuación,
   la cual envía al usuario al fichero "index.html" (que se encontrará en la misma carpeta que nuestro "index.js" -en este caso-).
   * Las variables pasadas como parámetros ("req" y "res") hacen referencia a "request" y "response" respectivamente.
  */

  http.listen(port, function(){ //Se inicia el servidor y se ejecuta la función que se declara a continuación
    console.log('Ejecutando en el puerto %d', port);
    });
```



##Añadiendo socket.io##
Al código anterior, hay que añadir la carga de la biblioteca "socket.io" para poder utilizarla. Como parámetro, pasaremos el servidor "http", tal que así:
```javascript
  var io = require('socket.io')(http);
```

A partir de ahora, nuestro servidor estará escuchando un evento especial llamado "connection". Para ejecutar las distintas funcionalidades que queramos implementar en nuestro servidor, habrá que tratar dicho evento (si además queremos manejar qué pasa cuando un usuario se desconecta, disponemos del evento "disconnect", que deberemos manejar dentro del manejo del evento "connection"):

```javascript
  io.on('connection', function(socket){
    /*
    * Eventos a tratar
    */
    socket.on('disconnect', function(){
      //Sentencias a ejecutar tras una desconexión
      });
   });
```

Se pueden:
+ Recibir eventos
+ Emitir eventos


###Recibir eventos###
Para recibir eventos desde el cliente, tratamos el evento llamando a la función "on" del objeto pasado como argumento a la función que maneja el evento "connection" (en el código anterior, ese objeto sería "socket").

```javascript
  socket.on('evento prueba', function () {
    //Sentencias a ejecutar al recibir el evento
      });
```

En este ejemplo, esstaríamos tratando el evento "evento prueba". La función puede tener un parámetro, que será un diccionario "clave-valor" con los parámetros enviados por el cliente.

###Emitir eventos###
Utilizando el mismo objeto que en el caso anterior, utilizamos la función "emit". Con esta función, se envía un evento a todos los usuarios conectados.
```javascript
socket.broadcast.emit('evento prueba', {dato: 'valor' });
//Otra forma similar:  io.sockets.emit('evento prueba', {dato: 'valor' });
//Otra forma similar:  io.emit('evento prueba', {dato: 'valor' });
```
Como se ve en el ejemplo, se lanza el evento "evento prueba" y se pasa un diccionario de datos de tipo "clave-valor".

Si lo que se desea es lanzar eventos contra un único usuario, se pueden crear URL personalizadas (esta función no es propia de socket.io, por lo que habría que programarla -tal vez utilizando el mecanismo de sesiones de "Express"-) y utilizando los ["namespaces" de socket.io](http://socket.io/docs/rooms-and-namespaces/).



##Programando el cliente##
La programación en el cliente es muy sencilla.
En un documento HTML, llamaremos a la biblioteca [jQuery](http://jquery.com/) (facilita enormemente el tratamiento de los datos) y a socket.io (la ruta al script de socket.io viene determinada por cómo se hizo la instalación de la biblioteca en el servidor):

```javascript
<script src="https://code.jquery.com/jquery-1.10.2.min.js"></script>
<script src="/socket.io/socket.io.js"></script>
```

En un bloque Javascript (posterior a las anteriores declaraciones) escribiremos lo siguiente:

```javascript
var socket = io();
```

De esta forma habremos establecido comunicación con el servidor.
Al igual que en el servidor, se pueden:
+ Recibir eventos
+ Emitir eventos


###Recibir eventos###
Consistirá, de igual forma que en el servidor, de llamar a la función "on" de nuestro objeto de socket.io (en nuestro ejemplo, se le ha llamado "socket").

```javascript
socket.on('evento prueba', function () {
  //Sentencias para tratar el evento
});
  ```
En este caso, se está manejando el evento "evento prueba". La función puede tener un parámetro, que será un diccionario "clave-valor" con los parámetros enviados por el servidor.


###Emitir eventos###
Utilizando el mismo objeto que en el caso anterior, utilizamos la función "emit". Con esta función, se envía al servidor.

```javascript
socket.emit('evento prueba', {dato: 'valor' });
```
En este ejemplo, se está enviando un evento "evento prueba" al servidor. Además, se está pasando el parámetro "dato", que tiene como valor el string "valor".


##Bibliotecas para utilizar socket.io en otros lenguajes##
+ [Socket.IO-Client for Java](https://github.com/Gottox/socket.io-java-client)
+ [Socket.IO-client.java](https://github.com/nkzawa/socket.io-client.java)
+ [Socket.IO / Objective C Library](https://github.com/pkyeck/socket.IO-objc)
+ [Socket.IO / Objective C Library *fork con mejoras](https://github.com/francoisp/socket.IO-objc)
+ [SIOSocket](https://github.com/MegaBits/SIOSocket)
+ [AZSocketIO](https://github.com/lukabernardi/AZSocketIO)

*Utilizando estas bibliotecas, se pueden desarrollar aplicaciones para los dos principales sistemas operativos móviles (iOS y Android). Además, utilizando jQuery+HTML5, se puede crear una versión web o, incluso, facilitar el desarrollo de aplciaciones para otro tipo de sistemas operativos, como FirefoxOS*


##Enlaces interesantes:##
+ [Chat de ejemplo de socket.io](http://socket.io/get-started/chat/)
+ [Documentación oficial de socket.io](http://socket.io/docs/)
+ [Instalación en local de ejemplo de chat de socket.io](https://github.com/iblancasa/BackendSI2-IV/wiki/Instalaci%C3%B3n-en-local-del-ejemplo-de-chat)
+ [Cómo realizar un despliegue en Heroku](https://github.com/iblancasa/BackendSI2-IV/wiki/C%C3%B3mo-realizar-un-despliegue-en-Heroku)
+ [API de Express](http://expressjs.com/4x/api.html)
+ [Connecting to a socket.io server form Android](http://nkzawa.tumblr.com/post/46850605422/connecting-to-a-socket-io-server-from-android)
