/* ================================================
   BIRTHDAY WEBSITE — SCRIPT.JS
   ================================================ */

// ---- Init AOS (Animate On Scroll) ----
document.addEventListener('DOMContentLoaded', () => {
  AOS.init({
    duration: 900,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60,
  });

  initTyping();
  createPetals();
  createStars();
  createSparkles();
  createFloatingHearts();
  initAudioPlayer();
});


/* ============================================================
   TYPING ANIMATION — Landing Section
   ============================================================ */
function initTyping() {
  const text = 'Hari ini bukan hari biasa… karena seseorang yang spesial lahir di dunia.';
  const el   = document.getElementById('typing-text');
  let index  = 0;

  // Remove the blinking cursor style while typing (re-add via class)
  el.classList.add('typing');

  function type() {
    if (index < text.length) {
      el.textContent += text[index];
      index++;
      setTimeout(type, index < 10 ? 80 : 55);
    } else {
      // Typing done — keep cursor blinking via CSS ::after
    }
  }

  // Start after short delay
  setTimeout(type, 800);
}


/* ============================================================
   FLOATING PETALS — Landing Section
   ============================================================ */
function createPetals() {
  const container = document.getElementById('petals');
  const count = 18;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    petal.classList.add('petal');

    const left     = Math.random() * 100;
    const duration = 6 + Math.random() * 8;
    const delay    = Math.random() * 10;
    const size     = 6 + Math.random() * 8;

    petal.style.cssText = `
      left: ${left}%;
      width: ${size}px;
      height: ${size * 1.3}px;
      animation-duration: ${duration}s;
      animation-delay: -${delay}s;
    `;

    container.appendChild(petal);
  }
}


/* ============================================================
   OPEN SURPRISE BUTTON
   ============================================================ */
function openSurprise() {
  // Fire confetti
  fireConfetti();

  // Smooth scroll to gallery section
  setTimeout(() => {
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
  }, 600);
}


/* ============================================================
   CONFETTI
   ============================================================ */
function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  const ctx    = canvas.getContext('2d');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors   = ['#f7c5d5', '#e8899a', '#d4506a', '#fde8ee', '#c9a96e', '#f5e6d8'];
  const pieces   = [];
  const total    = 150;
  let   active   = true;

  for (let i = 0; i < total; i++) {
    pieces.push({
      x:   Math.random() * canvas.width,
      y:   Math.random() * canvas.height - canvas.height,
      w:   6 + Math.random() * 8,
      h:   8 + Math.random() * 6,
      r:   Math.random() * 360,
      dr:  (Math.random() - 0.5) * 6,
      vy:  3 + Math.random() * 5,
      vx:  (Math.random() - 0.5) * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      opacity: 1,
    });
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach((p, idx) => {
      ctx.save();
      ctx.globalAlpha = p.opacity;
      ctx.fillStyle   = p.color;
      ctx.translate(p.x + p.w / 2, p.y + p.h / 2);
      ctx.rotate((p.r * Math.PI) / 180);
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();

      p.y += p.vy;
      p.x += p.vx;
      p.r += p.dr;

      if (p.y > canvas.height) {
        p.opacity -= 0.03;
      }
    });

    const allDone = pieces.every(p => p.opacity <= 0);
    if (!allDone && active) {
      requestAnimationFrame(draw);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  draw();

  // Stop after 4s
  setTimeout(() => { active = false; }, 4000);
}


/* ============================================================
   GALLERY LIGHTBOX
   ============================================================ */
function openLightbox(src, caption) {
  const lb  = document.getElementById('lightbox');
  const img = document.getElementById('lightbox-img');
  const cap = document.getElementById('lightbox-caption');

  // Use picsum fallbacks matching the onerror logic
  const seedMap = { 'photo1.jpg': 'rose1', 'photo2.jpg': 'flower2', 'photo3.jpg': 'garden3' };
  img.src  = seedMap[src]
    ? `https://picsum.photos/seed/${seedMap[src]}/800/1000`
    : src;
  cap.textContent = caption;

  lb.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox on Escape key
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeSurpriseModal();
  }
});


/* ============================================================
   ENVELOPE — Letter Section
   ============================================================ */
let envelopeOpened = false;

