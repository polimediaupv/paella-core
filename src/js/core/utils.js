
import Events, { bindEvent } from 'paella-core/js/core/Events';
import PopUp from 'paella-core/js/core/PopUp';

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
    // Optional: implement this using a fallback to support IE11
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

export function setupAutoHideUiTimer(player, hideUiTimePropertyName = "hideUiTime") {
    player.__hideTimer__ = null;
    
    const setupTimer = async () => {
        if (player.__hideTimer__) {
            clearTimeout(player.__hideTimer__);
        }
        await player.showUserInterface();
        player.__hideTimer__ = setTimeout(async () => {
            player.__hideTimer__ = null;
            const visible = PopUp.IsSomePopUpVisible();
            if (visible) {
                player.log.debug("UI not hidden because there are visible pop ups");
                setupTimer();
            }
            else {
                await player.hideUserInterface();
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
    const re = /(?:(\d*):){0,1}(\d*):(\d*)/;
    const result = re.exec(timeString);
    if (result) {
        const hours = result[1] !== undefined ? Number(result[1]) : 0;
        const minutes = Number(result[2]);
        const seconds = Number(result[3]);
        return hours * 3600 + minutes * 60 + seconds;
    }
    return null;
}

export function setCookie(cname, cvalue, exdays = 365) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = `expires=${d.toUTCString()}`;
    document.cookie = `${ cname }=${ cvalue };${ expires};path=/`; 
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

export function loadStyle(url) {
    return new Promise(resolve => {
        const link = document.createElement('link');
        link.setAttribute('rel','stylesheet');
        link.setAttribute('href',url);
        link.onload = () => resolve();
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(link);
    });
}
