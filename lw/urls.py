from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'tinus.views.index'),
    url(r'^history/$', 'tinus.views.history'),
    url(r'^logout$', 'tinus.views.logout'),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'tpl/login.html'}),
    url(r'^addbill$', 'tinus.views.addbill', name='add bill'),
    url(r'^admin/', include(admin.site.urls)),
)