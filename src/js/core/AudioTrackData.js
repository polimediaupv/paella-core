
export default class AudioTrackData {
    constructor({
        id, 
        name,
        groupId = "", 
        language = "",
        selected = false
    }) {
        this._id = id;
        this._name = name;
        this._groupId = groupId;
        this._lang = language;
        this._selected = selected;
    }

    get id() {
        return this._id;
    }

    get name() {
        return this._name;
    }

    get groupId() {
        return this._groupId;
    }

    get language() {
        return this._lang;
    }

    get selected() {
        return this._selected;
    }

    set selected(s) {
        this._selected = s;
    }
}
