var http = require('http');
var sockjs = require('sockjs');
var amqp = require('amqp');

var port = process.env.PORT || 3000;
var sockOptions = {
  sockjs_url: 'http://cdn.jsdelivr.net/sockjs/1.0.1/sockjs.min.js',
};

var sockServer = sockjs.createServer(sockOptions);
sockServer.on('connection', handleConnection);

var server = http.createServer();
server.addListener('upgrade', endRequest);
sockServer.installHandlers(server);

console.log('Listening on port %d', port);
server.listen(port);

function handleConnection(conn) {
  conn.on('data', function(message) {
    console.log('got', arguments);
    conn.write(message);
  });
}

function endRequest(req, res) {
  res.end();
}

//var sockets = {};
//
//io.on('connection', function(socket) {
//
//  socket.on('register', function(id) {
//    // if (sockets[id]) {
//    //   return;
//    // }
//    socket.client_id = id;
//    sockets[id] = socket;
//    console.log('register', id);
//    console.log('active clients:', Object.keys(sockets));
//  });
//
//  socket.on('disconnect', function() {
//    if (!sockets[socket.client_id]) {
//      return;
//    }
//    console.log('disconnect', socket.client_id);
//    delete socket[socket.client_id];
//  });
//});
//
//var connection = amqp.createConnection({ host: 'queue' });
//connection.on('ready', function() {
//  var queueOptions = { durable: true, autoDelete: false };
//  connection.queue('notifications', queueOptions, function(queue) {
//    queue.bind('#');
//    queue.subscribe(function(payload) {
//      var client_ids = payload.args[0].map(String);
//      var notification = payload.args[1];
//      console.log(client_ids, notification);
//      client_ids.forEach(function(client_id) {
//        var socket = sockets[client_id];
//        if (socket) {
//          socket.send(notification);
//          console.log('sent to', client_id);
//        }
//      });
//    });
//  });
//});
