import definition from './component';

function registerTo(Vue) {
	return Vue.component('VueTabberPage', definition);
}

export default registerTo;
