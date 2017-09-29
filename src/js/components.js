import labelDefinition from './label/definition';
import pageDefinition from './page/definition';
import tabberDefinition from './tabber/definition';

const definitions = {
	VueTabberLabel: labelDefinition,
	VueTabberPage: pageDefinition,
	VueTabber: tabberDefinition
};

function registerTo(externalVue) {
	externalVue.component('VueTabberLabel', labelDefinition);
	externalVue.component('VueTabberPage', pageDefinition);
	externalVue.component('VueTabber', tabberDefinition);
}

export default {
	definitions,
	VueTabberLabel: labelDefinition,
	VueTabberPage: pageDefinition,
	VueTabber: tabberDefinition,
	registerTo
};
