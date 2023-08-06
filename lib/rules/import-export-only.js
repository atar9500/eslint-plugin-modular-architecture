/**
 * @fileoverview Enforce import/export only on index files
 * @author Atar
 */
'use strict';
const path = require('path');

const QUERY =
  'Program > :not(ImportDeclaration, ImportDeclaration *, ExportDefaultDeclaration, ExportDefaultDeclaration *, ExportNamedDeclaration, ExportNamedDeclaration *, ExportAllDeclaration, ExportAllDeclaration *)';
const INDEX_FILENAME = /^index\.(js|ts)$/;

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    messages: {
      noExport: 'Only import/export statements is allowed in this file',
    },
    type: 'problem', // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'Enforce import/export only on index files',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      [QUERY](node) {
        if (INDEX_FILENAME.test(path.basename(context.getPhysicalFilename()))) {
          context.report({node, messageId: 'noExport'});
        }
      },
    };
  },
};
