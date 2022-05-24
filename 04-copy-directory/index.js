const fs = require('fs');
const path = require('path');
const source = 'files';
const dest = 'files-copy';

function copyDir(source, dest) {
  const errMesageOut = (err) => {
    console.log('Ошибка:\n' + err.message +'\n');
    process.exit();
  };

  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) errMesageOut(err);
    fs.readdir(source, {withFileTypes: true}, (err, items) => {
      if (err) errMesageOut(err);
      items.forEach(item => {
        if (item.isFile()) {
          fs.copyFile(path.resolve(source, item.name), path.resolve(dest, item.name), err => {
            if (err) errMesageOut(err);
          });
        } else {
          copyDir(path.resolve(source, item.name), path.resolve(dest, item.name));
        }
      });
    });
  });
}

fs.rm(path.resolve(__dirname, dest), {recursive: true, force: true}, () =>
  copyDir(path.resolve(__dirname, source), path.resolve(__dirname, dest)));
