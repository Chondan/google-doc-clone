module.exports = {
    extends: [
        '../.eslintrc.js',
    ],
    rules: {
        'react/jsx-filename-extension': [1, { extensions: ['.tsx', '.ts'] }],
        'react/jsx-indent': [2, 4, { checkAttributes: true }],
        'react/jsx-use/react': 'off',
        'no-use-before-define': 'off',
        'import/prefer-default-export': 'off',
        'jsx-quotes': ['error', 'prefer-single'],
    },

};
