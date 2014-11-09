function PlaylistsGui() {
    this.ui_myplaylists_sidebar = $("#myplaylists_sidebar");
    this.ui_playlists_myprofile_sidebar = $("#playlists_myprofile_sidebar");
    this.ui_playlists_username_sidebar = $("#playlists_username_sidebar");
    this.ui_playlists_profile_sidebar = $("#playlists_profile_sidebar");
    this.ui_username_rank = $("#username_rank");
    this.ui_username_picture = $("#username_picture");
    this.ui_username_profile = $("#username_profile");
    this.ui_playlists_new_sidebar = $("#playlists_new_sidebar");
    this.ui_playlists_hot_sidebar = $("#playlists_hot_sidebar");
    this.ui_playlists_trending_sidebar = $("#playlists_trending_sidebar");
    this.ui_playlist_tracks = $("#playlist_tracks");
    this.ui_playlist_name = $("#playlist_name");
    this.ui_playlist_buttons = $("#playlist_buttons");
    this.ui_add_to_lists = $(".add_to_popup-list");

    this.ui_playlist_add_to_now = $("#playlist_add_to_now");

    this.ui_playlist_delete = $(".delete_playlist");
    this.ui_playlist_handler = $(".sidebar_view-title");
    this.ui_myplaylist_handler = $(".mysidebar_view-title");
    this.ui_playlist_like = $("#like");
    this.ui_playlist_dislike = $("#dislike");
    this.ui_playlist_user = $(".sidebar_view-user");
    this.ui_playlist_username = $(".sidebar_view-username");
   
    this.ui_track_list = $("#music-tracks");
    this.ui_searchbox = $("#music-search");
    this.ui_search_list_buttons = $("#music-search-buttons");
    this.ui_lists = $("#music-lists");

    this.ui_checkbox_duplicates = $("#music-search-param-duplicates");
    this.ui_checkbox_artist = $("#music-search-param-artistonly");

    this.lists = {};
    this.shown_playlist_id = "";

    this.playlist_new_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-user"><button style="margin-top:7px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/user_white.png"></button></div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><span>{{creator}}</span></div>' +
        '<div class="sidebar_view-like" style="margin-left:750px;position:absolute;font-size:12px;"><button id="like" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/fire_white.png"></button>&nbsp;&nbsp;&nbsp;{{like}}</div>' +
        '<div class="sidebar_view-dislike" style="margin-left:825px;position:absolute;font-size:12px;"><button id="dislike" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/water_white.png"></button>&nbsp;&nbsp;&nbsp;{{dislike}}</div>' +
    '</div>';
    this.playlist_hot_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-user"><button style="margin-top:7px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/user_white.png"></button></div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><span>{{creator}}</span></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><button id="like" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/fire_white.png"></button>&nbsp;&nbsp;&nbsp;{{like}}</div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><button id="dislike" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/water_white.png"></button>&nbsp;&nbsp;&nbsp;{{dislike}}</div>' +
    '</div>';
    this.playlist_trending_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-user"><button style="margin-top:7px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/user_white.png"></button></div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><span>{{creator}}</span></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><button id="like" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/fire_white.png"></button>&nbsp;&nbsp;&nbsp;{{like}}</div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><button id="dislike" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/water_white.png"></button>&nbsp;&nbsp;&nbsp;{{dislike}}</div>' +
    '</div>';
    this.username_profile_template = '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-bottom:12px;">FAVORITE ARTISTS&nbsp;<font style="color:white;"> {{profile_artists}}</font></p>' +
        '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-bottom:12px;">FAVORITE GENRES&nbsp;<font style="color:white;"> {{profile_genres}}</font></p>' +
        '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-bottom:12px;">FAVORITE CONCERTS&nbsp;<font style="color:white;"> {{profile_concerts}}</font></p>' +
        '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-bottom:12px;">UPLOADED LYRICS&nbsp;<font style="color:white;"> no</font></p>' +
        '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-bottom:12px;">UPLOADED ALBUM ART&nbsp;<font style="color:white;"> no</font></p>';
    this.username_picture_template = '<img style="width:100%;height:auto;" src="/media/{{imager}}">';
    this.username_rank_template = '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-top:12px;padding-bottom:12px;">REP POINTS&nbsp;<font style="color:white;"> {{ranker}}</font></p>';
    this.playlist_username_template = '<p style="font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-top:12px;padding-bottom:12px;">USER&nbsp;<font style="color:white;"> {{pos}}</font></p>';
    this.playlist_profile_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-user"><button style="margin-top:7px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/user_white.png"></button></div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><span>{{creator}}</span></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><button id="like" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/fire_white.png"></button>&nbsp;&nbsp;&nbsp;{{like}}</div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><button id="dislike" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/water_white.png"></button>&nbsp;&nbsp;&nbsp;{{dislike}}</div>' +
    '</div>';
    this.playlist_myprofile_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-user"><button style="margin-top:7px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/user_white.png"></button></div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><span>{{creator}}</span></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><button id="like" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/fire_white.png"></button>&nbsp;&nbsp;&nbsp;{{like}}</div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><button id="dislike" data-id="{{id}}" style="margin-top:7px;margin-left:-15px;background:black;border:1px solid #cccccc;" class="btn btn-small"><img style="margin-top:4px;" src="/images/water_white.png"></button>&nbsp;&nbsp;&nbsp;{{dislike}}</div>' +
    '</div>';
    this.myplaylist_template = '<div class="mysidebar_view-item">' +
        '<div class="mysidebar_view-title" data-id="{{id}}">{{title}}</div>' +
        '<div class="mysidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="mysidebar_view-buttons delete_playlist" data-id="{{id}}"><img src="/images/icons/delete_circle.png"></div>' +
    '</div>';

    var _this = this;
    this.ui_playlist_handler.live("click", function() {
        _this.loadPlaylist($(this).attr("data-id"));
        $('.sidebar_view-title').css("color", "#777777");
        $('.mysidebar_view-title').css("color", "#777777");
        $(this).css("color", "white");
    });

    var _this = this;
    this.ui_myplaylist_handler.live("click", function() {
        _this.loadPlaylist($(this).attr("data-id"));
        $('.sidebar_view-title').css("color", "#777777");
        $('.mysidebar_view-title').css("color", "#777777");
        $(this).css("color", "white");
    });

    var _this = this;
    this.ui_playlist_username.live("click", function() {
        _this.loadProfile($(this).attr("data-id"));
        _this.loadRank($(this).attr("data-id"));
        _this.loadPicture($(this).attr("data-id"));
        _this.loadProfiles($(this).attr("data-id"));
        gui.activateTab('profile');
    });

    this.loadPlaylists();
}

