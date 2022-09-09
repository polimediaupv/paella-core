# Debug paella player

There are three cases where we may want to debug a `paella-core` based video player:

- If you are developing your own player.
- If you are developing plugins for `paella-core`.
- If you are working on a fork of `paella-core`.

## Debug your own player

Like many other libraries, both `paella-core` and the rest of the Universidad Politécnica de Valencia plug-in libraries include `.map` files to facilitate development. You can use the following example projects to set up the debugging environment with `webpack` and `rollup`:

- [Paella Reference Player](https://github.com/polimediaupv/paella-player) (webpack): Our reference standalone player.
- [Paella Player website sources](https://github.com/polimediaupv/paellaplayer.upv.es) (rollup, svelte): The source code of Paella Player website.
- [Svelte tutorial](paella_svelte.md) (rollup, svelte): A tutorial on how to integrate `paella-core` in a Svelte website.
- [React tutorial](paella_react.md) (webpack, react): A tutorial on how to integrate `paella-core` in a React website.

## Debug a plugin repository

You can use the `paella-core` plugin repositories of the Universidad Politécnica de Valencia as a basis:

- [`paella-basic-plugins`](https://github.com/polimediaupv/paella-basic-plugins)
- [`paella-slide-plugins`](https://github.com/polimediaupv/paella-slide-plugins)
- [`paella-zoom-plugin`](https://github.com/polimediaupv/paella-zoom-plugin)
- [`paella-user tracking`](https://github.com/polimediaupv/paella-user-tracking)

You can also follow our [tutorial on how to create you  own plugin repository](plugin_module_tutorial.md). All plugin repositories work in the same way. They are created using Webpack, and have a file in the path `src/index.js`, which is the main library file, and another file `src/debug.js`, which is used to create a debug player within the plugin repository itself. All the above repositories are configured to use the `paella-core.js.map` file to debug the test player. There are two `npm` scripts configured in the `package.json` file that launch each of the two development environments:

- `npm run dev`: launch the debug environment from the `src/debug.js` file.
- `npm run build`: launches the library build, which will be placed in the `dist` folder. The build also generates the `.map` file corresponding to the library.

## Debug your own `paella-core` fork

The `paella-core` repository works just like the other plugin repositories, including a `src/index.js` file to build the library, and a `src/debug.js` file to debug the player core library. It also includes the same `npm` scripts:

- `npm run dev`: launch the debug environment from the `src/debug.js` file.
- `npm run build`: launches the library build, which will be placed in the `dist` folder. The build also generates the `.map` file corresponding to the library.

