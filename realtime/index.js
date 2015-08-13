var Primus = require('primus');
var amqp = require('amqp');

var port = process.env.PORT || 3000;

var primus = Primus.createServer({
  port: port,
  transformer: 'sockjs',
});

var sparks = {};

primus.on('connection', function(spark) {
  spark.on('data', function(data) {
    console.log(spark.id, data);
    if (data.type === 'REGISTER') {
      spark.user_id = data.payload.user_id;
      sparks[spark.user_id] = spark;
      console.log('active users:', Object.keys(sparks));
    }
  });
});

primus.on('disconnection', function(spark) {
  if (!sparks[spark.user_id]) {
    return;
  }
  console.log(spark.id, spark.user_id, 'disconnected');
  delete sparks[spark.user_id];
});

var queueClient = amqp.createConnection({ host: 'queue' });
queueClient.on('ready', function() {
  var queueOptions = { durable: true, autoDelete: false };
  queueClient.queue('notifications', queueOptions, function(queue) {
    queue.bind('#');
    queue.subscribe(function(notification) {
      var payload = notification.args[1];
      var user_ids = notification.args[0].map(String);
      user_ids.forEach(function(user_id) {
        var spark = sparks[user_id];
        if (!spark) {
          return;
        }
        spark.write(payload);
      });
      console.log('notified', user_ids, payload);
    });
  });
});
