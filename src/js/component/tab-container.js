import {h} from 'vue';
import ClassNameSuffix from '../utility/class-name-suffix';
import LabelContainer from './label-container';
import PanelContainer from './panel-container';

const TabContainer = {
	name: 'VueTabberTabContainer',
	props: {
		entries: {type: Array},
		mode: {type: String},
		keyboardSwitch: {type: Boolean},
		delayTriggerLatency: {type: Number},
		showHeaderLabelContainer: {type: Boolean},
		showFooterLabelContainer: {type: Boolean},
		tabContainerClass: {type: String},
		labelContainerClass: {type: String},
		labelItemClass: {type: String},
		panelContainerClass: {type: String},
		panelItemClass: {type: String},

		triggerEvents: {type: Array},
		delayTriggerEvents: {type: Array},
		delayTriggerCancelEvents: {type: Array},

		fnSwitchTo: {type: Function},
		fnSwitchPrevious: {type: Function},
		fnSwitchNext: {type: Function},
		fnSwitchFirst: {type: Function},
		fnSwitchLast: {type: Function},

		tabContext: {type: Object},
		currentIndex: {type: Number}
	},
	render() {
		const {
			entries,
			mode,
			keyboardSwitch,
			delayTriggerLatency,
			showHeaderLabelContainer,
			showFooterLabelContainer,
			tabContainerClass,
			labelContainerClass,
			labelItemClass,
			panelContainerClass,
			panelItemClass,

			triggerEvents,
			delayTriggerEvents,
			delayTriggerCancelEvents,

			fnSwitchTo,
			fnSwitchPrevious,
			fnSwitchNext,
			fnSwitchFirst,
			fnSwitchLast,

			tabContext,
			currentIndex
		} = this.$props;

		const tabContainerModeClass = tabContainerClass + '-' + mode;
		const tabContainerAllClass = [tabContainerClass, tabContainerModeClass];

		const children = [];
		if (showHeaderLabelContainer) {
			children.push(h(LabelContainer, {
				entries,
				mode,
				keyboardSwitch,
				labelContainerClass,
				labelItemClass,
				delayTriggerLatency,

				triggerEvents,
				delayTriggerEvents,
				delayTriggerCancelEvents,

				fnSwitchTo,
				fnSwitchPrevious,
				fnSwitchNext,
				fnSwitchFirst,
				fnSwitchLast,

				tabContext,
				currentIndex,
				side: ClassNameSuffix.header
			}));
		}
		children.push(h(PanelContainer, {
			entries,
			mode,
			panelContainerClass,
			panelItemClass,

			tabContext,
			currentIndex,
			refLabelSide: showHeaderLabelContainer || !showFooterLabelContainer ? ClassNameSuffix.header : ClassNameSuffix.footer
		}));
		if (showFooterLabelContainer) {
			children.push(h(LabelContainer, {
				entries,
				mode,
				keyboardSwitch,
				labelContainerClass,
				labelItemClass,
				delayTriggerLatency,

				triggerEvents,
				delayTriggerEvents,
				delayTriggerCancelEvents,

				fnSwitchTo,
				fnSwitchPrevious,
				fnSwitchNext,
				fnSwitchFirst,
				fnSwitchLast,

				tabContext,
				currentIndex,
				side: ClassNameSuffix.footer
			}));
		}

		return h('div', {
			'class': tabContainerAllClass
		}, children);
	}
};

export default TabContainer;
