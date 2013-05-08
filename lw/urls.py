from django.conf.urls import patterns, include, url

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', 'tinus.views.home'),
    url(r'^history/$', 'tinus.views.history'),
    url(r'^logout$', 'tinus.views.logout'),
    url(r'^analysis', 'tinus.views.analysis'),
    url(r'^accounts/login/$', 'django.contrib.auth.views.login', {'template_name': 'tpl/login.html'}),
    url(r'^addbill$', 'tinus.views.add_bill', name='add bill'),
    url(r'^removebill$', 'tinus.views.remove_bill', name='remove bill'),
    url(r'^admin/', include(admin.site.urls)),
)