(function(global){
  'use strict';

  global.signInCallback = function( auth ){
    console.log( 'signInCallback:', auth );
    if (auth['code']) {

      // Hide the sign-in button now that the user is authorized, for example:
      $('#signinButton').attr('style', 'display: none');

      /*
       * Step 6: Send the authorization code to the server
       */
      var data = {
        'code': auth['code'],
        'state': global.clientStateToken
      };
      $.ajax({
        type: 'POST',
        url: '/google/auth',
        contentType: 'application/json; charset=utf-8',
        success: function(result) {
          // Handle or verify the server response if necessary.

          // Prints the list of people that the user has allowed the app to know
          // to the console.
          console.log(result);
        },
        processData: false,
        data: JSON.stringify(data)
      });
    } else if (auth['error']) {
      // There was an error.
      // Possible error codes:
      //   "access_denied" - User denied access to your app
      //   "immediate_failed" - Could not automatially log in the user
      console.log('There was an error: ' + auth['error']);
    }
  }

})(this);