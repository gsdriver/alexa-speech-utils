'use strict';

module.exports = {
  and: function(items, options) {
    return combineItems('and', items, options);
  },
  or: function(items, options) {
    return combineItems('or', items, options);
  },
};

//
// Internal functions
//

function combineItems(conjunction, items, options) {
  let result = '';
  let i;
  const len = (Array.isArray(items) ? items.length : 0);
  let separator;

  if (options && options.pause) {
    separator = ' <break time=\'' + options.pause + '\'/> ';
  } else {
    separator = ', ';
  }

  // Special case for non-SSML two-item list
  if ((len == 2) && !(options && options.pause)) {
    result = items[0] + ' ' + conjunction + ' ' + items[1];
  } else {
    for (i = 0; i < len; i++) {
        result += items[i];
        if (i < len - 1) {
          result += separator;
          if (i == (len - 2)) {
            result += (conjunction + ' ');
          }
        }
      }
  }

  // If they asked for speak tags, add them
  if (options && options.ssmltag) {
    result = '<speak>' + result + '</speak>';
  }

  return result;
}
