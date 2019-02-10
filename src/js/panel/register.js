import definition from './component';

function registerTo(Vue) {
	return Vue.component('VueTabberPanel', definition);
}

export default registerTo;
