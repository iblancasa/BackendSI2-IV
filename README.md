
#Backend server mensajería#
==============

##Proyecto para el desarrollo de backend de servicio de mensajería instantánea orientado a empresas.##

[![Build Status](https://travis-ci.org/iblancasa/BackendSI2-IV.svg?branch=master)](https://travis-ci.org/iblancasa/BackendSI2-IV)

####Asignatura "Infaestructuras Virtuales". Grado de Ingeniería Informática, Universidad de Granada####



[La aplicación desplegada y funcionando la puedes ver aquí](http://stable-backendsi2.rhcloud.com/)
![Logo](http://fotos.subefotos.com/5fc10a3fee9186a0be88759dbcec02f3o.jpg)

=======
###¿Qué hay desplegado?###
Estamos trabajando en el backend.
Actualmente, está desplegado un sistema que solo permite darte de alta en nuestra aplicación utilizando la autentificación de Google+.


=======
[Sitio web del proyecto](http://iblancasa.github.io/BackendSI2-IV/)

También disponemos de una cuenta de Twitter asociada, [Twitter de BackendSI2-IV](https://twitter.com/BackendSI2), donde publicaremos los cambios en el repositorio y del blog.

[Contenedor Docker](https://registry.hub.docker.com/u/iblancasa/backendsi2-iv/)



Integrantes del grupo:

+ [Israel Blancas Álvarez](https://github.com/iblancasa)
+ [José Cristóbal López Zafra](https://github.com/JCristobal)
+ [Rafael Ortiz Cáceres](https://github.com/rafaroc)
+ [Pablo Casado Arenas](https://github.com/ramako)



> [Si2.info](http://si2.info/) es una empresa, dirigida por Ángel Moreno, que se dedica principalmente a desarrollo móvil y de webs. Propone el siguiente proyecto: Se trataría de construir el backend de un sistema de mensajería para móviles (tipo WhatsApp / Telegram), exponiendo un API que nos permita autenticar al usuario, crear grupos, mensajes 1 a 1, gestionar imágenes y otros archivos de medios, enviar notificaciones push (Android/iOS/Amazon SNS)... El servidor de Telegram, vamos (creo, no estoy seguro, que solo los clientes son libres, y lo que estamos buscando es crear un producto específico para determinados clientes, necesitamos un servidor). Incluso pensamos en algún tipo de "garantía de entrega", un "mensaje certificado", algún conector con un sistema de terceros que pueda hacer de "notario".

> Podría ser tanto un proyecto de tipo nube creando un backend basado en alguna plataforma SaaS como un proyecto de tipo devops tomando cualquier sistema a medio desarrollar que necesitara una infraestructura virtual. El contacto de este proyecto es Ángel Moreno.

Extraído de [aquí](https://github.com/JJ/GII-2014/blob/master/practicas_propuestas.md)




=======
### ¿Cómo ejecuto la aplicación en mi máquina?

En primer lugar necesitarás [obtener las claves necesarias para que tus usuarios puedan conectarse utilizando Google+](https://github.com/iblancasa/BackendSI2-IV/blob/master/wiki/Conseguir-las-claves-para-autentificar-con-Google-.md).

Clona el repositorio en tu máquina

```bash
git clone https://github.com/iblancasa/BackendSI2-IV.git
```

Exporta las siguientes variables con sus valores correspondientes:

```bash
export PORT= #Puerto en el que se ejecuta la aplicación
export PASSWORDSERVER= #Contraseña del servidor (para sesiones)
export facebookclientID= #ID de cliente de tu aplicación Facebook
export facebookclientSecret= #Secreto de cliente de tu aplicación Facebook
export twitterconsumerKey= #Clave de consumidor de tu aplicación Twitter
export twitterconsumerSecret= #Clave de consumidor secreta de tu aplicación Twitter
export googleclientID= #ID de cliente de tu aplicación Google+
export googleclientSecret= #Secreto de cliente de tu aplicación Google+
export BD= #URL de la base de datos MongoDB
export IP= #IP de la máquina donde se está ejecutando el backend
export URLSERVICE= #URL donde se está ejecutando el Backend (si para acceder es necesario poner el puerto, hay que ponerlo también)

```



Instala las dependencias del proyecto. Ve a la carpeta donde clonaste el repositorio y ejecuta ``npm install``.

Ejecuta el proyecto escribiendo en terminal ``nodejs .``




=======
### Despliegue en un PaaS: OpenShift

[![OpenShift](http://fotos.subefotos.com/57622f5e03b9cb3ed8dbbbfcc030e2d9o.jpg)](https://www.openshift.com/)


[OpenShift](https://www.openshift.com/) es un PaaS que nos ofrece multitud de herramientas y varios beneficios que nos ayudarán a poner en marcha nuestra aplicación:

* Sencillez de uso

Permite la creación de nuevas aplicaciones de forma muy intuitiva y con una interfaz sencilla.

* Integración con GitHub

Integración continua con esta plataforma, asegurando la portabilidad de las aplicaciones

* Eficiencia

Reduce el tiempo para construir y desplegar nuestra aplicación de forma sencilla: dispone de varias regiones para desplegarla, mejorando la latencia. Posibilidad de escalar dependiendo del tráfico recibido

* Variedad de lenguajes

Podremos desplegar utilizando varios lenguajes. En nuestro caso, nos permite utilizar NodeJS

* Facilidad a la hora de trabajar con BD

Dispone de [MongoDB](https://developers.openshift.com/en/databases-mongodb.html) entre otras (MySQL, PostgreSQL o Amazon RDS), añadiéndola como un plugin.

* Posibilidad de utilizar certificados propios de SSL

* Hay una empresa de confianza detrás: [Red Hat](https://www.redhat.com/)

* Dispone de una modalidad gratuíta


En nuestro caso optamos por la cuenta "Free" de este PaaS, que nos da 512MB RAM y un 1GB de almacenamiento


Tras haber probado otros servicios como Heroku, nos decantamos por OpenShift debido a la facilidad que nos presenta para hacer cualquier tarea

A esto, se suma la posibilidad de acceder mediante SSH a la aplicación (cosa que Heroku no nos permitía). Añadir nuevos "addons" de forma gratuíta y utilizar un dominio propio sin tener que poner datos bancarios, cosa que sí ocurría con Heroku, son otras características importantes a tener en cuenta a la hora sde haber elegido este PaaS




=======
### Despliegue en un IaaS: Azure

[![Azure](http://blogs.itpro.es/eduardocloud/files/2014/12/entrada-sola.jpg)](http://azure.microsoft.com/es-es/)

**Azure nos ofrece:**

* Flexibilidad

Podremos utilizar una amplia gama de imágenes, con gran cantidad de sistema operativos y diversas versiones de estos

* Alta disponibilidad

Ofrece un servicio con una disponibilidad del 99.95%, soporte técnico y una supervisión puntual del estado del servicio

* Escalabilidad

Se puede ampliar o reducir rápidamente para adaptarse a cualquier demanda, de modo que solo paga por lo que usa.

* Multitud de servicios para BD

Proporciona servicios de datos administrados de SQL y NoSQL o mucha compatiblidad con éstos. También se podrá sincronizar con directorios locales existentes.

* Otros aspectos:

Un inconveniente de usarlo lo podemos encontrar en la privacidad: Microsoft permite que el gobierno de los Estados Unidos tenga acceso a los datos almacenados incluso si el cliente no es estadounidense y los datos residen fuera de Estados Unidos, de acuerdo a la [Ley USA PATRIOT](http://es.wikipedia.org/wiki/Ley_USA_PATRIOT)


En nuestro caso ejecutaremos la apliación en una máquina de Ubuntu 14.04 (ubicada al Oeste de Europa) con 1 núcleo  y 1,75 GB de memoria (Máquina tipo A1)

Para crearla simplemente ejecutamos: `azure vm create mimaquina b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu_DAILY_BUILD-trusty-14_04_1-LTS-amd64-server-20150113.1-en-us-30GB miusuario  mipass --location "West Europe" --ssh`

La arrancamos con `azure vm start mimaquina` y si queremos conectarnos mediante ssh: `ssh miusuario@mimaquina.cloudapp.net`


Escogemos [Azure](http://azure.microsoft.com/es-es/) como nuestro IaaS por ser uno de los más extendidos, muy flexible y con una importante empresa tras este IaaS (Microsoft). Se suma a esto, el tener conocimientos previos sobre su uso, ya que se a trabajado en clase con éste y disponemos de una cuenta gratuíta (cedida por el profesor).

También se estudiaron otras alternativas:

* [Amazon](http://aws.amazon.com/es/ec2/): necesario introducir datos bancarios
* [Fiware](https://cloud.lab.fiware.org/): es un servicio gratuíto y permite instalar algunas imágenes. No lo hemos utilizado ya que están teniendo problemas con los recursos y es complicado encontrar una región que permita crear nuevas máquinas.




=======
### Integración continua: Travis
[![Travis](http://i.imgur.com/Drswt2z.png)](https://travis-ci.org/)

Para la integración continua hemos elegido [Travis-CI](https://travis-ci.org/)

Travis es open source y  provee integración continua hosteada, es decir, no tenemos que tener nuestros propios servidores.

Tiene una integración con GitHub muy sencilla. Después de configurarlo automaticamente puede construir las ramas de un repositorio. Además soporta despliegue para Openshift, Heroku, etc...

Se configura con un fichero llamado `.travis.yml` en el directorio raíz del proyecto. En él, describimos mediante lenguaje YAML lo que necesitamos que instale antes de ejecutar nuestros test, cómo debe ejecutarlos y qué hacer después de ello (pudiendo elegiur qué hacer en caso que los test se pasen de forma satisfactoria o no).

[Proyectyo en Travis](https://travis-ci.org/iblancasa/BackendSI2-IV)

El proceso que se sigue es el siguiente:

* Se hace un push en el proyecto
* GitHub, que ha sido previamente linkeado con nuestra cuenta de Travis, envía una petición POST a los servidores de Travis para que haga un nuevo build.
* Travis nos muestra la versión de disntintos programas que tiene instalados y pueden sernos útiles
* Clona nuestro repositorio
* Exporta variables de entorno que hayamos declarado en Travis (se delaran una: "ANSIBLESSH", con el valor oculto)
* Lee el fichero `.travis.yml` de nuestro repositorio y detecta que el lenguaje que vamos a utilizar es NodeJS, por lo que instala algunas cosas como npm o las dependencias de nuestro proyecto (además de crear un entorno)
* Después se ejecuta la sección "before_script" de nuestro `.travis.yml` (en el que se asignan permisos de ejecución a unos scripts que se usarán más tarde)
* Se ejecutan los test. Si alguno falla, se ejecuta la sección "after_failure", que muestra un mensaje de error
* Se despliega en OpenShift, utilizando los parámetros de "deploy" (cabe destacar que hay que utilizar la gema Ruby de Travis para encriptar la contraseña)
* Finalmente, se ejecuta la sección "after_deploy", en la que se siguen los siguientes pasos:
	* Instalamos Python (necesario para instalar Ansible) y sshpass (necesario para conectar por SSH usando Ansible)
	* Instalamos Ansible
	* Se ejecuta `despliegue.sh`:
		* Acepta la llave de Azure para conectarse por SSH
		* Genera el `ansible host` para que no se muestr la contraseña, que está en la variable de entorno ANSIBLESSH
		* Exporta la variable de entorno ANSIBLE_HOSTS (con la ruta al fichero recien generado)
		* Se ejecuta el playbook (que para el servicio, actualiza el repositorio y vuelve a iniciarlo)
		* Se muestra un mensaje

De esta forma, nos aseguramos que, hasta que no se hayan pasado los test, no se despliegue en el PaaS ni en el IaaS (cosa que ocurriría si hubiésemos linkeado el repositorio directamente con cualquiera de los dos).



=======
### Por qué Ansible
[![Ansible](http://cdn2.hubspot.net/hub/330046/file-769078210-png/Official_Logos/ansible_logo_black_square_small.png?t=1422639852056)](http://www.ansible.com/home)


Ansible es una herramienta open source para automatizar tareas de forma simple, sus principales contricantes son Pupper, Chef y Salt. Chef se ha utilizado y es más complicado de usar que Ansible, y los resultados son iguales.

La instalación de Ansible se puede realizar a traves de pip, el manejador de paquetes de Python.
La configuración de Ansible se realiza a traves de la sintaxis YAML, en ficheros de configuración llamados Playbooks.

Las ventajas que hemos observado son:

+ Facilidad de uso, su instalación y el uso de lenguaje YAML es bastante directa.
+ Ansible permite la utilización de sudo.
+ Uso de SSH.
+ Su integración con los servicios cloud es muy buena.
+ Documentación extensa y uso extendido, nos da facilidades para buscar información y ayuda en caso de problemas.

Como se ha comentado anteriormente, hemos probado otros sistemas y no nos han parecido tan interesantes como este. Chef, por ejemplo, nos proporcionaba algunos problemas en su instalación. Además, la necesidad de utilizar muchos directorios y ficheros, cuando con Ansible se necesita mucho menos.

Para ejecutar el provisionamiento de la aplicación, hay que exportar una variable de entorno llamada `ANSIBLESSH` y que es la contraseña de nuestro usuario de SSH (en caso que estés utilizando tu propia máquina, cambia también el script [aprovisionamiento.sh](https://github.com/iblancasa/BackendSI2-IV/blob/master/travisscripts/aprovisionamiento.sh) para adecuarlo a tu máquina):

``export ANSIBLESSH='pass'``

Después ejecutaremos el script que ejecuta todo lo necesario para realizar el provisionamiento (también ejecutará el playbook de Ansible):_

``./travisscripts/aprovisionamiento.sh``


=======
### Tests

Los tests los podemos encontrar en la carpeta test, fichero test.js. Para los tests hemos usado las bibliotecas [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [Mockgoose](https://github.com/mccormicka/Mockgoose).


[Mocha](http://mochajs.org/) es un framework para NodeJS para hacer tests unitarios.

+ [Dispone de interfaces](http://mochajs.org/#interfaces) cercanas a los "Test Drive Development" y también "Behavior-Driven Development". También dispone de "Exports", "QUnit" y "Require". Nos permite utilizar cualquiera de estos, lo que lo hace más amigable para aquellos desarrolladores que prefieren un tipo u otro.
+ Tiene capacidad para presentar los resultados de los test de diferentes formas, en lo que se llaman [reporters](http://mochajs.org/#reporters)
+ [Permite el uso de distintas bibliotecas de aserciones](http://mochajs.org/#assertions) (ya que no dispone de un módulo propio). En nuestro caso, utilizaremos Chai.JS.

[Chai](http://chaijs.com/) es una biblioteca de aserciones (assertion library) para NodeJS y para el navegador. Nosotros la integramos con el framework Mocha. Chai nos ayuda a realizar aserciones contra nuestro código.
Es muy completo ya que, sin necesidad de plugins, tiene tres estilos con los que podemos realizar las aserciones, podemos optar por el estilo TDD (Test-driven development) o BDD(Behavior-Driven Development).

[Mockgoose](https://github.com/mccormicka/Mockgoose) es una biblioteca que nos permite comprobar los tests contra la base de datos sin tener que conectarnos a una base de datos actual, funciona como un wrapper e intercepta las llamadas a la base de datos de Mongoose.


Los tests se ejecutan con el comando `npm test`




=======
### Aislamiento de recursos: Docker

[![Docker](http://fotos.subefotos.com/4e7301538895cdc19b0eb5f2a3b60730o.png)](https://www.docker.com/)

[Ir al Docker del proyecto](https://registry.hub.docker.com/u/iblancasa/backendsi2-iv/)

#### Por qué usamos Docker

Usamos [Docker](https://www.docker.com/) sobre otras opciones de contendores, como [lxc](https://linuxcontainers.org/) por:

* Instalación sencilla y gran compatibilidad con muchos sistemas operativos.
* Nos da la posibilidad para trabajar con un Dockerfile en un repositorio de Github, permitiéndonos trabajar de manera muy cómoda.
* Gran seguridad: los usuarios que acceden a la aplicación solo pueden acceder al entorno creado en el contenedor
* Permite integración continua
* Los contendores pueden usarse para pruebas y producción
* Gran documentación
* Además en una herramienta que proporciona mucha información: descripción y contenido del Dockerfile, detalles de su "build" o los colaboradores. También puedes consultar otros contenedores y colaborar en su mejora
* Posibilidad de utilizar estos contenedores tanto en entornos de pruebas como de producción (algunas empresas cloud permiten subir los docker y utilizarlos de cara al público)


#### Cómo se ejecuta el contenedor

Para usar nuestro [Docker](https://github.com/iblancasa/BackendSI2-IV/blob/master/Dockerfile) primero hay que tener instalado Docker en nuestro ordenador:

```
apt-get update
apt-get install docker.io
```

Cuando queramos "arrancar" el servicio, ejecutaremos siendo superusuario:

`docker -d`

En caso de que falle y no arranque, avisándonos de un problema con ``/var/run/docker.pid``, tendremos que borrarlo ( ``rm /var/run/docker.pid`` ) y volver a ejecutar la orden anterior.


Y en otro terminal, ejecutaremos:

``docker pull iblancasa/backendsi2-iv``


Que descargará [nuestro Docker](https://registry.hub.docker.com/u/iblancasa/backendsi2-iv/). Una vez finalizada la descarga, podremos ejecutar la aplicación ejecutando:

`sudo docker run -i -t iblancasa/backendsi2-iv /bin/bash -c "ifconfig;nodejs /home"`


Si solo queremos acceder al terminal (para, por ejemplo, ejecutar los test unitarios):

`sudo docker run -i -t iblancasa/backendsi2-iv /bin/bash`


Para facilitar la instalación/ejecución, el repositorio cuenta con un [script de Bash](https://github.com/iblancasa/BackendSI2-IV/blob/master/installDocker.sh) que hay que ejecutar como superusuario y que arrancará el docker con la aplicación.

También será necesario que:
+ Añadas las claves de la API de Google+ al fichero [keys](https://github.com/iblancasa/BackendSI2-IV/blob/master/app/keys.js)
+ Exportes una variable de entorno llamada "DBHOST" en tu terminal. Esta variable de entorno contendrá la dirección a tu base de datos MongoDB.

```bash
export DBHOST='hostBD'
```




=======
### Herramientas utilizadas

+ NodeJS
+ NPM
+ Paquetes NodeJS:
	+ Test:
		+ Mocha
		+ Chai
		+ Supertest
	+ Software:
		+ Socket.io
		+ EJS
		+ Express
		+ Mongoose
		+ GoogleAPIS
+ OpenShift
+ Azure
+ Travis
+ Docker
+ Ansible
	+ Necesario instalar:
		+ Python
		+ sshpass



Repositorios que han ayudado:

+ [Easy Node Authentication](https://github.com/scotch-io/easy-node-authentication/)
+ [Start Bootstrap](https://github.com/IronSummitMedia/startbootstrap-agency)
+ [Siminta](https://github.com/r4nd1/template-cpanel-siminta)