// Load everything
PlaylistsGui.prototype.load = function() {
    this.loadPlaylists();
    this.ui_playlist_tracks.html("");
    this.ui_playlist_name.html("<center><p style=color:#777777;font-size:14px;><font face=Helvetica Neue>PLAYLIST</font></p></center>");
    this.ui_playlist_add_to_now.hide();
};

// Load list of playlists that you created
PlaylistsGui.prototype.loadPlaylists = function() {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/list",
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var html_new = "";
                var html_hot = "";
                var html_trending = "";
                var html_myprofile = "";
                var my_html = "";
                _this.ui_add_to_lists.html('<div class="add_to_button" style="height:0px;"></div>');
                for (var i = 0; i < data["lists_new"].length; i++) {
                    var playlist = data["lists_new"][i];
                    html_new += Mustache.to_html(_this.playlist_new_template, {
                        "title": playlist.name,
                        "description": playlist.dsc,
                        "tracks": playlist.track_count,
                        "id": playlist._id,
                        "like": playlist.upvote,
                        "dislike": playlist.downvote,
                        "creator": playlist.owner
                    });
                    
                    _this.lists["playlist-" + playlist._id] = new UserPlayList(player.listController, playlist.name);
                    _this.lists["playlist-" + playlist._id].id = playlist._id
                }
                for (var i = 0; i < data["lists_hot"].length; i++) {
                    var playlist = data["lists_hot"][i];
                    html_hot += Mustache.to_html(_this.playlist_hot_template, {
                        "title": playlist.name,
                        "description": playlist.dsc,
                        "tracks": playlist.track_count,
                        "id": playlist._id,
                        "like": playlist.upvote,
                        "dislike": playlist.downvote,
                        "creator": playlist.owner
                    });
                    
                    _this.lists["playlist-" + playlist._id] = new UserPlayList(player.listController, playlist.name);
                    _this.lists["playlist-" + playlist._id].id = playlist._id
                }
                for (var i = 0; i < data["lists_trending"].length; i++) {
                    var playlist = data["lists_trending"][i];
                    html_trending += Mustache.to_html(_this.playlist_trending_template, {
                        "title": playlist.name,
                        "description": playlist.dsc,
                        "tracks": playlist.track_count,
                        "id": playlist._id,
                        "like": playlist.upvote,
                        "dislike": playlist.downvote,
                        "creator": playlist.owner
                    });
                    
                    _this.lists["playlist-" + playlist._id] = new UserPlayList(player.listController, playlist.name);
                    _this.lists["playlist-" + playlist._id].id = playlist._id
                }
                for (var i = 0; i < data["lists_myprofile"].length; i++) {
                    var playlist = data["lists_myprofile"][i];
                    html_myprofile += Mustache.to_html(_this.playlist_myprofile_template, {
                        "title": playlist.name,
                        "description": playlist.dsc,
                        "tracks": playlist.track_count,
                        "id": playlist._id,
                        "like": playlist.upvote,
                        "dislike": playlist.downvote,
                        "creator": playlist.owner
                    });
                    
                    _this.lists["playlist-" + playlist._id] = new UserPlayList(player.listController, playlist.name);
                    _this.lists["playlist-" + playlist._id].id = playlist._id
                }
                for (var i = 0; i < data["mylists"].length; i++) {
                    var playlist = data["mylists"][i];
                    my_html += Mustache.to_html(_this.myplaylist_template, {
                        "title": playlist.name,
                        "description": playlist.dsc,
                        "tracks": playlist.track_count,
                        "id": playlist._id
                    });

                    _this.lists["playlist-" + playlist._id] = new UserPlayList(player.listController, playlist.name);
                    _this.lists["playlist-" + playlist._id].id = playlist._id

                    _this.ui_add_to_lists.append('<div class="add_to_button" data-list-id="' + playlist._id + '">' + playlist.name + '</div>');
                }
                if (data["mylists"].length == 0) {
                    _this.ui_add_to_lists.html("<span class='add_to_block'>Playlists missing. Add them to the appropriate section.</span>");
                }
                else {
                    _this.ui_myplaylists_sidebar.html(my_html);
                }
                _this.ui_playlists_new_sidebar.html(html_new);
                _this.ui_playlists_hot_sidebar.html(html_hot);
                _this.ui_playlists_trending_sidebar.html(html_trending);
                _this.ui_playlists_myprofile_sidebar.html(html_myprofile);
            } else {
                _this.ui_myplaylists_sidebar.html("Error loading");
                _this.ui_playlists_new_sidebar.html("Error loading");
                _this.ui_playlists_hot_sidebar.html("Error loading");
                _this.ui_playlists_trending_sidebar.html("Error loading");
                _this.ui_playlists_myprofile_sidebar.html("Error loading");
            }
        },
        beforeSend: function() {
            _this.ui_myplaylists_sidebar.html("");
            _this.ui_playlists_new_sidebar.html("");
            _this.ui_playlists_hot_sidebar.html("");
            _this.ui_playlists_trending_sidebar.html("");
            _this.ui_playlists_myprofile_sidebar.html("");
        },
        error: function () {
            _this.ui_myplaylists_sidebar.html("Error loading");
            _this.ui_playlists_new_sidebar.html("Error loading");
            _this.ui_playlists_hot_sidebar.html("Error loading");
            _this.ui_playlists_trending_sidebar.html("Error loading");
            _this.ui_playlists_myprofile_sidebar.html("Error loading");
        }
    });
};

