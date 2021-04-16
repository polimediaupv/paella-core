import MenuButtonPlugin from 'paella-core/js/core/MenuButtonPlugin';


import screenIcon from 'paella-core/icons/screen.svg';

export default class VideoContainerButtonPlugin extends MenuButtonPlugin {
    async load() {
        this.icon = screenIcon;
    }
}