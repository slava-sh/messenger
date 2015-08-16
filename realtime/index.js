var Primus = require('primus');
var amqp = require('amqp');

var port = process.env.PORT || 3000;

var primus = Primus.createServer({
  port: port,
  transformer: 'sockjs',
});

var userSparks = {};

primus.on('connection', function(spark) {
  spark.on('data', function(data) {
    console.log(showSpark(spark), data);
    if (data.type === 'REGISTER') {
      spark.user_id = data.payload.user_id;
      if (userSparks[spark.user_id]) {
        userSparks[spark.user_id].push(spark);
      }
      else {
        userSparks[spark.user_id] = [spark];
      }
      console.log('sparks:', showUserSparks(userSparks));
    }
  });
});

primus.on('disconnection', function(spark) {
  if (!userSparks[spark.user_id]) {
    return;
  }
  console.log(showSpark(spark), 'disconnected');
  var remainingSparks = userSparks[spark.user_id].filter(function(userSpark) {
    return userSpark !== spark;
  });
  if (remainingSparks.length) {
    userSparks[spark.user_id] = remainingSparks;
  }
  else {
    delete userSparks[spark.user_id];
  }
  console.log('sparks:', showUserSparks(userSparks));
});

var queueClient = amqp.createConnection({
  host: 'queue',
  login: process.env.QUEUE_USER,
  password: process.env.QUEUE_PASSWORD,
});
queueClient.on('ready', function() {
  var queueOptions = { durable: true, autoDelete: false };
  queueClient.queue('notifications', queueOptions, function(queue) {
    queue.bind('#');
    queue.subscribe(function(notification) {
      var payload = notification.args[1];
      var user_ids = notification.args[0].map(String);
      user_ids.forEach(function(user_id) {
        if (userSparks[user_id]) {
          userSparks[user_id].forEach(function(spark) {
            spark.write(payload);
          });
        }
      });
      console.log('notified', user_ids, payload);
    });
  });
});

function showSpark(spark) {
  return (spark.user_id || '?') + '@' + spark.id.slice(0, 4);
}

function showUserSparks(userSparks) {
  return Object.keys(userSparks).reduce(function(arr, user_id) {
    return arr.concat(userSparks[user_id].map(function(spark) {
      return showSpark(spark);
    }));
  }, []).join(', ');
}
