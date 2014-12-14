# -*- encoding: utf-8 -*-
from django.contrib.auth.decorators import login_required
from playlists.models import Upvote, Downvote, Playlist, PlaylistTracks, Ranking, Profile
from blog.models import Image
from annoying.decorators import ajax_request
from django.http import HttpResponseRedirect, HttpResponse
import simplejson as json


@ajax_request
@login_required
def list(request):
    playlist_new_objects = Playlist.objects.filter(count__range=["1", "1000"], rep__range=["-20", "30"], upvotes=0).order_by("-rep")
    playlist_hot_objects = Playlist.objects.filter(count__range=["1", "1000"], rep__range=["-20", "30"], upvotes__range=["2", "3"]).order_by("-rep")
    playlist_trending_objects = Playlist.objects.filter(count__range=["1", "1000"], rep__range=["-20", "30"], upvotes=1).order_by("-rep")
    playlist_myprofile_objects = Playlist.objects.filter(user=request.user, count__range=["1", "1000"]).order_by("-rep")
    myplaylist_objects = Playlist.objects.filter(user=request.user).order_by("-id")
    upvote_objects = Upvote.objects.filter(user=request.user)
    downvote_objects = Downvote.objects.filter(user=request.user)
    playlists_new = [pl.for_json() for pl in playlist_new_objects]
    playlists_hot = [pl.for_json() for pl in playlist_hot_objects]
    playlists_trending = [pl.for_json() for pl in playlist_trending_objects]
    playlists_myprofile = [pl.for_json() for pl in playlist_myprofile_objects]
    myplaylists = [pl.for_json() for pl in myplaylist_objects]
    upvotes = [pl.for_json() for pl in upvote_objects]
    downvotes = [pl.for_json() for pl in downvote_objects]
    return {"status": "OK", "count": len(playlists_new), "lists_new": playlists_new, "lists_hot": playlists_hot, "lists_trending": playlists_trending, "lists_myprofile": playlists_myprofile, "mylists": myplaylists, "upvote": upvotes, "downvote": downvotes}


@ajax_request
@login_required
def getPicture(request):
    id = request.POST.get("id")
    playlist = Playlist.objects.get(id=id)

    if (Image.objects.filter(user=playlist.user).count() != 0):
        images = Image.objects.get(user=playlist.user)
        imagers = [images.for_json()]
        return {"status": "OK", "imaged": imagers}
    else:
        return {"status": "NotOK"}


@ajax_request
@login_required
def getProfile(request):
    id = request.POST.get("id")
    playlist = Playlist.objects.get(id=id)

    if (Profile.objects.filter(user=playlist.user).count() != 0):
        profiles = Profile.objects.get(user=playlist.user)
        profilers = [profiles.for_json()]
        return {"status": "OK", "profiled": profilers}
    else:
        return {"status": "NotOK"}


@ajax_request
@login_required
def getRank(request):
    id = request.POST.get("id")
    playlist = Playlist.objects.get(id=id)

    if (Ranking.objects.filter(user=playlist.user).count() != 0):
        rankies = Ranking.objects.get(user=playlist.user)
        rankers = [rankies.for_json()]
        return {"status": "OK", "ranked": rankers}
    else:
        return {"status": "NotOK"}


@ajax_request
@login_required
def profile(request):
    id = request.POST.get("id")
    playlist = Playlist.objects.get(id=id)

    playlist_profile_objects = Playlist.objects.filter(user=playlist.user, count__range=["1", "1000"]).order_by("-rep")
    playlists_profile = [pl.for_json() for pl in playlist_profile_objects]

    return {"status": "OK", "count": len(playlists_profile), "lists_profile": playlists_profile}


@ajax_request
@login_required
def new(request):
    name = request.POST.get("name")
    dsc = request.POST.get("dsc")
    if not name:
        return {"status": "NeOK", "message": u"No specified playlist name"}

    profile = Profile.objects.get(user=request.user)
    playlist = Playlist.objects.create(user=request.user, title=name, description=dsc, profile=profile)
    upvote = Upvote.objects.create(user=request.user, upvoted=False, playlist=playlist, button_color=30)
    downvote = Downvote.objects.create(user=request.user, downvoted=False, playlist=playlist, button_color=30)
    upvote.save()
    downvote.save()
    playlist.save()
    return {"status": "OK", "message": u"Playlist created"}


@ajax_request
@login_required
def remove(request):
    id = request.POST.get("id")
    if not id:
        return {"status": "NeOK", "message": u"No ID"}

    try:
        Playlist.objects.get(id=id).delete()
        return {"status": "OK", "message": u"Playlist deleted"}
    except:
        return {"status": "NeOK", "message": u"Failed to delete playlist"}


