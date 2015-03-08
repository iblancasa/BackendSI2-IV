// config/auth.js
var host       = process.env.OPENSHIFT_NODEJS_IP || process.env.IP;
var port     = process.env.OPENSHIFT_INTERNAL_PORT || process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080;
var service = 'http://'+host+':'+port;
var callFacebook = service+'/auth/facebook/callback';
var callTwitter = service+'/auth/twitter/callback';
var callGoogle = service+'/auth/google/callback';

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: process.env.facebookclientID, // your App ID
		'clientSecret' 	:  process.env.facebookclientSecret, // your App Secret
		'callbackURL' 	: callFacebook
	},

	'twitterAuth' : {
		'consumerKey' 		:  process.env.twitterconsumerKey,
		'consumerSecret' 	:  process.env.twitterconsumerSecret,
		'callbackURL' 		: callTwitter
	},

	'googleAuth' : {
		'clientID' 		:  process.env.googleclientID,
		'clientSecret' 	:  process.env.googleclientSecret,
		'callbackURL' 	: callGoogle
	}

};
