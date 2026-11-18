document.addEventListener('DOMContentLoaded', () => {
  initGallery();
  initVideoModal();
  initAudioPlayer();
});

/* 1. Galería de imágenes */
function initGallery() {
  const viewerImg = document.getElementById('gallery-main-img');
  const cards = document.querySelectorAll('.gallery__card');

  if (!viewerImg || !cards.length) return;

  cards.forEach((card) => {
    const btn = card.querySelector('.gallery__thumb-btn');
    if (!btn) return;

    btn.addEventListener('click', () => {
      if (card.classList.contains('gallery__card--active')) return;

      viewerImg.classList.add('gallery__viewer-img--fade');
      cards.forEach((c) => c.classList.remove('gallery__card--active'));
      card.classList.add('gallery__card--active');

      setTimeout(() => {
        viewerImg.src = card.dataset.full;
        viewerImg.alt = card.dataset.alt || '';
        viewerImg.classList.remove('gallery__viewer-img--fade');
      }, 300);
    });
  });
}

/* 2. Modal de vídeo con reproducción automática y pausa al cerrar */
function initVideoModal() {
  const openBtn = document.getElementById('open-video-btn');
  const closeBtn = document.getElementById('close-video-btn');
  const modal = document.getElementById('video-modal');
  const overlay = document.getElementById('modal-overlay');
  const video = document.getElementById('modal-video');

  if (!openBtn || !closeBtn || !modal || !video) return;

  const openModal = () => {
    modal.hidden = false;
    video.play().catch(() => {});
  };

  const closeModal = () => {
    video.pause();
    modal.hidden = true;
  };

  openBtn.addEventListener('click', openModal);
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.hidden) closeModal();
  });
}

/* 3. Reproductor de audio con API HTMLMediaElement */
function initAudioPlayer() {
  const audio = document.getElementById('ambient-audio');
  const toggleBtn = document.getElementById('audio-toggle-btn');
  const toggleText = document.getElementById('audio-btn-text');
  const toggleIcon = document.getElementById('audio-btn-icon');
  const muteBtn = document.getElementById('audio-mute-btn');
  const muteIcon = document.getElementById('audio-mute-icon');

  if (!audio || !toggleBtn) return;

  // Reproducir o pausar
  toggleBtn.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
      toggleIcon.textContent = '⏸';
      toggleText.textContent = 'Pausar ambiente espacial';
    } else {
      audio.pause();
      toggleIcon.textContent = '▶';
      toggleText.textContent = 'Escuchar ambiente espacial';
    }
  });

  // Silenciar o activar sonido
  if (muteBtn && muteIcon) {
    muteBtn.addEventListener('click', () => {
      audio.muted = !audio.muted;
      muteIcon.textContent = audio.muted ? '🔇' : '🔊';
    });
  }

  // Restablecer al finalizar la pista
  audio.addEventListener('ended', () => {
    toggleIcon.textContent = '▶';
    toggleText.textContent = 'Escuchar ambiente espacial';
  });
}
