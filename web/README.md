These commands are to be run from the root directory.

### Migrate
```sh
docker-compose run --rm web python manage.py makemigrations
docker-compose run --rm web python manage.py migrate
```

### Upload assets to S3
```sh
export COMPOSE_FILE=docker-compose/production.yml
docker-compose run --rm web python manage.py collectstatic --noinput
```
