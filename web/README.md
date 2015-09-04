These commands are to be run from the root directory.

### Migrate
```sh
docker-compose run --rm web manage.py makemigrations
docker-compose run --rm web manage.py migrate
```
