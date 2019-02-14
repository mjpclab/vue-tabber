import createTabContainer from '../feature/create-tab-container';
import getValidEvents from '../utility/get-valid-events';
import {TabContainerPropsDefinition} from '../utility/props-definition';

function getValidIndex(index) {
	if (index === '' || !isFinite(index) || isNaN(index)) {
		return -1;
	}

	const intIndex = parseInt(index);
	return intIndex < 0 ? 0 : index;
}

const TabContainer = {
	name: 'TabContainer',
	props: TabContainerPropsDefinition,
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
	computed: {
		tabContainerModeClass() {
			return this.tabContainerClass + '-' + this.mode;
		},
		labelItemActiveClass() {
			return this.labelItemClass + '-' + 'active';
		},
		labelItemInactiveClass() {
			return this.labelItemClass + '-' + 'inactive';
		},
		labelItemDisabledClass() {
			return this.labelItemClass + '-' + 'disabled';
		},
		labelItemHiddenClass() {
			return this.labelItemClass + '-' + 'hidden';
		},
		panelItemActiveClass() {
			return this.panelItemClass + '-' + 'active';
		},
		panelItemInactiveClass() {
			return this.panelItemClass + '-' + 'inactive';
		},
		panelItemDisabledClass() {
			return this.panelItemClass + '-' + 'disabled';
		},
		panelItemHiddenClass() {
			return this.panelItemClass + '-' + 'hidden';
		}
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
		this.count = this.entries.length;
		const oldIndex = this.currentIndex;
		const newIndex = this.targetIndex >= this.count ? this.count - 1 : this.targetIndex;
		if (oldIndex !== newIndex) {
			this.currentIndex = newIndex;
			this.$emit('switching', oldIndex, newIndex);
			this.$emit('update:activeIndex', newIndex);
		}

		return createTabContainer(createElement, this);
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

export default TabContainer;
