##CHAI##

###¿Qué es Chai?

Es una biblioteca de aserciones(Assertion Library) para nodejs y para el navegador. Chai nos ayuda a realizar aserciones contra nuestro código.

###Instalación

Se instala a través de npm

npm install chai 

Hay que añadirlo como dependencia al archivo package.json .

###Chai en profundidad.

Chai se ramifica en varios estilos:
El estilo assert.
Interfaz clásica.
Ejemplo:

```
var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string', 'foo is a string');
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea'); 
```


El estilo BDD.

Las aserciones se pueden encadenar.
A su vez, se ramifica en expect y  should.

Los mismos objetos que en assert, diferente manera de testearlos:
```
var expect = require('chai').expect
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
```
Diferente manera de  comprobarlos:
```
expect(foo).to.be.a('string');
expect(foo).to.equal('bar');
expect(foo).to.have.length(3);
expect(beverages).to.have.property('tea').with.length(3);
```
También se pueden incluir mensajes en las aserciones.


El primero es una aserción sin mensaje, el segundo es una aserción con mensaje.
```
var answer = 43;

// AssertionError: expected 43 to equal 42.
expect(answer).to.equal(42); 

// AssertionError: topic [answer]: expected 43 to equal 42.
expect(answer, 'topic [answer]').to.equal(42);
```
Should también permite encadenamientos, tiene problemas con IE, extiende el objeto al que queremos testear con una propiedad denominada "should" para comenzar a encadenar tests.
```
var should = require('chai').should() //actually call the the function
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

foo.should.be.a('string');
foo.should.equal('bar');
foo.should.have.length(3);
beverages.should.have.property('tea').with.length(3);
```
### Sintaxis expect

Como hemos comentado antes, la sintaxis expect nos permite encadenamientos. Es una sintaxis muy intuitiva que solo con leerla podemos saber que es lo que hace, pero aun así vamos a describir brevemente algunas de estas cadenas que podemos usar para nuestros tests.

**not**
```expect(prueba).to.not.equal('bar'); ```

Niega lo que viene después. Por lo tanto este test nos dice que prueba es diferente de bar.


**.a(tipo)**
Como encadenamiento o como aserción de que tipo tiene que ser el objeto.
Por ejemplo podemos comprobar que 'test' ha de ser de tipo string.

`expect('test').to.be.a('string');`

**.include(valor)**
Nos permite comprobar que _valor_ está en el array o en un substring.

`expect([1,2,3]).to.include(2);`

`expect('holamundo').to.contain('hola');`


**.true**
Se cerciora de que es true.

`expect(true).to.be.true;`

**.false**
Se cerciora de que es falso.

`expect(false).to.be.false;`

**.null**
Comprobación de que el objeto es null (o no null, segun los encadenamientos que pongamos).
`expect(undefined).not.to.be.null;`

**.empty**
Comprueba que la longitud es 0. Para arrays se comprueba la propiedad _lenght_. Para objetos, cuenta las keys que tiene.
`expect('').to.be.empty;`

**.equal(valor)**
Estrictamente igual (==)

`expect(42).to.equal(42);`

**.above(valor)**
Comprueba que el objeto es mayor que _valor_

`expect(10).to.be.above(5);`


**.below(valor)**
Se asegura que tiene que ser menor que _valor_

`expect(5).to.be.below(10);`

**.property(nombre, [valor])**

Asegura que el objeto tiene una propiedad llamada _nombre_ y opcionalmente se puede comprobar que esa propiedad tiene _valor_

`var obj = { foo: 'bar' };`

`expect(obj).to.have.property('foo');
`

##Funcionamiento local.

Tenemos que tener instalado mocha. Lo podemos instalar con: 

npm install -g mocha

(usamos la opción -g para instalarlo globalmente).

Ahora nos vamos a la carpeta de nuestro proyecto e instalamos chai

npm install chai

### Nuestro primer test
Creamos una carpeta lib y una carpeta test (por defecto mocha mira en la carpeta test para ejecutarlos).

![Imgur](http://i.imgur.com/5Sc9pOD.png)

Vamos a crear en lib un fichero llamado prueba.js y en test pruebaSpec.js

Abrimos el fichero pruebaSpec.js y añadimos las siguientes lineas

```
var expect = require("chai").expect;
var prueba = require("../lib/prueba.js");
 
describe("Prueba", function(){
 
});
```
Con la primera linea cargamos chai con sintaxis expect.
Con la segunda mediante nodejs cargamos el modulo prueba.js.
La tercera es parte de mocha.

Guardamos, nos vamos al directorio raiz de nuestro directorio y ejecutamos mocha.

![Imgur](http://i.imgur.com/8KyPJaI.png)

Nos dice que el test ha finalizado sin errores.

##Más tests.

Continuamos con el test añadiéndole algo más de sustancia.
Copiamos esto en la carpeta test, en nuestro fichero de tests.

``` 
var expect = require("chai").expect;
var prueba = require("../lib/prueba.js");

describe("Prueba", function(){
       it("Ha de devolver 4", function(){
           var resultados=prueba.suma();
           expect(resultados).to.equal(4);
           
    });
});
```

Todavía no tenemos nada en nuestro lib/prueba.js . Vamos a correr mocha a ver si conseguimos pasar el test.
![Imgur](http://i.imgur.com/ML2vATW.png)
Nos falla, basicamente porque no tenemos nada en prueba.js y el test espera un método llamado suma(). Vamos a añadirlo.

```
exports = module.exports = {};
 
exports.suma = function() {
 
    
} 
```
Añadimos el metodo suma sin que devuelva nada, y comprobamos si es capaz de pasar el test.

![Imgur](http://i.imgur.com/8t9cRt5.png)

Obviamente no lo pasa, puesto que el metodo no devuelve nada. Vamos a añadir que devuelve el resultado de sumar 2+2. Nuestro prueba.js en /libs quedaría así:

```
exports = module.exports = {};
 
exports.suma = function() {
 
    return 2+2
}
```

Y corremos el test de nuevo.

![Imgur](http://i.imgur.com/58HL2SD.png)

Por fin hemos conseguido pasar el test, con el mínimo de código necesario. No necesitamos escribir nada más en esa función.