module.exports = {
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
    tsconfigRootDir: __dirname,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "@typescript-eslint/eslint-plugin"],
  root: true,
  ignorePatterns: [".eslintrc.js"],
  rules: {
    semi: ["error", "never"],
    indent: ["error", 2],
    "no-inner-declarations": ["warn", "both"],
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off",
  },
  root: true,
};
