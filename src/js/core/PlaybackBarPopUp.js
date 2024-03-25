

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
    #content = [];
    #title = "";

    constructor(playbackBar) {
        this.#playbackBar = playbackBar;
        this.#element = document.createElement('aside');
        this.#element.className = 'pop-up-wrapper';
        playbackBar.element.prepend(this.#element);
        this.#element.classList.add('hidden');
        this.#element.addEventListener('click', evt => evt.stopPropagation());
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
    }

    #currentContentId = -1;
    get currentContentId() {
        return this.#currentContentId;
    }

    show({ content, title = null, parent = null, attachLeft = false, attachRight = false }) {
        if (!content) {
            throw new Error('PlaybackBarPopUp.show(): No content provided.');
        }

        content.setAttribute("data-pop-up-content-id", getPopUpId().next().value);
        const currentContent = this.#content.length && this.#content[this.#content.length - 1];
        const parentId = parent && parent.getAttribute("data-pop-up-content-id");

        if (currentContent && currentContent.getAttribute("data-pop-up-content-id") !== parentId) {
            // Clear content
            this.#element.innerHTML = "";
            this.#content = [];
        }
        this.#content.push(content);

        this.#playbackBar.element.classList.add('pop-up-active');
        this.#element.classList.remove('hidden');

        const container = buildSectionContainer(this.#element);

        if (attachLeft === true) {
            this.#element.classList.add('left');
        }
        else {
            this.#element.classList.remove('left');
        }

        if (attachRight === true) {
            this.#element.classList.add('right');
        }
        else {
            this.#element.classList.remove('right');
        }
        container.setContent(content);
        if (title) {
            this.title = title;
        }
        return 0;
    }
    
    hide() {
        this.#currentContentId = -1;
        this.#playbackBar.element.classList.remove('pop-up-active');
        this.#element.classList.add('hidden');
    }

    get isHidden() {
        return this.#element.classList.contains('hidden');
    }
}
