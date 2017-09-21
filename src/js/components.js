const labelDefinition = require('./label/definition');
const pageDefinition = require('./page/definition');
const tabberDefinition = require('./tabber/definition');

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

module.exports = {
	definitions,
	VueTabberLabel: labelDefinition,
	VueTabberPage: pageDefinition,
	VueTabber: tabberDefinition,
	registerTo
};
