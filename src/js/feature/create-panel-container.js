function createPanelItem(createElement, tabber, entry, index) {
	const {panel, key, disabled, hidden} = entry;

	const {
		panelItemActiveClass,
		panelItemInactiveClass,
		panelItemDisabledClass,
		panelItemHiddenClass
	} = tabber;

	const {panelItemClass} = tabber.$props;

	const {
		currentIndex,
	} = tabber.$data;

	const classes = [panelItemClass];
	classes.push(index === currentIndex ? panelItemActiveClass : panelItemInactiveClass);
	if (disabled) {
		classes.push(panelItemDisabledClass);
	}
	if (hidden) {
		classes.push(panelItemHiddenClass);
	}

	return createElement('div', {
		'class': classes,
		key: key ? 'key-' + key : 'index-' + index,
	}, panel);
}


function createPanelContainer(createElement, tabber, entries) {
	const panelItems = entries.map((entry, index) => createPanelItem(createElement, tabber, entry, index));

	const {panelContainerClass} = tabber.$props;
	const classes = [panelContainerClass,];

	return createElement('div', {
		'class': classes,
		key: 'panel-container'
	}, panelItems);
}

export default createPanelContainer;
