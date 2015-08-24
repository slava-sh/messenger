from rest_framework import serializers, pagination
from django.contrib.auth.models import User, Group
from old_chat.models import Conversation, Message

# TODO: convert all ids to strings

class MessageSerializer(serializers.ModelSerializer):
    # TODO: pagination
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'text', 'time', 'author']
        read_only_fields = ['time']

    class Pagination(pagination.CursorPagination):
        ordering = '-time'
        page_size = 3


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
    messages = serializers.SerializerMethodField('page_of_messages')

    class Meta:
        model = Conversation
        fields = ['id', 'name', 'members', 'messages']

    def page_of_messages(self, obj):
        queryset = obj.messages.all()
        page = queryset[:MessageSerializer.Pagination.page_size]
        serializer = MessageSerializer(page, many=True)
        return {
            # TODO: make request-independent CursorPagination, use it here
            # 'next': None,
            # 'previous': None,
            'results': serializer.data,
        }
