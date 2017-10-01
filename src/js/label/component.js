import definition from './definition';

function registerTo(Vue) {
	return Vue.component('VueTabberLabel', definition);
}

export {registerTo};