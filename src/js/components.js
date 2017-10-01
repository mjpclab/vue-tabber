import labelDefinition from './label/definition';
import pageDefinition from './page/definition';
import tabberDefinition from './tabber/definition';
import {registerTo} from './tabber/component';

const definitions = {
	VueTabberLabel: labelDefinition,
	VueTabberPage: pageDefinition,
	VueTabber: tabberDefinition
};

export {
	definitions as default,
	definitions,
	labelDefinition as VueTabberLabel,
	pageDefinition as VueTabberPage,
	tabberDefinition as VueTabber,
	registerTo
};
