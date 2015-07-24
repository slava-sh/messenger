from django.shortcuts import render
from django.http import JsonResponse
from django.forms.models import model_to_dict
from functools import wraps
from chat.models import Conversation


def home(request):
    return render(request, 'bb_chat/index.html')


def api(view):
    @wraps(view)
    def wrapper(*args, **kwargs):
        response = view(*args, **kwargs)
        return JsonResponse(response, safe=False)
    return wrapper


@api
def conversations(request):
    conversations = request.user.conversations.values('id', 'name')
    return list(conversations)


@api
def conversation(request, pk):
    conversation = Conversation.objects.get(pk=pk)
    # TODO: validate membership
    response = model_to_dict(conversation, fields=['id', 'name'])
    response['members'] = list(conversation.members.values('id', 'username'))
    return response
