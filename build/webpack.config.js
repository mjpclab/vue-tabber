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

const getOutputConfig = function (libraryName, libraryExport, isMinify) {
	return {
		library: {
			commonjs: libraryName,
			amd: libraryName,
			root: toCapitalize(libraryName)
		},
		libraryTarget: 'umd',
		libraryExport: libraryExport,
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
	{name: 'vue-tabber', path: 'src/js/vue-tabber', libraryExport: 'default'},
	{name: 'vue-tabber-components', path: 'src/js/components', libraryExport: undefined}
];

let confs = [];
entries.forEach(entry => {
	//development version
	confs.push({
		mode: 'none',
		context: CONTEXT,
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, entry.libraryExport, false),
		module: getModuleConfig(false),
		externals: externalsConfig
	});

	//production version
	confs.push({
		mode: 'production',
		context: CONTEXT,
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, entry.libraryExport, true),
		module: getModuleConfig(true),
		externals: externalsConfig
	});
});

module.exports = confs;
