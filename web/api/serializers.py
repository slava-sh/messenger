from rest_framework import serializers, pagination
from django.contrib.auth.models import User
from old_chat.models import Conversation, Message
from django.utils import timezone
from .fields import StringIntegerField, StringPrimaryKeyRelatedField

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


class BaseModelSerializer(serializers.ModelSerializer):
    serializer_related_field = StringPrimaryKeyRelatedField

    def build_standard_field(self, field_name, model_field):
        field_class, field_kwargs = super().build_standard_field(field_name, model_field)
        if field_name == 'id':
            field_class = StringIntegerField
        return field_class, field_kwargs


class MessageSerializer(BaseModelSerializer):
    author = StringPrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Message
        fields = ['id', 'text', 'time', 'author']
        read_only_fields = ['time']

    class Pagination(BasePagination):
        ordering = '-pk' # Equivalent to paginating by creation time


class UserSerializer(BaseModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username']


class ConversationSerializer(BaseModelSerializer):
    class Meta:
        model = Conversation
        fields = ['id', 'name']

    class Pagination(BasePagination):
        ordering = '-updated_at'


class CreateConversationSerializer(BaseModelSerializer):
    class Meta:
        model = Conversation
        fields = ['id', 'name', 'members']


class ConversationVerboseSerializer(BaseModelSerializer):
    members = UserSerializer(many=True)
    messages = serializers.SerializerMethodField('page_of_messages')

    class Meta:
        model = Conversation
        fields = ['id', 'name', 'members', 'messages']

    def page_of_messages(self, obj):
        queryset = obj.messages.all()
        queryset = queryset.filter(time__gt=timezone.now()) # queryset empty TODO: delete this
        return first_page(queryset, MessageSerializer)
