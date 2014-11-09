# -*- encoding: utf-8 -*-
from django.db import models
from django.contrib.auth.models import User


class Playlist(models.Model):
    id = models.AutoField('#', primary_key=True)
    user = models.ForeignKey(User, verbose_name=u'User', related_name="playlist_user")
    time = models.DateTimeField(u'When', auto_now_add=True)
    title = models.CharField(u"Name", max_length=100)
    description = models.CharField(u"Dsc", max_length=100)
    count = models.PositiveIntegerField(u"Tracks", default=0)
    upvotes = models.PositiveIntegerField(u"Upvote", default=0)
    downvotes = models.PositiveIntegerField(u"Downvote", default=0)
    rep = models.PositiveIntegerField(u"Rep", default=0)

    class Meta:
        get_latest_by = 'time'
        ordering = ('-id',)
        verbose_name = u"Playlist"
        verbose_name_plural = u"Playlists"

    def __unicode__(self):
        return u"Playlist %s" % self.title

    def count_playlist_tracks(self):
        return PlaylistTracks.objects.filter(playlist=self).count()

    def for_json(self):
        return {"_id": self.id, "name": self.title, "track_count": self.count, "userid": self.user.id, "dsc": self.description, "upvote": self.upvotes, "downvote": self.downvotes, "rank": self.rep, "owner": self.user.username}


class Ranking(models.Model):
    user = models.ForeignKey(User)
    rank = models.PositiveIntegerField(u"Points", default=0)

    def for_json(self):
        return {"ranks": self.rank}


class Vote(models.Model):
    user = models.ForeignKey(User)
    playlist = models.ForeignKey(Playlist)
    time = models.DateTimeField(u'When', auto_now_add=True)
    upvoted = models.BooleanField(u"Upvote", default=False)
    downvoted = models.BooleanField(u"Downvote", default=False)


class PlaylistTracks(models.Model):
    id = models.AutoField('#', primary_key=True)
    playlist = models.ForeignKey(Playlist, verbose_name=u"Playlist", related_name="playlist_track")
    time = models.DateTimeField(u'When', auto_now_add=True)
    track_id = models.CharField(u"Track ID", max_length=60)
    track_position = models.PositiveIntegerField(u"Position in the playlist", default=0)

    class Meta:
        get_latest_by = 'time'
        ordering = ('-id',)
        verbose_name = u"Track playlist"
        verbose_name_plural = u"Track playlists"

    def __unicode__(self):
        return u"Track %s" % self.track_id

    def for_json(self):
        return "%s" % self.track_id

    def save_without_recount(self, *args, **kwargs):
        super(PlaylistTracks, self).save(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.playlist.count = self.playlist.count_playlist_tracks()
        self.playlist.save()
        self.track_position = self.playlist.count
        super(PlaylistTracks, self).save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        self.playlist.count = self.playlist.count_playlist_tracks()
        self.playlist.save()
        super(PlaylistTracks, self).delete(*args, **kwargs)
