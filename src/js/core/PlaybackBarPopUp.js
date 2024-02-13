

const buildSectionContainer = (parent) => {
    const section = document.createElement('section');
    section.classList.add('pop-up');


    // TODO: Title bar, pop navigator button
    section.innerHTML = `
        <header class="pop-up-title">
            <button><</button>
            <h2>title</h2>
        </header>
        <article class="pop-up-content">
        </article>
    `;
    parent.appendChild(section);

    section.setTitle = (title) => {
        section.querySelector('header.pop-up-title h2').textContent = title;
    };

    section.popButton = () => section.querySelector('header.pop-up-title button');

    section.onPopClicked = (callback) => {
        if (section._clickCallback) {
            section.popButton().removeEventListener('click', section._clickCallback);
        }
        section._clickCallback = callback;
        section.popButton().addEventListener('click', callback);
    };

    section.hidePopButton = () => section.popButton().style.display = 'none';

    section.showPopButton = () => section.popButton().style.display = '';

    section.setContent = (content) => {
        section.querySelector('article.pop-up-content').innerHTML = '';
        section.querySelector('article.pop-up-content').appendChild(content);
    };

    return section;
}

export default class PlaybackBarPopUp {
    #playbackBar = null;
    #element = null;
    #popUpContainer = {
        parent: null,

        get left() {
            this._section = this._section || buildSectionContainer(this.parent);
            this.parent.classList.add('left');
            this.parent.classList.remove('right');
            return this._section;
        },

        get right() {
            this._section = this._section || buildSectionContainer(this.parent);
            this.parent.classList.remove('left');
            this.parent.classList.add('right');
            return this._section;
        },

        get wide() {
            this._section = this._section || buildSectionContainer(this.parent);
            this.parent.classList.add('left');
            this.parent.classList.add('right');
            return this._section;
        }
    };
    #contentManager = {
        current: null,
        stack: [],
        side: null,
        push({ content, side = 'left', parent = null }) {
            if (this.side !== side || this.current !== parent) {
                this.stack = [];
                this.side = side;
                console.log("Clear stack");
            }
            else {
                this.stack.push(this.current);
                console.log("Push to stack");
                console.log(this.stack);
            }
            this.current = content;
        },
        pop() {
            this.current = this.stack.pop();
            console.log("Pop from stack: ");
            console.log(this.stack);
            console.log("Current: ");
            console.log(this.current);
            return this.current;
        },
        get popAvailable() {
            return this.stack.length > 0;
        },
        get parent() {
            return this.stack.length > 0 && this.stack[this.stack.length - 1] || null;
        }
    };
    #title = "";

    constructor(playbackBar) {
        this.#playbackBar = playbackBar;
        this.#element = document.createElement('aside');
        this.#element.className = 'pop-up-wrapper';
        playbackBar.element.prepend(this.#element);
        this.#popUpContainer.parent = this.#element;
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
    }

    show({ content, parent = null, attachLeft = false, attachRight = false }) {
        if (!content) {
            throw new Error('PlaybackBarPopUp.show(): No content provided.');
        }

        const [container,side] = (() => {
            if (attachLeft === true && attachRight === true) {
                return [this.#popUpContainer.wide,'wide'];
            }
            else if (attachLeft === true) {
                return [this.#popUpContainer.left,'left'];
            }
            else if (attachRight === true) {
                return [this.#popUpContainer.right,'right'];
            }
        })();

        this.#contentManager.push({ content, parent, side});
        container.setContent(content);
        this.#checkPopButton(container);
    }

    hide() {

    }

    #checkPopButton(container) {
        if (this.#contentManager.popAvailable) {
            container.showPopButton();
            container.onPopClicked(() => {
                const content = this.#contentManager.pop();
                if (content) {
                    container.setContent(content);
                }
                this.#checkPopButton(container);
            });
        }
        else {
            container.hidePopButton();
        }
    }
}
