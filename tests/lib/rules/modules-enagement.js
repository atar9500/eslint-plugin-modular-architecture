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
    {
      code: "import foo from '../bar/internal/folder'",
      filename: '/src/foo/components/bar.js',
    },
  ],

  invalid: [
    {
      code: "import foo from '../../../bar/internal/folder'",
      filename: '/src/foo/components/bar.js',
      errors: [{messageId: 'absoluteImport'}],
      only: true,
    },
  ],
});
