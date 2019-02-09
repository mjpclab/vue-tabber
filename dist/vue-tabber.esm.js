import Vue from 'vue';

var definition = {
  name: 'VueTabberLabel'
};

function registerTo(Vue$$1) {
  return Vue$$1.component('VueTabberLabel', definition);
}

var definition$1 = {
  name: 'VueTabberPage'
};

function registerTo$1(Vue$$1) {
  return Vue$$1.component('VueTabberPage', definition$1);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

  for (var _len = arguments.length, eventHandlers = new Array(_len), _key = 0; _key < _len; _key++) {
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

var component = {
  name: 'VueTabber',
  props: {
    triggerEvents: {
      type: [Array, String],
      default: 'click'
    },
    delayTriggerEvents: {
      type: [Array, String]
    },
    delayTriggerCancelEvents: {
      type: [Array, String]
    },
    delayTriggerLatency: {
      type: [Number, String],
      default: 200
    },
    activeIndex: {
      type: [Number, String],
      default: 0
    },
    tabContainerClass: {
      type: String,
      default: 'tab-container'
    },
    labelContainerClass: {
      type: String,
      default: 'label-container'
    },
    showHeaderLabelContainer: {
      type: Boolean,
      default: true
    },
    showFooterLabelContainer: {
      type: Boolean,
      default: false
    },
    headerLabelContainerClass: {
      type: String,
      default: 'header-container'
    },
    footerLabelContainerClass: {
      type: String,
      default: 'footer-container'
    },
    labelItemClass: {
      type: String,
      default: 'label-item'
    },
    labelItemActiveClass: {
      type: String,
      default: 'label-active'
    },
    labelItemInactiveClass: {
      type: String,
      default: 'label-inactive'
    },
    pageContainerClass: {
      type: String,
      default: 'page-container'
    },
    pageItemClass: {
      type: String,
      default: 'page-item'
    },
    pageItemActiveClass: {
      type: String,
      default: 'page-active'
    },
    pageItemInactiveClass: {
      type: String,
      default: 'page-inactive'
    }
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

      var localDelayTimeout;
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
      var delayTriggerEventHandlers;
      var delayTriggerCancelEventHandlers;

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

      return createElement('div', {
        'class': (_class4 = {}, _defineProperty(_class4, _this.labelContainerClass, true), _defineProperty(_class4, positionClass, true), _class4),
        key: 'label-container-' + position
      }, labelItems);
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
    }; //====================================================================================
    //start


    var slotChildren = this.$slots.default;

    if (!slotChildren || !slotChildren.length) {
      return;
    } //collect labels/pages


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
    var headerLabelItems;
    var footerLabelItems;

    if (this.showHeaderLabelContainer && this.showFooterLabelContainer) {
      headerLabelItems = labelItems;
      footerLabelItems = cloneVNodes(labelItems);
    } else {
      headerLabelItems = footerLabelItems = labelItems;
    } // top label container


    var headerLabelContainer = this.showHeaderLabelContainer && createHeaderLabelContainer(headerLabelItems); //page container

    var pageContainer = createPageContainer(pageItems); // bottom label container

    var footerLabelContainer = this.showFooterLabelContainer && createFooterLabelContainer(footerLabelItems); //tabb container

    var tabContaienr = createTabContainer([headerLabelContainer, pageContainer, footerLabelContainer]); //return

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

function registerTo$2(Vue$$1) {
  return Vue$$1.component('VueTabber', component);
}

function registerTo$3(Vue$$1) {
  registerTo(Vue$$1);
  registerTo$1(Vue$$1);
  return registerTo$2(Vue$$1);
}

var VueTabber = registerTo$3(Vue);
VueTabber.registerTo = registerTo$3;
VueTabber.LabelComponent = definition;
VueTabber.PageComponent = definition$1;
VueTabber.TabberComponent = component;

export default VueTabber;
