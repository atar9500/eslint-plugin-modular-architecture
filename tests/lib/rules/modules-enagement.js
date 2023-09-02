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
      filename: '/src/foo/components/bar.ts',
    },
    {
      code: "import foo from '~/bar'",
      filename: '/src/app/components/App.tsx',
    },
    {
      code: "import foo from '~/shared/utils/getFoobar'",
      filename: '/src/bar/components/App.tsx',
    },
    {
      code: "import foo from '~/common/utils/getFoobar'",
      filename: '/src/bar/components/App.tsx',
    },
  ],
  invalid: [
    {
      code: "import foo from '../../../bar/internal/folder'",
      filename: '/src/foo/components/bar.ts',
      errors: [{messageId: 'absoluteImport'}],
    },
    {
      code: "import foo from '~/bar'",
      filename: '/src/foo/components/App.tsx',
      errors: [{messageId: 'moduleReference'}],
    },
    {
      code: "import foo from '~/bar/folder/inside'",
      filename: '/src/app/components/App.tsx',
      errors: [{messageId: 'moduleIndex'}],
    },
  ],
});
