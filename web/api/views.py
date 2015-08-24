from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from functools import wraps
import json
from old_chat.models import Conversation
from old_chat.forms import SendMessageForm
from .tasks import notify_users

def typing(request, pk):
    conversation = Conversation.objects.get(pk=pk)
    # TODO: validate membership
    member_ids = list(conversation.members.values_list('id', flat=True))
    notify_users.delay(member_ids, {
        'type': 'RECEIVE_TYPING',
        'payload': {
            'conversation_id': str(conversation.pk),
            'user_id': str(request.user.pk),
        },
    })
    return {}


from rest_framework import viewsets, status
from .serializers import ConversationSerializer, ConversationVerboseSerializer, MessageSerializer
from rest_framework.response import Response



class ConversationViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = request.user.conversations
        serializer = ConversationSerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk):
        conversation = get_object_or_404(Conversation, pk=pk)
        # TODO: validate membership
        serializer = ConversationVerboseSerializer(conversation)
        return Response(serializer.data)


class MessageViewSet(viewsets.ViewSet):

    def list(self, request, pk):
        conversation = get_object_or_404(Conversation, pk=pk)
        # TODO: validate membership
        queryset = conversation.messages
        serializer = MessageSerializer(queryset, many=True)
        return Response(serializer.data)

    def create(self, request, pk):
        conversation = get_object_or_404(Conversation, pk=pk)
        ## TODO: validate membership
        serializer = MessageSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save(conversation=conversation, author=request.user)

        # TODO: extract this
        member_ids = list(conversation.members.values_list('id', flat=True))
        notify_users.delay(member_ids, {
            'type': 'RECEIVE_MESSAGE',
            'payload': {
                'conversation_id': str(conversation.pk),
                'message': serializer.data,
            },
        })

        return Response(serializer.data, status=status.HTTP_201_CREATED)
        # TODO: add Location header
