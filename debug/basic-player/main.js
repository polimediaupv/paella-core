// Old style import
//import { Paella } from 'paella-core';

// paella-core 2.0 style import
import Paella from 'paella-core/Paella';
import { createWindow } from 'paella-core/ui/floating-window';

// specific for vite package manager: import css from paella-core
import 'paella-core/paella-core.css';

window.addEventListener("load", async () => {
    const player = new Paella('playerContainer');
    
    await player.loadManifest();
});

// UI test
const uiTestContainer = document.getElementById("uiTest");

const button = document.createElement("button");
button.innerHTML = "Show modal window";
uiTestContainer.appendChild(button);
button.addEventListener("click", () => {
    modalWindow.show();
})

// All the parameters are optional
const modalWindow = createWindow({ 
    content: `
<p>In Rust, the concept of borrowing refers to the way the language handles memory and data ownership. When you lend a variable, you are allowing another part of the code to use it without taking ownership of it. This is useful for avoiding problems such as race conditions and memory access errors.</p>
<p>There are two types of loans in Rust: immutable loans and mutable loans.</p>
<p>Immutable loans: Allow one or more references to read data. During borrowing, the original data cannot be modified.</p>
<p>Mutable loans: Allow a single reference to modify data. During the loan, the original data cannot be read or modified by any other reference.</p>
<p>Rust guarantees memory safety through its owning and borrowing system, which helps prevent errors common in other programming languages.</p>
    `,       // This can also be a DOM element
    title: "Borrowing in Rust", 
    closeButton: true,
    top: 100,
    left: 100,
    width: 400,
    //height: 200,
    initiallyHidden: true,
    modal: true
});

