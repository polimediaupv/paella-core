import Plugin from './Plugin';

export default class UserInterfacePlugin extends Plugin {
    constructor(player,config,name) {
        super(player,config,name);
        this.__uiPlugin = true;
    }

    async getDictionaries() {
        return null;
    }
}