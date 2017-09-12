let Vue = require('vue');
if (Vue.default) {
	Vue = Vue.default;
}

const definition = require('./definition');
const VueTabber = Vue.component('VueTabber', definition);

module.exports = VueTabber;
