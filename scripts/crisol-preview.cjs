'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { build } = require('esbuild');
const root = path.resolve(__dirname, '..');
const source = path.join(root, 'src/previews/crisol');
const output = path.join(root, 'tmp/crisol-site/dist');
const origin = process.env.CRISOL_ORIGIN || 'https://crisol-ceramica-previa.korvy10.chatgpt.site';
const credits = [
  ['Javier Balseiro', 'Pexels', 'https://www.pexels.com/photo/potter-s-hands-shaping-clay-on-a-wheel-34230986/', 'https://www.pexels.com/license/'],
  ['ArtHouse Studio', 'Pexels', 'https://www.pexels.com/photo/close-up-of-a-person-sculpting-with-clay-7559732/', 'https://www.pexels.com/license/'],
  ['Chloe Bolton', 'Unsplash', 'https://unsplash.com/photos/ceramic-vases-on-wooden-surface-R0qthXq3jec', 'https://unsplash.com/license'],
  ['Jason Leung', 'Unsplash', 'https://unsplash.com/photos/assorted-ceramic-vases-bowl-and-figurines-on-black-wooden-shelf-fHARer-KO3E', 'https://unsplash.com/license'],
  ['Kerensa Pickett', 'Unsplash', 'https://unsplash.com/photos/person-making-clay-vase-NExZB5LZF7g', 'https://unsplash.com/license'],
].map(([author, service, link, license]) => `<p><a href="${link}" target="_blank" rel="noopener noreferrer">${author} / ${service}</a> (<a href="${license}" target="_blank" rel="noopener noreferrer">licença</a>).</p>`).join('');
async function buildPreview() {
  const identity = JSON.parse(fs.readFileSync(path.join(source, 'hosting.json'), 'utf8'));
  const hostingFile = path.join(path.dirname(output), '.openai', 'hosting.json');
  fs.mkdirSync(path.dirname(hostingFile), { recursive: true });
  if (fs.existsSync(hostingFile)) {
    const retained = JSON.parse(fs.readFileSync(hostingFile, 'utf8'));
    if (retained.project_id !== identity.project_id) throw new Error('The existing export belongs to a different Site. Preserve it and review the destination.');
  } else fs.writeFileSync(hostingFile, JSON.stringify(identity, null, 2) + '\n');
  fs.mkdirSync(path.join(output, 'assets'), { recursive: true });
  // An explicit allowlist keeps research, operational data and credentials out of export.
  for (const name of ['logo-crisol.webp','photo-hero.webp','photo-hero-mobile.webp','photo-manual.webp','photo-vase.webp','photo-shelf.webp','photo-detail.webp','editorial.woff2','jakarta.woff2','CormorantGaramond-OFL.txt','PlusJakartaSans-OFL.txt']) {
    fs.copyFileSync(path.join(source, 'assets', name), path.join(output, 'assets', name));
  }
  for (const name of ['style.css', 'app.js']) fs.copyFileSync(path.join(source, name), path.join(output, name));
  const html = fs.readFileSync(path.join(source, 'index.html'), 'utf8').replaceAll('__ORIGIN__', origin).replace('__PHOTO_CREDITS__', credits);
  if (/__\w+__/.test(html)) throw new Error('Unresolved preview placeholder.');
  fs.writeFileSync(path.join(output, 'index.html'), html);
  await build({entryPoints:[path.join(source,'motion.js')],outfile:path.join(output,'motion.js'),bundle:true,minify:true,format:'esm',target:'es2020',legalComments:'eof'});
  fs.writeFileSync(path.join(output,'robots.txt'),'User-agent: *\nDisallow: /\n');
  fs.writeFileSync(path.join(output,'_headers'),"/*\n  X-Robots-Tag: noindex, nofollow\n  X-Content-Type-Options: nosniff\n  Referrer-Policy: no-referrer\n  Content-Security-Policy: default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data:; font-src 'self'; frame-src https://maps.google.com; object-src 'none'; base-uri 'self'\n");
  console.log('Crisol production preview built: '+output);
  return output;
}
async function serve() {
  const express = require('express');
  const compression = require('compression');
  const app = express();
  app.disable('x-powered-by');
  app.use(compression());
  app.use((_req,res,next) => {res.set('X-Robots-Tag','noindex, nofollow'); next();});
  app.use(express.static(output,{dotfiles:'deny'}));
  const server = app.listen(Number(process.env.CRISOL_PORT || 3113),'127.0.0.1',() => console.log('Local: http://127.0.0.1:'+server.address().port+'/'));
}
if(require.main===module)buildPreview().then(() => process.argv.includes('--serve') ? serve() : undefined).catch(error => {console.error(error);process.exitCode=1;});
module.exports={buildPreview,output};
