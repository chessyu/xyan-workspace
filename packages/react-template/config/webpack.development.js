const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const argv = require('yargs-parser')(process.argv.slice(2))
require('dotenv').config({ path: `./.env.${argv.env ?? argv.mode}` })
const proxy = require('../config/default.setupProxy.js')

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	output: {
		assetModuleFilename: 'images/[name][ext]'
	},
	devServer: {
		historyApiFallback: true,
		port: process.env.REACT_APP_PROT || 8086,
		client: {
			overlay: {
				errors: true,
				warnings: false
			},
			logging: 'none',
			progress: true
		},
		hot: true,
		open: JSON.parse(process.env.REACT_APP_OPEN) ?? true,
		proxy
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React 开发模板',
			template: resolve(__dirname, '../public/index.html'),
			filename: 'index.html',
			favicon: resolve(__dirname, '../public/favicon.ico')
		})
	]
}
