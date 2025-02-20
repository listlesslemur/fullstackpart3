import globals from "globals"
import js from '@eslint/js'
import stylisticJs from '@stylistic/eslint-plugin-js'

/** @type {import('eslint').Linter.Config[]} */
export default [
  js.configs.recommended,
  {
    ignores: ["dist/**"]
  },
  {
    files: ["**/*.js"], 
    languageOptions: {
      sourceType: "commonjs",
      globals: {
        ...globals.node,
      },
      ecmaVersion: "latest"
    },
    plugins: {
      '@stylistics/js': stylisticJs
    },
    rules: {
      '@stylistics/js/indent': [
        'error',
        2
      ],
      '@stylistics/js/linebreak-style': [
        'error',
        'unix'
      ],
      '@stylistics/js/quotes': [
        'error',
        'single'
      ],
      '@stylistics/js/semi': [
        'error',
        'never'
      ],
      'eqeqeq': 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': [
        'error', 'always'
      ],
      'arrow-spacing': [
        'error', {'before': true, 'after': true}
      ],
      'no-console': 'off'
    }
  }
]