// Load list of playlists that you created
PlaylistsGui.prototype.loadProfile = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/profile",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var html_profile = "";
                var user_name = "";
                for (var i = 0; i < data["lists_profile"].length; i++) {
                    var playlists = data["lists_profile"][i];
                    if (i == 0) {
                        user_name += Mustache.to_html(_this.playlist_username_template, {
                            "pos": playlists.owner
                        });
                    }
                }
                for (var i = 0; i < data["lists_profile"].length; i++) {
                    var playlist = data["lists_profile"][i];
                    html_profile += Mustache.to_html(_this.playlist_profile_template, {
                        "title": playlist.name,
                        "description": playlist.dsc,
                        "tracks": playlist.track_count,
                        "id": playlist._id,
                        "like": playlist.upvote,
                        "dislike": playlist.downvote,
                        "creator": playlist.owner
                    });
                    
                    _this.lists["playlist-" + playlist._id] = new UserPlayList(player.listController, playlist.name);
                    _this.lists["playlist-" + playlist._id].id = playlist._id
                }
                _this.ui_playlists_profile_sidebar.html(html_profile);
            } else {
                _this.ui_playlists_profile_sidebar.html("Error loading");
            }
        },
        beforeSend: function() {
            _this.ui_playlists_profile_sidebar.html("");
        },
        error: function () {
            _this.ui_playlists_profile_sidebar.html("Error loading");
        }
    });
  }
};


