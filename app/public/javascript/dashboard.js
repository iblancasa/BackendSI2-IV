$(document).ready(function () {

  $('#botoncontacto').click(function () {

   
    $("#contenido").remove();
    $("#sidebardashboard").remove();
    $("#operacion").remove();
    $("#graficas").remove();

    $.get( "/contacto", function(data) {
      $(".jumbotron").append(data);
    });
  });


    $('#botongraficas').click(function () {
    $("#graficas").remove();
    $("#contenido").remove();
    $("#sidebardashboard").remove();
    $("#operacion").remove();

    $.get( "/graficas", function(data) {
      $(".jumbotron").append(data);
    });
  });



  

});
