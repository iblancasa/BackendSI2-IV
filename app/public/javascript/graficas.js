   // <script src="https://code.jquery.com/jquery-2.1.3.js"></script>
    //<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/1.0.1/Chart.js"> </script>
    

function crearGraficas () {
 $.getJSON( "https://api.github.com/repos/iblancasa/BackendSI2-IV/stats/contributors", function( data ) {
     
crearDatosCommits(data);
crearDatosSemanas(data);
 

});
    
}
      // Función que crea la gráfica de los commits.  
function crearDatosCommits (data) {        
var dataa = {
    labels: [data[1].author.login, data[2].author.login, data[3].author.login],
    datasets: [
            {
            label: "Commits",
            fillColor: "rgba(151,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [data[1].total, data[2].total, data[3].total]
            }
            ]
    };

    $( document ).ready(function() {        
        var ctx = $("#myChart").get(0).getContext("2d");
        var myBarChart = new Chart(ctx).Bar(dataa);
    });
    
}
    // Función que crea la gráfica de las semanas.
        
 function crearDatosSemanas (data) {   
     var aux=0;
     var j=0;
    var longitud=data[1].weeks.length;
 var Semanas=new Array(0, 0, 0);
    for (k=longitud-2; k>longitud-6; k--) { // Bucle para acumular la suma de la adición de los codigos de cada uno por cada semana.
        aux=0;
     for (i = 1; i<4; i++) { 
         aux+=data[i].weeks[k].a
     }
        Semanas[j]=aux;
        j++;
    }

     
var dataa2 = {
    labels: ["Hace 1 semana", "Hace 2 semanas", "Hace 3 semanas", "Hace 4 semanas"],
    datasets: [
            {
            label: "Adiciones",
            fillColor: "rgba(251,187,205,0.5)",
            strokeColor: "rgba(151,187,205,0.8)",
            highlightFill: "rgba(220,220,220,0.75)",
            highlightStroke: "rgba(220,220,220,1)",
            data: [Semanas[0], Semanas[1], Semanas[2],Semanas[3]]
            }
            ]
    };
    
      $( document ).ready(function() {        
        var ctx = $("#myChart2").get(0).getContext("2d");
        var myLineChart = new Chart(ctx).Line(dataa2);
    });
     
 }

        