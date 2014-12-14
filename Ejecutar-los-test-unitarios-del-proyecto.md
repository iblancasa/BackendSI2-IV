##Instalando las herramientas##

Para ejecutar los test unitarios del proyecto, es necesario instalar las siguientes dependencias:
+ Mocha
+ Chai
+ Supertest

Ejecutando

```shell
npm install -g mocha
npm install mocha
npm install chai
npm install supertest
```

En el momento que se escribe este artículo, estas herramientas no se han añadido a ``package.json`` para evitar que se instalen en el entorno de producción (donde no son necesarias).

Para facilitar la instalación, se ha creado [este script](https://github.com/iblancasa/BackendSI2-IV/blob/master/test/installTestSuite.sh), que instala todo automáticamente.

*Es importante decir que, previamente, se han tenido que instalar las herramientas existentes en ``package.json`` o la instalación fallará*.


##Ejecutando los test##
Cuando tengamos todas las herramientas instaladas, iremos al directorio raíz de nuestro proyecto y ejecutaremos ``mocha``.

[Ejecutando la actual batería de test](https://github.com/iblancasa/BackendSI2-IV/blob/master/test/test.js), se obtiene:

![Ejecutando test](http://fotos.subefotos.com/669c6096801ecd3071e5b6add10241c5o.jpg)