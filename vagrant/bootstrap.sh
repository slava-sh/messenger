#!/bin/bash -ex
export DEBIAN_FRONTEND=noninteractive

apt-get update -qq
apt-get install -q -y -f nginx python-virtualenv
apt-get clean -q

service gunicorn-chat stop || true

cd /var/www/chat
mkdir -p logs static

install -m 644 /vagrant/nginx.conf       /etc/nginx/sites-available/default
install -m 644 /vagrant/gunicorn.conf.py /var/www/chat/gunicorn.conf.py
install -m 644 /vagrant/upstart.conf     /etc/init/gunicorn-chat.conf
ln -s /lib/init/upstart-job /etc/init.d/gunicorn-chat || true

virtualenv -p `which python3` .
source bin/activate

pip install -qr /tmp/requirements.txt
pip install -q gunicorn

cd django
python manage.py migrate
python manage.py collectstatic --noinput

service nginx restart
service gunicorn-chat restart
