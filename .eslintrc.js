module.exports = {
    env: {
        node: true,
        browser: true,
        es6: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 9,
        ecmaFeatures: {
            experimentalObjectRestSpread: true,
            jsx: true,
        },
        sourceType: 'module',
    },
    plugins: ['@typescript-eslint', 'jest', 'redux-saga'],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:jest/recommended',
        'plugin:redux-saga/recommended',
    ],
    globals: {
        global: true,
    },
    ignorePatterns: ['**/api-export/*'],
    rules: {
        '@typescript-eslint/indent': ['error', 4, { SwitchCase: 1 }],
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/member-delimiter-style': [
            'error',
            {
                multiline: {
                    delimiter: 'semi',
                    requireLast: true,
                },
                singleline: {
                    delimiter: 'semi',
                    requireLast: false,
                },
            },
        ],
        'linebreak-style': ['error', 'unix'],
        'no-trailing-spaces': 'error',
        'no-case-declarations': 'off',
        '@typescript-eslint/naming-convention': [
            'error',
            {
                selector: 'parameter',
                format: ['camelCase'],
                leadingUnderscore: 'allowSingleOrDouble',
            },
            {
                selector: 'variable',
                format: ['camelCase'],
                leadingUnderscore: 'allowSingleOrDouble',
            },
            {
                selector: 'variable',
                modifiers: ['const'],
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
            { selector: 'enum', format: ['PascalCase'], prefix: ['E'] },
            {
                selector: 'enumMember',
                format: ['camelCase', 'PascalCase', 'UPPER_CASE'],
            },
            { selector: 'typeParameter', format: ['PascalCase'] },
            { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
            { selector: 'class', format: ['PascalCase'] },
            {
                selector: 'memberLike',
                modifiers: ['private'],
                format: ['camelCase'],
                leadingUnderscore: 'require',
            },
        ],
        'jest/no-standalone-expect': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        'jest/expect-expect': 'off',
        '@typescript-eslint/semi': ['error'],
    },
};
