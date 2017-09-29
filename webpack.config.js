const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

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

const PACKAGE_FILE = 'package.json';
const thePackage = JSON.parse(fs.readFileSync(PACKAGE_FILE));

const getEntryConfig = function (entry) {
	return path.resolve(__dirname, entry);
};

const getOutputConfig = function (libraryName, isMinify) {
	return {
		library: {
			commonjs: libraryName,
			amd: libraryName,
			root: toCapitalize(libraryName)
		},
		libraryTarget: 'umd',
		path: path.resolve(__dirname, 'dist/'),
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
	{name: 'vue-tabber', path: 'src/js/tabber/index'},
	{name: 'vue-tabber-with-css', path: 'src/js/tabber/index-with-css'},
	{name: 'vue-tabber-components', path: 'src/js/components'}
];

let confs = [];
entries.forEach(entry => {
	//development version
	confs.push({
		entry: getEntryConfig(entry.path),
		output: getOutputConfig(entry.name, false),
		module: getModuleConfig(false),
		externals: externalsConfig,
		plugins: [],
		devtool: 'source-map'
	});

	//production version
	confs.push({
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
		],
		devtool: 'source-map'
	});
});

module.exports = confs;