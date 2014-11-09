function AbstractSearchEngine() {}

AbstractSearchEngine.prototype.activate = function() {
    return true;
};

AbstractSearchEngine.prototype.filter = function(track) {
    return track;
};

AbstractSearchEngine.prototype.search = function(query) {
    return [];
};

AbstractSearchEngine.prototype.getById = function(id) {
    return [];
};

AbstractSearchEngine.prototype.getByName = function(artist, title) {
    return Track.dummy();
};
