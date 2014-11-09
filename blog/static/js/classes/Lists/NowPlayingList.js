// Might need to use this more (github)
function NowPlayingList(controller, by_list_object) {
    AbstractList.call(this);
    this.controller = controller || {};
    this.current_index = by_list_object ? by_list_object.current_index : 0;
    this.list = by_list_object ? by_list_object.list : [];
    this.is_deletable = false;
    this.is_addable = false;
    this.is_label = false;
    this.show_albums = true;
    this.show_header = true;
    this.show_deletetrack = true;
    this.is_getmore = false;
}

extend(NowPlayingList, AbstractList);









