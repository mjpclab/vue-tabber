const RE_WHITESPACES = /\s+/;
const RE_TAG_LABEL = /[Vv]ue-?[Tt]abber-?[Ll]abel/;
const RE_TAG_PANEL = /[Vv]ue-?[Tt]abber-?[Pp]anel/;

function isLabel(vnode) {
	return vnode.componentOptions && RE_TAG_LABEL.test(vnode.componentOptions.tag);
}

function isPanel(vnode) {
	return vnode.componentOptions && RE_TAG_PANEL.test(vnode.componentOptions.tag);
}

function getValidIndex(index) {
	if (index === '' || !isFinite(index) || isNaN(index)) {
		return -1;
	}

	const intIndex = parseInt(index);
	return intIndex < 0 ? 0 : index;
}

function getValidEvents(eventList) {
	if (eventList) {
		const validEvents = [];
		const events = Array.isArray(eventList) ? eventList : String(eventList).split(RE_WHITESPACES);
		events.length && events.forEach(eventName => {
			eventName && validEvents.push(eventName);
		});
		return validEvents;
	}
}

function getEventHandlers(events, handler) {
	const on = {};
	events && events.forEach(eventName => {
		on[eventName] = handler;
	});
	return on;
}

function mergeEventHandlers(...eventHandlers) {
	const mergedEventHandler = {};
	eventHandlers && eventHandlers.forEach(eventHandler => {
		eventHandler && Object.keys(eventHandler).forEach(event => {
			const handler = eventHandler[event];
			mergedEventHandler[event] = handler;
		})
	});
	return mergedEventHandler;
}

