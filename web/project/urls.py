from django.conf.urls import include, url
from django.contrib import admin

urlpatterns = [
    url(r'^api/', include('api.urls', namespace='api')),
    url(r'^accounts/', include('accounts.urls', namespace='accounts')),
    url(r'^admin/', include(admin.site.urls)),
]
