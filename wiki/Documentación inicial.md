#Backend para sistema de comunicación SI2#
##Descripción##
Este proyecto pretende dar como resultado una aplicación servidor que permita la comunicación entre usuarios y entidades.  Además, se quiere que su desarrollo esté orientado a la nube.

El proyecto no tiene nombre ahora mismo por lo que nos referiremos a él como "Backend para sistema de comunicación SI2".



##Características##
+ La comunicación no se hará entre todos los usuarios. Solo se hará entre usuarios y entidades
+ Las conversaciones deben ser persistentes, es decir, deben de poder guardarse en el servidor
+ Deberá llevarse un registro de entidades, usuarios, relaciones entre estos, mensajes...
+ Se podrán enviar textos, ficheros de audios, imágenes...
+ Más adelante, se introducirán sistemas de cifrado como GPG u otro similar
+ Sería interesante añadir la certificación del envío de mensajes por parte de una tercera empresa (es decir, externa a nuestra aplicación)
![Diagrama1](http://i.imgur.com/VEV4Lw7.jpg)

*Figura 1. Cómo ven los usuarios la interacción con nuestro backend*


##Herramientas a utilizar##
En primer lugar, en cuanto al lenguaje de programación, se planteaban algunas alternativas como puede ser "[Erlang](http://www.erlang.org/)" (utilizado por la compañía [WhatsApp](https://www.whatsapp.com/)). Finalmente, debido al gran auge que está teniendo y el [grado de concurrencia que soporta](http://strongloop.com/strongblog/node-js-is-faster-than-java/) (entre otros) decidimos optar por NodeJS. Además, existe mucha documentación de este lenguaje, que se está extendiendo gracias a que su base es JavaScript (lenguaje muy utilizado por los desarrolladores web).

Como hay que gestionar persistencia (para guardar usuarios, entidades...) es necesario algún sistema de bases de datos. Ya que no será necesario establecer una fuerte dependencia entre unas tablas y otras, se requiere alta velocidad y escalabilidad y gestión de ficheros binarios (audio, imágen...) se quiere utilizar una base de datos [NoSQL](http://es.wikipedia.org/wiki/NoSQL). Dentro de esta categoría de bases de datos (que también se encuentran en pleno auge), hemos decidido utilizar [MongoDB](http://www.mongodb.org/). La razón de esta elección es que es uno de los sistemas gestores de bases de datos NoSQL más utilizado, lo que nos facilitará encontrar documentación.

Es claro que un proyecto de estas características, donde será probable que necesitemos escalar (sobre todo a ciertas horas) y que ṕrecisará de álta disponibilidad, debe hacerse en una plataforma cloud. Tras estudiar algunos, finalmente decidimos elegir [Heroku](https://www.heroku.com/). Esta empresa ofrece una versión gratuíta de su PaaS (Plataform as a Service) que nos brindará todos los elementos necesarios para el desarrollo de nuestra aplicación, además de abstraernos de la instalación de las herramientas, así como de su mantenimiento. Cabe mencionar entre sus características su integración con la plataforma GitHub y el soporte oficial que brindan de la biblioteca Node.js.

Finalmente, siendo un poco más concisos, vamos a ayudarnos de "[Socket.io](http://socket.io/)", una biblioteca JavaScript compatible con NodeJS y que nos brinda algunas opciones muy interesantes para la comunicación entre servidor y cliente. En su página web, se nos ofrece un [interesante tutorial sobre cómo realizar un pequeño chat](http://socket.io/), lo cual puede servir como base a nuestro sistema. Hay que tener en cuenta que, como los propios desarrolladores de la biblioteca dicen en su página web, la comunicación solo se puede establecer si los dos extremos de la comunicación utilizan la biblioteca (no vale utilizar Websockets ni similares). Es por ello que, para el desarrollo del cliente hemos tenido cuidado de que exista forma de conectarlo con, por ejemplo, dispositivos Android ([un ejemplo de una biblioteca que permite la comunicación utilizando Java](https://github.com/nkzawa/socket.io-client.java)). Anque esta última observación no es importante para el desarrollo de nuestra parte de nuestro proyecto, si es un punto a tener en cuenta por los trabajadores de SI2.



##Una primera aproximación##
![Diagrama2](http://i.imgur.com/vl39RsZ.jpg)

*Figura 2. La aplicación y los sistemas utilizados*

[Página web del proyecto](http://iblancasa.github.io/BackendSI2-IV/)


También nos hemos registrado en el [Certamen de Proyectos Libres de la OSL](http://osl.ugr.es/2014/09/26/premios-a-proyectos-libres-de-la-ugr/)
