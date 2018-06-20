'use strict';

const utils = (options) => {
  let useSpeakTag;

  if (options && options.speakTag) {
    useSpeakTag = options.speakTag;
  }

  return {
    and: function(items, options) {
      let andText = 'and';

      if (options && options.locale) {
        // We also support German - default to English
        if (options.locale.toUpperCase() == 'DE-DE') {
          andText = 'und';
        }
      }

      return combineItems(andText, items, options, useSpeakTag);
    },
    or: function(items, options) {
      let orText = 'or';

      if (options && options.locale) {
        // We also support German - default to English
        if (options.locale.toUpperCase() == 'DE-DE') {
          orText = 'oder';
        }
      }

      return combineItems(orText, items, options, useSpeakTag);
    },
    formatCurrency: function(amount, locale) {
      const localeUpper = (locale) ? locale.toUpperCase() : 'EN-US';

      if (isNaN(amount)) {
        return null;
      } else {
        let result;
        const roundedAmount = Math.round(amount * 100) / 100;

        if (localeUpper === 'EN-GB') {
          result = ('£' + roundedAmount);
        } else if (localeUpper === 'DE-DE') {
          result = ('€' + roundedAmount);
        } else {
          // Default to US English
          result = ('$' + roundedAmount);
        }

        if (useSpeakTag) {
          result = '<speak>' + result + '</speak>';
        }
        return result;
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
      const now = ((options && options.reference) ? new Date(options.reference) : new Date());
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
  let separatorBeforeConjunction = true;

  if (options && options.pause) {
    separator = ' <break time=\'' + options.pause + '\'/> ';
  } else if (options && options.preseparator) {
    separator = options.preseparator;
  } else if (options && options.postseparator) {
    separator = options.postseparator;
    separatorBeforeConjunction = false;
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
          if (separatorBeforeConjunction) {
            result += separator;
            if (i == (len - 2)) {
              result += (conjunction + ' ');
            }
          } else {
            if (i == (len - 2)) {
              result += (' ' + conjunction);
            }
            result += separator;
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
