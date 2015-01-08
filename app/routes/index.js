


var crypto = require('crypto')
  , google = require('./google')
  ;

/**
 * Creación del token para hacer login
 * @method index
 * @param {} req
 * @param {} res
 * @return
 */
exports.index = function(req, res){

  var stateToken = crypto.randomBytes(48).toString('hex');
  var now = (new Date()).getTime();
  var data = {
    'clientId': google.CLIENT_ID,
    'scope':    google.SCOPE,
    'state':    stateToken,
    'now':      now
  };
  res.render('index', data);
  req.session['now'] = now;
  req.session['state'] = stateToken;
};
