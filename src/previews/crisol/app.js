const root = document.documentElement;
root.classList.add('js');
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#navigation');
const mobile = matchMedia('(max-width:767px)');
function closeMenu(restoreFocus = false) {
  toggle.setAttribute('aria-expanded', 'false');
  toggle.querySelector('span').textContent = '+';
  nav.classList.remove('is-open');
  if (restoreFocus) toggle.focus();
}
toggle.hidden = false;
toggle.addEventListener('click', () => {
  const open = toggle.getAttribute('aria-expanded') !== 'true';
  toggle.setAttribute('aria-expanded', String(open));
  toggle.querySelector('span').textContent = open ? '−' : '+';
  nav.classList.toggle('is-open', open);
});
nav.addEventListener('click', event => { if (event.target.closest('a') && mobile.matches) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') closeMenu(true); });
mobile.addEventListener('change', () => closeMenu());

const gallery = [...document.querySelectorAll('[data-gallery]')];
const dialog = document.querySelector('#gallery-dialog');
const image = document.querySelector('#dialog-image');
let index = 0, opener;
function showPhoto(position) {
  index = (position + gallery.length) % gallery.length;
  const link = gallery[index];
  document.querySelector('.image-error').hidden = true;
  image.src = link.href;
  image.alt = link.querySelector('img').alt;
  document.querySelector('#dialog-title').textContent = link.dataset.title;
  document.querySelector('#dialog-credit').textContent = link.dataset.credit;
  document.querySelector('#dialog-original').href = link.href;
  document.querySelector('#gallery-position').textContent = `${index + 1} / ${gallery.length}`;
}
image.addEventListener('error', () => { document.querySelector('.image-error').hidden = false; });
gallery.forEach((link, position) => link.addEventListener('click', event => {
  if (!dialog.showModal) return;
  event.preventDefault();
  opener = link;
  showPhoto(position);
  dialog.showModal();
  document.body.classList.add('dialog-open');
}));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('.gallery-prev').addEventListener('click', () => showPhoto(index - 1));
document.querySelector('.gallery-next').addEventListener('click', () => showPhoto(index + 1));
dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowRight') { event.preventDefault(); showPhoto(index + 1); }
  if (event.key === 'ArrowLeft') { event.preventDefault(); showPhoto(index - 1); }
});
dialog.addEventListener('click', event => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) dialog.close();
});
dialog.addEventListener('close', () => { document.body.classList.remove('dialog-open'); opener?.focus(); });

// Native details remain fully functional without JS. With JS, keep one stage open.
const stages = [...document.querySelectorAll('.process-stages details')];
stages.forEach(stage => stage.addEventListener('toggle', () => {
  if (stage.open) stages.filter(other => other !== stage).forEach(other => { other.open = false; });
}));

const loadMap = document.querySelector('.map-load');
loadMap.hidden = false;
loadMap.addEventListener('click', () => {
  const frame = document.createElement('iframe');
  frame.title = 'Localização da Crisol: Rua Barão de Guaraúna, 374, Curitiba';
  frame.referrerPolicy = 'no-referrer';
  frame.src = 'https://maps.google.com/maps?q=' + encodeURIComponent('Escola de cerâmica e ateliê Crisol, Rua Barão de Guaraúna 374, Curitiba PR') + '&output=embed';
  document.querySelector('.map-container').replaceChildren(frame);
});

// Animation is progressive enhancement. Content is visible if loading fails.
const reduceMotion = matchMedia('(prefers-reduced-motion:reduce)');
if (!reduceMotion.matches && !navigator.connection?.saveData) {
  if (matchMedia('(min-width:768px) and (pointer:fine)').matches) {
    const start = () => import('./motion.js').then(module => module.startMotion()).catch(() => {});
    if ('requestIdleCallback' in window) requestIdleCallback(start, { timeout: 1500 });
    else setTimeout(start, 100);
  } else if ('IntersectionObserver' in window) {
    // Mobile gets short native reveals, without downloading the desktop engine.
    const animations = new Set();
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        observer.unobserve(entry.target);
        if (reduceMotion.matches || !entry.target.animate) return;
        const animation = entry.target.animate([{ opacity: .3, transform: 'translateY(10px)' }, { opacity: 1, transform: 'none' }], { duration: 350, easing: 'cubic-bezier(.2,0,0,1)' });
        animations.add(animation);
        animation.finished.then(() => animations.delete(animation)).catch(() => {});
      });
    }, { threshold: .12 });
    document.querySelectorAll('.section h2, .gallery-piece').forEach(element => observer.observe(element));
    reduceMotion.addEventListener('change', () => { if (reduceMotion.matches) animations.forEach(animation => animation.cancel()); });
    window.addEventListener('pagehide', () => { observer.disconnect(); animations.forEach(animation => animation.cancel()); }, { once: true });
  }
}
