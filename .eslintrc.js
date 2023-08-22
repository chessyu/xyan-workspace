module.exports = {
	root: true,

	env: {
		browser: true,
		es2021: true,
		node: true
	},

	extends: [
		'plugin:prettier/recommended',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended'
	],
	overrides: [],
	parser: '@typescript-eslint/parser',

	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module'
	},

	plugins: ['react', '@typescript-eslint', 'prettier'],
	settings: {
		react: {
			version: 'detect'
		}
	},

	rules: {
		'@typescript-eslint/no-var-requires': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-no-comment-textnodes': 0,
		'@typescript-eslint/no-explicit-any': 0,
		'@typescript-eslint/no-unused-vars': 0,
		'linebreak-style': 0
	}
}
