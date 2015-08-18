```sh
cd client
npm install
ENVIRONMENT=development npm run watch
ENVIRONMENT=production npm run build
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
