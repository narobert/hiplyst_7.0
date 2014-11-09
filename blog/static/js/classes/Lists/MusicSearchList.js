function MusicSearchList(controller, name) {
    AbstractList.call(this);
    this.controller = controller || {};
    this.list = [];
    this.is_deletable = true;
    this.is_addable = false;
    this.is_label = false;
    this.is_getmore = true;
    this.show_albums = true;
    this.show_header = true;
    this.show_deletetrack = true;
    this.id = AbstractList.globalId++;
    this.name = name || "Unnamed";
    this.offset = 0;
}

extend(MusicSearchList, AbstractList);

// Search query
MusicSearchList.prototype.getList = function(successCallback) {

    var _this = this;
    _this.list = [];

    this.controller.player.searchController.searchByQuery(this.name, function(new_list) {
        _this.list = _this.list.concat(new_list);
        successCallback(_this);

    });

    this.controller.player.searchController.searchByQueryWithOffset(this.name, 200, 400, function(new_list) {
        _this.list = _this.list.concat(new_list);
        successCallback(_this);
    });

    setTimeout(function() {
        gui.searchGui(_this.name);
    }, 0);

    $.ajax({
        url: "/ajax/searchhistory/add/",
        type: "POST",
        data: ({ query: _this.name }),
        dataType: "json",
        success: function(data) {
        },
        error: function () {
        }
    });
};

