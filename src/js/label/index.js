let Vue = require('vue');
if (Vue.default) {
	Vue = Vue.default;
}

const definition = require('./definition');
const VueTabberLabel = Vue.component('VueTabberLabel', definition);

module.exports = VueTabberLabel;
