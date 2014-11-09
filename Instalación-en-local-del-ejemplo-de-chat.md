#Instalación en local del ejemplo de chat (simple)#

###Tutorial para sistemas operativos Linux###
[Para poder realizar este tutorial es necesario tener instalado, al menos, NodeJS y Git](https://github.com/iblancasa/BackendSI2-IV/wiki/Herramientas-interesantes-para-instalar).

En primer lugar es necesario clonar el [repositorio del ejemplo](https://github.com/guille/chat-example) utilizando el siguiente comando:

`git clone https://github.com/guille/chat-example.git`

Se entra a la carpeta, también desde terminal:

`cd chat-example`

Y se procede a instalar las dependencias:
```
npm install socket.io
npm install --save express
```

Finalmente, en la carpeta raíz del proyecto (char-example), se pone en marcha la aplicación con el siguiente comando:

`nodejs index.js`

La terminal nos mostrará el mensaje:
`listening on *:3000`

Para acceder a la aplicación, tenemos que acceder a

`http://localhost:3000`

![Imagen del chat](http://fotos.subefotos.com/3fdf525e7297718f5b61ae851f57eeb0o.png)

Podremos abrir varias ventanas y ver cómo el sistema funciona.



#Instalación en local del ejemplo de chat#

###Tutorial para sistemas operativos Linux###
[Para poder realizar este tutorial es necesario tener instalado, al menos, NodeJS y Git](https://github.com/iblancasa/BackendSI2-IV/wiki/Herramientas-interesantes-para-instalar).

En primer lugar es necesario clonar el [repositorio de socket.io](https://github.com/Automattic/socket.io) utilizando el siguiente comando:
`git clone https://github.com/Automattic/socket.io.git`

Se entra a la carpeta, también desde terminal:

`cd socket.io`

Y se procede a instalar las dependencias:
```
npm install
```
Habrá que entrar a la carpeta del ejemplo, ejecutando:
`cd examples/chat`

Habrá que instalar también dependencias, usando:
```
npm install
```

Finalmente, se ejecuta:
```
nodejs index.js
```

La terminal nos mostrará el mensaje: listening on *:3000

Para acceder a la aplicación, tenemos que acceder a

`http://localhost:3000`


![Imagen del chat2](http://fotos.subefotos.com/65393fb7c3f94cd3b8f615643c80ccc4o.png)

##Otra forma de ejecutarla##
De la forma que se ha realizado la ejecución, se carga la biblioteca "socket.io" desde el directorio padre. Para poder llevar la aplicación a cualquier lado, sin necesidad de llevar el código de la biblioteca, deberemos editar el fichero "index.js" y modificar la línea donde se llama a socket.io, dejando:
`var io = require('socket.io')(server);`

Tras esto, ejecutaremos:
```
npm install --save express
npm install socket.io
nodejs index.js
```

Y tendremos nuestra aplicación funcionando en local

Nota: la ejecución de NodeJS puede variar en función de la versión que se utilice, siendo la orden para ejecutar `nodejs` o `node`