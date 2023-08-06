# Enforce import/export only on index files (`modular-architecture/import-export-only`)

<!-- end auto-generated rule header -->

An index file serves as a boundary for directories. When a directory contains an index file, code outside that directory can only accessed the exported items from the index file and cannot access anything else.

## Rule Details

This rule is intended to remove any extra code from index files, other than imports and exports.

Examples of **incorrect** code for this rule:

```js
// index.js

import {default as HomePage} from './components/HomePage';

console.error('This should not be here!');

const foo = '...neither this one';

export default HomePage;
```

Examples of **correct** code for this rule:

```js
// index.js

import {default as HomePage} from './components/HomePage';
export default HomePage;

export const foo = 'bar';
export * from './utils';
```

### Options

By default this rule is enabled with `["^./index.(js|ts)"]` option for `ignoreFiles`.

#### ignoreFiles

The `ignoreFiles` option accepts an array of strings representing index files to be exempt from this rule.

Examples of **correct** code for the with `{ignoredFiles: ["./src/somewhere/index.js"]}`:

```js
// ./src/somewhere/index.js

console.log('I can be here!');
```

## When Not To Use It

If you don’t want to be notified non-exports/non-imports in your index files.
