import os

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'project.settings')

from django.conf import settings
from celery import Celery

app = Celery('chat')
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
