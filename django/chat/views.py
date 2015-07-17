from django.shortcuts import render, get_object_or_404
from django.contrib.auth import get_user_model
from .models import Conversation


def home(request):
    return conversation_list(request)


def conversation_list(request):
    user = get_user_model().objects.get(pk=1)
    conversations = user.conversations.all()
    return render(request, 'chat/conversation_list.html', {
        'user': user,
        'conversations': conversations,
    })


def conversation(request, pk):
    conversation = get_object_or_404(Conversation, pk=pk)
    messages = conversation.messages.all()
    return render(request, 'chat/conversation.html', {
        'conversation': conversation,
        'messages': messages,
    })
