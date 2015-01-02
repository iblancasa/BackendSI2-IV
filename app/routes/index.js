
/*
 * GET home page.
 */

var crypto = require('crypto')
  , google = require('./google')
  ;

exports.index = function(req, res){

  /*
   * Step 2: Create an anti-request forgery state token
   */
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