// EcoRaise Lite interactions: nav toggle, scroll reveal, parallax, counters, progress
const navToggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');
if (navToggle){
  navToggle.addEventListener('click', () => {
    links.style.display = links.style.display === 'flex' ? 'none' : 'flex';
  });
}

// IntersectionObserver for .reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (e.isIntersecting) e.target.classList.add('is-visible');
  });
}, {threshold:.2});

document.querySelectorAll('.reveal').forEach(el => io.observe(el));

// Parallax effect for hero
const hero = document.querySelector('.hero-media img');
window.addEventListener('scroll', () => {
  if (!hero) return;
  const y = window.scrollY * 0.25;
  hero.style.transform = `translateY(${y}px) scale(1.05)`;
});

// Animated counters in hero
function animateCount(el){
  const end = Number(el.dataset.count || 0);
  const dur = 1400;
  const start = performance.now();
  function tick(now){
    const p = Math.min((now - start)/dur,1);
    const val = Math.floor(end * p);
    el.textContent = val.toLocaleString();
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
const statObserver = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{
    if(e.isIntersecting){ animateCount(e.target); statObserver.unobserve(e.target); }
  });
},{threshold:.6});
document.querySelectorAll('.stat').forEach(el=>statObserver.observe(el));

// Progress bar animation
const pb = document.querySelector('.progress-bar');
if (pb){
  const pct = Number(pb.dataset.progress || 0);
  setTimeout(()=>{
    pb.style.width = pct + '%';
  }, 500);
  pb.querySelector('span').textContent = pct + '%';
}

// Donation amount chips
document.querySelectorAll('.amount').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    document.querySelectorAll('.amount').forEach(b=>b.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('custom-amount').value = btn.dataset.value;
  });
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
