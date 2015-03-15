	<script src="https://cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.0/handlebars.js"></script>


        
        // Capa para saber con quien estamos hablando
        
     <script id="quien-template" type="text/x-handlebars-template">
         <p>{{user.name}} </p>
        </script>
 
        // Capa del chat

 <div style="width: 80%; height: 600px; overflow-y: scroll;">
 <script id="message-template" type="text/x-handlebars-template">
     <li class='message {{type}}'>
         {{urlImagen}} {{user.name}}
     </li>
</script>
     </div>

     

<input type="text" name="message" id="message" placeholder="Mensaje" maxlength="80" style="width:60%">
<button id="botonEnviar">Enviar</button>
<button id="botonEmoticonos">Emoticonos</button>


    
