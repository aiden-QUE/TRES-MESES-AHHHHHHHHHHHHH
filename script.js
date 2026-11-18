const scenes = [...document.querySelectorAll('.scene')];
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
let musicStarted = false;

function showScene(id) {
  scenes.forEach(scene => scene.classList.toggle('active', scene.id === id));
  window.scrollTo({top: 0, behavior: 'smooth'});
  if (id === 'eclipse') document.body.classList.add('ending');
}
function startMusic() {
  if (musicStarted) return;
  bgMusic.volume = 0.35;
  bgMusic.play().then(() => {
    musicStarted = true;
    musicLabel.textContent = 'Pausar';
    musicToggle.setAttribute('aria-label', 'Pausar música');
  }).catch(() => {
    musicLabel.textContent = 'Activar música';
  });
}
musicToggle.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try { await bgMusic.play(); musicStarted = true; musicLabel.textContent = 'Pausar'; }
    catch { musicLabel.textContent = 'Añade musica-instrumental.mp3'; }
  } else {
    bgMusic.pause(); musicLabel.textContent = 'Reanudar';
  }
});
document.getElementById('beginBtn').addEventListener('click', () => {
  startMusic();
  showScene('galaxy');
});
document.querySelectorAll('[data-next]').forEach(btn => {
  btn.addEventListener('click', () => showScene(btn.dataset.next));
});

function scatterStars(container, count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('i');
    star.className = 'dust';
    star.style.left = Math.random() * 100 + '%';
    star.style.top = Math.random() * 100 + '%';
    star.style.animationDelay = Math.random() * 3 + 's';
    star.style.opacity = .25 + Math.random() * .75;
    container.appendChild(star);
  }
}
scatterStars(document.getElementById('introStars'), 65);
scatterStars(document.getElementById('galaxyDust'), 110);
scatterStars(document.getElementById('eclipseStars'), 95);

const starButtons = document.querySelectorAll('.knit-star');
const starMessage = document.getElementById('starMessage');
starButtons.forEach(button => {
  button.addEventListener('click', () => {
    if (button.classList.contains('unravel')) return;
    starMessage.textContent = button.dataset.message;
    button.classList.add('unravel');
    button.disabled = true;
  });
});

const envelope = document.getElementById('envelope');
const letterViewer = document.getElementById('letterViewer');
const letterViewerClose = document.getElementById('letterViewerClose');
const letterImage = envelope.querySelector('.letter-paper img');

letterImage.addEventListener('click', (event) => {
  if (!envelope.classList.contains('open')) return;
  event.stopPropagation();
  letterViewer.classList.add('open');
  document.body.style.overflow = 'hidden';
});
letterViewerClose.addEventListener('click', () => {
  letterViewer.classList.remove('open');
  document.body.style.overflow = '';
});
letterViewer.addEventListener('click', (event) => {
  if (event.target === letterViewer) {
    letterViewer.classList.remove('open');
    document.body.style.overflow = '';
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && letterViewer.classList.contains('open')) {
    letterViewer.classList.remove('open');
    document.body.style.overflow = '';
  }
});

const envelopeHint = document.getElementById('envelopeHint');
envelope.addEventListener('click', () => {
  envelope.classList.toggle('open');
  envelopeHint.textContent = envelope.classList.contains('open')
    ? 'Una carta hecha con todo mi cariño. 💙'
    : 'Con cariño, para ti.';
});

const flowerTypes = [
  {symbol:'✿', color:'#a9d7ff'}, {symbol:'❀', color:'#e5b8e8'},
  {symbol:'✾', color:'#9bc9ff'}, {symbol:'❁', color:'#f0d4ef'},
  {symbol:'✽', color:'#b7d8ff'}, {symbol:'❃', color:'#d9eaff'},
  {symbol:'✿', color:'#b4a8ff'}, {symbol:'❀', color:'#a4d7e5'}
];
let flowerCount = 0;
const flowers = document.getElementById('flowers');
const garden = document.getElementById('gardenArea');
const gardenCount = document.getElementById('gardenCount');
function plantFlower() {
  if (flowerCount >= 18) {
    gardenCount.textContent = 'Nuestro jardín ya está lleno de flores. 💙';
    return;
  }
  const type = flowerTypes[flowerCount % flowerTypes.length];
  const flower = document.createElement('div');
  flower.className = 'flower';
  const left = 7 + Math.random() * 86;
  const stem = 48 + Math.random() * 82;
  const size = 24 + Math.random() * 16;
  flower.style.left = left + '%';
  flower.style.setProperty('--stem', stem + 'px');
  flower.style.setProperty('--size', size + 'px');
  flower.innerHTML = `<span class="stem"></span><span class="leaf" style="transform:translateX(-100%) rotate(-25deg)"></span><span class="bloom" style="color:${type.color}">${type.symbol}</span>`;
  flowers.appendChild(flower);
  flowerCount++;
  gardenCount.textContent = `${flowerCount} ${flowerCount === 1 ? 'flor ha nacido' : 'flores han nacido'}.`;
}
document.getElementById('plantBtn').addEventListener('click', plantFlower);
garden.addEventListener('click', (event) => {
  if (event.target.id !== 'plantBtn') plantFlower();
});

document.getElementById('restartBtn').addEventListener('click', () => {
  document.body.classList.remove('ending');
  showScene('intro');
});
const modal = document.getElementById('messageModal');
document.getElementById('modalClose').addEventListener('click', () => modal.classList.remove('show'));
modal.addEventListener('click', event => { if (event.target === modal) modal.classList.remove('show'); });
