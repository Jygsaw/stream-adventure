var request = require('request');
var post = request.post('http://localhost:8099');
process.stdin.pipe(post).pipe(process.stdout);
