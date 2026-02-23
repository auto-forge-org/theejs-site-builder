const fs = require('fs');
const path = require('path');

async function copyDir(src, dest) {
  await fs.promises.mkdir(dest, { recursive: true });
  const entries = await fs.promises.readdir(src);
  for (const e of entries) {
    const from = path.join(src, e);
    const to = path.join(dest, e);
    const stat = await fs.promises.stat(from);
    if (stat.isDirectory()) await copyDir(from, to);
    else await fs.promises.copyFile(from, to);
  }
}

(async () => {
  const cwd = __dirname;
  const src = path.join(cwd, 'src');
  const dist = path.join(cwd, 'dist');
  if (fs.promises.rm) {
    await fs.promises.rm(dist, { recursive: true, force: true });
  } else {
    // Fallback for older Node versions
    await fs.promises.rmdir(dist, { recursive: true });
  }
  await fs.promises.mkdir(dist, { recursive: true });
  try {
    const files = await fs.promises.readdir(src);
    for (const f of files) {
      const from = path.join(src, f);
      const to = path.join(dist, f);
      const stat = await fs.promises.stat(from);
      if (stat.isDirectory()) await copyDir(from, to);
      else await fs.promises.copyFile(from, to);
    }
    console.log('Built to', dist);
  } catch (err) {
    console.error('Build failed:', err);
    process.exit(1);
  }
})();
