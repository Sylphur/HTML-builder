const fs = require('fs');
const path = require('path');
const os = require('os');
const {stdin, stdout, stderr, exit} = process;
const writer = fs.createWriteStream(path.resolve(__dirname, 'output.txt'));
const exitCondition = 'exit' + os.EOL;

writer.on('error', error => {
  stderr.write('Ошибка:\n' + error.message + '\n!\n');
  exit();
});
stdout.write('\nЗдраствуйте, выходной файл output.txt\n\nВведите текст:\n');
stdin.on('data', data => data.toString() !== exitCondition ? writer.write(data) : process.emit('SIGINT'));
process.on('SIGINT', () => {
  stdout.write('\nДо свидания!\n');
  exit();
});