![Docker](http://fotos.subefotos.com/4e7301538895cdc19b0eb5f2a3b60730o.png)

##¿Qué es Docker?##

Docker es una herramienta que permite crear contenedores. Estos contenedores, son sistemas de virtualización que nos permiten tener aplicaciones empaquetadas, de forma que sean autosuficientes (al disponer de todas las bibliotecas y dependencias que necesiten).

En nuestro caso, se ha procedido a crear un contenedor Docker al que [se puede acceder a través de este enlace.](https://registry.hub.docker.com/u/iblancasa/backendsi2-iv/)



##¿Por qué elegir Docker?##
+ Es fácil de instalar
+ [Compatible con muchos sistemas operativos y sistemas cloud](https://docs.docker.com/installation/)
+ Es más seguro que otros métodos (para la máquina anfitriona) ya que los usuarios que acceden a la aplicación solo pueden acceder al entorno creado en el contenedor
+ Permite integración continua
+ Podemos basarnos en otro contenedor ya creado para ahorranos trabajo
+ Gracias a que los contenedores quedan publicados en su web, si alguien quiere hacer una colaboración para mejorar nuestro sistema de virtualización, puede hacerlo
+ Estos "tapers" pueden usarse tanto para pruebas como para producción (desde la versión 1 de Docker, ya que las anteriores no eran lo suficientemente maduras)
+ Es ligero



##¿Cómo generar un contenedor?##

###Dockerfile###
Para generar este contenedor, se ha [creado este fichero](https://github.com/iblancasa/BackendSI2-IV/blob/master/Dockerfile), llamado "Dockerfile" y que es el que toma Docker para generar un contenedor. En él, se indican distintas órdenes que permiten al sistema saber qué queremos que se instale (imagen base, ficheros que queremos copiar del repositorio...). [Aquí se puede obtener una lista de todas las órdenes disponibles y su sintáxis.](https://docs.docker.com/reference/builder/)

Cuando este artículo se ha escrito, este es el contenido de dicho fichero:

```shell
FROM ubuntu
MAINTAINER iblancasa <iblancasa@gmail.com> Version: 1.0


RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
RUN apt-get update
RUN apt-get install -y mongodb-org
RUN service mongod start
RUN apt-get install -y nodejs
RUN apt-get install npm git git-core -y
RUN mkdir /home/app
ADD app /home/app
ADD test /home/test
COPY package.json /home/
EXPOSE 3000
RUN cd /home; npm install; npm install -g mocha;npm install mocha chai supertest
CMD ["nohup","/usr/bin/nodejs", "app/index.js"]
```

###Generando el contenedor desde la web###
Para su creación, se ha creado una cuenta en [Docker.com](https://www.docker.com/). Una vez rellenado el formulario y realizadas las pertinentes verificaciones, se accede al panel de administración y se pulsa sobre "Add repository" y se selecciona "Automated Build").

![Add repository](http://fotos.subefotos.com/4c89ddc7850be9aa6715e9059b7bf510o.jpg)

Ahora se nos dará opción a elegir entre seleccionar un repositorio que tengamos creado en "GitHub" o Bitbucket (será necesario autorizar desde ese servicio que Docker acceda a nuestra lista de repositorios) y después se nos pedirá seleccionar el repositorio con el que queremos vincular).

![Seleccionar repositorio](http://fotos.subefotos.com/2a75dd7e541191bd415d8965e4f9ceabo.jpg)


Tendremos que esperar un rato a que se Docker se conecte con nuestro repositorio y haga un primer "build".
**Es importante tener un dockerfile válido. En caso contrario, nuestro contenedor no se creará**.

Cuando tengamos nuestro contenedor creado, podremos ver, en la página inicial de nuestro contenedor en Docker, el contenido del "Readme" de nuestro repositorio. Cuando modifiquemos el repositorio, se hará una nueva construcción de nuestro Docker. En la pestaña "Build Details" accedemos al historial de nuestro Docker, de forma que podemos ver si una construcción ha salido bien o no (y ver qué ha fallado).

![Página inicial del Docker](http://fotos.subefotos.com/d90cf3bcf60ddd49e48bd249c1efce40o.jpg)



##¿Cómo ejecutar el contenedor?##
Para poder usar Docker, tendremos que instalarlo en nuestro ordenador, para ello:

```shell
apt-get update
apt-get install docker.io
```

Cuando queramos "arrancar" el servicio, ejecutaremos (como superusuario):

``
docker -d
``

Puede que el servicio no arranque y nos avise de un problema con ``/var/run/docker.pid``, para ello, borramos el fichero ejecutando ``rm /var/run/docker.pid`` como superusuario y volvemos a ejecutar la orden anterior.

En otro terminal, ejecutaremos:

``docker pull iblancasa/backendsi2-iv``

Que descargará nuestro Docker. Una vez finalizada la descarga, podremos ejecutar la aplicación ejecutando:

``
sudo docker run -i -t iblancasa/backendsi2-iv /bin/bash -c "ifconfig;nodejs /home"
``

Se ejecuta el comando ``ìfconfig`` para comprobar la dirección IP y poder acceder, por ejemplo, desde nuestro navegador.

![Ejecutando Docker](http://fotos.subefotos.com/8d8c0239e7af219126fe71232ef0db1eo.jpg)

Si solo queremos acceder al terminal (para, por ejemplo, ejecutar los test unitarios):

``
sudo docker run -i -t iblancasa/backendsi2-iv /bin/bash
``

Para facilitar la instalación/ejecución, el repositorio cuenta con un [script de Bash](https://github.com/iblancasa/BackendSI2-IV/blob/master/installDocker.sh) que hay que ejecutar como superusuario y que arrancará el docker con la aplicación.

