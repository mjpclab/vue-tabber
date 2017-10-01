//npm install --save-dev rollup rollup-plugin-babel rollup-plugin-node-resolve rollup-plugin-uglify rollup-plugin-vue

import node from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
//import uglify from 'rollup-plugin-uglify';

export default {
	input: 'src/js/tabber/index',
	output: {
		file: 'dist/vue-tabber.js',
		format: 'umd'
	},
	name: 'VueTabber',
	globals: {
		'vue': 'Vue'
	},
	external: ['vue'],
	plugins: [
		node(),
		babel(),
		vue(),
		//uglify()
	]
};
