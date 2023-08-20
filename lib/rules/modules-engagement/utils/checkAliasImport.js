/**
 * @param {string} importValue
 * @param {string} alias
 * @returns {boolean}
 */
const isAliasImport = (importValue, alias) =>
  importValue.startsWith(`${alias}/`);

/**
 * @param {string} importValue
 * @param {string} alias
 * @returns {boolean}
 */
const checkAliasImport = (importValue, alias) => {
  if (!isAliasImport(importValue, alias)) {
    return true;
  }

  return (importValue.match(/\//g) || []).length <= 1;
};

module.exports = checkAliasImport;
