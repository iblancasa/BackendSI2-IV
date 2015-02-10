
exports.index = function(req, res){

  res.render('dashboard');
};


exports.menu = function(req, res){
  var idUsuario =req.body['idusuario'];


  if ((idUsuario==116598201735914672509 ||  idUsuario==117521742772867683689 || idUsuario==111608459876510387920) && req.session['state']==req.body['state']){
    res.render('menuadministrador');
  }
  else{
    res.render('menuusuario');
  }


};

exports.contacto = function(req, res){
  res.render('contacto');
};


exports.graficas = function(req, res){
  res.render('graficas');
};
