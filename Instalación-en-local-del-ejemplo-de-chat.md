#Instalación en local del ejemplo de chat#

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