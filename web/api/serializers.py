from rest_framework import serializers
from django.contrib.auth.models import User, Group
from old_chat.models import Conversation, Message

# TODO: convert all ids to strings

class MessageSerializer(serializers.ModelSerializer):
    # TODO: pagination
    class Meta:
        model = Message
        fields = ['id', 'text', 'time', 'author']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ['id', 'name']


class ConversationVerboseSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)
    messages = MessageSerializer(many=True)

    class Meta:
        model = Conversation
        fields = ['id', 'name', 'members', 'messages']
