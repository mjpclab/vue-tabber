import VueTabberLabel from './component/label';
import VueTabberPanel from './component/panel';
import VueTabber from './component/tabber';

const components = {VueTabber, VueTabberLabel, VueTabberPanel};

function registerTo(Vue) {
	Vue.component('VueTabber', VueTabber);
	Vue.component('VueTabberLabel', VueTabberLabel);
	Vue.component('VueTabberPanel', VueTabberPanel);
}

export {components, registerTo};
