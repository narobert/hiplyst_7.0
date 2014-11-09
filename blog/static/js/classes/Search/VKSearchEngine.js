function VKSearchEngine(controller, activateCallback) {
    AbstractSearchEngine.call(this);
    this.controller = controller;
    this.now_offset = 0;
    this.id = 0;
    this.is_activated = false;
    this.access_token = $("#access_token").html();

    VK.init({
        apiId: 1934554
    });

    var _this = this;
    VK.Auth.getLoginStatus(function (r) {
        if (r.session) {
            _this.is_activated = true;
            _this.id = r.session["mid"];
        } else {
            _this.is_activated = false;
            _this.id = 0;
        }
        if (activateCallback) activateCallback(_this);
    });
}

extend(VKSearchEngine, AbstractSearchEngine);

// Music is not being played
VKSearchEngine.prototype.sendBadToken = function() {
    var _this = this;
    $.ajax({
        url: "/ajax/report_bad_token/",
        type: "POST",
        data: { "token": _this.access_token },
        dataType: "json",
        success: function(data) {
            if (data.new_token) {
                _this.access_token = data.new_token;
            }
        },
        error: function () {}
    });
};

// Applies filters to tracks
VKSearchEngine.prototype.filter = function(track) {

    track.artist = track.artist.replace(new RegExp("(http://[^ ]+)", 'g'), "");
    track.title = track.title.replace(new RegExp("(http://[^ ]+)", 'g'), "");

    track.artist = track.artist.replace(new RegExp("(id[0-9]+)", 'g'), "");
    track.title = track.title.replace(new RegExp("(id[0-9]+)", 'g'), "");

    track.artist = track.artist.replace(new RegExp("&#39;", 'g'), "'");
    track.title = track.title.replace(new RegExp("&#39;", 'g'), "'");

    track.artist = track.artist.trim().substring(0, 24);
    track.title = track.title.trim().substring(0, 26);
    
    return track;
};

// Returns track
VKSearchEngine.prototype.getTrackFromResponse = function(r) {
    var track = new Track();
    track.owner_id = r.owner_id;
    track.aid = r.aid;
    track.id = track.owner_id + '_' + track.aid;
    track.url = r.url;
    track.artist = r.artist;
    track.title = r.title;
    track.duration_ms = r.duration;
    track.duration = timeFormat(r.duration * 1000);
    track = this.filter(track);
    return track;
};

// Returns a list of tracks from search query
VKSearchEngine.prototype.search = function(query, offset, count, successCallback) {
    var results = [];
    var _this = this;
    offset = offset || 0;
    count = count || 200;
    query = query.replace(new RegExp("<",'g'), "").replace(new RegExp(">",'g'), "");

    $.ajax({
        url: "https://api.vkontakte.ru/method/audio.search?q="+query+"&offset="+offset+"&count="+count+"&access_token="+this.access_token+"&callback=callbackFunc",
        dataType: 'jsonp',
        success: function(r) {
            if (r.error && r.error.error_code == 5) _this.sendBadToken();
            for (var i = 1; i < r.response.length; i++) {
                results.push(_this.getTrackFromResponse(r.response[i]));
            }
            if (successCallback) successCallback(results);
        },
    });
    return true;
};

// Returns a list of tracks from playlist
VKSearchEngine.prototype.searchByIds = function(ids, successCallback) {

    var results = [];
    var _this = this;
    var id_str = typeof(ids) == "string" ? ids : ids.join(",");

    $.ajax({
        url: "https://api.vkontakte.ru/method/audio.getById?audios="+id_str+"&access_token="+this.access_token+"&callback=callbackFunc",
        dataType: 'jsonp',
        success: function(r) {
            if (r.error && r.error.error_code == 5) _this.sendBadToken();
            for (var i = 0; i < r.response.length; i++) {
                results.push(_this.getTrackFromResponse(r.response[i]));
            }
            if (successCallback) successCallback(results);
        },
    });
    return true;
};
