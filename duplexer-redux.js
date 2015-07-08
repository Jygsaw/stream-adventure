var duplexer = require('duplexer2');
var through = require('through2').obj;

module.exports = function (counter) {
  var counts = {};
  var input = through(write, end);
  return duplexer(input, counter);

  function write(chunk, encoding, next) {
    counts[chunk.country] = (counts[chunk.country] || 0) + 1;
    next();
  }

  function end(done) {
    counter.setCounts(counts);
    done();
  }
};
