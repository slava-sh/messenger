All `docker-compose` commands are to be run from the root directory.

### Catching emails

In development mode emails get written to the log instead of being sent. To see
them, run
```sh
docker-compose logs web
```

### Creating migrations
```sh
docker-compose run --rm web manage.py makemigrations
docker-compose run --rm web manage.py migrate
```
