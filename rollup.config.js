import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (filename) {
	const format = filename.indexOf('.esm') >= 0 ? 'esm' : 'umd';
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'src/js/index.js',
		output: {
			name: 'VueTabber',
			format: format,
			globals: {
				vue: 'Vue'
			},
			file: `dist/${filename}.js`,
		},
		external: ['vue'],
		plugins: [
			resolve(),
			babel(),
			vue(),
			isMinify && uglify()
		],
	};

	return config;
};

export default [
	getConfig('vue-tabber'),
	getConfig('vue-tabber.min'),
	getConfig('vue-tabber.esm')
];
