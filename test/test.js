
/**Bibliotecas de test******************************************/
var mocha = require('mocha');//Framework Mocha
var chai = require('chai');//Biblioteca para Mocha, llamada Chai
var expect = chai.expect//Estilo de programción expect, dentro de Chai
var request = require('supertest');//Biblioteca para comprobar servidores web


/**Bibliotecas del proyecto*************************************/
var io = require('socket.io/node_modules/socket.io-client');
var express = require('express');
var app = express();

/**Variables auxiliares*****************************************/
var urlServidor = "http://localhost:3001";//URL donde se ejecuta el servidor

var options ={//Opctiones del servidor
  transports: ['websocket'],
  'force new connection': true
};



/**TEST*********************************************************/

/**Arrancamos el servidor**/
beforeEach(function (done) {
    server = require('../app/app.js').server;
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
})


describe('GET /', function(){
  it('Responde con texto plano', function(done){
    request(urlServidor)
    .get('/')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(200, done);
  })
})
