module.exports = {
    env: {
        browser: true,
        es2021: true,
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 12,
        sourceType: 'module',
    },
    plugins: [
        'react',
        '@typescript-eslint',
    ],
    rules: {
        indent: ['error', 4],
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
        'no-unused-vars': 'warn',
        'import/no-extraneous-dependencies': 'off',
        'import/prefer-default-export': 'off',
        'no-useless-return': 'off',
        'consistent-return': 'off',
    },
};
