require('./sourcemap-register.js');module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(104);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 70:
/***/ (function(module) {

"use strict";


/**
 * findValue
 * Finds the value at given path in the specified object.
 *
 * @name findValue
 * @function
 * @param {Object} obj The input object.
 * @param {String} path The path to the value you want to find.
 * @return {Anything} The path value.
 */
module.exports = function findValue(obj, path) {
    var dotIndex = path.indexOf(".");

    if (!~dotIndex) {
        if (obj === undefined || obj === null) {
            return undefined;
        }
        return obj[path];
    }

    var field = path.substring(0, dotIndex),
        rest = path.substring(dotIndex + 1);

    if (obj === undefined || obj === null) {
        return undefined;
    }

    obj = obj[field];
    if (!rest) {
        return obj;
    }
    return findValue(obj, rest);
};

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 104:
/***/ (function(__unusedmodule, __unusedexports, __webpack_require__) {

const core = __webpack_require__(470);
const sign = __webpack_require__(166);


async function run() {
  try {
    /// Get inputs.
    core.info('Getting input variables...');
    const user = core.getInput('user');
    const message = core.getInput('message');

    /// Sign profile.
    core.info(`Signing under \"${user}\", with message \"${message}\"...`);
    await sign(user, message);

    /// Complete action.
    core.info((new Date()).toTimeString());
    core.setOutput('time', new Date().toTimeString());
  } 
  catch (error) {
    /// Log the error.
    core.setFailed(error.message);
  }
}

run();


/***/ }),

/***/ 166:
/***/ (function(module, __unusedexports, __webpack_require__) {

const editJsonFile = __webpack_require__(827);

let sign = function (user, message) {
  return new Promise((resolve) => {
      // Create the guestbook if it doesn't exist.
      let file = editJsonFile(`${__dirname}/guestbook.json`);
      file.save();
      
      // Reload it from the disk.
      file = editJsonFile(`${__dirname}/guestbook.json`, {
          autosave: true
      });
      
      // Add to the guestbook.
      file.set("a.new.field.as.object", {
          user: user,
		  message: message,
      });
	  
	  // Output the guestbook.
      console.log(file.toObject());
  });
};

module.exports = sign;


/***/ }),

/***/ 359:
/***/ (function(module) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * iterateObject
 * Iterates an object. Note the object field order may differ.
 *
 * @name iterateObject
 * @function
 * @param {Object} obj The input object.
 * @param {Function} fn A function that will be called with the current value, field name and provided object.
 * @return {Function} The `iterateObject` function.
 */
function iterateObject(obj, fn) {
    var i = 0,
        keys = [];

    if (Array.isArray(obj)) {
        for (; i < obj.length; ++i) {
            if (fn(obj[i], i, obj) === false) {
                break;
            }
        }
    } else if ((typeof obj === "undefined" ? "undefined" : _typeof(obj)) === "object" && obj !== null) {
        keys = Object.keys(obj);
        for (; i < keys.length; ++i) {
            if (fn(obj[keys[i]], keys[i], obj) === false) {
                break;
            }
        }
    }
}

module.exports = iterateObject;

/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
function escapeData(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 459:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*!
 * set-value <https://github.com/jonschlinkert/set-value>
 *
 * Copyright (c) 2014-2018, Jon Schlinkert.
 * Released under the MIT License.
 */



const isPlain = __webpack_require__(960);

function set(target, path, value, options) {
  if (!isObject(target)) {
    return target;
  }

  let opts = options || {};
  const isArray = Array.isArray(path);
  if (!isArray && typeof path !== 'string') {
    return target;
  }

  let merge = opts.merge;
  if (merge && typeof merge !== 'function') {
    merge = Object.assign;
  }

  const keys = (isArray ? path : split(path, opts)).filter(isValidKey);
  const len = keys.length;
  const orig = target;

  if (!options && keys.length === 1) {
    result(target, keys[0], value, merge);
    return target;
  }

  for (let i = 0; i < len; i++) {
    let prop = keys[i];

    if (!isObject(target[prop])) {
      target[prop] = {};
    }

    if (i === len - 1) {
      result(target, prop, value, merge);
      break;
    }

    target = target[prop];
  }

  return orig;
}

function result(target, path, value, merge) {
  if (merge && isPlain(target[path]) && isPlain(value)) {
    target[path] = merge({}, target[path], value);
  } else {
    target[path] = value;
  }
}

function split(path, options) {
  const id = createKey(path, options);
  if (set.memo[id]) return set.memo[id];

  const char = (options && options.separator) ? options.separator : '.';
  let keys = [];
  let res = [];

  if (options && typeof options.split === 'function') {
    keys = options.split(path);
  } else {
    keys = path.split(char);
  }

  for (let i = 0; i < keys.length; i++) {
    let prop = keys[i];
    while (prop && prop.slice(-1) === '\\' && keys[i + 1] != null) {
      prop = prop.slice(0, -1) + char + keys[++i];
    }
    res.push(prop);
  }
  set.memo[id] = res;
  return res;
}

function createKey(pattern, options) {
  let id = pattern;
  if (typeof options === 'undefined') {
    return id + '';
  }
  const keys = Object.keys(options);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    id += ';' + key + '=' + String(options[key]);
  }
  return id;
}

function isValidKey(key) {
  return key !== '__proto__' && key !== 'constructor' && key !== 'prototype';
}

function isObject(val) {
  return val !== null && (typeof val === 'object' || typeof val === 'function');
}

set.memo = {};
module.exports = set;


/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = command_1.toCommandValue(val);
    process.env[name] = convertedVal;
    command_1.issueCommand('set-env', { name }, convertedVal);
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    command_1.issueCommand('add-path', {}, inputPath);
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 776:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


// Dependencies
var Fs = __webpack_require__(747);

/**
 * rJson
 *
 * @name rJson
 * @function
 * @param {String} path The JSON file path.
 * @param {Function} callback An optional callback. If not passed, the function will run in sync mode.
 */
function rJson(path, callback) {

    if (typeof callback === "function") {
        Fs.readFile(path, "utf-8", function (err, data) {
            try {
                data = JSON.parse(data);
            } catch (e) {
                err = err || e;
            }
            callback(err, data);
        });
        return;
    }

    return JSON.parse(Fs.readFileSync(path));
}

module.exports = rJson;

/***/ }),

/***/ 782:
/***/ (function(module) {

"use strict";
/*!
 * isobject <https://github.com/jonschlinkert/isobject>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



module.exports = function isObject(val) {
  return val != null && typeof val === 'object' && Array.isArray(val) === false;
};


/***/ }),

/***/ 827:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var findValue = __webpack_require__(70),
    setValue = __webpack_require__(459),
    rJson = __webpack_require__(776),
    fs = __webpack_require__(747),
    iterateObject = __webpack_require__(359),
    os = __webpack_require__(87);

var JsonEditor = function () {

    /**
     * JsonEditor
     *
     * @name JsonEditor
     * @function
     * @param {String} path The path to the JSON file.
     * @param {Object} options An object containing the following fields:
     *
     *  - `stringify_width` (Number): The JSON stringify indent width (default: `2`).
     *  - `stringify_fn` (Function): A function used by `JSON.stringify`.
     *  - `stringify_eol` (Boolean): Wheter to add the new line at the end of the file or not (default: `false`)
     *  - `autosave` (Boolean): Save the file when setting some data in it.
     *
     * @returns {JsonEditor} The `JsonEditor` instance.
     */
    function JsonEditor(path, options) {
        _classCallCheck(this, JsonEditor);

        this.options = options = options || {};
        options.stringify_width = options.stringify_width || 2;
        options.stringify_fn = options.stringify_fn || null;
        options.stringify_eol = options.stringify_eol || false;
        this.path = path;
        this.data = this.read();
    }

    /**
     * set
     * Set a value in a specific path.
     *
     * @name set
     * @function
     * @param {String} path The object path.
     * @param {Anything} value The value.
     * @returns {JsonEditor} The `JsonEditor` instance.
     */


    _createClass(JsonEditor, [{
        key: "set",
        value: function set(path, value) {
            var _this = this;

            if ((typeof path === "undefined" ? "undefined" : _typeof(path)) === "object") {
                iterateObject(path, function (val, n) {
                    setValue(_this.data, n, val);
                });
            } else {
                setValue(this.data, path, value);
            }
            if (this.options.autosave) {
                this.save();
            }
            return this;
        }

        /**
         * get
         * Get a value in a specific path.
         *
         * @name get
         * @function
         * @param {String} path
         * @returns {Value} The object path value.
         */

    }, {
        key: "get",
        value: function get(path) {
            if (path) {
                return findValue(this.data, path);
            }
            return this.toObject();
        }

        /**
         * unset
         * Remove a path from a JSON object.
         *
         * @name unset
         * @function
         * @param {String} path The object path.
         * @returns {JsonEditor} The `JsonEditor` instance.
         */

    }, {
        key: "unset",
        value: function unset(path) {
            return this.set(path, undefined);
        }

        /**
         * read
         * Read the JSON file.
         *
         * @name read
         * @function
         * @param {Function} cb An optional callback function which will turn the function into an asynchronous one.
         * @returns {Object} The object parsed as object or an empty object by default.
         */

    }, {
        key: "read",
        value: function read(cb) {
            if (!cb) {
                try {
                    return rJson(this.path);
                } catch (e) {
                    return {};
                }
            }
            rJson(this.path, function (err, data) {
                data = err ? {} : data;
                cb(null, data);
            });
        }

        /**
         * write
         * Write the JSON file.
         *
         * @name read
         * @function
         * @param {String} The file content.
         * @param {Function} cb An optional callback function which will turn the function into an asynchronous one.
         * @returns {JsonEditor} The `JsonEditor` instance.
         */

    }, {
        key: "write",
        value: function write(content, cb) {
            if (cb) {
                fs.writeFile(this.path, content, cb);
            } else {
                fs.writeFileSync(this.path, content);
            }
            return this;
        }

        /**
         * empty
         * Empty the JSON file content.
         *
         * @name empty
         * @function
         * @param {Function} cb The callback function.
         */

    }, {
        key: "empty",
        value: function empty(cb) {
            return this.write("{}", cb);
        }

        /**
         * save
         * Save the file back to disk.
         *
         * @name save
         * @function
         * @param {Function} cb An optional callback function which will turn the function into an asynchronous one.
         * @returns {JsonEditor} The `JsonEditor` instance.
         */

    }, {
        key: "save",
        value: function save(cb) {
            var data = JSON.stringify(this.data, this.options.stringify_fn, this.options.stringify_width, this.options.stringify_eol);
            this.write(this.options.stringify_eol ? data + os.EOL : data, cb);
            return this;
        }

        /**
         * toObject
         *
         * @name toObject
         * @function
         * @returns {Object} The data object.
         */

    }, {
        key: "toObject",
        value: function toObject() {
            return this.data;
        }
    }]);

    return JsonEditor;
}();

/**
 * editJsonFile
 * Edit a json file.
 *
 * @name editJsonFile
 * @function
 * @param {String} path The path to the JSON file.
 * @param {Object} options An object containing the following fields:
 * @return {JsonEditor} The `JsonEditor` instance.
 */


module.exports = function editJsonFile(path, options) {
    return new JsonEditor(path, options);
};

/***/ }),

/***/ 960:
/***/ (function(module, __unusedexports, __webpack_require__) {

"use strict";
/*!
 * is-plain-object <https://github.com/jonschlinkert/is-plain-object>
 *
 * Copyright (c) 2014-2017, Jon Schlinkert.
 * Released under the MIT License.
 */



var isObject = __webpack_require__(782);

function isObjectObject(o) {
  return isObject(o) === true
    && Object.prototype.toString.call(o) === '[object Object]';
}

module.exports = function isPlainObject(o) {
  var ctor,prot;

  if (isObjectObject(o) === false) return false;

  // If has modified constructor
  ctor = o.constructor;
  if (typeof ctor !== 'function') return false;

  // If has modified prototype
  prot = ctor.prototype;
  if (isObjectObject(prot) === false) return false;

  // If constructor does not have an Object-specific method
  if (prot.hasOwnProperty('isPrototypeOf') === false) {
    return false;
  }

  // Most likely a plain Object
  return true;
};


/***/ })

/******/ });
//# sourceMappingURL=index.js.map