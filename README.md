# Messenger

![Architecture Overview](./docs/architecture.png)

The [client](web/client/client) is a single-page app built with React, Redux,
ES6+, and webpack.

The backend is managed with Docker Compose. Containers:

| name                 | description                         | technology            |
|:-------------------- |:----------------------------------- |:--------------------- |
| [nginx](nginx)       | front-end proxy, static file server | Nginx                 |
| [web](web)           | API server                          | Django REST framework |
| [realtime](realtime) | notification server                 | Node.js, Primus       |
| queue                | message broker                      | RabbitMQ              |
| worker               | queue worker                        | Celery                |
| db                   | database                            | PostgreSQL            |

## Running

1. Create a Docker machine
   ```sh
   docker-machine create messenger.local --driver virtualbox
   eval $(docker-machine env messenger.local)
   ```

2. (Optional) Add `messenger.local` to your `hosts` file:
   ```sh
   echo "$(docker-machine ip messenger.local) messenger.local" | sudo tee -a /etc/hosts
   ```

3. Set up Docker Composer
   ```sh
   export COMPOSE_PROJECT_NAME=messenger COMPOSE_FILE=docker-compose/development.yml
   ```

4. Build and start containers
   ```sh
   make deploy
   ```
