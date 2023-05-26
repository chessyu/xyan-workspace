const { resolve, join } = require('path')
const meger = require('webpack-merge')
const argv = require('yargs-parser')(process.argv.slice(2))
const _mode = argv.mode || 'development'
const _isProduction = _mode === 'production'
const _megerWebpackConf = require(`./config/webpack.${_mode}.js`)
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

console.log('aaa', process.env.REACT_APP_PROT)
const webpackBaseConfig = {
	entry: {
		app: resolve('./src/index.tsx')
	},
	output: {
		filename: 'scripts/[name].bundle.js',
		path: join(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx|ts|tsx)$/,
				include: [resolve('./src')],
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
			{
				test: /\.(css|less)$/i,
				use: [
					MiniCssExtractPlugin.loader,
					{
						loader: 'css-loader',
						options: {
							importLoaders: 1
						}
					},
					{
						loader: 'postcss-loader'
					},
					{
						loader: require.resolve('less-loader'),
						options: {
							lessOptions: {
								javascriptEnabled: true
							}
						}
					}
				]
			},
			{
				test: /\.(png|jpeg|jpg|gif|eot|woff|woff2|ttf|svg|otf|webp)$/,
				type: 'asset'
			}
		]
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx'],
		alias: {
			'@src': resolve('src'),
			'@pages': resolve('src/pages')
		}
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: _isProduction
				? 'styles/[name].[contenthash:5].css'
				: 'styles/[name].css',
			chunkFilename: _isProduction
				? 'styles/[id].[contenthash:5].css'
				: 'style/[id].css',
			ignoreOrder: true
		}),
		new Dotenv({
			path: `./.env.${argv.env ?? argv.mode}`
		})
	]
}

module.exports = meger.default(webpackBaseConfig, _megerWebpackConf)
