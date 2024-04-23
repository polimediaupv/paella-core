var at = (i, e, t) => {
  if (!e.has(i))
    throw TypeError("Cannot " + t);
};
var m = (i, e, t) => (at(i, e, "read from private field"), t ? t.call(i) : e.get(i)), H = (i, e, t) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, t);
}, Z = (i, e, t, n) => (at(i, e, "write to private field"), n ? n.call(i, t) : e.set(i, t), t);
const g = Object.freeze({
  PLAY: "paella:play",
  PAUSE: "paella:pause",
  STOP: "paella:stop",
  ENDED: "paella:ended",
  SEEK: "paella:seek",
  FULLSCREEN_CHANGED: "paella:fullscreenchanged",
  ENTER_FULLSCREEN: "paella:enterfullscreen",
  EXIT_FULLSCREEN: "paella:exitfullscreen",
  VOLUME_CHANGED: "paella:volumeChanged",
  TIMEUPDATE: "paella:timeupdate",
  TRIMMING_CHANGED: "paella:trimmingChanged",
  CAPTIONS_CHANGED: "paella:captionsChanged",
  CAPTIONS_ENABLED: "paella:captionsEnabled",
  CAPTIONS_DISABLED: "paella:captionsDisabled",
  BUTTON_PRESS: "paella:buttonPress",
  SHOW_POPUP: "paella:showPopUp",
  HIDE_POPUP: "paella:hidePopUp",
  MANIFEST_LOADED: "paella:manifestLoaded",
  STREAM_LOADED: "paella:streamLoaded",
  PLAYER_LOADED: "paella:playerLoaded",
  PLAYER_UNLOADED: "paella:playerUnloaded",
  RESIZE: "paella:resize",
  RESIZE_END: "paella:resizeEnd",
  LAYOUT_CHANGED: "paella:layoutChanged",
  PLAYBACK_RATE_CHANGED: "paella:playbackRateChanged",
  VIDEO_QUALITY_CHANGED: "paella:videoQualityChanged",
  HIDE_UI: "paella:hideUI",
  SHOW_UI: "paella:showUI",
  COOKIE_CONSENT_CHANGED: "paella:cookieConsentChanged",
  LOG: "paella:log"
});
function A(i, e, t, n = !0) {
  return i.__eventListeners__ = i.__eventListeners__ || {}, Array.isArray(e) || (e = [e]), e.forEach((s) => {
    i.__eventListeners__[s] = i.__eventListeners__[s] || [], i.__eventListeners__[s].push({
      callback: t,
      unregisterOnUnload: n
    });
  }), t;
}
function b(i, e, t = {}) {
  i.__eventListeners__ && i.__eventListeners__[e] && i.__eventListeners__[e].forEach((n) => n.callback(t));
}
function se(i, e, t = {}) {
  i.ready && b(i, e, t);
}
function bi(i) {
  if (i.__eventListeners__)
    for (const e in i.__eventListeners__)
      i.__eventListeners__[e] = i.__eventListeners__[e].filter((t) => t.unregisterOnUnload == !1), i.log.debug("Unregister event: " + i.__eventListeners__[e]);
}
function Pt(i) {
  return new Promise((e, t) => {
    fetch(i).then((n) => n.text()).then((n) => {
      e(n);
    }).catch((n) => t(n));
  });
}
function St(i) {
  const e = new URLSearchParams(window.location.search);
  return e.has(i) ? e.get(i) : null;
}
function Tt(i) {
  const e = window.location.hash.replace("#", "?"), t = new URLSearchParams(e);
  return t.has(i) ? t.get(i) : null;
}
function O(i, e) {
  const t = e || "/";
  return i = i.map((n, s) => (s && (n = n.replace(new RegExp("^" + t), "")), s !== i.length - 1 && (n = n.replace(new RegExp(t + "$"), "")), n)), i.join(t);
}
function It(i) {
  return new RegExp("^([a-z]+://|//)", "i").test(i) || /^\//.test(i);
}
function Pe(i) {
  try {
    return new URL(i).pathname.split("/").pop();
  } catch {
    return i.split("/").pop();
  }
}
function kt(i) {
  return i.split(".").reduce((e, t, n, s) => n < s.length - 1 ? e !== "" ? `${e}.${t}` : t : e, "");
}
function ze(i) {
  const e = (t) => {
    const n = t.split("/").reduce((s, a, r, o) => r < o.length - 1 ? s !== "" ? `${s}/${a}` : a : s, "");
    return (t[0] === "/" ? `/${n}` : n) + "/";
  };
  try {
    const t = new URL(i);
    return t.origin + e(t.pathname);
  } catch {
    return e(i);
  }
}
function Ke(i) {
  return Pe(i).split(".").pop();
}
function W(i, e) {
  return It(e) ? e : O([i.manifestUrl, e]);
}
function Dt(i) {
  i.__hideTimerPaused__ = !0;
}
function xt(i) {
  i.__hideTimerPaused__ = !1;
}
function At(i, e = "hideUiTime") {
  var a;
  i.__hideTimer__ = null;
  const t = async () => i.__hideTimerPaused__ ? (i.log.debug("UI not hidden because the auto hide timer is paused"), !1) : n() ? (i.log.debug("UI not hidden because there is a focused element"), !1) : (await i.hideUserInterface(), !0);
  (a = i.config.ui) != null && a.hideOnMouseLeave && i.containerElement.addEventListener("mouseleave", () => {
    t();
  });
  const n = () => {
    const r = document.activeElement;
    return (i.playbackBar.element.contains(r) || i.videoContainer.element.contains(r)) && [
      "input",
      "textarea",
      "button"
    ].find((o) => r.tagName.toLowerCase(o)) !== -1;
  }, s = async () => {
    i.__hideTimer__ && clearTimeout(i.__hideTimer__), await i.showUserInterface(), i.__hideTimer__ = setTimeout(async () => {
      i.__hideTimer__ = null, t() || s();
    }, i[e]);
  };
  i.containerElement.addEventListener("mousemove", async (r) => {
    s();
  }), A(i, g.PLAY, async () => {
    s();
  }), A(i, g.PAUSE, async () => {
    await i.showUserInterface();
  }), A(i, g.ENDED, async () => {
    await i.showUserInterface();
  }), document.addEventListener("keydown", async () => {
    s();
  });
}
function Mt(i) {
  i.__hideTimer__ && (clearTimeout(i.__hideTimer__), delete i.__hideTimer__);
}
function re(i) {
  const e = Math.floor(i / 60 / 60), t = Math.floor(i / 60) - e * 60, n = Math.floor(i % 60);
  return (e > 0 ? e.toString().padStart(2, "0") + ":" : "") + t.toString().padStart(2, "0") + ":" + n.toString().padStart(2, "0");
}
function Le(i) {
  const t = /^(?:(\d+):){0,1}(\d+):(\d+)(\.\d+)?$/.exec(i);
  if (t) {
    const n = t[1] !== void 0 ? Number(t[1]) : 0, s = Number(t[2]), a = Number(t[3]);
    return n * 3600 + s * 60 + a;
  }
  return null;
}
function $e(i) {
  const t = /^(?:(\d+):){0,1}(\d+):(\d+)\.(\d+)?$/.exec(i);
  if (t) {
    const n = t[1] !== void 0 ? Number(t[1]) : 0, s = Number(t[2]), a = Number(t[3]), r = t[4] && Number(t[4]) || 0;
    return n * 36e5 + s * 6e4 + a * 1e3 + r;
  }
  return null;
}
function X(i, e, t = 365) {
  let n = /* @__PURE__ */ new Date();
  n.setTime(n.getTime() + t * 24 * 60 * 60 * 1e3);
  let s = `expires=${n.toUTCString()}`;
  document.cookie = `${i}=${e};${s};path=/;SameSite=None;` + (/Apple/.test(navigator.vendor) ? "" : "Secure;");
}
function Rt(i, e, t, n, s = 365) {
  i.cookieConsent.getConsentForType(e) && X(t, n, s);
}
function K(i) {
  let e = i + "=", n = decodeURIComponent(document.cookie).split(";");
  for (let s = 0; s < n.length; ++s) {
    let a = n[s];
    for (; a.charAt(0) == " "; )
      a = a.substring(1);
    if (a.indexOf(e) == 0)
      return a.substring(e.length, a.length);
  }
  return "";
}
function Li(i) {
  const e = K(i), t = Number(e);
  return e !== "" && !isNaN(t) ? t : null;
}
function Ei(i) {
  try {
    return JSON.parse(K(i));
  } catch {
    return null;
  }
}
function We(i, e = !0) {
  return new Promise((t) => {
    const n = document.createElement("link");
    n.setAttribute("rel", "stylesheet"), n.setAttribute("href", i), n.onload = () => t(n);
    const s = document.getElementsByTagName("head")[0];
    e && s.appendChild(n), t();
  });
}
function Vt(i) {
  document.getElementsByTagName("head")[0].removeChild(i);
}
function fe(i, e, t = !0) {
  for (const n in e) {
    const s = i[n];
    let a = e[n];
    t && Array.isArray(s) && Array.isArray(a) ? (s.forEach((r) => {
      a = a.filter((o) => typeof r == "object" && typeof o == "object" && r.id === o.id ? (fe(r, o, t), !1) : !0);
    }), a.forEach((r) => {
      s.push(r);
    })) : typeof s == "object" && a ? fe(s, a, t) : i[n] = e[n];
  }
}
function Nt(i, { excludedTags: e = null } = {}) {
  const t = document.createElement("div");
  t.innerHTML = i;
  const n = ["script"];
  return e && n.push(...e), n.flatMap((s) => Array.from(t.getElementsByTagName(s))).forEach((s) => {
    s.parentElement.removeChild(s);
  }), t.innerHTML;
}
let be = null;
function je(i) {
  if (!i)
    return !1;
  be || (be = document.createElement("video"));
  let e = be.canPlayType(i);
  if (e === "maybe" || e === "probably")
    return !0;
  if (/video\/mp4/i.test(i))
    return e = be.canPlayType("video/mp4"), e === "maybe" || e === "probably";
}
const ya = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearAutoHideTimer: Mt,
  getCookie: K,
  getFileExtension: Ke,
  getHashParameter: Tt,
  getJSONCookie: Ei,
  getNumericCookie: Li,
  getUrlFileName: Pe,
  getUrlParameter: St,
  isAbsoluteUrl: It,
  joinPath: O,
  loadStyle: We,
  loadSvgIcon: Pt,
  mergeObjects: fe,
  pauseAutoHideUiTimer: Dt,
  removeExtension: kt,
  removeFileName: ze,
  resolveResourcePath: W,
  resumeAutoHideUiTimer: xt,
  sanitizeHTML: Nt,
  secondsToTime: re,
  setCookie: X,
  setCookieIfAllowed: Rt,
  setupAutoHideUiTimer: At,
  supportsVideoType: je,
  timeToMilliseconds: $e,
  timeToSeconds: Le,
  unloadStyle: Vt
}, Symbol.toStringTag, { value: "Module" }));
async function Pi(i, e) {
  return e.log.debug("Using default configuration loading function."), (await fetch(i)).json();
}
async function Si(i, e) {
  return e.log.debug("Using default getVideoId function"), Tt("id") || St("id") || i.fallbackId;
}
async function Ti(i, e, t, n) {
  return n.log.debug("Using default getManifestUrl function"), O([i, e]);
}
async function Ii(i, e, t, n) {
  return n.log.debug("Using default getManifestFileUrl function"), O([i, e]);
}
async function ki(i, e, t) {
  t.log.debug("Using default loadVideoManifest function");
  const n = await fetch(i);
  if (n.ok)
    return await n.json();
  throw new Error(t.translate("Error loading video manifest: $1 $2", [n.status, n.statusText]));
}
class le {
  constructor(e) {
    this._player = e;
  }
  get player() {
    return this._player;
  }
}
function Ut({ tag: i = "div", attributes: e = {}, children: t = "", innerText: n = "", parent: s = null }) {
  const a = document.createElement(i);
  a.innerText = n;
  for (let r in e)
    a.setAttribute(r, e[r]);
  return a.innerHTML = t, s && s.appendChild(a), a;
}
function v(i, e = null) {
  const t = document.createElement("div");
  t.innerHTML = i;
  const n = t.children[0];
  return e && e.appendChild(n), n;
}
class $ extends le {
  constructor(e, { tag: t = "div", attributes: n = [], children: s = "", parent: a = null }) {
    super(e), this._element = Ut({ tag: t, attributes: n, children: s, parent: a }), Object.defineProperty(this, t, {
      get: () => this._element
    });
  }
  get element() {
    return this._element;
  }
  get parent() {
    return this._element.parentElement;
  }
  hide() {
    this.element.style.display = "none";
  }
  show(e = "block") {
    this.element.style.display = null;
  }
  get isVisible() {
    const e = window.getComputedStyle(this.element);
    return e.display !== "none" && e.display !== "";
  }
  setAttribute(e, t) {
    this._element.setAttribute(e, t);
  }
  removeFromParent() {
    var e;
    (e = this._element.parentElement) == null || e.removeChild(this._element);
  }
  setParent(e) {
    this.removeFromParent(), e.appendChild(this._element);
  }
}
const Di = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1,0,0,1,3,-3.88857)">
        <path d="M128,35.819C65.633,35.819 14.999,86.453 14.999,148.82C14.999,163.127 17.663,176.817 22.549,189.403L22.475,189.447C11.612,170.791 5.889,149.588 5.889,128C5.889,60.56 60.56,5.889 128,5.889L128,35.819Z" style="fill:url(#_Linear1);"/>
    </g>
    <g transform="matrix(-1,1.22465e-16,-1.22465e-16,-1,258,251.914)">
        <path d="M128,35.819C65.633,35.819 14.999,86.453 14.999,148.82C14.999,163.127 17.663,176.817 22.549,189.403L22.475,189.447C11.612,170.791 5.889,149.588 5.889,128C5.889,60.56 60.56,5.889 128,5.889L128,35.819Z" style="fill:url(#_Linear2);"/>
    </g>
    <defs>
        <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-89.3028,140.734,-140.734,-89.3028,144.417,48.7125)"><stop offset="0" style="stop-color:rgb(13,13,13);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(175,175,175);stop-opacity:0.5"/></linearGradient>
        <linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-89.3028,140.734,-140.734,-89.3028,144.417,48.7125)"><stop offset="0" style="stop-color:rgb(13,13,13);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(175,175,175);stop-opacity:0.5"/></linearGradient>
    </defs>
