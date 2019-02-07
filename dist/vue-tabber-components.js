(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-tabber-components"] = factory();
	else
		root["VueTabberComponents"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return definitions; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "definitions", function() { return definitions; });
/* harmony import */ var _label_definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VueTabberLabel", function() { return _label_definition__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _page_definition__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VueTabberPage", function() { return _page_definition__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _tabber_definition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "VueTabber", function() { return _tabber_definition__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _tabber_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerTo", function() { return _tabber_component__WEBPACK_IMPORTED_MODULE_3__["registerTo"]; });






var definitions = {
	VueTabberLabel: _label_definition__WEBPACK_IMPORTED_MODULE_0__["default"],
	VueTabberPage: _page_definition__WEBPACK_IMPORTED_MODULE_1__["default"],
	VueTabber: _tabber_definition__WEBPACK_IMPORTED_MODULE_2__["default"]
};



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'VueTabberLabel'
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
	name: 'VueTabberPage'
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RE_WHITESPACES = /\s+/;
var RE_TAG_LABEL = /[Vv]ue-?[Tt]abber-?[Ll]abel/;
var RE_TAG_PAGE = /[Vv]ue-?[Tt]abber-?[Pp]age/;

function isLabel(vnode) {
	return vnode.componentOptions && RE_TAG_LABEL.test(vnode.componentOptions.tag);
}

function isPage(vnode) {
	return vnode.componentOptions && RE_TAG_PAGE.test(vnode.componentOptions.tag);
}

function getValidIndex(index) {
	if (index === '' || !isFinite(index) || isNaN(index)) {
		return -1;
	}

	var intIndex = parseInt(index);
	return intIndex < 0 ? 0 : index;
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

	eventHandlers && eventHandlers.forEach(function (eventHandler) {
		eventHandler && Object.keys(eventHandler).forEach(function (event) {
			var handler = eventHandler[event];
			mergedEventHandler[event] = handler;
		});
	});
	return mergedEventHandler;
}

var definition = {
	name: 'VueTabber',
	props: {
		triggerEvents: { type: [Array, String], default: 'click' },
		delayTriggerEvents: { type: [Array, String] },
		delayTriggerCancelEvents: { type: [Array, String] },
		delayTriggerLatency: { type: [Number, String], default: 200 },
		activeIndex: { type: [Number, String], default: 0 },

		tabContainerClass: { type: String, default: 'tab-container' },

		labelContainerClass: { type: String, default: 'label-container' },
		showHeaderLabelContainer: { type: Boolean, default: true },
		showFooterLabelContainer: { type: Boolean, default: false },
		headerLabelContainerClass: { type: String, default: 'header-container' },
		footerLabelContainerClass: { type: String, default: 'footer-container' },
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
			count: 0,
			targetIndex: getValidIndex(this.activeIndex),
			currentIndex: -1,
			renderedIndex: -1,
			validTriggerEvents: getValidEvents(this.triggerEvents),
			validDelayTriggerEvents: getValidEvents(this.delayTriggerEvents),
			validDelayTriggerCancelEvents: getValidEvents(this.delayTriggerCancelEvents),
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
			this.targetIndex = getValidIndex(index);
		}
	},
	beforeUnmount: function beforeUnmount() {
		clearTimeout(this.delayTimeout);
	},
	render: function render(createElement) {
		var _this = this;

		//utility
		var _createLabelItem = function _createLabelItem(childVNodes, key, index) {
			var _class;

			var doSwitch = function doSwitch() {
				clearTimeout(_this.delayTimeout);
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

			var triggerEventHandlers = getEventHandlers(_this.validTriggerEvents, doSwitch);
			var delayTriggerEventHandlers = void 0;
			var delayTriggerCancelEventHandlers = void 0;
			if (_this.validDelayTriggerEvents && _this.validDelayTriggerEvents.length) {
				delayTriggerEventHandlers = getEventHandlers(_this.validDelayTriggerEvents, delayDoSwitch);
				delayTriggerCancelEventHandlers = getEventHandlers(_this.validDelayTriggerCancelEvents, cancelDelayDoSwitch);
			}

			return createElement('div', {
				'class': (_class = {}, _defineProperty(_class, _this.labelItemClass, true), _defineProperty(_class, _this.labelItemActiveClass, false), _defineProperty(_class, _this.labelItemInactiveClass, true), _class),
				on: mergeEventHandlers(delayTriggerCancelEventHandlers, delayTriggerEventHandlers, triggerEventHandlers),
				key: key
			}, childVNodes);
		};

		var _createPageItem = function _createPageItem(childVNodes, key) {
			var _class2;

			return createElement('div', {
				'class': (_class2 = {}, _defineProperty(_class2, _this.pageItemClass, true), _defineProperty(_class2, _this.pageItemActiveClass, false), _defineProperty(_class2, _this.pageItemInactiveClass, true), _class2),
				key: key
			}, childVNodes);
		};

		var createLabelAndPageItems = function createLabelAndPageItems(vnodes) {
			var labelItems = [];
			var pageItems = [];
			var key = undefined;

			var currentLabel = [];
			var currentPage = [];

			vnodes.forEach(function (vnode, index) {
				if (isLabel(vnode)) {
					if (currentLabel.length) {
						labelItems.push(_createLabelItem(currentLabel, key, labelItems.length));
						pageItems.push(_createPageItem(currentPage, key));
					}
					currentLabel = [];
					currentLabel.push.apply(currentLabel, vnode.componentOptions.children);
					currentPage = [];
					key = vnode.data.key ? 'key-' + vnode.data.key : 'index-' + index;
				} else {
					if (!currentLabel.length) {
						currentLabel.push('');
					}
					if (isPage(vnode)) {
						currentPage.push.apply(currentPage, vnode.componentOptions.children);
					} else if (vnode.tag) {
						currentPage.push(vnode);
					}
				}
			});

			if (currentLabel.length) {
				labelItems.push(_createLabelItem(currentLabel, key, labelItems.length));
				pageItems.push(_createPageItem(currentPage, key));
			}

			return {
				labelItems: labelItems,
				pageItems: pageItems
			};
		};

		var createTabContainer = function createTabContainer(items) {
			return createElement('div', {
				'class': _defineProperty({}, _this.tabContainerClass, true),
				key: 'tab-container'
			}, items);
		};

		var _createLabelContainer = function _createLabelContainer(labelItems, positionClass, position) {
			var _class4;

			window.labelContainer = createElement('div', {
				'class': (_class4 = {}, _defineProperty(_class4, _this.labelContainerClass, true), _defineProperty(_class4, positionClass, true), _class4),
				key: 'label-container-' + position
			}, labelItems);
			return window.labelContainer;
		};

		var createHeaderLabelContainer = function createHeaderLabelContainer(labelItems) {
			return _createLabelContainer(labelItems, _this.headerLabelContainerClass, 'header');
		};

		var createFooterLabelContainer = function createFooterLabelContainer(labelItems) {
			return _createLabelContainer(labelItems, _this.footerLabelContainerClass, 'footer');
		};

		var createPageContainer = function createPageContainer(pageItems) {
			return createElement('div', {
				'class': _defineProperty({}, _this.pageContainerClass, true),
				key: 'page-container'
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
		if (!slotChildren || !slotChildren.length) {
			return;
		}

		//collect labels/pages

		var _createLabelAndPageIt = createLabelAndPageItems(slotChildren),
		    labelItems = _createLabelAndPageIt.labelItems,
		    pageItems = _createLabelAndPageIt.pageItems;

		this.count = labelItems.length;
		var oldIndex = this.currentIndex;
		var newIndex = this.targetIndex >= this.count ? this.count - 1 : this.targetIndex;
		if (oldIndex !== newIndex) {
			this.currentIndex = newIndex;
			this.$emit('switching', oldIndex, newIndex);
			this.$emit('update:activeIndex', newIndex);
		}

		labelItems[newIndex].data['class'][this.labelItemActiveClass] = true;
		labelItems[newIndex].data['class'][this.labelItemInactiveClass] = false;

		pageItems[newIndex].data['class'][this.pageItemActiveClass] = true;
		pageItems[newIndex].data['class'][this.pageItemInactiveClass] = false;

		var headerLabelItems = void 0;
		var footerLabelItems = void 0;
		if (this.showHeaderLabelContainer && this.showFooterLabelContainer) {
			headerLabelItems = labelItems;
			footerLabelItems = cloneVNodes(labelItems);
		} else {
			headerLabelItems = footerLabelItems = labelItems;
		}

		// top label container
		var headerLabelContainer = this.showHeaderLabelContainer && createHeaderLabelContainer(headerLabelItems);

		//page container
		var pageContainer = createPageContainer(pageItems);

		// bottom label container
		var footerLabelContainer = this.showFooterLabelContainer && createFooterLabelContainer(footerLabelItems);

		//tabb container
		var tabContaienr = createTabContainer([headerLabelContainer, pageContainer, footerLabelContainer]);

		//return
		return tabContaienr;
	},
	updated: function updated() {
		var oldIndex = this.renderedIndex;
		var newIndex = this.currentIndex;
		if (oldIndex !== newIndex) {
			this.renderedIndex = newIndex;
			this.$emit('switched', oldIndex, newIndex);
		}
	}
};

/* harmony default export */ __webpack_exports__["default"] = (definition);

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerTo", function() { return registerTo; });
/* harmony import */ var _label_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var _page_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _definition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);




function registerTo(Vue) {
	Object(_label_component__WEBPACK_IMPORTED_MODULE_0__["registerTo"])(Vue);
	Object(_page_component__WEBPACK_IMPORTED_MODULE_1__["registerTo"])(Vue);
	return Vue.component('VueTabber', _definition__WEBPACK_IMPORTED_MODULE_2__["default"]);
}



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerTo", function() { return registerTo; });
/* harmony import */ var _definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);


function registerTo(Vue) {
	return Vue.component('VueTabberLabel', _definition__WEBPACK_IMPORTED_MODULE_0__["default"]);
}



/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerTo", function() { return registerTo; });
/* harmony import */ var _definition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);


function registerTo(Vue) {
	return Vue.component('VueTabberPage', _definition__WEBPACK_IMPORTED_MODULE_0__["default"]);
}



/***/ })
/******/ ]);
});