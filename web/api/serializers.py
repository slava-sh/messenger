from rest_framework import serializers, pagination
from django.contrib.auth.models import User, Group
from old_chat.models import Conversation, Message

# TODO: convert all ids to strings


def first_page(queryset, serializer):
    pagination = serializer.Pagination
    page = queryset.order_by(pagination.ordering)[:pagination.page_size]
    serializer = serializer(page, many=True)
    return {
        # TODO: make request-independent CursorPagination, use it here
        'next': 'cursor=FIXME',
        'previous': None,
        'results': serializer.data,
    }


class BasePagination(pagination.CursorPagination):
    page_size = 3
    ordering = None


class MessageSerializer(serializers.ModelSerializer):
    author = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'text', 'time', 'author']
        read_only_fields = ['time']

    class Pagination(BasePagination):
        ordering = '-pk' # Equivalent to paginating by creation time


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = ['id', 'name']

    class Pagination(BasePagination):
        ordering = '-updated_at'


class ConversationVerboseSerializer(serializers.ModelSerializer):
    members = UserSerializer(many=True)
    messages = serializers.SerializerMethodField('page_of_messages')

    class Meta:
        model = Conversation
        fields = ['id', 'name', 'members', 'messages']

    def page_of_messages(self, obj):
        queryset = obj.messages.all()
        return first_page(queryset, MessageSerializer)
