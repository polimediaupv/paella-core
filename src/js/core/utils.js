
import Events, { bindEvent } from './Events';

export function loadSvgIcon(url) {
    return new Promise((resolve,reject) => {
        fetch(url)
            .then((icon) => {
                return icon.text()
            })
            .then(svg => {
                resolve(svg);
            })
            .catch(err => reject(err));
    })
}

export function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has(name) ? urlParams.get(name) : null;
}

export function getHashParameter(name) {
    const search = window.location.hash.replace('#','?');
    const urlParams = new URLSearchParams(search);
    return urlParams.has(name) ? urlParams.get(name) : null;
}

export function joinPath(parts, sep){
    const separator = sep || '/';
    parts = parts.map((part, index)=>{
        if (index) {
            part = part.replace(new RegExp('^' + separator), '');
        }
        if (index !== parts.length - 1) {
            part = part.replace(new RegExp(separator + '$'), '');
        }
        return part;
    })
    return parts.join(separator);
}

export function isAbsoluteUrl(src) {
    // We consider that the URLs starting with / are absolute and local to this server
    return new RegExp('^([a-z]+://|//)', 'i').test(src) || /^\//.test(src);
}

export function getUrlFileName(url) {
    try {
        return new URL(url).pathname.split('/').pop();
    }
    catch (e) {
        return url.split('/').pop();
    }
}

export function removeExtension(url) {
    return url.split('.').reduce((ac,v,i,a) => i<a.length-1 ? (ac !== "" ? `${ac}.${v}` : v) : ac, "");
}

export function removeFileName(url) {
    const remove = (path) => {
        const result = path.split('/').reduce((ac,v,i,a) => i<a.length-1 ? (ac !== "" ? `${ac}/${v}` : v) : ac, "");
        return (path[0] === '/' ? `/${result}` : result) + '/';
    }

    try {
        const u = new URL(url);
        return u.origin + remove(u.pathname);
    }
    catch (e) {
        return remove(url);
    }
}

export function getFileExtension(url) {
    const file = getUrlFileName(url);
    return file.split('.').pop();
}

// Returns the absolute path of a video manifest resource file.
// If the path is absolute, it returns it unchanged.
export function resolveResourcePath(player,src) {
    if (isAbsoluteUrl(src)) {
        return src;
    }
    else {
        return joinPath([player.manifestUrl, src]);
    }
}

export function pauseAutoHideUiTimer(player) {
    player.__hideTimerPaused__ = true;
}

export function resumeAutoHideUiTimer(player) {
    player.__hideTimerPaused__ = false;
}

export function setupAutoHideUiTimer(player, hideUiTimePropertyName = "hideUiTime") {
    player.__hideTimer__ = null;

    const hideUserInterface = async () => {
        //player.__hideTimer__ = null;
        if (player.__hideTimerPaused__) {
            player.log.debug("UI not hidden because the auto hide timer is paused");
            //setupTimer();
            return false;
        }
        else if (checkFocus()) {
            player.log.debug("UI not hidden because there is a focused element");
            //setupTimer();
            return false;
        }
        await player.hideUserInterface();
        return true;
    }
    
    // Used to hide user interface when the mouse leave the player container
    if (player.config.ui?.hideOnMouseLeave) {
        player.containerElement.addEventListener("mouseleave", () => {
            hideUserInterface();
        });
    }

    const checkFocus = () => {
        const active = document.activeElement;
        return  (player.playbackBar.element.contains(active) ||
                player.videoContainer.element.contains(active)) &&
                [
                    "input",
                    "textarea",
                    "button"
                ].find(tagName => active.tagName.toLowerCase(tagName)) !== -1;
    }
    
    const setupTimer = async () => {
        if (player.__hideTimer__) {
            clearTimeout(player.__hideTimer__);
        }
        await player.showUserInterface();
        player.__hideTimer__ = setTimeout(async () => {
            player.__hideTimer__ = null;
            if (!hideUserInterface()) {
                setupTimer();
            }
        }, player[hideUiTimePropertyName]);
    }
    
    player.containerElement.addEventListener("mousemove", async (evt) => {
        setupTimer();
    });
    
    bindEvent(player, Events.PLAY, async () => {
        setupTimer();
    });
    
    bindEvent(player, Events.PAUSE, async () => {
        await player.showUserInterface();
    });
    
    bindEvent(player, Events.ENDED, async () => {
        await player.showUserInterface();
    });

    document.addEventListener('keydown', async() => {
        setupTimer();
    });

    //document.addEventListener('focusin', async () => {
    //    setupTimer();
    //});
}

