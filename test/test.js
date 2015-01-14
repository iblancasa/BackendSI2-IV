
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
mongoose.connect('mongodb://localhost/test');
var models = require('../app/models/schema.js')(mongoose);

/**Variables auxiliares*****************************************/
var urlServidor = "http://localhost:8080";//URL donde se ejecuta el servidor

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
describe('Pruebas de BDD', function () {
    it('Insertar usuario', function(done) {
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'Error de conexión:'));
        db.once('open', function (callback) {
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
             
             done();
        });
        
    })
    
    
    });
    });
    

describe('Pruebas de servidor online', function () {
  /**Comprobando que la web está online**/
  it('Comprobando que la página responde (200)', function (done) {
    request(urlServidor).get('/').expect(200).end(function(err, res){
      if (err) return done(err)
        done();
      });
    });
    
      
     it('La pagina ha de devolver error', function (done) {
    request(urlServidor).get('/abcde').expect(404).end(function(err, res){
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

/**Comprando la petición a la plantilla css**/ 
describe('GET /stylesheets/estilo.css', function(){
  it('Petición de CSS ', function(done){
    request(urlServidor)
    .get('/stylesheets/estilo.css')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/css; charset=UTF-8")
    .expect(200, done);
  })
})

/**Comprando la petición del apartado "sobre"**/ 
describe('GET /sobre', function(){
  it('Petición de /sobre', function(done){
    request(urlServidor)
    .get('/sobre')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/plain")
    .expect(404, done);  /** debe fallar, aún no está realizada**/ 
  })
})

/**Comprando la petición del apartado "contacto"**/ 
describe('GET /contacto', function(){
  it('Petición de /contacto', function(done){
    request(urlServidor)
    .get('/conctacto')
    .set('Accept', 'text/plain')
    .expect('Content-Type', "text/plain")
    .expect(404, done);  /** debe fallar, aún no está realizada**/ 
  })
})
