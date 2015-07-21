from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from .models import Conversation
from .forms import SendMessageForm


def home(request):
    return conversation_list(request)


@login_required
def conversation_list(request):
    return render(request, 'chat/conversation_list.html')


@login_required
def conversation(request, pk):
    conversation = get_object_or_404(Conversation, pk=pk)
    if request.method == 'POST':
        form = SendMessageForm(request.POST)
        if form.is_valid():
            message = form.save(commit=False)
            message.conversation = conversation
            message.author = request.user
            message.save()
            return redirect(conversation)
    else:
        form = SendMessageForm()
    return render(request, 'chat/conversation.html', {
        'conversation': conversation,
        'form': form,
    })
