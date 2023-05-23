# Utilities

```javascript
import { utils } from 'paella-core';
```



The utils package contains a number of functions for internal use in paella-core, which have been grouped together and exported for use in external plugins.

**Load SVG file as a text string:**

```javascript
const icon = await utils.loadSvgIcon('svg/icon/url.svg');
...
element.innerHTML = icon;
```



**Get URL parameter:**

```javascript
// http://my-paella-player.mysite.com/?myParam=myValue
const value = utils.getUrlParameter('myParam');
console.log(value);	// myValue
```



**Join paths:** Create a path from an array:

```javascript
const path = utils.joinPath(["my","path/","/to","index.html"],"/");
console.log(path); // my/path/to/index.html
```



**Check if an URL is absolute:**

```javascript
if (utils.isAbsoluteUrl(myUrl)) {
  console.log("The URL is absolute");
}
else {
  console.log("The URL is not absolute");
}
```

**Get a file name from an URL (paella-core >= 1.11):**

```javascript
utils.getUrlFileName('https://www.mysite.com/some/file.mp4'); // file.mp4
```

**Remove a file or URL extension (paella-core > 1.11):**

```javascript
utils.removeExtension('my.file-name.mp4') // my.file-name
```

**Remove the file name from an URL or path (paella-core >= 1.11):**

```javascript
utils.removeFileName('file/path/filename.txt'); // file/path/
utils.removeFileName('http://www.myserver.com/file/path/filename.txt');  // http://www.myserver.com/file/path/
```

**Get a extension from a URL or path (paella-core >= 1.11):**

```javascript
utils.getFileExtension('http//myserver.com/file.html')  // html
```

**Get a resource URL relative the video manifest file:**

```javascript
// The manifest file is /repository/my-video-id/data.json
const resourceUrl = utils.resolveResourcePath(myPlayer, "videos/presenter.mp4");
console.log(resourceUrl);	// /repository/my-video-id/videos/presenter.mp4
```



**Time conversion functions:** convert from seconds to time string and from time string to seconds

```javascript
const seconds = 3675;
const time = utils.secondsToTime(seconds);
console.log(time);	// 1:01:15
console.log(utils.timeToSeconds(time));	// 3675
```



**Handle cookies:**

```javascript
utils.setCookie("myCookie","myCookieValue");
console.log(utils.getCookie("myCookie"));	// myCookieValue

// Optional: cookie expiration
utils.setCookie("validForOneDay","I'll expire tomorrow", 1);

// Conditional write: set a cookie only if the user allows to handle
// a cookie type, in this case, 'analytics' cookies.
// paella-core >= 1.8
utils.setCookieIfAllowed(myPlayer, "analytics", "userId", analyticsUserId, 365);

// Numeric cookie: return a number from a cookie, or null if the cookie
// does not exists or is not a number
// paella-core >= 1.18
utils.getNumericCookie("aNumberValue");

// JSON cookie: return a JSON object from a cookie, or null if the
// cookie does not exists or is not a JSON object.
// paella-core >= 1.18
utils.getJSONCookie("aJSONValue");
```

Check documentation about [cookie consent APIs](cookie_consent.md) to get more information about `setCookieIfAllowed()` function.

**Load syles:** loading stylesheets to be used as Paella Core skins. Style sheets loaded with this API will always have priority over those defined in Paella Core and its plugins. Returns the DOM element `<link>` that is added to the page header.

```javascript
await utils.loadStyle('my_paella_core_skin.css');
```

**Unload style:** unload a stylesheet. The  The DOM element, which can be obtained from the `loadStyle()` function, is passed as a parameter.

```javascript
const style = await utils.loadStyle('style.css');
...
utils.unloadStyle(style);
```

**Merge objects:** (paella-core >= 1.31) mixes the information of two objects, overwriting the values of `extendData` over those of `baseData`.

```javascript
const objA = {
  key1: "hello",
  key2: {
    key3: "world"
  }
};

const objB = {
	key2: {
	  key3: "Paella",
	  key4: 42
	}
};

utils.mergeObjects(objA, objB);
// objA: {
//  key1: "hello",
//  key2: {
//    key3: "Paella",
//    key4: 42
//  }
// }
```

(paella-core >= 1.34) When an object contains properties that are arrays, it is possible to mix the contents of the array as long as the array elements are objects and contain the `id` property. In this case, the `mergeObjects` function will be applied recursively on the objects of the array `A`, with the objects of the array `B` whose identifier matches. In any other case, objects from the array `A` that do not meet these requirements will be added to the end of the array `B`.

```js
const objA = {
  arrayTest: [
    {
      "name": "name 1"
    },
    {
      "id": 1,
      "name": "name 2"
    }
  ]
};

const objB = {
  arrayTest: [
    {
      "id": 1,
      "name": "replace name"
    },
    {
      "id": 2,
      "name": "name 3"
    },
    "name 4"
  ]
}

utils.mergeObjects(objA, objB);
// objA: {
//  arrayTest: [
//    {
//      "name": "name 1"
//    },
//    {
//      "id": 1,
//      "name": "replace name"
//    },
//    {
//      "id": 2,
//      "name": "name 3"
//    },
//    "name 4"
//  ]
// }
```