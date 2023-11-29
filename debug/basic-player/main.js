// Old style import
//import { Paella } from 'paella-core';

// paella-core 2.0 style import
import Paella from 'paella-core/Paella';
import { createWindow } from 'paella-core/ui/floating-window';

// specific for vite package manager: import css from paella-core
import 'paella-core/paella-core.css';

const player = new Paella('playerContainer');

await player.loadManifest();

// UI test
const uiTestContainer = document.getElementById("uiTest");

uiTestContainer.innerHTML = `
<div class="text-content">
    <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
        consectetur, ipsum quis aliquam tincidunt, velit dolor aliquet
        tortor, eget ultricies diam ipsum eget lectus. Nulla facilisi.
        Nullam euismod, nisl eget aliquam ultricies, nunc nisl
        consectetur nunc, eget aliquam nisl nunc quis nunc. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
        facilisi.
    </p>
    <button class="close-button">Close</button>
</div>
<button class="show-window-button">Show Window</button>
`

const content = uiTestContainer.querySelector(".text-content");
const closeButton = uiTestContainer.querySelector(".close-button");
const button = uiTestContainer.querySelector(".show-window-button");

const modalWindow = createWindow(content);
modalWindow.setTitle("Test window");
modalWindow.setSize(550, 330);
modalWindow.setPosition(100, 100);
modalWindow.hide();
closeButton.addEventListener("click", () => {
    modalWindow.hide();
})
button.addEventListener("click", () => {
    modalWindow.show();
})
