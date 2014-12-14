# -*- encoding: utf-8 -*-
from django.contrib import admin
from models import *

admin.site.register(Profile)

class RankingAdmin(admin.ModelAdmin):
    list_display = ('user', 'rank')

admin.site.register(Ranking, RankingAdmin)

class UpvoteAdmin(admin.ModelAdmin):
    list_display = ('playlist', 'user', 'time', 'upvoted', 'button_color')

admin.site.register(Upvote, UpvoteAdmin)

class DownvoteAdmin(admin.ModelAdmin):
    list_display = ('playlist', 'user', 'time', 'downvoted', 'button_color')

admin.site.register(Downvote, DownvoteAdmin)

class PlaylistsAdmin(admin.ModelAdmin):
    list_display = ('title', 'count', 'user', 'time', 'description', 'upvotes', 'downvotes', 'rep')

admin.site.register(Playlist, PlaylistsAdmin)


class PlaylistTracksAdmin(admin.ModelAdmin):
    list_display = ('track_id', 'playlist', 'time', 'track_position')

admin.site.register(PlaylistTracks, PlaylistTracksAdmin)
