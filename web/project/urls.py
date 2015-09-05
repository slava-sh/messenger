from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^old/', include('messaging.urls', namespace='messaging')),
    url(r'^api/', include('api.urls', namespace='api')),
]
