function Player() {
    this.last_fm_id = "9530d1e6f1d1b81032f024e99d8771b9";
    
    try {
        this.storage = window.localStorage || window.globalStorage[document.domain];
    } catch(e) {
        this.storage = {};
    }

    soundManager.url = '/swf/';
    soundManager.debugMode = false;
    soundManager.flashVersion = 9; // optional: shiny features (default = 8)
    soundManager.useFlashBlock = true; // optionally, enable when you're ready to dive in
    soundManager.useHTML5Audio = true; // enable HTML5 audio support, if you're feeling adventurous.
    soundManager.useHighPerformance = true;

    soundManager.onready(function() {
        if (!soundManager.supported()) {
            gui.showUnsupported();
        }
    });

    this.eventListeners = {};

    this.listController = new ListController(this);
    this.playbackController = new PlaybackController(this);
    this.searchController = new SearchController(this);
    this.scrobblerController = new ScrobblerController(this);

    this.eventListeners = {
        "TrackPlay": [ this.listController, this.scrobblerController ],
        "TrackJustBeforeFinish": [ this.scrobblerController ],
        "NoSidebarInfo": [ this.searchController ],
        "Search": []
    };
}

// Left starting time of song
Player.prototype.addEventListener = function(event, listener) {
    if (!this.eventListeners[event]) {
        this.eventListeners[event] = [];
    }
    this.eventListeners[event].push(listener);
};

// Left starting time of song
Player.prototype.removeEventListener = function(event, listener) {
      this.eventListeners[event].splice(this.eventListeners[event].indexOf(listener), 1);
};

// Left starting time of song
Player.prototype.fireEvent = function(event) {
    if (this.eventListeners[event]) {
        for(var i = 0; i < this.eventListeners[event].length; i++) {
            this.eventListeners[event][i].handleEvent(event);
        }
    }
};
