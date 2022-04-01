# Plugin module tutorial

In this tutorial you will learn how to create from scratch a plugin module for `paella-core`, and publish it via [npm](https://www.npmjs.com). Before continuing, remember to consult the documentation on [paella-core plugins](plugins.md). This tutorial is purely practical, and will not address any theoretical concepts about the `paella-core` plugin APIs, if you have any questions, you have all the information about plugins in the document above, and in the other documents about the types of plugins in `paella-core`.

This tutorial code is available at [https://github.com/polimediaupv/plugin-module-tutorial.git](https://github.com/polimediaupv/plugin-module-tutorial.git).

## Project structure and dependencies

```sh
mkdir plugin-module-tutorial
cd plugin-module-tutorial
npm init   < setup your project here
npm install --save paella-core
npm install --save-dev webpack webpack-cli webpack-dev-server svg-inline-loader style-loader html-webpack-plugin file-loader css-loader copy-webpack-plugin babel-loader @babel/core @babel/preset-env
```

Be aware of the `webpack` versions. If you have problems, check the version of webpack being used in `paella-core` to know which version to use in your plugin.

**Note:** the minimum development dependencies are just webpack, webpack-cli and babel (including @babel/core and @babel/preset-env), but in the webpack configuration in this tutorial we've added many more resources so we can package SVG graphics, stylesheets and other resources, because it's easier to start from this configuration and remove what you don't need, than to figure out how to add what you need.


### Webpack configuration

We are going to add three files for webpack configuration:

* `webpack.debug.js`: debug configuration file.
* `webpack.config.js`: distribution configuration file. 
* `webpack.common.js`: common options for debug and distribution.

**webpack.common.js:**: In this file you can customise your webpack plugin configuration. For example, if you are not going to use SVG graphics or stylesheets, in addition to not installing those packages, you will have to remove the corresponding plugins from this file.

```js
module.exports = {
	
	devtool: 'source-map',
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(svg)$/i,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'svg-inline-loader'
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			},
			{
				test: /\.css$/i,
				use: ['style-loader', 'css-loader'],
				exclude: /(node_modules)/
			}
		]
	},
	
	plugins: [
	]
}
```

**webpack.config.js:** this is the configuration file for distribution. Here we specify the name of the plugin library, which in general should match the name of the package you want to distribute (in this case, `plugin-module-tutorial`). We also configure the main library file, which, as we will see later, is where we will add the plugin export function.

```js
const path = require('path');
const config = require('./webpack.common');

config.entry = './src/index.js',
config.output = {
	path: path.join(__dirname, "dist"),
	filename: 'plugin-module-tutorial.js',
	library: 'plugin-module-tutorial',
	libraryTarget: 'umd'
};
config.externals = {
	"paella-core": {
		commonjs: 'paella-core',
		commonjs2: 'paella-core',
		amd: 'paella-core'
	}
};

module.exports = config;
```

**webpack.debug.js:** debug configuration is added to this file. As we will see later, we are going to create a basic player in the `src/debug.js` file, and we will test our plugins in it. In the output configuration we use the generic filename `paella.js`. You don't need to modify this file, because it is only used for debugging. The debug server configuration is also included in this file. For `paella-core` plugins, we use port 8090 by default, so that it does not collide with the debug port of `paella-core` (8000) or the reference player (8080). Finally, some copies of sample manifest files are configured. These manifest files reference public videos, and as we will see, they will be placed in the `repository_test` directory. In that repository you can place the manifest files you find most useful for debugging your plugins.

As you can see, you'll probably be able to use this file as is, without any change, unless you need to customise some parameters for debugging.

```js
const path = require('path');
const config = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

config.entry = './src/debug.js';
config.output = {
	path: path.join(__dirname, "debug"),
	filename: 'paella.js',
	sourceMapFilename: 'paella.js.map'
}
config.devtool = "source-map";
config.devServer = {
	port: 8090,
	allowedHosts: 'all',
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
	}
};

config.plugins.push(new HtmlWebpackPlugin({
	template: "src/index.html",
	inject: true
}));

config.plugins.push(new CopyWebpackPlugin({
	patterns: [
		{ from: 'config', to: 'config' },
		{ from: 'repository_test/repository', to: 'repository' }
	]
}));

module.exports = config;
```

### npm scripts

Add the webpack scripts to the `package.json` to use `npm` for build and debug your plugin. You also need to add the entry point of the library. To do this we use the `module` attribute, which is used to mark which file to import when we use `require` or `import` to include the library. The file we publish here has to match the file we are going to generate with webpack, in this case, `dist/plugin-module-tutorial.js`:

**package.json:**

```json
{
    ...
    "module": "dist/plugin-module-tutorial.js",
    ...
    "scripts": {
        "build": "webpack --mode development --config webpack.config.js",
        "dev": "webpack serve --mode development --config webpack.debug.js"
    },
    ...
}
```


## Plugin files

### Main plugin files

Here you must add at least three files:

* `index.js`: is the main plugin file. In this file you'll add a function to export the webpack context that `paella-core` will use to register the plugins and the plugin module.
* plugin file or files: these are the plugin files, whose name should be in the form `com.yourorganization.paella.yourPlugin.js`. Remember that this name will be used in the `paella-core` configuration to identify the configuration parameters of that plugin. Of course, you can put here as many plugin files as you want.
* Plugin module file: this file identify the plugin module. It's used to provide some useful metadata to `paella-core` about the plugins. The plugin module file is placed in the same directory as the plugin files.

You can use any directory structure with the only restriction that the plugins and the plugin module file must be placed in the same directory. This directory will be exported in the plugin context function, at `index.js`. Anyway, we recommend to use the following directory structure:

```other
[your-plugin-repo]
   |- src
     |- index.js  > main plugin file
     |- plugins
       |- com.yourorganization.paella.firstPlugin.js
       |- com.yourorganization.paella.secondPlugin.js
       |- ...
       |- YourPlugins.js   > plugin module file
```


**src/index.js:**

```js
export default function getTutorialPluginContext() {
    return require.context("./plugins", true, /\.js/);
}
```

**src/plugins/es.upv.paella.myTutorialPlugin.js:** This is an example of the simplest possible plugin for `paella-core`: an event plugin that logs the play and pause actions.

```js
import { Events, EventLogPlugin } from 'paella-core';

export default class MyTutorialPlugin extends EventLogPlugin {
    get events() {
        return [
            Events.PLAY,
            Events.PAUSE
        ]
    }

    async onEvent(event, params) {
        switch (event) {
        case Events.PLAY:
            console.log("You have pressed the PLAY button");
            break;
        case Events.PAUSE:
            console.log("You have pressed the PAUSE button");
            break;
        }
    }
}
```

**src/plugins/TutorialPlugins.js:**

```js
import { PluginModule } from 'paella-core';
import packageData from '../../package.json';

export default class TutorialPlugins extends PluginModule {
    get moduleName() {
        return 'tutorial-plugins';
    }

    get moduleVersion() {
        return packageData.version;
    }
}
```

These files are enough to create a plugin library for `paella-core`, but it doesn't make much sense to release a package that we haven't tested. For that reason, if you try to run the build script you will get several errors: the webpack configuration is set up to generate the debug files as well. In the next section we will add these files.

```sh
$ npm run build
> plugin-module-tutorial@1.0.0 build /home/fernando/desarrollo/paella/plugin-module-tutorial
> webpack --mode development --config webpack.debug.js

asset index.html 3.34 KiB [emitted]
asset paella.js 99 bytes [emitted] (name: main)

ERROR in main
Module not found: Error: Can't resolve './src/debug.js' in '/home/fernando/desarrollo/paella/plugin-module-tutorial'
...
```

### Debug files

First, we going to add a basic player to load our plugin. To do it, we going to add the `index.html` and `debug.js` files:

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Document</title>
	<style>
		#player-container {
			width: 90vw;
			height: 90vh;
			left: 5vw;
			top: 5vh;
			position: relative;
			font-family: helvetica, arial, sans-serif;
		}
	</style>
</head>
<body>
	<div id="player-container"></div>
</body>
</html>
```

**debug.js:**

```js
import { Paella } from 'paella-core';
import getTutorialPluginContext from './index';

const initParams = {
	customPluginContext: [
		getTutorialPluginContext()
	]
};

let paella = new Paella('player-container', initParams);

paella.loadManifest()
	.then(() => console.log("done"))
	.catch(e => console.error(e));
```

For our player to work, we need two more things: a configuration file for the basic plugins included in `paella-core`, and also for our new plugin, and a repository with test manifest files:

**config/config.json:** Notice that the last attribute in the `plugins` section corresponds to the new plugin we have created. The attribute name is obtained by removing the `js` extension to its filename, in our example, `"en.upv.paella.myTutorialPlugin"`. 

```json
{
    "repositoryUrl": "repository",
    "manifestFileName": "data.json",

    "defaultLayout": "presenter-presentation",
    
    "plugins": {
        "es.upv.paella.singleVideo": {
            "enabled": true,
            "validContent": [
                { "id": "presenter", "content": ["presenter"], "icon": "present-mode-2.svg", "title": "Presenter" },
                { "id": "presentation", "content": ["presentation"], "icon": "present-mode-1.svg", "title": "Presentation" },
                { "id": "presenter-2", "content": ["presenter-2"], "icon": "present-mode-1.svg", "title": "Presentation" }
            ]
        },
        "es.upv.paella.dualVideo": {
            "enabled": true,
            "validContent": [
                { "id": "presenter-presentation", "content": ["presenter","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
                { "id": "presenter-2-presentation", "content": ["presenter-2","presentation"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" },
                { "id": "presenter-presenter-2", "content": ["presenter","presenter-2"], "icon": "present-mode-3.svg", "title": "Presenter and presentation" }
            ]
        },
        "es.upv.paella.tripleVideo": {
            "enabled": true,
            "validContent": [
                { "id": "presenter-presenter-2-presentation", "content": ["presenter","presenter-2","presentation"], "icon": "present-mode-4.svg", "title": "Presenter and presentation" },
                { "id": "presenter-2-presenter-3-presentation", "content": ["presenter-2","presenter-3","presentation"], "icon": "present-mode-4.svg", "title": "Presenter and presentation" }
            ]
        },

        "es.upv.paella.hlsVideoFormat": {
            "enabled": true,
            "order": 0,
            "hlsConfig": {
                "maxBufferLength": 40
            },
            "corsConfig": {
                "withCredentials": false,
                "requestHeaders": {
                    "Access-Control-Allow-Credentials": false
                }
            }
        },
        "es.upv.paella.mp4VideoFormat": {
            "enabled": true,
            "order": 1
        },

        "es.upv.paella.videoCanvas": {
            "enabled": true,
            "order": 1
        },
        
        "es.upv.paella.playPauseButton": {
            "enabled": true,
            "order": 0
        },

        "es.upv.paella.vttManifestCaptionsPlugin": {
            "enabled": true
        },

        "es.upv.paella.defaultShortcuts": {
            "enabled": true
        },

        "es.upv.paella.myTutorialPlugin": {
            "enabled": true
        }
    }
}
```

**repository_test/repository/test-video/data.json:**

```json
{
	"metadata": {
		"duration": 909.13,
		"title": "Belmar 15 minutes (multiresolution)",
		"preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/belmar-preview.jpg"
	},
	"streams": [
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presentation.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1442",
							"h": "1080"
						}
					}
				]
			},
			"preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/presentation_cut.jpg",
			"content":"presentation"
		},
		{
			"sources": {
				"mp4": [
					{
						"src": "https://repository.paellaplayer.upv.es/belmar-multiresolution/media/720-presenter.mp4",
						"mimetype": "video/mp4",
						"res": {
							"w": "1920",
							"h": "1080"
						}
					}
				]
			},
			"preview": "https://repository.paellaplayer.upv.es/belmar-multiresolution/preview/presenter_cut.jpg",
			"content":"presenter",
			"audioTag":"es"
		}
	],
	"frameList": []
}
```

## Build and debug

Now you can use the following command to generate the `dist` directory, with your new plugin library code:

```sh
npm run build
```

To debug your plugin, use the `dev` package script:

```sh
npm run dev
```

Now, open a browser and enter [http://localhost:8090/?id=test-video](http://localhost:8090/?id=test-video) in the address bar. If you open the developer tools console, you will see that your plugin is logging the play and pause events.

## Setup git

To set up a `git` repository you can refer to the following `.gitignore` file. We only remove the `node_modules` folder, as the compiled library files will be left for publishing the package to npm.

**.gitignore:**

```gitignore
node_modules
```

## Test package

The last step is to publish the package at `npm`. To publish the plugin you can directly use the full repository structure as is, but you could also create a separate directory structure for publishing, if you only leave the `dist` directory and the `package.json` file. In our case, we published the entire repository, including the source code, in `npm`.

Before publishing the package, note that you can test it by creating a basic external player, adding to its `package.json` the relative path to your plugin repository, and running `npm install`. You can download our [reference player](https://github.com/polimediaupv/paella-player.git) next to your plugin library folder, and edit its `package.json` file:

**my-test-player/package.json:**

```json
{
    ...
    "dependencies": {
        "paella-core": "^1.0.36",
		"paella-basic-plugins": "^1.0.12",
		"paella-slide-plugins": "^1.0.10",
		"paella-user-tracking": "^1.0.11",
		"paella-zoom-plugin": "^1.0.10",
        "plugin-module-tutorial": "../plugin-module-tutorial"
    }
}
```

Now, execute `npm install` and you will see a reference to your library inside the `node_modules` folder, at `paella-player`.

```sh
$ ls -l node_modules/plugin-module-tutorial
lrwxrwxrwx 1 user user 28 Apr  1 09:38 node_modules/plugin-module-tutorial -> ../../plugin-module-tutorial
```

Modify the `src/index.js` file in `paella-player` repository to include your plugin, and add your plugin configuration to the `paella-player`'s `config.json` file.

**paella-player/src/index.js:**

```js
import { Paella, utils } from 'paella-core';
import getBasicPluginContext from 'paella-basic-plugins';
import getSlidePluginContext from 'paella-slide-plugins';
import getZoomPluginContext from 'paella-zoom-plugin';
import getUserTrackingPluginContext from 'paella-user-tracking';

