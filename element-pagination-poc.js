var ElementPagination =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } };

	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

	var _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

	var _inherits = function (subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

	Object.defineProperty(exports, '__esModule', {
	  value: true
	});

	var _EventEmitter2 = __webpack_require__(2);

	var CHANGE_EVENT = 'element-pagination-poc.paginationChanged';

	var Pagination = (function (_EventEmitter) {
	  function Pagination(element) {
	    _classCallCheck(this, Pagination);

	    _get(Object.getPrototypeOf(Pagination.prototype), 'constructor', this).call(this);

	    this.element = element;

	    this.state = {
	      page: 0,
	      active: false
	    };

	    var debouncedUpdatePagination = this._debouncedUpdatePagination = rAFDebounce(updatePagination.bind(this));

	    debouncedUpdatePagination();

	    window.addEventListener('resize', debouncedUpdatePagination);

	    // TODO: revisit this
	    // window.addEventListener('load', updatePagination.bind(this));
	  }

	  _inherits(Pagination, _EventEmitter);

	  _createClass(Pagination, [{
	    key: 'destroy',
	    value: function destroy() {
	      // TODO
	      window.removeEventListener('resize', this._debouncedUpdatePagination);
	    }
	  }, {
	    key: 'nextPage',
	    value: function nextPage() {
	      this.changePage(+1);
	    }
	  }, {
	    key: 'previousPage',
	    value: function previousPage() {
	      this.changePage(-1);
	    }
	  }, {
	    key: 'changePage',
	    value: function changePage(increment) {
	      setPage.call(this, this.state.page + increment);
	    }
	  }, {
	    key: 'hasPreviousPage',
	    get: function () {
	      return this.state.hasPrev;
	    }
	  }, {
	    key: 'hasNextPage',
	    get: function () {
	      return this.state.hasNext;
	    }
	  }]);

	  return Pagination;
	})(_EventEmitter2.EventEmitter);

	exports['default'] = Pagination;

	function emitChange() {
	  this.emit(CHANGE_EVENT);
	}

	function rAFDebounce(callback) {
	  var _this = this;

	  var _arguments = arguments;

	  var queueArgs, isQueued, queueCallback;

	  return function () {
	    queueArgs = _arguments;
	    queueCallback = callback;

	    if (!isQueued) {
	      isQueued = true;
	      requestAnimationFrame(function () {
	        queueCallback.apply(_this, queueArgs);
	        isQueued = false;
	      });
	    }
	  };
	}

	function updatePagination() {
	  var state = this.state;
	  var element = this.element;

	  if (!element.offsetParent) {
	    waitForVisible();
	    return;
	  }

	  var children = element.children;

	  disablePagination();

	  var sizeData = state.elementData = calculateElementData.call(this);
	  var needPagination = state.active = sizeData.pages.length > 1;

	  console.log('sizeData:', sizeData);
	  console.log('needPagination:', needPagination);

	  if (needPagination) {
	    enablePagination();
	  }

	  function enablePagination() {
	    element.style.width = '99999px';

	    sizeData.elements.forEach(function (element) {
	      element.element.style['margin-left'] = element.filler + 'px';
	    });

	    // TODO: set page
	  }

	  function disablePagination() {
	    element.style.width = '';

	    for (var i = 0, l = children.length; i < l; i++) {
	      children[i].style.width = '';
	      children[i].style['margin-left'] = '';
	    }

	    state.page = null;
	    state.active = false;
	  }

	  function waitForVisible() {}
	}

	function slideElements(x) {
	  // TODO: vendor-specific style properties
	  this.element.style.transform = 'translate3d(' + x + 'px,0,0)';
	}

	function calculateElementData(noAdjust) {
	  var element = this.element;
	  var children = this.element.children;
	  var clientWidth = element.parentElement.offsetWidth;
	  var elementsWidth = clientWidth;
	  // var elementsWidth = clientWidth - {paginator controls width} - 1;
	  var totalWidth = 0;
	  var max = 0;
	  var elementData = [];
	  var pages = [];
	  var currentPage;

	  console.log('clientWidth:', clientWidth);
	  console.log('elementsWidth:', elementsWidth);

	  for (var i = 0, l = children.length; i < l; i++) {
	    var child = children[i];
	    var childWidth = Math.min(elementsWidth, child.offsetWidth);

	    console.log('[%d] childWidth:', i, childWidth);

	    var data = {
	      element: child,
	      left: totalWidth,
	      width: childWidth,
	      right: totalWidth + childWidth,
	      filler: 0
	    };

	    data.page = Math.ceil(data.right / clientWidth) - 1;

	    console.log('data', data);

	    if (data.page >= pages.length) {
	      data.filler = elementsWidth * data.page - data.left;
	      data.right += data.filler;
	      data.left += data.filler;

	      currentPage = {
	        left: data.left,
	        firstElementIndex: i,
	        lastElementIndex: i,
	        elements: [data]
	      };

	      pages.push(currentPage);
	    } else {
	      currentPage.lastElementIndex = i;
	      currentPage.elements.push(data);
	    }

	    totalWidth = data.right;
	    max = Math.max(max, childWidth);
	    elementData.push(data);
	  }

	  return {
	    width: totalWidth,
	    max: max,
	    pages: pages,
	    elements: elementData
	  };
	}

	function setPage(page) {
	  var state = this.state;

	  if (page === state.page) {
	    return;
	  }var lastPage = state.elementData.pages.length - 1;

	  if (page < 0) page = 0;
	  if (page > lastPage) page = lastPage;

	  state.hasPrev = page > 0;
	  state.hasNext = page < lastPage;

	  state.page = page;

	  emitChange.call(this);

	  return slideElements.call(this, -state.elementData.pages[page].left);
	}
	module.exports = exports['default'];

	// TODO

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};

	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;

	  if (!this._events)
	    this._events = {};

	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }

	  handler = this._events[type];

	  if (isUndefined(handler))
	    return false;

	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        len = arguments.length;
	        args = new Array(len - 1);
	        for (i = 1; i < len; i++)
	          args[i - 1] = arguments[i];
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    len = arguments.length;
	    args = new Array(len - 1);
	    for (i = 1; i < len; i++)
	      args[i - 1] = arguments[i];

	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }

	  return true;
	};

	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events)
	    this._events = {};

	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);

	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];

	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    var m;
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }

	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }

	  return this;
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  var fired = false;

	  function g() {
	    this.removeListener(type, g);

	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }

	  g.listener = listener;
	  this.on(type, g);

	  return this;
	};

	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;

	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');

	  if (!this._events || !this._events[type])
	    return this;

	  list = this._events[type];
	  length = list.length;
	  position = -1;

	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);

	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }

	    if (position < 0)
	      return this;

	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }

	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }

	  return this;
	};

	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;

	  if (!this._events)
	    return this;

	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }

	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }

	  listeners = this._events[type];

	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];

	  return this;
	};

	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  var ret;
	  if (!emitter._events || !emitter._events[type])
	    ret = 0;
	  else if (isFunction(emitter._events[type]))
	    ret = 1;
	  else
	    ret = emitter._events[type].length;
	  return ret;
	};

	function isFunction(arg) {
	  return typeof arg === 'function';
	}

	function isNumber(arg) {
	  return typeof arg === 'number';
	}

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}

	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ }
/******/ ]);