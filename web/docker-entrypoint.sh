#!/bin/bash
set -e

case "$1" in
"serve")
    python manage.py collectstatic --noinput
    exec gunicorn project.wsgi --config gunicorn.conf.py
    ;;
"manage.py")
    exec python "$@"
    ;;
*)
    exec "$@"
    ;;
esac
