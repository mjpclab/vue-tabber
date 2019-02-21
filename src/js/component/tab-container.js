import ClassNameSuffix from '../utility/class-name-suffix';
import LabelContainer from './label-container';
import PanelContainer from './panel-container';

const TabContainer = {
	name: 'VueTabberTabContainer',
	props: {
		entries: {type: Array},
		mode: {type: String},
		tabContainerClass: {type: String},
		labelContainerClass: {type: String},
		labelItemClass: {type: String},
		panelContainerClass: {type: String},
		panelItemClass: {type: String},
		delayTriggerLatency: {type: Number},
		showHeaderLabelContainer: {type: Boolean},
		showFooterLabelContainer: {type: Boolean},

		triggerEvents: {type: Array},
		delayTriggerEvents: {type: Array},
		delayTriggerCancelEvents: {type: Array},

		fnSwitchTo: {type: Function},

		tabContext: {type: Object},
		currentIndex: {type: Number}
	},
	render(createElement) {
		const {
			entries,
			mode,
			tabContainerClass,
			labelContainerClass,
			labelItemClass,
			panelContainerClass,
			panelItemClass,
			delayTriggerLatency,
			showHeaderLabelContainer,
			showFooterLabelContainer,

			triggerEvents,
			delayTriggerEvents,
			delayTriggerCancelEvents,

			fnSwitchTo,

			tabContext,
			currentIndex
		} = this.$props;

		const tabContainerModeClass = tabContainerClass + '-' + mode;
		const tabContainerAllClass = [tabContainerClass, tabContainerModeClass];

		const children = [];
		if (showHeaderLabelContainer) {
			children.push(createElement(LabelContainer, {
				props: {
					entries,
					mode,
					labelContainerClass,
					labelItemClass,
					delayTriggerLatency,

					triggerEvents,
					delayTriggerEvents,
					delayTriggerCancelEvents,

					fnSwitchTo,

					tabContext,
					currentIndex,
					side: ClassNameSuffix.header
				}
			}));
		}
		children.push(createElement(PanelContainer, {
			props: {
				entries,
				mode,
				panelContainerClass,
				panelItemClass,

				tabContext,
				currentIndex,
				refLabelSide: showHeaderLabelContainer || !showFooterLabelContainer ? ClassNameSuffix.header : ClassNameSuffix.footer
			}
		}));
		if (showFooterLabelContainer) {
			children.push(createElement(LabelContainer, {
				props: {
					entries,
					mode,
					labelContainerClass,
					labelItemClass,
					delayTriggerLatency,

					triggerEvents,
					delayTriggerEvents,
					delayTriggerCancelEvents,

					fnSwitchTo,

					tabContext,
					currentIndex,
					side: ClassNameSuffix.footer
				}
			}));
		}

		return createElement('div', {
			'class': tabContainerAllClass,
		}, children);
	}
};

export default TabContainer;
