/**
 * @param {string | undefined} value
 * @returns {boolean}
 */
const isRelativeImport = value => !!value && value.startsWith('.');

/**
 * @param {string | undefined} value
 * @returns {boolean}
 */
const getModule = () => {};

module.exports = {isRelativeImport};
