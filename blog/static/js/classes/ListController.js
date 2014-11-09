function ListController(player) {

    this.player = player;
    this.shown_list = false;
    this.update_list_interval = undefined;

    this.nowplaying = new NowPlayingList(this);

    this.lists = { "nowplaying": null,
                   "recent_searches": null,
                   "searches": null,
                   "playlists": null,
        
                   "radios":
                        { "title": "Top radio", "items": [] }
    };
}

// Left starting time of song
ListController.prototype.handleEvent = function(event) {
    try {
        this["on" + event]();
    } catch(e) {
        return false;
    }
};

// Not sure
ListController.prototype.loadVkAudio = function(items) {
    var _this = this;
    setTimeout(function () {
        _this.getListByName("other", "my_vk").getList(gui.playlists_gui.updateVk);
    }, 0);
};

// Replace current now playing list with new playlist
ListController.prototype.replaceNowplayingList = function(list_object) {
    this.nowplaying.list = list_object.list;
    this.nowplaying.current_index = list_object.current_index;
    gui.list_gui.updateNowplayingList(this.nowplaying);
};

// Add playlist to now playing list
ListController.prototype.addToNowplayingList = function(list_object) {
    this.nowplaying.list = this.nowplaying.list.concat(list_object.list);
    gui.list_gui.updateNowplayingList(this.nowplaying);
};

// Not sure
ListController.prototype.getListByName = function(type, name) {
    if (!type) return [];
    if (!name) {
        return this.lists[type];
    } else {
        return this.lists[type]["items"][name];
    }
};

// Makes first track in playlist play again
ListController.prototype.getFirstTrack = function() {
    if (this.nowplaying.length == 0) {
        return false;
    }

    return this.nowplaying.getTrack(0);
};

// Makes next track show up in bar
ListController.prototype.getNextTrack = function() {
    if (this.nowplaying.length == 0) {
        return false;
    }

    try {
        return this.nowplaying.getNext();
    } catch (e) {
        return false;
    }
};

// Makes current track show up in bar
ListController.prototype.getPreviousTrack = function() {
    if (this.nowplaying.length == 0) {
        return false;
    }

    try {
        return this.nowplaying.getPrev();
    } catch (e) {
        return false;
    }
};

// Create playlist
ListController.prototype.createPlaylist = function(name, dsc) {
    if (name && dsc) {
        var _this = this;
        $.ajax({
            url: "/ajax/playlist/new",
            data: ({ name: name, dsc: dsc }),
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data["status"] == "OK") {
                    gui.playlists_gui.loadPlaylists();
                    _this.player.fireEvent("PlaylistCreated");
                } else {
                    _this.player.fireEvent("PlayistCreateError");
                }
            },
            error: function () {
                _this.player.fireEvent("PlayistCreateError");
            }
        });
    }
};

// Remove playlist
ListController.prototype.removePlaylist = function(id) {
    if (id) {
        var _this = this;
        $.ajax({
            url: "/ajax/playlist/remove",
            data: ({ id: id }),
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data["status"] == "OK") {
                    gui.playlists_gui.loadPlaylists();
                    _this.player.fireEvent("PlaylistRemoved");
                } else {
                    _this.player.fireEvent("PlayistRemoveError");
                }
            },
            error: function () {
                _this.player.fireEvent("PlayistRemoveError");
            }
        });
    }
};

// Like playlist
ListController.prototype.likePlaylist = function(id) {
    if (id) {
        var _this = this;
        $.ajax({
            url: "/ajax/playlist/upvote",
            data: ({ id: id }),
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data["status"] == "OK") {
                    gui.playlists_gui.loadPlaylists();
                    _this.player.fireEvent("PlaylistLiked");
                } else {
                    _this.player.fireEvent("PlayistLikeError");
                }
            },
            error: function () {
                _this.player.fireEvent("PlayistLikeError");
            }
        });
    }
};

// Dislike playlist
ListController.prototype.dislikePlaylist = function(id) {
    if (id) {
        var _this = this;
        $.ajax({
            url: "/ajax/playlist/downvote",
            data: ({ id: id }),
            type: "POST",
            dataType: "json",
            success: function(data) {
                if (data["status"] == "OK") {
                    gui.playlists_gui.loadPlaylists();
                    _this.player.fireEvent("PlaylistDisliked");
                } else {
                    _this.player.fireEvent("PlayistDislikeError");
                }
            },
            error: function () {
                _this.player.fireEvent("PlayistDislikeError");
            }
        });
    }
};

// Add song to playlist
ListController.prototype.addToLists = function(list_name, list_object) {
    this.lists[list_name].items[list_object.id] = list_object;
};

// Add song to playlist
ListController.prototype.addTo = function(type, id, track) {
    return this.lists[type].items[id].push(track);
};

// Necessary for query to show up
ListController.prototype.applyFilter = function(list_object, filter) {
    var i = 0;
    while (i < list_object.list.length) {
        if (!filter.isApproved(list_object.list[i])) {
            list_object.removeByIndex(i);
        } else {
            i++;
        }
    }
};

// Necessary for query to show up
ListController.prototype.applyDoublesFilter = function(list_object) {
    this.applyFilter(list_object, new FilterDoubles());
};

// Necessary for query to show up
ListController.prototype.applyArtistFilter = function(list_object) {
    var artist = gui.ui_search.val();
    this.applyFilter(list_object, new FilterArtist(artist));
};

// Necessary for query to show up
ListController.prototype.applyTitleFilter = function(list_object) {
    var title = gui.ui_search.val();
    this.applyFilter(list_object, new FilterTitle(title));
};

// Shuffle bar
ListController.prototype.shuffle = function() {
    this.nowplaying.list.sort(function (a, b) {
        var max = 1;
        var min = -1;
        return Math.floor(Math.random() * (max - min + 1)) + min;
    });
    this.nowplaying.current_index = 0;
    gui.list_gui.updateNowplayingList(this.nowplaying);
};
