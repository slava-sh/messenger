#!/bin/bash
set -e

if [ "$1" = 'gunicorn-server' ]; then
    python manage.py collectstatic --noinput
    exec gunicorn project.wsgi --config gunicorn.conf.py "$@"
fi

exec "$@"
