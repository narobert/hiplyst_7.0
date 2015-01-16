# -*- encoding: utf-8 -*-
from django.conf.urls.defaults import *

urlpatterns = patterns(
    'playlists.views',
    (r'list$', 'list'),
    (r'viewButtons$', 'viewButtons'),
    (r'addProfileImage$', 'addProfileImage'),
    (r'addPlaylistImage/(?P<id>[\w\-]+)$', 'addPlaylistImage'),
    (r'addProfile$', 'addProfile'),
    (r'addComment/(?P<id>[\w\-]+)$', 'addComment'),
    (r'getComments$', 'getComments'),
    (r'profile$', 'profile'),
    (r'getPicture$', 'getPicture'),
    (r'getProfile$', 'getProfile'),
    (r'getRank$', 'getRank'),
    (r'new$', 'new'),
    (r'playlistInfo$', 'playlistInfo'),
    (r'remove$', 'remove'),
    (r'upvote$', 'upvote'),
    (r'downvote$', 'downvote'),
    (r'add$', 'add'),
    (r'get$', 'get'),
    (r'delete$', 'delete'),
    (r'sorted', 'sorted')
)
