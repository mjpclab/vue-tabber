import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';


function createTabContainer(createElement, tabber, entries) {
	const {tabContainerModeClass} = tabber;

	const {showHeaderLabelContainer, showFooterLabelContainer, tabContainerClass} = tabber.$props;

	const headerLabelContainer = showHeaderLabelContainer && createLabelContainer(createElement, tabber, entries, 'header');
	const panelContainer = createPanelContainer(createElement, tabber, entries);
	const footerLabelContainer = showFooterLabelContainer && createLabelContainer(createElement, tabber, entries, 'footer');
	const children = [headerLabelContainer, panelContainer, footerLabelContainer];

	const classes = [tabContainerClass, tabContainerModeClass];

	return createElement('div', {
		'class': classes,
		key: 'tab-container'
	}, children);
}

export default createTabContainer;
