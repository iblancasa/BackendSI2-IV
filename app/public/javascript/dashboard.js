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


$(document).ready(function () {

  $('#botongraficas').click(function () {


    $("#contenido").remove();
    $("#sidebardashboard").remove();
    $("#operacion").remove();

    $.get( "/graficas", function(data) {
      $(".jumbotron").append(data);
    });
  });

});
