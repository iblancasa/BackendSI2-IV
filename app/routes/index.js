
var crypto = require('crypto')
  , google = require('./google')
  , async = require('async')
  //, mongoose = require('mongoose')
  , empresa = require('../models/empresa');



function renderizar(empresas,stateToken,now,res,req){

  var resultado=[];
  console.log(empresas);
  var a=0;
  for(var i in global.lista){
    resultado[a]=empresas[i].nombre;
    console.log(empresas[i].nombre);
    a++;
  }



  var data = {
    'clientId': google.CLIENT_ID,
    'scope':    google.SCOPE,
    'state':    stateToken,
    'now':      now,
    'ip': global.ip,
    'empresas': resultado
  };

  res.render('index', data);
  req.session['now'] = now;
  req.session['state'] = stateToken;
}





/**
 * Creación del token para hacer login
 * @method index
 * @param {} req
 * @param {} res
 * @return
 */
exports.index = function(req, res){
  global.mongoose.connection;
  var stateToken = crypto.randomBytes(48).toString('hex');
  var now = (new Date()).getTime();

  var variable;

  var queryEmpresa = global.models.empresa;




  async.series([
      function(){
        queryEmpresa.find({}, function (err, empresas) {
          if(err){
            console.log(err);
            global.mongoose.connection.close();
          }else{
            console.log(empresas);
            renderizar(empresas,stateToken,now,res,req);
            global.mongoose.connection.close();
          }

        });
      }
    ]);






/*
  empresa.listaEmpresas(


    function (err, empresas){

      console.log(global.respuesta);




    for(var i in global.respuesta){
      console.log(global.respuesta[i].nombre);
    }



    var data = {
      'clientId': google.CLIENT_ID,
      'scope':    google.SCOPE,
      'state':    stateToken,
      'now':      now,
      'ip': global.ip,
      'empresas': global.respuesta
    };

    res.render('index', data);
    req.session['now'] = now;
    req.session['state'] = stateToken;

  });

*/
};
