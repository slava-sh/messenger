from django.shortcuts import render
from django.http import HttpResponse
from django.core.urlresolvers import reverse


def home(request):
    return HttpResponse('hey<br>\n{}'.format(reverse('chat:home')))
