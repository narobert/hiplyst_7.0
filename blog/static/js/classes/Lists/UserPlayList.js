function UserPlayList(controller, name) {
    AbstractList.call(this);
    this.controller = controller || {};
    this.list = [];
    this.is_deletable = true;
    this.is_addable = true;
    this.is_label = true;
    this.show_albums = false;
    this.show_header = true;
    this.show_deletetrack = true;
    this.label = "0";
    this.id = "";
    this.name = name || "Unnamed";
}

extend(UserPlayList, AbstractList);

// Shows tracks of playlist
UserPlayList.prototype.getList = function(successCallback) {

    var _this = this;
    if (!_this.id) return;

    $.ajax({
        url: "/ajax/playlist/get",
        type: "POST",
        data: ({ id: _this.id }),
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                var ids = data.list.tracks.join(",");

                _this.controller.player.searchController.searchByIds(ids, function(new_list) {
                    _this.list = new_list;
                    successCallback(_this);
                });
            } else {
                alert(data["message"]);
            }
        },
        error: function () {
        }
    });
};

// Adds a track to playlist
UserPlayList.prototype.pushRaw = function(tracks_ids) {
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/add",
        data: ({
            id: _this.id,
            tracks: JSON.stringify(tracks_ids)
        }),
        type: "POST",
        dataType: "json",
        success: function(data) {}
    });
};

// Removes a track from playlist
UserPlayList.prototype.removeById = function(track_id) {
    if (!track_id) return;
    var _this = this;
    $.ajax({
        url: "/ajax/playlist/delete",
        data: ({
            playlist_id: _this.id,
            track_id: track_id
        }),
        type: "POST",
        dataType: "json",
        success: function(data) {
            if (data["status"] == "OK") {
                for(var i = 0; i < _this.list.length; i++) {
                    if (_this.list[i].id === track_id) _this.list.splice(i, 1);
                }
            } else {
                alert(data["message"]);
            }
        }
    });
    return true;
};

// Removes a track from playlist
UserPlayList.prototype.removeByIndex = function(index) {
    var track_id = this.list[index].id;
    return this.removeById(track_id);
};