export function clearAutoHideTimer(player) {
    if (player.__hideTimer__) {
        clearTimeout(player.__hideTimer__);
        delete player.__hideTimer__;
    }
}

export function secondsToTime(timestamp) {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = Math.floor(timestamp % 60);
    return  (hours>0 ? hours.toString().padStart(2,'0') + ":" : "") +
            minutes.toString().padStart(2,'0') + ":" +
            seconds.toString().padStart(2,'0');
}

export function timeToSeconds(timeString) {
    const re = /^(?:(\d+):){0,1}(\d+):(\d+)(\.\d+)?$/;
    const result = re.exec(timeString);
    if (result) {
        const hours = result[1] !== undefined ? Number(result[1]) : 0;
        const minutes = Number(result[2]);
        const seconds = Number(result[3]);
        return hours * 3600 + minutes * 60 + seconds;
    }
    return null;
}

export function timeToMilliseconds(timeString) {
    const re = /^(?:(\d+):){0,1}(\d+):(\d+)\.(\d+)?$/;
    const result = re.exec(timeString);
    if (result) {
        const hours = result[1] !== undefined ? Number(result[1]) : 0;
        const minutes = Number(result[2]);
        const seconds = Number(result[3]);
        const milliseconds = result[4] && Number(result[4]) || 0;
        return hours * 3600000 + minutes * 60000 + seconds * 1000 + milliseconds;
    }
    return null;
}

export function setCookie(cname, cvalue, exdays = 365) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${ cname }=${ cvalue };${ expires};path=/;SameSite=None;` + (/Apple/.test(navigator.vendor) ? "" : "Secure;"); 
}

export function setCookieIfAllowed(player, type, cname, cvalue, exdays = 365) {
    if (player.cookieConsent.getConsentForType(type)) {
        setCookie(cname, cvalue, exdays);
    }
}

export function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for(let i = 0; i <ca.length; ++i) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
}

export function getNumericCookie(cname) {
    const rawValue = getCookie(cname);
    const numValue = Number(rawValue);
    return (rawValue !== "" && !isNaN(numValue)) ? numValue : null;
}

export function getJSONCookie(cname) {
    try {
        return JSON.parse(getCookie(cname));
    }
    catch (err) {
        return null;
    }
}

export function loadStyle(url, addToHeader = true) {
    return new Promise(resolve => {
        const link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href',url);
        link.onload = () => resolve(link);
        const head = document.getElementsByTagName('head')[0];
        if (addToHeader) {
            head.appendChild(link);
        }
        resolve();
    });
}

export function unloadStyle(link) {
    const head = document.getElementsByTagName('head')[0];
    head.removeChild(link);
}

export function mergeObjects(baseData, extendData, mergeArrays = true) {
    for (const key in extendData) {
        const baseVal = baseData[key];
        let extendVal = extendData[key];

        if (mergeArrays && Array.isArray(baseVal) && Array.isArray(extendVal)) {
            // Replace objects if there is an identifier property
            baseVal.forEach(item => {
                extendVal = extendVal.filter(extendItem => {
                    if (typeof(item) === "object" &&
                        typeof(extendItem) === "object" &&
                        item.id === extendItem.id)
                    {
                        mergeObjects(item, extendItem, mergeArrays);
                        return false;
                    }
                    return true;
                });
            });
            
            // Add objects that have not been added before
            extendVal.forEach(extendItem => {
                baseVal.push(extendItem);
            });
        }
        else if (typeof(baseVal) == "object" && extendVal) {
            mergeObjects(baseVal, extendVal, mergeArrays);
        }
        else {
            baseData[key] = extendData[key];
        }
    }
}

export function sanitizeHTML(html, { excludedTags = null } = {}) {
    const div = document.createElement('div');
    div.innerHTML = html;

    const exclude = ["script"];
    if (excludedTags) {
        exclude.push(...excludedTags);
    }
    
    exclude.flatMap(tag => Array.from(div.getElementsByTagName(tag)))
        .forEach(tag => {
            const parent = tag.parentElement;
            parent.removeChild(tag)
        });

    return div.innerHTML;
}
