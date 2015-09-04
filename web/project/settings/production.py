from .common import *  # noqa

DEBUG = False

EMAIL_USE_TLS = True
EMAIL_HOST = os.environ['SMTP_HOST']
EMAIL_PORT = os.environ['SMTP_PORT']
EMAIL_HOST_USER = os.environ['SMTP_USER']
EMAIL_HOST_PASSWORD = os.environ['SMTP_PASSWORD']
