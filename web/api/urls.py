from django.conf.urls import url, include
from .views import ConversationViewSet, MessageViewSet, UserViewSet, SessionViewSet

conversations = ConversationViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

conversation = ConversationViewSet.as_view({
    'get': 'retrieve',
})

typing = ConversationViewSet.as_view({
    'post': 'typing',
})

messages = MessageViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

users = UserViewSet.as_view({
    'get': 'list',
})

user = UserViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update',
})

sessions = SessionViewSet.as_view({
    'post': 'send_code',
})

urlpatterns = [
    url(r'^conversations$', conversations, name='conversations'),
    url(r'^conversations/(?P<pk>[0-9]+)$', conversation, name='conversation'),
    url(r'^conversations/(?P<pk>[0-9]+)/typing$', typing, name='typing'),
    url(r'^conversations/(?P<pk>[0-9]+)/messages$', messages, name='messages'),
    url(r'^users$', users, name='users'),
    url(r'^users/(?P<pk>(me|[0-9]+))$', user, name='user'),
    url(r'^sessions$', sessions, name='sessions'),
]
