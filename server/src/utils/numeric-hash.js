/**
 * Hash all characters of string
 * @param {string} str 
 * @returns {number}
 */
function complete(str) {
  let hash = 0;

  for(let i = 0; i < str.length; i++) {
    hash = hash + str.charCodeAt(i);
  }

  return hash;
}

/**
 * Hash first and last chars of string
 * @param {string} str 
 * @returns {number}
 */
function partial(str) {
  return str.charCodeAt(0) + str.charCodeAt(str.length - 1);
}

/**
 * Take combined hash ( both partial and complete )
 * @param {string} str 
 * @returns {{ partial: number , complete: number}}
 */
function combined(str) {
  return {
    partial: partial(str),
    complete: complete(str),
  }
}

module.exports = {
  complete,
  partial,
  combined
}