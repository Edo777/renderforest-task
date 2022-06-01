const keywordExtractor = require("keyword-extractor")

const defaultOptions = options = {
  language:"english",
  remove_digits: true,
  return_changed_case:true,
  remove_duplicates: true
};

/**
 * Extract keywords from sentence
 * @param {string} sentence 
 * @param {{
 *  language: string
 *  remove_digits: boolean
 *  return_changed_case: boolean
 *  return_chained_words: boolean
 *  remove_duplicates: boolean
 *  return_max_ngrams: boolean | number
 * }} options 
 * @returns 
 */
module.exports = function (sentence, options=null) {
  return keywordExtractor.extract(sentence, options || defaultOptions);
}