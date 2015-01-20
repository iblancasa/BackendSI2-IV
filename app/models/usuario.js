var mongoose = require('mongoose');
var models = global.models;

exports.conectarUsuario = function conectarUsuario(callback,idUsuario){
 var queryConectarUsuario = global.model.usuarios;
 
 queryConectarUsuario.find({'idUsuario' : idUsuario}, function (err, usuarios) {
 if(err){
  console.log(err);
}else{
   console.log(usuarios);
   callback(usuarios,null);

  }

 })

}