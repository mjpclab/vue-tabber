import definition from './component';

function registerTo(Vue) {
	return Vue.component('VueTabber', definition);
}

export default registerTo;
