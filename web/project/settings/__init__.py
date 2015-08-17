import os

if os.environ['ENVIRONMENT'] == 'development':
    from .development import *  # noqa
else:
    from .production import *  # noqa
