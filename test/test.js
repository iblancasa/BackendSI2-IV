
/**Bibliotecas de test******************************************/
var mocha = require('mocha');//Framework Mocha
var chai = require('chai');//Biblioteca para Mocha, llamada Chai
var expect = chai.expect//Estilo de programción expect, dentro de Chai
var request = require('supertest');//Biblioteca para comprobar servidores web


/**Bibliotecas del proyecto*************************************/
var io = require('socket.io/node_modules/socket.io-client');
var express = require('express');


/**Variables auxiliares*****************************************/
var urlServidor = "http://localhost:3000";//URL donde se ejecuta el servidor

var options ={//Opctiones del servidor
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 ="Antonio";//Nombre del cliente 1
var chatUser2 = "Francisco";//Nombre del cliente 2
var testMessage = "Mensaje de prueba";//Mensaje de prueba



/**TEST*********************************************************/

/**Arrancamos el servidor**/
beforeEach(function (done) {
    server = require('../app').server;
    done();
});


/**Pruebas de servidor**/
describe('Pruebas de servidor online', function () {
  /**Comprobando que la web está online**/
  it('Comprobando que la página responde (200)', function (done) {
    request(urlServidor).get('/').expect(200).end(function(err, res){
      if (err) return done(err)
        done();
      });
    });


    /**Comprobamos que el servidor esté online, haciendo una petición y esperando respuesta**/
    it("Comprobar respuesta del chat", function (done) {
      var client = io.connect(urlServidor, options);//Conectamos al usuario

      client.once("connect", function () {//Esperamos la conexión
        client.once("echo", function (message) {//Esperamos respuesta
          expect(message).to.equal("conectado");//Comprobamos que la respuesta sea la esperada
          client.disconnect();//Desconectamos cliente
          done();//Test superado
        });
      });
    });
})



/**Pruebas de chat**/
describe('Pruebas del chat', function () {
  /**Cuando un usuario esté online, se comprueba que le avise de la llegada de nuevos usuarios**/
  it('Comprobar que se registre a los nuevos usuarios', function(done){
    var client1 = io.connect(urlServidor, options);//Conectamos al primer usuario

    client1.on('connect', function(data){//Esperamos la conexión
      client1.emit('add user', chatUser1);//Registramos al usuario

      var client2 = io.connect(urlServidor, options);//Conectamos al segundo usuario

      client1.on('user joined', function(usersName){//El primer usuario espera la conexión del segundo
        expect(usersName.username).to.equal(chatUser2);//Se comprueba que la respuesta sea el nick del segundo usuario
        client1.disconnect();//Desconectamos al primer usuario
        client2.disconnect();//Desconectamos al segundo usuario
        done();//Test superado
      });

      client2.on('connect', function(data){//Conectamos al segundo usuario
        client2.emit('add user', chatUser2);//Registramos al usuario
      });
    });
  });



  /**Se comprueba que los usuarios reciban los mensajes de los otros**/
  it('Comprobar que se reciban los mensajes', function(done){
    var client1 = io.connect(urlServidor, options);//Conectamos al primer usuario
    client1.on('connect', function(data){//Esperamos la conexión
      client1.emit('add user', chatUser1);//Registramos al usuario
      var client2 = io.connect(urlServidor, options);//Conectamos al segundo usuario

      client2.on('connect', function(data){//Conectamos al segundo usuario
          client1.on('new message', function(message){//El primer usuario espera mensajes
            expect(message.message).to.equal(testMessage);//Se comprueba que el mensaje sea el esperado
            client1.disconnect();//Desconectamos al primer usuario
            client2.disconnect();//Desconectamos al segundo usuario
            done();//Test superado
          });
          client2.emit('new message', testMessage);//El segundo usuario manda un mensaje
      });
    });
  });



  /**Se comprueba que, una vez que salga un usuario, el resto reciban que el usuario ha salido y su nombre**/
  it('Comprobar que funciona el aviso de que otro usuario está escribiendo', function(done){
    var client1 = io.connect(urlServidor, options);//Conectamos al primer usuario
    client1.on('connect', function(data){//Esperamos la conexión
      client1.emit('add user', chatUser1);//Registramos al usuario

      client1.on('typing',function(){//El primer usuario espera el aviso
        client1.on('stop typing',function(){//El primer usuario espera la desactivación del aviso
          client1.disconnect();//Desconectamos al primer usuario
          done();//Test superado
        });
      });

      var client2 = io.connect(urlServidor, options);//Conectamos al segundo usuario

      client2.on('connect', function(data){//Esperamos la conexión
        client2.emit('add user', chatUser2);//Registramos al segundo usuario
        client2.emit('typing');//Activamos el aviso
        client2.emit('stop typing');//Desactivamos el aviso
        client2.disconnect();//Desconectamos al segundo usuario
      });
    });
  });


  /**Se comprueba que, una vez que salga un usuario, el resto reciban que el usuario ha salido y su nombre**/
  it('Comprobar notificación de desconexión de un usuario', function(done){
    var client1 = io.connect(urlServidor, options);//Conectamos al primer usuario
    client1.on('connect', function(data){//Esperamos la conexión
      client1.emit('add user', chatUser1);//Registramos al usuario

      client1.on('user left',function(data){//El primer usuario espera que cualquier otro salga
        expect(data.username).to.equal(chatUser2);//Se comprueba que el usuario que ha salido es el que se esperaba
        client1.disconnect();//Desconectamos al primer usuario
        done();//Test superado
      });

      var client2 = io.connect(urlServidor, options);//Conectamos al segundo usuario

      client2.on('connect', function(data){//Esperamos la conexión
        client2.emit('add user', chatUser2);//Registramos al usuario
        client2.disconnect();//Desconectamos al segundo usuario
      });
    });
  });

});
