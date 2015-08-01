from django.shortcuts import render, get_object_or_404
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from django.forms.models import model_to_dict
from functools import wraps
import json
from chat.models import Conversation
from chat.forms import SendMessageForm


def home(request, *args, **kwargs):
    return render(request, 'react_chat/index.html')


def api(request_method_list):
    if isinstance(request_method_list, list):
        request_method_list = [request_method_list]
    def decorator(view):
        @require_http_methods(request_method_list)
        @wraps(view)
        def wrapper(*args, **kwargs):
            response = view(*args, **kwargs)
            return JsonResponse(response, safe=False)
        return wrapper
    return decorator


#@api(['GET', 'POST']) # TODO
@api('GET')
def messages(request, pk):
    conversation = get_object_or_404(Conversation, pk=pk)
    # todo validate membership
    if request.method == 'GET':
        messages = conversation.messages.values('id', 'author', 'text')
        return list(messages)
    else:
        data = json.loads(request.body.decode())
        form = SendMessageForm(data)
        if form.is_valid():
            message = form.save(commit=False)
            message.conversation = conversation
            message.author = request.user
            message.save()
            return model_to_dict(message, fields=['id', 'author', 'text'])
        return {'errors': form.errors}


@api('GET')
def conversations(request):
    conversations = request.user.conversations.values('id', 'name')
    return list(conversations)


@api('GET')
def conversation(request, pk):
    conversation = Conversation.objects.get(pk=pk)
    # TODO: validate membership
    response = model_to_dict(conversation, fields=['id', 'name'])
    response['members'] = list(conversation.members.values('id', 'username'))
    response['messages'] = list(conversation.messages.values('id', 'author', 'text'))
    return response
