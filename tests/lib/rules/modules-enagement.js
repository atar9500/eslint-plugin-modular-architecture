/**
 * @fileoverview A rule to enforce engagement between modules
 * @author Atar Avraham
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require('../../../lib/rules/modules-engagement'),
  RuleTester = require('eslint').RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

ruleTester.run('modules-enagement', rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "import foo from '../../bar/internal/folder'",
      filename:
        '/Users/atar/Documents/Projects/eslint-plugin-modular-architecture/src/foo/components/bar.js',
      errors: [{message: 'Fill me in.', type: 'Me too'}],
      only: true,
    },
  ],
});
