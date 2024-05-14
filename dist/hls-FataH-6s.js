function qr(a) {
  return a && a.__esModule && Object.prototype.hasOwnProperty.call(a, "default") ? a.default : a;
}
var Ui = { exports: {} };
(function(a, e) {
  (function(t) {
    var s = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/, i = /^(?=([^\/?#]*))\1([^]*)$/, r = /(?:\/|^)\.(?=\/)/g, n = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g, o = {
      // If opts.alwaysNormalize is true then the path will always be normalized even when it starts with / or //
      // E.g
      // With opts.alwaysNormalize = false (default, spec compliant)
      // http://a.com/b/cd + /e/f/../g => http://a.com/e/f/../g
      // With opts.alwaysNormalize = true (not spec compliant)
      // http://a.com/b/cd + /e/f/../g => http://a.com/e/g
      buildAbsoluteURL: function(l, c, h) {
        if (h = h || {}, l = l.trim(), c = c.trim(), !c) {
          if (!h.alwaysNormalize)
            return l;
          var u = o.parseURL(l);
          if (!u)
            throw new Error("Error trying to parse base URL.");
          return u.path = o.normalizePath(
            u.path
          ), o.buildURLFromParts(u);
        }
        var d = o.parseURL(c);
        if (!d)
          throw new Error("Error trying to parse relative URL.");
        if (d.scheme)
          return h.alwaysNormalize ? (d.path = o.normalizePath(d.path), o.buildURLFromParts(d)) : c;
        var g = o.parseURL(l);
        if (!g)
          throw new Error("Error trying to parse base URL.");
        if (!g.netLoc && g.path && g.path[0] !== "/") {
          var f = i.exec(g.path);
          g.netLoc = f[1], g.path = f[2];
        }
        g.netLoc && !g.path && (g.path = "/");
        var p = {
          // 2c) Otherwise, the embedded URL inherits the scheme of
          // the base URL.
          scheme: g.scheme,
          netLoc: d.netLoc,
          path: null,
          params: d.params,
          query: d.query,
          fragment: d.fragment
        };
        if (!d.netLoc && (p.netLoc = g.netLoc, d.path[0] !== "/"))
          if (!d.path)
            p.path = g.path, d.params || (p.params = g.params, d.query || (p.query = g.query));
          else {
            var T = g.path, E = T.substring(0, T.lastIndexOf("/") + 1) + d.path;
            p.path = o.normalizePath(E);
          }
        return p.path === null && (p.path = h.alwaysNormalize ? o.normalizePath(d.path) : d.path), o.buildURLFromParts(p);
      },
      parseURL: function(l) {
        var c = s.exec(l);
        return c ? {
          scheme: c[1] || "",
          netLoc: c[2] || "",
          path: c[3] || "",
          params: c[4] || "",
          query: c[5] || "",
          fragment: c[6] || ""
        } : null;
      },
      normalizePath: function(l) {
        for (l = l.split("").reverse().join("").replace(r, ""); l.length !== (l = l.replace(n, "")).length; )
          ;
        return l.split("").reverse().join("");
      },
      buildURLFromParts: function(l) {
        return l.scheme + l.netLoc + l.path + l.params + l.query + l.fragment;
      }
    };
    a.exports = o;
  })();
})(Ui);
var Ts = Ui.exports;
function Os(a, e) {
  var t = Object.keys(a);
  if (Object.getOwnPropertySymbols) {
    var s = Object.getOwnPropertySymbols(a);
    e && (s = s.filter(function(i) {
      return Object.getOwnPropertyDescriptor(a, i).enumerable;
    })), t.push.apply(t, s);
  }
  return t;
}
function le(a) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Os(Object(t), !0).forEach(function(s) {
      Xr(a, s, t[s]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(a, Object.getOwnPropertyDescriptors(t)) : Os(Object(t)).forEach(function(s) {
      Object.defineProperty(a, s, Object.getOwnPropertyDescriptor(t, s));
    });
  }
  return a;
}
function jr(a, e) {
  if (typeof a != "object" || !a)
    return a;
  var t = a[Symbol.toPrimitive];
  if (t !== void 0) {
    var s = t.call(a, e || "default");
    if (typeof s != "object")
      return s;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(a);
}
function zr(a) {
  var e = jr(a, "string");
  return typeof e == "symbol" ? e : String(e);
}
function Xr(a, e, t) {
  return e = zr(e), e in a ? Object.defineProperty(a, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : a[e] = t, a;
}
function se() {
  return se = Object.assign ? Object.assign.bind() : function(a) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var s in t)
        Object.prototype.hasOwnProperty.call(t, s) && (a[s] = t[s]);
    }
    return a;
  }, se.apply(this, arguments);
}
const O = Number.isFinite || function(a) {
  return typeof a == "number" && isFinite(a);
}, Qr = Number.isSafeInteger || function(a) {
  return typeof a == "number" && Math.abs(a) <= Jr;
}, Jr = Number.MAX_SAFE_INTEGER || 9007199254740991;
let m = /* @__PURE__ */ function(a) {
  return a.MEDIA_ATTACHING = "hlsMediaAttaching", a.MEDIA_ATTACHED = "hlsMediaAttached", a.MEDIA_DETACHING = "hlsMediaDetaching", a.MEDIA_DETACHED = "hlsMediaDetached", a.BUFFER_RESET = "hlsBufferReset", a.BUFFER_CODECS = "hlsBufferCodecs", a.BUFFER_CREATED = "hlsBufferCreated", a.BUFFER_APPENDING = "hlsBufferAppending", a.BUFFER_APPENDED = "hlsBufferAppended", a.BUFFER_EOS = "hlsBufferEos", a.BUFFER_FLUSHING = "hlsBufferFlushing", a.BUFFER_FLUSHED = "hlsBufferFlushed", a.MANIFEST_LOADING = "hlsManifestLoading", a.MANIFEST_LOADED = "hlsManifestLoaded", a.MANIFEST_PARSED = "hlsManifestParsed", a.LEVEL_SWITCHING = "hlsLevelSwitching", a.LEVEL_SWITCHED = "hlsLevelSwitched", a.LEVEL_LOADING = "hlsLevelLoading", a.LEVEL_LOADED = "hlsLevelLoaded", a.LEVEL_UPDATED = "hlsLevelUpdated", a.LEVEL_PTS_UPDATED = "hlsLevelPtsUpdated", a.LEVELS_UPDATED = "hlsLevelsUpdated", a.AUDIO_TRACKS_UPDATED = "hlsAudioTracksUpdated", a.AUDIO_TRACK_SWITCHING = "hlsAudioTrackSwitching", a.AUDIO_TRACK_SWITCHED = "hlsAudioTrackSwitched", a.AUDIO_TRACK_LOADING = "hlsAudioTrackLoading", a.AUDIO_TRACK_LOADED = "hlsAudioTrackLoaded", a.SUBTITLE_TRACKS_UPDATED = "hlsSubtitleTracksUpdated", a.SUBTITLE_TRACKS_CLEARED = "hlsSubtitleTracksCleared", a.SUBTITLE_TRACK_SWITCH = "hlsSubtitleTrackSwitch", a.SUBTITLE_TRACK_LOADING = "hlsSubtitleTrackLoading", a.SUBTITLE_TRACK_LOADED = "hlsSubtitleTrackLoaded", a.SUBTITLE_FRAG_PROCESSED = "hlsSubtitleFragProcessed", a.CUES_PARSED = "hlsCuesParsed", a.NON_NATIVE_TEXT_TRACKS_FOUND = "hlsNonNativeTextTracksFound", a.INIT_PTS_FOUND = "hlsInitPtsFound", a.FRAG_LOADING = "hlsFragLoading", a.FRAG_LOAD_EMERGENCY_ABORTED = "hlsFragLoadEmergencyAborted", a.FRAG_LOADED = "hlsFragLoaded", a.FRAG_DECRYPTED = "hlsFragDecrypted", a.FRAG_PARSING_INIT_SEGMENT = "hlsFragParsingInitSegment", a.FRAG_PARSING_USERDATA = "hlsFragParsingUserdata", a.FRAG_PARSING_METADATA = "hlsFragParsingMetadata", a.FRAG_PARSED = "hlsFragParsed", a.FRAG_BUFFERED = "hlsFragBuffered", a.FRAG_CHANGED = "hlsFragChanged", a.FPS_DROP = "hlsFpsDrop", a.FPS_DROP_LEVEL_CAPPING = "hlsFpsDropLevelCapping", a.MAX_AUTO_LEVEL_UPDATED = "hlsMaxAutoLevelUpdated", a.ERROR = "hlsError", a.DESTROYING = "hlsDestroying", a.KEY_LOADING = "hlsKeyLoading", a.KEY_LOADED = "hlsKeyLoaded", a.LIVE_BACK_BUFFER_REACHED = "hlsLiveBackBufferReached", a.BACK_BUFFER_REACHED = "hlsBackBufferReached", a.STEERING_MANIFEST_LOADED = "hlsSteeringManifestLoaded", a;
}({}), U = /* @__PURE__ */ function(a) {
  return a.NETWORK_ERROR = "networkError", a.MEDIA_ERROR = "mediaError", a.KEY_SYSTEM_ERROR = "keySystemError", a.MUX_ERROR = "muxError", a.OTHER_ERROR = "otherError", a;
}({}), L = /* @__PURE__ */ function(a) {
  return a.KEY_SYSTEM_NO_KEYS = "keySystemNoKeys", a.KEY_SYSTEM_NO_ACCESS = "keySystemNoAccess", a.KEY_SYSTEM_NO_SESSION = "keySystemNoSession", a.KEY_SYSTEM_NO_CONFIGURED_LICENSE = "keySystemNoConfiguredLicense", a.KEY_SYSTEM_LICENSE_REQUEST_FAILED = "keySystemLicenseRequestFailed", a.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED = "keySystemServerCertificateRequestFailed", a.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED = "keySystemServerCertificateUpdateFailed", a.KEY_SYSTEM_SESSION_UPDATE_FAILED = "keySystemSessionUpdateFailed", a.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED = "keySystemStatusOutputRestricted", a.KEY_SYSTEM_STATUS_INTERNAL_ERROR = "keySystemStatusInternalError", a.MANIFEST_LOAD_ERROR = "manifestLoadError", a.MANIFEST_LOAD_TIMEOUT = "manifestLoadTimeOut", a.MANIFEST_PARSING_ERROR = "manifestParsingError", a.MANIFEST_INCOMPATIBLE_CODECS_ERROR = "manifestIncompatibleCodecsError", a.LEVEL_EMPTY_ERROR = "levelEmptyError", a.LEVEL_LOAD_ERROR = "levelLoadError", a.LEVEL_LOAD_TIMEOUT = "levelLoadTimeOut", a.LEVEL_PARSING_ERROR = "levelParsingError", a.LEVEL_SWITCH_ERROR = "levelSwitchError", a.AUDIO_TRACK_LOAD_ERROR = "audioTrackLoadError", a.AUDIO_TRACK_LOAD_TIMEOUT = "audioTrackLoadTimeOut", a.SUBTITLE_LOAD_ERROR = "subtitleTrackLoadError", a.SUBTITLE_TRACK_LOAD_TIMEOUT = "subtitleTrackLoadTimeOut", a.FRAG_LOAD_ERROR = "fragLoadError", a.FRAG_LOAD_TIMEOUT = "fragLoadTimeOut", a.FRAG_DECRYPT_ERROR = "fragDecryptError", a.FRAG_PARSING_ERROR = "fragParsingError", a.FRAG_GAP = "fragGap", a.REMUX_ALLOC_ERROR = "remuxAllocError", a.KEY_LOAD_ERROR = "keyLoadError", a.KEY_LOAD_TIMEOUT = "keyLoadTimeOut", a.BUFFER_ADD_CODEC_ERROR = "bufferAddCodecError", a.BUFFER_INCOMPATIBLE_CODECS_ERROR = "bufferIncompatibleCodecsError", a.BUFFER_APPEND_ERROR = "bufferAppendError", a.BUFFER_APPENDING_ERROR = "bufferAppendingError", a.BUFFER_STALLED_ERROR = "bufferStalledError", a.BUFFER_FULL_ERROR = "bufferFullError", a.BUFFER_SEEK_OVER_HOLE = "bufferSeekOverHole", a.BUFFER_NUDGE_ON_STALL = "bufferNudgeOnStall", a.INTERNAL_EXCEPTION = "internalException", a.INTERNAL_ABORTED = "aborted", a.UNKNOWN = "unknown", a;
}({});
const Oe = function() {
}, ss = {
  trace: Oe,
  debug: Oe,
  log: Oe,
  warn: Oe,
  info: Oe,
  error: Oe
};
let et = ss;
function Zr(a) {
  const e = self.console[a];
  return e ? e.bind(self.console, `[${a}] >`) : Oe;
}
function en(a, ...e) {
  e.forEach(function(t) {
    et[t] = a[t] ? a[t].bind(a) : Zr(t);
  });
}
function tn(a, e) {
  if (typeof console == "object" && a === !0 || typeof a == "object") {
    en(
      a,
      // Remove out from list here to hard-disable a log-level
      // 'trace',
      "debug",
      "log",
      "info",
      "warn",
      "error"
    );
    try {
      et.log(`Debug logs enabled for "${e}" in hls.js version 1.5.1`);
    } catch {
      et = ss;
    }
  } else
    et = ss;
}
const v = et, sn = /^(\d+)x(\d+)$/, Ms = /(.+?)=(".*?"|.*?)(?:,|$)/g;
class ee {
  constructor(e) {
    typeof e == "string" && (e = ee.parseAttrList(e)), se(this, e);
  }
  get clientAttrs() {
    return Object.keys(this).filter((e) => e.substring(0, 2) === "X-");
  }
  decimalInteger(e) {
    const t = parseInt(this[e], 10);
    return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t;
  }
  hexadecimalInteger(e) {
    if (this[e]) {
      let t = (this[e] || "0x").slice(2);
      t = (t.length & 1 ? "0" : "") + t;
      const s = new Uint8Array(t.length / 2);
      for (let i = 0; i < t.length / 2; i++)
        s[i] = parseInt(t.slice(i * 2, i * 2 + 2), 16);
      return s;
    } else
      return null;
  }
  hexadecimalIntegerAsNumber(e) {
    const t = parseInt(this[e], 16);
    return t > Number.MAX_SAFE_INTEGER ? 1 / 0 : t;
  }
  decimalFloatingPoint(e) {
    return parseFloat(this[e]);
  }
  optionalFloat(e, t) {
    const s = this[e];
    return s ? parseFloat(s) : t;
  }
  enumeratedString(e) {
    return this[e];
  }
  bool(e) {
    return this[e] === "YES";
  }
  decimalResolution(e) {
    const t = sn.exec(this[e]);
    if (t !== null)
      return {
        width: parseInt(t[1], 10),
        height: parseInt(t[2], 10)
      };
  }
  static parseAttrList(e) {
    let t;
    const s = {}, i = '"';
    for (Ms.lastIndex = 0; (t = Ms.exec(e)) !== null; ) {
      let r = t[2];
      r.indexOf(i) === 0 && r.lastIndexOf(i) === r.length - 1 && (r = r.slice(1, -1));
      const n = t[1].trim();
      s[n] = r;
    }
    return s;
  }
}
function rn(a) {
  return a !== "ID" && a !== "CLASS" && a !== "START-DATE" && a !== "DURATION" && a !== "END-DATE" && a !== "END-ON-NEXT";
}
function nn(a) {
  return a === "SCTE35-OUT" || a === "SCTE35-IN";
}
class Bi {
  constructor(e, t) {
    if (this.attr = void 0, this._startDate = void 0, this._endDate = void 0, this._badValueForSameId = void 0, t) {
      const s = t.attr;
      for (const i in s)
        if (Object.prototype.hasOwnProperty.call(e, i) && e[i] !== s[i]) {
          v.warn(`DATERANGE tag attribute: "${i}" does not match for tags with ID: "${e.ID}"`), this._badValueForSameId = i;
          break;
        }
      e = se(new ee({}), s, e);
    }
    if (this.attr = e, this._startDate = new Date(e["START-DATE"]), "END-DATE" in this.attr) {
      const s = new Date(this.attr["END-DATE"]);
      O(s.getTime()) && (this._endDate = s);
    }
  }
  get id() {
    return this.attr.ID;
  }
  get class() {
    return this.attr.CLASS;
  }
  get startDate() {
    return this._startDate;
  }
  get endDate() {
    if (this._endDate)
      return this._endDate;
    const e = this.duration;
    return e !== null ? new Date(this._startDate.getTime() + e * 1e3) : null;
  }
  get duration() {
    if ("DURATION" in this.attr) {
      const e = this.attr.decimalFloatingPoint("DURATION");
      if (O(e))
        return e;
    } else if (this._endDate)
      return (this._endDate.getTime() - this._startDate.getTime()) / 1e3;
    return null;
  }
  get plannedDuration() {
    return "PLANNED-DURATION" in this.attr ? this.attr.decimalFloatingPoint("PLANNED-DURATION") : null;
  }
  get endOnNext() {
    return this.attr.bool("END-ON-NEXT");
  }
  get isValid() {
    return !!this.id && !this._badValueForSameId && O(this.startDate.getTime()) && (this.duration === null || this.duration >= 0) && (!this.endOnNext || !!this.class);
  }
}
class _t {
  constructor() {
    this.aborted = !1, this.loaded = 0, this.retry = 0, this.total = 0, this.chunkCount = 0, this.bwEstimate = 0, this.loading = {
      start: 0,
      first: 0,
      end: 0
    }, this.parsing = {
      start: 0,
      end: 0
    }, this.buffering = {
      start: 0,
      first: 0,
      end: 0
    };
  }
}
var X = {
  AUDIO: "audio",
  VIDEO: "video",
  AUDIOVIDEO: "audiovideo"
};
class $i {
  constructor(e) {
    this._byteRange = null, this._url = null, this.baseurl = void 0, this.relurl = void 0, this.elementaryStreams = {
      [X.AUDIO]: null,
      [X.VIDEO]: null,
      [X.AUDIOVIDEO]: null
    }, this.baseurl = e;
  }
  // setByteRange converts a EXT-X-BYTERANGE attribute into a two element array
  setByteRange(e, t) {
    const s = e.split("@", 2);
    let i;
    s.length === 1 ? i = (t == null ? void 0 : t.byteRangeEndOffset) || 0 : i = parseInt(s[1]), this._byteRange = [i, parseInt(s[0]) + i];
  }
  get byteRange() {
    return this._byteRange ? this._byteRange : [];
  }
  get byteRangeStartOffset() {
    return this.byteRange[0];
  }
  get byteRangeEndOffset() {
    return this.byteRange[1];
  }
  get url() {
    return !this._url && this.baseurl && this.relurl && (this._url = Ts.buildAbsoluteURL(this.baseurl, this.relurl, {
      alwaysNormalize: !0
    })), this._url || "";
  }
  set url(e) {
    this._url = e;
  }
}
class Ot extends $i {
  constructor(e, t) {
    super(t), this._decryptdata = null, this.rawProgramDateTime = null, this.programDateTime = null, this.tagList = [], this.duration = 0, this.sn = 0, this.levelkeys = void 0, this.type = void 0, this.loader = null, this.keyLoader = null, this.level = -1, this.cc = 0, this.startPTS = void 0, this.endPTS = void 0, this.startDTS = void 0, this.endDTS = void 0, this.start = 0, this.deltaPTS = void 0, this.maxStartPTS = void 0, this.minEndPTS = void 0, this.stats = new _t(), this.data = void 0, this.bitrateTest = !1, this.title = null, this.initSegment = null, this.endList = void 0, this.gap = void 0, this.urlId = 0, this.type = e;
  }
  get decryptdata() {
    const {
      levelkeys: e
    } = this;
    if (!e && !this._decryptdata)
      return null;
    if (!this._decryptdata && this.levelkeys && !this.levelkeys.NONE) {
      const t = this.levelkeys.identity;
      if (t)
        this._decryptdata = t.getDecryptData(this.sn);
      else {
        const s = Object.keys(this.levelkeys);
        if (s.length === 1)
          return this._decryptdata = this.levelkeys[s[0]].getDecryptData(this.sn);
      }
    }
    return this._decryptdata;
  }
  get end() {
    return this.start + this.duration;
  }
  get endProgramDateTime() {
    if (this.programDateTime === null || !O(this.programDateTime))
      return null;
    const e = O(this.duration) ? this.duration : 0;
    return this.programDateTime + e * 1e3;
  }
  get encrypted() {
    var e;
    if ((e = this._decryptdata) != null && e.encrypted)
      return !0;
    if (this.levelkeys) {
      const t = Object.keys(this.levelkeys), s = t.length;
      if (s > 1 || s === 1 && this.levelkeys[t[0]].encrypted)
        return !0;
    }
    return !1;
  }
  setKeyFormat(e) {
    if (this.levelkeys) {
      const t = this.levelkeys[e];
      t && !this._decryptdata && (this._decryptdata = t.getDecryptData(this.sn));
    }
  }
  abortRequests() {
    var e, t;
    (e = this.loader) == null || e.abort(), (t = this.keyLoader) == null || t.abort();
  }
  setElementaryStreamInfo(e, t, s, i, r, n = !1) {
    const {
      elementaryStreams: o
    } = this, l = o[e];
    if (!l) {
      o[e] = {
        startPTS: t,
        endPTS: s,
        startDTS: i,
        endDTS: r,
        partial: n
      };
      return;
    }
    l.startPTS = Math.min(l.startPTS, t), l.endPTS = Math.max(l.endPTS, s), l.startDTS = Math.min(l.startDTS, i), l.endDTS = Math.max(l.endDTS, r);
  }
  clearElementaryStreamInfo() {
    const {
      elementaryStreams: e
    } = this;
    e[X.AUDIO] = null, e[X.VIDEO] = null, e[X.AUDIOVIDEO] = null;
  }
}
class an extends $i {
  constructor(e, t, s, i, r) {
    super(s), this.fragOffset = 0, this.duration = 0, this.gap = !1, this.independent = !1, this.relurl = void 0, this.fragment = void 0, this.index = void 0, this.stats = new _t(), this.duration = e.decimalFloatingPoint("DURATION"), this.gap = e.bool("GAP"), this.independent = e.bool("INDEPENDENT"), this.relurl = e.enumeratedString("URI"), this.fragment = t, this.index = i;
    const n = e.enumeratedString("BYTERANGE");
    n && this.setByteRange(n, r), r && (this.fragOffset = r.fragOffset + r.duration);
  }
  get start() {
    return this.fragment.start + this.fragOffset;
  }
  get end() {
    return this.start + this.duration;
  }
  get loaded() {
    const {
      elementaryStreams: e
    } = this;
    return !!(e.audio || e.video || e.audiovideo);
  }
}
const on = 10;
class ln {
  constructor(e) {
    this.PTSKnown = !1, this.alignedSliding = !1, this.averagetargetduration = void 0, this.endCC = 0, this.endSN = 0, this.fragments = void 0, this.fragmentHint = void 0, this.partList = null, this.dateRanges = void 0, this.live = !0, this.ageHeader = 0, this.advancedDateTime = void 0, this.updated = !0, this.advanced = !0, this.availabilityDelay = void 0, this.misses = 0, this.startCC = 0, this.startSN = 0, this.startTimeOffset = null, this.targetduration = 0, this.totalduration = 0, this.type = null, this.url = void 0, this.m3u8 = "", this.version = null, this.canBlockReload = !1, this.canSkipUntil = 0, this.canSkipDateRanges = !1, this.skippedSegments = 0, this.recentlyRemovedDateranges = void 0, this.partHoldBack = 0, this.holdBack = 0, this.partTarget = 0, this.preloadHint = void 0, this.renditionReports = void 0, this.tuneInGoal = 0, this.deltaUpdateFailed = void 0, this.driftStartTime = 0, this.driftEndTime = 0, this.driftStart = 0, this.driftEnd = 0, this.encryptedFragments = void 0, this.playlistParsingError = null, this.variableList = null, this.hasVariableRefs = !1, this.fragments = [], this.encryptedFragments = [], this.dateRanges = {}, this.url = e;
  }
  reloaded(e) {
    if (!e) {
      this.advanced = !0, this.updated = !0;
      return;
    }
    const t = this.lastPartSn - e.lastPartSn, s = this.lastPartIndex - e.lastPartIndex;
    this.updated = this.endSN !== e.endSN || !!s || !!t || !this.live, this.advanced = this.endSN > e.endSN || t > 0 || t === 0 && s > 0, this.updated || this.advanced ? this.misses = Math.floor(e.misses * 0.6) : this.misses = e.misses + 1, this.availabilityDelay = e.availabilityDelay;
  }
  get hasProgramDateTime() {
    return this.fragments.length ? O(this.fragments[this.fragments.length - 1].programDateTime) : !1;
  }
  get levelTargetDuration() {
    return this.averagetargetduration || this.targetduration || on;
  }
  get drift() {
    const e = this.driftEndTime - this.driftStartTime;
    return e > 0 ? (this.driftEnd - this.driftStart) * 1e3 / e : 1;
  }
  get edge() {
    return this.partEnd || this.fragmentEnd;
  }
  get partEnd() {
    var e;
    return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].end : this.fragmentEnd;
  }
  get fragmentEnd() {
    var e;
    return (e = this.fragments) != null && e.length ? this.fragments[this.fragments.length - 1].end : 0;
  }
  get age() {
    return this.advancedDateTime ? Math.max(Date.now() - this.advancedDateTime, 0) / 1e3 : 0;
  }
  get lastPartIndex() {
    var e;
    return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].index : -1;
  }
  get lastPartSn() {
    var e;
    return (e = this.partList) != null && e.length ? this.partList[this.partList.length - 1].fragment.sn : this.endSN;
  }
}
function Es(a) {
  return Uint8Array.from(atob(a), (e) => e.charCodeAt(0));
}
function cn(a) {
  const e = is(a).subarray(0, 16), t = new Uint8Array(16);
  return t.set(e, 16 - e.length), t;
}
function hn(a) {
  const e = function(s, i, r) {
    const n = s[i];
    s[i] = s[r], s[r] = n;
  };
  e(a, 0, 3), e(a, 1, 2), e(a, 4, 5), e(a, 6, 7);
}
function un(a) {
  const e = a.split(":");
  let t = null;
  if (e[0] === "data" && e.length === 2) {
    const s = e[1].split(";"), i = s[s.length - 1].split(",");
    if (i.length === 2) {
      const r = i[0] === "base64", n = i[1];
      r ? (s.splice(-1, 1), t = Es(n)) : t = cn(n);
    }
  }
  return t;
}
function is(a) {
  return Uint8Array.from(unescape(encodeURIComponent(a)), (e) => e.charCodeAt(0));
}
const je = typeof self < "u" ? self : void 0;
var Z = {
  CLEARKEY: "org.w3.clearkey",
  FAIRPLAY: "com.apple.fps",
  PLAYREADY: "com.microsoft.playready",
  WIDEVINE: "com.widevine.alpha"
}, de = {
  CLEARKEY: "org.w3.clearkey",
  FAIRPLAY: "com.apple.streamingkeydelivery",
  PLAYREADY: "com.microsoft.playready",
  WIDEVINE: "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
};
function Ns(a) {
  switch (a) {
    case de.FAIRPLAY:
      return Z.FAIRPLAY;
    case de.PLAYREADY:
      return Z.PLAYREADY;
    case de.WIDEVINE:
      return Z.WIDEVINE;
    case de.CLEARKEY:
      return Z.CLEARKEY;
  }
}
var Gi = {
  WIDEVINE: "edef8ba979d64acea3c827dcd51d21ed"
};
function dn(a) {
  if (a === Gi.WIDEVINE)
    return Z.WIDEVINE;
}
function Us(a) {
  switch (a) {
    case Z.FAIRPLAY:
      return de.FAIRPLAY;
    case Z.PLAYREADY:
      return de.PLAYREADY;
    case Z.WIDEVINE:
      return de.WIDEVINE;
    case Z.CLEARKEY:
      return de.CLEARKEY;
  }
}
function Mt(a) {
  const {
    drmSystems: e,
    widevineLicenseUrl: t
  } = a, s = e ? [Z.FAIRPLAY, Z.WIDEVINE, Z.PLAYREADY, Z.CLEARKEY].filter((i) => !!e[i]) : [];
  return !s[Z.WIDEVINE] && t && s.push(Z.WIDEVINE), s;
}
const Ki = function(a) {
  return je != null && (a = je.navigator) != null && a.requestMediaKeySystemAccess ? self.navigator.requestMediaKeySystemAccess.bind(self.navigator) : null;
}();
function fn(a, e, t, s) {
  let i;
  switch (a) {
    case Z.FAIRPLAY:
      i = ["cenc", "sinf"];
      break;
    case Z.WIDEVINE:
    case Z.PLAYREADY:
      i = ["cenc"];
      break;
    case Z.CLEARKEY:
      i = ["cenc", "keyids"];
      break;
    default:
      throw new Error(`Unknown key-system: ${a}`);
  }
  return gn(i, e, t, s);
}
function gn(a, e, t, s) {
  return [{
    initDataTypes: a,
    persistentState: s.persistentState || "optional",
    distinctiveIdentifier: s.distinctiveIdentifier || "optional",
    sessionTypes: s.sessionTypes || [s.sessionType || "temporary"],
    audioCapabilities: e.map((r) => ({
      contentType: `audio/mp4; codecs="${r}"`,
      robustness: s.audioRobustness || "",
      encryptionScheme: s.audioEncryptionScheme || null
    })),
    videoCapabilities: t.map((r) => ({
      contentType: `video/mp4; codecs="${r}"`,
      robustness: s.videoRobustness || "",
      encryptionScheme: s.videoEncryptionScheme || null
    }))
  }];
}
function Ne(a, e, t) {
  return Uint8Array.prototype.slice ? a.slice(e, t) : new Uint8Array(Array.prototype.slice.call(a, e, t));
}
const ys = (a, e) => e + 10 <= a.length && a[e] === 73 && a[e + 1] === 68 && a[e + 2] === 51 && a[e + 3] < 255 && a[e + 4] < 255 && a[e + 6] < 128 && a[e + 7] < 128 && a[e + 8] < 128 && a[e + 9] < 128, Vi = (a, e) => e + 10 <= a.length && a[e] === 51 && a[e + 1] === 68 && a[e + 2] === 73 && a[e + 3] < 255 && a[e + 4] < 255 && a[e + 6] < 128 && a[e + 7] < 128 && a[e + 8] < 128 && a[e + 9] < 128, st = (a, e) => {
  const t = e;
  let s = 0;
  for (; ys(a, e); ) {
    s += 10;
    const i = Pt(a, e + 6);
    s += i, Vi(a, e + 10) && (s += 10), e += s;
  }
  if (s > 0)
    return a.subarray(t, t + s);
}, Pt = (a, e) => {
  let t = 0;
  return t = (a[e] & 127) << 21, t |= (a[e + 1] & 127) << 14, t |= (a[e + 2] & 127) << 7, t |= a[e + 3] & 127, t;
}, mn = (a, e) => ys(a, e) && Pt(a, e + 6) + 10 <= a.length - e, xs = (a) => {
  const e = Wi(a);
  for (let t = 0; t < e.length; t++) {
    const s = e[t];
    if (Hi(s))
      return Sn(s);
  }
}, Hi = (a) => a && a.key === "PRIV" && a.info === "com.apple.streaming.transportStreamTimestamp", pn = (a) => {
  const e = String.fromCharCode(a[0], a[1], a[2], a[3]), t = Pt(a, 4), s = 10;
  return {
    type: e,
    size: t,
    data: a.subarray(s, s + t)
  };
}, Wi = (a) => {
  let e = 0;
  const t = [];
  for (; ys(a, e); ) {
    const s = Pt(a, e + 6);
    e += 10;
    const i = e + s;
    for (; e + 8 < i; ) {
      const r = pn(a.subarray(e)), n = Tn(r);
      n && t.push(n), e += r.size + 10;
    }
    Vi(a, e) && (e += 10);
  }
  return t;
}, Tn = (a) => a.type === "PRIV" ? En(a) : a.type[0] === "W" ? xn(a) : yn(a), En = (a) => {
  if (a.size < 2)
    return;
  const e = Re(a.data, !0), t = new Uint8Array(a.data.subarray(e.length + 1));
  return {
    key: a.type,
    info: e,
    data: t.buffer
  };
}, yn = (a) => {
  if (a.size < 2)
    return;
  if (a.type === "TXXX") {
    let t = 1;
    const s = Re(a.data.subarray(t), !0);
    t += s.length + 1;
    const i = Re(a.data.subarray(t));
    return {
      key: a.type,
      info: s,
      data: i
    };
  }
  const e = Re(a.data.subarray(1));
  return {
    key: a.type,
    data: e
  };
}, xn = (a) => {
  if (a.type === "WXXX") {
    if (a.size < 2)
      return;
    let t = 1;
    const s = Re(a.data.subarray(t), !0);
    t += s.length + 1;
    const i = Re(a.data.subarray(t));
    return {
      key: a.type,
      info: s,
      data: i
    };
  }
  const e = Re(a.data);
  return {
    key: a.type,
    data: e
  };
}, Sn = (a) => {
  if (a.data.byteLength === 8) {
    const e = new Uint8Array(a.data), t = e[3] & 1;
    let s = (e[4] << 23) + (e[5] << 15) + (e[6] << 7) + e[7];
    return s /= 45, t && (s += 4772185884e-2), Math.round(s);
  }
}, Re = (a, e = !1) => {
  const t = vn();
  if (t) {
    const c = t.decode(a);
    if (e) {
      const h = c.indexOf("\0");
      return h !== -1 ? c.substring(0, h) : c;
    }
    return c.replace(/\0/g, "");
  }
  const s = a.length;
  let i, r, n, o = "", l = 0;
  for (; l < s; ) {
    if (i = a[l++], i === 0 && e)
      return o;
    if (i === 0 || i === 3)
      continue;
    switch (i >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        o += String.fromCharCode(i);
        break;
      case 12:
      case 13:
        r = a[l++], o += String.fromCharCode((i & 31) << 6 | r & 63);
        break;
      case 14:
        r = a[l++], n = a[l++], o += String.fromCharCode((i & 15) << 12 | (r & 63) << 6 | (n & 63) << 0);
        break;
    }
  }
  return o;
};
let Nt;
function vn() {
  if (!navigator.userAgent.includes("PlayStation 4"))
    return !Nt && typeof self.TextDecoder < "u" && (Nt = new self.TextDecoder("utf-8")), Nt;
}
const Se = {
  hexDump: function(a) {
    let e = "";
    for (let t = 0; t < a.length; t++) {
      let s = a[t].toString(16);
      s.length < 2 && (s = "0" + s), e += s;
    }
    return e;
  }
}, vt = Math.pow(2, 32) - 1, An = [].push, Yi = {
  video: 1,
  audio: 2,
  id3: 3,
  text: 4
};
function ie(a) {
  return String.fromCharCode.apply(null, a);
}
function qi(a, e) {
  const t = a[e] << 8 | a[e + 1];
  return t < 0 ? 65536 + t : t;
}
function $(a, e) {
  const t = ji(a, e);
  return t < 0 ? 4294967296 + t : t;
}
function ji(a, e) {
  return a[e] << 24 | a[e + 1] << 16 | a[e + 2] << 8 | a[e + 3];
}
function Ut(a, e, t) {
  a[e] = t >> 24, a[e + 1] = t >> 16 & 255, a[e + 2] = t >> 8 & 255, a[e + 3] = t & 255;
}
function Ln(a) {
  const e = a.byteLength;
  for (let t = 0; t < e; ) {
    const s = $(a, t);
    if (s > 8 && a[t + 4] === 109 && a[t + 5] === 111 && a[t + 6] === 111 && a[t + 7] === 102)
      return !0;
    t = s > 1 ? t + s : e;
  }
  return !1;
}
function V(a, e) {
  const t = [];
  if (!e.length)
    return t;
  const s = a.byteLength;
  for (let i = 0; i < s; ) {
    const r = $(a, i), n = ie(a.subarray(i + 4, i + 8)), o = r > 1 ? i + r : s;
    if (n === e[0])
      if (e.length === 1)
        t.push(a.subarray(i + 8, o));
      else {
        const l = V(a.subarray(i + 8, o), e.slice(1));
        l.length && An.apply(t, l);
      }
    i = o;
  }
  return t;
}
function Rn(a) {
  const e = [], t = a[0];
  let s = 8;
  const i = $(a, s);
  s += 4;
  const r = 0, n = 0;
  t === 0 ? s += 8 : s += 16, s += 2;
  let o = a.length + n;
  const l = qi(a, s);
  s += 2;
  for (let c = 0; c < l; c++) {
    let h = s;
    const u = $(a, h);
    h += 4;
    const d = u & 2147483647;
    if ((u & 2147483648) >>> 31 === 1)
      return v.warn("SIDX has hierarchical references (not supported)"), null;
    const f = $(a, h);
    h += 4, e.push({
      referenceSize: d,
      subsegmentDuration: f,
      // unscaled
      info: {
        duration: f / i,
        start: o,
        end: o + d - 1
      }
    }), o += d, h += 4, s = h;
  }
  return {
    earliestPresentationTime: r,
    timescale: i,
    version: t,
    referencesCount: l,
    references: e
  };
}
function zi(a) {
  const e = [], t = V(a, ["moov", "trak"]);
  for (let i = 0; i < t.length; i++) {
    const r = t[i], n = V(r, ["tkhd"])[0];
    if (n) {
      let o = n[0];
      const l = $(n, o === 0 ? 12 : 20), c = V(r, ["mdia", "mdhd"])[0];
      if (c) {
        o = c[0];
        const h = $(c, o === 0 ? 12 : 20), u = V(r, ["mdia", "hdlr"])[0];
        if (u) {
          const d = ie(u.subarray(8, 12)), g = {
            soun: X.AUDIO,
            vide: X.VIDEO
          }[d];
          if (g) {
            const f = V(r, ["mdia", "minf", "stbl", "stsd"])[0], p = In(f);
            e[l] = {
              timescale: h,
              type: g
            }, e[g] = le({
              timescale: h,
              id: l
            }, p);
          }
        }
      }
    }
  }
  return V(a, ["moov", "mvex", "trex"]).forEach((i) => {
    const r = $(i, 4), n = e[r];
    n && (n.default = {
      duration: $(i, 12),
      flags: $(i, 20)
    });
  }), e;
}
function In(a) {
  const e = a.subarray(8), t = e.subarray(86), s = ie(e.subarray(4, 8));
  let i = s;
  const r = s === "enca" || s === "encv";
  if (r) {
    const o = V(e, [s])[0].subarray(s === "enca" ? 28 : 78);
    V(o, ["sinf"]).forEach((c) => {
      const h = V(c, ["schm"])[0];
      if (h) {
        const u = ie(h.subarray(4, 8));
        if (u === "cbcs" || u === "cenc") {
          const d = V(c, ["frma"])[0];
          d && (i = ie(d));
        }
      }
    });
  }
  switch (i) {
    case "avc1":
    case "avc2":
    case "avc3":
    case "avc4": {
      const n = V(t, ["avcC"])[0];
      i += "." + nt(n[1]) + nt(n[2]) + nt(n[3]);
      break;
    }
    case "mp4a": {
      const n = V(e, [s])[0], o = V(n.subarray(28), ["esds"])[0];
      if (o && o.length > 12) {
        let l = 4;
        if (o[l++] !== 3)
          break;
        l = Bt(o, l), l += 2;
        const c = o[l++];
        if (c & 128 && (l += 2), c & 64 && (l += o[l++]), o[l++] !== 4)
          break;
        l = Bt(o, l);
        const h = o[l++];
        if (h === 64)
          i += "." + nt(h);
        else
          break;
        if (l += 12, o[l++] !== 5)
          break;
        l = Bt(o, l);
        const u = o[l++];
        let d = (u & 248) >> 3;
        d === 31 && (d += 1 + ((u & 7) << 3) + ((o[l] & 224) >> 5)), i += "." + d;
      }
      break;
    }
    case "hvc1":
    case "hev1": {
      const n = V(t, ["hvcC"])[0], o = n[1], l = ["", "A", "B", "C"][o >> 6], c = o & 31, h = $(n, 2), u = (o & 32) >> 5 ? "H" : "L", d = n[12], g = n.subarray(6, 12);
      i += "." + l + c, i += "." + h.toString(16).toUpperCase(), i += "." + u + d;
      let f = "";
      for (let p = g.length; p--; ) {
        const T = g[p];
        (T || f) && (f = "." + T.toString(16).toUpperCase() + f);
      }
      i += f;
      break;
    }
    case "dvh1":
    case "dvhe": {
      const n = V(t, ["dvcC"])[0], o = n[2] >> 1 & 127, l = n[2] << 5 & 32 | n[3] >> 3 & 31;
      i += "." + xe(o) + "." + xe(l);
      break;
    }
    case "vp09": {
      const n = V(t, ["vpcC"])[0], o = n[4], l = n[5], c = n[6] >> 4 & 15;
      i += "." + xe(o) + "." + xe(l) + "." + xe(c);
      break;
    }
    case "av01": {
      const n = V(t, ["av1C"])[0], o = n[1] >>> 5, l = n[1] & 31, c = n[2] >>> 7 ? "H" : "M", h = (n[2] & 64) >> 6, u = (n[2] & 32) >> 5, d = o === 2 && h ? u ? 12 : 10 : h ? 10 : 8, g = (n[2] & 16) >> 4, f = (n[2] & 8) >> 3, p = (n[2] & 4) >> 2, T = n[2] & 3;
      i += "." + o + "." + xe(l) + c + "." + xe(d) + "." + g + "." + f + p + T + "." + xe(1) + "." + xe(1) + "." + xe(1) + "." + 0;
      break;
    }
  }
  return {
    codec: i,
    encrypted: r
  };
}
function Bt(a, e) {
  const t = e + 5;
  for (; a[e++] & 128 && e < t; )
    ;
  return e;
}
function nt(a) {
  return ("0" + a.toString(16).toUpperCase()).slice(-2);
}
function xe(a) {
  return (a < 10 ? "0" : "") + a;
}
function bn(a, e) {
  if (!a || !e)
    return a;
  const t = e.keyId;
  return t && e.isCommonEncryption && V(a, ["moov", "trak"]).forEach((i) => {
    const n = V(i, ["mdia", "minf", "stbl", "stsd"])[0].subarray(8);
    let o = V(n, ["enca"]);
    const l = o.length > 0;
    l || (o = V(n, ["encv"])), o.forEach((c) => {
      const h = l ? c.subarray(28) : c.subarray(78);
      V(h, ["sinf"]).forEach((d) => {
        const g = Xi(d);
        if (g) {
          const f = g.subarray(8, 24);
          f.some((p) => p !== 0) || (v.log(`[eme] Patching keyId in 'enc${l ? "a" : "v"}>sinf>>tenc' box: ${Se.hexDump(f)} -> ${Se.hexDump(t)}`), g.set(t, 8));
        }
      });
    });
  }), a;
}
function Xi(a) {
  const e = V(a, ["schm"])[0];
  if (e) {
    const t = ie(e.subarray(4, 8));
    if (t === "cbcs" || t === "cenc")
      return V(a, ["schi", "tenc"])[0];
  }
  return v.error("[eme] missing 'schm' box"), null;
}
function Dn(a, e) {
  return V(e, ["moof", "traf"]).reduce((t, s) => {
    const i = V(s, ["tfdt"])[0], r = i[0], n = V(s, ["tfhd"]).reduce((o, l) => {
      const c = $(l, 4), h = a[c];
      if (h) {
        let u = $(i, 4);
        if (r === 1) {
          if (u === vt)
            return v.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time"), o;
          u *= vt + 1, u += $(i, 8);
        }
        const d = h.timescale || 9e4, g = u / d;
        if (O(g) && (o === null || g < o))
          return g;
      }
      return o;
    }, null);
    return n !== null && O(n) && (t === null || n < t) ? n : t;
  }, null);
}
function Cn(a, e) {
  let t = 0, s = 0, i = 0;
  const r = V(a, ["moof", "traf"]);
  for (let n = 0; n < r.length; n++) {
    const o = r[n], l = V(o, ["tfhd"])[0], c = $(l, 4), h = e[c];
    if (!h)
      continue;
    const u = h.default, d = $(l, 0) | (u == null ? void 0 : u.flags);
    let g = u == null ? void 0 : u.duration;
    d & 8 && (d & 2 ? g = $(l, 12) : g = $(l, 8));
    const f = h.timescale || 9e4, p = V(o, ["trun"]);
    for (let T = 0; T < p.length; T++) {
      if (t = wn(p[T]), !t && g) {
        const E = $(p[T], 4);
        t = g * E;
      }
      h.type === X.VIDEO ? s += t / f : h.type === X.AUDIO && (i += t / f);
    }
  }
  if (s === 0 && i === 0) {
    let n = 0;
    const o = V(a, ["sidx"]);
    for (let l = 0; l < o.length; l++) {
      const c = Rn(o[l]);
      c != null && c.references && (n += c.references.reduce((h, u) => h + u.info.duration || 0, 0));
    }
    return n;
  }
  return s || i;
}
function wn(a) {
  const e = $(a, 0);
  let t = 8;
  e & 1 && (t += 4), e & 4 && (t += 4);
  let s = 0;
  const i = $(a, 4);
  for (let r = 0; r < i; r++) {
    if (e & 256) {
      const n = $(a, t);
      s += n, t += 4;
    }
    e & 512 && (t += 4), e & 1024 && (t += 4), e & 2048 && (t += 4);
  }
  return s;
}
function kn(a, e, t) {
  V(e, ["moof", "traf"]).forEach((s) => {
    V(s, ["tfhd"]).forEach((i) => {
      const r = $(i, 4), n = a[r];
      if (!n)
        return;
      const o = n.timescale || 9e4;
      V(s, ["tfdt"]).forEach((l) => {
        const c = l[0], h = t * o;
        if (h) {
          let u = $(l, 4);
          if (c === 0)
            u -= h, u = Math.max(u, 0), Ut(l, 4, u);
          else {
            u *= Math.pow(2, 32), u += $(l, 8), u -= h, u = Math.max(u, 0);
            const d = Math.floor(u / (vt + 1)), g = Math.floor(u % (vt + 1));
            Ut(l, 4, d), Ut(l, 8, g);
          }
        }
      });
    });
  });
}
function _n(a) {
  const e = {
    valid: null,
    remainder: null
  }, t = V(a, ["moof"]);
  if (t.length < 2)
    return e.remainder = a, e;
  const s = t[t.length - 1];
  return e.valid = Ne(a, 0, s.byteOffset - 8), e.remainder = Ne(a, s.byteOffset - 8), e;
}
function me(a, e) {
  const t = new Uint8Array(a.length + e.length);
  return t.set(a), t.set(e, a.length), t;
}
function Bs(a, e) {
  const t = [], s = e.samples, i = e.timescale, r = e.id;
  let n = !1;
  return V(s, ["moof"]).map((l) => {
    const c = l.byteOffset - 8;
    V(l, ["traf"]).map((u) => {
      const d = V(u, ["tfdt"]).map((g) => {
        const f = g[0];
        let p = $(g, 4);
        return f === 1 && (p *= Math.pow(2, 32), p += $(g, 8)), p / i;
      })[0];
      return d !== void 0 && (a = d), V(u, ["tfhd"]).map((g) => {
        const f = $(g, 4), p = $(g, 0) & 16777215, T = (p & 1) !== 0, E = (p & 2) !== 0, y = (p & 8) !== 0;
        let x = 0;
        const I = (p & 16) !== 0;
        let S = 0;
        const D = (p & 32) !== 0;
        let R = 8;
        f === r && (T && (R += 8), E && (R += 4), y && (x = $(g, R), R += 4), I && (S = $(g, R), R += 4), D && (R += 4), e.type === "video" && (n = Pn(e.codec)), V(u, ["trun"]).map((w) => {
          const _ = w[0], b = $(w, 0) & 16777215, k = (b & 1) !== 0;
          let K = 0;
          const P = (b & 4) !== 0, G = (b & 256) !== 0;
          let j = 0;
          const H = (b & 512) !== 0;
          let B = 0;
          const J = (b & 1024) !== 0, F = (b & 2048) !== 0;
          let M = 0;
          const Y = $(w, 4);
          let W = 8;
          k && (K = $(w, W), W += 4), P && (W += 4);
          let z = K + c;
          for (let he = 0; he < Y; he++) {
            if (G ? (j = $(w, W), W += 4) : j = x, H ? (B = $(w, W), W += 4) : B = S, J && (W += 4), F && (_ === 0 ? M = $(w, W) : M = ji(w, W), W += 4), e.type === X.VIDEO) {
              let re = 0;
              for (; re < B; ) {
                const te = $(s, z);
                if (z += 4, Fn(n, s[z])) {
                  const be = s.subarray(z, z + te);
                  Qi(be, n ? 2 : 1, a + M / i, t);
                }
                z += te, re += te + 4;
              }
            }
            a += j / i;
          }
        }));
      });
    });
  }), t;
}
function Pn(a) {
  if (!a)
    return !1;
  const e = a.indexOf("."), t = e < 0 ? a : a.substring(0, e);
  return t === "hvc1" || t === "hev1" || // Dolby Vision
  t === "dvh1" || t === "dvhe";
}
function Fn(a, e) {
  if (a) {
    const t = e >> 1 & 63;
    return t === 39 || t === 40;
  } else
    return (e & 31) === 6;
}
function Qi(a, e, t, s) {
  const i = Ji(a);
  let r = 0;
  r += e;
  let n = 0, o = 0, l = 0;
  for (; r < i.length; ) {
    n = 0;
    do {
      if (r >= i.length)
        break;
      l = i[r++], n += l;
    } while (l === 255);
    o = 0;
    do {
      if (r >= i.length)
        break;
      l = i[r++], o += l;
    } while (l === 255);
    const c = i.length - r;
    let h = r;
    if (o < c)
      r += o;
    else if (o > c) {
      v.error(`Malformed SEI payload. ${o} is too small, only ${c} bytes left to parse.`);
      break;
    }
    if (n === 4) {
      if (i[h++] === 181) {
        const d = qi(i, h);
        if (h += 2, d === 49) {
          const g = $(i, h);
          if (h += 4, g === 1195456820) {
            const f = i[h++];
            if (f === 3) {
              const p = i[h++], T = 31 & p, E = 64 & p, y = E ? 2 + T * 3 : 0, x = new Uint8Array(y);
              if (E) {
                x[0] = p;
                for (let I = 1; I < y; I++)
                  x[I] = i[h++];
              }
              s.push({
                type: f,
                payloadType: n,
                pts: t,
                bytes: x
              });
            }
          }
        }
      }
    } else if (n === 5 && o > 16) {
      const u = [];
      for (let f = 0; f < 16; f++) {
        const p = i[h++].toString(16);
        u.push(p.length == 1 ? "0" + p : p), (f === 3 || f === 5 || f === 7 || f === 9) && u.push("-");
      }
      const d = o - 16, g = new Uint8Array(d);
      for (let f = 0; f < d; f++)
        g[f] = i[h++];
      s.push({
        payloadType: n,
        pts: t,
        uuid: u.join(""),
        userData: Re(g),
        userDataBytes: g
      });
    }
  }
}
function Ji(a) {
  const e = a.byteLength, t = [];
  let s = 1;
  for (; s < e - 2; )
    a[s] === 0 && a[s + 1] === 0 && a[s + 2] === 3 ? (t.push(s + 2), s += 2) : s++;
  if (t.length === 0)
    return a;
  const i = e - t.length, r = new Uint8Array(i);
  let n = 0;
  for (s = 0; s < i; n++, s++)
    n === t[0] && (n++, t.shift()), r[s] = a[n];
  return r;
}
function On(a) {
  const e = a[0];
  let t = "", s = "", i = 0, r = 0, n = 0, o = 0, l = 0, c = 0;
  if (e === 0) {
    for (; ie(a.subarray(c, c + 1)) !== "\0"; )
      t += ie(a.subarray(c, c + 1)), c += 1;
    for (t += ie(a.subarray(c, c + 1)), c += 1; ie(a.subarray(c, c + 1)) !== "\0"; )
      s += ie(a.subarray(c, c + 1)), c += 1;
    s += ie(a.subarray(c, c + 1)), c += 1, i = $(a, 12), r = $(a, 16), o = $(a, 20), l = $(a, 24), c = 28;
  } else if (e === 1) {
    c += 4, i = $(a, c), c += 4;
    const u = $(a, c);
    c += 4;
    const d = $(a, c);
    for (c += 4, n = 2 ** 32 * u + d, Qr(n) || (n = Number.MAX_SAFE_INTEGER, v.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")), o = $(a, c), c += 4, l = $(a, c), c += 4; ie(a.subarray(c, c + 1)) !== "\0"; )
      t += ie(a.subarray(c, c + 1)), c += 1;
    for (t += ie(a.subarray(c, c + 1)), c += 1; ie(a.subarray(c, c + 1)) !== "\0"; )
      s += ie(a.subarray(c, c + 1)), c += 1;
    s += ie(a.subarray(c, c + 1)), c += 1;
  }
  const h = a.subarray(c, a.byteLength);
  return {
    schemeIdUri: t,
    value: s,
    timeScale: i,
    presentationTime: n,
    presentationTimeDelta: r,
    eventDuration: o,
    id: l,
    payload: h
  };
}
function Mn(a, ...e) {
  const t = e.length;
  let s = 8, i = t;
  for (; i--; )
    s += e[i].byteLength;
  const r = new Uint8Array(s);
  for (r[0] = s >> 24 & 255, r[1] = s >> 16 & 255, r[2] = s >> 8 & 255, r[3] = s & 255, r.set(a, 4), i = 0, s = 8; i < t; i++)
    r.set(e[i], s), s += e[i].byteLength;
  return r;
}
function Nn(a, e, t) {
  if (a.byteLength !== 16)
    throw new RangeError("Invalid system id");
  let s, i;
  if (e) {
    s = 1, i = new Uint8Array(e.length * 16);
    for (let o = 0; o < e.length; o++) {
      const l = e[o];
      if (l.byteLength !== 16)
        throw new RangeError("Invalid key");
      i.set(l, o * 16);
    }
  } else
    s = 0, i = new Uint8Array();
  let r;
  s > 0 ? (r = new Uint8Array(4), e.length > 0 && new DataView(r.buffer).setUint32(0, e.length, !1)) : r = new Uint8Array();
  const n = new Uint8Array(4);
  return t && t.byteLength > 0 && new DataView(n.buffer).setUint32(0, t.byteLength, !1), Mn(
    [112, 115, 115, 104],
    new Uint8Array([
      s,
      0,
      0,
      0
      // Flags
    ]),
    a,
    // 16 bytes
    r,
    i,
    n,
    t || new Uint8Array()
  );
}
function Un(a) {
  if (!(a instanceof ArrayBuffer) || a.byteLength < 32)
    return null;
  const e = {
    version: 0,
    systemId: "",
    kids: null,
    data: null
  }, t = new DataView(a), s = t.getUint32(0);
  if (a.byteLength !== s && s > 44 || t.getUint32(4) !== 1886614376 || (e.version = t.getUint32(8) >>> 24, e.version > 1))
    return null;
  e.systemId = Se.hexDump(new Uint8Array(a, 12, 16));
  const r = t.getUint32(28);
  if (e.version === 0) {
    if (s - 32 < r)
      return null;
    e.data = new Uint8Array(a, 32, r);
  } else if (e.version === 1) {
    e.kids = [];
    for (let n = 0; n < r; n++)
      e.kids.push(new Uint8Array(a, 32 + n * 16, 16));
  }
  return e;
}
let at = {};
class it {
  static clearKeyUriToKeyIdMap() {
    at = {};
  }
  constructor(e, t, s, i = [1], r = null) {
    this.uri = void 0, this.method = void 0, this.keyFormat = void 0, this.keyFormatVersions = void 0, this.encrypted = void 0, this.isCommonEncryption = void 0, this.iv = null, this.key = null, this.keyId = null, this.pssh = null, this.method = e, this.uri = t, this.keyFormat = s, this.keyFormatVersions = i, this.iv = r, this.encrypted = e ? e !== "NONE" : !1, this.isCommonEncryption = this.encrypted && e !== "AES-128";
  }
  isSupported() {
    if (this.method) {
      if (this.method === "AES-128" || this.method === "NONE")
        return !0;
      if (this.keyFormat === "identity")
        return this.method === "SAMPLE-AES";
      switch (this.keyFormat) {
        case de.FAIRPLAY:
        case de.WIDEVINE:
        case de.PLAYREADY:
        case de.CLEARKEY:
          return ["ISO-23001-7", "SAMPLE-AES", "SAMPLE-AES-CENC", "SAMPLE-AES-CTR"].indexOf(this.method) !== -1;
      }
    }
    return !1;
  }
  getDecryptData(e) {
    if (!this.encrypted || !this.uri)
      return null;
    if (this.method === "AES-128" && this.uri && !this.iv) {
      typeof e != "number" && (this.method === "AES-128" && !this.iv && v.warn(`missing IV for initialization segment with method="${this.method}" - compliance issue`), e = 0);
      const s = Bn(e);
      return new it(this.method, this.uri, "identity", this.keyFormatVersions, s);
    }
    const t = un(this.uri);
    if (t)
      switch (this.keyFormat) {
        case de.WIDEVINE:
          this.pssh = t, t.length >= 22 && (this.keyId = t.subarray(t.length - 22, t.length - 6));
          break;
        case de.PLAYREADY: {
          const s = new Uint8Array([154, 4, 240, 121, 152, 64, 66, 134, 171, 146, 230, 91, 224, 136, 95, 149]);
          this.pssh = Nn(s, null, t);
          const i = new Uint16Array(t.buffer, t.byteOffset, t.byteLength / 2), r = String.fromCharCode.apply(null, Array.from(i)), n = r.substring(r.indexOf("<"), r.length), c = new DOMParser().parseFromString(n, "text/xml").getElementsByTagName("KID")[0];
          if (c) {
            const h = c.childNodes[0] ? c.childNodes[0].nodeValue : c.getAttribute("VALUE");
            if (h) {
              const u = Es(h).subarray(0, 16);
              hn(u), this.keyId = u;
            }
          }
          break;
        }
        default: {
          let s = t.subarray(0, 16);
          if (s.length !== 16) {
            const i = new Uint8Array(16);
            i.set(s, 16 - s.length), s = i;
          }
          this.keyId = s;
          break;
        }
      }
    if (!this.keyId || this.keyId.byteLength !== 16) {
      let s = at[this.uri];
      if (!s) {
        const i = Object.keys(at).length % Number.MAX_SAFE_INTEGER;
        s = new Uint8Array(16), new DataView(s.buffer, 12, 4).setUint32(0, i), at[this.uri] = s;
      }
      this.keyId = s;
    }
    return this;
  }
}
function Bn(a) {
  const e = new Uint8Array(16);
  for (let t = 12; t < 16; t++)
    e[t] = a >> 8 * (15 - t) & 255;
  return e;
}
const Zi = /\{\$([a-zA-Z0-9-_]+)\}/g;
function $s(a) {
  return Zi.test(a);
}
function ue(a, e, t) {
  if (a.variableList !== null || a.hasVariableRefs)
    for (let s = t.length; s--; ) {
      const i = t[s], r = e[i];
      r && (e[i] = rs(a, r));
    }
}
function rs(a, e) {
  if (a.variableList !== null || a.hasVariableRefs) {
    const t = a.variableList;
    return e.replace(Zi, (s) => {
      const i = s.substring(2, s.length - 1), r = t == null ? void 0 : t[i];
      return r === void 0 ? (a.playlistParsingError || (a.playlistParsingError = new Error(`Missing preceding EXT-X-DEFINE tag for Variable Reference: "${i}"`)), s) : r;
    });
  }
  return e;
}
function Gs(a, e, t) {
  let s = a.variableList;
  s || (a.variableList = s = {});
  let i, r;
  if ("QUERYPARAM" in e) {
    i = e.QUERYPARAM;
    try {
      const n = new self.URL(t).searchParams;
      if (n.has(i))
        r = n.get(i);
      else
        throw new Error(`"${i}" does not match any query parameter in URI: "${t}"`);
    } catch (n) {
      a.playlistParsingError || (a.playlistParsingError = new Error(`EXT-X-DEFINE QUERYPARAM: ${n.message}`));
    }
  } else
    i = e.NAME, r = e.VALUE;
  i in s ? a.playlistParsingError || (a.playlistParsingError = new Error(`EXT-X-DEFINE duplicate Variable Name declarations: "${i}"`)) : s[i] = r || "";
}
function $n(a, e, t) {
  const s = e.IMPORT;
  if (t && s in t) {
    let i = a.variableList;
    i || (a.variableList = i = {}), i[s] = t[s];
  } else
    a.playlistParsingError || (a.playlistParsingError = new Error(`EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "${s}"`));
}
function Je(a = !0) {
  return typeof self > "u" ? void 0 : (a || !self.MediaSource) && self.ManagedMediaSource || self.MediaSource || self.WebKitMediaSource;
}
const At = {
  audio: {
    a3ds: 1,
    "ac-3": 0.95,
    "ac-4": 1,
    alac: 0.9,
    alaw: 1,
    dra1: 1,
    "dts+": 1,
    "dts-": 1,
    dtsc: 1,
    dtse: 1,
    dtsh: 1,
    "ec-3": 0.9,
    enca: 1,
    fLaC: 0.9,
    // MP4-RA listed codec entry for FLAC
    flac: 0.9,
    // legacy browser codec name for FLAC
    FLAC: 0.9,
    // some manifests may list "FLAC" with Apple's tools
    g719: 1,
    g726: 1,
    m4ae: 1,
    mha1: 1,
    mha2: 1,
    mhm1: 1,
    mhm2: 1,
    mlpa: 1,
    mp4a: 1,
    "raw ": 1,
    Opus: 1,
    opus: 1,
    // browsers expect this to be lowercase despite MP4RA says 'Opus'
    samr: 1,
    sawb: 1,
    sawp: 1,
    sevc: 1,
    sqcp: 1,
    ssmv: 1,
    twos: 1,
    ulaw: 1
  },
  video: {
    avc1: 1,
    avc2: 1,
    avc3: 1,
    avc4: 1,
    avcp: 1,
    av01: 0.8,
    drac: 1,
    dva1: 1,
    dvav: 1,
    dvh1: 0.7,
    dvhe: 0.7,
    encv: 1,
    hev1: 0.75,
    hvc1: 0.75,
    mjp2: 1,
    mp4v: 1,
    mvc1: 1,
    mvc2: 1,
    mvc3: 1,
    mvc4: 1,
    resv: 1,
    rv60: 1,
    s263: 1,
    svc1: 1,
    svc2: 1,
    "vc-1": 1,
    vp08: 1,
    vp09: 0.9
  },
  text: {
    stpp: 1,
    wvtt: 1
  }
};
function Gn(a, e) {
  const t = At[e];
  return !!t && !!t[a.slice(0, 4)];
}
function $t(a, e, t = !0) {
  return !a.split(",").some((s) => !er(s, e, t));
}
function er(a, e, t = !0) {
  var s;
  const i = Je(t);
  return (s = i == null ? void 0 : i.isTypeSupported(rt(a, e))) != null ? s : !1;
}
function rt(a, e) {
  return `${e}/mp4;codecs="${a}"`;
}
function Ks(a) {
  if (a) {
    const e = a.substring(0, 4);
    return At.video[e];
  }
  return 2;
}
function Lt(a) {
  return a.split(",").reduce((e, t) => {
    const s = At.video[t];
    return s ? (s * 2 + e) / (e ? 3 : 2) : (At.audio[t] + e) / (e ? 2 : 1);
  }, 0);
}
const Gt = {};
function Kn(a, e = !0) {
  if (Gt[a])
    return Gt[a];
  const t = {
    flac: ["flac", "fLaC", "FLAC"],
    opus: ["opus", "Opus"]
  }[a];
  for (let s = 0; s < t.length; s++)
    if (er(t[s], "audio", e))
      return Gt[a] = t[s], t[s];
  return a;
}
const Vn = /flac|opus/i;
function Rt(a, e = !0) {
  return a.replace(Vn, (t) => Kn(t.toLowerCase(), e));
}
function Vs(a, e) {
  return a && a !== "mp4a" ? a : e;
}
function Hn(a) {
  const e = a.split(".");
  if (e.length > 2) {
    let t = e.shift() + ".";
    return t += parseInt(e.shift()).toString(16), t += ("000" + parseInt(e.shift()).toString(16)).slice(-4), t;
  }
  return a;
}
const Hs = /#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g, Ws = /#EXT-X-MEDIA:(.*)/g, Wn = /^#EXT(?:INF|-X-TARGETDURATION):/m, Ys = new RegExp([
  /#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,
  // duration (#EXTINF:<duration>,<title>), group 1 => duration, group 2 => title
  /(?!#) *(\S[\S ]*)/.source,
  // segment URI, group 3 => the URI (note newline is not eaten)
  /#EXT-X-BYTERANGE:*(.+)/.source,
  // next segment's byterange, group 4 => range spec (x@y)
  /#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,
  // next segment's program date/time group 5 => the datetime spec
  /#.*/.source
  // All other non-segment oriented tags will match with all groups empty
].join("|"), "g"), Yn = new RegExp([/#(EXTM3U)/.source, /#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source, /#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source, /#EXT-X-(DISCONTINUITY|ENDLIST|GAP|INDEPENDENT-SEGMENTS)/.source, /(#)([^:]*):(.*)/.source, /(#)(.*)(?:.*)\r?\n?/.source].join("|"));
class Ae {
  static findGroup(e, t) {
    for (let s = 0; s < e.length; s++) {
      const i = e[s];
      if (i.id === t)
        return i;
    }
  }
  static resolve(e, t) {
    return Ts.buildAbsoluteURL(t, e, {
      alwaysNormalize: !0
    });
  }
  static isMediaPlaylist(e) {
    return Wn.test(e);
  }
  static parseMasterPlaylist(e, t) {
    const s = $s(e), i = {
      contentSteering: null,
      levels: [],
      playlistParsingError: null,
      sessionData: null,
      sessionKeys: null,
      startTimeOffset: null,
      variableList: null,
      hasVariableRefs: s
    }, r = [];
    Hs.lastIndex = 0;
    let n;
    for (; (n = Hs.exec(e)) != null; )
      if (n[1]) {
        var o;
        const c = new ee(n[1]);
        ue(i, c, ["CODECS", "SUPPLEMENTAL-CODECS", "ALLOWED-CPC", "PATHWAY-ID", "STABLE-VARIANT-ID", "AUDIO", "VIDEO", "SUBTITLES", "CLOSED-CAPTIONS", "NAME"]);
        const h = rs(i, n[2]), u = {
          attrs: c,
          bitrate: c.decimalInteger("BANDWIDTH") || c.decimalInteger("AVERAGE-BANDWIDTH"),
          name: c.NAME,
          url: Ae.resolve(h, t)
        }, d = c.decimalResolution("RESOLUTION");
        d && (u.width = d.width, u.height = d.height), qn(c.CODECS, u), (o = u.unknownCodecs) != null && o.length || r.push(u), i.levels.push(u);
      } else if (n[3]) {
        const c = n[3], h = n[4];
        switch (c) {
          case "SESSION-DATA": {
            const u = new ee(h);
            ue(i, u, ["DATA-ID", "LANGUAGE", "VALUE", "URI"]);
            const d = u["DATA-ID"];
            d && (i.sessionData === null && (i.sessionData = {}), i.sessionData[d] = u);
            break;
          }
          case "SESSION-KEY": {
            const u = qs(h, t, i);
            u.encrypted && u.isSupported() ? (i.sessionKeys === null && (i.sessionKeys = []), i.sessionKeys.push(u)) : v.warn(`[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "${h}"`);
            break;
          }
          case "DEFINE": {
            {
              const u = new ee(h);
              ue(i, u, ["NAME", "VALUE", "QUERYPARAM"]), Gs(i, u, t);
            }
            break;
          }
          case "CONTENT-STEERING": {
            const u = new ee(h);
            ue(i, u, ["SERVER-URI", "PATHWAY-ID"]), i.contentSteering = {
              uri: Ae.resolve(u["SERVER-URI"], t),
              pathwayId: u["PATHWAY-ID"] || "."
            };
            break;
          }
          case "START": {
            i.startTimeOffset = js(h);
            break;
          }
        }
      }
    const l = r.length > 0 && r.length < i.levels.length;
    return i.levels = l ? r : i.levels, i.levels.length === 0 && (i.playlistParsingError = new Error("no levels found in manifest")), i;
  }
  static parseMasterPlaylistMedia(e, t, s) {
    let i;
    const r = {}, n = s.levels, o = {
      AUDIO: n.map((c) => ({
        id: c.attrs.AUDIO,
        audioCodec: c.audioCodec
      })),
      SUBTITLES: n.map((c) => ({
        id: c.attrs.SUBTITLES,
        textCodec: c.textCodec
      })),
      "CLOSED-CAPTIONS": []
    };
    let l = 0;
    for (Ws.lastIndex = 0; (i = Ws.exec(e)) !== null; ) {
      const c = new ee(i[1]), h = c.TYPE;
      if (h) {
        const u = o[h], d = r[h] || [];
        r[h] = d, ue(s, c, ["URI", "GROUP-ID", "LANGUAGE", "ASSOC-LANGUAGE", "STABLE-RENDITION-ID", "NAME", "INSTREAM-ID", "CHARACTERISTICS", "CHANNELS"]);
        const g = c.LANGUAGE, f = c["ASSOC-LANGUAGE"], p = c.CHANNELS, T = c.CHARACTERISTICS, E = c["INSTREAM-ID"], y = {
          attrs: c,
          bitrate: 0,
          id: l++,
          groupId: c["GROUP-ID"] || "",
          name: c.NAME || g || "",
          type: h,
          default: c.bool("DEFAULT"),
          autoselect: c.bool("AUTOSELECT"),
          forced: c.bool("FORCED"),
          lang: g,
          url: c.URI ? Ae.resolve(c.URI, t) : ""
        };
        if (f && (y.assocLang = f), p && (y.channels = p), T && (y.characteristics = T), E && (y.instreamId = E), u != null && u.length) {
          const x = Ae.findGroup(u, y.groupId) || u[0];
          zs(y, x, "audioCodec"), zs(y, x, "textCodec");
        }
        d.push(y);
      }
    }
    return r;
  }
  static parseLevelPlaylist(e, t, s, i, r, n) {
    const o = new ln(t), l = o.fragments;
    let c = null, h = 0, u = 0, d = 0, g = 0, f = null, p = new Ot(i, t), T, E, y, x = -1, I = !1, S = null;
    for (Ys.lastIndex = 0, o.m3u8 = e, o.hasVariableRefs = $s(e); (T = Ys.exec(e)) !== null; ) {
      I && (I = !1, p = new Ot(i, t), p.start = d, p.sn = h, p.cc = g, p.level = s, c && (p.initSegment = c, p.rawProgramDateTime = c.rawProgramDateTime, c.rawProgramDateTime = null, S && (p.setByteRange(S), S = null)));
      const _ = T[1];
      if (_) {
        p.duration = parseFloat(_);
        const b = (" " + T[2]).slice(1);
        p.title = b || null, p.tagList.push(b ? ["INF", _, b] : ["INF", _]);
      } else if (T[3]) {
        if (O(p.duration)) {
          p.start = d, y && Js(p, y, o), p.sn = h, p.level = s, p.cc = g, l.push(p);
          const b = (" " + T[3]).slice(1);
          p.relurl = rs(o, b), Xs(p, f), f = p, d += p.duration, h++, u = 0, I = !0;
        }
      } else if (T[4]) {
        const b = (" " + T[4]).slice(1);
        f ? p.setByteRange(b, f) : p.setByteRange(b);
      } else if (T[5])
        p.rawProgramDateTime = (" " + T[5]).slice(1), p.tagList.push(["PROGRAM-DATE-TIME", p.rawProgramDateTime]), x === -1 && (x = l.length);
      else {
        if (T = T[0].match(Yn), !T) {
          v.warn("No matches on slow regex match for level playlist!");
          continue;
        }
        for (E = 1; E < T.length && !(typeof T[E] < "u"); E++)
          ;
        const b = (" " + T[E]).slice(1), k = (" " + T[E + 1]).slice(1), K = T[E + 2] ? (" " + T[E + 2]).slice(1) : "";
        switch (b) {
          case "PLAYLIST-TYPE":
            o.type = k.toUpperCase();
            break;
          case "MEDIA-SEQUENCE":
            h = o.startSN = parseInt(k);
            break;
          case "SKIP": {
            const P = new ee(k);
            ue(o, P, ["RECENTLY-REMOVED-DATERANGES"]);
            const G = P.decimalInteger("SKIPPED-SEGMENTS");
            if (O(G)) {
              o.skippedSegments = G;
              for (let H = G; H--; )
                l.unshift(null);
              h += G;
            }
            const j = P.enumeratedString("RECENTLY-REMOVED-DATERANGES");
            j && (o.recentlyRemovedDateranges = j.split("	"));
            break;
          }
          case "TARGETDURATION":
            o.targetduration = Math.max(parseInt(k), 1);
            break;
          case "VERSION":
            o.version = parseInt(k);
            break;
          case "INDEPENDENT-SEGMENTS":
          case "EXTM3U":
            break;
          case "ENDLIST":
            o.live = !1;
            break;
          case "#":
            (k || K) && p.tagList.push(K ? [k, K] : [k]);
            break;
          case "DISCONTINUITY":
            g++, p.tagList.push(["DIS"]);
            break;
          case "GAP":
            p.gap = !0, p.tagList.push([b]);
            break;
          case "BITRATE":
            p.tagList.push([b, k]);
            break;
          case "DATERANGE": {
            const P = new ee(k);
            ue(o, P, ["ID", "CLASS", "START-DATE", "END-DATE", "SCTE35-CMD", "SCTE35-OUT", "SCTE35-IN"]), ue(o, P, P.clientAttrs);
            const G = new Bi(P, o.dateRanges[P.ID]);
            G.isValid || o.skippedSegments ? o.dateRanges[G.id] = G : v.warn(`Ignoring invalid DATERANGE tag: "${k}"`), p.tagList.push(["EXT-X-DATERANGE", k]);
            break;
          }
          case "DEFINE": {
            {
              const P = new ee(k);
              ue(o, P, ["NAME", "VALUE", "IMPORT", "QUERYPARAM"]), "IMPORT" in P ? $n(o, P, n) : Gs(o, P, t);
            }
            break;
          }
          case "DISCONTINUITY-SEQUENCE":
            g = parseInt(k);
            break;
          case "KEY": {
            const P = qs(k, t, o);
            if (P.isSupported()) {
              if (P.method === "NONE") {
                y = void 0;
                break;
              }
              y || (y = {}), y[P.keyFormat] && (y = se({}, y)), y[P.keyFormat] = P;
            } else
              v.warn(`[Keys] Ignoring invalid EXT-X-KEY tag: "${k}"`);
            break;
          }
          case "START":
            o.startTimeOffset = js(k);
            break;
          case "MAP": {
            const P = new ee(k);
            if (ue(o, P, ["BYTERANGE", "URI"]), p.duration) {
              const G = new Ot(i, t);
              Qs(G, P, s, y), c = G, p.initSegment = c, c.rawProgramDateTime && !p.rawProgramDateTime && (p.rawProgramDateTime = c.rawProgramDateTime);
            } else {
              const G = p.byteRangeEndOffset;
              if (G) {
                const j = p.byteRangeStartOffset;
                S = `${G - j}@${j}`;
              } else
                S = null;
              Qs(p, P, s, y), c = p, I = !0;
            }
            break;
          }
          case "SERVER-CONTROL": {
            const P = new ee(k);
            o.canBlockReload = P.bool("CAN-BLOCK-RELOAD"), o.canSkipUntil = P.optionalFloat("CAN-SKIP-UNTIL", 0), o.canSkipDateRanges = o.canSkipUntil > 0 && P.bool("CAN-SKIP-DATERANGES"), o.partHoldBack = P.optionalFloat("PART-HOLD-BACK", 0), o.holdBack = P.optionalFloat("HOLD-BACK", 0);
            break;
          }
          case "PART-INF": {
            const P = new ee(k);
            o.partTarget = P.decimalFloatingPoint("PART-TARGET");
            break;
          }
          case "PART": {
            let P = o.partList;
            P || (P = o.partList = []);
            const G = u > 0 ? P[P.length - 1] : void 0, j = u++, H = new ee(k);
            ue(o, H, ["BYTERANGE", "URI"]);
            const B = new an(H, p, t, j, G);
            P.push(B), p.duration += B.duration;
            break;
          }
          case "PRELOAD-HINT": {
            const P = new ee(k);
            ue(o, P, ["URI"]), o.preloadHint = P;
            break;
          }
          case "RENDITION-REPORT": {
            const P = new ee(k);
            ue(o, P, ["URI"]), o.renditionReports = o.renditionReports || [], o.renditionReports.push(P);
            break;
          }
          default:
            v.warn(`line parsed but not handled: ${T}`);
            break;
        }
      }
    }
    f && !f.relurl ? (l.pop(), d -= f.duration, o.partList && (o.fragmentHint = f)) : o.partList && (Xs(p, f), p.cc = g, o.fragmentHint = p, y && Js(p, y, o));
    const D = l.length, R = l[0], w = l[D - 1];
    if (d += o.skippedSegments * o.targetduration, d > 0 && D && w) {
      o.averagetargetduration = d / D;
      const _ = w.sn;
      o.endSN = _ !== "initSegment" ? _ : 0, o.live || (w.endList = !0), R && (o.startCC = R.cc);
    } else
      o.endSN = 0, o.startCC = 0;
    return o.fragmentHint && (d += o.fragmentHint.duration), o.totalduration = d, o.endCC = g, x > 0 && jn(l, x), o;
  }
}
function qs(a, e, t) {
  var s, i;
  const r = new ee(a);
  ue(t, r, ["KEYFORMAT", "KEYFORMATVERSIONS", "URI", "IV", "URI"]);
  const n = (s = r.METHOD) != null ? s : "", o = r.URI, l = r.hexadecimalInteger("IV"), c = r.KEYFORMATVERSIONS, h = (i = r.KEYFORMAT) != null ? i : "identity";
  o && r.IV && !l && v.error(`Invalid IV: ${r.IV}`);
  const u = o ? Ae.resolve(o, e) : "", d = (c || "1").split("/").map(Number).filter(Number.isFinite);
  return new it(n, u, h, d, l);
}
function js(a) {
  const t = new ee(a).decimalFloatingPoint("TIME-OFFSET");
  return O(t) ? t : null;
}
function qn(a, e) {
  let t = (a || "").split(/[ ,]+/).filter((s) => s);
  ["video", "audio", "text"].forEach((s) => {
    const i = t.filter((r) => Gn(r, s));
    i.length && (e[`${s}Codec`] = i.join(","), t = t.filter((r) => i.indexOf(r) === -1));
  }), e.unknownCodecs = t;
}
function zs(a, e, t) {
  const s = e[t];
  s && (a[t] = s);
}
function jn(a, e) {
  let t = a[e];
  for (let s = e; s--; ) {
    const i = a[s];
    if (!i)
      return;
    i.programDateTime = t.programDateTime - i.duration * 1e3, t = i;
  }
}
function Xs(a, e) {
  a.rawProgramDateTime ? a.programDateTime = Date.parse(a.rawProgramDateTime) : e != null && e.programDateTime && (a.programDateTime = e.endProgramDateTime), O(a.programDateTime) || (a.programDateTime = null, a.rawProgramDateTime = null);
}
function Qs(a, e, t, s) {
  a.relurl = e.URI, e.BYTERANGE && a.setByteRange(e.BYTERANGE), a.level = t, a.sn = "initSegment", s && (a.levelkeys = s), a.initSegment = null;
}
function Js(a, e, t) {
  a.levelkeys = e;
  const {
    encryptedFragments: s
  } = t;
  (!s.length || s[s.length - 1].levelkeys !== e) && Object.keys(e).some((i) => e[i].isCommonEncryption) && s.push(a);
}
var q = {
  MANIFEST: "manifest",
  LEVEL: "level",
  AUDIO_TRACK: "audioTrack",
  SUBTITLE_TRACK: "subtitleTrack"
}, N = {
  MAIN: "main",
  AUDIO: "audio",
  SUBTITLE: "subtitle"
};
function Zs(a) {
  const {
    type: e
  } = a;
  switch (e) {
    case q.AUDIO_TRACK:
      return N.AUDIO;
    case q.SUBTITLE_TRACK:
      return N.SUBTITLE;
    default:
      return N.MAIN;
  }
}
function Kt(a, e) {
  let t = a.url;
  return (t === void 0 || t.indexOf("data:") === 0) && (t = e.url), t;
}
class zn {
  constructor(e) {
    this.hls = void 0, this.loaders = /* @__PURE__ */ Object.create(null), this.variableList = null, this.hls = e, this.registerListeners();
  }
  startLoad(e) {
  }
  stopLoad() {
    this.destroyInternalLoaders();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.LEVEL_LOADING, this.onLevelLoading, this), e.on(m.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), e.on(m.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.LEVEL_LOADING, this.onLevelLoading, this), e.off(m.AUDIO_TRACK_LOADING, this.onAudioTrackLoading, this), e.off(m.SUBTITLE_TRACK_LOADING, this.onSubtitleTrackLoading, this);
  }
  /**
   * Returns defaults or configured loader-type overloads (pLoader and loader config params)
   */
  createInternalLoader(e) {
    const t = this.hls.config, s = t.pLoader, i = t.loader, r = s || i, n = new r(t);
    return this.loaders[e.type] = n, n;
  }
  getInternalLoader(e) {
    return this.loaders[e.type];
  }
  resetInternalLoader(e) {
    this.loaders[e] && delete this.loaders[e];
  }
  /**
   * Call `destroy` on all internal loader instances mapped (one per context type)
   */
  destroyInternalLoaders() {
    for (const e in this.loaders) {
      const t = this.loaders[e];
      t && t.destroy(), this.resetInternalLoader(e);
    }
  }
  destroy() {
    this.variableList = null, this.unregisterListeners(), this.destroyInternalLoaders();
  }
  onManifestLoading(e, t) {
    const {
      url: s
    } = t;
    this.variableList = null, this.load({
      id: null,
      level: 0,
      responseType: "text",
      type: q.MANIFEST,
      url: s,
      deliveryDirectives: null
    });
  }
  onLevelLoading(e, t) {
    const {
      id: s,
      level: i,
      pathwayId: r,
      url: n,
      deliveryDirectives: o
    } = t;
    this.load({
      id: s,
      level: i,
      pathwayId: r,
      responseType: "text",
      type: q.LEVEL,
      url: n,
      deliveryDirectives: o
    });
  }
  onAudioTrackLoading(e, t) {
    const {
      id: s,
      groupId: i,
      url: r,
      deliveryDirectives: n
    } = t;
    this.load({
      id: s,
      groupId: i,
      level: null,
      responseType: "text",
      type: q.AUDIO_TRACK,
      url: r,
      deliveryDirectives: n
    });
  }
  onSubtitleTrackLoading(e, t) {
    const {
      id: s,
      groupId: i,
      url: r,
      deliveryDirectives: n
    } = t;
    this.load({
      id: s,
      groupId: i,
      level: null,
      responseType: "text",
      type: q.SUBTITLE_TRACK,
      url: r,
      deliveryDirectives: n
    });
  }
  load(e) {
    var t;
    const s = this.hls.config;
    let i = this.getInternalLoader(e);
    if (i) {
      const c = i.context;
      if (c && c.url === e.url && c.level === e.level) {
        v.trace("[playlist-loader]: playlist request ongoing");
        return;
      }
      v.log(`[playlist-loader]: aborting previous loader for type: ${e.type}`), i.abort();
    }
    let r;
    if (e.type === q.MANIFEST ? r = s.manifestLoadPolicy.default : r = se({}, s.playlistLoadPolicy.default, {
      timeoutRetry: null,
      errorRetry: null
    }), i = this.createInternalLoader(e), O((t = e.deliveryDirectives) == null ? void 0 : t.part)) {
      let c;
      if (e.type === q.LEVEL && e.level !== null ? c = this.hls.levels[e.level].details : e.type === q.AUDIO_TRACK && e.id !== null ? c = this.hls.audioTracks[e.id].details : e.type === q.SUBTITLE_TRACK && e.id !== null && (c = this.hls.subtitleTracks[e.id].details), c) {
        const h = c.partTarget, u = c.targetduration;
        if (h && u) {
          const d = Math.max(h * 3, u * 0.8) * 1e3;
          r = se({}, r, {
            maxTimeToFirstByteMs: Math.min(d, r.maxTimeToFirstByteMs),
            maxLoadTimeMs: Math.min(d, r.maxTimeToFirstByteMs)
          });
        }
      }
    }
    const n = r.errorRetry || r.timeoutRetry || {}, o = {
      loadPolicy: r,
      timeout: r.maxLoadTimeMs,
      maxRetry: n.maxNumRetry || 0,
      retryDelay: n.retryDelayMs || 0,
      maxRetryDelay: n.maxRetryDelayMs || 0
    }, l = {
      onSuccess: (c, h, u, d) => {
        const g = this.getInternalLoader(u);
        this.resetInternalLoader(u.type);
        const f = c.data;
        if (f.indexOf("#EXTM3U") !== 0) {
          this.handleManifestParsingError(c, u, new Error("no EXTM3U delimiter"), d || null, h);
          return;
        }
        h.parsing.start = performance.now(), Ae.isMediaPlaylist(f) ? this.handleTrackOrLevelPlaylist(c, h, u, d || null, g) : this.handleMasterPlaylist(c, h, u, d);
      },
      onError: (c, h, u, d) => {
        this.handleNetworkError(h, u, !1, c, d);
      },
      onTimeout: (c, h, u) => {
        this.handleNetworkError(h, u, !0, void 0, c);
      }
    };
    i.load(e, o, l);
  }
  handleMasterPlaylist(e, t, s, i) {
    const r = this.hls, n = e.data, o = Kt(e, s), l = Ae.parseMasterPlaylist(n, o);
    if (l.playlistParsingError) {
      this.handleManifestParsingError(e, s, l.playlistParsingError, i, t);
      return;
    }
    const {
      contentSteering: c,
      levels: h,
      sessionData: u,
      sessionKeys: d,
      startTimeOffset: g,
      variableList: f
    } = l;
    this.variableList = f;
    const {
      AUDIO: p = [],
      SUBTITLES: T,
      "CLOSED-CAPTIONS": E
    } = Ae.parseMasterPlaylistMedia(n, o, l);
    p.length && !p.some((x) => !x.url) && h[0].audioCodec && !h[0].attrs.AUDIO && (v.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"), p.unshift({
      type: "main",
      name: "main",
      groupId: "main",
      default: !1,
      autoselect: !1,
      forced: !1,
      id: -1,
      attrs: new ee({}),
      bitrate: 0,
      url: ""
    })), r.trigger(m.MANIFEST_LOADED, {
      levels: h,
      audioTracks: p,
      subtitles: T,
      captions: E,
      contentSteering: c,
      url: o,
      stats: t,
      networkDetails: i,
      sessionData: u,
      sessionKeys: d,
      startTimeOffset: g,
      variableList: f
    });
  }
  handleTrackOrLevelPlaylist(e, t, s, i, r) {
    const n = this.hls, {
      id: o,
      level: l,
      type: c
    } = s, h = Kt(e, s), u = 0, d = O(l) ? l : O(o) ? o : 0, g = Zs(s), f = Ae.parseLevelPlaylist(e.data, h, d, g, u, this.variableList);
    if (c === q.MANIFEST) {
      const p = {
        attrs: new ee({}),
        bitrate: 0,
        details: f,
        name: "",
        url: h
      };
      n.trigger(m.MANIFEST_LOADED, {
        levels: [p],
        audioTracks: [],
        url: h,
        stats: t,
        networkDetails: i,
        sessionData: null,
        sessionKeys: null,
        contentSteering: null,
        startTimeOffset: null,
        variableList: null
      });
    }
    t.parsing.end = performance.now(), s.levelDetails = f, this.handlePlaylistLoaded(f, e, t, s, i, r);
  }
  handleManifestParsingError(e, t, s, i, r) {
    this.hls.trigger(m.ERROR, {
      type: U.NETWORK_ERROR,
      details: L.MANIFEST_PARSING_ERROR,
      fatal: t.type === q.MANIFEST,
      url: e.url,
      err: s,
      error: s,
      reason: s.message,
      response: e,
      context: t,
      networkDetails: i,
      stats: r
    });
  }
  handleNetworkError(e, t, s = !1, i, r) {
    let n = `A network ${s ? "timeout" : "error" + (i ? " (status " + i.code + ")" : "")} occurred while loading ${e.type}`;
    e.type === q.LEVEL ? n += `: ${e.level} id: ${e.id}` : (e.type === q.AUDIO_TRACK || e.type === q.SUBTITLE_TRACK) && (n += ` id: ${e.id} group-id: "${e.groupId}"`);
    const o = new Error(n);
    v.warn(`[playlist-loader]: ${n}`);
    let l = L.UNKNOWN, c = !1;
    const h = this.getInternalLoader(e);
    switch (e.type) {
      case q.MANIFEST:
        l = s ? L.MANIFEST_LOAD_TIMEOUT : L.MANIFEST_LOAD_ERROR, c = !0;
        break;
      case q.LEVEL:
        l = s ? L.LEVEL_LOAD_TIMEOUT : L.LEVEL_LOAD_ERROR, c = !1;
        break;
      case q.AUDIO_TRACK:
        l = s ? L.AUDIO_TRACK_LOAD_TIMEOUT : L.AUDIO_TRACK_LOAD_ERROR, c = !1;
        break;
      case q.SUBTITLE_TRACK:
        l = s ? L.SUBTITLE_TRACK_LOAD_TIMEOUT : L.SUBTITLE_LOAD_ERROR, c = !1;
        break;
    }
    h && this.resetInternalLoader(e.type);
    const u = {
      type: U.NETWORK_ERROR,
      details: l,
      fatal: c,
      url: e.url,
      loader: h,
      context: e,
      error: o,
      networkDetails: t,
      stats: r
    };
    if (i) {
      const d = (t == null ? void 0 : t.url) || e.url;
      u.response = le({
        url: d,
        data: void 0
      }, i);
    }
    this.hls.trigger(m.ERROR, u);
  }
  handlePlaylistLoaded(e, t, s, i, r, n) {
    const o = this.hls, {
      type: l,
      level: c,
      id: h,
      groupId: u,
      deliveryDirectives: d
    } = i, g = Kt(t, i), f = Zs(i), p = typeof i.level == "number" && f === N.MAIN ? c : void 0;
    if (!e.fragments.length) {
      const E = new Error("No Segments found in Playlist");
      o.trigger(m.ERROR, {
        type: U.NETWORK_ERROR,
        details: L.LEVEL_EMPTY_ERROR,
        fatal: !1,
        url: g,
        error: E,
        reason: E.message,
        response: t,
        context: i,
        level: p,
        parent: f,
        networkDetails: r,
        stats: s
      });
      return;
    }
    e.targetduration || (e.playlistParsingError = new Error("Missing Target Duration"));
    const T = e.playlistParsingError;
    if (T) {
      o.trigger(m.ERROR, {
        type: U.NETWORK_ERROR,
        details: L.LEVEL_PARSING_ERROR,
        fatal: !1,
        url: g,
        error: T,
        reason: T.message,
        response: t,
        context: i,
        level: p,
        parent: f,
        networkDetails: r,
        stats: s
      });
      return;
    }
    switch (e.live && n && (n.getCacheAge && (e.ageHeader = n.getCacheAge() || 0), (!n.getCacheAge || isNaN(e.ageHeader)) && (e.ageHeader = 0)), l) {
      case q.MANIFEST:
      case q.LEVEL:
        o.trigger(m.LEVEL_LOADED, {
          details: e,
          level: p || 0,
          id: h || 0,
          stats: s,
          networkDetails: r,
          deliveryDirectives: d
        });
        break;
      case q.AUDIO_TRACK:
        o.trigger(m.AUDIO_TRACK_LOADED, {
          details: e,
          id: h || 0,
          groupId: u || "",
          stats: s,
          networkDetails: r,
          deliveryDirectives: d
        });
        break;
      case q.SUBTITLE_TRACK:
        o.trigger(m.SUBTITLE_TRACK_LOADED, {
          details: e,
          id: h || 0,
          groupId: u || "",
          stats: s,
          networkDetails: r,
          deliveryDirectives: d
        });
        break;
    }
  }
}
function tr(a, e) {
  let t;
  try {
    t = new Event("addtrack");
  } catch {
    t = document.createEvent("Event"), t.initEvent("addtrack", !1, !1);
  }
  t.track = a, e.dispatchEvent(t);
}
function sr(a, e) {
  const t = a.mode;
  if (t === "disabled" && (a.mode = "hidden"), a.cues && !a.cues.getCueById(e.id))
    try {
      if (a.addCue(e), !a.cues.getCueById(e.id))
        throw new Error(`addCue is failed for: ${e}`);
    } catch (s) {
      v.debug(`[texttrack-utils]: ${s}`);
      try {
        const i = new self.TextTrackCue(e.startTime, e.endTime, e.text);
        i.id = e.id, a.addCue(i);
      } catch (i) {
        v.debug(`[texttrack-utils]: Legacy TextTrackCue fallback failed: ${i}`);
      }
    }
  t === "disabled" && (a.mode = t);
}
function He(a) {
  const e = a.mode;
  if (e === "disabled" && (a.mode = "hidden"), a.cues)
    for (let t = a.cues.length; t--; )
      a.removeCue(a.cues[t]);
  e === "disabled" && (a.mode = e);
}
function ns(a, e, t, s) {
  const i = a.mode;
  if (i === "disabled" && (a.mode = "hidden"), a.cues && a.cues.length > 0) {
    const r = Qn(a.cues, e, t);
    for (let n = 0; n < r.length; n++)
      (!s || s(r[n])) && a.removeCue(r[n]);
  }
  i === "disabled" && (a.mode = i);
}
function Xn(a, e) {
  if (e < a[0].startTime)
    return 0;
  const t = a.length - 1;
  if (e > a[t].endTime)
    return -1;
  let s = 0, i = t;
  for (; s <= i; ) {
    const r = Math.floor((i + s) / 2);
    if (e < a[r].startTime)
      i = r - 1;
    else if (e > a[r].startTime && s < t)
      s = r + 1;
    else
      return r;
  }
  return a[s].startTime - e < e - a[i].startTime ? s : i;
}
function Qn(a, e, t) {
  const s = [], i = Xn(a, e);
  if (i > -1)
    for (let r = i, n = a.length; r < n; r++) {
      const o = a[r];
      if (o.startTime >= e && o.endTime <= t)
        s.push(o);
      else if (o.startTime > t)
        return s;
    }
  return s;
}
function mt(a) {
  const e = [];
  for (let t = 0; t < a.length; t++) {
    const s = a[t];
    (s.kind === "subtitles" || s.kind === "captions") && s.label && e.push(a[t]);
  }
  return e;
}
var ye = {
  audioId3: "org.id3",
  dateRange: "com.apple.quicktime.HLS",
  emsg: "https://aomedia.org/emsg/ID3"
};
const Jn = 0.25;
function as() {
  if (!(typeof self > "u"))
    return self.VTTCue || self.TextTrackCue;
}
function ei(a, e, t, s, i) {
  let r = new a(e, t, "");
  try {
    r.value = s, i && (r.type = i);
  } catch {
    r = new a(e, t, JSON.stringify(i ? le({
      type: i
    }, s) : s));
  }
  return r;
}
const ot = (() => {
  const a = as();
  try {
    a && new a(0, Number.POSITIVE_INFINITY, "");
  } catch {
    return Number.MAX_VALUE;
  }
  return Number.POSITIVE_INFINITY;
})();
function Vt(a, e) {
  return a.getTime() / 1e3 - e;
}
function Zn(a) {
  return Uint8Array.from(a.replace(/^0x/, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" ")).buffer;
}
class ea {
  constructor(e) {
    this.hls = void 0, this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = e, this._registerListeners();
  }
  destroy() {
    this._unregisterListeners(), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {}, this.hls = null;
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), e.on(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(m.LEVEL_UPDATED, this.onLevelUpdated, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.FRAG_PARSING_METADATA, this.onFragParsingMetadata, this), e.off(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(m.LEVEL_UPDATED, this.onLevelUpdated, this);
  }
  // Add ID3 metatadata text track.
  onMediaAttached(e, t) {
    this.media = t.media;
  }
  onMediaDetaching() {
    this.id3Track && (He(this.id3Track), this.id3Track = null, this.media = null, this.dateRangeCuesAppended = {});
  }
  onManifestLoading() {
    this.dateRangeCuesAppended = {};
  }
  createTrack(e) {
    const t = this.getID3Track(e.textTracks);
    return t.mode = "hidden", t;
  }
  getID3Track(e) {
    if (this.media) {
      for (let t = 0; t < e.length; t++) {
        const s = e[t];
        if (s.kind === "metadata" && s.label === "id3")
          return tr(s, this.media), s;
      }
      return this.media.addTextTrack("metadata", "id3");
    }
  }
  onFragParsingMetadata(e, t) {
    if (!this.media)
      return;
    const {
      hls: {
        config: {
          enableEmsgMetadataCues: s,
          enableID3MetadataCues: i
        }
      }
    } = this;
    if (!s && !i)
      return;
    const {
      samples: r
    } = t;
    this.id3Track || (this.id3Track = this.createTrack(this.media));
    const n = as();
    if (n)
      for (let o = 0; o < r.length; o++) {
        const l = r[o].type;
        if (l === ye.emsg && !s || !i)
          continue;
        const c = Wi(r[o].data);
        if (c) {
          const h = r[o].pts;
          let u = h + r[o].duration;
          u > ot && (u = ot), u - h <= 0 && (u = h + Jn);
          for (let g = 0; g < c.length; g++) {
            const f = c[g];
            if (!Hi(f)) {
              this.updateId3CueEnds(h, l);
              const p = ei(n, h, u, f, l);
              p && this.id3Track.addCue(p);
            }
          }
        }
      }
  }
  updateId3CueEnds(e, t) {
    var s;
    const i = (s = this.id3Track) == null ? void 0 : s.cues;
    if (i)
      for (let r = i.length; r--; ) {
        const n = i[r];
        n.type === t && n.startTime < e && n.endTime === ot && (n.endTime = e);
      }
  }
  onBufferFlushing(e, {
    startOffset: t,
    endOffset: s,
    type: i
  }) {
    const {
      id3Track: r,
      hls: n
    } = this;
    if (!n)
      return;
    const {
      config: {
        enableEmsgMetadataCues: o,
        enableID3MetadataCues: l
      }
    } = n;
    if (r && (o || l)) {
      let c;
      i === "audio" ? c = (h) => h.type === ye.audioId3 && l : i === "video" ? c = (h) => h.type === ye.emsg && o : c = (h) => h.type === ye.audioId3 && l || h.type === ye.emsg && o, ns(r, t, s, c);
    }
  }
  onLevelUpdated(e, {
    details: t
  }) {
    if (!this.media || !t.hasProgramDateTime || !this.hls.config.enableDateRangeMetadataCues)
      return;
    const {
      dateRangeCuesAppended: s,
      id3Track: i
    } = this, {
      dateRanges: r
    } = t, n = Object.keys(r);
    if (i) {
      const h = Object.keys(s).filter((u) => !n.includes(u));
      for (let u = h.length; u--; ) {
        const d = h[u];
        Object.keys(s[d].cues).forEach((g) => {
          i.removeCue(s[d].cues[g]);
        }), delete s[d];
      }
    }
    const o = t.fragments[t.fragments.length - 1];
    if (n.length === 0 || !O(o == null ? void 0 : o.programDateTime))
      return;
    this.id3Track || (this.id3Track = this.createTrack(this.media));
    const l = o.programDateTime / 1e3 - o.start, c = as();
    for (let h = 0; h < n.length; h++) {
      const u = n[h], d = r[u], g = Vt(d.startDate, l), f = s[u], p = (f == null ? void 0 : f.cues) || {};
      let T = (f == null ? void 0 : f.durationKnown) || !1, E = ot;
      const y = d.endDate;
      if (y)
        E = Vt(y, l), T = !0;
      else if (d.endOnNext && !T) {
        const I = n.reduce((S, D) => {
          if (D !== d.id) {
            const R = r[D];
            if (R.class === d.class && R.startDate > d.startDate && (!S || d.startDate < S.startDate))
              return R;
          }
          return S;
        }, null);
        I && (E = Vt(I.startDate, l), T = !0);
      }
      const x = Object.keys(d.attr);
      for (let I = 0; I < x.length; I++) {
        const S = x[I];
        if (!rn(S))
          continue;
        const D = p[S];
        if (D)
          T && !f.durationKnown && (D.endTime = E);
        else if (c) {
          let R = d.attr[S];
          nn(S) && (R = Zn(R));
          const w = ei(c, g, E, {
            key: S,
            data: R
          }, ye.dateRange);
          w && (w.id = u, this.id3Track.addCue(w), p[S] = w);
        }
      }
      s[u] = {
        cues: p,
        dateRange: d,
        durationKnown: T
      };
    }
  }
}
class ta {
  constructor(e) {
    this.hls = void 0, this.config = void 0, this.media = null, this.levelDetails = null, this.currentTime = 0, this.stallCount = 0, this._latency = null, this.timeupdateHandler = () => this.timeupdate(), this.hls = e, this.config = e.config, this.registerListeners();
  }
  get latency() {
    return this._latency || 0;
  }
  get maxLatency() {
    const {
      config: e,
      levelDetails: t
    } = this;
    return e.liveMaxLatencyDuration !== void 0 ? e.liveMaxLatencyDuration : t ? e.liveMaxLatencyDurationCount * t.targetduration : 0;
  }
  get targetLatency() {
    const {
      levelDetails: e
    } = this;
    if (e === null)
      return null;
    const {
      holdBack: t,
      partHoldBack: s,
      targetduration: i
    } = e, {
      liveSyncDuration: r,
      liveSyncDurationCount: n,
      lowLatencyMode: o
    } = this.config, l = this.hls.userConfig;
    let c = o && s || t;
    (l.liveSyncDuration || l.liveSyncDurationCount || c === 0) && (c = r !== void 0 ? r : n * i);
    const h = i;
    return c + Math.min(this.stallCount * 1, h);
  }
  get liveSyncPosition() {
    const e = this.estimateLiveEdge(), t = this.targetLatency, s = this.levelDetails;
    if (e === null || t === null || s === null)
      return null;
    const i = s.edge, r = e - t - this.edgeStalled, n = i - s.totalduration, o = i - (this.config.lowLatencyMode && s.partTarget || s.targetduration);
    return Math.min(Math.max(n, r), o);
  }
  get drift() {
    const {
      levelDetails: e
    } = this;
    return e === null ? 1 : e.drift;
  }
  get edgeStalled() {
    const {
      levelDetails: e
    } = this;
    if (e === null)
      return 0;
    const t = (this.config.lowLatencyMode && e.partTarget || e.targetduration) * 3;
    return Math.max(e.age - t, 0);
  }
  get forwardBufferLength() {
    const {
      media: e,
      levelDetails: t
    } = this;
    if (!e || !t)
      return 0;
    const s = e.buffered.length;
    return (s ? e.buffered.end(s - 1) : t.edge) - this.currentTime;
  }
  destroy() {
    this.unregisterListeners(), this.onMediaDetaching(), this.levelDetails = null, this.hls = this.timeupdateHandler = null;
  }
  registerListeners() {
    this.hls.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.on(m.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(m.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.on(m.ERROR, this.onError, this);
  }
  unregisterListeners() {
    this.hls.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), this.hls.off(m.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.off(m.LEVEL_UPDATED, this.onLevelUpdated, this), this.hls.off(m.ERROR, this.onError, this);
  }
  onMediaAttached(e, t) {
    this.media = t.media, this.media.addEventListener("timeupdate", this.timeupdateHandler);
  }
  onMediaDetaching() {
    this.media && (this.media.removeEventListener("timeupdate", this.timeupdateHandler), this.media = null);
  }
  onManifestLoading() {
    this.levelDetails = null, this._latency = null, this.stallCount = 0;
  }
  onLevelUpdated(e, {
    details: t
  }) {
    this.levelDetails = t, t.advanced && this.timeupdate(), !t.live && this.media && this.media.removeEventListener("timeupdate", this.timeupdateHandler);
  }
  onError(e, t) {
    var s;
    t.details === L.BUFFER_STALLED_ERROR && (this.stallCount++, (s = this.levelDetails) != null && s.live && v.warn("[playback-rate-controller]: Stall detected, adjusting target latency"));
  }
  timeupdate() {
    const {
      media: e,
      levelDetails: t
    } = this;
    if (!e || !t)
      return;
    this.currentTime = e.currentTime;
    const s = this.computeLatency();
    if (s === null)
      return;
    this._latency = s;
    const {
      lowLatencyMode: i,
      maxLiveSyncPlaybackRate: r
    } = this.config;
    if (!i || r === 1 || !t.live)
      return;
    const n = this.targetLatency;
    if (n === null)
      return;
    const o = s - n, l = Math.min(this.maxLatency, n + t.targetduration);
    if (o < l && o > 0.05 && this.forwardBufferLength > 1) {
      const h = Math.min(2, Math.max(1, r)), u = Math.round(2 / (1 + Math.exp(-0.75 * o - this.edgeStalled)) * 20) / 20;
      e.playbackRate = Math.min(h, Math.max(1, u));
    } else
      e.playbackRate !== 1 && e.playbackRate !== 0 && (e.playbackRate = 1);
  }
  estimateLiveEdge() {
    const {
      levelDetails: e
    } = this;
    return e === null ? null : e.edge + e.age;
  }
  computeLatency() {
    const e = this.estimateLiveEdge();
    return e === null ? null : e - this.currentTime;
  }
}
const os = ["NONE", "TYPE-0", "TYPE-1", null];
function sa(a) {
  return os.indexOf(a) > -1;
}
const It = ["SDR", "PQ", "HLG"];
function ia(a) {
  return !!a && It.indexOf(a) > -1;
}
var tt = {
  No: "",
  Yes: "YES",
  v2: "v2"
};
function ra(a, e) {
  const {
    canSkipUntil: t,
    canSkipDateRanges: s,
    endSN: i
  } = a, r = e !== void 0 ? e - i : 0;
  return t && r < t ? s ? tt.v2 : tt.Yes : tt.No;
}
class ti {
  constructor(e, t, s) {
    this.msn = void 0, this.part = void 0, this.skip = void 0, this.msn = e, this.part = t, this.skip = s;
  }
  addDirectives(e) {
    const t = new self.URL(e);
    return this.msn !== void 0 && t.searchParams.set("_HLS_msn", this.msn.toString()), this.part !== void 0 && t.searchParams.set("_HLS_part", this.part.toString()), this.skip && t.searchParams.set("_HLS_skip", this.skip), t.href;
  }
}
class ze {
  constructor(e) {
    this._attrs = void 0, this.audioCodec = void 0, this.bitrate = void 0, this.codecSet = void 0, this.url = void 0, this.frameRate = void 0, this.height = void 0, this.id = void 0, this.name = void 0, this.videoCodec = void 0, this.width = void 0, this.details = void 0, this.fragmentError = 0, this.loadError = 0, this.loaded = void 0, this.realBitrate = 0, this.supportedPromise = void 0, this.supportedResult = void 0, this._avgBitrate = 0, this._audioGroups = void 0, this._subtitleGroups = void 0, this._urlId = 0, this.url = [e.url], this._attrs = [e.attrs], this.bitrate = e.bitrate, e.details && (this.details = e.details), this.id = e.id || 0, this.name = e.name, this.width = e.width || 0, this.height = e.height || 0, this.frameRate = e.attrs.optionalFloat("FRAME-RATE", 0), this._avgBitrate = e.attrs.decimalInteger("AVERAGE-BANDWIDTH"), this.audioCodec = e.audioCodec, this.videoCodec = e.videoCodec, this.codecSet = [e.videoCodec, e.audioCodec].filter((t) => !!t).map((t) => t.substring(0, 4)).join(","), this.addGroupId("audio", e.attrs.AUDIO), this.addGroupId("text", e.attrs.SUBTITLES);
  }
  get maxBitrate() {
    return Math.max(this.realBitrate, this.bitrate);
  }
  get averageBitrate() {
    return this._avgBitrate || this.realBitrate || this.bitrate;
  }
  get attrs() {
    return this._attrs[0];
  }
  get codecs() {
    return this.attrs.CODECS || "";
  }
  get pathwayId() {
    return this.attrs["PATHWAY-ID"] || ".";
  }
  get videoRange() {
    return this.attrs["VIDEO-RANGE"] || "SDR";
  }
  get score() {
    return this.attrs.optionalFloat("SCORE", 0);
  }
  get uri() {
    return this.url[0] || "";
  }
  hasAudioGroup(e) {
    return si(this._audioGroups, e);
  }
  hasSubtitleGroup(e) {
    return si(this._subtitleGroups, e);
  }
  get audioGroups() {
    return this._audioGroups;
  }
  get subtitleGroups() {
    return this._subtitleGroups;
  }
  addGroupId(e, t) {
    if (t) {
      if (e === "audio") {
        let s = this._audioGroups;
        s || (s = this._audioGroups = []), s.indexOf(t) === -1 && s.push(t);
      } else if (e === "text") {
        let s = this._subtitleGroups;
        s || (s = this._subtitleGroups = []), s.indexOf(t) === -1 && s.push(t);
      }
    }
  }
  // Deprecated methods (retained for backwards compatibility)
  get urlId() {
    return 0;
  }
  set urlId(e) {
  }
  get audioGroupIds() {
    return this.audioGroups ? [this.audioGroupId] : void 0;
  }
  get textGroupIds() {
    return this.subtitleGroups ? [this.textGroupId] : void 0;
  }
  get audioGroupId() {
    var e;
    return (e = this.audioGroups) == null ? void 0 : e[0];
  }
  get textGroupId() {
    var e;
    return (e = this.subtitleGroups) == null ? void 0 : e[0];
  }
  addFallback() {
  }
}
function si(a, e) {
  return !e || !a ? !1 : a.indexOf(e) !== -1;
}
function Ht(a, e) {
  const t = e.startPTS;
  if (O(t)) {
    let s = 0, i;
    e.sn > a.sn ? (s = t - a.start, i = a) : (s = a.start - t, i = e), i.duration !== s && (i.duration = s);
  } else
    e.sn > a.sn ? a.cc === e.cc && a.minEndPTS ? e.start = a.start + (a.minEndPTS - a.start) : e.start = a.start + a.duration : e.start = Math.max(a.start - e.duration, 0);
}
function ir(a, e, t, s, i, r) {
  s - t <= 0 && (v.warn("Fragment should have a positive duration", e), s = t + e.duration, r = i + e.duration);
  let o = t, l = s;
  const c = e.startPTS, h = e.endPTS;
  if (O(c)) {
    const T = Math.abs(c - t);
    O(e.deltaPTS) ? e.deltaPTS = Math.max(T, e.deltaPTS) : e.deltaPTS = T, o = Math.max(t, c), t = Math.min(t, c), i = Math.min(i, e.startDTS), l = Math.min(s, h), s = Math.max(s, h), r = Math.max(r, e.endDTS);
  }
  const u = t - e.start;
  e.start !== 0 && (e.start = t), e.duration = s - e.start, e.startPTS = t, e.maxStartPTS = o, e.startDTS = i, e.endPTS = s, e.minEndPTS = l, e.endDTS = r;
  const d = e.sn;
  if (!a || d < a.startSN || d > a.endSN)
    return 0;
  let g;
  const f = d - a.startSN, p = a.fragments;
  for (p[f] = e, g = f; g > 0; g--)
    Ht(p[g], p[g - 1]);
  for (g = f; g < p.length - 1; g++)
    Ht(p[g], p[g + 1]);
  return a.fragmentHint && Ht(p[p.length - 1], a.fragmentHint), a.PTSKnown = a.alignedSliding = !0, u;
}
function na(a, e) {
  let t = null;
  const s = a.fragments;
  for (let l = s.length - 1; l >= 0; l--) {
    const c = s[l].initSegment;
    if (c) {
      t = c;
      break;
    }
  }
  a.fragmentHint && delete a.fragmentHint.endPTS;
  let i = 0, r;
  if (la(a, e, (l, c) => {
    l.relurl && (i = l.cc - c.cc), O(l.startPTS) && O(l.endPTS) && (c.start = c.startPTS = l.startPTS, c.startDTS = l.startDTS, c.maxStartPTS = l.maxStartPTS, c.endPTS = l.endPTS, c.endDTS = l.endDTS, c.minEndPTS = l.minEndPTS, c.duration = l.endPTS - l.startPTS, c.duration && (r = c), e.PTSKnown = e.alignedSliding = !0), c.elementaryStreams = l.elementaryStreams, c.loader = l.loader, c.stats = l.stats, l.initSegment && (c.initSegment = l.initSegment, t = l.initSegment);
  }), t && (e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments).forEach((c) => {
    var h;
    c && (!c.initSegment || c.initSegment.relurl === ((h = t) == null ? void 0 : h.relurl)) && (c.initSegment = t);
  }), e.skippedSegments)
    if (e.deltaUpdateFailed = e.fragments.some((l) => !l), e.deltaUpdateFailed) {
      v.warn("[level-helper] Previous playlist missing segments skipped in delta playlist");
      for (let l = e.skippedSegments; l--; )
        e.fragments.shift();
      e.startSN = e.fragments[0].sn, e.startCC = e.fragments[0].cc;
    } else
      e.canSkipDateRanges && (e.dateRanges = aa(a.dateRanges, e.dateRanges, e.recentlyRemovedDateranges));
  const n = e.fragments;
  if (i) {
    v.warn("discontinuity sliding from playlist, take drift into account");
    for (let l = 0; l < n.length; l++)
      n[l].cc += i;
  }
  e.skippedSegments && (e.startCC = e.fragments[0].cc), oa(a.partList, e.partList, (l, c) => {
    c.elementaryStreams = l.elementaryStreams, c.stats = l.stats;
  }), r ? ir(e, r, r.startPTS, r.endPTS, r.startDTS, r.endDTS) : rr(a, e), n.length && (e.totalduration = e.edge - n[0].start), e.driftStartTime = a.driftStartTime, e.driftStart = a.driftStart;
  const o = e.advancedDateTime;
  if (e.advanced && o) {
    const l = e.edge;
    e.driftStart || (e.driftStartTime = o, e.driftStart = l), e.driftEndTime = o, e.driftEnd = l;
  } else
    e.driftEndTime = a.driftEndTime, e.driftEnd = a.driftEnd, e.advancedDateTime = a.advancedDateTime;
}
function aa(a, e, t) {
  const s = se({}, a);
  return t && t.forEach((i) => {
    delete s[i];
  }), Object.keys(e).forEach((i) => {
    const r = new Bi(e[i].attr, s[i]);
    r.isValid ? s[i] = r : v.warn(`Ignoring invalid Playlist Delta Update DATERANGE tag: "${JSON.stringify(e[i].attr)}"`);
  }), s;
}
function oa(a, e, t) {
  if (a && e) {
    let s = 0;
    for (let i = 0, r = a.length; i <= r; i++) {
      const n = a[i], o = e[i + s];
      n && o && n.index === o.index && n.fragment.sn === o.fragment.sn ? t(n, o) : s--;
    }
  }
}
function la(a, e, t) {
  const s = e.skippedSegments, i = Math.max(a.startSN, e.startSN) - e.startSN, r = (a.fragmentHint ? 1 : 0) + (s ? e.endSN : Math.min(a.endSN, e.endSN)) - e.startSN, n = e.startSN - a.startSN, o = e.fragmentHint ? e.fragments.concat(e.fragmentHint) : e.fragments, l = a.fragmentHint ? a.fragments.concat(a.fragmentHint) : a.fragments;
  for (let c = i; c <= r; c++) {
    const h = l[n + c];
    let u = o[c];
    s && !u && c < s && (u = e.fragments[c] = h), h && u && t(h, u);
  }
}
function rr(a, e) {
  const t = e.startSN + e.skippedSegments - a.startSN, s = a.fragments;
  t < 0 || t >= s.length || ls(e, s[t].start);
}
function ls(a, e) {
  if (e) {
    const t = a.fragments;
    for (let s = a.skippedSegments; s < t.length; s++)
      t[s].start += e;
    a.fragmentHint && (a.fragmentHint.start += e);
  }
}
function ca(a, e = 1 / 0) {
  let t = 1e3 * a.targetduration;
  if (a.updated) {
    const s = a.fragments;
    if (s.length && t * 4 > e) {
      const r = s[s.length - 1].duration * 1e3;
      r < t && (t = r);
    }
  } else
    t /= 2;
  return Math.round(t);
}
function ha(a, e, t) {
  if (!(a != null && a.details))
    return null;
  const s = a.details;
  let i = s.fragments[e - s.startSN];
  return i || (i = s.fragmentHint, i && i.sn === e) ? i : e < s.startSN && t && t.sn === e ? t : null;
}
function ii(a, e, t) {
  var s;
  return a != null && a.details ? nr((s = a.details) == null ? void 0 : s.partList, e, t) : null;
}
function nr(a, e, t) {
  if (a)
    for (let s = a.length; s--; ) {
      const i = a[s];
      if (i.index === t && i.fragment.sn === e)
        return i;
    }
  return null;
}
function ar(a) {
  a.forEach((e, t) => {
    const {
      details: s
    } = e;
    s != null && s.fragments && s.fragments.forEach((i) => {
      i.level = t;
    });
  });
}
function bt(a) {
  switch (a.details) {
    case L.FRAG_LOAD_TIMEOUT:
    case L.KEY_LOAD_TIMEOUT:
    case L.LEVEL_LOAD_TIMEOUT:
    case L.MANIFEST_LOAD_TIMEOUT:
      return !0;
  }
  return !1;
}
function ri(a, e) {
  const t = bt(e);
  return a.default[`${t ? "timeout" : "error"}Retry`];
}
function Ss(a, e) {
  const t = a.backoff === "linear" ? 1 : Math.pow(2, e);
  return Math.min(t * a.retryDelayMs, a.maxRetryDelayMs);
}
function ni(a) {
  return le(le({}, a), {
    errorRetry: null,
    timeoutRetry: null
  });
}
function Dt(a, e, t, s) {
  if (!a)
    return !1;
  const i = s == null ? void 0 : s.code, r = e < a.maxNumRetry && (ua(i) || !!t);
  return a.shouldRetry ? a.shouldRetry(a, e, t, s, r) : r;
}
function ua(a) {
  return a === 0 && navigator.onLine === !1 || !!a && (a < 400 || a > 499);
}
const or = {
  /**
   * Searches for an item in an array which matches a certain condition.
   * This requires the condition to only match one item in the array,
   * and for the array to be ordered.
   *
   * @param list The array to search.
   * @param comparisonFn
   *      Called and provided a candidate item as the first argument.
   *      Should return:
   *          > -1 if the item should be located at a lower index than the provided item.
   *          > 1 if the item should be located at a higher index than the provided item.
   *          > 0 if the item is the item you're looking for.
   *
   * @returns the object if found, otherwise returns null
   */
  search: function(a, e) {
    let t = 0, s = a.length - 1, i = null, r = null;
    for (; t <= s; ) {
      i = (t + s) / 2 | 0, r = a[i];
      const n = e(r);
      if (n > 0)
        t = i + 1;
      else if (n < 0)
        s = i - 1;
      else
        return r;
    }
    return null;
  }
};
function da(a, e, t) {
  if (e === null || !Array.isArray(a) || !a.length || !O(e))
    return null;
  const s = a[0].programDateTime;
  if (e < (s || 0))
    return null;
  const i = a[a.length - 1].endProgramDateTime;
  if (e >= (i || 0))
    return null;
  t = t || 0;
  for (let r = 0; r < a.length; ++r) {
    const n = a[r];
    if (fa(e, t, n))
      return n;
  }
  return null;
}
function Ct(a, e, t = 0, s = 0) {
  let i = null;
  if (a) {
    i = e[a.sn - e[0].sn + 1] || null;
    const n = a.endDTS - t;
    n > 0 && n < 15e-7 && (t += 15e-7);
  } else
    t === 0 && e[0].start === 0 && (i = e[0]);
  if (i && (!a || a.level === i.level) && cs(t, s, i) === 0)
    return i;
  const r = or.search(e, cs.bind(null, t, s));
  return r && (r !== a || !i) ? r : i;
}
function cs(a = 0, e = 0, t) {
  if (t.start <= a && t.start + t.duration > a)
    return 0;
  const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0));
  return t.start + t.duration - s <= a ? 1 : t.start - s > a && t.start ? -1 : 0;
}
function fa(a, e, t) {
  const s = Math.min(e, t.duration + (t.deltaPTS ? t.deltaPTS : 0)) * 1e3;
  return (t.endProgramDateTime || 0) - s > a;
}
function ga(a, e) {
  return or.search(a, (t) => t.cc < e ? 1 : t.cc > e ? -1 : 0);
}
var ae = {
  DoNothing: 0,
  SendEndCallback: 1,
  SendAlternateToPenaltyBox: 2,
  RemoveAlternatePermanently: 3,
  InsertDiscontinuity: 4,
  RetryRequest: 5
}, Te = {
  None: 0,
  MoveAllAlternatesMatchingHost: 1,
  MoveAllAlternatesMatchingHDCP: 2,
  SwitchToSDR: 4
};
class ma {
  constructor(e) {
    this.hls = void 0, this.playlistError = 0, this.penalizedRenditions = {}, this.log = void 0, this.warn = void 0, this.error = void 0, this.hls = e, this.log = v.log.bind(v, "[info]:"), this.warn = v.warn.bind(v, "[warning]:"), this.error = v.error.bind(v, "[error]:"), this.registerListeners();
  }
  registerListeners() {
    const e = this.hls;
    e.on(m.ERROR, this.onError, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.LEVEL_UPDATED, this.onLevelUpdated, this);
  }
  unregisterListeners() {
    const e = this.hls;
    e && (e.off(m.ERROR, this.onError, this), e.off(m.ERROR, this.onErrorOut, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.LEVEL_UPDATED, this.onLevelUpdated, this));
  }
  destroy() {
    this.unregisterListeners(), this.hls = null, this.penalizedRenditions = {};
  }
  startLoad(e) {
  }
  stopLoad() {
    this.playlistError = 0;
  }
  getVariantLevelIndex(e) {
    return (e == null ? void 0 : e.type) === N.MAIN ? e.level : this.hls.loadLevel;
  }
  onManifestLoading() {
    this.playlistError = 0, this.penalizedRenditions = {};
  }
  onLevelUpdated() {
    this.playlistError = 0;
  }
  onError(e, t) {
    var s, i;
    if (t.fatal)
      return;
    const r = this.hls, n = t.context;
    switch (t.details) {
      case L.FRAG_LOAD_ERROR:
      case L.FRAG_LOAD_TIMEOUT:
      case L.KEY_LOAD_ERROR:
      case L.KEY_LOAD_TIMEOUT:
        t.errorAction = this.getFragRetryOrSwitchAction(t);
        return;
      case L.FRAG_PARSING_ERROR:
        if ((s = t.frag) != null && s.gap) {
          t.errorAction = {
            action: ae.DoNothing,
            flags: Te.None
          };
          return;
        }
      case L.FRAG_GAP:
      case L.FRAG_DECRYPT_ERROR: {
        t.errorAction = this.getFragRetryOrSwitchAction(t), t.errorAction.action = ae.SendAlternateToPenaltyBox;
        return;
      }
      case L.LEVEL_EMPTY_ERROR:
      case L.LEVEL_PARSING_ERROR:
        {
          var o, l;
          const c = t.parent === N.MAIN ? t.level : r.loadLevel;
          t.details === L.LEVEL_EMPTY_ERROR && ((o = t.context) != null && (l = o.levelDetails) != null && l.live) ? t.errorAction = this.getPlaylistRetryOrSwitchAction(t, c) : (t.levelRetry = !1, t.errorAction = this.getLevelSwitchAction(t, c));
        }
        return;
      case L.LEVEL_LOAD_ERROR:
      case L.LEVEL_LOAD_TIMEOUT:
        typeof (n == null ? void 0 : n.level) == "number" && (t.errorAction = this.getPlaylistRetryOrSwitchAction(t, n.level));
        return;
      case L.AUDIO_TRACK_LOAD_ERROR:
      case L.AUDIO_TRACK_LOAD_TIMEOUT:
      case L.SUBTITLE_LOAD_ERROR:
      case L.SUBTITLE_TRACK_LOAD_TIMEOUT:
        if (n) {
          const c = r.levels[r.loadLevel];
          if (c && (n.type === q.AUDIO_TRACK && c.hasAudioGroup(n.groupId) || n.type === q.SUBTITLE_TRACK && c.hasSubtitleGroup(n.groupId))) {
            t.errorAction = this.getPlaylistRetryOrSwitchAction(t, r.loadLevel), t.errorAction.action = ae.SendAlternateToPenaltyBox, t.errorAction.flags = Te.MoveAllAlternatesMatchingHost;
            return;
          }
        }
        return;
      case L.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:
        {
          const c = r.levels[r.loadLevel], h = c == null ? void 0 : c.attrs["HDCP-LEVEL"];
          h ? t.errorAction = {
            action: ae.SendAlternateToPenaltyBox,
            flags: Te.MoveAllAlternatesMatchingHDCP,
            hdcpLevel: h
          } : this.keySystemError(t);
        }
        return;
      case L.BUFFER_ADD_CODEC_ERROR:
      case L.REMUX_ALLOC_ERROR:
      case L.BUFFER_APPEND_ERROR:
        t.errorAction = this.getLevelSwitchAction(t, (i = t.level) != null ? i : r.loadLevel);
        return;
      case L.INTERNAL_EXCEPTION:
      case L.BUFFER_APPENDING_ERROR:
      case L.BUFFER_FULL_ERROR:
      case L.LEVEL_SWITCH_ERROR:
      case L.BUFFER_STALLED_ERROR:
      case L.BUFFER_SEEK_OVER_HOLE:
      case L.BUFFER_NUDGE_ON_STALL:
        t.errorAction = {
          action: ae.DoNothing,
          flags: Te.None
        };
        return;
    }
    t.type === U.KEY_SYSTEM_ERROR && this.keySystemError(t);
  }
  keySystemError(e) {
    const t = this.getVariantLevelIndex(e.frag);
    e.levelRetry = !1, e.errorAction = this.getLevelSwitchAction(e, t);
  }
  getPlaylistRetryOrSwitchAction(e, t) {
    const s = this.hls, i = ri(s.config.playlistLoadPolicy, e), r = this.playlistError++;
    if (Dt(i, r, bt(e), e.response))
      return {
        action: ae.RetryRequest,
        flags: Te.None,
        retryConfig: i,
        retryCount: r
      };
    const o = this.getLevelSwitchAction(e, t);
    return i && (o.retryConfig = i, o.retryCount = r), o;
  }
  getFragRetryOrSwitchAction(e) {
    const t = this.hls, s = this.getVariantLevelIndex(e.frag), i = t.levels[s], {
      fragLoadPolicy: r,
      keyLoadPolicy: n
    } = t.config, o = ri(e.details.startsWith("key") ? n : r, e), l = t.levels.reduce((h, u) => h + u.fragmentError, 0);
    if (i && (e.details !== L.FRAG_GAP && i.fragmentError++, Dt(o, l, bt(e), e.response)))
      return {
        action: ae.RetryRequest,
        flags: Te.None,
        retryConfig: o,
        retryCount: l
      };
    const c = this.getLevelSwitchAction(e, s);
    return o && (c.retryConfig = o, c.retryCount = l), c;
  }
  getLevelSwitchAction(e, t) {
    const s = this.hls;
    t == null && (t = s.loadLevel);
    const i = this.hls.levels[t];
    if (i) {
      var r, n;
      const c = e.details;
      i.loadError++, c === L.BUFFER_APPEND_ERROR && i.fragmentError++;
      let h = -1;
      const {
        levels: u,
        loadLevel: d,
        minAutoLevel: g,
        maxAutoLevel: f
      } = s;
      s.autoLevelEnabled || (s.loadLevel = -1);
      const p = (r = e.frag) == null ? void 0 : r.type, E = (p === N.AUDIO && c === L.FRAG_PARSING_ERROR || e.sourceBufferName === "audio" && (c === L.BUFFER_ADD_CODEC_ERROR || c === L.BUFFER_APPEND_ERROR)) && u.some(({
        audioCodec: D
      }) => i.audioCodec !== D), x = e.sourceBufferName === "video" && (c === L.BUFFER_ADD_CODEC_ERROR || c === L.BUFFER_APPEND_ERROR) && u.some(({
        codecSet: D,
        audioCodec: R
      }) => i.codecSet !== D && i.audioCodec === R), {
        type: I,
        groupId: S
      } = (n = e.context) != null ? n : {};
      for (let D = u.length; D--; ) {
        const R = (D + d) % u.length;
        if (R !== d && R >= g && R <= f && u[R].loadError === 0) {
          var o, l;
          const w = u[R];
          if (c === L.FRAG_GAP && e.frag) {
            const _ = u[R].details;
            if (_) {
              const b = Ct(e.frag, _.fragments, e.frag.start);
              if (b != null && b.gap)
                continue;
            }
          } else {
            if (I === q.AUDIO_TRACK && w.hasAudioGroup(S) || I === q.SUBTITLE_TRACK && w.hasSubtitleGroup(S))
              continue;
            if (p === N.AUDIO && (o = i.audioGroups) != null && o.some((_) => w.hasAudioGroup(_)) || p === N.SUBTITLE && (l = i.subtitleGroups) != null && l.some((_) => w.hasSubtitleGroup(_)) || E && i.audioCodec === w.audioCodec || !E && i.audioCodec !== w.audioCodec || x && i.codecSet === w.codecSet)
              continue;
          }
          h = R;
          break;
        }
      }
      if (h > -1 && s.loadLevel !== h)
        return e.levelRetry = !0, this.playlistError = 0, {
          action: ae.SendAlternateToPenaltyBox,
          flags: Te.None,
          nextAutoLevel: h
        };
    }
    return {
      action: ae.SendAlternateToPenaltyBox,
      flags: Te.MoveAllAlternatesMatchingHost
    };
  }
  onErrorOut(e, t) {
    var s;
    switch ((s = t.errorAction) == null ? void 0 : s.action) {
      case ae.DoNothing:
        break;
      case ae.SendAlternateToPenaltyBox:
        this.sendAlternateToPenaltyBox(t), !t.errorAction.resolved && t.details !== L.FRAG_GAP ? t.fatal = !0 : /MediaSource readyState: ended/.test(t.error.message) && (this.warn(`MediaSource ended after "${t.sourceBufferName}" sourceBuffer append error. Attempting to recover from media error.`), this.hls.recoverMediaError());
        break;
      case ae.RetryRequest:
        break;
    }
    if (t.fatal) {
      this.hls.stopLoad();
      return;
    }
  }
  sendAlternateToPenaltyBox(e) {
    const t = this.hls, s = e.errorAction;
    if (!s)
      return;
    const {
      flags: i,
      hdcpLevel: r,
      nextAutoLevel: n
    } = s;
    switch (i) {
      case Te.None:
        this.switchLevel(e, n);
        break;
      case Te.MoveAllAlternatesMatchingHDCP:
        r && (t.maxHdcpLevel = os[os.indexOf(r) - 1], s.resolved = !0), this.warn(`Restricting playback to HDCP-LEVEL of "${t.maxHdcpLevel}" or lower`);
        break;
    }
    s.resolved || this.switchLevel(e, n);
  }
  switchLevel(e, t) {
    t !== void 0 && e.errorAction && (this.warn(`switching to level ${t} after ${e.details}`), this.hls.nextAutoLevel = t, e.errorAction.resolved = !0, this.hls.nextLoadLevel = this.hls.nextAutoLevel);
  }
}
class vs {
  constructor(e, t) {
    this.hls = void 0, this.timer = -1, this.requestScheduled = -1, this.canLoad = !1, this.log = void 0, this.warn = void 0, this.log = v.log.bind(v, `${t}:`), this.warn = v.warn.bind(v, `${t}:`), this.hls = e;
  }
  destroy() {
    this.clearTimer(), this.hls = this.log = this.warn = null;
  }
  clearTimer() {
    this.timer !== -1 && (self.clearTimeout(this.timer), this.timer = -1);
  }
  startLoad() {
    this.canLoad = !0, this.requestScheduled = -1, this.loadPlaylist();
  }
  stopLoad() {
    this.canLoad = !1, this.clearTimer();
  }
  switchParams(e, t) {
    const s = t == null ? void 0 : t.renditionReports;
    if (s) {
      let i = -1;
      for (let r = 0; r < s.length; r++) {
        const n = s[r];
        let o;
        try {
          o = new self.URL(n.URI, t.url).href;
        } catch (l) {
          v.warn(`Could not construct new URL for Rendition Report: ${l}`), o = n.URI || "";
        }
        if (o === e) {
          i = r;
          break;
        } else
          o === e.substring(0, o.length) && (i = r);
      }
      if (i !== -1) {
        const r = s[i], n = parseInt(r["LAST-MSN"]) || (t == null ? void 0 : t.lastPartSn);
        let o = parseInt(r["LAST-PART"]) || (t == null ? void 0 : t.lastPartIndex);
        if (this.hls.config.lowLatencyMode) {
          const l = Math.min(t.age - t.partTarget, t.targetduration);
          o >= 0 && l > t.partTarget && (o += 1);
        }
        return new ti(n, o >= 0 ? o : void 0, tt.No);
      }
    }
  }
  loadPlaylist(e) {
    this.requestScheduled === -1 && (this.requestScheduled = self.performance.now());
  }
  shouldLoadPlaylist(e) {
    return this.canLoad && !!e && !!e.url && (!e.details || e.details.live);
  }
  shouldReloadPlaylist(e) {
    return this.timer === -1 && this.requestScheduled === -1 && this.shouldLoadPlaylist(e);
  }
  playlistLoaded(e, t, s) {
    const {
      details: i,
      stats: r
    } = t, n = self.performance.now(), o = r.loading.first ? Math.max(0, n - r.loading.first) : 0;
    if (i.advancedDateTime = Date.now() - o, i.live || s != null && s.live) {
      if (i.reloaded(s), s && this.log(`live playlist ${e} ${i.advanced ? "REFRESHED " + i.lastPartSn + "-" + i.lastPartIndex : i.updated ? "UPDATED" : "MISSED"}`), s && i.fragments.length > 0 && na(s, i), !this.canLoad || !i.live)
        return;
      let l, c, h;
      if (i.canBlockReload && i.endSN && i.advanced) {
        const T = this.hls.config.lowLatencyMode, E = i.lastPartSn, y = i.endSN, x = i.lastPartIndex, I = x !== -1, S = E === y, D = T ? 0 : x;
        I ? (c = S ? y + 1 : E, h = S ? D : x + 1) : c = y + 1;
        const R = i.age, w = R + i.ageHeader;
        let _ = Math.min(w - i.partTarget, i.targetduration * 1.5);
        if (_ > 0) {
          if (s && _ > s.tuneInGoal)
            this.warn(`CDN Tune-in goal increased from: ${s.tuneInGoal} to: ${_} with playlist age: ${i.age}`), _ = 0;
          else {
            const b = Math.floor(_ / i.targetduration);
            if (c += b, h !== void 0) {
              const k = Math.round(_ % i.targetduration / i.partTarget);
              h += k;
            }
            this.log(`CDN Tune-in age: ${i.ageHeader}s last advanced ${R.toFixed(2)}s goal: ${_} skip sn ${b} to part ${h}`);
          }
          i.tuneInGoal = _;
        }
        if (l = this.getDeliveryDirectives(i, t.deliveryDirectives, c, h), T || !S) {
          this.loadPlaylist(l);
          return;
        }
      } else
        (i.canBlockReload || i.canSkipUntil) && (l = this.getDeliveryDirectives(i, t.deliveryDirectives, c, h));
      const u = this.hls.mainForwardBufferInfo, d = u ? u.end - u.len : 0, g = (i.edge - d) * 1e3, f = ca(i, g);
      i.updated && n > this.requestScheduled + f && (this.requestScheduled = r.loading.start), c !== void 0 && i.canBlockReload ? this.requestScheduled = r.loading.first + f - (i.partTarget * 1e3 || 1e3) : this.requestScheduled === -1 || this.requestScheduled + f < n ? this.requestScheduled = n : this.requestScheduled - n <= 0 && (this.requestScheduled += f);
      let p = this.requestScheduled - n;
      p = Math.max(0, p), this.log(`reload live playlist ${e} in ${Math.round(p)} ms`), this.timer = self.setTimeout(() => this.loadPlaylist(l), p);
    } else
      this.clearTimer();
  }
  getDeliveryDirectives(e, t, s, i) {
    let r = ra(e, s);
    return t != null && t.skip && e.deltaUpdateFailed && (s = t.msn, i = t.part, r = tt.No), new ti(s, i, r);
  }
  checkRetry(e) {
    const t = e.details, s = bt(e), i = e.errorAction, {
      action: r,
      retryCount: n = 0,
      retryConfig: o
    } = i || {}, l = !!i && !!o && (r === ae.RetryRequest || !i.resolved && r === ae.SendAlternateToPenaltyBox);
    if (l) {
      var c;
      if (this.requestScheduled = -1, n >= o.maxNumRetry)
        return !1;
      if (s && (c = e.context) != null && c.deliveryDirectives)
        this.warn(`Retrying playlist loading ${n + 1}/${o.maxNumRetry} after "${t}" without delivery-directives`), this.loadPlaylist();
      else {
        const h = Ss(o, n);
        this.timer = self.setTimeout(() => this.loadPlaylist(), h), this.warn(`Retrying playlist loading ${n + 1}/${o.maxNumRetry} after "${t}" in ${h}ms`);
      }
      e.levelRetry = !0, i.resolved = !0;
    }
    return l;
  }
}
class Ue {
  //  About half of the estimated value will be from the last |halfLife| samples by weight.
  constructor(e, t = 0, s = 0) {
    this.halfLife = void 0, this.alpha_ = void 0, this.estimate_ = void 0, this.totalWeight_ = void 0, this.halfLife = e, this.alpha_ = e ? Math.exp(Math.log(0.5) / e) : 0, this.estimate_ = t, this.totalWeight_ = s;
  }
  sample(e, t) {
    const s = Math.pow(this.alpha_, e);
    this.estimate_ = t * (1 - s) + s * this.estimate_, this.totalWeight_ += e;
  }
  getTotalWeight() {
    return this.totalWeight_;
  }
  getEstimate() {
    if (this.alpha_) {
      const e = 1 - Math.pow(this.alpha_, this.totalWeight_);
      if (e)
        return this.estimate_ / e;
    }
    return this.estimate_;
  }
}
class pa {
  constructor(e, t, s, i = 100) {
    this.defaultEstimate_ = void 0, this.minWeight_ = void 0, this.minDelayMs_ = void 0, this.slow_ = void 0, this.fast_ = void 0, this.defaultTTFB_ = void 0, this.ttfb_ = void 0, this.defaultEstimate_ = s, this.minWeight_ = 1e-3, this.minDelayMs_ = 50, this.slow_ = new Ue(e), this.fast_ = new Ue(t), this.defaultTTFB_ = i, this.ttfb_ = new Ue(e);
  }
  update(e, t) {
    const {
      slow_: s,
      fast_: i,
      ttfb_: r
    } = this;
    s.halfLife !== e && (this.slow_ = new Ue(e, s.getEstimate(), s.getTotalWeight())), i.halfLife !== t && (this.fast_ = new Ue(t, i.getEstimate(), i.getTotalWeight())), r.halfLife !== e && (this.ttfb_ = new Ue(e, r.getEstimate(), r.getTotalWeight()));
  }
  sample(e, t) {
    e = Math.max(e, this.minDelayMs_);
    const s = 8 * t, i = e / 1e3, r = s / i;
    this.fast_.sample(i, r), this.slow_.sample(i, r);
  }
  sampleTTFB(e) {
    const t = e / 1e3, s = Math.sqrt(2) * Math.exp(-Math.pow(t, 2) / 2);
    this.ttfb_.sample(s, Math.max(e, 5));
  }
  canEstimate() {
    return this.fast_.getTotalWeight() >= this.minWeight_;
  }
  getEstimate() {
    return this.canEstimate() ? Math.min(this.fast_.getEstimate(), this.slow_.getEstimate()) : this.defaultEstimate_;
  }
  getEstimateTTFB() {
    return this.ttfb_.getTotalWeight() >= this.minWeight_ ? this.ttfb_.getEstimate() : this.defaultTTFB_;
  }
  destroy() {
  }
}
const lr = {
  supported: !0,
  configurations: [],
  decodingInfoResults: [{
    supported: !0,
    powerEfficient: !0,
    smooth: !0
  }]
}, ai = {};
function Ta(a, e, t, s, i, r) {
  const n = a.audioCodec ? a.audioGroups : null, o = r == null ? void 0 : r.audioCodec, l = r == null ? void 0 : r.channels, c = l ? parseInt(l) : o ? 1 / 0 : 2;
  let h = null;
  if (n != null && n.length)
    try {
      n.length === 1 && n[0] ? h = e.groups[n[0]].channels : h = n.reduce((u, d) => {
        if (d) {
          const g = e.groups[d];
          if (!g)
            throw new Error(`Audio track group ${d} not found`);
          Object.keys(g.channels).forEach((f) => {
            u[f] = (u[f] || 0) + g.channels[f];
          });
        }
        return u;
      }, {
        2: 0
      });
    } catch {
      return !0;
    }
  return a.videoCodec !== void 0 && (a.width > 1920 && a.height > 1088 || a.height > 1920 && a.width > 1088 || a.frameRate > Math.max(s, 30) || a.videoRange !== "SDR" && a.videoRange !== t || a.bitrate > Math.max(i, 8e6)) || !!h && O(c) && Object.keys(h).some((u) => parseInt(u) > c);
}
function Ea(a, e, t) {
  const s = a.videoCodec, i = a.audioCodec;
  if (!s || !i || !t)
    return Promise.resolve(lr);
  const r = {
    width: a.width,
    height: a.height,
    bitrate: Math.ceil(Math.max(a.bitrate * 0.9, a.averageBitrate)),
    // Assume a framerate of 30fps since MediaCapabilities will not accept Level default of 0.
    framerate: a.frameRate || 30
  }, n = a.videoRange;
  n !== "SDR" && (r.transferFunction = n.toLowerCase());
  const o = s.split(",").map((l) => ({
    type: "media-source",
    video: le(le({}, r), {}, {
      contentType: rt(l, "video")
    })
  }));
  return i && a.audioGroups && a.audioGroups.forEach((l) => {
    var c;
    l && ((c = e.groups[l]) == null || c.tracks.forEach((h) => {
      if (h.groupId === l) {
        const u = h.channels || "", d = parseFloat(u);
        O(d) && d > 2 && o.push.apply(o, i.split(",").map((g) => ({
          type: "media-source",
          audio: {
            contentType: rt(g, "audio"),
            channels: "" + d
            // spatialRendering:
            //   audioCodec === 'ec-3' && channels.indexOf('JOC'),
          }
        })));
      }
    }));
  }), Promise.all(o.map((l) => {
    const c = ya(l);
    return ai[c] || (ai[c] = t.decodingInfo(l));
  })).then((l) => ({
    supported: !l.some((c) => !c.supported),
    configurations: o,
    decodingInfoResults: l
  })).catch((l) => ({
    supported: !1,
    configurations: o,
    decodingInfoResults: [],
    error: l
  }));
}
function ya(a) {
  const {
    audio: e,
    video: t
  } = a, s = t || e;
  if (s) {
    const i = s.contentType.split('"')[1];
    if (t)
      return `r${t.height}x${t.width}f${Math.ceil(t.framerate)}${t.transferFunction || "sd"}_${i}_${Math.ceil(t.bitrate / 1e5)}`;
    if (e)
      return `c${e.channels}${e.spatialRendering ? "s" : "n"}_${i}`;
  }
  return "";
}
function xa() {
  if (typeof matchMedia == "function") {
    const a = matchMedia("(dynamic-range: high)"), e = matchMedia("bad query");
    if (a.media !== e.media)
      return a.matches === !0;
  }
  return !1;
}
function Sa(a, e) {
  let t = !1, s = [];
  return a && (t = a !== "SDR", s = [a]), e && (s = e.allowedVideoRanges || It.slice(0), t = e.preferHDR !== void 0 ? e.preferHDR : xa(), t ? s = s.filter((i) => i !== "SDR") : s = ["SDR"]), {
    preferHDR: t,
    allowedVideoRanges: s
  };
}
function va(a, e, t, s, i) {
  const r = Object.keys(a), n = s == null ? void 0 : s.channels, o = s == null ? void 0 : s.audioCodec, l = n && parseInt(n) === 2;
  let c = !0, h = !1, u = 1 / 0, d = 1 / 0, g = 1 / 0, f = 0, p = [];
  const {
    preferHDR: T,
    allowedVideoRanges: E
  } = Sa(e, i);
  for (let S = r.length; S--; ) {
    const D = a[r[S]];
    c = D.channels[2] > 0, u = Math.min(u, D.minHeight), d = Math.min(d, D.minFramerate), g = Math.min(g, D.minBitrate);
    const R = E.filter((w) => D.videoRanges[w] > 0);
    R.length > 0 && (h = !0, p = R);
  }
  u = O(u) ? u : 0, d = O(d) ? d : 0;
  const y = Math.max(1080, u), x = Math.max(30, d);
  return g = O(g) ? g : t, t = Math.max(g, t), h || (e = void 0, p = []), {
    codecSet: r.reduce((S, D) => {
      const R = a[D];
      if (D === S)
        return S;
      if (R.minBitrate > t)
        return De(D, `min bitrate of ${R.minBitrate} > current estimate of ${t}`), S;
      if (!R.hasDefaultAudio)
        return De(D, "no renditions with default or auto-select sound found"), S;
      if (o && D.indexOf(o.substring(0, 4)) % 5 !== 0)
        return De(D, `audio codec preference "${o}" not found`), S;
      if (n && !l) {
        if (!R.channels[n])
          return De(D, `no renditions with ${n} channel sound found (channels options: ${Object.keys(R.channels)})`), S;
      } else if ((!o || l) && c && R.channels[2] === 0)
        return De(D, "no renditions with stereo sound found"), S;
      return R.minHeight > y ? (De(D, `min resolution of ${R.minHeight} > maximum of ${y}`), S) : R.minFramerate > x ? (De(D, `min framerate of ${R.minFramerate} > maximum of ${x}`), S) : p.some((w) => R.videoRanges[w] > 0) ? R.maxScore < f ? (De(D, `max score of ${R.maxScore} < selected max of ${f}`), S) : S && (Lt(D) >= Lt(S) || R.fragmentError > a[S].fragmentError) ? S : (f = R.maxScore, D) : (De(D, `no variants with VIDEO-RANGE of ${JSON.stringify(p)} found`), S);
    }, void 0),
    videoRanges: p,
    preferHDR: T,
    minFramerate: d,
    minBitrate: g
  };
}
function De(a, e) {
  v.log(`[abr] start candidates with "${a}" ignored because ${e}`);
}
function Aa(a) {
  return a.reduce((e, t) => {
    let s = e.groups[t.groupId];
    s || (s = e.groups[t.groupId] = {
      tracks: [],
      channels: {
        2: 0
      },
      hasDefault: !1,
      hasAutoSelect: !1
    }), s.tracks.push(t);
    const i = t.channels || "2";
    return s.channels[i] = (s.channels[i] || 0) + 1, s.hasDefault = s.hasDefault || t.default, s.hasAutoSelect = s.hasAutoSelect || t.autoselect, s.hasDefault && (e.hasDefaultAudio = !0), s.hasAutoSelect && (e.hasAutoSelectAudio = !0), e;
  }, {
    hasDefaultAudio: !1,
    hasAutoSelectAudio: !1,
    groups: {}
  });
}
function La(a, e, t, s) {
  return a.slice(t, s + 1).reduce((i, r) => {
    if (!r.codecSet)
      return i;
    const n = r.audioGroups;
    let o = i[r.codecSet];
    o || (i[r.codecSet] = o = {
      minBitrate: 1 / 0,
      minHeight: 1 / 0,
      minFramerate: 1 / 0,
      maxScore: 0,
      videoRanges: {
        SDR: 0
      },
      channels: {
        2: 0
      },
      hasDefaultAudio: !n,
      fragmentError: 0
    }), o.minBitrate = Math.min(o.minBitrate, r.bitrate);
    const l = Math.min(r.height, r.width);
    return o.minHeight = Math.min(o.minHeight, l), o.minFramerate = Math.min(o.minFramerate, r.frameRate), o.maxScore = Math.max(o.maxScore, r.score), o.fragmentError += r.fragmentError, o.videoRanges[r.videoRange] = (o.videoRanges[r.videoRange] || 0) + 1, n && n.forEach((c) => {
      if (!c)
        return;
      const h = e.groups[c];
      o.hasDefaultAudio = o.hasDefaultAudio || e.hasDefaultAudio ? h.hasDefault : h.hasAutoSelect || !e.hasDefaultAudio && !e.hasAutoSelectAudio, Object.keys(h.channels).forEach((u) => {
        o.channels[u] = (o.channels[u] || 0) + h.channels[u];
      });
    }), i;
  }, {});
}
function Le(a, e, t) {
  if ("attrs" in a) {
    const s = e.indexOf(a);
    if (s !== -1)
      return s;
  }
  for (let s = 0; s < e.length; s++) {
    const i = e[s];
    if (Ye(a, i, t))
      return s;
  }
  return -1;
}
function Ye(a, e, t) {
  const {
    groupId: s,
    name: i,
    lang: r,
    assocLang: n,
    characteristics: o,
    default: l
  } = a, c = a.forced;
  return (s === void 0 || e.groupId === s) && (i === void 0 || e.name === i) && (r === void 0 || e.lang === r) && (r === void 0 || e.assocLang === n) && (l === void 0 || e.default === l) && (c === void 0 || e.forced === c) && (o === void 0 || Ra(o, e.characteristics)) && (t === void 0 || t(a, e));
}
function Ra(a, e = "") {
  const t = a.split(","), s = e.split(",");
  return t.length === s.length && !t.some((i) => s.indexOf(i) === -1);
}
function Be(a, e) {
  const {
    audioCodec: t,
    channels: s
  } = a;
  return (t === void 0 || (e.audioCodec || "").substring(0, 4) === t.substring(0, 4)) && (s === void 0 || s === (e.channels || "2"));
}
function Ia(a, e, t, s, i) {
  const r = e[s], o = e.reduce((d, g, f) => {
    const p = g.uri;
    return (d[p] || (d[p] = [])).push(f), d;
  }, {})[r.uri];
  o.length > 1 && (s = Math.max.apply(Math, o));
  const l = r.videoRange, c = r.frameRate, h = r.codecSet.substring(0, 4), u = oi(e, s, (d) => {
    if (d.videoRange !== l || d.frameRate !== c || d.codecSet.substring(0, 4) !== h)
      return !1;
    const g = d.audioGroups, f = t.filter((p) => !g || g.indexOf(p.groupId) !== -1);
    return Le(a, f, i) > -1;
  });
  return u > -1 ? u : oi(e, s, (d) => {
    const g = d.audioGroups, f = t.filter((p) => !g || g.indexOf(p.groupId) !== -1);
    return Le(a, f, i) > -1;
  });
}
function oi(a, e, t) {
  for (let s = e; s; s--)
    if (t(a[s]))
      return s;
  for (let s = e + 1; s < a.length; s++)
    if (t(a[s]))
      return s;
  return -1;
}
class ba {
  constructor(e) {
    this.hls = void 0, this.lastLevelLoadSec = 0, this.lastLoadedFragLevel = -1, this.firstSelection = -1, this._nextAutoLevel = -1, this.nextAutoLevelKey = "", this.audioTracksByGroup = null, this.codecTiers = null, this.timer = -1, this.fragCurrent = null, this.partCurrent = null, this.bitrateTestDelay = 0, this.bwEstimator = void 0, this._abandonRulesCheck = () => {
      const {
        fragCurrent: t,
        partCurrent: s,
        hls: i
      } = this, {
        autoLevelEnabled: r,
        media: n
      } = i;
      if (!t || !n)
        return;
      const o = performance.now(), l = s ? s.stats : t.stats, c = s ? s.duration : t.duration, h = o - l.loading.start, u = i.minAutoLevel;
      if (l.aborted || l.loaded && l.loaded === l.total || t.level <= u) {
        this.clearTimer(), this._nextAutoLevel = -1;
        return;
      }
      if (!r || n.paused || !n.playbackRate || !n.readyState)
        return;
      const d = i.mainForwardBufferInfo;
      if (d === null)
        return;
      const g = this.bwEstimator.getEstimateTTFB(), f = Math.abs(n.playbackRate);
      if (h <= Math.max(g, 1e3 * (c / (f * 2))))
        return;
      const p = d.len / f, T = l.loading.first ? l.loading.first - l.loading.start : -1, E = l.loaded && T > -1, y = this.getBwEstimate(), x = i.levels, I = x[t.level], S = l.total || Math.max(l.loaded, Math.round(c * I.maxBitrate / 8));
      let D = E ? h - T : h;
      D < 1 && E && (D = Math.min(h, l.loaded * 8 / y));
      const R = E ? l.loaded * 1e3 / D : 0, w = R ? (S - l.loaded) / R : S * 8 / y + g / 1e3;
      if (w <= p)
        return;
      const _ = R ? R * 8 : y;
      let b = Number.POSITIVE_INFINITY, k;
      for (k = t.level - 1; k > u; k--) {
        const P = x[k].maxBitrate;
        if (b = this.getTimeToLoadFrag(g / 1e3, _, c * P, !x[k].details), b < p)
          break;
      }
      if (b >= w || b > c * 10)
        return;
      i.nextLoadLevel = i.nextAutoLevel = k, E ? this.bwEstimator.sample(h - Math.min(g, T), l.loaded) : this.bwEstimator.sampleTTFB(h);
      const K = x[k].bitrate;
      this.getBwEstimate() * this.hls.config.abrBandWidthUpFactor > K && this.resetEstimator(K), this.clearTimer(), v.warn(`[abr] Fragment ${t.sn}${s ? " part " + s.index : ""} of level ${t.level} is loading too slowly;
      Time to underbuffer: ${p.toFixed(3)} s
      Estimated load time for current fragment: ${w.toFixed(3)} s
      Estimated load time for down switch fragment: ${b.toFixed(3)} s
      TTFB estimate: ${T | 0} ms
      Current BW estimate: ${O(y) ? y | 0 : "Unknown"} bps
      New BW estimate: ${this.getBwEstimate() | 0} bps
      Switching to level ${k} @ ${K | 0} bps`), i.trigger(m.FRAG_LOAD_EMERGENCY_ABORTED, {
        frag: t,
        part: s,
        stats: l
      });
    }, this.hls = e, this.bwEstimator = this.initEstimator(), this.registerListeners();
  }
  resetEstimator(e) {
    e && (v.log(`setting initial bwe to ${e}`), this.hls.config.abrEwmaDefaultEstimate = e), this.firstSelection = -1, this.bwEstimator = this.initEstimator();
  }
  initEstimator() {
    const e = this.hls.config;
    return new pa(e.abrEwmaSlowVoD, e.abrEwmaFastVoD, e.abrEwmaDefaultEstimate);
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.FRAG_LOADING, this.onFragLoading, this), e.on(m.FRAG_LOADED, this.onFragLoaded, this), e.on(m.FRAG_BUFFERED, this.onFragBuffered, this), e.on(m.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(m.LEVEL_LOADED, this.onLevelLoaded, this), e.on(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(m.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this), e.on(m.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e && (e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.FRAG_LOADING, this.onFragLoading, this), e.off(m.FRAG_LOADED, this.onFragLoaded, this), e.off(m.FRAG_BUFFERED, this.onFragBuffered, this), e.off(m.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(m.LEVEL_LOADED, this.onLevelLoaded, this), e.off(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(m.MAX_AUTO_LEVEL_UPDATED, this.onMaxAutoLevelUpdated, this), e.off(m.ERROR, this.onError, this));
  }
  destroy() {
    this.unregisterListeners(), this.clearTimer(), this.hls = this._abandonRulesCheck = null, this.fragCurrent = this.partCurrent = null;
  }
  onManifestLoading(e, t) {
    this.lastLoadedFragLevel = -1, this.firstSelection = -1, this.lastLevelLoadSec = 0, this.fragCurrent = this.partCurrent = null, this.onLevelsUpdated(), this.clearTimer();
  }
  onLevelsUpdated() {
    this.lastLoadedFragLevel > -1 && this.fragCurrent && (this.lastLoadedFragLevel = this.fragCurrent.level), this._nextAutoLevel = -1, this.onMaxAutoLevelUpdated(), this.codecTiers = null, this.audioTracksByGroup = null;
  }
  onMaxAutoLevelUpdated() {
    this.firstSelection = -1, this.nextAutoLevelKey = "";
  }
  onFragLoading(e, t) {
    const s = t.frag;
    if (!this.ignoreFragment(s)) {
      if (!s.bitrateTest) {
        var i;
        this.fragCurrent = s, this.partCurrent = (i = t.part) != null ? i : null;
      }
      this.clearTimer(), this.timer = self.setInterval(this._abandonRulesCheck, 100);
    }
  }
  onLevelSwitching(e, t) {
    this.clearTimer();
  }
  onError(e, t) {
    if (!t.fatal)
      switch (t.details) {
        case L.BUFFER_ADD_CODEC_ERROR:
        case L.BUFFER_APPEND_ERROR:
          this.lastLoadedFragLevel = -1, this.firstSelection = -1;
          break;
        case L.FRAG_LOAD_TIMEOUT: {
          const s = t.frag, {
            fragCurrent: i,
            partCurrent: r
          } = this;
          if (s && i && s.sn === i.sn && s.level === i.level) {
            const n = performance.now(), o = r ? r.stats : s.stats, l = n - o.loading.start, c = o.loading.first ? o.loading.first - o.loading.start : -1;
            if (o.loaded && c > -1) {
              const u = this.bwEstimator.getEstimateTTFB();
              this.bwEstimator.sample(l - Math.min(u, c), o.loaded);
            } else
              this.bwEstimator.sampleTTFB(l);
          }
          break;
        }
      }
  }
  getTimeToLoadFrag(e, t, s, i) {
    const r = e + s / t, n = i ? this.lastLevelLoadSec : 0;
    return r + n;
  }
  onLevelLoaded(e, t) {
    const s = this.hls.config, {
      loading: i
    } = t.stats, r = i.end - i.start;
    O(r) && (this.lastLevelLoadSec = r / 1e3), t.details.live ? this.bwEstimator.update(s.abrEwmaSlowLive, s.abrEwmaFastLive) : this.bwEstimator.update(s.abrEwmaSlowVoD, s.abrEwmaFastVoD);
  }
  onFragLoaded(e, {
    frag: t,
    part: s
  }) {
    const i = s ? s.stats : t.stats;
    if (t.type === N.MAIN && this.bwEstimator.sampleTTFB(i.loading.first - i.loading.start), !this.ignoreFragment(t)) {
      if (this.clearTimer(), t.level === this._nextAutoLevel && (this._nextAutoLevel = -1), this.firstSelection = -1, this.hls.config.abrMaxWithRealBitrate) {
        const r = s ? s.duration : t.duration, n = this.hls.levels[t.level], o = (n.loaded ? n.loaded.bytes : 0) + i.loaded, l = (n.loaded ? n.loaded.duration : 0) + r;
        n.loaded = {
          bytes: o,
          duration: l
        }, n.realBitrate = Math.round(8 * o / l);
      }
      if (t.bitrateTest) {
        const r = {
          stats: i,
          frag: t,
          part: s,
          id: t.type
        };
        this.onFragBuffered(m.FRAG_BUFFERED, r), t.bitrateTest = !1;
      } else
        this.lastLoadedFragLevel = t.level;
    }
  }
  onFragBuffered(e, t) {
    const {
      frag: s,
      part: i
    } = t, r = i != null && i.stats.loaded ? i.stats : s.stats;
    if (r.aborted || this.ignoreFragment(s))
      return;
    const n = r.parsing.end - r.loading.start - Math.min(r.loading.first - r.loading.start, this.bwEstimator.getEstimateTTFB());
    this.bwEstimator.sample(n, r.loaded), r.bwEstimate = this.getBwEstimate(), s.bitrateTest ? this.bitrateTestDelay = n / 1e3 : this.bitrateTestDelay = 0;
  }
  ignoreFragment(e) {
    return e.type !== N.MAIN || e.sn === "initSegment";
  }
  clearTimer() {
    this.timer > -1 && (self.clearInterval(this.timer), this.timer = -1);
  }
  get firstAutoLevel() {
    const {
      maxAutoLevel: e,
      minAutoLevel: t
    } = this.hls, s = this.getBwEstimate(), i = this.hls.config.maxStarvationDelay, r = this.findBestLevel(s, t, e, 0, i, 1, 1);
    if (r > -1)
      return r;
    const n = this.hls.firstLevel, o = Math.min(Math.max(n, t), e);
    return v.warn(`[abr] Could not find best starting auto level. Defaulting to first in playlist ${n} clamped to ${o}`), o;
  }
  get forcedAutoLevel() {
    return this.nextAutoLevelKey ? -1 : this._nextAutoLevel;
  }
  // return next auto level
  get nextAutoLevel() {
    const e = this.forcedAutoLevel, s = this.bwEstimator.canEstimate(), i = this.lastLoadedFragLevel > -1;
    if (e !== -1 && (!s || !i || this.nextAutoLevelKey === this.getAutoLevelKey()))
      return e;
    const r = s && i ? this.getNextABRAutoLevel() : this.firstAutoLevel;
    if (e !== -1) {
      const n = this.hls.levels;
      if (n.length > Math.max(e, r) && n[e].loadError <= n[r].loadError)
        return e;
    }
    return this._nextAutoLevel = r, this.nextAutoLevelKey = this.getAutoLevelKey(), r;
  }
  getAutoLevelKey() {
    var e;
    return `${this.getBwEstimate()}_${(e = this.hls.mainForwardBufferInfo) == null ? void 0 : e.len}`;
  }
  getNextABRAutoLevel() {
    const {
      fragCurrent: e,
      partCurrent: t,
      hls: s
    } = this, {
      maxAutoLevel: i,
      config: r,
      minAutoLevel: n,
      media: o
    } = s, l = t ? t.duration : e ? e.duration : 0, c = o && o.playbackRate !== 0 ? Math.abs(o.playbackRate) : 1, h = this.getBwEstimate(), u = s.mainForwardBufferInfo, d = (u ? u.len : 0) / c;
    let g = r.abrBandWidthFactor, f = r.abrBandWidthUpFactor;
    if (d) {
      const x = this.findBestLevel(h, n, i, d, 0, g, f);
      if (x >= 0)
        return x;
    }
    let p = l ? Math.min(l, r.maxStarvationDelay) : r.maxStarvationDelay;
    if (!d) {
      const x = this.bitrateTestDelay;
      x && (p = (l ? Math.min(l, r.maxLoadingDelay) : r.maxLoadingDelay) - x, v.info(`[abr] bitrate test took ${Math.round(1e3 * x)}ms, set first fragment max fetchDuration to ${Math.round(1e3 * p)} ms`), g = f = 1);
    }
    const T = this.findBestLevel(h, n, i, d, p, g, f);
    if (v.info(`[abr] ${d ? "rebuffering expected" : "buffer is empty"}, optimal quality level ${T}`), T > -1)
      return T;
    const E = s.levels[n], y = s.levels[s.loadLevel];
    return (E == null ? void 0 : E.bitrate) < (y == null ? void 0 : y.bitrate) ? n : s.loadLevel;
  }
  getBwEstimate() {
    return this.bwEstimator.canEstimate() ? this.bwEstimator.getEstimate() : this.hls.config.abrEwmaDefaultEstimate;
  }
  findBestLevel(e, t, s, i, r, n, o) {
    var l;
    const c = i + r, h = this.lastLoadedFragLevel, u = h === -1 ? this.hls.firstLevel : h, {
      fragCurrent: d,
      partCurrent: g
    } = this, {
      levels: f,
      allAudioTracks: p,
      loadLevel: T,
      config: E
    } = this.hls;
    if (f.length === 1)
      return 0;
    const y = f[u], x = !!(y != null && (l = y.details) != null && l.live), I = T === -1 || h === -1;
    let S, D = "SDR", R = (y == null ? void 0 : y.frameRate) || 0;
    const {
      audioPreference: w,
      videoPreference: _
    } = E, b = this.audioTracksByGroup || (this.audioTracksByGroup = Aa(p));
    if (I) {
      if (this.firstSelection !== -1)
        return this.firstSelection;
      const H = this.codecTiers || (this.codecTiers = La(f, b, t, s)), B = va(H, D, e, w, _), {
        codecSet: J,
        videoRanges: F,
        minFramerate: M,
        minBitrate: Y,
        preferHDR: W
      } = B;
      S = J, D = W ? F[F.length - 1] : F[0], R = M, e = Math.max(e, Y), v.log(`[abr] picked start tier ${JSON.stringify(B)}`);
    } else
      S = y == null ? void 0 : y.codecSet, D = y == null ? void 0 : y.videoRange;
    const k = g ? g.duration : d ? d.duration : 0, K = this.bwEstimator.getEstimateTTFB() / 1e3, P = [];
    for (let H = s; H >= t; H--) {
      var G, j;
      const B = f[H], J = H > u;
      if (!B)
        continue;
      if (E.useMediaCapabilities && !B.supportedResult && !B.supportedPromise) {
        const re = navigator.mediaCapabilities;
        typeof (re == null ? void 0 : re.decodingInfo) == "function" && Ta(B, b, D, R, e, w) ? (B.supportedPromise = Ea(B, b, re), B.supportedPromise.then((te) => {
          B.supportedResult = te;
          const be = this.hls.levels, pe = be.indexOf(B);
          te.error ? v.warn(`[abr] MediaCapabilities decodingInfo error: "${te.error}" for level ${pe} ${JSON.stringify(te)}`) : te.supported || (v.warn(`[abr] Unsupported MediaCapabilities decodingInfo result for level ${pe} ${JSON.stringify(te)}`), pe > -1 && be.length > 1 && (v.log(`[abr] Removing unsupported level ${pe}`), this.hls.removeLevel(pe)));
        })) : B.supportedResult = lr;
      }
      if (S && B.codecSet !== S || D && B.videoRange !== D || J && R > B.frameRate || !J && R > 0 && R < B.frameRate || !((G = B.supportedResult) != null && (j = G.decodingInfoResults) != null && j[0].smooth)) {
        P.push(H);
        continue;
      }
      const F = B.details, M = (g ? F == null ? void 0 : F.partTarget : F == null ? void 0 : F.averagetargetduration) || k;
      let Y;
      J ? Y = o * e : Y = n * e;
      const W = k && i >= k * 2 && r === 0 ? f[H].averageBitrate : f[H].maxBitrate, z = this.getTimeToLoadFrag(K, Y, W * M, F === void 0);
      if (
        // if adjusted bw is greater than level bitrate AND
        Y >= W && // no level change, or new level has no error history
        (H === h || B.loadError === 0 && B.fragmentError === 0) && // fragment fetchDuration unknown OR live stream OR fragment fetchDuration less than max allowed fetch duration, then this level matches
        // we don't account for max Fetch Duration for live streams, this is to avoid switching down when near the edge of live sliding window ...
        // special case to support startLevel = -1 (bitrateTest) on live streams : in that case we should not exit loop so that findBestLevel will return -1
        (z <= K || !O(z) || x && !this.bitrateTestDelay || z < c)
      ) {
        const re = this.forcedAutoLevel;
        return H !== T && (re === -1 || re !== T) && (P.length && v.trace(`[abr] Skipped level(s) ${P.join(",")} of ${s} max with CODECS and VIDEO-RANGE:"${f[P[0]].codecs}" ${f[P[0]].videoRange}; not compatible with "${y.codecs}" ${D}`), v.info(`[abr] switch candidate:${u}->${H} adjustedbw(${Math.round(Y)})-bitrate=${Math.round(Y - W)} ttfb:${K.toFixed(1)} avgDuration:${M.toFixed(1)} maxFetchDuration:${c.toFixed(1)} fetchDuration:${z.toFixed(1)} firstSelection:${I} codecSet:${S} videoRange:${D} hls.loadLevel:${T}`)), I && (this.firstSelection = H), H;
      }
    }
    return -1;
  }
  set nextAutoLevel(e) {
    const t = Math.max(this.hls.minAutoLevel, e);
    this._nextAutoLevel != t && (this.nextAutoLevelKey = "", this._nextAutoLevel = t);
  }
}
class Da {
  constructor() {
    this._boundTick = void 0, this._tickTimer = null, this._tickInterval = null, this._tickCallCount = 0, this._boundTick = this.tick.bind(this);
  }
  destroy() {
    this.onHandlerDestroying(), this.onHandlerDestroyed();
  }
  onHandlerDestroying() {
    this.clearNextTick(), this.clearInterval();
  }
  onHandlerDestroyed() {
  }
  hasInterval() {
    return !!this._tickInterval;
  }
  hasNextTick() {
    return !!this._tickTimer;
  }
  /**
   * @param millis - Interval time (ms)
   * @eturns True when interval has been scheduled, false when already scheduled (no effect)
   */
  setInterval(e) {
    return this._tickInterval ? !1 : (this._tickCallCount = 0, this._tickInterval = self.setInterval(this._boundTick, e), !0);
  }
  /**
   * @returns True when interval was cleared, false when none was set (no effect)
   */
  clearInterval() {
    return this._tickInterval ? (self.clearInterval(this._tickInterval), this._tickInterval = null, !0) : !1;
  }
  /**
   * @returns True when timeout was cleared, false when none was set (no effect)
   */
  clearNextTick() {
    return this._tickTimer ? (self.clearTimeout(this._tickTimer), this._tickTimer = null, !0) : !1;
  }
  /**
   * Will call the subclass doTick implementation in this main loop tick
   * or in the next one (via setTimeout(,0)) in case it has already been called
   * in this tick (in case this is a re-entrant call).
   */
  tick() {
    this._tickCallCount++, this._tickCallCount === 1 && (this.doTick(), this._tickCallCount > 1 && this.tickImmediate(), this._tickCallCount = 0);
  }
  tickImmediate() {
    this.clearNextTick(), this._tickTimer = self.setTimeout(this._boundTick, 0);
  }
  /**
   * For subclass to implement task logic
   * @abstract
   */
  doTick() {
  }
}
var oe = {
  NOT_LOADED: "NOT_LOADED",
  APPENDING: "APPENDING",
  PARTIAL: "PARTIAL",
  OK: "OK"
};
class Ca {
  constructor(e) {
    this.activePartLists = /* @__PURE__ */ Object.create(null), this.endListFragments = /* @__PURE__ */ Object.create(null), this.fragments = /* @__PURE__ */ Object.create(null), this.timeRanges = /* @__PURE__ */ Object.create(null), this.bufferPadding = 0.2, this.hls = void 0, this.hasGaps = !1, this.hls = e, this._registerListeners();
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.BUFFER_APPENDED, this.onBufferAppended, this), e.on(m.FRAG_BUFFERED, this.onFragBuffered, this), e.on(m.FRAG_LOADED, this.onFragLoaded, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.BUFFER_APPENDED, this.onBufferAppended, this), e.off(m.FRAG_BUFFERED, this.onFragBuffered, this), e.off(m.FRAG_LOADED, this.onFragLoaded, this);
  }
  destroy() {
    this._unregisterListeners(), this.fragments = // @ts-ignore
    this.activePartLists = // @ts-ignore
    this.endListFragments = this.timeRanges = null;
  }
  /**
   * Return a Fragment or Part with an appended range that matches the position and levelType
   * Otherwise, return null
   */
  getAppendedFrag(e, t) {
    const s = this.activePartLists[t];
    if (s)
      for (let i = s.length; i--; ) {
        const r = s[i];
        if (!r)
          break;
        const n = r.end;
        if (r.start <= e && n !== null && e <= n)
          return r;
      }
    return this.getBufferedFrag(e, t);
  }
  /**
   * Return a buffered Fragment that matches the position and levelType.
   * A buffered Fragment is one whose loading, parsing and appending is done (completed or "partial" meaning aborted).
   * If not found any Fragment, return null
   */
  getBufferedFrag(e, t) {
    const {
      fragments: s
    } = this, i = Object.keys(s);
    for (let r = i.length; r--; ) {
      const n = s[i[r]];
      if ((n == null ? void 0 : n.body.type) === t && n.buffered) {
        const o = n.body;
        if (o.start <= e && e <= o.end)
          return o;
      }
    }
    return null;
  }
  /**
   * Partial fragments effected by coded frame eviction will be removed
   * The browser will unload parts of the buffer to free up memory for new buffer data
   * Fragments will need to be reloaded when the buffer is freed up, removing partial fragments will allow them to reload(since there might be parts that are still playable)
   */
  detectEvictedFragments(e, t, s, i) {
    this.timeRanges && (this.timeRanges[e] = t);
    const r = (i == null ? void 0 : i.fragment.sn) || -1;
    Object.keys(this.fragments).forEach((n) => {
      const o = this.fragments[n];
      if (!o || r >= o.body.sn)
        return;
      if (!o.buffered && !o.loaded) {
        o.body.type === s && this.removeFragment(o.body);
        return;
      }
      const l = o.range[e];
      l && l.time.some((c) => {
        const h = !this.isTimeBuffered(c.startPTS, c.endPTS, t);
        return h && this.removeFragment(o.body), h;
      });
    });
  }
  /**
   * Checks if the fragment passed in is loaded in the buffer properly
   * Partially loaded fragments will be registered as a partial fragment
   */
  detectPartialFragments(e) {
    const t = this.timeRanges, {
      frag: s,
      part: i
    } = e;
    if (!t || s.sn === "initSegment")
      return;
    const r = $e(s), n = this.fragments[r];
    if (!n || n.buffered && s.gap)
      return;
    const o = !s.relurl;
    Object.keys(t).forEach((l) => {
      const c = s.elementaryStreams[l];
      if (!c)
        return;
      const h = t[l], u = o || c.partial === !0;
      n.range[l] = this.getBufferedTimes(s, i, u, h);
    }), n.loaded = null, Object.keys(n.range).length ? (n.buffered = !0, (n.body.endList = s.endList || n.body.endList) && (this.endListFragments[n.body.type] = n), lt(n) || this.removeParts(s.sn - 1, s.type)) : this.removeFragment(n.body);
  }
  removeParts(e, t) {
    const s = this.activePartLists[t];
    s && (this.activePartLists[t] = s.filter((i) => i.fragment.sn >= e));
  }
  fragBuffered(e, t) {
    const s = $e(e);
    let i = this.fragments[s];
    !i && t && (i = this.fragments[s] = {
      body: e,
      appendedPTS: null,
      loaded: null,
      buffered: !1,
      range: /* @__PURE__ */ Object.create(null)
    }, e.gap && (this.hasGaps = !0)), i && (i.loaded = null, i.buffered = !0);
  }
  getBufferedTimes(e, t, s, i) {
    const r = {
      time: [],
      partial: s
    }, n = e.start, o = e.end, l = e.minEndPTS || o, c = e.maxStartPTS || n;
    for (let h = 0; h < i.length; h++) {
      const u = i.start(h) - this.bufferPadding, d = i.end(h) + this.bufferPadding;
      if (c >= u && l <= d) {
        r.time.push({
          startPTS: Math.max(n, i.start(h)),
          endPTS: Math.min(o, i.end(h))
        });
        break;
      } else if (n < d && o > u) {
        const g = Math.max(n, i.start(h)), f = Math.min(o, i.end(h));
        f > g && (r.partial = !0, r.time.push({
          startPTS: g,
          endPTS: f
        }));
      } else if (o <= u)
        break;
    }
    return r;
  }
  /**
   * Gets the partial fragment for a certain time
   */
  getPartialFragment(e) {
    let t = null, s, i, r, n = 0;
    const {
      bufferPadding: o,
      fragments: l
    } = this;
    return Object.keys(l).forEach((c) => {
      const h = l[c];
      h && lt(h) && (i = h.body.start - o, r = h.body.end + o, e >= i && e <= r && (s = Math.min(e - i, r - e), n <= s && (t = h.body, n = s)));
    }), t;
  }
  isEndListAppended(e) {
    const t = this.endListFragments[e];
    return t !== void 0 && (t.buffered || lt(t));
  }
  getState(e) {
    const t = $e(e), s = this.fragments[t];
    return s ? s.buffered ? lt(s) ? oe.PARTIAL : oe.OK : oe.APPENDING : oe.NOT_LOADED;
  }
  isTimeBuffered(e, t, s) {
    let i, r;
    for (let n = 0; n < s.length; n++) {
      if (i = s.start(n) - this.bufferPadding, r = s.end(n) + this.bufferPadding, e >= i && t <= r)
        return !0;
      if (t <= i)
        return !1;
    }
    return !1;
  }
  onFragLoaded(e, t) {
    const {
      frag: s,
      part: i
    } = t;
    if (s.sn === "initSegment" || s.bitrateTest)
      return;
    const r = i ? null : t, n = $e(s);
    this.fragments[n] = {
      body: s,
      appendedPTS: null,
      loaded: r,
      buffered: !1,
      range: /* @__PURE__ */ Object.create(null)
    };
  }
  onBufferAppended(e, t) {
    const {
      frag: s,
      part: i,
      timeRanges: r
    } = t;
    if (s.sn === "initSegment")
      return;
    const n = s.type;
    if (i) {
      let o = this.activePartLists[n];
      o || (this.activePartLists[n] = o = []), o.push(i);
    }
    this.timeRanges = r, Object.keys(r).forEach((o) => {
      const l = r[o];
      this.detectEvictedFragments(o, l, n, i);
    });
  }
  onFragBuffered(e, t) {
    this.detectPartialFragments(t);
  }
  hasFragment(e) {
    const t = $e(e);
    return !!this.fragments[t];
  }
  hasParts(e) {
    var t;
    return !!((t = this.activePartLists[e]) != null && t.length);
  }
  removeFragmentsInRange(e, t, s, i, r) {
    i && !this.hasGaps || Object.keys(this.fragments).forEach((n) => {
      const o = this.fragments[n];
      if (!o)
        return;
      const l = o.body;
      l.type !== s || i && !l.gap || l.start < t && l.end > e && (o.buffered || r) && this.removeFragment(l);
    });
  }
  removeFragment(e) {
    const t = $e(e);
    e.stats.loaded = 0, e.clearElementaryStreamInfo();
    const s = this.activePartLists[e.type];
    if (s) {
      const i = e.sn;
      this.activePartLists[e.type] = s.filter((r) => r.fragment.sn !== i);
    }
    delete this.fragments[t], e.endList && delete this.endListFragments[e.type];
  }
  removeAllFragments() {
    this.fragments = /* @__PURE__ */ Object.create(null), this.endListFragments = /* @__PURE__ */ Object.create(null), this.activePartLists = /* @__PURE__ */ Object.create(null), this.hasGaps = !1;
  }
}
function lt(a) {
  var e, t, s;
  return a.buffered && (a.body.gap || ((e = a.range.video) == null ? void 0 : e.partial) || ((t = a.range.audio) == null ? void 0 : t.partial) || ((s = a.range.audiovideo) == null ? void 0 : s.partial));
}
function $e(a) {
  return `${a.type}_${a.level}_${a.sn}`;
}
const wa = {
  length: 0,
  start: () => 0,
  end: () => 0
};
class Q {
  /**
   * Return true if `media`'s buffered include `position`
   */
  static isBuffered(e, t) {
    try {
      if (e) {
        const s = Q.getBuffered(e);
        for (let i = 0; i < s.length; i++)
          if (t >= s.start(i) && t <= s.end(i))
            return !0;
      }
    } catch {
    }
    return !1;
  }
  static bufferInfo(e, t, s) {
    try {
      if (e) {
        const i = Q.getBuffered(e), r = [];
        let n;
        for (n = 0; n < i.length; n++)
          r.push({
            start: i.start(n),
            end: i.end(n)
          });
        return this.bufferedInfo(r, t, s);
      }
    } catch {
    }
    return {
      len: 0,
      start: t,
      end: t,
      nextStart: void 0
    };
  }
  static bufferedInfo(e, t, s) {
    t = Math.max(0, t), e.sort(function(c, h) {
      const u = c.start - h.start;
      return u || h.end - c.end;
    });
    let i = [];
    if (s)
      for (let c = 0; c < e.length; c++) {
        const h = i.length;
        if (h) {
          const u = i[h - 1].end;
          e[c].start - u < s ? e[c].end > u && (i[h - 1].end = e[c].end) : i.push(e[c]);
        } else
          i.push(e[c]);
      }
    else
      i = e;
    let r = 0, n, o = t, l = t;
    for (let c = 0; c < i.length; c++) {
      const h = i[c].start, u = i[c].end;
      if (t + s >= h && t < u)
        o = h, l = u, r = l - t;
      else if (t + s < h) {
        n = h;
        break;
      }
    }
    return {
      len: r,
      start: o || 0,
      end: l || 0,
      nextStart: n
    };
  }
  /**
   * Safe method to get buffered property.
   * SourceBuffer.buffered may throw if SourceBuffer is removed from it's MediaSource
   */
  static getBuffered(e) {
    try {
      return e.buffered;
    } catch (t) {
      return v.log("failed to get media.buffered", t), wa;
    }
  }
}
class As {
  constructor(e, t, s, i = 0, r = -1, n = !1) {
    this.level = void 0, this.sn = void 0, this.part = void 0, this.id = void 0, this.size = void 0, this.partial = void 0, this.transmuxing = ct(), this.buffering = {
      audio: ct(),
      video: ct(),
      audiovideo: ct()
    }, this.level = e, this.sn = t, this.id = s, this.size = i, this.part = r, this.partial = n;
  }
}
function ct() {
  return {
    start: 0,
    executeStart: 0,
    executeEnd: 0,
    end: 0
  };
}
function pt(a, e) {
  for (let s = 0, i = a.length; s < i; s++) {
    var t;
    if (((t = a[s]) == null ? void 0 : t.cc) === e)
      return a[s];
  }
  return null;
}
function ka(a, e, t) {
  return !!(e && (t.endCC > t.startCC || a && a.cc < t.startCC));
}
function _a(a, e) {
  const t = a.fragments, s = e.fragments;
  if (!s.length || !t.length) {
    v.log("No fragments to align");
    return;
  }
  const i = pt(t, s[0].cc);
  if (!i || i && !i.startPTS) {
    v.log("No frag in previous level to align on");
    return;
  }
  return i;
}
function li(a, e) {
  if (a) {
    const t = a.start + e;
    a.start = a.startPTS = t, a.endPTS = t + a.duration;
  }
}
function cr(a, e) {
  const t = e.fragments;
  for (let s = 0, i = t.length; s < i; s++)
    li(t[s], a);
  e.fragmentHint && li(e.fragmentHint, a), e.alignedSliding = !0;
}
function Pa(a, e, t) {
  e && (Fa(a, t, e), !t.alignedSliding && e && wt(t, e), !t.alignedSliding && e && !t.skippedSegments && rr(e, t));
}
function Fa(a, e, t) {
  if (ka(a, t, e)) {
    const s = _a(t, e);
    s && O(s.start) && (v.log(`Adjusting PTS using last level due to CC increase within current level ${e.url}`), cr(s.start, e));
  }
}
function wt(a, e) {
  if (!a.hasProgramDateTime || !e.hasProgramDateTime)
    return;
  const t = a.fragments, s = e.fragments;
  if (!t.length || !s.length)
    return;
  let i, r;
  const n = Math.min(e.endCC, a.endCC);
  e.startCC < n && a.startCC < n && (i = pt(s, n), r = pt(t, n)), (!i || !r) && (i = s[Math.floor(s.length / 2)], r = pt(t, i.cc) || t[Math.floor(t.length / 2)]);
  const o = i.programDateTime, l = r.programDateTime;
  if (!o || !l)
    return;
  const c = (l - o) / 1e3 - (r.start - i.start);
  cr(c, a);
}
const ci = Math.pow(2, 17);
class Oa {
  constructor(e) {
    this.config = void 0, this.loader = null, this.partLoadTimeout = -1, this.config = e;
  }
  destroy() {
    this.loader && (this.loader.destroy(), this.loader = null);
  }
  abort() {
    this.loader && this.loader.abort();
  }
  load(e, t) {
    const s = e.url;
    if (!s)
      return Promise.reject(new we({
        type: U.NETWORK_ERROR,
        details: L.FRAG_LOAD_ERROR,
        fatal: !1,
        frag: e,
        error: new Error(`Fragment does not have a ${s ? "part list" : "url"}`),
        networkDetails: null
      }));
    this.abort();
    const i = this.config, r = i.fLoader, n = i.loader;
    return new Promise((o, l) => {
      if (this.loader && this.loader.destroy(), e.gap)
        if (e.tagList.some((g) => g[0] === "GAP")) {
          l(ui(e));
          return;
        } else
          e.gap = !1;
      const c = this.loader = e.loader = r ? new r(i) : new n(i), h = hi(e), u = ni(i.fragLoadPolicy.default), d = {
        loadPolicy: u,
        timeout: u.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0,
        highWaterMark: e.sn === "initSegment" ? 1 / 0 : ci
      };
      e.stats = c.stats, c.load(h, d, {
        onSuccess: (g, f, p, T) => {
          this.resetLoader(e, c);
          let E = g.data;
          p.resetIV && e.decryptdata && (e.decryptdata.iv = new Uint8Array(E.slice(0, 16)), E = E.slice(16)), o({
            frag: e,
            part: null,
            payload: E,
            networkDetails: T
          });
        },
        onError: (g, f, p, T) => {
          this.resetLoader(e, c), l(new we({
            type: U.NETWORK_ERROR,
            details: L.FRAG_LOAD_ERROR,
            fatal: !1,
            frag: e,
            response: le({
              url: s,
              data: void 0
            }, g),
            error: new Error(`HTTP Error ${g.code} ${g.text}`),
            networkDetails: p,
            stats: T
          }));
        },
        onAbort: (g, f, p) => {
          this.resetLoader(e, c), l(new we({
            type: U.NETWORK_ERROR,
            details: L.INTERNAL_ABORTED,
            fatal: !1,
            frag: e,
            error: new Error("Aborted"),
            networkDetails: p,
            stats: g
          }));
        },
        onTimeout: (g, f, p) => {
          this.resetLoader(e, c), l(new we({
            type: U.NETWORK_ERROR,
            details: L.FRAG_LOAD_TIMEOUT,
            fatal: !1,
            frag: e,
            error: new Error(`Timeout after ${d.timeout}ms`),
            networkDetails: p,
            stats: g
          }));
        },
        onProgress: (g, f, p, T) => {
          t && t({
            frag: e,
            part: null,
            payload: p,
            networkDetails: T
          });
        }
      });
    });
  }
  loadPart(e, t, s) {
    this.abort();
    const i = this.config, r = i.fLoader, n = i.loader;
    return new Promise((o, l) => {
      if (this.loader && this.loader.destroy(), e.gap || t.gap) {
        l(ui(e, t));
        return;
      }
      const c = this.loader = e.loader = r ? new r(i) : new n(i), h = hi(e, t), u = ni(i.fragLoadPolicy.default), d = {
        loadPolicy: u,
        timeout: u.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0,
        highWaterMark: ci
      };
      t.stats = c.stats, c.load(h, d, {
        onSuccess: (g, f, p, T) => {
          this.resetLoader(e, c), this.updateStatsFromPart(e, t);
          const E = {
            frag: e,
            part: t,
            payload: g.data,
            networkDetails: T
          };
          s(E), o(E);
        },
        onError: (g, f, p, T) => {
          this.resetLoader(e, c), l(new we({
            type: U.NETWORK_ERROR,
            details: L.FRAG_LOAD_ERROR,
            fatal: !1,
            frag: e,
            part: t,
            response: le({
              url: h.url,
              data: void 0
            }, g),
            error: new Error(`HTTP Error ${g.code} ${g.text}`),
            networkDetails: p,
            stats: T
          }));
        },
        onAbort: (g, f, p) => {
          e.stats.aborted = t.stats.aborted, this.resetLoader(e, c), l(new we({
            type: U.NETWORK_ERROR,
            details: L.INTERNAL_ABORTED,
            fatal: !1,
            frag: e,
            part: t,
            error: new Error("Aborted"),
            networkDetails: p,
            stats: g
          }));
        },
        onTimeout: (g, f, p) => {
          this.resetLoader(e, c), l(new we({
            type: U.NETWORK_ERROR,
            details: L.FRAG_LOAD_TIMEOUT,
            fatal: !1,
            frag: e,
            part: t,
            error: new Error(`Timeout after ${d.timeout}ms`),
            networkDetails: p,
            stats: g
          }));
        }
      });
    });
  }
  updateStatsFromPart(e, t) {
    const s = e.stats, i = t.stats, r = i.total;
    if (s.loaded += i.loaded, r) {
      const l = Math.round(e.duration / t.duration), c = Math.min(Math.round(s.loaded / r), l), u = (l - c) * Math.round(s.loaded / c);
      s.total = s.loaded + u;
    } else
      s.total = Math.max(s.loaded, s.total);
    const n = s.loading, o = i.loading;
    n.start ? n.first += o.first - o.start : (n.start = o.start, n.first = o.first), n.end = o.end;
  }
  resetLoader(e, t) {
    e.loader = null, this.loader === t && (self.clearTimeout(this.partLoadTimeout), this.loader = null), t.destroy();
  }
}
function hi(a, e = null) {
  const t = e || a, s = {
    frag: a,
    part: e,
    responseType: "arraybuffer",
    url: t.url,
    headers: {},
    rangeStart: 0,
    rangeEnd: 0
  }, i = t.byteRangeStartOffset, r = t.byteRangeEndOffset;
  if (O(i) && O(r)) {
    var n;
    let o = i, l = r;
    if (a.sn === "initSegment" && ((n = a.decryptdata) == null ? void 0 : n.method) === "AES-128") {
      const c = r - i;
      c % 16 && (l = r + (16 - c % 16)), i !== 0 && (s.resetIV = !0, o = i - 16);
    }
    s.rangeStart = o, s.rangeEnd = l;
  }
  return s;
}
function ui(a, e) {
  const t = new Error(`GAP ${a.gap ? "tag" : "attribute"} found`), s = {
    type: U.MEDIA_ERROR,
    details: L.FRAG_GAP,
    fatal: !1,
    frag: a,
    error: t,
    networkDetails: null
  };
  return e && (s.part = e), (e || a).stats.aborted = !0, new we(s);
}
class we extends Error {
  constructor(e) {
    super(e.error.message), this.data = void 0, this.data = e;
  }
}
class Ma {
  constructor(e, t) {
    this.subtle = void 0, this.aesIV = void 0, this.subtle = e, this.aesIV = t;
  }
  decrypt(e, t) {
    return this.subtle.decrypt({
      name: "AES-CBC",
      iv: this.aesIV
    }, t, e);
  }
}
class Na {
  constructor(e, t) {
    this.subtle = void 0, this.key = void 0, this.subtle = e, this.key = t;
  }
  expandKey() {
    return this.subtle.importKey("raw", this.key, {
      name: "AES-CBC"
    }, !1, ["encrypt", "decrypt"]);
  }
}
function Ua(a) {
  const e = a.byteLength, t = e && new DataView(a.buffer).getUint8(e - 1);
  return t ? Ne(a, 0, e - t) : a;
}
class Ba {
  constructor() {
    this.rcon = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54], this.subMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.invSubMix = [new Uint32Array(256), new Uint32Array(256), new Uint32Array(256), new Uint32Array(256)], this.sBox = new Uint32Array(256), this.invSBox = new Uint32Array(256), this.key = new Uint32Array(0), this.ksRows = 0, this.keySize = 0, this.keySchedule = void 0, this.invKeySchedule = void 0, this.initTable();
  }
  // Using view.getUint32() also swaps the byte order.
  uint8ArrayToUint32Array_(e) {
    const t = new DataView(e), s = new Uint32Array(4);
    for (let i = 0; i < 4; i++)
      s[i] = t.getUint32(i * 4);
    return s;
  }
  initTable() {
    const e = this.sBox, t = this.invSBox, s = this.subMix, i = s[0], r = s[1], n = s[2], o = s[3], l = this.invSubMix, c = l[0], h = l[1], u = l[2], d = l[3], g = new Uint32Array(256);
    let f = 0, p = 0, T = 0;
    for (T = 0; T < 256; T++)
      T < 128 ? g[T] = T << 1 : g[T] = T << 1 ^ 283;
    for (T = 0; T < 256; T++) {
      let E = p ^ p << 1 ^ p << 2 ^ p << 3 ^ p << 4;
      E = E >>> 8 ^ E & 255 ^ 99, e[f] = E, t[E] = f;
      const y = g[f], x = g[y], I = g[x];
      let S = g[E] * 257 ^ E * 16843008;
      i[f] = S << 24 | S >>> 8, r[f] = S << 16 | S >>> 16, n[f] = S << 8 | S >>> 24, o[f] = S, S = I * 16843009 ^ x * 65537 ^ y * 257 ^ f * 16843008, c[E] = S << 24 | S >>> 8, h[E] = S << 16 | S >>> 16, u[E] = S << 8 | S >>> 24, d[E] = S, f ? (f = y ^ g[g[g[I ^ y]]], p ^= g[g[p]]) : f = p = 1;
    }
  }
  expandKey(e) {
    const t = this.uint8ArrayToUint32Array_(e);
    let s = !0, i = 0;
    for (; i < t.length && s; )
      s = t[i] === this.key[i], i++;
    if (s)
      return;
    this.key = t;
    const r = this.keySize = t.length;
    if (r !== 4 && r !== 6 && r !== 8)
      throw new Error("Invalid aes key size=" + r);
    const n = this.ksRows = (r + 6 + 1) * 4;
    let o, l;
    const c = this.keySchedule = new Uint32Array(n), h = this.invKeySchedule = new Uint32Array(n), u = this.sBox, d = this.rcon, g = this.invSubMix, f = g[0], p = g[1], T = g[2], E = g[3];
    let y, x;
    for (o = 0; o < n; o++) {
      if (o < r) {
        y = c[o] = t[o];
        continue;
      }
      x = y, o % r === 0 ? (x = x << 8 | x >>> 24, x = u[x >>> 24] << 24 | u[x >>> 16 & 255] << 16 | u[x >>> 8 & 255] << 8 | u[x & 255], x ^= d[o / r | 0] << 24) : r > 6 && o % r === 4 && (x = u[x >>> 24] << 24 | u[x >>> 16 & 255] << 16 | u[x >>> 8 & 255] << 8 | u[x & 255]), c[o] = y = (c[o - r] ^ x) >>> 0;
    }
    for (l = 0; l < n; l++)
      o = n - l, l & 3 ? x = c[o] : x = c[o - 4], l < 4 || o <= 4 ? h[l] = x : h[l] = f[u[x >>> 24]] ^ p[u[x >>> 16 & 255]] ^ T[u[x >>> 8 & 255]] ^ E[u[x & 255]], h[l] = h[l] >>> 0;
  }
  // Adding this as a method greatly improves performance.
  networkToHostOrderSwap(e) {
    return e << 24 | (e & 65280) << 8 | (e & 16711680) >> 8 | e >>> 24;
  }
  decrypt(e, t, s) {
    const i = this.keySize + 6, r = this.invKeySchedule, n = this.invSBox, o = this.invSubMix, l = o[0], c = o[1], h = o[2], u = o[3], d = this.uint8ArrayToUint32Array_(s);
    let g = d[0], f = d[1], p = d[2], T = d[3];
    const E = new Int32Array(e), y = new Int32Array(E.length);
    let x, I, S, D, R, w, _, b, k, K, P, G, j, H;
    const B = this.networkToHostOrderSwap;
    for (; t < E.length; ) {
      for (k = B(E[t]), K = B(E[t + 1]), P = B(E[t + 2]), G = B(E[t + 3]), R = k ^ r[0], w = G ^ r[1], _ = P ^ r[2], b = K ^ r[3], j = 4, H = 1; H < i; H++)
        x = l[R >>> 24] ^ c[w >> 16 & 255] ^ h[_ >> 8 & 255] ^ u[b & 255] ^ r[j], I = l[w >>> 24] ^ c[_ >> 16 & 255] ^ h[b >> 8 & 255] ^ u[R & 255] ^ r[j + 1], S = l[_ >>> 24] ^ c[b >> 16 & 255] ^ h[R >> 8 & 255] ^ u[w & 255] ^ r[j + 2], D = l[b >>> 24] ^ c[R >> 16 & 255] ^ h[w >> 8 & 255] ^ u[_ & 255] ^ r[j + 3], R = x, w = I, _ = S, b = D, j = j + 4;
      x = n[R >>> 24] << 24 ^ n[w >> 16 & 255] << 16 ^ n[_ >> 8 & 255] << 8 ^ n[b & 255] ^ r[j], I = n[w >>> 24] << 24 ^ n[_ >> 16 & 255] << 16 ^ n[b >> 8 & 255] << 8 ^ n[R & 255] ^ r[j + 1], S = n[_ >>> 24] << 24 ^ n[b >> 16 & 255] << 16 ^ n[R >> 8 & 255] << 8 ^ n[w & 255] ^ r[j + 2], D = n[b >>> 24] << 24 ^ n[R >> 16 & 255] << 16 ^ n[w >> 8 & 255] << 8 ^ n[_ & 255] ^ r[j + 3], y[t] = B(x ^ g), y[t + 1] = B(D ^ f), y[t + 2] = B(S ^ p), y[t + 3] = B(I ^ T), g = k, f = K, p = P, T = G, t = t + 4;
    }
    return y.buffer;
  }
}
const $a = 16;
class Ls {
  constructor(e, {
    removePKCS7Padding: t = !0
  } = {}) {
    if (this.logEnabled = !0, this.removePKCS7Padding = void 0, this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null, this.useSoftware = void 0, this.useSoftware = e.enableSoftwareAES, this.removePKCS7Padding = t, t)
      try {
        const s = self.crypto;
        s && (this.subtle = s.subtle || s.webkitSubtle);
      } catch {
      }
    this.subtle === null && (this.useSoftware = !0);
  }
  destroy() {
    this.subtle = null, this.softwareDecrypter = null, this.key = null, this.fastAesKey = null, this.remainderData = null, this.currentIV = null, this.currentResult = null;
  }
  isSync() {
    return this.useSoftware;
  }
  flush() {
    const {
      currentResult: e,
      remainderData: t
    } = this;
    if (!e || t)
      return this.reset(), null;
    const s = new Uint8Array(e);
    return this.reset(), this.removePKCS7Padding ? Ua(s) : s;
  }
  reset() {
    this.currentResult = null, this.currentIV = null, this.remainderData = null, this.softwareDecrypter && (this.softwareDecrypter = null);
  }
  decrypt(e, t, s) {
    return this.useSoftware ? new Promise((i, r) => {
      this.softwareDecrypt(new Uint8Array(e), t, s);
      const n = this.flush();
      n ? i(n.buffer) : r(new Error("[softwareDecrypt] Failed to decrypt data"));
    }) : this.webCryptoDecrypt(new Uint8Array(e), t, s);
  }
  // Software decryption is progressive. Progressive decryption may not return a result on each call. Any cached
  // data is handled in the flush() call
  softwareDecrypt(e, t, s) {
    const {
      currentIV: i,
      currentResult: r,
      remainderData: n
    } = this;
    this.logOnce("JS AES decrypt"), n && (e = me(n, e), this.remainderData = null);
    const o = this.getValidChunk(e);
    if (!o.length)
      return null;
    i && (s = i);
    let l = this.softwareDecrypter;
    l || (l = this.softwareDecrypter = new Ba()), l.expandKey(t);
    const c = r;
    return this.currentResult = l.decrypt(o.buffer, 0, s), this.currentIV = Ne(o, -16).buffer, c || null;
  }
  webCryptoDecrypt(e, t, s) {
    const i = this.subtle;
    return (this.key !== t || !this.fastAesKey) && (this.key = t, this.fastAesKey = new Na(i, t)), this.fastAesKey.expandKey().then((r) => i ? (this.logOnce("WebCrypto AES decrypt"), new Ma(i, new Uint8Array(s)).decrypt(e.buffer, r)) : Promise.reject(new Error("web crypto not initialized"))).catch((r) => (v.warn(`[decrypter]: WebCrypto Error, disable WebCrypto API, ${r.name}: ${r.message}`), this.onWebCryptoError(e, t, s)));
  }
  onWebCryptoError(e, t, s) {
    this.useSoftware = !0, this.logEnabled = !0, this.softwareDecrypt(e, t, s);
    const i = this.flush();
    if (i)
      return i.buffer;
    throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data");
  }
  getValidChunk(e) {
    let t = e;
    const s = e.length - e.length % $a;
    return s !== e.length && (t = Ne(e, 0, s), this.remainderData = Ne(e, s)), t;
  }
  logOnce(e) {
    this.logEnabled && (v.log(`[decrypter]: ${e}`), this.logEnabled = !1);
  }
}
const Ga = {
  toString: function(a) {
    let e = "";
    const t = a.length;
    for (let s = 0; s < t; s++)
      e += `[${a.start(s).toFixed(3)}-${a.end(s).toFixed(3)}]`;
    return e;
  }
}, C = {
  STOPPED: "STOPPED",
  IDLE: "IDLE",
  KEY_LOADING: "KEY_LOADING",
  FRAG_LOADING: "FRAG_LOADING",
  FRAG_LOADING_WAITING_RETRY: "FRAG_LOADING_WAITING_RETRY",
  WAITING_TRACK: "WAITING_TRACK",
  PARSING: "PARSING",
  PARSED: "PARSED",
  ENDED: "ENDED",
  ERROR: "ERROR",
  WAITING_INIT_PTS: "WAITING_INIT_PTS",
  WAITING_LEVEL: "WAITING_LEVEL"
};
class Rs extends Da {
  constructor(e, t, s, i, r) {
    super(), this.hls = void 0, this.fragPrevious = null, this.fragCurrent = null, this.fragmentTracker = void 0, this.transmuxer = null, this._state = C.STOPPED, this.playlistType = void 0, this.media = null, this.mediaBuffer = null, this.config = void 0, this.bitrateTest = !1, this.lastCurrentTime = 0, this.nextLoadPosition = 0, this.startPosition = 0, this.startTimeOffset = null, this.loadedmetadata = !1, this.retryDate = 0, this.levels = null, this.fragmentLoader = void 0, this.keyLoader = void 0, this.levelLastLoaded = null, this.startFragRequested = !1, this.decrypter = void 0, this.initPTS = [], this.onvseeking = null, this.onvended = null, this.logPrefix = "", this.log = void 0, this.warn = void 0, this.playlistType = r, this.logPrefix = i, this.log = v.log.bind(v, `${i}:`), this.warn = v.warn.bind(v, `${i}:`), this.hls = e, this.fragmentLoader = new Oa(e.config), this.keyLoader = s, this.fragmentTracker = t, this.config = e.config, this.decrypter = new Ls(e.config), e.on(m.MANIFEST_LOADED, this.onManifestLoaded, this);
  }
  doTick() {
    this.onTickEnd();
  }
  onTickEnd() {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  startLoad(e) {
  }
  stopLoad() {
    this.fragmentLoader.abort(), this.keyLoader.abort(this.playlistType);
    const e = this.fragCurrent;
    e != null && e.loader && (e.abortRequests(), this.fragmentTracker.removeFragment(e)), this.resetTransmuxer(), this.fragCurrent = null, this.fragPrevious = null, this.clearInterval(), this.clearNextTick(), this.state = C.STOPPED;
  }
  _streamEnded(e, t) {
    if (t.live || e.nextStart || !e.end || !this.media)
      return !1;
    const s = t.partList;
    if (s != null && s.length) {
      const r = s[s.length - 1];
      return Q.isBuffered(this.media, r.start + r.duration / 2);
    }
    const i = t.fragments[t.fragments.length - 1].type;
    return this.fragmentTracker.isEndListAppended(i);
  }
  getLevelDetails() {
    if (this.levels && this.levelLastLoaded !== null) {
      var e;
      return (e = this.levelLastLoaded) == null ? void 0 : e.details;
    }
  }
  onMediaAttached(e, t) {
    const s = this.media = this.mediaBuffer = t.media;
    this.onvseeking = this.onMediaSeeking.bind(this), this.onvended = this.onMediaEnded.bind(this), s.addEventListener("seeking", this.onvseeking), s.addEventListener("ended", this.onvended);
    const i = this.config;
    this.levels && i.autoStartLoad && this.state === C.STOPPED && this.startLoad(i.startPosition);
  }
  onMediaDetaching() {
    const e = this.media;
    e != null && e.ended && (this.log("MSE detaching and video ended, reset startPosition"), this.startPosition = this.lastCurrentTime = 0), e && this.onvseeking && this.onvended && (e.removeEventListener("seeking", this.onvseeking), e.removeEventListener("ended", this.onvended), this.onvseeking = this.onvended = null), this.keyLoader && this.keyLoader.detach(), this.media = this.mediaBuffer = null, this.loadedmetadata = !1, this.fragmentTracker.removeAllFragments(), this.stopLoad();
  }
  onMediaSeeking() {
    const {
      config: e,
      fragCurrent: t,
      media: s,
      mediaBuffer: i,
      state: r
    } = this, n = s ? s.currentTime : 0, o = Q.bufferInfo(i || s, n, e.maxBufferHole);
    if (this.log(`media seeking to ${O(n) ? n.toFixed(3) : n}, state: ${r}`), this.state === C.ENDED)
      this.resetLoadingState();
    else if (t) {
      const l = e.maxFragLookUpTolerance, c = t.start - l, h = t.start + t.duration + l;
      if (!o.len || h < o.start || c > o.end) {
        const u = n > h;
        (n < c || u) && (u && t.loader && (this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"), t.abortRequests(), this.resetLoadingState()), this.fragPrevious = null);
      }
    }
    s && (this.fragmentTracker.removeFragmentsInRange(n, 1 / 0, this.playlistType, !0), this.lastCurrentTime = n), !this.loadedmetadata && !o.len && (this.nextLoadPosition = this.startPosition = n), this.tickImmediate();
  }
  onMediaEnded() {
    this.startPosition = this.lastCurrentTime = 0;
  }
  onManifestLoaded(e, t) {
    this.startTimeOffset = t.startTimeOffset, this.initPTS = [];
  }
  onHandlerDestroying() {
    this.hls.off(m.MANIFEST_LOADED, this.onManifestLoaded, this), this.stopLoad(), super.onHandlerDestroying(), this.hls = null;
  }
  onHandlerDestroyed() {
    this.state = C.STOPPED, this.fragmentLoader && this.fragmentLoader.destroy(), this.keyLoader && this.keyLoader.destroy(), this.decrypter && this.decrypter.destroy(), this.hls = this.log = this.warn = this.decrypter = this.keyLoader = this.fragmentLoader = this.fragmentTracker = null, super.onHandlerDestroyed();
  }
  loadFragment(e, t, s) {
    this._loadFragForPlayback(e, t, s);
  }
  _loadFragForPlayback(e, t, s) {
    const i = (r) => {
      if (this.fragContextChanged(e)) {
        this.warn(`Fragment ${e.sn}${r.part ? " p: " + r.part.index : ""} of level ${e.level} was dropped during download.`), this.fragmentTracker.removeFragment(e);
        return;
      }
      e.stats.chunkCount++, this._handleFragmentLoadProgress(r);
    };
    this._doFragLoad(e, t, s, i).then((r) => {
      if (!r)
        return;
      const n = this.state;
      if (this.fragContextChanged(e)) {
        (n === C.FRAG_LOADING || !this.fragCurrent && n === C.PARSING) && (this.fragmentTracker.removeFragment(e), this.state = C.IDLE);
        return;
      }
      "payload" in r && (this.log(`Loaded fragment ${e.sn} of level ${e.level}`), this.hls.trigger(m.FRAG_LOADED, r)), this._handleFragmentLoadComplete(r);
    }).catch((r) => {
      this.state === C.STOPPED || this.state === C.ERROR || (this.warn(r), this.resetFragmentLoading(e));
    });
  }
  clearTrackerIfNeeded(e) {
    var t;
    const {
      fragmentTracker: s
    } = this;
    if (s.getState(e) === oe.APPENDING) {
      const r = e.type, n = this.getFwdBufferInfo(this.mediaBuffer, r), o = Math.max(e.duration, n ? n.len : this.config.maxBufferLength);
      this.reduceMaxBufferLength(o) && s.removeFragment(e);
    } else
      ((t = this.mediaBuffer) == null ? void 0 : t.buffered.length) === 0 ? s.removeAllFragments() : s.hasParts(e.type) && (s.detectPartialFragments({
        frag: e,
        part: null,
        stats: e.stats,
        id: e.type
      }), s.getState(e) === oe.PARTIAL && s.removeFragment(e));
  }
  checkLiveUpdate(e) {
    if (e.updated && !e.live) {
      const t = e.fragments[e.fragments.length - 1];
      this.fragmentTracker.detectPartialFragments({
        frag: t,
        part: null,
        stats: t.stats,
        id: t.type
      });
    }
    e.fragments[0] || (e.deltaUpdateFailed = !0);
  }
  flushMainBuffer(e, t, s = null) {
    if (!(e - t))
      return;
    const i = {
      startOffset: e,
      endOffset: t,
      type: s
    };
    this.hls.trigger(m.BUFFER_FLUSHING, i);
  }
  _loadInitSegment(e, t) {
    this._doFragLoad(e, t).then((s) => {
      if (!s || this.fragContextChanged(e) || !this.levels)
        throw new Error("init load aborted");
      return s;
    }).then((s) => {
      const {
        hls: i
      } = this, {
        payload: r
      } = s, n = e.decryptdata;
      if (r && r.byteLength > 0 && n != null && n.key && n.iv && n.method === "AES-128") {
        const o = self.performance.now();
        return this.decrypter.decrypt(new Uint8Array(r), n.key.buffer, n.iv.buffer).catch((l) => {
          throw i.trigger(m.ERROR, {
            type: U.MEDIA_ERROR,
            details: L.FRAG_DECRYPT_ERROR,
            fatal: !1,
            error: l,
            reason: l.message,
            frag: e
          }), l;
        }).then((l) => {
          const c = self.performance.now();
          return i.trigger(m.FRAG_DECRYPTED, {
            frag: e,
            payload: l,
            stats: {
              tstart: o,
              tdecrypt: c
            }
          }), s.payload = l, this.completeInitSegmentLoad(s);
        });
      }
      return this.completeInitSegmentLoad(s);
    }).catch((s) => {
      this.state === C.STOPPED || this.state === C.ERROR || (this.warn(s), this.resetFragmentLoading(e));
    });
  }
  completeInitSegmentLoad(e) {
    const {
      levels: t
    } = this;
    if (!t)
      throw new Error("init load aborted, missing levels");
    const s = e.frag.stats;
    this.state = C.IDLE, e.frag.data = new Uint8Array(e.payload), s.parsing.start = s.buffering.start = self.performance.now(), s.parsing.end = s.buffering.end = self.performance.now(), this.tick();
  }
  fragContextChanged(e) {
    const {
      fragCurrent: t
    } = this;
    return !e || !t || e.sn !== t.sn || e.level !== t.level;
  }
  fragBufferedComplete(e, t) {
    var s, i, r, n;
    const o = this.mediaBuffer ? this.mediaBuffer : this.media;
    if (this.log(`Buffered ${e.type} sn: ${e.sn}${t ? " part: " + t.index : ""} of ${this.playlistType === N.MAIN ? "level" : "track"} ${e.level} (frag:[${((s = e.startPTS) != null ? s : NaN).toFixed(3)}-${((i = e.endPTS) != null ? i : NaN).toFixed(3)}] > buffer:${o ? Ga.toString(Q.getBuffered(o)) : "(detached)"})`), e.sn !== "initSegment") {
      var l;
      if (e.type !== N.SUBTITLE) {
        const h = e.elementaryStreams;
        if (!Object.keys(h).some((u) => !!h[u])) {
          this.state = C.IDLE;
          return;
        }
      }
      const c = (l = this.levels) == null ? void 0 : l[e.level];
      c != null && c.fragmentError && (this.log(`Resetting level fragment error count of ${c.fragmentError} on frag buffered`), c.fragmentError = 0);
    }
    this.state = C.IDLE, o && (!this.loadedmetadata && e.type == N.MAIN && o.buffered.length && ((r = this.fragCurrent) == null ? void 0 : r.sn) === ((n = this.fragPrevious) == null ? void 0 : n.sn) && (this.loadedmetadata = !0, this.seekToStartPos()), this.tick());
  }
  seekToStartPos() {
  }
  _handleFragmentLoadComplete(e) {
    const {
      transmuxer: t
    } = this;
    if (!t)
      return;
    const {
      frag: s,
      part: i,
      partsLoaded: r
    } = e, n = !r || r.length === 0 || r.some((l) => !l), o = new As(s.level, s.sn, s.stats.chunkCount + 1, 0, i ? i.index : -1, !n);
    t.flush(o);
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _handleFragmentLoadProgress(e) {
  }
  _doFragLoad(e, t, s = null, i) {
    var r;
    const n = t == null ? void 0 : t.details;
    if (!this.levels || !n)
      throw new Error(`frag load aborted, missing level${n ? "" : " detail"}s`);
    let o = null;
    if (e.encrypted && !((r = e.decryptdata) != null && r.key) ? (this.log(`Loading key for ${e.sn} of [${n.startSN}-${n.endSN}], ${this.logPrefix === "[stream-controller]" ? "level" : "track"} ${e.level}`), this.state = C.KEY_LOADING, this.fragCurrent = e, o = this.keyLoader.load(e).then((h) => {
      if (!this.fragContextChanged(h.frag))
        return this.hls.trigger(m.KEY_LOADED, h), this.state === C.KEY_LOADING && (this.state = C.IDLE), h;
    }), this.hls.trigger(m.KEY_LOADING, {
      frag: e
    }), this.fragCurrent === null && (o = Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING")))) : !e.encrypted && n.encryptedFragments.length && this.keyLoader.loadClear(e, n.encryptedFragments), s = Math.max(e.start, s || 0), this.config.lowLatencyMode && e.sn !== "initSegment") {
      const h = n.partList;
      if (h && i) {
        s > e.end && n.fragmentHint && (e = n.fragmentHint);
        const u = this.getNextPart(h, e, s);
        if (u > -1) {
          const d = h[u];
          this.log(`Loading part sn: ${e.sn} p: ${d.index} cc: ${e.cc} of playlist [${n.startSN}-${n.endSN}] parts [0-${u}-${h.length - 1}] ${this.logPrefix === "[stream-controller]" ? "level" : "track"}: ${e.level}, target: ${parseFloat(s.toFixed(3))}`), this.nextLoadPosition = d.start + d.duration, this.state = C.FRAG_LOADING;
          let g;
          return o ? g = o.then((f) => !f || this.fragContextChanged(f.frag) ? null : this.doFragPartsLoad(e, d, t, i)).catch((f) => this.handleFragLoadError(f)) : g = this.doFragPartsLoad(e, d, t, i).catch((f) => this.handleFragLoadError(f)), this.hls.trigger(m.FRAG_LOADING, {
            frag: e,
            part: d,
            targetBufferTime: s
          }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")) : g;
        } else if (!e.url || this.loadedEndOfParts(h, s))
          return Promise.resolve(null);
      }
    }
    this.log(`Loading fragment ${e.sn} cc: ${e.cc} ${n ? "of [" + n.startSN + "-" + n.endSN + "] " : ""}${this.logPrefix === "[stream-controller]" ? "level" : "track"}: ${e.level}, target: ${parseFloat(s.toFixed(3))}`), O(e.sn) && !this.bitrateTest && (this.nextLoadPosition = e.start + e.duration), this.state = C.FRAG_LOADING;
    const l = this.config.progressive;
    let c;
    return l && o ? c = o.then((h) => !h || this.fragContextChanged(h == null ? void 0 : h.frag) ? null : this.fragmentLoader.load(e, i)).catch((h) => this.handleFragLoadError(h)) : c = Promise.all([this.fragmentLoader.load(e, l ? i : void 0), o]).then(([h]) => (!l && h && i && i(h), h)).catch((h) => this.handleFragLoadError(h)), this.hls.trigger(m.FRAG_LOADING, {
      frag: e,
      targetBufferTime: s
    }), this.fragCurrent === null ? Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")) : c;
  }
  doFragPartsLoad(e, t, s, i) {
    return new Promise((r, n) => {
      var o;
      const l = [], c = (o = s.details) == null ? void 0 : o.partList, h = (u) => {
        this.fragmentLoader.loadPart(e, u, i).then((d) => {
          l[u.index] = d;
          const g = d.part;
          this.hls.trigger(m.FRAG_LOADED, d);
          const f = ii(s, e.sn, u.index + 1) || nr(c, e.sn, u.index + 1);
          if (f)
            h(f);
          else
            return r({
              frag: e,
              part: g,
              partsLoaded: l
            });
        }).catch(n);
      };
      h(t);
    });
  }
  handleFragLoadError(e) {
    if ("data" in e) {
      const t = e.data;
      e.data && t.details === L.INTERNAL_ABORTED ? this.handleFragLoadAborted(t.frag, t.part) : this.hls.trigger(m.ERROR, t);
    } else
      this.hls.trigger(m.ERROR, {
        type: U.OTHER_ERROR,
        details: L.INTERNAL_EXCEPTION,
        err: e,
        error: e,
        fatal: !0
      });
    return null;
  }
  _handleTransmuxerFlush(e) {
    const t = this.getCurrentContext(e);
    if (!t || this.state !== C.PARSING) {
      !this.fragCurrent && this.state !== C.STOPPED && this.state !== C.ERROR && (this.state = C.IDLE);
      return;
    }
    const {
      frag: s,
      part: i,
      level: r
    } = t, n = self.performance.now();
    s.stats.parsing.end = n, i && (i.stats.parsing.end = n), this.updateLevelTiming(s, i, r, e.partial);
  }
  getCurrentContext(e) {
    const {
      levels: t,
      fragCurrent: s
    } = this, {
      level: i,
      sn: r,
      part: n
    } = e;
    if (!(t != null && t[i]))
      return this.warn(`Levels object was unset while buffering fragment ${r} of level ${i}. The current chunk will not be buffered.`), null;
    const o = t[i], l = n > -1 ? ii(o, r, n) : null, c = l ? l.fragment : ha(o, r, s);
    return c ? (s && s !== c && (c.stats = s.stats), {
      frag: c,
      part: l,
      level: o
    }) : null;
  }
  bufferFragmentData(e, t, s, i, r) {
    var n;
    if (!e || this.state !== C.PARSING)
      return;
    const {
      data1: o,
      data2: l
    } = e;
    let c = o;
    if (o && l && (c = me(o, l)), !((n = c) != null && n.length))
      return;
    const h = {
      type: e.type,
      frag: t,
      part: s,
      chunkMeta: i,
      parent: t.type,
      data: c
    };
    if (this.hls.trigger(m.BUFFER_APPENDING, h), e.dropped && e.independent && !s) {
      if (r)
        return;
      this.flushBufferGap(t);
    }
  }
  flushBufferGap(e) {
    const t = this.media;
    if (!t)
      return;
    if (!Q.isBuffered(t, t.currentTime)) {
      this.flushMainBuffer(0, e.start);
      return;
    }
    const s = t.currentTime, i = Q.bufferInfo(t, s, 0), r = e.duration, n = Math.min(this.config.maxFragLookUpTolerance * 2, r * 0.25), o = Math.max(Math.min(e.start - n, i.end - n), s + n);
    e.start - o > n && this.flushMainBuffer(o, e.start);
  }
  getFwdBufferInfo(e, t) {
    const s = this.getLoadPosition();
    return O(s) ? this.getFwdBufferInfoAtPos(e, s, t) : null;
  }
  getFwdBufferInfoAtPos(e, t, s) {
    const {
      config: {
        maxBufferHole: i
      }
    } = this, r = Q.bufferInfo(e, t, i);
    if (r.len === 0 && r.nextStart !== void 0) {
      const n = this.fragmentTracker.getBufferedFrag(t, s);
      if (n && r.nextStart < n.end)
        return Q.bufferInfo(e, t, Math.max(r.nextStart, i));
    }
    return r;
  }
  getMaxBufferLength(e) {
    const {
      config: t
    } = this;
    let s;
    return e ? s = Math.max(8 * t.maxBufferSize / e, t.maxBufferLength) : s = t.maxBufferLength, Math.min(s, t.maxMaxBufferLength);
  }
  reduceMaxBufferLength(e) {
    const t = this.config, s = e || t.maxBufferLength;
    return t.maxMaxBufferLength >= s ? (t.maxMaxBufferLength /= 2, this.warn(`Reduce max buffer length to ${t.maxMaxBufferLength}s`), !0) : !1;
  }
  getAppendedFrag(e, t = N.MAIN) {
    const s = this.fragmentTracker.getAppendedFrag(e, N.MAIN);
    return s && "fragment" in s ? s.fragment : s;
  }
  getNextFragment(e, t) {
    const s = t.fragments, i = s.length;
    if (!i)
      return null;
    const {
      config: r
    } = this, n = s[0].start;
    let o;
    if (t.live) {
      const l = r.initialLiveManifestSize;
      if (i < l)
        return this.warn(`Not enough fragments to start playback (have: ${i}, need: ${l})`), null;
      (!t.PTSKnown && !this.startFragRequested && this.startPosition === -1 || e < n) && (o = this.getInitialLiveFragment(t, s), this.startPosition = this.nextLoadPosition = o ? this.hls.liveSyncPosition || o.start : e);
    } else
      e <= n && (o = s[0]);
    if (!o) {
      const l = r.lowLatencyMode ? t.partEnd : t.fragmentEnd;
      o = this.getFragmentAtPosition(e, l, t);
    }
    return this.mapToInitFragWhenRequired(o);
  }
  isLoopLoading(e, t) {
    const s = this.fragmentTracker.getState(e);
    return (s === oe.OK || s === oe.PARTIAL && !!e.gap) && this.nextLoadPosition > t;
  }
  getNextFragmentLoopLoading(e, t, s, i, r) {
    const n = e.gap, o = this.getNextFragment(this.nextLoadPosition, t);
    if (o === null)
      return o;
    if (e = o, n && e && !e.gap && s.nextStart) {
      const l = this.getFwdBufferInfoAtPos(this.mediaBuffer ? this.mediaBuffer : this.media, s.nextStart, i);
      if (l !== null && s.len + l.len >= r)
        return this.log(`buffer full after gaps in "${i}" playlist starting at sn: ${e.sn}`), null;
    }
    return e;
  }
  mapToInitFragWhenRequired(e) {
    return e != null && e.initSegment && !(e != null && e.initSegment.data) && !this.bitrateTest ? e.initSegment : e;
  }
  getNextPart(e, t, s) {
    let i = -1, r = !1, n = !0;
    for (let o = 0, l = e.length; o < l; o++) {
      const c = e[o];
      if (n = n && !c.independent, i > -1 && s < c.start)
        break;
      const h = c.loaded;
      h ? i = -1 : (r || c.independent || n) && c.fragment === t && (i = o), r = h;
    }
    return i;
  }
  loadedEndOfParts(e, t) {
    const s = e[e.length - 1];
    return s && t > s.start && s.loaded;
  }
  /*
   This method is used find the best matching first fragment for a live playlist. This fragment is used to calculate the
   "sliding" of the playlist, which is its offset from the start of playback. After sliding we can compute the real
   start and end times for each fragment in the playlist (after which this method will not need to be called).
  */
  getInitialLiveFragment(e, t) {
    const s = this.fragPrevious;
    let i = null;
    if (s) {
      if (e.hasProgramDateTime && (this.log(`Live playlist, switching playlist, load frag with same PDT: ${s.programDateTime}`), i = da(t, s.endProgramDateTime, this.config.maxFragLookUpTolerance)), !i) {
        const r = s.sn + 1;
        if (r >= e.startSN && r <= e.endSN) {
          const n = t[r - e.startSN];
          s.cc === n.cc && (i = n, this.log(`Live playlist, switching playlist, load frag with next SN: ${i.sn}`));
        }
        i || (i = ga(t, s.cc), i && this.log(`Live playlist, switching playlist, load frag with same CC: ${i.sn}`));
      }
    } else {
      const r = this.hls.liveSyncPosition;
      r !== null && (i = this.getFragmentAtPosition(r, this.bitrateTest ? e.fragmentEnd : e.edge, e));
    }
    return i;
  }
  /*
  This method finds the best matching fragment given the provided position.
   */
  getFragmentAtPosition(e, t, s) {
    const {
      config: i
    } = this;
    let {
      fragPrevious: r
    } = this, {
      fragments: n,
      endSN: o
    } = s;
    const {
      fragmentHint: l
    } = s, c = i.maxFragLookUpTolerance, h = s.partList, u = !!(i.lowLatencyMode && h != null && h.length && l);
    u && l && !this.bitrateTest && (n = n.concat(l), o = l.sn);
    let d;
    if (e < t) {
      const g = e > t - c ? 0 : c;
      d = Ct(r, n, e, g);
    } else
      d = n[n.length - 1];
    if (d) {
      const g = d.sn - s.startSN, f = this.fragmentTracker.getState(d);
      if ((f === oe.OK || f === oe.PARTIAL && d.gap) && (r = d), r && d.sn === r.sn && (!u || h[0].fragment.sn > d.sn) && r && d.level === r.level) {
        const T = n[g + 1];
        d.sn < o && this.fragmentTracker.getState(T) !== oe.OK ? d = T : d = null;
      }
    }
    return d;
  }
  synchronizeToLiveEdge(e) {
    const {
      config: t,
      media: s
    } = this;
    if (!s)
      return;
    const i = this.hls.liveSyncPosition, r = s.currentTime, n = e.fragments[0].start, o = e.edge, l = r >= n - t.maxFragLookUpTolerance && r <= o;
    if (i !== null && s.duration > i && (r < i || !l)) {
      const c = t.liveMaxLatencyDuration !== void 0 ? t.liveMaxLatencyDuration : t.liveMaxLatencyDurationCount * e.targetduration;
      (!l && s.readyState < 4 || r < o - c) && (this.loadedmetadata || (this.nextLoadPosition = i), s.readyState && (this.warn(`Playback: ${r.toFixed(3)} is located too far from the end of live sliding playlist: ${o}, reset currentTime to : ${i.toFixed(3)}`), s.currentTime = i));
    }
  }
  alignPlaylists(e, t, s) {
    const i = e.fragments.length;
    if (!i)
      return this.warn("No fragments in live playlist"), 0;
    const r = e.fragments[0].start, n = !t, o = e.alignedSliding && O(r);
    if (n || !o && !r) {
      const {
        fragPrevious: l
      } = this;
      Pa(l, s, e);
      const c = e.fragments[0].start;
      return this.log(`Live playlist sliding: ${c.toFixed(2)} start-sn: ${t ? t.startSN : "na"}->${e.startSN} prev-sn: ${l ? l.sn : "na"} fragments: ${i}`), c;
    }
    return r;
  }
  waitForCdnTuneIn(e) {
    return e.live && e.canBlockReload && e.partTarget && e.tuneInGoal > Math.max(e.partHoldBack, e.partTarget * 3);
  }
  setStartPosition(e, t) {
    let s = this.startPosition;
    if (s < t && (s = -1), s === -1 || this.lastCurrentTime === -1) {
      const i = this.startTimeOffset !== null, r = i ? this.startTimeOffset : e.startTimeOffset;
      r !== null && O(r) ? (s = t + r, r < 0 && (s += e.totalduration), s = Math.min(Math.max(t, s), t + e.totalduration), this.log(`Start time offset ${r} found in ${i ? "multivariant" : "media"} playlist, adjust startPosition to ${s}`), this.startPosition = s) : e.live ? s = this.hls.liveSyncPosition || t : this.startPosition = s = 0, this.lastCurrentTime = s;
    }
    this.nextLoadPosition = s;
  }
  getLoadPosition() {
    const {
      media: e
    } = this;
    let t = 0;
    return this.loadedmetadata && e ? t = e.currentTime : this.nextLoadPosition && (t = this.nextLoadPosition), t;
  }
  handleFragLoadAborted(e, t) {
    this.transmuxer && e.sn !== "initSegment" && e.stats.aborted && (this.warn(`Fragment ${e.sn}${t ? " part " + t.index : ""} of level ${e.level} was aborted`), this.resetFragmentLoading(e));
  }
  resetFragmentLoading(e) {
    (!this.fragCurrent || !this.fragContextChanged(e) && this.state !== C.FRAG_LOADING_WAITING_RETRY) && (this.state = C.IDLE);
  }
  onFragmentOrKeyLoadError(e, t) {
    if (t.chunkMeta && !t.frag) {
      const h = this.getCurrentContext(t.chunkMeta);
      h && (t.frag = h.frag);
    }
    const s = t.frag;
    if (!s || s.type !== e || !this.levels)
      return;
    if (this.fragContextChanged(s)) {
      var i;
      this.warn(`Frag load error must match current frag to retry ${s.url} > ${(i = this.fragCurrent) == null ? void 0 : i.url}`);
      return;
    }
    const r = t.details === L.FRAG_GAP;
    r && this.fragmentTracker.fragBuffered(s, !0);
    const n = t.errorAction, {
      action: o,
      retryCount: l = 0,
      retryConfig: c
    } = n || {};
    if (n && o === ae.RetryRequest && c) {
      this.resetStartWhenNotLoaded(this.levelLastLoaded);
      const h = Ss(c, l);
      this.warn(`Fragment ${s.sn} of ${e} ${s.level} errored with ${t.details}, retrying loading ${l + 1}/${c.maxNumRetry} in ${h}ms`), n.resolved = !0, this.retryDate = self.performance.now() + h, this.state = C.FRAG_LOADING_WAITING_RETRY;
    } else if (c && n)
      if (this.resetFragmentErrors(e), l < c.maxNumRetry)
        !r && o !== ae.RemoveAlternatePermanently && (n.resolved = !0);
      else {
        v.warn(`${t.details} reached or exceeded max retry (${l})`);
        return;
      }
    else
      (n == null ? void 0 : n.action) === ae.SendAlternateToPenaltyBox ? this.state = C.WAITING_LEVEL : this.state = C.ERROR;
    this.tickImmediate();
  }
  reduceLengthAndFlushBuffer(e) {
    if (this.state === C.PARSING || this.state === C.PARSED) {
      const t = e.parent, s = this.getFwdBufferInfo(this.mediaBuffer, t), i = s && s.len > 0.5;
      i && this.reduceMaxBufferLength(s.len);
      const r = !i;
      return r && this.warn(`Buffer full error while media.currentTime is not buffered, flush ${t} buffer`), e.frag && (this.fragmentTracker.removeFragment(e.frag), this.nextLoadPosition = e.frag.start), this.resetLoadingState(), r;
    }
    return !1;
  }
  resetFragmentErrors(e) {
    e === N.AUDIO && (this.fragCurrent = null), this.loadedmetadata || (this.startFragRequested = !1), this.state !== C.STOPPED && (this.state = C.IDLE);
  }
  afterBufferFlushed(e, t, s) {
    if (!e)
      return;
    const i = Q.getBuffered(e);
    this.fragmentTracker.detectEvictedFragments(t, i, s), this.state === C.ENDED && this.resetLoadingState();
  }
  resetLoadingState() {
    this.log("Reset loading state"), this.fragCurrent = null, this.fragPrevious = null, this.state = C.IDLE;
  }
  resetStartWhenNotLoaded(e) {
    if (!this.loadedmetadata) {
      this.startFragRequested = !1;
      const t = e ? e.details : null;
      t != null && t.live ? (this.startPosition = -1, this.setStartPosition(t, 0), this.resetLoadingState()) : this.nextLoadPosition = this.startPosition;
    }
  }
  resetWhenMissingContext(e) {
    this.warn(`The loading context changed while buffering fragment ${e.sn} of level ${e.level}. This chunk will not be buffered.`), this.removeUnbufferedFrags(), this.resetStartWhenNotLoaded(this.levelLastLoaded), this.resetLoadingState();
  }
  removeUnbufferedFrags(e = 0) {
    this.fragmentTracker.removeFragmentsInRange(e, 1 / 0, this.playlistType, !1, !0);
  }
  updateLevelTiming(e, t, s, i) {
    var r;
    const n = s.details;
    if (!n) {
      this.warn("level.details undefined");
      return;
    }
    if (!Object.keys(e.elementaryStreams).reduce((l, c) => {
      const h = e.elementaryStreams[c];
      if (h) {
        const u = h.endPTS - h.startPTS;
        if (u <= 0)
          return this.warn(`Could not parse fragment ${e.sn} ${c} duration reliably (${u})`), l || !1;
        const d = i ? 0 : ir(n, e, h.startPTS, h.endPTS, h.startDTS, h.endDTS);
        return this.hls.trigger(m.LEVEL_PTS_UPDATED, {
          details: n,
          level: s,
          drift: d,
          type: c,
          frag: e,
          start: h.startPTS,
          end: h.endPTS
        }), !0;
      }
      return l;
    }, !1) && ((r = this.transmuxer) == null ? void 0 : r.error) === null) {
      const l = new Error(`Found no media in fragment ${e.sn} of level ${e.level} resetting transmuxer to fallback to playlist timing`);
      if (s.fragmentError === 0 && (s.fragmentError++, e.gap = !0, this.fragmentTracker.removeFragment(e), this.fragmentTracker.fragBuffered(e, !0)), this.warn(l.message), this.hls.trigger(m.ERROR, {
        type: U.MEDIA_ERROR,
        details: L.FRAG_PARSING_ERROR,
        fatal: !1,
        error: l,
        frag: e,
        reason: `Found no media in msn ${e.sn} of level "${s.url}"`
      }), !this.hls)
        return;
      this.resetTransmuxer();
    }
    this.state = C.PARSED, this.hls.trigger(m.FRAG_PARSED, {
      frag: e,
      part: t
    });
  }
  resetTransmuxer() {
    this.transmuxer && (this.transmuxer.destroy(), this.transmuxer = null);
  }
  recoverWorkerError(e) {
    e.event === "demuxerWorker" && (this.fragmentTracker.removeAllFragments(), this.resetTransmuxer(), this.resetStartWhenNotLoaded(this.levelLastLoaded), this.resetLoadingState());
  }
  set state(e) {
    const t = this._state;
    t !== e && (this._state = e, this.log(`${t}->${e}`));
  }
  get state() {
    return this._state;
  }
}
class hr {
  constructor() {
    this.chunks = [], this.dataLength = 0;
  }
  push(e) {
    this.chunks.push(e), this.dataLength += e.length;
  }
  flush() {
    const {
      chunks: e,
      dataLength: t
    } = this;
    let s;
    if (e.length)
      e.length === 1 ? s = e[0] : s = Ka(e, t);
    else
      return new Uint8Array(0);
    return this.reset(), s;
  }
  reset() {
    this.chunks.length = 0, this.dataLength = 0;
  }
}
function Ka(a, e) {
  const t = new Uint8Array(e);
  let s = 0;
  for (let i = 0; i < a.length; i++) {
    const r = a[i];
    t.set(r, s), s += r.length;
  }
  return t;
}
function Va() {
  return typeof __HLS_WORKER_BUNDLE__ == "function";
}
function Ha() {
  const a = new self.Blob([`var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(${__HLS_WORKER_BUNDLE__.toString()})(true);`], {
    type: "text/javascript"
  }), e = self.URL.createObjectURL(a);
  return {
    worker: new self.Worker(e),
    objectURL: e
  };
}
function Wa(a) {
  const e = new self.URL(a, self.location.href).href;
  return {
    worker: new self.Worker(e),
    scriptURL: e
  };
}
function ve(a = "", e = 9e4) {
  return {
    type: a,
    id: -1,
    pid: -1,
    inputTimeScale: e,
    sequenceNumber: -1,
    samples: [],
    dropped: 0
  };
}
class Is {
  constructor() {
    this._audioTrack = void 0, this._id3Track = void 0, this.frameIndex = 0, this.cachedData = null, this.basePTS = null, this.initPTS = null, this.lastPTS = null;
  }
  resetInitSegment(e, t, s, i) {
    this._id3Track = {
      type: "id3",
      id: 3,
      pid: -1,
      inputTimeScale: 9e4,
      sequenceNumber: 0,
      samples: [],
      dropped: 0
    };
  }
  resetTimeStamp(e) {
    this.initPTS = e, this.resetContiguity();
  }
  resetContiguity() {
    this.basePTS = null, this.lastPTS = null, this.frameIndex = 0;
  }
  canParse(e, t) {
    return !1;
  }
  appendFrame(e, t, s) {
  }
  // feed incoming data to the front of the parsing pipeline
  demux(e, t) {
    this.cachedData && (e = me(this.cachedData, e), this.cachedData = null);
    let s = st(e, 0), i = s ? s.length : 0, r;
    const n = this._audioTrack, o = this._id3Track, l = s ? xs(s) : void 0, c = e.length;
    for ((this.basePTS === null || this.frameIndex === 0 && O(l)) && (this.basePTS = Ya(l, t, this.initPTS), this.lastPTS = this.basePTS), this.lastPTS === null && (this.lastPTS = this.basePTS), s && s.length > 0 && o.samples.push({
      pts: this.lastPTS,
      dts: this.lastPTS,
      data: s,
      type: ye.audioId3,
      duration: Number.POSITIVE_INFINITY
    }); i < c; ) {
      if (this.canParse(e, i)) {
        const h = this.appendFrame(n, e, i);
        h ? (this.frameIndex++, this.lastPTS = h.sample.pts, i += h.length, r = i) : i = c;
      } else
        mn(e, i) ? (s = st(e, i), o.samples.push({
          pts: this.lastPTS,
          dts: this.lastPTS,
          data: s,
          type: ye.audioId3,
          duration: Number.POSITIVE_INFINITY
        }), i += s.length, r = i) : i++;
      if (i === c && r !== c) {
        const h = Ne(e, r);
        this.cachedData ? this.cachedData = me(this.cachedData, h) : this.cachedData = h;
      }
    }
    return {
      audioTrack: n,
      videoTrack: ve(),
      id3Track: o,
      textTrack: ve()
    };
  }
  demuxSampleAes(e, t, s) {
    return Promise.reject(new Error(`[${this}] This demuxer does not support Sample-AES decryption`));
  }
  flush(e) {
    const t = this.cachedData;
    return t && (this.cachedData = null, this.demux(t, 0)), {
      audioTrack: this._audioTrack,
      videoTrack: ve(),
      id3Track: this._id3Track,
      textTrack: ve()
    };
  }
  destroy() {
  }
}
const Ya = (a, e, t) => {
  if (O(a))
    return a * 90;
  const s = t ? t.baseTime * 9e4 / t.timescale : 0;
  return e * 9e4 + s;
};
function qa(a, e, t, s) {
  let i, r, n, o;
  const l = navigator.userAgent.toLowerCase(), c = s, h = [96e3, 88200, 64e3, 48e3, 44100, 32e3, 24e3, 22050, 16e3, 12e3, 11025, 8e3, 7350];
  i = ((e[t + 2] & 192) >>> 6) + 1;
  const u = (e[t + 2] & 60) >>> 2;
  if (u > h.length - 1) {
    const d = new Error(`invalid ADTS sampling index:${u}`);
    a.emit(m.ERROR, m.ERROR, {
      type: U.MEDIA_ERROR,
      details: L.FRAG_PARSING_ERROR,
      fatal: !0,
      error: d,
      reason: d.message
    });
    return;
  }
  return n = (e[t + 2] & 1) << 2, n |= (e[t + 3] & 192) >>> 6, v.log(`manifest codec:${s}, ADTS type:${i}, samplingIndex:${u}`), /firefox/i.test(l) ? u >= 6 ? (i = 5, o = new Array(4), r = u - 3) : (i = 2, o = new Array(2), r = u) : l.indexOf("android") !== -1 ? (i = 2, o = new Array(2), r = u) : (i = 5, o = new Array(4), s && (s.indexOf("mp4a.40.29") !== -1 || s.indexOf("mp4a.40.5") !== -1) || !s && u >= 6 ? r = u - 3 : ((s && s.indexOf("mp4a.40.2") !== -1 && (u >= 6 && n === 1 || /vivaldi/i.test(l)) || !s && n === 1) && (i = 2, o = new Array(2)), r = u)), o[0] = i << 3, o[0] |= (u & 14) >> 1, o[1] |= (u & 1) << 7, o[1] |= n << 3, i === 5 && (o[1] |= (r & 14) >> 1, o[2] = (r & 1) << 7, o[2] |= 8, o[3] = 0), {
    config: o,
    samplerate: h[u],
    channelCount: n,
    codec: "mp4a.40." + i,
    manifestCodec: c
  };
}
function ur(a, e) {
  return a[e] === 255 && (a[e + 1] & 246) === 240;
}
function dr(a, e) {
  return a[e + 1] & 1 ? 7 : 9;
}
function bs(a, e) {
  return (a[e + 3] & 3) << 11 | a[e + 4] << 3 | (a[e + 5] & 224) >>> 5;
}
function ja(a, e) {
  return e + 5 < a.length;
}
function kt(a, e) {
  return e + 1 < a.length && ur(a, e);
}
function za(a, e) {
  return ja(a, e) && ur(a, e) && bs(a, e) <= a.length - e;
}
function Xa(a, e) {
  if (kt(a, e)) {
    const t = dr(a, e);
    if (e + t >= a.length)
      return !1;
    const s = bs(a, e);
    if (s <= t)
      return !1;
    const i = e + s;
    return i === a.length || kt(a, i);
  }
  return !1;
}
function fr(a, e, t, s, i) {
  if (!a.samplerate) {
    const r = qa(e, t, s, i);
    if (!r)
      return;
    a.config = r.config, a.samplerate = r.samplerate, a.channelCount = r.channelCount, a.codec = r.codec, a.manifestCodec = r.manifestCodec, v.log(`parsed codec:${a.codec}, rate:${r.samplerate}, channels:${r.channelCount}`);
  }
}
function gr(a) {
  return 1024 * 9e4 / a;
}
function Qa(a, e) {
  const t = dr(a, e);
  if (e + t <= a.length) {
    const s = bs(a, e) - t;
    if (s > 0)
      return {
        headerLength: t,
        frameLength: s
      };
  }
}
function mr(a, e, t, s, i) {
  const r = gr(a.samplerate), n = s + i * r, o = Qa(e, t);
  let l;
  if (o) {
    const {
      frameLength: u,
      headerLength: d
    } = o, g = d + u, f = Math.max(0, t + g - e.length);
    f ? (l = new Uint8Array(g - d), l.set(e.subarray(t + d, e.length), 0)) : l = e.subarray(t + d, t + g);
    const p = {
      unit: l,
      pts: n
    };
    return f || a.samples.push(p), {
      sample: p,
      length: g,
      missing: f
    };
  }
  const c = e.length - t;
  return l = new Uint8Array(c), l.set(e.subarray(t, e.length), 0), {
    sample: {
      unit: l,
      pts: n
    },
    length: c,
    missing: -1
  };
}
let ht = null;
const Ja = [32, 64, 96, 128, 160, 192, 224, 256, 288, 320, 352, 384, 416, 448, 32, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 384, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320, 32, 48, 56, 64, 80, 96, 112, 128, 144, 160, 176, 192, 224, 256, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160], Za = [44100, 48e3, 32e3, 22050, 24e3, 16e3, 11025, 12e3, 8e3], eo = [
  // MPEG 2.5
  [
    0,
    // Reserved
    72,
    // Layer3
    144,
    // Layer2
    12
    // Layer1
  ],
  // Reserved
  [
    0,
    // Reserved
    0,
    // Layer3
    0,
    // Layer2
    0
    // Layer1
  ],
  // MPEG 2
  [
    0,
    // Reserved
    72,
    // Layer3
    144,
    // Layer2
    12
    // Layer1
  ],
  // MPEG 1
  [
    0,
    // Reserved
    144,
    // Layer3
    144,
    // Layer2
    12
    // Layer1
  ]
], to = [
  0,
  // Reserved
  1,
  // Layer3
  1,
  // Layer2
  4
  // Layer1
];
function pr(a, e, t, s, i) {
  if (t + 24 > e.length)
    return;
  const r = Tr(e, t);
  if (r && t + r.frameLength <= e.length) {
    const n = r.samplesPerFrame * 9e4 / r.sampleRate, o = s + i * n, l = {
      unit: e.subarray(t, t + r.frameLength),
      pts: o,
      dts: o
    };
    return a.config = [], a.channelCount = r.channelCount, a.samplerate = r.sampleRate, a.samples.push(l), {
      sample: l,
      length: r.frameLength,
      missing: 0
    };
  }
}
function Tr(a, e) {
  const t = a[e + 1] >> 3 & 3, s = a[e + 1] >> 1 & 3, i = a[e + 2] >> 4 & 15, r = a[e + 2] >> 2 & 3;
  if (t !== 1 && i !== 0 && i !== 15 && r !== 3) {
    const n = a[e + 2] >> 1 & 1, o = a[e + 3] >> 6, l = t === 3 ? 3 - s : s === 3 ? 3 : 4, c = Ja[l * 14 + i - 1] * 1e3, u = Za[(t === 3 ? 0 : t === 2 ? 1 : 2) * 3 + r], d = o === 3 ? 1 : 2, g = eo[t][s], f = to[s], p = g * 8 * f, T = Math.floor(g * c / u + n) * f;
    if (ht === null) {
      const x = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
      ht = x ? parseInt(x[1]) : 0;
    }
    return !!ht && ht <= 87 && s === 2 && c >= 224e3 && o === 0 && (a[e + 3] = a[e + 3] | 128), {
      sampleRate: u,
      channelCount: d,
      frameLength: T,
      samplesPerFrame: p
    };
  }
}
function Ds(a, e) {
  return a[e] === 255 && (a[e + 1] & 224) === 224 && (a[e + 1] & 6) !== 0;
}
function Er(a, e) {
  return e + 1 < a.length && Ds(a, e);
}
function so(a, e) {
  return Ds(a, e) && 4 <= a.length - e;
}
function yr(a, e) {
  if (e + 1 < a.length && Ds(a, e)) {
    const s = Tr(a, e);
    let i = 4;
    s != null && s.frameLength && (i = s.frameLength);
    const r = e + i;
    return r === a.length || Er(a, r);
  }
  return !1;
}
class io extends Is {
  constructor(e, t) {
    super(), this.observer = void 0, this.config = void 0, this.observer = e, this.config = t;
  }
  resetInitSegment(e, t, s, i) {
    super.resetInitSegment(e, t, s, i), this._audioTrack = {
      container: "audio/adts",
      type: "audio",
      id: 2,
      pid: -1,
      sequenceNumber: 0,
      segmentCodec: "aac",
      samples: [],
      manifestCodec: t,
      duration: i,
      inputTimeScale: 9e4,
      dropped: 0
    };
  }
  // Source for probe info - https://wiki.multimedia.cx/index.php?title=ADTS
  static probe(e) {
    if (!e)
      return !1;
    const t = st(e, 0);
    let s = (t == null ? void 0 : t.length) || 0;
    if (yr(e, s))
      return !1;
    for (let i = e.length; s < i; s++)
      if (Xa(e, s))
        return v.log("ADTS sync word found !"), !0;
    return !1;
  }
  canParse(e, t) {
    return za(e, t);
  }
  appendFrame(e, t, s) {
    fr(e, this.observer, t, s, e.manifestCodec);
    const i = mr(e, t, s, this.basePTS, this.frameIndex);
    if (i && i.missing === 0)
      return i;
  }
}
const ro = /\/emsg[-/]ID3/i;
class no {
  constructor(e, t) {
    this.remainderData = null, this.timeOffset = 0, this.config = void 0, this.videoTrack = void 0, this.audioTrack = void 0, this.id3Track = void 0, this.txtTrack = void 0, this.config = t;
  }
  resetTimeStamp() {
  }
  resetInitSegment(e, t, s, i) {
    const r = this.videoTrack = ve("video", 1), n = this.audioTrack = ve("audio", 1), o = this.txtTrack = ve("text", 1);
    if (this.id3Track = ve("id3", 1), this.timeOffset = 0, !(e != null && e.byteLength))
      return;
    const l = zi(e);
    if (l.video) {
      const {
        id: c,
        timescale: h,
        codec: u
      } = l.video;
      r.id = c, r.timescale = o.timescale = h, r.codec = u;
    }
    if (l.audio) {
      const {
        id: c,
        timescale: h,
        codec: u
      } = l.audio;
      n.id = c, n.timescale = h, n.codec = u;
    }
    o.id = Yi.text, r.sampleDuration = 0, r.duration = n.duration = i;
  }
  resetContiguity() {
    this.remainderData = null;
  }
  static probe(e) {
    return Ln(e);
  }
  demux(e, t) {
    this.timeOffset = t;
    let s = e;
    const i = this.videoTrack, r = this.txtTrack;
    if (this.config.progressive) {
      this.remainderData && (s = me(this.remainderData, e));
      const o = _n(s);
      this.remainderData = o.remainder, i.samples = o.valid || new Uint8Array();
    } else
      i.samples = s;
    const n = this.extractID3Track(i, t);
    return r.samples = Bs(t, i), {
      videoTrack: i,
      audioTrack: this.audioTrack,
      id3Track: n,
      textTrack: this.txtTrack
    };
  }
  flush() {
    const e = this.timeOffset, t = this.videoTrack, s = this.txtTrack;
    t.samples = this.remainderData || new Uint8Array(), this.remainderData = null;
    const i = this.extractID3Track(t, this.timeOffset);
    return s.samples = Bs(e, t), {
      videoTrack: t,
      audioTrack: ve(),
      id3Track: i,
      textTrack: ve()
    };
  }
  extractID3Track(e, t) {
    const s = this.id3Track;
    if (e.samples.length) {
      const i = V(e.samples, ["emsg"]);
      i && i.forEach((r) => {
        const n = On(r);
        if (ro.test(n.schemeIdUri)) {
          const o = O(n.presentationTime) ? n.presentationTime / n.timeScale : t + n.presentationTimeDelta / n.timeScale;
          let l = n.eventDuration === 4294967295 ? Number.POSITIVE_INFINITY : n.eventDuration / n.timeScale;
          l <= 1e-3 && (l = Number.POSITIVE_INFINITY);
          const c = n.payload;
          s.samples.push({
            data: c,
            len: c.byteLength,
            dts: o,
            pts: o,
            type: ye.emsg,
            duration: l
          });
        }
      });
    }
    return s;
  }
  demuxSampleAes(e, t, s) {
    return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"));
  }
  destroy() {
  }
}
const xr = (a, e) => {
  let t = 0, s = 5;
  e += s;
  const i = new Uint32Array(1), r = new Uint32Array(1), n = new Uint8Array(1);
  for (; s > 0; ) {
    n[0] = a[e];
    const o = Math.min(s, 8), l = 8 - o;
    r[0] = 4278190080 >>> 24 + l << l, i[0] = (n[0] & r[0]) >> l, t = t ? t << o | i[0] : i[0], e += 1, s -= o;
  }
  return t;
};
class ao extends Is {
  constructor(e) {
    super(), this.observer = void 0, this.observer = e;
  }
  resetInitSegment(e, t, s, i) {
    super.resetInitSegment(e, t, s, i), this._audioTrack = {
      container: "audio/ac-3",
      type: "audio",
      id: 2,
      pid: -1,
      sequenceNumber: 0,
      segmentCodec: "ac3",
      samples: [],
      manifestCodec: t,
      duration: i,
      inputTimeScale: 9e4,
      dropped: 0
    };
  }
  canParse(e, t) {
    return t + 64 < e.length;
  }
  appendFrame(e, t, s) {
    const i = Sr(e, t, s, this.basePTS, this.frameIndex);
    if (i !== -1)
      return {
        sample: e.samples[e.samples.length - 1],
        length: i,
        missing: 0
      };
  }
  static probe(e) {
    if (!e)
      return !1;
    const t = st(e, 0);
    if (!t)
      return !1;
    const s = t.length;
    return e[s] === 11 && e[s + 1] === 119 && xs(t) !== void 0 && // check the bsid to confirm ac-3
    xr(e, s) < 16;
  }
}
function Sr(a, e, t, s, i) {
  if (t + 8 > e.length || e[t] !== 11 || e[t + 1] !== 119)
    return -1;
  const r = e[t + 4] >> 6;
  if (r >= 3)
    return -1;
  const o = [48e3, 44100, 32e3][r], l = e[t + 4] & 63, h = [64, 69, 96, 64, 70, 96, 80, 87, 120, 80, 88, 120, 96, 104, 144, 96, 105, 144, 112, 121, 168, 112, 122, 168, 128, 139, 192, 128, 140, 192, 160, 174, 240, 160, 175, 240, 192, 208, 288, 192, 209, 288, 224, 243, 336, 224, 244, 336, 256, 278, 384, 256, 279, 384, 320, 348, 480, 320, 349, 480, 384, 417, 576, 384, 418, 576, 448, 487, 672, 448, 488, 672, 512, 557, 768, 512, 558, 768, 640, 696, 960, 640, 697, 960, 768, 835, 1152, 768, 836, 1152, 896, 975, 1344, 896, 976, 1344, 1024, 1114, 1536, 1024, 1115, 1536, 1152, 1253, 1728, 1152, 1254, 1728, 1280, 1393, 1920, 1280, 1394, 1920][l * 3 + r] * 2;
  if (t + h > e.length)
    return -1;
  const u = e[t + 6] >> 5;
  let d = 0;
  u === 2 ? d += 2 : (u & 1 && u !== 1 && (d += 2), u & 4 && (d += 2));
  const g = (e[t + 6] << 8 | e[t + 7]) >> 12 - d & 1, p = [2, 1, 2, 3, 3, 4, 4, 5][u] + g, T = e[t + 5] >> 3, E = e[t + 5] & 7, y = new Uint8Array([r << 6 | T << 1 | E >> 2, (E & 3) << 6 | u << 3 | g << 2 | l >> 4, l << 4 & 224]), x = 1536 / o * 9e4, I = s + i * x, S = e.subarray(t, t + h);
  return a.config = y, a.channelCount = p, a.samplerate = o, a.samples.push({
    unit: S,
    pts: I
  }), h;
}
class oo {
  constructor() {
    this.VideoSample = null;
  }
  createVideoSample(e, t, s, i) {
    return {
      key: e,
      frame: !1,
      pts: t,
      dts: s,
      units: [],
      debug: i,
      length: 0
    };
  }
  getLastNalUnit(e) {
    var t;
    let s = this.VideoSample, i;
    if ((!s || s.units.length === 0) && (s = e[e.length - 1]), (t = s) != null && t.units) {
      const r = s.units;
      i = r[r.length - 1];
    }
    return i;
  }
  pushAccessUnit(e, t) {
    if (e.units.length && e.frame) {
      if (e.pts === void 0) {
        const s = t.samples, i = s.length;
        if (i) {
          const r = s[i - 1];
          e.pts = r.pts, e.dts = r.dts;
        } else {
          t.dropped++;
          return;
        }
      }
      t.samples.push(e);
    }
    e.debug.length && v.log(e.pts + "/" + e.dts + ":" + e.debug);
  }
}
class di {
  constructor(e) {
    this.data = void 0, this.bytesAvailable = void 0, this.word = void 0, this.bitsAvailable = void 0, this.data = e, this.bytesAvailable = e.byteLength, this.word = 0, this.bitsAvailable = 0;
  }
  // ():void
  loadWord() {
    const e = this.data, t = this.bytesAvailable, s = e.byteLength - t, i = new Uint8Array(4), r = Math.min(4, t);
    if (r === 0)
      throw new Error("no bytes available");
    i.set(e.subarray(s, s + r)), this.word = new DataView(i.buffer).getUint32(0), this.bitsAvailable = r * 8, this.bytesAvailable -= r;
  }
  // (count:int):void
  skipBits(e) {
    let t;
    e = Math.min(e, this.bytesAvailable * 8 + this.bitsAvailable), this.bitsAvailable > e ? (this.word <<= e, this.bitsAvailable -= e) : (e -= this.bitsAvailable, t = e >> 3, e -= t << 3, this.bytesAvailable -= t, this.loadWord(), this.word <<= e, this.bitsAvailable -= e);
  }
  // (size:int):uint
  readBits(e) {
    let t = Math.min(this.bitsAvailable, e);
    const s = this.word >>> 32 - t;
    if (e > 32 && v.error("Cannot read more than 32 bits at a time"), this.bitsAvailable -= t, this.bitsAvailable > 0)
      this.word <<= t;
    else if (this.bytesAvailable > 0)
      this.loadWord();
    else
      throw new Error("no bits available");
    return t = e - t, t > 0 && this.bitsAvailable ? s << t | this.readBits(t) : s;
  }
  // ():uint
  skipLZ() {
    let e;
    for (e = 0; e < this.bitsAvailable; ++e)
      if (this.word & 2147483648 >>> e)
        return this.word <<= e, this.bitsAvailable -= e, e;
    return this.loadWord(), e + this.skipLZ();
  }
  // ():void
  skipUEG() {
    this.skipBits(1 + this.skipLZ());
  }
  // ():void
  skipEG() {
    this.skipBits(1 + this.skipLZ());
  }
  // ():uint
  readUEG() {
    const e = this.skipLZ();
    return this.readBits(e + 1) - 1;
  }
  // ():int
  readEG() {
    const e = this.readUEG();
    return 1 & e ? 1 + e >>> 1 : -1 * (e >>> 1);
  }
  // Some convenience functions
  // :Boolean
  readBoolean() {
    return this.readBits(1) === 1;
  }
  // ():int
  readUByte() {
    return this.readBits(8);
  }
  // ():int
  readUShort() {
    return this.readBits(16);
  }
  // ():int
  readUInt() {
    return this.readBits(32);
  }
  /**
   * Advance the ExpGolomb decoder past a scaling list. The scaling
   * list is optionally transmitted as part of a sequence parameter
   * set and is not relevant to transmuxing.
   * @param count the number of entries in this scaling list
   * @see Recommendation ITU-T H.264, Section 7.3.2.1.1.1
   */
  skipScalingList(e) {
    let t = 8, s = 8, i;
    for (let r = 0; r < e; r++)
      s !== 0 && (i = this.readEG(), s = (t + i + 256) % 256), t = s === 0 ? t : s;
  }
  /**
   * Read a sequence parameter set and return some interesting video
   * properties. A sequence parameter set is the H264 metadata that
   * describes the properties of upcoming video frames.
   * @returns an object with configuration parsed from the
   * sequence parameter set, including the dimensions of the
   * associated video frames.
   */
  readSPS() {
    let e = 0, t = 0, s = 0, i = 0, r, n, o;
    const l = this.readUByte.bind(this), c = this.readBits.bind(this), h = this.readUEG.bind(this), u = this.readBoolean.bind(this), d = this.skipBits.bind(this), g = this.skipEG.bind(this), f = this.skipUEG.bind(this), p = this.skipScalingList.bind(this);
    l();
    const T = l();
    if (c(5), d(3), l(), f(), T === 100 || T === 110 || T === 122 || T === 244 || T === 44 || T === 83 || T === 86 || T === 118 || T === 128) {
      const D = h();
      if (D === 3 && d(1), f(), f(), d(1), u())
        for (n = D !== 3 ? 8 : 12, o = 0; o < n; o++)
          u() && (o < 6 ? p(16) : p(64));
    }
    f();
    const E = h();
    if (E === 0)
      h();
    else if (E === 1)
      for (d(1), g(), g(), r = h(), o = 0; o < r; o++)
        g();
    f(), d(1);
    const y = h(), x = h(), I = c(1);
    I === 0 && d(1), d(1), u() && (e = h(), t = h(), s = h(), i = h());
    let S = [1, 1];
    if (u() && u())
      switch (l()) {
        case 1:
          S = [1, 1];
          break;
        case 2:
          S = [12, 11];
          break;
        case 3:
          S = [10, 11];
          break;
        case 4:
          S = [16, 11];
          break;
        case 5:
          S = [40, 33];
          break;
        case 6:
          S = [24, 11];
          break;
        case 7:
          S = [20, 11];
          break;
        case 8:
          S = [32, 11];
          break;
        case 9:
          S = [80, 33];
          break;
        case 10:
          S = [18, 11];
          break;
        case 11:
          S = [15, 11];
          break;
        case 12:
          S = [64, 33];
          break;
        case 13:
          S = [160, 99];
          break;
        case 14:
          S = [4, 3];
          break;
        case 15:
          S = [3, 2];
          break;
        case 16:
          S = [2, 1];
          break;
        case 255: {
          S = [l() << 8 | l(), l() << 8 | l()];
          break;
        }
      }
    return {
      width: Math.ceil((y + 1) * 16 - e * 2 - t * 2),
      height: (2 - I) * (x + 1) * 16 - (I ? 2 : 4) * (s + i),
      pixelRatio: S
    };
  }
  readSliceType() {
    return this.readUByte(), this.readUEG(), this.readUEG();
  }
}
class lo extends oo {
  parseAVCPES(e, t, s, i, r) {
    const n = this.parseAVCNALu(e, s.data);
    let o = this.VideoSample, l, c = !1;
    s.data = null, o && n.length && !e.audFound && (this.pushAccessUnit(o, e), o = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts, "")), n.forEach((h) => {
      var u;
      switch (h.type) {
        case 1: {
          let p = !1;
          l = !0;
          const T = h.data;
          if (c && T.length > 4) {
            const E = new di(T).readSliceType();
            (E === 2 || E === 4 || E === 7 || E === 9) && (p = !0);
          }
          if (p) {
            var d;
            (d = o) != null && d.frame && !o.key && (this.pushAccessUnit(o, e), o = this.VideoSample = null);
          }
          o || (o = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts, "")), o.frame = !0, o.key = p;
          break;
        }
        case 5:
          l = !0, (u = o) != null && u.frame && !o.key && (this.pushAccessUnit(o, e), o = this.VideoSample = null), o || (o = this.VideoSample = this.createVideoSample(!0, s.pts, s.dts, "")), o.key = !0, o.frame = !0;
          break;
        case 6: {
          l = !0, Qi(h.data, 1, s.pts, t.samples);
          break;
        }
        case 7: {
          var g, f;
          l = !0, c = !0;
          const p = h.data, E = new di(p).readSPS();
          if (!e.sps || e.width !== E.width || e.height !== E.height || ((g = e.pixelRatio) == null ? void 0 : g[0]) !== E.pixelRatio[0] || ((f = e.pixelRatio) == null ? void 0 : f[1]) !== E.pixelRatio[1]) {
            e.width = E.width, e.height = E.height, e.pixelRatio = E.pixelRatio, e.sps = [p], e.duration = r;
            const y = p.subarray(1, 4);
            let x = "avc1.";
            for (let I = 0; I < 3; I++) {
              let S = y[I].toString(16);
              S.length < 2 && (S = "0" + S), x += S;
            }
            e.codec = x;
          }
          break;
        }
        case 8:
          l = !0, e.pps = [h.data];
          break;
        case 9:
          l = !0, e.audFound = !0, o && this.pushAccessUnit(o, e), o = this.VideoSample = this.createVideoSample(!1, s.pts, s.dts, "");
          break;
        case 12:
          l = !0;
          break;
        default:
          l = !1, o && (o.debug += "unknown NAL " + h.type + " ");
          break;
      }
      o && l && o.units.push(h);
    }), i && o && (this.pushAccessUnit(o, e), this.VideoSample = null);
  }
  parseAVCNALu(e, t) {
    const s = t.byteLength;
    let i = e.naluState || 0;
    const r = i, n = [];
    let o = 0, l, c, h, u = -1, d = 0;
    for (i === -1 && (u = 0, d = t[0] & 31, i = 0, o = 1); o < s; ) {
      if (l = t[o++], !i) {
        i = l ? 0 : 1;
        continue;
      }
      if (i === 1) {
        i = l ? 0 : 2;
        continue;
      }
      if (!l)
        i = 3;
      else if (l === 1) {
        if (c = o - i - 1, u >= 0) {
          const g = {
            data: t.subarray(u, c),
            type: d
          };
          n.push(g);
        } else {
          const g = this.getLastNalUnit(e.samples);
          g && (r && o <= 4 - r && g.state && (g.data = g.data.subarray(0, g.data.byteLength - r)), c > 0 && (g.data = me(g.data, t.subarray(0, c)), g.state = 0));
        }
        o < s ? (h = t[o] & 31, u = o, d = h, i = 0) : i = -1;
      } else
        i = 0;
    }
    if (u >= 0 && i >= 0) {
      const g = {
        data: t.subarray(u, s),
        type: d,
        state: i
      };
      n.push(g);
    }
    if (n.length === 0) {
      const g = this.getLastNalUnit(e.samples);
      g && (g.data = me(g.data, t));
    }
    return e.naluState = i, n;
  }
}
class co {
  constructor(e, t, s) {
    this.keyData = void 0, this.decrypter = void 0, this.keyData = s, this.decrypter = new Ls(t, {
      removePKCS7Padding: !1
    });
  }
  decryptBuffer(e) {
    return this.decrypter.decrypt(e, this.keyData.key.buffer, this.keyData.iv.buffer);
  }
  // AAC - encrypt all full 16 bytes blocks starting from offset 16
  decryptAacSample(e, t, s) {
    const i = e[t].unit;
    if (i.length <= 16)
      return;
    const r = i.subarray(16, i.length - i.length % 16), n = r.buffer.slice(r.byteOffset, r.byteOffset + r.length);
    this.decryptBuffer(n).then((o) => {
      const l = new Uint8Array(o);
      i.set(l, 16), this.decrypter.isSync() || this.decryptAacSamples(e, t + 1, s);
    });
  }
  decryptAacSamples(e, t, s) {
    for (; ; t++) {
      if (t >= e.length) {
        s();
        return;
      }
      if (!(e[t].unit.length < 32) && (this.decryptAacSample(e, t, s), !this.decrypter.isSync()))
        return;
    }
  }
  // AVC - encrypt one 16 bytes block out of ten, starting from offset 32
  getAvcEncryptedData(e) {
    const t = Math.floor((e.length - 48) / 160) * 16 + 16, s = new Int8Array(t);
    let i = 0;
    for (let r = 32; r < e.length - 16; r += 160, i += 16)
      s.set(e.subarray(r, r + 16), i);
    return s;
  }
  getAvcDecryptedUnit(e, t) {
    const s = new Uint8Array(t);
    let i = 0;
    for (let r = 32; r < e.length - 16; r += 160, i += 16)
      e.set(s.subarray(i, i + 16), r);
    return e;
  }
  decryptAvcSample(e, t, s, i, r) {
    const n = Ji(r.data), o = this.getAvcEncryptedData(n);
    this.decryptBuffer(o.buffer).then((l) => {
      r.data = this.getAvcDecryptedUnit(n, l), this.decrypter.isSync() || this.decryptAvcSamples(e, t, s + 1, i);
    });
  }
  decryptAvcSamples(e, t, s, i) {
    if (e instanceof Uint8Array)
      throw new Error("Cannot decrypt samples of type Uint8Array");
    for (; ; t++, s = 0) {
      if (t >= e.length) {
        i();
        return;
      }
      const r = e[t].units;
      for (; !(s >= r.length); s++) {
        const n = r[s];
        if (!(n.data.length <= 48 || n.type !== 1 && n.type !== 5) && (this.decryptAvcSample(e, t, s, i, n), !this.decrypter.isSync()))
          return;
      }
    }
  }
}
const ne = 188;
class Pe {
  constructor(e, t, s) {
    this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.sampleAes = null, this.pmtParsed = !1, this.audioCodec = void 0, this.videoCodec = void 0, this._duration = 0, this._pmtId = -1, this._videoTrack = void 0, this._audioTrack = void 0, this._id3Track = void 0, this._txtTrack = void 0, this.aacOverFlow = null, this.remainderData = null, this.videoParser = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.videoParser = new lo();
  }
  static probe(e) {
    const t = Pe.syncOffset(e);
    return t > 0 && v.warn(`MPEG2-TS detected but first sync word found @ offset ${t}`), t !== -1;
  }
  static syncOffset(e) {
    const t = e.length;
    let s = Math.min(ne * 5, t - ne) + 1, i = 0;
    for (; i < s; ) {
      let r = !1, n = -1, o = 0;
      for (let l = i; l < t; l += ne)
        if (e[l] === 71 && (t - l === ne || e[l + ne] === 71)) {
          if (o++, n === -1 && (n = l, n !== 0 && (s = Math.min(n + ne * 99, e.length - ne) + 1)), r || (r = hs(e, l) === 0), r && o > 1 && (n === 0 && o > 2 || l + ne > s))
            return n;
        } else {
          if (o)
            return -1;
          break;
        }
      i++;
    }
    return -1;
  }
  /**
   * Creates a track model internal to demuxer used to drive remuxing input
   */
  static createTrack(e, t) {
    return {
      container: e === "video" || e === "audio" ? "video/mp2t" : void 0,
      type: e,
      id: Yi[e],
      pid: -1,
      inputTimeScale: 9e4,
      sequenceNumber: 0,
      samples: [],
      dropped: 0,
      duration: e === "audio" ? t : void 0
    };
  }
  /**
   * Initializes a new init segment on the demuxer/remuxer interface. Needed for discontinuities/track-switches (or at stream start)
   * Resets all internal track instances of the demuxer.
   */
  resetInitSegment(e, t, s, i) {
    this.pmtParsed = !1, this._pmtId = -1, this._videoTrack = Pe.createTrack("video"), this._audioTrack = Pe.createTrack("audio", i), this._id3Track = Pe.createTrack("id3"), this._txtTrack = Pe.createTrack("text"), this._audioTrack.segmentCodec = "aac", this.aacOverFlow = null, this.remainderData = null, this.audioCodec = t, this.videoCodec = s, this._duration = i;
  }
  resetTimeStamp() {
  }
  resetContiguity() {
    const {
      _audioTrack: e,
      _videoTrack: t,
      _id3Track: s
    } = this;
    e && (e.pesData = null), t && (t.pesData = null), s && (s.pesData = null), this.aacOverFlow = null, this.remainderData = null;
  }
  demux(e, t, s = !1, i = !1) {
    s || (this.sampleAes = null);
    let r;
    const n = this._videoTrack, o = this._audioTrack, l = this._id3Track, c = this._txtTrack;
    let h = n.pid, u = n.pesData, d = o.pid, g = l.pid, f = o.pesData, p = l.pesData, T = null, E = this.pmtParsed, y = this._pmtId, x = e.length;
    if (this.remainderData && (e = me(this.remainderData, e), x = e.length, this.remainderData = null), x < ne && !i)
      return this.remainderData = e, {
        audioTrack: o,
        videoTrack: n,
        id3Track: l,
        textTrack: c
      };
    const I = Math.max(0, Pe.syncOffset(e));
    x -= (x - I) % ne, x < e.byteLength && !i && (this.remainderData = new Uint8Array(e.buffer, x, e.buffer.byteLength - x));
    let S = 0;
    for (let R = I; R < x; R += ne)
      if (e[R] === 71) {
        const w = !!(e[R + 1] & 64), _ = hs(e, R), b = (e[R + 3] & 48) >> 4;
        let k;
        if (b > 1) {
          if (k = R + 5 + e[R + 4], k === R + ne)
            continue;
        } else
          k = R + 4;
        switch (_) {
          case h:
            w && (u && (r = Ge(u)) && this.videoParser.parseAVCPES(n, c, r, !1, this._duration), u = {
              data: [],
              size: 0
            }), u && (u.data.push(e.subarray(k, R + ne)), u.size += R + ne - k);
            break;
          case d:
            if (w) {
              if (f && (r = Ge(f)))
                switch (o.segmentCodec) {
                  case "aac":
                    this.parseAACPES(o, r);
                    break;
                  case "mp3":
                    this.parseMPEGPES(o, r);
                    break;
                  case "ac3":
                    this.parseAC3PES(o, r);
                    break;
                }
              f = {
                data: [],
                size: 0
              };
            }
            f && (f.data.push(e.subarray(k, R + ne)), f.size += R + ne - k);
            break;
          case g:
            w && (p && (r = Ge(p)) && this.parseID3PES(l, r), p = {
              data: [],
              size: 0
            }), p && (p.data.push(e.subarray(k, R + ne)), p.size += R + ne - k);
            break;
          case 0:
            w && (k += e[k] + 1), y = this._pmtId = ho(e, k);
            break;
          case y: {
            w && (k += e[k] + 1);
            const K = uo(e, k, this.typeSupported, s);
            h = K.videoPid, h > 0 && (n.pid = h, n.segmentCodec = K.segmentVideoCodec), d = K.audioPid, d > 0 && (o.pid = d, o.segmentCodec = K.segmentAudioCodec), g = K.id3Pid, g > 0 && (l.pid = g), T !== null && !E && (v.warn(`MPEG-TS PMT found at ${R} after unknown PID '${T}'. Backtracking to sync byte @${I} to parse all TS packets.`), T = null, R = I - 188), E = this.pmtParsed = !0;
            break;
          }
          case 17:
          case 8191:
            break;
          default:
            T = _;
            break;
        }
      } else
        S++;
    if (S > 0) {
      const R = new Error(`Found ${S} TS packet/s that do not start with 0x47`);
      this.observer.emit(m.ERROR, m.ERROR, {
        type: U.MEDIA_ERROR,
        details: L.FRAG_PARSING_ERROR,
        fatal: !1,
        error: R,
        reason: R.message
      });
    }
    n.pesData = u, o.pesData = f, l.pesData = p;
    const D = {
      audioTrack: o,
      videoTrack: n,
      id3Track: l,
      textTrack: c
    };
    return i && this.extractRemainingSamples(D), D;
  }
  flush() {
    const {
      remainderData: e
    } = this;
    this.remainderData = null;
    let t;
    return e ? t = this.demux(e, -1, !1, !0) : t = {
      videoTrack: this._videoTrack,
      audioTrack: this._audioTrack,
      id3Track: this._id3Track,
      textTrack: this._txtTrack
    }, this.extractRemainingSamples(t), this.sampleAes ? this.decrypt(t, this.sampleAes) : t;
  }
  extractRemainingSamples(e) {
    const {
      audioTrack: t,
      videoTrack: s,
      id3Track: i,
      textTrack: r
    } = e, n = s.pesData, o = t.pesData, l = i.pesData;
    let c;
    if (n && (c = Ge(n)) ? (this.videoParser.parseAVCPES(s, r, c, !0, this._duration), s.pesData = null) : s.pesData = n, o && (c = Ge(o))) {
      switch (t.segmentCodec) {
        case "aac":
          this.parseAACPES(t, c);
          break;
        case "mp3":
          this.parseMPEGPES(t, c);
          break;
        case "ac3":
          this.parseAC3PES(t, c);
          break;
      }
      t.pesData = null;
    } else
      o != null && o.size && v.log("last AAC PES packet truncated,might overlap between fragments"), t.pesData = o;
    l && (c = Ge(l)) ? (this.parseID3PES(i, c), i.pesData = null) : i.pesData = l;
  }
  demuxSampleAes(e, t, s) {
    const i = this.demux(e, s, !0, !this.config.progressive), r = this.sampleAes = new co(this.observer, this.config, t);
    return this.decrypt(i, r);
  }
  decrypt(e, t) {
    return new Promise((s) => {
      const {
        audioTrack: i,
        videoTrack: r
      } = e;
      i.samples && i.segmentCodec === "aac" ? t.decryptAacSamples(i.samples, 0, () => {
        r.samples ? t.decryptAvcSamples(r.samples, 0, 0, () => {
          s(e);
        }) : s(e);
      }) : r.samples && t.decryptAvcSamples(r.samples, 0, 0, () => {
        s(e);
      });
    });
  }
  destroy() {
    this._duration = 0;
  }
  parseAACPES(e, t) {
    let s = 0;
    const i = this.aacOverFlow;
    let r = t.data;
    if (i) {
      this.aacOverFlow = null;
      const u = i.missing, d = i.sample.unit.byteLength;
      if (u === -1)
        r = me(i.sample.unit, r);
      else {
        const g = d - u;
        i.sample.unit.set(r.subarray(0, u), g), e.samples.push(i.sample), s = i.missing;
      }
    }
    let n, o;
    for (n = s, o = r.length; n < o - 1 && !kt(r, n); n++)
      ;
    if (n !== s) {
      let u;
      const d = n < o - 1;
      d ? u = `AAC PES did not start with ADTS header,offset:${n}` : u = "No ADTS header found in AAC PES";
      const g = new Error(u);
      if (v.warn(`parsing error: ${u}`), this.observer.emit(m.ERROR, m.ERROR, {
        type: U.MEDIA_ERROR,
        details: L.FRAG_PARSING_ERROR,
        fatal: !1,
        levelRetry: d,
        error: g,
        reason: u
      }), !d)
        return;
    }
    fr(e, this.observer, r, n, this.audioCodec);
    let l;
    if (t.pts !== void 0)
      l = t.pts;
    else if (i) {
      const u = gr(e.samplerate);
      l = i.sample.pts + u;
    } else {
      v.warn("[tsdemuxer]: AAC PES unknown PTS");
      return;
    }
    let c = 0, h;
    for (; n < o; )
      if (h = mr(e, r, n, l, c), n += h.length, h.missing) {
        this.aacOverFlow = h;
        break;
      } else
        for (c++; n < o - 1 && !kt(r, n); n++)
          ;
  }
  parseMPEGPES(e, t) {
    const s = t.data, i = s.length;
    let r = 0, n = 0;
    const o = t.pts;
    if (o === void 0) {
      v.warn("[tsdemuxer]: MPEG PES unknown PTS");
      return;
    }
    for (; n < i; )
      if (Er(s, n)) {
        const l = pr(e, s, n, o, r);
        if (l)
          n += l.length, r++;
        else
          break;
      } else
        n++;
  }
  parseAC3PES(e, t) {
    {
      const s = t.data, i = t.pts;
      if (i === void 0) {
        v.warn("[tsdemuxer]: AC3 PES unknown PTS");
        return;
      }
      const r = s.length;
      let n = 0, o = 0, l;
      for (; o < r && (l = Sr(e, s, o, i, n++)) > 0; )
        o += l;
    }
  }
  parseID3PES(e, t) {
    if (t.pts === void 0) {
      v.warn("[tsdemuxer]: ID3 PES unknown PTS");
      return;
    }
    const s = se({}, t, {
      type: this._videoTrack ? ye.emsg : ye.audioId3,
      duration: Number.POSITIVE_INFINITY
    });
    e.samples.push(s);
  }
}
function hs(a, e) {
  return ((a[e + 1] & 31) << 8) + a[e + 2];
}
function ho(a, e) {
  return (a[e + 10] & 31) << 8 | a[e + 11];
}
function uo(a, e, t, s) {
  const i = {
    audioPid: -1,
    videoPid: -1,
    id3Pid: -1,
    segmentVideoCodec: "avc",
    segmentAudioCodec: "aac"
  }, r = (a[e + 1] & 15) << 8 | a[e + 2], n = e + 3 + r - 4, o = (a[e + 10] & 15) << 8 | a[e + 11];
  for (e += 12 + o; e < n; ) {
    const l = hs(a, e), c = (a[e + 3] & 15) << 8 | a[e + 4];
    switch (a[e]) {
      case 207:
        if (!s) {
          Wt("ADTS AAC");
          break;
        }
      case 15:
        i.audioPid === -1 && (i.audioPid = l);
        break;
      case 21:
        i.id3Pid === -1 && (i.id3Pid = l);
        break;
      case 219:
        if (!s) {
          Wt("H.264");
          break;
        }
      case 27:
        i.videoPid === -1 && (i.videoPid = l, i.segmentVideoCodec = "avc");
        break;
      case 3:
      case 4:
        !t.mpeg && !t.mp3 ? v.log("MPEG audio found, not supported in this browser") : i.audioPid === -1 && (i.audioPid = l, i.segmentAudioCodec = "mp3");
        break;
      case 193:
        if (!s) {
          Wt("AC-3");
          break;
        }
      case 129:
        t.ac3 ? i.audioPid === -1 && (i.audioPid = l, i.segmentAudioCodec = "ac3") : v.log("AC-3 audio found, not supported in this browser");
        break;
      case 6:
        if (i.audioPid === -1 && c > 0) {
          let h = e + 5, u = c;
          for (; u > 2; ) {
            switch (a[h]) {
              case 106:
                t.ac3 !== !0 ? v.log("AC-3 audio found, not supported in this browser for now") : (i.audioPid = l, i.segmentAudioCodec = "ac3");
                break;
            }
            const g = a[h + 1] + 2;
            h += g, u -= g;
          }
        }
        break;
      case 194:
      case 135:
        v.warn("Unsupported EC-3 in M2TS found");
        break;
      case 36:
        v.warn("Unsupported HEVC in M2TS found");
        break;
    }
    e += c + 5;
  }
  return i;
}
function Wt(a) {
  v.log(`${a} with AES-128-CBC encryption found in unencrypted stream`);
}
function Ge(a) {
  let e = 0, t, s, i, r, n;
  const o = a.data;
  if (!a || a.size === 0)
    return null;
  for (; o[0].length < 19 && o.length > 1; )
    o[0] = me(o[0], o[1]), o.splice(1, 1);
  if (t = o[0], (t[0] << 16) + (t[1] << 8) + t[2] === 1) {
    if (s = (t[4] << 8) + t[5], s && s > a.size - 6)
      return null;
    const c = t[7];
    c & 192 && (r = (t[9] & 14) * 536870912 + // 1 << 29
    (t[10] & 255) * 4194304 + // 1 << 22
    (t[11] & 254) * 16384 + // 1 << 14
    (t[12] & 255) * 128 + // 1 << 7
    (t[13] & 254) / 2, c & 64 ? (n = (t[14] & 14) * 536870912 + // 1 << 29
    (t[15] & 255) * 4194304 + // 1 << 22
    (t[16] & 254) * 16384 + // 1 << 14
    (t[17] & 255) * 128 + // 1 << 7
    (t[18] & 254) / 2, r - n > 60 * 9e4 && (v.warn(`${Math.round((r - n) / 9e4)}s delta between PTS and DTS, align them`), r = n)) : n = r), i = t[8];
    let h = i + 9;
    if (a.size <= h)
      return null;
    a.size -= h;
    const u = new Uint8Array(a.size);
    for (let d = 0, g = o.length; d < g; d++) {
      t = o[d];
      let f = t.byteLength;
      if (h)
        if (h > f) {
          h -= f;
          continue;
        } else
          t = t.subarray(h), f -= h, h = 0;
      u.set(t, e), e += f;
    }
    return s && (s -= i + 3), {
      data: u,
      pts: r,
      dts: n,
      len: s
    };
  }
  return null;
}
class fo extends Is {
  resetInitSegment(e, t, s, i) {
    super.resetInitSegment(e, t, s, i), this._audioTrack = {
      container: "audio/mpeg",
      type: "audio",
      id: 2,
      pid: -1,
      sequenceNumber: 0,
      segmentCodec: "mp3",
      samples: [],
      manifestCodec: t,
      duration: i,
      inputTimeScale: 9e4,
      dropped: 0
    };
  }
  static probe(e) {
    if (!e)
      return !1;
    const t = st(e, 0);
    let s = (t == null ? void 0 : t.length) || 0;
    if (t && e[s] === 11 && e[s + 1] === 119 && xs(t) !== void 0 && // check the bsid to confirm ac-3 or ec-3 (not mp3)
    xr(e, s) <= 16)
      return !1;
    for (let i = e.length; s < i; s++)
      if (yr(e, s))
        return v.log("MPEG Audio sync word found !"), !0;
    return !1;
  }
  canParse(e, t) {
    return so(e, t);
  }
  appendFrame(e, t, s) {
    if (this.basePTS !== null)
      return pr(e, t, s, this.basePTS, this.frameIndex);
  }
}
class fi {
  static getSilentFrame(e, t) {
    switch (e) {
      case "mp4a.40.2":
        if (t === 1)
          return new Uint8Array([0, 200, 0, 128, 35, 128]);
        if (t === 2)
          return new Uint8Array([33, 0, 73, 144, 2, 25, 0, 35, 128]);
        if (t === 3)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 142]);
        if (t === 4)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 128, 44, 128, 8, 2, 56]);
        if (t === 5)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 56]);
        if (t === 6)
          return new Uint8Array([0, 200, 0, 128, 32, 132, 1, 38, 64, 8, 100, 0, 130, 48, 4, 153, 0, 33, 144, 2, 0, 178, 0, 32, 8, 224]);
        break;
      default:
        if (t === 1)
          return new Uint8Array([1, 64, 34, 128, 163, 78, 230, 128, 186, 8, 0, 0, 0, 28, 6, 241, 193, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        if (t === 2)
          return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        if (t === 3)
          return new Uint8Array([1, 64, 34, 128, 163, 94, 230, 128, 186, 8, 0, 0, 0, 0, 149, 0, 6, 241, 161, 10, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 94]);
        break;
    }
  }
}
const _e = Math.pow(2, 32) - 1;
class A {
  static init() {
    A.types = {
      avc1: [],
      // codingname
      avcC: [],
      btrt: [],
      dinf: [],
      dref: [],
      esds: [],
      ftyp: [],
      hdlr: [],
      mdat: [],
      mdhd: [],
      mdia: [],
      mfhd: [],
      minf: [],
      moof: [],
      moov: [],
      mp4a: [],
      ".mp3": [],
      dac3: [],
      "ac-3": [],
      mvex: [],
      mvhd: [],
      pasp: [],
      sdtp: [],
      stbl: [],
      stco: [],
      stsc: [],
      stsd: [],
      stsz: [],
      stts: [],
      tfdt: [],
      tfhd: [],
      traf: [],
      trak: [],
      trun: [],
      trex: [],
      tkhd: [],
      vmhd: [],
      smhd: []
    };
    let e;
    for (e in A.types)
      A.types.hasOwnProperty(e) && (A.types[e] = [e.charCodeAt(0), e.charCodeAt(1), e.charCodeAt(2), e.charCodeAt(3)]);
    const t = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      // pre_defined
      118,
      105,
      100,
      101,
      // handler_type: 'vide'
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      86,
      105,
      100,
      101,
      111,
      72,
      97,
      110,
      100,
      108,
      101,
      114,
      0
      // name: 'VideoHandler'
    ]), s = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      // pre_defined
      115,
      111,
      117,
      110,
      // handler_type: 'soun'
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      83,
      111,
      117,
      110,
      100,
      72,
      97,
      110,
      100,
      108,
      101,
      114,
      0
      // name: 'SoundHandler'
    ]);
    A.HDLR_TYPES = {
      video: t,
      audio: s
    };
    const i = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      1,
      // entry_count
      0,
      0,
      0,
      12,
      // entry_size
      117,
      114,
      108,
      32,
      // 'url' type
      0,
      // version 0
      0,
      0,
      1
      // entry_flags
    ]), r = new Uint8Array([
      0,
      // version
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0
      // entry_count
    ]);
    A.STTS = A.STSC = A.STCO = r, A.STSZ = new Uint8Array([
      0,
      // version
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      // sample_size
      0,
      0,
      0,
      0
      // sample_count
    ]), A.VMHD = new Uint8Array([
      0,
      // version
      0,
      0,
      1,
      // flags
      0,
      0,
      // graphicsmode
      0,
      0,
      0,
      0,
      0,
      0
      // opcolor
    ]), A.SMHD = new Uint8Array([
      0,
      // version
      0,
      0,
      0,
      // flags
      0,
      0,
      // balance
      0,
      0
      // reserved
    ]), A.STSD = new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      1
    ]);
    const n = new Uint8Array([105, 115, 111, 109]), o = new Uint8Array([97, 118, 99, 49]), l = new Uint8Array([0, 0, 0, 1]);
    A.FTYP = A.box(A.types.ftyp, n, l, n, o), A.DINF = A.box(A.types.dinf, A.box(A.types.dref, i));
  }
  static box(e, ...t) {
    let s = 8, i = t.length;
    const r = i;
    for (; i--; )
      s += t[i].byteLength;
    const n = new Uint8Array(s);
    for (n[0] = s >> 24 & 255, n[1] = s >> 16 & 255, n[2] = s >> 8 & 255, n[3] = s & 255, n.set(e, 4), i = 0, s = 8; i < r; i++)
      n.set(t[i], s), s += t[i].byteLength;
    return n;
  }
  static hdlr(e) {
    return A.box(A.types.hdlr, A.HDLR_TYPES[e]);
  }
  static mdat(e) {
    return A.box(A.types.mdat, e);
  }
  static mdhd(e, t) {
    t *= e;
    const s = Math.floor(t / (_e + 1)), i = Math.floor(t % (_e + 1));
    return A.box(A.types.mdhd, new Uint8Array([
      1,
      // version 1
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      // creation_time
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      // modification_time
      e >> 24 & 255,
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255,
      // timescale
      s >> 24,
      s >> 16 & 255,
      s >> 8 & 255,
      s & 255,
      i >> 24,
      i >> 16 & 255,
      i >> 8 & 255,
      i & 255,
      85,
      196,
      // 'und' language (undetermined)
      0,
      0
    ]));
  }
  static mdia(e) {
    return A.box(A.types.mdia, A.mdhd(e.timescale, e.duration), A.hdlr(e.type), A.minf(e));
  }
  static mfhd(e) {
    return A.box(A.types.mfhd, new Uint8Array([
      0,
      0,
      0,
      0,
      // flags
      e >> 24,
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255
      // sequence_number
    ]));
  }
  static minf(e) {
    return e.type === "audio" ? A.box(A.types.minf, A.box(A.types.smhd, A.SMHD), A.DINF, A.stbl(e)) : A.box(A.types.minf, A.box(A.types.vmhd, A.VMHD), A.DINF, A.stbl(e));
  }
  static moof(e, t, s) {
    return A.box(A.types.moof, A.mfhd(e), A.traf(s, t));
  }
  static moov(e) {
    let t = e.length;
    const s = [];
    for (; t--; )
      s[t] = A.trak(e[t]);
    return A.box.apply(null, [A.types.moov, A.mvhd(e[0].timescale, e[0].duration)].concat(s).concat(A.mvex(e)));
  }
  static mvex(e) {
    let t = e.length;
    const s = [];
    for (; t--; )
      s[t] = A.trex(e[t]);
    return A.box.apply(null, [A.types.mvex, ...s]);
  }
  static mvhd(e, t) {
    t *= e;
    const s = Math.floor(t / (_e + 1)), i = Math.floor(t % (_e + 1)), r = new Uint8Array([
      1,
      // version 1
      0,
      0,
      0,
      // flags
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      // creation_time
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      // modification_time
      e >> 24 & 255,
      e >> 16 & 255,
      e >> 8 & 255,
      e & 255,
      // timescale
      s >> 24,
      s >> 16 & 255,
      s >> 8 & 255,
      s & 255,
      i >> 24,
      i >> 16 & 255,
      i >> 8 & 255,
      i & 255,
      0,
      1,
      0,
      0,
      // 1.0 rate
      1,
      0,
      // 1.0 volume
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      0,
      // reserved
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      64,
      0,
      0,
      0,
      // transformation: unity matrix
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // pre_defined
      255,
      255,
      255,
      255
      // next_track_ID
    ]);
    return A.box(A.types.mvhd, r);
  }
  static sdtp(e) {
    const t = e.samples || [], s = new Uint8Array(4 + t.length);
    let i, r;
    for (i = 0; i < t.length; i++)
      r = t[i].flags, s[i + 4] = r.dependsOn << 4 | r.isDependedOn << 2 | r.hasRedundancy;
    return A.box(A.types.sdtp, s);
  }
  static stbl(e) {
    return A.box(A.types.stbl, A.stsd(e), A.box(A.types.stts, A.STTS), A.box(A.types.stsc, A.STSC), A.box(A.types.stsz, A.STSZ), A.box(A.types.stco, A.STCO));
  }
  static avc1(e) {
    let t = [], s = [], i, r, n;
    for (i = 0; i < e.sps.length; i++)
      r = e.sps[i], n = r.byteLength, t.push(n >>> 8 & 255), t.push(n & 255), t = t.concat(Array.prototype.slice.call(r));
    for (i = 0; i < e.pps.length; i++)
      r = e.pps[i], n = r.byteLength, s.push(n >>> 8 & 255), s.push(n & 255), s = s.concat(Array.prototype.slice.call(r));
    const o = A.box(A.types.avcC, new Uint8Array([
      1,
      // version
      t[3],
      // profile
      t[4],
      // profile compat
      t[5],
      // level
      255,
      // lengthSizeMinusOne, hard-coded to 4 bytes
      224 | e.sps.length
      // 3bit reserved (111) + numOfSequenceParameterSets
    ].concat(t).concat([
      e.pps.length
      // numOfPictureParameterSets
    ]).concat(s))), l = e.width, c = e.height, h = e.pixelRatio[0], u = e.pixelRatio[1];
    return A.box(
      A.types.avc1,
      new Uint8Array([
        0,
        0,
        0,
        // reserved
        0,
        0,
        0,
        // reserved
        0,
        1,
        // data_reference_index
        0,
        0,
        // pre_defined
        0,
        0,
        // reserved
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // pre_defined
        l >> 8 & 255,
        l & 255,
        // width
        c >> 8 & 255,
        c & 255,
        // height
        0,
        72,
        0,
        0,
        // horizresolution
        0,
        72,
        0,
        0,
        // vertresolution
        0,
        0,
        0,
        0,
        // reserved
        0,
        1,
        // frame_count
        18,
        100,
        97,
        105,
        108,
        // dailymotion/hls.js
        121,
        109,
        111,
        116,
        105,
        111,
        110,
        47,
        104,
        108,
        115,
        46,
        106,
        115,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        // compressorname
        0,
        24,
        // depth = 24
        17,
        17
      ]),
      // pre_defined = -1
      o,
      A.box(A.types.btrt, new Uint8Array([
        0,
        28,
        156,
        128,
        // bufferSizeDB
        0,
        45,
        198,
        192,
        // maxBitrate
        0,
        45,
        198,
        192
      ])),
      // avgBitrate
      A.box(A.types.pasp, new Uint8Array([
        h >> 24,
        // hSpacing
        h >> 16 & 255,
        h >> 8 & 255,
        h & 255,
        u >> 24,
        // vSpacing
        u >> 16 & 255,
        u >> 8 & 255,
        u & 255
      ]))
    );
  }
  static esds(e) {
    const t = e.config.length;
    return new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      3,
      // descriptor_type
      23 + t,
      // length
      0,
      1,
      // es_id
      0,
      // stream_priority
      4,
      // descriptor_type
      15 + t,
      // length
      64,
      // codec : mpeg4_audio
      21,
      // stream_type
      0,
      0,
      0,
      // buffer_size
      0,
      0,
      0,
      0,
      // maxBitrate
      0,
      0,
      0,
      0,
      // avgBitrate
      5
      // descriptor_type
    ].concat([t]).concat(e.config).concat([6, 1, 2]));
  }
  static audioStsd(e) {
    const t = e.samplerate;
    return new Uint8Array([
      0,
      0,
      0,
      // reserved
      0,
      0,
      0,
      // reserved
      0,
      1,
      // data_reference_index
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // reserved
      0,
      e.channelCount,
      // channelcount
      0,
      16,
      // sampleSize:16bits
      0,
      0,
      0,
      0,
      // reserved2
      t >> 8 & 255,
      t & 255,
      //
      0,
      0
    ]);
  }
  static mp4a(e) {
    return A.box(A.types.mp4a, A.audioStsd(e), A.box(A.types.esds, A.esds(e)));
  }
  static mp3(e) {
    return A.box(A.types[".mp3"], A.audioStsd(e));
  }
  static ac3(e) {
    return A.box(A.types["ac-3"], A.audioStsd(e), A.box(A.types.dac3, e.config));
  }
  static stsd(e) {
    return e.type === "audio" ? e.segmentCodec === "mp3" && e.codec === "mp3" ? A.box(A.types.stsd, A.STSD, A.mp3(e)) : e.segmentCodec === "ac3" ? A.box(A.types.stsd, A.STSD, A.ac3(e)) : A.box(A.types.stsd, A.STSD, A.mp4a(e)) : A.box(A.types.stsd, A.STSD, A.avc1(e));
  }
  static tkhd(e) {
    const t = e.id, s = e.duration * e.timescale, i = e.width, r = e.height, n = Math.floor(s / (_e + 1)), o = Math.floor(s % (_e + 1));
    return A.box(A.types.tkhd, new Uint8Array([
      1,
      // version 1
      0,
      0,
      7,
      // flags
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      2,
      // creation_time
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      3,
      // modification_time
      t >> 24 & 255,
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255,
      // track_ID
      0,
      0,
      0,
      0,
      // reserved
      n >> 24,
      n >> 16 & 255,
      n >> 8 & 255,
      n & 255,
      o >> 24,
      o >> 16 & 255,
      o >> 8 & 255,
      o & 255,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      // reserved
      0,
      0,
      // layer
      0,
      0,
      // alternate_group
      0,
      0,
      // non-audio track volume
      0,
      0,
      // reserved
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      0,
      64,
      0,
      0,
      0,
      // transformation: unity matrix
      i >> 8 & 255,
      i & 255,
      0,
      0,
      // width
      r >> 8 & 255,
      r & 255,
      0,
      0
      // height
    ]));
  }
  static traf(e, t) {
    const s = A.sdtp(e), i = e.id, r = Math.floor(t / (_e + 1)), n = Math.floor(t % (_e + 1));
    return A.box(
      A.types.traf,
      A.box(A.types.tfhd, new Uint8Array([
        0,
        // version 0
        0,
        0,
        0,
        // flags
        i >> 24,
        i >> 16 & 255,
        i >> 8 & 255,
        i & 255
        // track_ID
      ])),
      A.box(A.types.tfdt, new Uint8Array([
        1,
        // version 1
        0,
        0,
        0,
        // flags
        r >> 24,
        r >> 16 & 255,
        r >> 8 & 255,
        r & 255,
        n >> 24,
        n >> 16 & 255,
        n >> 8 & 255,
        n & 255
      ])),
      A.trun(e, s.length + 16 + // tfhd
      20 + // tfdt
      8 + // traf header
      16 + // mfhd
      8 + // moof header
      8),
      // mdat header
      s
    );
  }
  /**
   * Generate a track box.
   * @param track a track definition
   */
  static trak(e) {
    return e.duration = e.duration || 4294967295, A.box(A.types.trak, A.tkhd(e), A.mdia(e));
  }
  static trex(e) {
    const t = e.id;
    return A.box(A.types.trex, new Uint8Array([
      0,
      // version 0
      0,
      0,
      0,
      // flags
      t >> 24,
      t >> 16 & 255,
      t >> 8 & 255,
      t & 255,
      // track_ID
      0,
      0,
      0,
      1,
      // default_sample_description_index
      0,
      0,
      0,
      0,
      // default_sample_duration
      0,
      0,
      0,
      0,
      // default_sample_size
      0,
      1,
      0,
      1
      // default_sample_flags
    ]));
  }
  static trun(e, t) {
    const s = e.samples || [], i = s.length, r = 12 + 16 * i, n = new Uint8Array(r);
    let o, l, c, h, u, d;
    for (t += 8 + r, n.set([
      e.type === "video" ? 1 : 0,
      // version 1 for video with signed-int sample_composition_time_offset
      0,
      15,
      1,
      // flags
      i >>> 24 & 255,
      i >>> 16 & 255,
      i >>> 8 & 255,
      i & 255,
      // sample_count
      t >>> 24 & 255,
      t >>> 16 & 255,
      t >>> 8 & 255,
      t & 255
      // data_offset
    ], 0), o = 0; o < i; o++)
      l = s[o], c = l.duration, h = l.size, u = l.flags, d = l.cts, n.set([
        c >>> 24 & 255,
        c >>> 16 & 255,
        c >>> 8 & 255,
        c & 255,
        // sample_duration
        h >>> 24 & 255,
        h >>> 16 & 255,
        h >>> 8 & 255,
        h & 255,
        // sample_size
        u.isLeading << 2 | u.dependsOn,
        u.isDependedOn << 6 | u.hasRedundancy << 4 | u.paddingValue << 1 | u.isNonSync,
        u.degradPrio & 61440,
        u.degradPrio & 15,
        // sample_flags
        d >>> 24 & 255,
        d >>> 16 & 255,
        d >>> 8 & 255,
        d & 255
        // sample_composition_time_offset
      ], 12 + 16 * o);
    return A.box(A.types.trun, n);
  }
  static initSegment(e) {
    A.types || A.init();
    const t = A.moov(e);
    return me(A.FTYP, t);
  }
}
A.types = void 0;
A.HDLR_TYPES = void 0;
A.STTS = void 0;
A.STSC = void 0;
A.STCO = void 0;
A.STSZ = void 0;
A.VMHD = void 0;
A.SMHD = void 0;
A.STSD = void 0;
A.FTYP = void 0;
A.DINF = void 0;
const vr = 9e4;
function Cs(a, e, t = 1, s = !1) {
  const i = a * e * t;
  return s ? Math.round(i) : i;
}
function go(a, e, t = 1, s = !1) {
  return Cs(a, e, 1 / t, s);
}
function Ze(a, e = !1) {
  return Cs(a, 1e3, 1 / vr, e);
}
function mo(a, e = 1) {
  return Cs(a, vr, 1 / e);
}
const po = 10 * 1e3, gi = 1024, To = 1152, Eo = 1536;
let Ke = null, Yt = null;
class Tt {
  constructor(e, t, s, i = "") {
    if (this.observer = void 0, this.config = void 0, this.typeSupported = void 0, this.ISGenerated = !1, this._initPTS = null, this._initDTS = null, this.nextAvcDts = null, this.nextAudioPts = null, this.videoSampleDuration = null, this.isAudioContiguous = !1, this.isVideoContiguous = !1, this.videoTrackConfig = void 0, this.observer = e, this.config = t, this.typeSupported = s, this.ISGenerated = !1, Ke === null) {
      const n = (navigator.userAgent || "").match(/Chrome\/(\d+)/i);
      Ke = n ? parseInt(n[1]) : 0;
    }
    if (Yt === null) {
      const r = navigator.userAgent.match(/Safari\/(\d+)/i);
      Yt = r ? parseInt(r[1]) : 0;
    }
  }
  destroy() {
    this.config = this.videoTrackConfig = this._initPTS = this._initDTS = null;
  }
  resetTimeStamp(e) {
    v.log("[mp4-remuxer]: initPTS & initDTS reset"), this._initPTS = this._initDTS = e;
  }
  resetNextTimestamp() {
    v.log("[mp4-remuxer]: reset next timestamp"), this.isVideoContiguous = !1, this.isAudioContiguous = !1;
  }
  resetInitSegment() {
    v.log("[mp4-remuxer]: ISGenerated flag reset"), this.ISGenerated = !1, this.videoTrackConfig = void 0;
  }
  getVideoStartPts(e) {
    let t = !1;
    const s = e.reduce((i, r) => {
      const n = r.pts - i;
      return n < -4294967296 ? (t = !0, ge(i, r.pts)) : n > 0 ? i : r.pts;
    }, e[0].pts);
    return t && v.debug("PTS rollover detected"), s;
  }
  remux(e, t, s, i, r, n, o, l) {
    let c, h, u, d, g, f, p = r, T = r;
    const E = e.pid > -1, y = t.pid > -1, x = t.samples.length, I = e.samples.length > 0, S = o && x > 0 || x > 1;
    if ((!E || I) && (!y || S) || this.ISGenerated || o) {
      if (this.ISGenerated) {
        var R, w, _, b;
        const G = this.videoTrackConfig;
        G && (t.width !== G.width || t.height !== G.height || ((R = t.pixelRatio) == null ? void 0 : R[0]) !== ((w = G.pixelRatio) == null ? void 0 : w[0]) || ((_ = t.pixelRatio) == null ? void 0 : _[1]) !== ((b = G.pixelRatio) == null ? void 0 : b[1])) && this.resetInitSegment();
      } else
        u = this.generateIS(e, t, r, n);
      const k = this.isVideoContiguous;
      let K = -1, P;
      if (S && (K = yo(t.samples), !k && this.config.forceKeyFrameOnDiscontinuity))
        if (f = !0, K > 0) {
          v.warn(`[mp4-remuxer]: Dropped ${K} out of ${x} video samples due to a missing keyframe`);
          const G = this.getVideoStartPts(t.samples);
          t.samples = t.samples.slice(K), t.dropped += K, T += (t.samples[0].pts - G) / t.inputTimeScale, P = T;
        } else
          K === -1 && (v.warn(`[mp4-remuxer]: No keyframe found out of ${x} video samples`), f = !1);
      if (this.ISGenerated) {
        if (I && S) {
          const G = this.getVideoStartPts(t.samples), H = (ge(e.samples[0].pts, G) - G) / t.inputTimeScale;
          p += Math.max(0, H), T += Math.max(0, -H);
        }
        if (I) {
          if (e.samplerate || (v.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"), u = this.generateIS(e, t, r, n)), h = this.remuxAudio(e, p, this.isAudioContiguous, n, y || S || l === N.AUDIO ? T : void 0), S) {
            const G = h ? h.endPTS - h.startPTS : 0;
            t.inputTimeScale || (v.warn("[mp4-remuxer]: regenerate InitSegment as video detected"), u = this.generateIS(e, t, r, n)), c = this.remuxVideo(t, T, k, G);
          }
        } else
          S && (c = this.remuxVideo(t, T, k, 0));
        c && (c.firstKeyFrame = K, c.independent = K !== -1, c.firstKeyFramePTS = P);
      }
    }
    return this.ISGenerated && this._initPTS && this._initDTS && (s.samples.length && (g = Ar(s, r, this._initPTS, this._initDTS)), i.samples.length && (d = Lr(i, r, this._initPTS))), {
      audio: h,
      video: c,
      initSegment: u,
      independent: f,
      text: d,
      id3: g
    };
  }
  generateIS(e, t, s, i) {
    const r = e.samples, n = t.samples, o = this.typeSupported, l = {}, c = this._initPTS;
    let h = !c || i, u = "audio/mp4", d, g, f;
    if (h && (d = g = 1 / 0), e.config && r.length) {
      switch (e.timescale = e.samplerate, e.segmentCodec) {
        case "mp3":
          o.mpeg ? (u = "audio/mpeg", e.codec = "") : o.mp3 && (e.codec = "mp3");
          break;
        case "ac3":
          e.codec = "ac-3";
          break;
      }
      l.audio = {
        id: "audio",
        container: u,
        codec: e.codec,
        initSegment: e.segmentCodec === "mp3" && o.mpeg ? new Uint8Array(0) : A.initSegment([e]),
        metadata: {
          channelCount: e.channelCount
        }
      }, h && (f = e.inputTimeScale, !c || f !== c.timescale ? d = g = r[0].pts - Math.round(f * s) : h = !1);
    }
    if (t.sps && t.pps && n.length) {
      if (t.timescale = t.inputTimeScale, l.video = {
        id: "main",
        container: "video/mp4",
        codec: t.codec,
        initSegment: A.initSegment([t]),
        metadata: {
          width: t.width,
          height: t.height
        }
      }, h)
        if (f = t.inputTimeScale, !c || f !== c.timescale) {
          const p = this.getVideoStartPts(n), T = Math.round(f * s);
          g = Math.min(g, ge(n[0].dts, p) - T), d = Math.min(d, p - T);
        } else
          h = !1;
      this.videoTrackConfig = {
        width: t.width,
        height: t.height,
        pixelRatio: t.pixelRatio
      };
    }
    if (Object.keys(l).length)
      return this.ISGenerated = !0, h ? (this._initPTS = {
        baseTime: d,
        timescale: f
      }, this._initDTS = {
        baseTime: g,
        timescale: f
      }) : d = f = void 0, {
        tracks: l,
        initPTS: d,
        timescale: f
      };
  }
  remuxVideo(e, t, s, i) {
    const r = e.inputTimeScale, n = e.samples, o = [], l = n.length, c = this._initPTS;
    let h = this.nextAvcDts, u = 8, d = this.videoSampleDuration, g, f, p = Number.POSITIVE_INFINITY, T = Number.NEGATIVE_INFINITY, E = !1;
    if (!s || h === null) {
      const F = t * r, M = n[0].pts - ge(n[0].dts, n[0].pts);
      Ke && h !== null && Math.abs(F - M - h) < 15e3 ? s = !0 : h = F - M;
    }
    const y = c.baseTime * r / c.timescale;
    for (let F = 0; F < l; F++) {
      const M = n[F];
      M.pts = ge(M.pts - y, h), M.dts = ge(M.dts - y, h), M.dts < n[F > 0 ? F - 1 : F].dts && (E = !0);
    }
    E && n.sort(function(F, M) {
      const Y = F.dts - M.dts, W = F.pts - M.pts;
      return Y || W;
    }), g = n[0].dts, f = n[n.length - 1].dts;
    const x = f - g, I = x ? Math.round(x / (l - 1)) : d || e.inputTimeScale / 30;
    if (s) {
      const F = g - h, M = F > I, Y = F < -1;
      if ((M || Y) && (M ? v.warn(`AVC: ${Ze(F, !0)} ms (${F}dts) hole between fragments detected at ${t.toFixed(3)}`) : v.warn(`AVC: ${Ze(-F, !0)} ms (${F}dts) overlapping between fragments detected at ${t.toFixed(3)}`), !Y || h >= n[0].pts || Ke)) {
        g = h;
        const W = n[0].pts - F;
        if (M)
          n[0].dts = g, n[0].pts = W;
        else
          for (let z = 0; z < n.length && !(n[z].dts > W); z++)
            n[z].dts -= F, n[z].pts -= F;
        v.log(`Video: Initial PTS/DTS adjusted: ${Ze(W, !0)}/${Ze(g, !0)}, delta: ${Ze(F, !0)} ms`);
      }
    }
    g = Math.max(0, g);
    let S = 0, D = 0, R = g;
    for (let F = 0; F < l; F++) {
      const M = n[F], Y = M.units, W = Y.length;
      let z = 0;
      for (let he = 0; he < W; he++)
        z += Y[he].data.length;
      D += z, S += W, M.length = z, M.dts < R ? (M.dts = R, R += I / 4 | 0 || 1) : R = M.dts, p = Math.min(M.pts, p), T = Math.max(M.pts, T);
    }
    f = n[l - 1].dts;
    const w = D + 4 * S + 8;
    let _;
    try {
      _ = new Uint8Array(w);
    } catch (F) {
      this.observer.emit(m.ERROR, m.ERROR, {
        type: U.MUX_ERROR,
        details: L.REMUX_ALLOC_ERROR,
        fatal: !1,
        error: F,
        bytes: w,
        reason: `fail allocating video mdat ${w}`
      });
      return;
    }
    const b = new DataView(_.buffer);
    b.setUint32(0, w), _.set(A.types.mdat, 4);
    let k = !1, K = Number.POSITIVE_INFINITY, P = Number.POSITIVE_INFINITY, G = Number.NEGATIVE_INFINITY, j = Number.NEGATIVE_INFINITY;
    for (let F = 0; F < l; F++) {
      const M = n[F], Y = M.units;
      let W = 0;
      for (let re = 0, te = Y.length; re < te; re++) {
        const be = Y[re], pe = be.data, Ft = be.data.byteLength;
        b.setUint32(u, Ft), u += 4, _.set(pe, u), u += Ft, W += 4 + Ft;
      }
      let z;
      if (F < l - 1)
        d = n[F + 1].dts - M.dts, z = n[F + 1].pts - M.pts;
      else {
        const re = this.config, te = F > 0 ? M.dts - n[F - 1].dts : I;
        if (z = F > 0 ? M.pts - n[F - 1].pts : I, re.stretchShortVideoTrack && this.nextAudioPts !== null) {
          const be = Math.floor(re.maxBufferHole * r), pe = (i ? p + i * r : this.nextAudioPts) - M.pts;
          pe > be ? (d = pe - te, d < 0 ? d = te : k = !0, v.log(`[mp4-remuxer]: It is approximately ${pe / 90} ms to the next segment; using duration ${d / 90} ms for the last video frame.`)) : d = te;
        } else
          d = te;
      }
      const he = Math.round(M.pts - M.dts);
      K = Math.min(K, d), G = Math.max(G, d), P = Math.min(P, z), j = Math.max(j, z), o.push(new mi(M.key, d, W, he));
    }
    if (o.length) {
      if (Ke) {
        if (Ke < 70) {
          const F = o[0].flags;
          F.dependsOn = 2, F.isNonSync = 0;
        }
      } else if (Yt && j - P < G - K && I / G < 0.025 && o[0].cts === 0) {
        v.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.");
        let F = g;
        for (let M = 0, Y = o.length; M < Y; M++) {
          const W = F + o[M].duration, z = F + o[M].cts;
          if (M < Y - 1) {
            const he = W + o[M + 1].cts;
            o[M].duration = he - z;
          } else
            o[M].duration = M ? o[M - 1].duration : I;
          o[M].cts = 0, F = W;
        }
      }
    }
    d = k || !d ? I : d, this.nextAvcDts = h = f + d, this.videoSampleDuration = d, this.isVideoContiguous = !0;
    const J = {
      data1: A.moof(e.sequenceNumber++, g, se({}, e, {
        samples: o
      })),
      data2: _,
      startPTS: p / r,
      endPTS: (T + d) / r,
      startDTS: g / r,
      endDTS: h / r,
      type: "video",
      hasAudio: !1,
      hasVideo: !0,
      nb: o.length,
      dropped: e.dropped
    };
    return e.samples = [], e.dropped = 0, J;
  }
  getSamplesPerFrame(e) {
    switch (e.segmentCodec) {
      case "mp3":
        return To;
      case "ac3":
        return Eo;
      default:
        return gi;
    }
  }
  remuxAudio(e, t, s, i, r) {
    const n = e.inputTimeScale, o = e.samplerate ? e.samplerate : n, l = n / o, c = this.getSamplesPerFrame(e), h = c * l, u = this._initPTS, d = e.segmentCodec === "mp3" && this.typeSupported.mpeg, g = [], f = r !== void 0;
    let p = e.samples, T = d ? 0 : 8, E = this.nextAudioPts || -1;
    const y = t * n, x = u.baseTime * n / u.timescale;
    if (this.isAudioContiguous = s = s || p.length && E > 0 && (i && Math.abs(y - E) < 9e3 || Math.abs(ge(p[0].pts - x, y) - E) < 20 * h), p.forEach(function(H) {
      H.pts = ge(H.pts - x, y);
    }), !s || E < 0) {
      if (p = p.filter((H) => H.pts >= 0), !p.length)
        return;
      r === 0 ? E = 0 : i && !f ? E = Math.max(0, y) : E = p[0].pts;
    }
    if (e.segmentCodec === "aac") {
      const H = this.config.maxAudioFramesDrift;
      for (let B = 0, J = E; B < p.length; B++) {
        const F = p[B], M = F.pts, Y = M - J, W = Math.abs(1e3 * Y / n);
        if (Y <= -H * h && f)
          B === 0 && (v.warn(`Audio frame @ ${(M / n).toFixed(3)}s overlaps nextAudioPts by ${Math.round(1e3 * Y / n)} ms.`), this.nextAudioPts = E = J = M);
        else if (Y >= H * h && W < po && f) {
          let z = Math.round(Y / h);
          J = M - z * h, J < 0 && (z--, J += h), B === 0 && (this.nextAudioPts = E = J), v.warn(`[mp4-remuxer]: Injecting ${z} audio frame @ ${(J / n).toFixed(3)}s due to ${Math.round(1e3 * Y / n)} ms gap.`);
          for (let he = 0; he < z; he++) {
            const re = Math.max(J, 0);
            let te = fi.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
            te || (v.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."), te = F.unit.subarray()), p.splice(B, 0, {
              unit: te,
              pts: re
            }), J += h, B++;
          }
        }
        F.pts = J, J += h;
      }
    }
    let I = null, S = null, D, R = 0, w = p.length;
    for (; w--; )
      R += p[w].unit.byteLength;
    for (let H = 0, B = p.length; H < B; H++) {
      const J = p[H], F = J.unit;
      let M = J.pts;
      if (S !== null) {
        const W = g[H - 1];
        W.duration = Math.round((M - S) / l);
      } else if (s && e.segmentCodec === "aac" && (M = E), I = M, R > 0) {
        R += T;
        try {
          D = new Uint8Array(R);
        } catch (W) {
          this.observer.emit(m.ERROR, m.ERROR, {
            type: U.MUX_ERROR,
            details: L.REMUX_ALLOC_ERROR,
            fatal: !1,
            error: W,
            bytes: R,
            reason: `fail allocating audio mdat ${R}`
          });
          return;
        }
        d || (new DataView(D.buffer).setUint32(0, R), D.set(A.types.mdat, 4));
      } else
        return;
      D.set(F, T);
      const Y = F.byteLength;
      T += Y, g.push(new mi(!0, c, Y, 0)), S = M;
    }
    const _ = g.length;
    if (!_)
      return;
    const b = g[g.length - 1];
    this.nextAudioPts = E = S + l * b.duration;
    const k = d ? new Uint8Array(0) : A.moof(e.sequenceNumber++, I / l, se({}, e, {
      samples: g
    }));
    e.samples = [];
    const K = I / n, P = E / n, j = {
      data1: k,
      data2: D,
      startPTS: K,
      endPTS: P,
      startDTS: K,
      endDTS: P,
      type: "audio",
      hasAudio: !0,
      hasVideo: !1,
      nb: _
    };
    return this.isAudioContiguous = !0, j;
  }
  remuxEmptyAudio(e, t, s, i) {
    const r = e.inputTimeScale, n = e.samplerate ? e.samplerate : r, o = r / n, l = this.nextAudioPts, c = this._initDTS, h = c.baseTime * 9e4 / c.timescale, u = (l !== null ? l : i.startDTS * r) + h, d = i.endDTS * r + h, g = o * gi, f = Math.ceil((d - u) / g), p = fi.getSilentFrame(e.manifestCodec || e.codec, e.channelCount);
    if (v.warn("[mp4-remuxer]: remux empty Audio"), !p) {
      v.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec");
      return;
    }
    const T = [];
    for (let E = 0; E < f; E++) {
      const y = u + E * g;
      T.push({
        unit: p,
        pts: y,
        dts: y
      });
    }
    return e.samples = T, this.remuxAudio(e, t, s, !1);
  }
}
function ge(a, e) {
  let t;
  if (e === null)
    return a;
  for (e < a ? t = -8589934592 : t = 8589934592; Math.abs(a - e) > 4294967296; )
    a += t;
  return a;
}
function yo(a) {
  for (let e = 0; e < a.length; e++)
    if (a[e].key)
      return e;
  return -1;
}
function Ar(a, e, t, s) {
  const i = a.samples.length;
  if (!i)
    return;
  const r = a.inputTimeScale;
  for (let o = 0; o < i; o++) {
    const l = a.samples[o];
    l.pts = ge(l.pts - t.baseTime * r / t.timescale, e * r) / r, l.dts = ge(l.dts - s.baseTime * r / s.timescale, e * r) / r;
  }
  const n = a.samples;
  return a.samples = [], {
    samples: n
  };
}
function Lr(a, e, t) {
  const s = a.samples.length;
  if (!s)
    return;
  const i = a.inputTimeScale;
  for (let n = 0; n < s; n++) {
    const o = a.samples[n];
    o.pts = ge(o.pts - t.baseTime * i / t.timescale, e * i) / i;
  }
  a.samples.sort((n, o) => n.pts - o.pts);
  const r = a.samples;
  return a.samples = [], {
    samples: r
  };
}
class mi {
  constructor(e, t, s, i) {
    this.size = void 0, this.duration = void 0, this.cts = void 0, this.flags = void 0, this.duration = t, this.size = s, this.cts = i, this.flags = {
      isLeading: 0,
      isDependedOn: 0,
      hasRedundancy: 0,
      degradPrio: 0,
      dependsOn: e ? 2 : 1,
      isNonSync: e ? 0 : 1
    };
  }
}
class xo {
  constructor() {
    this.emitInitSegment = !1, this.audioCodec = void 0, this.videoCodec = void 0, this.initData = void 0, this.initPTS = null, this.initTracks = void 0, this.lastEndTime = null;
  }
  destroy() {
  }
  resetTimeStamp(e) {
    this.initPTS = e, this.lastEndTime = null;
  }
  resetNextTimestamp() {
    this.lastEndTime = null;
  }
  resetInitSegment(e, t, s, i) {
    this.audioCodec = t, this.videoCodec = s, this.generateInitSegment(bn(e, i)), this.emitInitSegment = !0;
  }
  generateInitSegment(e) {
    let {
      audioCodec: t,
      videoCodec: s
    } = this;
    if (!(e != null && e.byteLength)) {
      this.initTracks = void 0, this.initData = void 0;
      return;
    }
    const i = this.initData = zi(e);
    i.audio && (t = pi(i.audio, X.AUDIO)), i.video && (s = pi(i.video, X.VIDEO));
    const r = {};
    i.audio && i.video ? r.audiovideo = {
      container: "video/mp4",
      codec: t + "," + s,
      initSegment: e,
      id: "main"
    } : i.audio ? r.audio = {
      container: "audio/mp4",
      codec: t,
      initSegment: e,
      id: "audio"
    } : i.video ? r.video = {
      container: "video/mp4",
      codec: s,
      initSegment: e,
      id: "main"
    } : v.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."), this.initTracks = r;
  }
  remux(e, t, s, i, r, n) {
    var o, l;
    let {
      initPTS: c,
      lastEndTime: h
    } = this;
    const u = {
      audio: void 0,
      video: void 0,
      text: i,
      id3: s,
      initSegment: void 0
    };
    O(h) || (h = this.lastEndTime = r || 0);
    const d = t.samples;
    if (!(d != null && d.length))
      return u;
    const g = {
      initPTS: void 0,
      timescale: 1
    };
    let f = this.initData;
    if ((o = f) != null && o.length || (this.generateInitSegment(d), f = this.initData), !((l = f) != null && l.length))
      return v.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."), u;
    this.emitInitSegment && (g.tracks = this.initTracks, this.emitInitSegment = !1);
    const p = Cn(d, f), T = Dn(f, d), E = T === null ? r : T;
    (So(c, E, r, p) || g.timescale !== c.timescale && n) && (g.initPTS = E - r, c && c.timescale === 1 && v.warn(`Adjusting initPTS by ${g.initPTS - c.baseTime}`), this.initPTS = c = {
      baseTime: g.initPTS,
      timescale: 1
    });
    const y = e ? E - c.baseTime / c.timescale : h, x = y + p;
    kn(f, d, c.baseTime / c.timescale), p > 0 ? this.lastEndTime = x : (v.warn("Duration parsed from mp4 should be greater than zero"), this.resetNextTimestamp());
    const I = !!f.audio, S = !!f.video;
    let D = "";
    I && (D += "audio"), S && (D += "video");
    const R = {
      data1: d,
      startPTS: y,
      startDTS: y,
      endPTS: x,
      endDTS: x,
      type: D,
      hasAudio: I,
      hasVideo: S,
      nb: 1,
      dropped: 0
    };
    return u.audio = R.type === "audio" ? R : void 0, u.video = R.type !== "audio" ? R : void 0, u.initSegment = g, u.id3 = Ar(s, r, c, c), i.samples.length && (u.text = Lr(i, r, c)), u;
  }
}
function So(a, e, t, s) {
  if (a === null)
    return !0;
  const i = Math.max(s, 1), r = e - a.baseTime / a.timescale;
  return Math.abs(r - t) > i;
}
function pi(a, e) {
  const t = a == null ? void 0 : a.codec;
  if (t && t.length > 4)
    return t;
  if (e === X.AUDIO) {
    if (t === "ec-3" || t === "ac-3" || t === "alac")
      return t;
    if (t === "fLaC" || t === "Opus")
      return Rt(t, !1);
    const s = "mp4a.40.5";
    return v.info(`Parsed audio codec "${t}" or audio object type not handled. Using "${s}"`), s;
  }
  return v.warn(`Unhandled video codec "${t}"`), t === "hvc1" || t === "hev1" ? "hvc1.1.6.L120.90" : t === "av01" ? "av01.0.04M.08" : "avc1.42e01e";
}
let ke;
try {
  ke = self.performance.now.bind(self.performance);
} catch {
  v.debug("Unable to use Performance API on this environment"), ke = je == null ? void 0 : je.Date.now;
}
const Et = [{
  demux: no,
  remux: xo
}, {
  demux: Pe,
  remux: Tt
}, {
  demux: io,
  remux: Tt
}, {
  demux: fo,
  remux: Tt
}];
Et.splice(2, 0, {
  demux: ao,
  remux: Tt
});
class Ti {
  constructor(e, t, s, i, r) {
    this.async = !1, this.observer = void 0, this.typeSupported = void 0, this.config = void 0, this.vendor = void 0, this.id = void 0, this.demuxer = void 0, this.remuxer = void 0, this.decrypter = void 0, this.probe = void 0, this.decryptionPromise = null, this.transmuxConfig = void 0, this.currentTransmuxState = void 0, this.observer = e, this.typeSupported = t, this.config = s, this.vendor = i, this.id = r;
  }
  configure(e) {
    this.transmuxConfig = e, this.decrypter && this.decrypter.reset();
  }
  push(e, t, s, i) {
    const r = s.transmuxing;
    r.executeStart = ke();
    let n = new Uint8Array(e);
    const {
      currentTransmuxState: o,
      transmuxConfig: l
    } = this;
    i && (this.currentTransmuxState = i);
    const {
      contiguous: c,
      discontinuity: h,
      trackSwitch: u,
      accurateTimeOffset: d,
      timeOffset: g,
      initSegmentChange: f
    } = i || o, {
      audioCodec: p,
      videoCodec: T,
      defaultInitPts: E,
      duration: y,
      initSegmentData: x
    } = l, I = vo(n, t);
    if (I && I.method === "AES-128") {
      const w = this.getDecrypter();
      if (w.isSync()) {
        let _ = w.softwareDecrypt(n, I.key.buffer, I.iv.buffer);
        if (s.part > -1 && (_ = w.flush()), !_)
          return r.executeEnd = ke(), qt(s);
        n = new Uint8Array(_);
      } else
        return this.decryptionPromise = w.webCryptoDecrypt(n, I.key.buffer, I.iv.buffer).then((_) => {
          const b = this.push(_, null, s);
          return this.decryptionPromise = null, b;
        }), this.decryptionPromise;
    }
    const S = this.needsProbing(h, u);
    if (S) {
      const w = this.configureTransmuxer(n);
      if (w)
        return v.warn(`[transmuxer] ${w.message}`), this.observer.emit(m.ERROR, m.ERROR, {
          type: U.MEDIA_ERROR,
          details: L.FRAG_PARSING_ERROR,
          fatal: !1,
          error: w,
          reason: w.message
        }), r.executeEnd = ke(), qt(s);
    }
    (h || u || f || S) && this.resetInitSegment(x, p, T, y, t), (h || f || S) && this.resetInitialTimestamp(E), c || this.resetContiguity();
    const D = this.transmux(n, I, g, d, s), R = this.currentTransmuxState;
    return R.contiguous = !0, R.discontinuity = !1, R.trackSwitch = !1, r.executeEnd = ke(), D;
  }
  // Due to data caching, flush calls can produce more than one TransmuxerResult (hence the Array type)
  flush(e) {
    const t = e.transmuxing;
    t.executeStart = ke();
    const {
      decrypter: s,
      currentTransmuxState: i,
      decryptionPromise: r
    } = this;
    if (r)
      return r.then(() => this.flush(e));
    const n = [], {
      timeOffset: o
    } = i;
    if (s) {
      const u = s.flush();
      u && n.push(this.push(u, null, e));
    }
    const {
      demuxer: l,
      remuxer: c
    } = this;
    if (!l || !c)
      return t.executeEnd = ke(), [qt(e)];
    const h = l.flush(o);
    return yt(h) ? h.then((u) => (this.flushRemux(n, u, e), n)) : (this.flushRemux(n, h, e), n);
  }
  flushRemux(e, t, s) {
    const {
      audioTrack: i,
      videoTrack: r,
      id3Track: n,
      textTrack: o
    } = t, {
      accurateTimeOffset: l,
      timeOffset: c
    } = this.currentTransmuxState;
    v.log(`[transmuxer.ts]: Flushed fragment ${s.sn}${s.part > -1 ? " p: " + s.part : ""} of level ${s.level}`);
    const h = this.remuxer.remux(i, r, n, o, c, l, !0, this.id);
    e.push({
      remuxResult: h,
      chunkMeta: s
    }), s.transmuxing.executeEnd = ke();
  }
  resetInitialTimestamp(e) {
    const {
      demuxer: t,
      remuxer: s
    } = this;
    !t || !s || (t.resetTimeStamp(e), s.resetTimeStamp(e));
  }
  resetContiguity() {
    const {
      demuxer: e,
      remuxer: t
    } = this;
    !e || !t || (e.resetContiguity(), t.resetNextTimestamp());
  }
  resetInitSegment(e, t, s, i, r) {
    const {
      demuxer: n,
      remuxer: o
    } = this;
    !n || !o || (n.resetInitSegment(e, t, s, i), o.resetInitSegment(e, t, s, r));
  }
  destroy() {
    this.demuxer && (this.demuxer.destroy(), this.demuxer = void 0), this.remuxer && (this.remuxer.destroy(), this.remuxer = void 0);
  }
  transmux(e, t, s, i, r) {
    let n;
    return t && t.method === "SAMPLE-AES" ? n = this.transmuxSampleAes(e, t, s, i, r) : n = this.transmuxUnencrypted(e, s, i, r), n;
  }
  transmuxUnencrypted(e, t, s, i) {
    const {
      audioTrack: r,
      videoTrack: n,
      id3Track: o,
      textTrack: l
    } = this.demuxer.demux(e, t, !1, !this.config.progressive);
    return {
      remuxResult: this.remuxer.remux(r, n, o, l, t, s, !1, this.id),
      chunkMeta: i
    };
  }
  transmuxSampleAes(e, t, s, i, r) {
    return this.demuxer.demuxSampleAes(e, t, s).then((n) => ({
      remuxResult: this.remuxer.remux(n.audioTrack, n.videoTrack, n.id3Track, n.textTrack, s, i, !1, this.id),
      chunkMeta: r
    }));
  }
  configureTransmuxer(e) {
    const {
      config: t,
      observer: s,
      typeSupported: i,
      vendor: r
    } = this;
    let n;
    for (let d = 0, g = Et.length; d < g; d++) {
      var o;
      if ((o = Et[d].demux) != null && o.probe(e)) {
        n = Et[d];
        break;
      }
    }
    if (!n)
      return new Error("Failed to find demuxer by probing fragment data");
    const l = this.demuxer, c = this.remuxer, h = n.remux, u = n.demux;
    (!c || !(c instanceof h)) && (this.remuxer = new h(s, t, i, r)), (!l || !(l instanceof u)) && (this.demuxer = new u(s, t, i), this.probe = u.probe);
  }
  needsProbing(e, t) {
    return !this.demuxer || !this.remuxer || e || t;
  }
  getDecrypter() {
    let e = this.decrypter;
    return e || (e = this.decrypter = new Ls(this.config)), e;
  }
}
function vo(a, e) {
  let t = null;
  return a.byteLength > 0 && (e == null ? void 0 : e.key) != null && e.iv !== null && e.method != null && (t = e), t;
}
const qt = (a) => ({
  remuxResult: {},
  chunkMeta: a
});
function yt(a) {
  return "then" in a && a.then instanceof Function;
}
class Ao {
  constructor(e, t, s, i, r) {
    this.audioCodec = void 0, this.videoCodec = void 0, this.initSegmentData = void 0, this.duration = void 0, this.defaultInitPts = void 0, this.audioCodec = e, this.videoCodec = t, this.initSegmentData = s, this.duration = i, this.defaultInitPts = r || null;
  }
}
class Lo {
  constructor(e, t, s, i, r, n) {
    this.discontinuity = void 0, this.contiguous = void 0, this.accurateTimeOffset = void 0, this.trackSwitch = void 0, this.timeOffset = void 0, this.initSegmentChange = void 0, this.discontinuity = e, this.contiguous = t, this.accurateTimeOffset = s, this.trackSwitch = i, this.timeOffset = r, this.initSegmentChange = n;
  }
}
var Rr = { exports: {} };
(function(a) {
  var e = Object.prototype.hasOwnProperty, t = "~";
  function s() {
  }
  Object.create && (s.prototype = /* @__PURE__ */ Object.create(null), new s().__proto__ || (t = !1));
  function i(l, c, h) {
    this.fn = l, this.context = c, this.once = h || !1;
  }
  function r(l, c, h, u, d) {
    if (typeof h != "function")
      throw new TypeError("The listener must be a function");
    var g = new i(h, u || l, d), f = t ? t + c : c;
    return l._events[f] ? l._events[f].fn ? l._events[f] = [l._events[f], g] : l._events[f].push(g) : (l._events[f] = g, l._eventsCount++), l;
  }
  function n(l, c) {
    --l._eventsCount === 0 ? l._events = new s() : delete l._events[c];
  }
  function o() {
    this._events = new s(), this._eventsCount = 0;
  }
  o.prototype.eventNames = function() {
    var c = [], h, u;
    if (this._eventsCount === 0)
      return c;
    for (u in h = this._events)
      e.call(h, u) && c.push(t ? u.slice(1) : u);
    return Object.getOwnPropertySymbols ? c.concat(Object.getOwnPropertySymbols(h)) : c;
  }, o.prototype.listeners = function(c) {
    var h = t ? t + c : c, u = this._events[h];
    if (!u)
      return [];
    if (u.fn)
      return [u.fn];
    for (var d = 0, g = u.length, f = new Array(g); d < g; d++)
      f[d] = u[d].fn;
    return f;
  }, o.prototype.listenerCount = function(c) {
    var h = t ? t + c : c, u = this._events[h];
    return u ? u.fn ? 1 : u.length : 0;
  }, o.prototype.emit = function(c, h, u, d, g, f) {
    var p = t ? t + c : c;
    if (!this._events[p])
      return !1;
    var T = this._events[p], E = arguments.length, y, x;
    if (T.fn) {
      switch (T.once && this.removeListener(c, T.fn, void 0, !0), E) {
        case 1:
          return T.fn.call(T.context), !0;
        case 2:
          return T.fn.call(T.context, h), !0;
        case 3:
          return T.fn.call(T.context, h, u), !0;
        case 4:
          return T.fn.call(T.context, h, u, d), !0;
        case 5:
          return T.fn.call(T.context, h, u, d, g), !0;
        case 6:
          return T.fn.call(T.context, h, u, d, g, f), !0;
      }
      for (x = 1, y = new Array(E - 1); x < E; x++)
        y[x - 1] = arguments[x];
      T.fn.apply(T.context, y);
    } else {
      var I = T.length, S;
      for (x = 0; x < I; x++)
        switch (T[x].once && this.removeListener(c, T[x].fn, void 0, !0), E) {
          case 1:
            T[x].fn.call(T[x].context);
            break;
          case 2:
            T[x].fn.call(T[x].context, h);
            break;
          case 3:
            T[x].fn.call(T[x].context, h, u);
            break;
          case 4:
            T[x].fn.call(T[x].context, h, u, d);
            break;
          default:
            if (!y)
              for (S = 1, y = new Array(E - 1); S < E; S++)
                y[S - 1] = arguments[S];
            T[x].fn.apply(T[x].context, y);
        }
    }
    return !0;
  }, o.prototype.on = function(c, h, u) {
    return r(this, c, h, u, !1);
  }, o.prototype.once = function(c, h, u) {
    return r(this, c, h, u, !0);
  }, o.prototype.removeListener = function(c, h, u, d) {
    var g = t ? t + c : c;
    if (!this._events[g])
      return this;
    if (!h)
      return n(this, g), this;
    var f = this._events[g];
    if (f.fn)
      f.fn === h && (!d || f.once) && (!u || f.context === u) && n(this, g);
    else {
      for (var p = 0, T = [], E = f.length; p < E; p++)
        (f[p].fn !== h || d && !f[p].once || u && f[p].context !== u) && T.push(f[p]);
      T.length ? this._events[g] = T.length === 1 ? T[0] : T : n(this, g);
    }
    return this;
  }, o.prototype.removeAllListeners = function(c) {
    var h;
    return c ? (h = t ? t + c : c, this._events[h] && n(this, h)) : (this._events = new s(), this._eventsCount = 0), this;
  }, o.prototype.off = o.prototype.removeListener, o.prototype.addListener = o.prototype.on, o.prefixed = t, o.EventEmitter = o, a.exports = o;
})(Rr);
var Ro = Rr.exports, ws = /* @__PURE__ */ qr(Ro);
class Ir {
  constructor(e, t, s, i) {
    this.error = null, this.hls = void 0, this.id = void 0, this.observer = void 0, this.frag = null, this.part = null, this.useWorker = void 0, this.workerContext = null, this.onwmsg = void 0, this.transmuxer = null, this.onTransmuxComplete = void 0, this.onFlush = void 0;
    const r = e.config;
    this.hls = e, this.id = t, this.useWorker = !!r.enableWorker, this.onTransmuxComplete = s, this.onFlush = i;
    const n = (h, u) => {
      u = u || {}, u.frag = this.frag, u.id = this.id, h === m.ERROR && (this.error = u.error), this.hls.trigger(h, u);
    };
    this.observer = new ws(), this.observer.on(m.FRAG_DECRYPTED, n), this.observer.on(m.ERROR, n);
    const o = Je(r.preferManagedMediaSource) || {
      isTypeSupported: () => !1
    }, l = {
      mpeg: o.isTypeSupported("audio/mpeg"),
      mp3: o.isTypeSupported('audio/mp4; codecs="mp3"'),
      ac3: o.isTypeSupported('audio/mp4; codecs="ac-3"')
    }, c = navigator.vendor;
    if (this.useWorker && typeof Worker < "u" && (r.workerPath || Va())) {
      try {
        r.workerPath ? (v.log(`loading Web Worker ${r.workerPath} for "${t}"`), this.workerContext = Wa(r.workerPath)) : (v.log(`injecting Web Worker for "${t}"`), this.workerContext = Ha()), this.onwmsg = (d) => this.onWorkerMessage(d);
        const {
          worker: u
        } = this.workerContext;
        u.addEventListener("message", this.onwmsg), u.onerror = (d) => {
          const g = new Error(`${d.message}  (${d.filename}:${d.lineno})`);
          r.enableWorker = !1, v.warn(`Error in "${t}" Web Worker, fallback to inline`), this.hls.trigger(m.ERROR, {
            type: U.OTHER_ERROR,
            details: L.INTERNAL_EXCEPTION,
            fatal: !1,
            event: "demuxerWorker",
            error: g
          });
        }, u.postMessage({
          cmd: "init",
          typeSupported: l,
          vendor: c,
          id: t,
          config: JSON.stringify(r)
        });
      } catch (u) {
        v.warn(`Error setting up "${t}" Web Worker, fallback to inline`, u), this.resetWorker(), this.error = null, this.transmuxer = new Ti(this.observer, l, r, c, t);
      }
      return;
    }
    this.transmuxer = new Ti(this.observer, l, r, c, t);
  }
  resetWorker() {
    if (this.workerContext) {
      const {
        worker: e,
        objectURL: t
      } = this.workerContext;
      t && self.URL.revokeObjectURL(t), e.removeEventListener("message", this.onwmsg), e.onerror = null, e.terminate(), this.workerContext = null;
    }
  }
  destroy() {
    if (this.workerContext)
      this.resetWorker(), this.onwmsg = void 0;
    else {
      const t = this.transmuxer;
      t && (t.destroy(), this.transmuxer = null);
    }
    const e = this.observer;
    e && e.removeAllListeners(), this.frag = null, this.observer = null, this.hls = null;
  }
  push(e, t, s, i, r, n, o, l, c, h) {
    var u, d;
    c.transmuxing.start = self.performance.now();
    const {
      transmuxer: g
    } = this, f = n ? n.start : r.start, p = r.decryptdata, T = this.frag, E = !(T && r.cc === T.cc), y = !(T && c.level === T.level), x = T ? c.sn - T.sn : -1, I = this.part ? c.part - this.part.index : -1, S = x === 0 && c.id > 1 && c.id === (T == null ? void 0 : T.stats.chunkCount), D = !y && (x === 1 || x === 0 && (I === 1 || S && I <= 0)), R = self.performance.now();
    (y || x || r.stats.parsing.start === 0) && (r.stats.parsing.start = R), n && (I || !D) && (n.stats.parsing.start = R);
    const w = !(T && ((u = r.initSegment) == null ? void 0 : u.url) === ((d = T.initSegment) == null ? void 0 : d.url)), _ = new Lo(E, D, l, y, f, w);
    if (!D || E || w) {
      v.log(`[transmuxer-interface, ${r.type}]: Starting new transmux session for sn: ${c.sn} p: ${c.part} level: ${c.level} id: ${c.id}
        discontinuity: ${E}
        trackSwitch: ${y}
        contiguous: ${D}
        accurateTimeOffset: ${l}
        timeOffset: ${f}
        initSegmentChange: ${w}`);
      const b = new Ao(s, i, t, o, h);
      this.configureTransmuxer(b);
    }
    if (this.frag = r, this.part = n, this.workerContext)
      this.workerContext.worker.postMessage({
        cmd: "demux",
        data: e,
        decryptdata: p,
        chunkMeta: c,
        state: _
      }, e instanceof ArrayBuffer ? [e] : []);
    else if (g) {
      const b = g.push(e, p, c, _);
      yt(b) ? (g.async = !0, b.then((k) => {
        this.handleTransmuxComplete(k);
      }).catch((k) => {
        this.transmuxerError(k, c, "transmuxer-interface push error");
      })) : (g.async = !1, this.handleTransmuxComplete(b));
    }
  }
  flush(e) {
    e.transmuxing.start = self.performance.now();
    const {
      transmuxer: t
    } = this;
    if (this.workerContext)
      this.workerContext.worker.postMessage({
        cmd: "flush",
        chunkMeta: e
      });
    else if (t) {
      let s = t.flush(e);
      yt(s) || t.async ? (yt(s) || (s = Promise.resolve(s)), s.then((r) => {
        this.handleFlushResult(r, e);
      }).catch((r) => {
        this.transmuxerError(r, e, "transmuxer-interface flush error");
      })) : this.handleFlushResult(s, e);
    }
  }
  transmuxerError(e, t, s) {
    this.hls && (this.error = e, this.hls.trigger(m.ERROR, {
      type: U.MEDIA_ERROR,
      details: L.FRAG_PARSING_ERROR,
      chunkMeta: t,
      fatal: !1,
      error: e,
      err: e,
      reason: s
    }));
  }
  handleFlushResult(e, t) {
    e.forEach((s) => {
      this.handleTransmuxComplete(s);
    }), this.onFlush(t);
  }
  onWorkerMessage(e) {
    const t = e.data, s = this.hls;
    switch (t.event) {
      case "init": {
        var i;
        const r = (i = this.workerContext) == null ? void 0 : i.objectURL;
        r && self.URL.revokeObjectURL(r);
        break;
      }
      case "transmuxComplete": {
        this.handleTransmuxComplete(t.data);
        break;
      }
      case "flush": {
        this.onFlush(t.data);
        break;
      }
      case "workerLog":
        v[t.data.logType] && v[t.data.logType](t.data.message);
        break;
      default: {
        t.data = t.data || {}, t.data.frag = this.frag, t.data.id = this.id, s.trigger(t.event, t.data);
        break;
      }
    }
  }
  configureTransmuxer(e) {
    const {
      transmuxer: t
    } = this;
    this.workerContext ? this.workerContext.worker.postMessage({
      cmd: "configure",
      config: e
    }) : t && t.configure(e);
  }
  handleTransmuxComplete(e) {
    e.chunkMeta.transmuxing.end = self.performance.now(), this.onTransmuxComplete(e);
  }
}
function br(a, e) {
  if (a.length !== e.length)
    return !1;
  for (let t = 0; t < a.length; t++)
    if (!Xe(a[t].attrs, e[t].attrs))
      return !1;
  return !0;
}
function Xe(a, e, t) {
  const s = a["STABLE-RENDITION-ID"];
  return s && !t ? s === e["STABLE-RENDITION-ID"] : !(t || ["LANGUAGE", "NAME", "CHARACTERISTICS", "AUTOSELECT", "DEFAULT", "FORCED", "ASSOC-LANGUAGE"]).some((i) => a[i] !== e[i]);
}
function us(a, e) {
  return e.label.toLowerCase() === a.name.toLowerCase() && (!e.language || e.language.toLowerCase() === (a.lang || "").toLowerCase());
}
const Ei = 100;
class Io extends Rs {
  constructor(e, t, s) {
    super(e, t, s, "[audio-stream-controller]", N.AUDIO), this.videoBuffer = null, this.videoTrackCC = -1, this.waitingVideoCC = -1, this.bufferedTrack = null, this.switchingTrack = null, this.trackId = -1, this.waitingData = null, this.mainDetails = null, this.flushing = !1, this.bufferFlushed = !1, this.cachedTrackLoadedData = null, this._registerListeners();
  }
  onHandlerDestroying() {
    this._unregisterListeners(), super.onHandlerDestroying(), this.mainDetails = null, this.bufferedTrack = null, this.switchingTrack = null;
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.LEVEL_LOADED, this.onLevelLoaded, this), e.on(m.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), e.on(m.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(m.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.on(m.ERROR, this.onError, this), e.on(m.BUFFER_RESET, this.onBufferReset, this), e.on(m.BUFFER_CREATED, this.onBufferCreated, this), e.on(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(m.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(m.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(m.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.LEVEL_LOADED, this.onLevelLoaded, this), e.off(m.AUDIO_TRACKS_UPDATED, this.onAudioTracksUpdated, this), e.off(m.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(m.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.off(m.ERROR, this.onError, this), e.off(m.BUFFER_RESET, this.onBufferReset, this), e.off(m.BUFFER_CREATED, this.onBufferCreated, this), e.off(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(m.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(m.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(m.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  // INIT_PTS_FOUND is triggered when the video track parsed in the stream-controller has a new PTS value
  onInitPtsFound(e, {
    frag: t,
    id: s,
    initPTS: i,
    timescale: r
  }) {
    if (s === "main") {
      const n = t.cc;
      this.initPTS[t.cc] = {
        baseTime: i,
        timescale: r
      }, this.log(`InitPTS for cc: ${n} found from main: ${i}`), this.videoTrackCC = n, this.state === C.WAITING_INIT_PTS && this.tick();
    }
  }
  startLoad(e) {
    if (!this.levels) {
      this.startPosition = e, this.state = C.STOPPED;
      return;
    }
    const t = this.lastCurrentTime;
    this.stopLoad(), this.setInterval(Ei), t > 0 && e === -1 ? (this.log(`Override startPosition with lastCurrentTime @${t.toFixed(3)}`), e = t, this.state = C.IDLE) : (this.loadedmetadata = !1, this.state = C.WAITING_TRACK), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
  }
  doTick() {
    switch (this.state) {
      case C.IDLE:
        this.doTickIdle();
        break;
      case C.WAITING_TRACK: {
        var e;
        const {
          levels: s,
          trackId: i
        } = this, r = s == null || (e = s[i]) == null ? void 0 : e.details;
        if (r) {
          if (this.waitForCdnTuneIn(r))
            break;
          this.state = C.WAITING_INIT_PTS;
        }
        break;
      }
      case C.FRAG_LOADING_WAITING_RETRY: {
        var t;
        const s = performance.now(), i = this.retryDate;
        if (!i || s >= i || (t = this.media) != null && t.seeking) {
          const {
            levels: r,
            trackId: n
          } = this;
          this.log("RetryDate reached, switch back to IDLE state"), this.resetStartWhenNotLoaded((r == null ? void 0 : r[n]) || null), this.state = C.IDLE;
        }
        break;
      }
      case C.WAITING_INIT_PTS: {
        const s = this.waitingData;
        if (s) {
          const {
            frag: i,
            part: r,
            cache: n,
            complete: o
          } = s;
          if (this.initPTS[i.cc] !== void 0) {
            this.waitingData = null, this.waitingVideoCC = -1, this.state = C.FRAG_LOADING;
            const l = n.flush(), c = {
              frag: i,
              part: r,
              payload: l,
              networkDetails: null
            };
            this._handleFragmentLoadProgress(c), o && super._handleFragmentLoadComplete(c);
          } else if (this.videoTrackCC !== this.waitingVideoCC)
            this.log(`Waiting fragment cc (${i.cc}) cancelled because video is at cc ${this.videoTrackCC}`), this.clearWaitingFragment();
          else {
            const l = this.getLoadPosition(), c = Q.bufferInfo(this.mediaBuffer, l, this.config.maxBufferHole);
            cs(c.end, this.config.maxFragLookUpTolerance, i) < 0 && (this.log(`Waiting fragment cc (${i.cc}) @ ${i.start} cancelled because another fragment at ${c.end} is needed`), this.clearWaitingFragment());
          }
        } else
          this.state = C.IDLE;
      }
    }
    this.onTickEnd();
  }
  clearWaitingFragment() {
    const e = this.waitingData;
    e && (this.fragmentTracker.removeFragment(e.frag), this.waitingData = null, this.waitingVideoCC = -1, this.state = C.IDLE);
  }
  resetLoadingState() {
    this.clearWaitingFragment(), super.resetLoadingState();
  }
  onTickEnd() {
    const {
      media: e
    } = this;
    e != null && e.readyState && (this.lastCurrentTime = e.currentTime);
  }
  doTickIdle() {
    const {
      hls: e,
      levels: t,
      media: s,
      trackId: i
    } = this, r = e.config;
    if (!s && (this.startFragRequested || !r.startFragPrefetch) || !(t != null && t[i]))
      return;
    const n = t[i], o = n.details;
    if (!o || o.live && this.levelLastLoaded !== n || this.waitForCdnTuneIn(o)) {
      this.state = C.WAITING_TRACK;
      return;
    }
    const l = this.mediaBuffer ? this.mediaBuffer : this.media;
    this.bufferFlushed && l && (this.bufferFlushed = !1, this.afterBufferFlushed(l, X.AUDIO, N.AUDIO));
    const c = this.getFwdBufferInfo(l, N.AUDIO);
    if (c === null)
      return;
    const {
      bufferedTrack: h,
      switchingTrack: u
    } = this;
    if (!u && this._streamEnded(c, o)) {
      e.trigger(m.BUFFER_EOS, {
        type: "audio"
      }), this.state = C.ENDED;
      return;
    }
    const d = this.getFwdBufferInfo(this.videoBuffer ? this.videoBuffer : this.media, N.MAIN), g = c.len, f = this.getMaxBufferLength(d == null ? void 0 : d.len), p = o.fragments, T = p[0].start;
    let E = this.flushing ? this.getLoadPosition() : c.end;
    if (u && s) {
      const S = this.getLoadPosition();
      h && !Xe(u.attrs, h.attrs) && (E = S), o.PTSKnown && S < T && (c.end > T || c.nextStart) && (this.log("Alt audio track ahead of main track, seek to start of alt audio track"), s.currentTime = T + 0.05);
    }
    if (g >= f && !u && E < p[p.length - 1].start)
      return;
    let y = this.getNextFragment(E, o), x = !1;
    if (y && this.isLoopLoading(y, E) && (x = !!y.gap, y = this.getNextFragmentLoopLoading(y, o, c, N.MAIN, f)), !y) {
      this.bufferFlushed = !0;
      return;
    }
    const I = d && y.start > d.end + o.targetduration;
    if (I || // Or wait for main buffer after buffing some audio
    !(d != null && d.len) && c.len) {
      const S = this.getAppendedFrag(y.start, N.MAIN);
      if (S === null || (x || (x = !!S.gap || !!I && d.len === 0), I && !x || x && c.nextStart && c.nextStart < S.end))
        return;
    }
    this.loadFragment(y, n, E);
  }
  getMaxBufferLength(e) {
    const t = super.getMaxBufferLength();
    return e ? Math.min(Math.max(t, e), this.config.maxMaxBufferLength) : t;
  }
  onMediaDetaching() {
    this.videoBuffer = null, this.bufferFlushed = this.flushing = !1, super.onMediaDetaching();
  }
  onAudioTracksUpdated(e, {
    audioTracks: t
  }) {
    this.resetTransmuxer(), this.levels = t.map((s) => new ze(s));
  }
  onAudioTrackSwitching(e, t) {
    const s = !!t.url;
    this.trackId = t.id;
    const {
      fragCurrent: i
    } = this;
    i && (i.abortRequests(), this.removeUnbufferedFrags(i.start)), this.resetLoadingState(), s ? this.setInterval(Ei) : this.resetTransmuxer(), s ? (this.switchingTrack = t, this.state = C.IDLE, this.flushAudioIfNeeded(t)) : (this.switchingTrack = null, this.bufferedTrack = t, this.state = C.STOPPED), this.tick();
  }
  onManifestLoading() {
    this.fragmentTracker.removeAllFragments(), this.startPosition = this.lastCurrentTime = 0, this.bufferFlushed = this.flushing = !1, this.levels = this.mainDetails = this.waitingData = this.bufferedTrack = this.cachedTrackLoadedData = this.switchingTrack = null, this.startFragRequested = !1, this.trackId = this.videoTrackCC = this.waitingVideoCC = -1;
  }
  onLevelLoaded(e, t) {
    this.mainDetails = t.details, this.cachedTrackLoadedData !== null && (this.hls.trigger(m.AUDIO_TRACK_LOADED, this.cachedTrackLoadedData), this.cachedTrackLoadedData = null);
  }
  onAudioTrackLoaded(e, t) {
    var s;
    if (this.mainDetails == null) {
      this.cachedTrackLoadedData = t;
      return;
    }
    const {
      levels: i
    } = this, {
      details: r,
      id: n
    } = t;
    if (!i) {
      this.warn(`Audio tracks were reset while loading level ${n}`);
      return;
    }
    this.log(`Audio track ${n} loaded [${r.startSN},${r.endSN}]${r.lastPartSn ? `[part-${r.lastPartSn}-${r.lastPartIndex}]` : ""},duration:${r.totalduration}`);
    const o = i[n];
    let l = 0;
    if (r.live || (s = o.details) != null && s.live) {
      this.checkLiveUpdate(r);
      const h = this.mainDetails;
      if (r.deltaUpdateFailed || !h)
        return;
      if (!o.details && r.hasProgramDateTime && h.hasProgramDateTime)
        wt(r, h), l = r.fragments[0].start;
      else {
        var c;
        l = this.alignPlaylists(r, o.details, (c = this.levelLastLoaded) == null ? void 0 : c.details);
      }
    }
    o.details = r, this.levelLastLoaded = o, !this.startFragRequested && (this.mainDetails || !r.live) && this.setStartPosition(o.details, l), this.state === C.WAITING_TRACK && !this.waitForCdnTuneIn(r) && (this.state = C.IDLE), this.tick();
  }
  _handleFragmentLoadProgress(e) {
    var t;
    const {
      frag: s,
      part: i,
      payload: r
    } = e, {
      config: n,
      trackId: o,
      levels: l
    } = this;
    if (!l) {
      this.warn(`Audio tracks were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
      return;
    }
    const c = l[o];
    if (!c) {
      this.warn("Audio track is undefined on fragment load progress");
      return;
    }
    const h = c.details;
    if (!h) {
      this.warn("Audio track details undefined on fragment load progress"), this.removeUnbufferedFrags(s.start);
      return;
    }
    const u = n.defaultAudioCodec || c.audioCodec || "mp4a.40.2";
    let d = this.transmuxer;
    d || (d = this.transmuxer = new Ir(this.hls, N.AUDIO, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)));
    const g = this.initPTS[s.cc], f = (t = s.initSegment) == null ? void 0 : t.data;
    if (g !== void 0) {
      const T = i ? i.index : -1, E = T !== -1, y = new As(s.level, s.sn, s.stats.chunkCount, r.byteLength, T, E);
      d.push(r, f, u, "", s, i, h.totalduration, !1, y, g);
    } else {
      this.log(`Unknown video PTS for cc ${s.cc}, waiting for video PTS before demuxing audio frag ${s.sn} of [${h.startSN} ,${h.endSN}],track ${o}`);
      const {
        cache: p
      } = this.waitingData = this.waitingData || {
        frag: s,
        part: i,
        cache: new hr(),
        complete: !1
      };
      p.push(new Uint8Array(r)), this.waitingVideoCC = this.videoTrackCC, this.state = C.WAITING_INIT_PTS;
    }
  }
  _handleFragmentLoadComplete(e) {
    if (this.waitingData) {
      this.waitingData.complete = !0;
      return;
    }
    super._handleFragmentLoadComplete(e);
  }
  onBufferReset() {
    this.mediaBuffer = this.videoBuffer = null, this.loadedmetadata = !1;
  }
  onBufferCreated(e, t) {
    const s = t.tracks.audio;
    s && (this.mediaBuffer = s.buffer || null), t.tracks.video && (this.videoBuffer = t.tracks.video.buffer || null);
  }
  onFragBuffered(e, t) {
    const {
      frag: s,
      part: i
    } = t;
    if (s.type !== N.AUDIO) {
      if (!this.loadedmetadata && s.type === N.MAIN) {
        const r = this.videoBuffer || this.media;
        r && Q.getBuffered(r).length && (this.loadedmetadata = !0);
      }
      return;
    }
    if (this.fragContextChanged(s)) {
      this.warn(`Fragment ${s.sn}${i ? " p: " + i.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}, audioSwitch: ${this.switchingTrack ? this.switchingTrack.name : "false"}`);
      return;
    }
    if (s.sn !== "initSegment") {
      this.fragPrevious = s;
      const r = this.switchingTrack;
      r && (this.bufferedTrack = r, this.switchingTrack = null, this.hls.trigger(m.AUDIO_TRACK_SWITCHED, le({}, r)));
    }
    this.fragBufferedComplete(s, i);
  }
  onError(e, t) {
    var s;
    if (t.fatal) {
      this.state = C.ERROR;
      return;
    }
    switch (t.details) {
      case L.FRAG_GAP:
      case L.FRAG_PARSING_ERROR:
      case L.FRAG_DECRYPT_ERROR:
      case L.FRAG_LOAD_ERROR:
      case L.FRAG_LOAD_TIMEOUT:
      case L.KEY_LOAD_ERROR:
      case L.KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(N.AUDIO, t);
        break;
      case L.AUDIO_TRACK_LOAD_ERROR:
      case L.AUDIO_TRACK_LOAD_TIMEOUT:
      case L.LEVEL_PARSING_ERROR:
        !t.levelRetry && this.state === C.WAITING_TRACK && ((s = t.context) == null ? void 0 : s.type) === q.AUDIO_TRACK && (this.state = C.IDLE);
        break;
      case L.BUFFER_APPEND_ERROR:
      case L.BUFFER_FULL_ERROR:
        if (!t.parent || t.parent !== "audio")
          return;
        if (t.details === L.BUFFER_APPEND_ERROR) {
          this.resetLoadingState();
          return;
        }
        this.reduceLengthAndFlushBuffer(t) && (this.bufferedTrack = null, super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"));
        break;
      case L.INTERNAL_EXCEPTION:
        this.recoverWorkerError(t);
        break;
    }
  }
  onBufferFlushing(e, {
    type: t
  }) {
    t !== X.VIDEO && (this.flushing = !0);
  }
  onBufferFlushed(e, {
    type: t
  }) {
    if (t !== X.VIDEO) {
      this.flushing = !1, this.bufferFlushed = !0, this.state === C.ENDED && (this.state = C.IDLE);
      const s = this.mediaBuffer || this.media;
      s && (this.afterBufferFlushed(s, t, N.AUDIO), this.tick());
    }
  }
  _handleTransmuxComplete(e) {
    var t;
    const s = "audio", {
      hls: i
    } = this, {
      remuxResult: r,
      chunkMeta: n
    } = e, o = this.getCurrentContext(n);
    if (!o) {
      this.resetWhenMissingContext(n);
      return;
    }
    const {
      frag: l,
      part: c,
      level: h
    } = o, {
      details: u
    } = h, {
      audio: d,
      text: g,
      id3: f,
      initSegment: p
    } = r;
    if (this.fragContextChanged(l) || !u) {
      this.fragmentTracker.removeFragment(l);
      return;
    }
    if (this.state = C.PARSING, this.switchingTrack && d && this.completeAudioSwitch(this.switchingTrack), p != null && p.tracks) {
      const T = l.initSegment || l;
      this._bufferInitSegment(h, p.tracks, T, n), i.trigger(m.FRAG_PARSING_INIT_SEGMENT, {
        frag: T,
        id: s,
        tracks: p.tracks
      });
    }
    if (d) {
      const {
        startPTS: T,
        endPTS: E,
        startDTS: y,
        endDTS: x
      } = d;
      c && (c.elementaryStreams[X.AUDIO] = {
        startPTS: T,
        endPTS: E,
        startDTS: y,
        endDTS: x
      }), l.setElementaryStreamInfo(X.AUDIO, T, E, y, x), this.bufferFragmentData(d, l, c, n);
    }
    if (f != null && (t = f.samples) != null && t.length) {
      const T = se({
        id: s,
        frag: l,
        details: u
      }, f);
      i.trigger(m.FRAG_PARSING_METADATA, T);
    }
    if (g) {
      const T = se({
        id: s,
        frag: l,
        details: u
      }, g);
      i.trigger(m.FRAG_PARSING_USERDATA, T);
    }
  }
  _bufferInitSegment(e, t, s, i) {
    if (this.state !== C.PARSING)
      return;
    t.video && delete t.video;
    const r = t.audio;
    if (!r)
      return;
    r.id = "audio";
    const n = e.audioCodec;
    this.log(`Init audio buffer, container:${r.container}, codecs[level/parsed]=[${n}/${r.codec}]`), n && n.split(",").length === 1 && (r.levelCodec = n), this.hls.trigger(m.BUFFER_CODECS, t);
    const o = r.initSegment;
    if (o != null && o.byteLength) {
      const l = {
        type: "audio",
        frag: s,
        part: null,
        chunkMeta: i,
        parent: s.type,
        data: o
      };
      this.hls.trigger(m.BUFFER_APPENDING, l);
    }
    this.tickImmediate();
  }
  loadFragment(e, t, s) {
    const i = this.fragmentTracker.getState(e);
    if (this.fragCurrent = e, this.switchingTrack || i === oe.NOT_LOADED || i === oe.PARTIAL) {
      var r;
      if (e.sn === "initSegment")
        this._loadInitSegment(e, t);
      else if ((r = t.details) != null && r.live && !this.initPTS[e.cc]) {
        this.log(`Waiting for video PTS in continuity counter ${e.cc} of live stream before loading audio fragment ${e.sn} of level ${this.trackId}`), this.state = C.WAITING_INIT_PTS;
        const n = this.mainDetails;
        n && n.fragments[0].start !== t.details.fragments[0].start && wt(t.details, n);
      } else
        this.startFragRequested = !0, super.loadFragment(e, t, s);
    } else
      this.clearTrackerIfNeeded(e);
  }
  flushAudioIfNeeded(e) {
    const {
      media: t,
      bufferedTrack: s
    } = this, i = s == null ? void 0 : s.attrs, r = e.attrs;
    t && i && (i.CHANNELS !== r.CHANNELS || s.name !== e.name || s.lang !== e.lang) && (this.log("Switching audio track : flushing all audio"), super.flushMainBuffer(0, Number.POSITIVE_INFINITY, "audio"), this.bufferedTrack = null);
  }
  completeAudioSwitch(e) {
    const {
      hls: t
    } = this;
    this.flushAudioIfNeeded(e), this.bufferedTrack = e, this.switchingTrack = null, t.trigger(m.AUDIO_TRACK_SWITCHED, le({}, e));
  }
}
class bo extends vs {
  constructor(e) {
    super(e, "[audio-track-controller]"), this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.registerListeners();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_PARSED, this.onManifestParsed, this), e.on(m.LEVEL_LOADING, this.onLevelLoading, this), e.on(m.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(m.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.on(m.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_PARSED, this.onManifestParsed, this), e.off(m.LEVEL_LOADING, this.onLevelLoading, this), e.off(m.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(m.AUDIO_TRACK_LOADED, this.onAudioTrackLoaded, this), e.off(m.ERROR, this.onError, this);
  }
  destroy() {
    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.currentTrack = null, super.destroy();
  }
  onManifestLoading() {
    this.tracks = [], this.tracksInGroup = [], this.groupIds = null, this.currentTrack = null, this.trackId = -1, this.selectDefaultTrack = !0;
  }
  onManifestParsed(e, t) {
    this.tracks = t.audioTracks || [];
  }
  onAudioTrackLoaded(e, t) {
    const {
      id: s,
      groupId: i,
      details: r
    } = t, n = this.tracksInGroup[s];
    if (!n || n.groupId !== i) {
      this.warn(`Audio track with id:${s} and group:${i} not found in active group ${n == null ? void 0 : n.groupId}`);
      return;
    }
    const o = n.details;
    n.details = t.details, this.log(`Audio track ${s} "${n.name}" lang:${n.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
  }
  onLevelLoading(e, t) {
    this.switchLevel(t.level);
  }
  onLevelSwitching(e, t) {
    this.switchLevel(t.level);
  }
  switchLevel(e) {
    const t = this.hls.levels[e];
    if (!t)
      return;
    const s = t.audioGroups || null, i = this.groupIds;
    let r = this.currentTrack;
    if (!s || (i == null ? void 0 : i.length) !== (s == null ? void 0 : s.length) || s != null && s.some((o) => (i == null ? void 0 : i.indexOf(o)) === -1)) {
      this.groupIds = s, this.trackId = -1, this.currentTrack = null;
      const o = this.tracks.filter((d) => !s || s.indexOf(d.groupId) !== -1);
      if (o.length)
        this.selectDefaultTrack && !o.some((d) => d.default) && (this.selectDefaultTrack = !1), o.forEach((d, g) => {
          d.id = g;
        });
      else if (!r && !this.tracksInGroup.length)
        return;
      this.tracksInGroup = o;
      const l = this.hls.config.audioPreference;
      if (!r && l) {
        const d = Le(l, o, Be);
        if (d > -1)
          r = o[d];
        else {
          const g = Le(l, this.tracks);
          r = this.tracks[g];
        }
      }
      let c = this.findTrackId(r);
      c === -1 && r && (c = this.findTrackId(null));
      const h = {
        audioTracks: o
      };
      this.log(`Updating audio tracks, ${o.length} track(s) found in group(s): ${s == null ? void 0 : s.join(",")}`), this.hls.trigger(m.AUDIO_TRACKS_UPDATED, h);
      const u = this.trackId;
      if (c !== -1 && u === -1)
        this.setAudioTrack(c);
      else if (o.length && u === -1) {
        var n;
        const d = new Error(`No audio track selected for current audio group-ID(s): ${(n = this.groupIds) == null ? void 0 : n.join(",")} track count: ${o.length}`);
        this.warn(d.message), this.hls.trigger(m.ERROR, {
          type: U.MEDIA_ERROR,
          details: L.AUDIO_TRACK_LOAD_ERROR,
          fatal: !0,
          error: d
        });
      }
    } else
      this.shouldReloadPlaylist(r) && this.setAudioTrack(this.trackId);
  }
  onError(e, t) {
    t.fatal || !t.context || t.context.type === q.AUDIO_TRACK && t.context.id === this.trackId && (!this.groupIds || this.groupIds.indexOf(t.context.groupId) !== -1) && (this.requestScheduled = -1, this.checkRetry(t));
  }
  get allAudioTracks() {
    return this.tracks;
  }
  get audioTracks() {
    return this.tracksInGroup;
  }
  get audioTrack() {
    return this.trackId;
  }
  set audioTrack(e) {
    this.selectDefaultTrack = !1, this.setAudioTrack(e);
  }
  setAudioOption(e) {
    const t = this.hls;
    if (t.config.audioPreference = e, e) {
      const s = this.allAudioTracks;
      if (this.selectDefaultTrack = !1, s.length) {
        const i = this.currentTrack;
        if (i && Ye(e, i, Be))
          return i;
        const r = Le(e, this.tracksInGroup, Be);
        if (r > -1) {
          const n = this.tracksInGroup[r];
          return this.setAudioTrack(r), n;
        } else if (i) {
          let n = t.loadLevel;
          n === -1 && (n = t.firstAutoLevel);
          const o = Ia(e, t.levels, s, n, Be);
          if (o === -1)
            return null;
          t.nextLoadLevel = o;
        }
        if (e.channels || e.audioCodec) {
          const n = Le(e, s);
          if (n > -1)
            return s[n];
        }
      }
    }
    return null;
  }
  setAudioTrack(e) {
    const t = this.tracksInGroup;
    if (e < 0 || e >= t.length) {
      this.warn(`Invalid audio track id: ${e}`);
      return;
    }
    this.clearTimer(), this.selectDefaultTrack = !1;
    const s = this.currentTrack, i = t[e], r = i.details && !i.details.live;
    if (e === this.trackId && i === s && r || (this.log(`Switching to audio-track ${e} "${i.name}" lang:${i.lang} group:${i.groupId} channels:${i.channels}`), this.trackId = e, this.currentTrack = i, this.hls.trigger(m.AUDIO_TRACK_SWITCHING, le({}, i)), r))
      return;
    const n = this.switchParams(i.url, s == null ? void 0 : s.details);
    this.loadPlaylist(n);
  }
  findTrackId(e) {
    const t = this.tracksInGroup;
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      if (!(this.selectDefaultTrack && !i.default) && (!e || Ye(e, i, Be)))
        return s;
    }
    if (e) {
      const {
        name: s,
        lang: i,
        assocLang: r,
        characteristics: n,
        audioCodec: o,
        channels: l
      } = e;
      for (let c = 0; c < t.length; c++) {
        const h = t[c];
        if (Ye({
          name: s,
          lang: i,
          assocLang: r,
          characteristics: n,
          audioCodec: o,
          channels: l
        }, h, Be))
          return c;
      }
      for (let c = 0; c < t.length; c++) {
        const h = t[c];
        if (Xe(e.attrs, h.attrs, ["LANGUAGE", "ASSOC-LANGUAGE", "CHARACTERISTICS"]))
          return c;
      }
      for (let c = 0; c < t.length; c++) {
        const h = t[c];
        if (Xe(e.attrs, h.attrs, ["LANGUAGE"]))
          return c;
      }
    }
    return -1;
  }
  loadPlaylist(e) {
    const t = this.currentTrack;
    if (this.shouldLoadPlaylist(t) && t) {
      super.loadPlaylist();
      const s = t.id, i = t.groupId;
      let r = t.url;
      if (e)
        try {
          r = e.addDirectives(r);
        } catch (n) {
          this.warn(`Could not construct new URL with HLS Delivery Directives: ${n}`);
        }
      this.log(`loading audio-track playlist ${s} "${t.name}" lang:${t.lang} group:${i}`), this.clearTimer(), this.hls.trigger(m.AUDIO_TRACK_LOADING, {
        url: r,
        id: s,
        groupId: i,
        deliveryDirectives: e || null
      });
    }
  }
}
const yi = 500;
class Do extends Rs {
  constructor(e, t, s) {
    super(e, t, s, "[subtitle-stream-controller]", N.SUBTITLE), this.currentTrackId = -1, this.tracksBuffered = [], this.mainDetails = null, this._registerListeners();
  }
  onHandlerDestroying() {
    this._unregisterListeners(), super.onHandlerDestroying(), this.mainDetails = null;
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.LEVEL_LOADED, this.onLevelLoaded, this), e.on(m.ERROR, this.onError, this), e.on(m.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(m.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.on(m.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.on(m.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), e.on(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(m.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.LEVEL_LOADED, this.onLevelLoaded, this), e.off(m.ERROR, this.onError, this), e.off(m.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(m.SUBTITLE_TRACK_SWITCH, this.onSubtitleTrackSwitch, this), e.off(m.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.off(m.SUBTITLE_FRAG_PROCESSED, this.onSubtitleFragProcessed, this), e.off(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(m.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  startLoad(e) {
    this.stopLoad(), this.state = C.IDLE, this.setInterval(yi), this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
  }
  onManifestLoading() {
    this.mainDetails = null, this.fragmentTracker.removeAllFragments();
  }
  onMediaDetaching() {
    this.tracksBuffered = [], super.onMediaDetaching();
  }
  onLevelLoaded(e, t) {
    this.mainDetails = t.details;
  }
  onSubtitleFragProcessed(e, t) {
    const {
      frag: s,
      success: i
    } = t;
    if (this.fragPrevious = s, this.state = C.IDLE, !i)
      return;
    const r = this.tracksBuffered[this.currentTrackId];
    if (!r)
      return;
    let n;
    const o = s.start;
    for (let c = 0; c < r.length; c++)
      if (o >= r[c].start && o <= r[c].end) {
        n = r[c];
        break;
      }
    const l = s.start + s.duration;
    n ? n.end = l : (n = {
      start: o,
      end: l
    }, r.push(n)), this.fragmentTracker.fragBuffered(s), this.fragBufferedComplete(s, null);
  }
  onBufferFlushing(e, t) {
    const {
      startOffset: s,
      endOffset: i
    } = t;
    if (s === 0 && i !== Number.POSITIVE_INFINITY) {
      const r = i - 1;
      if (r <= 0)
        return;
      t.endOffsetSubtitles = Math.max(0, r), this.tracksBuffered.forEach((n) => {
        for (let o = 0; o < n.length; ) {
          if (n[o].end <= r) {
            n.shift();
            continue;
          } else if (n[o].start < r)
            n[o].start = r;
          else
            break;
          o++;
        }
      }), this.fragmentTracker.removeFragmentsInRange(s, r, N.SUBTITLE);
    }
  }
  onFragBuffered(e, t) {
    if (!this.loadedmetadata && t.frag.type === N.MAIN) {
      var s;
      (s = this.media) != null && s.buffered.length && (this.loadedmetadata = !0);
    }
  }
  // If something goes wrong, proceed to next frag, if we were processing one.
  onError(e, t) {
    const s = t.frag;
    (s == null ? void 0 : s.type) === N.SUBTITLE && (this.fragCurrent && this.fragCurrent.abortRequests(), this.state !== C.STOPPED && (this.state = C.IDLE));
  }
  // Got all new subtitle levels.
  onSubtitleTracksUpdated(e, {
    subtitleTracks: t
  }) {
    if (!this.levels || br(this.levels, t)) {
      this.levels = t.map((s) => new ze(s));
      return;
    }
    this.tracksBuffered = [], this.levels = t.map((s) => {
      const i = new ze(s);
      return this.tracksBuffered[i.id] = [], i;
    }), this.fragmentTracker.removeFragmentsInRange(0, Number.POSITIVE_INFINITY, N.SUBTITLE), this.fragPrevious = null, this.mediaBuffer = null;
  }
  onSubtitleTrackSwitch(e, t) {
    var s;
    if (this.currentTrackId = t.id, !((s = this.levels) != null && s.length) || this.currentTrackId === -1) {
      this.clearInterval();
      return;
    }
    const i = this.levels[this.currentTrackId];
    i != null && i.details ? this.mediaBuffer = this.mediaBufferTimeRanges : this.mediaBuffer = null, i && this.setInterval(yi);
  }
  // Got a new set of subtitle fragments.
  onSubtitleTrackLoaded(e, t) {
    var s;
    const {
      currentTrackId: i,
      levels: r
    } = this, {
      details: n,
      id: o
    } = t;
    if (!r) {
      this.warn(`Subtitle tracks were reset while loading level ${o}`);
      return;
    }
    const l = r[i];
    if (o >= r.length || o !== i || !l)
      return;
    this.log(`Subtitle track ${o} loaded [${n.startSN},${n.endSN}]${n.lastPartSn ? `[part-${n.lastPartSn}-${n.lastPartIndex}]` : ""},duration:${n.totalduration}`), this.mediaBuffer = this.mediaBufferTimeRanges;
    let c = 0;
    if (n.live || (s = l.details) != null && s.live) {
      const u = this.mainDetails;
      if (n.deltaUpdateFailed || !u)
        return;
      const d = u.fragments[0];
      if (!l.details)
        n.hasProgramDateTime && u.hasProgramDateTime ? (wt(n, u), c = n.fragments[0].start) : d && (c = d.start, ls(n, c));
      else {
        var h;
        c = this.alignPlaylists(n, l.details, (h = this.levelLastLoaded) == null ? void 0 : h.details), c === 0 && d && (c = d.start, ls(n, c));
      }
    }
    l.details = n, this.levelLastLoaded = l, !this.startFragRequested && (this.mainDetails || !n.live) && this.setStartPosition(l.details, c), this.tick(), n.live && !this.fragCurrent && this.media && this.state === C.IDLE && (Ct(null, n.fragments, this.media.currentTime, 0) || (this.warn("Subtitle playlist not aligned with playback"), l.details = void 0));
  }
  _handleFragmentLoadComplete(e) {
    const {
      frag: t,
      payload: s
    } = e, i = t.decryptdata, r = this.hls;
    if (!this.fragContextChanged(t) && s && s.byteLength > 0 && i != null && i.key && i.iv && i.method === "AES-128") {
      const n = performance.now();
      this.decrypter.decrypt(new Uint8Array(s), i.key.buffer, i.iv.buffer).catch((o) => {
        throw r.trigger(m.ERROR, {
          type: U.MEDIA_ERROR,
          details: L.FRAG_DECRYPT_ERROR,
          fatal: !1,
          error: o,
          reason: o.message,
          frag: t
        }), o;
      }).then((o) => {
        const l = performance.now();
        r.trigger(m.FRAG_DECRYPTED, {
          frag: t,
          payload: o,
          stats: {
            tstart: n,
            tdecrypt: l
          }
        });
      }).catch((o) => {
        this.warn(`${o.name}: ${o.message}`), this.state = C.IDLE;
      });
    }
  }
  doTick() {
    if (!this.media) {
      this.state = C.IDLE;
      return;
    }
    if (this.state === C.IDLE) {
      const {
        currentTrackId: e,
        levels: t
      } = this, s = t == null ? void 0 : t[e];
      if (!s || !t.length || !s.details)
        return;
      const {
        config: i
      } = this, r = this.getLoadPosition(), n = Q.bufferedInfo(this.tracksBuffered[this.currentTrackId] || [], r, i.maxBufferHole), {
        end: o,
        len: l
      } = n, c = this.getFwdBufferInfo(this.media, N.MAIN), h = s.details, u = this.getMaxBufferLength(c == null ? void 0 : c.len) + h.levelTargetDuration;
      if (l > u)
        return;
      const d = h.fragments, g = d.length, f = h.edge;
      let p = null;
      const T = this.fragPrevious;
      if (o < f) {
        const E = i.maxFragLookUpTolerance, y = o > f - E ? 0 : E;
        p = Ct(T, d, Math.max(d[0].start, o), y), !p && T && T.start < d[0].start && (p = d[0]);
      } else
        p = d[g - 1];
      if (!p)
        return;
      if (p = this.mapToInitFragWhenRequired(p), p.sn !== "initSegment") {
        const E = p.sn - h.startSN, y = d[E - 1];
        y && y.cc === p.cc && this.fragmentTracker.getState(y) === oe.NOT_LOADED && (p = y);
      }
      this.fragmentTracker.getState(p) === oe.NOT_LOADED && this.loadFragment(p, s, o);
    }
  }
  getMaxBufferLength(e) {
    const t = super.getMaxBufferLength();
    return e ? Math.max(t, e) : t;
  }
  loadFragment(e, t, s) {
    this.fragCurrent = e, e.sn === "initSegment" ? this._loadInitSegment(e, t) : (this.startFragRequested = !0, super.loadFragment(e, t, s));
  }
  get mediaBufferTimeRanges() {
    return new Co(this.tracksBuffered[this.currentTrackId] || []);
  }
}
class Co {
  constructor(e) {
    this.buffered = void 0;
    const t = (s, i, r) => {
      if (i = i >>> 0, i > r - 1)
        throw new DOMException(`Failed to execute '${s}' on 'TimeRanges': The index provided (${i}) is greater than the maximum bound (${r})`);
      return e[i][s];
    };
    this.buffered = {
      get length() {
        return e.length;
      },
      end(s) {
        return t("end", s, e.length);
      },
      start(s) {
        return t("start", s, e.length);
      }
    };
  }
}
class wo extends vs {
  constructor(e) {
    super(e, "[subtitle-track-controller]"), this.media = null, this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0, this.queuedDefaultTrack = -1, this.asyncPollTrackChange = () => this.pollTrackChange(0), this.useTextTrackPolling = !1, this.subtitlePollingInterval = -1, this._subtitleDisplay = !0, this.onTextTracksChanged = () => {
      if (this.useTextTrackPolling || self.clearInterval(this.subtitlePollingInterval), !this.media || !this.hls.config.renderTextTracksNatively)
        return;
      let t = null;
      const s = mt(this.media.textTracks);
      for (let r = 0; r < s.length; r++)
        if (s[r].mode === "hidden")
          t = s[r];
        else if (s[r].mode === "showing") {
          t = s[r];
          break;
        }
      const i = this.findTrackForTextTrack(t);
      this.subtitleTrack !== i && this.setSubtitleTrack(i);
    }, this.registerListeners();
  }
  destroy() {
    this.unregisterListeners(), this.tracks.length = 0, this.tracksInGroup.length = 0, this.currentTrack = null, this.onTextTracksChanged = this.asyncPollTrackChange = null, super.destroy();
  }
  get subtitleDisplay() {
    return this._subtitleDisplay;
  }
  set subtitleDisplay(e) {
    this._subtitleDisplay = e, this.trackId > -1 && this.toggleTrackModes();
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_PARSED, this.onManifestParsed, this), e.on(m.LEVEL_LOADING, this.onLevelLoading, this), e.on(m.LEVEL_SWITCHING, this.onLevelSwitching, this), e.on(m.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.on(m.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_PARSED, this.onManifestParsed, this), e.off(m.LEVEL_LOADING, this.onLevelLoading, this), e.off(m.LEVEL_SWITCHING, this.onLevelSwitching, this), e.off(m.SUBTITLE_TRACK_LOADED, this.onSubtitleTrackLoaded, this), e.off(m.ERROR, this.onError, this);
  }
  // Listen for subtitle track change, then extract the current track ID.
  onMediaAttached(e, t) {
    this.media = t.media, this.media && (this.queuedDefaultTrack > -1 && (this.subtitleTrack = this.queuedDefaultTrack, this.queuedDefaultTrack = -1), this.useTextTrackPolling = !(this.media.textTracks && "onchange" in this.media.textTracks), this.useTextTrackPolling ? this.pollTrackChange(500) : this.media.textTracks.addEventListener("change", this.asyncPollTrackChange));
  }
  pollTrackChange(e) {
    self.clearInterval(this.subtitlePollingInterval), this.subtitlePollingInterval = self.setInterval(this.onTextTracksChanged, e);
  }
  onMediaDetaching() {
    if (!this.media)
      return;
    self.clearInterval(this.subtitlePollingInterval), this.useTextTrackPolling || this.media.textTracks.removeEventListener("change", this.asyncPollTrackChange), this.trackId > -1 && (this.queuedDefaultTrack = this.trackId), mt(this.media.textTracks).forEach((t) => {
      He(t);
    }), this.subtitleTrack = -1, this.media = null;
  }
  onManifestLoading() {
    this.tracks = [], this.groupIds = null, this.tracksInGroup = [], this.trackId = -1, this.currentTrack = null, this.selectDefaultTrack = !0;
  }
  // Fired whenever a new manifest is loaded.
  onManifestParsed(e, t) {
    this.tracks = t.subtitleTracks;
  }
  onSubtitleTrackLoaded(e, t) {
    const {
      id: s,
      groupId: i,
      details: r
    } = t, n = this.tracksInGroup[s];
    if (!n || n.groupId !== i) {
      this.warn(`Subtitle track with id:${s} and group:${i} not found in active group ${n == null ? void 0 : n.groupId}`);
      return;
    }
    const o = n.details;
    n.details = t.details, this.log(`Subtitle track ${s} "${n.name}" lang:${n.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`), s === this.trackId && this.playlistLoaded(s, t, o);
  }
  onLevelLoading(e, t) {
    this.switchLevel(t.level);
  }
  onLevelSwitching(e, t) {
    this.switchLevel(t.level);
  }
  switchLevel(e) {
    const t = this.hls.levels[e];
    if (!t)
      return;
    const s = t.subtitleGroups || null, i = this.groupIds;
    let r = this.currentTrack;
    if (!s || (i == null ? void 0 : i.length) !== (s == null ? void 0 : s.length) || s != null && s.some((n) => (i == null ? void 0 : i.indexOf(n)) === -1)) {
      this.groupIds = s, this.trackId = -1, this.currentTrack = null;
      const n = this.tracks.filter((h) => !s || s.indexOf(h.groupId) !== -1);
      if (n.length)
        this.selectDefaultTrack && !n.some((h) => h.default) && (this.selectDefaultTrack = !1), n.forEach((h, u) => {
          h.id = u;
        });
      else if (!r && !this.tracksInGroup.length)
        return;
      this.tracksInGroup = n;
      const o = this.hls.config.subtitlePreference;
      if (!r && o) {
        this.selectDefaultTrack = !1;
        const h = Le(o, n);
        if (h > -1)
          r = n[h];
        else {
          const u = Le(o, this.tracks);
          r = this.tracks[u];
        }
      }
      let l = this.findTrackId(r);
      l === -1 && r && (l = this.findTrackId(null));
      const c = {
        subtitleTracks: n
      };
      this.log(`Updating subtitle tracks, ${n.length} track(s) found in "${s == null ? void 0 : s.join(",")}" group-id`), this.hls.trigger(m.SUBTITLE_TRACKS_UPDATED, c), l !== -1 && this.trackId === -1 && this.setSubtitleTrack(l);
    } else
      this.shouldReloadPlaylist(r) && this.setSubtitleTrack(this.trackId);
  }
  findTrackId(e) {
    const t = this.tracksInGroup, s = this.selectDefaultTrack;
    for (let i = 0; i < t.length; i++) {
      const r = t[i];
      if (!(s && !r.default || !s && !e) && (!e || Ye(r, e)))
        return i;
    }
    if (e) {
      for (let i = 0; i < t.length; i++) {
        const r = t[i];
        if (Xe(e.attrs, r.attrs, ["LANGUAGE", "ASSOC-LANGUAGE", "CHARACTERISTICS"]))
          return i;
      }
      for (let i = 0; i < t.length; i++) {
        const r = t[i];
        if (Xe(e.attrs, r.attrs, ["LANGUAGE"]))
          return i;
      }
    }
    return -1;
  }
  findTrackForTextTrack(e) {
    if (e) {
      const t = this.tracksInGroup;
      for (let s = 0; s < t.length; s++) {
        const i = t[s];
        if (us(i, e))
          return s;
      }
    }
    return -1;
  }
  onError(e, t) {
    t.fatal || !t.context || t.context.type === q.SUBTITLE_TRACK && t.context.id === this.trackId && (!this.groupIds || this.groupIds.indexOf(t.context.groupId) !== -1) && this.checkRetry(t);
  }
  get allSubtitleTracks() {
    return this.tracks;
  }
  /** get alternate subtitle tracks list from playlist **/
  get subtitleTracks() {
    return this.tracksInGroup;
  }
  /** get/set index of the selected subtitle track (based on index in subtitle track lists) **/
  get subtitleTrack() {
    return this.trackId;
  }
  set subtitleTrack(e) {
    this.selectDefaultTrack = !1, this.setSubtitleTrack(e);
  }
  setSubtitleOption(e) {
    if (this.hls.config.subtitlePreference = e, e) {
      const t = this.allSubtitleTracks;
      if (this.selectDefaultTrack = !1, t.length) {
        const s = this.currentTrack;
        if (s && Ye(e, s))
          return s;
        const i = Le(e, this.tracksInGroup);
        if (i > -1) {
          const r = this.tracksInGroup[i];
          return this.setSubtitleTrack(i), r;
        } else {
          if (s)
            return null;
          {
            const r = Le(e, t);
            if (r > -1)
              return t[r];
          }
        }
      }
    }
    return null;
  }
  loadPlaylist(e) {
    super.loadPlaylist();
    const t = this.currentTrack;
    if (this.shouldLoadPlaylist(t) && t) {
      const s = t.id, i = t.groupId;
      let r = t.url;
      if (e)
        try {
          r = e.addDirectives(r);
        } catch (n) {
          this.warn(`Could not construct new URL with HLS Delivery Directives: ${n}`);
        }
      this.log(`Loading subtitle playlist for id ${s}`), this.hls.trigger(m.SUBTITLE_TRACK_LOADING, {
        url: r,
        id: s,
        groupId: i,
        deliveryDirectives: e || null
      });
    }
  }
  /**
   * Disables the old subtitleTrack and sets current mode on the next subtitleTrack.
   * This operates on the DOM textTracks.
   * A value of -1 will disable all subtitle tracks.
   */
  toggleTrackModes() {
    const {
      media: e
    } = this;
    if (!e)
      return;
    const t = mt(e.textTracks), s = this.currentTrack;
    let i;
    if (s && (i = t.filter((r) => us(s, r))[0], i || this.warn(`Unable to find subtitle TextTrack with name "${s.name}" and language "${s.lang}"`)), [].slice.call(t).forEach((r) => {
      r.mode !== "disabled" && r !== i && (r.mode = "disabled");
    }), i) {
      const r = this.subtitleDisplay ? "showing" : "hidden";
      i.mode !== r && (i.mode = r);
    }
  }
  /**
   * This method is responsible for validating the subtitle index and periodically reloading if live.
   * Dispatches the SUBTITLE_TRACK_SWITCH event, which instructs the subtitle-stream-controller to load the selected track.
   */
  setSubtitleTrack(e) {
    const t = this.tracksInGroup;
    if (!this.media) {
      this.queuedDefaultTrack = e;
      return;
    }
    if (e < -1 || e >= t.length || !O(e)) {
      this.warn(`Invalid subtitle track id: ${e}`);
      return;
    }
    this.clearTimer(), this.selectDefaultTrack = !1;
    const s = this.currentTrack, i = t[e] || null;
    if (this.trackId = e, this.currentTrack = i, this.toggleTrackModes(), !i) {
      this.hls.trigger(m.SUBTITLE_TRACK_SWITCH, {
        id: e
      });
      return;
    }
    const r = !!i.details && !i.details.live;
    if (e === this.trackId && i === s && r)
      return;
    this.log(`Switching to subtitle-track ${e}` + (i ? ` "${i.name}" lang:${i.lang} group:${i.groupId}` : ""));
    const {
      id: n,
      groupId: o = "",
      name: l,
      type: c,
      url: h
    } = i;
    this.hls.trigger(m.SUBTITLE_TRACK_SWITCH, {
      id: n,
      groupId: o,
      name: l,
      type: c,
      url: h
    });
    const u = this.switchParams(i.url, s == null ? void 0 : s.details);
    this.loadPlaylist(u);
  }
}
class ko {
  constructor(e) {
    this.buffers = void 0, this.queues = {
      video: [],
      audio: [],
      audiovideo: []
    }, this.buffers = e;
  }
  append(e, t, s) {
    const i = this.queues[t];
    i.push(e), i.length === 1 && !s && this.executeNext(t);
  }
  insertAbort(e, t) {
    this.queues[t].unshift(e), this.executeNext(t);
  }
  appendBlocker(e) {
    let t;
    const s = new Promise((r) => {
      t = r;
    }), i = {
      execute: t,
      onStart: () => {
      },
      onComplete: () => {
      },
      onError: () => {
      }
    };
    return this.append(i, e), s;
  }
  executeNext(e) {
    const t = this.queues[e];
    if (t.length) {
      const s = t[0];
      try {
        s.execute();
      } catch (i) {
        v.warn(`[buffer-operation-queue]: Exception executing "${e}" SourceBuffer operation: ${i}`), s.onError(i);
        const r = this.buffers[e];
        r != null && r.updating || this.shiftAndExecuteNext(e);
      }
    }
  }
  shiftAndExecuteNext(e) {
    this.queues[e].shift(), this.executeNext(e);
  }
  current(e) {
    return this.queues[e][0];
  }
}
const xi = /(avc[1234]|hvc1|hev1|dvh[1e]|vp09|av01)(?:\.[^.,]+)+/;
class _o {
  constructor(e) {
    this.details = null, this._objectUrl = null, this.operationQueue = void 0, this.listeners = void 0, this.hls = void 0, this.bufferCodecEventsExpected = 0, this._bufferCodecEventsTotal = 0, this.media = null, this.mediaSource = null, this.lastMpegAudioChunk = null, this.appendSource = void 0, this.appendErrors = {
      audio: 0,
      video: 0,
      audiovideo: 0
    }, this.tracks = {}, this.pendingTracks = {}, this.sourceBuffer = void 0, this.log = void 0, this.warn = void 0, this.error = void 0, this._onEndStreaming = (s) => {
      this.hls && this.hls.pauseBuffering();
    }, this._onStartStreaming = (s) => {
      this.hls && this.hls.resumeBuffering();
    }, this._onMediaSourceOpen = () => {
      const {
        media: s,
        mediaSource: i
      } = this;
      this.log("Media source opened"), s && (s.removeEventListener("emptied", this._onMediaEmptied), this.updateMediaElementDuration(), this.hls.trigger(m.MEDIA_ATTACHED, {
        media: s,
        mediaSource: i
      })), i && i.removeEventListener("sourceopen", this._onMediaSourceOpen), this.checkPendingTracks();
    }, this._onMediaSourceClose = () => {
      this.log("Media source closed");
    }, this._onMediaSourceEnded = () => {
      this.log("Media source ended");
    }, this._onMediaEmptied = () => {
      const {
        mediaSrc: s,
        _objectUrl: i
      } = this;
      s !== i && v.error(`Media element src was set while attaching MediaSource (${i} > ${s})`);
    }, this.hls = e;
    const t = "[buffer-controller]";
    this.appendSource = e.config.preferManagedMediaSource, this.log = v.log.bind(v, t), this.warn = v.warn.bind(v, t), this.error = v.error.bind(v, t), this._initSourceBuffer(), this.registerListeners();
  }
  hasSourceTypes() {
    return this.getSourceBufferTypes().length > 0 || Object.keys(this.pendingTracks).length > 0;
  }
  destroy() {
    this.unregisterListeners(), this.details = null, this.lastMpegAudioChunk = null, this.hls = null;
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_PARSED, this.onManifestParsed, this), e.on(m.BUFFER_RESET, this.onBufferReset, this), e.on(m.BUFFER_APPENDING, this.onBufferAppending, this), e.on(m.BUFFER_CODECS, this.onBufferCodecs, this), e.on(m.BUFFER_EOS, this.onBufferEos, this), e.on(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.on(m.LEVEL_UPDATED, this.onLevelUpdated, this), e.on(m.FRAG_PARSED, this.onFragParsed, this), e.on(m.FRAG_CHANGED, this.onFragChanged, this);
  }
  unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_PARSED, this.onManifestParsed, this), e.off(m.BUFFER_RESET, this.onBufferReset, this), e.off(m.BUFFER_APPENDING, this.onBufferAppending, this), e.off(m.BUFFER_CODECS, this.onBufferCodecs, this), e.off(m.BUFFER_EOS, this.onBufferEos, this), e.off(m.BUFFER_FLUSHING, this.onBufferFlushing, this), e.off(m.LEVEL_UPDATED, this.onLevelUpdated, this), e.off(m.FRAG_PARSED, this.onFragParsed, this), e.off(m.FRAG_CHANGED, this.onFragChanged, this);
  }
  _initSourceBuffer() {
    this.sourceBuffer = {}, this.operationQueue = new ko(this.sourceBuffer), this.listeners = {
      audio: [],
      video: [],
      audiovideo: []
    }, this.appendErrors = {
      audio: 0,
      video: 0,
      audiovideo: 0
    }, this.lastMpegAudioChunk = null;
  }
  onManifestLoading() {
    this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = 0, this.details = null;
  }
  onManifestParsed(e, t) {
    let s = 2;
    (t.audio && !t.video || !t.altAudio) && (s = 1), this.bufferCodecEventsExpected = this._bufferCodecEventsTotal = s, this.log(`${this.bufferCodecEventsExpected} bufferCodec event(s) expected`);
  }
  onMediaAttaching(e, t) {
    const s = this.media = t.media, i = Je(this.appendSource);
    if (s && i) {
      var r;
      const n = this.mediaSource = new i();
      this.log(`created media source: ${(r = n.constructor) == null ? void 0 : r.name}`), n.addEventListener("sourceopen", this._onMediaSourceOpen), n.addEventListener("sourceended", this._onMediaSourceEnded), n.addEventListener("sourceclose", this._onMediaSourceClose), n.addEventListener("startstreaming", this._onStartStreaming), n.addEventListener("endstreaming", this._onEndStreaming);
      const o = this._objectUrl = self.URL.createObjectURL(n);
      if (this.appendSource)
        try {
          s.removeAttribute("src");
          const l = self.ManagedMediaSource;
          s.disableRemotePlayback = s.disableRemotePlayback || l && n instanceof l, Si(s), Po(s, o), s.load();
        } catch {
          s.src = o;
        }
      else
        s.src = o;
      s.addEventListener("emptied", this._onMediaEmptied);
    }
  }
  onMediaDetaching() {
    const {
      media: e,
      mediaSource: t,
      _objectUrl: s
    } = this;
    if (t) {
      if (this.log("media source detaching"), t.readyState === "open")
        try {
          t.endOfStream();
        } catch (i) {
          this.warn(`onMediaDetaching: ${i.message} while calling endOfStream`);
        }
      this.onBufferReset(), t.removeEventListener("sourceopen", this._onMediaSourceOpen), t.removeEventListener("sourceended", this._onMediaSourceEnded), t.removeEventListener("sourceclose", this._onMediaSourceClose), t.removeEventListener("startstreaming", this._onStartStreaming), t.removeEventListener("endstreaming", this._onEndStreaming), e && (e.removeEventListener("emptied", this._onMediaEmptied), s && self.URL.revokeObjectURL(s), this.mediaSrc === s ? (e.removeAttribute("src"), this.appendSource && Si(e), e.load()) : this.warn("media|source.src was changed by a third party - skip cleanup")), this.mediaSource = null, this.media = null, this._objectUrl = null, this.bufferCodecEventsExpected = this._bufferCodecEventsTotal, this.pendingTracks = {}, this.tracks = {};
    }
    this.hls.trigger(m.MEDIA_DETACHED, void 0);
  }
  onBufferReset() {
    this.getSourceBufferTypes().forEach((e) => {
      this.resetBuffer(e);
    }), this._initSourceBuffer();
  }
  resetBuffer(e) {
    const t = this.sourceBuffer[e];
    try {
      if (t) {
        var s;
        this.removeBufferListeners(e), this.sourceBuffer[e] = void 0, (s = this.mediaSource) != null && s.sourceBuffers.length && this.mediaSource.removeSourceBuffer(t);
      }
    } catch (i) {
      this.warn(`onBufferReset ${e}`, i);
    }
  }
  onBufferCodecs(e, t) {
    const s = this.getSourceBufferTypes().length, i = Object.keys(t);
    if (i.forEach((n) => {
      if (s) {
        const l = this.tracks[n];
        if (l && typeof l.buffer.changeType == "function") {
          var o;
          const {
            id: c,
            codec: h,
            levelCodec: u,
            container: d,
            metadata: g
          } = t[n], f = Vs(l.codec, l.levelCodec), p = f == null ? void 0 : f.replace(xi, "$1");
          let T = Vs(h, u);
          const E = (o = T) == null ? void 0 : o.replace(xi, "$1");
          if (T && p !== E) {
            n.slice(0, 5) === "audio" && (T = Rt(T, this.hls.config.preferManagedMediaSource));
            const y = `${d};codecs=${T}`;
            this.appendChangeType(n, y), this.log(`switching codec ${f} to ${T}`), this.tracks[n] = {
              buffer: l.buffer,
              codec: h,
              container: d,
              levelCodec: u,
              metadata: g,
              id: c
            };
          }
        }
      } else
        this.pendingTracks[n] = t[n];
    }), s)
      return;
    const r = Math.max(this.bufferCodecEventsExpected - 1, 0);
    this.bufferCodecEventsExpected !== r && (this.log(`${r} bufferCodec event(s) expected ${i.join(",")}`), this.bufferCodecEventsExpected = r), this.mediaSource && this.mediaSource.readyState === "open" && this.checkPendingTracks();
  }
  appendChangeType(e, t) {
    const {
      operationQueue: s
    } = this, i = {
      execute: () => {
        const r = this.sourceBuffer[e];
        r && (this.log(`changing ${e} sourceBuffer type to ${t}`), r.changeType(t)), s.shiftAndExecuteNext(e);
      },
      onStart: () => {
      },
      onComplete: () => {
      },
      onError: (r) => {
        this.warn(`Failed to change ${e} SourceBuffer type`, r);
      }
    };
    s.append(i, e, !!this.pendingTracks[e]);
  }
  onBufferAppending(e, t) {
    const {
      hls: s,
      operationQueue: i,
      tracks: r
    } = this, {
      data: n,
      type: o,
      frag: l,
      part: c,
      chunkMeta: h
    } = t, u = h.buffering[o], d = self.performance.now();
    u.start = d;
    const g = l.stats.buffering, f = c ? c.stats.buffering : null;
    g.start === 0 && (g.start = d), f && f.start === 0 && (f.start = d);
    const p = r.audio;
    let T = !1;
    o === "audio" && (p == null ? void 0 : p.container) === "audio/mpeg" && (T = !this.lastMpegAudioChunk || h.id === 1 || this.lastMpegAudioChunk.sn !== h.sn, this.lastMpegAudioChunk = h);
    const E = l.start, y = {
      execute: () => {
        if (u.executeStart = self.performance.now(), T) {
          const x = this.sourceBuffer[o];
          if (x) {
            const I = E - x.timestampOffset;
            Math.abs(I) >= 0.1 && (this.log(`Updating audio SourceBuffer timestampOffset to ${E} (delta: ${I}) sn: ${l.sn})`), x.timestampOffset = E);
          }
        }
        this.appendExecutor(n, o);
      },
      onStart: () => {
      },
      onComplete: () => {
        const x = self.performance.now();
        u.executeEnd = u.end = x, g.first === 0 && (g.first = x), f && f.first === 0 && (f.first = x);
        const {
          sourceBuffer: I
        } = this, S = {};
        for (const D in I)
          S[D] = Q.getBuffered(I[D]);
        this.appendErrors[o] = 0, o === "audio" || o === "video" ? this.appendErrors.audiovideo = 0 : (this.appendErrors.audio = 0, this.appendErrors.video = 0), this.hls.trigger(m.BUFFER_APPENDED, {
          type: o,
          frag: l,
          part: c,
          chunkMeta: h,
          parent: l.type,
          timeRanges: S
        });
      },
      onError: (x) => {
        const I = {
          type: U.MEDIA_ERROR,
          parent: l.type,
          details: L.BUFFER_APPEND_ERROR,
          sourceBufferName: o,
          frag: l,
          part: c,
          chunkMeta: h,
          error: x,
          err: x,
          fatal: !1
        };
        if (x.code === DOMException.QUOTA_EXCEEDED_ERR)
          I.details = L.BUFFER_FULL_ERROR;
        else {
          const S = ++this.appendErrors[o];
          I.details = L.BUFFER_APPEND_ERROR, this.warn(`Failed ${S}/${s.config.appendErrorMaxRetry} times to append segment in "${o}" sourceBuffer`), S >= s.config.appendErrorMaxRetry && (I.fatal = !0);
        }
        s.trigger(m.ERROR, I);
      }
    };
    i.append(y, o, !!this.pendingTracks[o]);
  }
  onBufferFlushing(e, t) {
    const {
      operationQueue: s
    } = this, i = (r) => ({
      execute: this.removeExecutor.bind(this, r, t.startOffset, t.endOffset),
      onStart: () => {
      },
      onComplete: () => {
        this.hls.trigger(m.BUFFER_FLUSHED, {
          type: r
        });
      },
      onError: (n) => {
        this.warn(`Failed to remove from ${r} SourceBuffer`, n);
      }
    });
    t.type ? s.append(i(t.type), t.type) : this.getSourceBufferTypes().forEach((r) => {
      s.append(i(r), r);
    });
  }
  onFragParsed(e, t) {
    const {
      frag: s,
      part: i
    } = t, r = [], n = i ? i.elementaryStreams : s.elementaryStreams;
    n[X.AUDIOVIDEO] ? r.push("audiovideo") : (n[X.AUDIO] && r.push("audio"), n[X.VIDEO] && r.push("video"));
    const o = () => {
      const l = self.performance.now();
      s.stats.buffering.end = l, i && (i.stats.buffering.end = l);
      const c = i ? i.stats : s.stats;
      this.hls.trigger(m.FRAG_BUFFERED, {
        frag: s,
        part: i,
        stats: c,
        id: s.type
      });
    };
    r.length === 0 && this.warn(`Fragments must have at least one ElementaryStreamType set. type: ${s.type} level: ${s.level} sn: ${s.sn}`), this.blockBuffers(o, r);
  }
  onFragChanged(e, t) {
    this.trimBuffers();
  }
  // on BUFFER_EOS mark matching sourcebuffer(s) as ended and trigger checkEos()
  // an undefined data.type will mark all buffers as EOS.
  onBufferEos(e, t) {
    this.getSourceBufferTypes().reduce((i, r) => {
      const n = this.sourceBuffer[r];
      return n && (!t.type || t.type === r) && (n.ending = !0, n.ended || (n.ended = !0, this.log(`${r} sourceBuffer now EOS`))), i && !!(!n || n.ended);
    }, !0) && (this.log("Queueing mediaSource.endOfStream()"), this.blockBuffers(() => {
      this.getSourceBufferTypes().forEach((r) => {
        const n = this.sourceBuffer[r];
        n && (n.ending = !1);
      });
      const {
        mediaSource: i
      } = this;
      if (!i || i.readyState !== "open") {
        i && this.log(`Could not call mediaSource.endOfStream(). mediaSource.readyState: ${i.readyState}`);
        return;
      }
      this.log("Calling mediaSource.endOfStream()"), i.endOfStream();
    }));
  }
  onLevelUpdated(e, {
    details: t
  }) {
    t.fragments.length && (this.details = t, this.getSourceBufferTypes().length ? this.blockBuffers(this.updateMediaElementDuration.bind(this)) : this.updateMediaElementDuration());
  }
  trimBuffers() {
    const {
      hls: e,
      details: t,
      media: s
    } = this;
    if (!s || t === null || !this.getSourceBufferTypes().length)
      return;
    const r = e.config, n = s.currentTime, o = t.levelTargetDuration, l = t.live && r.liveBackBufferLength !== null ? r.liveBackBufferLength : r.backBufferLength;
    if (O(l) && l > 0) {
      const c = Math.max(l, o), h = Math.floor(n / o) * o - c;
      this.flushBackBuffer(n, o, h);
    }
    if (O(r.frontBufferFlushThreshold) && r.frontBufferFlushThreshold > 0) {
      const c = Math.max(r.maxBufferLength, r.frontBufferFlushThreshold), h = Math.max(c, o), u = Math.floor(n / o) * o + h;
      this.flushFrontBuffer(n, o, u);
    }
  }
  flushBackBuffer(e, t, s) {
    const {
      details: i,
      sourceBuffer: r
    } = this;
    this.getSourceBufferTypes().forEach((o) => {
      const l = r[o];
      if (l) {
        const c = Q.getBuffered(l);
        if (c.length > 0 && s > c.start(0)) {
          if (this.hls.trigger(m.BACK_BUFFER_REACHED, {
            bufferEnd: s
          }), i != null && i.live)
            this.hls.trigger(m.LIVE_BACK_BUFFER_REACHED, {
              bufferEnd: s
            });
          else if (l.ended && c.end(c.length - 1) - e < t * 2) {
            this.log(`Cannot flush ${o} back buffer while SourceBuffer is in ended state`);
            return;
          }
          this.hls.trigger(m.BUFFER_FLUSHING, {
            startOffset: 0,
            endOffset: s,
            type: o
          });
        }
      }
    });
  }
  flushFrontBuffer(e, t, s) {
    const {
      sourceBuffer: i
    } = this;
    this.getSourceBufferTypes().forEach((n) => {
      const o = i[n];
      if (o) {
        const l = Q.getBuffered(o), c = l.length;
        if (c < 2)
          return;
        const h = l.start(c - 1), u = l.end(c - 1);
        if (s > h || e >= h && e <= u)
          return;
        if (o.ended && e - u < 2 * t) {
          this.log(`Cannot flush ${n} front buffer while SourceBuffer is in ended state`);
          return;
        }
        this.hls.trigger(m.BUFFER_FLUSHING, {
          startOffset: h,
          endOffset: 1 / 0,
          type: n
        });
      }
    });
  }
  /**
   * Update Media Source duration to current level duration or override to Infinity if configuration parameter
   * 'liveDurationInfinity` is set to `true`
   * More details: https://github.com/video-dev/hls.js/issues/355
   */
  updateMediaElementDuration() {
    if (!this.details || !this.media || !this.mediaSource || this.mediaSource.readyState !== "open")
      return;
    const {
      details: e,
      hls: t,
      media: s,
      mediaSource: i
    } = this, r = e.fragments[0].start + e.totalduration, n = s.duration, o = O(i.duration) ? i.duration : 0;
    e.live && t.config.liveDurationInfinity ? (i.duration = 1 / 0, this.updateSeekableRange(e)) : (r > o && r > n || !O(n)) && (this.log(`Updating Media Source duration to ${r.toFixed(3)}`), i.duration = r);
  }
  updateSeekableRange(e) {
    const t = this.mediaSource, s = e.fragments;
    if (s.length && e.live && t != null && t.setLiveSeekableRange) {
      const r = Math.max(0, s[0].start), n = Math.max(r, r + e.totalduration);
      this.log(`Media Source duration is set to ${t.duration}. Setting seekable range to ${r}-${n}.`), t.setLiveSeekableRange(r, n);
    }
  }
  checkPendingTracks() {
    const {
      bufferCodecEventsExpected: e,
      operationQueue: t,
      pendingTracks: s
    } = this, i = Object.keys(s).length;
    if (i && (!e || i === 2 || "audiovideo" in s)) {
      this.createSourceBuffers(s), this.pendingTracks = {};
      const r = this.getSourceBufferTypes();
      if (r.length)
        this.hls.trigger(m.BUFFER_CREATED, {
          tracks: this.tracks
        }), r.forEach((n) => {
          t.executeNext(n);
        });
      else {
        const n = new Error("could not create source buffer for media codec(s)");
        this.hls.trigger(m.ERROR, {
          type: U.MEDIA_ERROR,
          details: L.BUFFER_INCOMPATIBLE_CODECS_ERROR,
          fatal: !0,
          error: n,
          reason: n.message
        });
      }
    }
  }
  createSourceBuffers(e) {
    const {
      sourceBuffer: t,
      mediaSource: s
    } = this;
    if (!s)
      throw Error("createSourceBuffers called when mediaSource was null");
    for (const i in e)
      if (!t[i]) {
        const r = e[i];
        if (!r)
          throw Error(`source buffer exists for track ${i}, however track does not`);
        let n = r.levelCodec || r.codec;
        n && i.slice(0, 5) === "audio" && (n = Rt(n, this.hls.config.preferManagedMediaSource));
        const o = `${r.container};codecs=${n}`;
        this.log(`creating sourceBuffer(${o})`);
        try {
          const l = t[i] = s.addSourceBuffer(o), c = i;
          this.addBufferListener(c, "updatestart", this._onSBUpdateStart), this.addBufferListener(c, "updateend", this._onSBUpdateEnd), this.addBufferListener(c, "error", this._onSBUpdateError), this.addBufferListener(c, "bufferedchange", (h, u) => {
            const d = u.removedRanges;
            d != null && d.length && this.hls.trigger(m.BUFFER_FLUSHED, {
              type: i
            });
          }), this.tracks[i] = {
            buffer: l,
            codec: n,
            container: r.container,
            levelCodec: r.levelCodec,
            metadata: r.metadata,
            id: r.id
          };
        } catch (l) {
          this.error(`error while trying to add sourceBuffer: ${l.message}`), this.hls.trigger(m.ERROR, {
            type: U.MEDIA_ERROR,
            details: L.BUFFER_ADD_CODEC_ERROR,
            fatal: !1,
            error: l,
            sourceBufferName: i,
            mimeType: o
          });
        }
      }
  }
  get mediaSrc() {
    var e;
    const t = ((e = this.media) == null ? void 0 : e.firstChild) || this.media;
    return t == null ? void 0 : t.src;
  }
  _onSBUpdateStart(e) {
    const {
      operationQueue: t
    } = this;
    t.current(e).onStart();
  }
  _onSBUpdateEnd(e) {
    var t;
    if (((t = this.mediaSource) == null ? void 0 : t.readyState) === "closed") {
      this.resetBuffer(e);
      return;
    }
    const {
      operationQueue: s
    } = this;
    s.current(e).onComplete(), s.shiftAndExecuteNext(e);
  }
  _onSBUpdateError(e, t) {
    var s;
    const i = new Error(`${e} SourceBuffer error. MediaSource readyState: ${(s = this.mediaSource) == null ? void 0 : s.readyState}`);
    this.error(`${i}`, t), this.hls.trigger(m.ERROR, {
      type: U.MEDIA_ERROR,
      details: L.BUFFER_APPENDING_ERROR,
      sourceBufferName: e,
      error: i,
      fatal: !1
    });
    const r = this.operationQueue.current(e);
    r && r.onError(i);
  }
  // This method must result in an updateend event; if remove is not called, _onSBUpdateEnd must be called manually
  removeExecutor(e, t, s) {
    const {
      media: i,
      mediaSource: r,
      operationQueue: n,
      sourceBuffer: o
    } = this, l = o[e];
    if (!i || !r || !l) {
      this.warn(`Attempting to remove from the ${e} SourceBuffer, but it does not exist`), n.shiftAndExecuteNext(e);
      return;
    }
    const c = O(i.duration) ? i.duration : 1 / 0, h = O(r.duration) ? r.duration : 1 / 0, u = Math.max(0, t), d = Math.min(s, c, h);
    d > u && (!l.ending || l.ended) ? (l.ended = !1, this.log(`Removing [${u},${d}] from the ${e} SourceBuffer`), l.remove(u, d)) : n.shiftAndExecuteNext(e);
  }
  // This method must result in an updateend event; if append is not called, _onSBUpdateEnd must be called manually
  appendExecutor(e, t) {
    const s = this.sourceBuffer[t];
    if (!s) {
      if (!this.pendingTracks[t])
        throw new Error(`Attempting to append to the ${t} SourceBuffer, but it does not exist`);
      return;
    }
    s.ended = !1, s.appendBuffer(e);
  }
  // Enqueues an operation to each SourceBuffer queue which, upon execution, resolves a promise. When all promises
  // resolve, the onUnblocked function is executed. Functions calling this method do not need to unblock the queue
  // upon completion, since we already do it here
  blockBuffers(e, t = this.getSourceBufferTypes()) {
    if (!t.length) {
      this.log("Blocking operation requested, but no SourceBuffers exist"), Promise.resolve().then(e);
      return;
    }
    const {
      operationQueue: s
    } = this, i = t.map((r) => s.appendBlocker(r));
    Promise.all(i).then(() => {
      e(), t.forEach((r) => {
        const n = this.sourceBuffer[r];
        n != null && n.updating || s.shiftAndExecuteNext(r);
      });
    });
  }
  getSourceBufferTypes() {
    return Object.keys(this.sourceBuffer);
  }
  addBufferListener(e, t, s) {
    const i = this.sourceBuffer[e];
    if (!i)
      return;
    const r = s.bind(this, e);
    this.listeners[e].push({
      event: t,
      listener: r
    }), i.addEventListener(t, r);
  }
  removeBufferListeners(e) {
    const t = this.sourceBuffer[e];
    t && this.listeners[e].forEach((s) => {
      t.removeEventListener(s.event, s.listener);
    });
  }
}
function Si(a) {
  const e = a.querySelectorAll("source");
  [].slice.call(e).forEach((t) => {
    a.removeChild(t);
  });
}
function Po(a, e) {
  const t = self.document.createElement("source");
  t.type = "video/mp4", t.src = e, a.appendChild(t);
}
const vi = {
  42: 225,
  // lowercase a, acute accent
  92: 233,
  // lowercase e, acute accent
  94: 237,
  // lowercase i, acute accent
  95: 243,
  // lowercase o, acute accent
  96: 250,
  // lowercase u, acute accent
  123: 231,
  // lowercase c with cedilla
  124: 247,
  // division symbol
  125: 209,
  // uppercase N tilde
  126: 241,
  // lowercase n tilde
  127: 9608,
  // Full block
  // THIS BLOCK INCLUDES THE 16 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x11 AND LOW BETWEEN 0x30 AND 0x3F
  // THIS MEANS THAT \x50 MUST BE ADDED TO THE VALUES
  128: 174,
  // Registered symbol (R)
  129: 176,
  // degree sign
  130: 189,
  // 1/2 symbol
  131: 191,
  // Inverted (open) question mark
  132: 8482,
  // Trademark symbol (TM)
  133: 162,
  // Cents symbol
  134: 163,
  // Pounds sterling
  135: 9834,
  // Music 8'th note
  136: 224,
  // lowercase a, grave accent
  137: 32,
  // transparent space (regular)
  138: 232,
  // lowercase e, grave accent
  139: 226,
  // lowercase a, circumflex accent
  140: 234,
  // lowercase e, circumflex accent
  141: 238,
  // lowercase i, circumflex accent
  142: 244,
  // lowercase o, circumflex accent
  143: 251,
  // lowercase u, circumflex accent
  // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x12 AND LOW BETWEEN 0x20 AND 0x3F
  144: 193,
  // capital letter A with acute
  145: 201,
  // capital letter E with acute
  146: 211,
  // capital letter O with acute
  147: 218,
  // capital letter U with acute
  148: 220,
  // capital letter U with diaresis
  149: 252,
  // lowercase letter U with diaeresis
  150: 8216,
  // opening single quote
  151: 161,
  // inverted exclamation mark
  152: 42,
  // asterisk
  153: 8217,
  // closing single quote
  154: 9473,
  // box drawings heavy horizontal
  155: 169,
  // copyright sign
  156: 8480,
  // Service mark
  157: 8226,
  // (round) bullet
  158: 8220,
  // Left double quotation mark
  159: 8221,
  // Right double quotation mark
  160: 192,
  // uppercase A, grave accent
  161: 194,
  // uppercase A, circumflex
  162: 199,
  // uppercase C with cedilla
  163: 200,
  // uppercase E, grave accent
  164: 202,
  // uppercase E, circumflex
  165: 203,
  // capital letter E with diaresis
  166: 235,
  // lowercase letter e with diaresis
  167: 206,
  // uppercase I, circumflex
  168: 207,
  // uppercase I, with diaresis
  169: 239,
  // lowercase i, with diaresis
  170: 212,
  // uppercase O, circumflex
  171: 217,
  // uppercase U, grave accent
  172: 249,
  // lowercase u, grave accent
  173: 219,
  // uppercase U, circumflex
  174: 171,
  // left-pointing double angle quotation mark
  175: 187,
  // right-pointing double angle quotation mark
  // THIS BLOCK INCLUDES THE 32 EXTENDED (TWO-BYTE) LINE 21 CHARACTERS
  // THAT COME FROM HI BYTE=0x13 AND LOW BETWEEN 0x20 AND 0x3F
  176: 195,
  // Uppercase A, tilde
  177: 227,
  // Lowercase a, tilde
  178: 205,
  // Uppercase I, acute accent
  179: 204,
  // Uppercase I, grave accent
  180: 236,
  // Lowercase i, grave accent
  181: 210,
  // Uppercase O, grave accent
  182: 242,
  // Lowercase o, grave accent
  183: 213,
  // Uppercase O, tilde
  184: 245,
  // Lowercase o, tilde
  185: 123,
  // Open curly brace
  186: 125,
  // Closing curly brace
  187: 92,
  // Backslash
  188: 94,
  // Caret
  189: 95,
  // Underscore
  190: 124,
  // Pipe (vertical line)
  191: 8764,
  // Tilde operator
  192: 196,
  // Uppercase A, umlaut
  193: 228,
  // Lowercase A, umlaut
  194: 214,
  // Uppercase O, umlaut
  195: 246,
  // Lowercase o, umlaut
  196: 223,
  // Esszett (sharp S)
  197: 165,
  // Yen symbol
  198: 164,
  // Generic currency sign
  199: 9475,
  // Box drawings heavy vertical
  200: 197,
  // Uppercase A, ring
  201: 229,
  // Lowercase A, ring
  202: 216,
  // Uppercase O, stroke
  203: 248,
  // Lowercase o, strok
  204: 9487,
  // Box drawings heavy down and right
  205: 9491,
  // Box drawings heavy down and left
  206: 9495,
  // Box drawings heavy up and right
  207: 9499
  // Box drawings heavy up and left
}, Dr = function(e) {
  let t = e;
  return vi.hasOwnProperty(e) && (t = vi[e]), String.fromCharCode(t);
}, Ee = 15, Ce = 100, Fo = {
  17: 1,
  18: 3,
  21: 5,
  22: 7,
  23: 9,
  16: 11,
  19: 12,
  20: 14
}, Oo = {
  17: 2,
  18: 4,
  21: 6,
  22: 8,
  23: 10,
  19: 13,
  20: 15
}, Mo = {
  25: 1,
  26: 3,
  29: 5,
  30: 7,
  31: 9,
  24: 11,
  27: 12,
  28: 14
}, No = {
  25: 2,
  26: 4,
  29: 6,
  30: 8,
  31: 10,
  27: 13,
  28: 15
}, Uo = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "black", "transparent"];
class Bo {
  constructor() {
    this.time = null, this.verboseLevel = 0;
  }
  log(e, t) {
    if (this.verboseLevel >= e) {
      const s = typeof t == "function" ? t() : t;
      v.log(`${this.time} [${e}] ${s}`);
    }
  }
}
const Fe = function(e) {
  const t = [];
  for (let s = 0; s < e.length; s++)
    t.push(e[s].toString(16));
  return t;
};
class Cr {
  constructor() {
    this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
  }
  reset() {
    this.foreground = "white", this.underline = !1, this.italics = !1, this.background = "black", this.flash = !1;
  }
  setStyles(e) {
    const t = ["foreground", "underline", "italics", "background", "flash"];
    for (let s = 0; s < t.length; s++) {
      const i = t[s];
      e.hasOwnProperty(i) && (this[i] = e[i]);
    }
  }
  isDefault() {
    return this.foreground === "white" && !this.underline && !this.italics && this.background === "black" && !this.flash;
  }
  equals(e) {
    return this.foreground === e.foreground && this.underline === e.underline && this.italics === e.italics && this.background === e.background && this.flash === e.flash;
  }
  copy(e) {
    this.foreground = e.foreground, this.underline = e.underline, this.italics = e.italics, this.background = e.background, this.flash = e.flash;
  }
  toString() {
    return "color=" + this.foreground + ", underline=" + this.underline + ", italics=" + this.italics + ", background=" + this.background + ", flash=" + this.flash;
  }
}
class $o {
  constructor() {
    this.uchar = " ", this.penState = new Cr();
  }
  reset() {
    this.uchar = " ", this.penState.reset();
  }
  setChar(e, t) {
    this.uchar = e, this.penState.copy(t);
  }
  setPenState(e) {
    this.penState.copy(e);
  }
  equals(e) {
    return this.uchar === e.uchar && this.penState.equals(e.penState);
  }
  copy(e) {
    this.uchar = e.uchar, this.penState.copy(e.penState);
  }
  isEmpty() {
    return this.uchar === " " && this.penState.isDefault();
  }
}
class Go {
  constructor(e) {
    this.chars = [], this.pos = 0, this.currPenState = new Cr(), this.cueStartTime = null, this.logger = void 0;
    for (let t = 0; t < Ce; t++)
      this.chars.push(new $o());
    this.logger = e;
  }
  equals(e) {
    for (let t = 0; t < Ce; t++)
      if (!this.chars[t].equals(e.chars[t]))
        return !1;
    return !0;
  }
  copy(e) {
    for (let t = 0; t < Ce; t++)
      this.chars[t].copy(e.chars[t]);
  }
  isEmpty() {
    let e = !0;
    for (let t = 0; t < Ce; t++)
      if (!this.chars[t].isEmpty()) {
        e = !1;
        break;
      }
    return e;
  }
  /**
   *  Set the cursor to a valid column.
   */
  setCursor(e) {
    this.pos !== e && (this.pos = e), this.pos < 0 ? (this.logger.log(3, "Negative cursor position " + this.pos), this.pos = 0) : this.pos > Ce && (this.logger.log(3, "Too large cursor position " + this.pos), this.pos = Ce);
  }
  /**
   * Move the cursor relative to current position.
   */
  moveCursor(e) {
    const t = this.pos + e;
    if (e > 1)
      for (let s = this.pos + 1; s < t + 1; s++)
        this.chars[s].setPenState(this.currPenState);
    this.setCursor(t);
  }
  /**
   * Backspace, move one step back and clear character.
   */
  backSpace() {
    this.moveCursor(-1), this.chars[this.pos].setChar(" ", this.currPenState);
  }
  insertChar(e) {
    e >= 144 && this.backSpace();
    const t = Dr(e);
    if (this.pos >= Ce) {
      this.logger.log(0, () => "Cannot insert " + e.toString(16) + " (" + t + ") at position " + this.pos + ". Skipping it!");
      return;
    }
    this.chars[this.pos].setChar(t, this.currPenState), this.moveCursor(1);
  }
  clearFromPos(e) {
    let t;
    for (t = e; t < Ce; t++)
      this.chars[t].reset();
  }
  clear() {
    this.clearFromPos(0), this.pos = 0, this.currPenState.reset();
  }
  clearToEndOfRow() {
    this.clearFromPos(this.pos);
  }
  getTextString() {
    const e = [];
    let t = !0;
    for (let s = 0; s < Ce; s++) {
      const i = this.chars[s].uchar;
      i !== " " && (t = !1), e.push(i);
    }
    return t ? "" : e.join("");
  }
  setPenStyles(e) {
    this.currPenState.setStyles(e), this.chars[this.pos].setPenState(this.currPenState);
  }
}
class jt {
  constructor(e) {
    this.rows = [], this.currRow = Ee - 1, this.nrRollUpRows = null, this.lastOutputScreen = null, this.logger = void 0;
    for (let t = 0; t < Ee; t++)
      this.rows.push(new Go(e));
    this.logger = e;
  }
  reset() {
    for (let e = 0; e < Ee; e++)
      this.rows[e].clear();
    this.currRow = Ee - 1;
  }
  equals(e) {
    let t = !0;
    for (let s = 0; s < Ee; s++)
      if (!this.rows[s].equals(e.rows[s])) {
        t = !1;
        break;
      }
    return t;
  }
  copy(e) {
    for (let t = 0; t < Ee; t++)
      this.rows[t].copy(e.rows[t]);
  }
  isEmpty() {
    let e = !0;
    for (let t = 0; t < Ee; t++)
      if (!this.rows[t].isEmpty()) {
        e = !1;
        break;
      }
    return e;
  }
  backSpace() {
    this.rows[this.currRow].backSpace();
  }
  clearToEndOfRow() {
    this.rows[this.currRow].clearToEndOfRow();
  }
  /**
   * Insert a character (without styling) in the current row.
   */
  insertChar(e) {
    this.rows[this.currRow].insertChar(e);
  }
  setPen(e) {
    this.rows[this.currRow].setPenStyles(e);
  }
  moveCursor(e) {
    this.rows[this.currRow].moveCursor(e);
  }
  setCursor(e) {
    this.logger.log(2, "setCursor: " + e), this.rows[this.currRow].setCursor(e);
  }
  setPAC(e) {
    this.logger.log(2, () => "pacData = " + JSON.stringify(e));
    let t = e.row - 1;
    if (this.nrRollUpRows && t < this.nrRollUpRows - 1 && (t = this.nrRollUpRows - 1), this.nrRollUpRows && this.currRow !== t) {
      for (let o = 0; o < Ee; o++)
        this.rows[o].clear();
      const r = this.currRow + 1 - this.nrRollUpRows, n = this.lastOutputScreen;
      if (n) {
        const o = n.rows[r].cueStartTime, l = this.logger.time;
        if (o !== null && l !== null && o < l)
          for (let c = 0; c < this.nrRollUpRows; c++)
            this.rows[t - this.nrRollUpRows + c + 1].copy(n.rows[r + c]);
      }
    }
    this.currRow = t;
    const s = this.rows[this.currRow];
    if (e.indent !== null) {
      const r = e.indent, n = Math.max(r - 1, 0);
      s.setCursor(e.indent), e.color = s.chars[n].penState.foreground;
    }
    const i = {
      foreground: e.color,
      underline: e.underline,
      italics: e.italics,
      background: "black",
      flash: !1
    };
    this.setPen(i);
  }
  /**
   * Set background/extra foreground, but first do back_space, and then insert space (backwards compatibility).
   */
  setBkgData(e) {
    this.logger.log(2, () => "bkgData = " + JSON.stringify(e)), this.backSpace(), this.setPen(e), this.insertChar(32);
  }
  setRollUpRows(e) {
    this.nrRollUpRows = e;
  }
  rollUp() {
    if (this.nrRollUpRows === null) {
      this.logger.log(3, "roll_up but nrRollUpRows not set yet");
      return;
    }
    this.logger.log(1, () => this.getDisplayText());
    const e = this.currRow + 1 - this.nrRollUpRows, t = this.rows.splice(e, 1)[0];
    t.clear(), this.rows.splice(this.currRow, 0, t), this.logger.log(2, "Rolling up");
  }
  /**
   * Get all non-empty rows with as unicode text.
   */
  getDisplayText(e) {
    e = e || !1;
    const t = [];
    let s = "", i = -1;
    for (let r = 0; r < Ee; r++) {
      const n = this.rows[r].getTextString();
      n && (i = r + 1, e ? t.push("Row " + i + ": '" + n + "'") : t.push(n.trim()));
    }
    return t.length > 0 && (e ? s = "[" + t.join(" | ") + "]" : s = t.join(`
`)), s;
  }
  getTextAndFormat() {
    return this.rows;
  }
}
class Ai {
  constructor(e, t, s) {
    this.chNr = void 0, this.outputFilter = void 0, this.mode = void 0, this.verbose = void 0, this.displayedMemory = void 0, this.nonDisplayedMemory = void 0, this.lastOutputScreen = void 0, this.currRollUpRow = void 0, this.writeScreen = void 0, this.cueStartTime = void 0, this.logger = void 0, this.chNr = e, this.outputFilter = t, this.mode = null, this.verbose = 0, this.displayedMemory = new jt(s), this.nonDisplayedMemory = new jt(s), this.lastOutputScreen = new jt(s), this.currRollUpRow = this.displayedMemory.rows[Ee - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null, this.logger = s;
  }
  reset() {
    this.mode = null, this.displayedMemory.reset(), this.nonDisplayedMemory.reset(), this.lastOutputScreen.reset(), this.outputFilter.reset(), this.currRollUpRow = this.displayedMemory.rows[Ee - 1], this.writeScreen = this.displayedMemory, this.mode = null, this.cueStartTime = null;
  }
  getHandler() {
    return this.outputFilter;
  }
  setHandler(e) {
    this.outputFilter = e;
  }
  setPAC(e) {
    this.writeScreen.setPAC(e);
  }
  setBkgData(e) {
    this.writeScreen.setBkgData(e);
  }
  setMode(e) {
    e !== this.mode && (this.mode = e, this.logger.log(2, () => "MODE=" + e), this.mode === "MODE_POP-ON" ? this.writeScreen = this.nonDisplayedMemory : (this.writeScreen = this.displayedMemory, this.writeScreen.reset()), this.mode !== "MODE_ROLL-UP" && (this.displayedMemory.nrRollUpRows = null, this.nonDisplayedMemory.nrRollUpRows = null), this.mode = e);
  }
  insertChars(e) {
    for (let s = 0; s < e.length; s++)
      this.writeScreen.insertChar(e[s]);
    const t = this.writeScreen === this.displayedMemory ? "DISP" : "NON_DISP";
    this.logger.log(2, () => t + ": " + this.writeScreen.getDisplayText(!0)), (this.mode === "MODE_PAINT-ON" || this.mode === "MODE_ROLL-UP") && (this.logger.log(1, () => "DISPLAYED: " + this.displayedMemory.getDisplayText(!0)), this.outputDataUpdate());
  }
  ccRCL() {
    this.logger.log(2, "RCL - Resume Caption Loading"), this.setMode("MODE_POP-ON");
  }
  ccBS() {
    this.logger.log(2, "BS - BackSpace"), this.mode !== "MODE_TEXT" && (this.writeScreen.backSpace(), this.writeScreen === this.displayedMemory && this.outputDataUpdate());
  }
  ccAOF() {
  }
  ccAON() {
  }
  ccDER() {
    this.logger.log(2, "DER- Delete to End of Row"), this.writeScreen.clearToEndOfRow(), this.outputDataUpdate();
  }
  ccRU(e) {
    this.logger.log(2, "RU(" + e + ") - Roll Up"), this.writeScreen = this.displayedMemory, this.setMode("MODE_ROLL-UP"), this.writeScreen.setRollUpRows(e);
  }
  ccFON() {
    this.logger.log(2, "FON - Flash On"), this.writeScreen.setPen({
      flash: !0
    });
  }
  ccRDC() {
    this.logger.log(2, "RDC - Resume Direct Captioning"), this.setMode("MODE_PAINT-ON");
  }
  ccTR() {
    this.logger.log(2, "TR"), this.setMode("MODE_TEXT");
  }
  ccRTD() {
    this.logger.log(2, "RTD"), this.setMode("MODE_TEXT");
  }
  ccEDM() {
    this.logger.log(2, "EDM - Erase Displayed Memory"), this.displayedMemory.reset(), this.outputDataUpdate(!0);
  }
  ccCR() {
    this.logger.log(2, "CR - Carriage Return"), this.writeScreen.rollUp(), this.outputDataUpdate(!0);
  }
  ccENM() {
    this.logger.log(2, "ENM - Erase Non-displayed Memory"), this.nonDisplayedMemory.reset();
  }
  ccEOC() {
    if (this.logger.log(2, "EOC - End Of Caption"), this.mode === "MODE_POP-ON") {
      const e = this.displayedMemory;
      this.displayedMemory = this.nonDisplayedMemory, this.nonDisplayedMemory = e, this.writeScreen = this.nonDisplayedMemory, this.logger.log(1, () => "DISP: " + this.displayedMemory.getDisplayText());
    }
    this.outputDataUpdate(!0);
  }
  ccTO(e) {
    this.logger.log(2, "TO(" + e + ") - Tab Offset"), this.writeScreen.moveCursor(e);
  }
  ccMIDROW(e) {
    const t = {
      flash: !1
    };
    if (t.underline = e % 2 === 1, t.italics = e >= 46, t.italics)
      t.foreground = "white";
    else {
      const s = Math.floor(e / 2) - 16, i = ["white", "green", "blue", "cyan", "red", "yellow", "magenta"];
      t.foreground = i[s];
    }
    this.logger.log(2, "MIDROW: " + JSON.stringify(t)), this.writeScreen.setPen(t);
  }
  outputDataUpdate(e = !1) {
    const t = this.logger.time;
    t !== null && this.outputFilter && (this.cueStartTime === null && !this.displayedMemory.isEmpty() ? this.cueStartTime = t : this.displayedMemory.equals(this.lastOutputScreen) || (this.outputFilter.newCue(this.cueStartTime, t, this.lastOutputScreen), e && this.outputFilter.dispatchCue && this.outputFilter.dispatchCue(), this.cueStartTime = this.displayedMemory.isEmpty() ? null : t), this.lastOutputScreen.copy(this.displayedMemory));
  }
  cueSplitAtTime(e) {
    this.outputFilter && (this.displayedMemory.isEmpty() || (this.outputFilter.newCue && this.outputFilter.newCue(this.cueStartTime, e, this.displayedMemory), this.cueStartTime = e));
  }
}
class Li {
  constructor(e, t, s) {
    this.channels = void 0, this.currentChannel = 0, this.cmdHistory = Ii(), this.logger = void 0;
    const i = this.logger = new Bo();
    this.channels = [null, new Ai(e, t, i), new Ai(e + 1, s, i)];
  }
  getHandler(e) {
    return this.channels[e].getHandler();
  }
  setHandler(e, t) {
    this.channels[e].setHandler(t);
  }
  /**
   * Add data for time t in forms of list of bytes (unsigned ints). The bytes are treated as pairs.
   */
  addData(e, t) {
    let s, i, r, n = !1;
    this.logger.time = e;
    for (let o = 0; o < t.length; o += 2)
      if (i = t[o] & 127, r = t[o + 1] & 127, !(i === 0 && r === 0)) {
        if (this.logger.log(3, "[" + Fe([t[o], t[o + 1]]) + "] -> (" + Fe([i, r]) + ")"), s = this.parseCmd(i, r), s || (s = this.parseMidrow(i, r)), s || (s = this.parsePAC(i, r)), s || (s = this.parseBackgroundAttributes(i, r)), !s && (n = this.parseChars(i, r), n)) {
          const l = this.currentChannel;
          l && l > 0 ? this.channels[l].insertChars(n) : this.logger.log(2, "No channel found yet. TEXT-MODE?");
        }
        !s && !n && this.logger.log(2, "Couldn't parse cleaned data " + Fe([i, r]) + " orig: " + Fe([t[o], t[o + 1]]));
      }
  }
  /**
   * Parse Command.
   * @returns True if a command was found
   */
  parseCmd(e, t) {
    const {
      cmdHistory: s
    } = this, i = (e === 20 || e === 28 || e === 21 || e === 29) && t >= 32 && t <= 47, r = (e === 23 || e === 31) && t >= 33 && t <= 35;
    if (!(i || r))
      return !1;
    if (Ri(e, t, s))
      return Ve(null, null, s), this.logger.log(3, "Repeated command (" + Fe([e, t]) + ") is dropped"), !0;
    const n = e === 20 || e === 21 || e === 23 ? 1 : 2, o = this.channels[n];
    return e === 20 || e === 21 || e === 28 || e === 29 ? t === 32 ? o.ccRCL() : t === 33 ? o.ccBS() : t === 34 ? o.ccAOF() : t === 35 ? o.ccAON() : t === 36 ? o.ccDER() : t === 37 ? o.ccRU(2) : t === 38 ? o.ccRU(3) : t === 39 ? o.ccRU(4) : t === 40 ? o.ccFON() : t === 41 ? o.ccRDC() : t === 42 ? o.ccTR() : t === 43 ? o.ccRTD() : t === 44 ? o.ccEDM() : t === 45 ? o.ccCR() : t === 46 ? o.ccENM() : t === 47 && o.ccEOC() : o.ccTO(t - 32), Ve(e, t, s), this.currentChannel = n, !0;
  }
  /**
   * Parse midrow styling command
   */
  parseMidrow(e, t) {
    let s = 0;
    if ((e === 17 || e === 25) && t >= 32 && t <= 47) {
      if (e === 17 ? s = 1 : s = 2, s !== this.currentChannel)
        return this.logger.log(0, "Mismatch channel in midrow parsing"), !1;
      const i = this.channels[s];
      return i ? (i.ccMIDROW(t), this.logger.log(3, "MIDROW (" + Fe([e, t]) + ")"), !0) : !1;
    }
    return !1;
  }
  /**
   * Parse Preable Access Codes (Table 53).
   * @returns {Boolean} Tells if PAC found
   */
  parsePAC(e, t) {
    let s;
    const i = this.cmdHistory, r = (e >= 17 && e <= 23 || e >= 25 && e <= 31) && t >= 64 && t <= 127, n = (e === 16 || e === 24) && t >= 64 && t <= 95;
    if (!(r || n))
      return !1;
    if (Ri(e, t, i))
      return Ve(null, null, i), !0;
    const o = e <= 23 ? 1 : 2;
    t >= 64 && t <= 95 ? s = o === 1 ? Fo[e] : Mo[e] : s = o === 1 ? Oo[e] : No[e];
    const l = this.channels[o];
    return l ? (l.setPAC(this.interpretPAC(s, t)), Ve(e, t, i), this.currentChannel = o, !0) : !1;
  }
  /**
   * Interpret the second byte of the pac, and return the information.
   * @returns pacData with style parameters
   */
  interpretPAC(e, t) {
    let s;
    const i = {
      color: null,
      italics: !1,
      indent: null,
      underline: !1,
      row: e
    };
    return t > 95 ? s = t - 96 : s = t - 64, i.underline = (s & 1) === 1, s <= 13 ? i.color = ["white", "green", "blue", "cyan", "red", "yellow", "magenta", "white"][Math.floor(s / 2)] : s <= 15 ? (i.italics = !0, i.color = "white") : i.indent = Math.floor((s - 16) / 2) * 4, i;
  }
  /**
   * Parse characters.
   * @returns An array with 1 to 2 codes corresponding to chars, if found. null otherwise.
   */
  parseChars(e, t) {
    let s, i = null, r = null;
    if (e >= 25 ? (s = 2, r = e - 8) : (s = 1, r = e), r >= 17 && r <= 19) {
      let n;
      r === 17 ? n = t + 80 : r === 18 ? n = t + 112 : n = t + 144, this.logger.log(2, "Special char '" + Dr(n) + "' in channel " + s), i = [n];
    } else
      e >= 32 && e <= 127 && (i = t === 0 ? [e] : [e, t]);
    if (i) {
      const n = Fe(i);
      this.logger.log(3, "Char codes =  " + n.join(",")), Ve(e, t, this.cmdHistory);
    }
    return i;
  }
  /**
   * Parse extended background attributes as well as new foreground color black.
   * @returns True if background attributes are found
   */
  parseBackgroundAttributes(e, t) {
    const s = (e === 16 || e === 24) && t >= 32 && t <= 47, i = (e === 23 || e === 31) && t >= 45 && t <= 47;
    if (!(s || i))
      return !1;
    let r;
    const n = {};
    e === 16 || e === 24 ? (r = Math.floor((t - 32) / 2), n.background = Uo[r], t % 2 === 1 && (n.background = n.background + "_semi")) : t === 45 ? n.background = "transparent" : (n.foreground = "black", t === 47 && (n.underline = !0));
    const o = e <= 23 ? 1 : 2;
    return this.channels[o].setBkgData(n), Ve(e, t, this.cmdHistory), !0;
  }
  /**
   * Reset state of parser and its channels.
   */
  reset() {
    for (let e = 0; e < Object.keys(this.channels).length; e++) {
      const t = this.channels[e];
      t && t.reset();
    }
    this.cmdHistory = Ii();
  }
  /**
   * Trigger the generation of a cue, and the start of a new one if displayScreens are not empty.
   */
  cueSplitAtTime(e) {
    for (let t = 0; t < this.channels.length; t++) {
      const s = this.channels[t];
      s && s.cueSplitAtTime(e);
    }
  }
}
function Ve(a, e, t) {
  t.a = a, t.b = e;
}
function Ri(a, e, t) {
  return t.a === a && t.b === e;
}
function Ii() {
  return {
    a: null,
    b: null
  };
}
class ut {
  constructor(e, t) {
    this.timelineController = void 0, this.cueRanges = [], this.trackName = void 0, this.startTime = null, this.endTime = null, this.screen = null, this.timelineController = e, this.trackName = t;
  }
  dispatchCue() {
    this.startTime !== null && (this.timelineController.addCues(this.trackName, this.startTime, this.endTime, this.screen, this.cueRanges), this.startTime = null);
  }
  newCue(e, t, s) {
    (this.startTime === null || this.startTime > e) && (this.startTime = e), this.endTime = t, this.screen = s, this.timelineController.createCaptionsTrack(this.trackName);
  }
  reset() {
    this.cueRanges = [], this.startTime = null;
  }
}
var ks = function() {
  if (je != null && je.VTTCue)
    return self.VTTCue;
  const a = ["", "lr", "rl"], e = ["start", "middle", "end", "left", "right"];
  function t(o, l) {
    if (typeof l != "string" || !Array.isArray(o))
      return !1;
    const c = l.toLowerCase();
    return ~o.indexOf(c) ? c : !1;
  }
  function s(o) {
    return t(a, o);
  }
  function i(o) {
    return t(e, o);
  }
  function r(o, ...l) {
    let c = 1;
    for (; c < arguments.length; c++) {
      const h = arguments[c];
      for (const u in h)
        o[u] = h[u];
    }
    return o;
  }
  function n(o, l, c) {
    const h = this, u = {
      enumerable: !0
    };
    h.hasBeenReset = !1;
    let d = "", g = !1, f = o, p = l, T = c, E = null, y = "", x = !0, I = "auto", S = "start", D = 50, R = "middle", w = 50, _ = "middle";
    Object.defineProperty(h, "id", r({}, u, {
      get: function() {
        return d;
      },
      set: function(b) {
        d = "" + b;
      }
    })), Object.defineProperty(h, "pauseOnExit", r({}, u, {
      get: function() {
        return g;
      },
      set: function(b) {
        g = !!b;
      }
    })), Object.defineProperty(h, "startTime", r({}, u, {
      get: function() {
        return f;
      },
      set: function(b) {
        if (typeof b != "number")
          throw new TypeError("Start time must be set to a number.");
        f = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "endTime", r({}, u, {
      get: function() {
        return p;
      },
      set: function(b) {
        if (typeof b != "number")
          throw new TypeError("End time must be set to a number.");
        p = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "text", r({}, u, {
      get: function() {
        return T;
      },
      set: function(b) {
        T = "" + b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "region", r({}, u, {
      get: function() {
        return E;
      },
      set: function(b) {
        E = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "vertical", r({}, u, {
      get: function() {
        return y;
      },
      set: function(b) {
        const k = s(b);
        if (k === !1)
          throw new SyntaxError("An invalid or illegal string was specified.");
        y = k, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "snapToLines", r({}, u, {
      get: function() {
        return x;
      },
      set: function(b) {
        x = !!b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "line", r({}, u, {
      get: function() {
        return I;
      },
      set: function(b) {
        if (typeof b != "number" && b !== "auto")
          throw new SyntaxError("An invalid number or illegal string was specified.");
        I = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "lineAlign", r({}, u, {
      get: function() {
        return S;
      },
      set: function(b) {
        const k = i(b);
        if (!k)
          throw new SyntaxError("An invalid or illegal string was specified.");
        S = k, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "position", r({}, u, {
      get: function() {
        return D;
      },
      set: function(b) {
        if (b < 0 || b > 100)
          throw new Error("Position must be between 0 and 100.");
        D = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "positionAlign", r({}, u, {
      get: function() {
        return R;
      },
      set: function(b) {
        const k = i(b);
        if (!k)
          throw new SyntaxError("An invalid or illegal string was specified.");
        R = k, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "size", r({}, u, {
      get: function() {
        return w;
      },
      set: function(b) {
        if (b < 0 || b > 100)
          throw new Error("Size must be between 0 and 100.");
        w = b, this.hasBeenReset = !0;
      }
    })), Object.defineProperty(h, "align", r({}, u, {
      get: function() {
        return _;
      },
      set: function(b) {
        const k = i(b);
        if (!k)
          throw new SyntaxError("An invalid or illegal string was specified.");
        _ = k, this.hasBeenReset = !0;
      }
    })), h.displayState = void 0;
  }
  return n.prototype.getCueAsHTML = function() {
    return self.WebVTT.convertCueToDOMTree(self, this.text);
  }, n;
}();
class Ko {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  decode(e, t) {
    if (!e)
      return "";
    if (typeof e != "string")
      throw new Error("Error - expected string data.");
    return decodeURIComponent(encodeURIComponent(e));
  }
}
function wr(a) {
  function e(s, i, r, n) {
    return (s | 0) * 3600 + (i | 0) * 60 + (r | 0) + parseFloat(n || 0);
  }
  const t = a.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/);
  return t ? parseFloat(t[2]) > 59 ? e(t[2], t[3], 0, t[4]) : e(t[1], t[2], t[3], t[4]) : null;
}
class Vo {
  constructor() {
    this.values = /* @__PURE__ */ Object.create(null);
  }
  // Only accept the first assignment to any key.
  set(e, t) {
    !this.get(e) && t !== "" && (this.values[e] = t);
  }
  // Return the value for a key, or a default value.
  // If 'defaultKey' is passed then 'dflt' is assumed to be an object with
  // a number of possible default values as properties where 'defaultKey' is
  // the key of the property that will be chosen; otherwise it's assumed to be
  // a single value.
  get(e, t, s) {
    return s ? this.has(e) ? this.values[e] : t[s] : this.has(e) ? this.values[e] : t;
  }
  // Check whether we have a value for a key.
  has(e) {
    return e in this.values;
  }
  // Accept a setting if its one of the given alternatives.
  alt(e, t, s) {
    for (let i = 0; i < s.length; ++i)
      if (t === s[i]) {
        this.set(e, t);
        break;
      }
  }
  // Accept a setting if its a valid (signed) integer.
  integer(e, t) {
    /^-?\d+$/.test(t) && this.set(e, parseInt(t, 10));
  }
  // Accept a setting if its a valid percentage.
  percent(e, t) {
    if (/^([\d]{1,3})(\.[\d]*)?%$/.test(t)) {
      const s = parseFloat(t);
      if (s >= 0 && s <= 100)
        return this.set(e, s), !0;
    }
    return !1;
  }
}
function kr(a, e, t, s) {
  const i = s ? a.split(s) : [a];
  for (const r in i) {
    if (typeof i[r] != "string")
      continue;
    const n = i[r].split(t);
    if (n.length !== 2)
      continue;
    const o = n[0], l = n[1];
    e(o, l);
  }
}
const ds = new ks(0, 0, ""), dt = ds.align === "middle" ? "middle" : "center";
function Ho(a, e, t) {
  const s = a;
  function i() {
    const o = wr(a);
    if (o === null)
      throw new Error("Malformed timestamp: " + s);
    return a = a.replace(/^[^\sa-zA-Z-]+/, ""), o;
  }
  function r(o, l) {
    const c = new Vo();
    kr(o, function(d, g) {
      let f;
      switch (d) {
        case "region":
          for (let p = t.length - 1; p >= 0; p--)
            if (t[p].id === g) {
              c.set(d, t[p].region);
              break;
            }
          break;
        case "vertical":
          c.alt(d, g, ["rl", "lr"]);
          break;
        case "line":
          f = g.split(","), c.integer(d, f[0]), c.percent(d, f[0]) && c.set("snapToLines", !1), c.alt(d, f[0], ["auto"]), f.length === 2 && c.alt("lineAlign", f[1], ["start", dt, "end"]);
          break;
        case "position":
          f = g.split(","), c.percent(d, f[0]), f.length === 2 && c.alt("positionAlign", f[1], ["start", dt, "end", "line-left", "line-right", "auto"]);
          break;
        case "size":
          c.percent(d, g);
          break;
        case "align":
          c.alt(d, g, ["start", dt, "end", "left", "right"]);
          break;
      }
    }, /:/, /\s/), l.region = c.get("region", null), l.vertical = c.get("vertical", "");
    let h = c.get("line", "auto");
    h === "auto" && ds.line === -1 && (h = -1), l.line = h, l.lineAlign = c.get("lineAlign", "start"), l.snapToLines = c.get("snapToLines", !0), l.size = c.get("size", 100), l.align = c.get("align", dt);
    let u = c.get("position", "auto");
    u === "auto" && ds.position === 50 && (u = l.align === "start" || l.align === "left" ? 0 : l.align === "end" || l.align === "right" ? 100 : 50), l.position = u;
  }
  function n() {
    a = a.replace(/^\s+/, "");
  }
  if (n(), e.startTime = i(), n(), a.slice(0, 3) !== "-->")
    throw new Error("Malformed time stamp (time stamps must be separated by '-->'): " + s);
  a = a.slice(3), n(), e.endTime = i(), n(), r(a, e);
}
function _r(a) {
  return a.replace(/<br(?: \/)?>/gi, `
`);
}
class Wo {
  constructor() {
    this.state = "INITIAL", this.buffer = "", this.decoder = new Ko(), this.regionList = [], this.cue = null, this.oncue = void 0, this.onparsingerror = void 0, this.onflush = void 0;
  }
  parse(e) {
    const t = this;
    e && (t.buffer += t.decoder.decode(e, {
      stream: !0
    }));
    function s() {
      let r = t.buffer, n = 0;
      for (r = _r(r); n < r.length && r[n] !== "\r" && r[n] !== `
`; )
        ++n;
      const o = r.slice(0, n);
      return r[n] === "\r" && ++n, r[n] === `
` && ++n, t.buffer = r.slice(n), o;
    }
    function i(r) {
      kr(r, function(n, o) {
      }, /:/);
    }
    try {
      let r = "";
      if (t.state === "INITIAL") {
        if (!/\r\n|\n/.test(t.buffer))
          return this;
        r = s();
        const o = r.match(/^(ï»¿)?WEBVTT([ \t].*)?$/);
        if (!(o != null && o[0]))
          throw new Error("Malformed WebVTT signature.");
        t.state = "HEADER";
      }
      let n = !1;
      for (; t.buffer; ) {
        if (!/\r\n|\n/.test(t.buffer))
          return this;
        switch (n ? n = !1 : r = s(), t.state) {
          case "HEADER":
            /:/.test(r) ? i(r) : r || (t.state = "ID");
            continue;
          case "NOTE":
            r || (t.state = "ID");
            continue;
          case "ID":
            if (/^NOTE($|[ \t])/.test(r)) {
              t.state = "NOTE";
              break;
            }
            if (!r)
              continue;
            if (t.cue = new ks(0, 0, ""), t.state = "CUE", r.indexOf("-->") === -1) {
              t.cue.id = r;
              continue;
            }
          case "CUE":
            if (!t.cue) {
              t.state = "BADCUE";
              continue;
            }
            try {
              Ho(r, t.cue, t.regionList);
            } catch {
              t.cue = null, t.state = "BADCUE";
              continue;
            }
            t.state = "CUETEXT";
            continue;
          case "CUETEXT":
            {
              const o = r.indexOf("-->") !== -1;
              if (!r || o && (n = !0)) {
                t.oncue && t.cue && t.oncue(t.cue), t.cue = null, t.state = "ID";
                continue;
              }
              if (t.cue === null)
                continue;
              t.cue.text && (t.cue.text += `
`), t.cue.text += r;
            }
            continue;
          case "BADCUE":
            r || (t.state = "ID");
        }
      }
    } catch {
      t.state === "CUETEXT" && t.cue && t.oncue && t.oncue(t.cue), t.cue = null, t.state = t.state === "INITIAL" ? "BADWEBVTT" : "BADCUE";
    }
    return this;
  }
  flush() {
    const e = this;
    try {
      if ((e.cue || e.state === "HEADER") && (e.buffer += `

`, e.parse()), e.state === "INITIAL" || e.state === "BADWEBVTT")
        throw new Error("Malformed WebVTT signature.");
    } catch (t) {
      e.onparsingerror && e.onparsingerror(t);
    }
    return e.onflush && e.onflush(), this;
  }
}
const Yo = /\r\n|\n\r|\n|\r/g, zt = function(e, t, s = 0) {
  return e.slice(s, s + t.length) === t;
}, qo = function(e) {
  let t = parseInt(e.slice(-3));
  const s = parseInt(e.slice(-6, -4)), i = parseInt(e.slice(-9, -7)), r = e.length > 9 ? parseInt(e.substring(0, e.indexOf(":"))) : 0;
  if (!O(t) || !O(s) || !O(i) || !O(r))
    throw Error(`Malformed X-TIMESTAMP-MAP: Local:${e}`);
  return t += 1e3 * s, t += 60 * 1e3 * i, t += 60 * 60 * 1e3 * r, t;
}, Xt = function(e) {
  let t = 5381, s = e.length;
  for (; s; )
    t = t * 33 ^ e.charCodeAt(--s);
  return (t >>> 0).toString();
};
function _s(a, e, t) {
  return Xt(a.toString()) + Xt(e.toString()) + Xt(t);
}
const jo = function(e, t, s) {
  let i = e[t], r = e[i.prevCC];
  if (!r || !r.new && i.new) {
    e.ccOffset = e.presentationOffset = i.start, i.new = !1;
    return;
  }
  for (; (n = r) != null && n.new; ) {
    var n;
    e.ccOffset += i.start - r.start, i.new = !1, i = r, r = e[i.prevCC];
  }
  e.presentationOffset = s;
};
function zo(a, e, t, s, i, r, n) {
  const o = new Wo(), l = Re(new Uint8Array(a)).trim().replace(Yo, `
`).split(`
`), c = [], h = e ? mo(e.baseTime, e.timescale) : 0;
  let u = "00:00.000", d = 0, g = 0, f, p = !0;
  o.oncue = function(T) {
    const E = t[s];
    let y = t.ccOffset;
    const x = (d - h) / 9e4;
    if (E != null && E.new && (g !== void 0 ? y = t.ccOffset = E.start : jo(t, s, x)), x) {
      if (!e) {
        f = new Error("Missing initPTS for VTT MPEGTS");
        return;
      }
      y = x - t.presentationOffset;
    }
    const I = T.endTime - T.startTime, S = ge((T.startTime + y - g) * 9e4, i * 9e4) / 9e4;
    T.startTime = Math.max(S, 0), T.endTime = Math.max(S + I, 0);
    const D = T.text.trim();
    T.text = decodeURIComponent(encodeURIComponent(D)), T.id || (T.id = _s(T.startTime, T.endTime, D)), T.endTime > 0 && c.push(T);
  }, o.onparsingerror = function(T) {
    f = T;
  }, o.onflush = function() {
    if (f) {
      n(f);
      return;
    }
    r(c);
  }, l.forEach((T) => {
    if (p)
      if (zt(T, "X-TIMESTAMP-MAP=")) {
        p = !1, T.slice(16).split(",").forEach((E) => {
          zt(E, "LOCAL:") ? u = E.slice(6) : zt(E, "MPEGTS:") && (d = parseInt(E.slice(7)));
        });
        try {
          g = qo(u) / 1e3;
        } catch (E) {
          f = E;
        }
        return;
      } else
        T === "" && (p = !1);
    o.parse(T + `
`);
  }), o.flush();
}
const Qt = "stpp.ttml.im1t", Pr = /^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/, Fr = /^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/, Xo = {
  left: "start",
  center: "center",
  right: "end",
  start: "start",
  end: "end"
};
function bi(a, e, t, s) {
  const i = V(new Uint8Array(a), ["mdat"]);
  if (i.length === 0) {
    s(new Error("Could not parse IMSC1 mdat"));
    return;
  }
  const r = i.map((o) => Re(o)), n = go(e.baseTime, 1, e.timescale);
  try {
    r.forEach((o) => t(Qo(o, n)));
  } catch (o) {
    s(o);
  }
}
function Qo(a, e) {
  const i = new DOMParser().parseFromString(a, "text/xml").getElementsByTagName("tt")[0];
  if (!i)
    throw new Error("Invalid ttml");
  const r = {
    frameRate: 30,
    subFrameRate: 1,
    frameRateMultiplier: 0,
    tickRate: 0
  }, n = Object.keys(r).reduce((u, d) => (u[d] = i.getAttribute(`ttp:${d}`) || r[d], u), {}), o = i.getAttribute("xml:space") !== "preserve", l = Di(Jt(i, "styling", "style")), c = Di(Jt(i, "layout", "region")), h = Jt(i, "body", "[begin]");
  return [].map.call(h, (u) => {
    const d = Or(u, o);
    if (!d || !u.hasAttribute("begin"))
      return null;
    const g = es(u.getAttribute("begin"), n), f = es(u.getAttribute("dur"), n);
    let p = es(u.getAttribute("end"), n);
    if (g === null)
      throw Ci(u);
    if (p === null) {
      if (f === null)
        throw Ci(u);
      p = g + f;
    }
    const T = new ks(g - e, p - e, d);
    T.id = _s(T.startTime, T.endTime, T.text);
    const E = c[u.getAttribute("region")], y = l[u.getAttribute("style")], x = Jo(E, y, l), {
      textAlign: I
    } = x;
    if (I) {
      const S = Xo[I];
      S && (T.lineAlign = S), T.align = I;
    }
    return se(T, x), T;
  }).filter((u) => u !== null);
}
function Jt(a, e, t) {
  const s = a.getElementsByTagName(e)[0];
  return s ? [].slice.call(s.querySelectorAll(t)) : [];
}
function Di(a) {
  return a.reduce((e, t) => {
    const s = t.getAttribute("xml:id");
    return s && (e[s] = t), e;
  }, {});
}
function Or(a, e) {
  return [].slice.call(a.childNodes).reduce((t, s, i) => {
    var r;
    return s.nodeName === "br" && i ? t + `
` : (r = s.childNodes) != null && r.length ? Or(s, e) : e ? t + s.textContent.trim().replace(/\s+/g, " ") : t + s.textContent;
  }, "");
}
function Jo(a, e, t) {
  const s = "http://www.w3.org/ns/ttml#styling";
  let i = null;
  const r = [
    "displayAlign",
    "textAlign",
    "color",
    "backgroundColor",
    "fontSize",
    "fontFamily"
    // 'fontWeight',
    // 'lineHeight',
    // 'wrapOption',
    // 'fontStyle',
    // 'direction',
    // 'writingMode'
  ], n = a != null && a.hasAttribute("style") ? a.getAttribute("style") : null;
  return n && t.hasOwnProperty(n) && (i = t[n]), r.reduce((o, l) => {
    const c = Zt(e, s, l) || Zt(a, s, l) || Zt(i, s, l);
    return c && (o[l] = c), o;
  }, {});
}
function Zt(a, e, t) {
  return a && a.hasAttributeNS(e, t) ? a.getAttributeNS(e, t) : null;
}
function Ci(a) {
  return new Error(`Could not parse ttml timestamp ${a}`);
}
function es(a, e) {
  if (!a)
    return null;
  let t = wr(a);
  return t === null && (Pr.test(a) ? t = Zo(a, e) : Fr.test(a) && (t = el(a, e))), t;
}
function Zo(a, e) {
  const t = Pr.exec(a), s = (t[4] | 0) + (t[5] | 0) / e.subFrameRate;
  return (t[1] | 0) * 3600 + (t[2] | 0) * 60 + (t[3] | 0) + s / e.frameRate;
}
function el(a, e) {
  const t = Fr.exec(a), s = Number(t[1]);
  switch (t[2]) {
    case "h":
      return s * 3600;
    case "m":
      return s * 60;
    case "ms":
      return s * 1e3;
    case "f":
      return s / e.frameRate;
    case "t":
      return s / e.tickRate;
  }
  return s;
}
class tl {
  constructor(e) {
    this.hls = void 0, this.media = null, this.config = void 0, this.enabled = !0, this.Cues = void 0, this.textTracks = [], this.tracks = [], this.initPTS = [], this.unparsedVttFrags = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.cea608Parser1 = void 0, this.cea608Parser2 = void 0, this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = ki(), this.captionsProperties = void 0, this.hls = e, this.config = e.config, this.Cues = e.config.cueHandler, this.captionsProperties = {
      textTrack1: {
        label: this.config.captionsTextTrack1Label,
        languageCode: this.config.captionsTextTrack1LanguageCode
      },
      textTrack2: {
        label: this.config.captionsTextTrack2Label,
        languageCode: this.config.captionsTextTrack2LanguageCode
      },
      textTrack3: {
        label: this.config.captionsTextTrack3Label,
        languageCode: this.config.captionsTextTrack3LanguageCode
      },
      textTrack4: {
        label: this.config.captionsTextTrack4Label,
        languageCode: this.config.captionsTextTrack4LanguageCode
      }
    }, e.on(m.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(m.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.on(m.FRAG_LOADING, this.onFragLoading, this), e.on(m.FRAG_LOADED, this.onFragLoaded, this), e.on(m.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.on(m.FRAG_DECRYPTED, this.onFragDecrypted, this), e.on(m.INIT_PTS_FOUND, this.onInitPtsFound, this), e.on(m.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.on(m.BUFFER_FLUSHING, this.onBufferFlushing, this);
  }
  destroy() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(m.SUBTITLE_TRACKS_UPDATED, this.onSubtitleTracksUpdated, this), e.off(m.FRAG_LOADING, this.onFragLoading, this), e.off(m.FRAG_LOADED, this.onFragLoaded, this), e.off(m.FRAG_PARSING_USERDATA, this.onFragParsingUserdata, this), e.off(m.FRAG_DECRYPTED, this.onFragDecrypted, this), e.off(m.INIT_PTS_FOUND, this.onInitPtsFound, this), e.off(m.SUBTITLE_TRACKS_CLEARED, this.onSubtitleTracksCleared, this), e.off(m.BUFFER_FLUSHING, this.onBufferFlushing, this), this.hls = this.config = null, this.cea608Parser1 = this.cea608Parser2 = void 0;
  }
  initCea608Parsers() {
    if (this.config.enableCEA708Captions && (!this.cea608Parser1 || !this.cea608Parser2)) {
      const e = new ut(this, "textTrack1"), t = new ut(this, "textTrack2"), s = new ut(this, "textTrack3"), i = new ut(this, "textTrack4");
      this.cea608Parser1 = new Li(1, e, t), this.cea608Parser2 = new Li(3, s, i);
    }
  }
  addCues(e, t, s, i, r) {
    let n = !1;
    for (let o = r.length; o--; ) {
      const l = r[o], c = sl(l[0], l[1], t, s);
      if (c >= 0 && (l[0] = Math.min(l[0], t), l[1] = Math.max(l[1], s), n = !0, c / (s - t) > 0.5))
        return;
    }
    if (n || r.push([t, s]), this.config.renderTextTracksNatively) {
      const o = this.captionsTracks[e];
      this.Cues.newCue(o, t, s, i);
    } else {
      const o = this.Cues.newCue(null, t, s, i);
      this.hls.trigger(m.CUES_PARSED, {
        type: "captions",
        cues: o,
        track: e
      });
    }
  }
  // Triggered when an initial PTS is found; used for synchronisation of WebVTT.
  onInitPtsFound(e, {
    frag: t,
    id: s,
    initPTS: i,
    timescale: r
  }) {
    const {
      unparsedVttFrags: n
    } = this;
    s === "main" && (this.initPTS[t.cc] = {
      baseTime: i,
      timescale: r
    }), n.length && (this.unparsedVttFrags = [], n.forEach((o) => {
      this.onFragLoaded(m.FRAG_LOADED, o);
    }));
  }
  getExistingTrack(e, t) {
    const {
      media: s
    } = this;
    if (s)
      for (let i = 0; i < s.textTracks.length; i++) {
        const r = s.textTracks[i];
        if (wi(r, {
          name: e,
          lang: t,
          attrs: {}
        }))
          return r;
      }
    return null;
  }
  createCaptionsTrack(e) {
    this.config.renderTextTracksNatively ? this.createNativeTrack(e) : this.createNonNativeTrack(e);
  }
  createNativeTrack(e) {
    if (this.captionsTracks[e])
      return;
    const {
      captionsProperties: t,
      captionsTracks: s,
      media: i
    } = this, {
      label: r,
      languageCode: n
    } = t[e], o = this.getExistingTrack(r, n);
    if (o)
      s[e] = o, He(s[e]), tr(s[e], i);
    else {
      const l = this.createTextTrack("captions", r, n);
      l && (l[e] = !0, s[e] = l);
    }
  }
  createNonNativeTrack(e) {
    if (this.nonNativeCaptionsTracks[e])
      return;
    const t = this.captionsProperties[e];
    if (!t)
      return;
    const s = t.label, i = {
      _id: e,
      label: s,
      kind: "captions",
      default: t.media ? !!t.media.default : !1,
      closedCaptions: t.media
    };
    this.nonNativeCaptionsTracks[e] = i, this.hls.trigger(m.NON_NATIVE_TEXT_TRACKS_FOUND, {
      tracks: [i]
    });
  }
  createTextTrack(e, t, s) {
    const i = this.media;
    if (i)
      return i.addTextTrack(e, t, s);
  }
  onMediaAttaching(e, t) {
    this.media = t.media, this._cleanTracks();
  }
  onMediaDetaching() {
    const {
      captionsTracks: e
    } = this;
    Object.keys(e).forEach((t) => {
      He(e[t]), delete e[t];
    }), this.nonNativeCaptionsTracks = {};
  }
  onManifestLoading() {
    this.lastCc = -1, this.lastSn = -1, this.lastPartIndex = -1, this.prevCC = -1, this.vttCCs = ki(), this._cleanTracks(), this.tracks = [], this.captionsTracks = {}, this.nonNativeCaptionsTracks = {}, this.textTracks = [], this.unparsedVttFrags = [], this.initPTS = [], this.cea608Parser1 && this.cea608Parser2 && (this.cea608Parser1.reset(), this.cea608Parser2.reset());
  }
  _cleanTracks() {
    const {
      media: e
    } = this;
    if (!e)
      return;
    const t = e.textTracks;
    if (t)
      for (let s = 0; s < t.length; s++)
        He(t[s]);
  }
  onSubtitleTracksUpdated(e, t) {
    const s = t.subtitleTracks || [], i = s.some((r) => r.textCodec === Qt);
    if (this.config.enableWebVTT || i && this.config.enableIMSC1) {
      if (br(this.tracks, s)) {
        this.tracks = s;
        return;
      }
      if (this.textTracks = [], this.tracks = s, this.config.renderTextTracksNatively) {
        const n = this.media, o = n ? mt(n.textTracks) : null;
        if (this.tracks.forEach((l, c) => {
          let h;
          if (o) {
            let u = null;
            for (let d = 0; d < o.length; d++)
              if (o[d] && wi(o[d], l)) {
                u = o[d], o[d] = null;
                break;
              }
            u && (h = u);
          }
          if (h)
            He(h);
          else {
            const u = Mr(l);
            h = this.createTextTrack(u, l.name, l.lang), h && (h.mode = "disabled");
          }
          h && this.textTracks.push(h);
        }), o != null && o.length) {
          const l = o.filter((c) => c !== null).map((c) => c.label);
          l.length && v.warn(`Media element contains unused subtitle tracks: ${l.join(", ")}. Replace media element for each source to clear TextTracks and captions menu.`);
        }
      } else if (this.tracks.length) {
        const n = this.tracks.map((o) => ({
          label: o.name,
          kind: o.type.toLowerCase(),
          default: o.default,
          subtitleTrack: o
        }));
        this.hls.trigger(m.NON_NATIVE_TEXT_TRACKS_FOUND, {
          tracks: n
        });
      }
    }
  }
  onManifestLoaded(e, t) {
    this.config.enableCEA708Captions && t.captions && t.captions.forEach((s) => {
      const i = /(?:CC|SERVICE)([1-4])/.exec(s.instreamId);
      if (!i)
        return;
      const r = `textTrack${i[1]}`, n = this.captionsProperties[r];
      n && (n.label = s.name, s.lang && (n.languageCode = s.lang), n.media = s);
    });
  }
  closedCaptionsForLevel(e) {
    const t = this.hls.levels[e.level];
    return t == null ? void 0 : t.attrs["CLOSED-CAPTIONS"];
  }
  onFragLoading(e, t) {
    this.initCea608Parsers();
    const {
      cea608Parser1: s,
      cea608Parser2: i,
      lastCc: r,
      lastSn: n,
      lastPartIndex: o
    } = this;
    if (!(!this.enabled || !s || !i) && t.frag.type === N.MAIN) {
      var l, c;
      const {
        cc: h,
        sn: u
      } = t.frag, d = (l = t == null || (c = t.part) == null ? void 0 : c.index) != null ? l : -1;
      u === n + 1 || u === n && d === o + 1 || h === r || (s.reset(), i.reset()), this.lastCc = h, this.lastSn = u, this.lastPartIndex = d;
    }
  }
  onFragLoaded(e, t) {
    const {
      frag: s,
      payload: i
    } = t;
    if (s.type === N.SUBTITLE)
      if (i.byteLength) {
        const r = s.decryptdata, n = "stats" in t;
        if (r == null || !r.encrypted || n) {
          const o = this.tracks[s.level], l = this.vttCCs;
          l[s.cc] || (l[s.cc] = {
            start: s.start,
            prevCC: this.prevCC,
            new: !0
          }, this.prevCC = s.cc), o && o.textCodec === Qt ? this._parseIMSC1(s, i) : this._parseVTTs(t);
        }
      } else
        this.hls.trigger(m.SUBTITLE_FRAG_PROCESSED, {
          success: !1,
          frag: s,
          error: new Error("Empty subtitle payload")
        });
  }
  _parseIMSC1(e, t) {
    const s = this.hls;
    bi(t, this.initPTS[e.cc], (i) => {
      this._appendCues(i, e.level), s.trigger(m.SUBTITLE_FRAG_PROCESSED, {
        success: !0,
        frag: e
      });
    }, (i) => {
      v.log(`Failed to parse IMSC1: ${i}`), s.trigger(m.SUBTITLE_FRAG_PROCESSED, {
        success: !1,
        frag: e,
        error: i
      });
    });
  }
  _parseVTTs(e) {
    var t;
    const {
      frag: s,
      payload: i
    } = e, {
      initPTS: r,
      unparsedVttFrags: n
    } = this, o = r.length - 1;
    if (!r[s.cc] && o === -1) {
      n.push(e);
      return;
    }
    const l = this.hls, c = (t = s.initSegment) != null && t.data ? me(s.initSegment.data, new Uint8Array(i)) : i;
    zo(c, this.initPTS[s.cc], this.vttCCs, s.cc, s.start, (h) => {
      this._appendCues(h, s.level), l.trigger(m.SUBTITLE_FRAG_PROCESSED, {
        success: !0,
        frag: s
      });
    }, (h) => {
      const u = h.message === "Missing initPTS for VTT MPEGTS";
      u ? n.push(e) : this._fallbackToIMSC1(s, i), v.log(`Failed to parse VTT cue: ${h}`), !(u && o > s.cc) && l.trigger(m.SUBTITLE_FRAG_PROCESSED, {
        success: !1,
        frag: s,
        error: h
      });
    });
  }
  _fallbackToIMSC1(e, t) {
    const s = this.tracks[e.level];
    s.textCodec || bi(t, this.initPTS[e.cc], () => {
      s.textCodec = Qt, this._parseIMSC1(e, t);
    }, () => {
      s.textCodec = "wvtt";
    });
  }
  _appendCues(e, t) {
    const s = this.hls;
    if (this.config.renderTextTracksNatively) {
      const i = this.textTracks[t];
      if (!i || i.mode === "disabled")
        return;
      e.forEach((r) => sr(i, r));
    } else {
      const i = this.tracks[t];
      if (!i)
        return;
      const r = i.default ? "default" : "subtitles" + t;
      s.trigger(m.CUES_PARSED, {
        type: "subtitles",
        cues: e,
        track: r
      });
    }
  }
  onFragDecrypted(e, t) {
    const {
      frag: s
    } = t;
    s.type === N.SUBTITLE && this.onFragLoaded(m.FRAG_LOADED, t);
  }
  onSubtitleTracksCleared() {
    this.tracks = [], this.captionsTracks = {};
  }
  onFragParsingUserdata(e, t) {
    this.initCea608Parsers();
    const {
      cea608Parser1: s,
      cea608Parser2: i
    } = this;
    if (!this.enabled || !s || !i)
      return;
    const {
      frag: r,
      samples: n
    } = t;
    if (!(r.type === N.MAIN && this.closedCaptionsForLevel(r) === "NONE"))
      for (let o = 0; o < n.length; o++) {
        const l = n[o].bytes;
        if (l) {
          const c = this.extractCea608Data(l);
          s.addData(n[o].pts, c[0]), i.addData(n[o].pts, c[1]);
        }
      }
  }
  onBufferFlushing(e, {
    startOffset: t,
    endOffset: s,
    endOffsetSubtitles: i,
    type: r
  }) {
    const {
      media: n
    } = this;
    if (!(!n || n.currentTime < s)) {
      if (!r || r === "video") {
        const {
          captionsTracks: o
        } = this;
        Object.keys(o).forEach((l) => ns(o[l], t, s));
      }
      if (this.config.renderTextTracksNatively && t === 0 && i !== void 0) {
        const {
          textTracks: o
        } = this;
        Object.keys(o).forEach((l) => ns(o[l], t, i));
      }
    }
  }
  extractCea608Data(e) {
    const t = [[], []], s = e[0] & 31;
    let i = 2;
    for (let r = 0; r < s; r++) {
      const n = e[i++], o = 127 & e[i++], l = 127 & e[i++];
      if (o === 0 && l === 0)
        continue;
      if ((4 & n) !== 0) {
        const h = 3 & n;
        (h === 0 || h === 1) && (t[h].push(o), t[h].push(l));
      }
    }
    return t;
  }
}
function Mr(a) {
  return a.characteristics && /transcribes-spoken-dialog/gi.test(a.characteristics) && /describes-music-and-sound/gi.test(a.characteristics) ? "captions" : "subtitles";
}
function wi(a, e) {
  return !!a && a.kind === Mr(e) && us(e, a);
}
function sl(a, e, t, s) {
  return Math.min(e, s) - Math.max(a, t);
}
function ki() {
  return {
    ccOffset: 0,
    presentationOffset: 0,
    0: {
      start: 0,
      prevCC: -1,
      new: !0
    }
  };
}
class Ps {
  constructor(e) {
    this.hls = void 0, this.autoLevelCapping = void 0, this.firstLevel = void 0, this.media = void 0, this.restrictedLevels = void 0, this.timer = void 0, this.clientRect = void 0, this.streamController = void 0, this.hls = e, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.firstLevel = -1, this.media = null, this.restrictedLevels = [], this.timer = void 0, this.clientRect = null, this.registerListeners();
  }
  setStreamController(e) {
    this.streamController = e;
  }
  destroy() {
    this.hls && this.unregisterListener(), this.timer && this.stopCapping(), this.media = null, this.clientRect = null, this.hls = this.streamController = null;
  }
  registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), e.on(m.MEDIA_ATTACHING, this.onMediaAttaching, this), e.on(m.MANIFEST_PARSED, this.onManifestParsed, this), e.on(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(m.BUFFER_CODECS, this.onBufferCodecs, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this);
  }
  unregisterListener() {
    const {
      hls: e
    } = this;
    e.off(m.FPS_DROP_LEVEL_CAPPING, this.onFpsDropLevelCapping, this), e.off(m.MEDIA_ATTACHING, this.onMediaAttaching, this), e.off(m.MANIFEST_PARSED, this.onManifestParsed, this), e.off(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(m.BUFFER_CODECS, this.onBufferCodecs, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this);
  }
  onFpsDropLevelCapping(e, t) {
    const s = this.hls.levels[t.droppedLevel];
    this.isLevelAllowed(s) && this.restrictedLevels.push({
      bitrate: s.bitrate,
      height: s.height,
      width: s.width
    });
  }
  onMediaAttaching(e, t) {
    this.media = t.media instanceof HTMLVideoElement ? t.media : null, this.clientRect = null, this.timer && this.hls.levels.length && this.detectPlayerSize();
  }
  onManifestParsed(e, t) {
    const s = this.hls;
    this.restrictedLevels = [], this.firstLevel = t.firstLevel, s.config.capLevelToPlayerSize && t.video && this.startCapping();
  }
  onLevelsUpdated(e, t) {
    this.timer && O(this.autoLevelCapping) && this.detectPlayerSize();
  }
  // Only activate capping when playing a video stream; otherwise, multi-bitrate audio-only streams will be restricted
  // to the first level
  onBufferCodecs(e, t) {
    this.hls.config.capLevelToPlayerSize && t.video && this.startCapping();
  }
  onMediaDetaching() {
    this.stopCapping();
  }
  detectPlayerSize() {
    if (this.media) {
      if (this.mediaHeight <= 0 || this.mediaWidth <= 0) {
        this.clientRect = null;
        return;
      }
      const e = this.hls.levels;
      if (e.length) {
        const t = this.hls, s = this.getMaxLevel(e.length - 1);
        s !== this.autoLevelCapping && v.log(`Setting autoLevelCapping to ${s}: ${e[s].height}p@${e[s].bitrate} for media ${this.mediaWidth}x${this.mediaHeight}`), t.autoLevelCapping = s, t.autoLevelCapping > this.autoLevelCapping && this.streamController && this.streamController.nextLevelSwitch(), this.autoLevelCapping = t.autoLevelCapping;
      }
    }
  }
  /*
   * returns level should be the one with the dimensions equal or greater than the media (player) dimensions (so the video will be downscaled)
   */
  getMaxLevel(e) {
    const t = this.hls.levels;
    if (!t.length)
      return -1;
    const s = t.filter((i, r) => this.isLevelAllowed(i) && r <= e);
    return this.clientRect = null, Ps.getMaxLevelByMediaSize(s, this.mediaWidth, this.mediaHeight);
  }
  startCapping() {
    this.timer || (this.autoLevelCapping = Number.POSITIVE_INFINITY, self.clearInterval(this.timer), this.timer = self.setInterval(this.detectPlayerSize.bind(this), 1e3), this.detectPlayerSize());
  }
  stopCapping() {
    this.restrictedLevels = [], this.firstLevel = -1, this.autoLevelCapping = Number.POSITIVE_INFINITY, this.timer && (self.clearInterval(this.timer), this.timer = void 0);
  }
  getDimensions() {
    if (this.clientRect)
      return this.clientRect;
    const e = this.media, t = {
      width: 0,
      height: 0
    };
    if (e) {
      const s = e.getBoundingClientRect();
      t.width = s.width, t.height = s.height, !t.width && !t.height && (t.width = s.right - s.left || e.width || 0, t.height = s.bottom - s.top || e.height || 0);
    }
    return this.clientRect = t, t;
  }
  get mediaWidth() {
    return this.getDimensions().width * this.contentScaleFactor;
  }
  get mediaHeight() {
    return this.getDimensions().height * this.contentScaleFactor;
  }
  get contentScaleFactor() {
    let e = 1;
    if (!this.hls.config.ignoreDevicePixelRatio)
      try {
        e = self.devicePixelRatio;
      } catch {
      }
    return e;
  }
  isLevelAllowed(e) {
    return !this.restrictedLevels.some((s) => e.bitrate === s.bitrate && e.width === s.width && e.height === s.height);
  }
  static getMaxLevelByMediaSize(e, t, s) {
    if (!(e != null && e.length))
      return -1;
    const i = (o, l) => l ? o.width !== l.width || o.height !== l.height : !0;
    let r = e.length - 1;
    const n = Math.max(t, s);
    for (let o = 0; o < e.length; o += 1) {
      const l = e[o];
      if ((l.width >= n || l.height >= n) && i(l, e[o + 1])) {
        r = o;
        break;
      }
    }
    return r;
  }
}
class il {
  constructor(e) {
    this.hls = void 0, this.isVideoPlaybackQualityAvailable = !1, this.timer = void 0, this.media = null, this.lastTime = void 0, this.lastDroppedFrames = 0, this.lastDecodedFrames = 0, this.streamController = void 0, this.hls = e, this.registerListeners();
  }
  setStreamController(e) {
    this.streamController = e;
  }
  registerListeners() {
    this.hls.on(m.MEDIA_ATTACHING, this.onMediaAttaching, this);
  }
  unregisterListeners() {
    this.hls.off(m.MEDIA_ATTACHING, this.onMediaAttaching, this);
  }
  destroy() {
    this.timer && clearInterval(this.timer), this.unregisterListeners(), this.isVideoPlaybackQualityAvailable = !1, this.media = null;
  }
  onMediaAttaching(e, t) {
    const s = this.hls.config;
    if (s.capLevelOnFPSDrop) {
      const i = t.media instanceof self.HTMLVideoElement ? t.media : null;
      this.media = i, i && typeof i.getVideoPlaybackQuality == "function" && (this.isVideoPlaybackQualityAvailable = !0), self.clearInterval(this.timer), this.timer = self.setInterval(this.checkFPSInterval.bind(this), s.fpsDroppedMonitoringPeriod);
    }
  }
  checkFPS(e, t, s) {
    const i = performance.now();
    if (t) {
      if (this.lastTime) {
        const r = i - this.lastTime, n = s - this.lastDroppedFrames, o = t - this.lastDecodedFrames, l = 1e3 * n / r, c = this.hls;
        if (c.trigger(m.FPS_DROP, {
          currentDropped: n,
          currentDecoded: o,
          totalDroppedFrames: s
        }), l > 0 && n > c.config.fpsDroppedMonitoringThreshold * o) {
          let h = c.currentLevel;
          v.warn("drop FPS ratio greater than max allowed value for currentLevel: " + h), h > 0 && (c.autoLevelCapping === -1 || c.autoLevelCapping >= h) && (h = h - 1, c.trigger(m.FPS_DROP_LEVEL_CAPPING, {
            level: h,
            droppedLevel: c.currentLevel
          }), c.autoLevelCapping = h, this.streamController.nextLevelSwitch());
        }
      }
      this.lastTime = i, this.lastDroppedFrames = s, this.lastDecodedFrames = t;
    }
  }
  checkFPSInterval() {
    const e = this.media;
    if (e)
      if (this.isVideoPlaybackQualityAvailable) {
        const t = e.getVideoPlaybackQuality();
        this.checkFPS(e, t.totalVideoFrames, t.droppedVideoFrames);
      } else
        this.checkFPS(e, e.webkitDecodedFrameCount, e.webkitDroppedFrameCount);
  }
}
const ft = "[eme]";
class qe {
  constructor(e) {
    this.hls = void 0, this.config = void 0, this.media = null, this.keyFormatPromise = null, this.keySystemAccessPromises = {}, this._requestLicenseFailureCount = 0, this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, this.setMediaKeysQueue = qe.CDMCleanupPromise ? [qe.CDMCleanupPromise] : [], this.onMediaEncrypted = this._onMediaEncrypted.bind(this), this.onWaitingForKey = this._onWaitingForKey.bind(this), this.debug = v.debug.bind(v, ft), this.log = v.log.bind(v, ft), this.warn = v.warn.bind(v, ft), this.error = v.error.bind(v, ft), this.hls = e, this.config = e.config, this.registerListeners();
  }
  destroy() {
    this.unregisterListeners(), this.onMediaDetached();
    const e = this.config;
    e.requestMediaKeySystemAccessFunc = null, e.licenseXhrSetup = e.licenseResponseCallback = void 0, e.drmSystems = e.drmSystemOptions = {}, this.hls = this.onMediaEncrypted = this.onWaitingForKey = this.keyIdToKeySessionPromise = null, this.config = null;
  }
  registerListeners() {
    this.hls.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.on(m.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.on(m.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.on(m.MANIFEST_LOADED, this.onManifestLoaded, this);
  }
  unregisterListeners() {
    this.hls.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), this.hls.off(m.MEDIA_DETACHED, this.onMediaDetached, this), this.hls.off(m.MANIFEST_LOADING, this.onManifestLoading, this), this.hls.off(m.MANIFEST_LOADED, this.onManifestLoaded, this);
  }
  getLicenseServerUrl(e) {
    const {
      drmSystems: t,
      widevineLicenseUrl: s
    } = this.config, i = t[e];
    if (i)
      return i.licenseUrl;
    if (e === Z.WIDEVINE && s)
      return s;
    throw new Error(`no license server URL configured for key-system "${e}"`);
  }
  getServerCertificateUrl(e) {
    const {
      drmSystems: t
    } = this.config, s = t[e];
    if (s)
      return s.serverCertificateUrl;
    this.log(`No Server Certificate in config.drmSystems["${e}"]`);
  }
  attemptKeySystemAccess(e) {
    const t = this.hls.levels, s = (n, o, l) => !!n && l.indexOf(n) === o, i = t.map((n) => n.audioCodec).filter(s), r = t.map((n) => n.videoCodec).filter(s);
    return i.length + r.length === 0 && r.push("avc1.42e01e"), new Promise((n, o) => {
      const l = (c) => {
        const h = c.shift();
        this.getMediaKeysPromise(h, i, r).then((u) => n({
          keySystem: h,
          mediaKeys: u
        })).catch((u) => {
          c.length ? l(c) : u instanceof fe ? o(u) : o(new fe({
            type: U.KEY_SYSTEM_ERROR,
            details: L.KEY_SYSTEM_NO_ACCESS,
            error: u,
            fatal: !0
          }, u.message));
        });
      };
      l(e);
    });
  }
  requestMediaKeySystemAccess(e, t) {
    const {
      requestMediaKeySystemAccessFunc: s
    } = this.config;
    if (typeof s != "function") {
      let i = `Configured requestMediaKeySystemAccess is not a function ${s}`;
      return Ki === null && self.location.protocol === "http:" && (i = `navigator.requestMediaKeySystemAccess is not available over insecure protocol ${location.protocol}`), Promise.reject(new Error(i));
    }
    return s(e, t);
  }
  getMediaKeysPromise(e, t, s) {
    const i = fn(e, t, s, this.config.drmSystemOptions), r = this.keySystemAccessPromises[e];
    let n = r == null ? void 0 : r.keySystemAccess;
    if (!n) {
      this.log(`Requesting encrypted media "${e}" key-system access with config: ${JSON.stringify(i)}`), n = this.requestMediaKeySystemAccess(e, i);
      const o = this.keySystemAccessPromises[e] = {
        keySystemAccess: n
      };
      return n.catch((l) => {
        this.log(`Failed to obtain access to key-system "${e}": ${l}`);
      }), n.then((l) => {
        this.log(`Access for key-system "${l.keySystem}" obtained`);
        const c = this.fetchServerCertificate(e);
        return this.log(`Create media-keys for "${e}"`), o.mediaKeys = l.createMediaKeys().then((h) => (this.log(`Media-keys created for "${e}"`), c.then((u) => u ? this.setMediaKeysServerCertificate(h, e, u) : h))), o.mediaKeys.catch((h) => {
          this.error(`Failed to create media-keys for "${e}"}: ${h}`);
        }), o.mediaKeys;
      });
    }
    return n.then(() => r.mediaKeys);
  }
  createMediaKeySessionContext({
    decryptdata: e,
    keySystem: t,
    mediaKeys: s
  }) {
    this.log(`Creating key-system session "${t}" keyId: ${Se.hexDump(e.keyId || [])}`);
    const i = s.createSession(), r = {
      decryptdata: e,
      keySystem: t,
      mediaKeys: s,
      mediaKeysSession: i,
      keyStatus: "status-pending"
    };
    return this.mediaKeySessions.push(r), r;
  }
  renewKeySession(e) {
    const t = e.decryptdata;
    if (t.pssh) {
      const s = this.createMediaKeySessionContext(e), i = this.getKeyIdString(t), r = "cenc";
      this.keyIdToKeySessionPromise[i] = this.generateRequestWithPreferredKeySession(s, r, t.pssh, "expired");
    } else
      this.warn("Could not renew expired session. Missing pssh initData.");
    this.removeSession(e);
  }
  getKeyIdString(e) {
    if (!e)
      throw new Error("Could not read keyId of undefined decryptdata");
    if (e.keyId === null)
      throw new Error("keyId is null");
    return Se.hexDump(e.keyId);
  }
  updateKeySession(e, t) {
    var s;
    const i = e.mediaKeysSession;
    return this.log(`Updating key-session "${i.sessionId}" for keyID ${Se.hexDump(((s = e.decryptdata) == null ? void 0 : s.keyId) || [])}
      } (data length: ${t && t.byteLength})`), i.update(t);
  }
  selectKeySystemFormat(e) {
    const t = Object.keys(e.levelkeys || {});
    return this.keyFormatPromise || (this.log(`Selecting key-system from fragment (sn: ${e.sn} ${e.type}: ${e.level}) key formats ${t.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(t)), this.keyFormatPromise;
  }
  getKeyFormatPromise(e) {
    return new Promise((t, s) => {
      const i = Mt(this.config), r = e.map(Ns).filter((n) => !!n && i.indexOf(n) !== -1);
      return this.getKeySystemSelectionPromise(r).then(({
        keySystem: n
      }) => {
        const o = Us(n);
        o ? t(o) : s(new Error(`Unable to find format for key-system "${n}"`));
      }).catch(s);
    });
  }
  loadKey(e) {
    const t = e.keyInfo.decryptdata, s = this.getKeyIdString(t), i = `(keyId: ${s} format: "${t.keyFormat}" method: ${t.method} uri: ${t.uri})`;
    this.log(`Starting session for key ${i}`);
    let r = this.keyIdToKeySessionPromise[s];
    return r || (r = this.keyIdToKeySessionPromise[s] = this.getKeySystemForKeyPromise(t).then(({
      keySystem: n,
      mediaKeys: o
    }) => (this.throwIfDestroyed(), this.log(`Handle encrypted media sn: ${e.frag.sn} ${e.frag.type}: ${e.frag.level} using key ${i}`), this.attemptSetMediaKeys(n, o).then(() => {
      this.throwIfDestroyed();
      const l = this.createMediaKeySessionContext({
        keySystem: n,
        mediaKeys: o,
        decryptdata: t
      });
      return this.generateRequestWithPreferredKeySession(l, "cenc", t.pssh, "playlist-key");
    }))), r.catch((n) => this.handleError(n))), r;
  }
  throwIfDestroyed(e = "Invalid state") {
    if (!this.hls)
      throw new Error("invalid state");
  }
  handleError(e) {
    this.hls && (this.error(e.message), e instanceof fe ? this.hls.trigger(m.ERROR, e.data) : this.hls.trigger(m.ERROR, {
      type: U.KEY_SYSTEM_ERROR,
      details: L.KEY_SYSTEM_NO_KEYS,
      error: e,
      fatal: !0
    }));
  }
  getKeySystemForKeyPromise(e) {
    const t = this.getKeyIdString(e), s = this.keyIdToKeySessionPromise[t];
    if (!s) {
      const i = Ns(e.keyFormat), r = i ? [i] : Mt(this.config);
      return this.attemptKeySystemAccess(r);
    }
    return s;
  }
  getKeySystemSelectionPromise(e) {
    if (e.length || (e = Mt(this.config)), e.length === 0)
      throw new fe({
        type: U.KEY_SYSTEM_ERROR,
        details: L.KEY_SYSTEM_NO_CONFIGURED_LICENSE,
        fatal: !0
      }, `Missing key-system license configuration options ${JSON.stringify({
        drmSystems: this.config.drmSystems
      })}`);
    return this.attemptKeySystemAccess(e);
  }
  _onMediaEncrypted(e) {
    const {
      initDataType: t,
      initData: s
    } = e;
    if (this.debug(`"${e.type}" event: init data type: "${t}"`), s === null)
      return;
    let i, r;
    if (t === "sinf" && this.config.drmSystems[Z.FAIRPLAY]) {
      const h = ie(new Uint8Array(s));
      try {
        const u = Es(JSON.parse(h).sinf), d = Xi(new Uint8Array(u));
        if (!d)
          return;
        i = d.subarray(8, 24), r = Z.FAIRPLAY;
      } catch {
        this.warn('Failed to parse sinf "encrypted" event message initData');
        return;
      }
    } else {
      const h = Un(s);
      if (h === null)
        return;
      h.version === 0 && h.systemId === Gi.WIDEVINE && h.data && (i = h.data.subarray(8, 24)), r = dn(h.systemId);
    }
    if (!r || !i)
      return;
    const n = Se.hexDump(i), {
      keyIdToKeySessionPromise: o,
      mediaKeySessions: l
    } = this;
    let c = o[n];
    for (let h = 0; h < l.length; h++) {
      const u = l[h], d = u.decryptdata;
      if (d.pssh || !d.keyId)
        continue;
      const g = Se.hexDump(d.keyId);
      if (n === g || d.uri.replace(/-/g, "").indexOf(n) !== -1) {
        c = o[g], delete o[g], d.pssh = new Uint8Array(s), d.keyId = i, c = o[n] = c.then(() => this.generateRequestWithPreferredKeySession(u, t, s, "encrypted-event-key-match"));
        break;
      }
    }
    c || (c = o[n] = this.getKeySystemSelectionPromise([r]).then(({
      keySystem: h,
      mediaKeys: u
    }) => {
      var d;
      this.throwIfDestroyed();
      const g = new it("ISO-23001-7", n, (d = Us(h)) != null ? d : "");
      return g.pssh = new Uint8Array(s), g.keyId = i, this.attemptSetMediaKeys(h, u).then(() => {
        this.throwIfDestroyed();
        const f = this.createMediaKeySessionContext({
          decryptdata: g,
          keySystem: h,
          mediaKeys: u
        });
        return this.generateRequestWithPreferredKeySession(f, t, s, "encrypted-event-no-match");
      });
    })), c.catch((h) => this.handleError(h));
  }
  _onWaitingForKey(e) {
    this.log(`"${e.type}" event`);
  }
  attemptSetMediaKeys(e, t) {
    const s = this.setMediaKeysQueue.slice();
    this.log(`Setting media-keys for "${e}"`);
    const i = Promise.all(s).then(() => {
      if (!this.media)
        throw new Error("Attempted to set mediaKeys without media element attached");
      return this.media.setMediaKeys(t);
    });
    return this.setMediaKeysQueue.push(i), i.then(() => {
      this.log(`Media-keys set for "${e}"`), s.push(i), this.setMediaKeysQueue = this.setMediaKeysQueue.filter((r) => s.indexOf(r) === -1);
    });
  }
  generateRequestWithPreferredKeySession(e, t, s, i) {
    var r, n;
    const o = (r = this.config.drmSystems) == null || (n = r[e.keySystem]) == null ? void 0 : n.generateRequest;
    if (o)
      try {
        const f = o.call(this.hls, t, s, e);
        if (!f)
          throw new Error("Invalid response from configured generateRequest filter");
        t = f.initDataType, s = e.decryptdata.pssh = f.initData ? new Uint8Array(f.initData) : null;
      } catch (f) {
        var l;
        if (this.warn(f.message), (l = this.hls) != null && l.config.debug)
          throw f;
      }
    if (s === null)
      return this.log(`Skipping key-session request for "${i}" (no initData)`), Promise.resolve(e);
    const c = this.getKeyIdString(e.decryptdata);
    this.log(`Generating key-session request for "${i}": ${c} (init data type: ${t} length: ${s ? s.byteLength : null})`);
    const h = new ws(), u = e._onmessage = (f) => {
      const p = e.mediaKeysSession;
      if (!p) {
        h.emit("error", new Error("invalid state"));
        return;
      }
      const {
        messageType: T,
        message: E
      } = f;
      this.log(`"${T}" message event for session "${p.sessionId}" message size: ${E.byteLength}`), T === "license-request" || T === "license-renewal" ? this.renewLicense(e, E).catch((y) => {
        this.handleError(y), h.emit("error", y);
      }) : T === "license-release" ? e.keySystem === Z.FAIRPLAY && (this.updateKeySession(e, is("acknowledged")), this.removeSession(e)) : this.warn(`unhandled media key message type "${T}"`);
    }, d = e._onkeystatuseschange = (f) => {
      if (!e.mediaKeysSession) {
        h.emit("error", new Error("invalid state"));
        return;
      }
      this.onKeyStatusChange(e);
      const T = e.keyStatus;
      h.emit("keyStatus", T), T === "expired" && (this.warn(`${e.keySystem} expired for key ${c}`), this.renewKeySession(e));
    };
    e.mediaKeysSession.addEventListener("message", u), e.mediaKeysSession.addEventListener("keystatuseschange", d);
    const g = new Promise((f, p) => {
      h.on("error", p), h.on("keyStatus", (T) => {
        T.startsWith("usable") ? f() : T === "output-restricted" ? p(new fe({
          type: U.KEY_SYSTEM_ERROR,
          details: L.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,
          fatal: !1
        }, "HDCP level output restricted")) : T === "internal-error" ? p(new fe({
          type: U.KEY_SYSTEM_ERROR,
          details: L.KEY_SYSTEM_STATUS_INTERNAL_ERROR,
          fatal: !0
        }, `key status changed to "${T}"`)) : T === "expired" ? p(new Error("key expired while generating request")) : this.warn(`unhandled key status change "${T}"`);
      });
    });
    return e.mediaKeysSession.generateRequest(t, s).then(() => {
      var f;
      this.log(`Request generated for key-session "${(f = e.mediaKeysSession) == null ? void 0 : f.sessionId}" keyId: ${c}`);
    }).catch((f) => {
      throw new fe({
        type: U.KEY_SYSTEM_ERROR,
        details: L.KEY_SYSTEM_NO_SESSION,
        error: f,
        fatal: !1
      }, `Error generating key-session request: ${f}`);
    }).then(() => g).catch((f) => {
      throw h.removeAllListeners(), this.removeSession(e), f;
    }).then(() => (h.removeAllListeners(), e));
  }
  onKeyStatusChange(e) {
    e.mediaKeysSession.keyStatuses.forEach((t, s) => {
      this.log(`key status change "${t}" for keyStatuses keyId: ${Se.hexDump("buffer" in s ? new Uint8Array(s.buffer, s.byteOffset, s.byteLength) : new Uint8Array(s))} session keyId: ${Se.hexDump(new Uint8Array(e.decryptdata.keyId || []))} uri: ${e.decryptdata.uri}`), e.keyStatus = t;
    });
  }
  fetchServerCertificate(e) {
    const t = this.config, s = t.loader, i = new s(t), r = this.getServerCertificateUrl(e);
    return r ? (this.log(`Fetching server certificate for "${e}"`), new Promise((n, o) => {
      const l = {
        responseType: "arraybuffer",
        url: r
      }, c = t.certLoadPolicy.default, h = {
        loadPolicy: c,
        timeout: c.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0
      }, u = {
        onSuccess: (d, g, f, p) => {
          n(d.data);
        },
        onError: (d, g, f, p) => {
          o(new fe({
            type: U.KEY_SYSTEM_ERROR,
            details: L.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
            fatal: !0,
            networkDetails: f,
            response: le({
              url: l.url,
              data: void 0
            }, d)
          }, `"${e}" certificate request failed (${r}). Status: ${d.code} (${d.text})`));
        },
        onTimeout: (d, g, f) => {
          o(new fe({
            type: U.KEY_SYSTEM_ERROR,
            details: L.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,
            fatal: !0,
            networkDetails: f,
            response: {
              url: l.url,
              data: void 0
            }
          }, `"${e}" certificate request timed out (${r})`));
        },
        onAbort: (d, g, f) => {
          o(new Error("aborted"));
        }
      };
      i.load(l, h, u);
    })) : Promise.resolve();
  }
  setMediaKeysServerCertificate(e, t, s) {
    return new Promise((i, r) => {
      e.setServerCertificate(s).then((n) => {
        this.log(`setServerCertificate ${n ? "success" : "not supported by CDM"} (${s == null ? void 0 : s.byteLength}) on "${t}"`), i(e);
      }).catch((n) => {
        r(new fe({
          type: U.KEY_SYSTEM_ERROR,
          details: L.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,
          error: n,
          fatal: !0
        }, n.message));
      });
    });
  }
  renewLicense(e, t) {
    return this.requestLicense(e, new Uint8Array(t)).then((s) => this.updateKeySession(e, new Uint8Array(s)).catch((i) => {
      throw new fe({
        type: U.KEY_SYSTEM_ERROR,
        details: L.KEY_SYSTEM_SESSION_UPDATE_FAILED,
        error: i,
        fatal: !0
      }, i.message);
    }));
  }
  unpackPlayReadyKeyMessage(e, t) {
    const s = String.fromCharCode.apply(null, new Uint16Array(t.buffer));
    if (!s.includes("PlayReadyKeyMessage"))
      return e.setRequestHeader("Content-Type", "text/xml; charset=utf-8"), t;
    const i = new DOMParser().parseFromString(s, "application/xml"), r = i.querySelectorAll("HttpHeader");
    if (r.length > 0) {
      let h;
      for (let u = 0, d = r.length; u < d; u++) {
        var n, o;
        h = r[u];
        const g = (n = h.querySelector("name")) == null ? void 0 : n.textContent, f = (o = h.querySelector("value")) == null ? void 0 : o.textContent;
        g && f && e.setRequestHeader(g, f);
      }
    }
    const l = i.querySelector("Challenge"), c = l == null ? void 0 : l.textContent;
    if (!c)
      throw new Error("Cannot find <Challenge> in key message");
    return is(atob(c));
  }
  setupLicenseXHR(e, t, s, i) {
    const r = this.config.licenseXhrSetup;
    return r ? Promise.resolve().then(() => {
      if (!s.decryptdata)
        throw new Error("Key removed");
      return r.call(this.hls, e, t, s, i);
    }).catch((n) => {
      if (!s.decryptdata)
        throw n;
      return e.open("POST", t, !0), r.call(this.hls, e, t, s, i);
    }).then((n) => (e.readyState || e.open("POST", t, !0), {
      xhr: e,
      licenseChallenge: n || i
    })) : (e.open("POST", t, !0), Promise.resolve({
      xhr: e,
      licenseChallenge: i
    }));
  }
  requestLicense(e, t) {
    const s = this.config.keyLoadPolicy.default;
    return new Promise((i, r) => {
      const n = this.getLicenseServerUrl(e.keySystem);
      this.log(`Sending license request to URL: ${n}`);
      const o = new XMLHttpRequest();
      o.responseType = "arraybuffer", o.onreadystatechange = () => {
        if (!this.hls || !e.mediaKeysSession)
          return r(new Error("invalid state"));
        if (o.readyState === 4)
          if (o.status === 200) {
            this._requestLicenseFailureCount = 0;
            let l = o.response;
            this.log(`License received ${l instanceof ArrayBuffer ? l.byteLength : l}`);
            const c = this.config.licenseResponseCallback;
            if (c)
              try {
                l = c.call(this.hls, o, n, e);
              } catch (h) {
                this.error(h);
              }
            i(l);
          } else {
            const l = s.errorRetry, c = l ? l.maxNumRetry : 0;
            if (this._requestLicenseFailureCount++, this._requestLicenseFailureCount > c || o.status >= 400 && o.status < 500)
              r(new fe({
                type: U.KEY_SYSTEM_ERROR,
                details: L.KEY_SYSTEM_LICENSE_REQUEST_FAILED,
                fatal: !0,
                networkDetails: o,
                response: {
                  url: n,
                  data: void 0,
                  code: o.status,
                  text: o.statusText
                }
              }, `License Request XHR failed (${n}). Status: ${o.status} (${o.statusText})`));
            else {
              const h = c - this._requestLicenseFailureCount + 1;
              this.warn(`Retrying license request, ${h} attempts left`), this.requestLicense(e, t).then(i, r);
            }
          }
      }, e.licenseXhr && e.licenseXhr.readyState !== XMLHttpRequest.DONE && e.licenseXhr.abort(), e.licenseXhr = o, this.setupLicenseXHR(o, n, e, t).then(({
        xhr: l,
        licenseChallenge: c
      }) => {
        e.keySystem == Z.PLAYREADY && (c = this.unpackPlayReadyKeyMessage(l, c)), l.send(c);
      });
    });
  }
  onMediaAttached(e, t) {
    if (!this.config.emeEnabled)
      return;
    const s = t.media;
    this.media = s, s.addEventListener("encrypted", this.onMediaEncrypted), s.addEventListener("waitingforkey", this.onWaitingForKey);
  }
  onMediaDetached() {
    const e = this.media, t = this.mediaKeySessions;
    e && (e.removeEventListener("encrypted", this.onMediaEncrypted), e.removeEventListener("waitingforkey", this.onWaitingForKey), this.media = null), this._requestLicenseFailureCount = 0, this.setMediaKeysQueue = [], this.mediaKeySessions = [], this.keyIdToKeySessionPromise = {}, it.clearKeyUriToKeyIdMap();
    const s = t.length;
    qe.CDMCleanupPromise = Promise.all(t.map((i) => this.removeSession(i)).concat(e == null ? void 0 : e.setMediaKeys(null).catch((i) => {
      this.log(`Could not clear media keys: ${i}`);
    }))).then(() => {
      s && (this.log("finished closing key sessions and clearing media keys"), t.length = 0);
    }).catch((i) => {
      this.log(`Could not close sessions and clear media keys: ${i}`);
    });
  }
  onManifestLoading() {
    this.keyFormatPromise = null;
  }
  onManifestLoaded(e, {
    sessionKeys: t
  }) {
    if (!(!t || !this.config.emeEnabled) && !this.keyFormatPromise) {
      const s = t.reduce((i, r) => (i.indexOf(r.keyFormat) === -1 && i.push(r.keyFormat), i), []);
      this.log(`Selecting key-system from session-keys ${s.join(", ")}`), this.keyFormatPromise = this.getKeyFormatPromise(s);
    }
  }
  removeSession(e) {
    const {
      mediaKeysSession: t,
      licenseXhr: s
    } = e;
    if (t) {
      this.log(`Remove licenses and keys and close session ${t.sessionId}`), e._onmessage && (t.removeEventListener("message", e._onmessage), e._onmessage = void 0), e._onkeystatuseschange && (t.removeEventListener("keystatuseschange", e._onkeystatuseschange), e._onkeystatuseschange = void 0), s && s.readyState !== XMLHttpRequest.DONE && s.abort(), e.mediaKeysSession = e.decryptdata = e.licenseXhr = void 0;
      const i = this.mediaKeySessions.indexOf(e);
      return i > -1 && this.mediaKeySessions.splice(i, 1), t.remove().catch((r) => {
        this.log(`Could not remove session: ${r}`);
      }).then(() => t.close()).catch((r) => {
        this.log(`Could not close session: ${r}`);
      });
    }
  }
}
qe.CDMCleanupPromise = void 0;
class fe extends Error {
  constructor(e, t) {
    super(t), this.data = void 0, e.error || (e.error = new Error(t)), this.data = e, e.err = e.error;
  }
}
var ce;
(function(a) {
  a.MANIFEST = "m", a.AUDIO = "a", a.VIDEO = "v", a.MUXED = "av", a.INIT = "i", a.CAPTION = "c", a.TIMED_TEXT = "tt", a.KEY = "k", a.OTHER = "o";
})(ce || (ce = {}));
var fs;
(function(a) {
  a.DASH = "d", a.HLS = "h", a.SMOOTH = "s", a.OTHER = "o";
})(fs || (fs = {}));
var Me;
(function(a) {
  a.OBJECT = "CMCD-Object", a.REQUEST = "CMCD-Request", a.SESSION = "CMCD-Session", a.STATUS = "CMCD-Status";
})(Me || (Me = {}));
const rl = {
  [Me.OBJECT]: ["br", "d", "ot", "tb"],
  [Me.REQUEST]: ["bl", "dl", "mtp", "nor", "nrr", "su"],
  [Me.SESSION]: ["cid", "pr", "sf", "sid", "st", "v"],
  [Me.STATUS]: ["bs", "rtp"]
};
class Qe {
  constructor(e, t) {
    this.value = void 0, this.params = void 0, Array.isArray(e) && (e = e.map((s) => s instanceof Qe ? s : new Qe(s))), this.value = e, this.params = t;
  }
}
class Nr {
  constructor(e) {
    this.description = void 0, this.description = e;
  }
}
const nl = "Dict";
function al(a) {
  return Array.isArray(a) ? JSON.stringify(a) : a instanceof Map ? "Map{}" : a instanceof Set ? "Set{}" : typeof a == "object" ? JSON.stringify(a) : String(a);
}
function ol(a, e, t, s) {
  return new Error(`failed to ${a} "${al(e)}" as ${t}`, {
    cause: s
  });
}
const _i = "Bare Item", ll = "Boolean", cl = "Byte Sequence", hl = "Decimal", ul = "Integer";
function dl(a) {
  return a < -999999999999999 || 999999999999999 < a;
}
const fl = /[\x00-\x1f\x7f]+/, gl = "Token", ml = "Key";
function Ie(a, e, t) {
  return ol("serialize", a, e, t);
}
function pl(a) {
  if (typeof a != "boolean")
    throw Ie(a, ll);
  return a ? "?1" : "?0";
}
function Tl(a) {
  return btoa(String.fromCharCode(...a));
}
function El(a) {
  if (ArrayBuffer.isView(a) === !1)
    throw Ie(a, cl);
  return `:${Tl(a)}:`;
}
function Ur(a) {
  if (dl(a))
    throw Ie(a, ul);
  return a.toString();
}
function yl(a) {
  return `@${Ur(a.getTime() / 1e3)}`;
}
function Br(a, e) {
  if (a < 0)
    return -Br(-a, e);
  const t = Math.pow(10, e);
  if (Math.abs(a * t % 1 - 0.5) < Number.EPSILON) {
    const i = Math.floor(a * t);
    return (i % 2 === 0 ? i : i + 1) / t;
  } else
    return Math.round(a * t) / t;
}
function xl(a) {
  const e = Br(a, 3);
  if (Math.floor(Math.abs(e)).toString().length > 12)
    throw Ie(a, hl);
  const t = e.toString();
  return t.includes(".") ? t : `${t}.0`;
}
const Sl = "String";
function vl(a) {
  if (fl.test(a))
    throw Ie(a, Sl);
  return `"${a.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
}
function Al(a) {
  return a.description || a.toString().slice(7, -1);
}
function Pi(a) {
  const e = Al(a);
  if (/^([a-zA-Z*])([!#$%&'*+\-.^_`|~\w:/]*)$/.test(e) === !1)
    throw Ie(e, gl);
  return e;
}
function gs(a) {
  switch (typeof a) {
    case "number":
      if (!O(a))
        throw Ie(a, _i);
      return Number.isInteger(a) ? Ur(a) : xl(a);
    case "string":
      return vl(a);
    case "symbol":
      return Pi(a);
    case "boolean":
      return pl(a);
    case "object":
      if (a instanceof Date)
        return yl(a);
      if (a instanceof Uint8Array)
        return El(a);
      if (a instanceof Nr)
        return Pi(a);
    default:
      throw Ie(a, _i);
  }
}
function ms(a) {
  if (/^[a-z*][a-z0-9\-_.*]*$/.test(a) === !1)
    throw Ie(a, ml);
  return a;
}
function Fs(a) {
  return a == null ? "" : Object.entries(a).map(([e, t]) => t === !0 ? `;${ms(e)}` : `;${ms(e)}=${gs(t)}`).join("");
}
function $r(a) {
  return a instanceof Qe ? `${gs(a.value)}${Fs(a.params)}` : gs(a);
}
function Ll(a) {
  return `(${a.value.map($r).join(" ")})${Fs(a.params)}`;
}
function Rl(a, e = {
  whitespace: !0
}) {
  if (typeof a != "object")
    throw Ie(a, nl);
  const t = a instanceof Map ? a.entries() : Object.entries(a), s = e != null && e.whitespace ? " " : "";
  return Array.from(t).map(([i, r]) => {
    r instanceof Qe || (r = new Qe(r));
    let n = ms(i);
    return r.value === !0 ? n += Fs(r.params) : (n += "=", Array.isArray(r.value) ? n += Ll(r) : n += $r(r)), n;
  }).join(`,${s}`);
}
function Il(a, e) {
  return Rl(a, e);
}
const bl = (a) => a === "ot" || a === "sf" || a === "st", Dl = (a) => typeof a == "number" ? O(a) : a != null && a !== "" && a !== !1;
function Cl(a, e) {
  const t = new URL(a), s = new URL(e);
  if (t.origin !== s.origin)
    return a;
  const i = t.pathname.split("/").slice(1), r = s.pathname.split("/").slice(1, -1);
  for (; i[0] === r[0]; )
    i.shift(), r.shift();
  for (; r.length; )
    r.shift(), i.unshift("..");
  return i.join("/");
}
function wl() {
  try {
    return crypto.randomUUID();
  } catch {
    try {
      const e = URL.createObjectURL(new Blob()), t = e.toString();
      return URL.revokeObjectURL(e), t.slice(t.lastIndexOf("/") + 1);
    } catch {
      let t = (/* @__PURE__ */ new Date()).getTime();
      return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (i) => {
        const r = (t + Math.random() * 16) % 16 | 0;
        return t = Math.floor(t / 16), (i == "x" ? r : r & 3 | 8).toString(16);
      });
    }
  }
}
const xt = (a) => Math.round(a), kl = (a, e) => (e != null && e.baseUrl && (a = Cl(a, e.baseUrl)), encodeURIComponent(a)), gt = (a) => xt(a / 100) * 100, _l = {
  /**
   * Bitrate (kbps) rounded integer
   */
  br: xt,
  /**
   * Duration (milliseconds) rounded integer
   */
  d: xt,
  /**
   * Buffer Length (milliseconds) rounded nearest 100ms
   */
  bl: gt,
  /**
   * Deadline (milliseconds) rounded nearest 100ms
   */
  dl: gt,
  /**
   * Measured Throughput (kbps) rounded nearest 100kbps
   */
  mtp: gt,
  /**
   * Next Object Request URL encoded
   */
  nor: kl,
  /**
   * Requested maximum throughput (kbps) rounded nearest 100kbps
   */
  rtp: gt,
  /**
   * Top Bitrate (kbps) rounded integer
   */
  tb: xt
};
function Pl(a, e) {
  const t = {};
  if (a == null || typeof a != "object")
    return t;
  const s = Object.keys(a).sort(), i = se({}, _l, e == null ? void 0 : e.formatters), r = e == null ? void 0 : e.filter;
  return s.forEach((n) => {
    if (r != null && r(n))
      return;
    let o = a[n];
    const l = i[n];
    l && (o = l(o, e)), !(n === "v" && o === 1) && (n == "pr" && o === 1 || Dl(o) && (bl(n) && typeof o == "string" && (o = new Nr(o)), t[n] = o));
  }), t;
}
function Gr(a, e = {}) {
  return a ? Il(Pl(a, e), se({
    whitespace: !1
  }, e)) : "";
}
function Fl(a, e = {}) {
  if (!a)
    return {};
  const t = Object.entries(a), s = Object.entries(rl).concat(Object.entries((e == null ? void 0 : e.customHeaderMap) || {})), i = t.reduce((r, n) => {
    var o, l;
    const [c, h] = n, u = ((o = s.find((d) => d[1].includes(c))) == null ? void 0 : o[0]) || Me.REQUEST;
    return (l = r[u]) != null || (r[u] = {}), r[u][c] = h, r;
  }, {});
  return Object.entries(i).reduce((r, [n, o]) => (r[n] = Gr(o, e), r), {});
}
function Ol(a, e, t) {
  return se(a, Fl(e, t));
}
const Ml = "CMCD";
function Nl(a, e = {}) {
  if (!a)
    return "";
  const t = Gr(a, e);
  return `${Ml}=${encodeURIComponent(t)}`;
}
const Fi = /CMCD=[^&#]+/;
function Ul(a, e, t) {
  const s = Nl(e, t);
  if (!s)
    return a;
  if (Fi.test(a))
    return a.replace(Fi, s);
  const i = a.includes("?") ? "&" : "?";
  return `${a}${i}${s}`;
}
class Bl {
  // eslint-disable-line no-restricted-globals
  constructor(e) {
    this.hls = void 0, this.config = void 0, this.media = void 0, this.sid = void 0, this.cid = void 0, this.useHeaders = !1, this.includeKeys = void 0, this.initialized = !1, this.starved = !1, this.buffering = !0, this.audioBuffer = void 0, this.videoBuffer = void 0, this.onWaiting = () => {
      this.initialized && (this.starved = !0), this.buffering = !0;
    }, this.onPlaying = () => {
      this.initialized || (this.initialized = !0), this.buffering = !1;
    }, this.applyPlaylistData = (i) => {
      try {
        this.apply(i, {
          ot: ce.MANIFEST,
          su: !this.initialized
        });
      } catch (r) {
        v.warn("Could not generate manifest CMCD data.", r);
      }
    }, this.applyFragmentData = (i) => {
      try {
        const r = i.frag, n = this.hls.levels[r.level], o = this.getObjectType(r), l = {
          d: r.duration * 1e3,
          ot: o
        };
        (o === ce.VIDEO || o === ce.AUDIO || o == ce.MUXED) && (l.br = n.bitrate / 1e3, l.tb = this.getTopBandwidth(o) / 1e3, l.bl = this.getBufferLength(o)), this.apply(i, l);
      } catch (r) {
        v.warn("Could not generate segment CMCD data.", r);
      }
    }, this.hls = e;
    const t = this.config = e.config, {
      cmcd: s
    } = t;
    s != null && (t.pLoader = this.createPlaylistLoader(), t.fLoader = this.createFragmentLoader(), this.sid = s.sessionId || wl(), this.cid = s.contentId, this.useHeaders = s.useHeaders === !0, this.includeKeys = s.includeKeys, this.registerListeners());
  }
  registerListeners() {
    const e = this.hls;
    e.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(m.MEDIA_DETACHED, this.onMediaDetached, this), e.on(m.BUFFER_CREATED, this.onBufferCreated, this);
  }
  unregisterListeners() {
    const e = this.hls;
    e.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(m.MEDIA_DETACHED, this.onMediaDetached, this), e.off(m.BUFFER_CREATED, this.onBufferCreated, this);
  }
  destroy() {
    this.unregisterListeners(), this.onMediaDetached(), this.hls = this.config = this.audioBuffer = this.videoBuffer = null, this.onWaiting = this.onPlaying = null;
  }
  onMediaAttached(e, t) {
    this.media = t.media, this.media.addEventListener("waiting", this.onWaiting), this.media.addEventListener("playing", this.onPlaying);
  }
  onMediaDetached() {
    this.media && (this.media.removeEventListener("waiting", this.onWaiting), this.media.removeEventListener("playing", this.onPlaying), this.media = null);
  }
  onBufferCreated(e, t) {
    var s, i;
    this.audioBuffer = (s = t.tracks.audio) == null ? void 0 : s.buffer, this.videoBuffer = (i = t.tracks.video) == null ? void 0 : i.buffer;
  }
  /**
   * Create baseline CMCD data
   */
  createData() {
    var e;
    return {
      v: 1,
      sf: fs.HLS,
      sid: this.sid,
      cid: this.cid,
      pr: (e = this.media) == null ? void 0 : e.playbackRate,
      mtp: this.hls.bandwidthEstimate / 1e3
    };
  }
  /**
   * Apply CMCD data to a request.
   */
  apply(e, t = {}) {
    se(t, this.createData());
    const s = t.ot === ce.INIT || t.ot === ce.VIDEO || t.ot === ce.MUXED;
    this.starved && s && (t.bs = !0, t.su = !0, this.starved = !1), t.su == null && (t.su = this.buffering);
    const {
      includeKeys: i
    } = this;
    i && (t = Object.keys(t).reduce((r, n) => (i.includes(n) && (r[n] = t[n]), r), {})), this.useHeaders ? (e.headers || (e.headers = {}), Ol(e.headers, t)) : e.url = Ul(e.url, t);
  }
  /**
   * The CMCD object type.
   */
  getObjectType(e) {
    const {
      type: t
    } = e;
    if (t === "subtitle")
      return ce.TIMED_TEXT;
    if (e.sn === "initSegment")
      return ce.INIT;
    if (t === "audio")
      return ce.AUDIO;
    if (t === "main")
      return this.hls.audioTracks.length ? ce.VIDEO : ce.MUXED;
  }
  /**
   * Get the highest bitrate.
   */
  getTopBandwidth(e) {
    let t = 0, s;
    const i = this.hls;
    if (e === ce.AUDIO)
      s = i.audioTracks;
    else {
      const r = i.maxAutoLevel, n = r > -1 ? r + 1 : i.levels.length;
      s = i.levels.slice(0, n);
    }
    for (const r of s)
      r.bitrate > t && (t = r.bitrate);
    return t > 0 ? t : NaN;
  }
  /**
   * Get the buffer length for a media type in milliseconds
   */
  getBufferLength(e) {
    const t = this.hls.media, s = e === ce.AUDIO ? this.audioBuffer : this.videoBuffer;
    return !s || !t ? NaN : Q.bufferInfo(s, t.currentTime, this.config.maxBufferHole).len * 1e3;
  }
  /**
   * Create a playlist loader
   */
  createPlaylistLoader() {
    const {
      pLoader: e
    } = this.config, t = this.applyPlaylistData, s = e || this.config.loader;
    return class {
      constructor(r) {
        this.loader = void 0, this.loader = new s(r);
      }
      get stats() {
        return this.loader.stats;
      }
      get context() {
        return this.loader.context;
      }
      destroy() {
        this.loader.destroy();
      }
      abort() {
        this.loader.abort();
      }
      load(r, n, o) {
        t(r), this.loader.load(r, n, o);
      }
    };
  }
  /**
   * Create a playlist loader
   */
  createFragmentLoader() {
    const {
      fLoader: e
    } = this.config, t = this.applyFragmentData, s = e || this.config.loader;
    return class {
      constructor(r) {
        this.loader = void 0, this.loader = new s(r);
      }
      get stats() {
        return this.loader.stats;
      }
      get context() {
        return this.loader.context;
      }
      destroy() {
        this.loader.destroy();
      }
      abort() {
        this.loader.abort();
      }
      load(r, n, o) {
        t(r), this.loader.load(r, n, o);
      }
    };
  }
}
const $l = 3e5;
class Gl {
  constructor(e) {
    this.hls = void 0, this.log = void 0, this.loader = null, this.uri = null, this.pathwayId = ".", this.pathwayPriority = null, this.timeToLoad = 300, this.reloadTimer = -1, this.updated = 0, this.started = !1, this.enabled = !0, this.levels = null, this.audioTracks = null, this.subtitleTracks = null, this.penalizedPathways = {}, this.hls = e, this.log = v.log.bind(v, "[content-steering]:"), this.registerListeners();
  }
  registerListeners() {
    const e = this.hls;
    e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(m.MANIFEST_PARSED, this.onManifestParsed, this), e.on(m.ERROR, this.onError, this);
  }
  unregisterListeners() {
    const e = this.hls;
    e && (e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(m.MANIFEST_PARSED, this.onManifestParsed, this), e.off(m.ERROR, this.onError, this));
  }
  startLoad() {
    if (this.started = !0, this.clearTimeout(), this.enabled && this.uri) {
      if (this.updated) {
        const e = this.timeToLoad * 1e3 - (performance.now() - this.updated);
        if (e > 0) {
          this.scheduleRefresh(this.uri, e);
          return;
        }
      }
      this.loadSteeringManifest(this.uri);
    }
  }
  stopLoad() {
    this.started = !1, this.loader && (this.loader.destroy(), this.loader = null), this.clearTimeout();
  }
  clearTimeout() {
    this.reloadTimer !== -1 && (self.clearTimeout(this.reloadTimer), this.reloadTimer = -1);
  }
  destroy() {
    this.unregisterListeners(), this.stopLoad(), this.hls = null, this.levels = this.audioTracks = this.subtitleTracks = null;
  }
  removeLevel(e) {
    const t = this.levels;
    t && (this.levels = t.filter((s) => s !== e));
  }
  onManifestLoading() {
    this.stopLoad(), this.enabled = !0, this.timeToLoad = 300, this.updated = 0, this.uri = null, this.pathwayId = ".", this.levels = this.audioTracks = this.subtitleTracks = null;
  }
  onManifestLoaded(e, t) {
    const {
      contentSteering: s
    } = t;
    s !== null && (this.pathwayId = s.pathwayId, this.uri = s.uri, this.started && this.startLoad());
  }
  onManifestParsed(e, t) {
    this.audioTracks = t.audioTracks, this.subtitleTracks = t.subtitleTracks;
  }
  onError(e, t) {
    const {
      errorAction: s
    } = t;
    if ((s == null ? void 0 : s.action) === ae.SendAlternateToPenaltyBox && s.flags === Te.MoveAllAlternatesMatchingHost) {
      const i = this.levels;
      let r = this.pathwayPriority, n = this.pathwayId;
      if (t.context) {
        const {
          groupId: o,
          pathwayId: l,
          type: c
        } = t.context;
        o && i ? n = this.getPathwayForGroupId(o, c, n) : l && (n = l);
      }
      n in this.penalizedPathways || (this.penalizedPathways[n] = performance.now()), !r && i && (r = i.reduce((o, l) => (o.indexOf(l.pathwayId) === -1 && o.push(l.pathwayId), o), [])), r && r.length > 1 && (this.updatePathwayPriority(r), s.resolved = this.pathwayId !== n), s.resolved || v.warn(`Could not resolve ${t.details} ("${t.error.message}") with content-steering for Pathway: ${n} levels: ${i && i.length} priorities: ${JSON.stringify(r)} penalized: ${JSON.stringify(this.penalizedPathways)}`);
    }
  }
  filterParsedLevels(e) {
    this.levels = e;
    let t = this.getLevelsForPathway(this.pathwayId);
    if (t.length === 0) {
      const s = e[0].pathwayId;
      this.log(`No levels found in Pathway ${this.pathwayId}. Setting initial Pathway to "${s}"`), t = this.getLevelsForPathway(s), this.pathwayId = s;
    }
    return t.length !== e.length ? (this.log(`Found ${t.length}/${e.length} levels in Pathway "${this.pathwayId}"`), t) : e;
  }
  getLevelsForPathway(e) {
    return this.levels === null ? [] : this.levels.filter((t) => e === t.pathwayId);
  }
  updatePathwayPriority(e) {
    this.pathwayPriority = e;
    let t;
    const s = this.penalizedPathways, i = performance.now();
    Object.keys(s).forEach((r) => {
      i - s[r] > $l && delete s[r];
    });
    for (let r = 0; r < e.length; r++) {
      const n = e[r];
      if (n in s)
        continue;
      if (n === this.pathwayId)
        return;
      const o = this.hls.nextLoadLevel, l = this.hls.levels[o];
      if (t = this.getLevelsForPathway(n), t.length > 0) {
        this.log(`Setting Pathway to "${n}"`), this.pathwayId = n, ar(t), this.hls.trigger(m.LEVELS_UPDATED, {
          levels: t
        });
        const c = this.hls.levels[o];
        l && c && this.levels && (c.attrs["STABLE-VARIANT-ID"] !== l.attrs["STABLE-VARIANT-ID"] && c.bitrate !== l.bitrate && this.log(`Unstable Pathways change from bitrate ${l.bitrate} to ${c.bitrate}`), this.hls.nextLoadLevel = o);
        break;
      }
    }
  }
  getPathwayForGroupId(e, t, s) {
    const i = this.getLevelsForPathway(s).concat(this.levels || []);
    for (let r = 0; r < i.length; r++)
      if (t === q.AUDIO_TRACK && i[r].hasAudioGroup(e) || t === q.SUBTITLE_TRACK && i[r].hasSubtitleGroup(e))
        return i[r].pathwayId;
    return s;
  }
  clonePathways(e) {
    const t = this.levels;
    if (!t)
      return;
    const s = {}, i = {};
    e.forEach((r) => {
      const {
        ID: n,
        "BASE-ID": o,
        "URI-REPLACEMENT": l
      } = r;
      if (t.some((h) => h.pathwayId === n))
        return;
      const c = this.getLevelsForPathway(o).map((h) => {
        const u = new ee(h.attrs);
        u["PATHWAY-ID"] = n;
        const d = u.AUDIO && `${u.AUDIO}_clone_${n}`, g = u.SUBTITLES && `${u.SUBTITLES}_clone_${n}`;
        d && (s[u.AUDIO] = d, u.AUDIO = d), g && (i[u.SUBTITLES] = g, u.SUBTITLES = g);
        const f = Kr(h.uri, u["STABLE-VARIANT-ID"], "PER-VARIANT-URIS", l), p = new ze({
          attrs: u,
          audioCodec: h.audioCodec,
          bitrate: h.bitrate,
          height: h.height,
          name: h.name,
          url: f,
          videoCodec: h.videoCodec,
          width: h.width
        });
        if (h.audioGroups)
          for (let T = 1; T < h.audioGroups.length; T++)
            p.addGroupId("audio", `${h.audioGroups[T]}_clone_${n}`);
        if (h.subtitleGroups)
          for (let T = 1; T < h.subtitleGroups.length; T++)
            p.addGroupId("text", `${h.subtitleGroups[T]}_clone_${n}`);
        return p;
      });
      t.push(...c), Oi(this.audioTracks, s, l, n), Oi(this.subtitleTracks, i, l, n);
    });
  }
  loadSteeringManifest(e) {
    const t = this.hls.config, s = t.loader;
    this.loader && this.loader.destroy(), this.loader = new s(t);
    let i;
    try {
      i = new self.URL(e);
    } catch {
      this.enabled = !1, this.log(`Failed to parse Steering Manifest URI: ${e}`);
      return;
    }
    if (i.protocol !== "data:") {
      const h = (this.hls.bandwidthEstimate || t.abrEwmaDefaultEstimate) | 0;
      i.searchParams.set("_HLS_pathway", this.pathwayId), i.searchParams.set("_HLS_throughput", "" + h);
    }
    const r = {
      responseType: "json",
      url: i.href
    }, n = t.steeringManifestLoadPolicy.default, o = n.errorRetry || n.timeoutRetry || {}, l = {
      loadPolicy: n,
      timeout: n.maxLoadTimeMs,
      maxRetry: o.maxNumRetry || 0,
      retryDelay: o.retryDelayMs || 0,
      maxRetryDelay: o.maxRetryDelayMs || 0
    }, c = {
      onSuccess: (h, u, d, g) => {
        this.log(`Loaded steering manifest: "${i}"`);
        const f = h.data;
        if (f.VERSION !== 1) {
          this.log(`Steering VERSION ${f.VERSION} not supported!`);
          return;
        }
        this.updated = performance.now(), this.timeToLoad = f.TTL;
        const {
          "RELOAD-URI": p,
          "PATHWAY-CLONES": T,
          "PATHWAY-PRIORITY": E
        } = f;
        if (p)
          try {
            this.uri = new self.URL(p, i).href;
          } catch {
            this.enabled = !1, this.log(`Failed to parse Steering Manifest RELOAD-URI: ${p}`);
            return;
          }
        this.scheduleRefresh(this.uri || d.url), T && this.clonePathways(T);
        const y = {
          steeringManifest: f,
          url: i.toString()
        };
        this.hls.trigger(m.STEERING_MANIFEST_LOADED, y), E && this.updatePathwayPriority(E);
      },
      onError: (h, u, d, g) => {
        if (this.log(`Error loading steering manifest: ${h.code} ${h.text} (${u.url})`), this.stopLoad(), h.code === 410) {
          this.enabled = !1, this.log(`Steering manifest ${u.url} no longer available`);
          return;
        }
        let f = this.timeToLoad * 1e3;
        if (h.code === 429) {
          const p = this.loader;
          if (typeof (p == null ? void 0 : p.getResponseHeader) == "function") {
            const T = p.getResponseHeader("Retry-After");
            T && (f = parseFloat(T) * 1e3);
          }
          this.log(`Steering manifest ${u.url} rate limited`);
          return;
        }
        this.scheduleRefresh(this.uri || u.url, f);
      },
      onTimeout: (h, u, d) => {
        this.log(`Timeout loading steering manifest (${u.url})`), this.scheduleRefresh(this.uri || u.url);
      }
    };
    this.log(`Requesting steering manifest: ${i}`), this.loader.load(r, l, c);
  }
  scheduleRefresh(e, t = this.timeToLoad * 1e3) {
    this.clearTimeout(), this.reloadTimer = self.setTimeout(() => {
      var s;
      const i = (s = this.hls) == null ? void 0 : s.media;
      if (i && !i.ended) {
        this.loadSteeringManifest(e);
        return;
      }
      this.scheduleRefresh(e, this.timeToLoad * 1e3);
    }, t);
  }
}
function Oi(a, e, t, s) {
  a && Object.keys(e).forEach((i) => {
    const r = a.filter((n) => n.groupId === i).map((n) => {
      const o = se({}, n);
      return o.details = void 0, o.attrs = new ee(o.attrs), o.url = o.attrs.URI = Kr(n.url, n.attrs["STABLE-RENDITION-ID"], "PER-RENDITION-URIS", t), o.groupId = o.attrs["GROUP-ID"] = e[i], o.attrs["PATHWAY-ID"] = s, o;
    });
    a.push(...r);
  });
}
function Kr(a, e, t, s) {
  const {
    HOST: i,
    PARAMS: r,
    [t]: n
  } = s;
  let o;
  e && (o = n == null ? void 0 : n[e], o && (a = o));
  const l = new self.URL(a);
  return i && !o && (l.host = i), r && Object.keys(r).sort().forEach((c) => {
    c && l.searchParams.set(c, r[c]);
  }), l.href;
}
const Kl = /^age:\s*[\d.]+\s*$/im;
class Vr {
  constructor(e) {
    this.xhrSetup = void 0, this.requestTimeout = void 0, this.retryTimeout = void 0, this.retryDelay = void 0, this.config = null, this.callbacks = null, this.context = null, this.loader = null, this.stats = void 0, this.xhrSetup = e && e.xhrSetup || null, this.stats = new _t(), this.retryDelay = 0;
  }
  destroy() {
    this.callbacks = null, this.abortInternal(), this.loader = null, this.config = null, this.context = null, this.xhrSetup = null, this.stats = null;
  }
  abortInternal() {
    const e = this.loader;
    self.clearTimeout(this.requestTimeout), self.clearTimeout(this.retryTimeout), e && (e.onreadystatechange = null, e.onprogress = null, e.readyState !== 4 && (this.stats.aborted = !0, e.abort()));
  }
  abort() {
    var e;
    this.abortInternal(), (e = this.callbacks) != null && e.onAbort && this.callbacks.onAbort(this.stats, this.context, this.loader);
  }
  load(e, t, s) {
    if (this.stats.loading.start)
      throw new Error("Loader can only be used once.");
    this.stats.loading.start = self.performance.now(), this.context = e, this.config = t, this.callbacks = s, this.loadInternal();
  }
  loadInternal() {
    const {
      config: e,
      context: t
    } = this;
    if (!e || !t)
      return;
    const s = this.loader = new self.XMLHttpRequest(), i = this.stats;
    i.loading.first = 0, i.loaded = 0, i.aborted = !1;
    const r = this.xhrSetup;
    r ? Promise.resolve().then(() => {
      if (!this.stats.aborted)
        return r(s, t.url);
    }).catch((n) => (s.open("GET", t.url, !0), r(s, t.url))).then(() => {
      this.stats.aborted || this.openAndSendXhr(s, t, e);
    }).catch((n) => {
      this.callbacks.onError({
        code: s.status,
        text: n.message
      }, t, s, i);
    }) : this.openAndSendXhr(s, t, e);
  }
  openAndSendXhr(e, t, s) {
    e.readyState || e.open("GET", t.url, !0);
    const i = t.headers, {
      maxTimeToFirstByteMs: r,
      maxLoadTimeMs: n
    } = s.loadPolicy;
    if (i)
      for (const o in i)
        e.setRequestHeader(o, i[o]);
    t.rangeEnd && e.setRequestHeader("Range", "bytes=" + t.rangeStart + "-" + (t.rangeEnd - 1)), e.onreadystatechange = this.readystatechange.bind(this), e.onprogress = this.loadprogress.bind(this), e.responseType = t.responseType, self.clearTimeout(this.requestTimeout), s.timeout = r && O(r) ? r : n, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), s.timeout), e.send();
  }
  readystatechange() {
    const {
      context: e,
      loader: t,
      stats: s
    } = this;
    if (!e || !t)
      return;
    const i = t.readyState, r = this.config;
    if (!s.aborted && i >= 2 && (s.loading.first === 0 && (s.loading.first = Math.max(self.performance.now(), s.loading.start), r.timeout !== r.loadPolicy.maxLoadTimeMs && (self.clearTimeout(this.requestTimeout), r.timeout = r.loadPolicy.maxLoadTimeMs, this.requestTimeout = self.setTimeout(this.loadtimeout.bind(this), r.loadPolicy.maxLoadTimeMs - (s.loading.first - s.loading.start)))), i === 4)) {
      self.clearTimeout(this.requestTimeout), t.onreadystatechange = null, t.onprogress = null;
      const n = t.status, o = t.responseType !== "text";
      if (n >= 200 && n < 300 && (o && t.response || t.responseText !== null)) {
        s.loading.end = Math.max(self.performance.now(), s.loading.first);
        const l = o ? t.response : t.responseText, c = t.responseType === "arraybuffer" ? l.byteLength : l.length;
        if (s.loaded = s.total = c, s.bwEstimate = s.total * 8e3 / (s.loading.end - s.loading.first), !this.callbacks)
          return;
        const h = this.callbacks.onProgress;
        if (h && h(s, e, l, t), !this.callbacks)
          return;
        const u = {
          url: t.responseURL,
          data: l,
          code: n
        };
        this.callbacks.onSuccess(u, s, e, t);
      } else {
        const l = r.loadPolicy.errorRetry, c = s.retry, h = {
          url: e.url,
          data: void 0,
          code: n
        };
        Dt(l, c, !1, h) ? this.retry(l) : (v.error(`${n} while loading ${e.url}`), this.callbacks.onError({
          code: n,
          text: t.statusText
        }, e, t, s));
      }
    }
  }
  loadtimeout() {
    var e;
    const t = (e = this.config) == null ? void 0 : e.loadPolicy.timeoutRetry, s = this.stats.retry;
    if (Dt(t, s, !0))
      this.retry(t);
    else {
      var i;
      v.warn(`timeout while loading ${(i = this.context) == null ? void 0 : i.url}`);
      const r = this.callbacks;
      r && (this.abortInternal(), r.onTimeout(this.stats, this.context, this.loader));
    }
  }
  retry(e) {
    const {
      context: t,
      stats: s
    } = this;
    this.retryDelay = Ss(e, s.retry), s.retry++, v.warn(`${status ? "HTTP Status " + status : "Timeout"} while loading ${t == null ? void 0 : t.url}, retrying ${s.retry}/${e.maxNumRetry} in ${this.retryDelay}ms`), this.abortInternal(), this.loader = null, self.clearTimeout(this.retryTimeout), this.retryTimeout = self.setTimeout(this.loadInternal.bind(this), this.retryDelay);
  }
  loadprogress(e) {
    const t = this.stats;
    t.loaded = e.loaded, e.lengthComputable && (t.total = e.total);
  }
  getCacheAge() {
    let e = null;
    if (this.loader && Kl.test(this.loader.getAllResponseHeaders())) {
      const t = this.loader.getResponseHeader("age");
      e = t ? parseFloat(t) : null;
    }
    return e;
  }
  getResponseHeader(e) {
    return this.loader && new RegExp(`^${e}:\\s*[\\d.]+\\s*$`, "im").test(this.loader.getAllResponseHeaders()) ? this.loader.getResponseHeader(e) : null;
  }
}
function Vl() {
  if (
    // @ts-ignore
    self.fetch && self.AbortController && self.ReadableStream && self.Request
  )
    try {
      return new self.ReadableStream({}), !0;
    } catch {
    }
  return !1;
}
const Hl = /(\d+)-(\d+)\/(\d+)/;
class Mi {
  constructor(e) {
    this.fetchSetup = void 0, this.requestTimeout = void 0, this.request = null, this.response = null, this.controller = void 0, this.context = null, this.config = null, this.callbacks = null, this.stats = void 0, this.loader = null, this.fetchSetup = e.fetchSetup || jl, this.controller = new self.AbortController(), this.stats = new _t();
  }
  destroy() {
    this.loader = this.callbacks = this.context = this.config = this.request = null, this.abortInternal(), this.response = null, this.fetchSetup = this.controller = this.stats = null;
  }
  abortInternal() {
    this.controller && !this.stats.loading.end && (this.stats.aborted = !0, this.controller.abort());
  }
  abort() {
    var e;
    this.abortInternal(), (e = this.callbacks) != null && e.onAbort && this.callbacks.onAbort(this.stats, this.context, this.response);
  }
  load(e, t, s) {
    const i = this.stats;
    if (i.loading.start)
      throw new Error("Loader can only be used once.");
    i.loading.start = self.performance.now();
    const r = Wl(e, this.controller.signal), n = s.onProgress, o = e.responseType === "arraybuffer", l = o ? "byteLength" : "length", {
      maxTimeToFirstByteMs: c,
      maxLoadTimeMs: h
    } = t.loadPolicy;
    this.context = e, this.config = t, this.callbacks = s, this.request = this.fetchSetup(e, r), self.clearTimeout(this.requestTimeout), t.timeout = c && O(c) ? c : h, this.requestTimeout = self.setTimeout(() => {
      this.abortInternal(), s.onTimeout(i, e, this.response);
    }, t.timeout), self.fetch(this.request).then((u) => {
      this.response = this.loader = u;
      const d = Math.max(self.performance.now(), i.loading.start);
      if (self.clearTimeout(this.requestTimeout), t.timeout = h, this.requestTimeout = self.setTimeout(() => {
        this.abortInternal(), s.onTimeout(i, e, this.response);
      }, h - (d - i.loading.start)), !u.ok) {
        const {
          status: g,
          statusText: f
        } = u;
        throw new zl(f || "fetch, bad network response", g, u);
      }
      return i.loading.first = d, i.total = ql(u.headers) || i.total, n && O(t.highWaterMark) ? this.loadProgressively(u, i, e, t.highWaterMark, n) : o ? u.arrayBuffer() : e.responseType === "json" ? u.json() : u.text();
    }).then((u) => {
      const d = this.response;
      if (!d)
        throw new Error("loader destroyed");
      self.clearTimeout(this.requestTimeout), i.loading.end = Math.max(self.performance.now(), i.loading.first);
      const g = u[l];
      g && (i.loaded = i.total = g);
      const f = {
        url: d.url,
        data: u,
        code: d.status
      };
      n && !O(t.highWaterMark) && n(i, e, u, d), s.onSuccess(f, i, e, d);
    }).catch((u) => {
      if (self.clearTimeout(this.requestTimeout), i.aborted)
        return;
      const d = u && u.code || 0, g = u ? u.message : null;
      s.onError({
        code: d,
        text: g
      }, e, u ? u.details : null, i);
    });
  }
  getCacheAge() {
    let e = null;
    if (this.response) {
      const t = this.response.headers.get("age");
      e = t ? parseFloat(t) : null;
    }
    return e;
  }
  getResponseHeader(e) {
    return this.response ? this.response.headers.get(e) : null;
  }
  loadProgressively(e, t, s, i = 0, r) {
    const n = new hr(), o = e.body.getReader(), l = () => o.read().then((c) => {
      if (c.done)
        return n.dataLength && r(t, s, n.flush(), e), Promise.resolve(new ArrayBuffer(0));
      const h = c.value, u = h.length;
      return t.loaded += u, u < i || n.dataLength ? (n.push(h), n.dataLength >= i && r(t, s, n.flush(), e)) : r(t, s, h, e), l();
    }).catch(() => Promise.reject());
    return l();
  }
}
function Wl(a, e) {
  const t = {
    method: "GET",
    mode: "cors",
    credentials: "same-origin",
    signal: e,
    headers: new self.Headers(se({}, a.headers))
  };
  return a.rangeEnd && t.headers.set("Range", "bytes=" + a.rangeStart + "-" + String(a.rangeEnd - 1)), t;
}
function Yl(a) {
  const e = Hl.exec(a);
  if (e)
    return parseInt(e[2]) - parseInt(e[1]) + 1;
}
function ql(a) {
  const e = a.get("Content-Range");
  if (e) {
    const s = Yl(e);
    if (O(s))
      return s;
  }
  const t = a.get("Content-Length");
  if (t)
    return parseInt(t);
}
function jl(a, e) {
  return new self.Request(a.url, e);
}
class zl extends Error {
  constructor(e, t, s) {
    super(e), this.code = void 0, this.details = void 0, this.code = t, this.details = s;
  }
}
const Xl = /\s/, Ql = {
  newCue(a, e, t, s) {
    const i = [];
    let r, n, o, l, c;
    const h = self.VTTCue || self.TextTrackCue;
    for (let d = 0; d < s.rows.length; d++)
      if (r = s.rows[d], o = !0, l = 0, c = "", !r.isEmpty()) {
        var u;
        for (let p = 0; p < r.chars.length; p++)
          Xl.test(r.chars[p].uchar) && o ? l++ : (c += r.chars[p].uchar, o = !1);
        r.cueStartTime = e, e === t && (t += 1e-4), l >= 16 ? l-- : l++;
        const g = _r(c.trim()), f = _s(e, t, g);
        a != null && (u = a.cues) != null && u.getCueById(f) || (n = new h(e, t, g), n.id = f, n.line = d + 1, n.align = "left", n.position = 10 + Math.min(80, Math.floor(l * 8 / 32) * 10), i.push(n));
      }
    return a && i.length && (i.sort((d, g) => d.line === "auto" || g.line === "auto" ? 0 : d.line > 8 && g.line > 8 ? g.line - d.line : d.line - g.line), i.forEach((d) => sr(a, d))), i;
  }
}, Jl = {
  maxTimeToFirstByteMs: 8e3,
  maxLoadTimeMs: 2e4,
  timeoutRetry: null,
  errorRetry: null
}, Hr = le(le({
  autoStartLoad: !0,
  // used by stream-controller
  startPosition: -1,
  // used by stream-controller
  defaultAudioCodec: void 0,
  // used by stream-controller
  debug: !1,
  // used by logger
  capLevelOnFPSDrop: !1,
  // used by fps-controller
  capLevelToPlayerSize: !1,
  // used by cap-level-controller
  ignoreDevicePixelRatio: !1,
  // used by cap-level-controller
  preferManagedMediaSource: !0,
  initialLiveManifestSize: 1,
  // used by stream-controller
  maxBufferLength: 30,
  // used by stream-controller
  backBufferLength: 1 / 0,
  // used by buffer-controller
  frontBufferFlushThreshold: 1 / 0,
  maxBufferSize: 60 * 1e3 * 1e3,
  // used by stream-controller
  maxBufferHole: 0.1,
  // used by stream-controller
  highBufferWatchdogPeriod: 2,
  // used by stream-controller
  nudgeOffset: 0.1,
  // used by stream-controller
  nudgeMaxRetry: 3,
  // used by stream-controller
  maxFragLookUpTolerance: 0.25,
  // used by stream-controller
  liveSyncDurationCount: 3,
  // used by latency-controller
  liveMaxLatencyDurationCount: 1 / 0,
  // used by latency-controller
  liveSyncDuration: void 0,
  // used by latency-controller
  liveMaxLatencyDuration: void 0,
  // used by latency-controller
  maxLiveSyncPlaybackRate: 1,
  // used by latency-controller
  liveDurationInfinity: !1,
  // used by buffer-controller
  /**
   * @deprecated use backBufferLength
   */
  liveBackBufferLength: null,
  // used by buffer-controller
  maxMaxBufferLength: 600,
  // used by stream-controller
  enableWorker: !0,
  // used by transmuxer
  workerPath: null,
  // used by transmuxer
  enableSoftwareAES: !0,
  // used by decrypter
  startLevel: void 0,
  // used by level-controller
  startFragPrefetch: !1,
  // used by stream-controller
  fpsDroppedMonitoringPeriod: 5e3,
  // used by fps-controller
  fpsDroppedMonitoringThreshold: 0.2,
  // used by fps-controller
  appendErrorMaxRetry: 3,
  // used by buffer-controller
  loader: Vr,
  // loader: FetchLoader,
  fLoader: void 0,
  // used by fragment-loader
  pLoader: void 0,
  // used by playlist-loader
  xhrSetup: void 0,
  // used by xhr-loader
  licenseXhrSetup: void 0,
  // used by eme-controller
  licenseResponseCallback: void 0,
  // used by eme-controller
  abrController: ba,
  bufferController: _o,
  capLevelController: Ps,
  errorController: ma,
  fpsController: il,
  stretchShortVideoTrack: !1,
  // used by mp4-remuxer
  maxAudioFramesDrift: 1,
  // used by mp4-remuxer
  forceKeyFrameOnDiscontinuity: !0,
  // used by ts-demuxer
  abrEwmaFastLive: 3,
  // used by abr-controller
  abrEwmaSlowLive: 9,
  // used by abr-controller
  abrEwmaFastVoD: 3,
  // used by abr-controller
  abrEwmaSlowVoD: 9,
  // used by abr-controller
  abrEwmaDefaultEstimate: 5e5,
  // 500 kbps  // used by abr-controller
  abrEwmaDefaultEstimateMax: 5e6,
  // 5 mbps
  abrBandWidthFactor: 0.95,
  // used by abr-controller
  abrBandWidthUpFactor: 0.7,
  // used by abr-controller
  abrMaxWithRealBitrate: !1,
  // used by abr-controller
  maxStarvationDelay: 4,
  // used by abr-controller
  maxLoadingDelay: 4,
  // used by abr-controller
  minAutoBitrate: 0,
  // used by hls
  emeEnabled: !1,
  // used by eme-controller
  widevineLicenseUrl: void 0,
  // used by eme-controller
  drmSystems: {},
  // used by eme-controller
  drmSystemOptions: {},
  // used by eme-controller
  requestMediaKeySystemAccessFunc: Ki,
  // used by eme-controller
  testBandwidth: !0,
  progressive: !1,
  lowLatencyMode: !0,
  cmcd: void 0,
  enableDateRangeMetadataCues: !0,
  enableEmsgMetadataCues: !0,
  enableID3MetadataCues: !0,
  useMediaCapabilities: !0,
  certLoadPolicy: {
    default: Jl
  },
  keyLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 8e3,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 1,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 2e4,
        backoff: "linear"
      },
      errorRetry: {
        maxNumRetry: 8,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 2e4,
        backoff: "linear"
      }
    }
  },
  manifestLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1 / 0,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 1,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  playlistLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 2,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  fragLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 12e4,
      timeoutRetry: {
        maxNumRetry: 4,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 6,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  steeringManifestLoadPolicy: {
    default: {
      maxTimeToFirstByteMs: 1e4,
      maxLoadTimeMs: 2e4,
      timeoutRetry: {
        maxNumRetry: 2,
        retryDelayMs: 0,
        maxRetryDelayMs: 0
      },
      errorRetry: {
        maxNumRetry: 1,
        retryDelayMs: 1e3,
        maxRetryDelayMs: 8e3
      }
    }
  },
  // These default settings are deprecated in favor of the above policies
  // and are maintained for backwards compatibility
  manifestLoadingTimeOut: 1e4,
  manifestLoadingMaxRetry: 1,
  manifestLoadingRetryDelay: 1e3,
  manifestLoadingMaxRetryTimeout: 64e3,
  levelLoadingTimeOut: 1e4,
  levelLoadingMaxRetry: 4,
  levelLoadingRetryDelay: 1e3,
  levelLoadingMaxRetryTimeout: 64e3,
  fragLoadingTimeOut: 2e4,
  fragLoadingMaxRetry: 6,
  fragLoadingRetryDelay: 1e3,
  fragLoadingMaxRetryTimeout: 64e3
}, Zl()), {}, {
  subtitleStreamController: Do,
  subtitleTrackController: wo,
  timelineController: tl,
  audioStreamController: Io,
  audioTrackController: bo,
  emeController: qe,
  cmcdController: Bl,
  contentSteeringController: Gl
});
function Zl() {
  return {
    cueHandler: Ql,
    // used by timeline-controller
    enableWebVTT: !0,
    // used by timeline-controller
    enableIMSC1: !0,
    // used by timeline-controller
    enableCEA708Captions: !0,
    // used by timeline-controller
    captionsTextTrack1Label: "English",
    // used by timeline-controller
    captionsTextTrack1LanguageCode: "en",
    // used by timeline-controller
    captionsTextTrack2Label: "Spanish",
    // used by timeline-controller
    captionsTextTrack2LanguageCode: "es",
    // used by timeline-controller
    captionsTextTrack3Label: "Unknown CC",
    // used by timeline-controller
    captionsTextTrack3LanguageCode: "",
    // used by timeline-controller
    captionsTextTrack4Label: "Unknown CC",
    // used by timeline-controller
    captionsTextTrack4LanguageCode: "",
    // used by timeline-controller
    renderTextTracksNatively: !0
  };
}
function ec(a, e) {
  if ((e.liveSyncDurationCount || e.liveMaxLatencyDurationCount) && (e.liveSyncDuration || e.liveMaxLatencyDuration))
    throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration");
  if (e.liveMaxLatencyDurationCount !== void 0 && (e.liveSyncDurationCount === void 0 || e.liveMaxLatencyDurationCount <= e.liveSyncDurationCount))
    throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"');
  if (e.liveMaxLatencyDuration !== void 0 && (e.liveSyncDuration === void 0 || e.liveMaxLatencyDuration <= e.liveSyncDuration))
    throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"');
  const t = ps(a), s = ["manifest", "level", "frag"], i = ["TimeOut", "MaxRetry", "RetryDelay", "MaxRetryTimeout"];
  return s.forEach((r) => {
    const n = `${r === "level" ? "playlist" : r}LoadPolicy`, o = e[n] === void 0, l = [];
    i.forEach((c) => {
      const h = `${r}Loading${c}`, u = e[h];
      if (u !== void 0 && o) {
        l.push(h);
        const d = t[n].default;
        switch (e[n] = {
          default: d
        }, c) {
          case "TimeOut":
            d.maxLoadTimeMs = u, d.maxTimeToFirstByteMs = u;
            break;
          case "MaxRetry":
            d.errorRetry.maxNumRetry = u, d.timeoutRetry.maxNumRetry = u;
            break;
          case "RetryDelay":
            d.errorRetry.retryDelayMs = u, d.timeoutRetry.retryDelayMs = u;
            break;
          case "MaxRetryTimeout":
            d.errorRetry.maxRetryDelayMs = u, d.timeoutRetry.maxRetryDelayMs = u;
            break;
        }
      }
    }), l.length && v.warn(`hls.js config: "${l.join('", "')}" setting(s) are deprecated, use "${n}": ${JSON.stringify(e[n])}`);
  }), le(le({}, t), e);
}
function ps(a) {
  return a && typeof a == "object" ? Array.isArray(a) ? a.map(ps) : Object.keys(a).reduce((e, t) => (e[t] = ps(a[t]), e), {}) : a;
}
function tc(a) {
  const e = a.loader;
  e !== Mi && e !== Vr ? (v.log("[config]: Custom loader detected, cannot enable progressive streaming"), a.progressive = !1) : Vl() && (a.loader = Mi, a.progressive = !0, a.enableSoftwareAES = !0, v.log("[config]: Progressive streaming enabled, using FetchLoader"));
}
let ts;
class sc extends vs {
  constructor(e, t) {
    super(e, "[level-controller]"), this._levels = [], this._firstLevel = -1, this._maxAutoLevel = -1, this._startLevel = void 0, this.currentLevel = null, this.currentLevelIndex = -1, this.manualLevelIndex = -1, this.steering = void 0, this.onParsedComplete = void 0, this.steering = t, this._registerListeners();
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_LOADED, this.onManifestLoaded, this), e.on(m.LEVEL_LOADED, this.onLevelLoaded, this), e.on(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(m.FRAG_BUFFERED, this.onFragBuffered, this), e.on(m.ERROR, this.onError, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_LOADED, this.onManifestLoaded, this), e.off(m.LEVEL_LOADED, this.onLevelLoaded, this), e.off(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(m.FRAG_BUFFERED, this.onFragBuffered, this), e.off(m.ERROR, this.onError, this);
  }
  destroy() {
    this._unregisterListeners(), this.steering = null, this.resetLevels(), super.destroy();
  }
  stopLoad() {
    this._levels.forEach((t) => {
      t.loadError = 0, t.fragmentError = 0;
    }), super.stopLoad();
  }
  resetLevels() {
    this._startLevel = void 0, this.manualLevelIndex = -1, this.currentLevelIndex = -1, this.currentLevel = null, this._levels = [], this._maxAutoLevel = -1;
  }
  onManifestLoading(e, t) {
    this.resetLevels();
  }
  onManifestLoaded(e, t) {
    const s = this.hls.config.preferManagedMediaSource, i = [], r = {}, n = {};
    let o = !1, l = !1, c = !1;
    t.levels.forEach((h) => {
      var u, d;
      const g = h.attrs;
      let {
        audioCodec: f,
        videoCodec: p
      } = h;
      ((u = f) == null ? void 0 : u.indexOf("mp4a.40.34")) !== -1 && (ts || (ts = /chrome|firefox/i.test(navigator.userAgent)), ts && (h.audioCodec = f = void 0)), f && (h.audioCodec = f = Rt(f, s)), ((d = p) == null ? void 0 : d.indexOf("avc1")) === 0 && (p = h.videoCodec = Hn(p));
      const {
        width: T,
        height: E,
        unknownCodecs: y
      } = h;
      if (o || (o = !!(T && E)), l || (l = !!p), c || (c = !!f), y != null && y.length || f && !$t(f, "audio", s) || p && !$t(p, "video", s))
        return;
      const {
        CODECS: x,
        "FRAME-RATE": I,
        "HDCP-LEVEL": S,
        "PATHWAY-ID": D,
        RESOLUTION: R,
        "VIDEO-RANGE": w
      } = g, b = `${`${D || "."}-`}${h.bitrate}-${R}-${I}-${x}-${w}-${S}`;
      if (r[b])
        if (r[b].uri !== h.url && !h.attrs["PATHWAY-ID"]) {
          const k = n[b] += 1;
          h.attrs["PATHWAY-ID"] = new Array(k + 1).join(".");
          const K = new ze(h);
          r[b] = K, i.push(K);
        } else
          r[b].addGroupId("audio", g.AUDIO), r[b].addGroupId("text", g.SUBTITLES);
      else {
        const k = new ze(h);
        r[b] = k, n[b] = 1, i.push(k);
      }
    }), this.filterAndSortMediaOptions(i, t, o, l, c);
  }
  filterAndSortMediaOptions(e, t, s, i, r) {
    let n = [], o = [], l = e;
    if ((s || i) && r && (l = l.filter(({
      videoCodec: f,
      videoRange: p,
      width: T,
      height: E
    }) => (!!f || !!(T && E)) && ia(p))), l.length === 0) {
      Promise.resolve().then(() => {
        if (this.hls) {
          t.levels.length && this.warn(`One or more CODECS in variant not supported: ${JSON.stringify(t.levels[0].attrs)}`);
          const f = new Error("no level with compatible codecs found in manifest");
          this.hls.trigger(m.ERROR, {
            type: U.MEDIA_ERROR,
            details: L.MANIFEST_INCOMPATIBLE_CODECS_ERROR,
            fatal: !0,
            url: t.url,
            error: f,
            reason: f.message
          });
        }
      });
      return;
    }
    if (t.audioTracks) {
      const {
        preferManagedMediaSource: f
      } = this.hls.config;
      n = t.audioTracks.filter((p) => !p.audioCodec || $t(p.audioCodec, "audio", f)), Ni(n);
    }
    t.subtitles && (o = t.subtitles, Ni(o));
    const c = l.slice(0);
    l.sort((f, p) => {
      if (f.attrs["HDCP-LEVEL"] !== p.attrs["HDCP-LEVEL"])
        return (f.attrs["HDCP-LEVEL"] || "") > (p.attrs["HDCP-LEVEL"] || "") ? 1 : -1;
      if (s && f.height !== p.height)
        return f.height - p.height;
      if (f.frameRate !== p.frameRate)
        return f.frameRate - p.frameRate;
      if (f.videoRange !== p.videoRange)
        return It.indexOf(f.videoRange) - It.indexOf(p.videoRange);
      if (f.videoCodec !== p.videoCodec) {
        const T = Ks(f.videoCodec), E = Ks(p.videoCodec);
        if (T !== E)
          return E - T;
      }
      if (f.uri === p.uri && f.codecSet !== p.codecSet) {
        const T = Lt(f.codecSet), E = Lt(p.codecSet);
        if (T !== E)
          return E - T;
      }
      return f.bitrate !== p.bitrate ? f.bitrate - p.bitrate : 0;
    });
    let h = c[0];
    if (this.steering && (l = this.steering.filterParsedLevels(l), l.length !== c.length)) {
      for (let f = 0; f < c.length; f++)
        if (c[f].pathwayId === l[0].pathwayId) {
          h = c[f];
          break;
        }
    }
    this._levels = l;
    for (let f = 0; f < l.length; f++)
      if (l[f] === h) {
        var u;
        this._firstLevel = f;
        const p = h.bitrate, T = this.hls.bandwidthEstimate;
        if (this.log(`manifest loaded, ${l.length} level(s) found, first bitrate: ${p}`), ((u = this.hls.userConfig) == null ? void 0 : u.abrEwmaDefaultEstimate) === void 0) {
          const E = Math.min(p, this.hls.config.abrEwmaDefaultEstimateMax);
          E > T && T === Hr.abrEwmaDefaultEstimate && (this.hls.bandwidthEstimate = E);
        }
        break;
      }
    const d = r && !i, g = {
      levels: l,
      audioTracks: n,
      subtitleTracks: o,
      sessionData: t.sessionData,
      sessionKeys: t.sessionKeys,
      firstLevel: this._firstLevel,
      stats: t.stats,
      audio: r,
      video: i,
      altAudio: !d && n.some((f) => !!f.url)
    };
    this.hls.trigger(m.MANIFEST_PARSED, g), (this.hls.config.autoStartLoad || this.hls.forceStartLoad) && this.hls.startLoad(this.hls.config.startPosition);
  }
  get levels() {
    return this._levels.length === 0 ? null : this._levels;
  }
  get level() {
    return this.currentLevelIndex;
  }
  set level(e) {
    const t = this._levels;
    if (t.length === 0)
      return;
    if (e < 0 || e >= t.length) {
      const h = new Error("invalid level idx"), u = e < 0;
      if (this.hls.trigger(m.ERROR, {
        type: U.OTHER_ERROR,
        details: L.LEVEL_SWITCH_ERROR,
        level: e,
        fatal: u,
        error: h,
        reason: h.message
      }), u)
        return;
      e = Math.min(e, t.length - 1);
    }
    const s = this.currentLevelIndex, i = this.currentLevel, r = i ? i.attrs["PATHWAY-ID"] : void 0, n = t[e], o = n.attrs["PATHWAY-ID"];
    if (this.currentLevelIndex = e, this.currentLevel = n, s === e && n.details && i && r === o)
      return;
    this.log(`Switching to level ${e} (${n.height ? n.height + "p " : ""}${n.videoRange ? n.videoRange + " " : ""}${n.codecSet ? n.codecSet + " " : ""}@${n.bitrate})${o ? " with Pathway " + o : ""} from level ${s}${r ? " with Pathway " + r : ""}`);
    const l = {
      level: e,
      attrs: n.attrs,
      details: n.details,
      bitrate: n.bitrate,
      averageBitrate: n.averageBitrate,
      maxBitrate: n.maxBitrate,
      realBitrate: n.realBitrate,
      width: n.width,
      height: n.height,
      codecSet: n.codecSet,
      audioCodec: n.audioCodec,
      videoCodec: n.videoCodec,
      audioGroups: n.audioGroups,
      subtitleGroups: n.subtitleGroups,
      loaded: n.loaded,
      loadError: n.loadError,
      fragmentError: n.fragmentError,
      name: n.name,
      id: n.id,
      uri: n.uri,
      url: n.url,
      urlId: 0,
      audioGroupIds: n.audioGroupIds,
      textGroupIds: n.textGroupIds
    };
    this.hls.trigger(m.LEVEL_SWITCHING, l);
    const c = n.details;
    if (!c || c.live) {
      const h = this.switchParams(n.uri, i == null ? void 0 : i.details);
      this.loadPlaylist(h);
    }
  }
  get manualLevel() {
    return this.manualLevelIndex;
  }
  set manualLevel(e) {
    this.manualLevelIndex = e, this._startLevel === void 0 && (this._startLevel = e), e !== -1 && (this.level = e);
  }
  get firstLevel() {
    return this._firstLevel;
  }
  set firstLevel(e) {
    this._firstLevel = e;
  }
  get startLevel() {
    if (this._startLevel === void 0) {
      const e = this.hls.config.startLevel;
      return e !== void 0 ? e : this.hls.firstAutoLevel;
    }
    return this._startLevel;
  }
  set startLevel(e) {
    this._startLevel = e;
  }
  onError(e, t) {
    t.fatal || !t.context || t.context.type === q.LEVEL && t.context.level === this.level && this.checkRetry(t);
  }
  // reset errors on the successful load of a fragment
  onFragBuffered(e, {
    frag: t
  }) {
    if (t !== void 0 && t.type === N.MAIN) {
      const s = t.elementaryStreams;
      if (!Object.keys(s).some((r) => !!s[r]))
        return;
      const i = this._levels[t.level];
      i != null && i.loadError && (this.log(`Resetting level error count of ${i.loadError} on frag buffered`), i.loadError = 0);
    }
  }
  onLevelLoaded(e, t) {
    var s;
    const {
      level: i,
      details: r
    } = t, n = this._levels[i];
    if (!n) {
      var o;
      this.warn(`Invalid level index ${i}`), (o = t.deliveryDirectives) != null && o.skip && (r.deltaUpdateFailed = !0);
      return;
    }
    i === this.currentLevelIndex ? (n.fragmentError === 0 && (n.loadError = 0), this.playlistLoaded(i, t, n.details)) : (s = t.deliveryDirectives) != null && s.skip && (r.deltaUpdateFailed = !0);
  }
  loadPlaylist(e) {
    super.loadPlaylist();
    const t = this.currentLevelIndex, s = this.currentLevel;
    if (s && this.shouldLoadPlaylist(s)) {
      let i = s.uri;
      if (e)
        try {
          i = e.addDirectives(i);
        } catch (n) {
          this.warn(`Could not construct new URL with HLS Delivery Directives: ${n}`);
        }
      const r = s.attrs["PATHWAY-ID"];
      this.log(`Loading level index ${t}${(e == null ? void 0 : e.msn) !== void 0 ? " at sn " + e.msn + " part " + e.part : ""} with${r ? " Pathway " + r : ""} ${i}`), this.clearTimer(), this.hls.trigger(m.LEVEL_LOADING, {
        url: i,
        level: t,
        pathwayId: s.attrs["PATHWAY-ID"],
        id: 0,
        // Deprecated Level urlId
        deliveryDirectives: e || null
      });
    }
  }
  get nextLoadLevel() {
    return this.manualLevelIndex !== -1 ? this.manualLevelIndex : this.hls.nextAutoLevel;
  }
  set nextLoadLevel(e) {
    this.level = e, this.manualLevelIndex === -1 && (this.hls.nextAutoLevel = e);
  }
  removeLevel(e) {
    var t;
    const s = this._levels.filter((i, r) => r !== e ? !0 : (this.steering && this.steering.removeLevel(i), i === this.currentLevel && (this.currentLevel = null, this.currentLevelIndex = -1, i.details && i.details.fragments.forEach((n) => n.level = -1)), !1));
    ar(s), this._levels = s, this.currentLevelIndex > -1 && (t = this.currentLevel) != null && t.details && (this.currentLevelIndex = this.currentLevel.details.fragments[0].level), this.hls.trigger(m.LEVELS_UPDATED, {
      levels: s
    });
  }
  onLevelsUpdated(e, {
    levels: t
  }) {
    this._levels = t;
  }
  checkMaxAutoUpdated() {
    const {
      autoLevelCapping: e,
      maxAutoLevel: t,
      maxHdcpLevel: s
    } = this.hls;
    this._maxAutoLevel !== t && (this._maxAutoLevel = t, this.hls.trigger(m.MAX_AUTO_LEVEL_UPDATED, {
      autoLevelCapping: e,
      levels: this.levels,
      maxAutoLevel: t,
      minAutoLevel: this.hls.minAutoLevel,
      maxHdcpLevel: s
    }));
  }
}
function Ni(a) {
  const e = {};
  a.forEach((t) => {
    const s = t.groupId || "";
    t.id = e[s] = e[s] || 0, e[s]++;
  });
}
class ic {
  constructor(e) {
    this.config = void 0, this.keyUriToKeyInfo = {}, this.emeController = null, this.config = e;
  }
  abort(e) {
    for (const s in this.keyUriToKeyInfo) {
      const i = this.keyUriToKeyInfo[s].loader;
      if (i) {
        var t;
        if (e && e !== ((t = i.context) == null ? void 0 : t.frag.type))
          return;
        i.abort();
      }
    }
  }
  detach() {
    for (const e in this.keyUriToKeyInfo) {
      const t = this.keyUriToKeyInfo[e];
      (t.mediaKeySessionContext || t.decryptdata.isCommonEncryption) && delete this.keyUriToKeyInfo[e];
    }
  }
  destroy() {
    this.detach();
    for (const e in this.keyUriToKeyInfo) {
      const t = this.keyUriToKeyInfo[e].loader;
      t && t.destroy();
    }
    this.keyUriToKeyInfo = {};
  }
  createKeyLoadError(e, t = L.KEY_LOAD_ERROR, s, i, r) {
    return new we({
      type: U.NETWORK_ERROR,
      details: t,
      fatal: !1,
      frag: e,
      response: r,
      error: s,
      networkDetails: i
    });
  }
  loadClear(e, t) {
    if (this.emeController && this.config.emeEnabled) {
      const {
        sn: s,
        cc: i
      } = e;
      for (let r = 0; r < t.length; r++) {
        const n = t[r];
        if (i <= n.cc && (s === "initSegment" || n.sn === "initSegment" || s < n.sn)) {
          this.emeController.selectKeySystemFormat(n).then((o) => {
            n.setKeyFormat(o);
          });
          break;
        }
      }
    }
  }
  load(e) {
    return !e.decryptdata && e.encrypted && this.emeController ? this.emeController.selectKeySystemFormat(e).then((t) => this.loadInternal(e, t)) : this.loadInternal(e);
  }
  loadInternal(e, t) {
    var s, i;
    t && e.setKeyFormat(t);
    const r = e.decryptdata;
    if (!r) {
      const c = new Error(t ? `Expected frag.decryptdata to be defined after setting format ${t}` : "Missing decryption data on fragment in onKeyLoading");
      return Promise.reject(this.createKeyLoadError(e, L.KEY_LOAD_ERROR, c));
    }
    const n = r.uri;
    if (!n)
      return Promise.reject(this.createKeyLoadError(e, L.KEY_LOAD_ERROR, new Error(`Invalid key URI: "${n}"`)));
    let o = this.keyUriToKeyInfo[n];
    if ((s = o) != null && s.decryptdata.key)
      return r.key = o.decryptdata.key, Promise.resolve({
        frag: e,
        keyInfo: o
      });
    if ((i = o) != null && i.keyLoadPromise) {
      var l;
      switch ((l = o.mediaKeySessionContext) == null ? void 0 : l.keyStatus) {
        case void 0:
        case "status-pending":
        case "usable":
        case "usable-in-future":
          return o.keyLoadPromise.then((c) => (r.key = c.keyInfo.decryptdata.key, {
            frag: e,
            keyInfo: o
          }));
      }
    }
    switch (o = this.keyUriToKeyInfo[n] = {
      decryptdata: r,
      keyLoadPromise: null,
      loader: null,
      mediaKeySessionContext: null
    }, r.method) {
      case "ISO-23001-7":
      case "SAMPLE-AES":
      case "SAMPLE-AES-CENC":
      case "SAMPLE-AES-CTR":
        return r.keyFormat === "identity" ? this.loadKeyHTTP(o, e) : this.loadKeyEME(o, e);
      case "AES-128":
        return this.loadKeyHTTP(o, e);
      default:
        return Promise.reject(this.createKeyLoadError(e, L.KEY_LOAD_ERROR, new Error(`Key supplied with unsupported METHOD: "${r.method}"`)));
    }
  }
  loadKeyEME(e, t) {
    const s = {
      frag: t,
      keyInfo: e
    };
    if (this.emeController && this.config.emeEnabled) {
      const i = this.emeController.loadKey(s);
      if (i)
        return (e.keyLoadPromise = i.then((r) => (e.mediaKeySessionContext = r, s))).catch((r) => {
          throw e.keyLoadPromise = null, r;
        });
    }
    return Promise.resolve(s);
  }
  loadKeyHTTP(e, t) {
    const s = this.config, i = s.loader, r = new i(s);
    return t.keyLoader = e.loader = r, e.keyLoadPromise = new Promise((n, o) => {
      const l = {
        keyInfo: e,
        frag: t,
        responseType: "arraybuffer",
        url: e.decryptdata.uri
      }, c = s.keyLoadPolicy.default, h = {
        loadPolicy: c,
        timeout: c.maxLoadTimeMs,
        maxRetry: 0,
        retryDelay: 0,
        maxRetryDelay: 0
      }, u = {
        onSuccess: (d, g, f, p) => {
          const {
            frag: T,
            keyInfo: E,
            url: y
          } = f;
          if (!T.decryptdata || E !== this.keyUriToKeyInfo[y])
            return o(this.createKeyLoadError(T, L.KEY_LOAD_ERROR, new Error("after key load, decryptdata unset or changed"), p));
          E.decryptdata.key = T.decryptdata.key = new Uint8Array(d.data), T.keyLoader = null, E.loader = null, n({
            frag: T,
            keyInfo: E
          });
        },
        onError: (d, g, f, p) => {
          this.resetLoader(g), o(this.createKeyLoadError(t, L.KEY_LOAD_ERROR, new Error(`HTTP Error ${d.code} loading key ${d.text}`), f, le({
            url: l.url,
            data: void 0
          }, d)));
        },
        onTimeout: (d, g, f) => {
          this.resetLoader(g), o(this.createKeyLoadError(t, L.KEY_LOAD_TIMEOUT, new Error("key loading timed out"), f));
        },
        onAbort: (d, g, f) => {
          this.resetLoader(g), o(this.createKeyLoadError(t, L.INTERNAL_ABORTED, new Error("key loading aborted"), f));
        }
      };
      r.load(l, h, u);
    });
  }
  resetLoader(e) {
    const {
      frag: t,
      keyInfo: s,
      url: i
    } = e, r = s.loader;
    t.keyLoader === r && (t.keyLoader = null, s.loader = null), delete this.keyUriToKeyInfo[i], r && r.destroy();
  }
}
function Wr() {
  return self.SourceBuffer || self.WebKitSourceBuffer;
}
function Yr() {
  if (!Je())
    return !1;
  const e = Wr();
  return !e || e.prototype && typeof e.prototype.appendBuffer == "function" && typeof e.prototype.remove == "function";
}
function rc() {
  if (!Yr())
    return !1;
  const a = Je();
  return typeof (a == null ? void 0 : a.isTypeSupported) == "function" && (["avc1.42E01E,mp4a.40.2", "av01.0.01M.08", "vp09.00.50.08"].some((e) => a.isTypeSupported(rt(e, "video"))) || ["mp4a.40.2", "fLaC"].some((e) => a.isTypeSupported(rt(e, "audio"))));
}
function nc() {
  var a;
  const e = Wr();
  return typeof (e == null || (a = e.prototype) == null ? void 0 : a.changeType) == "function";
}
const ac = 250, St = 2, oc = 0.1, lc = 0.05;
class cc {
  constructor(e, t, s, i) {
    this.config = void 0, this.media = null, this.fragmentTracker = void 0, this.hls = void 0, this.nudgeRetry = 0, this.stallReported = !1, this.stalled = null, this.moved = !1, this.seeking = !1, this.config = e, this.media = t, this.fragmentTracker = s, this.hls = i;
  }
  destroy() {
    this.media = null, this.hls = this.fragmentTracker = null;
  }
  /**
   * Checks if the playhead is stuck within a gap, and if so, attempts to free it.
   * A gap is an unbuffered range between two buffered ranges (or the start and the first buffered range).
   *
   * @param lastCurrentTime - Previously read playhead position
   */
  poll(e, t) {
    const {
      config: s,
      media: i,
      stalled: r
    } = this;
    if (i === null)
      return;
    const {
      currentTime: n,
      seeking: o
    } = i, l = this.seeking && !o, c = !this.seeking && o;
    if (this.seeking = o, n !== e) {
      if (this.moved = !0, o || (this.nudgeRetry = 0), r !== null) {
        if (this.stallReported) {
          const T = self.performance.now() - r;
          v.warn(`playback not stuck anymore @${n}, after ${Math.round(T)}ms`), this.stallReported = !1;
        }
        this.stalled = null;
      }
      return;
    }
    if (c || l) {
      this.stalled = null;
      return;
    }
    if (i.paused && !o || i.ended || i.playbackRate === 0 || !Q.getBuffered(i).length) {
      this.nudgeRetry = 0;
      return;
    }
    const h = Q.bufferInfo(i, n, 0), u = h.nextStart || 0;
    if (o) {
      const T = h.len > St, E = !u || t && t.start <= n || u - n > St && !this.fragmentTracker.getPartialFragment(n);
      if (T || E)
        return;
      this.moved = !1;
    }
    if (!this.moved && this.stalled !== null) {
      var d;
      if (!(h.len > 0) && !u)
        return;
      const E = Math.max(u, h.start || 0) - n, y = this.hls.levels ? this.hls.levels[this.hls.currentLevel] : null, I = (y == null || (d = y.details) == null ? void 0 : d.live) ? y.details.targetduration * 2 : St, S = this.fragmentTracker.getPartialFragment(n);
      if (E > 0 && (E <= I || S)) {
        i.paused || this._trySkipBufferHole(S);
        return;
      }
    }
    const g = self.performance.now();
    if (r === null) {
      this.stalled = g;
      return;
    }
    const f = g - r;
    if (!o && f >= ac && (this._reportStall(h), !this.media))
      return;
    const p = Q.bufferInfo(i, n, s.maxBufferHole);
    this._tryFixBufferStall(p, f);
  }
  /**
   * Detects and attempts to fix known buffer stalling issues.
   * @param bufferInfo - The properties of the current buffer.
   * @param stalledDurationMs - The amount of time Hls.js has been stalling for.
   * @private
   */
  _tryFixBufferStall(e, t) {
    const {
      config: s,
      fragmentTracker: i,
      media: r
    } = this;
    if (r === null)
      return;
    const n = r.currentTime, o = i.getPartialFragment(n);
    o && (this._trySkipBufferHole(o) || !this.media) || (e.len > s.maxBufferHole || e.nextStart && e.nextStart - n < s.maxBufferHole) && t > s.highBufferWatchdogPeriod * 1e3 && (v.warn("Trying to nudge playhead over buffer-hole"), this.stalled = null, this._tryNudgeBuffer());
  }
  /**
   * Triggers a BUFFER_STALLED_ERROR event, but only once per stall period.
   * @param bufferLen - The playhead distance from the end of the current buffer segment.
   * @private
   */
  _reportStall(e) {
    const {
      hls: t,
      media: s,
      stallReported: i
    } = this;
    if (!i && s) {
      this.stallReported = !0;
      const r = new Error(`Playback stalling at @${s.currentTime} due to low buffer (${JSON.stringify(e)})`);
      v.warn(r.message), t.trigger(m.ERROR, {
        type: U.MEDIA_ERROR,
        details: L.BUFFER_STALLED_ERROR,
        fatal: !1,
        error: r,
        buffer: e.len
      });
    }
  }
  /**
   * Attempts to fix buffer stalls by jumping over known gaps caused by partial fragments
   * @param partial - The partial fragment found at the current time (where playback is stalling).
   * @private
   */
  _trySkipBufferHole(e) {
    const {
      config: t,
      hls: s,
      media: i
    } = this;
    if (i === null)
      return 0;
    const r = i.currentTime, n = Q.bufferInfo(i, r, 0), o = r < n.start ? n.start : n.nextStart;
    if (o) {
      const l = n.len <= t.maxBufferHole, c = n.len > 0 && n.len < 1 && i.readyState < 3, h = o - r;
      if (h > 0 && (l || c)) {
        if (h > t.maxBufferHole) {
          const {
            fragmentTracker: d
          } = this;
          let g = !1;
          if (r === 0) {
            const f = d.getAppendedFrag(0, N.MAIN);
            f && o < f.end && (g = !0);
          }
          if (!g) {
            const f = e || d.getAppendedFrag(r, N.MAIN);
            if (f) {
              let p = !1, T = f.end;
              for (; T < o; ) {
                const E = d.getPartialFragment(T);
                if (E)
                  T += E.duration;
                else {
                  p = !0;
                  break;
                }
              }
              if (p)
                return 0;
            }
          }
        }
        const u = Math.max(o + lc, r + oc);
        if (v.warn(`skipping hole, adjusting currentTime from ${r} to ${u}`), this.moved = !0, this.stalled = null, i.currentTime = u, e && !e.gap) {
          const d = new Error(`fragment loaded with buffer holes, seeking from ${r} to ${u}`);
          s.trigger(m.ERROR, {
            type: U.MEDIA_ERROR,
            details: L.BUFFER_SEEK_OVER_HOLE,
            fatal: !1,
            error: d,
            reason: d.message,
            frag: e
          });
        }
        return u;
      }
    }
    return 0;
  }
  /**
   * Attempts to fix buffer stalls by advancing the mediaElement's current time by a small amount.
   * @private
   */
  _tryNudgeBuffer() {
    const {
      config: e,
      hls: t,
      media: s,
      nudgeRetry: i
    } = this;
    if (s === null)
      return;
    const r = s.currentTime;
    if (this.nudgeRetry++, i < e.nudgeMaxRetry) {
      const n = r + (i + 1) * e.nudgeOffset, o = new Error(`Nudging 'currentTime' from ${r} to ${n}`);
      v.warn(o.message), s.currentTime = n, t.trigger(m.ERROR, {
        type: U.MEDIA_ERROR,
        details: L.BUFFER_NUDGE_ON_STALL,
        error: o,
        fatal: !1
      });
    } else {
      const n = new Error(`Playhead still not moving while enough data buffered @${r} after ${e.nudgeMaxRetry} nudges`);
      v.error(n.message), t.trigger(m.ERROR, {
        type: U.MEDIA_ERROR,
        details: L.BUFFER_STALLED_ERROR,
        error: n,
        fatal: !0
      });
    }
  }
}
const hc = 100;
class uc extends Rs {
  constructor(e, t, s) {
    super(e, t, s, "[stream-controller]", N.MAIN), this.audioCodecSwap = !1, this.gapController = null, this.level = -1, this._forceStartLoad = !1, this.altAudio = !1, this.audioOnly = !1, this.fragPlaying = null, this.onvplaying = null, this.onvseeked = null, this.fragLastKbps = 0, this.couldBacktrack = !1, this.backtrackFragment = null, this.audioCodecSwitch = !1, this.videoBuffer = null, this._registerListeners();
  }
  _registerListeners() {
    const {
      hls: e
    } = this;
    e.on(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.on(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.on(m.MANIFEST_LOADING, this.onManifestLoading, this), e.on(m.MANIFEST_PARSED, this.onManifestParsed, this), e.on(m.LEVEL_LOADING, this.onLevelLoading, this), e.on(m.LEVEL_LOADED, this.onLevelLoaded, this), e.on(m.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), e.on(m.ERROR, this.onError, this), e.on(m.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.on(m.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), e.on(m.BUFFER_CREATED, this.onBufferCreated, this), e.on(m.BUFFER_FLUSHED, this.onBufferFlushed, this), e.on(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.on(m.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  _unregisterListeners() {
    const {
      hls: e
    } = this;
    e.off(m.MEDIA_ATTACHED, this.onMediaAttached, this), e.off(m.MEDIA_DETACHING, this.onMediaDetaching, this), e.off(m.MANIFEST_LOADING, this.onManifestLoading, this), e.off(m.MANIFEST_PARSED, this.onManifestParsed, this), e.off(m.LEVEL_LOADED, this.onLevelLoaded, this), e.off(m.FRAG_LOAD_EMERGENCY_ABORTED, this.onFragLoadEmergencyAborted, this), e.off(m.ERROR, this.onError, this), e.off(m.AUDIO_TRACK_SWITCHING, this.onAudioTrackSwitching, this), e.off(m.AUDIO_TRACK_SWITCHED, this.onAudioTrackSwitched, this), e.off(m.BUFFER_CREATED, this.onBufferCreated, this), e.off(m.BUFFER_FLUSHED, this.onBufferFlushed, this), e.off(m.LEVELS_UPDATED, this.onLevelsUpdated, this), e.off(m.FRAG_BUFFERED, this.onFragBuffered, this);
  }
  onHandlerDestroying() {
    this._unregisterListeners(), super.onHandlerDestroying();
  }
  startLoad(e) {
    if (this.levels) {
      const {
        lastCurrentTime: t,
        hls: s
      } = this;
      if (this.stopLoad(), this.setInterval(hc), this.level = -1, !this.startFragRequested) {
        let i = s.startLevel;
        i === -1 && (s.config.testBandwidth && this.levels.length > 1 ? (i = 0, this.bitrateTest = !0) : i = s.firstAutoLevel), this.level = s.nextLoadLevel = i, this.loadedmetadata = !1;
      }
      t > 0 && e === -1 && (this.log(`Override startPosition with lastCurrentTime @${t.toFixed(3)}`), e = t), this.state = C.IDLE, this.nextLoadPosition = this.startPosition = this.lastCurrentTime = e, this.tick();
    } else
      this._forceStartLoad = !0, this.state = C.STOPPED;
  }
  stopLoad() {
    this._forceStartLoad = !1, super.stopLoad();
  }
  doTick() {
    switch (this.state) {
      case C.WAITING_LEVEL: {
        const {
          levels: t,
          level: s
        } = this, i = t == null ? void 0 : t[s], r = i == null ? void 0 : i.details;
        if (r && (!r.live || this.levelLastLoaded === i)) {
          if (this.waitForCdnTuneIn(r))
            break;
          this.state = C.IDLE;
          break;
        } else if (this.hls.nextLoadLevel !== this.level) {
          this.state = C.IDLE;
          break;
        }
        break;
      }
      case C.FRAG_LOADING_WAITING_RETRY:
        {
          var e;
          const t = self.performance.now(), s = this.retryDate;
          if (!s || t >= s || (e = this.media) != null && e.seeking) {
            const {
              levels: i,
              level: r
            } = this, n = i == null ? void 0 : i[r];
            this.resetStartWhenNotLoaded(n || null), this.state = C.IDLE;
          }
        }
        break;
    }
    this.state === C.IDLE && this.doTickIdle(), this.onTickEnd();
  }
  onTickEnd() {
    super.onTickEnd(), this.checkBuffer(), this.checkFragmentChanged();
  }
  doTickIdle() {
    const {
      hls: e,
      levelLastLoaded: t,
      levels: s,
      media: i
    } = this, {
      config: r,
      nextLoadLevel: n
    } = e;
    if (t === null || !i && (this.startFragRequested || !r.startFragPrefetch) || this.altAudio && this.audioOnly || !(s != null && s[n]))
      return;
    const o = s[n], l = this.getMainFwdBufferInfo();
    if (l === null)
      return;
    const c = this.getLevelDetails();
    if (c && this._streamEnded(l, c)) {
      const T = {};
      this.altAudio && (T.type = "video"), this.hls.trigger(m.BUFFER_EOS, T), this.state = C.ENDED;
      return;
    }
    e.loadLevel !== n && e.manualLevel === -1 && this.log(`Adapting to level ${n} from level ${this.level}`), this.level = e.nextLoadLevel = n;
    const h = o.details;
    if (!h || this.state === C.WAITING_LEVEL || h.live && this.levelLastLoaded !== o) {
      this.level = n, this.state = C.WAITING_LEVEL;
      return;
    }
    const u = l.len, d = this.getMaxBufferLength(o.maxBitrate);
    if (u >= d)
      return;
    this.backtrackFragment && this.backtrackFragment.start > l.end && (this.backtrackFragment = null);
    const g = this.backtrackFragment ? this.backtrackFragment.start : l.end;
    let f = this.getNextFragment(g, h);
    if (this.couldBacktrack && !this.fragPrevious && f && f.sn !== "initSegment" && this.fragmentTracker.getState(f) !== oe.OK) {
      var p;
      const E = ((p = this.backtrackFragment) != null ? p : f).sn - h.startSN, y = h.fragments[E - 1];
      y && f.cc === y.cc && (f = y, this.fragmentTracker.removeFragment(y));
    } else
      this.backtrackFragment && l.len && (this.backtrackFragment = null);
    if (f && this.isLoopLoading(f, g)) {
      if (!f.gap) {
        const E = this.audioOnly && !this.altAudio ? X.AUDIO : X.VIDEO, y = (E === X.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
        y && this.afterBufferFlushed(y, E, N.MAIN);
      }
      f = this.getNextFragmentLoopLoading(f, h, l, N.MAIN, d);
    }
    f && (f.initSegment && !f.initSegment.data && !this.bitrateTest && (f = f.initSegment), this.loadFragment(f, o, g));
  }
  loadFragment(e, t, s) {
    const i = this.fragmentTracker.getState(e);
    this.fragCurrent = e, i === oe.NOT_LOADED || i === oe.PARTIAL ? e.sn === "initSegment" ? this._loadInitSegment(e, t) : this.bitrateTest ? (this.log(`Fragment ${e.sn} of level ${e.level} is being downloaded to test bitrate and will not be buffered`), this._loadBitrateTestFrag(e, t)) : (this.startFragRequested = !0, super.loadFragment(e, t, s)) : this.clearTrackerIfNeeded(e);
  }
  getBufferedFrag(e) {
    return this.fragmentTracker.getBufferedFrag(e, N.MAIN);
  }
  followingBufferedFrag(e) {
    return e ? this.getBufferedFrag(e.end + 0.5) : null;
  }
  /*
    on immediate level switch :
     - pause playback if playing
     - cancel any pending load request
     - and trigger a buffer flush
  */
  immediateLevelSwitch() {
    this.abortCurrentFrag(), this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
  }
  /**
   * try to switch ASAP without breaking video playback:
   * in order to ensure smooth but quick level switching,
   * we need to find the next flushable buffer range
   * we should take into account new segment fetch time
   */
  nextLevelSwitch() {
    const {
      levels: e,
      media: t
    } = this;
    if (t != null && t.readyState) {
      let s;
      const i = this.getAppendedFrag(t.currentTime);
      i && i.start > 1 && this.flushMainBuffer(0, i.start - 1);
      const r = this.getLevelDetails();
      if (r != null && r.live) {
        const o = this.getMainFwdBufferInfo();
        if (!o || o.len < r.targetduration * 2)
          return;
      }
      if (!t.paused && e) {
        const o = this.hls.nextLoadLevel, l = e[o], c = this.fragLastKbps;
        c && this.fragCurrent ? s = this.fragCurrent.duration * l.maxBitrate / (1e3 * c) + 1 : s = 0;
      } else
        s = 0;
      const n = this.getBufferedFrag(t.currentTime + s);
      if (n) {
        const o = this.followingBufferedFrag(n);
        if (o) {
          this.abortCurrentFrag();
          const l = o.maxStartPTS ? o.maxStartPTS : o.start, c = o.duration, h = Math.max(n.end, l + Math.min(Math.max(c - this.config.maxFragLookUpTolerance, c * (this.couldBacktrack ? 0.5 : 0.125)), c * (this.couldBacktrack ? 0.75 : 0.25)));
          this.flushMainBuffer(h, Number.POSITIVE_INFINITY);
        }
      }
    }
  }
  abortCurrentFrag() {
    const e = this.fragCurrent;
    switch (this.fragCurrent = null, this.backtrackFragment = null, e && (e.abortRequests(), this.fragmentTracker.removeFragment(e)), this.state) {
      case C.KEY_LOADING:
      case C.FRAG_LOADING:
      case C.FRAG_LOADING_WAITING_RETRY:
      case C.PARSING:
      case C.PARSED:
        this.state = C.IDLE;
        break;
    }
    this.nextLoadPosition = this.getLoadPosition();
  }
  flushMainBuffer(e, t) {
    super.flushMainBuffer(e, t, this.altAudio ? "video" : null);
  }
  onMediaAttached(e, t) {
    super.onMediaAttached(e, t);
    const s = t.media;
    this.onvplaying = this.onMediaPlaying.bind(this), this.onvseeked = this.onMediaSeeked.bind(this), s.addEventListener("playing", this.onvplaying), s.addEventListener("seeked", this.onvseeked), this.gapController = new cc(this.config, s, this.fragmentTracker, this.hls);
  }
  onMediaDetaching() {
    const {
      media: e
    } = this;
    e && this.onvplaying && this.onvseeked && (e.removeEventListener("playing", this.onvplaying), e.removeEventListener("seeked", this.onvseeked), this.onvplaying = this.onvseeked = null, this.videoBuffer = null), this.fragPlaying = null, this.gapController && (this.gapController.destroy(), this.gapController = null), super.onMediaDetaching();
  }
  onMediaPlaying() {
    this.tick();
  }
  onMediaSeeked() {
    const e = this.media, t = e ? e.currentTime : null;
    O(t) && this.log(`Media seeked to ${t.toFixed(3)}`);
    const s = this.getMainFwdBufferInfo();
    if (s === null || s.len === 0) {
      this.warn(`Main forward buffer length on "seeked" event ${s ? s.len : "empty"})`);
      return;
    }
    this.tick();
  }
  onManifestLoading() {
    this.log("Trigger BUFFER_RESET"), this.hls.trigger(m.BUFFER_RESET, void 0), this.fragmentTracker.removeAllFragments(), this.couldBacktrack = !1, this.startPosition = this.lastCurrentTime = this.fragLastKbps = 0, this.levels = this.fragPlaying = this.backtrackFragment = this.levelLastLoaded = null, this.altAudio = this.audioOnly = this.startFragRequested = !1;
  }
  onManifestParsed(e, t) {
    let s = !1, i = !1;
    t.levels.forEach((r) => {
      const n = r.audioCodec;
      n && (s = s || n.indexOf("mp4a.40.2") !== -1, i = i || n.indexOf("mp4a.40.5") !== -1);
    }), this.audioCodecSwitch = s && i && !nc(), this.audioCodecSwitch && this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"), this.levels = t.levels, this.startFragRequested = !1;
  }
  onLevelLoading(e, t) {
    const {
      levels: s
    } = this;
    if (!s || this.state !== C.IDLE)
      return;
    const i = s[t.level];
    (!i.details || i.details.live && this.levelLastLoaded !== i || this.waitForCdnTuneIn(i.details)) && (this.state = C.WAITING_LEVEL);
  }
  onLevelLoaded(e, t) {
    var s;
    const {
      levels: i
    } = this, r = t.level, n = t.details, o = n.totalduration;
    if (!i) {
      this.warn(`Levels were reset while loading level ${r}`);
      return;
    }
    this.log(`Level ${r} loaded [${n.startSN},${n.endSN}]${n.lastPartSn ? `[part-${n.lastPartSn}-${n.lastPartIndex}]` : ""}, cc [${n.startCC}, ${n.endCC}] duration:${o}`);
    const l = i[r], c = this.fragCurrent;
    c && (this.state === C.FRAG_LOADING || this.state === C.FRAG_LOADING_WAITING_RETRY) && c.level !== t.level && c.loader && this.abortCurrentFrag();
    let h = 0;
    if (n.live || (s = l.details) != null && s.live) {
      var u;
      if (this.checkLiveUpdate(n), n.deltaUpdateFailed)
        return;
      h = this.alignPlaylists(n, l.details, (u = this.levelLastLoaded) == null ? void 0 : u.details);
    }
    if (l.details = n, this.levelLastLoaded = l, this.hls.trigger(m.LEVEL_UPDATED, {
      details: n,
      level: r
    }), this.state === C.WAITING_LEVEL) {
      if (this.waitForCdnTuneIn(n))
        return;
      this.state = C.IDLE;
    }
    this.startFragRequested ? n.live && this.synchronizeToLiveEdge(n) : this.setStartPosition(n, h), this.tick();
  }
  _handleFragmentLoadProgress(e) {
    var t;
    const {
      frag: s,
      part: i,
      payload: r
    } = e, {
      levels: n
    } = this;
    if (!n) {
      this.warn(`Levels were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`);
      return;
    }
    const o = n[s.level], l = o.details;
    if (!l) {
      this.warn(`Dropping fragment ${s.sn} of level ${s.level} after level details were reset`), this.fragmentTracker.removeFragment(s);
      return;
    }
    const c = o.videoCodec, h = l.PTSKnown || !l.live, u = (t = s.initSegment) == null ? void 0 : t.data, d = this._getAudioCodec(o), g = this.transmuxer = this.transmuxer || new Ir(this.hls, N.MAIN, this._handleTransmuxComplete.bind(this), this._handleTransmuxerFlush.bind(this)), f = i ? i.index : -1, p = f !== -1, T = new As(s.level, s.sn, s.stats.chunkCount, r.byteLength, f, p), E = this.initPTS[s.cc];
    g.push(r, u, d, c, s, i, l.totalduration, h, T, E);
  }
  onAudioTrackSwitching(e, t) {
    const s = this.altAudio;
    if (!!!t.url) {
      if (this.mediaBuffer !== this.media) {
        this.log("Switching on main audio, use media.buffered to schedule main fragment loading"), this.mediaBuffer = this.media;
        const n = this.fragCurrent;
        n && (this.log("Switching to main audio track, cancel main fragment load"), n.abortRequests(), this.fragmentTracker.removeFragment(n)), this.resetTransmuxer(), this.resetLoadingState();
      } else
        this.audioOnly && this.resetTransmuxer();
      const r = this.hls;
      s && (r.trigger(m.BUFFER_FLUSHING, {
        startOffset: 0,
        endOffset: Number.POSITIVE_INFINITY,
        type: null
      }), this.fragmentTracker.removeAllFragments()), r.trigger(m.AUDIO_TRACK_SWITCHED, t);
    }
  }
  onAudioTrackSwitched(e, t) {
    const s = t.id, i = !!this.hls.audioTracks[s].url;
    if (i) {
      const r = this.videoBuffer;
      r && this.mediaBuffer !== r && (this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"), this.mediaBuffer = r);
    }
    this.altAudio = i, this.tick();
  }
  onBufferCreated(e, t) {
    const s = t.tracks;
    let i, r, n = !1;
    for (const o in s) {
      const l = s[o];
      if (l.id === "main") {
        if (r = o, i = l, o === "video") {
          const c = s[o];
          c && (this.videoBuffer = c.buffer);
        }
      } else
        n = !0;
    }
    n && i ? (this.log(`Alternate track found, use ${r}.buffered to schedule main fragment loading`), this.mediaBuffer = i.buffer) : this.mediaBuffer = this.media;
  }
  onFragBuffered(e, t) {
    const {
      frag: s,
      part: i
    } = t;
    if (s && s.type !== N.MAIN)
      return;
    if (this.fragContextChanged(s)) {
      this.warn(`Fragment ${s.sn}${i ? " p: " + i.index : ""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}`), this.state === C.PARSED && (this.state = C.IDLE);
      return;
    }
    const r = i ? i.stats : s.stats;
    this.fragLastKbps = Math.round(8 * r.total / (r.buffering.end - r.loading.first)), s.sn !== "initSegment" && (this.fragPrevious = s), this.fragBufferedComplete(s, i);
  }
  onError(e, t) {
    var s;
    if (t.fatal) {
      this.state = C.ERROR;
      return;
    }
    switch (t.details) {
      case L.FRAG_GAP:
      case L.FRAG_PARSING_ERROR:
      case L.FRAG_DECRYPT_ERROR:
      case L.FRAG_LOAD_ERROR:
      case L.FRAG_LOAD_TIMEOUT:
      case L.KEY_LOAD_ERROR:
      case L.KEY_LOAD_TIMEOUT:
        this.onFragmentOrKeyLoadError(N.MAIN, t);
        break;
      case L.LEVEL_LOAD_ERROR:
      case L.LEVEL_LOAD_TIMEOUT:
      case L.LEVEL_PARSING_ERROR:
        !t.levelRetry && this.state === C.WAITING_LEVEL && ((s = t.context) == null ? void 0 : s.type) === q.LEVEL && (this.state = C.IDLE);
        break;
      case L.BUFFER_APPEND_ERROR:
      case L.BUFFER_FULL_ERROR:
        if (!t.parent || t.parent !== "main")
          return;
        if (t.details === L.BUFFER_APPEND_ERROR) {
          this.resetLoadingState();
          return;
        }
        this.reduceLengthAndFlushBuffer(t) && this.flushMainBuffer(0, Number.POSITIVE_INFINITY);
        break;
      case L.INTERNAL_EXCEPTION:
        this.recoverWorkerError(t);
        break;
    }
  }
  // Checks the health of the buffer and attempts to resolve playback stalls.
  checkBuffer() {
    const {
      media: e,
      gapController: t
    } = this;
    if (!(!e || !t || !e.readyState)) {
      if (this.loadedmetadata || !Q.getBuffered(e).length) {
        const s = this.state !== C.IDLE ? this.fragCurrent : null;
        t.poll(this.lastCurrentTime, s);
      }
      this.lastCurrentTime = e.currentTime;
    }
  }
  onFragLoadEmergencyAborted() {
    this.state = C.IDLE, this.loadedmetadata || (this.startFragRequested = !1, this.nextLoadPosition = this.startPosition), this.tickImmediate();
  }
  onBufferFlushed(e, {
    type: t
  }) {
    if (t !== X.AUDIO || this.audioOnly && !this.altAudio) {
      const s = (t === X.VIDEO ? this.videoBuffer : this.mediaBuffer) || this.media;
      this.afterBufferFlushed(s, t, N.MAIN), this.tick();
    }
  }
  onLevelsUpdated(e, t) {
    this.level > -1 && this.fragCurrent && (this.level = this.fragCurrent.level), this.levels = t.levels;
  }
  swapAudioCodec() {
    this.audioCodecSwap = !this.audioCodecSwap;
  }
  /**
   * Seeks to the set startPosition if not equal to the mediaElement's current time.
   */
  seekToStartPos() {
    const {
      media: e
    } = this;
    if (!e)
      return;
    const t = e.currentTime;
    let s = this.startPosition;
    if (s >= 0 && t < s) {
      if (e.seeking) {
        this.log(`could not seek to ${s}, already seeking at ${t}`);
        return;
      }
      const i = Q.getBuffered(e), n = (i.length ? i.start(0) : 0) - s;
      n > 0 && (n < this.config.maxBufferHole || n < this.config.maxFragLookUpTolerance) && (this.log(`adjusting start position by ${n} to match buffer start`), s += n, this.startPosition = s), this.log(`seek to target start position ${s} from current time ${t}`), e.currentTime = s;
    }
  }
  _getAudioCodec(e) {
    let t = this.config.defaultAudioCodec || e.audioCodec;
    return this.audioCodecSwap && t && (this.log("Swapping audio codec"), t.indexOf("mp4a.40.5") !== -1 ? t = "mp4a.40.2" : t = "mp4a.40.5"), t;
  }
  _loadBitrateTestFrag(e, t) {
    e.bitrateTest = !0, this._doFragLoad(e, t).then((s) => {
      const {
        hls: i
      } = this;
      if (!s || this.fragContextChanged(e))
        return;
      t.fragmentError = 0, this.state = C.IDLE, this.startFragRequested = !1, this.bitrateTest = !1;
      const r = e.stats;
      r.parsing.start = r.parsing.end = r.buffering.start = r.buffering.end = self.performance.now(), i.trigger(m.FRAG_LOADED, s), e.bitrateTest = !1;
    });
  }
  _handleTransmuxComplete(e) {
    var t;
    const s = "main", {
      hls: i
    } = this, {
      remuxResult: r,
      chunkMeta: n
    } = e, o = this.getCurrentContext(n);
    if (!o) {
      this.resetWhenMissingContext(n);
      return;
    }
    const {
      frag: l,
      part: c,
      level: h
    } = o, {
      video: u,
      text: d,
      id3: g,
      initSegment: f
    } = r, {
      details: p
    } = h, T = this.altAudio ? void 0 : r.audio;
    if (this.fragContextChanged(l)) {
      this.fragmentTracker.removeFragment(l);
      return;
    }
    if (this.state = C.PARSING, f) {
      if (f != null && f.tracks) {
        const x = l.initSegment || l;
        this._bufferInitSegment(h, f.tracks, x, n), i.trigger(m.FRAG_PARSING_INIT_SEGMENT, {
          frag: x,
          id: s,
          tracks: f.tracks
        });
      }
      const E = f.initPTS, y = f.timescale;
      O(E) && (this.initPTS[l.cc] = {
        baseTime: E,
        timescale: y
      }, i.trigger(m.INIT_PTS_FOUND, {
        frag: l,
        id: s,
        initPTS: E,
        timescale: y
      }));
    }
    if (u && p && l.sn !== "initSegment") {
      const E = p.fragments[l.sn - 1 - p.startSN], y = l.sn === p.startSN, x = !E || l.cc > E.cc;
      if (r.independent !== !1) {
        const {
          startPTS: I,
          endPTS: S,
          startDTS: D,
          endDTS: R
        } = u;
        if (c)
          c.elementaryStreams[u.type] = {
            startPTS: I,
            endPTS: S,
            startDTS: D,
            endDTS: R
          };
        else if (u.firstKeyFrame && u.independent && n.id === 1 && !x && (this.couldBacktrack = !0), u.dropped && u.independent) {
          const w = this.getMainFwdBufferInfo(), _ = (w ? w.end : this.getLoadPosition()) + this.config.maxBufferHole, b = u.firstKeyFramePTS ? u.firstKeyFramePTS : I;
          if (!y && _ < b - this.config.maxBufferHole && !x) {
            this.backtrack(l);
            return;
          } else
            x && (l.gap = !0);
          l.setElementaryStreamInfo(u.type, l.start, S, l.start, R, !0);
        } else
          y && I > St && (l.gap = !0);
        l.setElementaryStreamInfo(u.type, I, S, D, R), this.backtrackFragment && (this.backtrackFragment = l), this.bufferFragmentData(u, l, c, n, y || x);
      } else if (y || x)
        l.gap = !0;
      else {
        this.backtrack(l);
        return;
      }
    }
    if (T) {
      const {
        startPTS: E,
        endPTS: y,
        startDTS: x,
        endDTS: I
      } = T;
      c && (c.elementaryStreams[X.AUDIO] = {
        startPTS: E,
        endPTS: y,
        startDTS: x,
        endDTS: I
      }), l.setElementaryStreamInfo(X.AUDIO, E, y, x, I), this.bufferFragmentData(T, l, c, n);
    }
    if (p && g != null && (t = g.samples) != null && t.length) {
      const E = {
        id: s,
        frag: l,
        details: p,
        samples: g.samples
      };
      i.trigger(m.FRAG_PARSING_METADATA, E);
    }
    if (p && d) {
      const E = {
        id: s,
        frag: l,
        details: p,
        samples: d.samples
      };
      i.trigger(m.FRAG_PARSING_USERDATA, E);
    }
  }
  _bufferInitSegment(e, t, s, i) {
    if (this.state !== C.PARSING)
      return;
    this.audioOnly = !!t.audio && !t.video, this.altAudio && !this.audioOnly && delete t.audio;
    const {
      audio: r,
      video: n,
      audiovideo: o
    } = t;
    if (r) {
      let l = e.audioCodec;
      const c = navigator.userAgent.toLowerCase();
      this.audioCodecSwitch && (l && (l.indexOf("mp4a.40.5") !== -1 ? l = "mp4a.40.2" : l = "mp4a.40.5"), r.metadata.channelCount !== 1 && c.indexOf("firefox") === -1 && (l = "mp4a.40.5")), l && l.indexOf("mp4a.40.5") !== -1 && c.indexOf("android") !== -1 && r.container !== "audio/mpeg" && (l = "mp4a.40.2", this.log(`Android: force audio codec to ${l}`)), e.audioCodec && e.audioCodec !== l && this.log(`Swapping manifest audio codec "${e.audioCodec}" for "${l}"`), r.levelCodec = l, r.id = "main", this.log(`Init audio buffer, container:${r.container}, codecs[selected/level/parsed]=[${l || ""}/${e.audioCodec || ""}/${r.codec}]`);
    }
    n && (n.levelCodec = e.videoCodec, n.id = "main", this.log(`Init video buffer, container:${n.container}, codecs[level/parsed]=[${e.videoCodec || ""}/${n.codec}]`)), o && this.log(`Init audiovideo buffer, container:${o.container}, codecs[level/parsed]=[${e.codecs}/${o.codec}]`), this.hls.trigger(m.BUFFER_CODECS, t), Object.keys(t).forEach((l) => {
      const h = t[l].initSegment;
      h != null && h.byteLength && this.hls.trigger(m.BUFFER_APPENDING, {
        type: l,
        data: h,
        frag: s,
        part: null,
        chunkMeta: i,
        parent: s.type
      });
    }), this.tickImmediate();
  }
  getMainFwdBufferInfo() {
    return this.getFwdBufferInfo(this.mediaBuffer ? this.mediaBuffer : this.media, N.MAIN);
  }
  backtrack(e) {
    this.couldBacktrack = !0, this.backtrackFragment = e, this.resetTransmuxer(), this.flushBufferGap(e), this.fragmentTracker.removeFragment(e), this.fragPrevious = null, this.nextLoadPosition = e.start, this.state = C.IDLE;
  }
  checkFragmentChanged() {
    const e = this.media;
    let t = null;
    if (e && e.readyState > 1 && e.seeking === !1) {
      const s = e.currentTime;
      if (Q.isBuffered(e, s) ? t = this.getAppendedFrag(s) : Q.isBuffered(e, s + 0.1) && (t = this.getAppendedFrag(s + 0.1)), t) {
        this.backtrackFragment = null;
        const i = this.fragPlaying, r = t.level;
        (!i || t.sn !== i.sn || i.level !== r) && (this.fragPlaying = t, this.hls.trigger(m.FRAG_CHANGED, {
          frag: t
        }), (!i || i.level !== r) && this.hls.trigger(m.LEVEL_SWITCHED, {
          level: r
        }));
      }
    }
  }
  get nextLevel() {
    const e = this.nextBufferedFrag;
    return e ? e.level : -1;
  }
  get currentFrag() {
    const e = this.media;
    return e ? this.fragPlaying || this.getAppendedFrag(e.currentTime) : null;
  }
  get currentProgramDateTime() {
    const e = this.media;
    if (e) {
      const t = e.currentTime, s = this.currentFrag;
      if (s && O(t) && O(s.programDateTime)) {
        const i = s.programDateTime + (t - s.start) * 1e3;
        return new Date(i);
      }
    }
    return null;
  }
  get currentLevel() {
    const e = this.currentFrag;
    return e ? e.level : -1;
  }
  get nextBufferedFrag() {
    const e = this.currentFrag;
    return e ? this.followingBufferedFrag(e) : null;
  }
  get forceStartLoad() {
    return this._forceStartLoad;
  }
}
class We {
  /**
   * Get the video-dev/hls.js package version.
   */
  static get version() {
    return "1.5.1";
  }
  /**
   * Check if the required MediaSource Extensions are available.
   */
  static isMSESupported() {
    return Yr();
  }
  /**
   * Check if MediaSource Extensions are available and isTypeSupported checks pass for any baseline codecs.
   */
  static isSupported() {
    return rc();
  }
  /**
   * Get the MediaSource global used for MSE playback (ManagedMediaSource, MediaSource, or WebKitMediaSource).
   */
  static getMediaSource() {
    return Je();
  }
  static get Events() {
    return m;
  }
  static get ErrorTypes() {
    return U;
  }
  static get ErrorDetails() {
    return L;
  }
  /**
   * Get the default configuration applied to new instances.
   */
  static get DefaultConfig() {
    return We.defaultConfig ? We.defaultConfig : Hr;
  }
  /**
   * Replace the default configuration applied to new instances.
   */
  static set DefaultConfig(e) {
    We.defaultConfig = e;
  }
  /**
   * Creates an instance of an HLS client that can attach to exactly one `HTMLMediaElement`.
   * @param userConfig - Configuration options applied over `Hls.DefaultConfig`
   */
  constructor(e = {}) {
    this.config = void 0, this.userConfig = void 0, this.coreComponents = void 0, this.networkControllers = void 0, this.started = !1, this._emitter = new ws(), this._autoLevelCapping = -1, this._maxHdcpLevel = null, this.abrController = void 0, this.bufferController = void 0, this.capLevelController = void 0, this.latencyController = void 0, this.levelController = void 0, this.streamController = void 0, this.audioTrackController = void 0, this.subtitleTrackController = void 0, this.emeController = void 0, this.cmcdController = void 0, this._media = null, this.url = null, this.triggeringException = void 0, tn(e.debug || !1, "Hls instance");
    const t = this.config = ec(We.DefaultConfig, e);
    this.userConfig = e, t.progressive && tc(t);
    const {
      abrController: s,
      bufferController: i,
      capLevelController: r,
      errorController: n,
      fpsController: o
    } = t, l = new n(this), c = this.abrController = new s(this), h = this.bufferController = new i(this), u = this.capLevelController = new r(this), d = new o(this), g = new zn(this), f = new ea(this), p = t.contentSteeringController, T = p ? new p(this) : null, E = this.levelController = new sc(this, T), y = new Ca(this), x = new ic(this.config), I = this.streamController = new uc(this, y, x);
    u.setStreamController(I), d.setStreamController(I);
    const S = [g, E, I];
    T && S.splice(1, 0, T), this.networkControllers = S;
    const D = [c, h, u, d, f, y];
    this.audioTrackController = this.createController(t.audioTrackController, S);
    const R = t.audioStreamController;
    R && S.push(new R(this, y, x)), this.subtitleTrackController = this.createController(t.subtitleTrackController, S);
    const w = t.subtitleStreamController;
    w && S.push(new w(this, y, x)), this.createController(t.timelineController, D), x.emeController = this.emeController = this.createController(t.emeController, D), this.cmcdController = this.createController(t.cmcdController, D), this.latencyController = this.createController(ta, D), this.coreComponents = D, S.push(l);
    const _ = l.onErrorOut;
    typeof _ == "function" && this.on(m.ERROR, _, l);
  }
  createController(e, t) {
    if (e) {
      const s = new e(this);
      return t && t.push(s), s;
    }
    return null;
  }
  // Delegate the EventEmitter through the public API of Hls.js
  on(e, t, s = this) {
    this._emitter.on(e, t, s);
  }
  once(e, t, s = this) {
    this._emitter.once(e, t, s);
  }
  removeAllListeners(e) {
    this._emitter.removeAllListeners(e);
  }
  off(e, t, s = this, i) {
    this._emitter.off(e, t, s, i);
  }
  listeners(e) {
    return this._emitter.listeners(e);
  }
  emit(e, t, s) {
    return this._emitter.emit(e, t, s);
  }
  trigger(e, t) {
    if (this.config.debug)
      return this.emit(e, e, t);
    try {
      return this.emit(e, e, t);
    } catch (s) {
      if (v.error("An internal error happened while handling event " + e + '. Error message: "' + s.message + '". Here is a stacktrace:', s), !this.triggeringException) {
        this.triggeringException = !0;
        const i = e === m.ERROR;
        this.trigger(m.ERROR, {
          type: U.OTHER_ERROR,
          details: L.INTERNAL_EXCEPTION,
          fatal: i,
          event: e,
          error: s
        }), this.triggeringException = !1;
      }
    }
    return !1;
  }
  listenerCount(e) {
    return this._emitter.listenerCount(e);
  }
  /**
   * Dispose of the instance
   */
  destroy() {
    v.log("destroy"), this.trigger(m.DESTROYING, void 0), this.detachMedia(), this.removeAllListeners(), this._autoLevelCapping = -1, this.url = null, this.networkControllers.forEach((t) => t.destroy()), this.networkControllers.length = 0, this.coreComponents.forEach((t) => t.destroy()), this.coreComponents.length = 0;
    const e = this.config;
    e.xhrSetup = e.fetchSetup = void 0, this.userConfig = null;
  }
  /**
   * Attaches Hls.js to a media element
   */
  attachMedia(e) {
    v.log("attachMedia"), this._media = e, this.trigger(m.MEDIA_ATTACHING, {
      media: e
    });
  }
  /**
   * Detach Hls.js from the media
   */
  detachMedia() {
    v.log("detachMedia"), this.trigger(m.MEDIA_DETACHING, void 0), this._media = null;
  }
  /**
   * Set the source URL. Can be relative or absolute.
   */
  loadSource(e) {
    this.stopLoad();
    const t = this.media, s = this.url, i = this.url = Ts.buildAbsoluteURL(self.location.href, e, {
      alwaysNormalize: !0
    });
    this._autoLevelCapping = -1, this._maxHdcpLevel = null, v.log(`loadSource:${i}`), t && s && (s !== i || this.bufferController.hasSourceTypes()) && (this.detachMedia(), this.attachMedia(t)), this.trigger(m.MANIFEST_LOADING, {
      url: e
    });
  }
  /**
   * Start loading data from the stream source.
   * Depending on default config, client starts loading automatically when a source is set.
   *
   * @param startPosition - Set the start position to stream from.
   * Defaults to -1 (None: starts from earliest point)
   */
  startLoad(e = -1) {
    v.log(`startLoad(${e})`), this.started = !0, this.networkControllers.forEach((t) => {
      t.startLoad(e);
    });
  }
  /**
   * Stop loading of any stream data.
   */
  stopLoad() {
    v.log("stopLoad"), this.started = !1, this.networkControllers.forEach((e) => {
      e.stopLoad();
    });
  }
  /**
   * Resumes stream controller segment loading if previously started.
   */
  resumeBuffering() {
    this.started && this.networkControllers.forEach((e) => {
      "fragmentLoader" in e && e.startLoad(-1);
    });
  }
  /**
   * Stops stream controller segment loading without changing 'started' state like stopLoad().
   * This allows for media buffering to be paused without interupting playlist loading.
   */
  pauseBuffering() {
    this.networkControllers.forEach((e) => {
      "fragmentLoader" in e && e.stopLoad();
    });
  }
  /**
   * Swap through possible audio codecs in the stream (for example to switch from stereo to 5.1)
   */
  swapAudioCodec() {
    v.log("swapAudioCodec"), this.streamController.swapAudioCodec();
  }
  /**
   * When the media-element fails, this allows to detach and then re-attach it
   * as one call (convenience method).
   *
   * Automatic recovery of media-errors by this process is configurable.
   */
  recoverMediaError() {
    v.log("recoverMediaError");
    const e = this._media;
    this.detachMedia(), e && this.attachMedia(e);
  }
  removeLevel(e) {
    this.levelController.removeLevel(e);
  }
  /**
   * @returns an array of levels (variants) sorted by HDCP-LEVEL, RESOLUTION (height), FRAME-RATE, CODECS, VIDEO-RANGE, and BANDWIDTH
   */
  get levels() {
    const e = this.levelController.levels;
    return e || [];
  }
  /**
   * Index of quality level (variant) currently played
   */
  get currentLevel() {
    return this.streamController.currentLevel;
  }
  /**
   * Set quality level index immediately. This will flush the current buffer to replace the quality asap. That means playback will interrupt at least shortly to re-buffer and re-sync eventually. Set to -1 for automatic level selection.
   */
  set currentLevel(e) {
    v.log(`set currentLevel:${e}`), this.levelController.manualLevel = e, this.streamController.immediateLevelSwitch();
  }
  /**
   * Index of next quality level loaded as scheduled by stream controller.
   */
  get nextLevel() {
    return this.streamController.nextLevel;
  }
  /**
   * Set quality level index for next loaded data.
   * This will switch the video quality asap, without interrupting playback.
   * May abort current loading of data, and flush parts of buffer (outside currently played fragment region).
   * @param newLevel - Pass -1 for automatic level selection
   */
  set nextLevel(e) {
    v.log(`set nextLevel:${e}`), this.levelController.manualLevel = e, this.streamController.nextLevelSwitch();
  }
  /**
   * Return the quality level of the currently or last (of none is loaded currently) segment
   */
  get loadLevel() {
    return this.levelController.level;
  }
  /**
   * Set quality level index for next loaded data in a conservative way.
   * This will switch the quality without flushing, but interrupt current loading.
   * Thus the moment when the quality switch will appear in effect will only be after the already existing buffer.
   * @param newLevel - Pass -1 for automatic level selection
   */
  set loadLevel(e) {
    v.log(`set loadLevel:${e}`), this.levelController.manualLevel = e;
  }
  /**
   * get next quality level loaded
   */
  get nextLoadLevel() {
    return this.levelController.nextLoadLevel;
  }
  /**
   * Set quality level of next loaded segment in a fully "non-destructive" way.
   * Same as `loadLevel` but will wait for next switch (until current loading is done).
   */
  set nextLoadLevel(e) {
    this.levelController.nextLoadLevel = e;
  }
  /**
   * Return "first level": like a default level, if not set,
   * falls back to index of first level referenced in manifest
   */
  get firstLevel() {
    return Math.max(this.levelController.firstLevel, this.minAutoLevel);
  }
  /**
   * Sets "first-level", see getter.
   */
  set firstLevel(e) {
    v.log(`set firstLevel:${e}`), this.levelController.firstLevel = e;
  }
  /**
   * Return the desired start level for the first fragment that will be loaded.
   * The default value of -1 indicates automatic start level selection.
   * Setting hls.nextAutoLevel without setting a startLevel will result in
   * the nextAutoLevel value being used for one fragment load.
   */
  get startLevel() {
    const e = this.levelController.startLevel;
    return e === -1 && this.abrController.forcedAutoLevel > -1 ? this.abrController.forcedAutoLevel : e;
  }
  /**
   * set  start level (level of first fragment that will be played back)
   * if not overrided by user, first level appearing in manifest will be used as start level
   * if -1 : automatic start level selection, playback will start from level matching download bandwidth
   * (determined from download of first segment)
   */
  set startLevel(e) {
    v.log(`set startLevel:${e}`), e !== -1 && (e = Math.max(e, this.minAutoLevel)), this.levelController.startLevel = e;
  }
  /**
   * Whether level capping is enabled.
   * Default value is set via `config.capLevelToPlayerSize`.
   */
  get capLevelToPlayerSize() {
    return this.config.capLevelToPlayerSize;
  }
  /**
   * Enables or disables level capping. If disabled after previously enabled, `nextLevelSwitch` will be immediately called.
   */
  set capLevelToPlayerSize(e) {
    const t = !!e;
    t !== this.config.capLevelToPlayerSize && (t ? this.capLevelController.startCapping() : (this.capLevelController.stopCapping(), this.autoLevelCapping = -1, this.streamController.nextLevelSwitch()), this.config.capLevelToPlayerSize = t);
  }
  /**
   * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
   */
  get autoLevelCapping() {
    return this._autoLevelCapping;
  }
  /**
   * Returns the current bandwidth estimate in bits per second, when available. Otherwise, `NaN` is returned.
   */
  get bandwidthEstimate() {
    const {
      bwEstimator: e
    } = this.abrController;
    return e ? e.getEstimate() : NaN;
  }
  set bandwidthEstimate(e) {
    this.abrController.resetEstimator(e);
  }
  /**
   * get time to first byte estimate
   * @type {number}
   */
  get ttfbEstimate() {
    const {
      bwEstimator: e
    } = this.abrController;
    return e ? e.getEstimateTTFB() : NaN;
  }
  /**
   * Capping/max level value that should be used by automatic level selection algorithm (`ABRController`)
   */
  set autoLevelCapping(e) {
    this._autoLevelCapping !== e && (v.log(`set autoLevelCapping:${e}`), this._autoLevelCapping = e, this.levelController.checkMaxAutoUpdated());
  }
  get maxHdcpLevel() {
    return this._maxHdcpLevel;
  }
  set maxHdcpLevel(e) {
    sa(e) && this._maxHdcpLevel !== e && (this._maxHdcpLevel = e, this.levelController.checkMaxAutoUpdated());
  }
  /**
   * True when automatic level selection enabled
   */
  get autoLevelEnabled() {
    return this.levelController.manualLevel === -1;
  }
  /**
   * Level set manually (if any)
   */
  get manualLevel() {
    return this.levelController.manualLevel;
  }
  /**
   * min level selectable in auto mode according to config.minAutoBitrate
   */
  get minAutoLevel() {
    const {
      levels: e,
      config: {
        minAutoBitrate: t
      }
    } = this;
    if (!e)
      return 0;
    const s = e.length;
    for (let i = 0; i < s; i++)
      if (e[i].maxBitrate >= t)
        return i;
    return 0;
  }
  /**
   * max level selectable in auto mode according to autoLevelCapping
   */
  get maxAutoLevel() {
    const {
      levels: e,
      autoLevelCapping: t,
      maxHdcpLevel: s
    } = this;
    let i;
    if (t === -1 && e != null && e.length ? i = e.length - 1 : i = t, s)
      for (let r = i; r--; ) {
        const n = e[r].attrs["HDCP-LEVEL"];
        if (n && n <= s)
          return r;
      }
    return i;
  }
  get firstAutoLevel() {
    return this.abrController.firstAutoLevel;
  }
  /**
   * next automatically selected quality level
   */
  get nextAutoLevel() {
    return this.abrController.nextAutoLevel;
  }
  /**
   * this setter is used to force next auto level.
   * this is useful to force a switch down in auto mode:
   * in case of load error on level N, hls.js can set nextAutoLevel to N-1 for example)
   * forced value is valid for one fragment. upon successful frag loading at forced level,
   * this value will be resetted to -1 by ABR controller.
   */
  set nextAutoLevel(e) {
    this.abrController.nextAutoLevel = e;
  }
  /**
   * get the datetime value relative to media.currentTime for the active level Program Date Time if present
   */
  get playingDate() {
    return this.streamController.currentProgramDateTime;
  }
  get mainForwardBufferInfo() {
    return this.streamController.getMainFwdBufferInfo();
  }
  /**
   * Find and select the best matching audio track, making a level switch when a Group change is necessary.
   * Updates `hls.config.audioPreference`. Returns the selected track, or null when no matching track is found.
   */
  setAudioOption(e) {
    var t;
    return (t = this.audioTrackController) == null ? void 0 : t.setAudioOption(e);
  }
  /**
   * Find and select the best matching subtitle track, making a level switch when a Group change is necessary.
   * Updates `hls.config.subtitlePreference`. Returns the selected track, or null when no matching track is found.
   */
  setSubtitleOption(e) {
    var t;
    return (t = this.subtitleTrackController) == null || t.setSubtitleOption(e), null;
  }
  /**
   * Get the complete list of audio tracks across all media groups
   */
  get allAudioTracks() {
    const e = this.audioTrackController;
    return e ? e.allAudioTracks : [];
  }
  /**
   * Get the list of selectable audio tracks
   */
  get audioTracks() {
    const e = this.audioTrackController;
    return e ? e.audioTracks : [];
  }
  /**
   * index of the selected audio track (index in audio track lists)
   */
  get audioTrack() {
    const e = this.audioTrackController;
    return e ? e.audioTrack : -1;
  }
  /**
   * selects an audio track, based on its index in audio track lists
   */
  set audioTrack(e) {
    const t = this.audioTrackController;
    t && (t.audioTrack = e);
  }
  /**
   * get the complete list of subtitle tracks across all media groups
   */
  get allSubtitleTracks() {
    const e = this.subtitleTrackController;
    return e ? e.allSubtitleTracks : [];
  }
  /**
   * get alternate subtitle tracks list from playlist
   */
  get subtitleTracks() {
    const e = this.subtitleTrackController;
    return e ? e.subtitleTracks : [];
  }
  /**
   * index of the selected subtitle track (index in subtitle track lists)
   */
  get subtitleTrack() {
    const e = this.subtitleTrackController;
    return e ? e.subtitleTrack : -1;
  }
  get media() {
    return this._media;
  }
  /**
   * select an subtitle track, based on its index in subtitle track lists
   */
  set subtitleTrack(e) {
    const t = this.subtitleTrackController;
    t && (t.subtitleTrack = e);
  }
  /**
   * Whether subtitle display is enabled or not
   */
  get subtitleDisplay() {
    const e = this.subtitleTrackController;
    return e ? e.subtitleDisplay : !1;
  }
  /**
   * Enable/disable subtitle display rendering
   */
  set subtitleDisplay(e) {
    const t = this.subtitleTrackController;
    t && (t.subtitleDisplay = e);
  }
  /**
   * get mode for Low-Latency HLS loading
   */
  get lowLatencyMode() {
    return this.config.lowLatencyMode;
  }
  /**
   * Enable/disable Low-Latency HLS part playlist and segment loading, and start live streams at playlist PART-HOLD-BACK rather than HOLD-BACK.
   */
  set lowLatencyMode(e) {
    this.config.lowLatencyMode = e;
  }
  /**
   * Position (in seconds) of live sync point (ie edge of live position minus safety delay defined by ```hls.config.liveSyncDuration```)
   * @returns null prior to loading live Playlist
   */
  get liveSyncPosition() {
    return this.latencyController.liveSyncPosition;
  }
  /**
   * Estimated position (in seconds) of live edge (ie edge of live playlist plus time sync playlist advanced)
   * @returns 0 before first playlist is loaded
   */
  get latency() {
    return this.latencyController.latency;
  }
  /**
   * maximum distance from the edge before the player seeks forward to ```hls.liveSyncPosition```
   * configured using ```liveMaxLatencyDurationCount``` (multiple of target duration) or ```liveMaxLatencyDuration```
   * @returns 0 before first playlist is loaded
   */
  get maxLatency() {
    return this.latencyController.maxLatency;
  }
  /**
   * target distance from the edge as calculated by the latency controller
   */
  get targetLatency() {
    return this.latencyController.targetLatency;
  }
  /**
   * the rate at which the edge of the current live playlist is advancing or 1 if there is none
   */
  get drift() {
    return this.latencyController.drift;
  }
  /**
   * set to true when startLoad is called before MANIFEST_PARSED event
   */
  get forceStartLoad() {
    return this.streamController.forceStartLoad;
  }
}
We.defaultConfig = void 0;
export {
  ba as AbrController,
  ee as AttrList,
  Io as AudioStreamController,
  bo as AudioTrackController,
  vs as BasePlaylistController,
  $i as BaseSegment,
  Rs as BaseStreamController,
  _o as BufferController,
  Bl as CMCDController,
  Ps as CapLevelController,
  As as ChunkMetadata,
  Gl as ContentSteeringController,
  Bi as DateRange,
  qe as EMEController,
  Te as ErrorActionFlags,
  ma as ErrorController,
  L as ErrorDetails,
  U as ErrorTypes,
  m as Events,
  il as FPSController,
  Ot as Fragment,
  We as Hls,
  tt as HlsSkip,
  ti as HlsUrlParameters,
  de as KeySystemFormats,
  Z as KeySystems,
  ze as Level,
  ln as LevelDetails,
  it as LevelKey,
  _t as LoadStats,
  ye as MetadataSchema,
  ae as NetworkErrorAction,
  an as Part,
  N as PlaylistLevelType,
  Do as SubtitleStreamController,
  wo as SubtitleTrackController,
  tl as TimelineController,
  We as default,
  Je as getMediaSource,
  Yr as isMSESupported,
  rc as isSupported
};
