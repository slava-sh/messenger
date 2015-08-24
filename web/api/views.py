from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from functools import wraps
import json
from old_chat.models import Conversation
from old_chat.forms import SendMessageForm
from .tasks import notify_users

def api(request_method_list):
    pass


@api(['GET', 'POST'])
def messages(request, pk):
    #import time
    #from random import randint
    #time.sleep(randint(0, 7) / 10.0)
    conversation = get_object_or_404(Conversation, pk=pk)
    # TODO: validate membership
    if request.method == 'GET':
    else:
        data = json.loads(request.body.decode())
        form = SendMessageForm(data)
        if form.is_valid():
            message = form.save(commit=False)
            message.conversation = conversation
            message.author = request.user
            message.save()

            member_ids = list(conversation.members.values_list('id', flat=True))
            message_as_dict = model_to_dict(message, fields=['id', 'author', 'text'])
            notify_users.delay(member_ids, {
                'type': 'RECEIVE_MESSAGE',
                'payload': {
                    'conversation_id': str(conversation.pk),
                    'message': message_as_dict,
                },
            })
            return message_as_dict
        # TODO: return HTTP 40x
        return {'errors': form.errors}


@api('POST')
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


from rest_framework import viewsets
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
