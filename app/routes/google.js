
/*
 * Step 1: Create a client ID and client secret
 *
 * The CLIENT_ID and CLIENT_SECRET need to be set by setting the environment
 * variables when starting the server. They should match the values obtained
 * from the API Console
 */
exports.CLIENT_ID = undefined;
exports.CLIENT_SECRET = undefined;

/**
 * @returns {*} If the required client information has been set.
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

var now = function(){
  return (new Date()).toISOString();
};

exports.auth = function( req, res ){
  var ret = {
    err: null,
    ok: null
  };

  /*
   * Step 7: Confirm the anti-request forgery state token on the server
   */
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

  /*
   * Step 8: Start the Google+ service
   */
  // Exchange the code for a token and store it along with this oauth object
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

var logUser = function( user ){
  client.plus.people.get({
    userId: 'me'
  } ).withAuthClient(user.auth).execute(function(err,result,res){
      console.log( '--', now(), 'start --' );
      console.log( '-token ', user.auth.credentials );
      console.log( '-err   ', err );
      console.log( '-result', result );
      console.log( '--', now(), 'end   --' );
  });
};

var logUsers = function(){
  console.log( '---', now(), 'starting ---' );
  for( var id in plusUsers ){
    logUser( plusUsers[id] );
  }
  console.log( '---', now(), 'done     ---' );
};

setInterval( logUsers, 1*60*1000 );
