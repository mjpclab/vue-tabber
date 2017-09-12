(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("vue"));
	else if(typeof define === 'function' && define.amd)
		define(["vue"], factory);
	else if(typeof exports === 'object')
		exports["vue-tabber"] = factory(require("vue"));
	else
		root["VueTabber"] = factory(root["Vue"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_0__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(2);

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(0);
if (Vue.default) {
	Vue = Vue.default;
}

var definition = __webpack_require__(3);
var VueTabber = Vue.component('VueTabber', definition);

module.exports = VueTabber;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Label = __webpack_require__(4);
var Page = __webpack_require__(6);

var RE_WHITESPACES = /\s+/;

function isLabel(vnode) {
	return vnode.componentOptions.Ctor === Label;
}

function isPage(vnode) {
	return vnode.componentOptions.Ctor === Page;
}

function getLabelAndPageVnodes(vnodes) {
	return vnodes.filter(function (vnode) {
		if (!vnode.componentOptions) {
			return false;
		}
		return isLabel(vnode) || isPage(vnode);
	});
}

function getValidEvents(eventList) {
	if (eventList) {
		var validEvents = [];
		var events = Array.isArray(eventList) ? eventList : String(eventList).split(RE_WHITESPACES);
		events.length && events.forEach(function (eventName) {
			eventName && validEvents.push(eventName);
		});
		return validEvents;
	}
}

function getEventHandlers(events, handler) {
	var on = {};
	events && events.forEach(function (eventName) {
		on[eventName] = handler;
	});
	return on;
}

function mergeEventHandlers() {
	var mergedEventHandler = {};

	for (var _len = arguments.length, eventHandlers = Array(_len), _key = 0; _key < _len; _key++) {
		eventHandlers[_key] = arguments[_key];
	}

	eventHandlers.forEach(function (eventHandler) {
		Object.keys(eventHandler).forEach(function (event) {
			var handler = eventHandler[event];
			mergedEventHandler[event] = handler;
		});
	});
	return mergedEventHandler;
}

var definition = {
	props: {
		triggerEvents: { type: [Array, String], default: 'click' },
		delayTriggerEvents: { type: [Array, String] },
		delayTriggerCancelEvents: { type: [Array, String] },
		delayTriggerLatency: { type: [Number, String], default: 200 },
		activeIndex: { type: [Number, String], default: 0 },

		tabContainerClass: { type: String, default: 'tab-container' },

		labelContainerClass: { type: String, default: 'label-container' },
		showTopLabelContainer: { type: Boolean, default: true },
		showBottomLabelContainer: { type: Boolean, default: false },
		topLabelContainerClass: { type: String, default: 'top' },
		bottomLabelContainerClass: { type: String, default: 'bottom' },
		labelItemClass: { type: String, default: 'label-item' },
		labelItemActiveClass: { type: String, default: 'label-active' },
		labelItemInactiveClass: { type: String, default: 'label-inactive' },

		pageContainerClass: { type: String, default: 'page-container' },
		pageItemClass: { type: String, default: 'page-item' },
		pageItemActiveClass: { type: String, default: 'page-active' },
		pageItemInactiveClass: { type: String, default: 'page-inactive' }
	},
	data: function data() {
		return {
			currentIndex: -1,
			count: 0,
			validTriggerEvents: [],
			validDelayTriggerEvents: [],
			validDelayTriggerCancelEvents: [],
			delayTimeout: undefined
		};
	},

	watch: {
		activeIndex: function activeIndex(newValue) {
			this.switchTo(newValue);
		}
	},
	methods: {
		switchTo: function switchTo(index) {
			if (!isFinite(index) || isNaN(index)) {
				return;
			}

			var oldIndex = this.currentIndex;
			var newIndex = void 0;
			if (index < 0) {
				newIndex = 0;
			} else if (index >= this.count) {
				newIndex = this.count - 1;
			} else {
				newIndex = parseInt(index);
			}

			if (oldIndex === newIndex) {
				return;
			}

			this.currentIndex = newIndex;
			this.$emit('switch', oldIndex, newIndex);
			this.$emit('update:activeIndex', newIndex);
		}
	},
	created: function created() {
		this.validTriggerEvents = getValidEvents(this.triggerEvents);
		this.validDelayTriggerEvents = getValidEvents(this.delayTriggerEvents);
		this.validDelayTriggerCancelEvents = getValidEvents(this.delayTriggerCancelEvents);
	},
	mounted: function mounted() {
		if (this.count) {
			this.switchTo(this.activeIndex);
		}
	},
	beforeUnmount: function beforeUnmount() {
		clearTimeout(this.delayTimeout);
	},
	render: function render(createElement) {
		var _this = this;

		//utility
		var _createLabelItem = function _createLabelItem(childVNodes, index) {
			var _class;

			var doSwitch = function doSwitch() {
				_this.switchTo(index);
			};
			var localDelayTimeout = void 0;
			var delayDoSwitch = _this.delayTriggerLatency <= 0 ? doSwitch : function () {
				clearTimeout(_this.delayTimeout);
				localDelayTimeout = _this.delayTimeout = setTimeout(doSwitch, _this.delayTriggerLatency);
			};
			var cancelDelayDoSwitch = function cancelDelayDoSwitch() {
				if (localDelayTimeout === _this.delayTimeout) {
					clearTimeout(localDelayTimeout);
				}
			};

			var isActive = index === _this.currentIndex;
			return createElement('div', {
				'class': (_class = {}, _defineProperty(_class, _this.labelItemClass, true), _defineProperty(_class, _this.labelItemActiveClass, isActive), _defineProperty(_class, _this.labelItemInactiveClass, !isActive), _class),
				on: mergeEventHandlers(getEventHandlers(_this.validTriggerEvents, doSwitch), getEventHandlers(_this.validDelayTriggerEvents, delayDoSwitch), getEventHandlers(_this.validDelayTriggerCancelEvents, cancelDelayDoSwitch))
			}, childVNodes);
		};

		var _createPageItem = function _createPageItem(childVNodes, index) {
			var _class2;

			var isActive = index === _this.currentIndex;
			return createElement('div', {
				'class': (_class2 = {}, _defineProperty(_class2, _this.pageItemClass, true), _defineProperty(_class2, _this.pageItemActiveClass, isActive), _defineProperty(_class2, _this.pageItemInactiveClass, !isActive), _class2)
			}, childVNodes);
		};

		var createLabelAndPageItems = function createLabelAndPageItems(vnodes) {
			var labelItems = [];
			var pageItems = [];

			var currentLabel = [];
			var currentPage = [];

			vnodes.forEach(function (vnode) {
				if (isLabel(vnode)) {
					if (currentLabel.length) {
						labelItems.push(_createLabelItem(currentLabel, labelItems.length));
						pageItems.push(_createPageItem(currentPage, pageItems.length));
					}
					currentLabel = [];
					currentLabel.push.apply(currentLabel, vnode.componentOptions.children);
					currentPage = [];
				} else /*if(isPage(item))*/{
						if (!currentLabel.length) {
							currentLabel.push('');
						}
						currentPage.push.apply(currentPage, vnode.componentOptions.children);
					}
			});

			if (currentLabel.length) {
				labelItems.push(_createLabelItem(currentLabel, labelItems.length));
				pageItems.push(_createPageItem(currentPage, pageItems.length));
			}

			return {
				labelItems: labelItems,
				pageItems: pageItems
			};
		};

		var createTabContainer = function createTabContainer(items) {
			return createElement('div', {
				'class': _defineProperty({}, _this.tabContainerClass, true)
			}, items);
		};

		var _createLabelContainer = function _createLabelContainer(labelItems, positionClass) {
			var _class4;

			window.labelContainer = createElement('div', {
				'class': (_class4 = {}, _defineProperty(_class4, _this.labelContainerClass, true), _defineProperty(_class4, positionClass, true), _class4)
			}, labelItems);
			return window.labelContainer;
		};

		var createTopLabelContainer = function createTopLabelContainer(labelItems) {
			return _createLabelContainer(labelItems, _this.topLabelContainerClass);
		};

		var createBottomLabelContainer = function createBottomLabelContainer(labelItems) {
			return _createLabelContainer(labelItems, _this.bottomLabelContainerClass);
		};

		var createPageContainer = function createPageContainer(pageItems) {
			return createElement('div', {
				'class': _defineProperty({}, _this.pageContainerClass, true)
			}, pageItems);
		};

		var cloneVNode = function cloneVNode(vnode) {
			if (vnode.tag) {
				return createElement(vnode.tag, vnode.data, cloneVNodes(vnode.children));
			} else if (vnode.text) {
				return vnode.text;
			} else {
				return vnode;
			}
		};

		var cloneVNodes = function cloneVNodes(vnodes) {
			return vnodes.map(function (vnode) {
				return cloneVNode(vnode);
			});
		};

		//====================================================================================
		//start
		var slotChildren = this.$slots.default;
		if (!slotChildren.length) {
			return;
		}

		var allItems = getLabelAndPageVnodes(slotChildren);
		if (!allItems.length) {
			return;
		}

		//collect labels/pages

		var _createLabelAndPageIt = createLabelAndPageItems(allItems),
		    labelItems = _createLabelAndPageIt.labelItems,
		    pageItems = _createLabelAndPageIt.pageItems;

		this.count = labelItems.length;

		var topLabelItems = void 0;
		var bottomLabelItems = void 0;
		if (this.showTopLabelContainer && this.showBottomLabelContainer) {
			topLabelItems = labelItems;
			bottomLabelItems = cloneVNodes(labelItems);
		} else {
			topLabelItems = bottomLabelItems = labelItems;
		}

		// top label container
		var topLabelContainer = this.showTopLabelContainer && createTopLabelContainer(topLabelItems);

		//page container
		var pageContainer = createPageContainer(pageItems);

		// bottom label container
		var bottomLabelContainer = this.showBottomLabelContainer && createBottomLabelContainer(bottomLabelItems);

		//tabb container
		var tabContaienr = createTabContainer([topLabelContainer, pageContainer, bottomLabelContainer]);

		//return
		return tabContaienr;
	}
};

module.exports = definition;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(0);
if (Vue.default) {
	Vue = Vue.default;
}

var definition = __webpack_require__(5);
var VueTabberLabel = Vue.component('VueTabberLabel', definition);

module.exports = VueTabberLabel;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var definition = {};

module.exports = definition;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Vue = __webpack_require__(0);
if (Vue.default) {
	Vue = Vue.default;
}

var definition = __webpack_require__(7);
var VueTabberPage = Vue.component('VueTabberPage', definition);

module.exports = VueTabberPage;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var definition = {};

module.exports = definition;

/***/ })
/******/ ]);
});
//# sourceMappingURL=vue-tabber.js.map