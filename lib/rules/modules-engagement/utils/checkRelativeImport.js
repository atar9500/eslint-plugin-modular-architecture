/**
 * @param {string} filename
 * @param {string} importString
 * @returns {boolean}
 */
const checkRelativeImport = (filename, importString) => {
  if (!importString.startsWith('.')) {
    return true;
  }
  const maxImportOutLevels = (filename.match(/\//g) || []).length - 1;
  const currentImportOutLevels = (importString.match(/\.\.\//g) || []).length;
  return currentImportOutLevels <= maxImportOutLevels;
};

module.exports = checkRelativeImport;
