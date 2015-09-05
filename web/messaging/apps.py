from django.apps import AppConfig

class Config(AppConfig):
    name = 'messaging'

    def ready(self):
        from . import signals
