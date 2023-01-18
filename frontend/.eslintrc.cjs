module.exports = {
    extends: [
        "eslint:recommended", 
        "plugin:@typescript-eslint/recommended"
    ],
    parser: "@typescript-eslint/parser",
    plugins: [
        "@typescript-eslint"
    ],
    rules: {
        "semi":   ["error", "never"],
        "indent": ["error", 2]
    },
    root: true,
};
