'use strict';

const utils = (options) => {
  let useSpeakTag;

  if (options && options.speakTag) {
    useSpeakTag = options.speakTag;
  }

  return {
    and: function(items, options) {
      return combineItems('and', items, options, useSpeakTag);
    },
    or: function(items, options) {
      return combineItems('or', items, options, useSpeakTag);
    },
    numberOfItems: function(number, singular, plural) {
      let items;

      if (isNaN(number)) {
        return undefined;
      } else if (number === 0) {
        items = ('no ' + plural);
      } else if (number === 1) {
        items = ('1 ' + singular);
      } else {
        items = (number + ' ' + plural);
      }

      if (useSpeakTag) {
        items = '<speak>' + items + '</speak>';
      }
      return items;
    },
  };
};

//
// Internal functions
//

function combineItems(conjunction, items, options, useSpeakTag) {
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
  if (useSpeakTag) {
    result = '<speak>' + result + '</speak>';
  }

  return result;
}

module.exports = utils;
