from django.shortcuts import render, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Conversation


def home(request):
    return conversation_list(request)


@login_required
def conversation_list(request):
    return render(request, 'chat/conversation_list.html')


@login_required
def conversation(request, pk):
    conversation = get_object_or_404(Conversation, pk=pk)
    return render(request, 'chat/conversation.html', {
        'conversation': conversation,
    })
