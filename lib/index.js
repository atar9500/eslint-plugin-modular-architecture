/**
 * @fileoverview An eslint plugin to enforce modular architecture and encapsulation
 * @author Atar
 */
'use strict';

const requireIndex = require('requireindex');

module.exports.rules = requireIndex(__dirname + '/rules');
