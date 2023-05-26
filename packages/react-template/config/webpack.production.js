const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const argv = require('yargs-parser')(process.argv.slice(2))
require('dotenv').config({ path: `./.env.${argv.env ?? argv.mode}` })

module.exports = {
	mode: 'production',
	output: {
		assetModuleFilename: 'images/[name].[contenthash:5].bundle.[ext]',
		filename: 'scripts/[name].[contenthash:5].bundle.js',
		publicPath: '/'
	},
	optimization: {
		minimize: true,
		minimizer: [
			new CssMinimizerPlugin({
				test: /\.css$/g
			})
		],
		runtimeChunk: {
			name: entrypoint => `runtime~${entrypoint.name}`
		},
		splitChunks: {
			chunks: 'async',
			minChunks: 1,
			maxAsyncRequests: 5,
			maxInitialRequests: 3,
			name: false,
			cacheGroups: {
				commons: {
					chunks: 'initial',
					minChunks: 2,
					name: 'commons'
				}
			},
			minSize: {
				javasctipt: 100000,
				style: 100000
			}
		}
	},
	plugins: [
		new HtmlWebpackPlugin({
			title: 'React 开发模板',
			template: resolve(__dirname, '../public/index.html'),
			filename: 'index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true
			}
		})
	]
}
