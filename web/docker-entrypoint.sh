#!/bin/bash
set -e

case "$1" in
"web")
    python manage.py collectstatic --noinput
    exec gunicorn project.wsgi --config gunicorn.conf.py
    ;;
"worker")
    exec celery -A project worker -l info
    ;;
"manage.py")
    exec python "$@"
    ;;
*)
    exec "$@"
    ;;
esac
