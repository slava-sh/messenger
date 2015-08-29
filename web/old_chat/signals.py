from django.db.models.signals import post_save
from django.dispatch import receiver
from accounts.models import User
from .tasks import create_first_conversation


@receiver(post_save, sender=User, dispatch_uid='old_chat.user_post_save')
def user_post_save(sender, instance, created, **kwargs):
    if created:
        create_first_conversation.delay(instance.pk)
