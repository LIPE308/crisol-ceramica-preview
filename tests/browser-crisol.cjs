'use strict';
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const playwright = require(process.env.PLAYWRIGHT_MODULE || 'playwright');
const root = path.resolve(__dirname, '..');
const origin = process.env.CRISOL_URL || 'http://127.0.0.1:3113/';
const localOrigin = new URL(origin).origin;
const out = path.join(root, 'tmp/crisol');
const report = { checks: [], failures: [], pageErrors: [], consoleErrors: [], failedResponses: [], unexpectedRequests: [], metrics: {}, contrast: [] };
const monitored = [];
async function check(name, action) {
  try { await action(); report.checks.push(name); console.log('PASS ' + name); }
  catch (error) { report.failures.push({ name, message: error.message }); console.error('FAIL ' + name + ': ' + error.message); }
}
async function installMetrics(context) {
  await context.addInitScript(() => {
    window.__crisolMetrics = { lcp: null, cls: 0 };
    try { new PerformanceObserver(list => { const entries = list.getEntries(); const last = entries[entries.length - 1]; window.__crisolMetrics.lcp = last.startTime; }).observe({ type: 'largest-contentful-paint', buffered: true }); } catch {}
    try { new PerformanceObserver(list => { for (const item of list.getEntries()) if (!item.hadRecentInput) window.__crisolMetrics.cls += item.value; }).observe({ type: 'layout-shift', buffered: true }); } catch {}
  });
}
async function contextFor(browser, label, settings = {}, blockedMotion = false, initialization) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce', colorScheme: 'light', ...settings });
  await installMetrics(context);
  if (initialization) await context.addInitScript(initialization);
  await context.route('**/*', async route => {
    const url = route.request().url();
    if (blockedMotion && /\/motion\.js(?:\?|$)/.test(url)) return route.abort();
    if (new URL(url).origin === localOrigin) return route.continue();
    report.unexpectedRequests.push({ label, url });
    // A map is inspected locally; no request is transmitted to Google.
    return route.fulfill({ status: 200, contentType: 'text/html', body: '<!doctype html><title>Map intercepted for local QA</title>' });
  });
  const page = await context.newPage();
  monitored.push({ page, label, blockedMotion });
  page.on('pageerror', error => report.pageErrors.push({ label, message: error.message }));
  page.on('console', message => {
    if (message.type() === 'error' && !(blockedMotion && /motion\.js|ERR_FAILED/.test(message.text()))) report.consoleErrors.push({ label, message: message.text() });
  });
  page.on('response', response => { if (response.status() >= 400) report.failedResponses.push({ label, status: response.status(), url: response.url() }); });
  await page.goto(origin, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  return { context, page };
}
async function decodeImages(page) {
  for (const image of await page.locator('main img:visible').all()) await image.scrollIntoViewIfNeeded();
  await page.evaluate(() => Promise.all([...document.querySelectorAll('main img')].map(image => image.decode())));
  assert(await page.locator('main img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0)), 'every main photograph must decode');
}
async function keyboardOpenGallery(page) {
  const first = page.locator('[data-gallery]').first();
  await first.focus();
  assert(await first.evaluate(element => element === document.activeElement), 'gallery link receives focus');
  assert.notEqual(await first.evaluate(element => getComputedStyle(element).outlineStyle), 'none', 'keyboard focus is visible');
  await page.keyboard.press('Enter');
  assert(await page.locator('#gallery-dialog').isVisible(), 'Enter opens lightbox');
  await page.locator('#dialog-image').evaluate(image => image.decode());
  assert.equal(await page.locator('#gallery-position').textContent(), '1 / 3');
  await page.keyboard.press('ArrowRight');
  assert.equal(await page.locator('#gallery-position').textContent(), '2 / 3');
  assert.equal(await page.locator('#dialog-image').getAttribute('src'), await page.locator('[data-gallery]').nth(1).evaluate(element => element.href));
  await page.getByRole('button', { name: 'Próxima fotografia', exact: true }).click();
  assert.equal(await page.locator('#gallery-position').textContent(), '3 / 3');
  await page.keyboard.press('Shift+Tab');
  assert(await page.evaluate(() => !!document.activeElement.closest('#gallery-dialog')), 'native modal contains keyboard focus');
  await page.keyboard.press('Escape');
  await page.waitForFunction(() => !document.querySelector('#gallery-dialog').open);
  assert(await first.evaluate(element => element === document.activeElement), 'Escape restores opener focus');
}
(async () => {
  fs.mkdirSync(out, { recursive: true });
  const edge = 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe';
  const executablePath = process.env.BROWSER_EXE || (process.platform === 'win32' && fs.existsSync(edge) ? edge : undefined);
  const browser = await playwright.chromium.launch({ ...(executablePath ? { executablePath } : {}), headless: true });
  try {
    const { context, page } = await contextFor(browser, 'reduced');
    report.metrics.initial1440 = await page.evaluate(() => window.__crisolMetrics);
    for (const width of [320, 390, 768, 1024, 1440]) {
      await check('viewport ' + width + ': overflow, decoded photos and screenshots', async () => {
        await page.setViewportSize({ width, height: width < 768 ? 844 : 1000 });
        await page.evaluate(() => scrollTo(0, 0));
        const overflow = await page.evaluate(() => ({ document: document.documentElement.scrollWidth, viewport: innerWidth, offenders: [...document.querySelectorAll('main *')].filter(element => { const rect = element.getBoundingClientRect(); return rect.width && (rect.left < -1 || rect.right > innerWidth + 1); }).slice(0, 8).map(element => element.tagName + '.' + element.className) }));
        assert(overflow.document <= overflow.viewport, JSON.stringify(overflow));
        await page.screenshot({ path: path.join(out, 'qa-' + width + '-hero.png') });
        await decodeImages(page);
        await page.evaluate(() => scrollTo(0, 0));
        if (width === 390 || width === 1440) await page.screenshot({ path: path.join(out, 'qa-' + width + '-full.png'), fullPage: true });
      });
    }
    await check('semantic title, skip link and reduced motion download policy', async () => {
      assert.equal(await page.locator('h1').count(), 1);
      await page.evaluate(() => document.activeElement?.blur());
      await page.keyboard.press('Control+Home');
      await page.locator('.skip-link').focus();
      assert.equal(await page.locator('.skip-link').getAttribute('href'), '#conteudo');
      assert(!(await page.evaluate(() => performance.getEntriesByType('resource').map(resource => resource.name))).some(url => /\/motion\.js(?:\?|$)/.test(url)), 'reduced motion must not download motion.js');
    });
    await check('text contrast: sampled editorial text meets WCAG AA', async () => {
      report.contrast = await page.evaluate(() => {
        function luminance(value) { const parts = value.match(/[\d.]+/g).slice(0, 3).map(Number).map(channel => { const n = channel / 255; return n <= .04045 ? n / 12.92 : ((n + .055) / 1.055) ** 2.4; }); return parts[0] * .2126 + parts[1] * .7152 + parts[2] * .0722; }
        return ['h1', '.hero-intro', '.eyebrow', '.hero .button', '.fine-print', '.map-placeholder small', '.preview-note', '.hero-art figcaption', '.experience p'].map(selector => {
          const element = document.querySelector(selector); const style = getComputedStyle(element); let parent = element; let background;
          while (parent) { const value = getComputedStyle(parent).backgroundColor; if (!value.includes('rgba') || !value.endsWith(', 0)')) { background = value; break; } parent = parent.parentElement; }
          const ink = luminance(style.color), paper = luminance(background || 'rgb(255, 255, 255)');
          return { selector, foreground: style.color, background, ratio: Number(((Math.max(ink, paper) + .05) / (Math.min(ink, paper) + .05)).toFixed(2)), required: parseFloat(style.fontSize) >= 24 || parseFloat(style.fontSize) >= 18.66 && parseInt(style.fontWeight) >= 700 ? 3 : 4.5 };
        });
      });
      for (const sample of report.contrast) assert(sample.ratio >= sample.required, sample.selector + ': contrast ' + sample.ratio + ' below ' + sample.required);
    });
    await check('lightbox: keyboard opening, next, focus containment and Escape restoration', () => keyboardOpenGallery(page));
    await check('mobile menu: Escape restores focus and anchor closes', async () => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.evaluate(() => scrollTo(0, 0));
      const toggle = page.getByRole('button', { name: /^Menu/ });
      await toggle.focus(); await page.keyboard.press('Enter');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'true');
      assert(await page.locator('#navigation').isVisible());
      await page.keyboard.press('Escape');
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert(await toggle.evaluate(element => element === document.activeElement));
      await toggle.click();
      await page.locator('#navigation').getByRole('link', { name: 'Galeria', exact: true }).click();
      assert.equal(await toggle.getAttribute('aria-expanded'), 'false');
      assert.equal(new URL(page.url()).hash, '#galeria');
    });
    await check('process: only one details stage remains open', async () => {
      for (const stage of await page.locator('.process-stages details').all()) {
        if (await stage.getAttribute('open') === null) await stage.locator('summary').click();
        await page.waitForFunction(() => document.querySelectorAll('.process-stages details[open]').length === 1);
        assert.notEqual(await stage.getAttribute('open'), null);
      }
    });
    await check('map: no Google connection before click; correct iframe after local interception', async () => {
      assert.equal(report.unexpectedRequests.length, 0, 'all resources are local before map activation');
      assert.equal(await page.locator('.map-container iframe').count(), 0);
      await page.getByRole('button', { name: /Carregar Google Maps/ }).click();
      const frame = page.locator('.map-container iframe');
      await frame.waitFor();
      const url = new URL(await frame.getAttribute('src'));
      assert.equal(url.origin, 'https://maps.google.com');
      assert.equal(url.pathname, '/maps');
      assert.equal(url.searchParams.get('output'), 'embed');
      assert.equal(url.searchParams.get('q'), 'Escola de cerâmica e ateliê Crisol, Rua Barão de Guaraúna 374, Curitiba PR');
      assert.equal(await frame.getAttribute('referrerpolicy'), 'no-referrer');
      await page.waitForTimeout(100);
      assert.equal(report.unexpectedRequests.length, 1, 'one map navigation was intercepted');
    });
    await check('fixed editorial light theme under dark scheme', async () => {
      await page.setViewportSize({ width: 1440, height: 1000 }); await page.evaluate(() => scrollTo(0, 0));
      const before = await page.evaluate(() => ({ background: getComputedStyle(document.body).backgroundColor, color: getComputedStyle(document.body).color, scheme: getComputedStyle(document.documentElement).colorScheme }));
      await page.emulateMedia({ colorScheme: 'dark' });
      const after = await page.evaluate(() => ({ background: getComputedStyle(document.body).backgroundColor, color: getComputedStyle(document.body).color, scheme: getComputedStyle(document.documentElement).colorScheme }));
      assert.deepEqual(after, before); assert.equal(after.scheme, 'light');
      await page.screenshot({ path: path.join(out, 'qa-dark-scheme-hero.png') });
    });
    report.metrics.reducedInteractionSession = await page.evaluate(() => window.__crisolMetrics);
    await context.close();
    await check('no JS: navigation, photo links and native details remain usable', async () => {
      const { context: nojs, page: fallback } = await contextFor(browser, 'no-js', { javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
      assert.equal(await fallback.locator('.menu-toggle:visible').count(), 0);
      assert(await fallback.locator('#navigation').isVisible());
      assert.equal(await fallback.locator('[data-gallery]').count(), 3);
      assert.equal(await fallback.locator('.map-load:visible').count(), 0);
      const stage = fallback.locator('.process-stages details').nth(2);
      await stage.locator('summary').click(); assert.notEqual(await stage.getAttribute('open'), null);
      await fallback.screenshot({ path: path.join(out, 'qa-no-js-full.png'), fullPage: true });
      const originalPhoto = await fallback.locator('[data-gallery]').first().getAttribute('href');
      await fallback.locator('[data-gallery]').first().click();
      assert.equal(new URL(fallback.url()).pathname, new URL(originalPhoto, origin).pathname, 'without JS photo anchor opens original asset');
      await fallback.goto(origin);
      await fallback.locator('#navigation').getByRole('link', { name: 'Galeria', exact: true }).click();
      assert.equal(new URL(fallback.url()).hash, '#galeria');
      await nojs.close();
    });
    await check('dynamic reduced motion reverts active GSAP transforms', async () => {
      const { context: regular, page: moving } = await contextFor(browser, 'motion', { reducedMotion: 'no-preference' });
      await moving.waitForFunction(() => performance.getEntriesByType('resource').some(resource => /\/motion\.js(?:\?|$)/.test(resource.name)));
      await moving.waitForFunction(() => getComputedStyle(document.querySelector('.hero-frame img')).transform !== 'none');
      await moving.emulateMedia({ reducedMotion: 'reduce' });
      await moving.waitForFunction(() => ['.hero-frame img', '.hero-frame', '.hero-copy'].every(selector => getComputedStyle(document.querySelector(selector)).transform === 'none'));
      assert(await moving.locator('h1').isVisible());
      report.metrics.motion = await moving.evaluate(() => window.__crisolMetrics);
      await regular.close();
    });
    await check('mobile native reveals: no motion engine download and dynamic reduction cancels animation', async () => {
      const { context: native, page: mobilePage } = await contextFor(browser, 'mobile-native', { reducedMotion: 'no-preference', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, false, () => {
        window.__crisolNativeAnimations = [];
        const animate = Element.prototype.animate;
        Element.prototype.animate = function(...arguments_) { const animation = animate.apply(this, arguments_); window.__crisolNativeAnimations.push(animation); return animation; };
      });
      await mobilePage.evaluate(() => scrollTo({ top: document.querySelector('#universe-title').getBoundingClientRect().top + scrollY - 200, behavior: 'instant' }));
      await mobilePage.waitForFunction(() => window.__crisolNativeAnimations.length > 0, null, { timeout: 5000 });
      await mobilePage.emulateMedia({ reducedMotion: 'reduce' });
      await mobilePage.waitForFunction(() => document.getAnimations().length === 0);
      assert.equal(await mobilePage.locator('#universe-title').evaluate(element => getComputedStyle(element).transform), 'none');
      assert(!(await mobilePage.evaluate(() => performance.getEntriesByType('resource').map(resource => resource.name))).some(url => /\/motion\.js(?:\?|$)/.test(url)));
      await mobilePage.screenshot({ path: path.join(out, 'qa-mobile-reduced-dynamic.png') });
      await native.close();
    });
    await check('saveData: skip animation engine and preserve content', async () => {
      const { context: saving, page: saved } = await contextFor(browser, 'save-data', { reducedMotion: 'no-preference' }, false, () => Object.defineProperty(navigator.connection, 'saveData', { get: () => true }));
      await saved.waitForTimeout(1700);
      assert(!(await saved.evaluate(() => performance.getEntriesByType('resource').map(resource => resource.name))).some(url => /\/motion\.js(?:\?|$)/.test(url)));
      assert(await saved.locator('h1').isVisible());
      await saving.close();
    });
    await check('mobile without IntersectionObserver: visible fallback and working gallery', async () => {
      const { context: noObserver, page: noIO } = await contextFor(browser, 'no-observer', { reducedMotion: 'no-preference', viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true }, false, () => { delete window.IntersectionObserver; });
      assert(await noIO.locator('h1').isVisible());
      await keyboardOpenGallery(noIO);
      assert(!(await noIO.evaluate(() => performance.getEntriesByType('resource').map(resource => resource.name))).some(url => /\/motion\.js(?:\?|$)/.test(url)));
      await noObserver.close();
    });
    await check('blocked motion.js: visible content and gallery still function', async () => {
      const { context: blocked, page: safe } = await contextFor(browser, 'blocked-motion', { reducedMotion: 'no-preference' }, true);
      await safe.waitForTimeout(1700);
      assert(await safe.locator('h1').isVisible());
      assert.equal(await safe.locator('h1').evaluate(element => getComputedStyle(element).opacity), '1');
      await keyboardOpenGallery(safe);
      await safe.screenshot({ path: path.join(out, 'qa-blocked-motion-hero.png') });
      await blocked.close();
    });
    await check('runtime: no unexpected console errors, page errors or failing responses', async () => {
      assert.deepEqual(report.pageErrors, []); assert.deepEqual(report.consoleErrors, []); assert.deepEqual(report.failedResponses, []);
      assert(report.unexpectedRequests.every(item => item.url.startsWith('https://maps.google.com/maps?')), 'external requests limited to intentionally intercepted map');
    });
  } finally { await browser.close(); fs.writeFileSync(path.join(out, 'browser-results.json'), JSON.stringify(report, null, 2)); }
  console.log(JSON.stringify({ passed: report.checks.length, failures: report.failures, metrics: report.metrics }, null, 2));
  if (report.failures.length) process.exitCode = 1;
})().catch(error => { console.error(error); process.exitCode = 1; });
