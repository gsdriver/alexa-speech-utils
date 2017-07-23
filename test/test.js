const utils = require('../utils.js');
const assert = require('assert');

// 'and' and 'or'
describe('and and or', () => {
  it('should return no comma with two items', () => {
    assert.equal(utils().and(['foo', 'bar']), 'foo and bar');
  });
  it('should insert pauses', () => {
    assert.equal(utils().or(['beg', 'borrow', 'steal'], {pause: '1s'}),
      'beg <break time=\'1s\'/> borrow <break time=\'1s\'/> or steal');
  });
  it('should include speak tags', () => {
    assert.equal(utils({speakTag: true}).and(['one', 'two', 'three', 'four']),
      '<speak>one, two, three, and four</speak>');
  });
  it('should include pre separators', () => {
    assert.equal(utils().and(['one', 'two', 'three', 'four'], {preseparator: '<audio src=\"test.mp3\"/>'}),
      'one<audio src=\"test.mp3\"/>two<audio src=\"test.mp3\"/>three<audio src=\"test.mp3\"/>and four');
  });
  it('should include post separators', () => {
    assert.equal(utils().and(['one', 'two', 'three', 'four'], {postseparator: '<audio src=\"test.mp3\"/>'}),
      'one<audio src=\"test.mp3\"/>two<audio src=\"test.mp3\"/>three and<audio src=\"test.mp3\"/>four');
  });
  it('should work with German', () => {
    assert.equal(utils().and(['foo', 'bar'], {locale: 'de-DE'}), 'foo und bar');
  });
  it('should insert pauses in German', () => {
    assert.equal(utils().or(['beg', 'borrow', 'steal'], {pause: '1s', locale: 'de-DE'}),
      'beg <break time=\'1s\'/> borrow <break time=\'1s\'/> oder steal');
  });
});

// numberOfItems
describe('numberOfItems', () => {
  it('should return plural with zero', () => {
    assert.equal(utils().numberOfItems(0, 'dog', 'dogs'), 'no dogs');
  });
  it('should return singular with one', () => {
    assert.equal(utils().numberOfItems(1, 'cat', 'cats'), '1 cat');
  });
  it('should return plural with more than one', () => {
    assert.equal(utils().numberOfItems(10, 'cactus', 'cacti'), '10 cacti');
  });
});

// formatCurrency
describe('formatCurrency', () => {
  it('should default to US dollars', () => {
    assert.equal(utils().formatCurrency(4), '$4');
  });
  it('should return pounds for UK', () => {
    assert.equal(utils().formatCurrency(5.5, 'en-GB'), '£5.5');
  });
  it('should return euro for DE', () => {
    assert.equal(utils({speakTag: true}).formatCurrency(2.006, 'de-DE'), '<speak>€2.01</speak>');
  });
});

// relativeDate
describe('relativeDate', () => {
  const now = Date.now();
  let testDate;

  it('should return an absolute date', () => {
    assert.equal(utils().relativeDate(1393128469191, {includeTime: true}), 'February 22, 2014 at 8:07 PM');
  });
  it('should return today', () => {
    testDate = new Date(now);
    assert.equal(utils().relativeDate(testDate), 'today');
  });
  it('should return tomorrow', () => {
    testDate = new Date(now);
    testDate.setDate(testDate.getDate() + 1);
    assert.equal(utils().relativeDate(testDate), 'tomorrow');
  });
  it('should return yesterday', () => {
    testDate = new Date(now);
    testDate.setDate(testDate.getDate() - 1);
    testDate.setHours(20);
    testDate.setMinutes(0);
    assert.equal(utils({speakTag: true}).relativeDate(testDate, {includeTime: true}), '<speak>yesterday at 8:00 PM</speak>');
  });
  it('should return a date without a year', () => {
    testDate = new Date(now);

    testDate.setDate(15);
    if (testDate.getMonth() == 1) {
      testDate.setMonth(2);
      assert.equal(utils().relativeDate(testDate), 'March 15');
    } else {
      testDate.setMonth(1);
      assert.equal(utils().relativeDate(testDate), 'February 15');
    }
  });
});