const component = {
	name: 'VueTabber',
	props: {
		triggerEvents: {type: [Array, String], default: 'click'},
		delayTriggerEvents: {type: [Array, String]},
		delayTriggerCancelEvents: {type: [Array, String]},
		delayTriggerLatency: {type: [Number, String], default: 200},
		activeIndex: {type: [Number, String], default: 0},

		tabContainerClass: {type: String, default: 'tab-container'},

		labelContainerClass: {type: String, default: 'label-container'},
		showHeaderLabelContainer: {type: Boolean, default: true},
		showFooterLabelContainer: {type: Boolean, default: false},
		headerLabelContainerClass: {type: String, default: 'header-container'},
		footerLabelContainerClass: {type: String, default: 'footer-container'},
		labelItemClass: {type: String, default: 'label-item'},
		labelItemActiveClass: {type: String, default: 'label-active'},
		labelItemInactiveClass: {type: String, default: 'label-inactive'},

		panelContainerClass: {type: String, default: 'panel-container'},
		panelItemClass: {type: String, default: 'panel-item'},
		panelItemActiveClass: {type: String, default: 'panel-active'},
		panelItemInactiveClass: {type: String, default: 'panel-inactive'},
	},
	data() {
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
		activeIndex(newValue) {
			this.switchTo(newValue);
		}
	},
	methods: {
		switchTo(index) {
			this.targetIndex = getValidIndex(index);
		}
	},
	beforeUnmount() {
		clearTimeout(this.delayTimeout);
	},
	render(createElement) {
		//utility
		const _createLabelItem = (childVNodes, key, index) => {
			const doSwitch = () => {
				clearTimeout(this.delayTimeout);
				this.switchTo(index);
			};
			let localDelayTimeout;
			const delayDoSwitch = this.delayTriggerLatency <= 0 ?
				doSwitch :
				() => {
					clearTimeout(this.delayTimeout);
					localDelayTimeout = this.delayTimeout = setTimeout(doSwitch, this.delayTriggerLatency);
				};
			const cancelDelayDoSwitch = () => {
				if (localDelayTimeout === this.delayTimeout) {
					clearTimeout(localDelayTimeout);
				}
			};

			const triggerEventHandlers = getEventHandlers(this.validTriggerEvents, doSwitch);
			let delayTriggerEventHandlers;
			let delayTriggerCancelEventHandlers;
			if (this.validDelayTriggerEvents && this.validDelayTriggerEvents.length) {
				delayTriggerEventHandlers = getEventHandlers(this.validDelayTriggerEvents, delayDoSwitch);
				delayTriggerCancelEventHandlers = getEventHandlers(this.validDelayTriggerCancelEvents, cancelDelayDoSwitch);
			}

			return createElement('div', {
				'class': {
					[this.labelItemClass]: true,
					[this.labelItemActiveClass]: false,
					[this.labelItemInactiveClass]: true
				},
				on: mergeEventHandlers(delayTriggerCancelEventHandlers, delayTriggerEventHandlers, triggerEventHandlers),
				key
			}, childVNodes);
		};

		const _createPanelItem = (childVNodes, key) => {
			return createElement('div', {
				'class': {
					[this.panelItemClass]: true,
					[this.panelItemActiveClass]: false,
					[this.panelItemInactiveClass]: true
				},
				key
			}, childVNodes);
		};

		const createLabelAndPanelItems = (vnodes) => {
			const labelItems = [];
			const panelItems = [];
			let key = undefined;

			let currentLabel = [];
			let currentPanel = [];

			vnodes.forEach((vnode, index) => {
				if (isLabel(vnode)) {
					if (currentLabel.length) {
						labelItems.push(_createLabelItem(currentLabel, key, labelItems.length));
						panelItems.push(_createPanelItem(currentPanel, key));
					}
					currentLabel = [];
					currentLabel.push.apply(currentLabel, vnode.componentOptions.children);
					currentPanel = [];
					key = vnode.data.key ? 'key-' + vnode.data.key : 'index-' + index;
				} else {
					if (!currentLabel.length) {
						currentLabel.push('');
					}
					if (isPanel(vnode)) {
						currentPanel.push.apply(currentPanel, vnode.componentOptions.children);
					} else if (vnode.tag) {
						currentPanel.push(vnode);
					}
				}
			});

			if (currentLabel.length) {
				labelItems.push(_createLabelItem(currentLabel, key, labelItems.length));
				panelItems.push(_createPanelItem(currentPanel, key));
			}

			return {
				labelItems,
				panelItems
			};
		};

		const createTabContainer = (items) => {
			return createElement('div', {
				'class': {
					[this.tabContainerClass]: true
				},
				key: 'tab-container'
			}, items);
		};

		const _createLabelContainer = (labelItems, positionClass, position) => {
			return createElement('div', {
				'class': {
					[this.labelContainerClass]: true,
					[positionClass]: true
				},
				key: 'label-container-' + position
			}, labelItems);
		};

		const createHeaderLabelContainer = (labelItems) => {
			return _createLabelContainer(labelItems, this.headerLabelContainerClass, 'header');
		};

		const createFooterLabelContainer = (labelItems) => {
			return _createLabelContainer(labelItems, this.footerLabelContainerClass, 'footer');
		};

		const createPanelContainer = (panelItems) => {
			return createElement('div', {
				'class': {
					[this.panelContainerClass]: true
				},
				key: 'panel-container'
			}, panelItems);
		};

		const cloneVNode = (vnode) => {
			if (vnode.tag) {
				return createElement(vnode.tag, vnode.data, cloneVNodes(vnode.children));
			} else if (vnode.text) {
				return vnode.text;
			} else {
				return vnode;
			}
		};

		const cloneVNodes = (vnodes) => {
			return vnodes.map(vnode => {
				return cloneVNode(vnode);
			});
		};

		//====================================================================================
		//start
		const slotChildren = this.$slots.default;
		if (!slotChildren || !slotChildren.length) {
			return;
		}

		//collect labels/panels
		const {labelItems, panelItems} = createLabelAndPanelItems(slotChildren);

		this.count = labelItems.length;
		const oldIndex = this.currentIndex;
		const newIndex = this.targetIndex >= this.count ? this.count - 1 : this.targetIndex;
		if (oldIndex !== newIndex) {
			this.currentIndex = newIndex;
			this.$emit('switching', oldIndex, newIndex);
			this.$emit('update:activeIndex', newIndex);
		}

		labelItems[newIndex].data['class'][this.labelItemActiveClass] = true;
		labelItems[newIndex].data['class'][this.labelItemInactiveClass] = false;

		panelItems[newIndex].data['class'][this.panelItemActiveClass] = true;
		panelItems[newIndex].data['class'][this.panelItemInactiveClass] = false;

		let headerLabelItems;
		let footerLabelItems;
		if (this.showHeaderLabelContainer && this.showFooterLabelContainer) {
			headerLabelItems = labelItems;
			footerLabelItems = cloneVNodes(labelItems);
		} else {
			headerLabelItems = footerLabelItems = labelItems;
		}

		// top label container
		const headerLabelContainer = this.showHeaderLabelContainer && createHeaderLabelContainer(headerLabelItems);

		//panel container
		const panelContainer = createPanelContainer(panelItems);

		// bottom label container
		const footerLabelContainer = this.showFooterLabelContainer && createFooterLabelContainer(footerLabelItems);

		//tabb container
		const tabContaienr = createTabContainer([headerLabelContainer, panelContainer, footerLabelContainer]);

		//return
		return tabContaienr;
	},
	updated() {
		const oldIndex = this.renderedIndex;
		const newIndex = this.currentIndex;
		if (oldIndex !== newIndex) {
			this.renderedIndex = newIndex;
			this.$emit('switched', oldIndex, newIndex);
		}
	}
};

export default component;
