
//Bibliotecas de tests
var mocha = require('mocha');
var chai = require('chai');
var expect = chai.expect


//Bibliotecas del proyecto
var io = require('socket.io/node_modules/socket.io-client');
var express = require('express');


var urlServidor = "http://localhost:3000";

var client;
var clientName="israel";
var options;

//Hacemos andar al servidor
describe("echo", function () {
  var server,
  options ={
    transports: ['websocket'],
    'force new connection': true
  };

  beforeEach(function (done) {
    server = require('../app').server;
    done();
  });
});


//Comprobamos que nos hemos conectado bien, obteniendo una respuesta del servidor

it("echos", function (done) {
  client = io.connect(urlServidor, options);

  client.once("connect", function () {
    client.once("echo", function (message) {
      expect(message).to.equal("conectado");
      done();
    });
  });
});



it("test nuevo", function (done) {
  client.emit("add user",clientName);

  client.on('user joined',function(data){
    done();
    client.disconnect();
  });

  var client2 = io.connect(urlServidor, options);
  client2.emit('user joined',"clientName");

});
