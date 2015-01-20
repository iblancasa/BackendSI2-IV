var mongoose = require('mongoose');
var models = global.models;

exports.listaEmpresas = function listaEmpresas(callback){
 var queryEmpresa = global.model.empresa;
 queryEmpresa.findAll({}, function (err, empresas) {
 if(err){
  console.log(err);
}else{
   console.log(empresas);
   callback(empresas);

  }

 })

}

exports.crearEmpresa = function crearEmpresa(callback, nombreEmpresa) {
   
var nuevaEmpresa = new global.models.empresa({
    nombre: nombreEmpresa 
   });

   nuevaEmpresa.save(function(err, nuevaEmpresa) {
    if (err)
        return console.error(err);
    console.dir(nuevaEmpresa);
    callback(nuevaEmpresa,"");
      });
   
   
}
