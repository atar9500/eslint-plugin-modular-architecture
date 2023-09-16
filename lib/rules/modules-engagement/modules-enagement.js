/**
 * @fileoverview A rule to enforce engagement between modules
 * @author Atar Avraham
 */
'use strict';
const {minimatch} = require('minimatch');

const checkRelativeImport = require('./utils/checkRelativeImport');
const checkModuleImport = require('./utils/checkModuleImport');
const checkAliasImport = require('./utils/checkAliasImport');

const DEFAULT_OPTIONS = {
  modulesPath: '/src',
  moduleImportLevels: {common: 3, shared: 3, app: 1},
  alias: '~',
};

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      absoluteImport:
        "Import between modules should be absolute. expected: `import {foo} from '@alias/bar'`",
      moduleReference:
        'A module can only references items in modules at the same or lower levels.',
      moduleIndex: `A module should be accessed only through it's index.js or configured "moduleImportLevels".`,
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
          alias: {
            type: 'string',
          },
          moduleLayers: {
            type: 'object',
            additionalProperties: true,
          },
          moduleImportLevels: {
            type: 'object',
            additionalProperties: true,
          },
        },
      },
    ],
  },

  create(context) {
    const {glob, modulesPath, alias, moduleLayers, moduleImportLevels} = {
      ...DEFAULT_OPTIONS,
      ...context.options[0],
    };

    const sourceFilePath = context.getFilename();
    if (!minimatch(sourceFilePath, `${modulesPath}/**`)) {
      return {};
    }

    const sourceFileRelativePath = sourceFilePath
      .replace(context.getCwd(), '')
      .replace(modulesPath, '');

    const shouldLint = !glob || minimatch(sourceFileRelativePath, glob);
    if (!shouldLint) {
      return {};
    }

    return {
      'Program > ImportDeclaration'(node) {
        const importRequest = node.source.value;

        const isCorrectRelativeImport = checkRelativeImport(
          sourceFileRelativePath,
          importRequest,
        );
        if (!isCorrectRelativeImport) {
          context.report({node, messageId: 'absoluteImport'});
        }

        const isCorrectModuleImport = checkModuleImport(
          sourceFileRelativePath,
          importRequest,
          alias,
          moduleLayers,
        );
        if (!isCorrectModuleImport) {
          context.report({node, messageId: 'moduleReference'});
        }

        const isCorrectAliasImport = checkAliasImport(
          importRequest,
          alias,
          moduleImportLevels,
        );
        if (!isCorrectAliasImport) {
          context.report({node, messageId: 'moduleIndex'});
        }
      },
    };
  },
};
