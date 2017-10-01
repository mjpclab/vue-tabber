const webpack = require('webpack');
const path = require('path');

const CONTEXT = path.resolve(__dirname, '../');

function toCapitalize(str) {
	let result = str.replace(/-+/g, '-').replace(/^-+/, '').replace(/-+$/, '');
	result = result.substr(0, 1).toUpperCase() + result.substr(1);
	while (true) {
		let sepPos = result.search(/-./);
		if (sepPos === -1) break;
		result = result.substr(0, sepPos) + result.substr(sepPos + 1, 1).toUpperCase() + result.substr(sepPos + 2);
	}
	return result;
}

const getEntryConfig = function (entry) {
	return path.resolve(entry);
};

const getOutputConfig = function (libraryName, isMinify) {
	return {
		library: {
			commonjs: libraryName,
			amd: libraryName,
			root: toCapitalize(libraryName)
		},
		libraryTarget: 'umd',
		path: path.resolve('dist'),
		filename: libraryName + (isMinify ? '.min' : '') + '.js'
	};
};

const getModuleConfig = function (isMinify) {
	return {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {loader: 'babel-loader'}
			},
			{
				test: /\.css$/,
				use: [
					{loader: 'style-loader'},
					{loader: 'css-loader', options: {minimize: isMinify}}
				]
			}
		]
	};
};

const externalsConfig = {
	vue: {
		commonjs: 'vue',
		commonjs2: 'vue',
		amd: 'vue',
		root: 'Vue'
	}
};

const entries = [
	{name: 'vue-tabber', path: 'src/js/vue-tabber'},
	{name: 'vue-tabber-css', path: 'src/js/css'},
	{name: 'vue-tabber-with-css', path: 'src/js/vue-tabber-with-css'},
	{name: 'vue-tabber-components', path: 'src/js/components'}
];

let confs = [];
entries.forEach(entry => {
	//development version
	confs.push({
		context: CONTEXT,
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, false),
		module: getModuleConfig(false),
		externals: externalsConfig,
		plugins: []
	});

	//production version
	confs.push({
		context: CONTEXT,
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, true),
		module: getModuleConfig(true),
		externals: externalsConfig,
		plugins: [
			new webpack.optimize.UglifyJsPlugin({
				compress: {
					warnings: false,
					properties: false
				},
				sourceMap: true
			}),
			new webpack.DefinePlugin({
				'process.env': {
					'NODE_ENV': JSON.stringify('production')
				}
			})
		]
	});
});

module.exports = confs;