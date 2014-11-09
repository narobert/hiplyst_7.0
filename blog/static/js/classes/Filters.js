function FilterDoubles() {
    this.list = [];
}

// Search for artists or songs
FilterDoubles.prototype.isApproved = function(track) {
    if (!track) return false;
    for (var i = 0; i < this.list.length; i++) {
        if ((this.list[i].artist.toLowerCase() == track.artist.toLowerCase()) &&
            (this.list[i].title.toLowerCase() == track.title.toLowerCase())) {
            return false;
        }
    }
    this.list.push(track);
    return true;
};

// Search for artists
function FilterArtist(artist) {
    this.artist = artist.toLowerCase() || "";
}

// Search for artists
FilterArtist.prototype.isApproved = function(track) {
    if (!track) return false;
    return track.artist.toLowerCase() == this.artist;
};

// Search for songs
function FilterTitle(title) {
    this.title = title.toLowerCase() || "";
}

// Search for songs
FilterTitle.prototype.isApproved = function(track) {
    if (!track) return false;
    return track.title.toLowerCase().indexOf(this.title) + 1;
};
