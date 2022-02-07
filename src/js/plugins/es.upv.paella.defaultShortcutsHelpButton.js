import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import { translate } from 'paella-core/js/core/Localization';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

import KeyboardIcon from 'paella-core/icons/keyboard.svg';
import 'paella-core/styles/DefaultKeyShortcutsHelpButtonPlugin.css';

export default class DefaultKeyShortcutsHelpButtonPlugin extends PopUpButtonPlugin {
    async load() {
        this.icon = KeyboardIcon;
    }

    get popUpType() {
        return 'no-modal';
    }

    async getContent() {
        const content = createElementWithHtmlText(`
          <div class="DefaultKeyShortcutsHelpButton-plugin">
            <div class="row">
              <div class="description"> ${translate('Pause/Play.')} </div>
              <div class="key"> ${translate('Space / k')}</div>
            </div>
            <div class="row">
              <div class="description">${translate('Increase/Decrease volume 10%.')}</div>
              <div class="key"> ↑ / ↓ </div> 
            </div>          
            <div class="row">
              <div class="description">${translate('Mute audio.')}</div>
              <div class="key"> m </div>
            </div>          
            <div class="row">
              <div class="description">${translate('Toggle full screen.')}</div>
              <div class="key"> f </div>
            </div>          
            <div class="row">
              <div class="description">${translate('Close Pop Up.')}</div>
              <div class="key"> Esc </div> 
            </div>
  
            <div class="row">
              <div class="description">${translate('Seek backward 30 seconds.')}</div>
              <div class="key"> ← / j </div> 
            </div>
            <div class="row">
              <div class="description">${translate('Seek forward 30 seconds.')}</div>
              <div class="key"> → / l </div> 
            </div>
            <div class="row">
              <div class="description">${translate('Speed up/down the video playback rate.')}</div>
              <div class="key"> u / o </div> 
            </div>
            <div class="row">
              <div class="description">${translate('Activate/Deactivate closed captions and subtitles if available.')}</div>
              <div class="key"> c </div> 
            </div>  
          </div>
          `);

        return content;
    }
}