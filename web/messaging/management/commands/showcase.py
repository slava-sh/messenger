import random
from django.core.management.base import BaseCommand, CommandError
from django.db import transaction
from accounts.models import User
from messaging.models import Conversation, Message

users = [
    ('Slava', 'shk.slava@gmail.com'),
    ('Dana',  'dana@localhost'),
    ('Mark',  'mark@localhost'),
]

conversations = [
    'Trip to New Zealand',
    'Messenger',
    'Balley',
    'Mountaineers',
    'Cats',
    'Corporation',
]

messages = [
    ('Slava', 'What do you guys think about my messenger?'),
    ('Dana', 'Cool!'),
    ('Mark', 'I like it :P'),
    ('Mark', 'I would like to see more features added.'),
    ('Slava', 'Wanna help me?\nhttps://github.com/slava-sh/messenger'),
]

class Command(BaseCommand):

    def handle(self, *args, **options):
        with transaction.atomic():
            user_objects = []
            for username, email in users:
                user, created = User.objects.update_or_create(
                    username=username, defaults={ 'email': email })
                user_objects.append(user)

            conversation_objects = []
            for name in reversed(conversations):
                conversation = Conversation.objects.create(name=name)
                conversation.members.add(*user_objects)
                conversation_objects.append(conversation)

            user = user_objects[0]
            conversation = conversation_objects[-2]
            for author, text in messages:
                author = User.objects.get(username=author)
                message = Message.objects.create(text=text, author=author,
                                                 conversation=conversation)

            # Up the last conversation
            Message.objects.create(text=text, author=author,
                                   conversation=conversation_objects[-1])
