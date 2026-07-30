const fs = require('fs');
const path = require('path');
const https = require('https');
const opentype = require('opentype.js');

const FONT_URL = 'https://raw.githubusercontent.com/google/fonts/main/ofl/dancingscript/DancingScript%5Bwght%5D.ttf';
const OUTPUT_PATH = path.join(__dirname, '../src/assets/fonts/cursive.json');

function download(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return download(res.headers.location).then(resolve).catch(reject);
      }
      const data = [];
      res.on('data', (chunk) => data.push(chunk));
      res.on('end', () => resolve(Buffer.concat(data)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

function fontToTypeface(font) {
  const scale = (1000 * 100) / ((font.unitsPerEm || 2048) * 72);
  const familyName = font.names && font.names.fontFamily ? (font.names.fontFamily.en || Object.values(font.names.fontFamily)[0] || 'Cursive') : 'Cursive';
  const result = {
    glyphs: {},
    familyName: familyName,
    ascender: Math.round(font.ascender * scale),
    descender: Math.round(font.descender * scale),
    underlinePosition: Math.round((font.tables.post ? font.tables.post.underlinePosition : -100) * scale),
    underlineThickness: Math.round((font.tables.post ? font.tables.post.underlineThickness : 50) * scale),
    boundingBox: {
      yMin: Math.round(font.tables.head ? font.tables.head.yMin : -200 * scale),
      xMin: Math.round(font.tables.head ? font.tables.head.xMin : -100 * scale),
      yMax: Math.round(font.tables.head ? font.tables.head.yMax : 800 * scale),
      xMax: Math.round(font.tables.head ? font.tables.head.xMax : 1000 * scale)
    },
    resolution: 1000,
    original_font_information: font.tables.name || {}
  };

  const glyphs = font.glyphs.glyphs;
  for (const i in glyphs) {
    const glyph = glyphs[i];
    if (glyph.unicode !== undefined) {
      const token = {};
      token.ha = Math.round(glyph.advanceWidth * scale);
      token.x_min = Math.round(glyph.xMin * scale);
      token.x_max = Math.round(glyph.xMax * scale);
      token.o = '';
      if (glyph.path) {
        glyph.path.commands.forEach(function(cmd) {
          switch (cmd.type) {
            case 'M':
              token.o += 'm ' + Math.round(cmd.x * scale) + ' ' + Math.round(cmd.y * scale) + ' ';
              break;
            case 'L':
              token.o += 'l ' + Math.round(cmd.x * scale) + ' ' + Math.round(cmd.y * scale) + ' ';
              break;
            case 'Q':
              token.o += 'q ' + Math.round(cmd.x1 * scale) + ' ' + Math.round(cmd.y1 * scale) + ' ' + Math.round(cmd.x * scale) + ' ' + Math.round(cmd.y * scale) + ' ';
              break;
            case 'C':
              token.o += 'c ' + Math.round(cmd.x1 * scale) + ' ' + Math.round(cmd.y1 * scale) + ' ' + Math.round(cmd.x2 * scale) + ' ' + Math.round(cmd.y2 * scale) + ' ' + Math.round(cmd.x * scale) + ' ' + Math.round(cmd.y * scale) + ' ';
              break;
          }
        });
      }
      result.glyphs[String.fromCharCode(glyph.unicode)] = token;
    }
  }
  return result;
}

async function main() {
  console.log('Downloading DancingScript cursive font...');
  const buffer = await download(FONT_URL);
  console.log('Parsing font with opentype.js...');
  const font = opentype.parse(buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength));
  const typeface = fontToTypeface(font);

  const outDir = path.dirname(OUTPUT_PATH);
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_PATH, JSON.stringify(typeface));
  console.log(`Successfully generated cursive typeface JSON at ${OUTPUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
