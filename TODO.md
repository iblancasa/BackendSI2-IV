Cosas que hacer:

***
#Documentar:

* [X] Documentar integración continua
* [X] Por qué usamos Docker y cómo se ejecuta el contenedor
* [X] Ansible



****
#Operaciones mínimas:

* [ ] Conectar usuario. El usuario envía su ID, token de G+ y empresa a la que quiere conectar.
  * [ ] Comprobar si existe super admin
    * [ ] Si no hay, nombrar a ese usuario super admin (se guarda en la BD y se guarda el token)
    * [ ] Si lo hay:
      * [ ] Si este usuario es el super admin (se comprueba con la ID de la BD y se guarda el token)
      * [ ] Si no lo es, es un usuario normal:
        * [ ] Se comprueba si existe la empresa a la que intenta conectarse
          * [ ] Se comprueba si existe el usuario en la empresa.
            * [ ] Si existe, se comprueba si es administrador. Esto habrá que guardarlo en alguna variable de sesión o algo por que, en función de esto, se le va a devolver unas vistas u otras (por ejemplo, el sidebar cambiará)
            * [ ] Si no existe, **se concatena el ID de usuario con el nombre de la empresa, eliminando los espacios, y se crea el usuario**

* [ ] Nombrar administrador de empresa (vamos a poner lo justo). El superadministrador va a tener dos listas: en una se muestran todos los usuarios y en otra todas las empresas. Cuando seleccione una empresa y un usuario, le dará a un botón y ese usuario pasa a ser administrador.
* [ ] Crear empresa (interfaz)
* [ ] Enviar mensaje:
  * [ ] Comprobar si existe la conversación. Si no existe, se crea.
  * [ ] Se añade el mensaje a al conversación
* [ ] Obtener conversaciones. El administrador deberá poder obtener todas las conversaciones que tiene abiertas por usuarios
* [ ] Obtener mensajes de conversación: tanto administrador como usuario deben poder acceder a los últimos mensajes

**En función de si el usuario es usuario, administrador de empresa o superadmin, se van a mostrar una vista u otra.
El super admin, en esta versión básica, solo verá el "crear empresa" y "nombrar administrador de empresa".
El administrador verá una lista de conversaciones. Al pulsar sobre una, tendrá el chat con el usuario.
El usuario solo tendrá el chat.**



****
* [ ] Implementar todas las aplicaciones que se listan [aquí](https://github.com/iblancasa/BackendSI2-IV/labels/Funci%C3%B3n%20a%20implementar)
