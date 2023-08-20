const GET_MODULE_REGEX = /^(?:[^/]+\/){0}([^/]+)/;

/**
 * @param {string} filename
 * @param {string} importString
 * @returns {boolean}
 */
const isIncorrectRelativeImport = (filename, importString) => {
  if (!importString.startsWith('.')) {
    return false;
  }
  const maxImportOutLevels = (filename.match(/\//g) || []).length - 1;
  const currentImportOutLevels = (importString.match(/\.\.\//g) || []).length;
  return maxImportOutLevels < currentImportOutLevels;
};

/**
 * @param {string | undefined} value
 * @returns {boolean}
 */
const getModuleFromFilename = value => {
  if (!value) {
    return undefined;
  }
  const result = GET_MODULE_REGEX.exec(value);
  if (result) {
    return result[0];
  }
};

module.exports = {isIncorrectRelativeImport, getModuleFromFilename};