</svg>
`;
class xi extends $ {
  constructor(e) {
    super(e, { parent: e.containerElement }), this.element.className = "loader-container";
  }
  async create() {
    v(`<i>${Di}</i>`, this.element);
  }
  get debug() {
    return !1;
  }
}
const Ai = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Cancel" transform="matrix(5.54545,6.8353e-32,6.8353e-32,5.54545,-2567.37,-10735.5)">
        <path d="M486.05,1937C498.192,1937 508.05,1946.86 508.05,1959C508.05,1971.14 498.192,1981 486.05,1981C473.908,1981 464.05,1971.14 464.05,1959C464.05,1946.86 473.908,1937 486.05,1937ZM478.979,1950.52L477.565,1951.93L484.636,1959L477.565,1966.07L478.979,1967.49L486.05,1960.41L493.121,1967.49L494.535,1966.07L487.464,1959L494.535,1951.93L493.121,1950.52L486.05,1957.59L478.979,1950.52Z" style="fill:rgb(210,0,0);"/>
    </g>
</svg>
`;
class Ae extends $ {
  constructor(e, t = "") {
    super(e, { parent: e.containerElement }), this.element.className = "error-container", v(`
            <div>
                <i>${Ai}</i>
                <p>${t}</p>
            </div>`, this.element);
  }
}
class ee extends le {
  constructor(e, t) {
    super(e), this._name = t;
  }
  getPluginModuleInstance() {
    return null;
  }
  get config() {
    return this._config;
  }
  get type() {
    return "none";
  }
  get order() {
    var e;
    return ((e = this._config) == null ? void 0 : e.order) || 0;
  }
  get description() {
    var e;
    return ((e = this._config) == null ? void 0 : e.description) || "";
  }
  get name() {
    return this._name;
  }
  async isEnabled() {
    var e;
    return (e = this.config) == null ? void 0 : e.enabled;
  }
  async load() {
  }
  async unload() {
  }
}
class ce extends ee {
  get type() {
    return "video";
  }
  get streamType() {
    return "mp4";
  }
  async isCompatible() {
    return !1;
  }
  async getVideoInstance() {
    return null;
  }
  getCompatibleFileExtensions() {
    return [];
  }
  getManifestData(e) {
  }
}
const Se = [];
async function Mi(i) {
  await M(i, "video", (e) => {
    Se.push(e);
  });
}
async function Ri(i) {
  Se.slice(0);
}
function Ft(i) {
  if (Se.length === 0)
    throw Error("No video plugins loaded. Note that `loadVideoPlugins()` must to be called before using `getVideoPlugins()`.");
  return Se;
}
function Vi(i, e) {
  const t = Ke(e);
  return Ft().find((s) => s.getCompatibleFileExtensions().indexOf(t) !== -1);
}
async function Ni(i, e) {
  const t = Ft();
  let n = null;
  for (const s of t)
    if (await s.isCompatible(e)) {
      n = s;
      break;
    }
  return n;
}
async function Ui() {
  return await new Promise((e) => {
    const t = document.createElement("audio"), n = setTimeout(() => e(!1), 100);
    t.addEventListener("volumechange", (s) => {
      clearTimeout(n), e(!0);
    }), t.volume = 0.5;
  });
}
class Qe extends $ {
  constructor(e, t, n) {
    const s = {
      class: "video-player"
    };
    super(t, { tag: e, attributes: s, parent: n }), this._streamProvider = null, this._streamData = null, this._ready = !1;
  }
  async isVolumeApiAvailable() {
    return await Ui();
  }
  get streamData() {
    return this._streamData;
  }
  get ready() {
    return this._ready;
  }
  async load(e, t) {
    return this._streamProvider = t, this._streamData = e, await this.loadStreamData(e);
  }
  get isMainAudioPlayer() {
    return this._streamProvider.mainAudioPlayer === this;
  }
  // The player must call _videoEndedCallback when the video is ended
  onVideoEnded(e) {
    this._videoEndedCallback = e;
  }
  // The video instance must implement the following functions and properties
  async play() {
    return !1;
  }
  async pause() {
    return !1;
  }
  async duration() {
    return -1;
  }
  get currentTimeSync() {
    return -1;
  }
  async currentTime() {
    return -1;
  }
  async setCurrentTime() {
    return !1;
  }
  async volume() {
    return -1;
  }
  async setVolume() {
    return !1;
  }
  initVolume(e) {
    this._initialVolume = e;
  }
  async paused() {
    return !0;
  }
  async playbackRate() {
    return -1;
  }
  async setPlaybackRate() {
    return !1;
  }
  async getQualities() {
    return null;
  }
  async setQuality() {
    return !1;
  }
  get currentQuality() {
    return null;
  }
  async getDimensions() {
    return null;
  }
  async supportsMultiaudio() {
    return !1;
  }
  async getAudioTracks() {
    return null;
  }
  async setCurrentAudioTrack() {
  }
  get currentAudioTrack() {
    return null;
  }
  async loadStreamData(e) {
    return !1;
  }
  get isEnabled() {
    return this._enabled;
  }
  async enable() {
    this._enabled = !0;
  }
  async disable() {
    this._enabled = !1;
  }
}
class ke extends le {
  get moduleName() {
    return this.player.log.warn(`Incomplete player module definition: '${__filename}.moduleName'`), "-";
  }
  get moduleVersion() {
    return this.player.log.warn(`Incomplete player module definition: '${__filename}.moduleVersion'`), "0.0.0";
  }
  async getDictionaries() {
    return null;
  }
}
const Fi = "paella-core", Oi = {
  ".": "./src/js/index.js",
  "./*": "./src/js/*",
  "./paella-core.css": "./dist/paella-core.css"
}, $i = "2.0.0", Bi = "Multistream HTML video player", Hi = "./src/js/index.js", Gi = [
  "dist/paella-core.css"
], zi = "./src/js/index.js", Ki = "module", Wi = {
  dev: "vite",
  build: "vite build --emptyOutDir"
}, ji = {
  type: "git",
  url: "git+https://github.com/polimediaupv/paella-player.git"
}, Qi = [
  "html",
  "player",
  "video",
  "hls"
], qi = "Fernando Serrano Carpena <ferserc1@gmail.com>", Zi = "ECL-2.0", Yi = {
  url: "https://github.com/polimediaupv/paella-player/issues"
}, Ji = "https://github.com/polimediaupv/paella-player#readme", Xi = {
  vite: "^5.0.8"
}, en = {
  "@ferserc1/input-style-unifier": "^0.0.1",
  "hls.js": "^1.0.4"
}, we = {
  name: Fi,
  exports: Oi,
  version: $i,
  description: Bi,
  main: Hi,
  files: Gi,
  module: zi,
  type: Ki,
  scripts: Wi,
  repository: ji,
  keywords: Qi,
  author: qi,
  license: Zi,
  bugs: Yi,
  homepage: Ji,
  devDependencies: Xi,
  dependencies: en
};
let Me = null;
class j extends ke {
  static Get() {
    return Me || (Me = new j()), Me;
  }
  get moduleName() {
    return "paella-core default video formats";
  }
  get moduleVersion() {
    return we.version;
  }
}
function tn(i) {
  return new Promise((e, t) => {
    const n = new Image();
    n.addEventListener("load", (s) => {
      e(n);
    }), n.addEventListener("error", (s) => {
      t(new Error("Could not load preview image. The preview image is required in audio only streams"));
    }), n.src = i;
  });
}
function nn(i, e, t) {
  return new Promise((n, s) => {
    e.oncanplay = () => n(), e.onerror = () => s(new Error(i.translate("Error loading audio: $1", [t]))), e.src = W(i, t), n();
  });
}
class sn extends Qe {
  constructor(e, t, n) {
    super("audio", e, t), this.isMainAudio = n, this._ready = !1;
  }
  get streamType() {
    return "audio";
  }
  waitForLoaded() {
    return new Promise((e) => {
      const t = () => {
        this._ready ? e() : setTimeout(t, 100);
      };
      t();
    });
  }
  async play() {
    await this.waitForLoaded(), this.audio.play();
  }
  async pause() {
    await this.waitForLoaded(), this.audio.pause();
  }
  async duration() {
    return await this.waitForLoaded(), this.audio.duration;
  }
  get currentTimeSync() {
    var e;
    return ((e = this.audio) == null ? void 0 : e.currentTime) || 0;
  }
  async currentTime() {
    return await this.waitForLoaded(), this.audio.currentTime;
  }
  async setCurrentTime(e) {
    await this.waitForLoaded(), this.audio.currentTime = e;
  }
  async volume() {
    return await this.waitForLoaded(), this.audio.volume;
  }
  async setVolume(e) {
    await this.waitForLoaded(), this.audio.volume = e;
  }
  async paused() {
    return await this.waitForLoaded(), this.audio.paused;
  }
  async playbackRate() {
    return await this.waitForLoaded(), this.audio.playbackRate;
  }
  async setPlaybackRate(e) {
    await this.waitForLoaded(), this.audio.playbackRate = e;
  }
  // getQualities(), setQuality(q), get currentQuality(): audio format does not support multiquality
  async getDimensions() {
    return {
      w: this._previewImage.width,
      h: this._previewImage.height
    };
  }
  async loadStreamData(e = null) {
    this._streamData = this._streamData || e, this.player.log.debug("es.upv.paella.audioVideoFormat: loadStreamData");
    const t = this.player.videoManifest.metadata.preview;
    if (!t || t == null)
      throw new Error("Invalid video manifest data: preview image is required");
    if (this._previewImage = await tn(t), this._imageContainer = document.createElement("div"), this._imageContainer.className = "image-container", this.parent.appendChild(this._imageContainer), this._imageContainer.appendChild(this._previewImage), this._source = e.sources.audio && e.sources.audio[0], !this._source)
      throw new Error("Invalid source in audio only video stream");
    if (!this.isMainAudioPlayer)
      throw new Error("Audio only video stream must be main audio player. Check the role property at video manifest");
    await nn(this.player, this.audio, this._source.src);
    const n = () => {
      const s = this.player.videoContainer.baseVideoRect.offsetWidth / this.player.videoContainer.baseVideoRect.offsetHeight, a = this._previewImage.width / this._previewImage.height;
      s > a ? (this._previewImage.classList.add("landscape"), this._previewImage.classList.remove("portrait")) : (this._previewImage.classList.add("portrait"), this._previewImage.classList.remove("landscape"));
    };
    this.player.frameList.frames.length > 0 && this.audio.addEventListener("timeupdate", (s) => {
      const a = this.player.frameList.getImage(s.target.currentTime, !0);
      this._previewImage.src != a.url && (this._previewImage.src = a.url, this._previewImage.onload = () => n());
    }), window.addEventListener("resize", (s) => n()), n(), this._ready = !0;
  }
}
class an extends ce {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.audioVideoFormat";
  }
  get streamType() {
    return "audio";
  }
  async isCompatible(e) {
    return e.sources.audio != null;
  }
  async getVideoInstance(e, t) {
    return new sn(this.player, e, t);
  }
  getCompatibleFileExtensions() {
    return ["m4a", "mp3"];
  }
  getManifestData(e) {
    return {
      audio: e.map((t) => ({
        src: t
      }))
    };
  }
}
class qe extends Qe {
  constructor(e, t, n, s) {
    super("video", e, t), this._config = s || {};
    const a = this._config.crossOrigin ?? "";
    this.element.setAttribute("playsinline", ""), a !== !1 && this.element.setAttribute("crossorigin", a), this.isMainAudio = n, this.element.setAttribute("autoplay", ""), this.element.autoplay = !0, n || (this.element.muted = !0), this._videoEnabled = !0;
  }
  async play() {
    if (this._videoEnabled)
      try {
        return await this.waitForLoaded(), this.video.play();
      } catch {
      }
    else
      this._disabledProperties.paused = !1;
  }
  async pause() {
    if (this._videoEnabled)
      return await this.waitForLoaded(), this.video.pause();
    this._disabledProperties.paused = !0;
  }
  async duration() {
    return this._videoEnabled ? (await this.waitForLoaded(), this.video.duration) : this._disabledProperties.duration;
  }
  get currentTimeSync() {
    return this._videoEnabled ? this.ready ? this.video.currentTime : -1 : this._disabledProperties.currentTime;
  }
  async currentTime() {
    return this._videoEnabled ? (await this.waitForLoaded(), this.currentTimeSync) : this._disabledProperties.currentTime;
  }
  async setCurrentTime(e) {
    return this._videoEnabled ? (await this.waitForLoaded(), this.video.currentTime = e) : (this._disabledProperties.currentTime = e, e);
  }
  async volume() {
    return this._videoEnabled ? (await this.waitForLoaded(), this.video.volume) : this._disabledProperties.volume;
  }
  async setVolume(e) {
    return this._videoEnabled ? (await this.waitForLoaded(), e === 0 ? this.video.setAttribute("muted", "") : this.video.removeAttribute("muted"), this.video.volume = e) : (this._disabledProperties.volume = e, e);
  }
  async paused() {
    return this._videoEnabled ? (await this.waitForLoaded(), this.video.paused) : this._disabledProperties.paused;
  }
  async playbackRate() {
    return this._videoEnabled ? (await this.waitForLoaded(), await this.video.playbackRate) : this._disabledProperties.playbackRate;
  }
  async setPlaybackRate(e) {
    return this._videoEnabled ? (await this.waitForLoaded(), this.video.playbackRate = e) : (this._disabledProperties.playbackRate = e, e);
  }
  async getQualities() {
  }
  async setQuality() {
  }
  get currentQuality() {
    return 0;
  }
  async getDimensions() {
    return this._videoEnabled ? (await this.waitForLoaded(), { w: this.video.videoWidth, h: this.video.videoHeight }) : { w: this._disabledProperties.videoWidth, h: this._disabledProperties.videoHeight };
  }
  saveDisabledProperties(e) {
    this._disabledProperties = {
      duration: e.duration,
      volume: e.volume,
      videoWidth: e.videoWidth,
      videoHeight: e.videoHeight,
      playbackRate: e.playbackRate,
      paused: e.paused,
      currentTime: e.currentTime
    };
  }
  async loadStreamData(e = null) {
    this._streamData = this._streamData || e, this.player.log.debug("es.upv.paella.htmlVideoFormat: loadStreamData"), this._sources = e.sources.html, this._currentQuality = 0, this.isMainAudioPlayer || (this.video.muted = !0), this._sources.forEach(({ src: t, mimetype: n }) => {
      t = W(this.player, t);
      const s = document.createElement("source");
      s.src = t, s.type = n, this.video.appendChild(s);
    }), this._endedCallback = this._endedCallback || (() => {
      typeof this._videoEndedCallback == "function" && this._videoEndedCallback();
    }), this.video.addEventListener("ended", this._endedCallback);
    try {
      await this.video.play();
    } catch {
    }
    await this.waitForLoaded(), this.player.log.debug(`es.upv.paella.htmlVideoFormat (${this.streamData.content}): video loaded and ready.`), this.saveDisabledProperties(this.video);
  }
  async clearStreamData() {
    this.video.src = "", this.video.removeEventListener("ended", this._endedCallback), this.video.removeEventListener("loadeddata", this._handleLoadedCallback), this._ready = !1;
  }
  get isEnabled() {
    return this._videoEnabled;
  }
  async enable() {
    this._videoEnabled = !0;
  }
  async disable() {
    return this.isMainAudio ? this.player.log.debug("video.disable() - the video is not disabled because it is the main audio source.") : this._videoEnabled = !1, this._videoEnabled;
  }
  waitForLoaded() {
    return new Promise((e, t) => {
      this.video.readyState >= 2 && (this._ready = !0), this.ready ? e() : (this._handleLoadedCallback = (n) => {
        this.video.readyState >= 2 && (this.video.pause(), this._ready = !0, e());
      }, this.video.addEventListener("loadeddata", this._handleLoadedCallback));
    });
  }
}
class rn extends ce {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.htmlVideoFormat";
  }
  get streamType() {
    return "html";
  }
  async isCompatible(e) {
    const { html: t } = e.sources;
    return t && t.some((n) => je(n.mimetype));
  }
  async getVideoInstance(e, t) {
    return new qe(this.player, e, t, this.config);
  }
  getCompatibleFileExtensions() {
    return ["m4v", "mp4", "ogg", "webm", "ogv"];
  }
  getManifestData(e) {
    const t = (n) => {
      switch (Ke(n)) {
        case "mp4":
        case "m4v":
          return "video/mp4";
        case "webm":
          return "video/webm";
        case "ogg":
        case "ogv":
          return "video/ogg";
        default:
          return null;
      }
    };
    return {
      html: e.map((n) => ({
        src: n,
        mimetype: t(n)
      }))
    };
  }
}
class ae {
  constructor({ label: e, shortLabel: t, isAuto: n = !1, index: s = 0, src: a = "", width: r = -1, height: o = -1, bitrate: l = -1 }) {
    this._label = e, this._shortLabel = t, this._index = s, this._src = a, this._res = {
      w: r,
      h: o
    }, this._bitrate = l, this._isAuto = n;
  }
  get label() {
    return this._label;
  }
  get shortLabel() {
    return this._shortLabel;
  }
  get index() {
    return this._index;
  }
  get src() {
    return this._src;
  }
  get res() {
    return this._res;
  }
  get bitrate() {
    return this._bitrate;
  }
  get isAuto() {
    return this._isAuto;
  }
  get quality() {
    return this._res.w !== -1 && this._res.h !== -1 ? this._res.w * this._res.h : this._bitrate;
  }
  compare(e) {
    return e.quality - this.quality;
  }
}
class rt {
  constructor({
    id: e,
    name: t,
    groupId: n = "",
    language: s = "",
    selected: a = !1
  }) {
    this._id = e, this._name = t, this._groupId = n, this._lang = s, this._selected = a;
  }
  get id() {
    return this._id;
  }
  get name() {
    return this._name;
  }
  get groupId() {
    return this._groupId;
  }
  get language() {
    return this._lang;
  }
  get selected() {
    return this._selected;
  }
  set selected(e) {
    this._selected = e;
  }
}
const ot = {
  autoStartLoad: !0,
  startPosition: -1,
  capLevelToPlayerSize: !0,
  debug: !1,
  defaultAudioCodec: void 0,
  initialLiveManifestSize: 1,
  maxBufferLength: 6,
  maxMaxBufferLength: 6,
  maxBufferSize: 600 * 1e3 * 1e3,
  maxBufferHole: 0.5,
  lowBufferWatchdogPeriod: 0.5,
  highBufferWatchdogPeriod: 3,
  nudgeOffset: 0.1,
  nudgeMaxRetry: 3,
  maxFragLookUpTolerance: 0.2,
  enableWorker: !0,
  enableSoftwareAES: !0,
  manifestLoadingTimeOut: 1e4,
  manifestLoadingMaxRetry: 1,
  manifestLoadingRetryDelay: 500,
  manifestLoadingMaxRetryTimeout: 64e3,
  startLevel: void 0,
  levelLoadingTimeOut: 1e4,
  levelLoadingMaxRetry: 4,
  levelLoadingRetryDelay: 500,
  levelLoadingMaxRetryTimeout: 64e3,
  fragLoadingTimeOut: 2e4,
  fragLoadingMaxRetry: 6,
  fragLoadingRetryDelay: 500,
  fragLoadingMaxRetryTimeout: 64e3,
  startFragPrefetch: !1,
  appendErrorMaxRetry: 3,
  enableWebVTT: !0,
  enableCEA708Captions: !0,
  stretchShortVideoTrack: !1,
  maxAudioFramesDrift: 1,
  forceKeyFrameOnDiscontinuity: !0,
  abrEwmaFastLive: 5,
  abrEwmaSlowLive: 9,
  abrEwmaFastVoD: 4,
  abrEwmaSlowVoD: 15,
  abrEwmaDefaultEstimate: 5e5,
  abrBandWidthFactor: 0.95,
  abrBandWidthUpFactor: 0.7,
  minAutoBitrate: 0
}, lt = {
  withCredentials: !0,
  requestHeaders: {
    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With",
    "Access-Control-Allow-Origin": "http://localhost:8000",
    "Access-Control-Allow-Credentials": "true"
  }
}, D = {
  UNSUPPORTED: 0,
  MEDIA_SOURCE_EXTENSIONS: 1,
  NATIVE: 2
};
let Re = null;
async function Ze() {
  return Re || (console.debug("Loading HLS.js"), Re = (await import("./hls-FataH-6s.js")).default), Re;
}
async function V(i = !1) {
  const e = await Ze(), t = document.createElement("video");
  return t.canPlayType("application/vnd.apple.mpegurl") && i ? D.NATIVE : e.isSupported() ? D.MEDIA_SOURCE_EXTENSIONS : t.canPlayType("application/vnd.apple.mpegurl") ? D.NATIVE : D.UNSUPPORTED;
}
const on = async (i, e, t, n, s) => {
  var l, c;
  const a = await Ze();
  s.withCredentials && (n.xhrSetup = function(d, u) {
    d.withCredentials = s.withCredentials;
    for (const h in s.requestHeaders) {
      const y = s.requestHeaders[h];
      d.setRequestHeader(h, y);
    }
  }), n.autoStartLoad = !0;
  const r = new a(n), o = ((c = (l = e == null ? void 0 : e.sources) == null ? void 0 : l.hls) == null ? void 0 : c.length) > 0 && e.sources.hls[0];
  return [r, new Promise((d, u) => {
    let h = !1;
    r.on(a.Events.LEVEL_SWITCHED, (_, p) => {
      i.log.debug(`HLS: quality level switched to ${p.level}`), h || (r.currentLevel = -1, h = !0), b(i, g.VIDEO_QUALITY_CHANGED, {});
    }), r.on(a.Events.ERROR, (_, p) => {
      if (p.fatal)
        switch (p.type) {
          case a.ErrorTypes.NETWORK_ERROR:
            p.details === a.ErrorDetails.MANIFEST_LOAD_ERROR ? u(Error("hlsVideoFormatPlugin: unrecoverable error in HLS player. The video is not available")) : (i.log.warn("hlsVideoFormatPlugin: Fatal network error. Try to recover"), r.startLoad());
            break;
          case a.ErrorTypes.MEDIA_ERROR:
            i.log.warn("hlsVideoFormatPlugin: Fatal media error encountered. Try to recover"), r.recoverMediaError();
            break;
          default:
            r.destroy(), u(Error("hlsVideoFormat: Fatal error. Can not recover"));
        }
      else
        i.log.warn("HLS: error"), i.log.warn(p.details);
    }), r.on(a.Events.LEVEL_SWITCHING, () => {
      i.log.debug("HLS media attached");
    }), r.on(a.Events.MEDIA_ATTACHED, () => {
      i.log.debug("HLS media attached");
    }), r.on(a.Events.MEDIA_DETACHING, () => {
      i.log.debug("HLS media detaching");
    }), r.on(a.Events.MEDIA_DETACHED, () => {
      i.log.debug("HLS media detached");
    }), r.on(a.Events.MANIFEST_PARSED, () => {
      i.log.debug("HLS manifest parsed"), r.startLoad(-1);
    });
    const y = Math.floor(Math.random() * 1e11), w = o.src + (n.enableCache ? /\?/.test(o.src) ? `&cache=${y}` : `?cache=${y}` : "");
    r.loadSource(w), r.attachMedia(t);
    let C = !1;
    r._videoEventListener = () => {
      C = !0, d();
    }, t.addEventListener("canplay", r._videoEventListener), setTimeout(() => {
      C || t.play();
    }, 1e3);
  })];
};
class Ot extends qe {
  constructor(e, t, n, s) {
    super(e, t, s, n), this._config = this._config || {
      audioTrackLabel: n.audioTrackLabel || "name",
      enableCache: n.enableCache || !1
    };
    for (const a in ot)
      this._config[a] = ot[a];
    for (const a in n.hlsConfig)
      this._config[a] = n.hlsConfig[a];
    this._cors = {};
    for (const a in lt)
      this._cors[a] = lt[a];
    for (const a in n.corsConfig)
      this._cors[a] = n.corsConfig[a];
    this._ready = !1, this._autoQuality = !0, this._forceNative = n.forceNative || !1;
  }
  get autoQuality() {
    return this._autoQuality;
  }
  get forceNative() {
    return this._forceNative;
  }
  async loadStreamData(e) {
    var n, s;
    if (await V(this.forceNative) === D.NATIVE) {
      e.sources.mp4 = e.sources.hls;
      const a = await super.loadStreamData(e), r = await this.getAudioTracks();
      return this._currentAudioTrack = r.find((o) => o.selected), this._autoQuality = new ae({
        label: "auto",
        shortLabel: "auto",
        index: -1,
        width: 1,
        height: 1,
        isAuto: !0
      }), this._currentQuality = this._autoQuality, this.saveDisabledProperties(this.video), this._endedCallback = this._endedCallback || (() => {
        typeof this._videoEndedCallback == "function" && this._videoEndedCallback();
      }), this.video.addEventListener("ended", this._endedCallback), a;
    } else {
      this.player.log.debug("Loading HLS stream");
      const a = ((s = (n = e == null ? void 0 : e.sources) == null ? void 0 : n.hls) == null ? void 0 : s.length) && e.sources.hls[0];
      this._config.audioTrackLabel = (a == null ? void 0 : a.audioLabel) || this._config.audioTrackLabel;
      const [r, o] = await on(this.player, e, this.video, this._config, this._cors);
      this._hls = r, await o, this.video.pause(), this._autoQuality = new ae({
        label: "auto",
        shortLabel: "auto",
        index: -1,
        width: 1,
        height: 1,
        isAuto: !0
      }), this._currentQuality = this._autoQuality;
      const l = await this.getAudioTracks();
      this._currentAudioTrack = l.find((c) => c.selected), this.saveDisabledProperties(this.video), this._endedCallback = this._endedCallback || (() => {
        typeof this._videoEndedCallback == "function" && this._videoEndedCallback();
      }), this.video.addEventListener("ended", this._endedCallback);
    }
  }
  async duration() {
    var e;
    if (this._videoEnabled) {
      await this.waitForLoaded();
      let t = this.video.duration;
      return t === 1 / 0 && (t = ((e = this._hls) == null ? void 0 : e.liveSyncPosition) || 0), t;
    } else
      return this._disabledProperties.duration;
  }
  async waitForLoaded() {
    if (await V(this.forceNative) === D.NATIVE)
      return super.waitForLoaded();
    await new Promise((t, n) => {
      const s = () => {
        this.video.readyState >= 2 ? (this._ready = !0, t()) : setTimeout(() => s(), 200);
      };
      s();
    });
  }
  async getQualities() {
    const e = [];
    return e.push(this._autoQuality), await V(this.forceNative) === D.MEDIA_SOURCE_EXTENSIONS && (this._hls.levels.forEach((n, s) => {
      e.push(new ae({
        index: s,
        // TODO: should be level.id??
        label: `${n.width}x${n.height}`,
        shortLabel: `${n.height}p`,
        width: n.width,
        height: n.height
      }));
    }), e.sort((n, s) => n.res.h - s.res.h)), e;
  }
  async setQuality(e) {
    const t = await V(this.forceNative);
    if (this._videoEnabled) {
      if (!(e instanceof ae))
        throw Error("Invalid parameter setting video quality. VideoQualityItem object expected.");
      t === D.MEDIA_SOURCE_EXTENSIONS ? (this._currentQuality = e, this._hls.currentLevel = e.index) : this.player.log.warn("Could not set video quality of HLS stream, because the HLS support of this browser is native.");
    }
  }
  get currentQuality() {
    return this._currentQuality;
  }
  async supportsMultiaudio() {
    var t;
    await this.waitForLoaded();
    const e = await V(this.forceNative);
    return e === D.MEDIA_SOURCE_EXTENSIONS ? this._hls.audioTracks.length > 1 : e === D.NATIVE ? ((t = this.video.audioTracks) == null ? void 0 : t.length) > 1 : !1;
  }
  async getAudioTracks() {
    await this.waitForLoaded();
    const e = this._config.audioTrackLabel || "name", t = await V(this.forceNative);
    return t === D.MEDIA_SOURCE_EXTENSIONS ? this._hls.audioTracks.map((s) => new rt({
      id: s.id,
      name: s[e],
      language: s.lang,
      selected: this._hls.audioTrack === s.id
    })) : t === D.NATIVE ? Array.from(this.video.audioTracks).map((s) => new rt({
      id: s.id,
      name: s.label,
      language: s.language,
      selected: s.enabled
    })) : null;
  }
  async setCurrentAudioTrack(e) {
    await this.waitForLoaded();
    const n = (await this.getAudioTracks()).find((a) => a.id === e.id), s = await V(this.forceNative);
    return s === D.MEDIA_SOURCE_EXTENSIONS && n ? this._hls.audioTrack = n.id : s === D.NATIVE && n && Array.from(this.video.audioTracks).forEach((a) => {
      a.id === n.id ? a.enabled = !0 : a.enabled = !1;
    }), this._currentAudioTrack = n, n;
  }
  get currentAudioTrack() {
    return this._currentAudioTrack;
  }
  async clearStreamData() {
    this.video.removeEventListener("canplay", this._hls._videoEventListener), this.video.src = "", this._hls.destroy(), this._ready = !1;
  }
}
class ln extends ce {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.hlsVideoFormat";
  }
  get streamType() {
    return "hls";
  }
  async isCompatible(e) {
    const { hls: t } = e.sources;
    return t && await V();
  }
  async getVideoInstance(e, t) {
    return new Ot(this.player, e, this.config, t);
  }
  getCompatibleFileExtensions() {
    return ["m3u8"];
  }
  getManifestData(e) {
    return {
      hls: e.map((t) => ({
        src: t,
        mimetype: "video/mp4"
      }))
    };
  }
}
const cn = async (i, e, t, n, s) => {
  var l, c;
  const a = await Ze();
  s.withCredentials && (n.xhrSetup = function(d, u) {
    d.withCredentials = s.withCredentials;
    for (const h in s.requestHeaders) {
      const y = s.requestHeaders[h];
      d.setRequestHeader(h, y);
    }
  });
  const r = new a(n), o = ((c = (l = e == null ? void 0 : e.sources) == null ? void 0 : l.hlsLive) == null ? void 0 : c.length) > 0 && e.sources.hlsLive[0];
  return n.initialQualityLevel !== void 0 && n.initialQualityLevel, [r, new Promise((d, u) => {
    let h = !1;
    r.on(a.Events.LEVEL_SWITCHED, (C, _) => {
      (void 0).player.log.debug(`HLS: quality level switched to ${_.level}`), h || (r.currentLevel = -1, h = !0), b(i, g.VIDEO_QUALITY_CHANGED, {});
    }), r.on(a.Events.ERROR, (C, _) => {
      if (_.fatal)
        switch (_.type) {
          case a.ErrorTypes.NETWORK_ERROR:
            _.details === a.ErrorDetails.MANIFEST_LOAD_ERROR ? u(Error("hlsVideoFormatPlugin: unrecoverable error in HLS player. The video is not available")) : (i.log.warn("hlsVideoFormatPlugin: Fatal network error. Try to recover"), r.startLoad());
            break;
          case a.ErrorTypes.MEDIA_ERROR:
            i.log.warn("hlsVideoFormatPlugin: Fatal media error encountered. Try to recover"), r.recoverMediaError();
            break;
          default:
            r.destroy(), u(Error("hlsVideoFormat: Fatal error. Can not recover"));
        }
    }), r.on(a.Events.MANIFEST_PARSED, () => {
      n.autoStartLoad || r.autoStartLoad();
    });
    const y = Math.floor(Math.random() * 1e11), w = o.src + (n.enableCache ? /\?/.test(o.src) ? `&cache=${y}` : `?cache=${y}` : "");
    r.loadSource(w), r.attachMedia(t), r._videoEventListener = () => {
      d();
    }, t.addEventListener("canplay", r._videoEventListener);
  })];
};
class un extends Ot {
  async loadStreamData(e) {
    if (await V() === D.NATIVE)
      return e.sources.hls = e.sources.hlsLive, super.loadStreamData(e);
    {
      this.player.log.debug("Loading HLS stream");
      const [n, s] = await cn(this.player, e, this.video, this._config, this._cors);
      this._hls = n, await s, this._autoQuality = new ae({
        label: "auto",
        shortLabel: "auto",
        index: -1,
        width: 1,
        height: 1,
        isAuto: !0
      }), this._currentQuality = this._autoQuality;
      const a = await this.getAudioTracks();
      this._currentAudioTrack = a.find((r) => r.selected), this.saveDisabledProperties(this.video);
    }
  }
}
class dn extends ce {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.hlsLiveVideoFormat";
  }
  get streamType() {
    return "hlsLive";
  }
  async isCompatible(e) {
    const t = await V(), { hlsLive: n } = e.sources;
    return n && t;
  }
  async getVideoInstance(e, t) {
    return new un(this.player, e, this.config, t);
  }
}
function $t(i) {
  let e = this._currentSource.frames[0];
  this._currentSource.frames.some((t) => {
    if (t.time <= this._currentTime)
      e = t;
    else
      return !0;
  }), this.img.src = e.src;
}
function hn() {
  this._startTimestamp = Date.now();
  const i = () => {
    this._timer = setTimeout(i, 250);
    const e = Date.now(), t = e - this._startTimestamp;
    this._currentTime += t / 1e3, this._startTimestamp = e, $t.apply(this, [this._currentTime]);
  };
  i();
}
function pn() {
  this._timer && (clearTimeout(this._timer), this._timer = null);
}
class gn extends Qe {
  constructor(e, t) {
    super("img", e, t), this._currentTime = 0, this._startTimesamp = 0, this._playbackRate = 1, this._timer = null, this.video = this.domElement;
  }
  async play() {
    hn.apply(this);
  }
  async pause() {
    pn.apply(this);
  }
  async duration() {
    return this._currentSource.duration;
  }
  get currentTimeSync() {
    return this._currentTime;
  }
  async currentTime() {
    return this._currentTime;
  }
  async setCurrentTime(e) {
    this._currentTime = e, $t.apply(this, [e]);
  }
  async volume() {
    return 0;
  }
  async setVolume(e) {
  }
  async paused() {
    return this._timer === null;
  }
  async playbackRate() {
    return this._playbackRate;
  }
  async setPlaybackRate(e) {
    this._playbackRate = e;
  }
  async getQualities() {
    return this._qualities;
  }
  async setQuality() {
  }
  get currentQuality() {
    return this._currentQuality;
  }
  async getDimensions() {
    return this._currentSource.res;
  }
  async loadStreamData(e) {
    return this._sources = e.sources.image, this._qualities = this._sources.map((t) => new ae({
      src: t.frames[0].src,
      label: `${t.res.w}x${t.res.h}`,
      shortLabel: `${t.res.h}p`,
      width: t.res.w,
      height: t.res.h
    })), this._currentQuality = this._qualities.length - 1, this._qualities.forEach((t, n) => {
      this._qualities[this._currentQuality].compare(t) > 0 && (this._currentQuality = n);
    }), this._currentSource = this._sources[this._currentQuality], this._sources.forEach((t) => {
      t.frames.sort((n, s) => n.time - s.time);
    }), !0;
  }
}
class mn extends ce {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.imageVideoFormat";
  }
  get streamType() {
    return "image";
  }
  async isCompatible(e) {
    return e.sources.image != null;
  }
  async getVideoInstance(e, t) {
    return new gn(this.player, e, this.config, t);
  }
}
class fn extends qe {
  constructor(e, t, n, s) {
    super(e, t, n, s);
  }
  // This function is called when the player loads, and it should
  // make everything ready for video playback to begin.
  async loadStreamData(e = null) {
    this._streamData = this._streamData || e, this.player.log.debug("es.upv.paella.mp4VideoFormat: loadStreamData"), this._currentSource || (this._sources = null, this._currentQuality = 0, this._sources = e.sources.mp4, this._sources.sort((t, n) => Number(t.res.w) - Number(n.res.w)), this._currentQuality = this._sources.length - 1, this._currentSource = this._sources[this._currentQuality]), this.isMainAudioPlayer || (this.video.muted = !0), this._initialVolume && (this.video.volume = this._initialVolume, this._initialVolume === 0 && (this.video.muted = !0)), this.video.src = W(this.player, this._currentSource.src), this._endedCallback = this._endedCallback || (() => {
      typeof this._videoEndedCallback == "function" && this._videoEndedCallback();
    }), this.video.addEventListener("ended", this._endedCallback);
    try {
      await this.video.play();
    } catch {
    }
    await this.waitForLoaded(), this.player.log.debug(`es.upv.paella.mp4VideoFormat (${this.streamData.content}): video loaded and ready.`), this.saveDisabledProperties(this.video);
  }
}
class yn extends ce {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.mp4VideoFormat";
  }
  get streamType() {
    return "mp4";
  }
  isCompatible(e) {
    var n;
    const { mp4: t } = e.sources;
    return t && je((n = t[0]) == null ? void 0 : n.mimetype);
  }
  async getVideoInstance(e, t) {
    return new fn(this.player, e, t, this.config);
  }
  getCompatibleFileExtensions() {
    return ["m4v", "mp4"];
  }
  getManifestData(e) {
    return {
      mp4: e.map((t) => ({
        src: t,
        mimetype: "video/mp4"
      }))
    };
  }
}
const Ee = (i) => {
  var e, t, n;
  return `alt:${((e = i.keyModifiers) == null ? void 0 : e.altKey) || !1}, ctrl:${((t = i.keyModifiers) == null ? void 0 : t.ctrlKey) || !1}, shift:${((n = i.keyModifiers) == null ? void 0 : n.shiftKey) || !1}`;
}, _n = (i) => `${i.keyCode}_${Ee(i)}`, vn = (i) => {
  i.keyModifiers = i.keyModifiers || {}, i.keyModifiers.altKey = i.keyModifiers.altKey || !1, i.keyModifiers.shiftKey = i.keyModifiers.shiftKey || !1, i.keyModifiers.ctrlKey = i.keyModifiers.ctrlKey || !1;
}, wn = (i) => {
  const e = [];
  for (const t in i.__shortcuts__)
    i.__shortcuts__[t].forEach((s) => {
      s.disabled || e.push(s);
    });
  return e;
};
async function Cn(i) {
  if (i.__shortcuts__ = i.__shortcuts__ || {}, !window.__paella_shortcuts_player__)
    window.__paella_shortcuts_player__ = i;
  else {
    i.log.warn("Warning: more than one paella player instance with enabled shortcut plugins."), i.log.warn("Check your code to ensure that only one instance of paella player registers keyboard shortcut plugins.");
    return;
  }
  await M(i, "keyshortcut", async (e) => {
    (await e.getKeys()).forEach((s) => {
      i.__shortcuts__[s.keyCode] = i.__shortcuts__[s.keyCode] || [], s.plugin = e, i.__shortcuts__[s.keyCode].push(s);
    });
    const n = await e.getDictionaries();
    for (const s in n) {
      const a = n[s];
      i.addDictionary(s, a);
    }
    for (const s in i.__shortcuts__) {
      const a = i.__shortcuts__[s], r = {};
      a.length > 0 && a.forEach((o) => {
        const l = _n(o);
        if (vn(o), !r[l])
          r[l] = o;
        else {
          i.log.warn(`Collision detected in shortcut for key code ${s}`);
          const c = r[l];
          i.log.warn("Enabled shortcut:"), i.log.warn(`plugin: ${c.plugin.name}, keyCode: ${c.keyCode}, modifiers: ${Ee(c)}, description: ${c.description}`), i.log.warn("Collision shortcut (disabled):"), i.log.warn(`plugin: ${o.plugin.name}, keyCode: ${o.keyCode}, modifiers: ${Ee(o)}, description: ${o.description}`), o.disabled = !0;
        }
      });
    }
  }), i.__paella_key_event_listener__ = async (e) => {
    var r, o;
    const t = () => document.activeElement && document.activeElement !== document.body && !/video/i.test(document.activeElement.tagName);
    if (!i.containerElement.contains(document.activeElement) && document.activeElement !== document.body)
      return;
    const n = document.activeElement;
    if (/input/i.test(n.tagName) && /range/i.test(n.type) && /Arrow/i.test(e.code) || (((r = i.config.accessibility) == null ? void 0 : r.clickWithSpacebar) !== void 0 ? (o = i.config.accessibility) == null ? void 0 : o.clickWithSpacebar : !0) && e.code === "Space" && t())
      return;
    const a = i.__shortcuts__[e.code];
    a && await a.forEach(async (l) => {
      var h, y, w, C, _, p;
      const c = !((h = l.keyModifiers) != null && h.altKey) || ((y = l.keyModifiers) == null ? void 0 : y.altKey) && e.altKey, d = !((w = l.keyModifiers) != null && w.ctrlKey) || ((C = l.keyModifiers) == null ? void 0 : C.ctrlKey) && e.ctrlKey, u = !((_ = l.keyModifiers) != null && _.shiftKey) || ((p = l.keyModifiers) == null ? void 0 : p.shiftKey) && e.shiftKey;
      c && d && u && !l.disabled ? await l.action(e) : c && d && u && l.disabled && (i.log.warn("Shortcut not triggered due to collision:"), i.log.warn(`plugin: ${l.plugin.name}, keyCode: ${l.keyCode}, modifiers: ${Ee(l)}, description: ${l.description}`));
    });
  }, window.addEventListener("keyup", i.__paella_key_event_listener__);
}
async function bn(i) {
  delete i.__shortcuts__, i == window.__paella_shortcuts_player__ && (window.removeEventListener("keyup", i.__paella_key_event_listener__), delete window.__paella_key_event_listener__, delete window.__paella_shortcuts_player__);
}
const x = {
  Digit1: "Digit1",
  Digit2: "Digit2",
  Digit3: "Digit3",
  Digit4: "Digit4",
  Digit5: "Digit5",
  Digit6: "Digit6",
  Digit7: "Digit7",
  Digit8: "Digit8",
  Digit9: "Digit9",
  Digit0: "Digit0",
  KeyA: "KeyA",
  KeyB: "KeyB",
  KeyC: "KeyC",
  KeyD: "KeyD",
  KeyE: "KeyE",
  KeyF: "KeyF",
  KeyG: "KeyG",
  KeyH: "KeyH",
  KeyI: "KeyI",
  KeyJ: "KeyJ",
  KeyK: "KeyK",
  KeyL: "KeyL",
  KeyM: "KeyM",
  KeyN: "KeyN",
  KeyO: "KeyO",
  KeyP: "KeyP",
  KeyQ: "KeyQ",
  KeyR: "KeyR",
  KeyS: "KeyS",
  KeyT: "KeyT",
  KeyU: "KeyU",
  KeyV: "KeyV",
  KeyW: "KeyW",
  KeyX: "KeyX",
  KeyY: "KeyY",
  KeyZ: "KeyZ",
  Comma: "Comma",
  Period: "Period",
  Semicolon: "Semicolon",
  Quote: "Quote",
  BracketLeft: "BracketLeft",
  BracketRight: "BracketRight",
  Backquote: "Backquote",
  Backslash: "Backslash",
  Minus: "Minus",
  Equal: "Equal",
  AltLeft: "AltLeft",
  AltRight: "AltRight",
  CapsLock: "CapsLock",
  ControlLeft: "ControlLeft",
  ControlRight: "ControlRight",
  OSLeft: "OSLeft",
  OSRight: "OSRight",
  ShiftLeft: "ShiftLeft",
  ShiftRight: "ShiftRight",
  ContextMenu: "ContextMenu",
  Enter: "Enter",
  Space: "Space",
  Tab: "Tab",
  Delete: "Delete",
  End: "End",
  Help: "Help",
  Home: "Home",
  Insert: "Insert",
  PageDown: "PageDown",
  PageUp: "PageUp",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  ArrowRight: "ArrowRight",
  ArrowUp: "ArrowUp",
  Escape: "Escape",
  PrintScreen: "PrintScreen",
  ScrollLock: "ScrollLock",
  Pause: "Pause"
};
class Ln extends ee {
  get type() {
    return "keyshortcut";
  }
  /**
   * 
   * @returns [{ keyCode: KeyCode, keyModifiers: [KeyModifiers], description: string, action: async function }]
   */
  async getKeys() {
    return [];
  }
  async getDictionaries() {
    return {};
  }
}
const I = Object.freeze({
  TOP_LEFT: "topLeft",
  TOP_MIDDLE: "topMiddle",
  TOP_RIGHT: "topRight",
  CENTER_LEFT: "centerLeft",
  CENTER_MIDDLE: "centerMiddle",
  CENTER_RIGHT: "centerRight",
  BOTTOM_LEFT: "bottomLeft",
  BOTTOM_MIDDLE: "bottomMiddle",
  BOTTOM_RIGHT: "bottomRight"
}), F = (i, e, t, n, s) => {
  n = n || "", t = t || 1e3;
  const a = v(`
        <div class="message-content ${n}">
            ${i ? `<i class="icon">${i}</i>` : ""}
            ${e ? `<p class="text">${e}</p>` : ""}
        </div>
    `);
  return s.innerHTML = "", s.appendChild(a), s.timer && (clearTimeout(s.timer), s.timer = null), s.timer = setTimeout(() => {
    s.removeChild(a);
  }, t), a;
};
class En extends $ {
  constructor(e, t) {
    const n = { class: "video-container-message" };
    super(e, { attributes: n, parent: t }), this._topLeftContainer = v('<div class="container top-left"></div>', this.element), this._topMiddleContainer = v('<div class="container top-middle"></div>', this.element), this._topRightContainer = v('<div class="container top-right"></div>', this.element), this._centerLeftContainer = v('<div class="container center-left"></div>', this.element), this._centerMiddleContainer = v('<div class="container center-middle"></div>', this.element), this._centerRightContainer = v('<div class="container center-right"></div>', this.element), this._bottomLeftContainer = v('<div class="container bottom-left"></div>', this.element), this._bottomMiddleContainer = v('<div class="container bottom-middle"></div>', this.element), this._bottomRightContainer = v('<div class="container bottom-right"></div>', this.element);
  }
  show({ icon: e = null, text: t = "", timeout: n = 1e3, position: s = I.CENTER_MIDDLE, cssClass: a = "" }) {
    switch (s) {
      case I.TOP_LEFT:
        F.apply(this, [e, t, n, a, this._topLeftContainer]);
        break;
      case I.TOP_MIDDLE:
        F.apply(this, [e, t, n, a, this._topMiddleContainer]);
        break;
      case I.TOP_RIGHT:
        F.apply(this, [e, t, n, a, this._topRightContainer]);
        break;
      case I.CENTER_LEFT:
        F.apply(this, [e, t, n, a, this._centerLeftContainer]);
        break;
      case I.CENTER_MIDDLE:
        F.apply(this, [e, t, n, a, this._centerMiddleContainer]);
        break;
      case I.CENTER_RIGHT:
        F.apply(this, [e, t, n, a, this._centerRightContainer]);
        break;
      case I.BOTTOM_LEFT:
        F.apply(this, [e, t, n, a, this._bottomLeftContainer]);
        break;
      case I.BOTTOM_MIDDLE:
        F.apply(this, [e, t, n, a, this._bottomMiddleContainer]);
        break;
      case I.BOTTOM_RIGHT:
        F.apply(this, [e, t, n, a, this._bottomRightContainer]);
        break;
    }
  }
}
const Pn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="volume-mute" serif:id="volume mute" transform="matrix(1,0,0,1,-123,-4.71142)">
        <path d="M142,28.522L142,31.68C142,32.961 140.961,34 139.68,34L131.499,25L127.375,25C126.063,25 125,23.937 125,22.625L125,16.375C125,15.063 126.063,14 127.375,14L127.478,14L142,28.522ZM151.228,34.983L123,6.756L125.044,4.711L132.848,12.516L139.68,5C140.961,5 142,6.039 142,7.32L142,21.667L153.272,32.939L151.228,34.983Z"/>
    </g>
