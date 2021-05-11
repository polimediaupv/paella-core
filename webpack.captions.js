const path = require('path');
const config = require('./webpack.common');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


config.entry = './src/captions.js';
config.output = {
	path: path.join(__dirname, "debug"),
	filename: 'paella.js',
	sourceMapFilename: 'paella.js.map'
}
config.devtool = "source-map";
config.devServer = {
	port: 8000,
	disableHostCheck: true,
	headers: {
		"Access-Control-Allow-Origin": "*",
		"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
		"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
	}
};

config.plugins.push(new HtmlWebpackPlugin({
	template: "src/captions.html",
	inject: false
}));

config.plugins.push(new CopyWebpackPlugin({
	patterns: [
		{ from: 'config', to: 'config' },
		{ from: 'repository_test/repository', to: 'repository' }
	]
}));

module.exports = config;
