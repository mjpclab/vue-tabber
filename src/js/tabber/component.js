import {registerTo as registerLabelTo} from '../label/component';
import {registerTo as registerPageTo} from '../page/component';
import definition from './definition';

function registerTo(Vue) {
	registerLabelTo(Vue);
	registerPageTo(Vue);
	return Vue.component('VueTabber', definition);
}

export {registerTo};