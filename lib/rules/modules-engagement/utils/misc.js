/**
 * @param {string} alias
 * @returns {RegExp}
 */
const getModuleRegex = (alias = '') => new RegExp(`^${alias}/([^/]+)(?:/|$)`);

/**
 * @param {string} value
 * @param {string} alias
 * @returns {string | undefined}
 */
const getModuleFromFilenameOrAlias = (value, alias) => {
  if (!value) {
    return undefined;
  }
  const result = getModuleRegex(alias).exec(value);
  if (result) {
    return result[1];
  }
};

module.exports = {getModuleFromFilenameOrAlias};
