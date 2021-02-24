
import PopUpButtonPlugin from 'paella-core/js/core/PopUpButtonPlugin';
import screenIcon from 'paella-core/icons/screen.svg';
import { createElementWithHtmlText } from 'paella-core/js/core/dom';

export default class TestPlugin extends PopUpButtonPlugin {
    get icon() { return screenIcon; }
    
    async getContent() {
        const content = createElementWithHtmlText(`
            <div>
                <h1>Pop Up Test</h1>
            </div>`);
        
        const button = createElementWithHtmlText('<button>Test Button</button>', content);
        button.addEventListener("click", (evt) => {
            this.hidePopUp();
            alert("Hello");
            evt.stopPropagation();
        });
        
        return content;
    }
}
