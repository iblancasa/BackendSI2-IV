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
