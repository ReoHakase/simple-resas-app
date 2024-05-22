import type { GetCaseNames, GetName } from './type';

/**
 * Converts an array of words into a camel case string.
 * @param words - The array of words to convert.
 * @returns The camelCase string.
 */
const getCamelCaseName: GetName = (words) =>
  words
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');

/**
 * Converts an array of words into a kebab-case string with hyphens,
 *
 * @param words - An array of words to be converted.
 * @returns The hyphen-kebab case name.
 */
const getHyphenKebabCaseName: GetName = (words) => words.join('-').toLowerCase();

/**
 * Converts an array of words into a kebab_case string with underscores,
 * and returns the result in lowercase.
 *
 * @param words - An array of words to be converted.
 * @returns The underscore_kebab case name.
 */
const getUnderscoreKebabCaseName: GetName = (words) => words.join('_').toLowerCase();

/**
 * A map of the available case names and their respective functions.
 */
export const getCaseNames: GetCaseNames = {
  camelCase: getCamelCaseName,
  'kebab-case': getHyphenKebabCaseName,
  kebab_case: getUnderscoreKebabCaseName,
};
