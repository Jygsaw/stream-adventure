var port = process.argv[2];

var http = require('http');
var through2 = require('through2');
var transform = through2(write, end);

var server = http.createServer(function (req, res) {
  if (req.method === 'POST') {
    req.pipe(transform).pipe(res);
  }
});

server.listen(port);

function write(buffer, encoding, next) {
  this.push(buffer.toString().toUpperCase());
  next();
}

function end(done) {
  done();
}
