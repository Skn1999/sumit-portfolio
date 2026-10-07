const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const HTML_DIR = path.resolve(__dirname, '../../dist/behance-actai/html');
const IMAGES_DIR = path.resolve(__dirname, '../../dist/behance-actai/images');
const PDFS_DIR = path.resolve(__dirname, '../../dist/behance-actai/pdf');

if (!fs.existsSync(IMAGES_DIR)) fs.mkdirSync(IMAGES_DIR, { recursive: true });
if (!fs.existsSync(PDFS_DIR)) fs.mkdirSync(PDFS_DIR, { recursive: true });

const CHROME_PATH = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';

const plates = [
  { name: '01_hero_cover', height: 1280 },
  { name: '02_the_tension', height: 1040 },
  { name: '03_mental_model', height: 980 },
  { name: '04_progressive_disclosure', height: 1260 },
  { name: '05_evidence_inspector', height: 1140 },
  { name: '06_design_tradeoffs', height: 1080 },
  { name: '07_design_system', height: 1220 },
  { name: '08_outcome_and_links', height: 880 },
];

console.log('Rendering high-res PNG images & PDFs via Headless Chrome...');

for (const plate of plates) {
  const htmlFile = path.join(HTML_DIR, `${plate.name}.html`);
  const pngFile = path.join(IMAGES_DIR, `${plate.name}.png`);
  const pdfFile = path.join(PDFS_DIR, `${plate.name}.pdf`);

  const fileUrl = `file://${htmlFile}`;

  console.log(`Rendering ${plate.name} (1920x${plate.height})...`);

  // Render PNG
  const cmdPng = `"${CHROME_PATH}" --headless=new --screenshot="${pngFile}" --window-size=1920,${plate.height} --hide-scrollbars "${fileUrl}"`;
  try {
    execSync(cmdPng, { stdio: 'ignore' });
  } catch (err) {
    console.error(`Error rendering PNG for ${plate.name}:`, err.message);
  }

  // Render PDF
  const cmdPdf = `"${CHROME_PATH}" --headless=new --print-to-pdf="${pdfFile}" --print-to-pdf-no-header --window-size=1920,${plate.height} "${fileUrl}"`;
  try {
    execSync(cmdPdf, { stdio: 'ignore' });
  } catch (err) {
    console.error(`Error rendering PDF for ${plate.name}:`, err.message);
  }
}

console.log('All individual plates rendered.');
