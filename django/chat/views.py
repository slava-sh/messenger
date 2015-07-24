from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from .models import Conversation
from .forms import SendMessageForm, CreateConversationForm

User = get_user_model()


def home(request):
    return conversation_list(request)


@login_required
def conversation_list(request):
    return render(request, 'chat/conversation_list.html')


@login_required
def conversation(request, pk):
    conversation = get_object_or_404(Conversation, pk=pk)
    # todo validate membership
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


@login_required
def create_conversation(request):
    if request.method == 'POST':
        form = CreateConversationForm(request.POST)
        if form.is_valid():
            conversation = form.save()
            conversation.members.add(request.user)
            return redirect(conversation)
    else:
        form = CreateConversationForm()
    form.fields['members'].queryset = User.objects.exclude(pk=request.user.pk)
    return render(request, 'chat/create_conversation.html', {
        'form': form,
    })
