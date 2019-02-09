import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import vue from 'rollup-plugin-vue';
import commonjs from 'rollup-plugin-commonjs';
import {uglify} from 'rollup-plugin-uglify';

const getConfig = function (format, filename) {
	const isMinify = filename.indexOf('.min') >= 0;

	const config = {
		input: 'src/js/index.js',
		output: {
			name: 'vue-tabber',
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
	getConfig('umd', 'vue-tabber'),
	getConfig('umd', 'vue-tabber.min'),
	getConfig('esm', 'vue-tabber.esm')
];
