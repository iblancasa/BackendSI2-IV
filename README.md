#Backend server mensajería#
==============

##Proyecto para el desarrollo de backend de servicio de mensajería instantánea orientado a empresas.##

[![Build Status](https://travis-ci.org/iblancasa/BackendSI2-IV.svg?branch=master)](https://travis-ci.org/iblancasa/BackendSI2-IV)

####Asignatura "Infaestructuras Virtuales". Grado de Ingeniería Informática, Universidad de Granada####



[La aplicación desplegada y funcionando la puedes ver aquí](http://backendsi2-iblancasa.rhcloud.com/)
![Logo](http://fotos.subefotos.com/5fc10a3fee9186a0be88759dbcec02f3o.jpg)

=======
###¿Qué hay desplegado?###
Estamos trabajando en el backend.
Actualmente, está desplegado un sistema que solo permite darte de alta en nuestra aplicación utilizando la autentificación de Google+.


=======
Todavía estamos trabajando en ello, pero puedes visitar [la wiki del proyecto](https://github.com/iblancasa/BackendSI2-IV/wiki) o el [sitio web](http://iblancasa.github.io/BackendSI2-IV/)

También disponemos de una cuenta de Twitter asociada, [Twitter de BackendSI2-IV](https://twitter.com/BackendSI2), donde publicaremos los cambios en el repositorio y del blog.

[Dockerfile funcionando correctamente](https://github.com/iblancasa/BackendSI2-IV/blob/master/Dockerfile)



Integrantes del grupo:

+ [Israel Blancas Álvarez](https://github.com/iblancasa)
+ [José Cristóbal López Zafra](https://github.com/JCristobal)
+ [Rafael Ortiz Cáceres](https://github.com/rafaroc)
+ [Pablo Casado Arenas](https://github.com/ramako)



> [Si2.info](http://si2.info/) es una empresa, dirigida por Ángel Moreno, que se dedica principalmente a desarrollo móvil y de webs. Propone el siguiente proyecto: Se trataría de construir el backend de un sistema de mensajería para móviles (tipo WhatsApp / Telegram), exponiendo un API que nos permita autenticar al usuario, crear grupos, mensajes 1 a 1, gestionar imágenes y otros archivos de medios, enviar notificaciones push (Android/iOS/Amazon SNS)... El servidor de Telegram, vamos (creo, no estoy seguro, que solo los clientes son libres, y lo que estamos buscando es crear un producto específico para determinados clientes, necesitamos un servidor). Incluso pensamos en algún tipo de "garantía de entrega", un "mensaje certificado", algún conector con un sistema de terceros que pueda hacer de "notario".

> Podría ser tanto un proyecto de tipo nube creando un backend basado en alguna plataforma SaaS como un proyecto de tipo devops tomando cualquier sistema a medio desarrollar que necesitara una infraestructura virtual. El contacto de este proyecto es Ángel Moreno.

Extraído de [aquí](https://github.com/JJ/GII-2014/blob/master/practicas_propuestas.md)

[Este proyecto parcipa en el "Concurso Universitario de software libre de la UGR"](http://osl.ugr.es/2014/09/26/premios-a-proyectos-libres-de-la-ugr/)

![CUSLUGR](logo-cuslugr.png)


[Este proyecto parcipa en el "Concurso Universitario de software libre nacional"](http://www.concursosoftwarelibre.org/)

![CUSL](logo-cusl.png)


=======

###¿Por qué escoger OpenShift?

[![OpenShift](http://fotos.subefotos.com/57622f5e03b9cb3ed8dbbbfcc030e2d9o.jpg)](https://www.openshift.com/)


[OpenShift](https://www.openshift.com/) es un PaaS que nos ofrece multitud de herramientas y varios beneficios que nos ayudarán a integrarlo con nuestra aplicacción:

* Sencillez de uso

Permite un desarrollo muy intuitivo, permite trabajar sin obstáculos y con una interfaz sencilla.

* Integración con GitHub

Integración continua con esta plataforma, asegurando la portabilidad de las aplicaciones

* Eficiencia

Reduce el tiempo para construir y desplegar nuestra aplicación de forma sencilla: dispone de varias regiones para desplegarla, mejorando la latencia. Además escala a lo que necesita respondiendo al tráfico de la web.

* Variedad de lenguajes

Nos ofrece varios lenguajes de programación, entre ellos NodeJS

* Facilidad a la hora de trabajar con BD

Dispone de [MongoDB](https://developers.openshift.com/en/databases-mongodb.html) entre otras (MySQL, PostgreSQL o Amazon RDS).

* Dispone de SSL

* Hay una empresa de confianza detrás: [Red Hat](https://www.redhat.com/)

* Y es un servicio que podemos conseguir gratuito



Después de probar Heroku encontramos OpenShift más flexible e intuitivo que éste, y además permite el auto-escalado. 

En nuestro caso optamos por la cuenta "Free" de este PaaS, que nos da 512MB RAM y un 1GB de almacenamiento.

=======



###¿Por qué Azure?

[![Azure](http://blogs.itpro.es/eduardocloud/files/2014/12/entrada-sola.jpg)](http://azure.microsoft.com/es-es/)


Escogemos [Azure](http://azure.microsoft.com/es-es/) como nuestro SaaS por ser uno de los más extendidos, muy flexible y que siempre está operativo, sin caidas.  Además se a trabajado en clase con éste y disponemos de una cuenta (cedida por el profesor) que nos ofrece muchas garantías.

Tambíen se probaron otros como FIWARE, pero al dar problemas técnicos optamos por Azure.


Azure nos ofrece:

* Flexibilidad

Podremos crear cualquier SO, y dentro usar cualquier lenguaje, herramienta o framework.


* Alta disponibilidad 

Ofrece un servicio con una disponibilidad del 99.95%, soporte técnico y una supervisión puntual del estado del servicio.


* Escalabilidad

Se puede ampliar o reducir rápidamente para adaptarse a cualquier demanda, de modo que solo paga por lo que usa.

* Multitud de servicios para BD

Proporciona servicios de datos administrados de SQL y NoSQL o mucha compatiblidad con éstos. También se podrá sincronizar con directorios locales existentes.


En nuestro ejecutaremos la apliación en una máquina de Ubuntu 14.04 (ubicada al oeste de Europa) con 1 núcleo  y 1,75 GB de memoria (Máquina tipo A1)

Para crearla simplemente ejecutamos: `azure vm create backendsi2 b39f27a8b8c64d52b05eac6a62ebad85__Ubuntu_DAILY_BUILD-trusty-14_04_1-LTS-amd64-server-20150113.1-en-us-30GB backendsi2  (micontraseña) --location "West Europe" --ssh`

La arrancamos con `azure vm start backendsi2` y si queremos conectarnos mediante ssh: `ssh backendsi2@backendsi2.cloudapp.net`


=======


### Tests

Los tests los podemos encontrar en la carpeta test, fichero test.js. Para los tests hemos usado las librerias [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [Mockgoose](https://github.com/mccormicka/Mockgoose).


[Mocha](http://mochajs.org/) es un framework para nodejs para hacer tests unitarios.

+ [Dispone de interfaces](http://mochajs.org/#interfaces) cercanas a los "Test Drive Development" y también "Behavior-Driven Development". También dispone de "Exports", "QUnit" y "Require". Nos permite utilizar cualquiera de estos, lo que lo hace más amigable para aquellos desarrolladores que prefieren un tipo u otro.
+ Tiene capacidad para presentar los resultados de los test de diferentes formas, en lo que se llaman [reporters](http://mochajs.org/#reporters)
+ [Permite el uso de distintas bibliotecas de aserciones](http://mochajs.org/#assertions) (ya que no dispone de un módulo propio). En nuestro caso, utilizaremos Chai.JS.

[Chai](http://chaijs.com/) Es una biblioteca de aserciones (assertion library) para NodeJS y para el navegador. Nosotros la integramos con el framework Mocha. Chai nos ayuda a realizar aserciones contra nuestro código.
Es muy completo ya que, sin necesidad de plugins, tiene tres estilos con los que podemos realizar las aserciones, podemos optar por el estilo TDD (Test-driven development) o BDD(Behavior-Driven Development).

[Mockgoose](https://github.com/mccormicka/Mockgoose) es una libreria que nos permite comprobar los tests contra la base de datos sin tener que conectarnos a una base de datos actual, funciona como un wrapper e intercepta las llamadas a la base de datos de Mongoose.

Los tests se ejecutan con el comando `npm test`

Hemos realizado tests contra la base de datos:

nuevoUsuario: Variable que depende del modelo definido en schemas.js, en este caso de usuarios. Contiene los datos a insertar.
Función save, guarda los datos en la base de datos, tiene un callback y dentro de ese callback hacemos los tests, comprobamos que no hay ningun error y con la orden `expect(createdUser.empresa).to.equal('IV');` comprobamos que los datos se insertan.
```
it('Insertar usuario', function(done) {
	var nuevoUsuario = new global.models.usuarios({
		idUsuario:'abcdef',
		fotoPerfil:'http://127.0.0.1',
		fotoHeader:'http://127.0.0.1',
		token: 'zwyx',
		empresa:'IV',
		nombre: 'prueba',
		estado:'Offline'
	});
	nuevoUsuario.save(function (err, createdUser) {
		expect(err).to.not.be.true;
		expect(createdUser.empresa).to.equal('IV');
		expect(createdUser.nombre).to.equal('prueba');
		expect(createdUser.estado).to.equal('Offline');
		done();
		});
});
```
Test que comprueba que existen usuarios en la tabla.
Se usa la función findOne para encontrar a un usuario que tenga de nombre prueba,  como segundo parametro hay un callback en el que se nos devuelve los datos recogidos por la consulta, y comprobamos que efectivamente la consulta a la BDD se ha realizado correctamente.
```
it('Encontrar usuario',function(done) {
// encuentra un usuario y comprueba que devuelve su nombre y su empresa.
global.models.usuarios.findOne({ 'nombre': 'prueba'}, 'nombre empresa estado', function (err, person) {
		if (err) return handleError(err);
		expect(person.nombre).to.equal('prueba');
		expect(person.empresa).to.equal('IV');
		expect(person.estado).to.equal('Offline');
		})
	done();
	});
```
