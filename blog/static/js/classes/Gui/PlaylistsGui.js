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
    this.ui_playlist_username = $(".sidebar_view-username");
    this.ui_playlist_user = $("#user");
   
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
        '<div class="sidebar_view-username" data-id="{{id}}"><div class="row"><div class="span1" style="width:35px;"><img style="width:32px;height:32px;border-radius:3px;" src="media/{{image}}"></div><div class="span1" style="width:100px;margin-left:8px;margin-top:-3px;"><p>{{creator}}</p><p style="margin-top:-14px;color:#777777;">{{location}}</p></div></div></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><div class="row"><div class="span1" style="width:5px;"><div id=button_upvote{{id}}></div></div><div class="span1" style="width:30px;"><p style="margin-top:5px;">{{like}}</p></div></div></div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><div class="row"><div class="span1" style="width:5px;"><div id=button_downvote{{id}}></div></div><div class="span1" style="width:30px;"><p style="margin-top:5px;">{{dislike}}</p></div></div></div>' +
    '</div>';
    this.playlist_hot_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><div class="row"><div class="span1" style="width:35px;"><img style="width:32px;height:32px;border-radius:3px;" src="media/{{image}}"></div><div class="span1" style="width:100px;margin-left:8px;margin-top:-3px;"><p>{{creator}}</p><p style="margin-top:-14px;color:#777777;">{{location}}</p></div></div></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><div class="row"><div class="span1" style="width:5px;"><div id=button_upvote{{id}}></div></div><div class="span1" style="width:30px;"><p style="margin-top:5px;">{{like}}</p></div></div></div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><div class="row"><div class="span1" style="width:5px;"><div id=button_downvote{{id}}></div></div><div class="span1" style="width:30px;"><p style="margin-top:5px;">{{dislike}}</p></div></div></div>' +
    '</div>';
    this.playlist_trending_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><div class="row"><div class="span1" style="width:35px;"><img style="width:32px;height:32px;border-radius:3px;" src="media/{{image}}"></div><div class="span1" style="width:100px;margin-left:8px;margin-top:-3px;"><p>{{creator}}</p><p style="margin-top:-14px;color:#777777;">{{location}}</p></div></div></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;"><div class="row"><div class="span1" style="width:5px;"><div id=button_upvote{{id}}></div></div><div class="span1" style="width:30px;"><p style="margin-top:5px;">{{like}}</p></div></div></div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;"><div class="row"><div class="span1" style="width:5px;"><div id=button_downvote{{id}}></div></div><div class="span1" style="width:30px;"><p style="margin-top:5px;">{{dislike}}</p></div></div></div>' +
    '</div>';
    this.username_profile_template = '<p>FAVORITE ARTISTS <font style="color:#cccccc;">{{profile_artists}}</font></p>' +
        '<p>FAVORITE GENRES <font style="color:#cccccc;">{{profile_genres}}</font></p>' +
        '<p>UPLOADED LYRICS <font style="color:#cccccc;">no</font></p>' +
        '<p>UPLOADED ALBUM ART <font style="color:#cccccc;">no</font></p>';
    this.username_picture_template = '<div class="span3" style="width:260px;><img class="photo" src="/media/{{imager}}"></div>';
    this.username_rank_template = '<p>RANK <font style="color:#cccccc;">{{ranker}}</font></p>';
    this.playlist_username_template = '<h4><font style="color:#cccccc;">{{pos}}</font></h4>';
    this.playlist_profile_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><div class="row"><div class="span1" style="width:35px;"><img style="width:32px;height:32px;border-radius:3px;" src="media/{{image}}"></div><div class="span1" style="width:100px;margin-left:8px;margin-top:-3px;"><p>{{creator}}</p><p style="margin-top:-14px;color:#777777;">{{location}}</p></div></div></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;">{{like}}</div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;">{{dislike}}</div>' +
    '</div>';
    this.playlist_myprofile_template = '<div class="sidebar_view-item">' +
        '<div class="sidebar_view-title" data-id="{{id}}"><p>{{title}}</p></div>' +
        '<div class="sidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="sidebar_view-dsc" data-id="{{id}}">{{description}}</div>' +
        '<div class="sidebar_view-username" data-id="{{id}}"><div class="row"><div class="span1" style="width:35px;"><img style="width:32px;height:32px;border-radius:3px;" src="media/{{image}}"></div><div class="span1" style="width:100px;margin-left:8px;margin-top:-3px;"><p>{{creator}}</p><p style="margin-top:-14px;color:#777777;">{{location}}</p></div></div></div>' +
        '<div style="margin-left:750px;position:absolute;font-size:12px;">{{like}}</div>' +
        '<div style="margin-left:825px;position:absolute;font-size:12px;">{{dislike}}</div>' +
    '</div>';
    this.myplaylist_template = '<div class="mysidebar_view-item">' +
        '<div class="mysidebar_view-title" data-id="{{id}}">{{title}}</div>' +
        '<div class="mysidebar_view-subtitle">{{tracks}} songs</div>' +
        '<div class="mysidebar_view-buttons delete_playlist" data-id="{{id}}"><img src="/images/icons/delete_circle.png"></div>' +
    '</div>';

    var _this = this;
    this.ui_playlist_handler.live("click", function() {
        _this.loadPlaylist($(this).attr("data-id"));
        _this.loadPlaylistInfo($(this).attr("data-id"));
        _this.loadComments($(this).attr("data-id"));
        $('.types').css("display", "none");
        $('.home_info').css("display", "none");
        $('.playlist_view').css("display", "block");
        $('.search_view').css("display", "none");
        $('.user_playlists').css("display", "none");
        $('.profile_info').css("display", "none");
    });

    var _this = this;
    this.ui_myplaylist_handler.live("click", function() {
        _this.loadPlaylist($(this).attr("data-id"));
        _this.loadPlaylistInfo($(this).attr("data-id"));
        _this.loadComments($(this).attr("data-id"));
        $('.types').css("display", "none");
        $('.home_info').css("display", "none");
        $('.playlist_view').css("display", "block");
        $('.search_view').css("display", "none");
        $('.user_playlists').css("display", "none");
        $('.profile_info').css("display", "none");
    });

    var _this = this;
    this.ui_playlist_username.live("click", function() {
        _this.loadProfile($(this).attr("data-id"));
        _this.loadRank($(this).attr("data-id"));
        _this.loadPicture($(this).attr("data-id"));
        _this.loadProfiles($(this).attr("data-id"));
        gui.activateTab('profile');
        $('.types').css("display", "none");
        $('.playlist_view').css("display", "none");
        $('.search_view').css("display", "none");
        $('.user_playlists').css("display", "block");
        $('.profile_info').css("display", "block");
    });

    var _this = this;
    this.ui_playlist_user.live("click", function() {
        _this.loadProfile($(this).attr("data-id"));
        _this.loadRank($(this).attr("data-id"));
        _this.loadPicture($(this).attr("data-id"));
        _this.loadProfiles($(this).attr("data-id"));
        gui.activateTab('profile');
        $('.types').css("display", "none");
        $('.playlist_view').css("display", "none");
        $('.search_view').css("display", "none");
        $('.user_playlists').css("display", "block");
        $('.profile_info').css("display", "block");
    });

    this.loadPlaylists();
}

