// EcoRaise Lite interactions: nav toggle, scroll reveal, parallax, counters, progress

// Mobile nav (only runs if elements exist)
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (navToggle && links){
  navToggle.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  });
}

// IntersectionObserver for .reveal sections
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  });
}, { threshold: 0.2 });

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Parallax effect for the hero image (matches your markup: .hero-img)
const heroImg = document.querySelector('.hero-img');
if (heroImg){
  window.addEventListener('scroll', () => {
    const y = window.scrollY * 0.25;
    heroImg.style.transform = `translateY(${y}px) scale(1.05)`;
  });
}

// Animated counters in stats (targets elements with .stat-count + data-count)
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
      animateCount(e.target);
      statObserver.unobserve(e.target);
    }
  });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-count').forEach(el => statObserver.observe(el));

// Progress bar animation (optional)
const pb = document.querySelector('.progress-bar');
if (pb){
  const pct = Number(pb.dataset.progress || 0);
  setTimeout(() => {
    pb.style.width = pct + '%';
  }, 500);
  const label = pb.querySelector('span');
  if (label) label.textContent = pct + '%';
}

// Donation amount chips (optional)
document.querySelectorAll('.amount').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.amount').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const ca = document.getElementById('custom-amount');
    if (ca) ca.value = btn.dataset.value;
  });
});

// Footer year (safe)
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

