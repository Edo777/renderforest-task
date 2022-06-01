/**
 * Hash string by Unicode character codes
 * @param {string} str 
 * @returns 
 */
module.exports = function(str) {
  let hash = 0;

  for(let i = 0; i < str.length; i++) {
      hash = hash + str.char();
  }

  return hash;
}