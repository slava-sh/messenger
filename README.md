```sh
(cd client && npm install)
./client/node_modules/.bin/webpack --config client/webpack.config.coffee --progress --colors
```

```sh
export COMPOSE_FILE=docker-compose/development.yml
export COMPOSE_PROJECT_NAME=chat
docker-compose build
docker-compose up -d
```

```sh
docker-compose run --rm web python manage.py migrate
```

```sh
docker-compose run --rm web python manage.py collectstatic --noinput
```
