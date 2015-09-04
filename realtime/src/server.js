import Primus from 'primus';
import amqp from 'amqp';

const ActionTypes = {
  REGISTER: 'REGISTER',
};

const DEBUG = process.env.ENVIRONMENT === 'development';

const userSparks = {};

function showSpark(spark) {
  return (spark.userId || '?') + '@' + spark.id.slice(0, 4);
}

function showUserSparks(sparks) {
  return Object.keys(sparks).reduce((arr, userId) => {
    return arr.concat(userSparks[userId].map(showSpark));
  }, []).join(', ');
}

function handleMessage(spark, data) {
  if (DEBUG) console.log(showSpark(spark), data);
  if (data.type === ActionTypes.REGISTER) {
    const { user_id: userId } = data.payload;
    spark.userId = userId;
    if (userSparks[userId]) {
      userSparks[userId].push(spark);
    } else {
      userSparks[userId] = [spark];
    }
    if (DEBUG) console.log('sparks:', showUserSparks(userSparks));
  }
}

function handleDisconnection(spark) {
  const { userId } = spark;
  if (!userSparks[userId]) {
    return;
  }
  if (DEBUG) console.log(showSpark(spark), 'disconnected');
  const remainingSparks = userSparks[userId].filter(x => x !== spark);
  if (remainingSparks.length === 0) {
    delete userSparks[userId];
  } else {
    userSparks[userId] = remainingSparks;
  }
  if (DEBUG) console.log('sparks:', showUserSparks(userSparks));
}

function handleNotification({ args: [userIds, payload] }) {
  for (const userId of userIds) {
    if (userSparks[userId]) {
      for (const spark of userSparks[userId]) {
        spark.write(payload);
      }
    }
  }
  if (DEBUG) console.log('notified', userIds, payload);
}

export function run() {
  const primus = Primus.createServer({
    port: process.env.PORT || 80,
    pathname: '/realtime',
    transformer: 'sockjs',
  });
  primus.on('connection', spark => {
    spark.on('data', data => handleMessage(spark, data));
    spark.on('end', () => handleDisconnection(spark));
  });

  const queueClient = amqp.createConnection({
    host: 'queue',
    login: process.env.QUEUE_USER,
    password: process.env.QUEUE_PASSWORD,
  });
  queueClient.on('ready', () => {
    queueClient.queue('notifications', {
      durable: true,
      autoDelete: false,
    }, queue => {
      queue.bind('#');
      queue.subscribe(handleNotification);
    });
  });
}
