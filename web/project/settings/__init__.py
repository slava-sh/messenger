import os

if os.getenv('DJANGO_ENVIRONMENT') == 'development':
    from .development import *  # noqa
else:
    from .production import *  # noqa
