module.exports = {
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true
  },
  extends: ['plugin:react/recommended', 'prettier/@typescript-eslint'],
  plugins: ['@typescript-eslint', 'prettier', 'react', 'react-hooks'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2018,
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      createClass: 'createReactClass',
      pragma: 'React', // Pragma to use, default to "React"
      version: '16.8'
    },
    propWrapperFunctions: [
      'forbidExtraProps',
      { property: 'freeze', object: 'Object' },
      { property: 'myFavoriteWrapper' }
    ],
    linkComponents: ['Hyperlink', { name: 'Link', linkAttribute: 'to' }]
  },
  rules: {
    // react-config
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    strict: 'error',
    'no-comma-dangle': false,
    'no-unused-vars': [1, { vars: 'all', args: 'after-used' }],
    'prettier/prettier': [
      'error',
      {
        semi: false,
        singleQuote: true,
        printWidth: 80,
        tabWidth: 2
      }
    ]
  }
}
