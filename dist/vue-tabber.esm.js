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

var Label = {
  name: 'TabLabel',
  props: {
    disabled: {
      type: [Boolean],
      default: false
    },
    hidden: {
      type: [Boolean],
      default: false
    }
  },
  render: function render() {
    return null;
  }
};

var Panel = {
  name: 'TabPanel',
  render: function render() {
    return null;
  }
};

function isLabel(vNode) {
  return vNode.componentOptions && vNode.componentOptions.Ctor && vNode.componentOptions.Ctor.extendOptions === Label;
}

function isPanel(vNode) {
  return vNode.componentOptions && vNode.componentOptions.Ctor && vNode.componentOptions.Ctor.extendOptions === Panel;
}

function parseEntries(propEntries, vNodes) {
  var entries = []; // prop entries

  if (propEntries && propEntries.length) {
    entries.push.apply(entries, _toConsumableArray(propEntries));
  } // children


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

  vNodes && vNodes.length && vNodes.forEach(function (vNode) {
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

var sharedPropsDefinition = {
  entries: {
    type: Array,
    default: []
  },
  mode: {
    validator: function validator(value) {
      return ['horizontal', 'vertical'].indexOf(value) >= 0;
    },
    default: 'horizontal'
  },
  delayTriggerLatency: {
    type: [Number, String],
    default: 200
  },
  activePosition: {
    type: [Number, String]
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
};

var publicPropsDefinition = _objectSpread({}, sharedPropsDefinition, {
  triggerEvents: {
    type: [Array, String],
    default: 'click'
  },
  delayTriggerEvents: {
    type: [Array, String]
  },
  delayTriggerCancelEvents: {
    type: [Array, String]
  }
});

var tabPropsDefinition = _objectSpread({}, publicPropsDefinition, {
  triggerEvents: {
    type: Array
  },
  delayTriggerEvents: {
    type: Array
  },
  delayTriggerCancelEvents: Array
});

var RE_WHITESPACES = /\s+/;

function normalizeEvents(events) {
  if (!events) {
    return [];
  }

  var arrayed = Array.isArray(events) ? events : String(events).split(RE_WHITESPACES);
  var normalized = arrayed.filter(Boolean);
  return normalized;
}

var ClassNameSuffix = {
  active: 'active',
  inactive: 'inactive',
  disabled: 'disabled',
  hidden: 'hidden',
  header: 'header',
  footer: 'footer'
};

function createEventHandler(events, handler) {
  var eventHandlers = {};
  events.forEach(function (event) {
    eventHandlers[event] = handler;
  });
  return eventHandlers;
}

var PREFIX = '__vue-tabber';
var NUMBER_MAX_SAFE_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
var currentTabberContainerId = -1;

function getNextTabContainerId() {
  currentTabberContainerId = (currentTabberContainerId + 1) % NUMBER_MAX_SAFE_INTEGER;
  return currentTabberContainerId;
}

function getLabelItemId(tabberId, side, index) {
  return "".concat(PREFIX, "__").concat(tabberId, "__").concat(side, "__label__").concat(index);
}

function getPanelItemId(tabberId, index) {
  return "".concat(PREFIX, "__").concat(tabberId, "__panel__").concat(index);
}

var LabelContainer = {
  name: 'VueTabberLabelContainer',
  props: {
    entries: {
      type: Array
    },
    mode: {
      type: String
    },
    labelContainerClass: {
      type: String
    },
    labelItemClass: {
      type: String
    },
    delayTriggerLatency: {
      type: Number
    },
    triggerEvents: {
      type: Array
    },
    delayTriggerEvents: {
      type: Array
    },
    delayTriggerCancelEvents: {
      type: Array
    },
    fnSwitchTo: {
      type: Function
    },
    tabContext: {
      type: Object
    },
    currentIndex: {
      type: Number
    },
    side: {
      type: String
    }
  },
  render: function render(createElement) {
    var _this$$props = this.$props,
        entries = _this$$props.entries,
        mode = _this$$props.mode,
        labelContainerClass = _this$$props.labelContainerClass,
        labelItemClass = _this$$props.labelItemClass,
        delayTriggerLatency = _this$$props.delayTriggerLatency,
        triggerEvents = _this$$props.triggerEvents,
        delayTriggerEvents = _this$$props.delayTriggerEvents,
        delayTriggerCancelEvents = _this$$props.delayTriggerCancelEvents,
        fnSwitchTo = _this$$props.fnSwitchTo,
        tabContext = _this$$props.tabContext,
        currentIndex = _this$$props.currentIndex,
        side = _this$$props.side;
    var labelContainerAllClass = [labelContainerClass, labelContainerClass + '-' + side, labelContainerClass + '-' + mode, labelContainerClass + '-' + side + '-' + mode];
    var labelItemActiveClass = labelItemClass + '-' + ClassNameSuffix.active;
    var labelItemInactiveClass = labelItemClass + '-' + ClassNameSuffix.inactive;
    var labelItemDisabledClass = labelItemClass + '-' + ClassNameSuffix.disabled;
    var labelItemHiddenClass = labelItemClass + '-' + ClassNameSuffix.hidden;
    var tabberId = tabContext.tabberId;
    return createElement('div', {
      'class': labelContainerAllClass,
      attrs: {
        role: 'tablist'
      }
    }, entries.map(function (entry, index) {
      var label = entry.label,
          key = entry.key,
          disabled = entry.disabled,
          hidden = entry.hidden;
      var pos = {
        index: index,
        key: key
      };
      var delayTriggerCancelEventHandlers;
      var delayTriggerEventHandlers;
      var triggerEventHandlers;

      if (!disabled && !hidden) {
        var doSwitch = function doSwitch() {
          clearTimeout(tabContext.delayTimeout);
          fnSwitchTo(pos);
        };

        var localDelayTimeout;
        var delayDoSwitch = delayTriggerLatency <= 0 ? doSwitch : function () {
          clearTimeout(tabContext.delayTimeout);
          localDelayTimeout = tabContext.delayTimeout = setTimeout(doSwitch, delayTriggerLatency);
        };

        var cancelDelayDoSwitch = function cancelDelayDoSwitch() {
          if (localDelayTimeout === tabContext.delayTimeout) {
            clearTimeout(localDelayTimeout);
          }
        };

        triggerEventHandlers = createEventHandler(triggerEvents, doSwitch);

        if (delayTriggerEvents && delayTriggerEvents.length) {
          delayTriggerEventHandlers = createEventHandler(delayTriggerEvents, delayDoSwitch);
          delayTriggerCancelEventHandlers = createEventHandler(delayTriggerCancelEvents, cancelDelayDoSwitch);
        }
      }

      var isActive = index === currentIndex;
      var labelItemAllClass = [labelItemClass];
      labelItemAllClass.push(isActive ? labelItemActiveClass : labelItemInactiveClass);

      if (disabled) {
        labelItemAllClass.push(labelItemDisabledClass);
      }

      if (hidden) {
        labelItemAllClass.push(labelItemHiddenClass);
      }

      return createElement('div', {
        'class': labelItemAllClass,
        attrs: {
          tabIndex: 0,
          id: getLabelItemId(tabberId, side, index),
          role: 'tab',
          'aria-controls': getPanelItemId(tabberId, index),
          'aria-selected': isActive,
          'aria-expanded': isActive
        },
        on: _objectSpread({}, delayTriggerCancelEventHandlers, delayTriggerEventHandlers, triggerEventHandlers),
        key: key ? 'key-' + key : 'index-' + index
      }, label);
    }));
  }
};

var PanelContainer = {
  name: 'VueTabberPanelContainer',
  props: {
    entries: {
      type: Array
    },
    mode: {
      type: String
    },
    panelContainerClass: {
      type: String
    },
    panelItemClass: {
      type: String
    },
    panelItemActiveClass: {
      type: String
    },
    panelItemInactiveClass: {
      type: String
    },
    panelItemDisabledClass: {
      type: String
    },
    panelItemHiddenClass: {
      type: String
    },
    tabContext: {
      type: Object
    },
    currentIndex: {
      type: Number
    },
    refLabelSide: {
      type: String
    }
  },
  render: function render(createElement) {
    var _this$$props = this.$props,
        entries = _this$$props.entries,
        mode = _this$$props.mode,
        panelContainerClass = _this$$props.panelContainerClass,
        panelItemClass = _this$$props.panelItemClass,
        tabContext = _this$$props.tabContext,
        currentIndex = _this$$props.currentIndex,
        refLabelSide = _this$$props.refLabelSide;
    var panelContainerModeClass = panelContainerClass + '-' + mode;
    var panelContainerAllClass = [panelContainerClass, panelContainerModeClass];
    var panelItemActiveClass = panelItemClass + '-' + ClassNameSuffix.active;
    var panelItemInactiveClass = panelItemClass + '-' + ClassNameSuffix.inactive;
    var panelItemDisabledClass = panelItemClass + '-' + ClassNameSuffix.disabled;
    var panelItemHiddenClass = panelItemClass + '-' + ClassNameSuffix.hidden;
    var tabberId = tabContext.tabberId;
    return createElement('div', {
      'class': panelContainerAllClass
    }, entries.map(function (entry, index) {
      var panel = entry.panel,
          key = entry.key,
          disabled = entry.disabled,
          hidden = entry.hidden;
      var isActive = index === currentIndex;
      var panelItemAllClass = [panelItemClass];
      panelItemAllClass.push(isActive ? panelItemActiveClass : panelItemInactiveClass);

      if (disabled) {
        panelItemAllClass.push(panelItemDisabledClass);
      }

      if (hidden) {
        panelItemAllClass.push(panelItemHiddenClass);
      }

      return createElement('div', {
        'class': panelItemAllClass,
        attrs: {
          id: getPanelItemId(tabberId, index),
          role: 'tabpanel',
          'aria-labelledby': getLabelItemId(tabberId, refLabelSide, index),
          'aria-hidden': !isActive
        },
        key: key ? 'key-' + key : 'index-' + index
      }, panel);
    }));
  }
};

var TabContainer = {
  name: 'VueTabberTabContainer',
  props: {
    entries: {
      type: Array
    },
    mode: {
      type: String
    },
    tabContainerClass: {
      type: String
    },
    labelContainerClass: {
      type: String
    },
    labelItemClass: {
      type: String
    },
    panelContainerClass: {
      type: String
    },
    panelItemClass: {
      type: String
    },
    delayTriggerLatency: {
      type: Number
    },
    showHeaderLabelContainer: {
      type: Boolean
    },
    showFooterLabelContainer: {
      type: Boolean
    },
    triggerEvents: {
      type: Array
    },
    delayTriggerEvents: {
      type: Array
    },
    delayTriggerCancelEvents: {
      type: Array
    },
    fnSwitchTo: {
      type: Function
    },
    tabContext: {
      type: Object
    },
    currentIndex: {
      type: Number
    }
  },
  render: function render(createElement) {
    var _this$$props = this.$props,
        entries = _this$$props.entries,
        mode = _this$$props.mode,
        tabContainerClass = _this$$props.tabContainerClass,
        labelContainerClass = _this$$props.labelContainerClass,
        labelItemClass = _this$$props.labelItemClass,
        panelContainerClass = _this$$props.panelContainerClass,
        panelItemClass = _this$$props.panelItemClass,
        delayTriggerLatency = _this$$props.delayTriggerLatency,
        showHeaderLabelContainer = _this$$props.showHeaderLabelContainer,
        showFooterLabelContainer = _this$$props.showFooterLabelContainer,
        triggerEvents = _this$$props.triggerEvents,
        delayTriggerEvents = _this$$props.delayTriggerEvents,
        delayTriggerCancelEvents = _this$$props.delayTriggerCancelEvents,
        fnSwitchTo = _this$$props.fnSwitchTo,
        tabContext = _this$$props.tabContext,
        currentIndex = _this$$props.currentIndex;
    var tabContainerModeClass = tabContainerClass + '-' + mode;
    var tabContainerAllClass = [tabContainerClass, tabContainerModeClass];
    var children = [];

    if (showHeaderLabelContainer) {
      children.push(createElement(LabelContainer, {
        props: {
          entries: entries,
          mode: mode,
          labelContainerClass: labelContainerClass,
          labelItemClass: labelItemClass,
          delayTriggerLatency: delayTriggerLatency,
          triggerEvents: triggerEvents,
          delayTriggerEvents: delayTriggerEvents,
          delayTriggerCancelEvents: delayTriggerCancelEvents,
          fnSwitchTo: fnSwitchTo,
          tabContext: tabContext,
          currentIndex: currentIndex,
          side: ClassNameSuffix.header
        }
      }));
    }

    children.push(createElement(PanelContainer, {
      props: {
        entries: entries,
        mode: mode,
        panelContainerClass: panelContainerClass,
        panelItemClass: panelItemClass,
        tabContext: tabContext,
        currentIndex: currentIndex,
        refLabelSide: showHeaderLabelContainer || !showFooterLabelContainer ? ClassNameSuffix.header : ClassNameSuffix.footer
      }
    }));

    if (showFooterLabelContainer) {
      children.push(createElement(LabelContainer, {
        props: {
          entries: entries,
          mode: mode,
          labelContainerClass: labelContainerClass,
          labelItemClass: labelItemClass,
          delayTriggerLatency: delayTriggerLatency,
          triggerEvents: triggerEvents,
          delayTriggerEvents: delayTriggerEvents,
          delayTriggerCancelEvents: delayTriggerCancelEvents,
          fnSwitchTo: fnSwitchTo,
          tabContext: tabContext,
          currentIndex: currentIndex,
          side: ClassNameSuffix.footer
        }
      }));
    }

    return createElement('div', {
      'class': tabContainerAllClass
    }, children);
  }
};

var invalidNormalizedPosition = {
  index: -1,
  key: undefined
};

function normalizePosition(entries, position) {
  if (typeof position === 'number') {
    return {
      index: position,
      key: entries[position] && entries[position].key
    };
  } else if (isFinite(position)) {
    var index = parseInt(position);
    return {
      index: index,
      key: entries[index].key
    };
  } else if (position) {
    var result = undefined;
    entries.some(function (entry, i) {
      if (entry.key === position) {
        result = {
          index: i,
          key: entry.key
        };
        return true;
      }

      return false;
    });
    return result || invalidNormalizedPosition;
  } else {
    return invalidNormalizedPosition;
  }
}

var Tab = {
  name: 'VueTabberTab',
  props: tabPropsDefinition,
  created: function created() {
    this.tabContext = {
      tabberId: getNextTabContainerId(),
      delayTimeout: 0
    };
    this.prevPosition = invalidNormalizedPosition;
    this.currentPosition = invalidNormalizedPosition;
    this.updateTargetPosition();
  },
  data: function data() {
    return {
      manageTargetPosition: true,
      targetPosition: -1
    };
  },
  methods: {
    updateTargetPosition: function updateTargetPosition() {
      var activePosition = this.activePosition;

      if (activePosition === undefined || activePosition === null || typeof activePosition === 'number' && !isFinite(activePosition)) {
        this.manageTargetPosition = true;
      } else {
        this.targetPosition = activePosition;
        this.manageTargetPosition = false;
      }
    },
    updateCurrentPosition: function updateCurrentPosition() {
      var prevPosition = this.prevPosition,
          currentPosition = this.currentPosition;

      if (prevPosition.index !== currentPosition.index) {
        this.$emit('switched', prevPosition, currentPosition);
      }

      this.prevPosition = currentPosition;
    },
    switchTo: function switchTo(normalizedPosition) {
      if (this.manageTargetPosition) {
        this.targetPosition = normalizedPosition.index;
      } else {
        this.$emit('updateActivePosition', normalizedPosition);
      }

      return normalizedPosition;
    }
  },
  watch: {
    activePosition: function activePosition(value) {
      this.updateTargetPosition(value);
    }
  },
  beforeUnmount: function beforeUnmount() {
    clearTimeout(this.delayTimeout);
  },
  render: function render(createElement) {
    var _this$$props = this.$props,
        entries = _this$$props.entries,
        mode = _this$$props.mode,
        tabContainerClass = _this$$props.tabContainerClass,
        labelContainerClass = _this$$props.labelContainerClass,
        labelItemClass = _this$$props.labelItemClass,
        panelContainerClass = _this$$props.panelContainerClass,
        panelItemClass = _this$$props.panelItemClass,
        delayTriggerLatency = _this$$props.delayTriggerLatency,
        showHeaderLabelContainer = _this$$props.showHeaderLabelContainer,
        showFooterLabelContainer = _this$$props.showFooterLabelContainer,
        triggerEvents = _this$$props.triggerEvents,
        delayTriggerEvents = _this$$props.delayTriggerEvents,
        delayTriggerCancelEvents = _this$$props.delayTriggerCancelEvents;
    var tabContext = this.tabContext,
        normalizedPrevPosition = this.prevPosition;
    var prevIndex = normalizedPrevPosition.index;
    var targetPosition = this.$data.targetPosition;
    var normalizedTargetPosition = normalizePosition(entries, targetPosition);
    var targetIndex = normalizedTargetPosition.index;
    var entryCount = entries.length;
    var currentIndex;

    if (targetIndex === -1) {
      currentIndex = entryCount > 0 ? 0 : -1;
      this.currentPosition = normalizePosition(entries, currentIndex);
    } else if (targetIndex < entryCount) {
      currentIndex = targetIndex;
      this.currentPosition = normalizedTargetPosition;
    } else {
      currentIndex = entryCount - 1;
      this.currentPosition = normalizePosition(entries, currentIndex);
    }

    if (prevIndex !== currentIndex) {
      this.$emit('switching', normalizedPrevPosition, this.currentPosition);
    }

    return createElement(TabContainer, {
      props: {
        entries: entries,
        mode: mode,
        tabContainerClass: tabContainerClass,
        labelContainerClass: labelContainerClass,
        labelItemClass: labelItemClass,
        panelContainerClass: panelContainerClass,
        panelItemClass: panelItemClass,
        delayTriggerLatency: delayTriggerLatency,
        showHeaderLabelContainer: showHeaderLabelContainer,
        showFooterLabelContainer: showFooterLabelContainer,
        triggerEvents: triggerEvents,
        delayTriggerEvents: delayTriggerEvents,
        delayTriggerCancelEvents: delayTriggerCancelEvents,
        fnSwitchTo: this.switchTo,
        tabContext: tabContext,
        currentIndex: currentIndex
      }
    });
  },
  mounted: function mounted() {
    this.updateCurrentPosition();
  },
  updated: function updated() {
    this.updateCurrentPosition();
  }
};

var Index = {
  Label: Label,
  Panel: Panel,
  name: 'VueTabber',
  props: publicPropsDefinition,
  render: function render(createElement) {
    var slotChildren = this.$slots.default;
    var _this$$props = this.$props,
        entries = _this$$props.entries,
        triggerEvents = _this$$props.triggerEvents,
        delayTriggerEvents = _this$$props.delayTriggerEvents,
        delayTriggerCancelEvents = _this$$props.delayTriggerCancelEvents;
    return createElement(Tab, {
      props: _objectSpread({}, this.$props, {
        entries: parseEntries(entries, slotChildren),
        triggerEvents: normalizeEvents(triggerEvents),
        delayTriggerEvents: normalizeEvents(delayTriggerEvents),
        delayTriggerCancelEvents: normalizeEvents(delayTriggerCancelEvents)
      }),
      on: this.$listeners
    });
  }
};

export default Index;
