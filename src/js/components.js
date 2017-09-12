const labelDefinition = require('./label/definition');
const pageDefinition = require('./page/definition');
const tabberDefinition = require('./tabber/definition');

function getDefinitions() {
	return {
		VueTabberLabel: labelDefinition,
		VueTabberPage: pageDefinition,
		VueTabber: tabberDefinition
	};
}

function register(externalVue) {
	const difinitions = getDefinitions();
	externalVue.component('VueTabberLabel', labelDefinition);
	externalVue.component('VueTabberPage', pageDefinition);
	externalVue.component('VueTabber', tabberDefinition);
}

module.exports = {
	getDefinitions,
	register
};
