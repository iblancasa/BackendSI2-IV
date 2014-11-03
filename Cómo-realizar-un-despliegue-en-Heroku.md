En primer lugar es preciso tener una cuenta en [Heroku](https://www.heroku.com/). 
Tras haber realizado el registro, nos dirigimos a nuestro [dashboard](https://dashboard-next.heroku.com/apps). Una vez allí, deberemos indicar que queremos crear una nueva aplicación (indicando el nombre de la misma). Aparecerá una pantalla similar a esta:

![Captura 1](http://fotos.subefotos.com/2ba372c3bddefd5dbf477ce77d86014do.jpg)


Deberemos seguir los pasos que se nos indican:

1. Descargamos e instalamos la utilidad ["Heroku Toolbelt"](https://toolbelt.heroku.com/) en función del sistema operativo que utilicemos.
2. Creamos el repositorio y añadimos los repositorios remotos de Heroku.
3. Lo desplegamos

Durante alguno de estos pasos, se nos pedirá identificarnos con nuestros credenciales de Heroku. Además, puede que se nos pida la creación de una clave para la comunicación con Heroku (a lo que deberemos contestar que sí).

=====
##Cómo desplegar una aplicación de ejemplo##
En los siguientes pasos vamos a ver cómo desplegar una aplicación de ejemplo:

1. En primer lugar hacemos clone de un repositorio. Ejemplo:
`git clone git clone https://github.com/heroku/node-js-getting-started.git`
2. Entramos en el directorio que se ha creado. En el caso del ejemplo, "node-js-getting-started".
3. Creamos la aplicación mediante `heroku create --http-git`. El nombre se seleccionará de forma automática. Podemos pasarle como argumento un nombre elegido por nosotros: `heroku create [nombre] --http-git`
4. Al haber creado la aplicación en ese directorio, se habrá añadido automáticamente el repositorio remoto de Heroku. Ahora solo deberemos añadir, mediante git, los ficheros que hayamos modificado y asociarlos a un "commit". Tras esto, ejecutaremos `git push heroku master`.
5. Activamos el número de "dynos" que queremos tener en Heroku. `heroku ps:scale web=1`
6. Abrimos nuestra aplicación recién desplegada con `heroku open`
7. Cuando queramos desactivarla, ejecutaremos `heroku ps:scale web=1` en el directorio de la aplicación


=====
##Desplegando nuestra aplicación (solo para desarrolladores)##
1. En primer lugar hacemos clone del repositorio.
`git clone git clone https://github.com/iblancasa/BackendSI2-IV.git`
2. Entramos en el directorio que se ha creado. En el caso del ejemplo, "BackendSI2-IV".
3. Añadimos el repositorio remoto de Heroku  `heroku git:clone -a  backendsi2`
4. Ahora solo deberemos añadir, mediante git, los ficheros que hayamos modificado y asociarlos a un "commit". Tras esto, ejecutaremos `git push heroku master`.
5. Activamos el número de "dynos" que queremos tener en Heroku. `heroku ps:scale web=1`
6. Abrimos nuestra aplicación recién desplegada con `heroku open`
7. Cuando queramos desactivarla, ejecutaremos `heroku ps:scale web=1` en el directorio de la aplicación


####Enlaces interesantes####
* [Manejo de ramas en Git](http://www.genbetadev.com/herramientas/manejo-de-ramas-de-desarrollo-con-git)
* [Getting started with NodeJS](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up)