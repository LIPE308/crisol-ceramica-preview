import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
export function startMotion() {
  gsap.registerPlugin(ScrollTrigger);
  const media = gsap.matchMedia();
  media.add('(prefers-reduced-motion:no-preference)', () => {
    // Short, grounded entrances establish the reading order. No hidden initial CSS.
    gsap.from('.hero-copy > *', { y: 16, autoAlpha: 0, duration: .6, stagger: .08, ease: 'power2.out', clearProps: 'all' });
    gsap.from('.hero-frame', { y: 18, duration: .8, ease: 'power2.out', clearProps: 'transform' });
    document.querySelectorAll('.section h2, .universe-copy, .experience > div, .gallery-piece, .about-name').forEach(element => {
      ScrollTrigger.create({ trigger: element, start: 'top 93%', once: true, onEnter: () => {
        gsap.fromTo(element, { y: 22, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .55, ease: 'power2.out', clearProps: 'all' });
      }});
    });
    document.fonts.ready.then(() => ScrollTrigger.refresh());
  });
  media.add('(min-width:1024px) and (pointer:fine) and (prefers-reduced-motion:no-preference)', () => {
    // The photograph shifts a few pixels to suggest touch and depth without pinning.
    gsap.fromTo('.hero-frame img', { y: -10, scale: 1.055 }, { y: 10, scale: 1.055, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: .6 } });
  });
  window.addEventListener('pagehide', () => media.revert(), { once: true });
  return media;
}
