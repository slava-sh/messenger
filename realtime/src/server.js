import Primus from 'primus';
import amqp from 'amqp';

const DEBUG = process.env.ENVIRONMENT === 'development';

const userSparks = {};

function showSpark(spark) {
  return (spark.user_id || '?') + '@' + spark.id.slice(0, 4);
}

function showUserSparks(userSparks) {
  return Object.keys(userSparks).reduce((arr, user_id) => {
    return arr.concat(userSparks[user_id].map(showSpark));
  }, []).join(', ');
}

function handleMessage(spark, data) {
  if (DEBUG) console.log(showSpark(spark), data);
  if (data.type === 'REGISTER') {
    const { user_id } = data.payload;
    spark.user_id = user_id;
    if (userSparks[user_id]) {
      userSparks[user_id].push(spark);
    }
    else {
      userSparks[user_id] = [spark];
    }
    if (DEBUG) console.log('sparks:', showUserSparks(userSparks));
  }
}

function handleDisconnection(spark) {
  const { user_id } = spark;
  if (!userSparks[user_id]) {
    return;
  }
  if (DEBUG) console.log(showSpark(spark), 'disconnected');
  const remainingSparks = userSparks[user_id].filter(x => x !== spark);
  if (remainingSparks.length === 0) {
    delete userSparks[user_id];
  }
  else {
    userSparks[user_id] = remainingSparks;
  }
  if (DEBUG) console.log('sparks:', showUserSparks(userSparks));
}

function handleNotification({ args: [user_ids, payload] }) {
  user_ids = user_ids.map(String);
  user_ids.forEach(user_id => {
    if (userSparks[user_id]) {
      userSparks[user_id].forEach(spark => spark.write(payload));
    }
  });
  if (DEBUG) console.log('notified', user_ids, payload);
}

function run() {
  const primus = Primus.createServer({
    port: process.env.PORT || 3000,
    transformer: 'sockjs',
  });
  primus.on('connection', function(spark) {
    spark.on('data', data => handleMessage(spark, data));
    spark.on('end', () => handleDisconnection(spark));
  });

  const queueClient = amqp.createConnection({
    host: 'queue',
    login: process.env.QUEUE_USER,
    password: process.env.QUEUE_PASSWORD,
  });
  queueClient.on('ready', function() {
    const queueOptions = { durable: true, autoDelete: false };
    queueClient.queue('notifications', queueOptions, function(queue) {
      queue.bind('#');
      queue.subscribe(handleNotification);
    });
  });
}