// Import the plugin context function
import getTutorialPluginContext from 'plugin-module-tutorial';

import packageData from "../package.json";

window.onload = async () => {
    const initParams = {
        customPluginContext: [
            require.context("./plugins", true, /\.js/),
            getBasicPluginContext(),
            getSlidePluginContext(),
            getZoomPluginContext(),
            getUserTrackingPluginContext(),

            // Add the plugin context
            getTutorialPluginContext()
        ]
    };
    
    class PaellaPlayer extends Paella {
    
```

**paella-player/config/config.json:**

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.myTutorialPlugin": {
            "enabled": true
        }
    }
}
```

Build and run the player with `npm run dev`. You can debug a demo in `paella-player` using the URL [http://localhost:8080/?id=belmar-multiresolution-remote](http://localhost:8080/?id=belmar-multiresolution-remote).

```sh
paella-player$ npm run dev
```

Open the developer console to see your plugin loggin the PLAY and PAUSE events.

## Publish package

Once you have your plugin library, you may want to publish it to [npm](https://www.npmjs.com) to make it available to all developers using `paella-core`. First of all, note that you must choose a name that is available in `npm`. This name will correspond to the name you set in the `package.json` file, in its `name` attribute. You can use an absolute package name (as we do with `paella-core`) or a package name relative to your npm account, which would take the form `@user/package-name`.

To publish your package, you will first need to create an account at [https://www.npmjs.com](https://www.npmjs.com). With your account details, use the `npm login` command in the terminal to log in. In addition to entering your username and password, you will also need to enter an email address which will be public. Keep this in mind if you don't want to publish your personal email address. In addition to this, you will also be prompted for a one-time password. This password is sent to the email address of your npm account, and serves as a two-factor authentication.

```sh
$ npm login
Username: yourusername
Password: 
Email: (this IS public) yourpublicemail@email.com
npm notice Please check your email for a one-time password (OTP)
Enter one-time password from your authenticator app: [see your inbox to get the OTP]
Logged in as yourusername on https://registry.npmjs.org/.
```

You are now ready to publish your library. Go into your plugin library directory and publish it using the `npm publish` command. The data that will be used to catalogue your library is the data you set in the `package.json` file, so before publishing it would be a good time to review this information.

## Automatic publish using github actions

Note that you can use Github Actions to automatically publish your library. At the Universidad Politécnica de Valencia we have configured an action that publishes the `paella-core` libraries and their plugin libraries whenever we create a tag for a new version.

It is not the goal of this tutorial to learn how to use Github Actions, but as a hint, you should set up an access token in npm, register it in your github account and then add the github actions script. For reference, this is the script template we use:

**.github/workflows/npm-publish.yml**

```yml
# This workflow will run tests using node and then publish a package to GitHub Packages when a release is created
# For more information see: https://help.github.com/actions/language-and-framework-guides/publishing-nodejs-packages

name: Publish release

on:
  create:
    tags:
      - '*'

jobs:
  publish-npm:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: actions/setup-node@v1
        with:
          node-version: 14
          registry-url: https://registry.npmjs.org/
      - run: npm ci
      - run: npm publish --access public
        env:
          NODE_AUTH_TOKEN: ${{secrets.NPM_TOKEN}}
```
