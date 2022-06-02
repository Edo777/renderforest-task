/**
 * Hash characters of string
 * @param {string} str 
 * @param {number} start 
 * @param {number} end 
 * @returns {number}
 */
function complete(str, start=0, end=str.length) {
  if(str.length < end) {
    end = str.length;
  }

  let hash = 0;

  for(let i = start; i < end; i++) {
    hash = hash + str.charCodeAt(i);
  }

  return hash;
}

/**
 * Hash characters of string (default from [1 to 3])
 * @param {string} str 
 * @param {number} start 
 * @param {number} end 
 * @returns {number}
 */
function partial(str, start=0, end=3) {
  return complete(str, start, end);
}

/**
 * Hash first and last chars of string
 * @param {string} str
 * @returns {number}
 */
function first(str) {
  return str.charCodeAt(0);
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
    first: first(str)
  }
}

module.exports = {
  complete,
  partial,
  combined,
  first
}