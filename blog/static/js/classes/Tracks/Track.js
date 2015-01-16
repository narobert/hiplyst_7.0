function Track() {
    this.owner_id = "";
    this.aid = "";
    this.id = "";
    this.url = "";
    this.artist = "Unknown Artist";
    this.title = "Unknown Track";
    this.duration = "00:00";
}

// Html for track
Track.template = '<div class="track" id="{{list}}_{{owner_id}}_{{aid}}" class="track" data-id="{{owner_id}}_{{aid}}" data-list="{{list}}" data-artist="{{artist}}" data-title="{{title}}" data-url="{{url}}">' +
    '<div class="track-edit"><input type="checkbox" /></div>' +
    '<div class="track-play"><img><span>{{position}}</span></div>' +
    '<div class="track-title">{{title}}</div>' +
    '<div class="track-artist">{{artist}}</div>' +
    '<div class="track-options">' +
    '{{#show_deletetrack}}<div class="track-delete" title="Remove"></div>{{/show_deletetrack}}' +
    '{{#show_sort}}<div class="track-sort" title="Sorting"></div>{{/show_sort}}' +
    '</div></div>';

// Plays song
Track.toClass = function(str) {
    return encodeURIComponent(str).replace(new RegExp("[%.!#\(\)]", 'g'), "").slice(0, 30);
};

// Search query
Track.prototype.dummy = function() {
    if (!this.dummy_track) {
        this.dummy_track = new Track();
    }
    return this.dummy_track;
};

// Click on playlist and tracks are displayed
Track.prototype.toDict = function() {
    return { "owner_id": this.owner_id, "aid": this.aid, "id": this.id,
             "url": this.url, "artist": this.artist,
             "title": this.title, "duration": this.duration }
};


