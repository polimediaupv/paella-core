
export function createWindow({
    content = "Floating window content", 
    title = "Floating Window",
    closeButton = true,
    left = null,
    top = null,
    width = null,
    height = null,
    initiallyHidden = true,
    modal = false
} = {}) {
    if (typeof content === 'string') {
        const contentText = content;
        content = document.createElement('div');
        content.innerHTML = contentText;
    }
    
    const modalContainer = document.createElement('section');
    modalContainer.className = 'floating-window-container removed hidden';
    document.body.appendChild(modalContainer);

    if (modal) {
        modalContainer.classList.add('modal');
    }

    const modalWindow = document.createElement('article');
    modalContainer.appendChild(modalWindow);

    const actions = {
        "n": ({ pos, size }, offset ) => ({ pos: { x: pos.x, y: pos.y + offset.y }, size: { w: size.w, h: size.h - offset.y } }),
        "e": ({ pos, size }, offset ) => ({ pos, size: { w: size.w + offset.x, h: size.h } }),
        "s": ({ pos, size }, offset ) => ({ pos, size: { w: size.w, h: size.h + offset.y } }),
        "w": ({ pos, size }, offset ) => ({ pos: { x: pos.x + offset.x, y: pos.y }, size: { w: size.w - offset.x, h: size.h } }),
        "move": ({ pos, size }, offset ) => ({ pos: { x: pos.x + offset.x, y: pos.y + offset.y}, size })
    }

    const handlers = [['n','w'], ['move'], ['n','e'], ['w'], 'content', ['e'], ['s','w'], ['s'], ['s','e']];
    handlers.forEach((direction) => {
        let handler = document.createElement('div');
        
        // Comprueba si el elemento HTML sale fuera del viewport por algún lado
        const checkBounds = (element, size0, pos0) => {
            const rect = element.getBoundingClientRect();
            const viewport = {
                w: window.innerWidth,
                h: window.innerHeight
            }
            if (rect.left < 0 || rect.right > viewport.w) {
                element.setSize(size0.w, null);
                element.setPosition(pos0.x, null);
            }
            if (rect.bottom > viewport.h || rect.top < 0) {
                element.setSize(null, size0.h);
                element.setPosition(null, pos0.y);
            }                        
        }

        if (Array.isArray(direction)) {
            handler.className = `${direction.join('')}-handler`;
            handler.actions =  direction;
            handler.addEventListener('pointerdown', evt => {
                evt.target.setPointerCapture(evt.pointerId);
                evt.target.downPosition = { x: evt.clientX, y: evt.clientY };
            });
            handler.addEventListener('mousemove', evt => {
                if (!evt.target.downPosition) return;
                const offset = {
                    x: evt.clientX - evt.target.downPosition.x,
                    y: evt.clientY - evt.target.downPosition.y
                }
                evt.target.downPosition = { x: evt.clientX, y: evt.clientY };
                const pos = modalWindow.getPosition();
                const size = modalWindow.getSize();
                let rect = { pos, size };
                if (Array.isArray(evt.target.actions)) {
                    evt.target.actions.forEach((action) => {
                        rect = actions[action](rect, offset);
                    });
                }
                modalWindow.setPosition(rect.pos.x, rect.pos.y);
                modalWindow.setSize(rect.size.w, rect.size.h);
                checkBounds(modalWindow, size, pos);
            });
            handler.addEventListener('pointerup', (evt) => {
                evt.target.releasePointerCapture(evt.pointerId);
                evt.target.downPosition = null;
            });
        } else {
            content.parentElement?.removeChild(content);
            handler = content;
            handler.className = direction;
        }
        
        modalWindow.appendChild(handler);
    });

    modalWindow.setSize = function(w, h) {
        const contentArea = modalWindow.querySelector('div.content');
        modalWindow.style.width = w !== null ? `${w}px` : null;        
        contentArea.style.height = h !== null ? `${h}px` : null;
        console.log(modalWindow.getSize());
    }

    modalWindow.getSize = function() {
        const contentArea = modalWindow.querySelector('div.content');
        return {
            w: modalWindow.offsetWidth,
            h: contentArea.offsetHeight
        }
    }

    modalWindow.setPosition = function(x, y) {
        modalWindow.style.left = x !== null ? `${x}px` : null;
        modalWindow.style.top = y !== null ? `${y}px` : null;
    }

    modalWindow.getPosition = function() {
        const clientRect = modalWindow.getBoundingClientRect();
        return {
            x: clientRect.left,
            y: clientRect.top
        }
    }

    modalWindow.setTitle = function(title) {
        modalWindow.querySelector('.move-handler > h1').innerHTML = title;
    }

    modalWindow.show = function() {
        modalContainer.classList.remove('removed');
        modalContainer.classList.remove('hidden');
    }

    modalWindow.hide = function() {
        modalContainer.classList.add('hidden');
        const checkVisible = () => {
            if (getComputedStyle(modalWindow).opacity === '0') {
                modalContainer.classList.add('removed');
                return;
            }
            setTimeout(checkVisible, 100);
        }
        checkVisible();
    }

    const moveHandler = modalWindow.querySelector('.move-handler');
    moveHandler.innerHTML = '<h1></h1>'

    if (closeButton) {
        const closeButton = document.createElement('button');
        closeButton.className = 'close-button';
        closeButton.setAttribute("aria-label", "Close window");
        closeButton.addEventListener('click', () => {
            modalWindow.hide();
        });
        moveHandler.appendChild(closeButton);
    }

    if (title !== null && title !== undefined) {
        modalWindow.setTitle(title);
    }

    modalWindow.setPosition(left, top);
    modalWindow.setSize(width, height);
    if (!initiallyHidden) {
        modalWindow.show();
    }

    return modalWindow;
}