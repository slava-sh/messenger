from django.shortcuts import render
from django.views.decorators.http import require_safe
from django.conf import settings


@require_safe
def home(request, *args, **kwargs):
    return render(request, 'client/index.html', {
        'realtime_url': settings.REALTIME_URL,
    })
