These commands are to be run from the root directory.

### Migrate
```sh
docker-compose run --rm web python manage.py makemigrations
docker-compose run --rm web python manage.py migrate
```
