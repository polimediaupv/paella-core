var st = (i, e, t) => {
  if (!e.has(i))
    throw TypeError("Cannot " + t);
};
var O = (i, e, t) => (st(i, e, "read from private field"), t ? t.call(i) : e.get(i)), Te = (i, e, t) => {
  if (e.has(i))
    throw TypeError("Cannot add the same private member more than once");
  e instanceof WeakSet ? e.add(i) : e.set(i, t);
}, Ie = (i, e, t, s) => (st(i, e, "write to private field"), s ? s.call(i, t) : e.set(i, t), t);
const f = Object.freeze({
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
function k(i, e, t, s = !0) {
  return i.__eventListeners__ = i.__eventListeners__ || {}, Array.isArray(e) || (e = [e]), e.forEach((n) => {
    i.__eventListeners__[n] = i.__eventListeners__[n] || [], i.__eventListeners__[n].push({
      callback: t,
      unregisterOnUnload: s
    });
  }), t;
}
function C(i, e, t = {}) {
  i.__eventListeners__ && i.__eventListeners__[e] && i.__eventListeners__[e].forEach((s) => s.callback(t));
}
function ee(i, e, t = {}) {
  i.ready && C(i, e, t);
}
function wi(i) {
  if (i.__eventListeners__)
    for (const e in i.__eventListeners__)
      i.__eventListeners__[e] = i.__eventListeners__[e].filter((t) => t.unregisterOnUnload == !1), i.log.debug("Unregister event: " + i.__eventListeners__[e]);
}
class ae {
  constructor(e) {
    this._player = e;
  }
  get player() {
    return this._player;
  }
}
function Ct({ tag: i = "div", attributes: e = {}, children: t = "", innerText: s = "", parent: n = null }) {
  const a = document.createElement(i);
  a.innerText = s;
  for (let r in e)
    a.setAttribute(r, e[r]);
  return a.innerHTML = t, n && n.appendChild(a), a;
}
function w(i, e = null) {
  const t = document.createElement("div");
  t.innerHTML = i;
  const s = t.children[0];
  return e && e.appendChild(s), s;
}
class M extends ae {
  constructor(e, { tag: t = "div", attributes: s = [], children: n = "", parent: a = null }) {
    super(e), this._element = Ct({ tag: t, attributes: s, children: n, parent: a }), Object.defineProperty(this, t, {
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
const bt = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`, ie = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(0.707107,0.707107,-0.707107,0.707107,20,-8.28427)">
        <path d="M23,17L23,4.998C23,4.203 22.684,3.44 22.122,2.878C21.56,2.316 20.797,2 20.002,2C20.001,2 19.999,2 19.998,2C19.203,2 18.44,2.316 17.878,2.878C17.316,3.44 17,4.203 17,4.998C17,9.375 17,17 17,17L4.998,17C4.203,17 3.44,17.316 2.878,17.878C2.316,18.44 2,19.203 2,19.998C2,19.999 2,20.001 2,20.002C2,20.797 2.316,21.56 2.878,22.122C3.44,22.684 4.203,23 4.998,23C9.375,23 17,23 17,23L17,35.002C17,35.797 17.316,36.56 17.878,37.122C18.44,37.684 19.203,38 19.998,38C19.999,38 20.001,38 20.002,38C20.797,38 21.56,37.684 22.122,37.122C22.684,36.56 23,35.797 23,35.002C23,30.625 23,23 23,23L35.002,23C35.797,23 36.56,22.684 37.122,22.122C37.684,21.56 38,20.797 38,20.002C38,20.001 38,19.999 38,19.998C38,19.203 37.684,18.44 37.122,17.878C36.56,17.316 35.797,17 35.002,17C30.625,17 23,17 23,17Z"/>
    </g>
</svg>`, I = [];
function nt(i, e, t) {
  if (e) {
    e.setAttribute("aria-pressed", !0);
    const { top: s, left: n, right: a, bottom: r, width: o, height: l } = e.getBoundingClientRect(), c = n + o / 2, h = s + l / 2, u = document.body.scrollTop, p = window.innerWidth, y = window.innerHeight, _ = window.innerWidth / 2, m = window.innerHeight / 2;
    if (t.style.left = "", t.style.right = "", t.style.bottom = "", t.style.top = "", t.style.width = "", t.style.height = "", t.classList.remove("static-position"), _ > c && m <= h) {
      const g = y - (r - l);
      t.style.left = `${n}px`, t.style.bottom = `${g}px`, t.style.maxHeight = `calc(100vh - ${g}px - 10px)`;
    } else if (_ > c && m > h)
      t.style.left = `${n}px`, t.style.top = `${s + l + u}px`, t.style.maxHeight = `calc(100vh - ${s + l}px - 10px)`;
    else if (_ <= c && m > h)
      t.style.right = `${p - a}px`, t.style.top = `${s + l + u}px`, t.style.maxHeight = `calc(100vh - ${s + l}px - 10px)`;
    else if (_ <= c && m <= h) {
      const g = y - (r - l);
      t.style.right = `${p - a}px`, t.style.bottom = `${g}px`, t.style.maxHeight = `calc(100vh - ${g}px - 10px)`;
    }
    setTimeout(() => {
      t.offsetTop < 0 && (t.style.top = "0px");
    }, 100);
  }
}
function Ci(i) {
  i.__hidePopUpActionContainer || (i.__hidePopUpActionContainer = w('<div class="hide-popup-action-container"></div>'), i.videoContainer.element.appendChild(i.__hidePopUpActionContainer), i.__hidePopUpActionContainer.style.position = "absolute", i.__hidePopUpActionContainer.style.left = "0px", i.__hidePopUpActionContainer.style.top = "0px", i.__hidePopUpActionContainer.style.right = "0px", i.__hidePopUpActionContainer.style.bottom = "0px", i.__hidePopUpActionContainer.style.zIndex = 500, i.__hidePopUpActionContainer.addEventListener("click", (e) => {
    D.HideAllPopUps(!1), e.stopPropagation();
  })), i.__hidePopUpActionContainer.style.display = "block";
}
function bi(i) {
  i.__hidePopUpActionContainer && (i.__hidePopUpActionContainer.style.display = "none");
}
function Li(i, e, t, s) {
  const l = e.left - i.x, c = e.top - i.y, h = i.width - l, u = i.height - c;
  switch (!0) {
    case (l <= 10 && c <= 10 && s):
      return "RESIZE_NW";
    case (l <= 10 && u <= 10 && s):
      return "RESIZE_SW";
    case (l <= 10 && s):
      return "RESIZE_W";
    case (h <= 10 && c <= 10 && s):
      return "RESIZE_NE";
    case (h <= 10 && u <= 10 && s):
      return "RESIZE_SE";
    case (h <= 10 && s):
      return "RESIZE_E";
    case (c <= 10 && s):
      return "RESIZE_N";
    case (u <= 10 && s):
      return "RESIZE_S";
    case c <= 10 + t:
      return "MOVE";
    default:
      return "";
  }
}
class D extends M {
  static GetPopUps() {
    return I;
  }
  static IsSomePopUpVisible() {
    return I.some((e) => e.isVisible);
  }
  static GetPopUp(e) {
    return I.find((t) => t.id === e);
  }
  static Contains(e) {
    return I.some((t) => t.element.contains(e));
  }
  static HideAllPopUps(e = !0) {
    I.forEach((t) => {
      (e && t.isModal || !e) && t._closeOnClickOut && t.hide();
    });
  }
  static HideTopPopUp() {
    if (I.length) {
      let e = null;
      if (I.slice().reverse().some((t) => (t.isVisible && (e = t), e !== null)), e && e._closeOnClickOut)
        return e.hide(), !0;
    }
    return !1;
  }
  static Unload() {
    I.forEach((e) => {
      e.removeFromParent();
    }), I.slice(0);
  }
  static HideNonAncestors(e) {
    I.forEach((t) => {
      e.isParent && !e.isParent(t) && t._closeOnClickOut && t.hide();
    });
  }
  constructor(e, t, s = null, n = null, a = !0, r = !1, o = !1, l = "") {
    const c = {
      class: `${a ? "popup-container" : "popup-container no-modal"} ${l}`
    };
    r = r || o;
    const h = e.getCustomPluginIcon("paella-core", "dock-popup") || bt, u = e.getCustomPluginIcon("paella-core", "close-popup") || ie, p = `
		<div class="popup-content${o ? " resizeable" : ""}${r ? " moveable" : " fixed"}">
			<div class="border-top-left"></div><div class="border-top-center"></div><div class="border-top-right"></div>
			<div class="title-bar">
				<div class="title-bar-content"></div>
				<div class="popup-action-buttons">
					<button class="popup-action-button dock-button"><i>${h}</i></button>
					<button class="popup-action-button close-button"><i>${u}</i></button>
				</div>
			</div>
			<div class="center-container"></div>
			<div class="border-bottom-left"></div><div class="border-bottom-center"></div><div class="border-bottom-right"></div>
		</div>
		`;
    super(e, { attributes: c, children: p, parent: t }), this._lastFocusElement = document.activeElement, this._modal = a, this._contextObject = n, this._dragActionData = null, this._moveable = r || o, this._resizeable = o, this._id = Symbol(this), I.push(this), this.element.getElementsByClassName("dock-button")[0].addEventListener("click", (m) => {
      this.dock();
    });
    const _ = this.element.getElementsByClassName("close-button")[0];
    _.addEventListener("click", () => this.hide()), _.addEventListener("mousedown", (m) => m.stopPropagation()), this._closeButton = _, this.element.addEventListener("click", () => {
      this._closeOnClickOut && this.hide();
    }), this._contentElement = this.element.getElementsByClassName("popup-content")[0], this._centerContainer = this.element.getElementsByClassName("center-container")[0], this._titleBar = this.element.getElementsByClassName("title-bar")[0], this._centerContainer.addEventListener("mousedown", (m) => {
      m.stopPropagation();
    }), this._contentElement.addEventListener("mousedown", (m) => {
      if (this.moveable || this.resizeable) {
        this._element.style.pointerEvents = "all", this._moved = !0;
        const g = this._contentElement.getBoundingClientRect();
        this._contentElement.classList.add("static-position"), this._contentElement.style.top = g.top + "px", this._contentElement.style.left = g.left + "px", this._contentElement.style.width = g.width + "px", this._contentElement.style.height = g.height + "px", this._contentElement.style.maxHeight = "unset";
        const b = this._titleBar.getBoundingClientRect().height;
        this._centerContainer.style.height = `calc(100% - var(--popup-resizeable-border) * 2 - ${b}px)`;
        const A = {
          left: m.clientX,
          top: m.clientY
        };
        this._dragActionData = {
          popUp: this,
          action: Li(g, A, b, this._resizeable),
          event: m,
          initialPosition: A
        };
      }
      m.stopPropagation();
    }), this.element.addEventListener("mouseup", (m) => {
      this._element.style.pointerEvents = "", (this.moveable || this.resizeable) && (this._dragActionData = null);
    }), this.element.addEventListener("mousemove", (m) => {
      if (this._dragActionData) {
        const g = {
          left: m.clientX - this._dragActionData.initialPosition.left,
          top: m.clientY - this._dragActionData.initialPosition.top
        };
        this._dragActionData.initialPosition = {
          left: m.clientX,
          top: m.clientY
        };
        const d = this._contentElement.getBoundingClientRect();
        this._dragActionData.action === "MOVE" ? (this._contentElement.style.top = `${d.top + g.top}px`, this._contentElement.style.left = `${d.left + g.left}px`, this._contentElement.style.height = `${d.height}px`, this._contentElement.style.width = `${d.width}px`) : this._dragActionData.action === "RESIZE_N" ? (this._contentElement.style.height = `${d.height - g.top}px`, this._contentElement.style.top = `${d.top + g.top}px`) : this._dragActionData.action === "RESIZE_NE" ? (this._contentElement.style.height = `${d.height - g.top}px`, this._contentElement.style.top = `${d.top + g.top}px`, this._contentElement.style.width = `${d.width + g.left}px`, this._contentElement.style.left = `${d.left}px`) : this._dragActionData.action === "RESIZE_E" ? (this._contentElement.style.width = `${d.width + g.left}px`, this._contentElement.style.left = `${d.left}px`) : this._dragActionData.action === "RESIZE_SE" ? (this._contentElement.style.top = `${d.top}px`, this._contentElement.style.left = `${d.left}px`, this._contentElement.style.width = `${d.width + g.left}px`, this._contentElement.style.height = `${d.height + g.top}px`) : this._dragActionData.action === "RESIZE_S" ? (this._contentElement.style.top = `${d.top}px`, this._contentElement.style.height = `${d.height + g.top}px`) : this._dragActionData.action === "RESIZE_SW" ? (this._contentElement.style.top = `${d.top}px`, this._contentElement.style.height = `${d.height + g.top}px`, this._contentElement.style.width = `${d.width - g.left}px`, this._contentElement.style.left = `${d.left + g.left}px`) : this._dragActionData.action === "RESIZE_NW" ? (this._contentElement.style.width = `${d.width - g.left}px`, this._contentElement.style.left = `${d.left + g.left}px`, this._contentElement.style.height = `${d.height - g.top}px`, this._contentElement.style.top = `${d.top + g.top}px`) : this._dragActionData.action === "RESIZE_W" && (this._contentElement.style.width = `${d.width - g.left}px`, this._contentElement.style.left = `${d.left + g.left}px`);
      }
    }), this._contentElement.addEventListener("mouseup", (m) => {
      this._dragActionData = null, this._element.style.pointerEvents = "", m.stopPropagation();
    }), this._contentElement.addEventListener("click", (m) => {
      m.stopPropagation();
    }), this._anchorElement = s, s && nt(e, s, this.contentElement), this._parentPopUp = null, this.hide();
  }
  dock() {
    this._moved = !1, this._centerContainer.style.height = "", this.hide(), this.show();
  }
  get lastFocusElement() {
    return this._lastFocusElement;
  }
  get isModal() {
    return this._modal;
  }
  get contextObject() {
    return this._contextObject;
  }
  get id() {
    return this._id;
  }
  // This is the popup window
  get contentElement() {
    return this._contentElement;
  }
  get centerContainer() {
    return this._centerContainer;
  }
  // This is the content element you set with setContent()
  get content() {
    return this._popupContent;
  }
  get parentPopUp() {
    return this._parentPopUp;
  }
  get moveable() {
    return this._moveable;
  }
  get resizeable() {
    return this._resizeable;
  }
  get titleBar() {
    return this._titleBar;
  }
  set title(e) {
    this._title = e, this._titleBar.classList.remove("not-empty");
    const t = this._titleBar.getElementsByClassName("title-bar-content")[0];
    e !== null && e instanceof Element ? (t.innerHTML = "", t.appendChild(e), this._titleBar.classList.add("not-empty")) : e !== null && (t.innerHTML = "", t.innerHTML = this.player.translate(e), this._titleBar.classList.add("not-empty"));
  }
  get title() {
    return this._title;
  }
  setCloseActions({ clickOutside: e = !0, closeButton: t = !1 }) {
    this._closeOnClickOut = e, this._closeOnButton = t, this._closeOnButton ? this._closeButton.style.display = "block" : this._closeButton.style.display = "none";
  }
  isParent(e) {
    return e === this ? !0 : this.parentPopUp === null ? !1 : this.parentPopUp === e ? !0 : this.parentPopUp.isParent(e);
  }
  setContent(e) {
    this.centerContainer.innerHTML = "", typeof e == "string" ? this._popupContent = w(e, this.centerContainer) : (this._popupContent = e, this.centerContainer.appendChild(e));
  }
  show(e = null, t = null) {
    this._anchorElement && !this._moved && nt(this.player, this._anchorElement, this.contentElement), e && this.setParent(e), this._parentPopUp = t, t && t.addChild(this), super.show(), D.HideNonAncestors(this), this._closeOnClickOut && Ci(this.player), C(this.player, f.SHOW_POPUP, {
      popUp: this,
      plugin: this.contextObject
    });
  }
  hide() {
    this.isVisible && (this._children && this._children.forEach((e) => {
      e._closeOnClickOut && e.hide();
    }), this._parentPopUp && this._parentPopUp.removeChild(this), C(this.player, f.HIDE_POPUP, {
      popUp: this,
      plugin: this.contextObject
    }), this._anchorElement && this._anchorElement.setAttribute("aria-pressed", !1), super.hide(), this.lastFocusElement && this.lastFocusElement.focus()), I.some((e) => e.isVisible && e._closeOnClickOut) || bi(this.player);
  }
  // Child popUp management
  addChild(e) {
    this._children = this._children || [], this._children.find((t) => t === e) || this._children.push(e);
  }
  removeChild(e) {
    this._children && (this._children = this._children.filter((t) => t !== e));
  }
  destroy() {
    const e = I.indexOf(this);
    e !== -1 && (I.splice(e, 1), this.removeFromParent());
  }
}
function Lt(i) {
  return new Promise((e, t) => {
    fetch(i).then((s) => s.text()).then((s) => {
      e(s);
    }).catch((s) => t(s));
  });
}
function Et(i) {
  const e = new URLSearchParams(window.location.search);
  return e.has(i) ? e.get(i) : null;
}
function Pt(i) {
  const e = window.location.hash.replace("#", "?"), t = new URLSearchParams(e);
  return t.has(i) ? t.get(i) : null;
}
function $(i, e) {
  const t = e || "/";
  return i = i.map((s, n) => (n && (s = s.replace(new RegExp("^" + t), "")), n !== i.length - 1 && (s = s.replace(new RegExp(t + "$"), "")), s)), i.join(t);
}
function St(i) {
  return new RegExp("^([a-z]+://|//)", "i").test(i) || /^\//.test(i);
}
function Ce(i) {
  try {
    return new URL(i).pathname.split("/").pop();
  } catch {
    return i.split("/").pop();
  }
}
function Tt(i) {
  return i.split(".").reduce((e, t, s, n) => s < n.length - 1 ? e !== "" ? `${e}.${t}` : t : e, "");
}
function ze(i) {
  const e = (t) => {
    const s = t.split("/").reduce((n, a, r, o) => r < o.length - 1 ? n !== "" ? `${n}/${a}` : a : n, "");
    return (t[0] === "/" ? `/${s}` : s) + "/";
  };
  try {
    const t = new URL(i);
    return t.origin + e(t.pathname);
  } catch {
    return e(i);
  }
}
function Ke(i) {
  return Ce(i).split(".").pop();
}
function K(i, e) {
  return St(e) ? e : $([i.manifestUrl, e]);
}
function It(i) {
  i.__hideTimerPaused__ = !0;
}
function xt(i) {
  i.__hideTimerPaused__ = !1;
}
function kt(i, e = "hideUiTime") {
  var a;
  i.__hideTimer__ = null;
  const t = async () => D.IsSomePopUpVisible() ? (i.log.debug("UI not hidden because there are visible pop ups"), !1) : i.__hideTimerPaused__ ? (i.log.debug("UI not hidden because the auto hide timer is paused"), !1) : s() ? (i.log.debug("UI not hidden because there is a focused element"), !1) : (await i.hideUserInterface(), !0);
  (a = i.config.ui) != null && a.hideOnMouseLeave && i.containerElement.addEventListener("mouseleave", () => {
    t();
  });
  const s = () => {
    const r = document.activeElement;
    return (i.playbackBar.element.contains(r) || i.videoContainer.element.contains(r)) && [
      "input",
      "textarea",
      "button"
    ].find((o) => r.tagName.toLowerCase(o)) !== -1;
  }, n = async () => {
    i.__hideTimer__ && clearTimeout(i.__hideTimer__), await i.showUserInterface(), i.__hideTimer__ = setTimeout(async () => {
      i.__hideTimer__ = null, t() || n();
    }, i[e]);
  };
  i.containerElement.addEventListener("mousemove", async (r) => {
    n();
  }), k(i, f.PLAY, async () => {
    n();
  }), k(i, f.PAUSE, async () => {
    await i.showUserInterface();
  }), k(i, f.ENDED, async () => {
    await i.showUserInterface();
  }), document.addEventListener("keydown", async () => {
    n();
  });
}
function Dt(i) {
  i.__hideTimer__ && (clearTimeout(i.__hideTimer__), delete i.__hideTimer__);
}
function Oe(i) {
  const e = Math.floor(i / 60 / 60), t = Math.floor(i / 60) - e * 60, s = Math.floor(i % 60);
  return (e > 0 ? e.toString().padStart(2, "0") + ":" : "") + t.toString().padStart(2, "0") + ":" + s.toString().padStart(2, "0");
}
function ve(i) {
  const t = /^(?:(\d+):){0,1}(\d+):(\d+)(\.\d+)?$/.exec(i);
  if (t) {
    const s = t[1] !== void 0 ? Number(t[1]) : 0, n = Number(t[2]), a = Number(t[3]);
    return s * 3600 + n * 60 + a;
  }
  return null;
}
function Fe(i) {
  const t = /^(?:(\d+):){0,1}(\d+):(\d+)\.(\d+)?$/.exec(i);
  if (t) {
    const s = t[1] !== void 0 ? Number(t[1]) : 0, n = Number(t[2]), a = Number(t[3]), r = t[4] && Number(t[4]) || 0;
    return s * 36e5 + n * 6e4 + a * 1e3 + r;
  }
  return null;
}
function Y(i, e, t = 365) {
  let s = /* @__PURE__ */ new Date();
  s.setTime(s.getTime() + t * 24 * 60 * 60 * 1e3);
  let n = `expires=${s.toUTCString()}`;
  document.cookie = `${i}=${e};${n};path=/;SameSite=None;` + (/Apple/.test(navigator.vendor) ? "" : "Secure;");
}
function At(i, e, t, s, n = 365) {
  i.cookieConsent.getConsentForType(e) && Y(t, s, n);
}
function z(i) {
  let e = i + "=", s = decodeURIComponent(document.cookie).split(";");
  for (let n = 0; n < s.length; ++n) {
    let a = s[n];
    for (; a.charAt(0) == " "; )
      a = a.substring(1);
    if (a.indexOf(e) == 0)
      return a.substring(e.length, a.length);
  }
  return "";
}
function Ei(i) {
  const e = z(i), t = Number(e);
  return e !== "" && !isNaN(t) ? t : null;
}
function Pi(i) {
  try {
    return JSON.parse(z(i));
  } catch {
    return null;
  }
}
function We(i, e = !0) {
  return new Promise((t) => {
    const s = document.createElement("link");
    s.setAttribute("rel", "stylesheet"), s.setAttribute("href", i), s.onload = () => t(s);
    const n = document.getElementsByTagName("head")[0];
    e && n.appendChild(s), t();
  });
}
function Rt(i) {
  document.getElementsByTagName("head")[0].removeChild(i);
}
function ge(i, e, t = !0) {
  for (const s in e) {
    const n = i[s];
    let a = e[s];
    t && Array.isArray(n) && Array.isArray(a) ? (n.forEach((r) => {
      a = a.filter((o) => typeof r == "object" && typeof o == "object" && r.id === o.id ? (ge(r, o, t), !1) : !0);
    }), a.forEach((r) => {
      n.push(r);
    })) : typeof n == "object" && a ? ge(n, a, t) : i[s] = e[s];
  }
}
const aa = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  clearAutoHideTimer: Dt,
  getCookie: z,
  getFileExtension: Ke,
  getHashParameter: Pt,
  getJSONCookie: Pi,
  getNumericCookie: Ei,
  getUrlFileName: Ce,
  getUrlParameter: Et,
  isAbsoluteUrl: St,
  joinPath: $,
  loadStyle: We,
  loadSvgIcon: Lt,
  mergeObjects: ge,
  pauseAutoHideUiTimer: It,
  removeExtension: Tt,
  removeFileName: ze,
  resolveResourcePath: K,
  resumeAutoHideUiTimer: xt,
  secondsToTime: Oe,
  setCookie: Y,
  setCookieIfAllowed: At,
  setupAutoHideUiTimer: kt,
  timeToMilliseconds: Fe,
  timeToSeconds: ve,
  unloadStyle: Rt
}, Symbol.toStringTag, { value: "Module" }));
async function Si(i, e) {
  return e.log.debug("Using default configuration loading function."), (await fetch(i)).json();
}
async function Ti(i, e) {
  return e.log.debug("Using default getVideoId function"), Pt("id") || Et("id") || i.fallbackId;
}
async function Ii(i, e, t, s) {
  return s.log.debug("Using default getManifestUrl function"), $([i, e]);
}
async function xi(i, e, t, s) {
  return s.log.debug("Using default getManifestFileUrl function"), $([i, e]);
}
async function ki(i, e, t) {
  t.log.debug("Using default loadVideoManifest function");
  const s = await fetch(i);
  if (s.ok)
    return await s.json();
  throw new Error(t.translate("Error loading video manifest: $1 $2", [s.status, s.statusText]));
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
class Ai extends M {
  constructor(e) {
    super(e, { parent: e.containerElement }), this.element.className = "loader-container";
  }
  async create() {
    w(`<i>${Di}</i>`, this.element);
  }
  get debug() {
    return !1;
  }
}
const Ri = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g id="Cancel" transform="matrix(5.54545,6.8353e-32,6.8353e-32,5.54545,-2567.37,-10735.5)">
        <path d="M486.05,1937C498.192,1937 508.05,1946.86 508.05,1959C508.05,1971.14 498.192,1981 486.05,1981C473.908,1981 464.05,1971.14 464.05,1959C464.05,1946.86 473.908,1937 486.05,1937ZM478.979,1950.52L477.565,1951.93L484.636,1959L477.565,1966.07L478.979,1967.49L486.05,1960.41L493.121,1967.49L494.535,1966.07L487.464,1959L494.535,1951.93L493.121,1950.52L486.05,1957.59L478.979,1950.52Z" style="fill:rgb(210,0,0);"/>
    </g>
</svg>
`;
class xe extends M {
  constructor(e, t = "") {
    super(e, { parent: e.containerElement }), this.element.className = "error-container", w(`
            <div>
                <i>${Ri}</i>
                <p>${t}</p>
            </div>`, this.element);
  }
}
class W extends ae {
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
class re extends W {
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
const be = [];
async function Mi(i) {
  await R(i, "video", (e) => {
    be.push(e);
  });
}
async function Ui(i) {
  be.slice(0);
}
function Mt(i) {
  if (be.length === 0)
    throw Error("No video plugins loaded. Note that `loadVideoPlugins()` must to be called before using `getVideoPlugins()`.");
  return be;
}
function Vi(i, e) {
  const t = Ke(e);
  return Mt().find((n) => n.getCompatibleFileExtensions().indexOf(t) !== -1);
}
async function Ni(i, e) {
  const t = Mt();
  let s = null;
  for (const n of t)
    if (await n.isCompatible(e)) {
      s = n;
      break;
    }
  return s;
}
async function Oi() {
  return await new Promise((e) => {
    const t = document.createElement("audio"), s = setTimeout(() => e(!1), 100);
    t.addEventListener("volumechange", (n) => {
      clearTimeout(s), e(!0);
    }), t.volume = 0.5;
  });
}
class je extends M {
  constructor(e, t, s) {
    const n = {
      class: "video-player"
    };
    super(t, { tag: e, attributes: n, parent: s }), this._streamProvider = null, this._streamData = null, this._ready = !1;
  }
  async isVolumeApiAvailable() {
    return await Oi();
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
class Ee extends ae {
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
const Fi = "paella-core", $i = {
  ".": "./src/js/index.js",
  "./*": "./src/js/*",
  "./paella-core.css": "./dist/paella-core.css"
}, Bi = "2.0.0", Hi = "Multistream HTML video player", Gi = "./src/js/index.js", zi = [
  "dist/paella-core.css"
], Ki = "./src/js/index.js", Wi = "module", ji = {
  dev: "vite",
  build: "vite build --emptyOutDir"
}, Qi = {
  type: "git",
  url: "git+https://github.com/polimediaupv/paella-player.git"
}, Zi = [
  "html",
  "player",
  "video",
  "hls"
], qi = "Fernando Serrano Carpena <ferserc1@gmail.com>", Yi = "ECL-2.0", Ji = {
  url: "https://github.com/polimediaupv/paella-player/issues"
}, Xi = "https://github.com/polimediaupv/paella-player#readme", es = {
  vite: "^5.0.8"
}, ts = {
  "@ferserc1/input-style-unifier": "^0.0.1",
  "hls.js": "^1.0.4"
}, fe = {
  name: Fi,
  exports: $i,
  version: Bi,
  description: Hi,
  main: Gi,
  files: zi,
  module: Ki,
  type: Wi,
  scripts: ji,
  repository: Qi,
  keywords: Zi,
  author: qi,
  license: Yi,
  bugs: Ji,
  homepage: Xi,
  devDependencies: es,
  dependencies: ts
};
let ke = null;
class j extends Ee {
  static Get() {
    return ke || (ke = new j()), ke;
  }
  get moduleName() {
    return "paella-core default video formats";
  }
  get moduleVersion() {
    return fe.version;
  }
}
function is(i) {
  return new Promise((e, t) => {
    const s = new Image();
    s.addEventListener("load", (n) => {
      e(s);
    }), s.addEventListener("error", (n) => {
      t(new Error("Could not load preview image. The preview image is required in audio only streams"));
    }), s.src = i;
  });
}
function ss(i, e, t) {
  return new Promise((s, n) => {
    e.oncanplay = () => s(), e.onerror = () => n(new Error(i.translate("Error loading audio: $1", [t]))), e.src = K(i, t), s();
  });
}
class ns extends je {
  constructor(e, t, s) {
    super("audio", e, t), this.isMainAudio = s, this._ready = !1;
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
    if (this._previewImage = await is(t), this._imageContainer = document.createElement("div"), this._imageContainer.className = "image-container", this.parent.appendChild(this._imageContainer), this._imageContainer.appendChild(this._previewImage), this._source = e.sources.audio && e.sources.audio[0], !this._source)
      throw new Error("Invalid source in audio only video stream");
    if (!this.isMainAudioPlayer)
      throw new Error("Audio only video stream must be main audio player. Check the role property at video manifest");
    await ss(this.player, this.audio, this._source.src);
    const s = () => {
      const n = this.player.videoContainer.baseVideoRect.offsetWidth / this.player.videoContainer.baseVideoRect.offsetHeight, a = this._previewImage.width / this._previewImage.height;
      n > a ? (this._previewImage.classList.add("landscape"), this._previewImage.classList.remove("portrait")) : (this._previewImage.classList.add("portrait"), this._previewImage.classList.remove("landscape"));
    };
    this.player.frameList.frames.length > 0 && this.audio.addEventListener("timeupdate", (n) => {
      const a = this.player.frameList.getImage(n.target.currentTime, !0);
      this._previewImage.src != a.url && (this._previewImage.src = a.url, this._previewImage.onload = () => s());
    }), window.addEventListener("resize", (n) => s()), s(), this._ready = !0;
  }
}
class as extends re {
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
    return new ns(this.player, e, t);
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
let _e = null;
function Ut(i) {
  if (!i)
    return !1;
  _e || (_e = document.createElement("video"));
  let e = _e.canPlayType(i);
  if (e === "maybe" || e === "probably")
    return !0;
  if (/video\/mp4/i.test(i))
    return e = _e.canPlayType("video/mp4"), e === "maybe" || e === "probably";
}
class Qe extends je {
  constructor(e, t, s, n) {
    super("video", e, t), this._config = n || {};
    const a = this._config.crossOrigin ?? "";
    this.element.setAttribute("playsinline", "true"), a !== !1 && this.element.setAttribute("crossorigin", a), this.isMainAudio = s, this.element.setAttribute("autoplay", "true"), this.element.autoplay = !0, s || (this.element.muted = !0), this._videoEnabled = !0;
  }
  async play() {
    if (this._videoEnabled)
      return await this.waitForLoaded(), this.video.play();
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
    return this._videoEnabled ? (await this.waitForLoaded(), e === 0 ? this.video.setAttribute("muted", !0) : this.video.removeAttribute("muted"), this.video.volume = e) : (this._disabledProperties.volume = e, e);
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
  // This function is called when the player loads, and it should
  // make everything ready for video playback to begin.
  async loadStreamData(e = null) {
    this._streamData = this._streamData || e, this.player.log.debug("es.upv.paella.mp4VideoFormat: loadStreamData"), this._sources = null, this._currentQuality = 0, this._sources = e.sources.mp4, this._sources.sort((t, s) => Number(t.res.w) - Number(s.res.w)), this._currentQuality = this._sources.length - 1, this._currentSource = this._sources[this._currentQuality], this.isMainAudioPlayer || (this.video.muted = !0), this._initialVolume && (this.video.volume = this._initialVolume, this._initialVolume === 0 && (this.video.muted = !0)), this.video.src = K(this.player, this._currentSource.src), this._endedCallback = this._endedCallback || (() => {
      typeof this._videoEndedCallback == "function" && this._videoEndedCallback();
    }), this.video.addEventListener("ended", this._endedCallback), await this.waitForLoaded(), this.player.log.debug(`es.upv.paella.mp4VideoFormat (${this.streamData.content}): video loaded and ready.`), this.saveDisabledProperties(this.video);
  }
  async clearStreamData() {
    this.video.src = "", this.video.removeEventListener("ended", this._endedCallback), this._ready = !1;
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
      if (this.ready)
        e();
      else {
        const s = () => {
          this._waitTimer && clearTimeout(this._waitTimer), this._waitTimer = null, this.video.error ? t(new Error(this.player.translate("Error loading video: $1. Code: $2 $3", [this.video.src, this.video.error, this.video.error.message]))) : this.video.readyState >= 2 ? (this.video.pause(), this._ready = !0, e()) : this._waitTimer = setTimeout(() => s(), 100);
        };
        s();
      }
    });
  }
}
class rs extends re {
  getPluginModuleInstance() {
    return j.Get();
  }
  get name() {
    return super.name || "es.upv.paella.mp4VideoFormat";
  }
  get streamType() {
    return "mp4";
  }
  async isCompatible(e) {
    var s;
    const { mp4: t } = e.sources;
    return t && Ut((s = t[0]) == null ? void 0 : s.mimetype);
  }
  async getVideoInstance(e, t) {
    return new Qe(this.player, e, t, this.config);
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
class te {
  constructor({ label: e, shortLabel: t, isAuto: s = !1, index: n = 0, src: a = "", width: r = -1, height: o = -1, bitrate: l = -1 }) {
    this._label = e, this._shortLabel = t, this._index = n, this._src = a, this._res = {
      w: r,
      h: o
    }, this._bitrate = l, this._isAuto = s;
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
class at {
  constructor({
    id: e,
    name: t,
    groupId: s = "",
    language: n = "",
    selected: a = !1
  }) {
    this._id = e, this._name = t, this._groupId = s, this._lang = n, this._selected = a;
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
const rt = {
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
}, ot = {
  withCredentials: !0,
  requestHeaders: {
    "Access-Control-Allow-Headers": "Content-Type, Accept, X-Requested-With",
    "Access-Control-Allow-Origin": "http://localhost:8000",
    "Access-Control-Allow-Credentials": "true"
  }
}, T = {
  UNSUPPORTED: 0,
  MEDIA_SOURCE_EXTENSIONS: 1,
  NATIVE: 2
};
let De = null;
async function Ze() {
  return De || (console.debug("Loading HLS.js"), De = (await import("./hls-FataH-6s.js")).default), De;
}
async function V(i = !1) {
  const e = await Ze(), t = document.createElement("video");
  return t.canPlayType("application/vnd.apple.mpegurl") && i ? T.NATIVE : e.isSupported() ? T.MEDIA_SOURCE_EXTENSIONS : t.canPlayType("application/vnd.apple.mpegurl") ? T.NATIVE : T.UNSUPPORTED;
}
const os = async (i, e, t, s, n) => {
  var l, c;
  const a = await Ze();
  n.withCredentials && (s.xhrSetup = function(h, u) {
    h.withCredentials = n.withCredentials;
    for (const p in n.requestHeaders) {
      const y = n.requestHeaders[p];
      h.setRequestHeader(p, y);
    }
  }), s.autoStartLoad = !0;
  const r = new a(s), o = ((c = (l = e == null ? void 0 : e.sources) == null ? void 0 : l.hls) == null ? void 0 : c.length) > 0 && e.sources.hls[0];
  return [r, new Promise((h, u) => {
    let p = !1;
    r.on(a.Events.LEVEL_SWITCHED, (g, d) => {
      i.log.debug(`HLS: quality level switched to ${d.level}`), p || (r.currentLevel = -1, p = !0), C(i, f.VIDEO_QUALITY_CHANGED, {});
    }), r.on(a.Events.ERROR, (g, d) => {
      if (d.fatal)
        switch (d.type) {
          case a.ErrorTypes.NETWORK_ERROR:
            d.details === a.ErrorDetails.MANIFEST_LOAD_ERROR ? u(Error("hlsVideoFormatPlugin: unrecoverable error in HLS player. The video is not available")) : (i.log.warn("hlsVideoFormatPlugin: Fatal network error. Try to recover"), r.startLoad());
            break;
          case a.ErrorTypes.MEDIA_ERROR:
            i.log.warn("hlsVideoFormatPlugin: Fatal media error encountered. Try to recover"), r.recoverMediaError();
            break;
          default:
            r.destroy(), u(Error("hlsVideoFormat: Fatal error. Can not recover"));
        }
      else
        i.log.warn("HLS: error"), i.log.warn(d.details);
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
    const y = Math.floor(Math.random() * 1e11), _ = o.src + (s.enableCache ? /\?/.test(o.src) ? `&cache=${y}` : `?cache=${y}` : "");
    r.loadSource(_), r.attachMedia(t);
    let m = !1;
    r._videoEventListener = () => {
      m = !0, h();
    }, t.addEventListener("canplay", r._videoEventListener), setTimeout(() => {
      m || t.play();
    }, 1e3);
  })];
};
class Vt extends Qe {
  constructor(e, t, s, n) {
    super(e, t, n, s), this._config = this._config || {
      audioTrackLabel: s.audioTrackLabel || "name",
      enableCache: s.enableCache || !1
    };
    for (const a in rt)
      this._config[a] = rt[a];
    for (const a in s.hlsConfig)
      this._config[a] = s.hlsConfig[a];
    this._cors = {};
    for (const a in ot)
      this._cors[a] = ot[a];
    for (const a in s.corsConfig)
      this._cors[a] = s.corsConfig[a];
    this._ready = !1, this._autoQuality = !0, this._forceNative = s.forceNative || !1;
  }
  get autoQuality() {
    return this._autoQuality;
  }
  get forceNative() {
    return this._forceNative;
  }
  async loadStreamData(e) {
    var s, n;
    if (await V(this.forceNative) === T.NATIVE) {
      e.sources.mp4 = e.sources.hls;
      const a = await super.loadStreamData(e), r = await this.getAudioTracks();
      return this._currentAudioTrack = r.find((o) => o.selected), this._autoQuality = new te({
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
      const a = ((n = (s = e == null ? void 0 : e.sources) == null ? void 0 : s.hls) == null ? void 0 : n.length) && e.sources.hls[0];
      this._config.audioTrackLabel = (a == null ? void 0 : a.audioLabel) || this._config.audioTrackLabel;
      const [r, o] = await os(this.player, e, this.video, this._config, this._cors);
      this._hls = r, await o, this.video.pause(), this._autoQuality = new te({
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
    if (await V(this.forceNative) === T.NATIVE)
      return super.waitForLoaded();
    await new Promise((t, s) => {
      const n = () => {
        this.video.readyState >= 2 ? (this._ready = !0, t()) : setTimeout(() => n(), 200);
      };
      n();
    });
  }
  async getQualities() {
    const e = [];
    return e.push(this._autoQuality), await V(this.forceNative) === T.MEDIA_SOURCE_EXTENSIONS && (this._hls.levels.forEach((s, n) => {
      e.push(new te({
        index: n,
        // TODO: should be level.id??
        label: `${s.width}x${s.height}`,
        shortLabel: `${s.height}p`,
        width: s.width,
        height: s.height
      }));
    }), e.sort((s, n) => s.res.h - n.res.h)), e;
  }
  async setQuality(e) {
    const t = await V(this.forceNative);
    if (this._videoEnabled) {
      if (!(e instanceof te))
        throw Error("Invalid parameter setting video quality. VideoQualityItem object expected.");
      t === T.MEDIA_SOURCE_EXTENSIONS ? (this._currentQuality = e, this._hls.currentLevel = e.index) : this.player.log.warn("Could not set video quality of HLS stream, because the HLS support of this browser is native.");
    }
  }
  get currentQuality() {
    return this._currentQuality;
  }
  async supportsMultiaudio() {
    var t;
    await this.waitForLoaded();
    const e = await V(this.forceNative);
    return e === T.MEDIA_SOURCE_EXTENSIONS ? this._hls.audioTracks.length > 1 : e === T.NATIVE ? ((t = this.video.audioTracks) == null ? void 0 : t.length) > 1 : !1;
  }
  async getAudioTracks() {
    await this.waitForLoaded();
    const e = this._config.audioTrackLabel || "name", t = await V(this.forceNative);
    return t === T.MEDIA_SOURCE_EXTENSIONS ? this._hls.audioTracks.map((n) => new at({
      id: n.id,
      name: n[e],
      language: n.lang,
      selected: this._hls.audioTrack === n.id
    })) : t === T.NATIVE ? Array.from(this.video.audioTracks).map((n) => new at({
      id: n.id,
      name: n.label,
      language: n.language,
      selected: n.enabled
    })) : null;
  }
  async setCurrentAudioTrack(e) {
    await this.waitForLoaded();
    const s = (await this.getAudioTracks()).find((a) => a.id === e.id), n = await V(this.forceNative);
    return n === T.MEDIA_SOURCE_EXTENSIONS && s ? this._hls.audioTrack = s.id : n === T.NATIVE && s && Array.from(this.video.audioTracks).forEach((a) => {
      a.id === s.id ? a.enabled = !0 : a.enabled = !1;
    }), this._currentAudioTrack = s, s;
  }
  get currentAudioTrack() {
    return this._currentAudioTrack;
  }
  async clearStreamData() {
    this.video.removeEventListener("canplay", this._hls._videoEventListener), this.video.src = "", this._hls.destroy(), this._ready = !1;
  }
}
class ls extends re {
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
    return new Vt(this.player, e, this.config, t);
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
const cs = async (i, e, t, s, n) => {
  var l, c;
  const a = await Ze();
  n.withCredentials && (s.xhrSetup = function(h, u) {
    h.withCredentials = n.withCredentials;
    for (const p in n.requestHeaders) {
      const y = n.requestHeaders[p];
      h.setRequestHeader(p, y);
    }
  });
  const r = new a(s), o = ((c = (l = e == null ? void 0 : e.sources) == null ? void 0 : l.hlsLive) == null ? void 0 : c.length) > 0 && e.sources.hlsLive[0];
  return s.initialQualityLevel !== void 0 && s.initialQualityLevel, [r, new Promise((h, u) => {
    let p = !1;
    r.on(a.Events.LEVEL_SWITCHED, (m, g) => {
      (void 0).player.log.debug(`HLS: quality level switched to ${g.level}`), p || (r.currentLevel = -1, p = !0), C(i, f.VIDEO_QUALITY_CHANGED, {});
    }), r.on(a.Events.ERROR, (m, g) => {
      if (g.fatal)
        switch (g.type) {
          case a.ErrorTypes.NETWORK_ERROR:
            g.details === a.ErrorDetails.MANIFEST_LOAD_ERROR ? u(Error("hlsVideoFormatPlugin: unrecoverable error in HLS player. The video is not available")) : (i.log.warn("hlsVideoFormatPlugin: Fatal network error. Try to recover"), r.startLoad());
            break;
          case a.ErrorTypes.MEDIA_ERROR:
            i.log.warn("hlsVideoFormatPlugin: Fatal media error encountered. Try to recover"), r.recoverMediaError();
            break;
          default:
            r.destroy(), u(Error("hlsVideoFormat: Fatal error. Can not recover"));
        }
    }), r.on(a.Events.MANIFEST_PARSED, () => {
      s.autoStartLoad || r.autoStartLoad();
    });
    const y = Math.floor(Math.random() * 1e11), _ = o.src + (s.enableCache ? /\?/.test(o.src) ? `&cache=${y}` : `?cache=${y}` : "");
    r.loadSource(_), r.attachMedia(t), r._videoEventListener = () => {
      h();
    }, t.addEventListener("canplay", r._videoEventListener);
  })];
};
class us extends Vt {
  async loadStreamData(e) {
    if (await V() === T.NATIVE)
      return e.sources.hls = e.sources.hlsLive, super.loadStreamData(e);
    {
      this.player.log.debug("Loading HLS stream");
      const [s, n] = await cs(this.player, e, this.video, this._config, this._cors);
      this._hls = s, await n, this._autoQuality = new te({
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
class ds extends re {
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
    const t = await V(), { hlsLive: s } = e.sources;
    return s && t;
  }
  async getVideoInstance(e, t) {
    return new us(this.player, e, this.config, t);
  }
}
class hs extends Qe {
  constructor(e, t, s) {
    super(e, t, s);
  }
  async loadStreamData(e = null) {
    this._streamData = this._streamData || e, this.player.log.debug("es.upv.paella.htmlVideoFormat: loadStreamData"), this._sources = e.sources.html, this._currentQuality = 0, this.isMainAudioPlayer || (this.video.muted = !0), this._sources.forEach(({ src: t, mimetype: s }) => {
      t = K(this.player, t);
      const n = document.createElement("source");
      n.src = t, n.type = s, this.video.appendChild(n);
    }), this._endedCallback = this._endedCallback || (() => {
      typeof this._videoEndedCallback == "function" && this._videoEndedCallback();
    }), this.video.addEventListener("ended", this._endedCallback), await this.waitForLoaded(), this.player.log.debug(`es.upv.paella.htmlVideoFormat (${this.streamData.content}): video loaded and ready.`), this.saveDisabledProperties(this.video);
  }
}
class ps extends re {
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
    return t && t.some((s) => Ut(s.mimetype));
  }
  async getVideoInstance(e, t) {
    return new hs(this.player, e, t);
  }
  getCompatibleFileExtensions() {
    return ["m4v", "mp4", "ogg", "webm", "ogv"];
  }
  getManifestData(e) {
    const t = (s) => {
      switch (Ke(s)) {
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
      html: e.map((s) => ({
        src: s,
        mimetype: t(s)
      }))
    };
  }
}
function Nt(i) {
  let e = this._currentSource.frames[0];
  this._currentSource.frames.some((t) => {
    if (t.time <= this._currentTime)
      e = t;
    else
      return !0;
  }), this.img.src = e.src;
}
function gs() {
  this._startTimestamp = Date.now();
  const i = () => {
    this._timer = setTimeout(i, 250);
    const e = Date.now(), t = e - this._startTimestamp;
    this._currentTime += t / 1e3, this._startTimestamp = e, Nt.apply(this, [this._currentTime]);
  };
  i();
}
function ms() {
  this._timer && (clearTimeout(this._timer), this._timer = null);
}
class fs extends je {
  constructor(e, t) {
    super("img", e, t), this._currentTime = 0, this._startTimesamp = 0, this._playbackRate = 1, this._timer = null, this.video = this.domElement;
  }
  async play() {
    gs.apply(this);
  }
  async pause() {
    ms.apply(this);
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
    this._currentTime = e, Nt.apply(this, [e]);
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
    return this._sources = e.sources.image, this._qualities = this._sources.map((t) => new te({
      src: t.frames[0].src,
      label: `${t.res.w}x${t.res.h}`,
      shortLabel: `${t.res.h}p`,
      width: t.res.w,
      height: t.res.h
    })), this._currentQuality = this._qualities.length - 1, this._qualities.forEach((t, s) => {
      this._qualities[this._currentQuality].compare(t) > 0 && (this._currentQuality = s);
    }), this._currentSource = this._sources[this._currentQuality], this._sources.forEach((t) => {
      t.frames.sort((s, n) => s.time - n.time);
    }), !0;
  }
}
class ys extends re {
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
    return new fs(this.player, e, this.config, t);
  }
}
const we = (i) => {
  var e, t, s;
  return `alt:${((e = i.keyModifiers) == null ? void 0 : e.altKey) || !1}, ctrl:${((t = i.keyModifiers) == null ? void 0 : t.ctrlKey) || !1}, shift:${((s = i.keyModifiers) == null ? void 0 : s.shiftKey) || !1}`;
}, _s = (i) => `${i.keyCode}_${we(i)}`, vs = (i) => {
  i.keyModifiers = i.keyModifiers || {}, i.keyModifiers.altKey = i.keyModifiers.altKey || !1, i.keyModifiers.shiftKey = i.keyModifiers.shiftKey || !1, i.keyModifiers.ctrlKey = i.keyModifiers.ctrlKey || !1;
}, ws = (i) => {
  const e = [];
  for (const t in i.__shortcuts__)
    i.__shortcuts__[t].forEach((n) => {
      n.disabled || e.push(n);
    });
  return e;
};
async function Cs(i) {
  if (i.__shortcuts__ = i.__shortcuts__ || {}, !window.__paella_shortcuts_player__)
    window.__paella_shortcuts_player__ = i;
  else {
    i.log.warn("Warning: more than one paella player instance with enabled shortcut plugins."), i.log.warn("Check your code to ensure that only one instance of paella player registers keyboard shortcut plugins.");
    return;
  }
  await R(i, "keyshortcut", async (e) => {
    (await e.getKeys()).forEach((n) => {
      i.__shortcuts__[n.keyCode] = i.__shortcuts__[n.keyCode] || [], n.plugin = e, i.__shortcuts__[n.keyCode].push(n);
    });
    const s = await e.getDictionaries();
    for (const n in s) {
      const a = s[n];
      i.addDictionary(n, a);
    }
    for (const n in i.__shortcuts__) {
      const a = i.__shortcuts__[n], r = {};
      a.length > 0 && a.forEach((o) => {
        const l = _s(o);
        if (vs(o), !r[l])
          r[l] = o;
        else {
          i.log.warn(`Collision detected in shortcut for key code ${n}`);
          const c = r[l];
          i.log.warn("Enabled shortcut:"), i.log.warn(`plugin: ${c.plugin.name}, keyCode: ${c.keyCode}, modifiers: ${we(c)}, description: ${c.description}`), i.log.warn("Collision shortcut (disabled):"), i.log.warn(`plugin: ${o.plugin.name}, keyCode: ${o.keyCode}, modifiers: ${we(o)}, description: ${o.description}`), o.disabled = !0;
        }
      });
    }
  }), i.__paella_key_event_listener__ = async (e) => {
    var r, o;
    const t = () => document.activeElement && document.activeElement !== document.body && !/video/i.test(document.activeElement.tagName);
    if (!i.containerElement.contains(document.activeElement) && !D.Contains(document.activeElement) && document.activeElement !== document.body)
      return;
    const s = document.activeElement;
    if (/input/i.test(s.tagName) && /range/i.test(s.type) && /Arrow/i.test(e.code) || (((r = i.config.accessibility) == null ? void 0 : r.clickWithSpacebar) !== void 0 ? (o = i.config.accessibility) == null ? void 0 : o.clickWithSpacebar : !0) && e.code === "Space" && t())
      return;
    const a = i.__shortcuts__[e.code];
    a && await a.forEach(async (l) => {
      var p, y, _, m, g, d;
      const c = !((p = l.keyModifiers) != null && p.altKey) || ((y = l.keyModifiers) == null ? void 0 : y.altKey) && e.altKey, h = !((_ = l.keyModifiers) != null && _.ctrlKey) || ((m = l.keyModifiers) == null ? void 0 : m.ctrlKey) && e.ctrlKey, u = !((g = l.keyModifiers) != null && g.shiftKey) || ((d = l.keyModifiers) == null ? void 0 : d.shiftKey) && e.shiftKey;
      c && h && u && !l.disabled ? await l.action(e) : c && h && u && l.disabled && (i.log.warn("Shortcut not triggered due to collision:"), i.log.warn(`plugin: ${l.plugin.name}, keyCode: ${l.keyCode}, modifiers: ${we(l)}, description: ${l.description}`));
    });
  }, window.addEventListener("keyup", i.__paella_key_event_listener__);
}
async function bs(i) {
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
class Ls extends W {
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
const S = Object.freeze({
  TOP_LEFT: "topLeft",
  TOP_MIDDLE: "topMiddle",
  TOP_RIGHT: "topRight",
  CENTER_LEFT: "centerLeft",
  CENTER_MIDDLE: "centerMiddle",
  CENTER_RIGHT: "centerRight",
  BOTTOM_LEFT: "bottomLeft",
  BOTTOM_MIDDLE: "bottomMiddle",
  BOTTOM_RIGHT: "bottomRight"
}), F = (i, e, t, s, n) => {
  s = s || "", t = t || 1e3;
  const a = w(`
        <div class="message-content ${s}">
            ${i ? `<i class="icon">${i}</i>` : ""}
            ${e ? `<p class="text">${e}</p>` : ""}
        </div>
    `);
  return n.innerHTML = "", n.appendChild(a), n.timer && (clearTimeout(n.timer), n.timer = null), n.timer = setTimeout(() => {
    n.removeChild(a);
  }, t), a;
};
class Es extends M {
  constructor(e, t) {
    const s = { class: "video-container-message" };
    super(e, { attributes: s, parent: t }), this._topLeftContainer = w('<div class="container top-left"></div>', this.element), this._topMiddleContainer = w('<div class="container top-middle"></div>', this.element), this._topRightContainer = w('<div class="container top-right"></div>', this.element), this._centerLeftContainer = w('<div class="container center-left"></div>', this.element), this._centerMiddleContainer = w('<div class="container center-middle"></div>', this.element), this._centerRightContainer = w('<div class="container center-right"></div>', this.element), this._bottomLeftContainer = w('<div class="container bottom-left"></div>', this.element), this._bottomMiddleContainer = w('<div class="container bottom-middle"></div>', this.element), this._bottomRightContainer = w('<div class="container bottom-right"></div>', this.element);
  }
  show({ icon: e = null, text: t = "", timeout: s = 1e3, position: n = S.CENTER_MIDDLE, cssClass: a = "" }) {
    switch (n) {
      case S.TOP_LEFT:
        F.apply(this, [e, t, s, a, this._topLeftContainer]);
        break;
      case S.TOP_MIDDLE:
        F.apply(this, [e, t, s, a, this._topMiddleContainer]);
        break;
      case S.TOP_RIGHT:
        F.apply(this, [e, t, s, a, this._topRightContainer]);
        break;
      case S.CENTER_LEFT:
        F.apply(this, [e, t, s, a, this._centerLeftContainer]);
        break;
      case S.CENTER_MIDDLE:
        F.apply(this, [e, t, s, a, this._centerMiddleContainer]);
        break;
      case S.CENTER_RIGHT:
        F.apply(this, [e, t, s, a, this._centerRightContainer]);
        break;
      case S.BOTTOM_LEFT:
        F.apply(this, [e, t, s, a, this._bottomLeftContainer]);
        break;
      case S.BOTTOM_MIDDLE:
        F.apply(this, [e, t, s, a, this._bottomMiddleContainer]);
        break;
      case S.BOTTOM_RIGHT:
        F.apply(this, [e, t, s, a, this._bottomRightContainer]);
        break;
    }
  }
}
const Ps = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 34 31" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="volume-mute" serif:id="volume mute" transform="matrix(1,0,0,1,-123,-4.71142)">
        <path d="M142,28.522L142,31.68C142,32.961 140.961,34 139.68,34L131.499,25L127.375,25C126.063,25 125,23.937 125,22.625L125,16.375C125,15.063 126.063,14 127.375,14L127.478,14L142,28.522ZM151.228,34.983L123,6.756L125.044,4.711L132.848,12.516L139.68,5C140.961,5 142,6.039 142,7.32L142,21.667L153.272,32.939L151.228,34.983Z"/>
    </g>
</svg>
`, Ss = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`, Ts = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`, Is = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`, v = Object.freeze({
  UNLOADED: 0,
  LOADING_MANIFEST: 1,
  MANIFEST: 2,
  LOADING_PLAYER: 3,
  LOADED: 4,
  UNLOADING_MANIFEST: 5,
  UNLOADING_PLAYER: 6,
  ERROR: 7
});
function Ae(i) {
  i.__timeLinePopUp || (i.__timeLinePopUp = {
    popUps: [],
    current: null
  });
}
class he extends M {
  static HideUserInterface(e) {
    if (Ae(e), e.__timeLinePopUp.current) {
      const t = e.__timeLinePopUp.current;
      e.__timeLinePopUp.current.hide(!0), e.__timeLinePopUp.current = t;
    }
  }
  static ShowUserInterface(e) {
    Ae(e), e.__timeLinePopUp.current && e.__timeLinePopUp.current.show(!0);
  }
  static HideAll(e) {
    var t;
    (t = e == null ? void 0 : e.__timeLinePopUp) == null || t.popUps.forEach((s) => s.hide());
  }
  static Unload(e) {
    e.__timeLinePopUp && (e.__timeLinePopUp.current && e.__timeLinePopUp.current.removeFromParent(), e.__timeLinePopUp.popUps.forEach((t) => {
      t.removeFromParent();
    }), e.__timeLinePopUp.popUps.slice(0), delete e.__timeLinePopUp);
  }
  constructor(e, t = null) {
    Ae(e);
    const s = {
      class: "timeline-popup-content"
    }, n = e.containerElement;
    super(e, { attributes: s, parent: n }), this._contextObject = t, e.__timeLinePopUp.popUps.forEach((a) => a.hide()), this._id = Symbol(this), e.__timeLinePopUp.popUps.push(this), e.__timeLinePopUp.current = this, C(this.player, f.SHOW_POPUP, {
      popUp: this,
      plugin: this.contextObject
    });
  }
  get contextObject() {
    return this._contextObject;
  }
  show(e = !1) {
    this.isVisible || (this.player.__timeLinePopUp.popUps.forEach((t) => t.hide()), super.show(), this.player.__timeLinePopUp.current = this, e !== !0 && C(this.player, f.SHOW_POPUP, {
      popUp: this,
      plugin: this.contextObject
    }));
  }
  hide(e = !1) {
    this.isVisible && (super.hide(), this.player.__timeLinePopUp.current = null, e !== !0 && C(this.player, f.HIDE_POPUP, {
      popUp: this,
      plugin: this.contextObject
    }));
  }
  setContent(e) {
    e && (this.element.innerHTML = "", this.element.appendChild(e));
  }
}
let Re = null;
class oe extends Ee {
  static Get() {
    return Re || (Re = new oe()), Re;
  }
  get moduleName() {
    return "paella-core default plugins";
  }
  get moduleVersion() {
    return fe.version;
  }
}
class xs extends Ls {
  getPluginModuleInstance() {
    return oe.Get();
  }
  get name() {
    return super.name || "es.upv.paella.defaultShortcuts";
  }
  getVolumeIcon(e) {
    return e === 0 ? this.player.getCustomPluginIcon(this.name, "volumeMuteIcon") || Ps : e < 0.3 ? this.player.getCustomPluginIcon(this.name, "volumeLowIcon") || Ss : e < 0.6 ? this.player.getCustomPluginIcon(this.name, "volumeMidIcon") || Ts : this.player.getCustomPluginIcon(this.name, "volumeHighIcon") || Is;
  }
  toggleCaptions() {
    var e, t, s;
    if (((s = (t = (e = this.player) == null ? void 0 : e.captionsCanvas) == null ? void 0 : t.captions) == null ? void 0 : s.length) > 0)
      if (this.player.captionsCanvas.isVisible)
        this.player.captionsCanvas.disableCaptions();
      else {
        let n = null;
        navigator.languages.some((a) => this.player.captionsCanvas.captions.some((r, o) => a == r.language ? (n = o, !0) : !1)), this.player.captionsCanvas.enableCaptions({ index: n || 0 });
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
      position: S.CENTER_LEFT,
      timeout: 500
    }) : this.player.videoContainer.message.show({
      text: `${e}s >>`,
      position: S.CENTER_RIGHT,
      timeout: 500
    });
  }
  async incrementVolume(e) {
    const t = await this.player.videoContainer.streamProvider.volume(), s = Math.min(Math.max(0, t + e * 0.01), 1);
    await this.player.videoContainer.setVolume(s);
    const n = this.getVolumeIcon(s);
    this.player.videoContainer.message.show({
      text: `${Math.round(s * 100)}%`,
      position: S.CENTER_MIDDLE,
      icon: n
    });
  }
  closePopUp() {
    var e;
    !D.HideTopPopUp() && !he.HideAll(this.player) && ((e = document.activeElement) == null || e.blur());
  }
  async decreaseSpeed() {
    const e = await this.player.videoContainer.playbackRate();
    let t = 0;
    this._validPlaybackRates.some((s) => {
      if (t === 0 && (t = s), s < e)
        t = s;
      else
        return !0;
    }), await this.player.videoContainer.setPlaybackRate(t), this.player.videoContainer.message.show({
      text: `${t}X`,
      position: S.CENTER_MIDDLE
    });
  }
  async increaseSpeed() {
    const e = await this.player.videoContainer.playbackRate();
    let t = 0;
    this._validPlaybackRates.some((s) => {
      if (s > e)
        return t = s, !0;
    }), t === 0 && (t = this._validPlaybackRates[this._validPlaybackRates.length - 1]), await this.player.videoContainer.setPlaybackRate(t), this.player.videoContainer.message.show({
      text: `${t}X`,
      position: S.CENTER_MIDDLE
    });
  }
  async toggleVolume() {
    const e = await this.player.videoContainer.volume();
    let t = 0;
    e > 0 ? (this._lastVolume = e, t = 0) : t = this._lastVolume || 1, await this.player.videoContainer.setVolume(t);
    const s = this.getVolumeIcon(t);
    this.player.videoContainer.message.show({
      text: `volume: ${Math.round(t * 100)}%`,
      position: S.CENTER_MIDDLE,
      icon: s
    });
  }
  async load() {
    this._validPlaybackRates = this.config.validPlaybackRates || [0.75, 1, 1.5, 2], this._validPlaybackRates.sort((e, t) => e - t);
  }
  async getKeys() {
    const e = this.player, t = this.config.skipBackwards || 30, s = this.config.skipForward || 30, n = () => e.state === v.LOADED;
    return [
      {
        keyCode: x.KeyM,
        description: "Toggle audio mute",
        keyModifiers: {
          ctrlKey: !1
        },
        action: async () => {
          n() && await this.toggleVolume();
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
          n() && await this.seek(-t);
        }
      },
      {
        keyCode: x.KeyL,
        get description() {
          return e.translate("Forward $1 seconds", [s]);
        },
        action: async () => {
          n() && await this.seek(s);
        }
      },
      {
        keyCode: x.Space,
        description: "Toggle play/pause",
        action: async () => {
          n() && await this.togglePlayPause();
        }
      },
      {
        keyCode: x.KeyF,
        description: "Toggle fullscreen",
        action: async () => {
          n() && await this.toggleFullscreen();
        }
      },
      {
        keyCode: x.KeyC,
        description: "Toggle captions",
        action: async () => {
          n() && this.toggleCaptions();
        }
      },
      {
        keyCode: x.ArrowLeft,
        get description() {
          return e.translate("Rewind $1 seconds", [t]);
        },
        action: async () => {
          n() && await this.seek(-t);
        }
      },
      {
        keyCode: x.ArrowRight,
        get description() {
          return e.translate("Forward $1 seconds", [s]);
        },
        action: async () => {
          n() && await this.seek(s);
        }
      },
      {
        keyCode: x.ArrowUp,
        description: "Volume up 10%",
        action: async () => {
          n() && this.incrementVolume(10);
        }
      },
      {
        keyCode: x.ArrowDown,
        description: "Volume down 10%",
        action: async () => {
          n() && this.incrementVolume(-10);
        }
      },
      {
        keyCode: x.Escape,
        description: "Close pop-up",
        action: async () => {
          n() && this.closePopUp();
        }
      },
      {
        keyCode: x.KeyU,
        description: "Decrease playback speed",
        action: async () => {
          n() && await this.decreaseSpeed();
        }
      },
      {
        keyCode: x.KeyO,
        description: "Increase playback speed",
        action: async () => {
          n() && this.increaseSpeed();
        }
      }
    ];
  }
}
async function ks(i) {
  const e = [];
  await R(i, "captions", async (t) => {
    e.push(t);
  });
  for (let t in e) {
    const n = await e[t].getCaptions(), a = i.captionsCanvas;
    n.forEach((r) => a.addCaptions(r));
  }
}
class Ot extends W {
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
class Ft {
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
  addCue({ label: e = "", start: t, end: s, captions: n }) {
    const a = {
      label: e
    };
    if (typeof n == "string")
      a.captions = [n];
    else if (Array.isArray(n))
      a.captions = n;
    else
      throw Error("Invalid cue caption format: must be an array of strings or a string");
    if (typeof t == "string")
      a.start = ve(t), a.startString = t;
    else if (typeof t == "number")
      a.start = t, a.startString = Oe(t);
    else
      throw Error("Invalid cue timestamp format: must be a valid time string or a number of seconds");
    if (typeof s == "string")
      a.end = ve(s), a.endString = s;
    else if (typeof s == "number")
      a.end = s, a.endString = Oe(s);
    else
      throw Error("Invalid cue timestamp format: must be a valid time string or a number of seconds");
    return this._cues.push(a), a;
  }
  getCue(e) {
    if (typeof e == "string")
      e = ve(e);
    else if (typeof e != "number")
      throw Error("Invalid time instant format getting cue");
    let t = null;
    return this._cues.some((s) => {
      if (e >= s.start && e <= s.end)
        return t = s, !0;
    }), t;
  }
}
function lt(i, e) {
  const t = {}, n = new DOMParser().parseFromString(e, "text/xml");
  return Array.from(n.getElementsByTagName("div")).forEach((a) => {
    const r = a.getAttribute("xml:lang") || "unknonw";
    t[r] = t[r] || new Ft(i.translate(r), r), Array.from(a.getElementsByTagName("p")).forEach((o) => {
      const l = Fe(o.getAttribute("begin"));
      t[r].addCue({
        label: `caption_${o.getAttribute("xml:id") || l}`,
        start: l / 1e3,
        end: Fe(o.getAttribute("end")) / 1e3,
        captions: o.innerHTML
      });
    });
  }), t;
}
class Ds {
  constructor(e, t = "") {
    this.player = e, this._text = t, this._captions = lt(this.player, t);
  }
  get text() {
    return this._text;
  }
  set text(e) {
    this._text = e, this._captions = lt(e);
  }
  get captions() {
    return this._captions;
  }
}
class As extends Ot {
  getPluginModuleInstance() {
    return oe.Get();
  }
  get name() {
    return super.name || "es.upv.paella.dfxpManifestCaptionsPlugin";
  }
  async isEnabled() {
    return await super.isEnabled() && this.player.videoManifest.captions && this.player.videoManifest.captions.length > 0;
  }
  async getCaptions() {
    const e = [], t = [];
    return this.player.videoManifest.captions.forEach((s) => {
      t.push(new Promise(async (n, a) => {
        if (/dfxp/i.test(s.format)) {
          const r = K(this.player, s.url), o = await fetch(r);
          if (o.ok) {
            let l = await o.text();
            l = l.replace(/[^\x09\x0A\x0D\x20-\xFF\x85\xA0-\uD7FF\uE000-\uFDCF\uFDE0-\uFFFD]/gm, ""), l = l.replace(/&\w+;/gmi, ""), l = l.replaceAll("<br>", "");
            const c = new Ds(this.player, l);
            Object.entries(c.captions).forEach(([h, u]) => {
              e.push(u);
            }), n();
          } else
            a();
        } else
          a();
      }));
    }), await Promise.allSettled(t), e;
  }
}
class qe extends W {
  constructor(e, t, s) {
    super(e, t, s), this.__uiPlugin = !0;
  }
  async getDictionaries() {
    return null;
  }
}
let Ye = "en", $t = "";
const se = {};
function Bt(i) {
  const e = se[Ye] || {}, t = se[$t] || {};
  return e[i] || t[i] || i;
}
function Ht(i) {
  Ye = i;
}
function Gt() {
  return Ye;
}
function zt(i, e) {
  se[i] = se[i] || {};
  for (const t in e) {
    const s = e[t];
    se[i][t] = s;
  }
}
function Kt() {
  return se;
}
function Wt(i) {
  return i.config.defaultLanguage || navigator.language;
}
let jt = Bt, Qt = Ht, Zt = Gt, qt = zt, Yt = Kt, Jt = Wt;
function ne(i, e = null) {
  const t = jt(i);
  if (Array.isArray(e)) {
    let s = t;
    return e.forEach((n, a) => {
      const r = `$${a + 1}`;
      s = s.replace(r, n);
    }), s;
  } else
    return t;
}
function ct(i) {
  Qt(i);
}
function Rs() {
  return Zt();
}
function pe(i, e) {
  qt(i, e);
}
function Ms() {
  return Yt();
}
function Xt(i) {
  return Jt(i);
}
function Us(i) {
  jt = i;
}
function Vs(i) {
  Qt = i;
}
function Ns(i) {
  Zt = i;
}
function Os(i) {
  qt = i;
}
function Fs(i) {
  Yt = i;
}
function $s(i) {
  Jt = i;
}
function Bs(i) {
  $t = Xt(i);
}
function ei(i) {
  return i.__tabIndex = i.__tabIndex || 0, ++i.__tabIndex, i.__tabIndex;
}
function ra(i) {
  return i.__tabIndex || 0;
}
async function me(i, e) {
  var c, h;
  const t = w("<li></li>", e);
  t.plugin = i;
  const s = i.tabIndex, n = ne(i.ariaLabel), a = ne(i.description), r = i.dynamicWidth ? "dynamic-width" : "fixed-width", o = i.id ? `id="${i.id}" ` : "", l = i.buttonName ? `name="${i.buttonName}" ` : "";
  if (i.interactive) {
    const u = w(`
			<button type="button" ${o}${l}class="${i.className} ${r} no-icon" tabindex="${s}" aria-label="${n}" title="${a}">
			</button>
		`, t);
    i._button = u, i._container = t, u._pluginData = i, t._pluginData = i, u.addEventListener("click", (d) => {
      const b = u._pluginData;
      b.closePopUps && b.popUp ? D.HideNonAncestors(b.popUp) : b.closePopUps && D.HideAllPopUps(!1), C(b.player, f.BUTTON_PRESS, {
        plugin: b
      }), b.action(d), d.stopPropagation(), d.pageX !== 0 && d.pageY !== 0 && document.activeElement.blur();
    });
    let p = null;
    const y = () => {
      p && (clearTimeout(p), p = null);
    }, _ = () => {
      y(), p = setTimeout(() => {
        i.leftSideContainerPresent && i.leftSideContainer.classList.add("hidden"), i.rightSideContainerPresent && i.rightSideContainer.classList.add("hidden"), p = null;
      }, 300);
    }, m = () => {
      y(), i.leftSideContainerPresent && i.leftSideContainer.classList.remove("hidden"), i.rightSideContainerPresent && i.rightSideContainer.classList.remove("hidden");
    };
    u.addEventListener("focus", m), u.addEventListener("mouseover", m), u.addEventListener("mouseout", _), u.addEventListener("blur", _), (((c = i.player.config.accessibility) == null ? void 0 : c.clickWithSpacebar) !== void 0 ? (h = i.player.config.accessibility) == null ? void 0 : h.clickWithSpacebar : !0) || (u.addEventListener("keyup", (d) => {
      d.keyCode == 32 && d.preventDefault();
    }), u.addEventListener("keydown", (d) => {
      d.keyCode == 32 && d.preventDefault();
    }));
  } else {
    const u = w(`
			<div ${o}${l} class="button-plugin ${i.className} non-interactive ${r} no-icon" title="${a}">
			</div>
		`, t);
    i._button = u, i._container = t, u._pluginData = i, t._pluginData = i;
  }
}
const ut = () => {
  const i = document.createElement("span");
  return i.classList.add("side-container"), i.classList.add("hidden"), i;
};
var H, G;
class ti extends qe {
  constructor() {
    super(...arguments);
    Te(this, H, null);
    Te(this, G, null);
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
    return ei(this.player);
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
  get icon() {
    return this._icon || (this._icon = ""), this._icon;
  }
  set icon(t) {
    if (this._icon = t, t) {
      const s = this._button.querySelector("i") || w("<i></i>", this._button);
      s.innerHTML = t;
    } else {
      const s = this._button.querySelector("i");
      s && this._button.removeChild(s);
    }
  }
  get title() {
    return this._title || "";
  }
  set title(t) {
    if (this._title = t, t) {
      const s = this._button.querySelector("span") || w(`<span class="button-title-${this.titleSize}"></span>`, this._button);
      s.innerHTML = t;
    } else {
      const s = this._button.querySelector("span");
      s && this._button.removeChild(s);
    }
  }
  // "small", "medium", "large"
  get titleSize() {
    return "medium";
  }
  // "left" or "right"
  get side() {
    var s;
    return ((s = this.config) == null ? void 0 : s.side) || "left";
  }
  get closePopUps() {
    return this.config.closePopUps || this.getClosePopUps();
  }
  getClosePopUps() {
    return !0;
  }
  // "playbackBar" or "videoContainer"
  get parentContainer() {
    var s;
    return ((s = this.config) == null ? void 0 : s.parentContainer) || "playbackBar";
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
    return O(this, H) || (Ie(this, H, ut()), this.container.appendChild(O(this, H))), O(this, H);
  }
  get leftSideContainerPresent() {
    return O(this, H) !== null;
  }
  get rightSideContainer() {
    return O(this, G) || (Ie(this, G, ut()), this.container.appendChild(O(this, G))), O(this, G);
  }
  get rightSideContainerPresent() {
    return O(this, G) !== null;
  }
  async action() {
    this.player.log.warn(`Action not implemented in button plugin ${this.name}`);
  }
  onResize({ width: t, height: s }) {
    t < this.minContainerSize ? this.hide() : this.show();
  }
}
H = new WeakMap(), G = new WeakMap();
const Hs = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 23 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="play" transform="matrix(1.36051e-16,0.480277,-0.550439,1.55927e-16,74.9184,-144.269)">
        <path d="M325.373,94.327L350.358,136.107L300.387,136.107L325.373,94.327Z"/>
    </g>
</svg>
`, Gs = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 24 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:1.41421;">
    <g id="pause" transform="matrix(1,0,0,0.956522,-48,-7.65217)">
        <path d="M64,8L72,8L72,31L64,31L64,8ZM48,8L56,8L56,31L48,31L48,8Z"/>
    </g>
</svg>
`, zs = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
class Ks extends ti {
  getPluginModuleInstance() {
    return oe.Get();
  }
  get name() {
    return super.name || "es.upv.paella.playPauseButton";
  }
  async load() {
    const e = this.player.getCustomPluginIcon(this.name, "play") || Hs, t = this.player.getCustomPluginIcon(this.name, "pause") || Gs, s = this.player.getCustomPluginIcon(this.name, "replay") || zs;
    this.icon = e, k(this.player, f.PLAY, () => {
      this.icon = t;
    }), k(this.player, f.PAUSE, () => {
      this.icon = e;
    }), k(this.player, f.ENDED, () => {
      this.icon = s;
    }), k(this.player, f.STOP, () => {
      this.icon = e;
    });
  }
  async action() {
    await this.player.paused() ? await this.player.videoContainer.play() : await this.player.videoContainer.pause();
  }
}
const dt = "(?:\\d*:){1,2}\\d*(?:\\.\\d+)?", Ws = `(${dt})\\s*\\-\\->\\s*(${dt})`, js = {
  cueTiming: new RegExp(Ws)
}, Qs = (i, e, t, s) => {
  const n = js.cueTiming.exec(e);
  if (n) {
    const a = s[t - 1], r = [];
    for (let o = 1; t + o < s.length && s[t + o] !== ""; ++o)
      r.push(s[t + o]);
    i.addCue({
      label: a,
      start: n[1],
      end: n[2],
      captions: r
    });
  }
};
function ht(i) {
  const e = new Ft();
  return i !== "" && (i = i.replace(/\r\n/gm, `
`), i = i.replace(/\r/gm, `
`), i.split(/\n/).forEach((t, s, n) => {
    Qs(e, t, s, n);
  })), e;
}
class Zs {
  constructor(e = "") {
    this._text = e, this._captions = ht(e);
  }
  get text() {
    return this._text;
  }
  set text(e) {
    this._text = e, this._captions = ht(e);
  }
  get captions() {
    return this._captions;
  }
}
class qs extends Ot {
  getPluginModuleInstance() {
    return oe.Get();
  }
  get name() {
    return super.name || "es.upv.paella.vttManifestCaptionsPlugin";
  }
  async isEnabled() {
    return await super.isEnabled() && this.player.videoManifest.captions && this.player.videoManifest.captions.length > 0;
  }
  async getCaptions() {
    const e = [], t = [];
    return this.player.videoManifest.captions.forEach((s) => {
      t.push(new Promise(async (n, a) => {
        if (/vtt/i.test(s.format)) {
          const r = K(this.player, s.url), o = await fetch(r);
          if (o.ok) {
            const l = await o.text(), c = new Zs(l);
            c.captions.label = s.text, c.captions.language = s.lang, e.push(c.captions), n();
          } else
            a();
        } else
          a();
      }));
    }), await Promise.allSettled(t), e;
  }
}
function Pe(i, e) {
  return ci(i, "layout").filter((s) => s.config && s.config.enabled && s.canApply(e));
}
function ii(i, e) {
  const t = Pe(i, e), s = [];
  return t.forEach((n) => {
    s.push(...n.getValidContentIds(e));
  }), s;
}
function Ys(i, e) {
  const t = [];
  return ci(i, "layout").filter((s) => {
    var n, a;
    if ((n = s.config) != null && n.enabled && ((a = s.config) != null && a.validContent))
      return s.config.validContent.every((r) => r.content.length === e);
  }).forEach((s) => s.config.validContent.forEach((n) => t.push(n.content))), t;
}
function si(i, e, t) {
  const s = Pe(i, e);
  let n = null;
  return s.some((a) => {
    if (a.getValidContentIds(e).indexOf(t) !== -1)
      return n = a, !0;
  }), n;
}
function Js(i, e) {
  const t = Pe(i, e), s = ii(i, e);
  let n = [];
  return t.forEach((a) => {
    n = [...n, ...a.config.validContent];
  }), n.filter((a) => s.indexOf(a.id) !== -1);
}
function ni(i, e, t, s = null) {
  const n = si(i, e, t);
  if (n) {
    const a = n.getLayoutStructure(e, t, s);
    return a.plugin = n, a;
  }
  return null;
}
class le extends qe {
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
    return this.validContent.forEach((s) => {
      s.content.every((n) => e.some((a) => n === a.content)) && t.push(s.id);
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
    return this.validContent.forEach((s) => {
      let n = [];
      s.content.every((a) => e.some((r) => {
        if (a === r.content)
          return n.push(r), !0;
      })) && t.push(n);
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
  getVideoCanvasButtons(e, t, s) {
    return [];
  }
}
function Xs(i) {
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
async function en(i, e) {
  const t = [];
  return await R(
    i,
    "canvasButton",
    async (s) => {
      i.log.debug(` Canvas button plugin: ${s.name}`), t.push(s);
    }
  ), t.filter((s) => s.content.indexOf(e.content) !== -1).map((s) => Xs(s));
}
class oa extends qe {
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
    return ei(this.player);
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
const $e = [];
async function tn(i) {
  await R(i, "canvas", (e) => {
    $e.push(e);
  });
}
async function sn(i) {
}
function nn(i, e) {
  if ($e.length === 0)
    throw Error("No canvas plugins loaded. Note that `loadCanvasPlugins()` must to be called before use `getCanvasPlugins()`");
  let t = null;
  return $e.some((s) => {
    if (s.isCompatible(e))
      return t = s, !0;
  }), t;
}
const L = Object.freeze({
  LEFT: "left",
  CENTER: "center",
  RIGHT: "right"
}), an = function({
  icon: i,
  tabIndex: e,
  ariaLabel: t,
  title: s,
  className: n,
  position: a = L.CENTER,
  click: r,
  content: o,
  name: l
}) {
  if (!i)
    throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'icon' attribute.");
  if (!r)
    throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'click' function.");
  let c = `class="align-${a}${n ? " " + n : ""}"`;
  t && (c += ` aria-label="${t}"`), s && (c += ` title="${s}"`), e !== void 0 && (c += ` tabindex="${e}"`), l !== void 0 && (c += ` name="${l}"`);
  const h = w(`
        <button ${c}><i class="button-icon" style="pointer-events: none">${i}</i></button>
    `);
  return this.buttonsArea.appendChild(h), h.addEventListener("click", async (u) => (await r(o), u.stopPropagation(), !1)), h;
}, Be = async (i, e, t, s, n) => {
  const a = e.plugin;
  let r = a.tabIndexStart;
  const o = await en(i, s), l = [];
  return [
    ...o,
    ...a.getVideoCanvasButtons(e, s.content, s, t)
  ].forEach((h) => {
    h.tabIndex = r++, h.content = n;
    const u = an.apply(t, [h]);
    l.push(u);
  }), l;
}, He = (i, e, t) => {
  let { tabIndexStart: s } = e.plugin;
  t.sort((n, a) => {
    const r = n.getBoundingClientRect().left, o = a.getBoundingClientRect().left;
    return r - o;
  }).forEach((n) => {
    n.setAttribute("tabindex", s++);
  });
};
class ai extends M {
  constructor(e, t, s) {
    super(t, { tag: e, parent: s }), this.element.className = "video-canvas", this._userArea = null, this._buttonsArea = w(`
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
class ri extends W {
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
let Me = null;
class Q extends Ee {
  static Get() {
    return Me || (Me = new Q()), Me;
  }
  get moduleName() {
    return "paella-core default video layouts";
  }
  get moduleVersion() {
    return fe.version;
  }
}
const Je = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(0.920758,0,0,0.920758,2.50561,1.21236)">
        <path d="M11.937,17.699L11.937,21.044C11.937,21.656 11.573,22.209 11.012,22.451C10.45,22.693 9.798,22.578 9.354,22.158L1.874,15.1C1.568,14.811 1.394,14.408 1.394,13.986C1.394,13.564 1.568,13.161 1.874,12.872L9.354,5.814C9.798,5.394 10.45,5.279 11.012,5.521C11.573,5.763 11.937,6.316 11.937,6.928L11.937,10.272L22.937,10.272C23.783,10.272 24.469,10.958 24.469,11.804L24.469,16.168C24.469,17.014 23.783,17.699 22.937,17.699L11.937,17.699ZM26.063,23.11L26.063,19.765C26.063,19.153 26.427,18.6 26.988,18.358C27.55,18.116 28.201,18.231 28.646,18.651L36.126,25.709C36.432,25.999 36.606,26.402 36.606,26.823C36.606,27.245 36.432,27.648 36.126,27.937L28.646,34.996C28.201,35.415 27.55,35.53 26.988,35.288C26.427,35.046 26.063,34.493 26.063,33.882L26.063,30.537L15.063,30.537C14.217,30.537 13.531,29.851 13.531,29.005L13.531,24.641C13.531,23.795 14.217,23.11 15.063,23.11L26.063,23.11Z"/>
    </g>
</svg>
`, Le = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g transform="matrix(-0.620305,0,0,0.839332,25.2077,0.462208)">
        <path d="M-20.625,8.591C-20.625,6.174 -17.975,4.215 -14.704,4.215L31.492,4.215C34.763,4.215 37.413,6.174 37.413,8.591L37.413,35.582C37.413,37.998 34.763,39.957 31.492,39.957L-14.704,39.957C-17.975,39.957 -20.625,37.998 -20.625,35.582L-20.625,8.591ZM1.285,12.825L8.1,7.789L-15.786,7.789L-15.786,25.442L-8.972,20.406L6.737,32.016L16.994,24.435L1.285,12.825Z" />
    </g>
</svg>
`, ye = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">
<svg width="100%" height="100%" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">
    <g>
        <path d="M18,13.029L18,26.971C18,27.509 17.786,28.025 17.406,28.406C17.025,28.786 16.509,29 15.971,29L3.029,29C2.491,29 1.975,28.786 1.594,28.406C1.214,28.025 1,27.509 1,26.971L1,13.029C1,12.491 1.214,11.975 1.594,11.594C1.975,11.214 2.491,11 3.029,11L15.971,11C16.509,11 17.025,11.214 17.406,11.594C17.786,11.975 18,12.491 18,13.029ZM39,13.029L39,26.971C39,27.509 38.786,28.025 38.406,28.406C38.025,28.786 37.509,29 36.971,29L24.029,29C23.491,29 22.975,28.786 22.594,28.406C22.214,28.025 22,27.509 22,26.971L22,13.029C22,12.491 22.214,11.975 22.594,11.594C22.975,11.214 23.491,11 24.029,11L36.971,11C37.509,11 38.025,11.214 38.406,11.594C38.786,11.975 39,12.491 39,13.029ZM21,7L21,33L19,33L19,7L21,7Z"/>
    </g>
</svg>
`, rn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
class pt extends le {
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
  getVideoCanvasButtons(e, t, s, n) {
    const a = this.player.getCustomPluginIcon(this.name, "iconMaximize") || Le, r = this.player.getCustomPluginIcon(this.name, "iconSideBySide") || ye, o = this.player.getCustomPluginIcon(this.name, "iconSwitchSide") || Je, l = this.player.getCustomPluginIcon(this.name, "iconClose") || ie, c = this.player.getCustomPluginIcon(this.name, "iconPiP") || rn, h = () => this._currentContent.find((_) => _.id === t), u = () => h().size === 25, p = () => h().size > 50, y = [];
    return u() || p() ? y.push({
      icon: r,
      position: L.LEFT,
      title: this.player.translate("Dual stream 50%"),
      ariaLabel: this.player.translate("Dual stream 50%"),
      name: this.name + ":iconSideBySide",
      click: async () => {
        this._currentContent.forEach((_) => {
          _.size = 50;
        }), await this.player.videoContainer.updateLayout();
      }
    }) : y.push({
      icon: a,
      position: L.LEFT,
      title: this.player.translate("Maximize video"),
      ariaLabel: this.player.translate("Maximize video"),
      name: this.name + ":iconMaximize",
      click: async () => {
        this._currentContent.forEach((_) => {
          _.size = _.id === t ? 75 : 25;
        }), await this.player.videoContainer.updateLayout();
      }
    }), this.allowSwitchSide && y.push({
      icon: o,
      position: L.LEFT,
      title: this.player.translate("Switch side"),
      ariaLabel: this.player.translate("Switch side"),
      name: this.name + ":iconSwitchSide",
      click: async () => {
        const _ = this._currentContent[0].id, m = this._currentContent[1].id, g = this._currentContent[0].size, d = this._currentContent[1].size;
        this._currentContent[0].id = m, this._currentContent[0].size = d, this._currentContent[1].id = _, this._currentContent[1].size = g, await this.player.videoContainer.updateLayout();
      }
    }), y.push({
      icon: l,
      position: L.RIGHT,
      title: this.player.translate("Close video"),
      ariaLabel: this.player.translate("Close video"),
      name: this.name + ":iconClose",
      click: async () => {
        const m = this.player.videoContainer.validContentIds.filter((g) => g.indexOf("-") === -1).find((g) => g != t);
        await this.player.videoContainer.setLayout(m);
      }
    }), this.pipContentIds.length > 0 && y.push({
      icon: c,
      position: L.LEFT,
      title: this.player.translate("Picture-in-picture"),
      ariaLabel: this.player.translate("Picture-in-picture"),
      name: this.name + ":iconPiP",
      click: async () => {
        const _ = this.player.videoContainer.validContentIds.find((m) => this.pipContentIds.indexOf(m) !== -1);
        await this.player.videoContainer.setLayout(_, t);
      }
    }), y;
  }
  getLayoutStructure(e, t, s) {
    if (!this._currentContent) {
      const { content: n } = this.validContent.find((a) => a.id === t);
      this._currentContent = n.map((a) => ({
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
const oi = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`;
let N = 0;
const Xe = [
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
function on(i) {
  return N = (N + 1) % Xe.length, et(i);
}
function ue(i, e) {
  return N = e < Xe.length ? e : N, et(i);
}
function et(i) {
  let e = JSON.parse(JSON.stringify(Xe[N]));
  return e.videos[0].content = i[0], e.videos[1].content = i[1], e;
}
class ln extends le {
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
    let e = z("dualVideoLayoutIndex");
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
    on(this._currentContent), await this.player.videoContainer.updateLayout();
  }
  async minimizeVideo(e) {
    let t = !0;
    if (e === this._currentContent[0]) {
      const s = this._currentContent[0], n = this._currentContent[1];
      this._currentContent[0] = n, this._currentContent[1] = s, t = !1;
    }
    N === 1 && t ? ue(this._currentContent, 2) : ue(this._currentContent, 1), await this.player.videoContainer.updateLayout();
  }
  async maximizeVideo(e) {
    let t = !0;
    if (e === this._currentContent[1]) {
      const s = this._currentContent[0], n = this._currentContent[1];
      this._currentContent[0] = n, this._currentContent[1] = s, t = !1;
    }
    N === 1 && t ? ue(this._currentContent, 2) : ue(this._currentContent, 1), await this.player.videoContainer.updateLayout();
  }
  async setSideBySide() {
    ue(this._currentContent, 0), await this.player.videoContainer.updateLayout();
  }
  get minimizedContent() {
    return N === 0 ? "" : this._currentContent[1];
  }
  async closeVideo(e) {
    const s = this.player.videoContainer.validContentIds.filter((n) => n.indexOf("-") === -1).find((n) => n != e);
    await this.player.videoContainer.setLayout(s);
  }
  getVideoCanvasButtons(e, t, s, n) {
    if (e.id === "side-by-side")
      return [
        // Swap
        {
          icon: this.player.getCustomPluginIcon(this.name, "iconRotate") || oi,
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
          icon: this.player.getCustomPluginIcon(this.name, "iconMaximize") || Le,
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
          icon: this.player.getCustomPluginIcon(this.name, "iconClose") || ie,
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
        icon: this.player.getCustomPluginIcon(this.name, "iconMaximize") || Le,
        position: L.LEFT,
        title: this.player.translate("Maximize video"),
        ariaLabel: this.player.translate("Maximize video"),
        name: this.name + ":iconMaximize",
        click: async () => {
          await this.switchContent();
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconSwitchSide") || Je,
        position: L.LEFT,
        title: this.player.translate("Place the video on the other side of the screen"),
        ariaLabel: this.player.translate("Place the video on the other side of the screen"),
        name: this.name + ":iconSwitchSide",
        click: async () => {
          await this.minimizeVideo(t);
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconClose") || ie,
        position: L.RIGHT,
        title: this.player.translate("Close video"),
        ariaLabel: this.player.translate("Close video"),
        name: this.name + ":iconClose",
        click: async () => {
          await this.closeVideo(t);
        }
      })) : (a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconMinimize") || bt,
        position: L.LEFT,
        title: this.player.translate("Minimize video"),
        ariaLabel: this.player.translate("Minimize video"),
        name: this.name + ":iconMinimize",
        click: async () => {
          await this.switchContent();
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconSideBySide") || ye,
        position: L.LEFT,
        title: this.player.translate("Put the videos side by side"),
        ariaLabel: this.player.translate("Put the videos side by side"),
        name: this.name + ":iconSideBySide",
        click: async () => {
          await this.setSideBySide();
        }
      }), a.push({
        icon: this.player.getCustomPluginIcon(this.name, "iconClose") || ie,
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
      const r = z("dualVideoLayoutContent0"), o = z("dualVideoLayoutContent1");
      r !== "" && o !== "" && this._currentContent.indexOf(r) !== -1 && this._currentContent.indexOf(o) !== -1 && (this._currentContent[0] = r, this._currentContent[1] = o);
    }
    const s = et(this._currentContent), n = {
      id: s.id,
      player: this.player,
      name: { es: "Dos streams con posición dinámica" },
      hidden: !1,
      videos: s.videos,
      buttons: []
    };
    return Y("dualVideoLayoutIndex", N), Y("dualVideoLayoutContent0", this._currentContent[0]), Y("dualVideoLayoutContent1", this._currentContent[1]), n;
  }
}
const gt = {
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
}, cn = {
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
class un extends le {
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
    this._currentLayout = gt, this.dualVideoContentIds = this.config.dualVideoContentIds || [];
  }
  getValidStreams(e) {
    return super.getValidStreams(e).filter((t) => t.length === 2);
  }
  getVideoCanvasButtons(e, t, s, n) {
    const a = this.player.getCustomPluginIcon(this.name, "iconClose") || ie, r = this.player.getCustomPluginIcon(this.name, "iconSwitchSide") || Je, o = this.player.getCustomPluginIcon(this.name, "iconMaximize") || Le, l = this.player.getCustomPluginIcon(this.name, "iconSideBySide") || ye, c = [
      {
        icon: a,
        position: L.RIGHT,
        title: this.player.translate("Close video"),
        ariaLabel: this.player.translate("Close video"),
        name: this.name + ":iconClose",
        click: async () => {
          const u = this.player.videoContainer.validContentIds.filter((p) => p.indexOf("-") === -1).find((p) => p !== t);
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
        const h = this.player.videoContainer.validContentIds, u = this.dualVideoContentIds.find((p) => h.indexOf(p) !== -1);
        u && this.player.videoContainer.setLayout(u);
      }
    }), c;
  }
  switchSide() {
    this._currentLayout.id === "pip-left" ? this._currentLayout = cn : this._currentLayout = gt;
  }
  switchSources() {
    const e = this._pipVideo;
    this._pipVideo = this._fullVideo, this._fullVideo = e;
  }
  getLayoutStructure(e, t, s) {
    const { content: n } = this.validContent.find((r) => r.id === t);
    s && n.find((r) => r === s) ? (this._fullVideo = s, this._pipVideo = n.find((r) => r !== s)) : (!this._pipVideo || !this._fullVideo) && (this._pipVideo = n[0], this._fullVideo = n[1]);
    const a = JSON.parse(JSON.stringify(this._currentLayout));
    return a.player = this.player, a.videos[0].content = this._fullVideo, a.videos[1].content = this._pipVideo, a;
  }
}
class dn extends le {
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
  getVideoCanvasButtons(e, t, s, n) {
    return this._multiStream ? [
      {
        icon: this.player.getCustomPluginIcon(this.name, "iconSideBySide") || ye,
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
    const s = this.validContent.find((a) => a.id === t), n = {
      player: this.player,
      name: { es: "One stream" },
      hidden: !1,
      videos: [
        {
          content: s.content[0],
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
    return e.length > 1 && (this._multiStream = !0), n;
  }
}
class hn extends le {
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
  getVideoCanvasButtons(e, t, s, n) {
    const a = this.player.getCustomPluginIcon(this.name, "iconSideBySide") || ye, r = [];
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
  getLayoutStructure(e, t, s) {
    e.length > 1 && (this._multiStream = !0);
    const { content: n } = this.validContent.find((a) => a.id === t);
    return this._currentContent = n.map((a) => ({
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
const pn = {
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
function gn(i) {
  let e = JSON.parse(JSON.stringify(pn));
  return e.videos[0].content = i[0], e.videos[1].content = i[1], e.videos[2].content = i[2], e;
}
class mn extends le {
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
    const e = this._currentContent[0], t = this._currentContent[1], s = this._currentContent[2];
    this._currentContent[0] = s, this._currentContent[1] = e, this._currentContent[2] = t, this.player.videoContainer.updateLayout();
  }
  getLayoutStructure(e, t) {
    if (!this._currentContent || this._currentContentId !== t) {
      this._currentContentId = t;
      const { content: a } = this.validContent.find((r) => r.id === t);
      this._currentContent = a;
    }
    const s = gn(this._currentContent);
    return {
      player: this.player,
      name: { es: "Three streams with dynamic position" },
      hidden: !1,
      videos: s.videos,
      buttons: [
        {
          rect: s.buttons[0].rect,
          onClick: () => {
            this.switchContent();
          },
          label: "Switch",
          icon: oi,
          layer: 2,
          ariaLabel: "Swap the position of the videos",
          title: "Swap the position of the videos"
        }
      ]
    };
  }
}
class fn extends ai {
  constructor(e, t) {
    super("div", e, t), this.element.classList.add("image-canvas");
  }
  async loadCanvas(e) {
    e.element.style.width = "100%", e.element.style.height = "100%";
  }
}
class yn extends ri {
  get name() {
    return super.name || "es.upv.paella.audioCanvas";
  }
  get canvasType() {
    return "audio";
  }
  getCanvasInstance(e) {
    return new fn(this.player, e);
  }
}
class _n extends ai {
  constructor(e, t) {
    super("div", e, t);
  }
  async loadCanvas(e) {
    e.element.style.width = "100%", e.element.style.height = "100%";
  }
}
class vn extends ri {
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
    return new _n(this.player, e);
  }
}
class li extends W {
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
class wn extends ae {
  constructor(e) {
    super(e), this._dataPlugins = {}, R(this.player, "data", async (t) => {
      var s;
      (s = t.context) == null || s.forEach((n) => {
        this._dataPlugins[n] = this._dataPlugins[n] || [], this._dataPlugins[n].push(t);
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
  async write(e, t, s) {
    const n = this.getDataPlugins(e);
    if (Array.isArray(n)) {
      let a = null;
      for (let r = 0; r < n.length; ++r)
        a = await n[r].write(e, t, s);
      return a;
    } else {
      if (n)
        return await n.write(e, t, s);
      this.player.log.warn(`No such data plugin found for context '${e}'`);
    }
  }
  async remove(e, t) {
    const s = this.getDataPlugins(e);
    if (s.length > 1) {
      let n = null;
      for (let a = 0; a < s.length; ++a)
        n = await s[a].remove(e, t);
      return n;
    } else
      return await s.remove(e, t);
  }
}
let Ue = null;
class Se extends Ee {
  static Get() {
    return Ue || (Ue = new Se()), Ue;
  }
  get moduleName() {
    return "paella-core default data plugins";
  }
  get moduleVersion() {
    return fe.version;
  }
}
class Cn extends li {
  getPluginModuleInstance() {
    return Se.Get();
  }
  get name() {
    return super.name || "es.upv.paella.cookieDataPlugin";
  }
  serializeKey(e, t) {
    return typeof t == "object" && (t = JSON.stringify(t)), `${e}|${t}`;
  }
  async read(e, t) {
    const s = this.serializeKey(e, t);
    let n = z(s);
    try {
      n = JSON.parse(n);
    } catch {
    }
    return this.player.log.debug(`CookieDataPlugin.read: ${s}`), n;
  }
  async write(e, t, s) {
    const n = this.serializeKey(e, t);
    if (s && typeof s == "object")
      try {
        s = JSON.stringify(s);
      } catch {
        this.player.log.warn(`CookieDataPlugin.write: ${n}: invalid data object.`), s = "";
      }
    Y(n, s), this.player.log.debug(`CookieDataPlugin.write: ${n}`);
  }
  async remove(e, t) {
    const s = this.serializeKey(e, t);
    Y(s, ""), this.player.log.debug(`CookieDataPlugin.remove: ${s}`);
  }
}
class bn extends li {
  getPluginModuleInstance() {
    return Se.Get();
  }
  get name() {
    return super.name || "es.upv.paella.localStorageDataPlugin";
  }
  serializeKey(e, t) {
    return typeof t == "object" && (t = JSON.stringify(t)), `${e}|${t}`;
  }
  async read(e, t) {
    const s = this.serializeKey(e, t);
    let n = localStorage.getItem(s);
    try {
      n = JSON.parse(n);
    } catch {
    }
    return this.player.log.debug(`LocalStorageDataPlugin.read: ${s}`), n;
  }
  async write(e, t, s) {
    const n = this.serializeKey(e, t);
    if (s && typeof s == "object")
      try {
        s = JSON.stringify(s);
      } catch {
        this.player.log.warn(`LocalStorageDataPlugin.write: ${n}: invalid data object.`), s = "";
      }
    localStorage.setItem(n, s), this.player.log.debug(`LocalStorageDataPlugin.write: ${n}`);
  }
  async remove(e, t) {
    const s = this.serializeKey(e, t);
    localStorage.setItem(s, ""), this.player.log.debug(`LocalStorageDataPlugin.remove: ${s}`);
  }
}
const Ln = [
  {
    plugin: as,
    config: {
      enabled: !1
    }
  },
  {
    plugin: ls,
    config: {
      enabled: !1
    }
  },
  {
    plugin: ds,
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
    plugin: ys,
    config: {
      enabled: !1
    }
  },
  {
    plugin: rs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: xs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: As,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Ks,
    config: {
      enabled: !1
    }
  },
  {
    plugin: qs,
    config: {
      enabled: !1
    }
  },
  {
    plugin: pt,
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
    plugin: un,
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
    plugin: hn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: pt,
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
    plugin: vn,
    config: {
      enabled: !1
    }
  },
  {
    plugin: Cn,
    config: {
      enabled: !1,
      context: ["default"]
    }
  },
  {
    plugin: bn,
    config: {
      enable: !0,
      context: ["default"]
    }
  }
];
function En() {
  const i = ["modal", "timeline", "no-modal"], e = () => this.player.log.warn(`Invalid popUpType set in "${this.name}" plugin. Alowed types are "modal", "timeline" and "no-modal"`);
  return i.indexOf(this.config.popUpType) !== -1 ? this.config.popUpType : i.indexOf(this.popUpType) !== -1 ? (this.config.popUpType && e(), this.popUpType) : (e(), "modal");
}
class Ge extends ti {
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
  async action() {
    await this.showPopUp();
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
    var s, n;
    const e = ((s = this.config.closeActions) == null ? void 0 : s.clickOutside) ?? !0, t = ((n = this.config.closeActions) == null ? void 0 : n.closeButton) ?? !1;
    return {
      clickOutside: e,
      closeButton: t
    };
  }
  async getContent() {
    return w("<p>Pop Up Button Plugin Content</p>");
  }
  get popUpType() {
    return this.config.popUpType || "modal";
  }
  hidePopUp() {
    this.closeParentPopUp ? D.HideAllPopUps(!1) : this._popUp && this._popUp.hide();
  }
  async showPopUp() {
    const e = this.player.isFullscreen ? this.player.containerElement : document.body;
    if (this._popUp)
      if (this.popUpType === "timeline" && this._popUp.isVisible)
        this._popUp.hide();
      else if (this._popUp.isVisible)
        this._popUp.hide();
      else {
        if (this.refreshContent) {
          const t = await this.getContent();
          this._popUp.setContent(t), this.refreshContent = !1;
        }
        this._popUp.show(e, this._parentPopUp);
      }
    else {
      this._popUp = null;
      const t = En.apply(this);
      if (t === "modal" || t === "no-modal") {
        const { clickOutside: n, closeButton: a } = this.closeActions;
        this._popUp = new D(this.player, e, this.button, this, t === "modal", this.moveable, this.resizeable, this.customPopUpClass), this._popUp.setCloseActions({ clickOutside: n, closeButton: a });
      } else
        t === "timeline" && (this._popUp = new he(this.player, this));
      const s = await this.getContent();
      this._popUp.title = this.menuTitle, this._popUp.setContent(s), this._popUp.show(e, this._parentPopUp), this.refreshContent = !1;
    }
  }
}
class Pn extends Ge {
  async load() {
    this._iconPath && (this.icon = await Lt(this._iconPath));
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
  async getContent() {
    const e = w('<div class="button-group"></div>');
    return this._firstItem = null, this._initialized || (this.player.log.debug(`Load button plugins into "${this.groupName}" container`), await R(this.player, "button", async (t) => {
      this.player.log.debug(` Button plugin: ${t.name}`);
      const s = w('<div class="button-plugin-wrapper"></div>', e);
      if (t instanceof Ge && (t.parentPopUp = this._popUp), await me(t, s), w(`<a class="button-description">${ne(t.description)}</a>`, s).addEventListener("click", (a) => {
        t.action(), a.stopPropagation();
      }), !this._firstItem) {
        const a = s.getElementsByTagName("button");
        this._firstItem = a && a[0];
      }
    }, async (t) => t.parentContainer === this.groupName ? await t.isEnabled() : !1), this._initialized = !0), e;
  }
  async showPopUp() {
    await super.showPopUp(), setTimeout(() => {
      this._firstItem && this._firstItem.focus();
    }, 50), this.buttons.forEach((e) => {
      e.style.display === "none" ? this.hideButtonContainer(e) : this.showButtonContainer(e);
    });
  }
  get buttons() {
    return Array.from(this.popUp.element.getElementsByClassName("button-plugin"));
  }
  hideButtonContainer(e) {
    var s;
    const t = (s = e.parentNode) == null ? void 0 : s.parentNode;
    t && (t.style.display = "none");
  }
  showButtonContainer(e) {
    var s;
    const t = (s = e.parentNode) == null ? void 0 : s.parentNode;
    t && (t.style.display = null);
  }
}
const tt = (i, e, t, s = {}) => {
  const n = new i(e, t);
  return t = n.name || t, t ? (e.config.plugins && e.config.plugins[t] && ge(s, e.config.plugins[t], !1), n._config = s, n) : (e.log.warn(`The instance of the ${i.name} plugin cannot be created because it is being loaded explicitly and does not have the name property implemented.`), null);
};
function it(i, e, t, s, n = !1) {
  const a = t.type;
  let r = -1;
  if (i.__pluginData__.pluginInstances[a] && i.__pluginData__.pluginInstances[a].find((l, c) => {
    if (l.name === t.name)
      return r = c, !0;
  }) && !n) {
    i.log.info(`Plugin ${t.name} of type ${a} already registered.`);
    return;
  }
  i.__pluginData__.pluginClasses[e] = s, i.__pluginData__.pluginInstances[a] = i.__pluginData__.pluginInstances[a] || [], r !== -1 && i.__pluginData__.pluginInstances[a].splice(r, 1), i.__pluginData__.pluginInstances[a].push(t), i.__pluginModules = i.__pluginModules || [];
  const o = t.getPluginModuleInstance();
  if (o && (o._player = o._player || i, !i.__pluginModules.find((l) => l.constructor.name === o.constructor.name))) {
    const l = o.moduleName, c = o.moduleVersion;
    i.log.debug(`Plugin module imported: ${l}: v${c}`), i.__pluginModules.push(o);
  }
}
function Sn(i, e) {
  let t = null, s = { enabled: !0 };
  if (typeof e == "function" ? t = e : typeof e == "object" && typeof e.plugin == "function" && (t = e.plugin, s = e.config), !t)
    i.log.warn("Error importing plugin with explicit import API. Check the 'plugins' array at init params");
  else {
    const n = tt(t, i, null, s);
    if (!n)
      i.log.warn(`Unable to create an instance of the plugin ${t.name}`);
    else {
      const a = n.constructor.name;
      it(i, a, n, t, !0);
    }
  }
}
function la(i, e) {
  const t = i.config;
  e.keys().forEach((s) => {
    const n = e(s), a = s.substring(2, s.length - 3);
    if (t.plugins[a]) {
      const r = n.default, o = tt(r, i, a, {});
      it(i, s, o, r, !1);
    } else if (/^[a-z0-9]+$/i.test(a)) {
      i.__pluginModules = i.__pluginModules || [];
      const r = n.default, o = new r(i);
      if (!i.__pluginModules.find((l) => l.constructor.name === o.constructor.name)) {
        const l = o.moduleName, c = o.moduleVersion;
        i.log.debug(`Plugin module imported: ${l}: v${c}`), i.__pluginModules.push(o);
      }
    }
  });
}
function Tn(i) {
  const e = i.config;
  if (i.__pluginData__ = i.__pluginData__ || {
    pluginClasses: [],
    pluginInstances: {}
  }, i.__pluginData__.pluginClasses.length !== 0)
    return;
  [
    ...Ln,
    ...i.initParams.plugins
  ].forEach((s) => {
    Sn(i, s);
  });
  const { buttonGroups: t } = e;
  t && t.forEach((s, n) => {
    const a = `button_group_${n}`, r = tt(Pn, i, a, s);
    r._iconPath = $([i.configResourcesUrl, s.icon]), it(i, r.type, r, `ButtonGroupPlugin${n}`, !1);
  }), i.log.debug("Plugins have been registered:");
}
function In(i) {
  delete i.__pluginData__;
}
function ci(i, e) {
  var t;
  return ((t = i.__pluginData__) == null ? void 0 : t.pluginInstances[e]) || [];
}
async function R(i, e, t = null, s = null) {
  if (!i.__pluginData__.pluginInstances[e]) {
    i.log.info(`There are no defined plugins of type '${e}'`);
    return;
  }
  i.__pluginData__.pluginInstances[e].sort((n, a) => n.order - a.order), i.__pluginData__.pluginInstances[e].forEach((n) => i.log.debug(`type: ${e}, name: ${n.name}`)), typeof s != "function" && (s = async function(n) {
    return await n.isEnabled();
  });
  for (const n in i.__pluginData__.pluginInstances[e]) {
    const a = i.__pluginData__.pluginInstances[e][n];
    if (await s(a)) {
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
async function ui(i, e) {
  var t;
  (t = i.__pluginData__.pluginInstances[e]) == null || t.forEach(async (s) => {
    await s.unload();
  });
}
function xn(i) {
  var t;
  const e = (s, n) => {
    if (!s)
      throw new Error(`Invalid video manifest: ${n}`);
  };
  e(i.streams, "missing 'streams' object."), e(i.streams.length > 0, "the 'streams' array is empty."), e((t = i.metadata) == null ? void 0 : t.preview, "the 'metadata.preview' field is required.");
}
class kn extends ae {
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
    this._streamData.length === 1 && (t = this._streamData[0].content), e.some((n) => {
      if (n.role === "mainAudio")
        return t = n.content, !0;
    }), this.player.log.debug("Finding compatible video plugins"), await tn(this.player);
    for (const n of this._streamData) {
      const a = nn(this.player, n);
      if (!a)
        throw Error(`Canvas plugin not found: ${n.canvas}`);
      const r = n.content === t, o = await Ni(this.player, n);
      if (!o)
        throw Error(`Incompatible stream type: ${n.content}`);
      this._streams[n.content] = {
        stream: n,
        isMainAudio: r,
        videoPlugin: o,
        canvasPlugin: a
      };
    }
    let s = null;
    for (const n in this._streams) {
      const a = this._streams[n];
      a.canvas = await a.canvasPlugin.getCanvasInstance(this._videoContainer), a.player = await a.videoPlugin.getVideoInstance(a.canvas.element, a.isMainAudio), t === n ? (this._mainAudioPlayer = a.player, a.player.initVolume(1)) : a.player.initVolume(0), await a.player.load(a.stream, this), await a.canvas.loadCanvas(a.player), a.player.onVideoEnded(() => {
        s === null && (ee(this.player, f.ENDED), s = setTimeout(() => {
          s = null;
        }, 2e3));
      }), this._players.push(a.player);
    }
    if (this.mainAudioPlayer === null)
      throw this.player.log.error("The video stream containing the audio track could not be identified. The `role` attribute must be specified in the main video stream, or the `defaultAudioStream` attribute must be set correctly in the player configuration."), new Error("The video stream containing the audio track could not be identified.");
  }
  async unload() {
    this.stopStreamSync(), await sn(this.player);
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
    var e, t, s;
    return ((e = this._trimming) == null ? void 0 : e.enabled) && ((t = this._trimming) == null ? void 0 : t.end) > ((s = this._trimming) == null ? void 0 : s.start);
  }
  get trimStart() {
    var e;
    return (e = this._trimming) == null ? void 0 : e.start;
  }
  get trimEnd() {
    var e;
    return (e = this._trimming) == null ? void 0 : e.end;
  }
  async setTrimming({ enabled: e, start: t, end: s }) {
    if (t >= s)
      throw Error(`Error setting trimming: start time (${t}) must be lower than end time ${s}`);
    this._trimming = {
      enabled: e,
      start: t,
      end: s
    };
    const n = await this.currentTime();
    ee(this.player, f.TIMEUPDATE, { currentTime: e ? t + n : n });
  }
  startStreamSync() {
    this._timeSync = !0;
    const e = async () => {
      if (!this._players.length) {
        this.player.log.warn("Player not yet loaded. Waiting for video sync.");
        return;
      }
      let t = this.mainAudioPlayer.currentTimeSync;
      const s = 0.2;
      if (this.players.length > 1)
        for (let n = 0; n < this.players.length; ++n) {
          const a = this.players[n];
          if (a !== this.mainAudioPlayer) {
            const r = a.currentTimeSync;
            Math.abs(t - r) > s && (this.player.log.debug("Video synchronization triggered"), a.setCurrentTime(t));
          }
        }
      if (this.isTrimEnabled) {
        let n = t - this.trimStart;
        if (this.trimEnd <= t) {
          await this.executeAction("pause"), await this.setCurrentTime(0), this.stopStreamSync(), t = 0, ee(this.player, f.ENDED, {});
          return;
        } else
          t < this.trimStart && (await this.setCurrentTime(0), t = this.trimStart, n = 0);
        ee(this.player, f.TIMEUPDATE, { currentTime: n }), this._timeupdateTimer = setTimeout(() => {
          this._timeSync && e();
        }, 250);
      } else
        this._timeSync && (ee(this.player, f.TIMEUPDATE, { currentTime: t }), this._timeupdateTimer = setTimeout(() => {
          e();
        }, 250));
    };
    e();
  }
  stopStreamSync() {
    this._timeSync = !1, this._timeupdateTimer && clearTimeout(this._timeupdateTimer);
  }
  executeAction(e, t = []) {
    return Array.isArray(t) || (t = [t]), new Promise((s) => {
      let n = [], a = [];
      this.players.forEach((r) => {
        a.push(new Promise((o) => {
          r[e](...t).then((l) => {
            n.push(l), o();
          });
        }));
      }), Promise.allSettled(a).then(() => s(n));
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
    const s = (await this.executeAction("currentTime"))[0];
    let n = null;
    if (this.isTrimEnabled) {
      e = e + this.trimStart, e = e >= this.trimEnd ? this.trimEnd : e;
      const r = (await this.executeAction("setCurrentTime", [e]))[0], o = (await this.executeAction("currentTime"))[0];
      n = {
        result: r,
        prevTime: s - this.trimStart,
        newTime: o - this.trimStart
      };
    } else {
      const r = (await this.executeAction("setCurrentTime", [e]))[0], o = (await this.executeAction("currentTime"))[0];
      n = { result: r, prevTime: s, newTime: o };
    }
    const a = await this.currentTime();
    return ee(this.player, f.TIMEUPDATE, { currentTime: a }), n;
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
      for (const s in this.streams) {
        const n = this.streams[s], a = await n.player.getQualities() || [];
        !e && a.length > t.length && (t = a, e = n.player);
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
    const s = await (await this.getQualityReferencePlayer()).getQualities(), n = s.length;
    let a = -1;
    if (s.some((r, o) => (e.index === r.index && (a = o), a !== -1)), a >= 0) {
      const r = a / n;
      for (const o in this.streams) {
        const l = this.streams[o], c = await l.player.getQualities() || [];
        if (this.player.log.debug(c), c.length > 1) {
          const h = Math.round(c.length * r), u = c[h];
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
function Dn(i, e) {
  return Array.isArray[e] || (e = [e]), Vi(i, e).getManifestData(e);
}
async function An(i) {
  return { w: 1280, h: 720 };
}
async function di(i) {
  var e;
  for (const t in this.streamProvider.streams) {
    const s = ((e = i == null ? void 0 : i.videos) == null ? void 0 : e.find((a) => a.content === t)) != null, n = this.streamProvider.streams[t];
    s && !n.player.isEnabled ? await n.player.enable() : !s && n.player.isEnabled && await n.player.disable();
  }
}
function hi() {
  for (const i in this.streamProvider.streams) {
    const e = this.streamProvider.streams[i];
    e.canvas.element.style.display = "none", this._hiddenVideos.appendChild(e.canvas.element);
  }
}
async function Rn() {
  var c, h;
  const i = ni(this.player, this.streamProvider.streamData, this._layoutId, this._mainLayoutContent);
  await di.apply(this, [i]), hi.apply(this);
  const e = await An(this.player), t = this.elementSize, s = 100 / e.w, n = 100 / e.h, a = t.w / t.h, r = e.w / e.h, o = a > r ? { w: t.h * r, h: t.h } : { w: t.w, h: t.w / r };
  if (this.baseVideoRect.style.width = o.w + "px", this.baseVideoRect.style.height = o.h + "px", this.baseVideoRect.classList.remove("dynamic"), (c = i == null ? void 0 : i.videos) != null && c.length) {
    const u = [];
    for (const p of i.videos) {
      const y = this.streamProvider.streams[p.content], { stream: _, player: m, canvas: g } = y, d = await m.getDimensions(), b = d.w / d.h;
      let A = Number.MAX_VALUE, E = null;
      g.buttonsArea.innerHTML = "", u.push(await Be(this.player, i, g, p, p.content)), p.rect.forEach((J) => {
        const Z = /^(\d+.?\d*)\/(\d+.?\d*)$/.exec(J.aspectRatio), X = Z ? Number(Z[1]) / Number(Z[2]) : 1, B = Math.abs(b - X);
        B < A && (E = J, A = B);
      }), g.element.style.display = "block", g.element.style.position = "absolute", g.element.style.left = `${(E == null ? void 0 : E.left) * s}%`, g.element.style.top = `${(E == null ? void 0 : E.top) * n}%`, g.element.style.width = `${(E == null ? void 0 : E.width) * s}%`, g.element.style.height = `${(E == null ? void 0 : E.height) * n}%`, g.element.style.zIndex = p.layer, this.baseVideoRect.appendChild(g.element);
    }
    setTimeout(() => {
      He(this.player, i, u.flat());
    }, 100);
  }
  const l = this.baseVideoRect.getElementsByClassName("video-layout-button");
  return Array.from(l).forEach((u) => this.baseVideoRect.removeChild(u)), (h = i == null ? void 0 : i.buttons) == null || h.forEach((u) => {
    const p = Ct({
      tag: "button",
      attributes: {
        class: "video-layout-button",
        "aria-label": ne(u.ariaLabel),
        title: ne(u.title),
        style: `
                    left: ${u.rect.left * s}%;
                    top: ${u.rect.top * n}%;
                    width: ${u.rect.width * s}%;
                    height: ${u.rect.height * n}%;
                    z-index: ${u.layer};
                `
      },
      parent: this.baseVideoRect,
      children: u.icon
    });
    p.layout = i, p.buttonAction = u.onClick, p.addEventListener("click", async (y) => {
      C(this.player, f.BUTTON_PRESS, {
        plugin: i.plugin,
        layoutStructure: i
      }), await y.target.buttonAction.apply(y.target.layout), y.stopPropagation();
    }), this._layoutButtons.push(p);
  }), !0;
}
async function Mn() {
  var r, o, l, c, h, u;
  const i = ni(this.player, this.streamProvider.streamData, this._layoutId, this._mainLayoutContent);
  await di.apply(this, [i]), hi.apply(this), this.baseVideoRect.style.width = "", this.baseVideoRect.style.height = "", this.baseVideoRect.style.display = "flex", this.baseVideoRect.classList.add("dynamic"), this.baseVideoRect.innerHTML = "";
  const e = this.element.clientWidth, t = this.element.clientHeight, s = e > t;
  if (this.baseVideoRect.classList.remove("align-center"), this.baseVideoRect.classList.remove("align-top"), this.baseVideoRect.classList.remove("align-bottom"), this.baseVideoRect.classList.remove("align-left"), this.baseVideoRect.classList.remove("align-right"), s) {
    const p = ((o = (r = this.player.config.videoContainer) == null ? void 0 : r.dynamicLayout) == null ? void 0 : o.landscapeVerticalAlignment) || "align-center";
    this.baseVideoRect.classList.remove("portrait"), this.baseVideoRect.classList.add("landscape"), this.baseVideoRect.classList.add(p);
  } else {
    const p = ((c = (l = this.player.config.videoContainer) == null ? void 0 : l.dynamicLayout) == null ? void 0 : c.portraitHorizontalAlignment) || "align-center";
    this.baseVideoRect.classList.add("portrait"), this.baseVideoRect.classList.remove("landscape"), this.baseVideoRect.classList.add(p);
  }
  const n = this.baseVideoRect.clientWidth, a = this.element.clientHeight;
  if (((h = i == null ? void 0 : i.videos) == null ? void 0 : h.length) === 1) {
    const p = [], y = [], _ = i.videos[0], m = this.streamProvider.streams[_.content], { player: g, canvas: d } = m;
    d.buttonsArea.innerHTML = "", y.push(await Be(this.player, i, d, _, _.content)), d.element.style = {}, d.element.style.display = "block", d.element.style.width = "100%", d.element.style.height = "100%", d.element.style.overflow = "hidden", d.element.style.position = "relative", p.push(d.element), d.element.sortIndex = 0, p.forEach((b) => this.baseVideoRect.appendChild(b)), setTimeout(() => {
      He(this.player, i, y.flat());
    }, 100);
  } else if ((u = i == null ? void 0 : i.videos) != null && u.length) {
    let p = 0;
    const y = [], _ = [];
    for (const m of i.videos) {
      const g = this.streamProvider.streams[m.content], { player: d, canvas: b } = g, A = await d.getDimensions(), E = A.w / A.h, J = n, Z = a, X = (s ? J : Z) * m.size / 100;
      let B = Math.round(s ? X : X * E), ce = Math.round(s ? X / E : X);
      B > J && (B = J, ce = Math.round(B / E)), ce > Z && (ce = Z, B = Math.round(ce * E)), b.buttonsArea.innerHTML = "", _.push(await Be(this.player, i, b, m, m.content)), b.element.style = {}, b.element.style.display = "block", b.element.style.width = `${B}px`, b.element.style.height = `${ce}px`, b.element.style.overflow = "hidden", b.element.style.position = "relative", b.element.sortIndex = p++, y.push(b.element);
    }
    if (s) {
      const m = w('<div class="landscape-container"></div>', this.baseVideoRect);
      y.forEach((g) => m.appendChild(g));
    } else
      y.forEach((m) => this.baseVideoRect.appendChild(m));
    setTimeout(() => {
      He(this.player, i, _.flat());
    }, 100);
  }
  return !0;
}
class Un extends M {
  constructor(e, t) {
    var r;
    const s = "base-video-rect", n = {
      class: "video-container"
    };
    (r = e.config.videoContainer) != null && r.overPlaybackBar && (n.class += " over-playback-bar");
    const a = `
            <div class="${s}"></div>
            <div class="hidden-videos-container" style="display: none"></div>
        `;
    super(e, { attributes: n, children: a, parent: t }), this._hiddenVideos = this.element.getElementsByClassName("hidden-videos-container")[0], this._baseVideoRect = this.element.getElementsByClassName(s)[0], this.element.addEventListener("click", async () => {
      await this.paused() ? await this.play() : await this.pause();
    }), this._ready = !1, this._players = [], this._streamProvider = new kn(this.player, this.baseVideoRect);
  }
  get layoutId() {
    return this._layoutId;
  }
  get mainLayoutContent() {
    return this._mainLayoutContent;
  }
  async setLayout(e, t = null) {
    var s, n;
    if (this.validContentIds.indexOf(e) === -1)
      return !1;
    {
      const a = (n = (s = this.player.config.videoContainer) == null ? void 0 : s.restoreVideoLayout) == null ? void 0 : n.global;
      await this.player.preferences.set("videoLayout", e, { global: a }), await this.player.preferences.set("videoLayoutMainContent", t, { global: a });
      const r = this._layoutId;
      this._layoutId = e, this._mainLayoutContent = t, await this.updateLayout(), r !== e && C(this.player, f.LAYOUT_CHANGED, { prevLayout: r, layoutId: e });
    }
  }
  get validContentIds() {
    return this._validContentIds;
  }
  get validContentSettings() {
    return this._validContentSettings;
  }
  get validLayouts() {
    return Pe(this.player, this.streamData);
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
    this._baseVideoRect.style.display = "none", await R(this.player, "layout"), await Mi(this.player);
  }
  async load(e) {
    var o, l, c, h, u, p, y, _, m, g;
    if (this._streamData = e, (l = (o = this.player.config.videoContainer) == null ? void 0 : o.restoreVideoLayout) != null && l.enabled) {
      const d = (h = (c = this.player.config.videoContainer) == null ? void 0 : c.restoreVideoLayout) == null ? void 0 : h.global;
      this._layoutId = await this.player.preferences.get("videoLayout", { global: d }) || this.player.config.defaultLayout, this._mainLayoutContent = await this.player.preferences.get("videoLayoutMainContent", { global: d }) || null;
    } else
      this._layoutId = this.player.config.defaultLayout, this._mainLayoutContent = null;
    await this.streamProvider.load(e), this._validContentIds = ii(this.player, e), this._validContentSettings = Js(this.player, e), await this.updateLayout(null, !0);
    const t = w(
      '<div class="button-plugins left-side"></div>',
      this.element
    ), s = w(
      '<div class="button-plugins right-side"></div>',
      this.element
    );
    this._buttonPlugins = [t, s], this.player.log.debug("Loading videoContainer button plugins"), await R(this.player, "button", async (d) => {
      this.player.log.debug(` Button plugin: ${d.name}`), d.side === "left" ? await me(d, t) : d.side === "right" && await me(d, s);
    }, async (d) => d.parentContainer === "videoContainer" ? await d.isEnabled() : !1), this._baseVideoRect.style.display = "";
    const n = await this.player.preferences.get("volume", { global: !0 }), a = await this.player.preferences.get("playbackRate", { global: !0 }), r = await this.player.preferences.get("lastKnownTime", { global: !1 });
    if ((u = this.player.config.videoContainer) != null && u.restoreVolume && n !== null && n !== void 0 && await this.streamProvider.setVolume(n), (p = this.player.config.videoContainer) != null && p.restorePlaybackRate && a !== null && a !== void 0 && await this.streamProvider.setPlaybackRate(a), this.player.videoManifest.trimming && await this.player.videoContainer.setTrimming(this.player.videoManifest.trimming), (_ = (y = this.player.config.videoContainer) == null ? void 0 : y.restoreLastTime) != null && _.enabled && !this.streamProvider.isLiveStream) {
      const d = async () => {
        if (!await this.paused()) {
          const A = await this.currentTime();
          await this.player.preferences.set("lastKnownTime", A, { global: !1 });
        }
        setTimeout(d, 1e3);
      };
      if (r) {
        const b = await this.player.preferences.get("lastKnownTime", { global: !1 }), A = await this.duration(), E = (g = (m = this.player.config.videoContainer) == null ? void 0 : m.restoreLastTime) == null ? void 0 : g.remainingSeconds;
        A - b > E && await this.setCurrentTime(b);
      }
      d();
    }
    this._messageContainer = new Es(this.player, this.element), this._ready = !0;
  }
  async unload() {
    this.removeFromParent(), await ui(this.player, "layout"), await Ui(this.player), await this.streamProvider.unload();
  }
  // Return true if the layout this.layoutId is compatible with the current stream data.
  async updateLayout(e = null) {
    const t = arguments[1];
    if (e && (this._mainLayoutContent = e), !t && this.player.state !== v.LOADED)
      return;
    if (this._updateInProgress)
      return this.player.log.warn("Recursive update layout detected"), !1;
    this._updateInProgress = !0;
    let s = !0;
    this._layoutButtons = [], (!this._layoutId || this._validContentIds.indexOf(this._layoutId) === -1) && (this._layoutId = this.player.config.defaultLayout, this._mainLayoutContent = null, this._validContentIds.indexOf(this._layoutId) === -1 && (this._layoutId = this._validContentIds[0]), s = !1);
    const n = si(this.player, this.streamProvider.streamData, this._layoutId);
    return n.layoutType === "static" ? s = Rn.apply(this) : n.layoutType === "dynamic" && (s = Mn.apply(this)), this._updateInProgress = !1, s;
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
    return C(this.player, f.PLAY), e;
  }
  async pause() {
    const e = await this.streamProvider.pause();
    return C(this.player, f.PAUSE), e;
  }
  async stop() {
    this.streamProvider.stop(), C(this.player, f.STOP);
  }
  async paused() {
    return this.streamProvider.paused();
  }
  async setCurrentTime(e) {
    const t = await this.streamProvider.setCurrentTime(e);
    return C(this.player, f.SEEK, { prevTime: t.prevTime, newTime: t.newTime }), t.result;
  }
  async currentTime() {
    return this.streamProvider.currentTime();
  }
  async volume() {
    return this.streamProvider.volume();
  }
  async setVolume(e) {
    const t = await this.streamProvider.setVolume(e);
    return C(this.player, f.VOLUME_CHANGED, { volume: e }), await this.player.preferences.set("volume", e, { global: !0 }), t;
  }
  async duration() {
    return await this.streamProvider.duration();
  }
  async playbackRate() {
    return await this.streamProvider.playbackRate();
  }
  async setPlaybackRate(e) {
    const t = await this.streamProvider.setPlaybackRate(e);
    return C(this.player, f.PLAYBACK_RATE_CHANGED, { newPlaybackRate: e }), await this.player.preferences.set("playbackRate", e, { global: !0 }), t;
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
  async setTrimming({ enabled: e, start: t, end: s }) {
    const n = await this.streamProvider.setTrimming({
      enabled: e,
      start: t,
      end: s
    });
    return C(this.player, f.TRIMMING_CHANGED, {
      enabled: e,
      start: t,
      end: s
    }), n;
  }
  getVideoRect(e = null) {
    var s;
    let t = this.baseVideoRect;
    return typeof e == "string" && (t = (s = this.streamProvider.streams[e]) == null ? void 0 : s.canvas.element), {
      x: t == null ? void 0 : t.offsetLeft,
      y: t == null ? void 0 : t.offsetTop,
      width: t == null ? void 0 : t.offsetWidth,
      height: t == null ? void 0 : t.offsetHeight,
      element: t
    };
  }
  appendChild(e, t = null, s = 1) {
    if (t) {
      const { width: n, height: a } = this.getVideoRect();
      t.x = t.x * 100 / n, t.width = t.width * 100 / n, t.y = t.y * 100 / a, t.height = t.height * 100 / a, e.style.position = "absolute", e.style.left = `${t.x}%`, e.style.top = `${t.y}%`, e.style.width = `${t.width}%`, e.style.height = `${t.height}%`, s !== null && (e.style.zIndex = s);
    }
    return this.baseVideoRect.appendChild(e), e;
  }
  removeChild(e) {
    this.baseVideoRect.removeChild(e);
  }
}
const Vn = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
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
`, Nn = `
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
`, Ve = `
    width: 100%;
`, On = `
    position: absolute; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
`, Fn = `
    pointer-events: none;
    width: 20%;
    max-width: 400px;
    min-width: 100px;
    opacity: 0.6;
`, $n = `
    display: block;
    width: 20%;
    background: none;
    border: none;
    cursor: pointer;
`;
class Bn extends M {
  constructor(e, t, s, n) {
    const a = {
      class: "preview-container",
      style: Nn,
      role: "button",
      "aria-label": "Play video"
    };
    super(e, { attributes: a, parent: t }), this._img = w(`
        <div style="${Ve}">
            ${s ? `<img style="${Ve}" src="${s}" class="preview-image-landscape" alt=""/>` : ""}
            ${n ? `<img style="${Ve}" src="${n}" class="preview-image-portrait" alt=""/>` : ""}
            <div style="${On}">
                <button style="${$n}" role="button" aria-label="Play video">
                    <i class="preview-play-icon" style="${Fn}">${Vn}</i>
                </button>
            </div>
        </div>
        `, this.element), this.element.setAttribute("id", "playerContainerClickArea"), this.element.addEventListener("click", (l) => {
      e.play();
    });
    const r = s && n, o = () => {
      if (r) {
        const l = this.element.clientWidth / this.element.clientHeight, c = Array.from(this.element.getElementsByClassName("preview-image-landscape")), h = Array.from(this.element.getElementsByClassName("preview-image-portrait"));
        l >= 1 ? (c.forEach((u) => u.style.display = ""), h.forEach((u) => u.style.display = "none")) : (c.forEach((u) => u.style.display = "none"), h.forEach((u) => u.style.display = ""));
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
function mt({ container: i, duration: e = 1e3, currentTime: t = 0, precision: s = 100 }) {
  i.classList.add("progress-indicator"), i.innerHTML = `
        <div class="range-container">
            <div class="elapsed"></div>
            <div class="remaining"></div>
            <ul class="markers-container"></ul>
            <input type="range" min="0" max="${e * s}" value="${t * s}" class="slider">
        </div>
    `;
  const n = i.querySelector(".elapsed"), a = i.querySelector(".remaining"), r = i.querySelector(".slider");
  let o = !1, l = null;
  const c = {
    elapsed: n,
    remaining: a,
    range: r,
    markersContainer: i.querySelector(".markers-container"),
    addMarker({ time: h, duration: u }) {
      const p = document.createElement("li");
      p.style.left = `${h / u * 100}%`, this.markersContainer.appendChild(p);
    },
    updateRemaining() {
      const h = this.range.value / this.range.max * 100;
      this.elapsed.style.width = `${h}%`, this.remaining.style.width = `${100 - h}%`;
    },
    setDuration(h) {
      o || (this.range.max = h * s, this.updateRemaining());
    },
    setCurrentTime(h) {
      o || (this.range.value = h * s, this.updateRemaining());
    },
    onChange(h) {
      l = h;
    }
  };
  return r.addEventListener("pointerdown", () => {
    o = !0;
  }), r.addEventListener("pointerup", () => {
    o = !1, typeof l == "function" && l(r.value / s);
  }), r.addEventListener("input", () => {
    c.updateRemaining();
  }), c.updateRemaining(), c;
}
class Hn extends M {
  constructor(e, t) {
    var a;
    const s = ((a = e.config.progressIndicator) == null ? void 0 : a.inlineMode) ?? !1, n = { class: "playback-bar" };
    super(e, { attributes: n, parent: t }), this.element.addEventListener("mouseenter", () => It(e)), this.element.addEventListener("mouseleave", () => xt(e)), this._topContainer = w("<div></div>"), this._navContainer = w("<nav></nav>"), this._buttonPluginsLeft = w("<ul></ul>", this._navContainer), this._centerContainer = w("<div></div>", this._navContainer), this._buttonPluginsRight = w("<ul></ul>", this._navContainer), s ? this._progressIndicator = mt({ container: this._centerContainer }) : (this.element.appendChild(this._topContainer), this._progressIndicator = mt({ container: this._topContainer })), this._progressIndicator.onChange(async (r) => {
      await e.videoContainer.setCurrentTime(r);
    }), this.element.appendChild(this._navContainer), this.element.addEventListener("click", () => {
      D.HideAllPopUps(!1);
    }), this._enabled = !0;
  }
  get enabled() {
    return this._enabled;
  }
  set enabled(e) {
    this._enabled = e, this._enabled ? this.showUserInterface() : this.hide();
  }
  async load() {
    this._enabledPlugins = [], this.player.log.debug("Loading button plugins"), await R(this.player, "button", async (t) => {
      this.player.log.debug(` Button plugin: ${t.name}`), this._enabledPlugins.push(t), t.side === "left" ? await me(t, this.buttonPluginsLeft) : t.side === "right" && await me(t, this.buttonPluginsRight);
    }, async (t) => t.parentContainer === "playbackBar" ? await t.isEnabled() : !1);
    const e = await this.player.videoContainer.duration();
    this._progressIndicator.setDuration(e), this.player.frameList.frames.forEach((t) => {
      this._progressIndicator.addMarker({ time: t.time, duration: e });
    }), this.player.bindEvent([this.player.Events.TIMEUPDATE, this.player.Events.SEEK], (t) => {
      this._progressIndicator.setCurrentTime(t.newTime ?? t.currentTime);
    }), this.player.bindEvent(this.player.Events.TRIMMING_CHANGED, async (t) => {
      const s = t.end - t.start;
      this._progressIndicator.setDuration(s);
      const n = await this.player.videoContainer.currentTime();
      this._progressIndicator.setCurrentTime(n);
    }), this.onResize();
  }
  async unload() {
    this.removeFromParent(), await ui(this.player, "button"), this._buttonPluginsLeft.innerHTML = "", this._buttonPluginsRight.innerHTML = "";
  }
  hideUserInterface() {
    this.player.log.debug("Hide playback bar user interface"), this.hide();
  }
  showUserInterface() {
    var e;
    if (this._enabled) {
      const s = ((e = this.player.config.progressIndicator) == null ? void 0 : e.inlineMode) ?? !1 ? "flex" : "block";
      this.show(s), this.onResize();
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
const pi = [
  { maxWidth: 400, className: "size-s" },
  { maxWidth: 600, className: "size-m" },
  { maxWidth: 900, className: "size-l" },
  { maxWidth: 1100, className: "size-xl" },
  { className: "size-xxl" }
], Gn = (i) => pi.find((e) => e.maxWidth && e.maxWidth >= i || e.maxWidth === void 0).className;
class zn extends M {
  constructor(e, t) {
    const s = {
      class: "captions-canvas visible-ui"
    };
    super(e, { tag: "div", attributes: s, parent: t }), this._captionsContainer = w(`
            <div class="text-container">
            </div>
        `, this.element), this._captions = [], this.hide(), this._currentCaptions = null;
    const n = async (a) => {
      const o = (e.videoContainer.isTrimEnabled ? e.videoContainer.trimStart : 0) + (a.currentTime || a.newTime || 0);
      if (this._currentCaptions) {
        const l = this._currentCaptions.getCue(o);
        this._captionsContainer.innerHTML = "", l && l.captions.forEach((c) => {
          this._captionsContainer.innerHTML += c, this._captionsContainer.innerHTML += "<br/>";
        }), l ? this._captionsContainer.style.display = null : this._captionsContainer.style.display = "none", this.resize();
      }
    };
    k(this.player, f.TIMEUPDATE, n), k(this.player, f.SEEK, n), k(this.player, f.RESIZE, () => this.resize()), k(this.player, f.SHOW_UI, () => this.element.classList.add("visible-ui")), k(this.player, f.HIDE_UI, () => this.element.classList.remove("visible-ui"));
  }
  async load() {
    await ks(this.player);
  }
  unload() {
  }
  resize() {
    const e = Gn(this._captionsContainer.clientWidth);
    pi.forEach((t) => this.element.classList.remove(t.className)), this.element.classList.add(e);
  }
  addCaptions(e) {
    this._captions.push(e), C(this.player, f.CAPTIONS_CHANGED, { captions: this._captions });
  }
  get captions() {
    return this._captions;
  }
  get currentCaptions() {
    return this._currentCaptions;
  }
  getCaptions({ label: e, index: t, lang: s }) {
    if (e === void 0 && t === void 0 && s === void 0)
      throw Error("Could not find captions: you must specify the label, the index or the language");
    return t !== void 0 ? this._captions[t] : this._captions.find((n) => {
      if (e !== void 0)
        return n.label === e;
      if (s !== void 0)
        return n.language === s;
    });
  }
  enableCaptions(e) {
    const t = this.getCaptions(e);
    if (t !== this._currentCaptions && (this._currentCaptions = t, this.currentCaptions)) {
      const { language: s, label: n } = this.currentCaptions;
      C(this.player, f.CAPTIONS_ENABLED, { language: s, label: n });
    }
    this.show();
  }
  disableCaptions() {
    this.currentCaptions && C(this.player, f.CAPTIONS_DISABLED), this._currentCaptions = null, this.hide();
  }
}
async function Kn(i) {
  await R(i, "eventLog", async (e) => {
    e.events.forEach((t) => {
      k(i, t, async (s) => {
        await e.onEvent(t, s);
      });
    });
  });
}
async function Wn(i) {
}
class ca extends W {
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
const gi = (i) => !1, mi = (i) => i.description;
class jn {
  constructor(e, t) {
    this._player = e, this._cookieConsentData = e.config.cookieConsent || [], this._getConsentCallback = t.getConsent || gi, this._getDescriptionCallback = t.getDescription || mi, this._cookieConsentData.forEach((s) => {
      s.description = this._getDescriptionCallback(s);
    }), this.updateConsentData();
  }
  updateConsentData() {
    this._cookieConsentData.forEach((e) => {
      e.value = this._getConsentCallback(e.type) || e.required;
    }), C(this._player, f.COOKIE_CONSENT_CHANGED, { cookieConsent: this });
  }
  getConsentForType(e) {
    const t = this._cookieConsentData.find((s) => s.type === e);
    return (t == null ? void 0 : t.value) || !1;
  }
}
const P = Object.freeze({
  DISABLED: 0,
  ERROR: 1,
  WARN: 2,
  INFO: 3,
  DEBUG: 4,
  VERBOSE: 5
});
let fi = P.INFO;
const yi = (i, e = null) => {
  const t = typeof i == "string" ? P[i.toUpperCase()] : i;
  if (t < P.DISABLED || t > P.VERBOSE)
    throw Error(`setLogLevel: invalid log level ${t}`);
  e ? (e.__logSettings = e.__logSettings || {}, e.__logSettings.logLevel = t) : fi = t;
}, _i = (i = null) => i ? i.__logSettings.logLevel : fi, de = ({
  msg: i,
  level: e = P.INFO,
  player: t = null,
  context: s = "paella-core"
}) => {
  t && !t.__logSettings && yi(t, P.INFO);
  const n = _i(t);
  if (e < P.DISABLED)
    throw Error(`printMessage: invalid log level ${e}`);
  if (t && C(t, f.LOG, { severity: e, context: s, message: i, currentLogLevel: n }), e <= n)
    switch (e) {
      case P.ERROR:
        console.error(`${s} - Error: ${i}`);
        break;
      case P.WARN:
        console.warn(`${s} - Warning: ${i}`);
        break;
      case P.INFO:
        console.info(`${s} - Info: ${i}`);
        break;
      case P.DEBUG:
        console.debug(`${s} - Debug: ${i}`);
        break;
      case P.VERBOSE:
        console.log(`${s} - Verbose: ${i}`);
        break;
    }
}, q = {
  setLevel: (i, e = null) => {
    yi(i, e);
  },
  currentLevel: (i = null) => _i(i),
  error: (i, e = null, t = "paella-core") => {
    de({
      msg: i,
      level: P.ERROR,
      player: e,
      context: t
    });
  },
  warn: (i, e = null, t = "paella-core") => {
    de({
      msg: i,
      level: P.WARN,
      player: e,
      context: t
    });
  },
  info: (i, e = null, t = "paella-core") => {
    de({
      msg: i,
      level: P.INFO,
      player: e,
      context: t
    });
  },
  debug: (i, e = null, t = "paella-core") => {
    de({
      msg: i,
      level: P.DEBUG,
      player: e,
      context: t
    });
  },
  verbose: (i, e = null, t = "paella-core") => {
    de({
      msg: i,
      level: P.VERBOSE,
      player: e,
      context: t
    });
  }
};
class Qn {
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
    q.setLevel(e, this._player);
  }
  currentLevel() {
    return q.currentLevel(this._player);
  }
  error(e, t = null) {
    q.error(e, this._player, t || this._context);
  }
  warn(e, t = null) {
    q.warn(e, this._player, t || this._context);
  }
  info(e, t = null) {
    q.info(e, this._player, t || this._context);
  }
  debug(e, t = null) {
    q.debug(e, this._player, t || this._context);
  }
  verbose(e, t = null) {
    q.verbose(e, this._player, t || this._context);
  }
}
const ft = {}, Ne = '{ "global": {}, "videos": {} }';
async function yt() {
  switch (this.source.name) {
    case "cookie":
      try {
        return JSON.parse(z("preferences"));
      } catch {
        return JSON.parse(Ne);
      }
    case "dataPlugin":
      try {
        return await this.player.data.read(this.source.context, {}) || JSON.parse(Ne);
      } catch {
        return JSON.parse(Ne);
      }
  }
}
async function Zn(i) {
  switch (this.source.name) {
    case "cookie":
      At(this.player, this.source.consentType, "preferences", JSON.stringify(i));
      break;
    case "dataPlugin":
      await this.player.data.write(this.source.context, {}, i);
      break;
  }
}
class qn extends ae {
  constructor(e) {
    super(e);
    const { currentSource: t, sources: s } = e.config.preferences || {
      currentSource: "cookie",
      sources: {
        cookie: {
          consentType: "necessary"
        }
      }
    };
    if (this.source = s[t], this.source.name = t, this._loaded = !1, !this.source)
      throw Error("Invalid configuration in preferences. Check the configuration file.");
  }
  async set(e, t, { global: s = !1 } = {}) {
    const n = await yt.apply(this);
    s ? n.global[e] = t : (n.videos[this.player.videoId] = n.videos[this.player.videoId] || {}, n.videos[this.player.videoId][e] = t), await Zn.apply(this, [n]);
  }
  async get(e, { global: t = !1 } = {}) {
    const s = await yt.apply(this);
    return t ? s.global[e] : s.videos[this.player.videoId] && s.videos[this.player.videoId][e] || void 0;
  }
}
function Yn(i) {
  var e;
  (e = this._skinData) != null && e.configOverrides && ge(i, this._skinData.configOverrides);
}
async function Jn() {
  var i;
  if ((i = this._skinData) != null && i.styleSheets) {
    const e = [];
    this._skinData.styleSheets.forEach((t) => {
      if (!/\{.*/.test(t))
        if (this._externalResourcesAllowed) {
          const s = $([this._skinUrl, t]);
          e.push(new Promise(async (n) => {
            await We(s, !1), n();
          }));
        } else
          throw new Error("No external resources allowed loading skin object");
    }), await Promise.allSettled(e);
  }
}
async function Xn() {
  var i;
  if (this.player.__skinStyleSheets__ = this.player.__skinStyleSheets__ || [], (i = this._skinData) != null && i.styleSheets) {
    const e = [];
    this._skinData.styleSheets.forEach((t) => {
      if (/\{.*/.test(t))
        e.push(new Promise((s) => {
          const n = document.createElement("style");
          n.innerHTML = t, this.player.__skinStyleSheets__.push(n), document.head.appendChild(n), s();
        }));
      else {
        const s = $([this._skinUrl, t]);
        e.push(new Promise(async (n) => {
          const a = await We(s);
          this.player.__skinStyleSheets__.push(a), n();
        }));
      }
    }), await Promise.allSettled(e);
  }
}
function _t() {
  this.player.__skinStyleSheets__ = this.player.__skinStyleSheets__ || [], this.player.__skinStyleSheets__.forEach((i) => {
    Rt(i);
  }), this.player.__skinStyleSheets__ = [];
}
async function ea() {
  var i;
  Array.isArray((i = this._skinData) == null ? void 0 : i.icons) && await Promise.all(this._skinData.icons.map(({ plugin: e, identifier: t, icon: s }) => new Promise(async (n, a) => {
    const r = document.createElement("div");
    if (r.innerHTML = s, r.children[0] && r.children[0].tagName === "svg")
      n();
    else if (this._externalResourcesAllowed) {
      const o = $([this._skinUrl, s]);
      (await fetch(o)).ok ? n() : a(new Error(`Skin icon not found at URL '${o}'`));
    } else
      throw new Error("No external resources allowed loading skin object");
  })));
}
async function ta() {
  var i;
  Array.isArray((i = this._skinData) == null ? void 0 : i.icons) && await Promise.all(this._skinData.icons.map(({ plugin: e, identifier: t, icon: s }) => new Promise(async (n, a) => {
    const r = document.createElement("div");
    if (r.innerHTML = s, r.children[0] && r.children[0].tagName === "svg")
      this.player.addCustomPluginIcon(e, t, s), n();
    else {
      const o = $([this._skinUrl, s]), l = await fetch(o);
      if (l.ok) {
        const c = await l.text();
        this.player.addCustomPluginIcon(e, t, c), n();
      } else
        a(new Error(`Skin icon not found at URL '${o}'`));
    }
  })));
}
class ia {
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
      await Jn.apply(this), await ea.apply(this), (this._player.state === v.LOADED || this._player.state === v.MANIFEST) && await this._player.reload();
    } catch (t) {
      throw this._skinUrl = "", this._externalResourcesAllowed = !0, this._skinData = {}, t;
    }
  }
  unloadSkin() {
    var e, t;
    Array.isArray((e = this._skinData) == null ? void 0 : e.icons) && ((t = this._skinData) == null || t.icons.forEach(({ plugin: s, identifier: n }) => {
      this.player.removeCustomPluginIcon(s, n);
    })), this._skinUrl = null, this._skinData = {}, (this._player.state === v.LOADED || this._player.state === v.MANIFEST) && this._player.reload();
  }
}
class sa {
  constructor(e, t) {
    this._player = t, this._videoManifest = JSON.parse(JSON.stringify(e)), this._metadata = this._videoManifest.metadata || {}, this._streams = {}, this._frameList = {}, this._trimming = this._videoManifest.trimming, this._captions = this._videoManifest.captions, this._visibleTimeLine = this._videoManifest.visibleTimeLine;
    function s() {
      if (this.streams.length !== 1)
        return null;
      if (this.isAudioOnly)
        return this.audioOnlySource.src;
      const n = this.streams[0];
      if (!(n.sources.mp4 || n.sources.hls || n.sources.hlsLive))
        return null;
      const r = document.createElement("video");
      if (n.sources.mp4 && n.sources.mp4.length && r.canPlayType(n.sources.mp4[0].mimetype || "video/mp4") === "probably")
        return n.sources.mp4[0].src;
      const o = n.sources.hls || n.sources.hlsLive;
      return o && o.length && r.canPlayType(o[0].mimetype || "application/vnd.apple.mpegurl") !== "" && /safari/i.test(navigator.userAgent) ? o[0].src : null;
    }
    this._streams = {
      streams: this._videoManifest.streams,
      get contents() {
        return this.streams.map((n) => n.content);
      },
      getStream(n) {
        return this.streams.find((a) => a.content === n);
      },
      getSourceTypes(n) {
        const a = this.getStream(n);
        return a && Object.keys(a.sources) || null;
      },
      getCanvasTypes(n) {
        const a = this.getStream(n);
        return a ? a.canvas || ["video"] : null;
      },
      get isAudioOnly() {
        const n = this.contents.length === 1 && this.contents[0], a = n && this.getCanvasTypes(n) || [], r = this.getStream(n);
        return a.length === 1 && a[0] === "audio" && r.sources.audio && r.sources.audio.length > 0;
      },
      get audioOnlySource() {
        return this.isAudioOnly ? this.getStream(this.contents[0]).sources.audio[0] : null;
      },
      get isNativelyPlayable() {
        return s.apply(this) !== null;
      },
      get nativeSource() {
        return s.apply(this);
      },
      get nativeType() {
        return this.isNativelyPlayable ? this.isAudioOnly ? "audio" : "video" : null;
      },
      get nativePlayer() {
        const n = this.nativeType;
        if (n) {
          const a = document.createElement(n);
          return a.src = this.nativeSource, a;
        } else
          return null;
      }
    }, this._videoManifest.frameList && !Array.isArray(this._videoManifest.frameList) && typeof this._videoManifest.frameList == "object" && typeof this._videoManifest.frameList.targetContent == "string" && Array.isArray(this._videoManifest.frameList.frames) ? this._frameList = this._videoManifest.frameList : Array.isArray(this._videoManifest.frameList) && (this._frameList = {
      targetContent: null,
      frames: this._videoManifest.frameList
    }), this._frameList.getImage = (n, a = !1) => {
      var r, o;
      return (r = this._player) != null && r.videoContainer && this._player._videoContainer.isTrimEnabled && !a ? n += this._player.videoContainer.trimStart : !((o = this._player) != null && o._videoContainer) && !a && console.warn("frameList.getImage(): player instance is null. The trimming information will be ignored."), [...this._frameList.frames].sort((l, c) => c.time - l.time).find((l) => l.time < n);
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
const U = Object.freeze([
  "UNLOADED",
  "LOADING_MANIFEST",
  "MANIFEST",
  "LOADING_PLAYER",
  "LOADED",
  "UNLOADING_MANIFEST",
  "UNLOADING_PLAYER",
  "ERROR"
]);
function vi() {
  var t, s, n, a, r, o, l, c;
  const i = ((s = (t = this.videoManifest) == null ? void 0 : t.metadata) == null ? void 0 : s.preview) && K(this, (a = (n = this.videoManifest) == null ? void 0 : n.metadata) == null ? void 0 : a.preview) || this.defaultVideoPreview, e = ((o = (r = this.videoManifest) == null ? void 0 : r.metadata) == null ? void 0 : o.previewPortrait) && K(this, (c = (l = this.videoManifest) == null ? void 0 : l.metadata) == null ? void 0 : c.previewPortrait) || this.defaultVideoPreviewPortrait;
  this._previewContainer = new Bn(this, this._containerElement, i, e);
}
async function vt() {
  this._playerState = v.LOADING_MANIFEST, this._manifestLoaded = !0, this.log.debug("Loading paella player"), this._config = await this.initParams.loadConfig(this.configUrl, this), Yn.apply(this.skin, [this._config]), Bs(this), this._defaultVideoPreview = this._config.defaultVideoPreview || this._initParams.defaultVideoPreview || "", this._defaultVideoPreviewPortrait = this._config.defaultVideoPreviewPortrait || this._initParams.defaultVideoPreviewPortrait || "", this._cookieConsent = new jn(this, {
    getConsent: this._initParams.getCookieConsentFunction,
    getDescription: this._initParams.getCookieDescriptionFunction
  }), this._preferences = new qn(this);
  const i = new URLSearchParams(window.location.search), e = new URLSearchParams();
  for (const [n, a] of i)
    e.append(n.toLowerCase(), a);
  const t = e.get("loglevel"), s = t && Array.from(Object.keys(P)).indexOf(t.toUpperCase()) !== -1 ? t : this._config.logLevel || "INFO";
  this._log.setLevel(s), await this._initParams.loadDictionaries(this), Tn(this), await Kn(this), await Cs(this), this._videoContainer = new Un(this, this._containerElement), await this.videoContainer.create();
  for (const n of this.pluginModules) {
    const a = n.getDictionaries && await n.getDictionaries();
    if (a)
      for (const r in a)
        pe(r, a[r]);
  }
}
async function wt() {
  var i, e;
  this.log.debug("Video manifest loaded:"), this.log.debug(this.videoManifest), this._data = new wn(this);
  for (const t in ft) {
    const s = ft[t];
    pe(t, s);
  }
  if (this._playerState = v.MANIFEST, C(this, f.MANIFEST_LOADED), (e = (i = this.videoManifest) == null ? void 0 : i.metadata) != null && e.preview)
    vi.apply(this);
  else
    throw new Error("No preview image found in video manifest, and no default preview image defined.");
  xn(this._videoManifest), __paella_instances__.length === 1 && (this._loadKeypressHandler = this._loadKeypressHandler || (async (t) => {
    /space/i.test(t.code) && await this.play();
  }), window.addEventListener("keypress", this._loadKeypressHandler, !0));
}
class ua {
  constructor(e, t = {}) {
    this._log = new Qn(this), this._packageData = fe, this._log.setLevel(P.VERBOSE), window.__paella_instances__ = window.__paella_instances__ || [], window.__paella_instances__.push(this), this.log.debug("New paella player instance"), typeof e == "string" && (e = document.getElementById(e)), e.classList.add("player-container"), this.log.debug("Loading skin manager"), this._skin = new ia(this), this._containerElement = e, this._initParams = t, this._initParams.manifestFileName = this._initParams.manifestFileName || "data.json", this._initParams.loadConfig = this._initParams.loadConfig || Si, this._initParams.getVideoId = this._initParams.getVideoId || Ti, this._initParams.getManifestUrl = this._initParams.getManifestUrl || Ii, this._initParams.getManifestFileUrl = this._initParams.getManifestFileUrl || xi, this._initParams.loadVideoManifest = this._initParams.loadVideoManifest || ki, this._initParams.customPluginContext = this._initParams.customPluginContext || [], this._initParams.translateFunction = this._initParams.translateFunction || Bt, this._initParams.getLanguageFunction = this._initParams.getLanguageFunction || Gt, this._initParams.setLanguageFunction = this._initParams.setLanguageFunction || Ht, this._initParams.addDictionaryFunction = this._initParams.addDictionaryFunction || zt, this._initParams.getDictionariesFunction = this._initParams.getDictionariesFunction || Kt, this._initParams.getDefaultLanguageFunction = this._initParams.getDefaultLanguageFunction || Wt, this._initParams.Loader = this._initParams.customLoader || Ai, this._initParams.getCookieConsentFunction = this._initParams.getCookieConsentFunction || gi, this._initParams.getCookieDescriptionFunction = this._initParams.getCookieDescriptionFunction || mi, this._initParams.loadDictionaries = this._initParams.loadDictionaries || async function(a) {
      pe("en", {
        Hello: "Hello",
        World: "World"
      }), pe("es", {
        Hello: "Hola",
        World: "Mundo"
      }), ct(navigator.language.substring(0, 2));
    };
    const s = this._initParams.plugins || [];
    this._initParams.plugins = [
      ...s
    ], Us(this._initParams.translateFunction), Vs(this._initParams.setLanguageFunction), Ns(this._initParams.getLanguageFunction), Os(this._initParams.addDictionaryFunction), Fs(this._initParams.getDictionariesFunction), $s(this._initParams.getDefaultLanguageFunction), this._config = null, this._defaultVideoPreview = "", this._defaultVideoPreviewPortrait = "", this._videoId = null, this._manifestUrl = null, this._manifestFileUrl = null, this._manifestData = null, this._videoManifest = null, this._playerLoaded = !1;
    const n = () => {
      this.resize();
    };
    window.addEventListener("resize", n), this.containerElement.addEventListener("fullscreenchange", () => {
      C(this, f.FULLSCREEN_CHANGED, { status: this.isFullscreen }), this.isFullscreen ? C(this, f.ENTER_FULLSCREEN) : C(this, f.EXIT_FULLSCREEN);
    }), this._playerState = v.UNLOADED, this._customPluginIcons = {};
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
    return this._playerState === v.LOADED;
  }
  get state() {
    return this._playerState;
  }
  get stateText() {
    return U[this.state];
  }
  get Events() {
    return f;
  }
  get preferences() {
    return this._preferences;
  }
  get skin() {
    return this._skin;
  }
  translate(e, t = null) {
    return ne(e, t);
  }
  setLanguage(e) {
    ct(e);
  }
  getLanguage() {
    return Rs();
  }
  addDictionary(e, t) {
    pe(e, t);
  }
  getDictionaries() {
    return Ms();
  }
  getDefaultLanguage() {
    return Xt(this);
  }
  bindEvent(e, t, s = !0) {
    k(this, e, (n) => t(n), s);
  }
  getShortcuts() {
    return ws(this);
  }
  getPlugin(e, t = null) {
    if (t) {
      const s = this.__pluginData__.pluginInstances[t];
      if (s)
        return s.find((n) => {
          if (n.name === e)
            return n;
        });
    } else {
      const s = {};
      for (const n in this.__pluginData__.pluginInstances) {
        const r = this.__pluginData__.pluginInstances[n].find((o) => {
          if (o.name === e)
            return o;
        });
        r && (s[n] = r);
      }
      return s;
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
    return v;
  }
  get PlayerStateNames() {
    return U;
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
    return new Promise((t, s) => {
      const n = () => {
        this.state === e ? t() : setTimeout(n, 50);
      };
      typeof e == "string" && (e = v[e]), (e < 0 || e > Object.values(v).length) && s(Error(`Invalid player state '${e}'`)), n();
    });
  }
  async loadUrl(e, { title: t, duration: s, preview: n, previewPortrait: a } = {}) {
    if (this._playerState !== v.UNLOADED)
      throw new Error(this.translate("loadUrl(): Invalid current player state: $1", [U[this._playerState]]));
    if (this._manifestLoaded)
      throw new Error(this.translate("loadUrl(): Invalid current player state: $1", [U[this._playerState]]));
    if (!e)
      throw new Error(this.translate("loadUrl(): No URL specified."));
    Array.isArray(e) || (e = [e]), t || (t = Ce(e[0]), this.log.warn("Paella.loadUrl(): no title specified. Using URL file name as video name."));
    try {
      if (await vt.apply(this), !n && (this.defaultVideoPreview !== "" || this.defaultVideoPreviewPortrait !== ""))
        n = this.defaultVideoPreview, a = this.defaultVideoPreviewPortrait, this.log.warn("Paella.loadUrl(): no preview image specified. Using default preview image.");
      else if (!n && !a)
        throw new Error("Paella.loadUrl(): no preview image specified and no default preview image configured.");
      this._videoId = Tt(Ce(e[0])), this._manifestUrl = ze(e[0]), this._manifestFileUrl = e[0], this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`);
      const r = Ys(this, e.length)[0];
      this._videoManifest = {
        metadata: {
          duration: s,
          title: t,
          preview: n,
          previewPortrait: a
        },
        streams: e.map((o, l) => ({
          sources: Dn(this, o),
          content: r[l],
          role: l === 0 ? "mainAudio" : null
        }))
      }, await wt.apply(this);
    } catch (r) {
      throw this._playerState = v.ERROR, this.log.error(r), this._errorContainer = new xe(this, this.translate(r.message)), r;
    }
  }
  async loadManifest() {
    if (this._playerState !== v.UNLOADED)
      throw new Error(this.translate("loadManifest(): Invalid current player state: $1", [U[this._playerState]]));
    if (!this._manifestLoaded)
      try {
        if (await vt.apply(this), this._videoId = await this.initParams.getVideoId(this._config, this), this.videoId === null)
          throw new Error("No video identifier specified");
        this._manifestUrl = await this.initParams.getManifestUrl(this.repositoryUrl, this.videoId, this._config, this), this._manifestFileUrl = await this.initParams.getManifestFileUrl(this._manifestUrl, this.manifestFileName, this._config, this), this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`), this._videoManifest = await this.initParams.loadVideoManifest(this.manifestFileUrl, this._config, this), this._videoManifest.metadata = this._videoManifest.metadata || {}, !this._videoManifest.metadata.preview && (this.defaultVideoPreview !== "" || this.defaultVideoPreviewPortrait !== "") && (this._videoManifest.metadata.preview = this.defaultVideoPreview, this._videoManifest.metadata.previewPortrait = this.defaultVideoPreviewPortrait, this.log.warn("Paella.loadUrl(): no preview image specified. Using default preview image.")), this._manifestParser = new sa(this.videoManifest, this), _t.apply(this.skin), await ta.apply(this.skin), await Xn.apply(this.skin), await wt.apply(this);
      } catch (e) {
        throw this._playerState = v.ERROR, this.log.error(e), this._errorContainer = new xe(this, this.translate(e.message)), e;
      }
  }
  async loadPlayer() {
    var e, t, s;
    try {
      if (this._captionsCanvas = new zn(this, this._containerElement), this._playerState !== v.MANIFEST)
        throw new Error(this.translate("loadPlayer(): Invalid current player state: $1", [U[this._playerState]]));
      this._playerState = v.LOADING_PLAYER, (e = this._previewContainer) == null || e.removeFromParent(), this._loader = new this.initParams.Loader(this), await this._loader.create(), await this.videoContainer.load((t = this.videoManifest) == null ? void 0 : t.streams), C(this, f.STREAM_LOADED), this._playbackBar = new Hn(this, this.containerElement), await this._playbackBar.load(), this._hideUiTime = ((s = this.config.ui) == null ? void 0 : s.hideUITimer) ?? 5e3, kt(this), this._captionsCanvas.load(), this._playerState = v.LOADED, C(this, f.PLAYER_LOADED), !(this.videoManifest.metadata.visibleTimeLine ?? !0) && this.playbackBar.progressIndicator.hideTimeLine(), this._loader.debug || (this._loader.removeFromParent(), this._loader = null);
    } catch (n) {
      throw this._playerState = v.ERROR, this._loader && (this._loader.removeFromParent(), this._loader = null), this._errorContainer = new xe(this, n.message), n;
    }
  }
  async load() {
    switch (this.state) {
      case v.UNLOADED:
        await this.loadManifest(), await this.loadPlayer();
        break;
      case v.MANIFEST:
        await this.loadPlayer();
        break;
      case v.LOADED:
        break;
      default:
        throw new Error(this.translate("Could not load player: state transition in progress: $1", [U[this.state]]));
    }
  }
  async unload() {
    switch (this.state) {
      case v.UNLOADED:
        break;
      case v.MANIFEST:
        await this.unloadManifest();
        break;
      case v.LOADED:
      case v.ERROR:
        await this.unloadPlayer(), await this.unloadManifest();
        break;
      default:
        throw new Error(this.translate("Could not unload player: state transition in progress: $1", [U[this.state]]));
    }
  }
  async unloadManifest() {
    var e;
    if (this._playerState !== v.MANIFEST && this._playerState !== v.ERROR)
      throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [U[this._playerState]]));
    this._errorContainer && (this._errorContainer.removeFromParent(), this._errorContainer = null), this._playerState = v.UNLOADING_MANIFEST, this.log.debug("Unloading paella player"), await Wn(), await bs(this), await In(this), this._manifestLoaded = !1, (e = this._previewContainer) == null || e.removeFromParent(), this._preferences = null, this._playerState = v.UNLOADED, _t.apply(this.skin);
  }
  async unloadPlayer() {
    var e, t, s, n, a;
    if (this._playerState !== v.LOADED && this._playerState !== v.ERROR)
      throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [U[this._playerState]]));
    this._errorContainer && (this._errorContainer.removeFromParent(), this._errorContainer = null), this._playerState = v.UNLOADING_PLAYER, await ((e = this._videoContainer) == null ? void 0 : e.unload()), this._videoContainer = null, await ((t = this._playbackBar) == null ? void 0 : t.unload()), this._playbackBar = null, (s = this._captionsCanvas) == null || s.unload(), this._captionsCanvas = null, Dt(this), C(this, f.PLAYER_UNLOADED), D.Unload(), he.Unload(this), (a = (n = this.videoManifest) == null ? void 0 : n.metadata) != null && a.preview && vi.apply(this), wi(this), this._playerState = v.MANIFEST;
  }
  async reload(e = null) {
    switch (this.state) {
      case v.UNLOADED:
        break;
      case v.MANIFEST:
        await this.unloadManifest();
        break;
      case v.LOADED:
        await this.unload();
        break;
    }
    typeof e == "function" && await e(), await this.load();
  }
  async resize() {
    var e, t;
    if ((e = this.videoContainer) == null || e.updateLayout(), (t = this.playbackBar) == null || t.onResize(), this.videoContainer) {
      const s = () => ({
        w: this.videoContainer.element.offsetWidth,
        h: this.videoContainer.element.offsetHeight
      });
      C(this, f.RESIZE, { size: s() }), this._resizeEndTimer && clearTimeout(this._resizeEndTimer), this._resizeEndTimer = setTimeout(() => {
        C(this, f.RESIZE_END, { size: s() });
      }, 1e3);
    }
  }
  async hideUserInterface() {
    var e, t, s;
    await ((e = this.videoContainer) == null ? void 0 : e.paused()) || (this._uiHidden = !0, (t = this.videoContainer) == null || t.hideUserInterface(), (s = this.playbackBar) == null || s.hideUserInterface(), he.HideUserInterface(this), C(this, f.HIDE_UI));
  }
  async showUserInterface() {
    var e, t;
    (e = this.videoContainer) == null || e.showUserInterface(), (t = this.playbackBar) == null || t.showUserInterface(), he.ShowUserInterface(this), this._uiHidden && C(this, f.SHOW_UI), this._uiHidden = !1;
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
  addCustomPluginIcon(e, t, s) {
    this._customPluginIcons[`${e}-${t}`] = s;
  }
  removeCustomPluginIcon(e, t) {
    this._customPluginIcons[`${e}-${t}`] = null;
  }
  getCustomPluginIcon(e, t) {
    return this._requestedCustomIcons = this._requestedCustomIcons || [], this._requestedCustomIcons.find((s) => s.pluginName === e && s.iconName === t) || this._requestedCustomIcons.push({
      pluginName: e,
      iconName: t
    }), this._customPluginIcons[`${e}-${t}`];
  }
  get requestedCustomIcons() {
    return this._requestedCustomIcons || [];
  }
}
class da extends Ge {
  get closeOnSelect() {
    return this.config.closeOnSelect === void 0 && (this.buttonType !== "check" ? this.config.closeOnSelect = !0 : this.config.closeOnSelect = !1), this.config.closeOnSelect;
  }
  async getContent() {
    const e = w('<ul class="menu-button-content"></ul>');
    this.menuTitle;
    const t = await this.getMenu();
    this._menuItems = t;
    let s = !1, n = null;
    return t.forEach((a) => {
      const r = w('<li class="menu-button-item"></li>', e);
      let o = "";
      this.buttonType === "button" ? o = "menu-item-type-button" : this.buttonType === "check" ? o = "menu-item-type-button" + (a.selected ? " selected" : "") : this.buttonType === "radio" && (o = "menu-item-type-button", !s && a.selected && (o += " selected", s = !0));
      let l = "";
      const c = a.title instanceof Element ? a.title : null;
      a.icon && a.title && this.showTitles && !c && (l = `
				<i class="menu-icon">${a.icon}</i>
				<span class="menu-title">${a.title}</span>
				`), a.icon && c && this.showTitles ? l = `
				<i class="menu-icon">${a.icon}</i>
				<span class="menu-title"></span>
				` : a.icon ? l = `
				<i class="menu-icon">${a.icon}</i>
				` : a.title && !c ? l = `
				<span class="menu-title">${a.title}</span>
				` : c && (l = `
				<span class="menu-title"></span>
				`);
      const h = w(
        `
				<button class="${o}" aria-label="${a.title}" title="${a.title}">${l}</button>`,
        r
      );
      c && h.getElementsByClassName("menu-title")[0].appendChild(c), n || (n = h), a.buttonElement = h, h._itemData = a, h.addEventListener("click", (p) => {
        this.buttonType === "check" ? (p.target._itemData.selected = !p.target._itemData.selected, p.target._itemData.selected ? p.target.classList.add("selected") : p.target.classList.remove("selected")) : this.buttonType === "radio" && (this.menuItems.forEach((y) => {
          y.selected = !1, y.buttonElement.classList.remove("selected");
        }), p.target._itemData.selected = !p.target._itemData.selected, p.target._itemData.selected ? p.target.classList.add("selected") : p.target.classList.remove("selected")), this.itemSelected(p.target._itemData, this._menuItems), p.stopPropagation(), this.closeOnSelect && this.closeMenu();
      });
      const u = h.getElementsByTagName("svg");
      u.length > 0 && (/%$/.test(u[0].getAttribute("width")) && u[0].removeAttribute("width"), /%$/.test(u[0].getAttribute("height")) && u[0].removeAttribute("height"));
    }), setTimeout(() => {
      n.focus();
    }, 50), e;
  }
  //get menuTitle() {
  //	return this.config.menuTitle || null;
  //}
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
  buttonType() {
    return "button";
  }
  itemSelected(e, t) {
    this.player.log.warn(`MenuButtonPlugin (${this.name}): itemSelected() function not implemented.`);
  }
  closeMenu() {
    this.config.closeParentPopUp ? D.HideAllPopUps(!1) : this._popUp.hide();
  }
  async showPopUp() {
    this.refreshContent = !0, await super.showPopUp();
  }
}
class ha extends W {
  get type() {
    return "progressIndicator";
  }
  get minHeight() {
    return 0;
  }
  get minHeightHover() {
    return 0;
  }
  drawForeground(e, t, s, n) {
  }
  drawBackground(e, t, s, n) {
  }
  requestUpdate() {
    this.player.playbackBar.progressIndicator.requestUpdateCanvas();
  }
}
export {
  ns as AudioOnlyVideo,
  at as AudioTrackData,
  as as AudioVideoPlugin,
  Pn as ButtonGroupPlugin,
  ti as ButtonPlugin,
  ai as Canvas,
  oa as CanvasButtonPlugin,
  L as CanvasButtonPosition,
  ri as CanvasPlugin,
  Ft as Captions,
  Ot as CaptionsPlugin,
  Ds as DFXPParser,
  wn as Data,
  li as DataPlugin,
  xs as DefaultKeyShortcutsPlugin,
  As as DfxpManifestCaptionsPlugin,
  M as DomClass,
  pt as DualVideoDynamicLayoutPlugin,
  ln as DualVideoLayoutPlugin,
  ca as EventLogPlugin,
  f as Events,
  T as HlsSupport,
  Vt as HlsVideo,
  ls as HlsVideoFormatPlugin,
  fs as ImageVideo,
  ys as ImageVideoFormatPlugin,
  x as KeyCodes,
  Ls as KeyShortcutPlugin,
  P as LOG_LEVEL,
  Ai as Loader,
  Qn as Log,
  sa as ManifestParser,
  da as MenuButtonPlugin,
  Qe as Mp4Video,
  rs as Mp4VideoFormatPlugin,
  ua as Paella,
  Ks as PlayPauseButtonPlugin,
  ae as PlayerResource,
  v as PlayerState,
  U as PlayerStateNames,
  W as Plugin,
  Ee as PluginModule,
  D as PopUp,
  Ge as PopUpButtonPlugin,
  ha as ProgressIndicatorPlugin,
  dn as SingleVideoLayoutPlugin,
  mn as TripleVideoLayoutPlugin,
  qe as UserInterfacePlugin,
  je as Video,
  _n as VideoCanvas,
  vn as VideoCanvasPlugin,
  S as VideoContainerMessagePosition,
  le as VideoLayout,
  re as VideoPlugin,
  te as VideoQualityItem,
  qs as VttManifestCaptionsPlugin,
  Zs as WebVTTParser,
  pe as addDictionary,
  k as bindEvent,
  xn as checkManifestIntegrity,
  Ct as createElement,
  w as createElementWithHtmlText,
  zt as defaultAddDictionaryFunction,
  gi as defaultGetCookieConsentCallback,
  mi as defaultGetCookieDescriptionCallback,
  Wt as defaultGetDefaultLanguageFunction,
  Kt as defaultGetDictionariesFunction,
  Gt as defaultGetLanguageFunction,
  xi as defaultGetManifestFileUrlFunction,
  Ii as defaultGetManifestUrlFunction,
  Ti as defaultGetVideoIdFunction,
  rt as defaultHlsConfig,
  Si as defaultLoadConfigFunction,
  ki as defaultLoadVideoManifestFunction,
  Ht as defaultSetLanguageFunction,
  Bt as defaultTranslateFunction,
  ra as getCurrentTabIndex,
  Xt as getDefaultLanguage,
  Ms as getDictionaries,
  V as getHlsSupport,
  Rs as getLanguage,
  ei as getNextTabIndex,
  ci as getPluginsOfType,
  ws as getShortcuts,
  la as importPlugins,
  Oi as isVolumeApiAvailable,
  R as loadPluginsOfType,
  q as log,
  lt as parseDFXP,
  ht as parseWebVTT,
  ct as setLanguage,
  ne as translate,
  C as triggerEvent,
  ee as triggerIfReady,
  aa as utils
};
