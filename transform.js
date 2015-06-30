var through2 = require('through2');
var transform = through2(write, end);
process.stdin.pipe(transform).pipe(process.stdout);

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}