</svg>
`, Sn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="volume-low" serif:id="volume low" transform="matrix(1,0,0,1,-165,-5)">
        <g>
            <g transform="matrix(1,0,0,1,0.75,-1)">
                <path d="M184.233,14.077C188.981,14.489 191.571,24.435 184.954,27.208C183.497,27.819 181.723,25.826 183.988,24.902C187.22,23.511 187.697,17.939 183.734,16.5C183.734,16.5 181.944,14.012 184.233,14.077Z" style="fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(1,0,0,1,40,0)">
                <path d="M131.499,14L139.68,5C140.961,5 142,6.039 142,7.32L142,31.68C142,32.961 140.961,34 139.68,34L131.499,25L127.375,25C126.063,25 125,23.937 125,22.625L125,16.375C125,15.063 126.063,14 127.375,14L131.499,14Z"/>
            </g>
        </g>
    </g>
</svg>
`, Tn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="volume-mid" serif:id="volume mid" transform="matrix(1,0,0,1,-165,-5)">
        <g>
            <g transform="matrix(1,0,0,1,0.75,-1)">
                <path d="M184.233,14.077C188.981,14.489 191.571,24.435 184.954,27.208C183.497,27.819 181.723,25.826 183.988,24.902C187.22,23.511 187.697,17.939 183.734,16.5C183.734,16.5 181.944,14.012 184.233,14.077Z" style="fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(1.79727,0,0,1.79727,-145.137,-17.5434)">
                <path d="M184.236,14.634C184.819,14.72 184.834,14.837 185.078,14.956C188.213,16.489 189.629,20.834 187.848,23.947C187.088,25.275 185.842,26.312 184.395,26.83C184.395,26.83 184.071,26.925 183.815,26.778C183.217,26.436 183.496,25.849 184.723,25.159C187.985,23.325 187.943,17.417 183.927,15.98C183.927,15.98 182.939,14.544 184.236,14.634Z" style="fill-rule:nonzero;"/>
            </g>
            <g transform="matrix(1,0,0,1,40,0)">
                <path d="M131.499,14L139.68,5C140.961,5 142,6.039 142,7.32L142,31.68C142,32.961 140.961,34 139.68,34L131.499,25L127.375,25C126.063,25 125,23.937 125,22.625L125,16.375C125,15.063 126.063,14 127.375,14L131.499,14Z"/>
            </g>
        </g>
    </g>
</svg>
`, In = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g transform="matrix(1,0,0,1,-164.25,-6)">
        <path d="M184.233,14.077C188.981,14.489 191.571,24.435 184.954,27.208C183.497,27.819 181.723,25.826 183.988,24.902C187.22,23.511 187.697,17.939 183.734,16.5C183.734,16.5 181.944,14.012 184.233,14.077Z" style="fill-rule:nonzero;"/>
    </g>
    <g transform="matrix(1.79727,0,0,1.79727,-310.137,-22.5434)">
        <path d="M184.236,14.634C184.819,14.72 184.834,14.837 185.078,14.956C188.213,16.489 189.629,20.834 187.848,23.947C187.088,25.275 185.842,26.312 184.395,26.83C184.395,26.83 184.071,26.925 183.815,26.778C183.217,26.436 183.496,25.849 184.723,25.159C187.985,23.325 187.943,17.417 183.927,15.98C183.927,15.98 182.939,14.544 184.236,14.634Z" style="fill-rule:nonzero;"/>
    </g>
    <g transform="matrix(2.44245,0,0,2.44245,-427.303,-35.9308)">
        <path d="M184.199,14.815C184.625,14.866 186.828,16.03 187.775,17.801C189.443,20.92 187.935,25.329 184.388,26.637C184.388,26.637 183.459,26.646 183.677,26.009C183.808,25.624 184.344,25.578 184.77,25.344C187.184,24.016 188.202,20.604 186.8,18.153C186.181,17.07 185.166,16.228 183.988,15.807C183.988,15.807 183.242,14.787 184.199,14.815Z" style="fill-rule:nonzero;"/>
    </g>
    <g transform="matrix(1,0,0,1,-125,-5)">
        <path d="M131.499,14L139.68,5C140.961,5 142,6.039 142,7.32L142,31.68C142,32.961 140.961,34 139.68,34L131.499,25L127.375,25C126.063,25 125,23.937 125,22.625L125,16.375C125,15.063 126.063,14 127.375,14L131.499,14Z"/>
    </g>
</svg>
`, f = Object.freeze({
  UNLOADED: 0,
  LOADING_MANIFEST: 1,
  MANIFEST: 2,
  LOADING_PLAYER: 3,
  LOADED: 4,
  UNLOADING_MANIFEST: 5,
  UNLOADING_PLAYER: 6,
  ERROR: 7
});
let Ve = null;
class te extends ke {
  static Get() {
    return Ve || (Ve = new te()), Ve;
  }
  get moduleName() {
    return "paella-core default plugins";
  }
  get moduleVersion() {
    return we.version;
  }
}
class kn extends Ln {
  getPluginModuleInstance() {
    return te.Get();
  }
  get name() {
    return super.name || "es.upv.paella.defaultShortcuts";
  }
  getVolumeIcon(e) {
    return e === 0 ? this.player.getCustomPluginIcon(this.name, "volumeMuteIcon") || Pn : e < 0.3 ? this.player.getCustomPluginIcon(this.name, "volumeLowIcon") || Sn : e < 0.6 ? this.player.getCustomPluginIcon(this.name, "volumeMidIcon") || Tn : this.player.getCustomPluginIcon(this.name, "volumeHighIcon") || In;
  }
  toggleCaptions() {
    var e, t, n;
    if (((n = (t = (e = this.player) == null ? void 0 : e.captionsCanvas) == null ? void 0 : t.captions) == null ? void 0 : n.length) > 0)
      if (this.player.captionsCanvas.isVisible)
        this.player.captionsCanvas.disableCaptions();
      else {
        let s = null;
        navigator.languages.some((a) => this.player.captionsCanvas.captions.some((r, o) => a == r.language ? (s = o, !0) : !1)), this.player.captionsCanvas.enableCaptions({ index: s || 0 });
      }
  }
  async togglePlayPause() {
    await this.player.paused() ? await this.player.play() : await this.player.pause();
  }
  async toggleFullscreen() {
    this.player.isFullscreen ? await this.player.exitFullscreen() : await this.player.enterFullscreen();
  }
  async seek(e) {
    const t = await this.player.videoContainer.streamProvider.currentTime();
    await this.player.videoContainer.streamProvider.setCurrentTime(t + e), e < 0 ? this.player.videoContainer.message.show({
      text: `<< ${Math.abs(e)}s`,
      position: I.CENTER_LEFT,
      timeout: 500
    }) : this.player.videoContainer.message.show({
      text: `${e}s >>`,
      position: I.CENTER_RIGHT,
      timeout: 500
    });
  }
  async incrementVolume(e) {
    const t = await this.player.videoContainer.streamProvider.volume(), n = Math.min(Math.max(0, t + e * 0.01), 1);
    await this.player.videoContainer.setVolume(n);
    const s = this.getVolumeIcon(n);
    this.player.videoContainer.message.show({
      text: `${Math.round(n * 100)}%`,
      position: I.CENTER_MIDDLE,
      icon: s
    });
  }
  closePopUp() {
  }
  async decreaseSpeed() {
    const e = await this.player.videoContainer.playbackRate();
    let t = 0;
    this._validPlaybackRates.some((n) => {
      if (t === 0 && (t = n), n < e)
        t = n;
      else
        return !0;
    }), await this.player.videoContainer.setPlaybackRate(t), this.player.videoContainer.message.show({
      text: `${t}X`,
      position: I.CENTER_MIDDLE
    });
  }
  async increaseSpeed() {
    const e = await this.player.videoContainer.playbackRate();
    let t = 0;
    this._validPlaybackRates.some((n) => {
      if (n > e)
        return t = n, !0;
    }), t === 0 && (t = this._validPlaybackRates[this._validPlaybackRates.length - 1]), await this.player.videoContainer.setPlaybackRate(t), this.player.videoContainer.message.show({
      text: `${t}X`,
      position: I.CENTER_MIDDLE
    });
  }
  async toggleVolume() {
    const e = await this.player.videoContainer.volume();
    let t = 0;
    e > 0 ? (this._lastVolume = e, t = 0) : t = this._lastVolume || 1, await this.player.videoContainer.setVolume(t);
    const n = this.getVolumeIcon(t);
    this.player.videoContainer.message.show({
      text: `volume: ${Math.round(t * 100)}%`,
      position: I.CENTER_MIDDLE,
      icon: n
    });
  }
  async load() {
    this._validPlaybackRates = this.config.validPlaybackRates || [0.75, 1, 1.5, 2], this._validPlaybackRates.sort((e, t) => e - t);
  }
  async getKeys() {
    const e = this.player, t = this.config.skipBackwards || 30, n = this.config.skipForward || 30, s = () => e.state === f.LOADED;
    return [
      {
        keyCode: x.KeyM,
        description: "Toggle audio mute",
        keyModifiers: {
          ctrlKey: !1
        },
        action: async () => {
          s() && await this.toggleVolume();
        }
      },
      {
        keyCode: x.KeyK,
        description: "Toggle play/pause",
        action: async () => {
          await this.togglePlayPause();
        }
      },
      {
        keyCode: x.KeyJ,
        get description() {
          return e.translate("Rewind $1 seconds", [t]);
        },
        action: async () => {
          s() && await this.seek(-t);
        }
      },
      {
        keyCode: x.KeyL,
        get description() {
          return e.translate("Forward $1 seconds", [n]);
        },
        action: async () => {
          s() && await this.seek(n);
        }
      },
      {
        keyCode: x.Space,
        description: "Toggle play/pause",
        action: async () => {
          s() && await this.togglePlayPause();
        }
      },
      {
        keyCode: x.KeyF,
        description: "Toggle fullscreen",
        action: async () => {
          s() && await this.toggleFullscreen();
        }
      },
      {
        keyCode: x.KeyC,
        description: "Toggle captions",
        action: async () => {
          s() && this.toggleCaptions();
        }
      },
      {
        keyCode: x.ArrowLeft,
        get description() {
          return e.translate("Rewind $1 seconds", [t]);
        },
        action: async () => {
          s() && await this.seek(-t);
        }
      },
      {
        keyCode: x.ArrowRight,
        get description() {
          return e.translate("Forward $1 seconds", [n]);
        },
        action: async () => {
          s() && await this.seek(n);
        }
      },
      {
        keyCode: x.ArrowUp,
        description: "Volume up 10%",
        action: async () => {
          s() && this.incrementVolume(10);
        }
      },
      {
        keyCode: x.ArrowDown,
        description: "Volume down 10%",
        action: async () => {
          s() && this.incrementVolume(-10);
        }
      },
      {
        keyCode: x.Escape,
        description: "Close pop-up",
        action: async () => {
          s() && this.closePopUp();
        }
      },
      {
        keyCode: x.KeyU,
        description: "Decrease playback speed",
        action: async () => {
          s() && await this.decreaseSpeed();
        }
      },
      {
        keyCode: x.KeyO,
        description: "Increase playback speed",
        action: async () => {
          s() && this.increaseSpeed();
        }
      }
    ];
  }
}
async function Dn(i) {
  const e = [];
  await M(i, "captions", async (t) => {
    e.push(t);
  });
  for (let t in e) {
    const s = await e[t].getCaptions(), a = i.captionsCanvas;
    s.forEach((r) => a.addCaptions(r));
  }
}
class Bt extends ee {
  get type() {
    return "captions";
  }
  async load() {
    this.player.log.debug("load captions plugin");
  }
  async getCaptions() {
    return this.player.log.warn(`CaptionsPlugin ${this.name}: getCaptions() is not implemented.`), [];
  }
}
class Ht {
  get cues() {
    return this._cues;
  }
  get label() {
    return this._label;
  }
  get language() {
    return this._lang;
  }
  set label(e) {
    this._label = e;
  }
  set language(e) {
    this._lang = e;
  }
  constructor(e = "", t = "") {
    this._cues = [], this._label = e, this._lang = t;
  }
  addCue({ label: e = "", start: t, end: n, captions: s }) {
    const a = {
      label: e
    };
    if (typeof s == "string")
      a.captions = [s];
    else if (Array.isArray(s))
      a.captions = s;
    else
      throw Error("Invalid cue caption format: must be an array of strings or a string");
    if (typeof t == "string")
      a.start = Le(t), a.startString = t;
    else if (typeof t == "number")
      a.start = t, a.startString = re(t);
    else
      throw Error("Invalid cue timestamp format: must be a valid time string or a number of seconds");
    if (typeof n == "string")
      a.end = Le(n), a.endString = n;
    else if (typeof n == "number")
      a.end = n, a.endString = re(n);
    else
      throw Error("Invalid cue timestamp format: must be a valid time string or a number of seconds");
    return this._cues.push(a), a;
  }
  getCue(e) {
    if (typeof e == "string")
      e = Le(e);
    else if (typeof e != "number")
      throw Error("Invalid time instant format getting cue");
    let t = null;
    return this._cues.some((n) => {
      if (e >= n.start && e <= n.end)
        return t = n, !0;
    }), t;
  }
}
function ct(i, e) {
  const t = {}, s = new DOMParser().parseFromString(e, "text/xml");
  return Array.from(s.getElementsByTagName("div")).forEach((a) => {
    const r = a.getAttribute("xml:lang") || "unknonw";
    t[r] = t[r] || new Ht(i.translate(r), r), Array.from(a.getElementsByTagName("p")).forEach((o) => {
      const l = $e(o.getAttribute("begin"));
      t[r].addCue({
        label: `caption_${o.getAttribute("xml:id") || l}`,
        start: l / 1e3,
        end: $e(o.getAttribute("end")) / 1e3,
        captions: o.innerHTML
      });
    });
  }), t;
}
class xn {
  constructor(e, t = "") {
    this.player = e, this._text = t, this._captions = ct(this.player, t);
  }
  get text() {
    return this._text;
  }
  set text(e) {
    this._text = e, this._captions = ct(e);
  }
  get captions() {
    return this._captions;
  }
}
class An extends Bt {
  getPluginModuleInstance() {
    return te.Get();
  }
  get name() {
    return super.name || "es.upv.paella.dfxpManifestCaptionsPlugin";
  }
  async isEnabled() {
    return await super.isEnabled() && this.player.videoManifest.captions && this.player.videoManifest.captions.length > 0;
  }
  async getCaptions() {
    const e = [], t = [];
    return this.player.videoManifest.captions.forEach((n) => {
      t.push(new Promise(async (s, a) => {
        if (/dfxp/i.test(n.format)) {
          const r = W(this.player, n.url), o = await fetch(r);
          if (o.ok) {
            let l = await o.text();
            l = l.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, ""), l = l.replace(/&\w+;/gmi, ""), l = l.replaceAll("<br>", "");
            const c = new xn(this.player, l);
            Object.entries(c.captions).forEach(([d, u]) => {
              e.push(u);
            }), s();
          } else
            a();
        } else
          a();
      }));
    }), await Promise.allSettled(t), e;
  }
}
class Ye extends ee {
  constructor(e, t, n) {
    super(e, t, n), this.__uiPlugin = !0;
  }
  async getDictionaries() {
    return null;
  }
}
let Je = "en", Gt = "";
const oe = {};
function zt(i) {
  const e = oe[Je] || {}, t = oe[Gt] || {};
  return e[i] || t[i] || i;
}
function Kt(i) {
  Je = i;
}
function Wt() {
  return Je;
}
function jt(i, e) {
  oe[i] = oe[i] || {};
  for (const t in e) {
    const n = e[t];
    oe[i][t] = n;
  }
}
function Qt() {
  return oe;
}
function qt(i) {
  return i.config.defaultLanguage || navigator.language;
}
let Zt = zt, Yt = Kt, Jt = Wt, Xt = jt, ei = Qt, ti = qt;
function ye(i, e = null) {
  const t = Zt(i);
  if (Array.isArray(e)) {
    let n = t;
    return e.forEach((s, a) => {
      const r = `$${a + 1}`;
      n = n.replace(r, s);
    }), n;
  } else
    return t;
}
function ut(i) {
  Yt(i);
}
function Mn() {
  return Jt();
}
function ge(i, e) {
  Xt(i, e);
}
function Rn() {
  return ei();
}
function ii(i) {
  return ti(i);
}
function Vn(i) {
  Zt = i;
}
function Nn(i) {
  Yt = i;
}
function Un(i) {
  Jt = i;
}
function Fn(i) {
  Xt = i;
}
function On(i) {
  ei = i;
}
function $n(i) {
  ti = i;
}
function Bn(i) {
  Gt = ii(i);
}
function ni(i) {
  return i.__tabIndex = i.__tabIndex || 0, ++i.__tabIndex, i.__tabIndex;
}
function _a(i) {
  return i.__tabIndex || 0;
}
async function Te(i, e) {
  var c, d;
  const t = v("<li></li>", e);
  t.plugin = i;
  const n = i.tabIndex, s = ye(i.ariaLabel), a = ye(i.description), r = i.dynamicWidth ? "dynamic-width" : "fixed-width", o = i.id ? `id="${i.id}" ` : "", l = i.buttonName ? `name="${i.buttonName}" ` : "";
  if (i.interactive) {
    const u = v(`
			<button type="button" ${o}${l}class="${r}" tabindex="${n}" aria-label="${s}" title="${a}">
			</button>
		`, t);
    i.className !== "" && u.classList.add(i.className), i._button = u, i._container = t, u._pluginData = i, t._pluginData = i, u.addEventListener("click", (p) => {
      const E = u._pluginData;
      b(E.player, g.BUTTON_PRESS, {
        plugin: E
      }), E.action(p, null), p.stopPropagation(), p.pageX !== 0 && p.pageY !== 0 && document.activeElement.blur();
    });
    let h = null;
    const y = () => {
      h && (clearTimeout(h), h = null);
    }, w = () => {
      y(), h = setTimeout(() => {
        i.leftSideContainerPresent && i.leftSideContainer.classList.add("hidden"), i.rightSideContainerPresent && i.rightSideContainer.classList.add("hidden"), h = null;
      }, 300);
    }, C = () => {
      y(), i.leftSideContainerPresent && i.leftSideContainer.classList.remove("hidden"), i.rightSideContainerPresent && i.rightSideContainer.classList.remove("hidden");
    };
    u.addEventListener("focus", C), u.addEventListener("mouseover", C), u.addEventListener("mouseout", w), u.addEventListener("blur", w), (((c = i.player.config.accessibility) == null ? void 0 : c.clickWithSpacebar) !== void 0 ? (d = i.player.config.accessibility) == null ? void 0 : d.clickWithSpacebar : !0) || (u.addEventListener("keyup", (p) => {
      p.keyCode == 32 && p.preventDefault();
    }), u.addEventListener("keydown", (p) => {
      p.keyCode == 32 && p.preventDefault();
    })), i.className !== "" && u.classList.add(i.className);
  } else {
    const u = v(`
			<div ${o}${l} class="non-interactive ${r}" title="${a}">
			</div>
		`, t);
    i._button = u, i._container = t, u._pluginData = i, t._pluginData = i, i.className !== "" && u.classList.add(i.className);
  }
}
const dt = () => {
  const i = document.createElement("span");
  return i.classList.add("side-container"), i.classList.add("hidden"), i;
};
class Hn {
  onIconChanged(e, t, n) {
  }
  onTitleChanged(e, t, n) {
  }
  onStateChanged(e, t, n, s, a) {
  }
}
var G, z, _e;
class Xe extends Ye {
  constructor() {
    super(...arguments);
    H(this, G, null);
    H(this, z, null);
    H(this, _e, []);
  }
  get type() {
    return "button";
  }
  // _container and _button are loaded in PlaybackBar
  get container() {
    return this._container;
  }
  get button() {
    return this._button;
  }
  get interactive() {
    return !0;
  }
  get dynamicWidth() {
    return !1;
  }
  getId() {
    return null;
  }
  get id() {
    return this.config.id || this.getId();
  }
  getButtonName() {
    return null;
  }
  get buttonName() {
    return this.config.name || this.getButtonName() || this.name;
  }
  get ariaLabel() {
    return this.config.ariaLabel || this.getAriaLabel();
  }
  getAriaLabel() {
    return "";
  }
  get tabIndex() {
    return this.config.tabIndex || this.getTabIndex();
  }
  getTabIndex() {
    return ni(this.player);
  }
  getDescription() {
    return "";
  }
  get description() {
    return this.config.description || this.getDescription();
  }
  get minContainerSize() {
    return this.config.minContainerSize || this.getMinContainerSize();
  }
  getMinContainerSize() {
    return 0;
  }
  setObserver(t) {
    if (t instanceof Hn)
      this._observer = t;
    else if (typeof t.onIconChanged == "function" || typeof t.onTitleChanged == "function" || typeof t.onStateChanged == "function")
      this._observer = t;
    else
      throw new Error("Invalid observer for ButtonPlugin");
  }
  get icon() {
    return this._icon || (this._icon = ""), this._icon;
  }
  set icon(t) {
    var n;
    if (typeof t == "string" && (t = Nt(t)), this._icon = t, t && this._button instanceof HTMLElement) {
      const s = this._button.querySelector("i") || v("<i></i>", this._button);
      s.innerHTML = t;
    } else if (this._button instanceof HTMLElement) {
      const s = this._button.querySelector("i");
      s && this._button.removeChild(s);
    }
    (n = this._observer) != null && n.onIconChanged && this._observer.onIconChanged(this, this._icon, t);
  }
  get title() {
    return this._title || "";
  }
  set title(t) {
    var n;
    if (this._title = t, t && this._button instanceof HTMLElement) {
      const s = this._button.querySelector("span") || v(`<span class="button-title-${this.titleSize}"></span>`, this._button);
      s.innerHTML = t;
    } else if (this._button instanceof HTMLElement) {
      const s = this._button.querySelector("span");
      s && this._button.removeChild(s);
    }
    (n = this._observer) != null && n.onTitleChanged && this._observer.onTitleChanged(this, this._title, t);
  }
  // "small", "medium", "large"
  get titleSize() {
    return "medium";
  }
  // "left" or "right"
  get side() {
    var n;
    return ((n = this.config) == null ? void 0 : n.side) || "left";
  }
  get closePopUps() {
    return this.config.closePopUps || this.getClosePopUps();
  }
  getClosePopUps() {
    return !0;
  }
  // "playbackBar" or "videoContainer"
  get parentContainer() {
    var n;
    return ((n = this.config) == null ? void 0 : n.parentContainer) || "playbackBar";
  }
  get className() {
    return "";
  }
  enable() {
    this._enabled = !0, this.show();
  }
  disable() {
    this._enabled = !1, this.hide();
  }
  hide() {
    this._button && (this._button.style.display = "none");
  }
  show() {
    if (this._enabled === !1)
      return;
    const { width: t } = this.player.playbackBar.containerSize;
    this._button && (t > this.minContainerSize || this.parentContainer !== "playbackBar") && (this._button.style.display = null);
  }
  get leftSideContainer() {
    return m(this, G) || (Z(this, G, dt()), this.container.appendChild(m(this, G))), m(this, G);
  }
  get leftSideContainerPresent() {
    return m(this, G) !== null;
  }
  get rightSideContainer() {
    return m(this, z) || (Z(this, z, dt()), this.container.appendChild(m(this, z))), m(this, z);
  }
  get rightSideContainerPresent() {
    return m(this, z) !== null;
  }
  get stateText() {
    return null;
  }
  get stateIcon() {
    return null;
  }
  setState({ text: t = null, icon: n = null } = {}) {
    var r, o;
    const s = this._statusText, a = this._statusIcon;
    this._statusText = t, this._statusIcon = n, m(this, _e).forEach((l) => l(this)), this._statusIcon && (this.icon = this._statusIcon), this._statusText && (this.title = this._statusText), (o = (r = this._observer) == null ? void 0 : r.onStateChanged) == null || o.call(r, this, s, t, a, n);
  }
  onStateChange(t) {
    typeof t == "function" ? m(this, _e).push(t) : this.player.log.warn("Invalid callback for ButtonPlugin.onStateChange");
  }
  async action(t, n = null) {
    this.player.log.warn(`Action not implemented in button plugin ${this.name}`);
  }
  onResize({ width: t, height: n }) {
    t < this.minContainerSize ? this.hide() : this.show();
  }
}
G = new WeakMap(), z = new WeakMap(), _e = new WeakMap();
const Gn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 23 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="play" transform="matrix(1.36051e-16,0.480277,-0.550439,1.55927e-16,74.9184,-144.269)">
        <path d="M325.373,94.327L350.358,136.107L300.387,136.107L325.373,94.327Z"/>
    </g>
</svg>
`, zn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 24 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="pause" transform="matrix(1,0,0,0.956522,-48,-7.65217)">
        <path d="M64,8L72,8L72,31L64,31L64,8ZM48,8L56,8L56,31L48,31L48,8Z"/>
    </g>
</svg>
`, Kn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 42" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(1.94013e-16,0.689169,-0.784942,2.23746e-16,110.436,-203.562)">
        <g id="play">
            <path d="M304.588,115.214C304.588,105.205 313.901,97.079 325.373,97.079C336.844,97.079 346.157,105.205 346.157,115.214C346.157,125.223 336.844,133.349 325.373,133.349L325.373,128.287C333.642,128.287 340.356,122.43 340.356,115.214C340.356,107.999 333.642,102.141 325.373,102.141C317.103,102.141 310.39,107.999 310.39,115.214L304.588,115.214Z"/>
            <g transform="matrix(-2.33361,-6.00363e-16,1.21708e-15,-2.59724,320.246,134.358)">
                <path d="M5.454,3.35L9.398,7.505L1.511,7.505L5.454,3.35Z"/>
            </g>
        </g>
    </g>
