import Plugin from './Plugin';

class UserInterfacePlugin extends Plugin {
    constructor(player,config,name) {
        super(player,config,name);
        this.__uiPlugin = true;
    }

    async getDictionaries() {
        return null;
    }
}

export default UserInterfacePlugin;