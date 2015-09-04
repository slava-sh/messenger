from django.shortcuts import get_object_or_404
from rest_framework import viewsets, status, pagination
from rest_framework.response import Response
from old_chat.models import Conversation
from accounts.models import User, LoginCode
from .serializers import ConversationSerializer, ConversationVerboseSerializer, MessageSerializer, CreateConversationSerializer, CreateLoginCodeSerializer, UserSerializer
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

    def create(self, request):
        data_with_members = request.data.copy()
        if 'members' not in data_with_members: # TODO: delete this
            data_with_members['members'] = list(User.objects.values_list('pk', flat=True))
        serializer = CreateConversationSerializer(data=data_with_members)
        # TODO: require that the user is a member of the new conversation
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)

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

        return Response({}, status=status.HTTP_202_ACCEPTED)


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


class UserViewSet(viewsets.ViewSet):

    def retrieve(self, request, pk):
        if pk == 'me':
            if not request.user.is_authenticated():
                return Response({ 'id': 'anonymous' }) # TODO: respond with an error
            user = request.user
        else:
            user = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def partial_update(self, request, pk):
        instance = get_object_or_404(User, pk=pk)
        serializer = UserSerializer(instance, data=request.data, partial=True)
        # TODO: permissions
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class SessionViewSet(viewsets.ViewSet):

    def send_code(self, request):
        serializer = CreateLoginCodeSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        code = serializer.save()
        code.send(build_absolute_uri=request.build_absolute_uri)
        return Response({}, status=status.HTTP_201_CREATED)
