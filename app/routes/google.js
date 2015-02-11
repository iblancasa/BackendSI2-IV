
exports.CLIENT_ID = undefined;
exports.CLIENT_SECRET = undefined;


/**
 * Comprobar si están los credenciales de Google
 * @method isInitialized
 * @return LogicalExpression  Verdadero si las dos claves están
 */
exports.isInitialized = function(){
  return exports.CLIENT_ID && exports.CLIENT_SECRET;
};

var REDIRECT_URL = 'postmessage';

exports.SCOPE = 'https://www.googleapis.com/auth/plus.login';

var googleapis = require('googleapis');

var plusUsers = {};

var client;
googleapis
  .discover( 'plus', 'v1' )
  .execute( function(err,data){
    client = data;
  });

/**
 * Hora actual
 * @method now
 * @return CallExpression Hora Actual
 */
var now = function(){
  return (new Date()).toISOString();
};

/**
 * Autentificación del usuario en Google
 * @method auth
 * @param {} req  Petición
 * @param {} res  Respuesta
 * @return
 */
exports.auth = function( req, res ){
  var ret = {
    err: null,
    ok: null
  };


  var sessionStateToken = req.session['state'];
  var clientStateToken  = req.body['state'];
  console.log( 'csrf', sessionStateToken, clientStateToken );
  if( !sessionStateToken ||
      !clientStateToken ||
      sessionStateToken !== clientStateToken ){
    ret.err = {
      msg: 'state token does not match'
    };
    res.send(ret);
    return;
  }


  var oauth2 = new googleapis.OAuth2Client( exports.CLIENT_ID,
                                            exports.CLIENT_SECRET,
                                            REDIRECT_URL );
  oauth2.getToken( req.body.code, function(err, tokens){



    oauth2.credentials = tokens;
    console.log( now(), err, tokens );
    client.plus.people.get({
      userId: 'me'
    })
    .withAuthClient(oauth2)
    .execute(function(err,result){
      ret.err = err;
      ret.ok = result;
      res.send(ret);
      if( result ){
        var key = result.id;

        var user = {
          auth: oauth2,
          plusInfo: result
        };
        plusUsers[key] = user;
      }
    });
  });

};
