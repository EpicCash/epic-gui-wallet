"use strict";
const require$$3$1 = require("electron");
const require$$1$1 = require("child_process");
const require$$0$1 = require("path");
const require$$0 = require("tty");
const require$$1 = require("util");
const require$$3 = require("fs");
const require$$4 = require("net");
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var src = { exports: {} };
var browser = { exports: {} };
var debug$1 = { exports: {} };
var ms;
var hasRequiredMs;
function requireMs() {
  if (hasRequiredMs) return ms;
  hasRequiredMs = 1;
  var s = 1e3;
  var m = s * 60;
  var h = m * 60;
  var d = h * 24;
  var y = d * 365.25;
  ms = function(val, options) {
    options = options || {};
    var type = typeof val;
    if (type === "string" && val.length > 0) {
      return parse(val);
    } else if (type === "number" && isNaN(val) === false) {
      return options.long ? fmtLong(val) : fmtShort(val);
    }
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(val)
    );
  };
  function parse(str) {
    str = String(str);
    if (str.length > 100) {
      return;
    }
    var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
      str
    );
    if (!match) {
      return;
    }
    var n = parseFloat(match[1]);
    var type = (match[2] || "ms").toLowerCase();
    switch (type) {
      case "years":
      case "year":
      case "yrs":
      case "yr":
      case "y":
        return n * y;
      case "days":
      case "day":
      case "d":
        return n * d;
      case "hours":
      case "hour":
      case "hrs":
      case "hr":
      case "h":
        return n * h;
      case "minutes":
      case "minute":
      case "mins":
      case "min":
      case "m":
        return n * m;
      case "seconds":
      case "second":
      case "secs":
      case "sec":
      case "s":
        return n * s;
      case "milliseconds":
      case "millisecond":
      case "msecs":
      case "msec":
      case "ms":
        return n;
      default:
        return void 0;
    }
  }
  function fmtShort(ms2) {
    if (ms2 >= d) {
      return Math.round(ms2 / d) + "d";
    }
    if (ms2 >= h) {
      return Math.round(ms2 / h) + "h";
    }
    if (ms2 >= m) {
      return Math.round(ms2 / m) + "m";
    }
    if (ms2 >= s) {
      return Math.round(ms2 / s) + "s";
    }
    return ms2 + "ms";
  }
  function fmtLong(ms2) {
    return plural(ms2, d, "day") || plural(ms2, h, "hour") || plural(ms2, m, "minute") || plural(ms2, s, "second") || ms2 + " ms";
  }
  function plural(ms2, n, name) {
    if (ms2 < n) {
      return;
    }
    if (ms2 < n * 1.5) {
      return Math.floor(ms2 / n) + " " + name;
    }
    return Math.ceil(ms2 / n) + " " + name + "s";
  }
  return ms;
}
var hasRequiredDebug;
function requireDebug() {
  if (hasRequiredDebug) return debug$1.exports;
  hasRequiredDebug = 1;
  (function(module, exports$1) {
    exports$1 = module.exports = createDebug.debug = createDebug["default"] = createDebug;
    exports$1.coerce = coerce;
    exports$1.disable = disable;
    exports$1.enable = enable;
    exports$1.enabled = enabled;
    exports$1.humanize = requireMs();
    exports$1.names = [];
    exports$1.skips = [];
    exports$1.formatters = {};
    var prevTime;
    function selectColor(namespace) {
      var hash = 0, i;
      for (i in namespace) {
        hash = (hash << 5) - hash + namespace.charCodeAt(i);
        hash |= 0;
      }
      return exports$1.colors[Math.abs(hash) % exports$1.colors.length];
    }
    function createDebug(namespace) {
      function debug2() {
        if (!debug2.enabled) return;
        var self = debug2;
        var curr = +/* @__PURE__ */ new Date();
        var ms2 = curr - (prevTime || curr);
        self.diff = ms2;
        self.prev = prevTime;
        self.curr = curr;
        prevTime = curr;
        var args = new Array(arguments.length);
        for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i];
        }
        args[0] = exports$1.coerce(args[0]);
        if ("string" !== typeof args[0]) {
          args.unshift("%O");
        }
        var index = 0;
        args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
          if (match === "%%") return match;
          index++;
          var formatter = exports$1.formatters[format];
          if ("function" === typeof formatter) {
            var val = args[index];
            match = formatter.call(self, val);
            args.splice(index, 1);
            index--;
          }
          return match;
        });
        exports$1.formatArgs.call(self, args);
        var logFn = debug2.log || exports$1.log || console.log.bind(console);
        logFn.apply(self, args);
      }
      debug2.namespace = namespace;
      debug2.enabled = exports$1.enabled(namespace);
      debug2.useColors = exports$1.useColors();
      debug2.color = selectColor(namespace);
      if ("function" === typeof exports$1.init) {
        exports$1.init(debug2);
      }
      return debug2;
    }
    function enable(namespaces) {
      exports$1.save(namespaces);
      exports$1.names = [];
      exports$1.skips = [];
      var split = (typeof namespaces === "string" ? namespaces : "").split(/[\s,]+/);
      var len = split.length;
      for (var i = 0; i < len; i++) {
        if (!split[i]) continue;
        namespaces = split[i].replace(/\*/g, ".*?");
        if (namespaces[0] === "-") {
          exports$1.skips.push(new RegExp("^" + namespaces.substr(1) + "$"));
        } else {
          exports$1.names.push(new RegExp("^" + namespaces + "$"));
        }
      }
    }
    function disable() {
      exports$1.enable("");
    }
    function enabled(name) {
      var i, len;
      for (i = 0, len = exports$1.skips.length; i < len; i++) {
        if (exports$1.skips[i].test(name)) {
          return false;
        }
      }
      for (i = 0, len = exports$1.names.length; i < len; i++) {
        if (exports$1.names[i].test(name)) {
          return true;
        }
      }
      return false;
    }
    function coerce(val) {
      if (val instanceof Error) return val.stack || val.message;
      return val;
    }
  })(debug$1, debug$1.exports);
  return debug$1.exports;
}
var hasRequiredBrowser;
function requireBrowser() {
  if (hasRequiredBrowser) return browser.exports;
  hasRequiredBrowser = 1;
  (function(module, exports$1) {
    exports$1 = module.exports = requireDebug();
    exports$1.log = log;
    exports$1.formatArgs = formatArgs;
    exports$1.save = save;
    exports$1.load = load;
    exports$1.useColors = useColors;
    exports$1.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : localstorage();
    exports$1.colors = [
      "lightseagreen",
      "forestgreen",
      "goldenrod",
      "dodgerblue",
      "darkorchid",
      "crimson"
    ];
    function useColors() {
      if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
        return true;
      }
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // is firebug? http://stackoverflow.com/a/398120/376773
      typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || // double check webkit in userAgent just in case we are in a worker
      typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    exports$1.formatters.j = function(v) {
      try {
        return JSON.stringify(v);
      } catch (err) {
        return "[UnexpectedJSONParseError]: " + err.message;
      }
    };
    function formatArgs(args) {
      var useColors2 = this.useColors;
      args[0] = (useColors2 ? "%c" : "") + this.namespace + (useColors2 ? " %c" : " ") + args[0] + (useColors2 ? "%c " : " ") + "+" + exports$1.humanize(this.diff);
      if (!useColors2) return;
      var c = "color: " + this.color;
      args.splice(1, 0, c, "color: inherit");
      var index = 0;
      var lastC = 0;
      args[0].replace(/%[a-zA-Z%]/g, function(match) {
        if ("%%" === match) return;
        index++;
        if ("%c" === match) {
          lastC = index;
        }
      });
      args.splice(lastC, 0, c);
    }
    function log() {
      return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
    }
    function save(namespaces) {
      try {
        if (null == namespaces) {
          exports$1.storage.removeItem("debug");
        } else {
          exports$1.storage.debug = namespaces;
        }
      } catch (e) {
      }
    }
    function load() {
      var r;
      try {
        r = exports$1.storage.debug;
      } catch (e) {
      }
      if (!r && typeof process !== "undefined" && "env" in process) {
        r = process.env.DEBUG;
      }
      return r;
    }
    exports$1.enable(load());
    function localstorage() {
      try {
        return window.localStorage;
      } catch (e) {
      }
    }
  })(browser, browser.exports);
  return browser.exports;
}
var node = { exports: {} };
var hasRequiredNode;
function requireNode() {
  if (hasRequiredNode) return node.exports;
  hasRequiredNode = 1;
  (function(module, exports$1) {
    var tty = require$$0;
    var util = require$$1;
    exports$1 = module.exports = requireDebug();
    exports$1.init = init;
    exports$1.log = log;
    exports$1.formatArgs = formatArgs;
    exports$1.save = save;
    exports$1.load = load;
    exports$1.useColors = useColors;
    exports$1.colors = [6, 2, 3, 4, 5, 1];
    exports$1.inspectOpts = Object.keys(process.env).filter(function(key) {
      return /^debug_/i.test(key);
    }).reduce(function(obj, key) {
      var prop = key.substring(6).toLowerCase().replace(/_([a-z])/g, function(_, k) {
        return k.toUpperCase();
      });
      var val = process.env[key];
      if (/^(yes|on|true|enabled)$/i.test(val)) val = true;
      else if (/^(no|off|false|disabled)$/i.test(val)) val = false;
      else if (val === "null") val = null;
      else val = Number(val);
      obj[prop] = val;
      return obj;
    }, {});
    var fd = parseInt(process.env.DEBUG_FD, 10) || 2;
    if (1 !== fd && 2 !== fd) {
      util.deprecate(function() {
      }, "except for stderr(2) and stdout(1), any other usage of DEBUG_FD is deprecated. Override debug.log if you want to use a different log function (https://git.io/debug_fd)")();
    }
    var stream = 1 === fd ? process.stdout : 2 === fd ? process.stderr : createWritableStdioStream(fd);
    function useColors() {
      return "colors" in exports$1.inspectOpts ? Boolean(exports$1.inspectOpts.colors) : tty.isatty(fd);
    }
    exports$1.formatters.o = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts).split("\n").map(function(str) {
        return str.trim();
      }).join(" ");
    };
    exports$1.formatters.O = function(v) {
      this.inspectOpts.colors = this.useColors;
      return util.inspect(v, this.inspectOpts);
    };
    function formatArgs(args) {
      var name = this.namespace;
      var useColors2 = this.useColors;
      if (useColors2) {
        var c = this.color;
        var prefix = "  \x1B[3" + c + ";1m" + name + " \x1B[0m";
        args[0] = prefix + args[0].split("\n").join("\n" + prefix);
        args.push("\x1B[3" + c + "m+" + exports$1.humanize(this.diff) + "\x1B[0m");
      } else {
        args[0] = (/* @__PURE__ */ new Date()).toUTCString() + " " + name + " " + args[0];
      }
    }
    function log() {
      return stream.write(util.format.apply(util, arguments) + "\n");
    }
    function save(namespaces) {
      if (null == namespaces) {
        delete process.env.DEBUG;
      } else {
        process.env.DEBUG = namespaces;
      }
    }
    function load() {
      return process.env.DEBUG;
    }
    function createWritableStdioStream(fd2) {
      var stream2;
      var tty_wrap = process.binding("tty_wrap");
      switch (tty_wrap.guessHandleType(fd2)) {
        case "TTY":
          stream2 = new tty.WriteStream(fd2);
          stream2._type = "tty";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        case "FILE":
          var fs = require$$3;
          stream2 = new fs.SyncWriteStream(fd2, { autoClose: false });
          stream2._type = "fs";
          break;
        case "PIPE":
        case "TCP":
          var net = require$$4;
          stream2 = new net.Socket({
            fd: fd2,
            readable: false,
            writable: true
          });
          stream2.readable = false;
          stream2.read = null;
          stream2._type = "pipe";
          if (stream2._handle && stream2._handle.unref) {
            stream2._handle.unref();
          }
          break;
        default:
          throw new Error("Implement me. Unknown stream file type!");
      }
      stream2.fd = fd2;
      stream2._isStdio = true;
      return stream2;
    }
    function init(debug2) {
      debug2.inspectOpts = {};
      var keys = Object.keys(exports$1.inspectOpts);
      for (var i = 0; i < keys.length; i++) {
        debug2.inspectOpts[keys[i]] = exports$1.inspectOpts[keys[i]];
      }
    }
    exports$1.enable(load());
  })(node, node.exports);
  return node.exports;
}
if (typeof process !== "undefined" && process.type === "renderer") {
  src.exports = requireBrowser();
} else {
  src.exports = requireNode();
}
var srcExports = src.exports;
var path$1 = require$$0$1;
var spawn = require$$1$1.spawn;
var debug = srcExports("electron-squirrel-startup");
var app = require$$3$1.app;
var run = function(args, done) {
  var updateExe = path$1.resolve(path$1.dirname(process.execPath), "..", "Update.exe");
  debug("Spawning `%s` with args `%s`", updateExe, args);
  spawn(updateExe, args, {
    detached: true
  }).on("close", done);
};
var check = function() {
  if (process.platform === "win32") {
    var cmd = process.argv[1];
    debug("processing squirrel command `%s`", cmd);
    var target = path$1.basename(process.execPath);
    if (cmd === "--squirrel-install" || cmd === "--squirrel-updated") {
      run(["--createShortcut=" + target], app.quit);
      return true;
    }
    if (cmd === "--squirrel-uninstall") {
      run(["--removeShortcut=" + target], app.quit);
      return true;
    }
    if (cmd === "--squirrel-obsolete") {
      app.quit();
      return true;
    }
  }
  return false;
};
var electronSquirrelStartup = check();
const started = /* @__PURE__ */ getDefaultExportFromCjs(electronSquirrelStartup);
if (started) {
  require$$3$1.app.quit();
}
const isDevelopment = process.env.NODE_ENV !== "production";
const path = require("path");
const ps = require("ps-node");
const findProcess = require("find-process");
let win;
let noderuninbackground = false;
let epicboxruninbackground = false;
async function kill(pid) {
  return new Promise(function(resolve, reject) {
    if (process.platform === "win32") {
      require$$1$1.exec(`taskkill /pid ${pid} /f /t`, function(err) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    } else {
      ps.kill(pid, { timeout: 3 }, function(err) {
        if (err) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    }
  });
}
require$$3$1.app.disableHardwareAcceleration();
require$$3$1.protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);
const createWindow = () => {
  win = new require$$3$1.BrowserWindow({
    width: 1044,
    height: 768,
    minWidth: 1044,
    maxWidth: 1600,
    title: "Epiccash Wallet",
    //fix in index.html
    webPreferences: {
      //icon: path.join(__dirname, '../public/favicon.ico'),
      // Use pluginOptions.nodeIntegration, leave this alone
      // See nklayman.github.io/vue-cli-plugin-electron-builder/guide/security.html#node-integration for more info
      // nodeIntegration: false,
      nodeIntegration: true,
      preload: path.join(__dirname, "preload.js")
    }
  });
  {
    win.loadURL("http://localhost:5173");
  }
  win.webContents.openDevTools();
  if (!isDevelopment) {
    if (process.platform == "darwin") {
      var menu = require$$3$1.Menu.buildFromTemplate([
        {
          label: "Menu",
          submenu: [
            { label: "About Application", selector: "orderFrontStandardAboutPanel:" },
            {
              label: "Source on GitHub",
              click() {
                require$$3$1.shell.openExternal("https://github.com/EpicCash/epic-gui-wallet");
              }
            },
            { type: "separator" },
            {
              label: "Quit",
              accelerator: "CmdOrCtrl+Q",
              async click() {
                let killPromise = [];
                let killPids = [];
                let pEpicnodeList = [];
                let pWalletList = await findProcess("name", /.*?epic-wallet.*(owner_api|listen|scan)/);
                if (epicboxruninbackground) {
                  for (let process2 of pWalletList) {
                    if ((process2.cmd.includes("owner_api") || process2.cmd.includes("listen") || process2.cmd.includes("scan")) && !process2.cmd.includes("epicbox")) {
                      console.log("process kill without epicbox background", process2);
                      killPids.push(process2);
                    }
                  }
                } else {
                  for (let process2 of pWalletList) {
                    if (process2.cmd.includes("owner_api") || process2.cmd.includes("listen") || process2.cmd.includes("scan")) {
                      console.log("process kill all background", process2);
                      killPids.push(process2);
                    }
                  }
                }
                if (noderuninbackground == false) {
                  pEpicnodeList = await findProcess("name", /.*?epic.*server.*run/);
                }
                let pNgrokList = await findProcess("name", /.*?ngrok.*(start)/);
                let pWalletTorList = await findProcess("name", /tor/);
                for (let process2 of pEpicnodeList) {
                  if (process2.cmd.includes("server")) {
                    killPids.push(process2);
                  }
                }
                for (let process2 of pNgrokList) {
                  if (process2.cmd.includes("ngrok")) {
                    killPids.push(process2);
                  }
                }
                for (let process2 of pWalletTorList) {
                  if (process2.cmd.includes("tor/listener/torrc")) {
                    killPids.push(process2);
                  }
                }
                if (killPids.length) {
                  for (let process2 of killPids) {
                    killPromise.push(kill(process2.pid));
                  }
                  await Promise.all(killPromise);
                }
                require$$3$1.app.quit();
              }
            }
          ]
        },
        {
          label: "Application",
          submenu: [
            {
              label: "Edit",
              submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
              ]
            }
          ]
        }
      ]);
    } else {
      var menu = require$$3$1.Menu.buildFromTemplate([
        {
          label: "Menu",
          submenu: [
            {
              label: "Source on GitHub",
              click() {
                require$$3$1.shell.openExternal("https://github.com/EpicCash/epic-gui-wallet");
              }
            },
            { type: "separator" },
            {
              label: "Quit",
              accelerator: "CmdOrCtrl+Q",
              async click() {
                let killPromise = [];
                let killPids = [];
                let pEpicnodeList = [];
                let pWalletList = await findProcess("name", /.*?epic-wallet.*(owner_api|listen|scan)/);
                if (epicboxruninbackground) {
                  for (let process2 of pWalletList) {
                    if ((process2.cmd.includes("owner_api") || process2.cmd.includes("listen") || process2.cmd.includes("scan")) && !process2.cmd.includes("epicbox")) {
                      console.log("process kill without epicbox background", process2);
                      killPids.push(process2);
                    }
                  }
                } else {
                  for (let process2 of pWalletList) {
                    if (process2.cmd.includes("owner_api") || process2.cmd.includes("listen") || process2.cmd.includes("scan")) {
                      console.log("process kill all background", process2);
                      killPids.push(process2);
                    }
                  }
                }
                if (noderuninbackground == false) {
                  pEpicnodeList = await findProcess("name", /.*?epic.*server.*run/);
                }
                let pNgrokList = await findProcess("name", /.*?ngrok.*(start)/);
                let pWalletTorList = await findProcess("name", /tor/);
                for (let process2 of pEpicnodeList) {
                  if (process2.cmd.includes("server")) {
                    killPids.push(process2);
                  }
                }
                for (let process2 of pNgrokList) {
                  if (process2.cmd.includes("ngrok")) {
                    killPids.push(process2);
                  }
                }
                for (let process2 of pWalletTorList) {
                  if (process2.cmd.includes("tor/listener/torrc")) {
                    killPids.push(process2);
                  }
                }
                if (killPids.length) {
                  for (let process2 of killPids) {
                    killPromise.push(kill(process2.pid));
                  }
                  await Promise.all(killPromise);
                }
                require$$3$1.app.quit();
              }
            }
          ]
        },
        {
          label: "Application",
          submenu: [
            {
              label: "Edit",
              submenu: [
                { label: "Undo", accelerator: "CmdOrCtrl+Z", selector: "undo:" },
                { label: "Redo", accelerator: "Shift+CmdOrCtrl+Z", selector: "redo:" },
                { type: "separator" },
                { label: "Cut", accelerator: "CmdOrCtrl+X", selector: "cut:" },
                { label: "Copy", accelerator: "CmdOrCtrl+C", selector: "copy:" },
                { label: "Paste", accelerator: "CmdOrCtrl+V", selector: "paste:" },
                { label: "Select All", accelerator: "CmdOrCtrl+A", selector: "selectAll:" }
              ]
            }
          ]
        }
      ]);
    }
    require$$3$1.Menu.setApplicationMenu(menu);
  } else {
    console.log(win);
  }
};
require$$3$1.app.whenReady().then(() => {
  createWindow();
  require$$3$1.app.on("activate", () => {
    if (require$$3$1.BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});
require$$3$1.app.on("window-all-closed", async () => {
  if (process.platform !== "darwin") {
    let killPromise = [];
    let killPids = [];
    let pEpicnodeList = [];
    let pWalletList = await findProcess("name", /.*?epic-wallet.*(owner_api|listen|scan)/);
    if (epicboxruninbackground) {
      for (let process2 of pWalletList) {
        if ((process2.cmd.includes("owner_api") || process2.cmd.includes("listen") || process2.cmd.includes("scan")) && !process2.cmd.includes("epicbox")) {
          console.log("process kill without epicbox background", process2);
          killPids.push(process2);
        }
      }
    } else {
      for (let process2 of pWalletList) {
        if (process2.cmd.includes("owner_api") || process2.cmd.includes("listen") || process2.cmd.includes("scan")) {
          console.log("process kill all background", process2);
          killPids.push(process2);
        }
      }
    }
    if (noderuninbackground == false) {
      pEpicnodeList = await findProcess("name", /.*?epic.*server.*run/);
    }
    let pNgrokList = await findProcess("name", /.*?ngrok.*(start)/);
    for (let process2 of pEpicnodeList) {
      if (process2.cmd.includes("server")) {
        killPids.push(process2);
      }
    }
    for (let process2 of pNgrokList) {
      if (process2.cmd.includes("ngrok")) {
        killPids.push(process2);
      }
    }
    if (killPids.length) {
      for (let process2 of killPids) {
        killPromise.push(kill(process2.pid));
      }
      await Promise.all(killPromise);
    }
    require$$3$1.app.quit();
  }
});
require$$3$1.app.on("activate", () => {
  if (require$$3$1.BrowserWindow.getAllWindows().length === 0) createWindow();
});
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        require$$3$1.app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      require$$3$1.app.quit();
    });
  }
}
require$$3$1.ipcMain.handle("show-save-dialog", async (event, title, message, defaultPath) => {
  let responce = await require$$3$1.dialog.showSaveDialog({
    title,
    message,
    defaultPath
  });
  return responce;
});
require$$3$1.ipcMain.handle("show-open-dialog", async (event, title, message, defaultPath) => {
  let responce = await require$$3$1.dialog.showOpenDialog({
    properties: ["openDirectory", "showHiddenFiles", "createDirectory"]
  });
  return responce;
});
require$$3$1.ipcMain.handle("locale", async () => {
  return await require$$3$1.app.getLocale();
});
require$$3$1.ipcMain.handle("version", () => {
  let currentVersion = "";
  if (process.env.NODE_ENV === "development") {
    currentVersion = require("../package.json").version;
  } else {
    currentVersion = require$$3$1.remote.app.getVersion();
  }
  return currentVersion;
});
require$$3$1.ipcMain.handle("resize", (event, width, height) => {
  let browserWindow = require$$3$1.BrowserWindow.fromWebContents(event.sender);
  browserWindow.setSize(width, height);
});
require$$3$1.ipcMain.on("scan-stdout", (event, data) => {
  event.reply("scan-stdout", { data });
});
require$$3$1.ipcMain.on("firstscan-stdout", (event, data) => {
  event.reply("firstscan-stdout", { data });
});
require$$3$1.ipcMain.on("scan-finish", (event, data) => {
  event.reply("scan-finish", { data });
});
require$$3$1.ipcMain.on("scan-error", (event, data) => {
  event.reply("scan-error", { data });
});
require$$3$1.ipcMain.on("walletCreated", (event, data) => {
  event.reply("walletCreated", { data });
});
require$$3$1.ipcMain.on("walletExisted", (event, data) => {
  event.reply("walletExisted", {});
});
require$$3$1.ipcMain.on("walletCreateFailed", (event, data) => {
  event.reply("walletCreateFailed", {});
});
require$$3$1.ipcMain.on("nodeBackground", (event, data) => {
  noderuninbackground = data;
});
require$$3$1.ipcMain.on("epicboxBackground", (event, data) => {
  epicboxruninbackground = data;
});
