from .common import *  # noqa

DEBUG = True
INTERNAL_IPS = ['127.0.0.1']

ALLOWED_HOSTS = []

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'project', 'db.sqlite3'),
    }
}

SECRET_KEY = 'af@l1^$*7w#v(5c+vb(%e=k^@)0-zty@pqegn%89z^j209-m50'
