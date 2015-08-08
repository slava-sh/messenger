var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

var usernames = {};
var idGenerator = 123;

io.on('connection', function(socket) {

  socket.on('add user', function(username) {
    console.log('add user', username);
    socket.username = username;
    usernames[username] = username;
    socket.broadcast.emit('user joined', { username: socket.username });
  });

  socket.on('REQUEST_MESSAGES', function(conversationId, sendResponse) {
    console.log('REQUEST_MESSAGES', conversationId);
    sendResponse({ messages: 'nope' });
  });

  socket.on('SEND_MESSAGE', function(conversationId, message) {
    console.log('SEND_MESSAGE', conversationId, message);
    message.id = idGenerator++;
    io.sockets.emit('RECEIVE_MESSAGE', {
      conversationId: conversationId,
      message: message,
    });
  });

  socket.on('disconnect', function () {
    console.log('disconnect', socket.username);
    if (usernames[socket.username]) {
      delete usernames[socket.username];
      socket.broadcast.emit('user left', { username: socket.username });
    }
  });
});