</svg>
`;
class Wn extends Xe {
  getPluginModuleInstance() {
    return te.Get();
  }
  get name() {
    return super.name || "es.upv.paella.playPauseButton";
  }
  async load() {
    const e = this.player.getCustomPluginIcon(this.name, "play") || Gn, t = this.player.getCustomPluginIcon(this.name, "pause") || zn, n = this.player.getCustomPluginIcon(this.name, "replay") || Kn;
    this.icon = e, A(this.player, g.PLAY, () => {
      this.icon = t;
    }), A(this.player, g.PAUSE, () => {
      this.icon = e;
    }), A(this.player, g.ENDED, () => {
      this.icon = n;
    }), A(this.player, g.STOP, () => {
      this.icon = e;
    });
  }
  async action() {
    await this.player.paused() ? await this.player.videoContainer.play() : await this.player.videoContainer.pause();
  }
}
const ht = "(?:\\d*:){1,2}\\d*(?:\\.\\d+)?", jn = `(${ht})\\s*\\-\\->\\s*(${ht})`, Qn = {
  cueTiming: new RegExp(jn)
}, qn = (i, e, t, n) => {
  const s = Qn.cueTiming.exec(e);
  if (s) {
    const a = n[t - 1], r = [];
    for (let o = 1; t + o < n.length && n[t + o] !== ""; ++o)
      r.push(n[t + o]);
    i.addCue({
      label: a,
      start: s[1],
      end: s[2],
      captions: r
    });
  }
};
function pt(i) {
  const e = new Ht();
  return i !== "" && (i = i.replace(/\r\n/gm, `
`), i = i.replace(/\r/gm, `
`), i.split(/\n/).forEach((t, n, s) => {
    qn(e, t, n, s);
  })), e;
}
class Zn {
  constructor(e = "") {
    this._text = e, this._captions = pt(e);
  }
  get text() {
    return this._text;
  }
  set text(e) {
    this._text = e, this._captions = pt(e);
  }
  get captions() {
    return this._captions;
  }
}
class Yn extends Bt {
  getPluginModuleInstance() {
    return te.Get();
  }
  get name() {
    return super.name || "es.upv.paella.vttManifestCaptionsPlugin";
  }
  async isEnabled() {
    return await super.isEnabled() && this.player.videoManifest.captions && this.player.videoManifest.captions.length > 0;
  }
  async getCaptions() {
    const e = [], t = [];
    return this.player.videoManifest.captions.forEach((n) => {
      t.push(new Promise(async (s, a) => {
        if (/vtt/i.test(n.format)) {
          const r = W(this.player, n.url), o = await fetch(r);
          if (o.ok) {
            const l = await o.text(), c = new Zn(l);
            c.captions.label = n.text, c.captions.language = n.lang, e.push(c.captions), s();
          } else
            a();
        } else
          a();
      }));
    }), await Promise.allSettled(t), e;
  }
}
class Jn extends Xe {
  getPluginModuleInstance() {
    return te.Get();
  }
  get name() {
    return "es.upv.paella.currentTimeLabel";
  }
  async load() {
    this.title = re(0);
    const e = async () => {
      const t = await this.player.videoContainer.currentTime();
      let n = re(t);
      if (this.config.showTotalTime) {
        const s = await this.player.videoContainer.duration();
        n += `/${re(s)}`;
      }
      this.title = n;
    };
    this.player.bindEvent(g.TIMEUPDATE, () => e()), this.player.bindEvent(g.TRIMMING_CHANGED, () => e()), this.player.bindEvent(g.SEEK, () => e());
  }
  get interactive() {
    return !1;
  }
  get dynamicWidth() {
    return !0;
  }
}
function De(i, e) {
  return di(i, "layout").filter((n) => n.config && n.config.enabled && n.canApply(e));
}
function si(i, e) {
  const t = De(i, e), n = [];
  return t.forEach((s) => {
    n.push(...s.getValidContentIds(e));
  }), n;
}
function Xn(i, e) {
  const t = [];
  return di(i, "layout").filter((n) => {
    var s, a;
    if ((s = n.config) != null && s.enabled && ((a = n.config) != null && a.validContent))
      return n.config.validContent.every((r) => r.content.length === e);
  }).forEach((n) => n.config.validContent.forEach((s) => t.push(s.content))), t;
}
function ai(i, e, t) {
  const n = De(i, e);
  let s = null;
  return n.some((a) => {
    if (a.getValidContentIds(e).indexOf(t) !== -1)
      return s = a, !0;
  }), s;
}
function es(i, e) {
  const t = De(i, e), n = si(i, e);
  let s = [];
  return t.forEach((a) => {
    s = [...s, ...a.config.validContent];
  }), s.filter((a) => n.indexOf(a.id) !== -1);
}
function ri(i, e, t, n = null) {
  const s = ai(i, e, t);
  if (s) {
    const a = s.getLayoutStructure(e, t, n);
    return a.plugin = s, a;
  }
  return null;
}
class ue extends Ye {
  get type() {
    return "layout";
  }
  get layoutType() {
    return "static";
  }
  getTabIndexStart() {
    return 10;
  }
  get tabIndexStart() {
    var e;
    return ((e = this.config) == null ? void 0 : e.tabIndexStart) || this.getTabIndexStart();
  }
  // Return the layout identifier, for example, presenter-presentation
  get identifier() {
    return "default";
  }
  get icon() {
    return "icon.png";
  }
  // Return the array of valid content in the configuration of the plugin
  get validContent() {
    var e;
    return ((e = this.config) == null ? void 0 : e.validContent) || [];
  }
  get validContentIds() {
    const e = [];
    return this.validContent.forEach((t) => e.push(t.id)), e;
  }
  // Gets the valid content ids that matches the streamData
  getValidContentIds(e) {
    const t = [];
    return this.validContent.forEach((n) => {
      n.content.every((s) => e.some((a) => s === a.content)) && t.push(n.id);
    }), t;
  }
  // Get the valid stream data combination, according to the plugin configuration
  // The result of this function must be an array of arrays with all the possible
  // combinations. For example, for a dual stream layout and three elements in
  // streamData that matches the valid content, the resulting valid streams must be:
  // [
  //      [streamA, streamB],
  //      [streamA, streamC],
  //      [streamC, streamB]   
  // ]
  getValidStreams(e) {
    const t = [];
    return this.validContent.forEach((n) => {
      let s = [];
      n.content.every((a) => e.some((r) => {
        if (a === r.content)
          return s.push(r), !0;
      })) && t.push(s);
    }), t;
  }
  canApply(e) {
    return this.getValidStreams(e).length > 0;
  }
  getLayoutStructure() {
    return {};
  }
  // Add buttons to videos
  // [
  //      icon    (required)
  //      click   (required)
  //      tabIndex
  //      ariaLabel
  //      title
  //      className
  //      position (CanvasButtonPosition.LEFT, CanvasButtonPosition.CENTER, CanvasButtonPosition.RIGHT)
  //]
  getVideoCanvasButtons(e, t, n) {
    return [];
  }
}
function ts(i) {
  return {
    icon: i.icon,
    position: i.position,
    title: i.description,
    ariaLabel: i.ariaLabel,
    name: i.buttonName,
    click: async (e) => {
      const t = i.player.videoContainer.streamProvider.streams[e];
      await i.action(e, t == null ? void 0 : t.player, t == null ? void 0 : t.canvas, t == null ? void 0 : t.canvasPlugin);
    }
  };
}
async function is(i, e) {
  const t = [];
  return await M(
    i,
    "canvasButton",
    async (n) => {
      i.log.debug(` Canvas button plugin: ${n.name}`), t.push(n);
    }
  ), t.filter((n) => n.content.indexOf(e.content) !== -1).map((n) => ts(n));
}
class va extends Ye {
  get type() {
    return "canvasButton";
  }
  get content() {
    return this._config.content || ["presenter"];
  }
  get ariaLabel() {
    return this._config.ariaLabel || this.getAriaLabel();
  }
  getAriaLabel() {
    return "";
  }
  get tabIndex() {
    return this.config.tabIndex || this.getTabIndex();
  }
  getTabIndex() {
    return ni(this.player);
  }
  get description() {
    return this.config.description || this.getDescription();
  }
  getDescription() {
    return "";
  }
  get icon() {
    return this._icon;
  }
  set icon(e) {
    this._icon = e;
  }
  get side() {
    var e;
    return ((e = this.config) == null ? void 0 : e.side) || "left";
  }
  get buttonName() {
    return this.name;
  }
  get position() {
    switch (this.side) {
      case "left":
        return L.LEFT;
      case "center":
        return L.CENTER;
      case "right":
        return L.RIGHT;
      default:
        throw new Error(`Invalid CanvasButtonPlugin side set: ${this.side}`);
    }
  }
  async action(e) {
    this.player.log.warn(`Action not implemented in canvas button plugin ${this.name}`);
  }
}
const Be = [];
async function ns(i) {
  await M(i, "canvas", (e) => {
    Be.push(e);
  });
}
async function ss(i) {
}
function as(i, e) {
  if (Be.length === 0)
    throw Error("No canvas plugins loaded. Note that `loadCanvasPlugins()` must to be called before use `getCanvasPlugins()`");
  let t = null;
  return Be.some((n) => {
    if (n.isCompatible(e))
      return t = n, !0;
  }), t;
}
const L = Object.freeze({
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
}), rs = function({
  icon: i,
  tabIndex: e,
  ariaLabel: t,
  title: n,
  className: s,
  position: a = L.CENTER,
  click: r,
  content: o,
  name: l
}) {
  if (!i)
    throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'icon' attribute.");
  if (!r)
    throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'click' function.");
  let c = `class="align-${a}${s ? " " + s : ""}"`;
  t && (c += ` aria-label="${t}"`), n && (c += ` title="${n}"`), e !== void 0 && (c += ` tabindex="${e}"`), l !== void 0 && (c += ` name="${l}"`);
  const d = v(`
        <button ${c}><i class="button-icon" style="pointer-events: none">${i}</i></button>
    `);
  return this.buttonsArea.appendChild(d), d.addEventListener("click", async (u) => (await r(o), u.stopPropagation(), !1)), d;
}, He = async (i, e, t, n, s) => {
  const a = e.plugin;
  let r = a.tabIndexStart;
  const o = await is(i, n), l = [];
  return [
    ...o,
    ...a.getVideoCanvasButtons(e, n.content, n, t)
  ].forEach((d) => {
    d.tabIndex = r++, d.content = s;
    const u = rs.apply(t, [d]);
    l.push(u);
  }), l;
}, Ge = (i, e, t) => {
  let { tabIndexStart: n } = e.plugin;
  t.sort((s, a) => {
    const r = s.getBoundingClientRect().left, o = a.getBoundingClientRect().left;
    return r - o;
  }).forEach((s) => {
    s.setAttribute("tabindex", n++);
  });
};
class oi extends $ {
  constructor(e, t, n) {
    super(t, { tag: e, parent: n }), this.element.className = "video-canvas", this._userArea = null, this._buttonsArea = v(`
        <div class="button-area">
        </div>
        `, this.element);
  }
  async loadCanvas(e) {
    throw Error(`${this.name}: loadCanvas() not implemented`);
  }
  get userArea() {
    return this._userArea || (this._userArea = document.createElement("div"), this._userArea.className = "user-area", this.element.appendChild(this._userArea)), this._userArea;
  }
  get buttonsArea() {
    return this._buttonsArea;
  }
  showButtons() {
    this.buttonsArea.style.display = null;
  }
  hideButtons() {
    this.buttonsArea.style.display = "none";
  }
}
class li extends ee {
  get type() {
    return "canvas";
  }
  get canvasType() {
    return "";
  }
  isCompatible(e) {
    return Array.isArray(e == null ? void 0 : e.canvas) ? e.canvas.indexOf(this.canvasType) !== -1 : e.canvas === this.canvasType;
  }
  getCanvasInstance(e) {
    throw Error(`${this.name} canvas plugin: getCanvasInstance() not implemented`);
  }
}
let Ne = null;
class Q extends ke {
  static Get() {
    return Ne || (Ne = new Q()), Ne;
  }
  get moduleName() {
    return "paella-core default video layouts";
  }
  get moduleVersion() {
    return we.version;
  }
}
const et = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(0.920758,0,0,0.920758,2.50561,1.21236)">
        <path d="M11.937,17.699L11.937,21.044C11.937,21.656 11.573,22.209 11.012,22.451C10.45,22.693 9.798,22.578 9.354,22.158L1.874,15.1C1.568,14.811 1.394,14.408 1.394,13.986C1.394,13.564 1.568,13.161 1.874,12.872L9.354,5.814C9.798,5.394 10.45,5.279 11.012,5.521C11.573,5.763 11.937,6.316 11.937,6.928L11.937,10.272L22.937,10.272C23.783,10.272 24.469,10.958 24.469,11.804L24.469,16.168C24.469,17.014 23.783,17.699 22.937,17.699L11.937,17.699ZM26.063,23.11L26.063,19.765C26.063,19.153 26.427,18.6 26.988,18.358C27.55,18.116 28.201,18.231 28.646,18.651L36.126,25.709C36.432,25.999 36.606,26.402 36.606,26.823C36.606,27.245 36.432,27.648 36.126,27.937L28.646,34.996C28.201,35.415 27.55,35.53 26.988,35.288C26.427,35.046 26.063,34.493 26.063,33.882L26.063,30.537L15.063,30.537C14.217,30.537 13.531,29.851 13.531,29.005L13.531,24.641C13.531,23.795 14.217,23.11 15.063,23.11L26.063,23.11Z"/>
    </g>
</svg>
`, Ie = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(-0.620305,0,0,0.839332,25.2077,0.462208)">
        <path d="M-20.625,8.591C-20.625,6.174 -17.975,4.215 -14.704,4.215L31.492,4.215C34.763,4.215 37.413,6.174 37.413,8.591L37.413,35.582C37.413,37.998 34.763,39.957 31.492,39.957L-14.704,39.957C-17.975,39.957 -20.625,37.998 -20.625,35.582L-20.625,8.591ZM1.285,12.825L8.1,7.789L-15.786,7.789L-15.786,25.442L-8.972,20.406L6.737,32.016L16.994,24.435L1.285,12.825Z" />
    </g>
</svg>
`, me = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(0.707107,0.707107,-0.707107,0.707107,20,-8.28427)">
        <path d="M23,17L23,4.998C23,4.203 22.684,3.44 22.122,2.878C21.56,2.316 20.797,2 20.002,2C20.001,2 19.999,2 19.998,2C19.203,2 18.44,2.316 17.878,2.878C17.316,3.44 17,4.203 17,4.998C17,9.375 17,17 17,17L4.998,17C4.203,17 3.44,17.316 2.878,17.878C2.316,18.44 2,19.203 2,19.998C2,19.999 2,20.001 2,20.002C2,20.797 2.316,21.56 2.878,22.122C3.44,22.684 4.203,23 4.998,23C9.375,23 17,23 17,23L17,35.002C17,35.797 17.316,36.56 17.878,37.122C18.44,37.684 19.203,38 19.998,38C19.999,38 20.001,38 20.002,38C20.797,38 21.56,37.684 22.122,37.122C22.684,36.56 23,35.797 23,35.002C23,30.625 23,23 23,23L35.002,23C35.797,23 36.56,22.684 37.122,22.122C37.684,21.56 38,20.797 38,20.002C38,20.001 38,19.999 38,19.998C38,19.203 37.684,18.44 37.122,17.878C36.56,17.316 35.797,17 35.002,17C30.625,17 23,17 23,17Z"/>
    </g>
</svg>`, Ce = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g>
        <path d="M18,13.029L18,26.971C18,27.509 17.786,28.025 17.406,28.406C17.025,28.786 16.509,29 15.971,29L3.029,29C2.491,29 1.975,28.786 1.594,28.406C1.214,28.025 1,27.509 1,26.971L1,13.029C1,12.491 1.214,11.975 1.594,11.594C1.975,11.214 2.491,11 3.029,11L15.971,11C16.509,11 17.025,11.214 17.406,11.594C17.786,11.975 18,12.491 18,13.029ZM39,13.029L39,26.971C39,27.509 38.786,28.025 38.406,28.406C38.025,28.786 37.509,29 36.971,29L24.029,29C23.491,29 22.975,28.786 22.594,28.406C22.214,28.025 22,27.509 22,26.971L22,13.029C22,12.491 22.214,11.975 22.594,11.594C22.975,11.214 23.491,11 24.029,11L36.971,11C37.509,11 38.025,11.214 38.406,11.594C38.786,11.975 39,12.491 39,13.029ZM21,7L21,33L19,33L19,7L21,7Z"/>
    </g>
</svg>
`, os = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(-0.620305,0,0,0.839332,25.2077,0.462208)">
        <g transform="matrix(-1.61211,0,0,1.19142,40.6376,-0.550686)">
            <path d="M38.001,14.89L16.256,14.89C15.767,14.89 15.297,15.084 14.951,15.43C14.605,15.776 14.41,16.246 14.41,16.735C14.41,21.528 14.41,33.999 14.41,33.999L5.673,33.999C3.644,33.999 2,32.355 2,30.327L2,7.673C2,5.644 3.644,4 5.673,4L34.329,4C36.358,4 38.001,5.644 38.001,7.673L38.001,14.89Z"/>
        </g>
        <g transform="matrix(-1.62701,0,0,1.19712,41.1319,-0.602464)">
            <path d="M39.174,17.858C39.174,17.501 39.032,17.158 38.781,16.906C38.529,16.653 38.188,16.511 37.833,16.511C33.587,16.511 20.516,16.511 17.043,16.511C16.816,16.511 16.598,16.602 16.438,16.763C16.278,16.924 16.188,17.142 16.188,17.37C16.188,20.366 16.188,30.369 16.188,34.019C16.188,34.376 16.329,34.719 16.581,34.971C16.832,35.224 17.173,35.366 17.529,35.366C21.597,35.366 33.765,35.366 37.833,35.366C38.188,35.366 38.529,35.224 38.781,34.971C39.032,34.719 39.174,34.376 39.174,34.019C39.174,30.548 39.174,21.329 39.174,17.858Z"/>
        </g>
    </g>
</svg>
`;
class gt extends ue {
  getPluginModuleInstance() {
    return Q.Get();
  }
  get name() {
    return super.name || "es.upv.paella.dualVideoDynamic";
  }
  get layoutType() {
    return "dynamic";
  }
  async load() {
    this.pipContentIds = this.config.pipContentIds || [], this.allowSwitchSide = this.config.allowSwitchSide !== void 0 ? this.config.allowSwitchSide : !0;
  }
  getVideoCanvasButtons(e, t, n, s) {
    const a = this.player.getCustomPluginIcon(this.name, "iconMaximize") || Ie, r = this.player.getCustomPluginIcon(this.name, "iconSideBySide") || Ce, o = this.player.getCustomPluginIcon(this.name, "iconSwitchSide") || et, l = this.player.getCustomPluginIcon(this.name, "iconClose") || me, c = this.player.getCustomPluginIcon(this.name, "iconPiP") || os, d = () => this._currentContent.find((w) => w.id === t), u = () => d().size === 25, h = () => d().size > 50, y = [];
    return u() || h() ? y.push({
      icon: r,
      position: L.LEFT,
      title: this.player.translate("Dual stream 50%"),
      ariaLabel: this.player.translate("Dual stream 50%"),
      name: this.name + ":iconSideBySide",
      click: async () => {
        this._currentContent.forEach((w) => {
          w.size = 50;
        }), await this.player.videoContainer.updateLayout();
      }
    }) : y.push({
      icon: a,
      position: L.LEFT,
      title: this.player.translate("Maximize video"),
      ariaLabel: this.player.translate("Maximize video"),
      name: this.name + ":iconMaximize",
      click: async () => {
        this._currentContent.forEach((w) => {
          w.size = w.id === t ? 75 : 25;
        }), await this.player.videoContainer.updateLayout();
      }
    }), this.allowSwitchSide && y.push({
      icon: o,
      position: L.LEFT,
      title: this.player.translate("Switch side"),
      ariaLabel: this.player.translate("Switch side"),
      name: this.name + ":iconSwitchSide",
      click: async () => {
        const w = this._currentContent[0].id, C = this._currentContent[1].id, _ = this._currentContent[0].size, p = this._currentContent[1].size;
        this._currentContent[0].id = C, this._currentContent[0].size = p, this._currentContent[1].id = w, this._currentContent[1].size = _, await this.player.videoContainer.updateLayout();
      }
    }), y.push({
      icon: l,
      position: L.RIGHT,
      title: this.player.translate("Close video"),
      ariaLabel: this.player.translate("Close video"),
      name: this.name + ":iconClose",
      click: async () => {
        const C = this.player.videoContainer.validContentIds.filter((_) => _.indexOf("-") === -1).find((_) => _ != t);
        await this.player.videoContainer.setLayout(C);
      }
    }), this.pipContentIds.length > 0 && y.push({
      icon: c,
      position: L.LEFT,
      title: this.player.translate("Picture-in-picture"),
      ariaLabel: this.player.translate("Picture-in-picture"),
      name: this.name + ":iconPiP",
      click: async () => {
        const w = this.player.videoContainer.validContentIds.find((C) => this.pipContentIds.indexOf(C) !== -1);
        await this.player.videoContainer.setLayout(w, t);
      }
    }), y;
  }
  getLayoutStructure(e, t, n) {
    if (!this._currentContent) {
      const { content: s } = this.validContent.find((a) => a.id === t);
      this._currentContent = s.map((a) => ({
        id: a,
        size: 50
      }));
    }
    return {
      id: "dual-dynamic",
      videos: [
        {
          content: this._currentContent[0].id,
          visible: !0,
          size: this._currentContent[0].size
        },
        {
          content: this._currentContent[1].id,
          visible: !0,
          size: this._currentContent[1].size
        }
      ]
    };
  }
}
const ci = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(-0.620305,0,0,0.839332,25.2077,0.462208)">
        <g transform="matrix(-1.50139,0,0,1.10483,39.8625,1.72153)">
            <path d="M22.034,28.802C22.58,28.752 23.089,28.64 23.626,28.496C28.793,27.112 31.864,21.792 30.48,16.625C30.189,15.54 29.715,14.525 29.088,13.619L31.915,8.722C33.663,10.535 34.942,12.776 35.606,15.251C37.748,23.248 32.996,31.48 24.999,33.622C24.011,33.887 23.04,34.063 22.034,34.123L22.034,40.015L13,31.5L22.034,23.015L22.034,28.802Z" />
        </g>
        <g transform="matrix(1.50139,1.35303e-16,1.83867e-16,-1.10483,-24.8768,44.5033)">
            <path d="M22.161,28.786C22.706,28.736 23.089,28.64 23.626,28.496C28.793,27.112 31.864,21.792 30.48,16.625C30.189,15.54 29.715,14.525 29.088,13.619L31.915,8.722C33.663,10.535 34.942,12.776 35.606,15.251C37.748,23.248 32.996,31.48 24.999,33.622C24.011,33.887 23.167,34.048 22.161,34.107L22.161,40L13,31.5L22.161,23L22.161,28.786Z" />
        </g>
    </g>
