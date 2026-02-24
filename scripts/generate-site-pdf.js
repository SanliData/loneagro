/**
 * Lonestar Agro – Site sayfa görüntülerini PDF’e dönüştürür (yatırımcı / yönetim özeti).
 * Kullanım: npm run build:pdf  (önce npm install)
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { PDFDocument, StandardFonts } = require('pdf-lib');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const OUT_PATH = path.join(PROJECT_ROOT, 'docs', 'Lonestar-Agro-Site-Ozeti.pdf');

const PAGES = [
  { path: 'index.html', title: 'Home' },
  { path: 'about.html', title: 'About Us' },
  { path: 'services.html', title: 'Services' },
  { path: 'industries-served.html', title: 'Industries Served' },
  { path: 'projects.html', title: 'Projects' },
  { path: 'careers.html', title: 'Careers' },
  { path: 'locations.html', title: 'Locations' },
  { path: 'sustainability.html', title: 'Sustainability' },
  { path: 'safety-compliance.html', title: 'Safety & Compliance' },
  { path: 'contact.html', title: 'Contact' },
];

const PORT = 3765;

function serveStatic(root) {
  return http.createServer((req, res) => {
    let p = path.join(root, req.url === '/' ? 'index.html' : req.url.replace(/^\//, ''));
    if (!p.startsWith(root)) {
      res.statusCode = 403;
      return res.end();
    }
    fs.readFile(p, (err, data) => {
      if (err) {
        res.statusCode = 404;
        return res.end('Not found');
      }
      const ext = path.extname(p);
      const types = { '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.svg': 'image/svg+xml', '.ico': 'image/x-icon' };
      res.setHeader('Content-Type', types[ext] || 'application/octet-stream');
      res.end(data);
    });
  });
}

async function main() {
  const server = serveStatic(PROJECT_ROOT);
  await new Promise((resolve) => server.listen(PORT, '127.0.0.1', resolve));
  console.log('Static server http://127.0.0.1:' + PORT);

  let puppeteer;
  try {
    puppeteer = require('puppeteer');
  } catch (e) {
    console.error('puppeteer yüklü değil. Çalıştırın: npm install');
    server.close();
    process.exit(1);
  }

  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const baseUrl = `http://127.0.0.1:${PORT}`;
  const screenshots = [];

  for (const { path: pagePath, title } of PAGES) {
    const url = pagePath === 'index.html' ? baseUrl + '/' : baseUrl + '/' + pagePath;
    const page = await browser.newPage();
    await page.setViewport({ width: 1200, height: 800 });
    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 15000 });
      await page.evaluate(() => window.scrollTo(0, 0));
      const buf = await page.screenshot({ type: 'png', fullPage: true });
      screenshots.push({ title, buffer: buf });
      console.log('Captured:', title);
    } catch (e) {
      console.warn('Skip', url, e.message);
    }
    await page.close();
  }

  await browser.close();
  server.close();

  const pdfDoc = await PDFDocument.create();
  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const margin = 40;
  const pageW = 595;
  const pageH = 842;
  const contentW = pageW - margin * 2;

  // Cover
  const cover = pdfDoc.addPage([pageW, pageH]);
  let y = pageH - margin - 50;
  cover.drawText('Lonestar Agro', { x: margin, y, size: 24, font: fontBold });
  y -= 32;
  cover.drawText('Site overview – Investor & management summary', { x: margin, y, size: 14, font });
  y -= 24;
  cover.drawText('Generated: ' + new Date().toLocaleDateString('en-US'), { x: margin, y, size: 10, font });

  for (const { title, buffer } of screenshots) {
    const page = pdfDoc.addPage([pageW, pageH]);
    const img = await pdfDoc.embedPng(buffer);
    const imgW = img.width;
    const imgH = img.height;
    const scale = Math.min(contentW / imgW, (pageH - margin * 2 - 28) / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const imgY = pageH - margin - drawH - 22;
    page.drawImage(img, {
      x: margin,
      y: imgY,
      width: drawW,
      height: drawH,
    });
    page.drawText(title, { x: margin, y: imgY - 14, size: 10, font });
  }

  const pdfBytes = await pdfDoc.save();
  fs.mkdirSync(path.dirname(OUT_PATH), { recursive: true });
  fs.writeFileSync(OUT_PATH, pdfBytes);
  console.log('PDF yazıldı:', OUT_PATH);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
