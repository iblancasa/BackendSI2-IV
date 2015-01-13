var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');
var models = require('./schema.js')(mongoose);



var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function (callback) {

var nuevoUsuario = new models.usuarios({
        nombre: 'prueba',
        empresa:'IV',
        estado:'Offline'
});

 nuevoUsuario.save(function(err, nuevoUsuario) {
    if (err)
        return console.error(err);
    console.dir(nuevoUsuario);
      });

    var nuevoAdministrador = new models.administrador({
        nombre: 'pablo',
        empresa:'IV',
        password:'123'})


     nuevoAdministrador.save(function(err, nuevoAdministrador) {
    if (err)
        return console.error(err);
    console.dir(nuevoAdministrador);
      });

    });
