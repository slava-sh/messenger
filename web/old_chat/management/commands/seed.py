import random
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from accounts.models import User
from old_chat.models import Conversation, Message

class Command(BaseCommand):

    def add_arguments(self, parser):
        parser.add_argument('-u',
            dest='users',
            default=5,
            type=int)
        parser.add_argument('-c',
            dest='conversations',
            default=30,
            type=int)
        parser.add_argument('-m',
            dest='messages_in_conversation',
            default=100,
            type=int)

    def handle(self, *args, **options):
        num_users = options['users']
        num_conversations = options['conversations']
        messages_in_conversation = options['messages_in_conversation']
        with transaction.atomic():
            users = []
            for i in range(num_users):
                username = get_username(i)
                email = get_email(i)
                user = User.objects.create(username=username, email=email)
                users.append(user)
            for i in range(num_conversations):
                name = get_conversation_name(i)
                conversation = Conversation.objects.create(name=name)
                conversation.members.add(*users)
                for j in range(messages_in_conversation):
                    text = get_message_text(j, conversation)
                    author = random.choice(users)
                    message = Message.objects.create(text=text, author=author,
                                                    conversation=conversation)

def get_username(i):
    return 'test{}'.format(i + 1)

def get_email(i):
    username = get_username(i)
    return '{}@localhost'.format(username)

def get_conversation_name(i):
    return 'conversation {}'.format(i + 1)

def get_message_text(i, conversation):
    return 'message {} in {}'.format(i + 1, conversation)
