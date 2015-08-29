# Messenger

## Components

- [client](web/client/client) - single-page app built with React and Redux
- [web](web) - backend server, uses Django, Celery
- [realtime](realtime) - WebSocket server for delivering notifications, Node.js and Primus
- queue - RabbitMQ
- worker - Celery queue worker
- db - PostgreSQL


aaa                         | bbb
---------------------------------------------------------------------------------------------------
[client](web/client/client) | single-page app built with React and Redux
[web](web)                  | backend server, uses Django, Celery
[realtime](realtime)        | WebSocket server for delivering notifications, Node.js and Primus
queue                       | RabbitMQ
worker                      | Celery queue worker
db                          | PostgreSQL

## Building

### Backend
```sh
export COMPOSE_FILE=docker-compose/development.yml
export COMPOSE_PROJECT_NAME=chat
docker-compose build
docker-compose up -d
docker-compose ps
```

### Frontend
See [client](web/client/client).
