const fs = require('fs');
const path = require('path');
const https = require('https');

const files = ['index.html', 'sport.html', 'sport.htm'];

function download(url, dest) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https.get(url, { timeout: 30000 }, (res) => {
      if (res.statusCode !== 200) {
        reject(new Error(`Failed ${res.statusCode}: ${url}`));
        return;
      }
      res.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(dest, () => {});
      reject(err);
    });
  });
}

async function processFile(file) {
  const filePath = path.join(__dirname, file);
  if (!fs.existsSync(filePath)) return;

  let html = fs.readFileSync(filePath, 'utf8');
  const urlRegex = /https:\/\/sitethemedata\.com\/sitethemes\/taj777\.com\/front\/(banners|sidebanners)\/([^"\s&]+)/g;
  const matches = [...html.matchAll(urlRegex)];
  const unique = [...new Set(matches.map(m => m[0]))];

  console.log(`${file}: found ${unique.length} external image(s)`);

  for (const url of unique) {
    const m = url.match(/\/front\/(banners|sidebanners)\/([^\/]+)$/);
    if (!m) continue;
    const dirName = m[1]; // banners or sidebanners
    const fileName = m[2];
    const dir = path.join(__dirname, 'sport_files', dirName);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    const dest = path.join(dir, fileName);

    try {
      await download(url, dest);
      console.log(`  downloaded ${fileName}`);
    } catch (err) {
      console.log(`  ERROR ${fileName}: ${err.message}`);
      continue;
    }

    // Replace all occurrences with the local relative path
    const localPath = `./sport_files/${dirName}/${fileName}`;
    html = html.split(url).join(localPath);
  }

  fs.writeFileSync(filePath, html, 'utf8');
  console.log(`${file}: image paths updated`);
}

(async () => {
  for (const file of files) {
    await processFile(file);
  }
  console.log('Done');
})();
