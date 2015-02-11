var mongoose = require('mongoose');


exports.listaEmpresas = function listaEmpresas(callback){
 var queryEmpresa = global.models.empresa;
 queryEmpresa.find({}, function (err, empresas) {
   if(err){
     console.log(err);
   }else{
     console.log(empresas);
     global.respuesta=empresas;
     exports.empre=empresas;
     callback(empresas);
   }
 })

}

exports.crearEmpresa = function crearEmpresa(nombreEmpresa) {
  var nuevaEmpresa = new global.models.empresa({
    nombre: nombreEmpresa
   });
  nuevaEmpresa.save(function(err, nuevaEmpresa) {
    console.dir(nuevaEmpresa);
  });
};


/*
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


}*/
