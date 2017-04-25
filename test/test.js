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
