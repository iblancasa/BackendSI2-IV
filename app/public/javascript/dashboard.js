$(document).ready(function () {

  $('#botoncontacto').click(function () {


    $("#contenido").remove();
    $("#sidebardashboard").remove();
    $("#operacion").remove();

    $.get( "/contacto", function(data) {
      $(".jumbotron").append(data);
    });
  });

});
