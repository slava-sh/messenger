from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^login/(?P<code>[a-zA-Z0-9]+)/$', views.login, name='login'),
]
