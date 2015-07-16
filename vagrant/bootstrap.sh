#!/bin/bash -ex
export DEBIAN_FRONTEND=noninteractive

service gunicorn-chat stop || true

apt-get update -qq
apt-get install -qq -y -f nginx python-virtualenv postgresql libpq-dev python3-dev
apt-get clean -qq

sed -i 's/\(local\s\+all\s\+all\s\+\)peer/\1md5/' /etc/postgresql/*/main/pg_hba.conf
service postgresql restart
cat << EOF | su - postgres -c psql
CREATE USER chat WITH PASSWORD 'chat';
CREATE DATABASE chat WITH
    OWNER=chat
    LC_COLLATE='en_US.UTF-8'
    LC_CTYPE='en_US.UTF-8'
    ENCODING='UTF8'
    TEMPLATE=template0;
EOF

cd /var/www/chat
mkdir -p logs static

install -m 644 /vagrant/nginx.conf       /etc/nginx/sites-available/default
install -m 644 /vagrant/gunicorn.conf.py /var/www/chat/gunicorn.conf.py
install -m 644 /vagrant/upstart.conf     /etc/init/gunicorn-chat.conf
ln -s /lib/init/upstart-job /etc/init.d/gunicorn-chat || true

virtualenv -p `which python3` .
source bin/activate

pip install -qr /tmp/requirements.txt
pip install -q psycopg2
pip install -q gunicorn

cd django
python manage.py migrate
python manage.py collectstatic --noinput

service nginx restart
service gunicorn-chat restart
