const fs = require('fs');
const path = require('path');

const content = fs.readFileSync(path.join(__dirname, 'app/components/PropertyIcons.tsx'), 'utf8');
const outDir = path.join(__dirname, 'public/assets/exports/icons');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// Fixed Regex for Icon[A-Za-z]
const regex = /export function (Icon[A-Za-z0-9_]+).*?return \(\s*(<svg[\s\S]*?<\/svg>)\s*\);/gims;
let match;
let count = 0;

while ((match = regex.exec(content)) !== null) {
  let name = match[1];
  let svg = match[2];
  
  // Clean up the SVG string
  svg = svg.replace(/\{size\}/g, '"24"')
           .replace(/\{color\}/g, '"#1c2c44"')
           .replace(/\{\.\.\.base\}/g, 'viewBox="0 0 24 24" fill="none" stroke-linecap="round" stroke-linejoin="round"')
           .replace(/className=\{className\}/g, '')
           .replace(/strokeWidth=\{1\.5\}/g, 'stroke-width="1.5"')
           .replace(/strokeWidth=\{2\.5\}/g, 'stroke-width="2.5"')
           .replace(/strokeWidth=\{2\}/g, 'stroke-width="2"')
           .replace(/aria-label=\{[^\}]+\}/g, '')
           .replace(/role="img"/g, '')
           .replace(/\{title && <title>\{title\}<\/title>\}/g, '')
           .replace(/xmlns="[^"]*"/g, '');

  svg = svg.replace(/<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
  
  // Fix React camelCase attributes
  svg = svg.replace(/strokeWidth=/g, 'stroke-width=')
           .replace(/strokeLinecap=/g, 'stroke-linecap=')
           .replace(/strokeLinejoin=/g, 'stroke-linejoin=')
           .replace(/fillRule=/g, 'fill-rule=')
           .replace(/clipRule=/g, 'clip-rule=');

  fs.writeFileSync(path.join(outDir, `${name}.svg`), svg, 'utf8');
  count++;
}

console.log(`Generated ${count} SVG icons in ${outDir}`);

const archiver = require('archiver');
const output = fs.createWriteStream(path.join(__dirname, 'public/assets/exports/precision-management-icons.zip'));
const archive = archiver('zip', { zlib: { level: 9 } });

output.on('close', function() {
  console.log(archive.pointer() + ' total bytes');
  console.log('archiver has been finalized and the output file descriptor has closed.');
});

archive.pipe(output);
archive.directory(outDir, 'precision-management-icons');
archive.finalize();
