import ClassNameSuffix from '../utility/class-name-suffix';

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
		currentIndex: {type: Number}
	},
	render(createElement) {
		const {
			entries,
			mode,
			panelContainerClass,
			panelItemClass,
			currentIndex
		} = this.$props;

		const panelContainerModeClass = panelContainerClass + '-' + mode;
		const panelContainerAllClass = [panelContainerClass, panelContainerModeClass];

		const panelItemActiveClass = panelItemClass + '-' + ClassNameSuffix.active;
		const panelItemInactiveClass = panelItemClass + '-' + ClassNameSuffix.inactive;
		const panelItemDisabledClass = panelItemClass + '-' + ClassNameSuffix.disabled;
		const panelItemHiddenClass = panelItemClass + '-' + ClassNameSuffix.hidden;

		return createElement('div', {
			'class': panelContainerAllClass,
		}, entries.map((entry, index) => {
			const {panel, key, disabled, hidden} = entry;

			const panelItemAllClass = [panelItemClass];
			panelItemAllClass.push(index === currentIndex ? panelItemActiveClass : panelItemInactiveClass);
			if (disabled) {
				panelItemAllClass.push(panelItemDisabledClass);
			}
			if (hidden) {
				panelItemAllClass.push(panelItemHiddenClass);
			}

			return createElement('div', {
				'class': panelItemAllClass,
				key: key ? 'key-' + key : 'index-' + index,
			}, panel);
		}));
	}
};

export default PanelContainer;
