# Data plugins

Data plugins provide an interface for communication with the backend that can be extended through the use of [plugins](plugins.md).



## Read, write and remove

The Data API provides three methods for reading, writing and deleting data. These are three generic operations that work with serialisable objects. This is important, as it is not possible to serialise objects containing structures with circular references.

Both the data identifier and the content can be a string or a serialisable object.

To specify the type of data we want to work with, the context is used. It is an identifier that is specified by a text string, and that we must specify in each operation.

The data API is accessed through the paella player instance.

```javascript
const data = await myPlayerInstance.data.read('aContext', { id: 'aaa' });
await myPlayerInstance.data.write('aContext', { id: 'bbb' }, data);
```


From the context, the data API will select the plugin in charge of reading or writing that data to the backend. Something similar happens with the `remove` operation.



## Create a data plugin

To communicate with a specific backend, it is usually necessary to develop a data plugin that matches the characteristics of the backend. The plugin is defined by extending the DataPlugin class. 

The format of the data has to be defined when defining the context. For example, to set the trimming of the video, the context is set to 'trimming' and the data to the following format:

```json
{
    "start": 10,
    "end": 250
}
```

Once the name and format of the context has been defined, we can implement a compatible data plugin. 

**es.upv.paella.myBackendDataPlugin.js:**

```javascript
import { DataPlugin } from 'paella-core';

export default class MyBackendDataPlugin extends DataPlugin {
    serializeId(id) {
        if (typeof(id) === 'object') {
            id = JSON.stringify(id);
        }
    }
    
    async write(context, id, data) {
        id = this.serializeId(id);
        const res = await fetch("myBackend/myData", {
            method: 'POST',
            mode: 'no-cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        const responseData = await res.json();
        return responseData;
    }
    
    async read(context, id) {
        id = this.serializeId(id);
        const res = await fetch("myBackend/myData");
        const responseData = await res.json();
        return responseData;
    }
}
```



## Default data plugin

If the data format is compatible with the requirements of the data API (a string or a serialisable object), it will be possible to use the default data plugin, which uses browser cookies to store the data. Obviously, this data plugin can only be used to store user preferences or for debugging, since the data.

There is a special context named default that is used when the context specified in the API when performing an operation is undefined. In the next section we explain how contexts are configured, including the default context.



## Configure context

The context will determine which plugin is used to communicate with the backend. In the plugin configuration you set the context to be handled by each data plugin. Each plugin can respond to one or more contexts.

In turn, there can be more than one plugin responding to a context. In this case, the plugin that will be used to respond to that context will be the one determined by the order attribute in each plugin configuration (see the plugin document for more information).

**config.json:**

```json
{
    ...
    "plugins": {
        ...
        "es.upv.paella.cookieDataPlugin": {
            "enabled": true,
            "order": 100,
            "context": ["default", "trimming"]
        },
        "es.upv.paella.myBackendDataPlugin": {
            "enabled": true,
            "order": 0,
            "context": ["trimming"]
        }
    }
}
```



In the above configuration, the data plugin with the highest priority is `es.upv.paella.myBackendDataPlugin`, as due to the order attribute it will be loaded first. Apart from this, the plugin `es.upv.paella.cookieDataPlugin` is configured to respond as the default data plugin, as the list of contexts includes `default`.

As you may already know if you have consulted the plugins document, it is possible to define a procedural behaviour to decide whether a plugin is enabled or not. This mechanism can be defined in conjunction with the plugin configuration, by overriding the plugin's async isEnabled() method:

```javascript
export default class MyBackendDataPlugin extends DataPlugin {
    async isEnabled() {
        // Check the `enabled` attribute in plugin configuration
        if (!super.isEnabled()) {
            return false;
        }
        
        // Check if the plugin is available
        const res = await fetch("myBackend/isAvailable");
        const data = res.json();
        return data.isAvailable;
    }
    ...
```



For this reason, it is possible to define several data plugins that respond to the same context, the important thing in this case is to correctly configure the loading priorities of each plugin.