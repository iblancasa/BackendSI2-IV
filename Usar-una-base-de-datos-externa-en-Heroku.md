##Usar una base de datos externa en Heroku

Para evitar tener que introducir datos bancarios para acceder a los [addons de Heroku](https://addons.heroku.com/), usaremos una base de datos externa y que será gratuita.

Para ello nos registramos en https://app.compose.io con un plan gratuito (Sandbox databases). Una vez dentro creamos una base de datos (en mi caso se llamará "pruebaDB") y en el submenú "Admin" consultamos la "Mongo URI".

![mongo_uri](http://i.imgur.com/KVvnVoC.png)

Ahora cambiamos la variable de entorno global con la Mongo URI:

En [usuario] y [contraseña] meteremos nuestros datos de la cuenta de Heroku, y también especicaremos la aplicación en la que cambiaremos la variable ("ejemplonodejs" en mi caso)

Ejecutar `heroku config:set MONGOHQ_URL="mongodb://[usuario]:[contraseña]@dogen.mongohq.com:10096/pruebaDB" --app ejemplonodejs`

![comando_para_cambiar_variable](http://i.imgur.com/orAf8MB.png)

Y se puede consultar en el Dashborad de Heroku, en la pestaña de "Actividad":

![cambiada _variable](http://i.imgur.com/n66BzHc.png)


Puedes consultar los tutoriales:

http://www.elliotbradbury.com/use-mongohq-heroku-without-verifying-account/

http://tech.sunilnkumar.com/2013/12/18/heroku-deployment-with-mongodb-database/