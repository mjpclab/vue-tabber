import createLabelContainer from './create-label-container';
import createPanelContainer from './create-panel-container';


function createTabContainer(createElement, tabber) {
	const {tabContainerModeClass} = tabber;

	const {showHeaderLabelContainer, showFooterLabelContainer, tabContainerClass} = tabber.$props;

	const headerLabelContainer = showHeaderLabelContainer && createLabelContainer(createElement, tabber, 'header');
	const panelContainer = createPanelContainer(createElement, tabber);
	const footerLabelContainer = showFooterLabelContainer && createLabelContainer(createElement, tabber, 'footer');
	const children = [headerLabelContainer, panelContainer, footerLabelContainer];

	const classes = [tabContainerClass, tabContainerModeClass];

	return createElement('div', {
		'class': classes,
		key: 'tab-container'
	}, children);
}

export default createTabContainer;
