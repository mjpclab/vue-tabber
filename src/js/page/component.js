import definition from './definition';

function registerTo(Vue) {
	return Vue.component('VueTabberPage', definition);
}

export {registerTo};