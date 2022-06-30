(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));

  // node_modules/regenerator-runtime/runtime.js
  var require_runtime = __commonJS({
    "node_modules/regenerator-runtime/runtime.js"(exports, module) {
      var runtime = function(exports2) {
        "use strict";
        var Op = Object.prototype;
        var hasOwn = Op.hasOwnProperty;
        var undefined2;
        var $Symbol = typeof Symbol === "function" ? Symbol : {};
        var iteratorSymbol = $Symbol.iterator || "@@iterator";
        var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
        var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
        function define(obj, key, value) {
          Object.defineProperty(obj, key, {
            value,
            enumerable: true,
            configurable: true,
            writable: true
          });
          return obj[key];
        }
        try {
          define({}, "");
        } catch (err) {
          define = function(obj, key, value) {
            return obj[key] = value;
          };
        }
        function wrap(innerFn, outerFn, self, tryLocsList) {
          var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
          var generator = Object.create(protoGenerator.prototype);
          var context = new Context(tryLocsList || []);
          generator._invoke = makeInvokeMethod(innerFn, self, context);
          return generator;
        }
        exports2.wrap = wrap;
        function tryCatch(fn, obj, arg) {
          try {
            return { type: "normal", arg: fn.call(obj, arg) };
          } catch (err) {
            return { type: "throw", arg: err };
          }
        }
        var GenStateSuspendedStart = "suspendedStart";
        var GenStateSuspendedYield = "suspendedYield";
        var GenStateExecuting = "executing";
        var GenStateCompleted = "completed";
        var ContinueSentinel = {};
        function Generator() {
        }
        function GeneratorFunction() {
        }
        function GeneratorFunctionPrototype() {
        }
        var IteratorPrototype = {};
        define(IteratorPrototype, iteratorSymbol, function() {
          return this;
        });
        var getProto = Object.getPrototypeOf;
        var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
        if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
          IteratorPrototype = NativeIteratorPrototype;
        }
        var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
        GeneratorFunction.prototype = GeneratorFunctionPrototype;
        define(Gp, "constructor", GeneratorFunctionPrototype);
        define(GeneratorFunctionPrototype, "constructor", GeneratorFunction);
        GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction");
        function defineIteratorMethods(prototype) {
          ["next", "throw", "return"].forEach(function(method) {
            define(prototype, method, function(arg) {
              return this._invoke(method, arg);
            });
          });
        }
        exports2.isGeneratorFunction = function(genFun) {
          var ctor = typeof genFun === "function" && genFun.constructor;
          return ctor ? ctor === GeneratorFunction || (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
        };
        exports2.mark = function(genFun) {
          if (Object.setPrototypeOf) {
            Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
          } else {
            genFun.__proto__ = GeneratorFunctionPrototype;
            define(genFun, toStringTagSymbol, "GeneratorFunction");
          }
          genFun.prototype = Object.create(Gp);
          return genFun;
        };
        exports2.awrap = function(arg) {
          return { __await: arg };
        };
        function AsyncIterator(generator, PromiseImpl) {
          function invoke(method, arg, resolve, reject) {
            var record = tryCatch(generator[method], generator, arg);
            if (record.type === "throw") {
              reject(record.arg);
            } else {
              var result = record.arg;
              var value = result.value;
              if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
                return PromiseImpl.resolve(value.__await).then(function(value2) {
                  invoke("next", value2, resolve, reject);
                }, function(err) {
                  invoke("throw", err, resolve, reject);
                });
              }
              return PromiseImpl.resolve(value).then(function(unwrapped) {
                result.value = unwrapped;
                resolve(result);
              }, function(error) {
                return invoke("throw", error, resolve, reject);
              });
            }
          }
          var previousPromise;
          function enqueue(method, arg) {
            function callInvokeWithMethodAndArg() {
              return new PromiseImpl(function(resolve, reject) {
                invoke(method, arg, resolve, reject);
              });
            }
            return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
          }
          this._invoke = enqueue;
        }
        defineIteratorMethods(AsyncIterator.prototype);
        define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
          return this;
        });
        exports2.AsyncIterator = AsyncIterator;
        exports2.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
          if (PromiseImpl === void 0)
            PromiseImpl = Promise;
          var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
          return exports2.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
            return result.done ? result.value : iter.next();
          });
        };
        function makeInvokeMethod(innerFn, self, context) {
          var state = GenStateSuspendedStart;
          return function invoke(method, arg) {
            if (state === GenStateExecuting) {
              throw new Error("Generator is already running");
            }
            if (state === GenStateCompleted) {
              if (method === "throw") {
                throw arg;
              }
              return doneResult();
            }
            context.method = method;
            context.arg = arg;
            while (true) {
              var delegate = context.delegate;
              if (delegate) {
                var delegateResult = maybeInvokeDelegate(delegate, context);
                if (delegateResult) {
                  if (delegateResult === ContinueSentinel)
                    continue;
                  return delegateResult;
                }
              }
              if (context.method === "next") {
                context.sent = context._sent = context.arg;
              } else if (context.method === "throw") {
                if (state === GenStateSuspendedStart) {
                  state = GenStateCompleted;
                  throw context.arg;
                }
                context.dispatchException(context.arg);
              } else if (context.method === "return") {
                context.abrupt("return", context.arg);
              }
              state = GenStateExecuting;
              var record = tryCatch(innerFn, self, context);
              if (record.type === "normal") {
                state = context.done ? GenStateCompleted : GenStateSuspendedYield;
                if (record.arg === ContinueSentinel) {
                  continue;
                }
                return {
                  value: record.arg,
                  done: context.done
                };
              } else if (record.type === "throw") {
                state = GenStateCompleted;
                context.method = "throw";
                context.arg = record.arg;
              }
            }
          };
        }
        function maybeInvokeDelegate(delegate, context) {
          var method = delegate.iterator[context.method];
          if (method === undefined2) {
            context.delegate = null;
            if (context.method === "throw") {
              if (delegate.iterator["return"]) {
                context.method = "return";
                context.arg = undefined2;
                maybeInvokeDelegate(delegate, context);
                if (context.method === "throw") {
                  return ContinueSentinel;
                }
              }
              context.method = "throw";
              context.arg = new TypeError("The iterator does not provide a 'throw' method");
            }
            return ContinueSentinel;
          }
          var record = tryCatch(method, delegate.iterator, context.arg);
          if (record.type === "throw") {
            context.method = "throw";
            context.arg = record.arg;
            context.delegate = null;
            return ContinueSentinel;
          }
          var info = record.arg;
          if (!info) {
            context.method = "throw";
            context.arg = new TypeError("iterator result is not an object");
            context.delegate = null;
            return ContinueSentinel;
          }
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
            if (context.method !== "return") {
              context.method = "next";
              context.arg = undefined2;
            }
          } else {
            return info;
          }
          context.delegate = null;
          return ContinueSentinel;
        }
        defineIteratorMethods(Gp);
        define(Gp, toStringTagSymbol, "Generator");
        define(Gp, iteratorSymbol, function() {
          return this;
        });
        define(Gp, "toString", function() {
          return "[object Generator]";
        });
        function pushTryEntry(locs) {
          var entry = { tryLoc: locs[0] };
          if (1 in locs) {
            entry.catchLoc = locs[1];
          }
          if (2 in locs) {
            entry.finallyLoc = locs[2];
            entry.afterLoc = locs[3];
          }
          this.tryEntries.push(entry);
        }
        function resetTryEntry(entry) {
          var record = entry.completion || {};
          record.type = "normal";
          delete record.arg;
          entry.completion = record;
        }
        function Context(tryLocsList) {
          this.tryEntries = [{ tryLoc: "root" }];
          tryLocsList.forEach(pushTryEntry, this);
          this.reset(true);
        }
        exports2.keys = function(object) {
          var keys = [];
          for (var key in object) {
            keys.push(key);
          }
          keys.reverse();
          return function next() {
            while (keys.length) {
              var key2 = keys.pop();
              if (key2 in object) {
                next.value = key2;
                next.done = false;
                return next;
              }
            }
            next.done = true;
            return next;
          };
        };
        function values(iterable) {
          if (iterable) {
            var iteratorMethod = iterable[iteratorSymbol];
            if (iteratorMethod) {
              return iteratorMethod.call(iterable);
            }
            if (typeof iterable.next === "function") {
              return iterable;
            }
            if (!isNaN(iterable.length)) {
              var i = -1, next = function next2() {
                while (++i < iterable.length) {
                  if (hasOwn.call(iterable, i)) {
                    next2.value = iterable[i];
                    next2.done = false;
                    return next2;
                  }
                }
                next2.value = undefined2;
                next2.done = true;
                return next2;
              };
              return next.next = next;
            }
          }
          return { next: doneResult };
        }
        exports2.values = values;
        function doneResult() {
          return { value: undefined2, done: true };
        }
        Context.prototype = {
          constructor: Context,
          reset: function(skipTempReset) {
            this.prev = 0;
            this.next = 0;
            this.sent = this._sent = undefined2;
            this.done = false;
            this.delegate = null;
            this.method = "next";
            this.arg = undefined2;
            this.tryEntries.forEach(resetTryEntry);
            if (!skipTempReset) {
              for (var name in this) {
                if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                  this[name] = undefined2;
                }
              }
            }
          },
          stop: function() {
            this.done = true;
            var rootEntry = this.tryEntries[0];
            var rootRecord = rootEntry.completion;
            if (rootRecord.type === "throw") {
              throw rootRecord.arg;
            }
            return this.rval;
          },
          dispatchException: function(exception) {
            if (this.done) {
              throw exception;
            }
            var context = this;
            function handle(loc, caught) {
              record.type = "throw";
              record.arg = exception;
              context.next = loc;
              if (caught) {
                context.method = "next";
                context.arg = undefined2;
              }
              return !!caught;
            }
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              var record = entry.completion;
              if (entry.tryLoc === "root") {
                return handle("end");
              }
              if (entry.tryLoc <= this.prev) {
                var hasCatch = hasOwn.call(entry, "catchLoc");
                var hasFinally = hasOwn.call(entry, "finallyLoc");
                if (hasCatch && hasFinally) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  } else if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else if (hasCatch) {
                  if (this.prev < entry.catchLoc) {
                    return handle(entry.catchLoc, true);
                  }
                } else if (hasFinally) {
                  if (this.prev < entry.finallyLoc) {
                    return handle(entry.finallyLoc);
                  }
                } else {
                  throw new Error("try statement without catch or finally");
                }
              }
            }
          },
          abrupt: function(type, arg) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
                var finallyEntry = entry;
                break;
              }
            }
            if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
              finallyEntry = null;
            }
            var record = finallyEntry ? finallyEntry.completion : {};
            record.type = type;
            record.arg = arg;
            if (finallyEntry) {
              this.method = "next";
              this.next = finallyEntry.finallyLoc;
              return ContinueSentinel;
            }
            return this.complete(record);
          },
          complete: function(record, afterLoc) {
            if (record.type === "throw") {
              throw record.arg;
            }
            if (record.type === "break" || record.type === "continue") {
              this.next = record.arg;
            } else if (record.type === "return") {
              this.rval = this.arg = record.arg;
              this.method = "return";
              this.next = "end";
            } else if (record.type === "normal" && afterLoc) {
              this.next = afterLoc;
            }
            return ContinueSentinel;
          },
          finish: function(finallyLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.finallyLoc === finallyLoc) {
                this.complete(entry.completion, entry.afterLoc);
                resetTryEntry(entry);
                return ContinueSentinel;
              }
            }
          },
          "catch": function(tryLoc) {
            for (var i = this.tryEntries.length - 1; i >= 0; --i) {
              var entry = this.tryEntries[i];
              if (entry.tryLoc === tryLoc) {
                var record = entry.completion;
                if (record.type === "throw") {
                  var thrown = record.arg;
                  resetTryEntry(entry);
                }
                return thrown;
              }
            }
            throw new Error("illegal catch attempt");
          },
          delegateYield: function(iterable, resultName, nextLoc) {
            this.delegate = {
              iterator: values(iterable),
              resultName,
              nextLoc
            };
            if (this.method === "next") {
              this.arg = undefined2;
            }
            return ContinueSentinel;
          }
        };
        return exports2;
      }(typeof module === "object" ? module.exports : {});
      try {
        regeneratorRuntime = runtime;
      } catch (accidentalStrictMode) {
        if (typeof globalThis === "object") {
          globalThis.regeneratorRuntime = runtime;
        } else {
          Function("r", "regeneratorRuntime = r")(runtime);
        }
      }
    }
  });

  // src/js/Paella.js
  var import_runtime = __toESM(require_runtime());

  // src/js/core/PlayerResource.js
  var PlayerResource = class {
    constructor(player) {
      this._player = player;
    }
    get player() {
      return this._player;
    }
  };

  // src/js/core/dom.js
  function createElement({ tag = "div", attributes = {}, children = "", innerText = "", parent = null }) {
    const result = document.createElement(tag);
    result.innerText = innerText;
    for (let key in attributes) {
      result.setAttribute(key, attributes[key]);
    }
    result.innerHTML = children;
    if (parent) {
      parent.appendChild(result);
    }
    return result;
  }
  function createElementWithHtmlText(htmlText, parent = null) {
    const tmpElem = document.createElement("div");
    tmpElem.innerHTML = htmlText;
    const result = tmpElem.children[0];
    if (parent) {
      parent.appendChild(result);
    }
    return result;
  }
  var DomClass = class extends PlayerResource {
    constructor(player, { tag = "div", attributes = [], children = "", parent = null }) {
      super(player);
      this._element = createElement({ tag, attributes, children, parent });
      Object.defineProperty(this, tag, {
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
    show() {
      this.element.style.display = "block";
    }
    get isVisible() {
      const style = window.getComputedStyle(this.element);
      return style.display !== "none" && style.display !== "";
    }
    setAttribute(name, value) {
      this._element.setAttribute(name, value);
    }
    removeFromParent() {
      this._element.parentElement?.removeChild(this._element);
    }
    setParent(parent) {
      this.removeFromParent();
      parent.appendChild(this._element);
    }
  };

  // plugin_directories.js
  console.log("Hello");
  console.log(DomClass);
  console.log(Plugin);
  var plugin_directories_default = [];

  // src/js/core/Plugin.js
  var Plugin = class extends PlayerResource {
    constructor(player, config, name) {
      super(player);
      this._name = name;
      this._config = config.plugins[this.name];
    }
    get config() {
      return this._config;
    }
    get type() {
      return "none";
    }
    get order() {
      return this._config?.order || 0;
    }
    get description() {
      return this._config?.description || "";
    }
    get name() {
      return this._name;
    }
    async isEnabled() {
      return this.config?.enabled;
    }
    async load() {
    }
    async unload() {
    }
  };
  var Plugin_default = Plugin;
  function importPlugins(player, context) {
    const config = player.config;
    context.keys().forEach((key) => {
      const module = context(key);
      const PluginClass = module.default;
      const pluginInstance = new PluginClass(player, config, key.substring(2, key.length - 3));
      if (pluginInstance.type) {
        const type = pluginInstance.type;
        player.__pluginData__.pluginClasses[key] = PluginClass;
        player.__pluginData__.pluginInstances[type] = player.__pluginData__.pluginInstances[type] || [];
        player.__pluginData__.pluginInstances[type].push(pluginInstance);
      } else if (pluginInstance.moduleName) {
        const name = pluginInstance.moduleName;
        const version = pluginInstance.moduleVersion;
        player.log.debug(`Plugin module imported: '${name}': v${version}`);
        player.__pluginModules = player.__pluginModules || [];
        player.__pluginModules.push(pluginInstance);
      }
    });
  }
  function registerPlugins(player) {
    const config = player.config;
    player.__pluginData__ = player.__pluginData__ || {
      pluginClasses: [],
      pluginInstances: {}
    };
    if (player.__pluginData__.pluginClasses.length !== 0)
      return;
    plugin_directories_default.forEach((ctx) => importPlugins(player, ctx));
    player.initParams.customPluginContext.forEach((ctx) => importPlugins(player, ctx));
    player.log.debug("Plugins have been registered:");
  }
  function unregisterPlugins(player) {
    delete player.__pluginData__;
  }
  function getPluginsOfType(player, type) {
    return player.__pluginData__?.pluginInstances[type];
  }
  async function loadPluginsOfType(player, type, onLoad = null, onPreload = null) {
    player.__pluginData__.pluginInstances[type].sort((a, b) => a.order - b.order);
    player.__pluginData__.pluginInstances[type].forEach((p) => player.log.debug(`type: ${type}, name: ${p.name}`));
    if (typeof onPreload !== "function") {
      onPreload = async function(plugin) {
        return await plugin.isEnabled();
      };
    }
    for (const i in player.__pluginData__.pluginInstances[type]) {
      const plugin = player.__pluginData__.pluginInstances[type][i];
      const enabled = await onPreload(plugin);
      if (enabled) {
        if (plugin.__uiPlugin) {
          const dictionaries = await plugin.getDictionaries();
          if (typeof dictionaries === "object") {
            for (const lang in dictionaries) {
              const dict = dictionaries[lang];
              player.addDictionary(lang, dict);
            }
          }
        }
        if (typeof onLoad === "function") {
          await onLoad(plugin);
        }
        await plugin.load();
      }
    }
  }
  async function unloadPluginsOfType(player, type) {
    player.__pluginData__.pluginInstances[type]?.forEach(async (plugin) => {
      await plugin.unload();
    });
  }

  // src/js/core/Events.js
  var Events_default = {
    PLAY: "paella:play",
    PAUSE: "paella:pause",
    STOP: "paella:stop",
    ENDED: "paella:ended",
    SEEK: "paella:seek",
    FULLSCREEN_CHANGED: "paella:fullscreenchanged",
    VOLUME_CHANGED: "paella:volumeChanged",
    TIMEUPDATE: "paella:timeupdate",
    TRIMMING_CHANGED: "paella:trimmingChanged",
    CAPTIONS_CHANGED: "paella:captionsChanged",
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
    SHOW_UI: "paella:showUI"
  };
  function bindEvent(player, event, callback, unregisterOnUnload = true) {
    player.__eventListeners__ = player.__eventListeners__ || {};
    player.__eventListeners__[event] = player.__eventListeners__[event] || [];
    player.__eventListeners__[event].push({
      callback,
      unregisterOnUnload
    });
    return callback;
  }
  function triggerEvent(player, event, params = {}) {
    player.__eventListeners__ && player.__eventListeners__[event] && player.__eventListeners__[event].forEach((cbData) => cbData.callback(params));
  }
  function triggerIfReady(player, event, params = {}) {
    if (player.ready) {
      triggerEvent(player, event, params);
    }
  }
  function unregisterEvents(player) {
    if (!player.__eventListeners__) {
      return;
    }
    for (const event in player.__eventListeners__) {
      player.__eventListeners__[event] = player.__eventListeners__[event].filter((cbData) => cbData.unregisterOnUnload == false);
      console.log(player.__eventListeners__[event]);
    }
  }

  // src/js/core/PopUp.js
  var g_popUps = [];
  function placePopUp(player, anchorElement, contentElement) {
    if (anchorElement) {
      const { top, left, right, bottom, width, height } = anchorElement.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;
      const scroll = document.body.scrollTop;
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      const viewportCenterX = window.innerWidth / 2;
      const viewportCenterY = window.innerHeight / 2;
      const containerBounds = player.containerElement.getBoundingClientRect();
      contentElement.style.overflow = "auto";
      contentElement.style.display = "table";
      contentElement.style.left = "";
      contentElement.style.right = "";
      contentElement.style.bottom = "";
      contentElement.style.top = "";
      if (viewportCenterX > centerX && viewportCenterY <= centerY) {
        const b = viewportHeight - (bottom - height);
        contentElement.style.left = `${left}px`;
        contentElement.style.bottom = `${b}px`;
        contentElement.style.maxHeight = `calc(100vh - ${b}px - 10px)`;
      } else if (viewportCenterX > centerX && viewportCenterY > centerY) {
        contentElement.style.left = `${left}px`;
        contentElement.style.top = `${top + height + scroll}px`;
        contentElement.style.maxHeight = `calc(100vh - ${top + height}px - 10px)`;
      } else if (viewportCenterX <= centerX && viewportCenterY > centerY) {
        contentElement.style.right = `${viewportWidth - right}px`;
        contentElement.style.top = `${top + height + scroll}px`;
        contentElement.style.maxHeight = `calc(100vh - ${top + height}px - 10px)`;
      } else if (viewportCenterX <= centerX && viewportCenterY <= centerY) {
        const b = viewportHeight - (bottom - height);
        contentElement.style.right = `${viewportWidth - right}px`;
        contentElement.style.bottom = `${b}px`;
        contentElement.style.maxHeight = `calc(100vh - ${b}px - 10px)`;
      }
    }
  }
  var PopUp = class extends DomClass {
    static GetPopUps() {
      return g_popUps;
    }
    static IsSomePopUpVisible() {
      return g_popUps.some((p) => p.isVisible);
    }
    static GetPopUp(id) {
      return g_popUps.find((p) => p.id === id);
    }
    static HideAllPopUps(onlyModal = true) {
      g_popUps.forEach((p) => {
        if (onlyModal && p.isModal || !onlyModal) {
          p.hide();
        }
      });
    }
    static Unload() {
      g_popUps.forEach((p) => {
        p.removeFromParent();
      });
      g_popUps.slice(0);
    }
    constructor(player, parent, anchorElement = null, contextObject = null, modal = true) {
      const attributes = {
        "class": modal ? "popup-container" : "popup-container no-modal"
      };
      const children = `
		<div class="popup-content"></div>
		`;
      super(player, { attributes, children, parent });
      this._modal = modal;
      this._contextObject = contextObject;
      this._id = Symbol(this);
      g_popUps.push(this);
      this.element.addEventListener("click", () => {
        this.hide();
      });
      this._contentElement = this.element.getElementsByClassName("popup-content")[0];
      this._anchorElement = anchorElement;
      if (anchorElement) {
        placePopUp(player, anchorElement, this.contentElement);
      }
      this.hide();
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
    get contentElement() {
      return this._contentElement;
    }
    get content() {
      return this._popupContent;
    }
    setContent(domElement) {
      this.contentElement.innerHTML = "";
      if (typeof domElement === "string") {
        this._popupContent = createElementWithHtmlText(domElement, this.contentElement);
      } else {
        this._popupContent = domElement;
        this.contentElement.appendChild(domElement);
      }
    }
    show(parent = null, parentPopUp = null) {
      if (this._anchorElement) {
        placePopUp(this.player, this._anchorElement, this.contentElement);
      }
      if (parent) {
        this.setParent(parent);
      }
      this._parentPopUp = parentPopUp;
      if (parentPopUp) {
        parentPopUp.addChild(this);
      }
      super.show();
      triggerEvent(this.player, Events_default.SHOW_POPUP, {
        popUp: this,
        plugin: this.contextObject
      });
    }
    hide() {
      if (this.isVisible) {
        if (this._children) {
          this._children.forEach((child) => child.hide());
        }
        if (this._parentPopUp) {
          this._parentPopUp.removeChild(this);
        }
        triggerEvent(this.player, Events_default.HIDE_POPUP, {
          popUp: this,
          plugin: this.contextObject
        });
      }
      super.hide();
    }
    addChild(childPopUp) {
      this._children = this._children || [];
      if (!this._children.find((child) => child === childPopUp)) {
        this._children.push(childPopUp);
      }
    }
    removeChild(childPopUp) {
      if (this._children) {
        this._children = this._children.filter((child) => child !== childPopUp);
      }
    }
    destroy() {
      const index = g_popUps.indexOf(this);
      if (index !== -1) {
        g_popUps.splice(index, 1);
        this.removeFromParent();
      }
    }
  };

  // src/js/core/utils.js
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.has(name) ? urlParams.get(name) : null;
  }
  function getHashParameter(name) {
    const search = window.location.hash.replace("#", "?");
    const urlParams = new URLSearchParams(search);
    return urlParams.has(name) ? urlParams.get(name) : null;
  }
  function joinPath(parts, sep) {
    const separator = sep || "/";
    parts = parts.map((part, index) => {
      if (index) {
        part = part.replace(new RegExp("^" + separator), "");
      }
      if (index !== parts.length - 1) {
        part = part.replace(new RegExp(separator + "$"), "");
      }
      return part;
    });
    return parts.join(separator);
  }
  function isAbsoluteUrl(src) {
    return new RegExp("^([a-z]+://|//)", "i").test(src) || /^\//.test(src);
  }
  function resolveResourcePath(player, src) {
    if (isAbsoluteUrl(src)) {
      return src;
    } else {
      return joinPath([player.manifestUrl, src]);
    }
  }
  function setupAutoHideUiTimer(player, hideUiTimePropertyName = "hideUiTime") {
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
        } else {
          await player.hideUserInterface();
        }
      }, player[hideUiTimePropertyName]);
    };
    player.containerElement.addEventListener("mousemove", async (evt) => {
      setupTimer();
    });
    bindEvent(player, Events_default.PLAY, async () => {
      setupTimer();
    });
    bindEvent(player, Events_default.PAUSE, async () => {
      await player.showUserInterface();
    });
    bindEvent(player, Events_default.ENDED, async () => {
      await player.showUserInterface();
    });
  }
  function clearAutoHideTimer(player) {
    if (player.__hideTimer__) {
      clearTimeout(player.__hideTimer__);
      delete player.__hideTimer__;
    }
  }
  function secondsToTime(timestamp) {
    const hours = Math.floor(timestamp / 60 / 60);
    const minutes = Math.floor(timestamp / 60) - hours * 60;
    const seconds = Math.floor(timestamp % 60);
    return (hours > 0 ? hours.toString().padStart(2, "0") + ":" : "") + minutes.toString().padStart(2, "0") + ":" + seconds.toString().padStart(2, "0");
  }

  // src/js/core/initFunctions.js
  async function defaultLoadConfigFunction(configUrl, player) {
    player.log.debug("Using default configuration loading function.");
    const response = await fetch(configUrl);
    return response.json();
  }
  async function defaultGetVideoIdFunction(config, player) {
    player.log.debug("Using default getVideoId function");
    return getHashParameter("id") || getUrlParameter("id");
  }
  async function defaultGetManifestUrlFunction(repoUrl, videoId, config, player) {
    player.log.debug("Using default getManifestUrl function");
    return joinPath([repoUrl, videoId]);
  }
  async function defaultGetManifestFileUrlFunction(manifestUrl, manifestFileName, config, player) {
    player.log.debug("Using default getManifestFileUrl function");
    return joinPath([manifestUrl, manifestFileName]);
  }
  async function defaultLoadVideoManifestFunction(videoManifestUrl, config, player) {
    player.log.debug("Using default loadVideoManifest function");
    const response = await fetch(videoManifestUrl);
    if (response.ok) {
      return await response.json();
    } else {
      throw new Error(player.translate("Error loading video manifest: $1 $2", [response.status, response.statusText]));
    }
  }

  // src/icons/progress_indicator.svg
  var progress_indicator_default = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">\n    <g transform="matrix(1,0,0,1,3,-3.88857)">\n        <path d="M128,35.819C65.633,35.819 14.999,86.453 14.999,148.82C14.999,163.127 17.663,176.817 22.549,189.403L22.475,189.447C11.612,170.791 5.889,149.588 5.889,128C5.889,60.56 60.56,5.889 128,5.889L128,35.819Z" style="fill:url(#_Linear1);"/>\n    </g>\n    <g transform="matrix(-1,1.22465e-16,-1.22465e-16,-1,258,251.914)">\n        <path d="M128,35.819C65.633,35.819 14.999,86.453 14.999,148.82C14.999,163.127 17.663,176.817 22.549,189.403L22.475,189.447C11.612,170.791 5.889,149.588 5.889,128C5.889,60.56 60.56,5.889 128,5.889L128,35.819Z" style="fill:url(#_Linear2);"/>\n    </g>\n    <defs>\n        <linearGradient id="_Linear1" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-89.3028,140.734,-140.734,-89.3028,144.417,48.7125)"><stop offset="0" style="stop-color:rgb(13,13,13);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(175,175,175);stop-opacity:0.5"/></linearGradient>\n        <linearGradient id="_Linear2" x1="0" y1="0" x2="1" y2="0" gradientUnits="userSpaceOnUse" gradientTransform="matrix(-89.3028,140.734,-140.734,-89.3028,144.417,48.7125)"><stop offset="0" style="stop-color:rgb(13,13,13);stop-opacity:1"/><stop offset="1" style="stop-color:rgb(175,175,175);stop-opacity:0.5"/></linearGradient>\n    </defs>\n</svg>\n';

  // src/js/core/Loader.js
  var Loader = class extends DomClass {
    constructor(player) {
      super(player, { parent: player.containerElement });
      this.element.className = "loader-container";
      const icon = createElementWithHtmlText(`
        <i>${progress_indicator_default}</i>`, this.element);
    }
  };

  // src/icons/error.svg
  var error_default = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="100%" height="100%" viewBox="0 0 256 256" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">\n    <g id="Cancel" transform="matrix(5.54545,6.8353e-32,6.8353e-32,5.54545,-2567.37,-10735.5)">\n        <path d="M486.05,1937C498.192,1937 508.05,1946.86 508.05,1959C508.05,1971.14 498.192,1981 486.05,1981C473.908,1981 464.05,1971.14 464.05,1959C464.05,1946.86 473.908,1937 486.05,1937ZM478.979,1950.52L477.565,1951.93L484.636,1959L477.565,1966.07L478.979,1967.49L486.05,1960.41L493.121,1967.49L494.535,1966.07L487.464,1959L494.535,1951.93L493.121,1950.52L486.05,1957.59L478.979,1950.52Z" style="fill:rgb(210,0,0);"/>\n    </g>\n</svg>\n';

  // src/js/core/ErrorContainer.js
  var ErrorContainer = class extends DomClass {
    constructor(player, message = "") {
      super(player, { parent: player.containerElement });
      this.element.className = "error-container";
      createElementWithHtmlText(`
            <div>
                <i>${error_default}</i>
                <p>${message}</p>
            </div>`, this.element);
    }
  };

  // src/js/core/VideoLayout.js
  function getValidLayouts(player, streamData) {
    const result = getPluginsOfType(player, "layout").filter((layout) => layout.config && layout.canApply(streamData));
    return result;
  }
  function getValidContentIds(player, streamData) {
    const validLayouts = getValidLayouts(player, streamData);
    const result = [];
    validLayouts.forEach((lo) => {
      result.push(...lo.getValidContentIds(streamData));
    });
    return result;
  }
  function getLayoutWithContentId(player, streamData, contentId) {
    const layouts = getValidLayouts(player, streamData);
    let result = null;
    layouts.some((layout) => {
      if (layout.getValidContentIds(streamData).indexOf(contentId) !== -1) {
        result = layout;
        return true;
      }
    });
    return result;
  }
  function getValidContentSettings(player, streamData) {
    const validLayouts = getValidLayouts(player, streamData);
    const validIds = getValidContentIds(player, streamData);
    let result = [];
    validLayouts.forEach((lo) => {
      result = [...result, ...lo.config.validContent];
    });
    return result.filter((cfg) => {
      return validIds.indexOf(cfg.id) !== -1;
    });
  }
  function getLayoutStructure(player, streamData, contentId) {
    const selectedLayout = getLayoutWithContentId(player, streamData, contentId);
    if (selectedLayout) {
      const structure = selectedLayout.getLayoutStructure(streamData, contentId);
      structure.plugin = selectedLayout;
      return structure;
    }
    return null;
  }

  // src/js/core/VideoPlugin.js
  var g_enabledVideoPlugins = [];
  async function loadVideoPlugins(player) {
    await loadPluginsOfType(player, "video", (plugin) => {
      g_enabledVideoPlugins.push(plugin);
    });
  }
  async function unloadVideoPlugins(player) {
    g_enabledVideoPlugins.slice(0);
  }
  function getVideoPlugins(player) {
    if (g_enabledVideoPlugins.length === 0) {
      throw Error("No video plugins loaded. Note that `loadVideoPlugins()` must to be called before using `getVideoPlugins()`.");
    }
    return g_enabledVideoPlugins;
  }
  function getVideoPlugin(player, streamData) {
    const videoPlugins = getVideoPlugins(player);
    let plugin = null;
    videoPlugins.some((p) => {
      if (p.isCompatible(streamData)) {
        plugin = p;
        return true;
      }
    });
    return plugin;
  }

  // src/js/core/CanvasPlugin.js
  var g_enabledCanvasPlugins = [];
  async function loadCanvasPlugins(player) {
    await loadPluginsOfType(player, "canvas", (plugin) => {
      g_enabledCanvasPlugins.push(plugin);
    });
  }
  async function unloadCanvasPlugins(player) {
    g_enabledCanvasPlugins.slice(0);
  }
  function getCanvasPlugin(player, stream) {
    if (g_enabledCanvasPlugins.length === 0) {
      throw Error("No canvas plugins loaded. Note that `loadCanvasPlugins()` must to be called before use `getCanvasPlugins()`");
    }
    let plugin = null;
    g_enabledCanvasPlugins.some((p) => {
      if (p.isCompatible(stream)) {
        plugin = p;
        return true;
      }
    });
    return plugin;
  }
  var CanvasButtonPosition = {
    LEFT: "left",
    CENTER: "center",
    RIGHT: "right"
  };
  var addButton = function({
    icon,
    tabIndex,
    ariaLabel,
    title,
    className,
    position = CanvasButtonPosition.CENTER,
    click
  }) {
    if (!icon) {
      throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'icon' attribute.");
    }
    if (!click) {
      throw new Error("Error in video layout definition. getVideoCanvasButtons(): missing 'click' function.");
    }
    let attributes = `class="align-${position}${className ? " " + className : ""}"`;
    if (ariaLabel) {
      attributes += ` aria-label="${ariaLabel}"`;
    }
    if (title) {
      attributes += ` title="${title}"`;
    }
    if (tabIndex !== void 0) {
      attributes += ` tabindex="${tabIndex}"`;
    }
    const btn = createElementWithHtmlText(`
        <button ${attributes}><i class="button-icon" style="pointer-events: none">${icon}</i></button>
    `);
    this.buttonsArea.appendChild(btn);
    btn.addEventListener("click", (evt) => {
      click(evt);
      evt.stopPropagation();
      return false;
    });
    return btn;
  };
  var addVideoCanvasButton = (layoutStructure, canvas, video) => {
    const plugin = layoutStructure.plugin;
    const buttons = plugin.getVideoCanvasButtons(layoutStructure, video.content, video, canvas);
    buttons.forEach((btnData) => {
      addButton.apply(canvas, [btnData]);
    });
  };

  // src/js/core/StreamProvider.js
  var SteramProvider = class extends PlayerResource {
    constructor(player, videoContainer) {
      super(player, videoContainer);
      this._videoContainer = videoContainer;
      this._streamData = null;
      this._streams = null;
      this._players = [];
      this._mainAudioPlayer = null;
      this._streamSyncTimer = null;
      this._trimming = {
        enabled: false,
        start: 100,
        end: 200
      };
    }
    async load(streamData) {
      this._streamData = streamData;
      this._streams = {};
      let mainAudioContent = this.player.config.defaultAudioStream || "presenter";
      streamData.some((s) => {
        if (s.role === "mainAudio") {
          mainAudioContent = s.content;
          return true;
        }
      });
      this.player.log.debug("Finding compatible video plugins");
      await loadCanvasPlugins(this.player);
      this._streamData.forEach((stream) => {
        const canvasPlugin = getCanvasPlugin(this.player, stream);
        if (!canvasPlugin) {
          throw Error(`Canvas plugin not found: ${stream.canvas}`);
        }
        const isMainAudio = stream.content === mainAudioContent;
        const videoPlugin = getVideoPlugin(this.player, stream);
        if (!videoPlugin) {
          throw Error(`Incompatible stream type: ${stream.content}`);
        }
        this._streams[stream.content] = {
          stream,
          isMainAudio,
          videoPlugin,
          canvasPlugin
        };
      });
      let videoEndedEventTimer = null;
      for (const content in this._streams) {
        const s = this._streams[content];
        s.canvas = await s.canvasPlugin.getCanvasInstance(this._videoContainer);
        s.player = await s.videoPlugin.getVideoInstance(s.canvas.element, s.isMainAudio);
        if (mainAudioContent === content) {
          this._mainAudioPlayer = s.player;
          s.player.setVolume(1);
        } else {
          s.player.setVolume(0);
        }
        await s.player.load(s.stream, this);
        await s.canvas.loadCanvas(s.player);
        s.player.onVideoEnded(() => {
          if (videoEndedEventTimer === null) {
            triggerIfReady(this.player, Events_default.ENDED);
            videoEndedEventTimer = setTimeout(() => {
              videoEndedEventTimer = null;
            }, 2e3);
          }
        });
        this._players.push(s.player);
      }
    }
    async unload() {
      this.stopStreamSync();
      await unloadCanvasPlugins(this.player);
    }
    get players() {
      return this._players;
    }
    get streamData() {
      return this._streamData;
    }
    get streams() {
      return this._streams;
    }
    get mainAudioPlayer() {
      return this._mainAudioPlayer;
    }
    get isTrimEnabled() {
      return this._trimming?.enabled && this._trimming?.end > this._trimming?.start;
    }
    get trimStart() {
      return this._trimming?.start;
    }
    get trimEnd() {
      return this._trimming?.end;
    }
    async setTrimming({ enabled, start, end }) {
      if (start >= end) {
        throw Error(`Error setting trimming: start time (${start}) must be lower than end time ${end}`);
      }
      this._trimming = {
        enabled,
        start,
        end
      };
      const currentTime = await this.currentTime();
      triggerIfReady(this.player, Events_default.TIMEUPDATE, { currentTime: enabled ? start + currentTime : currentTime });
    }
    startStreamSync() {
      this._timeSync = true;
      const setupSyncTimer = async () => {
        if (!this._players.length) {
          this.player.log.warn("Player not yet loaded. Waiting for video sync.");
          return;
        }
        this.player.log.debug("players:");
        this.player.log.debug(this.mainAudioPlayer);
        let currentTime = this.mainAudioPlayer.currentTimeSync;
        if (this.isTrimEnabled) {
          let trimmedCurrentTime = currentTime - this.trimStart;
          if (this.trimEnd <= currentTime) {
            await this.executeAction("pause");
            await this.setCurrentTime(0);
            this.stopStreamSync();
            currentTime = 0;
            triggerIfReady(this.player, Events_default.ENDED, {});
            return;
          } else if (currentTime < this.trimStart) {
            await this.setCurrentTime(0);
            currentTime = this.trimStart;
            trimmedCurrentTime = 0;
          }
          triggerIfReady(this.player, Events_default.TIMEUPDATE, { currentTime: trimmedCurrentTime });
          this._timeupdateTimer = setTimeout(() => {
            if (this._timeSync) {
              setupSyncTimer();
            }
          }, 250);
        } else if (this._timeSync) {
          triggerIfReady(this.player, Events_default.TIMEUPDATE, { currentTime });
          this._timeupdateTimer = setTimeout(() => {
            setupSyncTimer();
          }, 250);
        }
      };
      setupSyncTimer();
    }
    stopStreamSync() {
      this._timeSync = false;
      if (this._timeupdateTimer) {
        clearTimeout(this._timeupdateTimer);
      }
    }
    executeAction(fnName, params = []) {
      if (!Array.isArray(params)) {
        params = [params];
      }
      return new Promise((resolve) => {
        let res = [];
        let p = [];
        this.players.forEach((player) => {
          p.push(new Promise((innerResolve) => {
            player[fnName](...params).then((r) => {
              res.push(r);
              innerResolve();
            });
          }));
        });
        Promise.all(p).then(() => resolve(res));
      });
    }
    async play() {
      this.startStreamSync();
      const result = await this.executeAction("play");
      return result;
    }
    async pause() {
      this.stopStreamSync();
      const result = await this.executeAction("pause");
      return result;
    }
    async stop() {
      this.stopStreamSync();
      await this.executeAction("pause");
      await this.executeAction("setCurrentTime", 0);
    }
    async paused() {
      return (await this.executeAction("paused"))[0];
    }
    async setCurrentTime(t) {
      const prevTime = (await this.executeAction("currentTime"))[0];
      let returnValue = null;
      if (this.isTrimEnabled) {
        t = t + this.trimStart;
        t = t >= this.trimEnd ? this.trimEnd : t;
        const result = (await this.executeAction("setCurrentTime", [t]))[0];
        const newTime = (await this.executeAction("currentTime"))[0];
        returnValue = {
          result,
          prevTime: prevTime - this.trimStart,
          newTime: newTime - this.trimStart
        };
      } else {
        const result = (await this.executeAction("setCurrentTime", [t]))[0];
        const newTime = (await this.executeAction("currentTime"))[0];
        returnValue = { result, prevTime, newTime };
      }
      const currentTime = await this.currentTime();
      triggerIfReady(this.player, Events_default.TIMEUPDATE, { currentTime });
      return returnValue;
    }
    async currentTime() {
      const currentTime = await this.mainAudioPlayer.currentTime();
      if (this.isTrimEnabled) {
        return currentTime - this.trimStart;
      } else {
        return currentTime;
      }
    }
    async currentTimeIgnoringTrimming() {
      const currentTime = await this.mainAudioPlayer.currentTime();
      return currentTime;
    }
    async volume() {
      if (this.mainAudioPlayer) {
        return await this.mainAudioPlayer.volume();
      } else {
        return (await this.executeAction("volume"))[0];
      }
    }
    async setVolume(v) {
      if (this.mainAudioPlayer) {
        return await this.mainAudioPlayer.setVolume(v);
      } else {
        return (await this.executeAction("setVolume", [v]))[0];
      }
    }
    async duration() {
      if (this.isTrimEnabled) {
        return this.trimEnd - this.trimStart;
      } else {
        return (await this.executeAction("duration"))[0];
      }
    }
    async durationIgnoringTrimming() {
      return (await this.executeAction("duration"))[0];
    }
    async playbackRate() {
      return (await this.executeAction("playbackRate"))[0];
    }
    async setPlaybackRate(rate) {
      return (await this.executeAction("setPlaybackRate", [rate]))[0];
    }
    async getQualityReferencePlayer() {
      let player = null;
      let referenceQualities = null;
      if (Object.keys(this.streams).length > 0) {
        for (const content in this.streams) {
          const stream = this.streams[content];
          const q = await stream.player.getQualities();
          if (!player || referenceQualities && q.length > referenceQualities.length) {
            referenceQualities = q;
            player = stream.player;
          }
        }
      }
      return player;
    }
    async getCurrentQuality() {
      return (await this.getQualityReferencePlayer()).currentQuality;
    }
    async getQualities() {
      const player = await this.getQualityReferencePlayer();
      return await player.getQualities();
    }
    async setQuality(quality) {
      const player = await this.getQualityReferencePlayer();
      const qualities = await player.getQualities();
      const total = qualities.length;
      let index = -1;
      qualities.some((q, i) => {
        if (quality.index === q.index) {
          index = i;
        }
        return index !== -1;
      });
      if (index >= 0) {
        const qualityFactor = index / total;
        for (const content in this.streams) {
          const stream = this.streams[content];
          const streamQualities = await stream.player.getQualities();
          this.player.log.debug(streamQualities);
          if (streamQualities.length > 1) {
            const qualityIndex = Math.round(streamQualities.length * qualityFactor);
            const selectedQuality = streamQualities[qualityIndex];
            await stream.player.setQuality(selectedQuality);
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
    async setCurrentAudioTrack(track) {
      return this.mainAudioPlayer.setCurrentAudioTrack(track);
    }
    get currentAudioTrack() {
      return this.mainAudioPlayer.currentAudioTrack;
    }
  };

  // src/js/core/Localization.js
  var g_currentLang = "en";
  var g_dictionaries = {};
  function defaultTranslateFunction(word) {
    const dict = g_dictionaries[g_currentLang] || {};
    return dict[word] || word;
  }
  function defaultSetLanguageFunction(lang) {
    g_currentLang = lang;
  }
  function defaultGetLanguageFunction() {
    return g_currentLang;
  }
  function defaultAddDictionaryFunction(lang, dict) {
    g_dictionaries[lang] = g_dictionaries[lang] || {};
    for (const key in dict) {
      const translation = dict[key];
      g_dictionaries[lang][key] = translation;
    }
  }
  var g_translateFunc = defaultTranslateFunction;
  var g_setLanguageFunc = defaultSetLanguageFunction;
  var g_getLanguageFunc = defaultGetLanguageFunction;
  var g_defaultAddDictionary = defaultAddDictionaryFunction;
  function translate(word, keys = null) {
    const translated = g_translateFunc(word);
    if (Array.isArray(keys)) {
      let result = translated;
      keys.forEach((key, index) => {
        const temp = `$${index + 1}`;
        result = result.replace(temp, key);
      });
      return result;
    } else {
      return translated;
    }
  }
  function setLanguage(lang) {
    g_setLanguageFunc(lang);
  }
  function getLanguage() {
    return g_getLanguageFunc();
  }
  function addDictionary(lang, dict) {
    g_defaultAddDictionary(lang, dict);
  }
  function setTranslateFunction(fn) {
    g_translateFunc = fn;
  }
  function setSetLanguageFunction(fn) {
    g_setLanguageFunc = fn;
  }
  function setGetLanguageFunction(fn) {
    g_getLanguageFunc = fn;
  }
  function setAddDictionaryFunction(fn) {
    g_defaultAddDictionary = fn;
  }

  // src/js/core/ButtonPlugin.js
  async function addButtonPlugin(plugin, buttonAreaElem) {
    const parent = createElementWithHtmlText('<div class="button-plugin-container"></div>', buttonAreaElem);
    parent.plugin = plugin;
    const tabIndex = plugin.tabIndex;
    const ariaLabel = translate(plugin.ariaLabel);
    const description = translate(plugin.description);
    const leftArea = createElementWithHtmlText(`
		<div class="button-plugin-side-area left-side ${plugin.className}"></div>
	`, parent);
    const button = createElementWithHtmlText(`
		<button class="button-plugin ${plugin.className}" tabindex="${tabIndex}" aria-label="${ariaLabel}" title="${description}"><i class="button-icon" style="pointer-events: none">${plugin.icon}</i></button>
	`, parent);
    const rightArea = createElementWithHtmlText(`
		<div class="button-plugin-side-area right-side ${plugin.className}"></div>
	`, parent);
    const titleContainer = createElementWithHtmlText(`
		<span class="button-title button-title-${plugin.titleSize}">${plugin.title || "&nbsp;"}</span>
	`, button);
    plugin._leftArea = leftArea;
    plugin._rightArea = rightArea;
    plugin._button = button;
    plugin._container = parent;
    plugin._titleContainer = titleContainer;
    button._pluginData = plugin;
    leftArea._pluginData = plugin;
    rightArea._pluginData = plugin;
    parent._pluginData = plugin;
    parent.addEventListener("mouseenter", (evt) => {
      parent._pluginData.mouseOver(parent, evt);
    });
    parent.addEventListener("mouseleave", (evt) => {
      parent._pluginData.mouseOut(parent, evt);
    });
    button.addEventListener("click", (evt) => {
      const plugin2 = button._pluginData;
      triggerEvent(plugin2.player, Events_default.BUTTON_PRESS, {
        plugin: plugin2
      });
      plugin2.action(evt);
      evt.stopPropagation();
    });
  }

  // src/js/core/VideoContainer.js
  async function getContainerBaseSize(player) {
    return { w: 1280, h: 720 };
  }
  var VideoContainer = class extends DomClass {
    constructor(player, parent) {
      const baseVideoRectClass = "base-video-rect";
      const attributes = {
        "class": "video-container"
      };
      const children = `
            <div class="${baseVideoRectClass}">
            </div>
        `;
      super(player, { attributes, children, parent });
      this._baseVideoRect = this.element.getElementsByClassName(baseVideoRectClass)[0];
      this.element.addEventListener("click", async () => {
        if (await this.paused()) {
          await this.play();
        } else {
          await this.pause();
        }
      });
      this._ready = false;
      this._layoutId = window.localStorage.getItem("videoLayout") || player.config.defaultLayout;
      this._players = [];
      this._streamProvider = new SteramProvider(this.player, this.baseVideoRect);
    }
    get layoutId() {
      return this._layoutId;
    }
    async setLayout(layoutId) {
      if (this.validContentIds.indexOf(layoutId) === -1) {
        return false;
      } else {
        window.localStorage.setItem("videoLayout", layoutId);
        this._layoutId = layoutId;
        this.updateLayout();
      }
    }
    get validContentIds() {
      return this._validContentIds;
    }
    get validContentSettings() {
      return this._validContentSettings;
    }
    get validLayouts() {
      return getValidLayouts(this.player, this.streamData);
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
    async load(streamData) {
      this._streamData = streamData;
      this._baseVideoRect.style.display = "none";
      await loadPluginsOfType(this.player, "layout");
      await loadVideoPlugins(this.player);
      await this.streamProvider.load(streamData);
      this._validContentIds = getValidContentIds(this.player, streamData);
      this._validContentSettings = getValidContentSettings(this.player, streamData);
      await this.updateLayout();
      const leftSideButtons = createElementWithHtmlText(`<div class="button-plugins left-side"></div>`, this.element);
      const rightSideButtons = createElementWithHtmlText(`<div class="button-plugins right-side"></div>`, this.element);
      this._buttonPlugins = [leftSideButtons, rightSideButtons];
      this.player.log.debug("Loading videoContainer button plugins");
      await loadPluginsOfType(this.player, "button", async (plugin) => {
        this.player.log.debug(` Button plugin: ${plugin.name}`);
        if (plugin.side === "left") {
          await addButtonPlugin(plugin, leftSideButtons);
        } else if (plugin.side === "right") {
          await addButtonPlugin(plugin, rightSideButtons);
        }
      }, async (plugin) => {
        if (plugin.parentContainer === "videoContainer") {
          return await plugin.isEnabled();
        } else {
          return false;
        }
      });
      this._baseVideoRect.style.display = "";
      this._ready = true;
    }
    async unload() {
      this.removeFromParent();
      await unloadPluginsOfType(this.player, "layout");
      await unloadVideoPlugins(this.player);
      await this.streamProvider.unload();
    }
    async updateLayout() {
      let status = true;
      this._layoutButtons = [];
      if (!this._layoutId || this._validContentIds.indexOf(this._layoutId) === -1) {
        this._layoutId = this.player.config.defaultLayout;
        if (this._validContentIds.indexOf(this._layoutId) === -1) {
          this._layoutId = this._validContentIds[0];
        }
        status = false;
      }
      const layoutStructure = getLayoutStructure(this.player, this.streamProvider.streamData, this._layoutId);
      for (const content in this.streamProvider.streams) {
        const isPresent = layoutStructure?.videos?.find((video2) => video2.content === content) != null;
        const video = this.streamProvider.streams[content];
        if (video.isEnabled === void 0) {
          video.isEnabled = true;
        }
        if (isPresent && !video.isEnabled) {
          video.isEnabled = await video.player.enable();
        } else if (!isPresent && video.isEnabled) {
          video.isEnabled = await video.player.disable();
        }
      }
      for (const key in this.streamProvider.streams) {
        const videoData = this.streamProvider.streams[key];
        videoData.canvas.element.style.display = "none";
      }
      const baseSize = await getContainerBaseSize(this.player);
      const playerSize = this.player.containerSize;
      const wFactor = 100 / baseSize.w;
      const hFactor = 100 / baseSize.h;
      const playerRatio = playerSize.w / playerSize.h;
      const baseRatio = baseSize.w / baseSize.h;
      const containerCurrentSize = playerRatio > baseRatio ? { w: playerSize.h * baseRatio, h: playerSize.h } : { w: playerSize.w, h: playerSize.w / baseRatio };
      this.baseVideoRect.style.width = containerCurrentSize.w + "px";
      this.baseVideoRect.style.height = containerCurrentSize.h + "px";
      await layoutStructure?.videos?.forEach(async (video) => {
        const videoData = this.streamProvider.streams[video.content];
        const { stream, player, canvas } = videoData;
        const res = await player.getDimensions();
        const videoAspectRatio = res.w / res.h;
        let difference = Number.MAX_VALUE;
        let resultRect = null;
        canvas.buttonsArea.innerHTML = "";
        addVideoCanvasButton(layoutStructure, canvas, video);
        video.rect.forEach((videoRect) => {
          const aspectRatioData = /^(\d+.?\d*)\/(\d+.?\d*)$/.exec(videoRect.aspectRatio);
          const rectAspectRatio = aspectRatioData ? Number(aspectRatioData[1]) / Number(aspectRatioData[2]) : 1;
          const d = Math.abs(videoAspectRatio - rectAspectRatio);
          if (d < difference) {
            resultRect = videoRect;
            difference = d;
          }
        });
        canvas.element.style.display = "block";
        canvas.element.style.position = "absolute";
        canvas.element.style.left = `${resultRect.left * wFactor}%`;
        canvas.element.style.top = `${resultRect.top * hFactor}%`;
        canvas.element.style.width = `${resultRect.width * wFactor}%`;
        canvas.element.style.height = `${resultRect.height * hFactor}%`;
        canvas.element.style.zIndex = video.layer;
      });
      const prevButtons = this.baseVideoRect.getElementsByClassName("video-layout-button");
      Array.from(prevButtons).forEach((btn) => this.baseVideoRect.removeChild(btn));
      layoutStructure?.buttons?.forEach((buttonData) => {
        const button = createElement({
          tag: "button",
          attributes: {
            "class": "video-layout-button",
            "aria-label": translate(buttonData.ariaLabel),
            "title": translate(buttonData.title),
            style: `
                        left: ${buttonData.rect.left * wFactor}%;
                        top: ${buttonData.rect.top * hFactor}%;
                        width: ${buttonData.rect.width * wFactor}%;
                        height: ${buttonData.rect.height * hFactor}%;
                        z-index: ${buttonData.layer};
                    `
          },
          parent: this.baseVideoRect,
          children: buttonData.icon
        });
        button.layout = layoutStructure;
        button.buttonAction = buttonData.onClick;
        button.addEventListener("click", (evt) => {
          triggerEvent(this.player, Events_default.BUTTON_PRESS, {
            plugin: layoutStructure.plugin,
            layoutStructure
          });
          evt.target.buttonAction.apply(evt.target.layout);
          evt.stopPropagation();
        });
        this._layoutButtons.push(button);
      });
      triggerEvent(this.player, Events_default.LAYOUT_CHANGED);
      return status;
    }
    hideUserInterface() {
      if (this._layoutButtons && this._buttonPlugins) {
        this.player.log.debug("Hide video container user interface");
        const hideFunc = (button) => {
          button._prevDisplay = button.style.display;
          button.style.display = "none";
        };
        this._layoutButtons.forEach(hideFunc);
        this._buttonPlugins.forEach(hideFunc);
        for (const content in this.streamProvider.streams) {
          const stream = this.streamProvider.streams[content];
          stream.canvas.hideButtons();
        }
      }
    }
    showUserInterface() {
      if (this._layoutButtons && this._buttonPlugins) {
        const showFunc = (button) => button.style.display = button._prevDisplay || "block";
        this._layoutButtons.forEach(showFunc);
        this._buttonPlugins.forEach(showFunc);
        for (const content in this.streamProvider.streams) {
          const stream = this.streamProvider.streams[content];
          stream.canvas.showButtons();
        }
      }
    }
    get ready() {
      return this._ready;
    }
    async play() {
      const result = await this.streamProvider.play();
      triggerEvent(this.player, Events_default.PLAY);
      return result;
    }
    async pause() {
      const result = await this.streamProvider.pause();
      triggerEvent(this.player, Events_default.PAUSE);
      return result;
    }
    async stop() {
      this.streamProvider.stop();
      triggerEvent(this.player, Events_default.STOP);
    }
    async paused() {
      return this.streamProvider.paused();
    }
    async setCurrentTime(t) {
      const result = await this.streamProvider.setCurrentTime(t);
      triggerEvent(this.player, Events_default.SEEK, { prevTime: result.prevTime, newTime: result.newTime });
      return result.result;
    }
    async currentTime() {
      return this.streamProvider.currentTime();
    }
    async volume() {
      return this.streamProvider.volume();
    }
    async setVolume(v) {
      const result = await this.streamProvider.setVolume(v);
      triggerEvent(this.player, Events_default.VOLUME_CHANGED, { volume: v });
      return result;
    }
    async duration() {
      return await this.streamProvider.duration();
    }
    async playbackRate() {
      return await this.streamProvider.playbackRate();
    }
    async setPlaybackRate(r) {
      const result = await this.streamProvider.setPlaybackRate(r);
      triggerEvent(this.player, Events_default.PLAYBACK_RATE_CHANGED, { newPlaybackRate: r });
      return result;
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
    async setTrimming({ enabled, start, end }) {
      const result = await this.streamProvider.setTrimming({
        enabled,
        start,
        end
      });
      triggerEvent(this.player, Events_default.TRIMMING_CHANGED, {
        enabled,
        start,
        end
      });
      return result;
    }
    getVideoRect(target = null) {
      let element = this.baseVideoRect;
      if (typeof target === "string") {
        element = this.streamProvider.streams[target]?.canvas.element;
      }
      return {
        x: element?.offsetLeft,
        y: element?.offsetTop,
        width: element?.offsetWidth,
        height: element?.offsetHeight,
        element
      };
    }
    appendChild(element, rect = null, zIndex = 1) {
      if (rect) {
        const { width, height } = this.getVideoRect();
        rect.x = rect.x * 100 / width;
        rect.width = rect.width * 100 / width;
        rect.y = rect.y * 100 / height;
        rect.height = rect.height * 100 / height;
        element.style.position = "absolute";
        element.style.left = `${rect.x}%`;
        element.style.top = `${rect.y}%`;
        element.style.width = `${rect.width}%`;
        element.style.height = `${rect.height}%`;
        if (zIndex !== null)
          element.style.zIndex = zIndex;
      }
      this.baseVideoRect.appendChild(element);
      return element;
    }
    removeChild(element) {
      this.baseVideoRect.removeChild(element);
    }
  };

  // src/icons/play_icon_fullscreen.svg
  var play_icon_fullscreen_default = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n<svg width="100%" height="100%" viewBox="0 0 300 300" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xml:space="preserve" xmlns:serif="http://www.serif.com/" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;">\n    <rect id="Play" x="0" y="0" width="300" height="300" style="fill:none;"/>\n    <g id="Play1" serif:id="Play">\n        <g transform="matrix(1.21457,0,0,1.21457,-55.8704,-35.2227)">\n            <circle cx="169.5" cy="152.5" r="123.5" style="fill:rgb(128,128,128);"/>\n            <path d="M169.5,29C237.662,29 293,84.338 293,152.5C293,220.662 237.662,276 169.5,276C101.338,276 46,220.662 46,152.5C46,84.338 101.338,29 169.5,29ZM169.5,37.233C233.117,37.233 284.767,88.883 284.767,152.5C284.767,216.117 233.117,267.767 169.5,267.767C105.883,267.767 54.233,216.117 54.233,152.5C54.233,88.883 105.883,37.233 169.5,37.233Z" style="fill:rgb(235,235,235);"/>\n        </g>\n        <g transform="matrix(6.12323e-17,1,-1,6.12323e-17,347,-59)">\n            <path d="M209,82L317,253L101,253L209,82Z" style="fill:rgb(235,235,235);"/>\n        </g>\n    </g>\n</svg>\n';

  // src/js/core/PreviewContainer.js
  var g_style = `
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
`;
  var g_imgStyle = `
    width: 100%;
`;
  var g_iconContainerStyle = `
    position: absolute; 
    top: 0px; 
    left: 0px; 
    right: 0px; 
    bottom: 0px; 
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
`;
  var g_iconStyle = `
    pointer-events: none;
    width: 20%;
    max-width: 400px;
    min-width: 100px;
    opacity: 0.6;
`;
  var PreviewContainer = class extends DomClass {
    constructor(player, parentElement, backgroundImage) {
      const attributes = {
        "class": "preview-container",
        "style": g_style
      };
      super(player, { attributes, parent: parentElement });
      this._img = createElementWithHtmlText(`
        <div style="${g_imgStyle}">
            <img style="${g_imgStyle}" src="${backgroundImage}" alt=""/>
            <div style="${g_iconContainerStyle}">
                <i class="preview-play-icon" style="${g_iconStyle}">${play_icon_fullscreen_default}</i>
            </div>
        </div>
        `, this.element);
      this.element.addEventListener("click", (evt) => {
        player.play();
      });
    }
    loadBackgroundImage(src) {
      this._img.setAttribute("src", src);
    }
  };

  // src/js/core/ProgressIndicator.js
  function getCurrentFrame(sortedFrameList, time) {
    if (!sortedFrameList || sortedFrameList.length === 0) {
      return null;
    }
    let result = sortedFrameList[0];
    let prevTime = result.time;
    sortedFrameList.forEach((frame) => {
      if (frame.time > prevTime && frame.time < Math.floor(time)) {
        result = frame;
        prevTime = result.time;
      }
    });
    return result;
  }
  function updateFrameThumbnail(offsetX, time) {
    let frame = getCurrentFrame(this.frameList, time);
    if (frame) {
      this._frameThumbnail.style.display = "block";
      const thumbWidth = this._frameThumbnail.getBoundingClientRect().width;
      const playbackBar = this.playbackBar;
      const { top, left, bottom, width, height } = playbackBar.getBoundingClientRect();
      const centerX = width / 2;
      this.frameThumbnail.style.bottom = `${height}px`;
      if (centerX > offsetX) {
        this.frameThumbnail.style.left = `${offsetX}px`;
      } else {
        this.frameThumbnail.style.left = `${offsetX - thumbWidth}px`;
      }
      const frameImage = resolveResourcePath(this.player, frame.url);
      const thumbImageContainer = this.frameThumbnail.getElementsByClassName("thumbnail-image")[0];
      const timeContainer = this.frameThumbnail.getElementsByClassName("thumbnail-time")[0];
      if (frameImage !== this._prevFrameImage) {
        thumbImageContainer.src = frameImage;
        thumbImageContainer.alt = frame.id;
        this._prevFrameImage = frameImage;
      }
      timeContainer.innerHTML = secondsToTime(time);
    }
  }
  var ProgressIndicator = class extends DomClass {
    constructor(player, parent) {
      const attributes = {
        "class": "progress-indicator"
      };
      const children = `
		<canvas class="progress-canvas canvas-layer-0"></canvas>
		<div class="progress-indicator-container">
			<div style="width: 0px;" class="progress-indicator-content"></div>
		</div>
		<canvas class="progress-canvas canvas-layer-1"></canvas>
		<div class="progress-indicator-timer">00:00</div>
		`;
      super(player, { attributes, children, parent });
      this._frameThumbnail = createElementWithHtmlText(`
			<div class="frame-thumbnail">
				<img src="" alt="" class="thumbnail-image" />
				<p class="thumbnail-time">00:00</p>
			</div>`, player.containerElement);
      this._frameThumbnail.style.display = "none";
      this._frameThumbnail.style.position = "absolute";
      this._canvas = [
        this.element.getElementsByClassName("progress-canvas")[0],
        this.element.getElementsByClassName("progress-canvas")[1]
      ];
      this._progressContainer = this.element.getElementsByClassName("progress-indicator-container")[0];
      this._progressIndicator = this.element.getElementsByClassName("progress-indicator-content")[0];
      this._progressTimer = this.element.getElementsByClassName("progress-indicator-timer")[0];
      this._frameList = player.videoManifest?.frameList;
      this._frameList?.sort((a, b) => a.time - b.time);
      this.onResize();
      let drag = false;
      const updateProgressIndicator = async (currentTime) => {
        const duration = await player.videoContainer.duration();
        const newWidth = currentTime * 100 / duration;
        this.progressIndicator.style.width = `${newWidth}%`;
      };
      const positionToTime = async (pos) => {
        const barWidth = this.element.offsetWidth;
        const duration = await player.videoContainer.duration();
        return pos * duration / barWidth;
      };
      bindEvent(this.player, Events_default.TIMEUPDATE, async ({ currentTime }) => {
        if (!drag) {
          await updateProgressIndicator(currentTime);
          const formattedTime = secondsToTime(currentTime);
          this.progressTimer.innerHTML = formattedTime;
        }
      });
      bindEvent(this.player, Events_default.SEEK, async ({ prevTime, newTime }) => {
        if (!drag) {
          await updateProgressIndicator(newTime);
          const formattedTime = secondsToTime(newTime);
          this.progressTimer.innerHTML = formattedTime;
        }
      });
      bindEvent(this.player, Events_default.STOP, async () => {
        await updateProgressIndicator(0);
        const formattedTime = secondsToTime(0);
        this.progressTimer.innerHTML = formattedTime;
      });
      this.progressContainer.addEventListener("mousedown", async (evt) => {
        drag = true;
        const newTime = await positionToTime(evt.offsetX);
        await updateProgressIndicator(newTime);
      });
      this.progressContainer._progressIndicator = this;
      this.progressContainer.addEventListener("mousemove", async (evt) => {
        const { isTrimEnabled, trimStart } = this.player.videoContainer;
        const offset = isTrimEnabled ? trimStart : 0;
        const newTime = await positionToTime(evt.offsetX);
        if (drag) {
          await updateProgressIndicator(newTime);
        }
        updateFrameThumbnail.apply(this, [evt.offsetX, newTime + offset]);
      });
      this.progressContainer.addEventListener("mouseup", async (evt) => {
        const newTime = await positionToTime(evt.offsetX);
        await updateProgressIndicator(newTime);
        await player.videoContainer.setCurrentTime(newTime);
        const formattedTime = secondsToTime(newTime);
        this.progressTimer.innerHTML = formattedTime;
        drag = false;
      });
      this.progressContainer.addEventListener("mouseleave", async (evt) => {
        if (drag) {
          const newTime = await positionToTime(evt.offsetX);
          await player.videoContainer.setCurrentTime(newTime);
          drag = false;
        }
        this.frameThumbnail.style.display = "none";
      });
    }
    get playbackBar() {
      return this.element.parentElement;
    }
    get canvasLayer0() {
      return this._canvas[0];
    }
    get canvasLayer1() {
      return this._canvas[1];
    }
    get progressIndicator() {
      return this._progressIndicator;
    }
    get progressTimer() {
      return this._progressTimer;
    }
    get progressContainer() {
      return this._progressContainer;
    }
    get frameThumbnail() {
      return this._frameThumbnail;
    }
    get frameList() {
      return this._frameList;
    }
    onResize() {
      const size = {
        w: this.element.offsetWidth,
        h: this.element.offsetHeight
      };
      this._canvas.forEach((c) => {
        c.width = size.w;
        c.height = size.h;
      });
    }
  };

  // src/js/core/PlaybackBar.js
  var PlaybackBar = class extends DomClass {
    constructor(player, parent) {
      const attributes = {
        "class": "playback-bar"
      };
      super(player, { attributes, parent });
      this._progressIndicator = new ProgressIndicator(player, this.element);
      this._buttonPluginsLeft = createElementWithHtmlText(`<div class="button-plugins left-side"></div>`, this.element);
      this._buttonPluginsRight = createElementWithHtmlText(`<div class="button-plugins right-side"></div>`, this.element);
    }
    async load() {
      this._frameList = this.player.videoManifest;
      this.player.log.debug("Loading button plugins");
      await loadPluginsOfType(this.player, "button", async (plugin) => {
        this.player.log.debug(` Button plugin: ${plugin.name}`);
        if (plugin.side === "left") {
          await addButtonPlugin(plugin, this.buttonPluginsLeft);
        } else if (plugin.side === "right") {
          await addButtonPlugin(plugin, this.buttonPluginsRight);
        }
      }, async (plugin) => {
        if (plugin.parentContainer === "playbackBar") {
          return await plugin.isEnabled();
        } else {
          return false;
        }
      });
    }
    async unload() {
      this.removeFromParent();
      await unloadPluginsOfType(this.player, "button");
      this._buttonPluginsLeft.innerHTML = "";
      this._buttonPluginsRight.innerHTML = "";
    }
    hideUserInterface() {
      this.player.log.debug("Hide playback bar user interface");
      this.hide();
    }
    showUserInterface() {
      this.show();
    }
    get buttonPluginsRight() {
      return this._buttonPluginsRight;
    }
    get buttonPluginsLeft() {
      return this._buttonPluginsLeft;
    }
    get progressIndicator() {
      return this._progressIndicator;
    }
    onResize() {
      this.progressIndicator.onResize();
    }
  };

  // src/js/core/TimeLinePopUp.js
  function setupPlayerInstance(player) {
    if (!player.__timeLinePopUp) {
      player.__timeLinePopUp = {
        popUps: [],
        current: null
      };
    }
  }
  var TimeLinePopUp = class extends DomClass {
    static HideUserInterface(player) {
      setupPlayerInstance(player);
      if (player.__timeLinePopUp.current) {
        const tmpCurrentPopup = player.__timeLinePopUp.current;
        player.__timeLinePopUp.current.hide(true);
        player.__timeLinePopUp.current = tmpCurrentPopup;
      }
    }
    static ShowUserInterface(player) {
      setupPlayerInstance(player);
      if (player.__timeLinePopUp.current) {
        player.__timeLinePopUp.current.show(true);
      }
    }
    static Unload(player) {
      if (!player.__timeLinePopUp)
        return;
      if (player.__timeLinePopUp.current) {
        player.__timeLinePopUp.current.removeFromParent();
      }
      player.__timeLinePopUp.popUps.forEach((p) => {
        p.removeFromParent();
      });
      player.__timeLinePopUp.popUps.slice(0);
      delete player.__timeLinePopUp;
    }
    constructor(player, contextObject = null) {
      setupPlayerInstance(player);
      const attributes = {
        "class": "timeline-popup-content"
      };
      const parent = player.containerElement;
      super(player, { attributes, parent });
      this._contextObject = contextObject;
      player.__timeLinePopUp.popUps.forEach((p) => p.hide());
      this._id = Symbol(this);
      player.__timeLinePopUp.popUps.push(this);
      player.__timeLinePopUp.current = this;
      triggerEvent(this.player, Events_default.SHOW_POPUP, {
        popUp: this,
        plugin: this.contextObject
      });
    }
    get contextObject() {
      return this._contextObject;
    }
    show(uiTimerTriggered = false) {
      if (this.isVisible) {
        return;
      }
      this.player.__timeLinePopUp.popUps.forEach((p) => p.hide());
      super.show();
      this.player.__timeLinePopUp.current = this;
      if (!(uiTimerTriggered === true)) {
        triggerEvent(this.player, Events_default.SHOW_POPUP, {
          popUp: this,
          plugin: this.contextObject
        });
      }
    }
    hide(uiTimerTriggered = false) {
      if (!this.isVisible) {
        return;
      }
      super.hide();
      this.player.__timeLinePopUp.current = null;
      if (!(uiTimerTriggered === true)) {
        triggerEvent(this.player, Events_default.HIDE_POPUP, {
          popUp: this,
          plugin: this.contextObject
        });
      }
    }
    setContent(content) {
      if (content) {
        this.element.innerHTML = "";
        this.element.appendChild(content);
      }
    }
  };

  // src/js/core/Data.js
  var Data = class extends PlayerResource {
    constructor(player) {
      super(player);
      this._dataPlugins = {};
      loadPluginsOfType(this.player, "data", async (plugin) => {
        plugin.context?.forEach((ctx) => {
          this._dataPlugins[ctx] = this._dataPlugins[ctx] || [];
          this._dataPlugins[ctx].push(plugin);
        });
      });
    }
    getDataPlugin(context) {
      let plugin = this._dataPlugins[context] && this._dataPlugins[context].length > 0 && this._dataPlugins[context][0];
      if (!plugin) {
        plugin = this._dataPlugins["default"] && this._dataPlugins["default"].length > 0 && this._dataPlugins["default"] && this._dataPlugins["default"][0];
      }
      if (!plugin) {
        throw Error(`No data plugin found for context '${context}'`);
      }
      return plugin;
    }
    async read(context, key) {
      const p = this.getDataPlugin(context);
      const result = await p.read(context, key);
      return result;
    }
    async write(context, key, data) {
      const p = this.getDataPlugin(context);
      const result = await p.write(context, key, data);
      return result;
    }
    async remove(context, key) {
      const p = this.getDataPlugin(context);
      const result = await p.remove(context, key);
      return result;
    }
  };

  // src/js/captions/CaptionsPlugin.js
  async function loadCaptionsPlugins(player) {
    const enabledCaptionsPlugins = [];
    await loadPluginsOfType(player, "captions", async (plugin) => {
      enabledCaptionsPlugins.push(plugin);
    });
    for (let i in enabledCaptionsPlugins) {
      const plugin = enabledCaptionsPlugins[i];
      const captions = await plugin.getCaptions();
      const captionsCanvas = player.captionsCanvas;
      captions.forEach((c) => captionsCanvas.addCaptions(c));
    }
  }

  // src/js/captions/CaptionsCanvas.js
  var containerSizeClasses = [
    { maxWidth: 400, className: "size-s" },
    { maxWidth: 600, className: "size-m" },
    { maxWidth: 900, className: "size-l" },
    { maxWidth: 1100, className: "size-xl" },
    { className: "size-xxl" }
  ];
  var getContainerSizeClass = (size) => {
    return containerSizeClasses.find((item) => item.maxWidth && item.maxWidth >= size || item.maxWidth === void 0).className;
  };
  var CaptionCanvas = class extends DomClass {
    constructor(player, parent) {
      const attributes = {
        "class": "captions-canvas visible-ui"
      };
      super(player, { tag: "div", attributes, parent });
      this._captionsContainer = createElementWithHtmlText(`
            <div class="text-container">
            </div>
        `, this.element);
      this._captions = [];
      this.hide();
      this._currentCaptions = null;
      const timeChanged = (evt) => {
        const time = evt.currentTime || evt.newTime || 0;
        if (this._currentCaptions) {
          const cue = this._currentCaptions.getCue(time);
          this._captionsContainer.innerHTML = "";
          cue && cue.captions.forEach((c) => {
            this._captionsContainer.innerHTML += c;
            this._captionsContainer.innerHTML += "<br/>";
          });
          cue ? this._captionsContainer.style.display = null : this._captionsContainer.style.display = "none";
          this.resize();
        }
      };
      bindEvent(this.player, Events_default.TIMEUPDATE, timeChanged);
      bindEvent(this.player, Events_default.SEEK, timeChanged);
      bindEvent(this.player, Events_default.RESIZE, () => this.resize());
      bindEvent(this.player, Events_default.SHOW_UI, () => this.element.classList.add("visible-ui"));
      bindEvent(this.player, Events_default.HIDE_UI, () => this.element.classList.remove("visible-ui"));
    }
    async load() {
      await loadCaptionsPlugins(this.player);
    }
    unload() {
    }
    resize() {
      const sizeClass = getContainerSizeClass(this._captionsContainer.clientWidth);
      containerSizeClasses.forEach((c) => this.element.classList.remove(c.className));
      this.element.classList.add(sizeClass);
    }
    addCaptions(captions) {
      this._captions.push(captions);
      triggerEvent(this.player, Events_default.CAPTIONS_CHANGED, { captions: this._captions });
    }
    get captions() {
      return this._captions;
    }
    get currentCaptions() {
      return this._currentCaptions;
    }
    getCaptions({ label, index, lang }) {
      if (label === void 0 && index === void 0 && lang === void 0) {
        throw Error("Could not find captions: you must specify the label, the index or the language");
      }
      if (index !== void 0) {
        return this._captions[index];
      } else {
        return this._captions.find((c) => {
          if (label !== void 0) {
            return c.label === label;
          } else if (lang !== void 0) {
            return c.language === lang;
          }
        });
      }
    }
    enableCaptions(searchOptions) {
      this._currentCaptions = this.getCaptions(searchOptions);
      this.show();
    }
    disableCaptions() {
      this._currentCaptions = null;
      this.hide();
    }
  };

  // src/js/core/EventLogPlugin.js
  async function loadLogEventPlugins(player) {
    await loadPluginsOfType(player, "eventLog", async (plugin) => {
      plugin.events.forEach((event) => {
        bindEvent(player, event, async (params) => {
          await plugin.onEvent(event, params);
        });
      });
    });
  }
  async function unloadLogEventPlugins(player) {
    console.warn("unloadLogEventPlugins: not implemented");
  }

  // src/js/core/KeyShortcutPlugin.js
  var getModifierStatus = (sc) => {
    return `alt:${sc.keyModifiers?.altKey || false}, ctrl:${sc.keyModifiers?.ctrlKey || false}, shift:${sc.keyModifiers?.shiftKey || false}`;
  };
  var getShortcutHash = (sc) => {
    const hash = `${sc.keyCode}_${getModifierStatus(sc)}`;
    return hash;
  };
  var addKeyModifiersObject = (sc) => {
    sc.keyModifiers = sc.keyModifiers || {};
    sc.keyModifiers.altKey = sc.keyModifiers.altKey || false;
    sc.keyModifiers.shiftKey = sc.keyModifiers.shiftKey || false;
    sc.keyModifiers.ctrlKey = sc.keyModifiers.ctrlKey || false;
  };
  var getShortcuts = (player) => {
    const enabledShortcuts = [];
    for (const keyCode in player.__shortcuts__) {
      const shortcut = player.__shortcuts__[keyCode];
      shortcut.forEach((sc) => {
        if (!sc.disabled) {
          enabledShortcuts.push(sc);
        }
      });
    }
    return enabledShortcuts;
  };
  async function loadKeyShortcutPlugins(player) {
    player.__shortcuts__ = player.__shortcuts__ || {};
    if (!window.__paella_shortcuts_player__) {
      window.__paella_shortcuts_player__ = player;
    } else {
      player.log.warn("Warning: more than one paella player instance with enabled shortcut plugins.");
      player.log.warn("Check your code to ensure that only one instance of paella player registers keyboard shortcut plugins.");
      return;
    }
    await loadPluginsOfType(player, "keyshortcut", async (plugin) => {
      const shortcuts = await plugin.getKeys();
      shortcuts.forEach((shortcut) => {
        player.__shortcuts__[shortcut.keyCode] = player.__shortcuts__[shortcut.keyCode] || [];
        shortcut.plugin = plugin;
        player.__shortcuts__[shortcut.keyCode].push(shortcut);
      });
      const dicts = await plugin.getDictionaries();
      for (const key in dicts) {
        const dict = dicts[key];
        player.addDictionary(key, dict);
      }
      for (const keyCode in player.__shortcuts__) {
        const shortcuts2 = player.__shortcuts__[keyCode];
        const hashes = {};
        if (shortcuts2.length > 0) {
          shortcuts2.forEach((shortcut) => {
            const hash = getShortcutHash(shortcut);
            addKeyModifiersObject(shortcut);
            if (!hashes[hash]) {
              hashes[hash] = shortcut;
            } else {
              player.log.warn(`Collision detected in shortcut for key code ${keyCode}`);
              const enabledShortcut = hashes[hash];
              player.log.warn("Enabled shortcut:");
              player.log.warn(`plugin: ${enabledShortcut.plugin.name}, keyCode: ${enabledShortcut.keyCode}, modifiers: ${getModifierStatus(enabledShortcut)}, description: ${enabledShortcut.description}`);
              player.log.warn("Collision shortcut (disabled):");
              player.log.warn(`plugin: ${shortcut.plugin.name}, keyCode: ${shortcut.keyCode}, modifiers: ${getModifierStatus(shortcut)}, description: ${shortcut.description}`);
              shortcut.disabled = true;
            }
          });
        }
      }
    });
    player.__paella_key_event_listener__ = async (event) => {
      const validFocus = () => document.activeElement && document.activeElement !== document.body && !/video/i.test(document.activeElement.tagName);
      if (event.code === "Space" && validFocus()) {
        return;
      }
      const shortcut = player.__shortcuts__[event.code];
      if (shortcut) {
        await shortcut.forEach(async (s) => {
          const altStatus = !s.keyModifiers?.altKey || s.keyModifiers?.altKey && event.altKey;
          const ctrlStatus = !s.keyModifiers?.ctrlKey || s.keyModifiers?.ctrlKey && event.ctrlKey;
          const shiftStatus = !s.keyModifiers?.shiftKey || s.keyModifiers?.shiftKey && event.shiftKey;
          if (altStatus && ctrlStatus && shiftStatus && !s.disabled) {
            await s.action(event);
          } else if (altStatus && ctrlStatus && shiftStatus && s.disabled) {
            player.log.warn("Shortcut not triggered due to collision:");
            player.log.warn(`plugin: ${s.plugin.name}, keyCode: ${s.keyCode}, modifiers: ${getModifierStatus(s)}, description: ${s.description}`);
          }
        });
      }
    };
    window.addEventListener("keyup", player.__paella_key_event_listener__);
  }
  async function unloadKeyShortcutPlugins(player) {
    delete player.__shortcuts__;
    if (player == window.__paella_shortcuts_player__) {
      window.removeEventListener("keyup", player.__paella_key_event_listener__);
      delete window.__paella_key_event_listener__;
      delete window.__paella_shortcuts_player__;
    }
  }

  // src/js/core/Log.js
  var LOG_LEVEL = {
    DISABLED: 0,
    ERROR: 1,
    WARN: 2,
    INFO: 3,
    DEBUG: 4,
    VERBOSE: 5
  };
  var g_globalLogLevel = LOG_LEVEL.INFO;
  var setLogLevel = (l, player = null) => {
    const level = typeof l === "string" ? LOG_LEVEL[l] : l;
    if (level < LOG_LEVEL.DISABLED || level > LOG_LEVEL.VERBOSE) {
      throw Error(`setLogLevel: invalid log level ${level}`);
    }
    if (player) {
      player.__logSettings = player.__logSettings || {};
      player.__logSettings.logLevel = level;
    } else {
      g_globalLogLevel = level;
    }
  };
  var currentLogLevel = (player = null) => {
    return player ? player.__logSettings.logLevel : g_globalLogLevel;
  };
  var printMessage = ({
    msg,
    level = LOG_LEVEL.INFO,
    player = null,
    context = "paella-core"
  }) => {
    if (player && !player.__logSettings) {
      setLogLevel(player, LOG_LEVEL.INFO);
    }
    const current = currentLogLevel(player);
    if (level < LOG_LEVEL.DISABLED) {
      throw Error(`printMessage: invalid log level ${level}`);
    }
    if (level <= current) {
      switch (level) {
        case LOG_LEVEL.ERROR:
          console.error(`${context} - Error: ${msg}`);
          break;
        case LOG_LEVEL.WARN:
          console.warn(`${context}  - Warning: ${msg}`);
          break;
        case LOG_LEVEL.INFO:
          console.log(`${context} - Info: ${msg}`);
          break;
        case LOG_LEVEL.DEBUG:
          console.log(`${context} - Debug: ${msg}`);
          break;
        case LOG_LEVEL.VERBOSE:
          console.log(`${context} - Verbose: ${msg}`);
          break;
      }
    }
  };
  var log = {
    setLevel: (level, player = null) => {
      setLogLevel(level, player);
    },
    currentLevel: (player = null) => {
      return currentLogLevel(player);
    },
    error: (msg, player = null, context = "paella-core") => {
      printMessage({
        msg,
        level: LOG_LEVEL.ERROR,
        player,
        context
      });
    },
    warn: (msg, player = null, context = "paella-core") => {
      printMessage({
        msg,
        level: LOG_LEVEL.WARN,
        player,
        context
      });
    },
    info: (msg, player = null, context = "paella-core") => {
      printMessage({
        msg,
        level: LOG_LEVEL.INFO,
        player,
        context
      });
    },
    debug: (msg, player = null, context = "paella-core") => {
      printMessage({
        msg,
        level: LOG_LEVEL.DEBUG,
        player,
        context
      });
    },
    verbose: (msg, player = null, context = "paella-core") => {
      printMessage({
        msg,
        level: LOG_LEVEL.VERBOSE,
        player,
        context
      });
    }
  };
  var Log = class {
    constructor(player, context = "paella-core") {
      this._player = player;
      this._context = context;
    }
    get context() {
      return this._context;
    }
    get player() {
      return this._player;
    }
    setLevel(level) {
      log.setLevel(level, this._player);
    }
    currentLevel() {
      log.currentLevel(this._player);
    }
    error(msg, context = null) {
      log.error(msg, this._player, context || this._context);
    }
    warn(msg, context = null) {
      log.warn(msg, this._player, context || this._context);
    }
    info(msg, context = null) {
      log.info(msg, this._player, context || this._context);
    }
    debug(msg, context = null) {
      log.debug(msg, this._player, context || this._context);
    }
    verbose(msg, context = null) {
      log.verbose(msg, this._player, context || this._context);
    }
  };

  // src/js/default-dictionaries.js
  var defaultDictionaries = {
    "es": {
      "May the force be with you": "Que la fuerza te acompa\xF1e",
      "Digit1": "1",
      "Digit2": "2",
      "Digit3": "3",
      "Digit4": "4",
      "Digit5": "5",
      "Digit6": "6",
      "Digit7": "7",
      "Digit8": "8",
      "Digit9": "9",
      "Digit0": "0",
      "KeyA": "A",
      "KeyB": "B",
      "KeyC": "C",
      "KeyD": "D",
      "KeyE": "E",
      "KeyF": "F",
      "KeyG": "G",
      "KeyH": "H",
      "KeyI": "I",
      "KeyJ": "J",
      "KeyK": "K",
      "KeyL": "L",
      "KeyM": "M",
      "KeyN": "N",
      "KeyO": "O",
      "KeyP": "P",
      "KeyQ": "Q",
      "KeyR": "R",
      "KeyS": "S",
      "KeyT": "T",
      "KeyU": "U",
      "KeyV": "V",
      "KeyW": "W",
      "KeyX": "X",
      "KeyY": "Y",
      "KeyZ": "Z",
      "Comma": ",",
      "Period": ".",
      "Semicolon": ";",
      "Quote": "'",
      "BracketLeft": "[",
      "BracketRight": "]",
      "Backquote": "`",
      "Backslash": "\\",
      "Minus": "-",
      "Equal": "=",
      "AltLeft": "Alt",
      "AltRight": "Alt",
      "CapsLock": "Bloqueo May.",
      "ControlLeft": "Ctrl",
      "ControlRight": "Ctrl",
      "OSLeft": "OSLeft",
      "OSRight": "OSRight",
      "ShiftLeft": "May\xFAsculas",
      "ShiftRight": "May\xFAsculas",
      "ContextMenu": "ContextMenu",
      "Enter": "Intro",
      "Space": "Espacio",
      "Tab": "Tabulador",
      "Delete": "Borrar",
      "End": "Fin",
      "Help": "Ayuda",
      "Home": "Inicio",
      "Insert": "Insertar",
      "PageDown": "Re. Pag",
      "PageUp": "Av. Pag",
      "ArrowDown": "Flecha abajo",
      "ArrowLeft": "Flecha izq.",
      "ArrowRight": "Flecha der.",
      "ArrowUp": "Flecha Arriba",
      "Escape": "Escape",
      "PrintScreen": "PrintScreen",
      "ScrollLock": "ScrollLock",
      "Pause": "Pausa",
      "Put the videos side by side": "Colocar los v\xEDdeos uno junto al otro",
      "Minimize video": "Minimizar v\xEDdeo",
      "Place the video on the other side of the screen": "Colocar el v\xEDdeo al otro lado de la pantalla",
      "Maximize video": "Maximizar v\xEDdeo",
      "Swap position of the videos": "Intercambiar posici\xF3n de los v\xEDdeos",
      "loadManifest(): Invalid current player state: $1": "loadManifest(): Estado actual del reproductor no v\xE1lido: $1",
      "loadPlayer(): Invalid current player state: $1": "loadPlayer(): Estado actual del reproductor no v\xE1lido: $1",
      "Could not load player: state transition in progress: $1": "No se puede cargar el reproductor: transici\xF3n de estado en progreso: $1",
      "Could not unload player: state transition in progress: $1": "No se puede descargar el reproductor: transici\xF3n de estado en progreso $1",
      "unloadManifest(): Invalid current player state: $1": "unloadManifest(): Estado actual del reprodutor no v\xE1lido: $1",
      "Error loading video manifest: $1 $2": "Error cargando la informaci\xF3n del v\xEDdeo: $1 $2"
    }
  };
  defaultDictionaries["es-ES"] = defaultDictionaries["es"];
  var default_dictionaries_default = defaultDictionaries;

  // package.json
  var package_default = {
    name: "paella-core",
    version: "1.1.5",
    description: "Multistream HTML video player",
    main: "src/index.js",
    module: "dist/paella-core.js",
    scripts: {
      build: "webpack --mode production",
      dev: "node esbuild.debug.js",
      captions: "webpack serve --mode development --config webpack.captions.js"
    },
    repository: {
      type: "git",
      url: "git+https://github.com/polimediaupv/paella-core.git"
    },
    keywords: [
      "html",
      "player",
      "video",
      "hls"
    ],
    author: "Fernando Serrano Carpena <ferserc1@gmail.com>",
    license: "SEE LICENSE IN license.txt",
    bugs: {
      url: "https://github.com/polimediaupv/paella-core/issues"
    },
    homepage: "https://github.com/polimediaupv/paella-core#readme",
    devDependencies: {
      "@babel/core": "^7.12.10",
      "@babel/preset-env": "^7.12.11",
      "babel-loader": "^8.2.2",
      "copy-webpack-plugin": "^11.0.0",
      "css-loader": "^6.6.0",
      esbuild: "^0.14.47",
      "esbuild-plugin-import-glob": "^0.1.1",
      "file-loader": "^6.2.0",
      "html-webpack-plugin": "^5.5.0",
      "source-map-loader": "^4.0.0",
      "style-loader": "^3.3.1",
      "svg-inline-loader": "^0.8.2",
      webpack: "^5.66.0",
      "webpack-cli": "^4.9.1",
      "webpack-dev-server": "^4.7.3"
    },
    dependencies: {
      "core-js": "^3.8.2",
      "hls.js": "^1.0.4"
    }
  };

  // src/js/Paella.js
  console.log(Plugin_default);
  var PlayerState = {
    UNLOADED: 0,
    LOADING_MANIFEST: 1,
    MANIFEST: 2,
    LOADING_PLAYER: 3,
    LOADED: 4,
    UNLOADING_MANIFEST: 5,
    UNLOADING_PLAYER: 6,
    ERROR: 7
  };
  var PlayerStateNames = [
    "UNLOADED",
    "LOADING_MANIFEST",
    "MANIFEST",
    "LOADING_PLAYER",
    "LOADED",
    "UNLOADING_MANIFEST",
    "UNLOADING_PLAYER",
    "ERROR"
  ];
  function buildPreview() {
    const preview = resolveResourcePath(this, this.videoManifest?.metadata?.preview);
    this._previewContainer = new PreviewContainer(this, this._containerElement, preview);
  }
  var Paella = class {
    constructor(containerElement, initParams2 = {}) {
      this._log = new Log(this);
      this._packageData = package_default;
      this._log.setLevel(LOG_LEVEL.VERBOSE);
      window.__paella_instances__ = window.__paella_instances__ || [];
      window.__paella_instances__.push(this);
      this.log.debug("New paella player instance");
      if (typeof containerElement === "string") {
        containerElement = document.getElementById(containerElement);
      }
      containerElement.classList.add("player-container");
      this._containerElement = containerElement;
      this._initParams = initParams2;
      this._initParams.manifestFileName = this._initParams.manifestFileName || "data.json";
      this._initParams.loadConfig = this._initParams.loadConfig || defaultLoadConfigFunction;
      this._initParams.getVideoId = this._initParams.getVideoId || defaultGetVideoIdFunction;
      this._initParams.getManifestUrl = this._initParams.getManifestUrl || defaultGetManifestUrlFunction;
      this._initParams.getManifestFileUrl = this._initParams.getManifestFileUrl || defaultGetManifestFileUrlFunction;
      this._initParams.loadVideoManifest = this._initParams.loadVideoManifest || defaultLoadVideoManifestFunction;
      this._initParams.customPluginContext = this._initParams.customPluginContext || [];
      this._initParams.translateFunction = this._initParams.translateFunction || defaultTranslateFunction;
      this._initParams.getLanguageFunction = this._initParams.getLanguageFunction || defaultGetLanguageFunction;
      this._initParams.setLanguageFunction = this._initParams.setLanguageFunction || defaultSetLanguageFunction;
      this._initParams.addDictionaryFunction = this._initParams.addDictionaryFunction || defaultAddDictionaryFunction;
      this._initParams.loadDictionaries = this._initParams.loadDictionaries || async function(player) {
        addDictionary("en", {
          "Hello": "Hello",
          "World": "World"
        });
        addDictionary("es", {
          "Hello": "Hola",
          "World": "Mundo"
        });
        setLanguage(navigator.language.substring(0, 2));
      };
      setTranslateFunction(this._initParams.translateFunction);
      setSetLanguageFunction(this._initParams.setLanguageFunction);
      setGetLanguageFunction(this._initParams.getLanguageFunction);
      setAddDictionaryFunction(this._initParams.addDictionaryFunction);
      this._config = null;
      this._videoId = null;
      this._manifestUrl = null;
      this._manifestFileUrl = null;
      this._manifestData = null;
      this._videoManifest = null;
      this._playerLoaded = false;
      const resize = () => {
        this.resize();
      };
      window.addEventListener("resize", resize);
      this.containerElement.addEventListener("fullscreenchange", () => {
        triggerEvent(this, Events_default.FULLSCREEN_CHANGED, { status: this.isFullscreen });
      });
      this._playerState = PlayerState.UNLOADED;
    }
    get version() {
      return this._packageData.version;
    }
    get pluginModules() {
      return this.__pluginModules;
    }
    get log() {
      return this._log;
    }
    get ready() {
      return this._playerState === PlayerState.LOADED;
    }
    get state() {
      return this._playerState;
    }
    get stateText() {
      return PlayerStateNames[this.state];
    }
    get Events() {
      return Events_default;
    }
    translate(word, keys = null) {
      return translate(word, keys);
    }
    setLanguage(lang) {
      setLanguage(lang);
    }
    getLanguage() {
      return getLanguage();
    }
    addDictionary(lang, dict) {
      addDictionary(lang, dict);
    }
    bindEvent(eventName, fn, unregisterOnUnload = true) {
      bindEvent(this, eventName, (data) => fn(data), unregisterOnUnload);
    }
    getShortcuts() {
      return getShortcuts(this);
    }
    getPlugin(name, type = null) {
      if (type) {
        const plugins = this.__pluginData__.pluginInstances[type];
        if (plugins) {
          return plugins.find((p) => {
            if (p.name === name) {
              return p;
            }
          });
        }
      } else {
        const result = {};
        for (const t in this.__pluginData__.pluginInstances) {
          const instances = this.__pluginData__.pluginInstances[t];
          const p = instances.find((p2) => {
            if (p2.name === name) {
              return p2;
            }
          });
          if (p) {
            result[t] = p;
          }
        }
        return result;
      }
    }
    get hideUiTime() {
      return this._hideUiTime;
    }
    set hideUiTime(val) {
      this._hideUiTime = val;
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
    get configLoaded() {
      return this.configUrl !== null;
    }
    get videoManifestLoaded() {
      return this.videoManifest !== null;
    }
    get videoLoaded() {
      return this.videoContainer?.ready || false;
    }
    get playerLoaded() {
      return this._playerLoaded;
    }
    get configResourcesUrl() {
      return this._initParams?.configResourcesUrl || "config/";
    }
    get configUrl() {
      return this._initParams?.configUrl || "config/config.json";
    }
    get config() {
      return this._config;
    }
    get videoId() {
      return this._videoId;
    }
    get repositoryUrl() {
      return this._initParams?.repositoryUrl || this.config?.repositoryUrl || "";
    }
    get manifestUrl() {
      return this._manifestUrl;
    }
    get manifestFileName() {
      return this.config?.manifestFileName || this._initParams?.manifestFileName || "";
    }
    get manifestFileUrl() {
      return this._manifestFileUrl;
    }
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
    async loadManifest() {
      if (this._playerState !== PlayerState.UNLOADED) {
        throw new Error(this.translate("loadManifest(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
      }
      if (this._manifestLoaded)
        return;
      try {
        this._playerState = PlayerState.LOADING_MANIFEST;
        this._manifestLoaded = true;
        this.log.debug("Loading paella player");
        this._config = await this.initParams.loadConfig(this.configUrl, this);
        const urlSearch = new URLSearchParams(window.location.search);
        const urlParamLogLevel = urlSearch.get("logLevel");
        const logLevel = Array.from(Object.keys(LOG_LEVEL)).indexOf(urlParamLogLevel) !== -1 ? urlParamLogLevel : this._config.logLevel || "INFO";
        this._log.setLevel(logLevel);
        await this._initParams.loadDictionaries(this);
        registerPlugins(this);
        await loadLogEventPlugins(this);
        await loadKeyShortcutPlugins(this);
        this._videoId = await this.initParams.getVideoId(this._config, this);
        this._manifestUrl = await this.initParams.getManifestUrl(this.repositoryUrl, this.videoId, this._config, this);
        this._manifestFileUrl = await this.initParams.getManifestFileUrl(this._manifestUrl, this.manifestFileName, this._config, this);
        this.log.debug(`Loading video with identifier '${this.videoId}' from URL '${this.manifestFileUrl}'`);
        this._videoManifest = await this.initParams.loadVideoManifest(this.manifestFileUrl, this._config, this);
        this.log.debug("Video manifest loaded:");
        this.log.debug(this.videoManifest);
        this._data = new Data(this);
        for (const lang in default_dictionaries_default) {
          const dict = default_dictionaries_default[lang];
          addDictionary(lang, dict);
        }
        this._playerState = PlayerState.MANIFEST;
        triggerEvent(this, Events_default.MANIFEST_LOADED);
        if (!this.videoManifest?.metadata?.preview) {
          await this.loadPlayer();
        } else {
          buildPreview.apply(this);
        }
      } catch (err) {
        this._playerState = PlayerState.ERROR;
        console.error(err);
        this._errorContainer = new ErrorContainer(this, this.translate(err.message));
        throw err;
      }
    }
    async loadPlayer() {
      try {
        this._captionsCanvas = new CaptionCanvas(this, this._containerElement);
        if (this._playerState !== PlayerState.MANIFEST) {
          throw new Error(this.translate("loadPlayer(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
        }
        this._playerState = PlayerState.LOADING_PLAYER;
        this._previewContainer?.removeFromParent();
        this._loader = new Loader(this);
        this._videoContainer = new VideoContainer(this, this._containerElement);
        await this.videoContainer.load(this.videoManifest?.streams);
        triggerEvent(this, Events_default.STREAM_LOADED);
        this._playbackBar = new PlaybackBar(this, this.containerElement);
        await this._playbackBar.load();
        this._hideUiTime = 5e3;
        setupAutoHideUiTimer(this);
        this._captionsCanvas.load();
        this._playerState = PlayerState.LOADED;
        triggerEvent(this, Events_default.PLAYER_LOADED);
        this._loader.removeFromParent();
        this._loader = null;
      } catch (err) {
        this._playerState = PlayerState.ERROR;
        if (this._loader) {
          this._loader.removeFromParent();
          this._loader = null;
        }
        this._errorContainer = new ErrorContainer(this, err.message);
        throw err;
      }
    }
    async load() {
      switch (this.state) {
        case PlayerState.UNLOADED:
          await this.loadManifest();
          await this.loadPlayer();
          break;
        case PlayerState.MANIFEST:
          await this.loadPlayer();
          break;
        case PlayerState.LOADED:
          break;
        default:
          throw new Error(this.translate("Could not load player: state transition in progress: $1", [PlayerStateNames[this.state]]));
      }
    }
    async unload() {
      switch (this.state) {
        case PlayerState.UNLOADED:
          break;
        case PlayerState.MANIFEST:
          await this.unloadManifest();
          break;
        case PlayerState.LOADED:
        case PlayerState.ERROR:
          await this.unloadPlayer();
          await this.unloadManifest();
          break;
        default:
          throw new Error(this.translate("Could not unload player: state transition in progress: $1", [PlayerStateNames[this.state]]));
      }
    }
    async unloadManifest() {
      if (this._playerState !== PlayerState.MANIFEST && this._playerState !== PlayerState.ERROR) {
        throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
      }
      if (this._errorContainer) {
        this._errorContainer.removeFromParent();
        this._errorContainer = null;
      }
      this._playerState = PlayerState.UNLOADING_MANIFEST;
      this.log.debug("Unloading paella player");
      await unloadLogEventPlugins(this);
      await unloadKeyShortcutPlugins(this);
      await unregisterPlugins(this);
      this._manifestLoaded = false;
      this._previewContainer?.removeFromParent();
      this._playerState = PlayerState.UNLOADED;
    }
    async unloadPlayer() {
      if (this._playerState !== PlayerState.LOADED && this._playerState !== PlayerState.ERROR) {
        throw new Error(this.translate("unloadManifest(): Invalid current player state: $1", [PlayerStateNames[this._playerState]]));
      }
      if (this._errorContainer) {
        this._errorContainer.removeFromParent();
        this._errorContainer = null;
      }
      this._playerState = PlayerState.UNLOADING_PLAYER;
      await this._videoContainer?.unload();
      this._videoContainer = null;
      await this._playbackBar?.unload();
      this._playbackBar = null;
      this._captionsCanvas?.unload();
      this._captionsCanvas = null;
      clearAutoHideTimer(this);
      triggerEvent(this, Events_default.PLAYER_UNLOADED);
      PopUp.Unload();
      TimeLinePopUp.Unload(this);
      if (this.videoManifest?.metadata?.preview) {
        buildPreview.apply(this);
      }
      unregisterEvents(this);
      this._playerState = PlayerState.MANIFEST;
    }
    async reload(onUnloadFn = null) {
      switch (this.state) {
        case PlayerState.UNLOADED:
          break;
        case PlayerState.MANIFEST:
          await this.unloadManifest();
          break;
        case PlayerState.LOADED:
          await this.unload();
          break;
      }
      if (typeof onUnloadFn === "function") {
        await onUnloadFn();
      }
      await this.load();
    }
    async resize() {
      this.videoContainer?.updateLayout();
      this.playbackBar?.onResize();
      if (this.videoContainer) {
        const getSize = () => {
          return {
            w: this.videoContainer.element.offsetWidth,
            h: this.videoContainer.element.offsetHeight
          };
        };
        triggerEvent(this, Events_default.RESIZE, { size: getSize() });
        if (this._resizeEndTimer) {
          clearTimeout(this._resizeEndTimer);
        }
        this._resizeEndTimer = setTimeout(() => {
          triggerEvent(this, Events_default.RESIZE_END, { size: getSize() });
        }, 1e3);
      }
    }
    async hideUserInterface() {
      if (!await this.videoContainer?.paused()) {
        this._uiHidden = true;
        this.videoContainer?.hideUserInterface();
        this.playbackBar?.hideUserInterface();
        TimeLinePopUp.HideUserInterface(this);
        triggerEvent(this, Events_default.HIDE_UI);
      }
    }
    async showUserInterface() {
      this.videoContainer?.showUserInterface();
      this.playbackBar?.showUserInterface();
      TimeLinePopUp.ShowUserInterface(this);
      this._uiHidden && triggerEvent(this, Events_default.SHOW_UI);
      this._uiHidden = false;
    }
    async play() {
      if (!this.videoContainer) {
        await this.loadPlayer();
      }
      await this.videoContainer.play();
    }
    async pause() {
      await this.videoContainer?.pause();
    }
    async paused() {
      if (!this.videoContainer) {
        return true;
      } else {
        return this.videoContainer.paused();
      }
    }
    async stop() {
      await this.videoContainer?.stop();
    }
    async isFullScreenSupported() {
      return this.containerElement.requestFullscreen !== null;
    }
    async enterFullscreen() {
      if (this.containerElement.requestFullscreen) {
        return this.containerElement.requestFullscreen();
      }
    }
    async exitFullscreen() {
      if (document.exitFullscreen && this.isFullscreen) {
        return document.exitFullscreen();
      }
    }
    get isFullscreen() {
      return document.fullscreenElement === this.containerElement;
    }
  };

  // src/debug.js
  var g_currentLanguage = navigator.language.substring(0, 2);
  var initParams = {
    loadVideoManifest: async function(videoManifestUrl, config, player) {
      player.log.debug(config);
      return await defaultLoadVideoManifestFunction(videoManifestUrl, config, player);
    },
    setLanguageFunction: (lang) => g_currentLanguage = lang,
    getLanguageFunction: () => g_currentLanguage,
    translateFunction: (word) => {
      return default_dictionaries_default[g_currentLanguage] && default_dictionaries_default[g_currentLanguage][word] || word;
    },
    addDictionaryFunction: (lang, dict) => {
      default_dictionaries_default[lang] = default_dictionaries_default[lang] || {};
      for (const key in dict) {
        const translation = dict[key];
        default_dictionaries_default[lang][key] = translation;
      }
    },
    loadDictionaries: (player) => {
      setLanguage("es");
      addDictionary("es", {
        "Rice": "Arroz",
        "Chicken": "Pollo",
        "Hello": "Hola",
        "World": "Mundo",
        "Test popup button": "Bot\xF3n desplegable de prueba"
      });
      player.setLanguage("es");
      player.addDictionary("es", {
        "Rice": "Arroz",
        "Chicken": "Pollo",
        "Hello": "Hola",
        "World": "Mundo",
        "Test popup button": "Bot\xF3n desplegable de prueba"
      });
    }
  };
  window.onload = async () => {
    let paella = new Paella("player-container", initParams);
    window.onhashchange = async (event) => {
      await paella.unload();
      await paella.loadManifest();
    };
    bindEvent(paella, Events_default.BUTTON_PRESS, (params) => {
      paella.log.debug(params);
    }, false);
    bindEvent(paella, Events_default.SHOW_POPUP, (params) => {
      paella.log.debug("Show popup");
      paella.log.debug(params);
    }, false);
    bindEvent(paella, Events_default.HIDE_POPUP, (params) => {
      paella.log.debug("Hide popup");
      paella.log.debug(params);
    }, false);
    bindEvent(paella, Events_default.MANIFEST_LOADED, () => {
      paella.log.debug("Video manifest loaded");
    }, false);
    bindEvent(paella, Events_default.LAYOUT_CHANGED, () => {
      paella.log.debug("Layout changed");
    }, false);
    bindEvent(paella, Events_default.VOLUME_CHANGED, () => {
      paella.log.debug("Volume changed");
    }, false);
    bindEvent(paella, Events_default.PLAYER_LOADED, () => {
      paella.log.debug("============================== Player loaded =================================");
    }, false);
    bindEvent(paella, Events_default.HIDE_UI, () => {
      paella.log.debug("Hide user interface");
    }, false);
    bindEvent(paella, Events_default.SHOW_UI, () => {
      paella.log.debug("Show user interface");
    }, false);
    paella.loadManifest().then(() => paella.log.debug(`${paella.translate("Rice")} ${paella.translate("Chicken")}`)).catch((e) => paella.log.error(e));
  };
})();
//# sourceMappingURL=paella-core.js.map
