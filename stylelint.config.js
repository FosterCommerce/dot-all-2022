module.exports = {
	extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
	// add your custom config here
	// https://stylelint.io/user-guide/configuration
	rules: {
		indentation: null,
		'at-rule-no-unknown': null,
		'at-rule-empty-line-before': null,
		'comment-empty-line-before': null,
		'no-descending-specificity': null,
		'declaration-colon-newline-after': null,
	},
}
