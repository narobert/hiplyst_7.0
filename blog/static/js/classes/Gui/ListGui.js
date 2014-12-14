function ListGui() {

    // Playlist
    this.ui_playlist = $("#playlist ul");
    this.ui_error = $("#playlist_error");

    this.ui_nowplaying_activator = $("#top-info-nowplaying");
    this.ui_nowplaying_clear = $("#nowplaying-clear");
    this.ui_nowplaying = $("#nowplaying_list-list");
    this.ui_nowplaying_play = $(".nowplaying-play");
    this.ui_nowplaying_remove = $(".nowplaying-remove");

    // Header
    this.ui_playlist_header = $("#playlist_controls");

    // Track
    this.ui_track_class = $(".track");
    this.ui_track_play = $(".track-play");
    this.ui_track_artist = $(".track-artist");
    this.ui_track_title = $(".track-title");
    this.ui_track_delete = $(".track-delete");

    this.nowplaying_template = '<div class="nowplaying_list-item" id="nowplaying-track-{{{id}}}">' +
        '<div class="item-buttons" data-id="{{{id}}}">' +
            '<img src="/images/icons/delete_circle.png" alt="x" class="nowplaying-remove" title="Remove track from the list" />' +
        '</div><div class="item-clickable nowplaying-play" data-id="{{{id}}}">' +
            '<div class="item-img artist-cover-{{{artist_class}}}"></div>' +
            '<div class="item-title">{{title}}</div>' +
            '<div class="item-artist">{{artist}}</div>' +
        '</div></div>';

    this.linkTrackEvents();
}

// Everything necessary
ListGui.prototype.linkTrackEvents = function() {
    this.ui_track_play.live("click", function() {
        var track_list_name = $(this).parent().attr("data-list");
        var track_id = $(this).parent().attr("data-id");
        var track = gui.active_tab_gui.lists[track_list_name].getById(track_id);
        player.listController.replaceNowplayingList(gui.active_tab_gui.lists[track_list_name]);
        player.playbackController.playTrack(track);
    });

    this.ui_nowplaying_play.live("click", function() {
        var track_id = $(this).attr("data-id");
        var track = player.listController.nowplaying.getById(track_id);
        player.playbackController.playTrack(track);
    });

    this.ui_nowplaying_clear.click(function() {
        player.listController.nowplaying.list = [];
        player.listController.nowplaying.current_index = 0;
        $("#nowplaying_list-list").html("");
    });

    this.ui_track_title.live("click", function() {
        gui.activateTab("playlists");
        gui.playlists_gui.search($(this).html());
        $(".search_view").css("display", "block");
        $(".playlist_view").css("display", "none");
    });

    this.ui_track_artist.live("click", function() {
        gui.activateTab("playlists");
        gui.playlists_gui.search($(this).html());
        $(".search_view").css("display", "block");
        $(".playlist_view").css("display", "none");
    });

    this.ui_track_delete.live("click", function() {
        var track_list_name = $(this).parent().parent().attr("data-list");
        var track_id = $(this).parent().parent().attr("data-id");
        if (gui.active_tab_gui.lists[track_list_name].removeById(track_id)) {
            $(this).parent().parent().fadeOut();
        }
    });

    this.ui_nowplaying_remove.live("click", function() {
        var track_id = $(this).parent().attr("data-id");
        if (player.listController.nowplaying.removeById(track_id)) {
            $(this).parent().parent().fadeOut();
        }
    });

    $("#container").click(function() {
        $("#nowplaying_list").fadeOut();
    });

    $(".sortable").sortable({
        axis: 'y',
        handle: '.track-sort',
        cursor: 'move',
        stop: function(event, ui) {
            var list_name = $(ui.item).attr("data-list");
            gui.active_tab_gui.lists[list_name].sorted($(this).sortable("toArray"));
        }
    });
};

// Tracks show up next to playlist clicked
ListGui.prototype.trackHtml = function(track, config) {
    var context = track.toDict();
    for (var key in config) {
        context[key] = config[key];
    }
    return Mustache.to_html(Track.template, context);
};

// Can play songs next to playlist clicked
ListGui.prototype.highlightTrackById = function(track_id) {
    $(".track").removeClass("playing");
    $("*[data-id=" + track_id + "]").addClass("playing");

    $(".nowplaying_list-item").removeClass("playing");
    $("#nowplaying-track-" + track_id).addClass("playing");

    var is_inactive = true;
    $(".nowplaying_list-item").each(function(index, element) {
        $(element).removeClass("inactive");
        if ($(element).hasClass("playing")) {
            is_inactive = false;
            return;
        }
        if (is_inactive) {
            $(element).addClass("inactive");
        }
    });

};

// Can play songs from a different playlist
ListGui.prototype.updateNowplayingList = function(nowplaying_object) {
    var html = "";
    for(var i in nowplaying_object.list) {
        var item = nowplaying_object.list[i];
        var artist_class = Track.toClass(item.artist);
        html += Mustache.to_html(this.nowplaying_template, {
            "title": item.title,
            "artist": item.artist,
            "artist_class": artist_class,
            "id": item.id
        });
        CoversController.getArtistCover(item.artist, ".artist-cover-" + artist_class)
    }
    this.ui_nowplaying.html(html);
};
