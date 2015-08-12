from .common import *  # noqa

DEBUG = True

#ALLOWED_HOSTS = ['chat.dev']

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql_psycopg2',
        'NAME': 'postgres',
        'USER': 'postgres',
        'HOST': 'db',
        'PORT': 5432,
    }
}

SECRET_KEY = 'af@l1^$*7w#v(5c+vb(%e=k^@)0-zty@pqegn%89z^j209-m50'
