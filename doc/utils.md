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
utils.setCookieIfAllowed(myPlayer, "analytics", "userId", analyticsUserId, 365);
```

Check documentation about [cookie consent APIs](cookie_consent.md) to get more information about `setCookieIfAllowed()` function.

**Load syles:** loading stylesheets to be used as Paella Core skins. Style sheets loaded with this API will always have priority over those defined in Paella Core and its plugins.

```javascript
await utils.loadStyle('my_paella_core_skin.css');
```