// Load everything
PlaylistsGui.prototype.load = function() {
    this.loadPlaylists();
    this.ui_playlist_tracks.html("");
    this.ui_playlist_name.html("");
    this.ui_playlist_add_to_now.hide();
    $('.types').css("display", "block");
    $('.home_info').css("display", "block");
    $('.playlist_view').css("display", "none");
    $('.search_view').css("display", "none");
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
                        "creator": playlist.owner,
                        "image": playlist.image,
                        "location": playlist.location
                    });

                    _this.viewButtons(playlist._id);
                    
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
                        "creator": playlist.owner,
                        "image": playlist.image,
                        "location": playlist.location
                    });

                    _this.viewButtons(playlist._id);
                    
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
                        "creator": playlist.owner,
                        "image": playlist.image,
                        "location": playlist.location
                    });

                    _this.viewButtons(playlist._id);
                    
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
                        "creator": playlist.owner,
                        "image": playlist.image,
                        "location": playlist.location
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

PlaylistsGui.prototype.viewButtons = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/viewButtons",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
              var upvotes = data["upvote"][0];
              var upvote_color = upvotes.button_color;
              var downvotes = data["downvote"][0];
              var downvote_color = downvotes.button_color;
              $('#button_upvote' + id + '').html("<button id=like data-id=" + id + " style=margin-top:7px;margin-left:-15px;background:" + upvote_color + "; class=btn-small><img style=margin-top:4px;opacity:0.8; src=/images/fire_white.png></button>");
              $('#button_downvote' + id + '').html("<button id=dislike data-id=" + id + " style=margin-top:7px;margin-left:-15px;background:" + downvote_color + "; class=btn-small><img style=margin-top:4px;opacity:0.8; src=/images/water_white.png></button>");
            } else {
              $('#button_upvote').html("No buttons");
              $('#button_downvote').html("No buttons");
            }
        },
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
                    "profile_genres": profile.genres
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
                "list": "playlist-" + _this.shown_playlist_id,
                "position": i+1
            });
        }
        _this.ui_playlist_tracks.html(html);
        _this.ui_playlist_add_to_now.show();
        _this.ui_playlist_buttons.show();
    });
};

