const path = require("path");

const javascriptRules = {
	test: /\.js$/i,
	exclude: /(node_modules)/,
	use: {
		loader: 'babel-loader',
		options: {
			presets: ['@babel/preset-env']
		}
	}
}

const styleRules = {
	test: /\.css$/i,
	use: ['style-loader', 'css-loader'],
	exclude: /(node_modules)/
}

const imageRules = {
	test: /\.(png|jpe?g|gif)$/i,
	exclude: /(node_modules)/,
	use: [
		{
			loader: 'file-loader'
		}
	]
}

const svgRules = {
	test: /\.(svg)$/i,
	exclude: /(node_modules)/,
	use: [
		{
			loader: 'svg-inline-loader'
		}
	]
}

const plugins = [];

module.exports = {
	entry: './src/index.js',
	devtool: "source-map",
	module: {
		rules: [
			javascriptRules,
			styleRules,
			imageRules,
			svgRules
		]
	},
	context: __dirname,
	node: {
		__filename: true
	},
	plugins: plugins,
	resolve: {
		alias: {
			"paella-core/js": path.resolve(__dirname, "src/js"),
			"paella-core/styles": path.resolve(__dirname, "src/css"),
			"paella-core/icons": path.resolve(__dirname, "src/icons")
		}
	},
	performance: {
		hints: false,
		maxEntrypointSize: 1048576,
		maxAssetSize: 1048576
	}
}
