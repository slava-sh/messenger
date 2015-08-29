from celery import shared_task
from accounts.models import User
from .models import Conversation, Message

@shared_task(ignore_result=True)
def create_first_conversation(user_pk):
    conversation = Conversation.objects.create(name='hey') #, members=[1, user_pk])
