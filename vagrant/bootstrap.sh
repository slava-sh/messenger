#!/bin/bash -ex
export DEBIAN_FRONTEND=noninteractive

aptitude update
aptitude install -q -y -f nginx python-virtualenv
aptitude clean

service gunicorn-chat stop || true

cd /var/www/chat
mkdir -p logs static

install -m 644 /vagrant/nginx.conf       /etc/nginx/sites-available/default
install -m 644 /vagrant/upstart.conf     /etc/init/gunicorn-chat.conf
install -m 644 /vagrant/gunicorn.conf.py /var/www/chat/gunicorn.conf.py
ln -s          /lib/init/upstart-job     /etc/init.d/gunicorn-chat || true

virtualenv -p `which python3` .
source bin/activate

pip install gunicorn

cd django
pip install -r requirements.txt
python manage.py migrate
python manage.py collectstatic --noinput

service nginx restart
service gunicorn-chat restart
