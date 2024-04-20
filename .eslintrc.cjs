module.exports = {
  // https://eslint.org/docs/user-guide/configuring#configuration-cascading-and-hierarchy
  // This option interrupts the configuration hierarchy at this file
  // Remove this if you have an higher level ESLint config file (it usually happens into a monorepos)
  root: true,
  parserOptions: {
    parser: require.resolve('@typescript-eslint/parser'),
    extraFileExtensions: [ '.vue' ]
  },
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/vue3-essential',
    'standard'
  ],

  plugins: [
    '@typescript-eslint',
    'vue'
  ],

  globals: {
    ga: 'readonly', // Google Analytics
    cordova: 'readonly',
    __statics: 'readonly',
    __QUASAR_SSR__: 'readonly',
    __QUASAR_SSR_SERVER__: 'readonly',
    __QUASAR_SSR_CLIENT__: 'readonly',
    __QUASAR_SSR_PWA__: 'readonly',
    process: 'readonly',
    Capacitor: 'readonly',
    chrome: 'readonly'
  },

  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow paren-less arrow functions
    'arrow-parens': 'off',
    'one-var': 'off',
    'no-void': 'off',
    'multiline-ternary': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/no-undef-properties': 'off',
    'vue/valid-v-on': 'off',
    'no-console': 'off',
    'no-tabs': ['error', { allowIndentationTabs: false }],
    'quotes': [2, 'single', { 'avoidEscape': true }],
    'vue/no-unused-components': ['error'],
    'vue/require-v-for-key': [2],
    "vue/first-attribute-linebreak": ["error", {
      "singleline": "beside",
      "multiline": "below"
    }],
    "vue/html-indent": ["error", 2, {
      "baseIndent": 1,
      "ignores": []
    }],
    "vue/html-closing-bracket-newline": ["error", {
      "singleline": "never",
      "multiline": "always"
    }],
    "vue/html-closing-bracket-spacing": ["error", {
      "startTag": "never",
      "endTag": "never",
      "selfClosingTag": "always"
    }],
    "vue/max-attributes-per-line": ["error", {
      "singleline": 1,
      "multiline": 1
    }],
    "vue/multiline-html-element-content-newline": ["error", {
      "ignoreWhenEmpty": true,
      "ignores": []
    }],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    'vue/attributes-order': ['error', {
      'order': [
        'CONDITIONALS',
        'TWO_WAY_BINDING',
        'LIST_RENDERING',
        ['UNIQUE', 'SLOT'],
        'DEFINITION',
        'RENDER_MODIFIERS',
        'GLOBAL',
        'OTHER_DIRECTIVES',
        'OTHER_ATTR',
        'CONTENT',
        'EVENTS',
      ],
      'alphabetical': false,
    }],
    'vue/no-spaces-around-equal-signs-in-attribute': ['error'],
    'vue/v-on-event-hyphenation': ['error', 'always', {
      'autofix': true,
      'ignore': [],
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'import/first': 'off',
    'import/namespace': 'error',
    'import/default': 'error',
    'import/export': 'error',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/no-extraneous-dependencies': 'off',
    'no-trailing-spaces': 'off',
    'semi': 'off',
    // The core 'import/named' rules
    // does not work with type definitions
    'import/named': 'off',

    'prefer-promise-reject-errors': 'off',
    'space-before-function-paren': 'off',


    quotes: ['warn', 'single', { avoidEscape: true }],

    // this rule, if on, would require explicit return type on the `render` function
    '@typescript-eslint/explicit-function-return-type': 'off',

    // in plain CommonJS modules, you can't use `import foo = require('foo')` to pass this rule, so it has to be disabled
    '@typescript-eslint/no-var-requires': 'off',

    // The core 'no-unused-vars' rules (in the eslint:recommended ruleset)
    // does not work with type definitions

    // allow debugger during development only
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'func-call-spacing': 'off',
    'no-unused-vars': 'off',
    'no-explicit-any': 'off',
    'no-console': 'off',
  },
}
