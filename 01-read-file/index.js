const fs = require('fs');
const path = require('path');
const readStream = fs.createReadStream(path.resolve(__dirname,'text.txt'));
const {stdout, stderr, exit} = process;

readStream.on('error', error => {
  stderr.write(error.message);
  exit();
});

readStream.on('data', chunk => stdout.write(chunk));