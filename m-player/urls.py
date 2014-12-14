from django.conf.urls import patterns, include, url
from django.conf import settings

from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',

  url(r'^admin/', include(admin.site.urls)),
  url(r'^login/', 'blog.views.login'),
  url(r'^logout/', 'blog.views.logout'),
  url(r'^register/', 'blog.views.register', name='register'),

  (r'^$', 'blog.views.full'),

  (r'^ajax/report_bad_token/$', 'blog.views.bad_token'),
  (r'^ajax/playlist/', include('playlists.urls')),

  (r'^add_token', 'blog.views.add_token'),

)

if settings.DEBUG:
  urlpatterns += patterns('',
    (r'^css/(.*)$', 'django.views.static.serve',
      {'document_root': settings.STATIC_ROOT + "/css", 'show_indexes': True}),
    (r'^images/(.*)$', 'django.views.static.serve',
      {'document_root': settings.STATIC_ROOT + "/images", 'show_indexes': True}),
    (r'^js/(.*)$', 'django.views.static.serve',
      {'document_root': settings.STATIC_ROOT + "/js", 'show_indexes': True}),
    (r'^swf/(.*)$', 'django.views.static.serve',
      {'document_root': settings.STATIC_ROOT + "/swf", 'show_indexes': True}),
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', 
      {'document_root': settings.STATIC_ROOT + "/media", 'show_indexes': True}),
  )
