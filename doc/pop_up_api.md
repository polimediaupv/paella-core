
# Pop up windows

The `PopUp` class allows to display modal or non-modal windows on any element of the page. This API is used internally in plugins of type [ PopUpButton](popup_button_plugin.md) and [MenuButton](menu_button_plugin.md), but can also be used extensively to, for example, display messages to the user.

## Constructor

The `PopUp` constructor supports two mandatory parameters, and three extra parameters that are optional:

- **`player` (required):** is the instance of the player that is to launch the pop up.
- **`parent` (required):** is the parent element in the DOM tree that will contain the pop up.
- **`anchorElement` (optional, default = `null`):** is an element in the DOM tree that we want to use as an anchor to position the pop up. If no element is specified, the pop up will be placed without a position. The default styles for pop ups place it with the `position=absolute` css property, so if we don't specify this parameter, we will be responsible for providing a position for the window through CSS stylesheets, or by modifying the `style` property of the `contentElement` (seen below). If this element is specified, the pop up will be placed next to it, so it will behave similarly to a menu.
- **`contextObject` (optional, default = `null`):** is used to associate the pop up with data that may be relevant. For example, when the pop up is launched from a [ PopUpButtonPlugin](popup_button_plugin.md), the contextObject associated with the pop up is the instance of the plugin that created it.
- **`modal` (optional, default = `true`):** indicates whether the pop up should be modal. If it is modal, the pop up cannot be closed, and it is the responsibility of the programmer to include some action to close it. If it is not modal, then the default action of clicking on the pop up will be to close the window.

## Methods

**`setContent(domElement)`:** sets the DOM element that will contain the pop up window. This element is an HTML element in the DOM tree, which we can create using the standard `document.createElement()` API or by using the `paella-core` utility functions, such as [`createElementWithHtmlText()`](dom_utilities.md).

**`show(parent = null, parentPopUp = null)`:** displays the pop up. If the `parent` parameter is specified, we can modify the parent in the DOM tree where we want the window to be displayed (the parent specified in the PopUp constructor will be substituted). If `parentPopUp` is specified, we will link this pop up to a previously created pop up, so that if the parent is closed, the child will be closed as well, as long as the child is of a non-modal type. When a pop up is displayed, the `Event.SHOW_POPUP` event is triggered, which includes the `popUp` and `contextObject` parameters.

**`hide()`:** oculta el pop up. Al ocultar un pop up, se lanza el evento `Event.HIDE_POPUP`, que incluye los parámetros `popUp` y `contextObject`.

**`destroy()`:** destroys the pop up. If the pop up is no longer to be used, it is necessary to call this function to remove the pop up elements from the DOM tree.


## Attributes

- **`isModal` (read):** returns true if the pop up is modal, false otherwise.

- **`contextObject` (read):** returns the `contextObject` associated with the pop up, whose value can only be set in the constructor.

- **`id` (read):** returns the unique identifier of the pop up, which is a `Symbol` automatically generated in the class constructor.

- **`contentElement` (read):** returns the DOM element associated with the pop up window. In this element you can, for example, modify the class of the element, to set properties in style sheets.

- **`content` (read):** this is the DOM element that is set by the `setContent()` function.


## Example

```js
import { PopUp, createElementWithHtmlText } from 'paella-core`;
...

const myPopUp = new PopUp(myPlayer, document.body, null, null, false);
const content = createElementWithHtmlText('<div><h1>Hello, World!</h1></div>');
const closeButton = createElementWithHtmlText(`<button>Close</button>`, content);
closeButton.addEventListener('click', (evt) => myPopUp.hide());
myPopUp.setContent(content);
myPopUp.show();
```


