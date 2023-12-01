

export const makePushNavigator = (initialPage, { title = "", width = null, backButtonLabel = "<" } = {}) => {
    const navigator = document.createElement("section");
    navigator.className = "push-navigator";
    navigator.innerHTML = `
    <header>
        <button class="prev-button">${backButtonLabel}</button>
        <h1 class="title">${title}</h1>
    </header>
    <div class="page-container">`;
    navigator.style.width = width ? `${width}px` : null;
    const titleElem = navigator.querySelector("header > .title");
    const prevButton = navigator.querySelector("header > .prev-button");
    const pageContainer = navigator.querySelector(".page-container");
    pageContainer.appendChild(initialPage);

    const navigationDuration = () => {
        const duration = getComputedStyle(document.querySelector(':root')).getPropertyValue('--push-navigator-transition-duration');
        const resultMilliseconds = /([\d.]*)ms$/.exec(duration);
        if (resultMilliseconds) {
            return parseInt(resultMilliseconds[1]);
        }
        const resultSeconds = /([\d.]*)s$/.exec(duration);
        if (resultSeconds) {
            return parseFloat(resultSeconds[1]) * 1000;
        }
    }

    const checkButtonVisibility = () => {
        if (pageStack.length === 0) {
            prevButton.classList.add("hidden");
        } else {
            prevButton.classList.remove("hidden");
        }
    }

    let currentPage = initialPage;
    const pageStack = [];
    navigator.pushPage = (page) => {
        pageStack.push(currentPage);
        currentPage.classList.add("out");
        pageContainer.appendChild(page);
        setTimeout(() => {
            currentPage.parentNode.removeChild(currentPage);
            currentPage.classList.remove("out");
            currentPage = page;
            checkButtonVisibility();
        }, navigationDuration());
    }

    navigator.popPage = () => {
        if (pageStack.length === 0) {
            return;
        }
        const page = pageStack.pop();
        page.classList.add("out");
        pageContainer.prepend(page);
        const prevPage = currentPage;
        currentPage = page;

        setTimeout(() => page.classList.remove("out"), 10);
        setTimeout(() => {
            prevPage.parentNode.removeChild(prevPage);
        }, navigationDuration());
        checkButtonVisibility();
    }

    navigator.setTitle = (title) => {
        titleElem.textContent = title;
    }

    navigator.getTitle = () => {
        return titleElem.innerText;
    }

    prevButton.addEventListener("click", () => {
        navigator.popPage();
    });

    checkButtonVisibility();

    return navigator;
}

