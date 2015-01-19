![MochaJS](http://fotos.subefotos.com/5ac0b72e131caf800e80a90c9db5ac37o.png)

##Test unitarios##
Los test unitarios son pruebas que se realizan a los distintos módulos de una aplicación, con objeto de comprobar que los distintos elementos de la aplicación final funcionan por separado.

Existen varios frameworks para la realización de test unitarios para NodeJS pero, sin embargo, Mocha destaca frente a los demás.

+ [Dispone de interfaces](http://mochajs.org/#interfaces) cercanas a los "Test Drive Development" y también "Behavior-Driven Development". También dispone de "Exports", "QUnit" y "Require". Nos permite utilizar cualquiera de estos, lo que lo hace más amigable para aquellos desarrolladores que prefieren un tipo u otro.
+ Tiene capacidad para presentar los resultados de los test de diferentes formas, en lo que se llaman [reporters](http://mochajs.org/#reporters)
+ [Permite el uso de distintas bibliotecas de aserciones](http://mochajs.org/#assertions) (ya que no dispone de un módulo propio). En nuestro caso, utilizaremos Chai.JS.