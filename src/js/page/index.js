let Vue = require('vue');
if (Vue.default) {
	Vue = Vue.default;
}

const definition = require('./definition');
const VueTabberPage = Vue.component('VueTabberPage', definition);

module.exports = VueTabberPage;
