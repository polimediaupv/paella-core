## Loader (paella-core >= 1.5)

The default paella player loader [can be customized using the `initParams` object](initialization.md).

To create a custom loader, you must to extend the `Loader` class and implement the `async create()` method.

```js
import {
    Loader,
    createElementWithHtmlText
} from 'paella-player';


export default class CustomLoader extends Loader {
    async create() {
        createElementWithHtmlText(`<h1>Loading...</h1>`, this.element);
    }
}
```

Creating a loader can be hard, because it is an element of the player that we only see for a few seconds. You can certainly use development tools to simulate a slower connection, but in any case setting the styles of your custom loader can be tricky.

To make this task easier, we can use the `debug` attribute of the `Loader` class. If this attribute returns `true`, then `Paella` will not remove the loader at the end of the load. Obviously, this attribute should only be used to create and debug the loader itself.

```js
export default class CustomLoader extends Loader {
    ...

    get debug() {
        return true;    // The loader will not be removed after paella load
    }
}
```