@ajax_request 
@login_required
def upvote(request):
    id = request.POST.get("id")
    playlist = Playlist.objects.get(id=id)

    upvoting = Upvote.objects.filter(user=request.user, upvoted=True, playlist=playlist, button_color=10)
    downvoting = Downvote.objects.filter(user=request.user, downvoted=True, playlist=playlist, button_color=20)
    ranked = Ranking.objects.filter(user=playlist.user)

    if (playlist.rep == 0 and ranked.count() == 0):
        ranked = Ranking.objects.create(user=playlist.user)
    else:
        ranked = Ranking.objects.get(user=playlist.user)

    if (upvoting.count() == 0 and downvoting.count() == 0):
 
        upvote = Upvote.objects.get(user=request.user, upvoted=False, playlist=playlist, button_color=30)
        
        playlist.upvotes += 1
        playlist.rep += 10
        ranked.rank += 10
        ranked.save()
        upvote.button_color = 10
        upvote.upvoted = True
        upvote.save()
        playlist.save()

    elif (upvoting.count() == 1 and downvoting.count() == 0):

        upvote = Upvote.objects.get(user=request.user, upvoted=True, playlist=playlist, button_color=10)

        playlist.upvotes -= 1
        playlist.rep -= 10
        ranked.rank -= 10
        ranked.save()
        upvote.button_color = 30
        upvote.upvoted = False
        upvote.save()
        playlist.save()

    elif (upvoting.count() == 0 and downvoting.count() == 1):

        playlist.save()

    elif (upvoting.count() == 1 and downvoting.count() == 1):

        playlist.save()
   
    return {"status": "OK", "message": u"Liked playlist"}


@ajax_request
@login_required
def downvote(request):
    id = request.POST.get("id")
    playlist = Playlist.objects.get(id=id)

    upvoting = Upvote.objects.filter(user=request.user, upvoted=True, playlist=playlist, button_color=10)
    downvoting = Downvote.objects.filter(user=request.user, downvoted=True, playlist=playlist, button_color=20)
    ranked = Ranking.objects.filter(user=playlist.user)

    if (playlist.rep == 0 and ranked.count() == 0):
        ranked = Ranking.objects.create(user=playlist.user)
    else:
        ranked = Ranking.objects.get(user=playlist.user)

    if (upvoting.count() == 0 and downvoting.count() == 0):

        downvote = Downvote.objects.get(user=request.user, downvoted=False, playlist=playlist, button_color=30)

        playlist.downvotes += 1
        playlist.rep -= 10
        ranked.rank -= 10
        ranked.save()
        downvote.button_color = 20
        downvote.downvoted = True
        downvote.save()
        playlist.save()

    elif (downvoting.count() == 1 and upvoting.count() == 0):

        downvote = Downvote.objects.get(user=request.user, downvoted=True, playlist=playlist, button_color=20)

        playlist.downvotes -= 1
        playlist.rep += 10
        ranked.rank += 10
        ranked.save()
        downvote.button_color = 30
        downvote.downvoted = False
        downvote.save()
        playlist.save()

    elif (downvoting.count() == 0 and upvoting.count() == 1):

        playlist.save()

    elif (downvoting.count() == 1 and upvoting.count() == 1):

        playlist.save()
       
    return {"status": "OK", "message": u"Disliked playlist"}


@ajax_request
@login_required
def add(request):
    id = request.POST.get("id")
    tracks = json.loads(request.POST.get("tracks"))
    if not id:
        return {"status": "NeOK", "message": u"No ID"}

    playlist = Playlist.objects.get(id=id)
    if playlist.count >= 150:
        return {"status": "NeOK", "message": u"A limit of 150 tracks. Create a new playlist or remove tracks from this playlist"}

    for track in tracks:
        if PlaylistTracks.objects.filter(playlist=playlist, track_id=track).count() == 0:
            track = PlaylistTracks.objects.create(playlist=playlist, track_id=track)
            track.save()
            if track.track_position >= 150:
                return {"status": "NeOK", "message": u"Some of the tracks were not added because there is a limit of 150 tracks. Remove tracks or move to another playlist"}

    return {"status": "OK", "message": u"Tracks added to playlist"}


@ajax_request
@login_required
def get(request):
    id = request.POST.get("id")
    if not id:
        return {"status": "NeOK", "message": u"No ID"}

    playlist = Playlist.objects.get(id=id)
    track_objects = PlaylistTracks.objects.filter(playlist__id=id).order_by("track_position")[:150]
    track_list = [t.for_json() for t in track_objects]
    return {"status": "OK", "list": {"_id": id, "tracks": track_list, "title": playlist.title}}


@ajax_request
@login_required
def delete(request):
    playlist_id = request.POST.get("playlist_id")
    track_id = request.POST.get("track_id")
    if not playlist_id or not track_id:
        return {"status": "NeOK", "message": u"No ID"}

    try:
        PlaylistTracks.objects.filter(track_id=track_id, playlist__id=playlist_id).delete()
        return {"status": "OK", "message": u"Track with ID %s deleted" % track_id}
    except Exception, ex:
        return {"status": "NeOK", "message": u"Problem with deleting playlist: " + ex}


@ajax_request
@login_required
def sorted(request):
    playlist_id = request.POST.get("id")
    sorted_ids = json.loads(request.POST.get("sorted"))
    if not playlist_id:
        return {"status": "NeOK", "message": u"Playlist ID not specified"}
    if not sorted_ids:
        return {"status": "NeOK", "message": u"List is empty"}

    try:
        for position, track_id in enumerate(sorted_ids):
            track = PlaylistTracks.objects.get(playlist__id=playlist_id, track_id=track_id)
            if track:
                track.track_position = position
                track.save_without_recount()

        return {"status": "OK", "message": u"Playlist successfully saved"}
    except Exception, ex:
        return {"status": "NeOK", "message": ex}
