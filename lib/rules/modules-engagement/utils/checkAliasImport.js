const {getModuleFromFilenameOrAlias} = require('./misc');

const DEFAULT_MODULE_LEVELS = {
  shared: 3,
  common: 3,
};

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
const checkAliasImport = (importValue, alias, moduleImportLevels) => {
  if (!isAliasImport(importValue, alias)) {
    return true;
  }

  const module = getModuleFromFilenameOrAlias(importValue, alias);
  const maxImportLevel =
    {...DEFAULT_MODULE_LEVELS, ...moduleImportLevels}[module] || 1;

  return (importValue.match(/\//g) || []).length <= maxImportLevel;
};

module.exports = checkAliasImport;
