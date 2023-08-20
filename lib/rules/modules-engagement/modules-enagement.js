/**
 * @fileoverview A rule to enforce engagement between modules
 * @author Atar Avraham
 */
'use strict';
const minimatch = require('minimatch');

const DEFAULT_OPTIONS = {
  modulesPath: '/src',
  modulesLevels: {common: 1, shared: 1, app: 3},
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      absoluteImport:
        "Import between modules should be absolute. expected: `import {foo} from '@alias/bar'`",
      moduleReference:
        'A module can only references items in modules at the same or lower levels.',
      moduleIndex: `A module should be accessed only through it's index.js or configured "moduleInnerPaths".`,
    },
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'A rule to enforce engagement between modules',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          glob: {
            type: 'string',
          },
          modulesPath: {
            type: 'string',
          },
          modulesLevels: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    ],
  },

  create(context) {
    console.log('rreer');
    const {glob, modulesPath, modulesLevels} = {
      ...DEFAULT_OPTIONS,
      ...context.options[0],
    };

    const sourceFilePath = context.getFilename();
    console.log('sourceFilePath', sourceFilePath);
    const workDir = `${context.getCwd()}${modulesPath}/`;
    const sourceFileRelativePath = sourceFilePath.replace(workDir, '');
    console.log('sourceFileRelativePath', sourceFileRelativePath);

    const shouldLint = !glob || minimatch(sourceFileRelativePath, glob);
    if (!shouldLint) {
      return {};
    }

    return {
      'Program > ImportDeclaration'(node) {
        const importRequest = node.source.value;
        console.log('importRequest', importRequest);
      },
    };
  },
};
