import os

if os.getenv('DJANGO_ENVIRONMENT') == 'development':
    from .development import *
else:
    from .production import *
