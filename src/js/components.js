import labelDefinition from './label/definition';
import pageDefinition from './page/definition';
import tabberDefinition from './tabber/definition';
import {registerTo} from './tabber/component';

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