</svg>
`, ls = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(-0.620305,0,0,0.839332,25.2077,0.462208)">
        <g transform="matrix(-1.61211,0,0,1.25099,40.6376,0.938594)">
            <path d="M26,18.498C26,16.566 24.356,15 22.327,15C17.811,15 10.189,15 5.673,15C3.644,15 2,16.566 2,18.498C2,22.151 2,27.849 2,31.502C2,33.434 3.644,35 5.673,35C10.189,35 17.811,35 22.327,35C24.356,35 26,33.434 26,31.502C26,27.849 26,22.151 26,18.498Z" />
        </g>
        <path d="M-2.889,42.341L-16.002,42.341C-17.664,42.341 -19.01,41.345 -19.01,40.117L-19.01,11.346L-15.787,13.728L-15.787,36.879C-15.787,37.695 -15.348,38.478 -14.567,39.056C-13.785,39.633 -12.726,39.958 -11.621,39.958L-2.889,39.958L-2.889,42.341ZM30.962,18.512L30.962,8.485C30.962,7.669 30.523,6.886 29.741,6.308C28.96,5.731 27.9,5.406 26.795,5.406L-4.721,5.406L-7.945,3.024L31.181,3.024C32.842,3.024 34.189,4.019 34.189,5.247L34.189,18.512L30.962,18.512Z" />
        <g transform="matrix(-0.595969,-0.440448,-1.13993,0.842464,17.4661,11.4472)">
            <path d="M18.389,14.006L18.389,18L5,11L18.389,4L18.389,7.994L36,7.994L36,14.006L18.389,14.006Z" />
        </g>
    </g>
</svg>
`;
let N = 0;
const tt = [
  // First layout: side by side
  {
    id: "side-by-side",
    videos: [
      {
        content: null,
        rect: [
          { aspectRatio: "16/9", width: 560, height: 315, top: 218, left: 712 },
          { aspectRatio: "16/10", width: 560, height: 350, top: 206, left: 712 },
          { aspectRatio: "4/3", width: 560, height: 420, top: 173, left: 712 },
          { aspectRatio: "5/3", width: 560, height: 336, top: 206, left: 712 },
          { aspectRatio: "5/4", width: 560, height: 448, top: 160, left: 712 }
        ],
        visible: !0,
        layer: 1
      },
      {
        content: null,
        rect: [
          { aspectRatio: "16/9", width: 688, height: 387, top: 166, left: 10 },
          { aspectRatio: "16/10", width: 688, height: 430, top: 148, left: 10 },
          { aspectRatio: "4/3", width: 688, height: 516, top: 111, left: 10 },
          { aspectRatio: "5/3", width: 690, height: 414, top: 154, left: 10 },
          { aspectRatio: "5/4", width: 690, height: 552, top: 96, left: 10 }
        ],
        visible: !0,
        layer: "1"
      }
    ],
    buttons: []
  },
  // Second layout: PIP left
  {
    id: "pip-left",
    videos: [
      {
        content: null,
        rect: [
          { aspectRatio: "16/9", left: 0, top: 0, width: 1280, height: 720 },
          { aspectRatio: "16/10", left: 64, top: 0, width: 1152, height: 720 },
          { aspectRatio: "5/3", left: 40, top: 0, width: 1200, height: 720 },
          { aspectRatio: "5/4", left: 190, top: 0, width: 900, height: 720 },
          { aspectRatio: "4/3", left: 160, top: 0, width: 960, height: 720 }
        ],
        visible: !0,
        layer: 1
      },
      {
        content: null,
        rect: [
          { aspectRatio: "16/9", left: 50, top: 470, width: 350, height: 197 },
          { aspectRatio: "16/10", left: 50, top: 448, width: 350, height: 219 },
          { aspectRatio: "5/3", left: 50, top: 457, width: 350, height: 210 },
          { aspectRatio: "5/4", left: 50, top: 387, width: 350, height: 280 },
          { aspectRatio: "4/3", left: 50, top: 404, width: 350, height: 262 }
        ],
        visible: !0,
        layer: 2
      }
    ],
    buttons: []
  },
  // Third layout: PIP right
  {
    id: "pip-right",
    videos: [
      {
        content: null,
        rect: [
          { aspectRatio: "16/9", left: 0, top: 0, width: 1280, height: 720 },
          { aspectRatio: "16/10", left: 64, top: 0, width: 1152, height: 720 },
          { aspectRatio: "5/3", left: 40, top: 0, width: 1200, height: 720 },
          { aspectRatio: "5/4", left: 190, top: 0, width: 900, height: 720 },
          { aspectRatio: "4/3", left: 160, top: 0, width: 960, height: 720 }
        ],
        visible: !0,
        layer: 1
      },
      {
        content: null,
        rect: [
          { aspectRatio: "16/9", left: 880, top: 470, width: 350, height: 197 },
          { aspectRatio: "16/10", left: 880, top: 448, width: 350, height: 219 },
          { aspectRatio: "5/3", left: 880, top: 457, width: 350, height: 210 },
          { aspectRatio: "5/4", left: 880, top: 387, width: 350, height: 280 },
          { aspectRatio: "4/3", left: 880, top: 404, width: 350, height: 262 }
        ],
        visible: !0,
        layer: 2
      }
    ],
    buttons: []
  }
];
function cs(i) {
  return N = (N + 1) % tt.length, it(i);
}
function he(i, e) {
  return N = e < tt.length ? e : N, it(i);
}
function it(i) {
  let e = JSON.parse(JSON.stringify(tt[N]));
  return e.videos[0].content = i[0], e.videos[1].content = i[1], e;
}
class us extends ue {
  getPluginModuleInstance() {
    return Q.Get();
  }
  get name() {
    return super.name || "es.upv.paella.dualVideo";
  }
  get identifier() {
    return "dual-video";
  }
  async load() {
    let e = K("dualVideoLayoutIndex");
    e !== "" && (N = Number(e)), this.player.log.debug("Dual video layout loaded");
  }
  getValidStreams(e) {
    return super.getValidStreams(e).filter((t) => t.length === 2);
  }
  switchContent() {
    const e = this._currentContent[0], t = this._currentContent[1];
    this._currentContent[0] = t, this._currentContent[1] = e, this.player.videoContainer.updateLayout();
  }
  async switchMinimized() {
    cs(this._currentContent), await this.player.videoContainer.updateLayout();
  }
  async minimizeVideo(e) {
    let t = !0;
    if (e === this._currentContent[0]) {
      const n = this._currentContent[0], s = this._currentContent[1];
      this._currentContent[0] = s, this._currentContent[1] = n, t = !1;
    }
    N === 1 && t ? he(this._currentContent, 2) : he(this._currentContent, 1), await this.player.videoContainer.updateLayout();
  }
  async maximizeVideo(e) {
    let t = !0;
    if (e === this._currentContent[1]) {
      const n = this._currentContent[0], s = this._currentContent[1];
      this._currentContent[0] = s, this._currentContent[1] = n, t = !1;
    }
    N === 1 && t ? he(this._currentContent, 2) : he(this._currentContent, 1), await this.player.videoContainer.updateLayout();
  }
  async setSideBySide() {
    he(this._currentContent, 0), await this.player.videoContainer.updateLayout();
  }
  get minimizedContent() {
    return N === 0 ? "" : this._currentContent[1];
  }
  async closeVideo(e) {
    const n = this.player.videoContainer.validContentIds.filter((s) => s.indexOf("-") === -1).find((s) => s != e);
    await this.player.videoContainer.setLayout(n);
  }
  getVideoCanvasButtons(e, t, n, s) {
    if (e.id === "side-by-side")
      return [
        // Swap
        {
          icon: this.player.getCustomPluginIcon(this.name, "iconRotate") || ci,
          position: L.LEFT,
          title: this.player.translate("Swap position of the videos"),
          ariaLabel: this.player.translate("Swap position of the videos"),
          name: this.name + ":iconRotate",
          click: async () => {
            await this.switchContent();
          }
        },
        // Minimize
        {
          icon: this.player.getCustomPluginIcon(this.name, "iconMaximize") || Ie,
          position: L.LEFT,
          title: this.player.translate("Maximize video"),
          ariaLabel: this.player.translate("Maximize video"),
          name: this.name + ":iconMaximize",
          click: async () => {
            await this.maximizeVideo(t);
          }
        },
        // Close
        {
          icon: this.player.getCustomPluginIcon(this.name, "iconClose") || me,
          position: L.RIGHT,
          title: this.player.translate("Close video"),
          ariaLabel: this.player.translate("Close video"),
          name: this.name + ":iconClose",
          click: async () => {
            await this.closeVideo(t);
          }
        }
      ];
    {
      const a = [];
      return t === this.minimizedContent ? (a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconMaximize") || Ie,
        position: L.LEFT,
        title: this.player.translate("Maximize video"),
        ariaLabel: this.player.translate("Maximize video"),
        name: this.name + ":iconMaximize",
        click: async () => {
          await this.switchContent();
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconSwitchSide") || et,
        position: L.LEFT,
        title: this.player.translate("Place the video on the other side of the screen"),
        ariaLabel: this.player.translate("Place the video on the other side of the screen"),
        name: this.name + ":iconSwitchSide",
        click: async () => {
          await this.minimizeVideo(t);
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconClose") || me,
        position: L.RIGHT,
        title: this.player.translate("Close video"),
        ariaLabel: this.player.translate("Close video"),
        name: this.name + ":iconClose",
        click: async () => {
          await this.closeVideo(t);
        }
      })) : (a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconMinimize") || ls,
        position: L.LEFT,
        title: this.player.translate("Minimize video"),
        ariaLabel: this.player.translate("Minimize video"),
        name: this.name + ":iconMinimize",
        click: async () => {
          await this.switchContent();
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconSideBySide") || Ce,
        position: L.LEFT,
        title: this.player.translate("Put the videos side by side"),
        ariaLabel: this.player.translate("Put the videos side by side"),
        name: this.name + ":iconSideBySide",
        click: async () => {
          await this.setSideBySide();
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconClose") || me,
        position: L.RIGHT,
        title: this.player.translate("Close video"),
        ariaLabel: this.player.translate("Close video"),
        name: this.name + ":iconClose",
        click: async () => {
          await this.closeVideo(t);
        }
      })), a;
    }
  }
  getLayoutStructure(e, t) {
    if (!this._currentContent || this._currentContentId !== t) {
      const { content: a } = this.validContent.find((l) => l.id === t);
      this._currentContent = a, this._currentContentId = t;
      const r = K("dualVideoLayoutContent0"), o = K("dualVideoLayoutContent1");
      r !== "" && o !== "" && this._currentContent.indexOf(r) !== -1 && this._currentContent.indexOf(o) !== -1 && (this._currentContent[0] = r, this._currentContent[1] = o);
    }
    const n = it(this._currentContent), s = {
      id: n.id,
      player: this.player,
      name: { es: "Dos streams con posición dinámica" },
      hidden: !1,
      videos: n.videos,
      buttons: []
    };
    return X("dualVideoLayoutIndex", N), X("dualVideoLayoutContent0", this._currentContent[0]), X("dualVideoLayoutContent1", this._currentContent[1]), s;
  }
}
const mt = {
  id: "pip-left",
  name: { es: "Dos streams imagen dentro de imagen" },
  hidden: !1,
  videos: [
    {
      content: null,
      rect: [
        { aspectRatio: "16/9", left: 0, top: 0, width: 1280, height: 720 },
        { aspectRatio: "16/10", left: 64, top: 0, width: 1152, height: 720 },
        { aspectRatio: "5/3", left: 40, top: 0, width: 1200, height: 720 },
        { aspectRatio: "5/4", left: 190, top: 0, width: 900, height: 720 },
        { aspectRatio: "4/3", left: 160, top: 0, width: 960, height: 720 },
        { aspectRatio: "9/16", left: 617, top: 17, width: 386, height: 687 }
      ],
      visible: !0,
      layer: 1
    },
    {
      content: null,
      rect: [
        { aspectRatio: "16/9", left: 50, top: 470, width: 350, height: 197 },
        { aspectRatio: "16/10", left: 50, top: 448, width: 350, height: 219 },
        { aspectRatio: "5/3", left: 50, top: 457, width: 350, height: 210 },
        { aspectRatio: "5/4", left: 50, top: 387, width: 350, height: 280 },
        { aspectRatio: "4/3", left: 50, top: 404, width: 350, height: 262 },
        { aspectRatio: "9/16", left: 224, top: 301, width: 224, height: 400 }
      ],
      visible: !0,
      layer: 2
    }
  ],
  buttons: []
}, ds = {
  id: "pip-right",
  name: { es: "Dos streams imagen dentro de imagen a la derecha" },
  hidden: !1,
  videos: [
    {
      content: null,
      rect: [
        { aspectRatio: "16/9", left: 0, top: 0, width: 1280, height: 720 },
        { aspectRatio: "16/10", left: 64, top: 0, width: 1152, height: 720 },
        { aspectRatio: "5/3", left: 40, top: 0, width: 1200, height: 720 },
        { aspectRatio: "5/4", left: 190, top: 0, width: 900, height: 720 },
        { aspectRatio: "4/3", left: 160, top: 0, width: 960, height: 720 },
        { aspectRatio: "9/16", left: 242, top: 17, width: 386, height: 687 }
      ],
      visible: !0,
      layer: 1
    },
    {
      content: null,
      rect: [
        { aspectRatio: "16/9", left: 880, top: 470, width: 350, height: 197 },
        { aspectRatio: "16/10", left: 880, top: 448, width: 350, height: 219 },
        { aspectRatio: "5/3", left: 880, top: 457, width: 350, height: 210 },
        { aspectRatio: "5/4", left: 880, top: 387, width: 350, height: 280 },
        { aspectRatio: "4/3", left: 880, top: 404, width: 350, height: 262 },
        { aspectRatio: "9/16", left: 887, top: 304, width: 224, height: 400 }
      ],
      visible: !0,
      layer: 2
    }
  ],
  buttons: []
};
class hs extends ue {
  getPluginModuleInstance() {
    return Q.Get();
  }
  get name() {
    return super.name || "es.upv.paella.dualVideoPiP";
  }
  get identifier() {
    return "dual-video-pip";
  }
  async load() {
    this._currentLayout = mt, this.dualVideoContentIds = this.config.dualVideoContentIds || [];
  }
  getValidStreams(e) {
    return super.getValidStreams(e).filter((t) => t.length === 2);
  }
  getVideoCanvasButtons(e, t, n, s) {
    const a = this.player.getCustomPluginIcon(this.name, "iconClose") || me, r = this.player.getCustomPluginIcon(this.name, "iconSwitchSide") || et, o = this.player.getCustomPluginIcon(this.name, "iconMaximize") || Ie, l = this.player.getCustomPluginIcon(this.name, "iconSideBySide") || Ce, c = [
      {
        icon: a,
        position: L.RIGHT,
        title: this.player.translate("Close video"),
        ariaLabel: this.player.translate("Close video"),
        name: this.name + ":iconClose",
        click: async () => {
          const u = this.player.videoContainer.validContentIds.filter((h) => h.indexOf("-") === -1).find((h) => h !== t);
          await this.player.videoContainer.setLayout(u);
        }
      }
    ];
    return t === this._pipVideo ? (c.push({
      icon: r,
      position: L.LEFT,
      title: this.player.translate("Switch side"),
      ariaLabel: this.player.translate("Switch side"),
      name: this.name + ":iconSwitchSide",
      click: async () => {
        this.switchSide(), await this.player.videoContainer.updateLayout(this._fullVideo);
      }
    }), c.push({
      icon: o,
      position: L.LEFT,
      title: this.player.translate("Maximize video"),
      ariaLabel: this.player.translate("Maximize video"),
      name: this.name + ":iconMaximize",
      click: async () => {
        this.switchSources(), await this.player.videoContainer.updateLayout(this._fullVideo);
      }
    })) : this.dualVideoContentIds.length > 0 && c.push({
      icon: l,
      position: L.LEFT,
      title: this.player.translate("Set side by side"),
      ariaLabel: this.player.translate("Set side by side"),
      name: this.name + ":iconSideBySide",
      click: async () => {
        const d = this.player.videoContainer.validContentIds, u = this.dualVideoContentIds.find((h) => d.indexOf(h) !== -1);
        u && this.player.videoContainer.setLayout(u);
      }
    }), c;
  }
  switchSide() {
    this._currentLayout.id === "pip-left" ? this._currentLayout = ds : this._currentLayout = mt;
  }
  switchSources() {
    const e = this._pipVideo;
    this._pipVideo = this._fullVideo, this._fullVideo = e;
  }
  getLayoutStructure(e, t, n) {
    const { content: s } = this.validContent.find((r) => r.id === t);
    n && s.find((r) => r === n) ? (this._fullVideo = n, this._pipVideo = s.find((r) => r !== n)) : (!this._pipVideo || !this._fullVideo) && (this._pipVideo = s[0], this._fullVideo = s[1]);
    const a = JSON.parse(JSON.stringify(this._currentLayout));
    return a.player = this.player, a.videos[0].content = this._fullVideo, a.videos[1].content = this._pipVideo, a;
  }
}
class ps extends ue {
  getPluginModuleInstance() {
    return Q.Get();
  }
  get name() {
    return super.name || "es.upv.paella.singleVideo";
  }
  get identifier() {
    return "single-video";
  }
  async load() {
    this.player.log.debug("Single video layout loaded"), this.dualVideoContentIds = this.config.dualVideoContentIds || [
      "presenter-presentation-dynamic",
      "presenter-2-presentation-dynamic",
      "presenter-presenter-2-dynamic",
      "presenter-presentation",
      "presenter-2-presentation",
      "presenter-presenter-2"
    ];
  }
  getValidStreams(e) {
    return super.getValidStreams(e).filter((t) => t.length === 1);
  }
  getVideoCanvasButtons(e, t, n, s) {
    return this._multiStream ? [
      {
        icon: this.player.getCustomPluginIcon(this.name, "iconSideBySide") || Ce,
        position: L.LEFT,
        title: this.player.translate("Two videos 50%"),
        ariaLabel: this.player.translate("Two videos 50%"),
        name: this.name + ":iconSideBySide",
        click: () => {
          const a = this.player.videoContainer.validContentIds, r = this.dualVideoContentIds.find((o) => a.indexOf(o) !== -1);
          r && this.player.videoContainer.setLayout(r);
        }
      }
    ] : [];
  }
  getLayoutStructure(e, t) {
    const n = this.validContent.find((a) => a.id === t), s = {
      player: this.player,
      name: { es: "One stream" },
      hidden: !1,
      videos: [
        {
          content: n.content[0],
          rect: [
            { aspectRatio: "1/1", left: 280, top: 0, width: 720, height: 720 },
            { aspectRatio: "6/5", left: 208, top: 0, width: 864, height: 720 },
            { aspectRatio: "5/4", left: 190, top: 0, width: 900, height: 720 },
            { aspectRatio: "4/3", left: 160, top: 0, width: 960, height: 720 },
            { aspectRatio: "11/8", left: 145, top: 0, width: 990, height: 720 },
            { aspectRatio: "1.41/1", left: 132, top: 0, width: 1015, height: 720 },
            { aspectRatio: "1.43/1", left: 125, top: 0, width: 1029, height: 720 },
            { aspectRatio: "3/2", left: 100, top: 0, width: 1080, height: 720 },
            { aspectRatio: "16/10", left: 64, top: 0, width: 1152, height: 720 },
            { aspectRatio: "5/3", left: 40, top: 0, width: 1200, height: 720 },
            { aspectRatio: "16/9", left: 0, top: 0, width: 1280, height: 720 },
            { aspectRatio: "1.85/1", left: 0, top: 14, width: 1280, height: 692 },
            { aspectRatio: "2.35/1", left: 0, top: 87, width: 1280, height: 544 },
            { aspectRatio: "2.41/1", left: 0, top: 94, width: 1280, height: 531 },
            { aspectRatio: "2.76/1", left: 0, top: 128, width: 1280, height: 463 }
          ],
          visible: !0,
          layer: 1
        }
      ],
      background: { content: "slide_professor_paella.jpg", zIndex: 5, rect: { left: 0, top: 0, width: 1280, height: 720 }, visible: !0, layer: 0 },
      logos: [{ content: "paella_logo.png", zIndex: 5, rect: { top: 10, left: 10, width: 49, height: 42 } }],
      buttons: [],
      onApply: function() {
      }
    };
    return e.length > 1 && (this._multiStream = !0), s;
  }
}
class gs extends ue {
  getPluginModuleInstance() {
    return Q.Get();
  }
  get name() {
    return super.name || "es.upv.paella.singleVideoDynamic";
  }
  get layoutType() {
    return "dynamic";
  }
  async load() {
    this.player.log.debug("Single video dynamic layout loaded"), this.dualVideoContentIds = this.config.dualVideoContentIds || [
      "presenter-presentation-dynamic",
      "presenter-2-presentation-dynamic",
      "presenter-presenter-2-dynamic",
      "presenter-presentation",
      "presenter-2-presentation",
      "presenter-presenter-2"
    ];
  }
  getVideoCanvasButtons(e, t, n, s) {
    const a = this.player.getCustomPluginIcon(this.name, "iconSideBySide") || Ce, r = [];
    return this._multiStream && r.push({
      icon: a,
      position: L.LEFT,
      title: this.player.translate("Dual stream 50%"),
      ariaLabel: this.player.translate("Dual stream 50%"),
      name: this.name + ":iconSideBySide",
      click: async () => {
        const o = this.player.videoContainer.validContentIds, l = this.dualVideoContentIds.find((c) => o.indexOf(c) !== -1);
        l && this.player.videoContainer.setLayout(l);
      }
    }), r;
  }
  getLayoutStructure(e, t, n) {
    e.length > 1 && (this._multiStream = !0);
    const { content: s } = this.validContent.find((a) => a.id === t);
    return this._currentContent = s.map((a) => ({
      id: a,
      size: 50
    })), {
      id: "single-dynamic",
      videos: [
        {
          content: this._currentContent[0].id,
          visible: !0,
          size: this._currentContent[0].size
        }
      ]
    };
  }
}
const ms = {
  videos: [
    {
      content: {},
      rect: [
        { aspectRatio: "16/9", left: 239, top: 17, width: 803, height: 451 }
      ],
      visible: !0,
      layer: 1
    },
    {
      content: {},
      rect: [
        { aspectRatio: "16/9", left: 44, top: 482, width: 389, height: 218 }
      ],
      visible: !0,
      layer: 1
    },
    {
      content: {},
      rect: [
        { aspectRatio: "16/9", left: 847, top: 482, width: 389, height: 218 }
      ],
      visible: !0,
      layer: 1
    }
  ],
  buttons: [
    {
      rect: { left: 618, top: 495, width: 45, height: 45 },
      onClick: function(i) {
        this.rotate();
      },
      label: "Rotate",
      icon: "icon_rotate.svg",
      layer: 2
    }
  ]
};
function fs(i) {
  let e = JSON.parse(JSON.stringify(ms));
  return e.videos[0].content = i[0], e.videos[1].content = i[1], e.videos[2].content = i[2], e;
}
class ys extends ue {
  getPluginModuleInstance() {
    return Q.Get();
  }
  get name() {
    return super.name || "es.upv.paella.tripleVideo";
  }
  get identifier() {
    return "triple-video";
  }
  async load() {
    this.player.log.debug("Triple video layout loaded");
  }
  getValidStreams(e) {
    return super.getValidStreams(e).filter((t) => t.length === 3);
  }
  switchContent() {
    const e = this._currentContent[0], t = this._currentContent[1], n = this._currentContent[2];
    this._currentContent[0] = n, this._currentContent[1] = e, this._currentContent[2] = t, this.player.videoContainer.updateLayout();
  }
  getLayoutStructure(e, t) {
    if (!this._currentContent || this._currentContentId !== t) {
      this._currentContentId = t;
      const { content: a } = this.validContent.find((r) => r.id === t);
      this._currentContent = a;
    }
    const n = fs(this._currentContent);
    return {
      player: this.player,
      name: { es: "Three streams with dynamic position" },
      hidden: !1,
      videos: n.videos,
      buttons: [
        {
          rect: n.buttons[0].rect,
          onClick: () => {
            this.switchContent();
          },
          label: "Switch",
          icon: ci,
          layer: 2,
          ariaLabel: "Swap the position of the videos",
          title: "Swap the position of the videos"
        }
      ]
    };
  }
}
class _s extends oi {
  constructor(e, t) {
    super("div", e, t), this.element.classList.add("image-canvas");
  }
  async loadCanvas(e) {
    e.element.style.width = "100%", e.element.style.height = "100%";
  }
}
class vs extends li {
  get name() {
    return super.name || "es.upv.paella.audioCanvas";
  }
  get canvasType() {
    return "audio";
  }
  getCanvasInstance(e) {
    return new _s(this.player, e);
  }
}
class ws extends oi {
  constructor(e, t) {
    super("div", e, t);
  }
  async loadCanvas(e) {
    e.element.style.width = "100%", e.element.style.height = "100%";
  }
}
class Cs extends li {
  get name() {
    return super.name || "es.upv.paella.videoCanvas";
  }
  get canvasType() {
    return "video";
  }
  async isCompatible(e) {
    return !Array.isArray(e.canvas) || e.canvas.length === 0 ? !0 : await super.isCompatible(e);
  }
  getCanvasInstance(e) {
    return new ws(this.player, e);
  }
}
class ui extends ee {
  get type() {
    return "data";
  }
  get context() {
    return this.config.context || [];
  }
  async read() {
    throw Error(`DataPlugin.read() not implemented in data plugin '${this.name}'`);
  }
  async write() {
    throw Error(`DataPlugin.write() not implemented in data plugin '${this.name}'`);
  }
  async remove() {
    throw Error(`DataPlugin.remove() not implemented in data plugin '${this.name}'`);
  }
}
class bs extends le {
  constructor(e) {
    super(e), this._dataPlugins = {}, M(this.player, "data", async (t) => {
      var n;
      (n = t.context) == null || n.forEach((s) => {
        this._dataPlugins[s] = this._dataPlugins[s] || [], this._dataPlugins[s].push(t);
      });
    });
  }
  getDataPlugin(e) {
    let t = this._dataPlugins[e] && this._dataPlugins[e].length > 0 && this._dataPlugins[e][0];
    if (t || (t = this._dataPlugins.default && this._dataPlugins.default.length > 0 && this._dataPlugins.default[0]), !t)
      throw Error(`No data plugin found for context '${e}'`);
    return t;
  }
  getDataPlugins(e) {
    let t = this._dataPlugins[e] && this._dataPlugins[e].length > 0 && this._dataPlugins[e];
    if (t || (t = this._dataPlugins.default && this._dataPlugins.default.length > 0 && this._dataPlugins.default), !t)
      throw Error(`No data plugin found for context '${e}'`);
    return t;
  }
  async read(e, t) {
    return await this.getDataPlugin(e).read(e, t);
  }
  async write(e, t, n) {
    const s = this.getDataPlugins(e);
    if (Array.isArray(s)) {
      let a = null;
      for (let r = 0; r < s.length; ++r)
        a = await s[r].write(e, t, n);
      return a;
    } else {
      if (s)
        return await s.write(e, t, n);
      this.player.log.warn(`No such data plugin found for context '${e}'`);
    }
  }
  async remove(e, t) {
    const n = this.getDataPlugins(e);
    if (n.length > 1) {
      let s = null;
      for (let a = 0; a < n.length; ++a)
        s = await n[a].remove(e, t);
      return s;
    } else
      return await n.remove(e, t);
  }
}
let Ue = null;
class xe extends ke {
  static Get() {
    return Ue || (Ue = new xe()), Ue;
  }
  get moduleName() {
    return "paella-core default data plugins";
  }
  get moduleVersion() {
    return we.version;
  }
}
class Ls extends ui {
  getPluginModuleInstance() {
    return xe.Get();
  }
  get name() {
    return super.name || "es.upv.paella.cookieDataPlugin";
  }
  serializeKey(e, t) {
    return typeof t == "object" && (t = JSON.stringify(t)), `${e}|${t}`;
  }
  async read(e, t) {
    const n = this.serializeKey(e, t);
    let s = K(n);
    try {
      s = JSON.parse(s);
    } catch {
    }
    return this.player.log.debug(`CookieDataPlugin.read: ${n}`), s;
  }
  async write(e, t, n) {
    const s = this.serializeKey(e, t);
    if (n && typeof n == "object")
      try {
        n = JSON.stringify(n);
      } catch {
        this.player.log.warn(`CookieDataPlugin.write: ${s}: invalid data object.`), n = "";
      }
    X(s, n), this.player.log.debug(`CookieDataPlugin.write: ${s}`);
  }
  async remove(e, t) {
    const n = this.serializeKey(e, t);
    X(n, ""), this.player.log.debug(`CookieDataPlugin.remove: ${n}`);
  }
}
class Es extends ui {
  getPluginModuleInstance() {
    return xe.Get();
  }
  get name() {
    return super.name || "es.upv.paella.localStorageDataPlugin";
  }
  serializeKey(e, t) {
    return typeof t == "object" && (t = JSON.stringify(t)), `${e}|${t}`;
  }
  async read(e, t) {
    const n = this.serializeKey(e, t);
    let s = localStorage.getItem(n);
    try {
      s = JSON.parse(s);
    } catch {
    }
    return this.player.log.debug(`LocalStorageDataPlugin.read: ${n}`), s;
  }
  async write(e, t, n) {
    const s = this.serializeKey(e, t);
    if (n && typeof n == "object")
      try {
        n = JSON.stringify(n);
      } catch {
        this.player.log.warn(`LocalStorageDataPlugin.write: ${s}: invalid data object.`), n = "";
      }
    localStorage.setItem(s, n), this.player.log.debug(`LocalStorageDataPlugin.write: ${s}`);
  }
  async remove(e, t) {
    const n = this.serializeKey(e, t);
    localStorage.setItem(n, ""), this.player.log.debug(`LocalStorageDataPlugin.remove: ${n}`);
  }
}
const Ps = [
  {
    plugin: an,
    config: {
      enabled: !1
    }
  },
  {
    plugin: ln,
    config: {
      enabled: !1
    }
  },
  {
    plugin: dn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: rn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: mn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: yn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: kn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: An,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Wn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Yn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Jn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: gt,
    config: {
      enabled: !1
    }
  },
  {
    plugin: us,
    config: {
      enabled: !1
    }
  },
  {
    plugin: hs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: ps,
    config: {
      enabled: !1
    }
  },
  {
    plugin: gs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: gt,
    config: {
      enabled: !1
    }
  },
  {
    plugin: ys,
    config: {
      enabled: !1
    }
  },
  {
    plugin: vs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Cs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Ls,
    config: {
      enabled: !1,
      context: ["default"]
    }
  },
  {
    plugin: Es,
    config: {
      enable: !0,
      context: ["default"]
    }
  }
];
class Ss extends Xe {
  constructor() {
    super(...arguments), this._refreshContent = !0;
  }
  set refreshContent(e) {
    this._refreshContent = e;
  }
  get refreshContent() {
    return this._refreshContent;
  }
  get closeParentPopUp() {
    return this.config.closeParentPopUp || this.getCloseParentPopUp();
  }
  getCloseParentPopUp() {
    return !1;
  }
  async action(e, t) {
    this.parentPopUp = t, await this.showPopUp();
  }
  get parentPopUp() {
    return this._parentPopUp;
  }
  set parentPopUp(e) {
    this._parentPopUp = e;
  }
  get popUp() {
    return this._popUp;
  }
  get menuTitle() {
    return this.config.menuTitle || null;
  }
  get moveable() {
    return this.config.moveable ?? !1;
  }
  get resizeable() {
    return this.config.resizeable ?? !1;
  }
  get customPopUpClass() {
    return this.config.customPopUpClass ?? "";
  }
  get closeActions() {
    var n, s;
    const e = ((n = this.config.closeActions) == null ? void 0 : n.clickOutside) ?? !0, t = ((s = this.config.closeActions) == null ? void 0 : s.closeButton) ?? !1;
    return {
      clickOutside: e,
      closeButton: t
    };
  }
  get currentContent() {
    return this._currentContent;
  }
  async getContent() {
    return v("<p>Pop Up Button Plugin Content</p>");
  }
  async checkRefreshContent() {
    if (this.refreshContent) {
      const e = await this.getContent();
      this._currentContent.innerHTML = "", Array.from(e.children).forEach((n) => this._currentContent.appendChild(n));
    }
  }
  get popUpType() {
    return this.config.popUpType || "modal";
  }
  hidePopUp() {
    this.player.playbackBar.popUp.isHidden || this.player.playbackBar.popUp.hide();
  }
  async showPopUp() {
    const e = this.player.playbackBar.popUp;
    if (e.isHidden || this._contentId !== e.currentContentId) {
      const t = await this.getContent();
      this._currentContent = t, this._contentId = e.show({
        title: this.menuTitle || this.description,
        content: t,
        attachRight: this.popUpType === "timeline" || this.side === "right",
        attachLeft: this.popUpType === "timeline" || this.side === "left",
        parent: this.parentPopUp
      });
    } else
      e.hide();
  }
}
const ft = (i) => i ? `<span class="menu-title">${i}</span>` : "", yt = (i) => i ? `<i class="menu-icon">${i}</i>` : "", _t = (i) => i ? `aria-label="${i}"` : "", Ts = (i) => i ? `<span class="state-text">${i}</span>` : "", Is = (i) => i ? `<i class="state-icon">${i}</i>` : "", ks = (i, e) => i || e ? `<span class="button-state">${Ts(i)}${Is(e)}</span>` : "", Ds = {
  button({ id: i = 0, title: e = null, icon: t = null, showTitle: n = !0, stateText: s = null, stateIcon: a = null, allItems: r, plugin: o }) {
    const l = v(`
			<button class="menu-button-item" ${_t(e)} data-id="${i}">
				${yt(t)}
				${n ? ft(e) : ""}
				${s || a ? ks(s, a) : ""}
			</button>
		`);
    return l.addEventListener("click", async (c) => {
      const d = r.find((u) => u.id === i);
      o.itemSelected(d, r), await o.checkRefreshContent(), c.stopPropagation(), o.closeOnSelect && o.closeMenu();
    }), l;
  },
  input({ type: i, id: e = 0, title: t = null, icon: n = null, showTitle: s = !0, plugin: a, onItemSelected: r, selectedItems: o, menuName: l }) {
    const c = o[e] ?? !1, d = v(`
			<label class="menu-button-item">
				<input type="${i}" ${c ? "checked" : ""} value="${e}" ${_t(t)} name="${l}" data-id="${e}">
				${yt(n)}
				${s ? ft(t) : ""}
			</label>
		`);
    return d.querySelector("input").addEventListener("click", (u) => u.stopPropagation()), d.querySelector("input").addEventListener("change", (u) => {
      r(u.target), a.checkRefreshContent(), a.closeOnSelect && a.closeMenu();
    }), d;
  },
  check({ plugin: i, id: e = 0, title: t = null, icon: n = null, showTitle: s = !0, allItems: a, selectedItems: r }) {
    return this.input({ type: "checkbox", id: e, title: t, icon: n, showTitle: s, allItems: a, selectedItems: r, onItemSelected: (o) => {
      const l = a.find((c) => c.id === e);
      r[e] = o.checked, i.itemSelected(l, a);
    } });
  },
  radio({ plugin: i, id: e = 0, title: t = null, icon: n = null, showTitle: s = !0, allItems: a, selectedItems: r, menuName: o }) {
    return this.input({ plugin: i, type: "radio", id: e, title: t, icon: n, showTitle: s, allItems: a, selectedItems: r, menuName: o, onItemSelected: (l) => {
      let c = null;
      r[e] = !0, a.forEach((d) => {
        d.id === e ? c = d : r[d.id] = !1;
      }), i.itemSelected(c, a);
    } });
  }
};
function xs(i, e, t, n, s, a) {
  const r = Ds[e]({
    ...i,
    menuName: s,
    plugin: this,
    allItems: n,
    selectedItems: a
  });
  return t.appendChild(r), r;
}
class As extends Ss {
  get closeOnSelect() {
    return this.config.closeOnSelect === void 0 && (this.buttonType !== "check" ? this.config.closeOnSelect = !0 : this.config.closeOnSelect = !1), this.config.closeOnSelect;
  }
  setSelected(e, t) {
    this._selectedItems && (this._selectedItems[e] = t);
  }
  async getContent() {
    const e = v('<fieldset class="menu-button-content"></fieldset>');
    this._content = e;
    const t = await this.getMenu();
    this._menuItems = t;
    let n = null;
    this._selectedItems || (this._selectedItems = {}, this._menuItems.forEach((r) => {
      r.selected !== void 0 && r.selected !== null && (this._selectedItems[r.id] = r.selected);
    }));
    const s = self.crypto.randomUUID();
    return n = t.map((r) => xs.apply(this, [r, this.buttonType, e, t, s, this._selectedItems]))[0], setTimeout(() => {
      n && n.focus();
    }, 50), e;
  }
  get menuTitle() {
    return this.config.menuTitle || null;
  }
  async getMenu() {
    return [
      { id: 0, title: "Option 1" },
      { id: 1, title: "Option 2" },
      { id: 2, title: "Option 3" },
      { id: 3, title: "Option 4" },
      { id: 4, title: "Option 5" }
    ];
  }
  // Returns the menuItems with the current menu state
  get menuItems() {
    return this._menuItems;
  }
  // If showTitles is false, then the 'title' attribute of the menu
  // items is used only as aria-label.
  // If the menu item has no icon, then the `showTitles` property is ignored
  get showTitles() {
    return !0;
  }
  get buttonType() {
    return "radio";
  }
  itemSelected(e, t) {
    this.player.log.warn(`MenuButtonPlugin (${this.name}): itemSelected() function not implemented.`);
  }
  closeMenu() {
    this.player.playbackBar.popUp.hide();
  }
  async showPopUp() {
    this.refreshContent = !0, await super.showPopUp();
  }
}
class Ms extends As {
  get closeOnSelect() {
    return this.config.closeOnSelect ?? !1;
  }
  async load() {
    this._iconPath && (this.icon = await Pt(this._iconPath));
  }
  async getContent() {
    return this._buttonPlugins || (this._buttonPlugins = [], await M(this.player, "button", async (e) => {
      this.player.log.debug(`Load button plugins into "${this.groupName}" container`), this._buttonPlugins.push(e), e.setObserver(this);
    }, async (e) => e.parentContainer === this.groupName ? await e.isEnabled() : !1)), await super.getContent();
  }
  onIconChanged(e, t, n) {
  }
  onTitleChanged(e, t, n) {
  }
  onStateChanged(e, t, n, s, a) {
  }
  get groupName() {
    var e;
    return ((e = this.config) == null ? void 0 : e.groupName) || "buttonGroup";
  }
  get popUpType() {
    return "no-modal";
  }
  getClosePopUps() {
    return !1;
  }
  buttonType() {
    return "button";
  }
  async getMenu() {
    return this._buttonPlugins.map((e) => ({
      id: e.name,
      title: e.title || e.description,
      icon: e.icon
    }));
  }
  itemSelected(e, t) {
    const n = this._buttonPlugins.find((s) => s.name === e.id);
    if (n) {
      const s = new Event("menuitemselected");
      n.action(s, this.currentContent);
    }
  }
  async showPopUp() {
    var e;
    await super.showPopUp(), setTimeout(() => {
      this._firstItem && this._firstItem.focus();
    }, 50), (e = this.buttons) == null || e.forEach((t) => {
      t.style.display === "none" ? this.hideButtonContainer(t) : this.showButtonContainer(t);
    });
  }
  get buttons() {
    return this._content && Array.from(this._content.getElementsByClassName("button-plugin"));
  }
  hideButtonContainer(e) {
    var n;
    const t = (n = e.parentNode) == null ? void 0 : n.parentNode;
    t && (t.style.display = "none");
  }
  showButtonContainer(e) {
    var n;
    const t = (n = e.parentNode) == null ? void 0 : n.parentNode;
    t && (t.style.display = null);
  }
}
const nt = (i, e, t, n = {}) => {
  const s = new i(e, t);
  return t = s.name || t, t ? (e.config.plugins && e.config.plugins[t] && fe(n, e.config.plugins[t], !1), s._config = n, s) : (e.log.warn(`The instance of the ${i.name} plugin cannot be created because it is being loaded explicitly and does not have the name property implemented.`), null);
};
function st(i, e, t, n, s = !1) {
  const a = t.type;
  let r = -1;
  if (i.__pluginData__.pluginInstances[a] && i.__pluginData__.pluginInstances[a].find((l, c) => {
    if (l.name === t.name)
      return r = c, !0;
  }) && !s) {
    i.log.info(`Plugin ${t.name} of type ${a} already registered.`);
    return;
  }
  i.__pluginData__.pluginClasses[e] = n, i.__pluginData__.pluginInstances[a] = i.__pluginData__.pluginInstances[a] || [], r !== -1 && i.__pluginData__.pluginInstances[a].splice(r, 1), i.__pluginData__.pluginInstances[a].push(t), i.__pluginModules = i.__pluginModules || [];
  const o = t.getPluginModuleInstance();
  if (o && (o._player = o._player || i, !i.__pluginModules.find((l) => l.constructor.name === o.constructor.name))) {
    const l = o.moduleName, c = o.moduleVersion;
    i.log.debug(`Plugin module imported: ${l}: v${c}`), i.__pluginModules.push(o);
  }
}
function Rs(i, e) {
  let t = null, n = { enabled: !0 };
  if (typeof e == "function" ? t = e : typeof e == "object" && typeof e.plugin == "function" && (t = e.plugin, n = e.config), !t)
    i.log.warn("Error importing plugin with explicit import API. Check the 'plugins' array at init params");
  else {
    const s = nt(t, i, null, n);
    if (!s)
      i.log.warn(`Unable to create an instance of the plugin ${t.name}`);
    else {
      const a = s.constructor.name;
      st(i, a, s, t, !0);
    }
  }
}
function wa(i, e) {
  const t = i.config;
  e.keys().forEach((n) => {
    const s = e(n), a = n.substring(2, n.length - 3);
    if (t.plugins[a]) {
      const r = s.default, o = nt(r, i, a, {});
      st(i, n, o, r, !1);
    } else if (/^[a-z0-9]+$/i.test(a)) {
      i.__pluginModules = i.__pluginModules || [];
      const r = s.default, o = new r(i);
      if (!i.__pluginModules.find((l) => l.constructor.name === o.constructor.name)) {
        const l = o.moduleName, c = o.moduleVersion;
        i.log.debug(`Plugin module imported: ${l}: v${c}`), i.__pluginModules.push(o);
      }
    }
  });
}
function Vs(i) {
  const e = i.config;
  if (i.__pluginData__ = i.__pluginData__ || {
    pluginClasses: [],
    pluginInstances: {}
  }, i.__pluginData__.pluginClasses.length !== 0)
    return;
  [
    ...Ps,
    ...i.initParams.plugins
  ].forEach((n) => {
    Rs(i, n);
  });
  const { buttonGroups: t } = e;
  t && t.forEach((n, s) => {
    const a = `button_group_${s}`, r = nt(Ms, i, a, n);
    r._iconPath = O([i.configResourcesUrl, n.icon]), st(i, r.type, r, `ButtonGroupPlugin${s}`, !1);
  }), i.log.debug("Plugins have been registered:");
}
function Ns(i) {
  delete i.__pluginData__;
}
function di(i, e) {
  var t;
  return ((t = i.__pluginData__) == null ? void 0 : t.pluginInstances[e]) || [];
}
async function M(i, e, t = null, n = null) {
  if (!i.__pluginData__.pluginInstances[e]) {
    i.log.info(`There are no defined plugins of type '${e}'`);
    return;
  }
  i.__pluginData__.pluginInstances[e].sort((s, a) => s.order - a.order), i.__pluginData__.pluginInstances[e].forEach((s) => i.log.debug(`type: ${e}, name: ${s.name}`)), typeof n != "function" && (n = async function(s) {
    return await s.isEnabled();
  });
  for (const s in i.__pluginData__.pluginInstances[e]) {
    const a = i.__pluginData__.pluginInstances[e][s];
    if (await n(a)) {
      if (a.__uiPlugin) {
        const o = await a.getDictionaries();
        if (typeof o == "object")
          for (const l in o) {
            const c = o[l];
            i.addDictionary(l, c);
          }
      }
      typeof t == "function" && await t(a), await a.load();
    }
  }
}
async function hi(i, e) {
  var t;
  (t = i.__pluginData__.pluginInstances[e]) == null || t.forEach(async (n) => {
    await n.unload();
  });
}
function Us(i) {
  var t;
  const e = (n, s) => {
    if (!n)
      throw new Error(`Invalid video manifest: ${s}`);
  };
  e(i.streams, "missing 'streams' object."), e(i.streams.length > 0, "the 'streams' array is empty."), e((t = i.metadata) == null ? void 0 : t.preview, "the 'metadata.preview' field is required.");
}
class Fs extends le {
  constructor(e, t) {
    super(e, t), this._videoContainer = t, this._streamData = null, this._streams = null, this._players = [], this._mainAudioPlayer = null, this._streamSyncTimer = null, this._trimming = {
      enabled: !1,
      start: 100,
      end: 200
    };
  }
  async load(e) {
    this._streamData = e, this._streams = {};
    let t = this.player.config.defaultAudioStream || "presenter";
    this._streamData.length === 1 && (t = this._streamData[0].content), e.some((s) => {
      if (s.role === "mainAudio")
        return t = s.content, !0;
    }), this.player.log.debug("Finding compatible video plugins"), await ns(this.player);
    for (const s of this._streamData) {
      const a = as(this.player, s);
      if (!a)
        throw Error(`Canvas plugin not found: ${s.canvas}`);
      const r = s.content === t, o = await Ni(this.player, s);
      if (!o)
        throw Error(`Incompatible stream type: ${s.content}`);
      this._streams[s.content] = {
        stream: s,
        isMainAudio: r,
        videoPlugin: o,
        canvasPlugin: a
      };
    }
    let n = null;
    for (const s in this._streams) {
      const a = this._streams[s];
      a.canvas = await a.canvasPlugin.getCanvasInstance(this._videoContainer), a.player = await a.videoPlugin.getVideoInstance(a.canvas.element, a.isMainAudio), t === s ? (this._mainAudioPlayer = a.player, a.player.initVolume(1)) : a.player.initVolume(0), await a.player.load(a.stream, this), await a.canvas.loadCanvas(a.player), a.player.onVideoEnded(() => {
        n === null && (se(this.player, g.ENDED), n = setTimeout(() => {
          n = null;
        }, 2e3));
      }), this._players.push(a.player);
    }
    if (this.mainAudioPlayer === null)
      throw this.player.log.error("The video stream containing the audio track could not be identified. The `role` attribute must be specified in the main video stream, or the `defaultAudioStream` attribute must be set correctly in the player configuration."), new Error("The video stream containing the audio track could not be identified.");
  }
  async unload() {
    this.stopStreamSync(), await ss(this.player);
  }
  get players() {
    return this._players;
  }
  // This is the raw streamData loaded from the video manifest
  get streamData() {
    return this._streamData;
  }
  // This property stores the available streams, indexed by the content identifier, and contains the
  // stream data, the video plugin and the player, for each content identifier.
  get streams() {
    return this._streams;
  }
  get mainAudioPlayer() {
    return this._mainAudioPlayer;
  }
  get isTrimEnabled() {
    var e, t, n;
    return ((e = this._trimming) == null ? void 0 : e.enabled) && ((t = this._trimming) == null ? void 0 : t.end) > ((n = this._trimming) == null ? void 0 : n.start);
  }
  get trimStart() {
    var e;
    return (e = this._trimming) == null ? void 0 : e.start;
  }
  get trimEnd() {
    var e;
    return (e = this._trimming) == null ? void 0 : e.end;
  }
  async setTrimming({ enabled: e, start: t, end: n }) {
    if (t >= n)
      throw Error(`Error setting trimming: start time (${t}) must be lower than end time ${n}`);
    this._trimming = {
      enabled: e,
      start: t,
      end: n
    };
    const s = await this.currentTime();
    se(this.player, g.TIMEUPDATE, { currentTime: e ? t + s : s });
  }
  startStreamSync() {
    this._timeSync = !0;
    const e = async () => {
      if (!this._players.length) {
        this.player.log.warn("Player not yet loaded. Waiting for video sync.");
        return;
      }
      let t = this.mainAudioPlayer.currentTimeSync;
      const n = 0.2;
      if (this.players.length > 1)
        for (let s = 0; s < this.players.length; ++s) {
          const a = this.players[s];
          if (a !== this.mainAudioPlayer) {
            const r = a.currentTimeSync;
            Math.abs(t - r) > n && (this.player.log.debug("Video synchronization triggered"), a.setCurrentTime(t));
          }
        }
      if (this.isTrimEnabled) {
        let s = t - this.trimStart;
        if (this.trimEnd <= t) {
          await this.executeAction("pause"), await this.setCurrentTime(0), this.stopStreamSync(), t = 0, se(this.player, g.ENDED, {});
          return;
        } else
          t < this.trimStart && (await this.setCurrentTime(0), t = this.trimStart, s = 0);
        se(this.player, g.TIMEUPDATE, { currentTime: s }), this._timeupdateTimer = setTimeout(() => {
          this._timeSync && e();
        }, 250);
      } else
        this._timeSync && (se(this.player, g.TIMEUPDATE, { currentTime: t }), this._timeupdateTimer = setTimeout(() => {
          e();
        }, 250));
    };
    e();
  }
  stopStreamSync() {
    this._timeSync = !1, this._timeupdateTimer && clearTimeout(this._timeupdateTimer);
  }
  executeAction(e, t = []) {
    return Array.isArray(t) || (t = [t]), new Promise((n) => {
      let s = [], a = [];
      this.players.forEach((r) => {
        a.push(new Promise((o) => {
          r[e](...t).then((l) => {
            s.push(l), o();
          });
        }));
      }), Promise.allSettled(a).then(() => n(s));
    });
  }
  get isLiveStream() {
    return this._streamData.some((e) => Array.from(Object.keys(e.sources)).indexOf("hlsLive") !== -1);
  }
  async play() {
    return this.startStreamSync(), await this.executeAction("play");
  }
  async pause() {
    return this.stopStreamSync(), await this.executeAction("pause");
  }
  async stop() {
    this.stopStreamSync(), await this.executeAction("pause"), await this.executeAction("setCurrentTime", 0);
  }
  async paused() {
    return (await this.executeAction("paused"))[0];
  }
  async setCurrentTime(e) {
    const t = await this.duration();
    e < 0 ? e = 0 : e > t && (e = t);
    const n = (await this.executeAction("currentTime"))[0];
    let s = null;
    if (this.isTrimEnabled) {
      e = e + this.trimStart, e = e >= this.trimEnd ? this.trimEnd : e;
      const r = (await this.executeAction("setCurrentTime", [e]))[0], o = (await this.executeAction("currentTime"))[0];
      s = {
        result: r,
        prevTime: n - this.trimStart,
        newTime: o - this.trimStart
      };
    } else {
      const r = (await this.executeAction("setCurrentTime", [e]))[0], o = (await this.executeAction("currentTime"))[0];
      s = { result: r, prevTime: n, newTime: o };
    }
    const a = await this.currentTime();
    return se(this.player, g.TIMEUPDATE, { currentTime: a }), s;
  }
  async currentTime() {
    const e = await this.mainAudioPlayer.currentTime();
    return this.isTrimEnabled ? e - this.trimStart : e;
  }
  async currentTimeIgnoringTrimming() {
    return await this.mainAudioPlayer.currentTime();
  }
  async volume() {
    return this.mainAudioPlayer ? await this.mainAudioPlayer.volume() : (await this.executeAction("volume"))[0];
  }
  async setVolume(e) {
    return this.mainAudioPlayer ? await this.mainAudioPlayer.setVolume(e) : (await this.executeAction("setVolume", [e]))[0];
  }
  async duration() {
    return this.isTrimEnabled ? this.trimEnd - this.trimStart : (await this.executeAction("duration"))[0];
  }
  async durationIgnoringTrimming() {
    return (await this.executeAction("duration"))[0];
  }
  async playbackRate() {
    return (await this.executeAction("playbackRate"))[0];
  }
  async setPlaybackRate(e) {
    return (await this.executeAction("setPlaybackRate", [e]))[0];
  }
  async getQualityReferencePlayer() {
    let e = null, t = [];
    if (Object.keys(this.streams).length > 0)
      for (const n in this.streams) {
        const s = this.streams[n], a = await s.player.getQualities() || [];
        !e && a.length > t.length && (t = a, e = s.player);
      }
    return e || this.mainAudioPlayer;
  }
  async getCurrentQuality() {
    return (await this.getQualityReferencePlayer()).currentQuality;
  }
  async getQualities() {
    return await (await this.getQualityReferencePlayer()).getQualities();
  }
  async setQuality(e) {
    const n = await (await this.getQualityReferencePlayer()).getQualities(), s = n.length;
    let a = -1;
    if (n.some((r, o) => (e.index === r.index && (a = o), a !== -1)), a >= 0) {
      const r = a / s;
      for (const o in this.streams) {
        const l = this.streams[o], c = await l.player.getQualities() || [];
        if (this.player.log.debug(c), c.length > 1) {
          const d = Math.round(c.length * r), u = c[d];
          await l.player.setQuality(u);
        }
      }
    }
  }
  async supportsMultiaudio() {
    return this.mainAudioPlayer.supportsMultiaudio();
  }
  async getAudioTracks() {
    return this.mainAudioPlayer.getAudioTracks();
  }
  async setCurrentAudioTrack(e) {
    return this.mainAudioPlayer.setCurrentAudioTrack(e);
  }
  get currentAudioTrack() {
    return this.mainAudioPlayer.currentAudioTrack;
  }
}
function Os(i, e) {
  return Array.isArray[e] || (e = [e]), Vi(i, e).getManifestData(e);
}
async function $s(i) {
  return { w: 1280, h: 720 };
}
async function pi(i) {
  var e;
  for (const t in this.streamProvider.streams) {
    const n = ((e = i == null ? void 0 : i.videos) == null ? void 0 : e.find((a) => a.content === t)) != null, s = this.streamProvider.streams[t];
    n && !s.player.isEnabled ? await s.player.enable() : !n && s.player.isEnabled && await s.player.disable();
  }
}
function gi() {
  for (const i in this.streamProvider.streams) {
    const e = this.streamProvider.streams[i];
    e.canvas.element.style.display = "none", this._hiddenVideos.appendChild(e.canvas.element);
  }
}
async function Bs() {
  var c, d;
  const i = ri(this.player, this.streamProvider.streamData, this._layoutId, this._mainLayoutContent);
  await pi.apply(this, [i]), gi.apply(this);
  const e = await $s(this.player), t = this.elementSize, n = 100 / e.w, s = 100 / e.h, a = t.w / t.h, r = e.w / e.h, o = a > r ? { w: t.h * r, h: t.h } : { w: t.w, h: t.w / r };
  if (this.baseVideoRect.style.width = o.w + "px", this.baseVideoRect.style.height = o.h + "px", this.baseVideoRect.classList.remove("dynamic"), (c = i == null ? void 0 : i.videos) != null && c.length) {
    const u = [];
    for (const h of i.videos) {
      const y = this.streamProvider.streams[h.content], { stream: w, player: C, canvas: _ } = y, p = await C.getDimensions(), E = p.w / p.h;
      let U = Number.MAX_VALUE, P = null;
      _.buttonsArea.innerHTML = "", u.push(await He(this.player, i, _, h, h.content)), h.rect.forEach((ie) => {
        const q = /^(\d+.?\d*)\/(\d+.?\d*)$/.exec(ie.aspectRatio), ne = q ? Number(q[1]) / Number(q[2]) : 1, B = Math.abs(E - ne);
        B < U && (P = ie, U = B);
      }), _.element.style.display = "block", _.element.style.position = "absolute", _.element.style.left = `${(P == null ? void 0 : P.left) * n}%`, _.element.style.top = `${(P == null ? void 0 : P.top) * s}%`, _.element.style.width = `${(P == null ? void 0 : P.width) * n}%`, _.element.style.height = `${(P == null ? void 0 : P.height) * s}%`, _.element.style.zIndex = h.layer, this.baseVideoRect.appendChild(_.element);
    }
    setTimeout(() => {
      Ge(this.player, i, u.flat());
    }, 100);
  }
  const l = this.baseVideoRect.getElementsByClassName("video-layout-button");
  return Array.from(l).forEach((u) => this.baseVideoRect.removeChild(u)), (d = i == null ? void 0 : i.buttons) == null || d.forEach((u) => {
    const h = Ut({
      tag: "button",
      attributes: {
        class: "video-layout-button",
        "aria-label": ye(u.ariaLabel),
        title: ye(u.title),
        style: `
                    left: ${u.rect.left * n}%;
                    top: ${u.rect.top * s}%;
                    width: ${u.rect.width * n}%;
                    height: ${u.rect.height * s}%;
                    z-index: ${u.layer};
                `
      },
      parent: this.baseVideoRect,
      children: u.icon
    });
    h.layout = i, h.buttonAction = u.onClick, h.addEventListener("click", async (y) => {
      b(this.player, g.BUTTON_PRESS, {
        plugin: i.plugin,
        layoutStructure: i
      }), await y.target.buttonAction.apply(y.target.layout), y.stopPropagation();
    }), this._layoutButtons.push(h);
  }), !0;
}
async function Hs() {
  var r, o, l, c, d, u;
  const i = ri(this.player, this.streamProvider.streamData, this._layoutId, this._mainLayoutContent);
  await pi.apply(this, [i]), gi.apply(this), this.baseVideoRect.style.width = "", this.baseVideoRect.style.height = "", this.baseVideoRect.style.display = "flex", this.baseVideoRect.classList.add("dynamic"), this.baseVideoRect.innerHTML = "";
  const e = this.element.clientWidth, t = this.element.clientHeight, n = e > t;
  if (this.baseVideoRect.classList.remove("align-center"), this.baseVideoRect.classList.remove("align-top"), this.baseVideoRect.classList.remove("align-bottom"), this.baseVideoRect.classList.remove("align-left"), this.baseVideoRect.classList.remove("align-right"), n) {
    const h = ((o = (r = this.player.config.videoContainer) == null ? void 0 : r.dynamicLayout) == null ? void 0 : o.landscapeVerticalAlignment) || "align-center";
    this.baseVideoRect.classList.remove("portrait"), this.baseVideoRect.classList.add("landscape"), this.baseVideoRect.classList.add(h);
  } else {
    const h = ((c = (l = this.player.config.videoContainer) == null ? void 0 : l.dynamicLayout) == null ? void 0 : c.portraitHorizontalAlignment) || "align-center";
    this.baseVideoRect.classList.add("portrait"), this.baseVideoRect.classList.remove("landscape"), this.baseVideoRect.classList.add(h);
  }
  const s = this.baseVideoRect.clientWidth, a = this.element.clientHeight;
  if (((d = i == null ? void 0 : i.videos) == null ? void 0 : d.length) === 1) {
    const h = [], y = [], w = i.videos[0], C = this.streamProvider.streams[w.content], { player: _, canvas: p } = C;
    p.buttonsArea.innerHTML = "", y.push(await He(this.player, i, p, w, w.content)), p.element.style = {}, p.element.style.display = "block", p.element.style.width = "100%", p.element.style.height = "100%", p.element.style.overflow = "hidden", p.element.style.position = "relative", h.push(p.element), p.element.sortIndex = 0, h.forEach((E) => this.baseVideoRect.appendChild(E)), setTimeout(() => {
      Ge(this.player, i, y.flat());
    }, 100);
  } else if ((u = i == null ? void 0 : i.videos) != null && u.length) {
    let h = 0;
    const y = [], w = [];
    for (const C of i.videos) {
      const _ = this.streamProvider.streams[C.content], { player: p, canvas: E } = _, U = await p.getDimensions(), P = U.w / U.h, ie = s, q = a, ne = (n ? ie : q) * C.size / 100;
      let B = Math.round(n ? ne : ne * P), de = Math.round(n ? ne / P : ne);
      B > ie && (B = ie, de = Math.round(B / P)), de > q && (de = q, B = Math.round(de * P)), E.buttonsArea.innerHTML = "", w.push(await He(this.player, i, E, C, C.content)), E.element.style = {}, E.element.style.display = "block", E.element.style.width = `${B}px`, E.element.style.height = `${de}px`, E.element.style.overflow = "hidden", E.element.style.position = "relative", E.element.sortIndex = h++, y.push(E.element);
    }
    if (n) {
      const C = v('<div class="landscape-container"></div>', this.baseVideoRect);
      y.forEach((_) => C.appendChild(_));
    } else
      y.forEach((C) => this.baseVideoRect.appendChild(C));
    setTimeout(() => {
      Ge(this.player, i, w.flat());
    }, 100);
  }
  return !0;
}
class Gs extends $ {
  constructor(e, t) {
    var r;
    const n = "base-video-rect", s = {
      class: "video-container"
    };
    (r = e.config.videoContainer) != null && r.overPlaybackBar && (s.class += " over-playback-bar");
    const a = `
            <div class="${n}"></div>
            <div class="hidden-videos-container" style="display: none"></div>
        `;
    super(e, { attributes: s, children: a, parent: t }), this._hiddenVideos = this.element.getElementsByClassName("hidden-videos-container")[0], this._baseVideoRect = this.element.getElementsByClassName(n)[0], this.element.addEventListener("click", async () => {
      await this.paused() ? await this.play() : await this.pause();
    }), this._ready = !1, this._players = [], this._streamProvider = new Fs(this.player, this.baseVideoRect);
  }
  get layoutId() {
    return this._layoutId;
  }
  get mainLayoutContent() {
    return this._mainLayoutContent;
  }
  async setLayout(e, t = null) {
    var n, s;
    if (this.validContentIds.indexOf(e) === -1)
      return !1;
    {
      const a = (s = (n = this.player.config.videoContainer) == null ? void 0 : n.restoreVideoLayout) == null ? void 0 : s.global;
      await this.player.preferences.set("videoLayout", e, { global: a }), await this.player.preferences.set("videoLayoutMainContent", t, { global: a });
      const r = this._layoutId;
      this._layoutId = e, this._mainLayoutContent = t, await this.updateLayout(), r !== e && b(this.player, g.LAYOUT_CHANGED, { prevLayout: r, layoutId: e });
    }
  }
  get validContentIds() {
    return this._validContentIds;
  }
  get validContentSettings() {
    return this._validContentSettings;
  }
  get validLayouts() {
    return De(this.player, this.streamData);
  }
  get streamData() {
    return this._streamData;
  }
  get baseVideoRect() {
    return this._baseVideoRect;
  }
  get streamProvider() {
    return this._streamProvider;
  }
  async create() {
    this._baseVideoRect.style.display = "none", await M(this.player, "layout"), await Mi(this.player);
  }
  async load(e) {
    var o, l, c, d, u, h, y, w, C, _;
    if (this._streamData = e, (l = (o = this.player.config.videoContainer) == null ? void 0 : o.restoreVideoLayout) != null && l.enabled) {
      const p = (d = (c = this.player.config.videoContainer) == null ? void 0 : c.restoreVideoLayout) == null ? void 0 : d.global;
      this._layoutId = await this.player.preferences.get("videoLayout", { global: p }) || this.player.config.defaultLayout, this._mainLayoutContent = await this.player.preferences.get("videoLayoutMainContent", { global: p }) || null;
    } else
      this._layoutId = this.player.config.defaultLayout, this._mainLayoutContent = null;
    await this.streamProvider.load(e), this._validContentIds = si(this.player, e), this._validContentSettings = es(this.player, e), await this.updateLayout(null, !0);
    const t = v(
      '<div class="button-plugins left-side"></div>',
      this.element
    ), n = v(
      '<div class="button-plugins right-side"></div>',
      this.element
    );
    this._buttonPlugins = [t, n], this.player.log.debug("Loading videoContainer button plugins"), await M(this.player, "button", async (p) => {
      this.player.log.debug(` Button plugin: ${p.name}`), p.side === "left" ? await Te(p, t) : p.side === "right" && await Te(p, n);
    }, async (p) => p.parentContainer === "videoContainer" ? await p.isEnabled() : !1), this._baseVideoRect.style.display = "";
    const s = await this.player.preferences.get("volume", { global: !0 }), a = await this.player.preferences.get("playbackRate", { global: !0 }), r = await this.player.preferences.get("lastKnownTime", { global: !1 });
    if ((u = this.player.config.videoContainer) != null && u.restoreVolume && s !== null && s !== void 0 && await this.streamProvider.setVolume(s), (h = this.player.config.videoContainer) != null && h.restorePlaybackRate && a !== null && a !== void 0 && await this.streamProvider.setPlaybackRate(a), this.player.videoManifest.trimming && await this.player.videoContainer.setTrimming(this.player.videoManifest.trimming), (w = (y = this.player.config.videoContainer) == null ? void 0 : y.restoreLastTime) != null && w.enabled && !this.streamProvider.isLiveStream) {
      const p = async () => {
        if (!await this.paused()) {
          const U = await this.currentTime();
          await this.player.preferences.set("lastKnownTime", U, { global: !1 });
        }
        setTimeout(p, 1e3);
      };
      if (r) {
        const E = await this.player.preferences.get("lastKnownTime", { global: !1 }), U = await this.duration(), P = (_ = (C = this.player.config.videoContainer) == null ? void 0 : C.restoreLastTime) == null ? void 0 : _.remainingSeconds;
        U - E > P && await this.setCurrentTime(E);
      }
      p();
    }
    this._messageContainer = new En(this.player, this.element), this._ready = !0;
  }
  async unload() {
    this.removeFromParent(), await hi(this.player, "layout"), await Ri(this.player), await this.streamProvider.unload();
  }
  // Return true if the layout this.layoutId is compatible with the current stream data.
  async updateLayout(e = null) {
    const t = arguments[1];
    if (e && (this._mainLayoutContent = e), !t && this.player.state !== f.LOADED)
      return;
    if (this._updateInProgress)
      return this.player.log.warn("Recursive update layout detected"), !1;
    this._updateInProgress = !0;
    let n = !0;
    this._layoutButtons = [], (!this._layoutId || this._validContentIds.indexOf(this._layoutId) === -1) && (this._layoutId = this.player.config.defaultLayout, this._mainLayoutContent = null, this._validContentIds.indexOf(this._layoutId) === -1 && (this._layoutId = this._validContentIds[0]), n = !1);
    const s = ai(this.player, this.streamProvider.streamData, this._layoutId);
    return s.layoutType === "static" ? n = Bs.apply(this) : s.layoutType === "dynamic" && (n = Hs.apply(this)), this._updateInProgress = !1, n;
  }
  hideUserInterface() {
    if (this._layoutButtons && this._buttonPlugins) {
      this.player.log.debug("Hide video container user interface");
      const e = (t) => {
        t._prevDisplay = t.style.display, t.style.display = "none";
      };
      this._layoutButtons.forEach(e), this._buttonPlugins.forEach(e);
      for (const t in this.streamProvider.streams)
        this.streamProvider.streams[t].canvas.hideButtons();
    }
  }
  showUserInterface() {
    if (this._layoutButtons && this._buttonPlugins) {
      const e = (t) => t.style.display = t._prevDisplay || "block";
      this._layoutButtons.forEach(e), this._buttonPlugins.forEach(e);
      for (const t in this.streamProvider.streams)
        this.streamProvider.streams[t].canvas.showButtons();
    }
  }
  get message() {
    return this._messageContainer;
  }
  get elementSize() {
    return { w: this.element.offsetWidth, h: this.element.offsetHeight };
  }
  get ready() {
    return this._ready;
  }
  get isLiveStream() {
    return this.streamProvider.isLiveStream;
  }
  async play() {
    const e = await this.streamProvider.play();
    return b(this.player, g.PLAY), e;
  }
  async pause() {
    const e = await this.streamProvider.pause();
    return b(this.player, g.PAUSE), e;
  }
  async stop() {
    this.streamProvider.stop(), b(this.player, g.STOP);
  }
  async paused() {
    return this.streamProvider.paused();
  }
  async setCurrentTime(e) {
    const t = await this.streamProvider.setCurrentTime(e);
    return b(this.player, g.SEEK, { prevTime: t.prevTime, newTime: t.newTime }), t.result;
  }
  async currentTime() {
    return this.streamProvider.currentTime();
  }
  async volume() {
    return this.streamProvider.volume();
  }
  async setVolume(e) {
    const t = await this.streamProvider.setVolume(e);
    return b(this.player, g.VOLUME_CHANGED, { volume: e }), await this.player.preferences.set("volume", e, { global: !0 }), t;
  }
  async duration() {
    return await this.streamProvider.duration();
  }
  async playbackRate() {
    return await this.streamProvider.playbackRate();
  }
  async setPlaybackRate(e) {
    const t = await this.streamProvider.setPlaybackRate(e);
    return b(this.player, g.PLAYBACK_RATE_CHANGED, { newPlaybackRate: e }), await this.player.preferences.set("playbackRate", e, { global: !0 }), t;
  }
  get isTrimEnabled() {
    return this.streamProvider.isTrimEnabled;
  }
  get trimStart() {
    return this.streamProvider.trimStart;
  }
  get trimEnd() {
    return this.streamProvider.trimEnd;
  }
  async setTrimming({ enabled: e, start: t, end: n }) {
    const s = await this.streamProvider.setTrimming({
      enabled: e,
      start: t,
      end: n
    });
    return b(this.player, g.TRIMMING_CHANGED, {
      enabled: e,
      start: t,
      end: n
    }), s;
  }
  getVideoRect(e = null) {
    var n;
    let t = this.baseVideoRect;
    return typeof e == "string" && (t = (n = this.streamProvider.streams[e]) == null ? void 0 : n.canvas.element), {
      x: t == null ? void 0 : t.offsetLeft,
      y: t == null ? void 0 : t.offsetTop,
      width: t == null ? void 0 : t.offsetWidth,
      height: t == null ? void 0 : t.offsetHeight,
      element: t
    };
  }
  appendChild(e, t = null, n = 1) {
    if (t) {
      const { width: s, height: a } = this.getVideoRect();
      t.x = t.x * 100 / s, t.width = t.width * 100 / s, t.y = t.y * 100 / a, t.height = t.height * 100 / a, e.style.position = "absolute", e.style.left = `${t.x}%`, e.style.top = `${t.y}%`, e.style.width = `${t.width}%`, e.style.height = `${t.height}%`, n !== null && (e.style.zIndex = n);
    }
    return this.baseVideoRect.appendChild(e), e;
  }
  removeChild(e) {
    this.baseVideoRect.removeChild(e);
  }
}
const zs = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <rect id="Play" x="0" y="0" width="300" height="300" style="fill:none;"/>
    <g id="Play1" serif:id="Play">
        <g transform="matrix(1.21457,0,0,1.21457,-55.8704,-35.2227)">
            <circle cx="169.5" cy="152.5" r="123.5" style="fill:rgb(128,128,128);"/>
            <path d="M169.5,29C237.662,29 293,84.338 293,152.5C293,220.662 237.662,276 169.5,276C101.338,276 46,220.662 46,152.5C46,84.338 101.338,29 169.5,29ZM169.5,37.233C233.117,37.233 284.767,88.883 284.767,152.5C284.767,216.117 233.117,267.767 169.5,267.767C105.883,267.767 54.233,216.117 54.233,152.5C54.233,88.883 105.883,37.233 169.5,37.233Z" style="fill:rgb(235,235,235);"/>
        </g>
        <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,347,-59)">
            <path d="M209,82L317,253L101,253L209,82Z" style="fill:rgb(235,235,235);"/>
        </g>
    </g>
