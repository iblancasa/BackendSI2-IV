var mongoose = require('mongoose');
var models = global.models;



exports.conectarUsuario = function conectarUsuario(callback,idUsuario,token,empresa){
   var queryConectarUsuario= global.models.usuarios;
   var queryBuscarSuperAdmin=global.models.superAdministrador;
   
   queryBuscarSuperAdmin.find({},function (err, admins){
      if (admins==null) {
         var nuevoAdmin=global.models.superAdministrador({
            id: idUsuario,
            token: token
         })
         nuevoAdmin.save(function(err, nuevoAdmin) {
            if (err) return err;
            console.dir(nuevoAdmin);
            
         })
      }
      
      var queryBuscarEmpresa= global.models.empresa;
      queryBuscarEmpresa.find({'nombre' :empresa},function (err, empresas){
         if (!empresas) {
            console.log("Usuario no encontrado");
         }
         
      
   })
   })
}
   
   
   
   
   /*
 queryConectarUsuario.find({'idUsuario' : idUsuario}, function (err, usuarios) {
 if(err){
  console.log(err);
}else{
   console.log(usuarios);
   callback(usuarios,null);

  }

 })

}*/