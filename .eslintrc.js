module.exports = {
    ignorePatterns: ['config', 'dist', 'doc', 'node_repository'],
    env: {
        browser: true,
        es2021: true,
        es6: true,
        node: true,
        jest: true
    },
    extends: [
        'eslint:recommended'
        //'standard'
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 12,
        sourceType: 'module'
    },
    plugins: [
    ],
    settings: {
        jsdoc: {
            mode: 'typescript',
            tagNamePreference: {
                return: 'returns',
                augments: 'extends'
            }
        }
    },
    rules: {
        // enable additional rules
        'no-empty': 'off',
        indent: 'off',
        'no-empty': 'off',
        indent: 'off',
        // semi: ['error', 'always'],
        // Indent with 4 spaces
        // indent: ['error', 4, { MemberExpression: 0 }],
        // eqeqeq: 'off',
        // 'space-before-function-paren': ['error', {
        //     anonymous: 'never',
        //     named: 'never',
        //     asyncArrow: 'always'
        // }],
        // 'brace-style': ['error', 'stroustrup', { allowSingleLine: true }],
        'no-unused-vars': 'off',
        'no-console': 'warn',
        'getter-return': 'warn',
        'no-extra-semi': 'warn'

    }
};
