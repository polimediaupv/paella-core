
export default class AudioTrackData {
    constructor({
        id, 
        name,
        groupId = "", 
        language = ""
    }) {
        this._id = id;
        this._name = name;
        this._groupId = groupId;
        this._lang = language;
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
}
