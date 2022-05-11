module.exports = {
  root: true,
  extends: '@react-native-community',
  rules: {
    'comma-dangle': 0,
    curly: 0,
    'no-dupe-class-members': 0,
    'no-extra-semi': 0,
    'no-fallthrough': [1, {commentPattern: 'break[\\s\\w]*omitted'}],
    'no-multi-spaces': 2,
    'func-call-spacing': [0, 0],
    'no-undef': 'off', // TypeScript will detect this,
    radix: 0,
    'react-hooks/exhaustive-deps': 1,
    'react-hooks/rules-of-hooks': 2,
    'react-native/no-inline-styles': 0, // disallow styles declared within the component itself
    semi: 0,
    'space-before-function-paren': ['off', 'always'],
    '@typescript-eslint/no-unused-vars': [
      'error',
      {varsIgnorePattern: '^_', argsIgnorePattern: '^_'},
    ],
  },
}
