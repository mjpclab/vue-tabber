import definition from './component';

function registerTo(Vue) {
	return Vue.component('VueTabberLabel', definition);
}

export default registerTo;
