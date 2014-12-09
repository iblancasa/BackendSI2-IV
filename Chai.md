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


