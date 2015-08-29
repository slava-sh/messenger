# Messenger

![Architecture Overview](./docs/architecture.png)

The [client](web/client/client) is a single-page app built with React, Redux, ES6+, and webpack.

The backend is managed with Docker Compose. Containers:

name                        | description         | technology
:-------------------------- |:------------------- |:---------------------------
[web](web)                  | backend server      | Django
[realtime](realtime)        | notification server | Node.js, Primus
queue                       | message broker      | RabbitMQ
worker                      | queue worker        | Celery
db                          | database            | PostgreSQL

## Running

### Backend
```sh
docker-machine create chat
eval $(docker-machine env chat)

export COMPOSE_FILE=docker-compose/development.yml
export COMPOSE_PROJECT_NAME=chat
docker-compose build
docker-compose up -d
docker-compose ps
```

### Frontend
See [client](web/client/client).