function openEnvelope() {
  if (envelopeOpened) return;
  envelopeOpened = true;

  const flap    = document.getElementById('envelope-flap');
  const hint    = document.getElementById('envelope-hint');
  const content = document.getElementById('letter-content');

  // Flip flap open
  flap.classList.add('open');
  hint.style.opacity = '0';

  // After animation, show letter
  setTimeout(() => {
    content.classList.add('visible');
    // Smooth scroll into view
    content.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 700);
}


/* ============================================================
   STARS — Final Section
   ============================================================ */
function createStars() {
  const container = document.getElementById('stars-bg');
  const count     = 80;

  for (let i = 0; i < count; i++) {
    const star    = document.createElement('div');
    star.classList.add('star-dot');

    const size  = 1 + Math.random() * 2.5;
    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const delay = Math.random() * 4;
    const dur   = 2 + Math.random() * 3;

    star.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      top: ${top}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
    `;

    container.appendChild(star);
  }
}


/* ============================================================
   SPARKLES — Final Section
   ============================================================ */
function createSparkles() {
  const container = document.getElementById('sparkles');
  const symbols   = ['✦', '✧', '✨', '⋆', '˚'];

  for (let i = 0; i < 20; i++) {
    const sp      = document.createElement('div');
    sp.classList.add('sparkle');
    sp.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left  = Math.random() * 100;
    const top   = Math.random() * 100;
    const delay = Math.random() * 5;
    const dur   = 2 + Math.random() * 3;
    const size  = 0.6 + Math.random() * 0.8;

    sp.style.cssText = `
      left: ${left}%;
      top: ${top}%;
      animation-duration: ${dur}s;
      animation-delay: ${delay}s;
      font-size: ${size}rem;
    `;

    container.appendChild(sp);
  }
}


/* ============================================================
   FLOATING HEARTS — Final Section
   ============================================================ */
function createFloatingHearts() {
  const container = document.getElementById('floating-hearts');
  const symbols   = ['♡', '♥', '❤', '💕', '💗'];

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    const left  = Math.random() * 100;
    const delay = Math.random() * 15;
    const dur   = 10 + Math.random() * 10;
    const size  = 0.8 + Math.random() * 0.8;

    heart.style.cssText = `
      left: ${left}%;
      animation-duration: ${dur}s;
      animation-delay: -${delay}s;
      font-size: ${size}rem;
      color: rgba(247, 197, 213, 0.5);
    `;

    container.appendChild(heart);
  }
}


/* ============================================================
   MUSIC PLAYER — Custom Controls
   ============================================================ */
let isPlaying = false;

function initAudioPlayer() {
  const audio    = document.getElementById('birthday-audio');
  const fill     = document.getElementById('progress-fill');
  const currTime = document.getElementById('current-time');
  const totTime  = document.getElementById('total-time');

  // Default volume
  audio.volume = 0.3;

  // Update progress bar
  audio.addEventListener('timeupdate', () => {
    if (!audio.duration) return;
    const pct = (audio.currentTime / audio.duration) * 100;
    fill.style.width = pct + '%';
    currTime.textContent = formatTime(audio.currentTime);
  });

  // Set total time when metadata loads
  audio.addEventListener('loadedmetadata', () => {
    totTime.textContent = formatTime(audio.duration);
  });

  // Reset on end
  audio.addEventListener('ended', () => {
    isPlaying = false;
    document.getElementById('play-icon').textContent = '▶';
    document.getElementById('music-disc').classList.remove('playing');
    fill.style.width = '0%';
  });

  // Click progress bar to seek
  document.querySelector('.music-progress-bar').addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    audio.currentTime = pct * audio.duration;
  });
}

function toggleMusic() {
  const audio = document.getElementById('birthday-audio');
  const icon  = document.getElementById('play-icon');
  const disc  = document.getElementById('music-disc');

  if (isPlaying) {
    audio.pause();
    icon.textContent = '▶';
    disc.classList.remove('playing');
  } else {
    audio.play().catch(() => {
      // Autoplay blocked — still update UI
    });
    icon.textContent = '⏸';
    disc.classList.add('playing');
  }

  isPlaying = !isPlaying;
}

function setVolume(val) {
  document.getElementById('birthday-audio').volume = parseFloat(val);
}

function formatTime(sec) {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}


/* ============================================================
   FINAL SURPRISE MODAL
   ============================================================ */

// Pool of sweet messages
const sweetMessages = [
  'Senyummu adalah hal terindah yang pernah aku lihat. Jangan pernah berhenti tersenyum ya. 🌸',
  'Kamu tahu tidak? Setiap harimu yang bahagia adalah hadiah terbaik untukku juga. 💕',
  'Di antara semua hal indah di dunia, kamu yang paling aku syukuri. Selamat ulang tahun! 🎂',
  'Melihatmu bahagia hari ini membuat hatiku penuh. Tetaplah jadi kamu yang luar biasa ini. 🤍',
  'Tahun ini pasti lebih indah dari sebelumnya, karena kamu ada di dalamnya. 🌷',
];

// Photos for modal (will fallback gracefully)
const modalPhotos = [
  { src: '1.jpg', fallback: 'https://picsum.photos/seed/rose1/400/400' },
  { src: '2.jpg', fallback: 'https://picsum.photos/seed/flower2/400/400' },
  { src: '3.jpg', fallback: 'https://picsum.photos/seed/garden3/400/400' },
];

function showSurpriseModal() {
  const modal    = document.getElementById('surprise-modal');
  const backdrop = document.getElementById('modal-backdrop');
  const msgEl    = document.getElementById('modal-text');
  const photoEl  = document.getElementById('modal-photo');

  // Pick random message & photo
  const msg   = sweetMessages[Math.floor(Math.random() * sweetMessages.length)];
  const photo = modalPhotos[Math.floor(Math.random() * modalPhotos.length)];

  msgEl.textContent = msg;
  photoEl.src       = photo.src;
  photoEl.onerror   = () => { photoEl.src = photo.fallback; };

  modal.classList.add('open');
  backdrop.classList.add('open');
  document.body.style.overflow = 'hidden';

  // Burst some confetti
  fireConfetti();
}

function closeSurpriseModal() {
  document.getElementById('surprise-modal').classList.remove('open');
  document.getElementById('modal-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}


/* ============================================================
   WINDOW RESIZE — Refresh canvas size
   ============================================================ */
window.addEventListener('resize', () => {
  const canvas = document.getElementById('confetti-canvas');
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
});
