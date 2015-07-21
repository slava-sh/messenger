from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^c/(?P<pk>[0-9]+)/$', views.conversation, name='conversation'),
    url(r'^c/new/$', views.create_conversation, name='create_conversation'),
]
