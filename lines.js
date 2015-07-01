var through2 = require('through2');
var transform = through2(write, end);
var count = 0;
process.stdin.pipe(transform).pipe(process.stdout);


function write(buffer, encoding, next) {
  count++;
  if ((count % 2) === 0) {
    this.push(buffer.toString().toUpperCase());
  } else {
    this.push(buffer.toString().toLowerCase());
  }
  next();
}

function end(done) {
  done();
}
