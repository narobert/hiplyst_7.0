function ScrobblerController(player) {
    this.player = player;
    this.events = {};
}

// Left starting time of song
ScrobblerController.prototype.handleEvent = function(event) {
    try {
        this["on" + event]();
    } catch(e) {
        return false;
    }
};
