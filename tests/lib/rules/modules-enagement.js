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
    {
      code: "import foo from '~/bar/folder'",
      filename: '/src/app/components/App.tsx',
      options: [{moduleImportLevels: {bar: 2}}],
    },
    {
      code: "import foo from '~/bar'",
      filename: '/src/foo/components/App.tsx',
      options: [{moduleLayers: {foo: 2, bar: 1}}],
    },
    {
      code: "import foo from '@cool/bar'",
      filename: '/src/app/components/App.tsx',
      options: [{alias: '@cool'}],
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
      code: "import foo from '~/bar'",
      filename: '/src/shared/components/App.tsx',
      errors: [{messageId: 'moduleReference'}],
    },
    {
      code: "import foo from '~/bar'",
      filename: '/src/common/components/App.tsx',
      errors: [{messageId: 'moduleReference'}],
    },
    {
      code: "import foo from '~/app'",
      filename: '/src/foo/components/App.tsx',
      errors: [{messageId: 'moduleReference'}],
    },
    {
      code: "import foo from '~/app'",
      filename: '/src/shared/components/App.tsx',
      errors: [{messageId: 'moduleReference'}],
    },
    {
      code: "import foo from '~/foo'",
      filename: '/src/foo/components/bar.ts',
      errors: [{messageId: 'moduleReference'}],
    },
    {
      code: "import foo from '~/bar/folder/inside'",
      filename: '/src/app/components/App.tsx',
      errors: [{messageId: 'moduleIndex'}],
    },
    {
      code: "import foo from '~/bar/folder/inside'",
      filename: '/src/app/components/App.tsx',
      options: [{moduleImportLevels: {bar: 2}}],
      errors: [{messageId: 'moduleIndex'}],
    },
    {
      code: "import foo from '~/bar'",
      filename: '/src/app/components/App.tsx',
      options: [{alias: '@cool'}],
      errors: [{messageId: 'moduleReference'}],
    },
  ],
});
