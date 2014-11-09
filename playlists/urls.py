# -*- encoding: utf-8 -*-
from django.conf.urls.defaults import *

urlpatterns = patterns(
    'playlists.views',
    (r'list$', 'list'),
    (r'profile$', 'profile'),
    (r'getPicture$', 'getPicture'),
    (r'getProfile$', 'getProfile'),
    (r'getRank$', 'getRank'),
    (r'new$', 'new'),
    (r'remove$', 'remove'),
    (r'upvote$', 'upvote'),
    (r'downvote$', 'downvote'),
    (r'add$', 'add'),
    (r'get$', 'get'),
    (r'delete$', 'delete'),
    (r'sorted', 'sorted')
)
