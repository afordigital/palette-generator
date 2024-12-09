import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import testingLibrary from 'eslint-plugin-testing-library';

export default tseslint.config(
  { ignores: [ 'dist', 'node_module' ] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx,jsx,js}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'testing-library': testingLibrary
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
      // some errors can be Annoying but guarantee a best code more readable
      'semi': [ 'error', 'always' ], // <-- allowed don't use a ; to end of each logic
      'array-bracket-spacing': [ 'error', 'always' ],  // <-- no allowed don't use a spaces in the arrays [ data ]
      'keyword-spacing': [ 'error', { before: true,  after: true } ], // <-- no allowed don't add a space after and before of a { } 
      'no-shadow-restricted-names': 'error',                     // <-- no allowed to use reserved words like variables example undefined, NaN,
      'object-curly-spacing': [ 'error', 'always' ],             // <-- no allowed that {data} don't has a spacing like this { data }
      'no-sequences': [ 'error', { allowInParentheses: true } ], // <-- https://eslint.org/docs/latest/rules/no-sequences
      'no-var': 'error',            // <-- no allowed to use var variables only const and let 
      'prefer-const': 'off',        // <-- by default eslint has activated this rule
      'no-nested-ternary': "error", // <-- no allowed to use 
      'no-empty': 'warn',           // <-- no recommended to use conditionals empties if (condition) { you need add some }
      'no-console': 'warn',         // <-- no recommended to use console.log() function
      'no-alert': 'error',          // <-- no allowed to use alert() function
      'max-params': [ 'warn', { max: 4 } ], // <--- recommend to use minus of 4 params
      'max-nested-callbacks': [ 'error', { max: 4 } ], // <-- no allowed to use more of two functions nested example function(){function(){}}
      'max-depth': [ 'error', { max: 3 } ], // <-- https://eslint.org/docs/latest/rules/max-depth
      'react-refresh/only-export-components': 'off', // <-- by default eslint has activated this rule
      'no-debugger': "off"
    },
  },
);
