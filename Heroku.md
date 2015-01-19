#¿Por qué Heroku?#
Para la elección del PaaS, es necesario tener en cuenta los requisitos del sistema a desarrollar y las herramientas que hemos estimado necesarias:
+ Integración continua con Git
+ Soporte para MongoDB
+ Soporte para NodeJS
+ Gratuidad
+ Que la integración con el sistema no sea excesiva


[![Heroku](http://fotos.subefotos.com/4ac2316654531143389c1badd7530348o.jpg)](http://heroku.com)

###¿Qué ofrece Heroku?###

+ Soporte para Git con integración continua
+ Soporte para MongoDB
+ La versión gratuita nos ofrece 512MB de RAM y 1GB de SWAP
+ La empresa que está detrás es [SalesForce](http://www.salesforce.com/es/)
+ Dispone de NodeJS
+ Hay muchos Addons
+ Soporte a través de tickets
+ Mucha documentación
+ Dispone de SSL
+ [Más información](https://devcenter.heroku.com/articles/limits)

Comentarios:
	ofrece todo lo que nuestro sistema necesita.


##Otras posibilidades##
[![Google App Engine](http://fotos.subefotos.com/c96bbe942013cd33869ddd616772d5f1o.jpg)](https://appengine.google.com/)
###¿Qué ofrece Google App Engine?###
+ Java, Go, PHP y PHP: no dispone de NodeJS
+ Distintos métodos de almacenamiento (propios)
+ Alta integración entre el PaaS y la aplícación
+ Posibilidad de integrar servicios varios de Google

Comentarios:
	dos de nuestros integrantes realizaron en el segundo cuatrimestre del curso 2013-2014 [una aplicación utilizando este PaaS](http://opencloudcalendar.appspot.com/) y cuentan que tuvieron muchos problemas con el mismo.




[![OpenShift](http://fotos.subefotos.com/57622f5e03b9cb3ed8dbbbfcc030e2d9o.jpg)](https://www.openshift.com/)

###¿Qué ofrece OpenShift?###
+ [Dispone de NodeJS](https://developers.openshift.com/en/node-js-overview.html)
+ [Dispone de MongoDB](https://developers.openshift.com/en/databases-mongodb.html)
+ Base de datos de 1GB (por año)
+ Dispone de SSL
+ La empresa que está detrás es [Red Hat](https://www.redhat.com/)
+ [Más info](https://www.openshift.com/products/pricing)

Comentarios:
	hay menos información respecto a qué ofrece si lo comparamos con Heroku. Según diversos foros, es menos flexible que otros sistemas



Debido a todas las características anteriormente mencionadas, decidimos desplegar nuestra aplicación sobre Heroku.