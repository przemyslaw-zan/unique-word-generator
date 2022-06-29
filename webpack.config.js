const path = require( 'path' );
const CleanTerminalPlugin = require( 'clean-terminal-webpack-plugin' );
const MiniCssExtractPlugin = require( 'mini-css-extract-plugin' );

module.exports = {
	entry: [
		'./sampleSrc/script.js',
		'./sampleSrc/style.css'
	],
	output: {
		path: path.resolve( './sampleDist' ),
		filename: 'script.js'
	},
	plugins: [
		new CleanTerminalPlugin( { beforeCompile: true } ),
		new MiniCssExtractPlugin( { filename: 'style.css' } )
	],
	module: {
		rules: [
			{
				test: /\.js$/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [ '@babel/preset-env' ]
					}
				}
			},
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							postcssOptions: {
								plugins: [ 'postcss-preset-env' ]
							}
						}
					}
				]
			}
		]
	}
};
