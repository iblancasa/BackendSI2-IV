## Mongoose
[Esquemas](#esquemas)

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
mongoose.connect('mongodb://localhost/test');

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

### Tipos de esquemas.

Cada key en nuestro esquema definirá una propiedad de nuestros documentos. También se pueden anidar keys.
```
var blogSchema = new Schema({
  title:  String,
  author: String,
  body:   String,
  comments: [{ body: String, date: Date }],
  date: { type: Date, default: Date.now },
  hidden: Boolean,
  meta: {
    votes: Number,
    favs:  Number
  }
});
```
Los tipos de esquemas en Mongoose son:
+ String
+ Number
+ Date
+ Buffer
+ Boolean
+ Mixed
+ ObjectId
+ Array

### Creando un modelo.
Para usar nuestro esquema, necesitamos convertirlo en un Modelo con el que podamos trabajar.
Los modelos son clases con las que construimos documentos.
Para hacerlo, necesitamos pasarlo a mongoose.model(modelname,schema);

Ejemplo:
`
var kitten = mongoose.model('kitten',kittySchema);
`

En este caso, cada documento sera un kitten con propiedades y comportamientos definidos
en nuestro esquema.
### Metodos de instancia
Las instancia de Models son documentos. Los documentos tienen ya sus propios metodos. Podemos definir nuestros propios metodos de instancia.

Podemos crear un documento que representa un gato.
```
var silence = new Kitten({ name: 'Silence' })
console.log(silence.name) // 'Silence'
```
Los gatos pueden maullar, asi que añadamos la funcionalidad de "hablar".

```
// NOTE:Los metodos han de ser annadidos al esquema antes de compilarlo con mongoose.model()
kittySchema.methods.speak = function () {
  var greeting = this.name
    ? "Meow name is " + this.name
    : "I don't have a name"
  console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema)
```

Ahora los gatos que creemos tendran la propiedad "name" y ademas podran "hablar".
```
var fluffy = new Kitten({ name: 'fluffy' });
fluffy.speak() // "Meow name is fluffy"
```

Pero todavia no hemos guardado nada en MongoDB. Cada documento se puede
guardar mediante su metodo save.

```
fluffy.save(function (err, fluffy) {
  if (err) return console.error(err);
  fluffy.speak();
});

```
Asi guardaremos a fluffy.

Podemos acceder a todos los documentos guardados mediante nuestro modelo:
```
Kitten.find(function (err, kittens) {
  if (err) return console.error(err);
  console.log(kittens)
})
```
Con esto mostramos en consola todos nuestros kittens.

// Mas sobre esquemas y documentos, como añadir metodos propios a las instancias.//
```
var Schema = mongoose.Schema;
var animalSchema= new Schema({ name: String, type: String });
animalSchema.methods.findSimilarTypes = function (cb) {
  return this.model('Animal').find({ type: this.type }, cb);
}
```

Con esto hemos conseguido que nuestras instancias que deriven de animalSchema tengan el método findSimilarTypes.

```
var Animal = mongoose.model('Animal', animalSchema);
var dog = new Animal({ type: 'dog' });

dog.findSimilarTypes(function (err, dogs) {
  console.log(dogs); // woof
});
```

### Métodos estáticos

```
// Asignamos una función al objeto "statics" de nuestro animalSchema 
animalSchema.statics.findByName = function (name, cb) {
  this.find({ name: new RegExp(name, 'i') }, cb);
}

var Animal = mongoose.model('Animal', animalSchema);
Animal.findByName('fido', function (err, animals) {
  console.log(animals);
});
```
### Índices

MongoDB soporta índices secondarios. Con Mongoose, definimos estos índices dentro de nuestro esquema a nivel de path o de esquema. Es necesario cuando se crean "compound indexes".

```
var animalSchema = new Schema({
  name: String,
  type: String,
  tags: { type: [String], index: true } // field level
});

animalSchema.index({ name: 1, type: -1 }); // schema level
```

En producción se recomienda desactivar autoIndex debido al impacto en rendimiento que provoca tenerlo activado.

```
animalSchema.set('autoIndex', false);
```