// Load list of playlists that you created
PlaylistsGui.prototype.loadRank = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/getRank",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var rankings = ""
                var ranking = data["ranked"][0];
                rankings += Mustache.to_html(_this.username_rank_template, {
                    "ranker": ranking.ranks
                });
                _this.ui_username_rank.html(rankings);
            } else {
                _this.ui_username_rank.html("<p style=font-size:14px;color:#777777;margin:0px;padding-left:26px;padding-top:12px;padding-bottom:12px;>REP POINTS&nbsp;<font style=color:white;> 0</font></p>");
            }
        },
        beforeSend: function() {
            _this.ui_username_rank.html("");
        },
        error: function () {
            _this.ui_username_rank.html("Error loading");
        }
    });
  }
};

// Load list of playlists that you created
PlaylistsGui.prototype.loadProfiles = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/getProfile",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var profiles = ""
                var profile = data["profiled"][0];
                profiles += Mustache.to_html(_this.username_profile_template, {
                    "profile_artists": profile.artists,
                    "profile_genres": profile.genres,
                    "profile_concerts": profile.concerts
                });
                _this.ui_username_profile.html(profiles);
            } else {
                _this.ui_username_profile.html("Empty");
            }
        },
        beforeSend: function() {
            _this.ui_username_profile.html("");
        },
        error: function () {
            _this.ui_username_profile.html("Error loading");
        }
    });
  }
};

// Load list of playlists that you created
PlaylistsGui.prototype.loadPicture = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/getPicture",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var images = ""
                var image = data["imaged"][0];
                images += Mustache.to_html(_this.username_picture_template, {
                    "imager": image.path
                });
                _this.ui_username_picture.html(images);
            } else {
                _this.ui_username_picture.html("Empty");
            }
        },
        beforeSend: function() {
            _this.ui_username_picture.html("");
        },
        error: function () {
            _this.ui_username_picture.html("Error loading");
        }
    });
  }
};

// Load songs from playlist that you clicked on
PlaylistsGui.prototype.loadPlaylist = function(id) {
    if (!id) return;
    var playlist = this.lists["playlist-" + id];
    if (!playlist) return;

    var _this = this;
    playlist.getList(function(playlist_object) {
        _this.ui_playlist_name.html(playlist_object.name);
        _this.shown_playlist_id = id;

        var html = "";
        for(var i = 0; i < playlist_object.list.length; i++) {
            var track = playlist_object.list[i];
            track.list = "playlist-" + id;
            html += gui.list_gui.trackHtml(track, {
                "show_deletetrack": true,
                "show_sort": true,
                "list": "playlist-" + _this.shown_playlist_id
            });
        }
        _this.ui_playlist_tracks.html(html);
        _this.ui_playlist_add_to_now.show();
        _this.ui_playlist_buttons.show();
    });
};

// Add song to now playing list
PlaylistsGui.prototype.addToNowplayingList = function() {
    var list_object = gui.playlists_gui.lists["playlist-" + gui.playlists_gui.shown_playlist_id];
    player.listController.addToNowplayingList(list_object);
};

// Search query gives list of tracks
PlaylistsGui.prototype.showList = function(list_object) {
    gui.playlists_gui.lists["search_list"] = list_object;

    var tracklist = list_object.list;
    var html = "";
    for (var i = 0; i < tracklist.length; i++) {
        html += gui.list_gui.trackHtml(tracklist[i], {
            "show_deletetrack": list_object.show_deletetrack,
            "list": "search_list"
        });
    }

    gui.playlists_gui.ui_track_list.html(html);
};

// Search query in browser
PlaylistsGui.prototype.search = function(query, artist_only) {
    query = query || this.ui_searchbox.val();
    if (!query) return;
    if (artist_only) {
        this.ui_checkbox_artist.attr("checked", "checked");
    }
    this.ui_searchbox.val(query);
    this.ui_lists.hide();
    this.ui_search_list_buttons.show();
    var _this = this;
    var search_list = player.searchController.musicSearch(query);
    search_list.getList(function(list_object) {
        if (_this.ui_checkbox_artist.is(':checked')) {
            player.listController.applyDoublesFilter(list_object);
        }
        if (_this.ui_checkbox_artist.is(':checked')) {
            player.listController.applyArtistFilter(list_object);
        }
        _this.showList(list_object);
    });

    setTimeout(function() {
        gui.changeHash("#music:" + query.replace(" ", "+"));
    }, 0);
};