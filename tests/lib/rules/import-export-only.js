/**
 * @fileoverview Enforce import/export only on index files
 * @author Atar
 */
'use strict';

const rule = require('../../../lib/rules/import-export-only');
const {RuleTester} = require('eslint');

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
});

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const VALID_CASES = [
  `export * from "foo";`,
  `export {foo} from "bar";`,
  `export {foo, bar} from "foobar";`,
  `export {foo as bar, bar as foo} from "foobar";`,
  `export {default} from "foobar";`,
  `export {default as foobar} from "foobar";`,
  `export const foo = 'bar';`,
  `export default foo;`,
  `import * as bar from "foo";`,
  `import {foo} from "bar";`,
  `import {foo, bar} from "foobar";`,
  `import foobar from "foobar";`,
  `import {foo} from "bar";\nexport default foo;`,
  `import {foo} from "bar";\nexport const bar = foo;`,
  `import foo from "bar";\nexport default foo;`,
  `import foo from "bar";\nexport const bar = foo;`,
];

const INVALID_CASES = [
  `const foo = bar;`,
  `import bar from "bar";\nconst foo = bar;`,
  `const foo = 'bar';\nexport default bar;`,
  `console.log('Hello World!');`,
  `import bar from "bar";\nconsole.log('Hello World!');`,
  `console.log('Hello World!');\nexport default bar;`,
];

const generateValidCases = filename =>
  VALID_CASES.map(code => ({code, filename}));

const generateignoredFilesTestCases = filename =>
  INVALID_CASES.map(code => ({
    code,
    filename,
    options: [{ignoredFiles: ['./src/**/index.*']}],
  }));

const generateInvalidCases = filename =>
  INVALID_CASES.map(code => ({
    code,
    filename,
    errors: [{messageId: 'noExport'}],
  }));

ruleTester.run('import-export-only', rule, {
  valid: [
    ...['./src/module/foobar.js', './src/module/foobar.ts'].map(filename => ({
      code: `const foo = 'bar';`,
      filename,
    })),
    ...generateValidCases('./src/module/index.js'),
    ...generateValidCases('./src/module/index.ts'),
    ...generateignoredFilesTestCases('./src/module1/index.js'),
    ...generateignoredFilesTestCases('./src/module2/index.ts'),
  ],
  invalid: [
    ...generateInvalidCases('./src/module/index.js'),
    ...generateInvalidCases('./src/module/index.ts'),
  ],
});
