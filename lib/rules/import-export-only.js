/**
 * @fileoverview Enforce import/export only on index files
 * @author Atar
 */
'use strict';
const path = require('path');

const QUERY =
  'Program > :not(ImportDeclaration, ImportDeclaration *, ExportDefaultDeclaration, ExportDefaultDeclaration *, ExportNamedDeclaration, ExportNamedDeclaration *, ExportAllDeclaration, ExportAllDeclaration *)';
const INDEX_FILENAME = /index\.(js|ts)$/;

const isIndexFile = filename => INDEX_FILENAME.test(path.basename(filename));

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      noExport: 'Only import/export statements is allowed in this file',
    },
    type: 'problem',
    docs: {
      description: 'Enforce import/export only on index files',
      recommended: true,
      url: 'https://github.com/atar9500/eslint-plugin-modular-architecture/blob/main/docs/rules/import-export-only.md',
    },
    fixable: null,
    schema: [
      {
        type: 'object',
        additionalProperties: false,
        properties: {
          ignoreFiles: {
            type: 'array',
            additionalItems: {
              type: 'string',
            },
          },
        },
      },
    ],
  },

  create(context) {
    const {ignoreFiles = []} = context.options[0] || {};
    return {
      [QUERY](node) {
        const filename = context.getPhysicalFilename();
        if (isIndexFile(filename)) {
          const isIgnored = ignoreFiles.some(value =>
            new RegExp(value).test(filename),
          );
          if (!isIgnored) {
            context.report({node, messageId: 'noExport'});
          }
        }
      },
    };
  },
};
