
//Bibliotecas de tests
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect


//Bibliotecas del proyecto

var io = require('socket.io/node_modules/socket.io-client');
var express = require('express');

var urlServidor = "http://localhost:3000";


var options ={
  transports: ['websocket'],
  'force new connection': true
};

var chatUser1 ="Antonio";
var chatUser2 = "Francisco";


/**Arrancamos el servidor**/
beforeEach(function (done) {
    server = require('../app').server;
    done();
});


/**Comprobamos que el servidor esté online, haciendo una petición y esperando respuesta**/
it("Comprobar servidor online", function (done) {
  var client = io.connect(urlServidor, options);//Conectamos al usuario

  client.once("connect", function () {//Esperamos la conexión
    client.once("echo", function (message) {//Esperamos respuesta
      expect(message).to.equal("conectado");//Comprobamos que la respuesta sea la esperada
      client.disconnect();//Desconectamos cliente
      done();//Test superado
    });
  });
});


/**Cuando un usuario esté online, se comprueba que le avise de la llegada de nuevos**/
it('Comprobamos que se registre a los nuevos usuarios', function(done){
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
