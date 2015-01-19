#Conseguir las claves para autentificar con Google+#

Lo primero que hay que hacer es acceder a la [Consola de desarrolladores de Google](https://console.developers.google.com/).

![Consola Desarrolladores de Google](http://fotos.subefotos.com/d29e4a8bf07b9ec8cfdee4655fc8e2a7o.jpg)

Una vez aquí, pulsamos sobre "Crear proyecto". Nos aparecerá un cuadro de diálogo en el que deberemos escribir el nombre del proyecto.

![Crear proyecto](http://fotos.subefotos.com/efb1be1db76a2e7ceec6c22f90d188cao.jpg)

Cuando el proyecto esté creado, ingresaremos al mismo y haremos click sobre "APIs y autentificación" y haremos click sobre "APIs". Después buscaremos la que pone "Google+" y la activaremos.

![Activando API](http://fotos.subefotos.com/cb56e7e8385689f810675095cd2ef49fo.jpg)

Ahora vamos a "Credenciales" y pulsamos sobre "Crear ID de cliente nuevo". Nos aparecerá un cuadro de diálogo como el siguiente. Lo dejamos como en la imagen.

![Crear ID](http://fotos.subefotos.com/e5e607aadf411b9b5dcdc4e4914ab2f0o.jpg)

Se nos pedirá personalizar el cuadro que aparecerá a los usuarios

![Plantilla](http://fotos.subefotos.com/d5e1836446d97695dc46a03bc3f81161o.jpg)

Cuando esté completo, pasamos al siguiente paso. Ahora se nos pedirá introducir los orígenes desde los que autorizaremos el uso del JavaScript. Esto evita que terceros utilicen nuestra clave como si fuese suya (consumiendo nuestros recursos). Pondremos nuestro dominio y, en caso que estemos desarrollando en local, lo dejaremos como en la imagen. También habrá que indicar a través de que puerto está escuchando nuestro servidor. Para la aplicación ([ver referencia](https://github.com/iblancasa/BackendSI2-IV/wiki/Autentificar-a-un-usuario-utilizando-Google--y-NodeJS)) vamos a configurar así (para desarrollo local):

```
ORÍGENES DE JAVASCRIPT: http://localhost:3001
URIS DE REDIRECCIONAMIENTO: http://localhost:3001/google/auth
```

![Orígenes de JavaScript](http://fotos.subefotos.com/b7e7d25aa79981e39692f2fe15f745f2o.jpg)

Y, finalmente, obtendremos las claves

![Final](http://fotos.subefotos.com/103b20533e2aa8f778adf8100b4ca096o.jpg)