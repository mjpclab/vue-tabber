var Label = {
  name: 'VueTabberLabel',
  props: {
    disabled: {
      type: [Boolean],
      default: false
    },
    hidden: {
      type: [Boolean],
      default: false
    }
  }
};

var Panel = {
  name: 'VueTabberPanel'
};

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

function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);

    if (typeof Object.getOwnPropertySymbols === 'function') {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }

    ownKeys.forEach(function (key) {
      _defineProperty(target, key, source[key]);
    });
  }

  return target;
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  }
}

function _iterableToArray(iter) {
  if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}

var RE_TAG_LABEL = /[Vv]ue-?[Tt]abber-?[Ll]abel/;
var RE_TAG_PANEL = /[Vv]ue-?[Tt]abber-?[Pp]anel/;

function isLabel(vNode) {
  return vNode.componentOptions && RE_TAG_LABEL.test(vNode.componentOptions.tag);
}

function isPanel(vNode) {
  return vNode.componentOptions && RE_TAG_PANEL.test(vNode.componentOptions.tag);
}

function parseEntries(vNodes) {
  var entries = [];
  var key, disabled, hidden;
  var labelVNodes = [];
  var panelVNodes = [];

  var pushEntry = function pushEntry() {
    entries.push({
      label: labelVNodes,
      panel: panelVNodes,
      key: key,
      disabled: disabled,
      hidden: hidden
    });
  };

  vNodes.forEach(function (vNode, index) {
    if (isLabel(vNode)) {
      var _labelVNodes;

      if (labelVNodes.length) {
        pushEntry();
      }

      labelVNodes = [];

      (_labelVNodes = labelVNodes).push.apply(_labelVNodes, _toConsumableArray(vNode.componentOptions.children));

      panelVNodes = [];
      key = vNode.key;
      var _vNode$componentOptio = vNode.componentOptions.propsData,
          itemDisabled = _vNode$componentOptio.disabled,
          itemHidden = _vNode$componentOptio.hidden;
      disabled = Boolean(itemDisabled);
      hidden = Boolean(itemHidden);
    } else {
      if (!labelVNodes.length) {
        labelVNodes.push('');
      }

      if (isPanel(vNode)) {
        var _panelVNodes;

        (_panelVNodes = panelVNodes).push.apply(_panelVNodes, _toConsumableArray(vNode.componentOptions.children));
      } else if (vNode.tag) {
        panelVNodes.push(vNode);
      }
    }
  });

  if (labelVNodes.length) {
    pushEntry();
  }

  return entries;
}

function createEventHandler(events, handler) {
  var on = {};
  events && events.length && events.forEach(function (event) {
    on[event] = handler;
  });
  return on;
}

function createLabelItem(createElement, tabber, entry, index) {
  var labelItemActiveClass = tabber.labelItemActiveClass,
      labelItemInactiveClass = tabber.labelItemInactiveClass,
      labelItemDisabledClass = tabber.labelItemDisabledClass,
      labelItemHiddenClass = tabber.labelItemHiddenClass;
  var _tabber$$props = tabber.$props,
      delayTriggerLatency = _tabber$$props.delayTriggerLatency,
      labelItemClass = _tabber$$props.labelItemClass;
  var _tabber$$data = tabber.$data,
      currentIndex = _tabber$$data.currentIndex,
      delayTimeout = _tabber$$data.delayTimeout,
      validTriggerEvents = _tabber$$data.validTriggerEvents,
      validDelayTriggerEvents = _tabber$$data.validDelayTriggerEvents,
      validDelayTriggerCancelEvents = _tabber$$data.validDelayTriggerCancelEvents;
  var label = entry.label,
      key = entry.key,
      disabled = entry.disabled,
      hidden = entry.hidden;
  var delayTriggerCancelEventHandlers;
  var delayTriggerEventHandlers;
  var triggerEventHandlers;

  if (!disabled && !hidden) {
    var doSwitch = function doSwitch() {
      clearTimeout(delayTimeout);
      tabber.switchTo(index);
    };

    var localDelayTimeout;
    var delayDoSwitch = delayTriggerLatency <= 0 ? doSwitch : function () {
      clearTimeout(delayTimeout);
      localDelayTimeout = tabber.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
    };

    var cancelDelayDoSwitch = function cancelDelayDoSwitch() {
      if (localDelayTimeout === delayTimeout) {
        clearTimeout(localDelayTimeout);
      }
    };

    triggerEventHandlers = createEventHandler(validTriggerEvents, doSwitch);

    if (validDelayTriggerEvents && validDelayTriggerEvents.length) {
      delayTriggerEventHandlers = createEventHandler(validDelayTriggerEvents, delayDoSwitch);
      delayTriggerCancelEventHandlers = createEventHandler(validDelayTriggerCancelEvents, cancelDelayDoSwitch);
    }
  }

  var classes = [labelItemClass];
  classes.push(index === currentIndex ? labelItemActiveClass : labelItemInactiveClass);

  if (disabled) {
    classes.push(labelItemDisabledClass);
  }

  if (hidden) {
    classes.push(labelItemHiddenClass);
  }

  return createElement('div', {
    'class': classes,
    on: _objectSpread({}, delayTriggerCancelEventHandlers, delayTriggerEventHandlers, triggerEventHandlers),
    key: key ? 'key-' + key : 'index-' + index
  }, label);
}

