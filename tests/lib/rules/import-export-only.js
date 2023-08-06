/**
 * @fileoverview Enforce import/export only on index files
 * @author Atar
 */
'use strict';

const rule = require('../../../lib/rules/import-export-only');
const {RuleTester} = require('eslint');

const ES6_OPTIONS = {
  ecmaVersion: 'latest',
  sourceType: 'module',
};

const ruleTester = new RuleTester();

const VALID_CASES_ES6 = [
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

const generateValidCases = filename =>
  VALID_CASES_ES6.map(code => ({
    code,
    filename,
    parserOptions: ES6_OPTIONS,
  }));

const INVALID_CASES_VAR = [
  `const foo = 'bar'`,
  `import bar from "bar";\nconst foo = bar;`,
  `const foo = 'bar';\nexport default bar;`,
];

const INVALID_CASES_EXPR = [
  `import bar from "bar";\nconsole.log('Hello World!');`,
  `console.log('Hello World!');\nexport default bar;`,
];

const generateInvalidCases = filename => [
  ...INVALID_CASES_VAR.map(code => ({
    code,
    filename,
    parserOptions: ES6_OPTIONS,
    errors: [
      {
        message: 'Only import/export statements is allowed in this file',
        type: 'VariableDeclaration',
      },
    ],
  })),
  ...INVALID_CASES_EXPR.map(code => ({
    code,
    filename,
    parserOptions: ES6_OPTIONS,
    errors: [
      {
        message: 'Only import/export statements is allowed in this file',
        type: 'ExpressionStatement',
      },
    ],
  })),
];

ruleTester.run('import-export-only', rule, {
  valid: [
    ...generateValidCases('index.js'),
    ...generateValidCases('index.ts'),
    ...['foobar.js', 'foobar.ts'].map(filename => ({
      code: `const foo = 'bar';`,
      filename,
      parserOptions: ES6_OPTIONS,
    })),
  ],
  invalid: [
    ...generateInvalidCases('index.js'),
    ...generateInvalidCases('index.ts'),
  ],
});
