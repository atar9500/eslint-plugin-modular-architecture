/**
 * @fileoverview Enforce import/export only on index files
 * @author Atar
 */
'use strict';
const path = require('path');
const {minimatch} = require('minimatch');

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
          ignoredFiles: {
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
    const {ignoredFiles = ['./index.*']} = context.options[0] || {};
    return {
      [QUERY](node) {
        const filename = context.getPhysicalFilename();
        if (isIndexFile(filename)) {
          const isIgnored = ignoredFiles.some(value =>
            minimatch(filename, value),
          );
          if (!isIgnored) {
            context.report({node, messageId: 'noExport'});
          }
        }
      },
    };
  },
};
