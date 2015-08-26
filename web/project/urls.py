from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('nopassword.urls')),
    url(r'^old/', include('old_chat.urls', namespace='old_chat')),
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^', include('client.urls', namespace='client')),
]
