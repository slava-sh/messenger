process.env.NODE_ENV = process.env.ENVIRONMENT;

require('babel/register')({
  stage: 1,
});

require('./server');