// Load songs from playlist that you clicked on
PlaylistsGui.prototype.loadComments = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/getComments",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var comments = "";
                for (var i = 0; i < data["commented"].length; i++) {
                    var comment = data["commented"][i];
                    var comment_user = comment.user;
                    var comment_title = comment.title;
                    var comment_id = comment.id;
                    var comment_userid = comment.id_user;
                    var comment_image = comment.image;
                    comments += "<div class=row><div class=span1 style=width:70px;><img class=photo_smaller src=/media/" + comment_image + "></img></div><div class='span2 comment1' style=margin-left:0px;><a id=user data-id=" + comment_userid + ">" + comment_user + "</a><p class=comment2>" + comment_title + "</p></div></div>";
                }
                $('#comment_playlist').html(comments);
            }
        },
    });
  }
};

// Load songs from playlist that you clicked on
PlaylistsGui.prototype.loadPlaylistInfo = function(id) {
  if (id) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/playlistInfo",
        data: ({ id: id }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var playlist = data["playlists"][0];
                var upvote = data["upvotes"][0];
                var downvote = data["downvotes"][0];
                var title = playlist.name;
                var picture = playlist.picture;
                var tracks = playlist.track_count;
                var description = playlist.dsc;
                var upvotes = playlist.upvote;
                var downvotes = playlist.downvote;
                var creator = playlist.owner;
                var upvote_color = upvote.button_color;
                var downvote_color = downvote.button_color;
                $('#playlist_info').html("<div class=row><div class=span3 style=width:280px;><div class=wrap><img class=photo src=/media/" + picture + "><center><form class=upload data-id=" + id + " id=repic method=POST enctype=multipart/form-data action=/ajax/playlist/addPlaylistImage/" + id + "><br><br><input type=file name=image style=margin-left:25px;><button class=playlist-button>Submit</button></center></form></div></div><div class=span2 style=width:350px;margin-left:-20px;><h4><font style=color:#cccccc;>" + title + "</font></h4><p>CREATED BY <font style=color:#cccccc;>" + creator + "</font></p><p>SONGS <font style=color:#cccccc;>" + tracks + "</font></p><p>DESCRIPTION <font style=color:#cccccc;>" + description + "</font></p><p>FIRES <font style=color:#cccccc;>" + upvotes + "</font></p><p>BURIES <font style=color:#cccccc;>" + downvotes + "</font></p></div><div class=span1 style=width:50px;><button id=like data-id=" + id + " style=background:" + upvote_color + "; class=btn-small><img style=margin-top:4px;opacity:0.8; src=/images/fire_white.png></button></div><div class=span1 style=margin-left:5px;><button id=dislike data-id=" + id + " style=background:" + downvote_color + "; class=btn-small><img style=margin-top:4px;opacity:0.8; src=/images/water_white.png></button></div></div>");
                $('#playlist_id').html("<form data-id=" + id + " id=refresh method=POST action=/ajax/playlist/addComment/" + id + "><input type=text placeholder='Write a comment' name=comment style=background:black;color:#cccccc;height:32px;width:829px;padding-left:10px;><button class=comment-button>Submit</button></form>");
            }
        },
    });
  }
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
            "list": "search_list",
            "position": i+1
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
