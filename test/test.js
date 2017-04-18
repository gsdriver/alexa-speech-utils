const utils = require('../utils.js');
const assert = require('assert');

// 'and' and 'or'
describe('And', () => {
  it('should return no comma with two items', () => {
    assert.equal(utils.and(['foo', 'bar']), 'foo and bar');
  });
  it('should insert pauses', () => {
    assert.equal(utils.or(['beg', 'borrow', 'steal'], {pause: '1s'}),
      'beg <break time=\'1s\'/> borrow <break time=\'1s\'/> or steal');
  });
  it('should include speak tags', () => {
    assert.equal(utils.and(['one', 'two', 'three', 'four'], {ssmltag: true}),
      '<speak>one, two, three, and four</speak>');
  });
});

