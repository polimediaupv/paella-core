

const buildSectionContainer = (parent) => {
    const section = document.createElement('section');
    section.classList.add('pop-up');


    // TODO: Title bar, pop navigator button
    section.innerHTML = `
        <header>
            <h2>title</h2>
        </header>
        <article>
        </article>
    `;
    parent.appendChild(section);

    section.setTitle = (title) => {
        section.querySelector('header h2').textContent = title;
    };

    section.setContent = (content) => {
        section.querySelector('article').innerHTML = '';
        section.querySelector('article').appendChild(content);
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
        push(content, side) {
            if (this.side !== side) {
                this.stack = [];
                this.side = side;
            }
            else {
                this.stack.push(this.current);
            }
            this.current = content;
        },
        pop(side) {
            if (this.side === side) {
                this.current = this.stack.pop();
            }
            else {
                throw new Error(`PlaybackBarPopUp.contentManager.pop(): Invalid side provide. Current stack side is '${this.side}', but requested side is '${side}'.`);
            }
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

    show({ content, attachLeft = false, attachRight = false }) {
        if (!content) {
            throw new Error('PlaybackBarPopUp.show(): No content provided.');
        }

        if (attachLeft === true && attachRight === true) {
            this.#showWide(content);
        }
        else if (attachLeft === true) {
            this.#showLeft(content);
        }
        else if (attachRight === true) {
            this.#showRight(content);
        }
        else {
            throw new Error('PlaybackBarPopUp.show(): Invalid attachments point provided.');
        }
    }

    hide() {

    }

    #showWide(content) {
        this.#contentManager.push(content, 'wide');
        this.#popUpContainer.wide.setContent(content);
    }

    #showLeft(content) {
        this.#contentManager.push(content, 'left');
        this.#popUpContainer.left.setContent(content);
    }

    #showRight(content) {
        this.#contentManager.push(content, 'right');
        this.#popUpContainer.right.setContent(content);
    }
}
