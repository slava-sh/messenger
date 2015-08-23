from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^conversations$', views.conversations, name='conversations'),
    url(r'^conversations/(?P<pk>[0-9]+)$', views.conversation, name='conversation'),
    url(r'^conversations/(?P<pk>[0-9]+)/typing$', views.typing, name='typing'),
    url(r'^conversations/(?P<pk>[0-9]+)/messages$', views.messages, name='messages'),
]
