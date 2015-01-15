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


/**
//Administradores
var administradorSchema = mongoose.Schema({
        idUsuario       :           {type: String, required: true},
        fotoperfil      :           String,
        fotoheader      :           String,
        token           :           String,
        empresa         :           String,
        nombre          :           String,
});**/

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
      idEmisor: {type: ObjectId, ref:'usuario'},
      idReceptor: ObjectId,
      idNotificacion: {type: ObjectId, ref:'notificaciones'}

});

// Modelos
var models = {
      usuarios : mongoose.model('usuarios', usuarioSchema),
      //administrador : mongoose.model('administrador',administradorSchema),
      empresa : mongoose.model('empresa', empresaSchema),
      notificaciones : mongoose.model('notificaciones', notificacionesSchema),
      mensajes : mongoose.model('mensajes',mensajesSchema)
    };
    return models;
}
