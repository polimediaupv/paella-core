

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

function* getPopUpId() {
    let id = 0;
    while (true) {
        console.log(id);
        yield id++;
    }
}

export default class PlaybackBarPopUp {
    #playbackBar = null;
    #element = null;
    #popUpContainer = {
        parent: null,

        get container() {
            this._container = this._container || buildSectionContainer(this.parent);
            return this._container;
        },

        get left() {
            this.parent.classList.add('left');
            this.parent.classList.remove('right');
            return this.container;
        },

        get right() {
            this.parent.classList.remove('left');
            this.parent.classList.add('right');
            return this.container;
        },

        get wide() {
            this.parent.classList.add('left');
            this.parent.classList.add('right');
            return this.container;
        },

        set title(title) {
            this.container.querySelector('header.pop-up-title > h2').textContent = title;
        }
    };

    #contentManager = {
        current: null,
        title: "",
        stack: [],
        titles: [],
        side: null,
        push({ title, content, side = 'left', parent = null }) {
            if (this.side !== side || this.current !== parent) {
                this.stack = [];
                this.titles = [];
                this.side = side;
                this.title = title;
            }
            else {
                this.titles.push(this.title);
                this.stack.push(this.current);
            }
            this.current = content;
            this.title = title;
        },
        pop() {
            this.current = this.stack.pop();
            this.title = this.titles.pop();
            return [this.current, this.title];
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
        this.#element.classList.add('hidden');
        this.#playbackBar.element.addEventListener('click', (evt) => {
            evt.stopPropagation();
            this.hide();
        });
    }

    get title() {
        return this.#title;
    }

    set title(title) {
        this.#title = title;
        this.#popUpContainer.title = title;
    }

    #currentContentId = -1;
    get currentContentId() {
        return this.#currentContentId;
    }

    show({ content, title = null, parent = null, attachLeft = false, attachRight = false }) {
        if (!content) {
            throw new Error('PlaybackBarPopUp.show(): No content provided.');
        }

        this.#playbackBar.element.classList.add('pop-up-active');
        this.#element.classList.remove('hidden');

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

        this.#contentManager.push({ title, content, parent, side});
        container.setContent(content);
        if (title) {
            this.title = title;
        }
        this.#checkPopButton(container);
        this.#currentContentId = getPopUpId();
        return this.#currentContentId;
    }
    
    hide() {
        this.#currentContentId = -1;
        this.#playbackBar.element.classList.remove('pop-up-active');
        this.#element.classList.add('hidden');
    }

    get isHidden() {
        return this.#element.classList.contains('hidden');
    }

    #checkPopButton(container) {
        if (this.#contentManager.popAvailable) {
            container.showPopButton();
            container.onPopClicked(() => {
                const [content,title] = this.#contentManager.pop();
                if (content) {
                    container.setContent(content);
                }
                if (title) {
                    this.title = title;
                }
                this.#checkPopButton(container);
            });
        }
        else {
            container.hidePopButton();
        }
    }
}
