
/**Bibliotecas de test******************************************/
var mocha = require('mocha');//Framework Mocha
var chai = require('chai');//Biblioteca para Mocha, llamada Chai
var expect = chai.expect//Estilo de programción expect, dentro de Chai
var request = require('supertest');//Biblioteca para comprobar servidores web


/**Bibliotecas del proyecto*************************************/
var io = require('socket.io/node_modules/socket.io-client');
var express = require('express');
var app = express();
/**Mongoose**/
var mongoose = require('mongoose');
var mockgoose = require('mockgoose');
mockgoose(mongoose);
//mongoose.connect('mongodb://localhost/test');
var models = require('../app/models/schema.js')(mongoose);

/**Variables auxiliares*****************************************/
var urlServidor = "http://localhost:8080";//URL donde se ejecuta el servidor

var options ={//Opctiones del servidor
  transports: ['websocket'],
  'force new connection': true
};



/**TEST*********************************************************/


/*
 * Arrancamos el servidor
 * @method beforeEach
 */
beforeEach(function (done) {
    server = require('../app/app.js').server;
    done();
});


/*
 * Pruebas de la Base de Datos
 */
describe('Pruebas de BDD', function () {
    /*
       * Insertamos un usuario, con unos campos conocidos, consultándolos después también
    */
    it('Insertar usuario', function(done) {
           var nuevoUsuario = new models.usuarios({
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
    
    it('Encontrar usuario',function(done) {
      // encuentra un usuario y comprueba que devuelve su nombre y su empresa.
  models.usuarios.findOne({ 'nombre': 'prueba'}, 'nombre empresa estado', function (err, person) {
  if (err) return handleError(err);
  expect(person.nombre).to.equal('prueba');
  expect(person.empresa).to.equal('IV');
  expect(person.estado).to.equal('Offline');
})
  done();
    });
    
    
    });
   


/*
 * Pruebas de servidor online
 */
describe('Pruebas de servidor online', function () {
  /*
     * Comprobando que la web está online
  */
  it('Comprobando que la página responde (200)', function (done) {
    request(urlServidor).get('/').expect(200).end(function(err, res){
      if (err) return done(err)
        done();
      });
    });
    
  /*
     * Comprobando una página erronea, para que devuelva un fallo
  */     
  it('La pagina ha de devolver error', function (done) {
      request(urlServidor).get('/abcde').expect(404).end(function(err, res){
      if (err) return done(err)
        done();
      });
  });  

  /*
     * Comprobando la ruta /
  */   
  it('La ruta / responde con texto plano', function(done){
    request(urlServidor)
    .get('/')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/html; charset=utf-8")
    .expect(200, done);
  })

  /*
     * Comprobando la plantilla CSS
  */ 
  it('Petición de CSS ', function(done){  
    request(urlServidor)
    .get('/stylesheets/estilo.css')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/css; charset=UTF-8")
    .expect(200, done);
  })

  /*
     * Comprobando la ruta /sobre   (debe fallar, todavía no esta hecha)
  */ 
  it('Petición de /sobre (debe fallar)', function(done){
    request(urlServidor)
    .get('/sobre')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/plain")
    .expect(404, done);		/** debe fallar, aún no está realizada**/ 
  })

  /*
     * Comprobando la ruta /contacto   (debe fallar, todavía no esta hecha)
  */  
  it('Petición de /contacto (debe fallar)', function(done){
    request(urlServidor)
    .get('/conctacto')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/plain")
    .expect(404, done);		/** debe fallar, aún no está realizada**/ 
  })

 
})


