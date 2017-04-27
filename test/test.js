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
