#!/bin/bash
set -e

if [ "$ENVIRONMENT" = "development" ]; then
    # Fix VirtualBox bug
    sed -i 's/\(sendfile\s\+\)on;/\1off;/' /etc/nginx/nginx.conf
fi

exec "$@"
