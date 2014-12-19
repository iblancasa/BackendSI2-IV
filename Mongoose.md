## Mongoose

### ¿Qué es?
Mongoose es una libreria ODM (Object Data Modelling), manteniendo la flexibilidad de MongoDB. Tiene licencia MIT y también es mantenido por MongoDB, Inc.

### Conectores MongoDB
Mongoose nos proporciona un entorno ODM que envuelve al driver nativo de Nodejs.
El atractivo de Mongoose es poder definir nuestros propios esquemas para las colecciones, las cuales son enforced en la capa ODM.
Además, dispone de utilidades para simplificar los callback de nodejs.

## Empezando

###Instalación
Instalamos como siempre a traves de npm.

`npm install mongoose`

### Conectando
En nuestro fichero .js ponemos

``` 
var mongoose= require('mongoose');
mongoose.connect('mongodb:://localhost/test');

```
Cargamos el modulo de mongoose y conectamos a nuestra base de datos en localhost.


```
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexión:'));
db.once('open', function (callback) {
  // Conectado
});
```` 
Tenemos una conexion pendiente a la base de datos test en localhost. Usamos dos eventos, uno para error y otro para cuando la conexión
se establezca.
Cuando la conexión se establezca, nuestro callback será llamado.

### Esquemas

Con Mongoose, todo deriva de un esquema. Cada esquema se mapea a una colección de MongoDB y define la forma de los
documentos dentro de la colección.

```
var kittySchema = mongoose.Schema({
    name: String
})
```

Cada key en nuestro esquema define una propiedad en nuestro documentos que sera casteada al SchemaType asociado.
Por ejemplo, la key _name_ sera casteada a String.

