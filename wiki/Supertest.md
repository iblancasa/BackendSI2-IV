#Supertest#

Supertest es una biblioteca que se puede integrar con Mocha. El objetivo de esta biblioteca es testear servidores web lanzados con NodeJS.

Un ejemplo de test es el siguiente:
```javascript
var request = require('supertest') //Se carga supertest
  , express = require('express'); //Se carga el framework express

var app = express();

app.get('/user', function(req, res){//Se hace una petición a la ruta "/user"
  res.send(200, { name: 'tobi' }); //Se envía esa petición
});

request(app)
  .get('/user')
  .expect('Content-Type', /json/)//Se espera un json
  .expect('Content-Length', '20')
  .expect(200) //Se espera respuesta 200
  .end(function(err, res){
    if (err) throw err; //Si hay error, el test falla
  });
```

La sintaxis es clara y la semántica fácil de entender. Nos permite, simulando ser navegadores, hacer peticiones al servidor y comprobar cómo responde el servidor en distintos casos (comprobando, por ejemplo, el tipo de ficheros que nos devuelve el servidor, como respuesta a una petición).



[Enlace al repositorio oficial de supertest](https://github.com/tj/supertest)