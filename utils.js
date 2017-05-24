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
    formatCurrency : function(amount, locale) {
      const localeUpper = (locale) ? locale.toUpperCase() : 'EN-US';

      if (isNaN(amount)) {
        return null;
      } else if (localeUpper === 'EN-GB') {
        return ('£' + amount)
      } else if (localeUpper === 'DE-DE') {
        return ('€' + amount);
      } else {
        // Default to US English
        return ('$' + amount);
      }
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
    relativeDate: function(date, options) {
      const now = new Date();
      const messageDate = new Date(date);
      let result;

      if (isNaN(messageDate)) {
        return 'Invalid date';
      }

      if ((now.getMonth() == messageDate.getMonth())
        && (now.getDate() == messageDate.getDate())) {
        result = 'today';
      } else {
        // Try yesterday
        now.setDate(now.getDate() - 1);
        if ((now.getMonth() == messageDate.getMonth())
          && (now.getDate() == messageDate.getDate())) {
          result = 'yesterday';
        } else {
          // Try tomorrow
          now.setDate(now.getDate() + 2);
          if ((now.getMonth() == messageDate.getMonth())
            && (now.getDate() == messageDate.getDate())) {
            result = 'tomorrow';
          } else if (now.getYear() == messageDate.getYear()) {
            // Read the month and day
            result = messageDate.toLocaleDateString([], {month: 'long', day: '2-digit'});
          } else {
            // Read the whole thing - month, day and year
            result = messageDate.toLocaleDateString([], {month: 'long', day: '2-digit', year: 'numeric'});
          }
        }
      }

      // And the time (hour and minute) if requested
      if (options && options.includeTime) {
        result += (' at ' + messageDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'}));
      }
      if (useSpeakTag) {
        result = '<speak>' + result + '</speak>';
      }
      return result;
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
