// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {

	'facebookAuth' : {
		'clientID' 		: process.env.facebookclientID, // your App ID
		'clientSecret' 	:  process.env.facebookclientSecret, // your App Secret
		'callbackURL' 	: 'http://localhost:8080/auth/facebook/callback'
	},

	'twitterAuth' : {
		'consumerKey' 		:  process.env.twitterconsumerKey,
		'consumerSecret' 	:  process.env.twitterconsumerSecret,
		'callbackURL' 		: 'http://localhost:8080/auth/twitter/callback'
	},

	'googleAuth' : {
		'clientID' 		:  process.env.googleclientID,
		'clientSecret' 	:  process.env.googleclientSecret,
		'callbackURL' 	: 'http://localhost:8080/auth/google/callback'
	}

};
