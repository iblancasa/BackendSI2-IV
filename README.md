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

### Tests

Los tests los podemos encontrar en la carpeta test, fichero test.js. Para los tests hemos usado las librerias [Mocha](http://mochajs.org/), [Chai](http://chaijs.com/), [Mockgoose](https://github.com/mccormicka/Mockgoose).


[Mocha](http://mochajs.org/) es un framework para nodejs para hacer tests unitarios
.+ [Dispone de interfaces](http://mochajs.org/#interfaces) cercanas a los "Test Drive Development" y también "Behavior-Driven Development". También dispone de "Exports", "QUnit" y "Require". Nos permite utilizar cualquiera de estos, lo que lo hace más amigable para aquellos desarrolladores que prefieren un tipo u otro.
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
