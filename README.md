```sh
export COMPOSE_FILE=docker-compose/development.yml
export COMPOSE_PROJECT_NAME=chat
docker-compose build
docker-compose up -d
```

```sh
docker-compose run --rm web python manage.py migrate
```
