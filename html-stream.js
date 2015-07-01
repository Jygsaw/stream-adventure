var trumpet = require('trumpet')();
var through = require('through2');

var loudStream = trumpet.select('.loud').createStream();
var upper = through(function (chunk, encoding, next) {
  this.push(chunk.toString().toUpperCase());
  next();
});

loudStream.pipe(upper).pipe(loudStream);

process.stdin.pipe(trumpet).pipe(process.stdout);
