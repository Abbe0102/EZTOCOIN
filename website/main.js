// Mobile menu
const toggle = document.querySelector('.nav-toggle');
const links = document.getElementById('nav-links');
toggle.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
});
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    links.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
  }
});

// Tokenomics tooltip (hover, tap and keyboard focus)
const alloc = document.querySelector('.alloc');
const tip = alloc.querySelector('.tip');
function showTip(seg) {
  tip.innerHTML = '';
  const title = document.createElement('b');
  title.textContent = `${seg.dataset.label} · ${seg.dataset.pct}`;
  const amount = document.createElement('span');
  amount.textContent = seg.dataset.amt;
  tip.append(title, amount);
  tip.hidden = false;
  const box = alloc.getBoundingClientRect();
  const r = seg.getBoundingClientRect();
  const half = tip.offsetWidth / 2;
  const x = Math.min(Math.max(r.left + r.width / 2 - box.left, half), box.width - half);
  tip.style.left = `${x}px`;
}
alloc.querySelectorAll('.seg').forEach((seg) => {
  seg.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') showTip(seg); });
  seg.addEventListener('focus', () => showTip(seg));
  seg.addEventListener('click', () => showTip(seg));
});
alloc.addEventListener('pointerleave', (e) => { if (e.pointerType === 'mouse') tip.hidden = true; });
alloc.addEventListener('focusout', (e) => {
  if (!e.relatedTarget || !e.relatedTarget.closest('.seg')) tip.hidden = true;
});
document.addEventListener('click', (e) => {
  if (!e.target.closest('.seg')) tip.hidden = true;
});

document.getElementById('year').textContent = new Date().getFullYear();
