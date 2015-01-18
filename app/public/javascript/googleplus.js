(function(global){
  'use strict';

  /**
  * Función de retorno al hacer login
  * @method signInCallback
  * @param {} auth Autentificación
  * @return
  */
  global.signInCallback = function( auth ){
    console.log( 'signInCallback:', auth );
    if (auth['code']) {
      // Esconde el botón de inicio de sesión al autentificar
      $('#signinButton').attr('style', 'display: none');

      var data = {
        'code': auth['code'],
        'state': global.clientStateToken
      };
      $.ajax({
        type: 'POST',
        url: '/google/auth',
        contentType: 'application/json; charset=utf-8',
        /**
        * Petición al servidor para autentificación
        * @method success
        * @param {} result Resultado de la llamada
        * @return
        */
        success: function(result) {
          // Escribe usuarios
          console.log(result);
        },
        processData: false,
        data: JSON.stringify(data),
      });

      $("#contenido").remove();

      $.post( "/dashboard", function( data ) {
        $(".jumbotron").append(data);
      });

      $.post( "/menu", function( data ) {
        $(".jumbotron").append(data);
      });


    } else if (auth['error']) {
      console.log('Hubo un error: ' + auth['error']);
    }
  }

})(this);
