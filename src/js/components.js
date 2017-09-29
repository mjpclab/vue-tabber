import labelDefinition from './label/definition';
import pageDefinition from './page/definition';
import tabberDefinition from './tabber/definition';

function registerTo(externalVue) {
	externalVue.component('VueTabberLabel', labelDefinition);
	externalVue.component('VueTabberPage', pageDefinition);
	externalVue.component('VueTabber', tabberDefinition);
}

export default {
	definitions: {
		VueTabberLabel: labelDefinition,
		VueTabberPage: pageDefinition,
		VueTabber: tabberDefinition
	},
	VueTabberLabel: labelDefinition,
	VueTabberPage: pageDefinition,
	VueTabber: tabberDefinition,
	registerTo: registerTo
};
