var combine = require('stream-combiner');
var split = require('split');
var through = require('through2').obj;
var zlib = require('zlib');

module.exports = function() {
  var collectStream = through(write, end);
  var entry = null;

  return combine(
    split(),
    collectStream,
    zlib.createGzip()
  );

  function write(chunk, encoding, next) {
    if (chunk.toString() !== '') {
      var json = JSON.parse(chunk);

      if (json.type === 'book') {
        // update entry with book
        entry.books.push(json.name);
      } else if (json.type === 'genre') {
        // output current entry
        if (entry !== null) {
          this.push(JSON.stringify(entry) + "\n");
        }

        // initialize new entry
        entry = {
          name: json.name,
          books: [],
        }
      }
    }
    next();
  }
  function end(done) {
    // output current entry
    this.push(JSON.stringify(entry) + "\n");
    done();
  }
};
