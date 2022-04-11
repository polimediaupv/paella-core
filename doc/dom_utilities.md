# DOM Utilities

`paella-core` includes some utilities to simplify the creation of DOM elements using JavaScript code.

## createElement

`function createElement({tag='div',attributes={},children="",innerText="",parent=null})`:

It is a rich version of the standard `document.createElement()` API, which allows a number of additional attributes to be set to create elements in a single line of code.

```js
import { createElement } from 'paella-core';
...

const elem = createElement({
    tag: 'ul',
    attributes: { className: 'my-element', style: 'position: absolute;' },
    parent: document.body,
    children: '<li>One</li><li>Two</li>'
});
```

## createElementWithHtmlText

`function createElementWithHtmlText(htmlText,parent = null)`

Allows you to create a DOM element from HTML code in text. It is important to mention that the text must contain only one root element. If it contains more than one, only the first one will be created.

```js
import { createElementWithHtmlText } from 'paella-core';

...

const elem = createElementWithHtmlText(`
<div>
    <h1>Hello World!</h1>
    <p>This is a complex element created with only one funcion call</p>
</div>
`, document.body);

elem.addEventListener("click", evt => alert("Hello"));
```
