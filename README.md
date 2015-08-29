### Start up
```sh
export COMPOSE_FILE=docker-compose/development.yml
export COMPOSE_PROJECT_NAME=chat
docker-compose build
docker-compose up -d
```

### Upload assets to S3
```sh
export COMPOSE_FILE=docker-compose/production.yml
docker-compose run --rm web python manage.py collectstatic --noinput
```
