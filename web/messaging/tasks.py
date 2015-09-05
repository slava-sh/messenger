from celery import shared_task
from accounts.models import User
from .models import Conversation, Message

@shared_task(ignore_result=True)
def create_first_conversation(user_pk):
    message = Message.objects.get(pk=1)
    conversation = Conversation.objects.create(name=message.author.username)
    conversation.members.add(user_pk, message.author)
    message.pk = None
    message.conversation = conversation
    message.save()
