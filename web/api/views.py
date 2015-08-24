from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, pagination
from rest_framework.response import Response
from old_chat.models import Conversation
from .serializers import ConversationSerializer, ConversationVerboseSerializer, MessageSerializer
from .tasks import notify_users


def paginated_response(queryset, serializer, request):
    paginator = serializer.Pagination()
    page = paginator.paginate_queryset(queryset, request)
    serializer = serializer(page, many=True)
    return paginator.get_paginated_response(serializer.data)


class ConversationViewSet(viewsets.ViewSet):

    def list(self, request):
        queryset = request.user.conversations
        return paginated_response(queryset, ConversationSerializer, self.request)

    def retrieve(self, request, pk):
        conversation = get_object_or_404(Conversation, pk=pk)
        # TODO: validate membership
        serializer = ConversationVerboseSerializer(conversation)
        return Response(serializer.data)

    def typing(self, request, pk): # TODO: come up with a better name
        conversation = get_object_or_404(Conversation, pk=pk)
        # TODO: validate membership

        # TODO: extract this
        member_ids = list(conversation.members.values_list('id', flat=True))
        notify_users.delay(member_ids, {
            'type': 'RECEIVE_TYPING',
            'payload': {
                'conversation_id': str(conversation.pk),
                'user_id': str(request.user.pk),
            },
        })

        return Response(None, status=status.HTTP_202_ACCEPTED)


class MessageViewSet(viewsets.ViewSet):

    def list(self, request, pk):
        conversation = get_object_or_404(Conversation, pk=pk)
        # TODO: validate membership
        queryset = conversation.messages
        return paginated_response(queryset, MessageSerializer, self.request)


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
