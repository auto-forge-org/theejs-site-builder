const fs = require('fs');
const path = require('path');
const idx = path.join(__dirname, 'dist', 'index.html');
const app = path.join(__dirname, 'dist', 'app.js');
if (!fs.existsSync(idx)) {
  console.error('dist/index.html not found');
  process.exit(1);
}
if (!fs.existsSync(app)) {
  console.error('dist/app.js not found');
  process.exit(1);
}
console.log('Test passed');
