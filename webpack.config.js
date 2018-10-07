"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const pkg = require(path.join(process.cwd(), 'package.json'));
const { NODE_ENV } = process.env;
const CWD = process.cwd();
const babelOptions = {
	presets: [
		['@babel/preset-env', {
			modules: false,
			targets: {
				browsers: [
					'last 2 versions',
					'Firefox ESR',
					'> 1%',
					'ie >= 9',
					'iOS >= 8',
					'Android >= 4',
				]
			}
		}],
		'@babel/preset-react'
	],
	plugins: [
		['@babel/plugin-transform-runtime']
	]
};
exports.default = ({
	mode: NODE_ENV,
	entry: './index.js',
	externals: {
		react: {
			root: 'React',
			commonjs2: 'react',
			commonjs: 'react',
			amd: 'react'
		},
		'react-dom': {
			root: 'ReactDOM',
			commonjs2: 'react-dom',
			commonjs: 'react-dom',
			amd: 'react-dom'
		}
	},
	context: CWD,
	output: {
		filename: 'index.js',
		path: path.join(CWD, 'lib'),
		libraryTarget: "umd",
		library: pkg.name
	},
	resolve: {
		extensions: ['.js', '.ts', '.tsx']
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					{
						loader: 'babel-loader',
						options: babelOptions
					},
					{
						loader: 'ts-loader',
						options: {
							transpileOnly: true
						}
					}
				]
			}
		]
	},
	performance: {
		hints: false
	},
	stats: {
		modules: false,
		moduleTrace: false,
		children: false
	},
	plugins: [
		new CleanWebpackPlugin(['lib/index.js'], {
			root: CWD,
			verbose: true,
			dry: false
		})
	]
});
