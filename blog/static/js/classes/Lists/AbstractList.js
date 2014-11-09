function TrackOverflow() {}

function AbstractList(controller) {
    this.controller = controller;
    this.current_index = 0;         
    this.list = [];                
    this.is_deletable = false;      
    this.is_addable = false;        
    this.is_label = false;          
    this.is_getmore = false;        
    this.show_albums = true;        
    this.show_header = true;        
    this.show_deletetrack = true;   
    this.refreshFix = false;        
    this.id = "";                   
    this.label = "";
    this.name = "Dummy";
}

AbstractList.globalId = 0;

AbstractList.prototype.getList = function(successCallback) {
    successCallback(this.list);
};

// Plays track
AbstractList.prototype.getTrack = function(index) {
    if ((index < 0) || (index > this.list.length)) {
        throw new TrackOverflow();
    }
    this.current_index = index;
    return this.list[index];
};

// Gets next track in playlist
AbstractList.prototype.getNext = function() {
    if (this.current_index >= this.list.length) {
        throw new TrackOverflow();
    }
    this.current_index += 1;
    return this.list[this.current_index];
};

// Gets previous track in playlist
AbstractList.prototype.getPrev = function() {
    if (this.current_index == 0) {
        throw new TrackOverflow();
    }
    this.current_index -= 1;
    return this.list[this.current_index];
};

// Plays track
AbstractList.prototype.getById = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if (this.list[i].id === id) {
            return this.getTrack(i);
        }
    }
    return false;
};

// Adds a track to the playlist
AbstractList.prototype.pushAll = function(tracks) {
    return false;
};

// List of tracks from search query
AbstractList.prototype.removeByIndex = function(index) {
    if ((this.current_index < 0) || (this.current_index > this.list.length)) {
        return false;
    }
    this.list.splice(index, 1);
    return true;
};

AbstractList.prototype.removeById = function(id) {
    for(var i = 0; i < this.list.length; i++) {
        if (this.list[i].id === id) {
            this.list.splice(i, 1);
            return true;
        }
    }
    return false;
};
