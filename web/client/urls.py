from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^$', views.home, name='home'),
    url(r'^c/$', views.home),
    url(r'^c/(?P<pk>[0-9]+)/$', views.home),
    url(r'^login/$', views.home),
]
