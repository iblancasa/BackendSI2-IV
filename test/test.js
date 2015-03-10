/**Bibliotecas de test******************************************/
var mocha = require('mocha');//Framework Mocha
var chai = require('chai');//Biblioteca para Mocha, llamada Chai
var expect = chai.expect//Estilo de programción expect, dentro de Chai
var request = require('supertest');//Biblioteca para comprobar servidores web
var sleep = require('sleep');

/**Variables auxiliares*****************************************/
var urlServidor = "http://localhost:8080";//URL donde se ejecuta el servidor



/**TEST*********************************************************/
/*
* Arrancamos el servidor
* @method beforeEach
*/
beforeEach(function (done) {
server = require('../app/server.js').server;
done();
});

sleep.sleep(5);//Esperar a que el servidor arranque

describe('Pruebas de servidor online', function () {
	it('Comprobando que el servidor está activo', function (done) {
		request(urlServidor).get('/').expect(200).end(function(err, res){
		if (err)
			return done(err)
		done();
		});
	});
})
