module.exports = function(mongoose) {
var ObjectId = mongoose.Schema.Types.ObjectId;

// Usuarios
var usuarioSchema = new mongoose.Schema({
        idUsuario       :           {type: String, required: true},
        fotoPerfil      :           String,
        fotoHeader      :           String,
        token           :           String,
        empresa         :           String,
        nombre          :           String,
        estado          :           String,
        administra      :           Boolean
});



//superAdministrador
var superAdminSchema = mongoose.Schema({
        id              :           ObjectId,
        token           :           String
});

//Empresas

var empresaSchema = mongoose.Schema({
      nombre: String,
      idEmpresa: ObjectId
});


//Notificaciones
var notificacionesSchema =  mongoose.Schema({
      texto: String,
      titulo: String,
      empresa:  {type: String, ref :'empresa'},
      idNotificacion: ObjectId,
      fecha: { type: Date, default: Date.now }
});

//mensajes
  var mensajesSchema = mongoose.Schema({
      idMensaje: ObjectId,
      fecha: { type: Date, default: Date.now },
      idEmisor: {type: ObjectId, ref:'usuarios'},
      idReceptor: ObjectId,
      idNotificacion: {type: ObjectId, ref:'notificaciones'}

});
  //Conversaciones
  var conversacionSchema =mongoose.Schema({
        idConversacion: ObjectId,
        idUsuario: {type:ObjectId, ref:'usuarios'},
        idEmpresa: {type:ObjectId,ref:'empresa'},
        estados : String,
        Respondido : Boolean
  });

// Modelos
var models = {
      usuarios : mongoose.model('usuarios', usuarioSchema),
      empresa : mongoose.model('empresa', empresaSchema),
      superAdministrador: mongoose.model('superAdministrador',superAdminSchema),
      notificaciones : mongoose.model('notificaciones', notificacionesSchema),
      mensajes : mongoose.model('mensajes',mensajesSchema),
      conversaciones: mongoose.model('conversaciones',conversacionSchema)
    };
    return models;
}
