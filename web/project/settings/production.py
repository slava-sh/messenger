from .common import *  # noqa

DEBUG = False

EMAIL_USE_TLS = True
EMAIL_HOST = os.environ['SMTP_HOST']
EMAIL_PORT = os.environ['SMTP_PORT']
EMAIL_HOST_USER = os.environ['SMTP_USER']
EMAIL_HOST_PASSWORD = os.environ['SMTP_PASSWORD']

STATICFILES_STORAGE = 'storages.backends.s3boto.S3BotoStorage'

AWS_ACCESS_KEY_ID = os.environ['AWS_ACCESS_KEY_ID']
AWS_SECRET_ACCESS_KEY = os.environ['AWS_SECRET_ACCESS_KEY']
AWS_S3_HOST = os.environ['AWS_S3_HOST']
AWS_STORAGE_BUCKET_NAME = os.environ['AWS_STORAGE_BUCKET_NAME']