</svg>
`, Ks = `
    background-color: #e4e4e4;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%); 
`, Fe = `
    width: 100%;
`, Ws = `
    position: absolute; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
`, js = `
    pointer-events: none;
    width: 20%;
    max-width: 400px;
    min-width: 100px;
    opacity: 0.6;
`, Qs = `
    display: block;
    width: 20%;
    background: none;
    border: none;
    cursor: pointer;
`;
class qs extends $ {
  constructor(e, t, n, s) {
    const a = {
      class: "preview-container",
      style: Ks,
      role: "button",
      "aria-label": "Play video"
    };
    super(e, { attributes: a, parent: t }), this._img = v(`
        <div style="${Fe}">
            ${n ? `<img style="${Fe}" src="${n}" class="preview-image-landscape" alt=""/>` : ""}
            ${s ? `<img style="${Fe}" src="${s}" class="preview-image-portrait" alt=""/>` : ""}
            <div style="${Ws}">
                <button style="${Qs}" role="button" aria-label="Play video">
                    <i class="preview-play-icon" style="${js}">${zs}</i>
                </button>
            </div>
        </div>
        `, this.element), this.element.setAttribute("id", "playerContainerClickArea"), this.element.addEventListener("click", (l) => {
      e.play();
    });
    const r = n && s, o = () => {
      if (r) {
        const l = this.element.clientWidth / this.element.clientHeight, c = Array.from(this.element.getElementsByClassName("preview-image-landscape")), d = Array.from(this.element.getElementsByClassName("preview-image-portrait"));
        l >= 1 ? (c.forEach((u) => u.style.display = ""), d.forEach((u) => u.style.display = "none")) : (c.forEach((u) => u.style.display = "none"), d.forEach((u) => u.style.display = ""));
      }
    };
    window.addEventListener("resize", () => {
      o();
    }), o();
  }
  loadBackgroundImage(e) {
    this._img.setAttribute("src", e);
  }
}
function vt({ container: i, duration: e = 1e3, currentTime: t = 0, precision: n = 100 }) {
  i.classList.add("progress-indicator"), i.innerHTML = `
        <div class="range-container">
            <div class="elapsed"></div>
            <div class="remaining"></div>
            <ul class="markers-container"></ul>
            <input type="range" min="0" max="${e * n}" value="${t * n}" class="slider">
        </div>
    `;
  const s = i.querySelector(".elapsed"), a = i.querySelector(".remaining"), r = i.querySelector(".slider");
  let o = !1, l = null;
  const c = {
    elapsed: s,
    remaining: a,
    range: r,
    markersContainer: i.querySelector(".markers-container"),
    addMarker({ time: d, duration: u }) {
      const h = document.createElement("li");
      h.style.left = `${d / u * 100}%`, this.markersContainer.appendChild(h);
    },
    updateRemaining() {
      const d = this.range.value / this.range.max * 100;
      this.elapsed.style.width = `${d}%`, this.remaining.style.width = `${100 - d}%`;
    },
    setDuration(d) {
      o || (this.range.max = d * n, this.updateRemaining());
    },
    setCurrentTime(d) {
      o || (this.range.value = d * n, this.updateRemaining());
    },
    onChange(d) {
      l = d;
    }
  };
  return r.addEventListener("pointerdown", () => {
    o = !0;
  }), r.addEventListener("pointerup", () => {
    o = !1, typeof l == "function" && l(r.value / n);
  }), r.addEventListener("input", () => {
    c.updateRemaining();
  }), c.updateRemaining(), c;
}
const Zs = (i) => {
  const e = document.createElement("section");
  return e.classList.add("pop-up"), e.innerHTML = `
        <header class="pop-up-title">
            <button class="action-back">
                <svg width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M15 6l-6 6l6 6" />
                </svg>
            </button>
            <h2>title</h2>
        </header>
        <article class="pop-up-content">
        </article>
    `, i.appendChild(e), e.setTitle = (t) => {
    e.querySelector("header.pop-up-title h2").textContent = t;
  }, e.popButton = () => e.querySelector("header.pop-up-title button"), e.onPopClicked = (t) => {
    e._clickCallback && e.popButton().removeEventListener("click", e._clickCallback), e._clickCallback = t, e.popButton().addEventListener("click", t);
  }, e.hidePopButton = () => e.popButton().style.display = "none", e.showPopButton = () => e.popButton().style.display = "", e.setContent = (t) => {
    e.querySelector("article.pop-up-content").innerHTML = "", e.querySelector("article.pop-up-content").appendChild(t);
  }, e;
};
let Ys = 0;
function Js() {
  return ++Ys;
}
var J, T, k, ve;
class Xs {
  constructor(e) {
    H(this, J, null);
    H(this, T, null);
    H(this, k, []);
    H(this, ve, "");
    Z(this, J, e), Z(this, T, document.createElement("aside")), m(this, T).className = "pop-up-wrapper", e.element.prepend(m(this, T)), m(this, T).classList.add("hidden"), m(this, T).addEventListener("click", (t) => t.stopPropagation()), m(this, J).element.addEventListener("click", (t) => {
      t.stopPropagation(), this.hide();
    });
  }
  get title() {
    return m(this, ve);
  }
  set title(e) {
    Z(this, ve, e);
  }
  get currentContent() {
    return m(this, k).length && m(this, k)[m(this, k).length - 1];
  }
  get currentContentId() {
    var e;
    return ((e = this.currentContent) == null ? void 0 : e.dataContentId) ?? -1;
  }
  show({ content: e, title: t = "", parent: n = null, attachLeft: s = !1, attachRight: a = !1 }) {
    if (!e)
      throw new Error("PlaybackBarPopUp.show(): No content provided.");
    e.setAttribute("data-pop-up-content-id", Js()), e.dataContentId = e.getAttribute("data-pop-up-content-id");
    const r = m(this, k).length && m(this, k)[m(this, k).length - 1], o = n && n.getAttribute("data-pop-up-content-id");
    r && r.getAttribute("data-pop-up-content-id") !== o ? (m(this, T).innerHTML = "", Z(this, k, [])) : r && r.container.classList.add("out"), m(this, k).push(e), m(this, J).element.classList.add("pop-up-active"), m(this, T).classList.remove("hidden");
    const l = Zs(m(this, T));
    return l.setTitle(t), e.container = l, s === !0 ? m(this, T).classList.add("left") : m(this, T).classList.remove("left"), a === !0 ? m(this, T).classList.add("right") : m(this, T).classList.remove("right"), l.setContent(e), m(this, k).length > 1 ? l.onPopClicked(() => {
      m(this, k).pop(), m(this, k)[m(this, k).length - 1].container.classList.remove("out"), m(this, T).removeChild(l);
    }) : l.hidePopButton(), this.title = t, e.dataContentId;
  }
  hide() {
    m(this, J).element.classList.remove("pop-up-active"), m(this, T).classList.add("hidden");
  }
  get isHidden() {
    return m(this, T).classList.contains("hidden");
  }
}
J = new WeakMap(), T = new WeakMap(), k = new WeakMap(), ve = new WeakMap();
class ea extends $ {
  constructor(e, t) {
    var a;
    const n = ((a = e.config.progressIndicator) == null ? void 0 : a.inlineMode) ?? !1, s = { class: "playback-bar-container" };
    super(e, { attributes: s, parent: t }), this._popUp = new Xs(this), this.element.addEventListener("mouseenter", () => Dt(e)), this.element.addEventListener("mouseleave", () => xt(e)), this._playbackBarContainer = v('<section class="playback-bar"></section>', this.element), this._topContainer = v("<div></div>"), this._navContainer = v("<nav></nav>"), this._buttonPluginsLeft = v("<ul></ul>", this._navContainer), this._centerContainer = v("<div></div>", this._navContainer), this._buttonPluginsRight = v("<ul></ul>", this._navContainer), n ? this._progressIndicator = vt({ container: this._centerContainer }) : (this._playbackBarContainer.appendChild(this._topContainer), this._progressIndicator = vt({ container: this._topContainer })), this._progressIndicator.onChange(async (r) => {
      await e.videoContainer.setCurrentTime(r);
    }), this._playbackBarContainer.appendChild(this._navContainer), this._enabled = !0;
  }
  get popUp() {
    return this._popUp;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    this._enabled = e, this._enabled ? this.showUserInterface() : this.hide();
  }
  async load() {
    this._enabledPlugins = [], this.player.log.debug("Loading button plugins"), await M(this.player, "button", async (t) => {
      this.player.log.debug(` Button plugin: ${t.name}`), this._enabledPlugins.push(t), t.side === "left" ? await Te(t, this.buttonPluginsLeft) : t.side === "right" && await Te(t, this.buttonPluginsRight);
    }, async (t) => t.parentContainer === "playbackBar" ? await t.isEnabled() : !1);
    const e = await this.player.videoContainer.duration();
    this._progressIndicator.setDuration(e), this.player.frameList.frames.forEach((t) => {
      this._progressIndicator.addMarker({ time: t.time, duration: e });
    }), this.player.bindEvent([this.player.Events.TIMEUPDATE, this.player.Events.SEEK], (t) => {
      this._progressIndicator.setCurrentTime(t.newTime ?? t.currentTime);
    }), this.player.bindEvent(this.player.Events.TRIMMING_CHANGED, async (t) => {
      const n = t.end - t.start;
      this._progressIndicator.setDuration(n);
      const s = await this.player.videoContainer.currentTime();
      this._progressIndicator.setCurrentTime(s);
    }), this.onResize();
  }
  async unload() {
    this.removeFromParent(), await hi(this.player, "button"), this._buttonPluginsLeft.innerHTML = "", this._buttonPluginsRight.innerHTML = "";
  }
  hideUserInterface() {
    this.player.log.debug("Hide playback bar user interface"), this.hide();
  }
  showUserInterface() {
    var e;
    if (this._enabled) {
      const n = ((e = this.player.config.progressIndicator) == null ? void 0 : e.inlineMode) ?? !1 ? "flex" : "block";
      this.show(n), this.onResize();
    }
  }
  get buttonPluginsRight() {
    return this._buttonPluginsRight;
  }
  get buttonPluginsLeft() {
    return this._buttonPluginsLeft;
  }
  get timerContainer() {
    return this._timerContainer;
  }
  get progressIndicator() {
    return this._progressIndicator;
  }
  get containerSize() {
    const e = this.element.clientWidth, t = this.element.clientHeight;
    return { width: e, height: t };
  }
  onResize() {
    const { containerSize: e } = this;
    this._enabledPlugins.forEach((t) => t.onResize(e));
  }
}
const mi = [
  { maxWidth: 400, className: "size-s" },
  { maxWidth: 600, className: "size-m" },
  { maxWidth: 900, className: "size-l" },
  { maxWidth: 1100, className: "size-xl" },
  { className: "size-xxl" }
], ta = (i) => mi.find((e) => e.maxWidth && e.maxWidth >= i || e.maxWidth === void 0).className;
class ia extends $ {
  constructor(e, t) {
    const n = {
      class: "captions-canvas visible-ui"
    };
    super(e, { tag: "div", attributes: n, parent: t }), this._captionsContainer = v(`
            <div class="text-container">
            </div>
        `, this.element), this._captions = [], this.hide(), this._currentCaptions = null;
    const s = async (a) => {
      const o = (e.videoContainer.isTrimEnabled ? e.videoContainer.trimStart : 0) + (a.currentTime || a.newTime || 0);
      if (this._currentCaptions) {
        const l = this._currentCaptions.getCue(o);
        this._captionsContainer.innerHTML = "", l && l.captions.forEach((c) => {
          this._captionsContainer.innerHTML += c, this._captionsContainer.innerHTML += "<br/>";
        }), l ? this._captionsContainer.style.display = null : this._captionsContainer.style.display = "none", this.resize();
      }
    };
    A(this.player, g.TIMEUPDATE, s), A(this.player, g.SEEK, s), A(this.player, g.RESIZE, () => this.resize()), A(this.player, g.SHOW_UI, () => this.element.classList.add("visible-ui")), A(this.player, g.HIDE_UI, () => this.element.classList.remove("visible-ui"));
  }
  async load() {
    await Dn(this.player);
  }
  unload() {
  }
  resize() {
    const e = ta(this._captionsContainer.clientWidth);
    mi.forEach((t) => this.element.classList.remove(t.className)), this.element.classList.add(e);
  }
  addCaptions(e) {
    this._captions.push(e), b(this.player, g.CAPTIONS_CHANGED, { captions: this._captions });
  }
  get captions() {
    return this._captions;
  }
  get currentCaptions() {
    return this._currentCaptions;
  }
  getCaptions({ label: e, index: t, lang: n }) {
    if (e === void 0 && t === void 0 && n === void 0)
      throw Error("Could not find captions: you must specify the label, the index or the language");
    return t !== void 0 ? this._captions[t] : this._captions.find((s) => {
      if (e !== void 0)
        return s.label === e;
      if (n !== void 0)
        return s.language === n;
    });
  }
  enableCaptions(e) {
    const t = this.getCaptions(e);
    if (t !== this._currentCaptions && (this._currentCaptions = t, this.currentCaptions)) {
      const { language: n, label: s } = this.currentCaptions;
      b(this.player, g.CAPTIONS_ENABLED, { language: n, label: s });
    }
    this.show();
  }
  disableCaptions() {
    this.currentCaptions && b(this.player, g.CAPTIONS_DISABLED), this._currentCaptions = null, this.hide();
  }
}
async function na(i) {
  await M(i, "eventLog", async (e) => {
    e.events.forEach((t) => {
      A(i, t, async (n) => {
        await e.onEvent(t, n);
      });
    });
  });
}
async function sa(i) {
}
class Ca extends ee {
  get type() {
    return "eventLog";
  }
  get events() {
    return [];
  }
  async onEvent(e, t) {
    this.player.log.warn(`${this.name}: onEvent() function is not overwritten.`);
  }
}
const fi = (i) => !1, yi = (i) => i.description;
class aa {
  constructor(e, t) {
    this._player = e, this._cookieConsentData = e.config.cookieConsent || [], this._getConsentCallback = t.getConsent || fi, this._getDescriptionCallback = t.getDescription || yi, this._cookieConsentData.forEach((n) => {
      n.description = this._getDescriptionCallback(n);
    }), this.updateConsentData();
  }
  updateConsentData() {
    this._cookieConsentData.forEach((e) => {
      e.value = this._getConsentCallback(e.type) || e.required;
    }), b(this._player, g.COOKIE_CONSENT_CHANGED, { cookieConsent: this });
  }
  getConsentForType(e) {
    const t = this._cookieConsentData.find((n) => n.type === e);
    return (t == null ? void 0 : t.value) || !1;
  }
}
const S = Object.freeze({
  DISABLED: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  VERBOSE: 5
});
let _i = S.INFO;
const vi = (i, e = null) => {
  const t = typeof i == "string" ? S[i.toUpperCase()] : i;
  if (t < S.DISABLED || t > S.VERBOSE)
    throw Error(`setLogLevel: invalid log level ${t}`);
  e ? (e.__logSettings = e.__logSettings || {}, e.__logSettings.logLevel = t) : _i = t;
}, wi = (i = null) => i ? i.__logSettings.logLevel : _i, pe = ({
  msg: i,
  level: e = S.INFO,
  player: t = null,
  context: n = "paella-core"
}) => {
  t && !t.__logSettings && vi(t, S.INFO);
  const s = wi(t);
  if (e < S.DISABLED)
    throw Error(`printMessage: invalid log level ${e}`);
  if (t && b(t, g.LOG, { severity: e, context: n, message: i, currentLogLevel: s }), e <= s)
    switch (e) {
      case S.ERROR:
        console.error(`${n} - Error: ${i}`);
        break;
      case S.WARN:
        console.warn(`${n} - Warning: ${i}`);
        break;
      case S.INFO:
        console.info(`${n} - Info: ${i}`);
        break;
      case S.DEBUG:
        console.debug(`${n} - Debug: ${i}`);
        break;
      case S.VERBOSE:
        console.log(`${n} - Verbose: ${i}`);
        break;
    }
}, Y = {
  setLevel: (i, e = null) => {
    vi(i, e);
  },
  currentLevel: (i = null) => wi(i),
  error: (i, e = null, t = "paella-core") => {
    pe({
      msg: i,
      level: S.ERROR,
      player: e,
      context: t
    });
  },
  warn: (i, e = null, t = "paella-core") => {
    pe({
      msg: i,
      level: S.WARN,
      player: e,
      context: t
    });
  },
  info: (i, e = null, t = "paella-core") => {
    pe({
      msg: i,
      level: S.INFO,
      player: e,
      context: t
    });
  },
  debug: (i, e = null, t = "paella-core") => {
    pe({
      msg: i,
      level: S.DEBUG,
      player: e,
      context: t
    });
  },
  verbose: (i, e = null, t = "paella-core") => {
    pe({
      msg: i,
      level: S.VERBOSE,
      player: e,
      context: t
    });
  }
};
class ra {
  constructor(e, t = "paella-core") {
    this._player = e, this._context = t;
  }
  get context() {
    return this._context;
  }
  get player() {
    return this._player;
  }
  setLevel(e) {
    Y.setLevel(e, this._player);
  }
  currentLevel() {
    return Y.currentLevel(this._player);
  }
  error(e, t = null) {
    Y.error(e, this._player, t || this._context);
  }
  warn(e, t = null) {
    Y.warn(e, this._player, t || this._context);
  }
  info(e, t = null) {
    Y.info(e, this._player, t || this._context);
  }
  debug(e, t = null) {
    Y.debug(e, this._player, t || this._context);
  }
  verbose(e, t = null) {
    Y.verbose(e, this._player, t || this._context);
  }
}
const wt = {}, Oe = '{ "global": {}, "videos": {} }';
async function Ct() {
  switch (this.source.name) {
    case "cookie":
      try {
        return JSON.parse(K("preferences"));
      } catch {
        return JSON.parse(Oe);
      }
    case "dataPlugin":
      try {
        return await this.player.data.read(this.source.context, {}) || JSON.parse(Oe);
      } catch {
        return JSON.parse(Oe);
      }
  }
}
async function oa(i) {
  switch (this.source.name) {
    case "cookie":
      Rt(this.player, this.source.consentType, "preferences", JSON.stringify(i));
      break;
    case "dataPlugin":
      await this.player.data.write(this.source.context, {}, i);
      break;
  }
}
class la extends le {
  constructor(e) {
    super(e);
    const { currentSource: t, sources: n } = e.config.preferences || {
      currentSource: "cookie",
      sources: {
        cookie: {
          consentType: "necessary"
        }
      }
    };
    if (this.source = n[t], this.source.name = t, this._loaded = !1, !this.source)
      throw Error("Invalid configuration in preferences. Check the configuration file.");
  }
  async set(e, t, { global: n = !1 } = {}) {
    const s = await Ct.apply(this);
    n ? s.global[e] = t : (s.videos[this.player.videoId] = s.videos[this.player.videoId] || {}, s.videos[this.player.videoId][e] = t), await oa.apply(this, [s]);
  }
  async get(e, { global: t = !1 } = {}) {
    const n = await Ct.apply(this);
    return t ? n.global[e] : n.videos[this.player.videoId] && n.videos[this.player.videoId][e] || void 0;
  }
}
function ca(i) {
  var e;
  (e = this._skinData) != null && e.configOverrides && fe(i, this._skinData.configOverrides);
}
async function ua() {
  var i;
  if ((i = this._skinData) != null && i.styleSheets) {
    const e = [];
    this._skinData.styleSheets.forEach((t) => {
      if (!/\{.*/.test(t))
        if (this._externalResourcesAllowed) {
          const n = O([this._skinUrl, t]);
          e.push(new Promise(async (s) => {
            await We(n, !1), s();
          }));
        } else
          throw new Error("No external resources allowed loading skin object");
    }), await Promise.allSettled(e);
  }
}
async function da() {
  var i;
  if (this.player.__skinStyleSheets__ = this.player.__skinStyleSheets__ || [], (i = this._skinData) != null && i.styleSheets) {
    const e = [];
    this._skinData.styleSheets.forEach((t) => {
      if (/\{.*/.test(t))
        e.push(new Promise((n) => {
          const s = document.createElement("style");
          s.innerHTML = t, this.player.__skinStyleSheets__.push(s), document.head.appendChild(s), n();
        }));
      else {
        const n = O([this._skinUrl, t]);
        e.push(new Promise(async (s) => {
          const a = await We(n);
          this.player.__skinStyleSheets__.push(a), s();
        }));
      }
    }), await Promise.allSettled(e);
  }
}
function bt() {
  this.player.__skinStyleSheets__ = this.player.__skinStyleSheets__ || [], this.player.__skinStyleSheets__.forEach((i) => {
    Vt(i);
  }), this.player.__skinStyleSheets__ = [];
}
async function ha() {
  var i;
  Array.isArray((i = this._skinData) == null ? void 0 : i.icons) && await Promise.all(this._skinData.icons.map(({ plugin: e, identifier: t, icon: n }) => new Promise(async (s, a) => {
    const r = document.createElement("div");
    if (r.innerHTML = n, r.children[0] && r.children[0].tagName === "svg")
      s();
    else if (this._externalResourcesAllowed) {
      const o = O([this._skinUrl, n]);
      (await fetch(o)).ok ? s() : a(new Error(`Skin icon not found at URL '${o}'`));
    } else
      throw new Error("No external resources allowed loading skin object");
  })));
}
async function pa() {
  var i;
  Array.isArray((i = this._skinData) == null ? void 0 : i.icons) && await Promise.all(this._skinData.icons.map(({ plugin: e, identifier: t, icon: n }) => new Promise(async (s, a) => {
    const r = document.createElement("div");
    if (r.innerHTML = n, r.children[0] && r.children[0].tagName === "svg")
      this.player.addCustomPluginIcon(e, t, n), s();
    else {
      const o = O([this._skinUrl, n]), l = await fetch(o);
      if (l.ok) {
        const c = await l.text();
        this.player.addCustomPluginIcon(e, t, c), s();
      } else
        a(new Error(`Skin icon not found at URL '${o}'`));
    }
  })));
}
class ga {
  constructor(e) {
    this._player = e;
  }
  get player() {
    return this._player;
  }
  async loadSkin(e) {
    if (typeof e == "string") {
      this._skinUrl = ze(e), this._externalResourcesAllowed = !0;
      const t = await fetch(e);
      if (!t.ok)
        throw new Error(`Error loading skin from URL ${e}`);
      this._skinData = await t.json();
    } else
      typeof e == "object" && (this._skinUrl = "", this._externalResourcesAllowed = !1, this._skinData = e);
    try {
      await ua.apply(this), await ha.apply(this), (this._player.state === f.LOADED || this._player.state === f.MANIFEST) && await this._player.reload();
    } catch (t) {
      throw this._skinUrl = "", this._externalResourcesAllowed = !0, this._skinData = {}, t;
    }
  }
  unloadSkin() {
    var e, t;
    Array.isArray((e = this._skinData) == null ? void 0 : e.icons) && ((t = this._skinData) == null || t.icons.forEach(({ plugin: n, identifier: s }) => {
      this.player.removeCustomPluginIcon(n, s);
    })), this._skinUrl = null, this._skinData = {}, (this._player.state === f.LOADED || this._player.state === f.MANIFEST) && this._player.reload();
  }
}
class ma {
  constructor(e, t) {
    this._player = t, this._videoManifest = JSON.parse(JSON.stringify(e)), this._metadata = this._videoManifest.metadata || {}, this._streams = {}, this._frameList = {}, this._trimming = this._videoManifest.trimming, this._captions = this._videoManifest.captions, this._visibleTimeLine = this._videoManifest.visibleTimeLine;
    function n() {
      if (this.streams.length !== 1)
        return null;
      if (this.isAudioOnly)
        return this.audioOnlySource.src;
      const s = this.streams[0];
      if (!(s.sources.mp4 || s.sources.hls || s.sources.hlsLive))
        return null;
      const r = document.createElement("video");
      if (s.sources.mp4 && s.sources.mp4.length && r.canPlayType(s.sources.mp4[0].mimetype || "video/mp4") === "probably")
        return s.sources.mp4[0].src;
      const o = s.sources.hls || s.sources.hlsLive;
      return o && o.length && r.canPlayType(o[0].mimetype || "application/vnd.apple.mpegurl") !== "" && /safari/i.test(navigator.userAgent) ? o[0].src : null;
    }
    this._streams = {
      streams: this._videoManifest.streams,
      get contents() {
        return this.streams.map((s) => s.content);
      },
      getStream(s) {
        return this.streams.find((a) => a.content === s);
      },
      getSourceTypes(s) {
        const a = this.getStream(s);
        return a && Object.keys(a.sources) || null;
      },
      getCanvasTypes(s) {
        const a = this.getStream(s);
        return a ? a.canvas || ["video"] : null;
      },
      get isAudioOnly() {
        const s = this.contents.length === 1 && this.contents[0], a = s && this.getCanvasTypes(s) || [], r = this.getStream(s);
        return a.length === 1 && a[0] === "audio" && r.sources.audio && r.sources.audio.length > 0;
      },
      get audioOnlySource() {
        return this.isAudioOnly ? this.getStream(this.contents[0]).sources.audio[0] : null;
      },
      get isNativelyPlayable() {
        return n.apply(this) !== null;
      },
      get nativeSource() {
        return n.apply(this);
      },
      get nativeType() {
        return this.isNativelyPlayable ? this.isAudioOnly ? "audio" : "video" : null;
      },
      get nativePlayer() {
        const s = this.nativeType;
        if (s) {
          const a = document.createElement(s);
          return a.src = this.nativeSource, a;
        } else
          return null;
      }
    }, this._videoManifest.frameList && !Array.isArray(this._videoManifest.frameList) && typeof this._videoManifest.frameList == "object" && typeof this._videoManifest.frameList.targetContent == "string" && Array.isArray(this._videoManifest.frameList.frames) ? this._frameList = this._videoManifest.frameList : Array.isArray(this._videoManifest.frameList) && (this._frameList = {
      targetContent: null,
      frames: this._videoManifest.frameList
    }), this._frameList.getImage = (s, a = !1) => {
      var r, o;
      return (r = this._player) != null && r.videoContainer && this._player._videoContainer.isTrimEnabled && !a ? s += this._player.videoContainer.trimStart : !((o = this._player) != null && o._videoContainer) && !a && console.warn("frameList.getImage(): player instance is null. The trimming information will be ignored."), [...this._frameList.frames].sort((l, c) => c.time - l.time).find((l) => l.time < s);
    }, Object.defineProperty(this._frameList, "isEmpty", {
      get() {
        return Array.isArray(e.frameList) && e.frameList.length === 0 || !e.frameList;
      }
    }), Object.freeze(this._metadata), Object.freeze(this._streams), Object.freeze(this._trimming), Object.freeze(this._captions);
  }
  get metadata() {
    return this._metadata;
  }
  get streams() {
    return this._streams;
  }
  get frameList() {
    return this._frameList;
  }
  get captions() {
    return this._captions;
  }
  get trimming() {
    return this._trimming;
  }
  get visibleTimeLine() {
    return this._visibleTimeLine;
  }
}
const R = Object.freeze([
  "UNLOADED",
  "LOADING_MANIFEST",
  "MANIFEST",
  "LOADING_PLAYER",
  "LOADED",
  "UNLOADING_MANIFEST",
  "UNLOADING_PLAYER",
  "ERROR"
]);
function Ci() {
  var t, n, s, a, r, o, l, c;
  const i = ((n = (t = this.videoManifest) == null ? void 0 : t.metadata) == null ? void 0 : n.preview) && W(this, (a = (s = this.videoManifest) == null ? void 0 : s.metadata) == null ? void 0 : a.preview) || this.defaultVideoPreview, e = ((o = (r = this.videoManifest) == null ? void 0 : r.metadata) == null ? void 0 : o.previewPortrait) && W(this, (c = (l = this.videoManifest) == null ? void 0 : l.metadata) == null ? void 0 : c.previewPortrait) || this.defaultVideoPreviewPortrait;
  this._previewContainer = new qs(this, this._containerElement, i, e);
}
async function Lt() {
  this._playerState = f.LOADING_MANIFEST, this._manifestLoaded = !0, this.log.debug("Loading paella player"), this._config = await this.initParams.loadConfig(this.configUrl, this), ca.apply(this.skin, [this._config]), Bn(this), this._defaultVideoPreview = this._config.defaultVideoPreview || this._initParams.defaultVideoPreview || "", this._defaultVideoPreviewPortrait = this._config.defaultVideoPreviewPortrait || this._initParams.defaultVideoPreviewPortrait || "", this._cookieConsent = new aa(this, {
    getConsent: this._initParams.getCookieConsentFunction,
    getDescription: this._initParams.getCookieDescriptionFunction
  }), this._preferences = new la(this);
  const i = new URLSearchParams(window.location.search), e = new URLSearchParams();
  for (const [s, a] of i)
    e.append(s.toLowerCase(), a);
  const t = e.get("loglevel"), n = t && Array.from(Object.keys(S)).indexOf(t.toUpperCase()) !== -1 ? t : this._config.logLevel || "INFO";
  this._log.setLevel(n), await this._initParams.loadDictionaries(this), Vs(this), await na(this), await Cn(this), this._videoContainer = new Gs(this, this._containerElement), await this.videoContainer.create();
  for (const s of this.pluginModules) {
    const a = s.getDictionaries && await s.getDictionaries();
    if (a)
      for (const r in a)
        ge(r, a[r]);
  }
}
async function Et() {
  var i, e;
  this.log.debug("Video manifest loaded:"), this.log.debug(this.videoManifest), this._data = new bs(this);
  for (const t in wt) {
    const n = wt[t];
    ge(t, n);
  }
  if (this._playerState = f.MANIFEST, b(this, g.MANIFEST_LOADED), (e = (i = this.videoManifest) == null ? void 0 : i.metadata) != null && e.preview)
    Ci.apply(this);
  else
    throw new Error("No preview image found in video manifest, and no default preview image defined.");
  Us(this._videoManifest), __paella_instances__.length === 1 && (this._loadKeypressHandler = this._loadKeypressHandler || (async (t) => {
    /space/i.test(t.code) && await this.play();
  }), window.addEventListener("keypress", this._loadKeypressHandler, !0));
}
class ba {
  constructor(e, t = {}) {
    this._log = new ra(this), this._packageData = we, this._log.setLevel(S.VERBOSE), window.__paella_instances__ = window.__paella_instances__ || [], window.__paella_instances__.push(this), this.log.debug("New paella player instance"), typeof e == "string" && (e = document.getElementById(e)), e.classList.add("player-container"), this.log.debug("Loading skin manager"), this._skin = new ga(this), this._containerElement = e, this._initParams = t, this._initParams.manifestFileName = this._initParams.manifestFileName || "data.json", this._initParams.loadConfig = this._initParams.loadConfig || Pi, this._initParams.getVideoId = this._initParams.getVideoId || Si, this._initParams.getManifestUrl = this._initParams.getManifestUrl || Ti, this._initParams.getManifestFileUrl = this._initParams.getManifestFileUrl || Ii, this._initParams.loadVideoManifest = this._initParams.loadVideoManifest || ki, this._initParams.customPluginContext = this._initParams.customPluginContext || [], this._initParams.translateFunction = this._initParams.translateFunction || zt, this._initParams.getLanguageFunction = this._initParams.getLanguageFunction || Wt, this._initParams.setLanguageFunction = this._initParams.setLanguageFunction || Kt, this._initParams.addDictionaryFunction = this._initParams.addDictionaryFunction || jt, this._initParams.getDictionariesFunction = this._initParams.getDictionariesFunction || Qt, this._initParams.getDefaultLanguageFunction = this._initParams.getDefaultLanguageFunction || qt, this._initParams.Loader = this._initParams.customLoader || xi, this._initParams.getCookieConsentFunction = this._initParams.getCookieConsentFunction || fi, this._initParams.getCookieDescriptionFunction = this._initParams.getCookieDescriptionFunction || yi, this._initParams.loadDictionaries = this._initParams.loadDictionaries || async function(a) {
      ge("en", {
        Hello: "Hello",
        World: "World"
      }), ge("es", {
        Hello: "Hola",
        World: "Mundo"
      }), ut(navigator.language.substring(0, 2));
    };
    const n = this._initParams.plugins || [];
    this._initParams.plugins = [
      ...n
    ], Vn(this._initParams.translateFunction), Nn(this._initParams.setLanguageFunction), Un(this._initParams.getLanguageFunction), Fn(this._initParams.addDictionaryFunction), On(this._initParams.getDictionariesFunction), $n(this._initParams.getDefaultLanguageFunction), this._config = null, this._defaultVideoPreview = "", this._defaultVideoPreviewPortrait = "", this._videoId = null, this._manifestUrl = null, this._manifestFileUrl = null, this._manifestData = null, this._videoManifest = null, this._playerLoaded = !1;
    const s = () => {
      this.resize();
    };
    window.addEventListener("resize", s), this.containerElement.addEventListener("fullscreenchange", () => {
      b(this, g.FULLSCREEN_CHANGED, { status: this.isFullscreen }), this.isFullscreen ? b(this, g.ENTER_FULLSCREEN) : b(this, g.EXIT_FULLSCREEN);
    }), this._playerState = f.UNLOADED, this._customPluginIcons = {};
  }
  get version() {
    return this._packageData.version;
  }
  get pluginModules() {
    return this.__pluginModules || [];
  }
  get log() {
    return this._log;
  }
  get ready() {
    return this._playerState === f.LOADED;
  }
  get state() {
    return this._playerState;
  }
  get stateText() {
    return R[this.state];
  }
  get Events() {
    return g;
  }
  get preferences() {
    return this._preferences;
  }
  get skin() {
    return this._skin;
  }
  translate(e, t = null) {
    return ye(e, t);
  }
  setLanguage(e) {
    ut(e);
  }
  getLanguage() {
    return Mn();
  }
  addDictionary(e, t) {
    ge(e, t);
  }
  getDictionaries() {
    return Rn();
  }
  getDefaultLanguage() {
    return ii(this);
  }
  bindEvent(e, t, n = !0) {
    A(this, e, (s) => t(s), n);
  }
  getShortcuts() {
    return wn(this);
  }
  getPlugin(e, t = null) {
    if (t) {
      const n = this.__pluginData__.pluginInstances[t];
      if (n)
        return n.find((s) => {
          if (s.name === e)
            return s;
        });
    } else {
      const n = {};
      for (const s in this.__pluginData__.pluginInstances) {
        const r = this.__pluginData__.pluginInstances[s].find((o) => {
          if (o.name === e)
            return o;
        });
        r && (n[s] = r);
      }
      return n;
    }
  }
  get hideUiTime() {
    return this._hideUiTime;
  }
  set hideUiTime(e) {
    this._hideUiTime = e;
  }
  get containerSize() {
    return { w: this._containerElement.offsetWidth, h: this._containerElement.offsetHeight };
  }
  get containerElement() {
    return this._containerElement;
  }
  get initParams() {
    return this._initParams;
  }
  get cookieConsent() {
    return this._cookieConsent;
  }
  // Status flags getters
  // The configuration is loaded
  get configLoaded() {
    return this.configUrl !== null;
  }
  // The video manifest file is loaded
  get videoManifestLoaded() {
    return this.videoManifest !== null;
  }
  // The video streams are loaded
  get videoLoaded() {
    var e;
    return ((e = this.videoContainer) == null ? void 0 : e.ready) || !1;
  }
  // The player user interface is loaded
  get playerLoaded() {
    return this._playerLoaded;
  }
  get configResourcesUrl() {
    var e;
    return ((e = this._initParams) == null ? void 0 : e.configResourcesUrl) || "config/";
  }
  get configUrl() {
    var e;
    return ((e = this._initParams) == null ? void 0 : e.configUrl) || "config/config.json";
  }
  get config() {
    return this._config;
  }
  get defaultVideoPreview() {
    return this._defaultVideoPreview;
  }
  get defaultVideoPreviewPortrait() {
    return this._defaultVideoPreviewPortrait;
  }
  get videoId() {
    return this._videoId;
  }
  // Base URL where the video repository is located, for example "repository/"
  get repositoryUrl() {
    var e, t;
    return ((e = this._initParams) == null ? void 0 : e.repositoryUrl) || ((t = this.config) == null ? void 0 : t.repositoryUrl) || "";
  }
  // Base URL where the video manifest file is located, for example "repository/[video_id]"
  get manifestUrl() {
    return this._manifestUrl;
  }
  // Video manifest file name, for example "data.json"
  get manifestFileName() {
    var e, t;
    return ((e = this.config) == null ? void 0 : e.manifestFileName) || ((t = this._initParams) == null ? void 0 : t.manifestFileName) || "";
  }
  // Full path of the video manifest, for example "repository/[video_id]/data.json"
  get manifestFileUrl() {
    return this._manifestFileUrl;
  }
  // Video manifest file content (data.json)
  get videoManifest() {
    return this._videoManifest;
  }
  get previewContainer() {
    return this._previewContainer;
  }
  get videoContainer() {
    return this._videoContainer;
  }
  get playbackBar() {
    return this._playbackBar;
  }
  get captionsCanvas() {
    return this._captionsCanvas;
  }
  get data() {
    return this._data;
  }
  get PlayerState() {
    return f;
  }
  get PlayerStateNames() {
    return R;
  }
  // Manifest query functions
  get metadata() {
    var e;
    return ((e = this._manifestParser) == null ? void 0 : e.metadata) || {};
  }
  get streams() {
    var e;
    return ((e = this._manifestParser) == null ? void 0 : e.streams) || [];
  }
  get frameList() {
    var e;
    return ((e = this._manifestParser) == null ? void 0 : e.frameList) || {};
  }
  get captions() {
    var e;
    return ((e = this._manifestParser) == null ? void 0 : e.captions) || [];
  }
  get trimming() {
    var e;
    return ((e = this._manifestParser) == null ? void 0 : e.trimming) || {};
  }
  get visibleTimeLine() {
    var e;
    return ((e = this._manifestParser) == null ? void 0 : e.visibleTimeLine) || !0;
  }
  waitState(e) {
    return new Promise((t, n) => {
      const s = () => {
        this.state === e ? t() : setTimeout(s, 50);
      };
      typeof e == "string" && (e = f[e]), (e < 0 || e > Object.values(f).length) && n(Error(`Invalid player state '${e}'`)), s();
    });
  }
  async loadUrl(e, { title: t, duration: n, preview: s, previewPortrait: a } = {}) {
    if (this._playerState !== f.UNLOADED)
      throw new Error(this.translate("loadUrl(): Invalid current player state: $1", [R[this._playerState]]));
    if (this._manifestLoaded)
      throw new Error(this.translate("loadUrl(): Invalid current player state: $1", [R[this._playerState]]));
    if (!e)
      throw new Error(this.translate("loadUrl(): No URL specified."));
    Array.isArray(e) || (e = [e]), t || (t = Pe(e[0]), this.log.warn("Paella.loadUrl(): no title specified. Using URL file name as video name."));
    try {
      if (await Lt.apply(this), !s && (this.defaultVideoPreview !== "" || this.defaultVideoPreviewPortrait !== ""))
        s = this.defaultVideoPreview, a = this.defaultVideoPreviewPortrait, this.log.warn("Paella.loadUrl(): no preview image specified. Using default preview image.");
      else if (!s && !a)
        throw new Error("Paella.loadUrl(): no preview image specified and no default preview image configured.");
      this._videoId = kt(Pe(e[0])), this._manifestUrl = ze(e[0]), this._manifestFileUrl = e[0], this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`);
      const r = Xn(this, e.length)[0];
      this._videoManifest = {
        metadata: {
          duration: n,
          title: t,
          preview: s,
          previewPortrait: a
        },
        streams: e.map((o, l) => ({
          sources: Os(this, o),
          content: r[l],
          role: l === 0 ? "mainAudio" : null
        }))
      }, await Et.apply(this);
    } catch (r) {
      throw this._playerState = f.ERROR, this.log.error(r), this._errorContainer = new Ae(this, this.translate(r.message)), r;
    }
  }
  async loadManifest() {
    if (this._playerState !== f.UNLOADED)
      throw new Error(this.translate("loadManifest(): Invalid current player state: $1", [R[this._playerState]]));
    if (!this._manifestLoaded)
      try {
        if (await Lt.apply(this), this._videoId = await this.initParams.getVideoId(this._config, this), this.videoId === null)
          throw new Error("No video identifier specified");
        this._manifestUrl = await this.initParams.getManifestUrl(this.repositoryUrl, this.videoId, this._config, this), this._manifestFileUrl = await this.initParams.getManifestFileUrl(this._manifestUrl, this.manifestFileName, this._config, this), this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`), this._videoManifest = await this.initParams.loadVideoManifest(this.manifestFileUrl, this._config, this), this._videoManifest.metadata = this._videoManifest.metadata || {}, !this._videoManifest.metadata.preview && (this.defaultVideoPreview !== "" || this.defaultVideoPreviewPortrait !== "") && (this._videoManifest.metadata.preview = this.defaultVideoPreview, this._videoManifest.metadata.previewPortrait = this.defaultVideoPreviewPortrait, this.log.warn("Paella.loadUrl(): no preview image specified. Using default preview image.")), this._manifestParser = new ma(this.videoManifest, this), bt.apply(this.skin), await pa.apply(this.skin), await da.apply(this.skin), await Et.apply(this);
      } catch (e) {
        throw this._playerState = f.ERROR, this.log.error(e), this._errorContainer = new Ae(this, this.translate(e.message)), e;
      }
  }
  async loadPlayer() {
    var e, t, n;
    try {
      if (this._captionsCanvas = new ia(this, this._containerElement), this._playerState !== f.MANIFEST)
        throw new Error(this.translate("loadPlayer(): Invalid current player state: $1", [R[this._playerState]]));
      this._playerState = f.LOADING_PLAYER, (e = this._previewContainer) == null || e.removeFromParent(), this._loader = new this.initParams.Loader(this), await this._loader.create(), await this.videoContainer.load((t = this.videoManifest) == null ? void 0 : t.streams), b(this, g.STREAM_LOADED), this._playbackBar = new ea(this, this.containerElement), await this._playbackBar.load(), this._hideUiTime = ((n = this.config.ui) == null ? void 0 : n.hideUITimer) ?? 5e3, At(this), this._captionsCanvas.load(), this._playerState = f.LOADED, b(this, g.PLAYER_LOADED), !(this.videoManifest.metadata.visibleTimeLine ?? !0) && this.playbackBar.progressIndicator.hideTimeLine(), this._loader.debug || (this._loader.removeFromParent(), this._loader = null);
    } catch (s) {
      throw this._playerState = f.ERROR, this._loader && (this._loader.removeFromParent(), this._loader = null), this._errorContainer = new Ae(this, s.message), s;
    }
  }
  async load() {
    switch (this.state) {
      case f.UNLOADED:
        await this.loadManifest(), await this.loadPlayer();
        break;
      case f.MANIFEST:
        await this.loadPlayer();
        break;
      case f.LOADED:
        break;
      default:
        throw new Error(this.translate("Could not load player: state transition in progress: $1", [R[this.state]]));
    }
  }
  async unload() {
    switch (this.state) {
      case f.UNLOADED:
        break;
      case f.MANIFEST:
        await this.unloadManifest();
        break;
      case f.LOADED:
      case f.ERROR:
        await this.unloadPlayer(), await this.unloadManifest();
        break;
      default:
        throw new Error(this.translate("Could not unload player: state transition in progress: $1", [R[this.state]]));
    }
  }
  async unloadManifest() {
    var e;
    if (this._playerState !== f.MANIFEST && this._playerState !== f.ERROR)
      throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [R[this._playerState]]));
    this._errorContainer && (this._errorContainer.removeFromParent(), this._errorContainer = null), this._playerState = f.UNLOADING_MANIFEST, this.log.debug("Unloading paella player"), await sa(), await bn(this), await Ns(this), this._manifestLoaded = !1, (e = this._previewContainer) == null || e.removeFromParent(), this._preferences = null, this._playerState = f.UNLOADED, bt.apply(this.skin);
  }
  async unloadPlayer() {
    var e, t, n, s, a;
    if (this._playerState !== f.LOADED && this._playerState !== f.ERROR)
      throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [R[this._playerState]]));
    this._errorContainer && (this._errorContainer.removeFromParent(), this._errorContainer = null), this._playerState = f.UNLOADING_PLAYER, await ((e = this._videoContainer) == null ? void 0 : e.unload()), this._videoContainer = null, await ((t = this._playbackBar) == null ? void 0 : t.unload()), this._playbackBar = null, (n = this._captionsCanvas) == null || n.unload(), this._captionsCanvas = null, Mt(this), b(this, g.PLAYER_UNLOADED), (a = (s = this.videoManifest) == null ? void 0 : s.metadata) != null && a.preview && Ci.apply(this), bi(this), this._playerState = f.MANIFEST;
  }
  async reload(e = null) {
    switch (this.state) {
      case f.UNLOADED:
        break;
      case f.MANIFEST:
        await this.unloadManifest();
        break;
      case f.LOADED:
        await this.unload();
        break;
    }
    typeof e == "function" && await e(), await this.load();
  }
  async resize() {
    var e, t;
    if ((e = this.videoContainer) == null || e.updateLayout(), (t = this.playbackBar) == null || t.onResize(), this.videoContainer) {
      const n = () => ({
        w: this.videoContainer.element.offsetWidth,
        h: this.videoContainer.element.offsetHeight
      });
      b(this, g.RESIZE, { size: n() }), this._resizeEndTimer && clearTimeout(this._resizeEndTimer), this._resizeEndTimer = setTimeout(() => {
        b(this, g.RESIZE_END, { size: n() });
      }, 1e3);
    }
  }
  async hideUserInterface() {
    var e, t, n;
    await ((e = this.videoContainer) == null ? void 0 : e.paused()) || (this._uiHidden = !0, (t = this.videoContainer) == null || t.hideUserInterface(), (n = this.playbackBar) == null || n.hideUserInterface(), b(this, g.HIDE_UI));
  }
  async showUserInterface() {
    var e, t;
    (e = this.videoContainer) == null || e.showUserInterface(), (t = this.playbackBar) == null || t.showUserInterface(), this._uiHidden && b(this, g.SHOW_UI), this._uiHidden = !1;
  }
  // Playback functions
  async play() {
    this._loadKeypressHandler && (window.removeEventListener("keypress", this._loadKeypressHandler, !0), this._loadKeypressHandler = null), this.videoContainer.ready || await this.loadPlayer(), await this.videoContainer.play();
  }
  async pause() {
    var e;
    await ((e = this.videoContainer) == null ? void 0 : e.pause());
  }
  async paused() {
    return this.videoContainer ? this.videoContainer.paused() : !0;
  }
  async stop() {
    var e;
    await ((e = this.videoContainer) == null ? void 0 : e.stop());
  }
  isFullScreenSupported() {
    return this.containerElement.requestFullscreen || this.containerElement.webkitRequestFullScreen;
  }
  async enterFullscreen() {
    let e = null;
    return this.containerElement.requestFullscreen ? e = this.containerElement.requestFullscreen() : this.containerElement.webkitRequestFullScreen && (this.log.debug("Safari enter fullscreen"), e = this.containerElement.webkitRequestFullScreen()), setTimeout(() => this.resize(), 500), e;
  }
  async exitFullscreen() {
    if (document.exitFullscreen && this.isFullscreen)
      return document.exitFullscreen();
    if (document.webkitCancelFullScreen && this.isFullscreen)
      return this.log.debug("Safari exit fullscreen"), document.webkitCancelFullScreen();
  }
  get isFullscreen() {
    return document.fullscreenElement === this.containerElement || document.webkitFullscreenElement === this.containerElement;
  }
  addCustomPluginIcon(e, t, n) {
    this._customPluginIcons[`${e}-${t}`] = n;
  }
  removeCustomPluginIcon(e, t) {
    this._customPluginIcons[`${e}-${t}`] = null;
  }
  getCustomPluginIcon(e, t) {
    return this._requestedCustomIcons = this._requestedCustomIcons || [], this._requestedCustomIcons.find((n) => n.pluginName === e && n.iconName === t) || this._requestedCustomIcons.push({
      pluginName: e,
      iconName: t
    }), this._customPluginIcons[`${e}-${t}`];
  }
  get requestedCustomIcons() {
    return this._requestedCustomIcons || [];
  }
}
export {
  sn as AudioOnlyVideo,
  rt as AudioTrackData,
  an as AudioVideoPlugin,
  Ms as ButtonGroupPlugin,
  Xe as ButtonPlugin,
  oi as Canvas,
  va as CanvasButtonPlugin,
  L as CanvasButtonPosition,
  li as CanvasPlugin,
  Ht as Captions,
  Bt as CaptionsPlugin,
  Jn as CurrentTimeLabelPlugin,
  xn as DFXPParser,
  bs as Data,
  ui as DataPlugin,
  kn as DefaultKeyShortcutsPlugin,
  An as DfxpManifestCaptionsPlugin,
  $ as DomClass,
  gt as DualVideoDynamicLayoutPlugin,
  us as DualVideoLayoutPlugin,
  Ca as EventLogPlugin,
  g as Events,
  D as HlsSupport,
  Ot as HlsVideo,
  ln as HlsVideoFormatPlugin,
  gn as ImageVideo,
  mn as ImageVideoFormatPlugin,
  x as KeyCodes,
  Ln as KeyShortcutPlugin,
  S as LOG_LEVEL,
  xi as Loader,
  ra as Log,
  ma as ManifestParser,
  As as MenuButtonPlugin,
  fn as Mp4Video,
  yn as Mp4VideoFormatPlugin,
  ba as Paella,
  Wn as PlayPauseButtonPlugin,
  le as PlayerResource,
  f as PlayerState,
  R as PlayerStateNames,
  ee as Plugin,
  ke as PluginModule,
  Ss as PopUpButtonPlugin,
  ps as SingleVideoLayoutPlugin,
  ys as TripleVideoLayoutPlugin,
  Ye as UserInterfacePlugin,
  Qe as Video,
  ws as VideoCanvas,
  Cs as VideoCanvasPlugin,
  I as VideoContainerMessagePosition,
  ue as VideoLayout,
  ce as VideoPlugin,
  ae as VideoQualityItem,
  Yn as VttManifestCaptionsPlugin,
  Zn as WebVTTParser,
  ge as addDictionary,
  A as bindEvent,
  Us as checkManifestIntegrity,
  Ut as createElement,
  v as createElementWithHtmlText,
  jt as defaultAddDictionaryFunction,
  fi as defaultGetCookieConsentCallback,
  yi as defaultGetCookieDescriptionCallback,
  qt as defaultGetDefaultLanguageFunction,
  Qt as defaultGetDictionariesFunction,
  Wt as defaultGetLanguageFunction,
  Ii as defaultGetManifestFileUrlFunction,
  Ti as defaultGetManifestUrlFunction,
  Si as defaultGetVideoIdFunction,
  ot as defaultHlsConfig,
  Pi as defaultLoadConfigFunction,
  ki as defaultLoadVideoManifestFunction,
  Kt as defaultSetLanguageFunction,
  zt as defaultTranslateFunction,
  _a as getCurrentTabIndex,
  ii as getDefaultLanguage,
  Rn as getDictionaries,
  V as getHlsSupport,
  Mn as getLanguage,
  ni as getNextTabIndex,
  di as getPluginsOfType,
  wn as getShortcuts,
  wa as importPlugins,
  Ui as isVolumeApiAvailable,
  M as loadPluginsOfType,
  Y as log,
  ct as parseDFXP,
  pt as parseWebVTT,
  ut as setLanguage,
  ye as translate,
  b as triggerEvent,
  se as triggerIfReady,
  ya as utils
};
