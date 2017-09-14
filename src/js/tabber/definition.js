const Label = require('../label');
const Page = require('../page');

const RE_WHITESPACES = /\s+/;

function isLabel(vnode) {
	return vnode.componentOptions.Ctor === Label;
}

function isPage(vnode) {
	return vnode.componentOptions.Ctor === Page;
}

function getLabelAndPageVnodes(vnodes) {
	return vnodes.filter(vnode => {
		if (!vnode.componentOptions) {
			return false;
		}
		return isLabel(vnode) || isPage(vnode);
	});
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
	eventHandlers.forEach(eventHandler => {
		Object.keys(eventHandler).forEach(event => {
			const handler = eventHandler[event];
			mergedEventHandler[event] = handler;
		})
	});
	return mergedEventHandler;
}

const definition = {
	name: 'VueTabber',
	props: {
		triggerEvents: {type: [Array, String], default: 'click'},
		delayTriggerEvents: {type: [Array, String]},
		delayTriggerCancelEvents: {type: [Array, String]},
		delayTriggerLatency: {type: [Number, String], default: 200},
		activeIndex: {type: [Number, String], default: 0},

		tabContainerClass: {type: String, default: 'tab-container'},

		labelContainerClass: {type: String, default: 'label-container'},
		showTopLabelContainer: {type: Boolean, default: true},
		showBottomLabelContainer: {type: Boolean, default: false},
		topLabelContainerClass: {type: String, default: 'top'},
		bottomLabelContainerClass: {type: String, default: 'bottom'},
		labelItemClass: {type: String, default: 'label-item'},
		labelItemActiveClass: {type: String, default: 'label-active'},
		labelItemInactiveClass: {type: String, default: 'label-inactive'},

		pageContainerClass: {type: String, default: 'page-container'},
		pageItemClass: {type: String, default: 'page-item'},
		pageItemActiveClass: {type: String, default: 'page-active'},
		pageItemInactiveClass: {type: String, default: 'page-inactive'},
	},
	data() {
		return {
			count: 0,
			targetIndex: this.getValidIndex(this.activeIndex),
			currentIndex: -1,
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
		getValidIndex(index) {
			if (!isFinite(index) || isNaN(index)) {
				return -1;
			}

			const intIndex = parseInt(index);
			return intIndex < 0 ? 0 : index;
		},
		switchTo(index) {
			this.targetIndex = this.getValidIndex(index);
		}
	},
	beforeUnmount() {
		clearTimeout(this.delayTimeout);
	},
	render(createElement) {
		//utility
		const _createLabelItem = (childVNodes, index) => {
			const doSwitch = () => {
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

			return createElement('div', {
				'class': {
					[this.labelItemClass]: true,
					[this.labelItemActiveClass]: false,
					[this.labelItemInactiveClass]: true
				},
				on: mergeEventHandlers(
					getEventHandlers(this.validTriggerEvents, doSwitch),
					getEventHandlers(this.validDelayTriggerEvents, delayDoSwitch),
					getEventHandlers(this.validDelayTriggerCancelEvents, cancelDelayDoSwitch)
				)
			}, childVNodes);
		};

		const _createPageItem = (childVNodes) => {
			return createElement('div', {
				'class': {
					[this.pageItemClass]: true,
					[this.pageItemActiveClass]: false,
					[this.pageItemInactiveClass]: true
				}
			}, childVNodes);
		};

		const createLabelAndPageItems = (vnodes) => {
			const labelItems = [];
			const pageItems = [];

			let currentLabel = [];
			let currentPage = [];

			vnodes.forEach(vnode => {
				if (isLabel(vnode)) {
					if (currentLabel.length) {
						labelItems.push(_createLabelItem(currentLabel, labelItems.length));
						pageItems.push(_createPageItem(currentPage, pageItems.length));
					}
					currentLabel = [];
					currentLabel.push.apply(currentLabel, vnode.componentOptions.children);
					currentPage = [];
				}
				else /*if(isPage(item))*/ {
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
				labelItems,
				pageItems
			};
		};

		const createTabContainer = (items) => {
			return createElement('div', {
				'class': {
					[this.tabContainerClass]: true
				}
			}, items);
		};

		const _createLabelContainer = (labelItems, positionClass) => {
			window.labelContainer = createElement('div', {
				'class': {
					[this.labelContainerClass]: true,
					[positionClass]: true
				}
			}, labelItems);
			return window.labelContainer;
		};

		const createTopLabelContainer = (labelItems) => {
			return _createLabelContainer(labelItems, this.topLabelContainerClass);
		};

		const createBottomLabelContainer = (labelItems) => {
			return _createLabelContainer(labelItems, this.bottomLabelContainerClass);
		};

		const createPageContainer = (pageItems) => {
			return createElement('div', {
				'class': {
					[this.pageContainerClass]: true
				}
			}, pageItems);
		};

		const cloneVNode = (vnode) => {
			if (vnode.tag) {
				return createElement(vnode.tag, vnode.data, cloneVNodes(vnode.children));
			}
			else if (vnode.text) {
				return vnode.text;
			}
			else {
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

		const allItems = getLabelAndPageVnodes(slotChildren);
		if (!allItems.length) {
			return;
		}

		//collect labels/pages
		const {labelItems, pageItems} = createLabelAndPageItems(allItems);

		this.count = labelItems.length;
		const oldIndex = this.currentIndex;
		const newIndex = this.targetIndex >= this.count ? this.count - 1 : this.targetIndex;
		this.currentIndex = newIndex;
		if (oldIndex !== newIndex) {
			this.$emit('switch', oldIndex, newIndex);
			this.$emit('update:activeIndex', newIndex);
		}

		labelItems[newIndex].data['class'][this.labelItemActiveClass] = true;
		labelItems[newIndex].data['class'][this.labelItemInactiveClass] = false;

		pageItems[newIndex].data['class'][this.pageItemActiveClass] = true;
		pageItems[newIndex].data['class'][this.pageItemInactiveClass] = false;

		let topLabelItems;
		let bottomLabelItems;
		if (this.showTopLabelContainer && this.showBottomLabelContainer) {
			topLabelItems = labelItems;
			bottomLabelItems = cloneVNodes(labelItems);
		}
		else {
			topLabelItems = bottomLabelItems = labelItems;
		}

		// top label container
		const topLabelContainer = this.showTopLabelContainer && createTopLabelContainer(topLabelItems);

		//page container
		const pageContainer = createPageContainer(pageItems);

		// bottom label container
		const bottomLabelContainer = this.showBottomLabelContainer && createBottomLabelContainer(bottomLabelItems);

		//tabb container
		const tabContaienr = createTabContainer([topLabelContainer, pageContainer, bottomLabelContainer]);

		//return
		return tabContaienr;
	}
};

module.exports = definition;