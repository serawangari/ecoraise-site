// ===== Mobile nav =====
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (navToggle && links){
  navToggle.addEventListener('click', () => {
    const show = getComputedStyle(links).display === 'none';
    links.style.display = show ? 'flex' : 'none';
  });
}

// ===== Reveal on scroll =====
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting){
      e.target.classList.add('is-visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.reveal').forEach(el => io.observe(el));

/* === HERO SLIDESHOW (crossfade) === */
const slides = [
  './assets/img/hero.jpg',
  './assets/img/hero-2.jpg',
  './assets/img/hero-3.gif'
];

// Preload images
slides.forEach(src => { const i = new Image(); i.src = src; });

const imgA = document.querySelector('.hero-img-1');
const imgB = document.querySelector('.hero-img-2');
let current = 0;
let showA = true;

function swapHero(){
  const next = (current + 1) % slides.length;
  const top   = showA ? imgA : imgB;   // currently visible
  const under = showA ? imgB : imgA;   // will fade in

  // prepare next image and fade it in
  under.src = slides[next];
  under.classList.add('show');
  top.classList.remove('show');

  // swap pointers
  showA = !showA;
  current = next;
}

// Change every 7s
if (imgA && imgB) setInterval(swapHero, 7000);

/* === Parallax: move both hero layers === */
const heroLayers = document.querySelectorAll('.hero-media img');
if (heroLayers.length){
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.25;
    heroLayers.forEach(el => {
      el.style.transform = `translateY(${y}px) scale(1.05)`;
    });
  });
}

// ===== Simple counters (legacy .stat-count) =====
function animateCount(el){
  const end = Number(el.dataset.count || 0);
  const dur = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    const val = Math.floor(end * p);
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting){
      const target = e.target;
      if (target.classList.contains('stat-count')) animateCount(target);
      if (target.classList.contains('big-stat')) {
        const numEl = target.querySelector('.stat-count-adv');
        if (numEl) animateCountAdv(numEl);
      }
      statObserver.unobserve(target);
    }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-count, .big-stat').forEach(el => statObserver.observe(el));

// ===== Advanced counters (prefix/suffix like $ / K+ / M) =====
function animateCountAdv(el){
  const end = Number(el.dataset.end || 0);
  const dur = 1600;
  const prefix = el.dataset.prefix || '';
  const suffix = el.dataset.suffix || '';
  const start = performance.now();

  function tick(now){
    const p = Math.min((now - start) / dur, 1);
    const val = Math.floor(end * p);
    el.textContent = `${prefix}${val.toLocaleString()}${suffix}`;
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

// ===== Progress bar =====
const pb = document.querySelector('.progress-bar');
if (pb){
  const pct = Number(pb.dataset.progress || 0);
  setTimeout(() => { pb.style.width = pct + '%'; }, 400);
  const label = pb.querySelector('span');
  if (label) label.textContent = pct + '%';
}

// ===== Donation chips =====
document.querySelectorAll('.amount').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amount').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const ca = document.getElementById('custom-amount');
    if (ca) ca.value = btn.dataset.value;
  });
});

// ===== Year =====
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// ===== Gallery featured swap =====
const galleryHero = document.querySelector('.gallery-hero');
const galleryTitle = document.querySelector('.gallery-title');
const galleryDesc  = document.querySelector('.gallery-desc');
const galleryBtn   = document.querySelector('.gallery-btn');

if (galleryHero && galleryTitle && galleryDesc && galleryBtn){
  document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.gallery-item').forEach(i => i.classList.remove('active'));
      item.classList.add('active');

      const bg   = item.dataset.bg;
      const t    = item.dataset.title || '';
      const d    = item.dataset.desc  || '';
      const link = item.dataset.link  || '#';

      galleryHero.style.transition = 'background-image .35s ease';
      galleryHero.style.setProperty('--bg', `url('${bg}')`);
      galleryTitle.textContent = t;
      galleryDesc.textContent  = d;
      galleryBtn.href = link;
    });
  });
}