function createLabelContainer(createElement, tabber, entries, side) {
  var labelItems = entries.map(function (entry, index) {
    return createLabelItem(createElement, tabber, entry, index);
  });
  var _tabber$$props2 = tabber.$props,
      mode = _tabber$$props2.mode,
      labelContainerClass = _tabber$$props2.labelContainerClass;
  var classes = [labelContainerClass, labelContainerClass + '-' + side, labelContainerClass + '-' + mode, labelContainerClass + '-' + side + '-' + mode];
  return createElement('div', {
    'class': classes,
    key: 'label-container' + '-' + side
  }, labelItems);
}

function createPanelItem(createElement, tabber, entry, index) {
  var panel = entry.panel,
      key = entry.key,
      disabled = entry.disabled,
      hidden = entry.hidden;
  var panelItemActiveClass = tabber.panelItemActiveClass,
      panelItemInactiveClass = tabber.panelItemInactiveClass,
      panelItemDisabledClass = tabber.panelItemDisabledClass,
      panelItemHiddenClass = tabber.panelItemHiddenClass;
  var panelItemClass = tabber.$props.panelItemClass;
  var currentIndex = tabber.$data.currentIndex;
  var classes = [panelItemClass];
  classes.push(index === currentIndex ? panelItemActiveClass : panelItemInactiveClass);

  if (disabled) {
    classes.push(panelItemDisabledClass);
  }

  if (hidden) {
    classes.push(panelItemHiddenClass);
  }

  return createElement('div', {
    'class': classes,
    key: key ? 'key-' + key : 'index-' + index
  }, panel);
}

function createPanelContainer(createElement, tabber, entries) {
  var panelItems = entries.map(function (entry, index) {
    return createPanelItem(createElement, tabber, entry, index);
  });
  var panelContainerClass = tabber.$props.panelContainerClass;
  var classes = [panelContainerClass];
  return createElement('div', {
    'class': classes,
    key: 'panel-container'
  }, panelItems);
}

function createTabContainer(createElement, tabber, entries) {
  var tabContainerModeClass = tabber.tabContainerModeClass;
  var _tabber$$props = tabber.$props,
      showHeaderLabelContainer = _tabber$$props.showHeaderLabelContainer,
      showFooterLabelContainer = _tabber$$props.showFooterLabelContainer,
      tabContainerClass = _tabber$$props.tabContainerClass;
  var headerLabelContainer = showHeaderLabelContainer && createLabelContainer(createElement, tabber, entries, 'header');
  var panelContainer = createPanelContainer(createElement, tabber, entries);
  var footerLabelContainer = showFooterLabelContainer && createLabelContainer(createElement, tabber, entries, 'footer');
  var children = [headerLabelContainer, panelContainer, footerLabelContainer];
  var classes = [tabContainerClass, tabContainerModeClass];
  return createElement('div', {
    'class': classes,
    key: 'tab-container'
  }, children);
}

var RE_WHITESPACES = /\s+/;

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

function getValidIndex(index) {
  if (index === '' || !isFinite(index) || isNaN(index)) {
    return -1;
  }

  var intIndex = parseInt(index);
  return intIndex < 0 ? 0 : index;
}

var Tabber = {
  name: 'VueTabber',
  props: {
    mode: {
      validator: function validator(value) {
        return ['horizontal', 'vertical'].indexOf(value) >= 0;
      },
      default: 'horizontal'
    },
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
    labelItemClass: {
      type: String,
      default: 'label-item'
    },
    panelContainerClass: {
      type: String,
      default: 'panel-container'
    },
    panelItemClass: {
      type: String,
      default: 'panel-item'
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
  computed: {
    tabContainerModeClass: function tabContainerModeClass() {
      return this.tabContainerClass + '-' + this.mode;
    },
    labelItemActiveClass: function labelItemActiveClass() {
      return this.labelItemClass + '-' + 'active';
    },
    labelItemInactiveClass: function labelItemInactiveClass() {
      return this.labelItemClass + '-' + 'inactive';
    },
    labelItemDisabledClass: function labelItemDisabledClass() {
      return this.labelItemClass + '-' + 'disabled';
    },
    labelItemHiddenClass: function labelItemHiddenClass() {
      return this.labelItemClass + '-' + 'hidden';
    },
    panelItemActiveClass: function panelItemActiveClass() {
      return this.panelItemClass + '-' + 'active';
    },
    panelItemInactiveClass: function panelItemInactiveClass() {
      return this.panelItemClass + '-' + 'inactive';
    },
    panelItemDisabledClass: function panelItemDisabledClass() {
      return this.panelItemClass + '-' + 'disabled';
    },
    panelItemHiddenClass: function panelItemHiddenClass() {
      return this.panelItemClass + '-' + 'hidden';
    }
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
    var slotChildren = this.$slots.default;

    if (!slotChildren || !slotChildren.length) {
      return;
    }

    var entries = parseEntries(slotChildren);
    this.count = entries.length;
    var oldIndex = this.currentIndex;
    var newIndex = this.targetIndex >= this.count ? this.count - 1 : this.targetIndex;

    if (oldIndex !== newIndex) {
      this.currentIndex = newIndex;
      this.$emit('switching', oldIndex, newIndex);
      this.$emit('update:activeIndex', newIndex);
    } //tabb container


    var tabberContaienr = createTabContainer(createElement, this, entries); //return

    return tabberContaienr;
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

var components = {
  VueTabber: Tabber,
  VueTabberLabel: Label,
  VueTabberPanel: Panel
};

function registerTo(Vue) {
  Vue.component('VueTabber', Tabber);
  Vue.component('VueTabberLabel', Label);
  Vue.component('VueTabberPanel', Panel);
}

export { components, registerTo };
