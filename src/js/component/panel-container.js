import ClassNameSuffix from '../utility/class-name-suffix';
import {getLabelItemId, getPanelItemId} from '../utility/get-id';

const PanelContainer = {
	name: 'VueTabberPanelContainer',
	props: {
		entries: {type: Array},
		mode: {type: String},
		panelContainerClass: {type: String},
		panelItemClass: {type: String},
		panelItemActiveClass: {type: String},
		panelItemInactiveClass: {type: String},
		panelItemDisabledClass: {type: String},
		panelItemHiddenClass: {type: String},

		tabContext: {type: Object},
		currentIndex: {type: Number},
		refLabelSide: {type: String}
	},
	render(createElement) {
		const {
			entries,
			mode,
			panelContainerClass,
			panelItemClass,

			tabContext,
			currentIndex,
			refLabelSide
		} = this.$props;

		const panelContainerModeClass = panelContainerClass + '-' + mode;
		const panelContainerAllClass = [panelContainerClass, panelContainerModeClass];

		const panelItemActiveClass = panelItemClass + '-' + ClassNameSuffix.active;
		const panelItemInactiveClass = panelItemClass + '-' + ClassNameSuffix.inactive;
		const panelItemDisabledClass = panelItemClass + '-' + ClassNameSuffix.disabled;
		const panelItemHiddenClass = panelItemClass + '-' + ClassNameSuffix.hidden;

		const {tabberId} = tabContext;

		return createElement('div', {
			'class': panelContainerAllClass,
		}, entries.map((entry, index) => {
			const {panel, key, disabled, hidden} = entry;

			const isActive = index === currentIndex;
			const panelItemAllClass = [panelItemClass];
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
				key: key ? 'key-' + key : 'index-' + index,
			}, panel);
		}));
	}
};

export default PanelContainer;
