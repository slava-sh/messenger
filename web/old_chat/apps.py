from django.apps import AppConfig

class Config(AppConfig):
    name = 'old_chat'

    def ready(self):
        from . import signals
