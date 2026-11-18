// Inicialización de módulos interactivos al cargar el DOM
document.addEventListener('DOMContentLoaded', () => {
  initGallery();    // Tarea 2: Galería dinámica
  initVideoModal(); // Tarea 3: Modal de vídeo con API HTMLMediaElement
  initAudioPlayer(); // Tarea 4: Reproductor de audio personalizado
});

/* ==========================================================================
   TAREA 2: Galería de imágenes interactiva (Vanilla JS)
   - Escucha clics en las miniaturas
   - Añade clase de desvanecimiento suave (fade)
   - Actualiza src y alt en el visor principal (#gallery-main-img)
   ========================================================================== */
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

/* ==========================================================================
   TAREA 3: Modal de vídeo programático (API HTMLMediaElement)
   - Controla apertura y cierre del modal
   - Inicia reproducción automática con .play() al abrir
   - Pausa reproducción con .pause() al cerrar (botón, overlay o Escape)
   ========================================================================== */
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

/* ==========================================================================
   TAREA 4: Reproductor de audio personalizado (API HTMLMediaElement)
   - Controla play() y pause() mediante botón personalizado
   - Alterna silenciamiento con la propiedad audio.muted
   - Gestiona eventos para actualizar iconos y textos de estado
   ========================================================================== */
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
