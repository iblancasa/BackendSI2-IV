// Setup basic express server
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;




server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

// Routing
app.use(express.static(__dirname + '/public'));

// Chatroom

// usernames which are currently connected to the chat
var usernames = {};
var numUsers = 0;
var clients ={}




io.on('connection', function (socket) {
  var addedUser = false

  socket.emit('echo','conectado');

  // when the client emits 'new message', this listens and executes
  socket.on('new message', function (data) {
    // we tell the client to execute 'new message'

  for(sock in clients){
      if(sock!=socket.username){
        clients[sock].emit('new message', {
          username: socket.username,
          message: data
        });
      }
    }
  });




  // when the client emits 'add user', this listens and executes
  socket.on('add user', function (username) {

    // we store the username in the socket session for this client
    socket.username = username;
    // add the client's username to the global list
    usernames[username] = username;
    clients[username] = socket;
    ++numUsers;
    addedUser = true;


    socket.emit('login', {
      numUsers: numUsers
    });

    // echo globally (all clients) that a person has connected

    for(sock in clients){
      if(sock!=socket.username){
        clients[sock].emit('user joined', {
          username: socket.username,
          numUsers: numUsers
        });
      }
    }



  });

  // when the client emits 'typing', we broadcast it to others
  socket.on('typing', function () {

    for(sock in clients){
      if(sock!=socket.username){
        clients[sock].emit('typing', {
          username: socket.username
        });
      }
    }

  });

  // when the client emits 'stop typing', we broadcast it to others
  socket.on('stop typing', function () {
    for(sock in clients){
      if(sock!=socket.username){
        clients[sock].emit('stop typing', {
          username: socket.username
        });
      }
    }


  });

  // when the user disconnects.. perform this
  socket.on('disconnect', function () {
    // remove the username from global usernames list
    if (addedUser) {
      delete usernames[socket.username];
      delete clients[socket.username];
      --numUsers;

      // echo globally that this client has left
      for(sock in clients){
          clients[sock].emit('user left', {
            username: socket.username,
            numUsers: numUsers
          });
      }

    }
  });
});
