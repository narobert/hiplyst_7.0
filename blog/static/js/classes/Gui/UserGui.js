function UserGui() {

    this.ui_searchbox = $("#user-search");

    this.user_list_template = '<li data-tpe="{{{data-tpe}}}" data-id="{{{data-id}}}">' +
        '<div class="item">' +
            '<span onclick="gui.user_gui.search(\'{{name}}\');">{{name}}</span>' +
            '{{#remove}} <small class="search_saved-delete" data-id="{{{id}}}">x</small>{{/remove}}' +
            '<br />' +
            '<small>{{date}}</small>' +
        '</div></li>';
}

// Allows search from profile page
UserGui.prototype.search = function(query) {
    query = query || this.ui_searchbox.val();
    if (!query) return;
    gui.playlists_gui.search(query);
};







