var cypher = process.argv[2];
var passphrase = process.argv[3];

var crypto = require('crypto');
var decrypt = crypto.createDecipher(cypher, passphrase);
var zlib = require('zlib');
var tar = require('tar');
var parser = tar.Parse();
var through = require('through2').obj;

parser.on('entry', function (e) {
  if (e.type === 'File') {
    var hash = crypto.createHash('md5', { encoding: 'hex' });
    e.pipe(hash).pipe(through(function (chunk, encoding, next) {
      console.log(chunk + ' ' + e.path);
    }));
  }
});

process.stdin
  .pipe(decrypt)
  .pipe(zlib.createGunzip())
  .pipe(parser)
