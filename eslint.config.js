// ESLint flat configuration (required by ESLint 9+)
// Equivalent to the previous .eslintrc.js
const js = require("@eslint/js");
const globals = require("globals");

module.exports = [
    {
        ignores: ["config/**", "dist/**", "doc/**", "node_repository/**", "node_modules/**"]
    },
    js.configs.recommended,
    {
        files: ["**/*.js"],
        languageOptions: {
            ecmaVersion: 2021,
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.jest
            }
        },
        rules: {
            // enable additional rules
            "no-empty": "off",
            "no-unused-vars": "off",
            "no-console": "warn",
            "getter-return": "warn",
            "no-extra-semi": "warn"
        }
    }
];
