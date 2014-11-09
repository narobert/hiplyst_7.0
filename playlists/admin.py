# -*- encoding: utf-8 -*-
from django.contrib import admin
from models import *

class RankingAdmin(admin.ModelAdmin):
    list_display = ('user', 'rank')

admin.site.register(Ranking, RankingAdmin)

class VoteAdmin(admin.ModelAdmin):
    list_display = ('playlist', 'user', 'time', 'upvoted', 'downvoted')

admin.site.register(Vote, VoteAdmin)

class PlaylistsAdmin(admin.ModelAdmin):
    list_display = ('title', 'count', 'user', 'time', 'description', 'upvotes', 'downvotes', 'rep')

admin.site.register(Playlist, PlaylistsAdmin)


class PlaylistTracksAdmin(admin.ModelAdmin):
    list_display = ('track_id', 'playlist', 'time', 'track_position')

admin.site.register(PlaylistTracks, PlaylistTracksAdmin)
