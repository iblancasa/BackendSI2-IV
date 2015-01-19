## Como establecer conexión entre una BD de [Compose](https://app.compose.io/) con Node.js


Para hacerlo necesitas los driver de node-mongodb, que puedes instalar con `npm install mongodb`

Después ejecutaremos este archivo (lo podemos llamar node.js y en consola simplemente ejecutar `js node.js`), que hará basicamente un par de inserciones.

Comento algunos parámetros antes:
* en la línea 3 el parámetro para la conexión será la [Mongo URI](http://i.imgur.com/KVvnVoC.png), y usuario:usuario serán nombre de usuario y contraseña de un ["User" que tengamos en nuestra base de datos](http://i.imgur.com/4EllDfJ.png)
* en la línea 5 especificamos la BD

```
var mongodb = require('mongodb')
	, MongoClient = mongodb.MongoClient
MongoClient.connect('mongodb://usuario:usuario@dogen.mongohq.com:10096/pruebaDB', function(err, db) {
	// operate on the collection named "pruebaDB"
	var collection = db.collection('pruebaDB')

	// remove all records in collection (if any)
	console.log('removing documents...')
	collection.remove(function(err, result) {
		if (err) {
			return console.error(err)
		}
		console.log('collection cleared!')

		// insert two documents
		console.log('inserting new documents...')
		collection.insert([{name: 'tester'}, {name: 'coder'}], function(err,
		docs) {
			if (err) {
				return console.error(err)
			}
			console.log('just inserted ', docs.length, ' new documents!')
			collection.find({}).toArray(function(err, docs) {
				if (err) {
					return console.error(err)
				}
				docs.forEach(function(doc) {
				console.log('found document: ', doc)
				})
			})
		})
	})
})

```


Una vez ejecutado nos indica que está correctamente conectado e insertado:

![insertado](http://i.imgur.com/wF6mt1j.png)

y también lo podemos ver en [Compose](https://app.compose.io/):

![bdcompose](http://i.imgur.com/3vo3naP.png)

Tutoriales de interés:

https://docs.compose.io/languages/nodejs.html

y este muy básico: https://www.digitalocean.com/community/tutorials/how-to-connect-node-js-to-a-mongodb-database-on-a-vps