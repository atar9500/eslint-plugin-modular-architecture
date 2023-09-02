const {getModuleFromFilenameOrAlias} = require('./misc');

const DEFAULT_LAYERS = {
  app: Number.MAX_SAFE_INTEGER,
  shared: Number.MIN_SAFE_INTEGER,
  common: Number.MIN_SAFE_INTEGER,
};

/**
 * @param {string} filename
 * @param {string} importValue
 * @param {string} alias
 * @param {Record<string, number>} layers
 * @returns {boolean}
 */
const checkModuleImport = (filename, importValue, alias, layers) => {
  const importModule = getModuleFromFilenameOrAlias(importValue, alias);
  if (!importModule) {
    return true;
  }

  const totalLayers = {...layers, ...DEFAULT_LAYERS};
  const importModuleLevel = totalLayers[importModule] || 0;

  const sourceFileModule = getModuleFromFilenameOrAlias(filename);
  const sourceFileModuleLevel = totalLayers[sourceFileModule] || 0;

  return importModuleLevel < sourceFileModuleLevel;
};

module.exports = checkModuleImport;
