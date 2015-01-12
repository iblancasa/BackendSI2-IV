module.exports = function(mongoose) {
var ObjectId = mongoose.Schema.Types.ObjectId;
    
    // Usuarios
    
    var usuarioSchema = new mongoose.Schema({
        nombre      :           {type: String, required: true},
        empresa     :           String,
        idUsuario   :           ObjectId,
        estado      :           String
});
    //Administradores
var administradorSchema = mongoose.Schema({
    nombre: { type: String, required: true},
    empresa: String,
    idAdmin: ObjectId,
    password: { type: String, required: true}
    
  })

    //Empresas

  var empresaSchema = mongoose.Schema({
      nombre: String,
      idEmpresa: ObjectId
          
  } )
  //Notificaciones
  var notificacionesSchema =  mongoose.Schema({
      texto: String,
      titulo: String,
      empresa: String,
      idNotificacion: ObjectId,
      fecha: Date
  })
  //mensajes
  var mensajesSchema = mongoose.Schema({
      idMensaje: ObjectId,
      fecha: Date,
      idEmisor: ObjectId,
      idReceptor: ObjectId,
      idNotificacion: ObjectId
      
  })
  
    // Modelos
    var models = {
      usuarios : mongoose.model('usuarios', usuarioSchema),
      administrador : mongoose.model('administrador',administradorSchema),
      empresa : mongoose.model('empresa', empresaSchema),
      notificaciones : mongoose.model('notificaciones', notificacionesSchema)
    };
    return models;
}